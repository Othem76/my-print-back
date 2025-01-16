import Printer from "#models/printer/printer";
import CreatePrinterPayload from "#models/printer/dto/createPrinterPayload";
import UpdatePrinterPayload from "#models/printer/dto/updatePrinterPayload.js";

export default interface PrinterRepositoryInterface {
  getAllPrinters(): Promise<Printer[]>;

  getPrinterById(printerId: number): Promise<Printer>;

  createPrinter(printer: CreatePrinterPayload): Promise<Printer>;

  updatePrinter(
    printerId: number,
    payload: UpdatePrinterPayload
  ): Promise<Printer>;

  deletePrinter(printerId: number): Promise<void>;
}
