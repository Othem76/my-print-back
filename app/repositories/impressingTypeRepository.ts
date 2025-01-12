import ImpressingTypePayload from "#interfaces/impressingType/impressingTypePayload";
import ImpressingType from "#models/impressingType/impressingType";
import ImpressingTypeRepositoryInterface from "#repositoriesInterface/impressingTypeRepositoryInterface";

export default class ImpressingTypeRepository
  implements ImpressingTypeRepositoryInterface
{
  async getAllImpressingTypes(): Promise<ImpressingType[]> {
    return await ImpressingType.all();
  }
  async getImpressingTypeById(
    impressingTypeId: number
  ): Promise<ImpressingType> {
    return await ImpressingType.findOrFail(impressingTypeId);
  }
  async createImpressingType(
    impressingTypePayload: ImpressingTypePayload
  ): Promise<ImpressingType> {
    const impressingTypeObj = await ImpressingType.create(
      impressingTypePayload
    );
    return impressingTypeObj;
  }
  async deleteImpressingType(impressingTypeId: number): Promise<void> {
    await ImpressingType.query()
      .where({ impressingTypeId: impressingTypeId })
      .delete();
  }
}
