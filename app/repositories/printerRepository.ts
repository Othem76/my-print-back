import CreatePrinterPayload from "#models/printer/dto/createPrinterPayload";
import UpdatePrinterPayload from "#models/printer/dto/updatePrinterPayload";
import Printer from "#models/printer/printer";
import PrinterRepositoryInterface from "#repositoriesInterface/printerRepositoryInterface";

export default class printerRepository implements PrinterRepositoryInterface {
  async getAllPrinters(): Promise<Printer[]> {
    return await Printer.all();
  }
  async getPrinterById(printerId: number): Promise<Printer> {
    return await Printer.findOrFail(printerId);
  }
  createPrinter(printer: CreatePrinterPayload): Promise<Printer> {
    throw new Error("Method not implemented.");
  }
  updatePrinter(
    printerId: number,
    payload: UpdatePrinterPayload
  ): Promise<Printer> {
    throw new Error("Method not implemented.");
  }
  async deletePrinter(printerId: number): Promise<void> {
    await Printer.query().where("id", printerId).delete();
  }
}
