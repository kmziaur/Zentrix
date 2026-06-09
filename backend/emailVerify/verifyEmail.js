import { Resend } from "resend";
import "dotenv/config";

const resend = new Resend(process.env.RESEND_API_KEY);

if (!process.env.RESEND_API_KEY) {
  console.error("❌ Missing RESEND_API_KEY in environment variables");
}

export const verifyEmail = async (token, email) => {
  try {
    if (!email || !token) {
      throw new Error("Email or token missing");
    }

    const verifyLink = `${process.env.FRONTEND_URL || "http://localhost:5173"}/#/verify/${token}`;

    const { data, error } = await resend.emails.send({
      from: "Zentrix <onboarding@resend.dev>", // default safe sender
      to: email,
      subject: "Email Verification - Zentrix",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Verify Your Email</h2>
          <p>Thank you for registering on Zentrix.</p>
          <p>Click the button below to verify your email:</p>
          
          <a href="${verifyLink}" 
             style="display:inline-block;padding:10px 20px;background:#ff4d6d;color:#fff;text-decoration:none;border-radius:5px;">
            Verify Email
          </a>

          <p>If you did not create this account, ignore this email.</p>

          <p>Thanks,<br/>Zentrix Team</p>
        </div>
      `,
    });

    if (error) {
      console.error("❌ Email Error:", error);
      return false;
    }

    console.log("✅ Email sent successfully:", data?.id);
    return true;
  } catch (err) {
    console.error("❌ Email sending failed:", err.message || err);
    return false;
  }
};




// import nodemailer from "nodemailer";
// import "dotenv/config";

// const normalizeAppPassword = (value = "") =>
//   value.replace(/\s+/g, "").trim();

// const mailUser = process.env.MAIL_USER || process.env.EMAIL_USER;
// const mailPass = normalizeAppPassword(
//   process.env.MAIL_PASS || process.env.EMAIL_PASS
// );

// if (!mailUser || !mailPass) {
//   console.error("❌ Missing email credentials in environment variables");
// }

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,              // ✅ FIX: use 587 instead of service shortcut
//   secure: false,         // ✅ required for port 587
//   auth: {
//     user: mailUser,
//     pass: mailPass,
//   },
//   tls: {
//     rejectUnauthorized: false, // helps avoid Render TLS issues
//   },
// });

// export const verifyEmail = async (token, email) => {
//   try {
//     if (!mailUser || !mailPass) {
//       throw new Error("Mail credentials are not configured");
//     }

//     // Optional: verify SMTP connection (safe in production but can be removed later)
//     await transporter.verify();
//     console.log("✅ SMTP Ready");

//     const mailConfigurations = {
//       from: `"Zentrix" <${mailUser}>`,
//       to: email,
//       subject: "Email Verification - Zentrix",
//       text: `Hi!

// Thank you for registering on Zentrix.

// Please verify your email:

// ${process.env.FRONTEND_URL || "http://localhost:5173"}/#/verify/${token}

// If you did not create this account, ignore this email.

// Thanks,
// Zentrix Team`,
//     };

//     const info = await transporter.sendMail(mailConfigurations);

//     console.log("✅ Email Sent Successfully:", info.response);

//     return true;
//   } catch (error) {
//     console.error("❌ Email sending failed:");
//     console.error(error.message || error);

//     return false;
//   }
// };



