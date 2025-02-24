import { HttpContext } from "@adonisjs/core/http";
import QuotePdfPayload from "#interfaces/quote/quotePdfPayload.js";
import { FILE_UPLOAD_DIRECTORY } from "../../utils/consts.js";
import fs from "fs";
import FileHistoryService from "#services/fileHistoryService";
import QuoteService from "#services/quoteService";
import { inject } from "@adonisjs/core";
import { HistoryStatus } from "#interfaces/fileHistory/historyStatus";
import { Readable } from "stream";
import MaterialService from "#services/materialService";
import PrinterService from "#services/printerService";
import MailingService from "#services/mailingService";

@inject()
export default class QuoteController {

  constructor(
    private fileHistoryService: FileHistoryService,
    private quoteService: QuoteService,
    private materialService: MaterialService,
    private printerService: PrinterService,
    private mailingService: MailingService
  ) {}

  async generateQuote({ request, response }: HttpContext) {
    const costs = request.body().costs as {[key: string]: QuotePdfPayload};

    const quoteDatas = await this.fetchQuoteData(costs);
    if (!quoteDatas) {
      return response.status(500).send({ error: 'Erreur lors de la récupération des données des devis' });
    }

    try {
      const pdfBuffer = await this.generatePdfBuffer(quoteDatas);
      return response.stream(Readable.from(pdfBuffer));
    } catch (error) {
      console.error(error);
      return response.status(500).send({ error: 'Une erreur est survenue lors de la génération du PDF' });
    }
  }

  async generateQuoteAndSendMail({ request, response }: HttpContext) {
    const costs = request.body().costs as {[key: string]: QuotePdfPayload};
    const emailPayload = request.body().email as {recipientEmail?: string, downloadQuote?: boolean};

    if (!emailPayload?.recipientEmail) {
      return response.status(400).send({ error: "Aucun courriel de destinataire n'a été trouvé" });
    }

    const quoteDatas = await this.fetchQuoteData(costs);
    if (!quoteDatas) {
      return response.status(500).send({ error: 'Erreur lors de la récupération des données des devis' });
    }

    const filename = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const filePDFPath = `${FILE_UPLOAD_DIRECTORY}/devis-${filename}.pdf`;

    try {
      const pdfBuffer = await this.generatePdfBuffer(quoteDatas);

      await this.cleanupFiles(Object.keys(costs));
      await this.updateFileHistories(Object.keys(costs));

      fs.writeFileSync(filePDFPath, pdfBuffer);

      await this.sendEmailWithAttachment(emailPayload.recipientEmail, filePDFPath);
      fs.unlinkSync(filePDFPath);

      return emailPayload?.downloadQuote
        ? response.stream(Readable.from(pdfBuffer))
        : response.status(200).send({ message: 'Devis envoyé par email' });
    } catch (error) {
      console.error(error);
      fs.unlinkSync(filePDFPath); // Suppression du devis en cas d'erreur
      return response.status(500).send({ error: 'Une erreur est survenue lors de la génération et de l\'envoi du PDF' });
    }
  }

  private async generatePdfBuffer(quoteDatas: QuotePdfPayload[]) {
    return await this.quoteService.generatePdf(quoteDatas);
  }

  private async fetchQuoteData(costs: {[key: string]: QuotePdfPayload}) {
    try {
      return await Promise.all(Object.keys(costs).map(async (key) => {
        const fileHistory = await this.fileHistoryService.getByFileServerName(key);
        const data = costs[key];
        data.filename = fileHistory?.fileOriginalName;
        data.material = await this.materialService.getMaterialById(data.materialId);
        data.printer = await this.printerService.getPrinterById(data.printerId);
        return data;
      }));
    } catch (error) {
      console.error('Error fetching quote data:', error);
      return null;
    }
  }

  private async cleanupFiles(filesServerNames: string[]) {
    const filePaths = filesServerNames.map(fileName => `${FILE_UPLOAD_DIRECTORY}/${fileName}`);
    await Promise.all(filePaths.map(filePath => this.deleteFile(filePath)));
  }

  private deleteFile(filePath: string) {
    return new Promise<void>((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file ${filePath}: ${err.message}`);
          reject(err);
        } else {
          console.log(`Deleted file: ${filePath}`);
          resolve();
        }
      });
    });
  }

  private async updateFileHistories(filesServerNames: string[]) {
    await Promise.all(filesServerNames.map(async (fileServerName) => {
      const history = await this.fileHistoryService.getByFileServerName(fileServerName);
      if (history) {
        const updatePayload = { id: history.id, status: HistoryStatus.Finished };
        await this.fileHistoryService.updateHistory(updatePayload);
      }
    }));
  }

  private async sendEmailWithAttachment(recipientEmail: string, filePDFPath: string) {
    try {
      await this.mailingService.sendMail(
        recipientEmail,
        "[NO-REPLY] Devis Impression 3D Fablab HEI",
        "Bonjour,<br><br>Veuillez trouver ci-joint votre devis.<br><br>Cordialement,<br>MyPrint<br><br><br>Ne répondez pas à ce mail, il a été envoyé automatiquement.<br>Pour toutes questions veuillez vous adresser à mailto:michael.meul@junia.com",
        filePDFPath
      );
    } catch (error) {
      console.error(`Error sending email to ${recipientEmail}:`, error);
    }
  }
}
