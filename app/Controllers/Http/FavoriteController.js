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
}

module.exports = FavoriteController;
