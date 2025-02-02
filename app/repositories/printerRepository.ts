import CreatePrinterPayload from "#models/printer/dto/createPrinterPayload";
import UpdatePrinterPayload from "#models/printer/dto/updatePrinterPayload";
import Printer from "#models/printer/printer";
import PrinterRepositoryInterface from "#repositoriesInterface/printerRepositoryInterface";

export default class printerRepository implements PrinterRepositoryInterface {
  async getAllPrinters(): Promise<Printer[]> {
    return await Printer.query().preload('materials');
  }
  async getPrinterById(printerId: string): Promise<Printer> {
    return await Printer.query().where({ id: printerId }).preload('materials').firstOrFail();
  }
  createPrinter(printer: CreatePrinterPayload): Promise<Printer> {
    throw new Error("Method not implemented.");
  }
  updatePrinter(
    printerId: string,
    payload: UpdatePrinterPayload
  ): Promise<Printer> {
    throw new Error("Method not implemented.");
  }
  async deletePrinter(printerId: string): Promise<void> {
    await Printer.query().where({ id: printerId }).delete();
  }
}
