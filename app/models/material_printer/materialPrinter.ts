import { BaseModel, column } from "@adonisjs/lucid/orm";

export default class MaterialPrinter extends BaseModel {
  public static table = 'material_printer';

  @column()
  declare materialId: string;

  @column()
  declare printerId: string;
}
