import mail from "@adonisjs/mail/services/main";
import { Message } from "@adonisjs/mail";

export default class MailingService {
  async sendMail(to: string, subject: string, html: string, file: string) {
    await mail.send((message: Message) => {
      message
        .from("MS_iEqkXh@trial-ynrw7gy7qmrg2k8e.mlsender.net")
        .to(to)
        .subject(subject)
        .html(html)
        .attach(file);
    });
  }
}
