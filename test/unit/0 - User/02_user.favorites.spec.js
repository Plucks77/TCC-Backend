"use strict";
const Suite = use("Test/Suite")("User - Favorites");
const { before, beforeEach, after, afterEach, trait, test } = Suite;
const User = use("App/Models/User");
const Pacote = use("App/Models/Pacote");

trait("Test/ApiClient");
trait("Auth/Client");

before(async () => {
  await User.create({
    username: "Plucks",
    email: "pedro_leoti@hotmail.com",
    password: "123456789",
    tel: "992859059",
  });
});

test("The user should favorite a package", async ({ client, assert }) => {
  const user = await User.find(2);

  const response = await client
    .post("/user/pacote/favorite")
    .send({
      user_id: 2,
      pacote_id: 1,
    })
    .loginVia(user)
    .end();

  response.assertStatus(200);
});

test("The user should not favorite a package because the user is not authenticated", async ({
  client,
  assert,
}) => {
  const response = await client
    .post("/user/pacote/favorite")
    .send({
      user_id: 2,
      pacote_id: 1,
    })
    .end();

  response.assertStatus(401);
});

test("The user should not favorite a package because the user do not exist", async ({
  client,
  assert,
}) => {
  const user = await User.find(2);

  const response = await client
    .post("/user/pacote/favorite")
    .send({
      user_id: 3,
      pacote_id: 1,
    })
    .loginVia(user)
    .end();

  response.assertStatus(404);
});

test("The user should not favorite a package because the package do not exist", async ({
  client,
  assert,
}) => {
  const user = await User.find(2);

  const response = await client
    .post("/user/pacote/favorite")
    .send({
      user_id: 2,
      pacote_id: 2,
    })
    .loginVia(user)
    .end();

  response.assertStatus(404);
});

test("Should get the favorited packages from a user", async ({
  client,
  assert,
}) => {
  const user = await User.find(2);

  const response = await client.get("/user/favorites/2").loginVia(user).end();

  response.assertStatus(200);
});

test("Should not get the favorited packages from a user because the user do not exist", async ({
  client,
  assert,
}) => {
  const user = await User.find(2);

  const response = await client.get("/user/favorites/3").loginVia(user).end();

  response.assertStatus(404);
});

test("Should not get the favorited packages from a user because the user is not authenticated", async ({
  client,
  assert,
}) => {
  const response = await client.get("/user/favorites/2").end();

  response.assertStatus(401);
});

test("Should check if a package is favorited for a user", async ({
  client,
  assert,
}) => {
  const user = await User.find(2);
  const response = await client
    .post("/favorited")
    .send({
      user_id: 2,
      pacote_id: 1,
    })
    .loginVia(user)
    .end();

  response.assertStatus(200);
});

test("Should not check if a package is favorited for a user because the user do not exist", async ({
  client,
  assert,
}) => {
  const user = await User.find(2);
  const response = await client
    .post("/favorited")
    .send({
      user_id: 3,
      pacote_id: 1,
    })
    .loginVia(user)
    .end();

  response.assertStatus(404);
});

test("Should not check if a package is favorited for a user because the package do not exist", async ({
  client,
  assert,
}) => {
  const user = await User.find(2);
  const response = await client
    .post("/favorited")
    .send({
      user_id: 2,
      pacote_id: 2,
    })
    .loginVia(user)
    .end();

  response.assertStatus(404);
});

test("Should not check if a package is favorited for a user because the user is not authenticated", async ({
  client,
  assert,
}) => {
  const response = await client
    .post("/favorited")
    .send({
      user_id: 2,
      pacote_id: 1,
    })
    .end();

  response.assertStatus(401);
});

test("Should unfavorite a package for a user", async ({ client, assert }) => {
  const user = await User.find(2);
  const response = await client
    .post("/unfavorite")
    .send({
      user_id: 2,
      pacote_id: 1,
    })
    .loginVia(user)
    .end();

  response.assertStatus(200);
});

test("Should not unfavorite a package for a user because the user do not exist", async ({
  client,
  assert,
}) => {
  const user = await User.find(2);
  const response = await client
    .post("/unfavorite")
    .send({
      user_id: 3,
      pacote_id: 1,
    })
    .loginVia(user)
    .end();

  response.assertStatus(404);
});

test("Should not unfavorite a package for a user because the pakcage do not exist", async ({
  client,
  assert,
}) => {
  const user = await User.find(2);
  const response = await client
    .post("/unfavorite")
    .send({
      user_id: 2,
      pacote_id: 2,
    })
    .loginVia(user)
    .end();

  response.assertStatus(404);
});

test("Should not unfavorite a package for a user because the user is not authenticated", async ({
  client,
  assert,
}) => {
  const response = await client
    .post("/unfavorite")
    .send({
      user_id: 2,
      pacote_id: 1,
    })
    .end();

  response.assertStatus(401);
});
