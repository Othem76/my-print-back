import { BaseSeeder } from "@adonisjs/lucid/seeders";
import ImpressingType from "#models/impressingType/impressingType";

export default class ImpressingTypeSeeder extends BaseSeeder {
  public async run() {
    await ImpressingType.createMany([
      {
        type: "FDM", // Equivalent to Material Extrusion
      },
      {
        type: "SLA", // Stereolithography
      },
      {
        type: "SLS", // Selective Laser Sintering
      },
      {
        type: "DLP", // Digital Light Processing
      },
      {
        type: "Polyjet", // PolyJet printing
      },
      {
        type: "Binder Jetting", // Binder Jetting process
      },
      {
        type: "Material Jetting", // Jetting materials
      },
      {
        type: "Sheet Lamination", // Lamination of sheets
      },
      {
        type: "Directed Energy Deposition", // Energy deposition process
      },
      {
        type: "Vat Photopolymerization", // Photopolymerization process
      },
      {
        type: "Powder Bed Fusion", // Powder-based fusion
      },
    ]);
  }
}
