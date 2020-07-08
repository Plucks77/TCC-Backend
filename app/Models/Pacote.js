"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Pacote extends Model {
  local() {
    return this.belongsTo("App/Models/Local");
  }
}

module.exports = Pacote;
