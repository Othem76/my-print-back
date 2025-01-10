import ImpressingType from "#models/impressingType/impressingType";
import ImpressingTypeRepository from "#repositories/impressingTypeRepository";
import { inject } from "@adonisjs/core";

@inject()
export default class ImpressingTypeService {
  constructor(
    private readonly impressingTypeRepository: ImpressingTypeRepository
  ) {}

  async getAllImpressingTypes(): Promise<ImpressingType[]> {
    return await this.impressingTypeRepository.getAllImpressingTypes();
  }

  async getImpressingTypeById(
    impressingTypeId: number
  ): Promise<ImpressingType> {
    return await this.impressingTypeRepository.getImpressingTypeById(
      impressingTypeId
    );
  }

  async createImpressingType(type: string): Promise<ImpressingType> {
    return await this.impressingTypeRepository.createImpressingType(type);
  }

  async deleteImpressingType(impressingTypeId: number): Promise<void> {
    return await this.impressingTypeRepository.deleteImpressingType(
      impressingTypeId
    );
  }
}
