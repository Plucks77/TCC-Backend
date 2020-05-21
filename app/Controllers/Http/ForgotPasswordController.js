"use strict";
const User = use("App/Models/User");
const ForgotPassword = use("App/Models/ForgotPassword");
const Mail = use("Mail");
const crypto = require("crypto");
const Database = use("Database");

class ForgotPasswordController {
  async create({ request, response }) {
    const user = await User.findByOrFail("email", request.body.email);

    if (!user) {
      return response.status(401).send({ message: "Usuário não encontrado!" });
    }
    const token = await crypto.randomBytes(10).toString("hex");

    const forgot = await ForgotPassword.create({ user_id: user.id, token });

    await Mail.send("emails.recover", { user, token }, (message) => {
      message
        .from("suporte.valetour@gmail.com")
        .to(user.email)
        .subject("Troca de senha da sua conta ValeTour");
    });
    response.send(forgot);
  }

  async validate({ request, response }) {
    const { token, id } = request.body;
    const ttoken = await ForgotPassword.findByOrFail("token", token);
    const uuser = await User.find(id);
    if (!uuser) {
      return response.status(401).send({ message: "Usuário não encontrado!" });
    }
    if (!ttoken.token) {
      return response.status(401).send({ message: "Token inválido!" });
    }
    response.send({ message: "Ok" });
  }

  async change({ request, response }) {
    const user = await User.find(request.params.id);

    if (!user) {
      return response.status(401).send({ message: "Usuário não encontrado!" });
    }

    try {
      user.password = request.body.password;
      await user.save();
      await Database.raw(
        `DELETE FROM forgot_passwords WHERE user_id='${user.id}'`
      );

      return response.send(user);
    } catch (e) {
      return response.status(404).send({ erro: e });
    }
  }
}

module.exports = ForgotPasswordController;
