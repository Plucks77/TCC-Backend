"use strict";

/*
|--------------------------------------------------------------------------
| LocalSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class LocalSeeder {
  async run() {
    const data = [
      {
        city_id: 1,
        name: "Visconde de Mauá",
        description: "Descrição do local Visconde de Mauá",
        image_url:
          "https://images-valetour.s3-sa-east-1.amazonaws.com/Locais/maua.jpg",
      },
      {
        city_id: 1,
        name: "Serrinha",
        description: "Descrição do local Serrinha",
        image_url:
          "https://images-valetour.s3-sa-east-1.amazonaws.com/Locais/serrinha.jpg",
      },
      {
        city_id: 1,
        name: "Capelinha",
        description: "Descrição do local Capelinha",
        image_url:
          "https://images-valetour.s3-sa-east-1.amazonaws.com/Locais/capelinha.jpg",
      },
      {
        city_id: 1,
        name: "Engenheiro Passos",
        description: "Descrição do local Engenheiro Passos",
        image_url:
          "https://images-valetour.s3-sa-east-1.amazonaws.com/Locais/engpassos.jpg",
      },
      {
        city_id: 2,
        name: "Penedo",
        description: "Descrição do local Penedo",
        image_url:
          "https://images-valetour.s3-sa-east-1.amazonaws.com/Locais/penedo.jpg",
      },
      {
        city_id: 2,
        name: "Maringá",
        description: "Descrição do local Maringá",
        image_url:
          "https://images-valetour.s3-sa-east-1.amazonaws.com/Locais/maringa.jpg",
      },
      {
        city_id: 2,
        name: "Maromba",
        description: "Descrição do local Maromba",
        image_url:
          "https://images-valetour.s3-sa-east-1.amazonaws.com/Locais/maromba.jpg",
      },
    ];
    const locals = await Factory.model("App/Models/Local").createMany(7, data);
  }
}

module.exports = LocalSeeder;
