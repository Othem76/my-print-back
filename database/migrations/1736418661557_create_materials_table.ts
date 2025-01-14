import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "materials";

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("name").nullable();
      table.string("cura_material_id").nullable();
      table.float("gramme_prize").notNullable();
      table.float("diameter").nullable();
      table.string("color").nullable();
      table.integer("type").notNullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
