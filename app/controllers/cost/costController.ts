import {PostCostPayload} from "#models/cost/dto/postCostPayload";
import CostService from "#services/costService";
import { HttpContext } from "@adonisjs/core/http";

export default class CostController {
  public handle({ request, response }): Promise<HttpContext> {
    const payload: PostCostPayload = request.only([
      "material",
      "printer",
      "support",
      "density"
    ]);

    // TODO : list material
    if (!payload.material) {
      return response.badRequest({ message: "Insert a material" });
    }

    if (!payload.printer ) { //TODO get printer by name
      return response.badRequest({ message: "Invalid printer" });
    }

    if (payload.support === undefined) {
      return response.badRequest({ message: "Invalid support" });
    }

    if (!payload.density || payload.density <= 0 || payload.density > 1) {
      return response.badRequest({ message: "Invalid power" });
    }


    const costService = new CostService();
    const costs = costService.getCosts(  {
      printer: payload.printer,
      density: payload.density,
      support: payload.support,
      material: payload.material
    });


    return response.send(costs);
  }
}
