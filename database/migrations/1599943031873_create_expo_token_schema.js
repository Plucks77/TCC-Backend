"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AlterGuiaSchema extends Schema {
  up() {
    this.table("guias", (table) => {
      // alter table
      table.string("expoToken", 45).defaultTo(null);
    });
  }

  down() {
    this.table("guias", (table) => {
      // reverse alternations
      table.dropColumn("expoToken");
    });
  }
}

module.exports = AlterGuiaSchema;
