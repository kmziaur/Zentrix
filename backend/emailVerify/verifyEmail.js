import nodemailer from "nodemailer";
import "dotenv/config";

const normalizeAppPassword = (value = "") =>
  value.replace(/\s+/g, "").trim();

const mailUser = process.env.MAIL_USER || process.env.EMAIL_USER;
const mailPass = normalizeAppPassword(
  process.env.MAIL_PASS || process.env.EMAIL_PASS
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  family: 4, // Force IPv4
  auth: {
    user: mailUser,
    pass: mailPass,
  },
});

export const verifyEmail = async (token, email) => {
  try {
    if (!mailUser || !mailPass) {
      throw new Error("Mail credentials are not configured");
    }

    // Test SMTP connection
    await transporter.verify();
    console.log("✅ SMTP Ready");

    const mailConfigurations = {
      from: `"Zentrix" <${mailUser}>`,
      to: email,
      subject: "Email Verification - Zentrix",
      text: `Hi!

Thank you for registering on Zentrix.

Please verify your email by clicking the link below:

${process.env.FRONTEND_URL || "http://localhost:5173"}/#/verify/${token}

If you did not create this account, you can ignore this email.

Thanks,
Zentrix Team`,
    };

    const info = await transporter.sendMail(mailConfigurations);

    console.log("✅ Email Sent Successfully:", info.response);

    return true;
  } catch (error) {
    console.error("❌ Email sending failed:");
    console.error(error);

    return false;
  }
};