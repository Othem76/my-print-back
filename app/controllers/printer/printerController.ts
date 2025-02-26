import PrinterService from "#services/printerService";
import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";

@inject()
export default class PrinterController {
  constructor(private readonly printerService: PrinterService) {}

  /**
   * @getAllPrinters
   * @description Get all printers
   * @responseBody 200 - [{"id":6,"name":"CREALITY CR10-S5","plateSize":"500 x 500 x 500","cleaningCost":2,"impressingCost":0.03822},{"id":5,"name":"ULTIMAKER S3","plateSize":"230 x 190 x 200","cleaningCost":2,"impressingCost":0.03822},{"id":4,"name":"CREALITY CR10-S5","plateSize":"500 x 500 x 500","cleaningCost":2,"impressingCost":0.03822},{"id":3,"name":"ULTIMAKER S3","plateSize":"230 x 190 x 200","cleaningCost":2,"impressingCost":0.03822},{"id":2,"name":"CREALITY CR10-S5","plateSize":"500 x 500 x 500","cleaningCost":2,"impressingCost":0.03822},{"id":1,"name":"ULTIMAKER S3","plateSize":"230 x 190 x 200","cleaningCost":2,"impressingCost":0.03822}]
   * @responseBody 404 - { "errors": [ { "message": "Printers not found" } ] }
   */
  async getAllPrinters({ response }: HttpContext) {
    try {
      const printers = await this.printerService.getAllPrinters();
      return response.send(printers);
    } catch (error) {
      return response.status(404).send({ error: "Printers not found" });
    }
  }

  /**
   * @getPrinterById
   * @description Get a printer by ID
   * @responseBody 200 - {"id":1,"name":"ULTIMAKER S3","plateSize":"230 x 190 x 200","cleaningCost":2,"impressingCost":0.03822}
   * @responseBody 400 - { "errors": [ { "message": "Printer ID is required" } ] }
   * @responseBody 404 - { "errors": [ { "message": "Printer not found" } ] }
   */
  async getPrinterById({ params, response }: HttpContext) {
    const printerId: string = params.id;
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

  /**
   * @deletePrinter
   * @description Delete a printer by ID
   * @responseBody 200 - {"id":1,"name":"ULTIMAKER S3","plateSize":"230 x 190 x 200","cleaningCost":2,"impressingCost":0.03822}
   * @responseBody 400 - { "errors": [ { "message": "Printer ID is required" } ] }
   * @responseBody 404 - { "errors": [ { "message": "Printer not found" } ] }
   */
  async deletePrinter({ params, response }: HttpContext) {
    const printerId: number = params.id;

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
