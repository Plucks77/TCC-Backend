"use strict";
const Purchase = use("App/Models/Purchase");

class PurchaseController {
  async create({ request, response }) {
    const { user_id, pacote_id } = request.body;

    try {
      const purchase = await Purchase.create({ user_id, pacote_id });
      return response.send(purchase);
    } catch (erro) {
      return response.status(400).send({ erro });
    }
  }

  async filtered({ request, response }) {
    const { user_id } = request.params;

    try {
      const purchases = await Purchase.query()
        .where("user_id", "=", user_id)
        .select("p.id", "p.name", "p.description", "p.date", "p.image_url")
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
