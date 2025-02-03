import { HttpContext } from "@adonisjs/core/http";
import QuotePdfPayload from "#interfaces/quote/quotePdfPayload.js";
import { FILE_UPLOAD_DIRECTORY } from "../../utils/consts.js";
import fs from 'fs'
import FileHistoryService from "#services/fileHistoryService";
import QuoteService from "#services/quoteService";
import { inject } from "@adonisjs/core";
import { HistoryStatus } from "#interfaces/fileHistory/historyStatus";
import { Readable } from "stream";

@inject()
export default class QuoteController {

  constructor(private fileHistoryService: FileHistoryService, private quoteService: QuoteService) {}

  async generatePdf({ request, response }: HttpContext) {
    const payload: QuotePdfPayload = request.only([
      "fileServerName",
      "printer",
      "material",
      "totalMaterialCost",
      "printTime",
      "electricityCost",
      "cleaningCost",
      "totalCost",
    ]);

    try {
      const pdfBuffer = await this.quoteService.generatePdf(payload)

      const filename = new Date().toISOString().slice(0, 10).replace(/-/g, '')

      response.header('Content-Type', 'application/pdf')
      response.header('Content-Disposition', `attachment; filename="devis-${filename}.pdf"`)

      // Suppression du fichier stl temporaire
      const filePath = `${FILE_UPLOAD_DIRECTORY}/${payload.fileServerName}`

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file ${payload.fileServerName}: ${err.message}`)
        } else {
          console.log(`Deleted file: ${payload.fileServerName}`)
        }
      })

      // Mise a jour de l'historique du fichier
      const history = await this.fileHistoryService.getByFileServerName(payload.fileServerName);

      if (history) {
        const updateFileHistoryPayload = {
          id: history.id,
          status: HistoryStatus.Finished,
        }

        this.fileHistoryService.updateHistory(updateFileHistoryPayload)
      }

      return response.stream(Readable.from(pdfBuffer));
    } catch (error) {
      console.log(error)
      return response.status(500).send({ error: 'Une erreur est survenue lors de la génération du PDF' })
    }
  }
}
