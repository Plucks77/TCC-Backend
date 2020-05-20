"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ForgotPasswordSchema extends Schema {
  up() {
    this.create("forgot_passwords", (table) => {
      table.increments();
      table.integer("user_id").unsigned().references("id").inTable("users");
      table.string("token", 80).notNullable().unique();
      table.timestamps();
    });
  }

  down() {
    this.drop("forgot_passwords");
  }
}

module.exports = ForgotPasswordSchema;
