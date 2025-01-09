import PostCostPayload from "#models/cost/dto/postCostPayload";
import { HttpContext } from "@adonisjs/core/http";

export default class CostController {
  async handle({ request, response }): Promise<HttpContext> {
    const payload: PostCostPayload = request.only([
      "material",
      "weight",
      "cleaningTime",
      "impressingTime",
      "power",
    ]);
    // TODO : list material
    if (!payload.material) {
      return response.badRequest({ message: "Insert a material" });
    }

    if (!payload.weight || payload.weight <= 0) {
      return response.badRequest({ message: "Invalid volume" });
    }

    if (
      !payload.cleaningTime ||
      payload.cleaningTime <= 0 ||
      !payload.impressingTime ||
      payload.impressingTime <= 0
    ) {
      return response.badRequest({ message: "Invalid time" });
    }

    if (!payload.power || payload.power <= 0) {
      return response.badRequest({ message: "Invalid power" });
    }

    const { default: CostService } = await import('#services/costService')

    const costService = new CostService();

    const materialCost = costService.getMaterialCost(
      payload.material,
      payload.weight
    );
    const cleaningCost = costService.getCleaningCost(payload.cleaningTime);
    const electricityCost = costService.getElectricityCost(
      payload.impressingTime,
      payload.power
    );
    const totalCost = costService.getTotalCost(
      materialCost,
      cleaningCost,
      electricityCost
    );

    return response.send({
      materialCost,
      cleaningCost,
      electricityCost,
      totalCost,
    });
  }
}
