"use strict";
const Suite = use("Test/Suite")("Admin");
const { before, beforeEach, after, afterEach, trait, test } = Suite;
const Admin = use("App/Models/Admin");
const Pacote = use("App/Models/Pacote");

trait("Test/ApiClient");
trait("Auth/Client");

test("Should create a package", async ({ client }) => {
  const admin = await Admin.find(1);
  const response = await client
    .post("/pacote/create")
    .send({
      category_id: 1,
      guia_id: 1,
      local_id: 1,
      name: "Pacote de teste",
      description: "Apenas um pacote para teste",
      price: 1000,
      date: new Date(),
      image_url: "www.google.com",
    })
    .loginVia(admin)
    .end();

  response.assertStatus(200);
});
