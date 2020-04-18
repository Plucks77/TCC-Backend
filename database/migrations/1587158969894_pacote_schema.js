"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PacoteSchema extends Schema {
  up() {
    this.create("pacotes", (table) => {
      table.increments();
      table.string("name", 80).notNullable();
      table.string("description", 80).notNullable();
      table.string("price", 80).notNullable();
      table.string("date", 80).notNullable();
      table.integer("guia_id").unsigned().references("id").inTable("guias");
      table
        .integer("category_id")
        .unsigned()
        .references("id")
        .inTable("categories");
      table.timestamps();
    });
  }

  down() {
    this.drop("pacotes");
  }
}

module.exports = PacoteSchema;
