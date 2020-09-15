"use strict";
const Guia = use("App/Models/Guia");
const User = use("App/Models/User");
const Eva = use("App/Models/Evaluation");
const Axios = require("axios").default;

class GuiaController {
  async register({ request, response }) {
    const { name, description, tel, email, password } = request.body;

    try {
      const guia = await Guia.create({
        name,
        description,
        tel,
        email,
        password,
      });

      return response.send({ guia });
    } catch (e) {
      return response.status(406).send({ erro: e });
    }
  }

  async login({ request, response, auth }) {
    const { email, password } = request.all();

    try {
      const token = await auth.authenticator("guia").attempt(email, password);

      const guia = await Guia.findByOrFail("email", email);

      return response.send({ guia_id: guia.id, token: token.token });
    } catch (erro) {
      return response.status(400).send({ erro: erro.message });
    }
  }

  async edit({ request, response }) {
    const guia = await Guia.find(request.params.id);

    if (!guia) {
      return response.status(404).send({ message: "Guia não encontrado!" });
    }

    const { name, description, tel, email, password } = request.body;

    guia.name = name;
    guia.description = description;
    guia.tel = tel;
    guia.email = email;
    guia.password = password;

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
    const guias = await Guia.query()
      .with("evaluations")
      .orderBy("created_at")
      .fetch();
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

    return response.send({
      id: guia.id,
      name: guia.name,
      description: guia.description,
      tel: guia.tel,
      media,
    });
  }

  async verify({ request, response }) {
    const { id } = request.params;

    try {
      const guia = await Guia.find(id);

      if (!guia) {
        return response.status(404).send({ message: "Guia não encontrado!" });
      }

      if (guia.expoToken === null) {
        return response.send({ verified: false });
      }
      return response.send({ verified: true });
    } catch (e) {
      return response.status(400).send({ erro: e.message });
    }
  }

  async verifytoken({ request, response }) {
    const { id, token } = request.body;

    try {
      const guia = await Guia.find(id);
      if (!guia) {
        return response
          .status(404)
          .send({ message: "Guia não foi encontrado!" });
      }
      guia.expoToken = token;
      await guia.save();
      return response.send({
        message: `Token inserido para o guia ${guia.name}!`,
      });
    } catch (e) {
      return response.status(400).send({ erro: e.message });
    }
  }

  async sendNotification({ request, response }) {
    const { guia_id, user_id } = request.body;

    try {
      const guia = await Guia.find(guia_id);
      const user = await User.find(user_id);
      if (!guia) {
        return response.status(404).send({ message: "Guia não encontrado." });
      }
      if (!user) {
        return response
          .status(404)
          .send({ message: "Usuário não encontrado." });
      }

      await Axios.post("https://exp.host/--/api/v2/push/send", {
        to: "ExponentPushToken[3WuUnUG6F1_uOeLa4IKb5q]",
        title: `Atenção Guia!`,
        body: `O membro ${user.username} se perdeu!\nAbra esta notificação para ver sua localização no mapa!`,
        priority: "high",
        sound: "default",
        data: {
          x: "-22.9035",
          y: "-43.2096",
        },
      });
      return response.send({ message: "ok" });
    } catch (e) {
      return response.status(400).send({ erro: e.message });
    }
  }
}

module.exports = GuiaController;
