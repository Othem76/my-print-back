import { BaseSeeder } from "@adonisjs/lucid/seeders";
import ImpressingType from "#models/impressingType/impressingType";

export default class ImpressingTypeSeeder extends BaseSeeder {
  public async run() {
    await ImpressingType.createMany([
      {
        type: "FDM",
      },
      {
        type: "SLA",
      },
      {
        type: "SLS",
      },
      {
        type: "DLP",
      },
      {
        type: "Polyjet",
      },
      {
        type: "Binder Jetting",
      },
      {
        type: "Material Jetting",
      },
      {
        type: "Sheet Lamination",
      },
      {
        type: "Directed Energy Deposition",
      },
      {
        type: "Vat Photopolymerization",
      },
      {
        type: "Powder Bed Fusion",
      },
      {
        type: "Material Extrusion",
      },
      {
        type: "Material Jetting",
      },
      {
        type: "Sheet Lamination",
      },
      {
        type: "Directed Energy Deposition",
      },
      {
        type: "Vat Photopolymerization",
      },
      {
        type: "Powder Bed Fusion",
      },
      {
        type: "Material Extrusion",
      },
    ]);
  }
}
