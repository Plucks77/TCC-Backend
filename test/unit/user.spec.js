"use strict";
const { test, trait } = use("Test/Suite")("User");
const User = use("App/Models/User");
const Database = use("Database");

trait("Test/ApiClient");
async function clearDatabase() {
  await Database.raw("truncate tokens, users RESTART IDENTITY");
}

test("Should create a user", async ({ client }) => {
  clearDatabase();
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
