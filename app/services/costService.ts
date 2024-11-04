import CuraService from "#services/curaService.js";
import {Cost, PrintSetting} from "#models/cost/dto/postCostPayload.js";
import * as fs from "node:fs";
import app from "@adonisjs/core/services/app";
import {FILE_UPLOAD_DIRECTORY} from "../utils/consts.js";
import {sum} from "../utils/utils.js";

export default class CostService {
  // TODO: a mettre en base de données
  materialPrices: { [key: string]: number } = {
    "ABS X130 apple green": 0.2245,
    "ABS X130 Blue": 0.2245,
    "ABS X130 red": 0.2245,
    "ABS X130 yellow": 0.2245,
    TPU92: 0.2712,
    "Innofil ABS Fusion + Naturel Ø 1,75 mm": 0.078,
    "Innofil ABS Silver Ø 1,75 mm": 0.0404,
    "Innofil ASA Ø 1,75 mm": 0.0553,
    "Innofil EPR PET White Ø 1,75 mm": 0.046,
    "Innofil PLA BLACK Ø 1,75 mm": 0.044,
    "Innofil PLA WHITE Ø 1,75 mm": 0.044,
    "Innofil PLA YELLOW Ø 1,75 mm": 0.0413,
    "Innofil PP White Ø 1,75 mm": 0.0743,
    "Innoflex 45 Black Ø 1,75 mm": 0.076,
    "MODELE ABS PLUS ivoire": 0.4277,
    "MODELE AGILUS": 0.45,
    "MODELE DURUS": 0.4,
    "MODELE TANGOBLACKPLUS": 0.45,
    "MODELE TANGOGREY": 0.45,
    "MODELE VERO CYAN": 0.34,
    "MODELE VERO MAGENTA": 0.34,
    "MODELE VERO YELLOW": 0.34,
    "MODELE VEROWHITE PLUS RGD835": 0.2583,
    "Renkforce PLA Blue Ø 1,75 mm": 0.034,
    "Renkforce PLA RED Ø 1,75 mm": 0.034,
    "SUPPORT FULLCURE 705": 0.1347,
    "SUPPORT PS400": 0.4277,
    "Verbatim PLA GREEN Ø 1,75 mm": 0.031,
    "Ultimaker PLA WHITE Ø 2,85 mm": 0.044,
    "Ultimaker PLA RED Ø 2,85 mm": 0.044,
    "Ultimaker PLA BLUE Ø 2,85 mm": 0.0413,
    "Ultimaker PLA GREEN Ø 2,85 mm": 0.034,
  };

  getMaterialCost(material: keyof typeof this.materialPrices, weight: number) {
    return this.materialPrices[material] * weight;
  }

  getCleaningCost(time: number) {
    return 4.017 * time;
  }

  getElectricityCost(time: number, power: number) {
    const electricityCost = 0.2516;
    return ((time * power) / 1000) * electricityCost;
  }

  getTotalCost(
    materialCost: number,
    cleaningCost: number,
    electricityCost: number
  ) {
    return materialCost + cleaningCost + electricityCost;
  }

  async getCosts(filename: string, settings: PrintSetting): Promise<Cost> {
    const curaService = new CuraService()
    const fileBuffer = fs.readFileSync(app.makePath(`${FILE_UPLOAD_DIRECTORY}/${filename}`))

    const results = await curaService.slice(settings.printer, fileBuffer)

    const materialCost = this.getMaterialCost(
      settings.material,
      results.filamentUsage
    );

    const cleaningCost = this.getCleaningCost(400); //TODO
    const electricityCost = this.getElectricityCost(
      results.printTime,
      300 //TODO
    );

    const totalCost = this.getTotalCost(
      materialCost,
      cleaningCost,
      electricityCost
    );

    return {
      materialCost,
      cleaningCost,
      electricityCost,
      totalCost
    }
  }
}
