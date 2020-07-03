"use strict";
const Pacote = use("App/Models/Pacote");

class PacoteController {
  async create({ request, response }) {
    const {
      category_id,
      guia_id,
      local_id,
      name,
      description,
      price,
      date,
      image_url,
    } = request.body;

    try {
      const pacote = await Pacote.create({
        category_id,
        guia_id,
        local_id,
        name,
        description,
        price,
        date,
        image_url,
      });

      return response.send({ pacote });
    } catch (e) {
      return response.status(406).send(e.message);
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
      local_id,
      name,
      description,
      price,
      date,
      image_url,
    } = request.body;

    pacote.category_id = category_id;
    pacote.guia_id = guia_id;
    pacote.local_id = local_id;
    pacote.name = name;
    pacote.description = description;
    pacote.price = price;
    pacote.date = date;
    pacote.image_url = image_url;

    try {
      await pacote.save();

      return response.send(pacote);
    } catch (e) {
      return response.status(404).send(e.message);
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
      return response.status(404).send(e.message);
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
