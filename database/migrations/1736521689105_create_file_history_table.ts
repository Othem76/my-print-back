import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'file_histories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('file_original_name').notNullable()
      table.string('file_server_name').notNullable().unique()
      table.uuid('user_id').notNullable()
      table.string('status').notNullable()

      table.timestamp('uploaded_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
