"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Guia extends Model {
  evaluations() {
    return this.hasMany("App/Models/Evaluation");
  }
}

module.exports = Guia;
