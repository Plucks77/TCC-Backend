"use strict";
const Suite = use("Test/Suite")("User - Auth");
const { before, beforeEach, after, afterEach, trait, test } = Suite;
const User = use("App/Models/User");
const Pacote = use("App/Models/Pacote");

trait("Test/ApiClient");
trait("Auth/Client");

before(async () => {
  await Pacote.create({
    category_id: 1,
    guia_id: 1,
    local_id: 1,
    name: "Pacote de teste",
    description: "Descrição do pacote de teste",
    price: 1000,
    date: "25/12/2020",
    image_url: "www.google.com",
  });
});

test("Should create a user", async ({ client }) => {
  const response = await client
    .post("/user/register")
    .send({
      username: "Plucks",
      email: "pedro_leoti@hotmail.com",
      password: "123456789",
      tel: "992859059",
    })
    .end();

  response.assertStatus(200);
});

test("Should not create a user", async ({ client }) => {
  const response = await client
    .post("/user/register")
    .send({
      username: "Plucks",
      email: "pedro_leoti@hotmail.com",
      password: "123456789",
      tel: "992859059",
    })
    .end();

  response.assertStatus(406);
});

test("Should login", async ({ client, assert }) => {
  const response = await client
    .post("/user/login")
    .send({
      email: "pedro_leoti@hotmail.com",
      password: "123456789",
    })
    .end();

  response.assertStatus(200);
});

test("Should not login because the email is wrong", async ({
  client,
  assert,
}) => {
  const response = await client
    .post("/user/login")
    .send({
      email: "pedro_leoti@hotmail.com.br",
      password: "123456789",
    })
    .end();

  response.assertStatus(401);
});

test("Should not login because the password is wrong", async ({
  client,
  assert,
}) => {
  const response = await client
    .post("/user/login")
    .send({
      email: "pedro_leoti@hotmail.com",
      password: "biribiri",
    })
    .end();

  response.assertStatus(401);
});

test("Should update the user", async ({ client, assert }) => {
  const user = await User.find(1);

  const response = await client
    .put("/user/edit/1")
    .send({
      username: "Plucks77",
    })
    .loginVia(user)
    .end();

  response.assertStatus(200);
});

test("Should not update the user because the user do not exist", async ({
  client,
  assert,
}) => {
  const user = await User.find(1);

  const response = await client
    .put("/user/edit/2")
    .send({
      username: "Plucks77",
    })
    .loginVia(user)
    .end();

  response.assertStatus(401);
});

test("Should not update the user because the user is not authenticated", async ({
  client,
  assert,
}) => {
  const response = await client
    .put("/user/edit/2")
    .send({
      username: "Plucks77",
    })
    .end();

  response.assertStatus(401);
});

test("Should not delete the user because the user do not exist", async ({
  client,
  assert,
}) => {
  const user = await User.find(1);

  const response = await client.delete("/user/delete/2").loginVia(user).end();

  response.assertStatus(401);
});

test("Should not delete the user because the user is not authenticated", async ({
  client,
  assert,
}) => {
  const user = await User.find(1);

  const response = await client.delete("/user/delete/1").end();

  response.assertStatus(401);
});

test("Should show the user", async ({ client, assert }) => {
  const user = await User.find(1);

  const response = await client.get("/user/1").loginVia(user).end();

  response.assertStatus(200);
});

test("Should not show the user because the user is not authenticated", async ({
  client,
  assert,
}) => {
  const response = await client.get("/user/1").end();

  response.assertStatus(401);
});

test("Should delete the user", async ({ client, assert }) => {
  const user = await User.find(1);

  const response = await client.delete("/user/delete/1").loginVia(user).end();

  response.assertStatus(200);
});

test("Should not show the user because the user does not exist", async ({
  client,
  assert,
}) => {
  const response = await client.get("/user/2").end();

  response.assertStatus(401);
});
