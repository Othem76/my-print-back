import { BaseModel, beforeCreate, column } from "@adonisjs/lucid/orm";
import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";

export default class FileHistory extends BaseModel {

  @beforeCreate()
  public static async addUidHook(fileHistory: FileHistory) {
    fileHistory.id = uuidv4();
  }

  @column({ isPrimary: true })
  public id!: string

  @column()
  public fileOriginalName!: string

  @column()
  public fileServerName!: string

  @column()
  public userId!: string

  @column()
  public status!: string

  @column.dateTime({ autoCreate: true })
  public uploadedAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime | null
}
