import Printer from "#models/printer/printer";
import printerRepository from "#repositories/printerRepository";
import { inject } from "@adonisjs/core";

@inject()
export default class PrinterService {
  constructor(private readonly repository: printerRepository) {}

  async getAllPrinters(): Promise<Printer[]> {
    return await this.repository.getAllPrinters();
  }

  async getPrinterById(printerId: number): Promise<Printer> {
    return await this.repository.getPrinterById(printerId);
  }

  async deletePrinter(printerId: number): Promise<void> {
    return await this.repository.deletePrinter(printerId);
  }
}
