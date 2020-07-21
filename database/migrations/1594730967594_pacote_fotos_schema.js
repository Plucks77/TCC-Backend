"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PacoteFotosSchema extends Schema {
  up() {
    this.create("pacote_fotos", (table) => {
      table.increments();
      table.integer("pacote_id").unsigned().references("id").inTable("pacotes");
      table.string("image_url").notNullable();
      table.string("content_type").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("pacote_fotos");
  }
}

module.exports = PacoteFotosSchema;
