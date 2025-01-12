import ImpressingTypeService from "#services/impressingTypeService";
import { HttpContext } from "@adonisjs/core/http";
import { inject } from "@adonisjs/core";

@inject()
export default class ImpressingTypeController {
  constructor(private impressingTypeService: ImpressingTypeService) {}

  /**
   * @getAllImpressingTypes
   * @description Get all impressing types
   * @responseBody 200 - [{"id":51,"type":"Material Extrusion"},{"id":50,"type":"Powder Bed Fusion"},{"id":49,"type":"Vat Photopolymerization"},{"id":48,"type":"Directed Energy Deposition"}]
   * @responseBody 404 - { "errors": [ { "message": "Impressing types not found" } ] }
   */
  async getAllImpressingTypes({ response }): Promise<HttpContext> {
    const impressingTypes =
      await this.impressingTypeService.getAllImpressingTypes();
    return response.send(impressingTypes);
  }

  /**
   * @getImpressingTypeById
   * @description Get a impressing type by ID
   * @responseBody 200 - {"id":19,"type":"SDD"}
   * @responseBody 400 - { "errors": [ { "message": "Impressing type ID is required" } ] }
   * @responseBody 404 - { "errors": [ { "message": "Impressing type not found" } ] }
   */
  async getImpressingTypeById({ params, response }): Promise<HttpContext> {
    const impressingTypeId = params.id;
    if (!impressingTypeId) {
      return response
        .status(400)
        .send({ error: "Impressing type ID is required" });
    }

    try {
      const impressingType =
        await this.impressingTypeService.getImpressingTypeById(
          impressingTypeId
        );
      return response.send(impressingType);
    } catch (error) {
      return response.status(404).send({ error: "Impressing type not found" });
    }
  }

  /**
   * @createImpressingType
   * @description Create a impressing type
   * @requestBody {"type":"SDD"}
   * @responseBody 200 - {"id":19,"type":"SDD"}
   * @responseBody 400 - { "errors": [ { "message": "Impressing type is required" } ] }
   * @responseBody 400 - { "errors": [ { "message": "Impressing type already exists" } ] }
   */
  async createImpressingType({ request, response }): Promise<HttpContext> {
    const type = request.only(["type"]);
    if (!type) {
      return response
        .status(400)
        .send({ error: "Impressing type is required" });
    }

    try {
      const impressingType =
        await this.impressingTypeService.createImpressingType(type);
      return response.send(impressingType);
    } catch (error) {
      return response.status(400).send({ error: error.message });
    }
  }

  /**
   * @deleteImpressingType
   * @description Delete a impressing type by ID
   * @responseBody 200 - {"id":19,"type":"SDD"}
   * @responseBody 400 - { "errors": [ { "message": "Impressing type ID is required" } ] }
   * @responseBody 404 - { "errors": [ { "message": "Impressing type not found" } ] }
   */
  async deleteImpressingType({ params, response }): Promise<HttpContext> {
    const impressingTypeId = params.id;

    if (!impressingTypeId) {
      return response
        .status(400)
        .send({ error: "Impressing type ID is required" });
    }

    try {
      const impressingType =
        await this.impressingTypeService.getImpressingTypeById(
          impressingTypeId
        );
      await this.impressingTypeService.deleteImpressingType(impressingTypeId);
      return response.send(impressingType);
    } catch (error) {
      return response.status(404).send({ error: error.message });
    }
  }
}
