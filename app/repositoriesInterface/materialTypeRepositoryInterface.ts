import MaterialType from "#models/materialType/materialType";
import MaterialTypePayload from "#interfaces/materialType/materialTypePayload";

export default interface MaterialTypeRepositoryInterface {
  getAllMaterialTypes(): Promise<MaterialType[]>;
  getMaterialTypeById(materialTypeId: number): Promise<MaterialType>;
  createMaterialType(
    materialTypePayload: MaterialTypePayload
  ): Promise<MaterialType>;
  deleteMaterialType(materialTypeId: number): Promise<void>;
}
