"use strict";
const Local = use("App/Models/Local");

class LocalController {
  async list({ response }) {
    const locals = await Local.all();

    return response.send(locals);
  }

  async filtered({ request, response }) {
    try {
      const locals = await Local.query()
        .where("city_id", "=", request.params.id)
        .fetch();

      return response.send(locals);
    } catch (e) {
      return response.status(404).send(e.message);
    }
  }

  async show({ request, response }) {
    const local = await Local.find(request.params.id);

    return response.send(local);
  }
}

module.exports = LocalController;
