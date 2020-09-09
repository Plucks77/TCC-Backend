"use strict";

const Favorite = use("App/Models/Favorite");
const User = use("App/Models/User");
const Pacote = use("App/Models/Pacote");

class FavoriteController {
  async isFavorited({ request, response }) {
    const { user_id, pacote_id } = request.body;

    try {
      const user = await User.find(user_id);
      if (!user) {
        return response
          .status(404)
          .send({ message: "Usuário não encontrado!" });
      }

      const pacote = await Pacote.find(pacote_id);
      if (!pacote) {
        return response.status(404).send({ message: "Pacote não encontrado!" });
      }
      const favorited = await Favorite.query()
        .where("user_id", "=", user_id)
        .where("pacote_id", "=", pacote_id)
        .select("id")
        .fetch();

      if (favorited.rows.length === 0) {
        return response.send(false);
      }

      return response.send(true);
    } catch (erro) {
      return response.status(400).send({ erro: erro.message });
    }
  }

  async unfavorite({ request, response }) {
    const { user_id, pacote_id } = request.body;
    try {
      const user = await User.find(user_id);
      if (!user) {
        return response
          .status(404)
          .send({ message: "Usuário não encontrado!" });
      }

      const pacote = await Pacote.find(pacote_id);
      if (!pacote) {
        return response.status(404).send({ message: "Pacote não encontrado!" });
      }
      await Favorite.query()
        .where("user_id", "=", user_id)
        .where("pacote_id", "=", pacote_id)
        .delete();

      return response.send({ message: "Desfavoritado!" });
    } catch (erro) {
      return response.status(400).send({ erro });
    }
  }
}

module.exports = FavoriteController;
