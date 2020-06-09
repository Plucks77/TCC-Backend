"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AvaliacoesGuiasSchema extends Schema {
  up() {
    this.create("evaluations", (table) => {
      table.increments();
      table.integer("guia_id").unsigned().references("id").inTable("guias");
      table.string("description", 350).notNullable();
      table.integer("rating").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("evaluations");
  }
}

module.exports = AvaliacoesGuiasSchema;
