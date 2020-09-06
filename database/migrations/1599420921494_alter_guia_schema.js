"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AlterGuiaSchema extends Schema {
  up() {
    this.table("guias", (table) => {
      // alter table
      table.string("password", 60).defaultTo(null);
      table.string("email", 60).defaultTo(null).unique();
    });
  }

  down() {
    this.table("guias", (table) => {
      // reverse alternations
      table.dropColumn("password");
      table.dropColumn("email");
    });
  }
}

module.exports = AlterGuiaSchema;
