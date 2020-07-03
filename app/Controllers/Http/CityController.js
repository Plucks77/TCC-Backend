"use strict";

const City = use("App/Models/City");

class CityController {
  async list({ response }) {
    const cities = await City.all();

    return response.send(cities);
  }
}

module.exports = CityController;
