import {PostCostPayload} from "#models/cost/dto/postCostPayload";
import CostService from "#services/costService";
import { HttpContext } from "@adonisjs/core/http";
import CuraService from "#services/curaService.js";
import {existsSync} from "node:fs";
import app from "@adonisjs/core/services/app";
import {FILE_UPLOAD_DIRECTORY} from "../../utils/consts.js";

export default class CostController {
  handle({ request, response }): Promise<HttpContext> {
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
      return response.badRequest({ message: "Invalid power" });
    }

    if (!payload.density || payload.density <= 0 || payload.density > 1) {
      return response.badRequest({ message: "Invalid power" });
    }

    if (!existsSync(`${app.makePath(FILE_UPLOAD_DIRECTORY)}/${payload.filename}`)) {
      return response.badRequest({ message: "File does not exist" });
    }

    const costService = new CostService();
    const costs = costService.getCosts(payload.filename,  {
      printer: payload.printer,
      density: payload.density,
      support: payload.support,
      material: payload.material
    });


    return response.send(costs);
  }
}
