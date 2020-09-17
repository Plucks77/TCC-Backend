"use strict";
const Pacote = use("App/Models/Pacote");
const PacotoFotos = use("App/Models/PacoteFoto");
const Drive = use("Drive");
const crypto = require("crypto");
const Help = use("App/Common");
const Helper = new Help();
const Category = use("App/Models/Category");
const Guia = use("App/Models/Guia");
const Local = use("App/Models/Local");

class PacoteController {
  async create({ request, response }) {
    if (process.env.NODE_ENV === "testing") {
      const category = await Category.find(request.body.category_id);
      if (!category) {
        return response
          .status(404)
          .send({ message: "Categoria não encontrada" });
      }
      const guia = await Guia.find(request.body.guia_id);
      if (!guia) {
        return response
          .status(404)
          .send({ message: "Categoria não encontrada" });
      }
      const local = await Local.find(request.body.local_id);
      if (!local) {
        return response
          .status(404)
          .send({ message: "Categoria não encontrada" });
      }
      const pacote = await Pacote.create({
        category_id: request.body.category_id,
        guia_id: request.body.guia_id,
        local_id: request.body.local_id,
        name: request.body.name,
        description: request.body.description,
        price: request.body.price,
        date: request.body.date,
        image_url: request.body.image_url,
      });
      return response.send({ pacote });
    } else {
      try {
        request.multipart.file("image", {}, async (file) => {
          const body = {};
          await request.multipart.field((name, value) => {
            body[name] = value;
          });
          const ContentType = file.headers["content-type"];
          const ACL = "public-read";
          const Key =
            crypto.randomBytes(64).toString("hex") + "-" + file.clientName;
          const url = await Drive.disk("s3").put(
            `Pacotes/${Key}`,
            file.stream,
            {
              ContentType,
              ACL,
            }
          );
          const pacote = await Pacote.create({
            category_id: body.category_id,
            guia_id: body.guia_id,
            local_id: body.local_id,
            name: body.name,
            description: body.description,
            price: body.price,
            date: body.date,
            image_url: url,
          });
          return response.send({ pacote });
        });
      } catch (erro) {
        return response.status(400).send({ erro });
      }

      await request.multipart.process();
    }
  }

  async edit({ request, response }) {
    const pacote = await Pacote.find(request.params.id);

    if (!pacote) {
      return response.status(404).send({ message: "Pacote não encontrado!" });
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
      const pacote_id = pacote.id;
      const pacotefotos = await PacotoFotos.query()
        .where("pacote_id", "=", pacote_id)
        .fetch();
      const pacotesJson = pacotefotos.toJSON();
      pacotesJson.map(async (pacoteFoto) => {
        await Helper.delete(pacoteFoto.id);
      });

      const url = pacote.image_url;
      const fragmentad = url.split("/");
      const key = fragmentad[3] + "/" + fragmentad[4];
      await Drive.disk("s3").delete(key);
      await pacote.delete();

      return response.send({ message: "Pacote excluído com sucesso!" });
    } catch (e) {
      return response.status(404).send(e.message);
    }
  }

  async show({ request, response }) {
    const verify = await Pacote.find(request.params.id);
    if (!verify) {
      return response.status(404).send({ message: "Pacote não encontrado!" });
    }
    try {
      const pacote = await Pacote.query()
        .where("id", "=", request.params.id)
        .with("local", (builder) => {
          builder.select("id", "city_id");
        })
        .fetch();

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
    } catch (e) {
      console.log(e.message);
      return response.status(400).send({ erro: e.message });
    }
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
          "pacotes.date",
        ])
        .join("categories as c", "c.id", "pacotes.category_id")
        .fetch();

      return response.send(pacotes);
    } catch (e) {
      return response.status(400).send({ erro: e.message });
    }
  }

  async guia({ request, response }) {
    const { guia_id } = request.params;

    try {
      const pacotes = await Pacote.query()
        .where("guia_id", "=", guia_id)
        .select(
          "pacotes.id",
          "pacotes.name",
          "pacotes.description",
          "pacotes.price",
          "pacotes.date",
          "pacotes.image_url",
          "pacotes.category_id",
          "pacotes.local_id"
        )
        .withCount("purchases as participantes")
        .orderBy("pacotes.date")
        .fetch();

      return response.send(pacotes);
    } catch (e) {
      return response.status(400).send({ erro: e.message });
    }
  }
}

module.exports = PacoteController;
