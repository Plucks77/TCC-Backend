"use strict";

const PacotoFotos = use("App/Models/PacoteFoto");
const Drive = use("Drive");
const crypto = require("crypto");
const { url } = require("@adonisjs/framework/src/Route/Manager");

class PacoteFotoController {
  async create({ request, response }) {
    request.multipart
      .file("image", {}, async (file) => {
        const ContentType = file.headers["content-type"];
        const ACL = "public-read";
        const Key =
          crypto.randomBytes(64).toString("hex") + "-" + file.clientName;

        try {
          await Drive.put(`Pacotes/${Key}`, file.stream, {
            ContentType,
            ACL,
          });
          const url = await Drive.disk("s3").getUrl(`Pacotes/${Key}`);
          const foto = await PacotoFotos.create({
            pacote_id: request.params.pacote_id,
            image_url: url,
            content_type: ContentType,
          });
        } catch (e) {
          return response.send("Ocorreu algum erro");
        }
      })
      .process();
    return response.send({ message: "Sucesso!" });
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
