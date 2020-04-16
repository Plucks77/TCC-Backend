"use strict";

const Guia = use("App/Models/Guia");

class GuiaController {
  async register({ request, response }) {
    const { name, description, tel } = request.body;

    try {
      const guia = await Guia.create({ name, description, tel });

      return response.send({ guia });
    } catch (e) {
      return response.status(406).send({ erro: e });
    }
  }

  async edit({ request, response }) {
    const guia = await Guia.find(request.params.id);

    if (!guia) {
      return response.status(401).send({ message: "Guia não encontrado!" });
    }

    const { name, description, tel } = request.body;

    guia.name = name;
    guia.description = description;
    guia.tel = tel;

    try {
      await guia.save();

      return response.send(guia);
    } catch (e) {
      return response.status(404).send({ erro: e });
    }
  }

  async delete({ request, response }) {
    const guia = await Guia.find(request.params.id);

    if (!guia) {
      return response.status(401).send({ message: "Guia não encontrado!" });
    }

    try {
      await guia.delete();

      return response.send({ message: "Guia excluído com sucesso!" });
    } catch (e) {
      return response.status(404).send({ erro: e });
    }
  }

  async evaluations({ request, response }) {
    const guia = await Guia.find(request.params.id);

    const eva = await guia.evaluations().fetch();

    response.send(eva);
  }

  async show({ response }) {
    const guias = await Guia.all();

    response.send(guias);
  }
}

module.exports = GuiaController;
