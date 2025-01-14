import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "printers";

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").notNullable();
      table.string("name").nullable();
      table.string("cura_printer_name").nullable();
      table.string("plate_size").nullable();
      table.integer("cleaning_cost").notNullable();
      table.float("impressing_cost").notNullable();
      table.integer("material_type").notNullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
