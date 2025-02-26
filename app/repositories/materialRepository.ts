import MaterialDto from "#models/material/dto/materialDto";
import Material from "#models/material/material";
import MaterialRepositoryInterface from "#repositoriesInterface/materialRepositoryInterface";

export default class MaterialRepository implements MaterialRepositoryInterface {
  async getAllMaterials(): Promise<Material[]> {
    return await Material.all();
  }

  async getMaterialById(materialId: string): Promise<Material> {
    return await Material.findOrFail(materialId);
  }

  async createMaterial(materialData: MaterialDto): Promise<Material> {
    const material: MaterialDto = { ...materialData };
    const result = await Material.create(material);

    if (materialData.printers) {
      await result.related('printers').sync(materialData.printers);
    }

    return result;
  }

  async updateMaterial(
    materialId: string,
    materialData: MaterialDto
  ): Promise<Material> {
    //const material: MaterialDto = { ...materialData };
    const result = await Material.updateOrCreate({ id: materialId }, materialData);

    if (materialData.printers) {
      await result.related('printers').sync(materialData.printers);
    }

    return result;
  }

  async deleteMaterial(materialId: string): Promise<void> {
    await Material.query().where({ id: materialId }).delete();
  }
}
