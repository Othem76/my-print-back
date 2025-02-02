import Printer from "#models/printer/printer";
import printerRepository from "#repositories/printerRepository";
import { inject } from "@adonisjs/core";

@inject()
export default class PrinterService {
  constructor(private readonly repository: printerRepository) {}

  async getAllPrinters(): Promise<Printer[]> {
    return await this.repository.getAllPrinters();
  }

  async getPrinterById(printerId: string): Promise<Printer> {
    return await this.repository.getPrinterById(printerId);
  }

  async deletePrinter(printerId: string): Promise<void> {
    return await this.repository.deletePrinter(printerId);
  }
}
