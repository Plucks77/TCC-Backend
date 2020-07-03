"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CitySchema extends Schema {
  up() {
    this.create("cities", (table) => {
      table.increments();
      table.string("name").notNullable();
      table.string("description").notNullable();
      table.string("image_url").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("cities");
  }
}

module.exports = CitySchema;
