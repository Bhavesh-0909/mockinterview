import otpModule from "otp-generator";
import jwt from "jsonwebtoken";
import { transporter, mailOptions } from "../services/mail.js";
import { otp, users } from "../db/schema.js";
import { db } from "../db/db.js";
import { eq, and, gt } from "drizzle-orm";
import { subMinutes } from "date-fns";

export const otpMailer = async (req, res) => {
    try {
        const { email_ } = req.body;

        const validEmail = await db.select().from(users).where(eq(users.email, email_)).execute();
        if (!validEmail) {
            return res.status(404).json({ message: "Email not found" });
        }
        const otpExists = await db.select().from(otp).where(and(eq(otp.email, email_), gt(otp.createdAt, subMinutes(new Date(), 5)))).execute();
        console.log("otpExists", otpExists);
        if (otpExists.length > 0) {
            return res.status(409).json({ message: "OTP already sent" });
        }
        const otpG = otpModule.generate(6, {
            upperCase: false,
            specialChars: false,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            digits: true,
            lowerCase: false,
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
        const fiveMinutesAgo = subMinutes(new Date(), 5);
        const validOtp = await db.select().from(otp).where(and(
            eq(otp.email, email_),
            eq(otp.code, otp_),
            gt(otp.createdAt, fiveMinutesAgo)
        )).execute();

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
            userCredits: user.credits,
            userAvatar: user.avatarlink,
        }, process.env.JWT_SECRET, { expiresIn: "3d" });

        return res.status(200).cookie("token", token, { httpOnly: true }).json({ message: "Login successful", token });
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

        if (existingUser.length > 0) {
            return res.status(409).json({ message: "User already exists" });
        }

        await db.insert(users).values({
            email: email_,
            fullname: fullname_,
            contact: contact_,
            resumelink: resumelink_,
            college: college_,
            credits: 10,
            avatarlink: `https://api.dicebear.com/9.x/pixel-art/svg?seed=${fullname_}`
        });

        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};