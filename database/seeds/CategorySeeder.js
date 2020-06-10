"use strict";

/*
|--------------------------------------------------------------------------
| CategorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class CategorySeeder {
  async run() {
    const data = [
      {
        name: "Ação",
        description: "Pacote de ação",
      },
      {
        name: "Aventura",
        description: "Pacote de aventura",
      },
      {
        name: "Casual",
        description: "Pacote casual",
      },
    ];
    const category = await Factory.model("App/Models/Category").createMany(
      3,
      data
    );
  }
}

module.exports = CategorySeeder;
