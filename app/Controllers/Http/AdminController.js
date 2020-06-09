"use strict";

const Admin = use("App/Models/Admin");

class AdminController {
  async register({ request, response }) {
    const { email, password } = request.body;

    try {
      const admin = await Admin.create({ email, password });

      return response.send({ admin });
    } catch (e) {
      return response.status(406).send({ erro: e });
    }
  }

  async login({ request, response, auth }) {
    const { email, password } = request.all();

    const token = await auth.authenticator("admin").attempt(email, password);

    const admin = await Admin.findByOrFail("email", email);

    return response.send({ admin_id: admin.id, token: token.token });
  }
}

module.exports = AdminController;
