"use strict";

/*
|--------------------------------------------------------------------------
| CitySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class CitySeeder {
  async run() {
    const data = [
      {
        name: "Resende",
        description: "Descrição da cidade de Resende",
        image_url:
          "https://images-valetour.s3-sa-east-1.amazonaws.com/Cidades/Resende2.jpg",
      },
      {
        name: "Itatiaia",
        description: "Descrição da cidade de Itatiaia",
        image_url:
          "https://images-valetour.s3-sa-east-1.amazonaws.com/Cidades/Itatiaia2.jpg",
      },
    ];
    const cities = await Factory.model("App/Models/City").createMany(2, data);
  }
}

module.exports = CitySeeder;
