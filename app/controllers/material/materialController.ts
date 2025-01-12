import MaterialService from "#services/materialService";
import Material from "#models/material/material";
import { inject } from "@adonisjs/core";

@inject()
export default class MaterialController {
  constructor(private readonly service: MaterialService) {}

  /**
   * @getAllMaterials
   * @description Get all materials
   * @responseBody 200 - [{"id":3,"name":"PETG","curaPrinterName":"PETG","grammePrize":35,"diameter":1.75,"color":"transparent"},{"id":2,"name":"ABS","curaPrinterName":"ABS","grammePrize":30,"diameter":1.75,"color":"black"}]
   * @responseBody 404 - { "errors": [ { "message": "Printers not found" } ] }
   */
  async getAllMaterials({ response }) {
    try {
      const materials: Material[] = await this.service.getAllMaterials();
      return response.send(materials);
    } catch (error) {
      return response.status(404).send({ error: "Materials not found" });
    }
  }

  /**
   * @getMaterialById
   * @description Get a material by ID
   * @responseBody 200 - {"id":2,"name":"ABS","curaPrinterName":"ABS","grammePrize":30,"diameter":1.75,"color":"black"}
   * @responseBody 400 - { "errors": [ { "message": "Printer ID is required" } ] }
   * @responseBody 404 - { "errors": [ { "message": "Printer not found" } ] }
   */
  async getMaterialById({ params, response }) {
    const materialId = params.id;
    if (!materialId) {
      return response.status(400).send({ error: "Material ID is required" });
    }

    try {
      const material = await this.service.getMaterialById(materialId);
      return response.send(material);
    } catch (error) {
      return response.status(404).send({ error: "Material not found" });
    }
  }

  /**
   * @getMaterialByImpressingTypeId
   * @description Get a material by impressing type ID
   * @responseBody 200 - [{"id":1,"name":"ABS X130 apple green","curaPrinterName":"ABS X130 apple green","grammePrize":0.2245,"diameter":1.75,"color":"apple green","impressingType":1},{"id":1,"name":"ABS X130 apple green","curaPrinterName":"ABS X130 apple green","grammePrize":0.2245,"diameter":1.75,"color":"apple green","impressingType":1}]
   * @responseBody 400 - { "errors": [ { "message": "Impressing type ID is required" } ] }
   * @responseBody 404 - { "errors": [ { "message": "No materials found for the given impressing type" } ] }
   * @responseBody 404 - { "errors": [ { "message": "The parameter must be an existing impressing type ID" } ] }
   */
  async getMaterialByImpressingTypeId({ params, response }) {
    const impressingTypeId = params.id;
    if (!impressingTypeId) {
      return response
        .status(400)
        .send({ error: "Impressing type ID is required" });
    }

    try {
      const materials =
        await this.service.getMaterialByImpressingTypeId(impressingTypeId);
      return response.send(materials);
    } catch (error) {
      return response.status(404).send({ error: error.message });
    }
  }

  /**
   * @deleteMaterial
   * @description Delete a material by ID
   * @responseBody 200 - {"id":2,"name":"ABS","curaPrinterName":"ABS","grammePrize":30,"diameter":1.75,"color":"black"}
   * @responseBody 400 - { "errors": [ { "message": "Printer ID is required" } ] }
   * @responseBody 404 - { "errors": [ { "message": "Printer not found" } ] }
   */
  async deleteMaterial({ params, response }) {
    const materialId = params.id;

    if (!materialId) {
      return response.status(400).send({ error: "Material ID is required" });
    }

    try {
      const material = await this.service.getMaterialById(materialId);
      await this.service.deleteMaterial(materialId);
      return response.send(material);
    } catch (error) {
      return response.status(404).send({ error: "Material not found" });
    }
  }
}
