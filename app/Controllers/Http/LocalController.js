"use strict";
const Local = use("App/Models/Local");

class LocalController {
  async list({ response }) {
    const locals = await Local.all();

    return response.send(locals);
  }
}

module.exports = LocalController;
