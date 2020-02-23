"use strict";

class UserController {
  async index({ response }) {
    response.send({ mensagem: "oi" });
  }
}

module.exports = UserController;
