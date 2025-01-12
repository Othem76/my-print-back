import MaterialRepository from "#repositories/materialRepository";
import Material from "#models/material/material";
import { inject } from "@adonisjs/core";
import ImpressingTypeRepository from "#repositories/impressingTypeRepository";
import { InvalidArgumentsException } from "@adonisjs/core/exceptions";
import ImpressingType from "#models/impressingType/impressingType";
import { isUndefined } from "util";
import { isEmptyObject, isNull } from "@sindresorhus/is";

@inject()
export default class MaterialService {
  constructor(
    private readonly repository: MaterialRepository,
    private impressingTypeRepository: ImpressingTypeRepository
  ) {}

  async getAllMaterials(): Promise<Material[]> {
    return await this.repository.getAllMaterials();
  }

  async getMaterialById(materialId: number): Promise<Material> {
    return await this.repository.getMaterialById(materialId);
  }

  async getMaterialByImpressingTypeId(
    impressingTypeId: number
  ): Promise<Material[]> {
    try {
      await this.impressingTypeRepository.getImpressingTypeById(
        impressingTypeId
      );
    } catch (error) {
      throw new InvalidArgumentsException(
        "The parameter must be an existing impressing type ID"
      );
    }

    const materials =
      await this.repository.getMaterialByImpressingTypeId(impressingTypeId);

    if (!materials || materials.length === 0) {
      throw new InvalidArgumentsException(
        "No materials found for the given impressing type"
      );
    }

    return materials;
  }

  async deleteMaterial(materialId: number): Promise<void> {
    return await this.repository.deleteMaterial(materialId);
  }
}
