import MaterialService from "#services/materialService";
import Material from "#models/material/material";
import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";
import MaterialDto from "#models/material/dto/materialDto";

@inject()
export default class MaterialController {
  constructor(private readonly service: MaterialService) {}

  /**
   * @getAllMaterials
   * @description Get all materials
   * @responseBody 200 - [{"id":3,"name":"PETG","curaPrinterName":"PETG","grammePrize":35,"diameter":1.75,"color":"transparent"},{"id":2,"name":"ABS","curaPrinterName":"ABS","grammePrize":30,"diameter":1.75,"color":"black"}]
   * @responseBody 404 - { "errors": [ { "message": "Printers not found" } ] }
   */
  async getAllMaterials({ response }: HttpContext) {
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
  async getMaterialById({ params, response }: HttpContext) {
    const materialId: string = params.id;
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
   * @createMaterial
   * @description Create a material
   * @responseBody 200 - {"id":2,"name":"ABS","curaPrinterName":"ABS","grammePrize":30,"diameter":1.75,"color":"black"}
   * @responseBody 400 - { "errors": [ { "message": "Material ID is required" } ] }
   * @responseBody 404 - { "errors": [ { "message": "Material not found" } ] }
   */
  async createMaterial({ request, response }: HttpContext) {
    const material = request.body() as MaterialDto;

    try {
      const newMaterial = await this.service.createMaterial(material);
      return response.send(newMaterial);
    } catch (error) {
      console.log(error);
      return response.status(404).send({ error: "Material not found" });
    }
  }

  /**
   * @updateMaterial
   * @description Update a material by ID
   * @responseBody 200 - {"id":2,"name":"ABS","curaPrinterName":"ABS","grammePrize":30,"diameter":1.75,"color":"black"}
   * @responseBody 400 - { "errors": [ { "message": "Printer ID is required" } ] }
   * @responseBody 404 - { "errors": [ { "message": "Printer not found" } ] }
   */
  async updateMaterial({ params, request, response }: HttpContext) {
    const materialId: string = params.id;
    const material = request.body() as MaterialDto;

    if (!materialId) {
      return response.status(400).send({ error: "Material ID is required" });
    }

    try {
      const updatedMaterial = await this.service.updateMaterial(materialId, material);
      return response.send(updatedMaterial);
    } catch (error) {
      return response.status(404).send({ error: "Material not found" });
    }
  }

  /**
   * @deleteMaterial
   * @description Delete a material by ID
   * @responseBody 200 - {"id":2,"name":"ABS","curaPrinterName":"ABS","grammePrize":30,"diameter":1.75,"color":"black"}
   * @responseBody 400 - { "errors": [ { "message": "Printer ID is required" } ] }
   * @responseBody 404 - { "errors": [ { "message": "Printer not found" } ] }
   */
  async deleteMaterial({ params, response }: HttpContext) {
    const materialId: string = params.id;

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
