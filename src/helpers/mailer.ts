import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

interface SendEmailProps {
  email: string;
  emailType: string;
  userId: string;
}


export const sendEmail = async ({
  email,
  emailType,
  userId,
}: SendEmailProps) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    //? Update the user with the token
    if (emailType === "VERIFIY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "8e4c5b080626d2", // ❌🔥
        pass: "647cb0ad4a51b4", // ❌🔥
      },
    });

    const mailOption = {
      from: "learnprogramming130@gmail.com",
      to: email,
      subject:
        emailType === "VERIFIY "
          ? "Verify your email 📧"
          : "Reset your password 💫",
      html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    
    <img src="https://img.icons8.com/ios/50/duolingo-logo.png" alt="Clever Logo" style="display: block; margin: 0 auto 20px; border-radius: 8px;">

    <h1 style="text-align: center; color: #007bff; font-size: 2em; margin-bottom: 10px;">Hello!</h1>
    <p style="text-align: center; font-size: 1.2em; margin-bottom: 20px;">You've received this message from Clever, your trusted platform.</p>
     
    <p style="text-align: center; font-size: 1.2em; margin-bottom: 20px;">Please click on the link below to ${
      emailType === "VERIFIY"
        ? "<strong>verify</strong>"
        : "<strong>reset</strong>"
    } ${
        emailType === "VERIFIY"
          ? "<strong>your email</strong>"
          : "<strong>your password</strong>"
      }.</p>
    <center>
    <a href="${
      process.env.DOMAIN
    }/verifyemail?token=${hashedToken}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; font-size: 1.2em; transition: background-color 0.3s; text-align: center;">Click here to proceed</a></center>
    <p style="text-align: center; font-size: 0.9em; margin-top: 20px;">If you did not request this action, please ignore this email.</p>

  </div>

      
      `,
    };

    const mailResponse = await transport.sendMail(mailOption);

    return mailResponse;
  } catch (error: any) {
    console.log("Error while sending email 😥");
    throw new Error(error.message);
  }
};
