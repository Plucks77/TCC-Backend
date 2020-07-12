"use strict";

const User = use("App/Models/User");
const Favorite = use("App/Models/Favorite");
const Pacote = use("App/Models/Pacote");

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

  async list({ response }) {
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

  async favorite({ request, response }) {
    const { user_id, pacote_id } = request.body;

    try {
      const favorite = await Favorite.create({ user_id, pacote_id });
      return response.send(favorite);
    } catch (erro) {
      return response.status(406).send({ erro: erro });
    }
  }

  async favorites({ request, response }) {
    try {
      const favorites = await Favorite.query()
        .where("user_id", "=", request.params.id)
        .with("pacotes", (cb) => {
          cb.select(
            "id",
            "category_id",
            "guia_id",
            "local_id",
            "name",
            "description",
            "price",
            "date",
            "image_url"
          );
        })
        .fetch();

      const serializedFavorites = favorites.toJSON();
      let returnedPacotes = [];
      serializedFavorites.forEach((pacote) => {
        returnedPacotes.push(pacote.pacotes);
      });

      return response.send(returnedPacotes);
    } catch (erro) {
      return response.status(406).send({ erro: erro });
    }
  }
}

module.exports = UserController;
