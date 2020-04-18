"use strict";

const Category = use("App/Models/Category");

class CategoryController {
  async register({ request, response }) {
    const { name, description } = request.body;

    try {
      const category = await Category.create({ name, description });

      return response.send({ category });
    } catch (e) {
      return response.status(406).send({ erro: e });
    }
  }

  async edit({ request, response }) {
    const category = await Category.find(request.params.id);

    if (!category) {
      return response
        .status(401)
        .send({ message: "Categoria não encontrada!" });
    }

    const { name, description } = request.body;

    category.name = name;
    category.description = description;

    try {
      await category.save();

      return response.send(category);
    } catch (e) {
      return response.status(404).send({ erro: e });
    }
  }

  async delete({ request, response }) {
    const category = await Category.find(request.params.id);

    if (!category) {
      return response
        .status(401)
        .send({ message: "Categoria não encontrada!" });
    }

    try {
      await category.delete();

      return response.send({ message: "Categoria excluída com sucesso!" });
    } catch (e) {
      return response.status(404).send({ erro: e });
    }
  }

  async show({ request, response }) {
    try {
      const category = await Category.find(request.params.id);

      if (!category) {
        return response
          .status(401)
          .send({ message: "Categoria não encontrada!" });
      }

      response.send(category);
    } catch (e) {
      return response.status(404).send({ erro: e });
    }
  }
}

module.exports = CategoryController;
