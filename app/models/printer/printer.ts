import Material from "#models/material/material";
import { BaseModel, beforeCreate, column, manyToMany } from "@adonisjs/lucid/orm";
import type { ManyToMany } from "@adonisjs/lucid/types/relations";
import { v4 as uuidv4 } from "uuid";

export default class Printer extends BaseModel {
  public static table = 'printer';

  @beforeCreate()
  public static async addUidHook(printer: Printer) {
    printer.id = uuidv4();
  }

  @column({ isPrimary: true })
  declare id: string;

  @column()
  declare name: string;

  @column()
  declare curaPrinterName: string | null;

  @column()
  declare width: number;

  @column()
  declare length: number;

  @column()
  declare height: number;

  @column()
  declare cleaningCost: number;

  @column()
  declare impressingCost: number;

  @manyToMany(() => Material)
  declare materials: ManyToMany<typeof Material>;
}
