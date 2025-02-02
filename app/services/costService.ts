import CuraService from "#services/curaService";
import * as fs from "node:fs";
import app from "@adonisjs/core/services/app";
import { FILE_UPLOAD_DIRECTORY } from "../utils/consts.js";
import { PrintSetting } from "#interfaces/cost/printSettings";
import { Cost } from "#models/cost/cost";
import { CostSetting } from "#interfaces/cost/costSetting";

export default class CostService {
  // TODO: a mettre en base de données
  materialPrices: { [key: string]: number } = {
    "ABS X130 apple green": 0.2245,
    "ABS X130 Blue": 0.2245,
    "ABS X130 red": 0.2245,
    "ABS X130 yellow": 0.2245,
    "TPU92": 0.2712,
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
    "Generic PLA": 0.027,
  };

  getMaterialCost(materialPrice: number, weight: number) {
    return (materialPrice * weight) / 1000;
  }

  getCleaningCost(time: number) {
    const cleaningCost = 0.4998;
    return (time / 3600) * cleaningCost;
  }

  getElectricityCost(time: number) {
    const electricityCost = 0.4939;
    return (time / 3600) * electricityCost;
  }

  getTotalCost(
    materialCost: number,
    cleaningCost: number,
    electricityCost: number
  ) {
    return (
      Math.round((materialCost + cleaningCost + electricityCost) * 100) / 100
    );
  }

  async getCostsForFile(
    filename: string,
    settings: CostSetting
  ): Promise<Cost> {
    const curaService = new CuraService();

    const fileBuffer = fs.readFileSync(
      app.makePath(`${FILE_UPLOAD_DIRECTORY}/${filename}`)
    );
    console.log('BEFORE SLICE');
    console.log("Printer : ", settings.printer);
    console.log("Support : ", settings.support);
    console.log("Layer Height : ", settings.layerHeight);
    console.log("Infill : ", settings.infill);
    console.log("Filename : ", filename);
    const results = await curaService.slice(
      settings.printer,
      fileBuffer,
      settings.support,
      settings.layerHeight,
      settings.infill
    );
    console.log('AFTER SLICE');

    const materialCost = this.getMaterialCost(
      settings.material.grammePrize,
      results.filamentUsage
    );

    const cleaningCost = this.getCleaningCost(3600); //TODO
    const electricityCost = this.getElectricityCost(
      results.printTime
    );

    const totalCost = this.getTotalCost(
      materialCost,
      cleaningCost,
      electricityCost
    );

    const hours = Math.floor(results.printTime / 3600);
    const minutes = Math.floor((results.printTime % 3600) / 60);
    const printTime = `${hours.toString().padStart(2, "0")}h${minutes.toString().padStart(2, "0")}`;

    return {
      printTime,
      materialCost,
      cleaningCost,
      electricityCost,
      totalCost,
    };
  }

  findAllUserFile() {
    return fs.readdirSync(app.makePath(FILE_UPLOAD_DIRECTORY));
  }

  async getCosts(settings: CostSetting): Promise<Map<string, Cost>> {
    const files = this.findAllUserFile();

    const results = await Promise.all(
      files.map(async (file) => {
        const costs = await this.getCostsForFile(file, settings);
        return [file, costs] as [string, Cost];
      })
    );

    return new Map(results);
  }
}
