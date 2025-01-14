import MaterialType from "#models/materialType/materialType";
import MaterialTypeRepository from "#repositories/impressingTypeRepository";
import { inject } from "@adonisjs/core";

@inject()
export default class MaterialTypeService {
  constructor(
    private readonly materialTypeRepository: MaterialTypeRepository
  ) {}

  async getAllMaterialTypes(): Promise<MaterialType[]> {
    return await this.materialTypeRepository.getAllMaterialTypes();
  }

  async getMaterialTypeById(materialTypeId: number): Promise<MaterialType> {
    return await this.materialTypeRepository.getMaterialTypeById(
      materialTypeId
    );
  }

  async createMaterialType(type: string): Promise<MaterialType> {
    return await this.materialTypeRepository.createMaterialType({ type });
  }

  async deleteMaterialType(materialTypeId: number): Promise<void> {
    return await this.materialTypeRepository.deleteMaterialType(materialTypeId);
  }
}
