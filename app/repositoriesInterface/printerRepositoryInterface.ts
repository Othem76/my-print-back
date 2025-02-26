import Printer from "#models/printer/printer";

export default interface PrinterRepositoryInterface {
  getAllPrinters(): Promise<Printer[]>;

  getPrinterById(printerId: string): Promise<Printer>;

  deletePrinter(printerId: string): Promise<void>;
}
