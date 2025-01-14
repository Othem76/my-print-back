import Printer from "#models/printer/printer";
import { BaseSeeder } from "@adonisjs/lucid/seeders";

export default class PrinterSeeder extends BaseSeeder {
  public async run() {
    await Printer.createMany([
      {
        name: "ULTIMAKER S3",
        curaPrinterName: "Ultimaker S3",
        plateSize: "230 x 190 x 200",
        cleaningCost: 2,
        impressingCost: 0.03822,
        materialTypes: [1, 2],
      },
      {
        name: "CREALITY CR10-S5",
        curaPrinterName: "Creality CR-10 S5",
        plateSize: "500 x 500 x 500",
        cleaningCost: 2,
        impressingCost: 0.03822,
        materialTypes: [1, 3],
      },
    ]);
  }
}
