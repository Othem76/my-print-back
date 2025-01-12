import { BaseModel, column } from "@adonisjs/lucid/orm";

export default class Material extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string | null;

  @column()
  declare impressingType: number;

  @column()
  declare curaMaterialId: string | null;

  @column()
  declare grammePrize: number;

  @column()
  declare diameter: number | null;

  @column()
  declare color: string | null;
}
