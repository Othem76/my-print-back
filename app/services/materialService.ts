import MaterialRepository from "#repositories/materialRepository";
import Material from "#models/material/material";
import { inject } from "@adonisjs/core";

@inject()
export default class MaterialService {
  constructor(private readonly repository: MaterialRepository) {}

  async getAllMaterials(): Promise<Material[]> {
    return await this.repository.getAllMaterials();
  }

  async getMaterialById(materialId: number): Promise<Material> {
    return await this.repository.getMaterialById(materialId);
  }

  async deleteMaterial(materialId: number): Promise<void> {
    return await this.repository.deleteMaterial(materialId);
  }
}
