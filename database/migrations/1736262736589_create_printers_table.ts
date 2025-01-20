import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "printer";

  async up() {
    await this.db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    this.schema.createTable(this.tableName, (table) => {
      table.uuid("id").primary();
      table.string("name").notNullable();
      table.string("cura_printer_name").nullable();
      table.float("width").notNullable();
      table.float("length").notNullable();
      table.float("height").notNullable();
      table.integer("cleaning_cost").notNullable();
      table.float("impressing_cost").notNullable();
    });
  }

  async down() {
    await this.db.raw('DROP EXTENSION IF EXISTS "uuid-ossp";');
    this.schema.dropTableIfExists(this.tableName);
  }
}
