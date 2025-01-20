import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "material";

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid("id").primary();
      table.string("name").notNullable();
      table.float("gramme_prize").notNullable();
      table.float("diameter").notNullable();
      table.string("type").nullable();
    });
  }

  async down() {
    this.schema.dropTableIfExists(this.tableName);
  }
}
