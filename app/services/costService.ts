import CuraService from "#services/curaService";
import * as fs from "node:fs";
import app from "@adonisjs/core/services/app";
import { FILE_UPLOAD_DIRECTORY } from "../utils/consts.js";
import { Cost } from "#models/cost/cost";
import { CostSetting } from "#interfaces/cost/costSetting";
import { PrintSetting } from "#interfaces/cost/printSettings";
import PrinterService from "./printerService.js";
import { inject } from "@adonisjs/core";

@inject()
export default class CostService {
  constructor(private readonly printerService: PrinterService) {}

  async calculateCosts(payloadList: PrintSetting[]): Promise<Map<string, Cost>> {
    const costs = new Map<string, Cost>();

    const promises = payloadList.map(async (payload) => {
      if (!payload.materialId) {
        throw new Error("Insert a material");
      }

      if (!payload.printerId) {
        throw new Error("Invalid printer");
      }

      if (payload.support === undefined) {
        throw new Error("Invalid support");
      }

      if (!payload.infill || payload.infill <= 0 || payload.infill > 100) {
        throw new Error("Invalid infill");
      }

      if (!payload.layerHeight || payload.layerHeight < 100 || payload.layerHeight > 200) {
        throw new Error("Invalid layer height");
      }

      const printer = await this.printerService.getPrinterById(payload.printerId);

      const cost = await this.getCostsForFile(payload.fileId, {
        fileId: payload.fileId,
        printer: printer,
        support: payload.support,
        material: printer.materials.find((m) => m.id === payload.materialId)!,
        layerHeight: payload.layerHeight / 100,
        infill: payload.infill / 100,
      });

      costs.set(payload.fileId, cost);
    });

    await Promise.all(promises);

    return costs;
  }

  private getMaterialCost(materialPrice: number, weight: number) {
    return (materialPrice * weight) / 1250;
  }

  private getElectricityCost(time: number, electricityCost: number) {
    return (time / 3600) * electricityCost;
  }

  private getTotalCost(
    materialCost: number,
    cleaningCost: number,
    electricityCost: number
  ) {
    return (
      Math.round((materialCost + cleaningCost + electricityCost) * 100) / 100
    );
  }

  private async getCostsForFile(
    filename: string,
    settings: CostSetting
  ): Promise<Cost> {
    const curaService = new CuraService();

    const fileBuffer = this.findUserFile(filename);
    const results = await curaService.slice(
      settings.printer.curaPrinterName,
      fileBuffer,
      settings.support,
      settings.layerHeight,
      settings.infill
    );

    const totalMaterialCost = this.getMaterialCost(
      settings.material.grammePrize,
      results.filamentUsage
    );

    const cleaningCost = settings.printer.cleaningCost;
    const electricityCost = this.getElectricityCost(results.printTime, settings.printer.impressingCost);

    const totalCost = this.getTotalCost(
      totalMaterialCost,
      cleaningCost,
      electricityCost
    );

    const printTimeInSeconds = results.printTime;
    const hours = Math.floor(printTimeInSeconds / 3600);
    const minutes = Math.floor((printTimeInSeconds % 3600) / 60);
    const printTime = `${hours}h ${minutes}m`;

    return {
      printTime,
      totalMaterialCost,
      cleaningCost,
      electricityCost,
      totalCost,
      materialId: settings.material.id,
      printerId: settings.printer.id,
    };
  }

  private findUserFile(filename: string) {
    return fs.readFileSync(app.makePath(`${FILE_UPLOAD_DIRECTORY}/${filename}`));
  }
}
