"use strict";
const PacotoFotos = use("App/Models/PacoteFoto");
const Drive = use("Drive");
const Crypto = require("crypto");

class PacoteFotoController {
  async create({ request, response }) {
    try {
      request.multipart.file("image", {}, async (file) => {
        const body = {};
        await request.multipart.field((name, value) => {
          body[name] = value;
        });
        const ContentType = file.headers["content-type"];
        const ACL = "public-read";
        const Key =
          Crypto.randomBytes(64).toString("hex") + "-" + file.clientName;
        const url = await Drive.disk("s3").put(
          `Pacote_images/${Key}`,
          file.stream,
          {
            ContentType,
            ACL,
          }
        );
        const pacotefoto = await PacotoFotos.create({
          pacote_id: body.pacote_id,
          image_url: url,
          content_type: ContentType,
        });
        return response.send({ pacotefoto });
      });
    } catch (erro) {
      return response.status(400).send({ erro });
    }
    await request.multipart.process();
  }

  async delete({ request, response }) {
    const id = request.params.id;
    try {
      const pacotefoto = await PacotoFotos.find(id);
      const url = pacotefoto.image_url;
      const fragmentad = url.split("/");
      const key = fragmentad[3] + "/" + fragmentad[4];
      await Drive.disk("s3").delete(key);
      await pacotefoto.delete();
      return response.send({ message: "Foto excluída com sucesso!" });
    } catch (erro) {
      return response.status(400).send({ erro });
    }
  }

  async getFotos({ request, response }) {
    const { pacote_id } = request.params;

    const fotos = await PacotoFotos.query()
      .where("pacote_id", "=", pacote_id)
      .select("id", "image_url")
      .fetch();

    return response.send(fotos);
  }
}

module.exports = PacoteFotoController;
