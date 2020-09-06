"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PurchasesSchema extends Schema {
  up() {
    this.create("purchases", (table) => {
      table.increments();
      table.integer("user_id").unsigned().references("id").inTable("users");
      table.integer("pacote_id").unsigned().references("id").inTable("pacotes");
      table.boolean("confirmed").defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop("purchases");
  }
}

module.exports = PurchasesSchema;
