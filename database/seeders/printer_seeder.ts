import Printer from "#models/printer/printer";
import { BaseSeeder } from "@adonisjs/lucid/seeders";

export default class PrinterSeeder extends BaseSeeder {
  public async run() {
    await Printer.createMany([
      {
        name: "ULTIMAKER S3",
        plateSize: "230 x 190 x 200",
        cleaningCost: 2,
        impressingCost: 0.03822,
        supportedImpressingType: 1,
      },
      {
        name: "CREALITY CR10-S5",
        plateSize: "500 x 500 x 500",
        cleaningCost: 2,
        impressingCost: 0.03822,
        supportedImpressingType: 1,
      },
    ]);
  }
}
