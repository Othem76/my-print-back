import MaterialRepository from "#repositories/materialRepository";
import Material from "#models/material/material";
import { inject } from "@adonisjs/core";
import MaterialDto from "#models/material/dto/materialDto";

@inject()
export default class MaterialService {
  constructor(private readonly repository: MaterialRepository) {}

  async getAllMaterials(): Promise<Material[]> {
    return await this.repository.getAllMaterials();
  }

  async getMaterialById(materialId: string): Promise<Material> {
    return await this.repository.getMaterialById(materialId);
  }

  async createMaterial(material: MaterialDto): Promise<Material> {
    return await this.repository.createMaterial(material);
  }

  async updateMaterial(materialId: string, material: MaterialDto): Promise<Material> {
    return await this.repository.updateMaterial(materialId, material);
  }

  async deleteMaterial(materialId: string): Promise<void> {
    return await this.repository.deleteMaterial(materialId);
  }
}
