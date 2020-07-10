"use strict";
const Pacote = use("App/Models/Pacote");
const Local = use("App/Models/Local");

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
    const pacote = await Pacote.query()
      .where("id", "=", request.params.id)
      .with("local", (builder) => {
        builder.select("id", "city_id");
      })
      .fetch();

    if (!pacote) {
      return response.status(401).send({ message: "Pacote não encontrado!" });
    }

    const json = pacote.toJSON();
    const city_id = json[0].local.city_id;
    const {
      id,
      category_id,
      guia_id,
      local_id,
      name,
      description,
      price,
      date,
      image_url,
    } = json[0];

    const serializedData = {
      id,
      category_id,
      guia_id,
      city_id,
      local_id,
      name,
      description,
      price,
      date,
      image_url,
    };

    return response.send(serializedData);
  }

  async list({ request, response }) {
    const pacotes = await Pacote.query().orderBy("created_at").fetch();

    if (!pacotes) {
      return response
        .status(404)
        .send({ message: "Ocorreu algum problema na busca dos pacotes!" });
    }

    return response.send(pacotes);
  }

  async filtered({ request, response }) {
    //Retorna o id, nome, descrição, preço, nome da categoria, url da foto dos pacotes filtrados pelo id de um local

    try {
      const pacotes = await Pacote.query()
        .where("pacotes.local_id", "=", request.params.id)
        .select([
          "pacotes.id",
          "pacotes.name",
          "pacotes.description",
          "pacotes.price",
          "c.name as category_name",
          "pacotes.image_url",
          "pacotes.guia_id",
        ])
        .join("categories as c", "c.id", "pacotes.category_id")
        .fetch();

      return response.send(pacotes);
    } catch (e) {
      return response.status(400).send({ erro: e });
    }
  }
}

module.exports = PacoteController;
