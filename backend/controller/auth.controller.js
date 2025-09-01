import otpModule from "otp-generator";
import jwt from "jsonwebtoken";
import { transporter, mailOptions } from "../services/mail";
import { otp, users } from "../db/schema";
import { db } from "../db/db";

export const otpMailer = async (req, res) => {
    try {
        const { email_ } = req.body;

        const validEmail = db.select().from(users).where(eq(users.email, email_)).execute();
        if (!validEmail) {
            return res.status(404).json({ message: "Email not found" });
        }

        const otpG = otpModule.generate(6, {
            upperCase: false,
            specialChars: false,
            lowerCaseAlphabets: false,
        });

        await db.insert(otp).values({
            email: email_,
            code: otpG,
            createdAt: new Date(),
        });

        transporter.sendMail(mailOptions(email_, otpG), (error, info) => {
            if (error) {
                console.error("Error sending OTP email:", error);
            } else {
                console.log("OTP email sent successfully:", info.response);
            }
        });

        return res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error("Error sending OTP email:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
    
};

export const login = async (req, res) => {
    try {
        const { email_, otp_ } = req.body;

        const validOtp = await db.select().from(otp).where(eq(otp.email, email_)).where(eq(otp.code, otp_)).execute();

        if (!validOtp) {
            return res.status(401).json({ message: "Invalid OTP" });
        }

        const user = await db.select().from(users).where(eq(users.email, email_)).execute();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const token = jwt.sign({ 
            email: user.email,
            userId: user.id,
            userName: user.fullname,
            userCredits: user.credits
        }, process.env.JWT_SECRET, { expiresIn: "3d" });

        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
    
};

export const signup = async (req, res) => {
    try {
        const {email_, fullname_, contact_, resumelink_, college_} = req.body;

        if(!email_ || !fullname_  || !college_){
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await db.select().from(users).where(eq(users.email, email_)).execute();
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        await db.insert(users).values({
            email: email_,
            fullname: fullname_,
            contact: contact_,
            resumelink: resumelink_,
            college: college_,
        });

        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
