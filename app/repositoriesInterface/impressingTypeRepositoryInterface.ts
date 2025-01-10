import ImpressingTypePayload from "#models/impressingType/dto/impressingTypePayload";
import ImpressingType from "#models/impressingType/impressingType";

export default interface ImpressingTypeRepositoryInterface {
  getAllImpressingTypes(): Promise<ImpressingType[]>;
  getImpressingTypeById(impressingTypeId: number): Promise<ImpressingType>;
  createImpressingType(
    impressingTypePayload: ImpressingTypePayload
  ): Promise<ImpressingType>;
  deleteImpressingType(impressingTypeId: number): Promise<void>;
}
