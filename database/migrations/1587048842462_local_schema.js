"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LocalSchema extends Schema {
  up() {
    this.create("locals", (table) => {
      table.increments();
      table.integer("city_id").unsigned().references("id").inTable("cities");
      table.string("name").notNullable();
      table.string("description").notNullable();
      table.string("image_url").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("locals");
  }
}

module.exports = LocalSchema;
