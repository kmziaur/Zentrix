import nodemailer from "nodemailer";
import "dotenv/config";

const normalizeAppPassword = (value = "") =>
  value.replace(/\s+/g, "").trim();

const mailUser = process.env.MAIL_USER || process.env.EMAIL_USER;
const mailPass = normalizeAppPassword(
  process.env.MAIL_PASS || process.env.EMAIL_PASS
);

if (!mailUser || !mailPass) {
  console.error("❌ Missing email credentials in environment variables");
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,              // ✅ FIX: use 587 instead of service shortcut
  secure: false,         // ✅ required for port 587
  auth: {
    user: mailUser,
    pass: mailPass,
  },
  tls: {
    rejectUnauthorized: false, // helps avoid Render TLS issues
  },
});

export const verifyEmail = async (token, email) => {
  try {
    if (!mailUser || !mailPass) {
      throw new Error("Mail credentials are not configured");
    }

    // Optional: verify SMTP connection (safe in production but can be removed later)
    await transporter.verify();
    console.log("✅ SMTP Ready");

    const mailConfigurations = {
      from: `"Zentrix" <${mailUser}>`,
      to: email,
      subject: "Email Verification - Zentrix",
      text: `Hi!

Thank you for registering on Zentrix.

Please verify your email:

${process.env.FRONTEND_URL || "http://localhost:5173"}/#/verify/${token}

If you did not create this account, ignore this email.

Thanks,
Zentrix Team`,
    };

    const info = await transporter.sendMail(mailConfigurations);

    console.log("✅ Email Sent Successfully:", info.response);

    return true;
  } catch (error) {
    console.error("❌ Email sending failed:");
    console.error(error.message || error);

    return false;
  }
};