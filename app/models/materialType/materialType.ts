import { BaseModel, column } from "@adonisjs/lucid/orm";

export default class MaterialType extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare type: string;
}
