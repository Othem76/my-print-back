import PrinterService from "#services/printerService";
import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";

@inject()
export default class PrinterController {
  constructor(private readonly printerService: PrinterService) {}

  async getAllPrinters({ response }): Promise<HttpContext> {
    try {
      const printers = await this.printerService.getAllPrinters();
      return response.send(printers);
    } catch (error) {
      return response.status(404).send({ error: "Printers not found" });
    }
  }

  async getPrinterById({ params, response }) {
    const printerId = params.id;
    if (!printerId) {
      return response.status(400).send({ error: "Printer ID is required" });
    }

    try {
      const printer = await this.printerService.getPrinterById(printerId);
      return response.send(printer);
    } catch (error) {
      return response.status(404).send({ error: "Printer not found" });
    }
  }

  async deletePrinter({ params, response }) {
    const printerId = params.id;

    if (!printerId) {
      return response.status(400).send({ error: "Printer ID is required" });
    }

    try {
      const printerId = params.id;
      const printer = await this.printerService.getPrinterById(printerId);
      await this.printerService.deletePrinter(printerId);
      return response.send(printer);
    } catch (error) {
      return response.status(404).send({ error: "Printer not found" });
    }
  }
}
