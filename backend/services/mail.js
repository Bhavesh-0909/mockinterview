import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS 
    }
});

export const mailOptions = (to_, otp_) => {
    return {
        from: 'MockInterview',
        to: to_,
        subject: 'Your OTP Code',
        html: `<h1>Your OTP code is ${otp_}</h1>`
    };
};
