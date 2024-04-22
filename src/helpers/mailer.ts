import nodemailer from "nodemailer";

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
    //TODO: Conigure mail for usage 🙂

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    const mailOption = {
      from: "learnprogramming130@gmail.com",
      to: email,
      subject:
        emailType === "VERIFIY "
          ? "Verify your email 📧"
          : "Reset your password 💫",
      html: "<b>Hello world?</b>",
    };

    const mailResponse = await transporter.sendMail(mailOption);

    return mailResponse;
  } catch (error: any) {
    console.log("Error while sending email 😥");
    throw new Error(error.message);
  }
};
