"use strict";
const Suite = use("Test/Suite")("User - Purchase");
const { before, beforeEach, after, afterEach, trait, test } = Suite;
const User = use("App/Models/User");
const Pacote = use("App/Models/Pacote");

trait("Test/ApiClient");
trait("Auth/Client");

test("The user should buy a package", async ({ client, assert }) => {
  const user = await User.find(2);
  const response = await client
    .post("/purchase")
    .send({
      user_id: 2,
      pacote_id: 1,
    })
    .loginVia(user)
    .end();

  response.assertStatus(200);
});

test("The user should not buy a package because the user is not authenticated", async ({
  client,
  assert,
}) => {
  const response = await client
    .post("/purchase")
    .send({
      user_id: 2,
      pacote_id: 1,
    })
    .end();

  response.assertStatus(401);
});

test("The user should buy not a package because the user do not exist", async ({
  client,
  assert,
}) => {
  const user = await User.find(2);
  const response = await client
    .post("/purchase")
    .send({
      user_id: 1,
      pacote_id: 1,
    })
    .loginVia(user)
    .end();

  response.assertStatus(404);
});

test("The user should buy not a package because the pakcage do not exist", async ({
  client,
  assert,
}) => {
  const user = await User.find(2);
  const response = await client
    .post("/purchase")
    .send({
      user_id: 2,
      pacote_id: 111,
    })
    .loginVia(user)
    .end();

  response.assertStatus(404);
});

test("Should list the purchases of a user", async ({ client, assert }) => {
  const user = await User.find(2);
  const response = await client.get("/purchases/user/2").loginVia(user).end();

  response.assertStatus(200);
});

test("Should not list the purchases of a user because the user is not authenticated", async ({
  client,
  assert,
}) => {
  const response = await client.get("/purchases/user/2").end();

  response.assertStatus(401);
});

test("Should not list the purchases of a user because the user do not exist", async ({
  client,
  assert,
}) => {
  const user = await User.find(2);
  const response = await client.get("/purchases/user/222").loginVia(user).end();

  response.assertStatus(404);
});
