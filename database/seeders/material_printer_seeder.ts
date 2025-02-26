import { BaseSeeder } from "@adonisjs/lucid/seeders";
import Material from "#models/material/material";
import Printer from "#models/printer/printer";

export default class MaterialPrinterSeeder extends BaseSeeder {
  public async run() {
    let printers = await Printer.all();

    if (printers.length === 0) {
      printers = await Printer.createMany([
        {
          name: "ULTIMAKER S3",
          curaPrinterName: "ultimaker_s3",
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

    if (materials.length === 0) {
      materials = await Material.createMany([
        { name: "ABS X130 apple green", grammePrize: 0.2245, diameter: 1.75, type: "ABS" },
        { name: "ABS X130 Blue", grammePrize: 0.2245, diameter: 1.75, type: "ABS" },
        { name: "ABS X130 red", grammePrize: 0.2245, diameter: 1.75, type: "ABS" },
        { name: "ABS X130 yellow", grammePrize: 0.2245, diameter: 1.75, type: "ABS" },
        { name: "Innofil ABS Fusion + Naturel Ø 1,75 mm", grammePrize: 0.078, diameter: 1.75, type: "ABS" },
        { name: "Innofil ABS Silver Ø 1,75 mm", grammePrize: 0.0404, diameter: 1.75, type: "ABS" },
        { name: "Innofil ASA Ø 1,75 mm", grammePrize: 0.0553, diameter: 1.75, type: "ASA" },
        { name: "Innofil EPR PETG White Ø 1,75 mm", grammePrize: 0.046, diameter: 1.75, type: "PETG" },
        { name: "Innofil PLA BLACK Ø 1,75 mm", grammePrize: 0.044, diameter: 1.75, type: "PLA" },
        { name: "Innofil PLA WHITE Ø 1,75 mm", grammePrize: 0.044, diameter: 1.75, type: "PLA" },
        { name: "Innofil PLA YELLOW Ø 1,75 mm", grammePrize: 0.0413, diameter: 1.75, type: "PLA" },
        { name: "Renkforce PLA Blue Ø 1,75 mm", grammePrize: 0.034, diameter: 1.75, type: "PLA" },
        { name: "Renkforce PLA RED Ø 1,75 mm", grammePrize: 0.034, diameter: 1.75, type: "PLA" },
        { name: "Verbatim PLA GREEN Ø 1,75 mm", grammePrize: 0.031, diameter: 1.75, type: "PLA" },
        { name: "Ultimaker PLA WHITE Ø 2,85 mm", grammePrize: 0.044, diameter: 2.85, type: "PLA" },
        { name: "Ultimaker PLA RED Ø 2,85 mm", grammePrize: 0.044, diameter: 2.85, type: "PLA" },
        { name: "Ultimaker PLA BLUE Ø 2,85 mm", grammePrize: 0.0413, diameter: 2.85, type: "PLA" },
        { name: "Ultimaker PLA GREEN Ø 2,85 mm", grammePrize: 0.034, diameter: 2.85, type: "PLA" },
      ]);
    }

    // Vérifier qu'il y a assez de matériaux et d'imprimantes pour éviter les erreurs
    if (materials.length < 14 || printers.length < 2) {
      console.error("⚠️ Pas assez de matériaux ou d’imprimantes pour exécuter le seeder !");
      return;
    }

    // Associer les matériaux aux imprimantes avec `attach()`
    await printers[0].related('materials').attach([
      materials[0].id,
      materials[1].id,
      materials[2].id,
      materials[3].id,
      materials[4].id,
      materials[5].id,
      materials[6].id,
    ]);

    await printers[1].related('materials').attach([
      materials[1].id,
      materials[2].id,
      materials[5].id,
      materials[8].id,
      materials[9].id,
      materials[10].id,
      materials[13].id,
    ]);
  }
}
