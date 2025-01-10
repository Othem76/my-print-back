import { HttpContext } from "@adonisjs/core/http";
import QuotePdfPayload from "#interfaces/quote/quotePdfPayload.js";

export default class QuoteController {
  async generatePdf({ request, response }): Promise<HttpContext> {
    const payload: QuotePdfPayload = request.only([
      "title",
      "description",
      "date",
      "printer",
      "material",
      "quantity",
      "materialCost",
      "printingTime",
      "costPerHour",
      "cleaningCost",
      "totalCost",
    ]);

    const {default: QuoteService} = await import("#services/quoteService")

    try {
      const pdfBuffer = await QuoteService.generatePdf(payload)

      const filename = new Date().toISOString().slice(0, 10).replace(/-/g, '')

      response.header('Content-Type', 'application/pdf')
      response.header('Content-Disposition', `attachment; filename="devis-${filename}.pdf"`)
      return response.send(pdfBuffer)
    } catch (error) {
      return response.status(500).send({ error: 'Une erreur est survenue lors de la génération du PDF' })
    }
  }
}
