"use strict";
const Purchase = use("App/Models/Purchase");
const User = use("App/Models/User");
const Pacote = use("App/Models/Pacote");

class PurchaseController {
  async create({ request, response }) {
    const { user_id, pacote_id } = request.body;

    const user = await User.find(user_id);
    if (!user) {
      return response.status(404).send({ message: "Usuário não encontrado" });
    }

    const pacote = await Pacote.find(pacote_id);
    if (!pacote) {
      return response.status(404).send({ message: "Pacote não encontrado" });
    }

    try {
      const purchase = await Purchase.create({ user_id, pacote_id });
      return response.send(purchase);
    } catch (erro) {
      return response.status(400).send({ erro });
    }
  }

  async filtered({ request, response }) {
    const { user_id } = request.params;

    const user = await User.find(user_id);
    if (!user) {
      return response.status(404).send({ message: "Usuário não encontrado" });
    }

    try {
      const purchases = await Purchase.query()
        .where("user_id", "=", user_id)
        .select(
          "p.id",
          "p.name",
          "p.description",
          "p.date",
          "p.image_url",
          "p.guia_id"
        )
        .join("pacotes as p", "p.id", "pacote_id")
        .orderBy("p.date")
        .fetch();
      return response.send(purchases);
    } catch (erro) {
      return response.status(400).send({ erro: erro });
    }
  }

  async haspurchases({ request, response }) {
    const { user_id } = request.params;
    try {
      const hasPurchase = await Purchase.query()
        .where("user_id", "=", user_id)
        .fetch();

      if (hasPurchase.rows.length !== 0) {
        return response.send(true);
      } else {
        return response.send(false);
      }
    } catch (erro) {
      return response.status(400).send({ erro });
    }
  }

  async confirmUser({ request, response }) {
    const { user_id, pacote_id } = request.body;

    try {
      await Purchase.query()
        .where("user_id", "=", user_id)
        .where("pacote_id", "=", pacote_id)
        .update({ confirmed: true });
      return response.send(true);
    } catch (erro) {
      return response.status(400).send({ erro: erro.message });
    }
  }

  async listUsers({ request, response }) {
    const { pacote_id } = request.params;

    try {
      const purchase = await Purchase.query()
        .where("pacote_id", "=", pacote_id)
        .select("u.username", "confirmed")
        .join("users as u", "u.id", "user_id")
        .fetch();
      return response.send(purchase);
    } catch (erro) {
      return response.status(400).send({ erro: erro.message });
    }
  }
}

module.exports = PurchaseController;
