import { PrintSetting } from "#interfaces/cost/printSettings.js";
import CostService from "#services/costService";
import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";

@inject()
export default class CostController {
  constructor(private costService: CostService) {}

  /**
   * @handle
   * @requestBody <PrintSetting>
   * @content application/json
   */
  async handle({ request, response }: HttpContext) {
    const payloadList: PrintSetting[] = request.body() as PrintSetting[];

    try {
      const costs = await this.costService.calculateCosts(payloadList);
      return response.send(Object.fromEntries(costs));
    } catch (error) {
      return response.badRequest({ message: error.message });
    }
  }
}
