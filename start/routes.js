"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");
//user
Route.post("/register", "UserController.register");
Route.post("/login", "UserController.login");
Route.get("/show", "UserController.show");
Route.put("/edit/:id", "UserController.edit").middleware("auth");
Route.delete("/delete/:id", "UserController.delete").middleware("auth");
Route.get("/user/:id", "UserController.user").middleware("auth");
//forgot password
Route.post("/forgotpassword/:id", "ForgotPasswordController.create").middleware(
  "auth"
);
Route.post("/validate", "ForgotPasswordController.validate");
Route.put("/changepassword/:id", "ForgotPasswordController.change");
//guia
Route.post("/register/guia", "GuiaController.register");
Route.put("/edit/guia/:id", "GuiaController.edit");
Route.delete("/delete/guia/:id", "GuiaController.delete");
Route.get("/show/guia", "GuiaController.show");
Route.get("/evaluations/guia/:id", "GuiaController.evaluations");
//evaluation
Route.post("/register/evaluation", "EvaluationController.register");
Route.get("/show/evaluation", "EvaluationController.show");
//category
Route.post("/register/category", "CategoryController.register");
Route.put("/edit/category/:id", "CategoryController.edit");
Route.delete("/delete/category/:id", "CategoryController.delete");
Route.get("/show/category/:id", "CategoryController.show");
//pacote
