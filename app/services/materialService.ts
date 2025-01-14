import MaterialRepository from "#repositories/materialRepository";
import Material from "#models/material/material";
import { inject } from "@adonisjs/core";
import MaterialTypeRepository from "#repositories/impressingTypeRepository";
import { InvalidArgumentsException } from "@adonisjs/core/exceptions";

@inject()
export default class MaterialService {
  constructor(
    private readonly repository: MaterialRepository,
    private materialTypeRepository: MaterialTypeRepository
  ) {}

  async getAllMaterials(): Promise<Material[]> {
    return await this.repository.getAllMaterials();
  }

  async getMaterialById(materialId: number): Promise<Material> {
    return await this.repository.getMaterialById(materialId);
  }

  async getMaterialByMaterialTypeId(
    materialTypeId: number
  ): Promise<Material[]> {
    try {
      await this.materialTypeRepository.getMaterialTypeById(materialTypeId);
    } catch (error) {
      throw new InvalidArgumentsException(
        "The parameter must be an existing impressing type ID"
      );
    }

    const materials =
      await this.repository.getMaterialByImpressingTypeId(materialTypeId);

    if (!materials || materials.length === 0) {
      throw new InvalidArgumentsException(
        "No materials found for the given material type"
      );
    }

    return materials;
  }

  async deleteMaterial(materialId: number): Promise<void> {
    return await this.repository.deleteMaterial(materialId);
  }
}
