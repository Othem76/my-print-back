import CreateMaterialPayload from "#models/material/dto/createMaterialPayload";
import UpdateMaterialPayload from "#models/material/dto/updateMaterialPayload";
import Material from "#models/material/material";
import MaterialRepositoryInterface from "#repositoriesInterface/materialRepositoryInterface";

export default class MaterialRepository implements MaterialRepositoryInterface {
  async getAllMaterials(): Promise<Material[]> {
    return await Material.all();
  }

  async getMaterialById(materialId: number): Promise<Material> {
    return await Material.findOrFail(materialId);
  }

  async getMaterialByImpressingTypeId(
    materialTypeId: number
  ): Promise<Material[]> {
    return await Material.query().where({ type: materialTypeId });
  }

  createMaterial(material: CreateMaterialPayload): Promise<Material> {
    throw new Error("Method not implemented.");
  }

  updateMaterial(
    materialId: number,
    material: UpdateMaterialPayload
  ): Promise<Material> {
    throw new Error("Method not implemented.");
  }

  async deleteMaterial(materialId: number): Promise<void> {
    await Material.query().where({ id: materialId }).delete();
  }
}
