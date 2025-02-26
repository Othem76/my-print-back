import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "material_printer";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('material_id').notNullable().references('id').inTable('material').onDelete('CASCADE')
      table.uuid('printer_id').notNullable().references('id').inTable('printer').onDelete('CASCADE')

      table.primary(['material_id', 'printer_id'])
    })
  }

  async down() {
    this.schema.dropTableIfExists(this.tableName);
  }
}
