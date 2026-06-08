import nodemailer from "nodemailer";
import "dotenv/config";

const normalizeAppPassword = (value = "") => value.replace(/\s+/g, "").trim();

export const sendOtpEmail = async (otp, email) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: normalizeAppPassword(process.env.MAIL_PASS),
      },
    });

    const info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      html: `
        <h2>Your OTP is: <b>${otp}</b></h2>
        <p>This OTP will expire in 10 minutes.</p>
      `,
    });

    console.log("OTP sent successfully");
    console.log(info.messageId);

  } catch (error) {
    console.error("Email send error:", error);
    throw new Error(error.message);
  }
};
