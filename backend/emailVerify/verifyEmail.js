import nodemailer from "nodemailer";
import "dotenv/config";

export const verifyEmail = async (token, email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailConfigurations = {
      from: `"Zentrix" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Email Verification - Zentrix",

      text: `Hi!

Thank you for registering on Zentrix.

Please verify your email by clicking the link below:

${process.env.FRONTEND_URL || "http://localhost:5173"}/verify/${token}

If you did not create this account, you can ignore this email.

Thanks,
Zentrix Team`,
    };

    const info = await transporter.sendMail(mailConfigurations);

    console.log("✅ Email Sent Successfully:", info.response);
    return true;

  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    return false;
  }
};