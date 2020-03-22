"use strict";
const { test, trait } = use("Test/Suite")("User");
const User = use("App/Models/User");

trait("Test/ApiClient");
trait("Auth/Client");

test("Should create a user", async ({ client }) => {
  const response = await client
    .post("/register")
    .send({
      username: "Plucks",
      email: "pedro_leoti@hotmail.com",
      password: "123456789",
      tel: "992859059"
    })
    .end();

  response.assertStatus(200);
});

test("Should not create a user", async ({ client }) => {
  const response = await client
    .post("/register")
    .send({
      username: "Plucks",
      email: "pedro_leoti@hotmail.com",
      password: "123456789",
      tel: "992859059"
    })
    .end();

  response.assertStatus(406);
});

test("Should login", async ({ client, assert }) => {
  const response = await client
    .post("/login")
    .send({
      email: "pedro_leoti@hotmail.com",
      password: "123456789"
    })
    .end();

  response.assertStatus(200);
  assert.exists(response.body.user_id, response.body.token);
});

test("Should not login", async ({ client, assert }) => {
  const response = await client
    .post("/login")
    .send({
      email: "pedro_leoti@hotmail.com",
      password: "biribiri"
    })
    .end();

  response.assertStatus(401);
  assert.notExists(response.body.user_id, response.body.token);
});

test("Should update the user", async ({ client, assert }) => {
  const user = await User.find(1);

  const response = await client
    .put("/edit/1")
    .send({
      username: "Plucks77"
    })
    .loginVia(user)
    .end();

  response.assertStatus(200);
});

test("Should not update the user because the user do not exist", async ({
  client,
  assert
}) => {
  const user = await User.find(1);

  const response = await client
    .put("/edit/2")
    .send({
      username: "Plucks77"
    })
    .loginVia(user)
    .end();

  response.assertStatus(401);
});

test("Should not update the user because the user is not authenticated", async ({
  client,
  assert
}) => {
  const response = await client
    .put("/edit/2")
    .send({
      username: "Plucks77"
    })
    .end();

  response.assertStatus(401);
});

test("Should not delete the user because the user do not exist", async ({
  client,
  assert
}) => {
  const user = await User.find(1);

  const response = await client
    .delete("/delete/2")
    .loginVia(user)
    .end();

  response.assertStatus(401);
});

test("Should not delete the user because the user is not authenticated", async ({
  client,
  assert
}) => {
  const user = await User.find(1);

  const response = await client.delete("/delete/1").end();

  response.assertStatus(401);
});

test("Should delete the user", async ({ client, assert }) => {
  const user = await User.find(1);

  const response = await client
    .delete("/delete/1")
    .loginVia(user)
    .end();

  response.assertStatus(200);
});
