import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "material_printer";

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid("id").primary();
      table.uuid("material_id").notNullable();
      table.uuid("printer_id").notNullable();

      table.foreign("material_id").references("material.id").onDelete("CASCADE");
      table.foreign("printer_id").references("printer.id").onDelete("CASCADE");
    });
  }

  async down() {
    this.schema.dropTableIfExists(this.tableName);
  }
}
