import { Router } from "express";
import { EmailController } from "./controllers/EmailController";

const router = Router();

const emailController = new EmailController();

router.post("/send-contact", emailController.sendContact.bind(emailController));

export { router };
