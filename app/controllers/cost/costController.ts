import { PrintSetting } from "#interfaces/cost/printSettings.js";
import { Cost } from "#models/cost/cost";
import CostService from "#services/costService";
import PrinterService from "#services/printerService";
import { inject } from "@adonisjs/core";
import { HttpContext, Response } from "@adonisjs/core/http";

@inject()
export default class CostController {
  constructor(private costService: CostService, private printerService: PrinterService) {}

  /**
   * @handle
   * @requestBody <PrintSetting>
   * @content application/json
   */
  async handle({ request, response }: HttpContext) {
    const payloadList: PrintSetting[] = request.body() as PrintSetting[];

    try {
      const costs = await this.calculateCosts(payloadList);
      return response.send(Object.fromEntries(costs));
    } catch (error) {
      return response.badRequest({ message: error.message });
    }
  }

  private async calculateCosts(payloadList: PrintSetting[]): Promise<Map<string, Cost>> {
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

      const cost = await this.costService.getCostsForFile(payload.fileId, {
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
}
