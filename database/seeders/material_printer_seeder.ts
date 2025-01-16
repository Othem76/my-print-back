import { BaseSeeder } from "@adonisjs/lucid/seeders";
import Material from "#models/material/material";
import Printer from "#models/printer/printer";
import MaterialPrinter from "#models/material_printer/materialPrinter";

export default class MaterialPrinterSeeder extends BaseSeeder {
  public async run() {

    let printers = await Printer.all();

    if (printers.length === 0) {
      printers = await Printer.createMany([
            {
              name: "ULTIMAKER S3",
              curaPrinterName: "utlimaker_s3",
              width: 230,
              length: 190,
              height: 200,
              cleaningCost: 2,
              impressingCost: 0.03822
            },
            {
              name: "CREALITY CR10-S5",
              curaPrinterName: "creality_cr10s5",
              width: 500,
              length: 500,
              height: 500,
              cleaningCost: 2,
              impressingCost: 0.03822
            },
          ]);
    }

    let materials = await Material.all();

    if(materials.length === 0) {
      materials = await Material.createMany([
        {
          name: "ABS X130 apple green",
          grammePrize: 0.2245,
          diameter: 1.75,
          type: "ABS",
        },
        {
          name: "ABS X130 Blue",
          grammePrize: 0.2245,
          diameter: 1.75,
          type: "ABS",
        },
        {
          name: "ABS X130 red",
          grammePrize: 0.2245,
          diameter: 1.75,
          type: "ABS",
        },
        {
          name: "ABS X130 yellow",
          grammePrize: 0.2245,
          diameter: 1.75,
          type: "ABS",
        },
        {
          name: "Innofil ABS Fusion + Naturel Ø 1,75 mm",
          grammePrize: 0.078,
          diameter: 1.75,
          type: "ABS",
        },
        {
          name: "Innofil ABS Silver Ø 1,75 mm",
          grammePrize: 0.0404,
          diameter: 1.75,
          type: "ABS",
        },
        {
          name: "Innofil ASA Ø 1,75 mm",
          grammePrize: 0.0553,
          diameter: 1.75,
          type: "ASA",
        },
        {
          name: "Innofil EPR PETG White Ø 1,75 mm",
          grammePrize: 0.046,
          diameter: 1.75,
          type: "PETG",
        },
        {
          name: "Innofil PLA BLACK Ø 1,75 mm",
          grammePrize: 0.044,
          diameter: 1.75,
          type: "PLA",
        },
        {
          name: "Innofil PLA WHITE Ø 1,75 mm",
          grammePrize: 0.044,
          diameter: 1.75,
          type: "PLA",
        },
        {
          name: "Innofil PLA YELLOW Ø 1,75 mm",
          grammePrize: 0.0413,
          diameter: 1.75,
          type: "PLA",
        },
        {
          name: "Renkforce PLA Blue Ø 1,75 mm",
          grammePrize: 0.034,
          diameter: 1.75,
          type: "PLA",
        },
        {
          name: "Renkforce PLA RED Ø 1,75 mm",
          grammePrize: 0.034,
          diameter: 1.75,
          type: "PLA",
        },
        {
          name: "Verbatim PLA GREEN Ø 1,75 mm",
          grammePrize: 0.031,
          diameter: 1.75,
          type: "PLA",
        },
        {
          name: "Ultimaker PLA WHITE Ø 2,85 mm",
          grammePrize: 0.044,
          diameter: 2.85,
          type: "PLA",
        },
        {
          name: "Ultimaker PLA RED Ø 2,85 mm",
          grammePrize: 0.044,
          diameter: 2.85,
          type: "PLA",
        },
        {
          name: "Ultimaker PLA BLUE Ø 2,85 mm",
          grammePrize: 0.0413,
          diameter: 2.85,
          type: "PLA",
        },
        {
          name: "Ultimaker PLA GREEN Ø 2,85 mm",
          grammePrize: 0.034,
          diameter: 2.85,
          type: "PLA",
        },
      ]);
    }

    if ((await MaterialPrinter.all()).length > 0) {
      return;
    }

    await MaterialPrinter.createMany([
      {
        materialId: materials[0].id,
        printerId: printers[0].id
      },
      {
        materialId: materials[1].id,
        printerId: printers[0].id
      },
      {
        materialId: materials[2].id,
        printerId: printers[0].id
      },
      {
        materialId: materials[3].id,
        printerId: printers[0].id
      },
      {
        materialId: materials[4].id,
        printerId: printers[0].id
      },
      {
        materialId: materials[5].id,
        printerId: printers[0].id
      },
      {
        materialId: materials[6].id,
        printerId: printers[0].id
      },
      {
        materialId: materials[1].id,
        printerId: printers[1].id
      },
      {
        materialId: materials[2].id,
        printerId: printers[1].id
      },
      {
        materialId: materials[5].id,
        printerId: printers[1].id
      },
      {
        materialId: materials[8].id,
        printerId: printers[1].id
      },
      {
        materialId: materials[9].id,
        printerId: printers[1].id
      },
      {
        materialId: materials[10].id,
        printerId: printers[1].id
      },
      {
        materialId: materials[13].id,
        printerId: printers[1].id
      }
    ]);
  }
}
