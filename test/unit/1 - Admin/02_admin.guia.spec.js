"use strict";
const Suite = use("Test/Suite")("Admin - Guia");
const { before, beforeEach, after, afterEach, trait, test } = Suite;
const Admin = use("App/Models/Admin");
const Guia = use("App/Models/Guia");

trait("Test/ApiClient");
trait("Auth/Client");

test("Should create a guide", async ({ client }) => {
  const admin = await Admin.find(1);
  const response = await client
    .post("/guia/register")
    .send({
      name: "Guia para testes",
      description: "Um guia para testes",
      tel: "24992859059",
      email: "guia1@gmail.com",
      password: "123456789",
    })
    .loginVia(admin)
    .end();
  response.assertStatus(200);
});

test("Should not create a guide because the admin is not authenticated", async ({
  client,
}) => {
  const response = await client
    .post("/guia/register")
    .send({
      name: "Guia para testes",
      description: "Um guia para testes",
      tel: "24992859059",
      email: "guia1@gmail.com",
      password: "123456789",
    })

    .end();
  response.assertStatus(401);
});

test("Should update a guide", async ({ client }) => {
  const admin = await Admin.find(1);
  const response = await client
    .put("/guia/edit/1")
    .send({
      description: "ATUALIZAÇÃO da descrição do guia",
    })
    .loginVia(admin)
    .end();
  response.assertStatus(200);
});

test("Should not update a guide because the admin is not authenticated", async ({
  client,
}) => {
  const response = await client
    .put("/guia/edit/1")
    .send({
      description: "ATUALIZAÇÃO da descrição do guia",
    })
    .end();
  response.assertStatus(401);
});

test("Should not update a guide because the guide do not exist", async ({
  client,
}) => {
  const admin = await Admin.find(1);
  const response = await client
    .put("/guia/edit/111")
    .send({
      description: "ATUALIZAÇÃO da descrição do guia",
    })
    .loginVia(admin)
    .end();
  response.assertStatus(404);
});

test("Should list all guides", async ({ client }) => {
  const admin = await Admin.find(1);
  const response = await client.get("/guia/list").loginVia(admin).end();
  response.assertStatus(200);
});

test("Should not list all guides because the user is not authenticated", async ({
  client,
}) => {
  const response = await client.get("/guia/list").end();
  response.assertStatus(401);
});

test("Should show an specific guide", async ({ client }) => {
  const admin = await Admin.find(1);
  const response = await client.get("/guia/1").loginVia(admin).end();
  response.assertStatus(200);
});

test("Should not show an specific guide because the admin is not authenticated", async ({
  client,
}) => {
  const response = await client.get("/guia/1").end();
  response.assertStatus(401);
});

test("Should not show an specific guide because the guide do not exist", async ({
  client,
}) => {
  const admin = await Admin.find(1);
  const response = await client.get("/guia/111").loginVia(admin).end();
  response.assertStatus(404);
});

test("Should delete a guide", async ({ client }) => {
  const admin = await Admin.find(1);
  const response = await client.delete("/guia/delete/1").loginVia(admin).end();
  response.assertStatus(200);
});

test("Should not delete a guide because the admin is not authenticated", async ({
  client,
}) => {
  const response = await client.delete("/guia/delete/1").end();
  response.assertStatus(401);
});

test("Should not delete a guide because the guide do not exist", async ({
  client,
}) => {
  const admin = await Admin.find(1);
  const response = await client.delete("/guia/delete/1").loginVia(admin).end();
  response.assertStatus(404);
});
