"use strict";

const Guia = use("App/Models/Guia");
const Eva = use("App/Models/Evaluation");

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
      return response.status(404).send({ message: "Guia não encontrado!" });
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
      return response.status(404).send({ message: "Guia não encontrado!" });
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

    return response.send(eva);
  }

  async rating({ request, response }) {
    const guia = await Guia.find(request.params.id);

    const avaliacoes = await Eva.query().where("guia_id", guia.id).fetch();
    const avaliacoesSerializado = avaliacoes.toJSON();

    let total = 0;
    avaliacoesSerializado.map((a) => {
      total += a.rating;
    });
    let media = total / avaliacoesSerializado.length;

    return response.send({ media });
  }

  async list({ response }) {
    const guias = await Guia.query().with("evaluations").fetch();
    const serializedGuias = guias.toJSON();
    const returnedGuias = [];

    serializedGuias.map((guia) => {
      guia.media = 0;
      guia.evaluations.map((eva) => {
        guia.media += eva.rating;
      });
      guia.media = guia.media / guia.evaluations.length;

      returnedGuias.push({
        id: guia.id,
        name: guia.name,
        description: guia.description,
        tel: guia.tel,
        media: guia.media,
      });
    });

    return response.send(returnedGuias);
  }

  async show({ request, response }) {
    const guia = await Guia.query()
      .where("id", request.params.id)
      .with("evaluations")
      .first();

    if (!guia) {
      return response.status(404).send({ message: "Guia não encontrado!" });
    }

    const serializedGuia = guia.toJSON();
    let media = 0;

    serializedGuia.evaluations.map((eva) => {
      media += eva.rating;
    });

    media = media / serializedGuia.evaluations.length;

    console.log(media);

    return response.send({
      id: guia.id,
      name: guia.name,
      description: guia.description,
      tel: guia.tel,
      media,
    });
  }
}

module.exports = GuiaController;
