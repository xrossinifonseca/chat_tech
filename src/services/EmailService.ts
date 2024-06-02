import { transporter } from "../config/emailConfig";

interface MailOptions {
  to?: string;
  subject: string;
  text: string;
}

export class EmailService {
  private transporter;

  constructor() {
    this.transporter = transporter;
  }

  public async SendEmail(options: MailOptions) {
    const { subject, text } = options;

    const emailDetails = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject,
      text,
    };

    try {
      await this.transporter.sendMail(emailDetails);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Error sending email");
    }
  }
}
