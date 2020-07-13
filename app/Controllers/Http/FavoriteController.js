"use strict";

const Favorite = use("App/Models/Favorite");

class FavoriteController {
  async isFavorited({ request, response }) {
    const { user_id, pacote_id } = request.body;

    const favorited = await Favorite.query()
      .where("user_id", "=", user_id)
      .where("pacote_id", "=", pacote_id)
      .select("id")
      .fetch();

    if (favorited.rows.length === 0) {
      return response.send(false);
    }

    return response.send(true);
  }

  async unfavorite({ request, response }) {
    const { user_id, pacote_id } = request.body;
    try {
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
