"use strict";

const Eva = use("App/Models/Evaluation");

class EvaluationController {
  async register({ request, response }) {
    const { guia_id, description, stars } = request.body;

    try {
      const eva = await Eva.create({ guia_id, description, stars });

      return response.send({ eva });
    } catch (e) {
      return response.status(406).send({ erro: e });
    }
  }

  async show({ response }) {
    const eva = await Eva.all();

    response.send(eva);
  }
}

module.exports = EvaluationController;
