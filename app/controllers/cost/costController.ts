import { PostCostPayload } from "#models/cost/dto/postCostPayload";
import CostService from "#services/costService";
import { HttpContext } from "@adonisjs/core/http";

export default class CostController {
  public async handle({ request, response }): Promise<HttpContext> {
    const payload: PostCostPayload = request.only([
      "material",
      "printer",
      "support",
      "layerHeight",
      "infill",
    ]);

    // TODO : list material
    if (!payload.material) {
      return response.badRequest({ message: "Insert a material" });
    }

    if (!payload.printer) {
      //TODO get printer by name
      return response.badRequest({ message: "Invalid printer" });
    }

    if (payload.support === undefined) {
      return response.badRequest({ message: "Invalid support" });
    }

    if (!payload.infill || payload.infill <= 0 || payload.infill > 1) {
      return response.badRequest({ message: "Invalid power" });
    }

    if (
      !payload.layerHeight ||
      payload.layerHeight <= 0 ||
      payload.layerHeight > 1
    ) {
      return response.badRequest({ message: "Invalid layer height" });
    }

    const costService = new CostService();
    const costs = await costService.getCosts({
      printer: payload.printer,
      support: payload.support,
      material: payload.material,
      layerHeight: payload.layerHeight,
      infill: payload.infill,
    });

    return response.send(Object.fromEntries(costs));
  }
}
