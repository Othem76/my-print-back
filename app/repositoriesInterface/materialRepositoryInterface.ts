import MaterialDto from "#models/material/dto/materialDto";
import Material from "#models/material/material";

export default interface MaterialRepositoryInterface {
  getAllMaterials(): Promise<Material[]>;
  getMaterialById(materialId: string): Promise<Material>;
  createMaterial(material: MaterialDto): Promise<Material>;
  updateMaterial(
    materialId: string,
    material: MaterialDto
  ): Promise<Material>;
  deleteMaterial(materialId: string): Promise<void>;
}
