"use strict";
const Suite = use("Test/Suite")("Admin - Pacotes");
const { before, beforeEach, after, afterEach, trait, test } = Suite;
const Admin = use("App/Models/Admin");
const Pacote = use("App/Models/Pacote");
const Guia = use("App/Models/Guia");
const Helpers = use("Helpers");

trait("Test/ApiClient");
trait("Auth/Client");

before(async () => {
  await Guia.create({
    name: "Guia para testes",
    description: "Um guia para testes",
    tel: "24992859059",
    email: "guia1@gmail.com",
    password: "123456789",
  });
});

test("Should create a package", async ({ client }) => {
  const admin = await Admin.find(1);
  const response = await client
    .post("/pacote/create")
    .send({
      category_id: 1,
      guia_id: 2,
      local_id: 1,
      name: "Pacote de teste",
      description: "Descrição do pacote de teste",
      price: 1000,
      date: "25/12/2020",
      image_url: "www.google.com",
      image: Helpers.tmpPath("aedb.png"),
    })
    .loginVia(admin)
    .end();
  response.assertStatus(200);
});

test("Should not create a package because the admin is not authenticated", async ({
  client,
}) => {
  const response = await client
    .post("/pacote/create")
    .send({
      category_id: 1,
      guia_id: 1,
      local_id: 1,
      name: "Pacote de teste",
      description: "Descrição do pacote de teste",
      price: 1000,
      date: "25/12/2020",
      image_url: "www.google.com",
      image: Helpers.tmpPath("aedb.png"),
    })
    .end();
  response.assertStatus(401);
});

test("Should not create a package because the category do not exist", async ({
  client,
}) => {
  const admin = await Admin.find(1);
  const response = await client
    .post("/pacote/create")
    .send({
      category_id: 111,
      guia_id: 1,
      local_id: 1,
      name: "Pacote de teste",
      description: "Descrição do pacote de teste",
      price: 1000,
      date: "25/12/2020",
      image_url: "www.google.com",
      image: Helpers.tmpPath("aedb.png"),
    })
    .loginVia(admin)
    .end();
  response.assertStatus(404);
});

test("Should not create a package because the guide do not exist", async ({
  client,
}) => {
  const admin = await Admin.find(1);
  const response = await client
    .post("/pacote/create")
    .send({
      category_id: 1,
      guia_id: 1,
      local_id: 1,
      name: "Pacote de teste",
      description: "Descrição do pacote de teste",
      price: 1000,
      date: "25/12/2020",
      image_url: "www.google.com",
      image: Helpers.tmpPath("aedb.png"),
    })
    .loginVia(admin)
    .end();
  response.assertStatus(404);
});

test("Should not create a package because the local do not exist", async ({
  client,
}) => {
  const admin = await Admin.find(1);
  const response = await client
    .post("/pacote/create")
    .send({
      category_id: 1,
      guia_id: 2,
      local_id: 111,
      name: "Pacote de teste",
      description: "Descrição do pacote de teste",
      price: 1000,
      date: "25/12/2020",
      image_url: "www.google.com",
      image: Helpers.tmpPath("aedb.png"),
    })
    .loginVia(admin)
    .end();
  response.assertStatus(404);
});

test("Should edit a package", async ({ client }) => {
  const admin = await Admin.find(1);
  const response = await client
    .put("/pacote/edit/1")
    .send({
      description: "Atualização da descrição do pacote de teste",
    })
    .loginVia(admin)
    .end();
  response.assertStatus(200);
});

test("Should not edit a package because the admin is not authenticated", async ({
  client,
}) => {
  const response = await client
    .put("/pacote/edit/1")
    .send({
      description: "Atualização da descrição do pacote de teste",
    })

    .end();
  response.assertStatus(401);
});

test("Should not edit a package because the package do not exist", async ({
  client,
}) => {
  const admin = await Admin.find(1);
  const response = await client
    .put("/pacote/edit/111")
    .send({
      description: "Atualização da descrição do pacote de teste",
    })
    .loginVia(admin)
    .end();
  response.assertStatus(404);
});

test("Should list a package", async ({ client }) => {
  const admin = await Admin.find(1);
  const response = await client.get("/pacote/1").loginVia(admin).end();
  response.assertStatus(200);
});

test("Should not list a package because the admin is not authenticated", async ({
  client,
}) => {
  const response = await client.get("/pacote/1").end();
  response.assertStatus(401);
});

test("Should not list a package because the package do not exist", async ({
  client,
}) => {
  const admin = await Admin.find(1);
  const response = await client.get("/pacote/111").loginVia(admin).end();
  response.assertStatus(404);
});

test("Should list all packages", async ({ client }) => {
  const admin = await Admin.find(1);
  const response = await client.get("/pacotes").loginVia(admin).end();
  response.assertStatus(200);
});

test("Should not list all packages because the admin is not authenticated", async ({
  client,
}) => {
  const response = await client.get("/pacotes").end();
  response.assertStatus(401);
});
