import MaterialTypeService from "#services/impressingTypeService";
import { HttpContext } from "@adonisjs/core/http";
import { inject } from "@adonisjs/core";

@inject()
export default class MaterialTypeController {
  constructor(private materialTypeService: MaterialTypeService) {}

  /**
   * @getAllMaterialTypes
   * @description Get all material types
   * @responseBody 200 - [{"id":51,"type":"Material Extrusion"},{"id":50,"type":"Powder Bed Fusion"},{"id":49,"type":"Vat Photopolymerization"},{"id":48,"type":"Directed Energy Deposition"}]
   * @responseBody 404 - { "errors": [ { "message": "Material types not found" } ] }
   */
  async getAllMaterialTypes({ response }: HttpContext) {
    const materialTypes = await this.materialTypeService.getAllMaterialTypes();
    return response.send(materialTypes);
  }

  /**
   * @getMaterialTypeById
   * @description Get a material type by ID
   * @responseBody 200 - {"id":19,"type":"SDD"}
   * @responseBody 400 - { "errors": [ { "message": "Material type ID is required" } ] }
   * @responseBody 404 - { "errors": [ { "message": "Material type not found" } ] }
   */
  async getMaterialTypeById({ params, response }: HttpContext) {
    const materialTypeId: number = params.id;
    if (!materialTypeId) {
      return response
        .status(400)
        .send({ error: "Material type ID is required" });
    }

    try {
      const materialType =
        await this.materialTypeService.getMaterialTypeById(materialTypeId);
      return response.send(materialType);
    } catch (error) {
      return response.status(404).send({ error: "Material type not found" });
    }
  }

  /**
   * @createMaterialType
   * @description Create a material type
   * @requestBody {"type":"SDD"}
   * @responseBody 200 - {"id":19,"type":"SDD"}
   * @responseBody 400 - { "errors": [ { "message": "Material type is required" } ] }
   * @responseBody 400 - { "errors": [ { "message": "Material type already exists" } ] }
   */
  async createMaterialType({ request, response }: HttpContext) {
    const materialTypeParam = request.only(["type"]);
    if (!materialTypeParam) {
      return response.status(400).send({ error: "Material type is required" });
    }

    try {
      const materialType = await this.materialTypeService.createMaterialType(
        materialTypeParam.type
      );
      return response.send(materialType);
    } catch (error) {
      return response.status(400).send({ error: error.message });
    }
  }

  /**
   * @deleteMaterialType
   * @description Delete a material type by ID
   * @responseBody 200 - {"id":19,"type":"SDD"}
   * @responseBody 400 - { "errors": [ { "message": "Material type ID is required" } ] }
   * @responseBody 404 - { "errors": [ { "message": "Material type not found" } ] }
   */
  async deleteMaterialType({ params, response }: HttpContext) {
    const materialTypeId: number = params.id;

    if (!materialTypeId) {
      return response
        .status(400)
        .send({ error: "Material type ID is required" });
    }

    try {
      const materialType =
        await this.materialTypeService.getMaterialTypeById(materialTypeId);
      await this.materialTypeService.deleteMaterialType(materialTypeId);
      return response.send(materialType);
    } catch (error) {
      return response.status(404).send({ error: error.message });
    }
  }
}
