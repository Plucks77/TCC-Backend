"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class GuiaSchema extends Schema {
  up() {
    this.create("guias", (table) => {
      table.increments();
      table.string("name", 80).notNullable();
      table.string("description", 350).notNullable();
      table.string("tel", 20).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("guias");
  }
}

module.exports = GuiaSchema;
