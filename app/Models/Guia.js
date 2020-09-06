"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use("Hash");

class Guia extends Model {
  static get hidden() {
    return ["password"];
  }

  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook("beforeSave", async (guiaInstance) => {
      if (guiaInstance.dirty.password) {
        guiaInstance.password = await Hash.make(guiaInstance.password);
      }
    });
  }

  evaluations() {
    return this.hasMany("App/Models/Evaluation");
  }
}

module.exports = Guia;
