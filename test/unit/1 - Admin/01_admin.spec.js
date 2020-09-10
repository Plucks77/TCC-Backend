"use strict";
const Suite = use("Test/Suite")("Admin");
const { before, beforeEach, after, afterEach, trait, test } = Suite;
const Admin = use("App/Models/Admin");

trait("Test/ApiClient");
trait("Auth/Client");

test("Should create an admin account", async ({ client }) => {
  const response = await client
    .post("/admin/register")
    .send({
      email: "pedro_leoti@hotmail.com",
      password: "123456789",
    })
    .end();

  response.assertStatus(200);
});

test("Should not create an admin account, because the email already exsists", async ({
  client,
}) => {
  const response = await client
    .post("/admin/register")
    .send({
      email: "pedro_leoti@hotmail.com",
      password: "123456789",
    })
    .end();

  response.assertStatus(406);
});

test("Should logint the admin", async ({ client }) => {
  const response = await client
    .post("/admin/login")
    .send({
      email: "pedro_leoti@hotmail.com",
      password: "123456789",
    })
    .end();

  response.assertStatus(200);
});

test("Should not logint the admin, because the email is wrong", async ({
  client,
}) => {
  const response = await client
    .post("/admin/login")
    .send({
      email: "pedro_leoti@hotmail.com.br",
      password: "123456789",
    })
    .end();

  response.assertStatus(401);
});

test("Should not logint the admin, because the password is wrong", async ({
  client,
}) => {
  const response = await client
    .post("/admin/login")
    .send({
      email: "pedro_leoti@hotmail.com",
      password: "1111111",
    })
    .end();

  response.assertStatus(401);
});
