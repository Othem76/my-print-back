import { BaseModel, column } from "@adonisjs/lucid/orm";
import { DateTime } from "luxon";

export default class FileHistory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fileOriginalName: string

  @column()
  public fileServerName: string

  @column()
  public userId: number

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public uploadedAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null
}