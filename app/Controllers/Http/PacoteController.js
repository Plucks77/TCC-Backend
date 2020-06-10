"use strict";
const Pacote = use("App/Models/Pacote");

class PacoteController {
  async create({ request, response }) {
    const {
      category_id,
      guia_id,
      name,
      description,
      price,
      date,
    } = request.body;

    try {
      const pacote = await Pacote.create({
        category_id,
        guia_id,
        name,
        description,
        price,
        date,
      });

      return response.send({ pacote });
    } catch (e) {
      return response.status(406).send({ erro: e });
    }
  }

  async edit({ request, response }) {
    const pacote = await Pacote.find(request.params.id);

    if (!pacote) {
      return response.status(401).send({ message: "Pacote não encontrado!" });
    }

    const {
      category_id,
      guia_id,
      name,
      description,
      price,
      date,
    } = request.body;

    pacote.category_id = category_id;
    pacote.guia_id = guia_id;
    pacote.name = name;
    pacote.description = description;
    pacote.price = price;
    pacote.date = date;

    try {
      await pacote.save();

      return response.send(pacote);
    } catch (e) {
      return response.status(404).send({ erro: e });
    }
  }

  async delete({ request, response }) {
    const pacote = await Pacote.find(request.params.id);

    if (!pacote) {
      return response.status(401).send({ message: "Pacote não encontrado!" });
    }

    try {
      await pacote.delete();

      return response.send({ message: "Pacote excluído com sucesso!" });
    } catch (e) {
      return response.status(404).send({ erro: e });
    }
  }

  async show({ request, response }) {
    const pacote = await Pacote.find(request.params.id);

    if (!pacote) {
      return response.status(401).send({ message: "Pacote não encontrado!" });
    }
    return response.send(pacote);
  }

  async list({ request, response }) {
    const pacotes = await Pacote.all();

    if (!pacotes) {
      return response
        .status(404)
        .send({ message: "Ocorreu algum problema na busca dos pacotes!" });
    }

    return response.send(pacotes);
  }
}

module.exports = PacoteController;
