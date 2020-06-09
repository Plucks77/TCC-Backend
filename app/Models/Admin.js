"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use("Hash");

class Admin extends Model {
  static get hidden() {
    return ["password"];
  }

  static boot() {
    super.boot();

    this.addHook("beforeSave", async (adminInstance) => {
      if (adminInstance.dirty.password) {
        adminInstance.password = await Hash.make(adminInstance.password);
      }
    });
  }
}

module.exports = Admin;
