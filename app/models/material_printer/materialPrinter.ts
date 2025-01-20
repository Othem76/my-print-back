import { BaseModel, beforeCreate, column } from "@adonisjs/lucid/orm";
import { v4 as uuidv4 } from "uuid";

export default class MaterialPrinter extends BaseModel {
  public static table = 'material_printer';

  @beforeCreate()
  public static async addUidHook(materialPrinter: MaterialPrinter) {
    materialPrinter.id = uuidv4();
  }

  @column({ isPrimary: true })
  declare id: string;

  @column()
  declare materialId: string;

  @column()
  declare printerId: string;
}
