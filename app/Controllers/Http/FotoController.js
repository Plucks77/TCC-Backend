"use strict";
const Drive = use("Drive");
const Crypto = require("crypto");

class FotoController {
  async create({ request, response }) {
    try {
      request.multipart.file("image", {}, async (file) => {
        const ContentType = file.headers["content-type"];
        const ACL = "public-read";
        const Key =
          Crypto.randomBytes(64).toString("hex") + "-" + file.clientName;
        const url = await Drive.disk("s3").put(
          `${request.params.local}/${Key}`,
          file.stream,
          {
            ContentType,
            ACL,
          }
        );
        return response.send({ url });
      });
    } catch (erro) {
      return response.status(400).send({ erro });
    }
    await request.multipart.process();
  }

  async delete({ request, response }) {
    const { url } = request.body;
    try {
      const fragmentad = url.split("/");
      const key = fragmentad[3] + "/" + fragmentad[4];
      await Drive.disk("s3").delete(key);
      return response.send({ message: "Imagem excluída com sucesso!" });
    } catch (erro) {
      return response.status(400).send({ erro: erro.message });
    }
  }
}

module.exports = FotoController;
