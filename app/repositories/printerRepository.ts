import Printer from "#models/printer/printer";
import PrinterRepositoryInterface from "#repositoriesInterface/printerRepositoryInterface";

export default class printerRepository implements PrinterRepositoryInterface {
  async getAllPrinters(): Promise<Printer[]> {
    return await Printer.query().preload('materials');
  }
  async getPrinterById(printerId: string): Promise<Printer> {
    return await Printer.query().where({ id: printerId }).preload('materials').firstOrFail();
  }

  async deletePrinter(printerId: string): Promise<void> {
    await Printer.query().where({ id: printerId }).delete();
  }
}
