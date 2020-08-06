"use strict";
const PacotoFotos = use("App/Models/PacoteFoto");
const Drive = use("Drive");

module.exports = class Help {
  async delete(id) {
    try {
      const pacotefoto = await PacotoFotos.find(id);
      const url = pacotefoto.image_url;
      const fragmentad = url.split("/");
      const key = fragmentad[3] + "/" + fragmentad[4];
      await Drive.disk("s3").delete(key);
      await pacotefoto.delete();
      return true;
    } catch (erro) {
      return erro.message;
    }
  }
};
