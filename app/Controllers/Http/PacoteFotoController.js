"use strict";

const PacotoFotos = use("App/Models/PacoteFoto");

class PacoteFotoController {
  async create({ request, response }) {
    const { pacote_id, image_url } = request.body;
    const foto = await PacotoFotos.create({ pacote_id, image_url });

    return response.send(foto);
  }

  async getFotos({ request, response }) {
    const { pacote_id } = request.params;

    const fotos = await PacotoFotos.query()
      .where("pacote_id", "=", pacote_id)
      .select("image_url")
      .fetch();

    return response.send(fotos);
  }
}

module.exports = PacoteFotoController;
