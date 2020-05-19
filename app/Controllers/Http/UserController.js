"use strict";

const User = use("App/Models/User");

class UserController {
  async register({ request, response, auth }) {
    const { username, email, password, tel } = request.body;

    try {
      const user = await User.create({ username, email, password, tel });
      const token = await auth.generate(user);

      return response.send({ user, token: token.token });
    } catch (e) {
      return response.status(406).send({ erro: e });
    }
  }

  async login({ request, response, auth }) {
    const { email, password } = request.all();

    const token = await auth.attempt(email, password);

    const user = await User.findByOrFail("email", email);

    return response.send({ user_id: user.id, token: token.token });
  }

  async edit({ request, response }) {
    const user = await User.find(request.params.id);

    if (!user) {
      return response.status(401).send({ message: "Usuário não encontrado!" });
    }

    const { username, email, password, tel } = request.body;

    user.username = username;
    user.email = email;
    user.password = password;
    user.tel = tel;

    try {
      await user.save();

      return response.send(user);
    } catch (e) {
      return response.status(404).send({ erro: e });
    }
  }

  async delete({ request, response }) {
    const user = await User.find(request.params.id);

    if (!user) {
      return response.status(401).send({ message: "Usuário não encontrado!" });
    }

    try {
      await user.delete();

      return response.send({ message: "Usuário excluído com sucesso!" });
    } catch (e) {
      return response.status(404).send({ erro: e });
    }
  }

  async show({ response }) {
    const users = await User.all();

    response.send(users);
  }

  async user({ request, response }) {
    const user = await User.find(request.params.id);

    if (!user) {
      return response.status(401).send({ message: "Usuário não encontrado!" });
    }
    return response.send(user);
  }
}

module.exports = UserController;
