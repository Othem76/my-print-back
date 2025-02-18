import { HttpContext } from "@adonisjs/core/http";
import QuotePdfPayload from "#interfaces/quote/quotePdfPayload.js";
import { FILE_UPLOAD_DIRECTORY } from "../../utils/consts.js";
import fs from 'fs'
import FileHistoryService from "#services/fileHistoryService";
import QuoteService from "#services/quoteService";
import { inject } from "@adonisjs/core";
import { HistoryStatus } from "#interfaces/fileHistory/historyStatus";
import { Readable } from "stream";
import MaterialService from "#services/materialService";
import PrinterService from "#services/printerService";

@inject()
export default class QuoteController {

  constructor(
    private fileHistoryService: FileHistoryService,
    private quoteService: QuoteService,
    private materialService: MaterialService,
    private printerService: PrinterService
  ) {}

  async generatePdf({ request, response }: HttpContext) {
    const costs = request.body().costs as {[key: string]: QuotePdfPayload};

    const quoteDatas = await Promise.all(Object.keys(costs).map(async (key) => {
      const fileHistory = await this.fileHistoryService.getByFileServerName(key)
      const data = costs[key];
      data.filename = fileHistory?.fileOriginalName;
      data.material = await this.materialService.getMaterialById(data.materialId);
      data.printer = await this.printerService.getPrinterById(data.printerId);
      return data;
    }))

    try {
      const pdfBuffer = await this.quoteService.generatePdf(quoteDatas)

      const filename = new Date().toISOString().slice(0, 10).replace(/-/g, '')

      response.header('Content-Type', 'application/pdf')
      response.header('Content-Disposition', `attachment; filename="devis-${filename}.pdf"`)

      // Suppression des fichiers stl temporaires
      const filesServerName = Object.keys(costs);
      const filePaths = filesServerName.map(fileName => `${FILE_UPLOAD_DIRECTORY}/${fileName}`);

      filePaths.forEach(filePath => {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error deleting file ${filePath}: ${err.message}`);
          } else {
            console.log(`Deleted file: ${filePath}`);
          }
        });
      });

      filesServerName.forEach(async (fileServerName) => {
        // Mise a jour de l'historique du fichier
        const history = await this.fileHistoryService.getByFileServerName(fileServerName);

        if (history) {
          const updateFileHistoryPayload = {
            id: history.id,
            status: HistoryStatus.Finished,
          }

          await this.fileHistoryService.updateHistory(updateFileHistoryPayload)
        }
      });

      return response.stream(Readable.from(pdfBuffer));
    } catch (error) {
      console.log(error)
      return response.status(500).send({ error: 'Une erreur est survenue lors de la génération du PDF' })
    }
  }
}
