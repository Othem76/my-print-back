import { PrintSetting } from "#interfaces/cost/printSettings.js";
import CostService from "#services/costService";
import PrinterService from "#services/printerService";
import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";

@inject()
export default class CostController {
  constructor(private costService: CostService, private printerService: PrinterService) {}

  /**
   * @handle
   * @requestBody <PrintSetting>
   * @content application/json
   */
  async handle({ request, response }: HttpContext) {
    const payload: PrintSetting = request.body() as PrintSetting;

    // TODO : list material
    if (!payload.materialId) {
      return response.badRequest({ message: "Insert a material" });
    }

    if (!payload.printerId) {
      //TODO get printer by name
      return response.badRequest({ message: "Invalid printer" });
    }

    if (payload.support === undefined) {
      return response.badRequest({ message: "Invalid support" });
    }

    if (!payload.infill || payload.infill <= 0 || payload.infill > 100) {
      return response.badRequest({ message: "Invalid infill" });
    }

    if (
      !payload.layerHeight ||
      payload.layerHeight < 100 ||
      payload.layerHeight > 200
    ) {
      return response.badRequest({ message: "Invalid layer height" });
    }

    const printer = await this.printerService.getPrinterById(payload.printerId);

    const costs = await this.costService.getCosts({
      fileId: payload.fileId,
      printer: printer,
      support: payload.support,
      material: printer.materials.find((m) => m.id === payload.materialId)!,
      layerHeight: payload.layerHeight / 100,
      infill: payload.infill / 100,
    });

    return response.send(Object.fromEntries(costs));
  }
}
