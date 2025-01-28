import mail from "@adonisjs/mail/services/main";
import { Message } from "@adonisjs/mail";

export default class MailingService {
  async sendMail(to: string, subject: string, html: string, file: string) {
    await mail.send((message: Message) => {
      message
        .from("myprint.contact.hei@gmail.com")
        .to(to)
        .subject(subject)
        .html(html)
        .attach(file);
    });
  }
}
