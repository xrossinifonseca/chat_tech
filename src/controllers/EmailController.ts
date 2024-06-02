import { Request, Response } from "express";
import { EmailService } from "../services/EmailService";

export class EmailController {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  public async sendContact(req: Request, res: Response) {
    const body = req.body;
    if (!body?.subject || !body?.text) {
      return res
        .status(400)
        .send({ error: "Fields: subject, and text are required" });
    }

    try {
      await this.emailService.SendEmail(body);
      res.status(200).send({ message: "Email successfully sent" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Error sending email" });
    }
  }
}
