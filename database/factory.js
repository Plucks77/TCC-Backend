"use strict";

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

Factory.blueprint("App/Models/Category", (faker, i, data) => {
  return {
    name: data[i].name,
    description: data[i].description,
  };
});

Factory.blueprint("App/Models/City", (faker, i, data) => {
  return {
    name: data[i].name,
    description: data[i].description,
    image_url: data[i].image_url,
  };
});

Factory.blueprint("App/Models/Local", (faker, i, data) => {
  return {
    city_id: data[i].city_id,
    name: data[i].name,
    description: data[i].description,
    image_url: data[i].image_url,
  };
});
