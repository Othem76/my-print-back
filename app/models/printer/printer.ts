import { BaseModel, column } from "@adonisjs/lucid/orm";

export default class Printer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string | null;

  @column()
  declare supportedImpressingType: number;

  @column()
  declare curaPrinterName: string | null;

  @column()
  declare plateSize: string | null;

  @column()
  declare cleaningCost: number;

  @column()
  declare impressingCost: number;
}
