import { BaseSeeder } from "@adonisjs/lucid/seeders";
import MaterialType from "#models/materialType/materialType";

export default class MaterialTypeSeeder extends BaseSeeder {
  public async run() {
    await MaterialType.createMany([
      {
        type: "PLA", // Polylactic Acid
      },
      {
        type: "ABS", // Acrylonitrile Butadiene Styrene
      },
      {
        type: "PETG", // Polyethylene Terephthalate Glycol
      },
      {
        type: "Nylon", // Polyamide
      },
      {
        type: "TPU", // Thermoplastic Polyurethane
      },
      {
        type: "Resin", // Photopolymer Resin
      },
      {
        type: "PVA", // Polyvinyl Alcohol
      },
      {
        type: "HIPS", // High Impact Polystyrene
      },
      {
        type: "Polycarbonate", // PC
      },
      {
        type: "Carbon Fiber", // Carbon Fiber Reinforced
      },
      {
        type: "Wood", // Wood-filled Filament
      },
    ]);
  }
}
