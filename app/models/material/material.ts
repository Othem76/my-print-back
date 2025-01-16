import { BaseModel, beforeCreate, column } from "@adonisjs/lucid/orm";
import { v4 as uuidv4 } from "uuid";

export default class Material extends BaseModel {
  public static table = 'material';

  @beforeCreate()
  public static async addUidHook(material: Material) {
    material.id = uuidv4();
  }

  @column({ isPrimary: true })
  declare id: string;

  @column()
  declare name: string;

  @column()
  declare grammePrize: number;

  @column()
  declare diameter: number;

  @column()
  declare type: string | null;
}
