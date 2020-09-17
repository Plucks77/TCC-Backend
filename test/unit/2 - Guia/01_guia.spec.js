"use strict";
const Suite = use("Test/Suite")("Guia - Auth");
const { before, beforeEach, after, afterEach, trait, test } = Suite;
const Guia = use("App/Models/Guia");
const Pacote = use("App/Models/Pacote");

trait("Test/ApiClient");
trait("Auth/Client");

before(async () => {
  await Guia.create({
    name: "Guia para testes",
    description: "Um guia para testes",
    tel: "24992859059",
    email: "guia2@gmail.com",
    password: "123456789",
  });
});

test("Should login the guide", async ({ client, assert }) => {
  const response = await client
    .post("/guia/login")
    .send({
      email: "guia2@gmail.com",
      password: "123456789",
    })
    .end();
  response.assertStatus(200);
});

test("Should not login the guide because the email is wrong", async ({
  client,
  assert,
}) => {
  const response = await client
    .post("/guia/login")
    .send({
      email: "guia1111@gmail.com",
      password: "123456789",
    })
    .end();
  response.assertStatus(400);
});

test("Should not login the guide because the password is wrong", async ({
  client,
  assert,
}) => {
  const response = await client
    .post("/guia/login")
    .send({
      email: "guia2@gmail.com",
      password: "11111111",
    })
    .end();
  response.assertStatus(400);
});

test("Should verify if the guide has the notification token", async ({
  client,
  assert,
}) => {
  const guia = await Guia.find(2);
  const response = await client.get("guia/verify/2").loginVia(guia).end();
  response.assertStatus(200);
});

test("Should not verify if the guide has the notification token bencause the guide is not authenticated", async ({
  client,
  assert,
}) => {
  const response = await client.get("guia/verify/2").end();
  response.assertStatus(401);
});
