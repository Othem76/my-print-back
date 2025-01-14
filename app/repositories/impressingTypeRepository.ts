import MaterialTypePayload from "#interfaces/materialType/materialTypePayload";
import MaterialType from "#models/materialType/materialType";
import MaterialTypeRepositoryInterface from "#repositoriesInterface/materialTypeRepositoryInterface";

export default class MaterialTypeRepository
  implements MaterialTypeRepositoryInterface
{
  async getAllMaterialTypes(): Promise<MaterialType[]> {
    return await MaterialType.all();
  }
  async getMaterialTypeById(materialTypeId: number): Promise<MaterialType> {
    return await MaterialType.findOrFail(materialTypeId);
  }
  async createMaterialType(
    materialTypePayload: MaterialTypePayload
  ): Promise<MaterialType> {
    const materialTypeObj = await MaterialType.create(materialTypePayload);
    return materialTypeObj;
  }
  async deleteMaterialType(materialTypeId: number): Promise<void> {
    await MaterialType.query().where({ id: materialTypeId }).delete();
  }
}
