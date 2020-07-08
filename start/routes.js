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
//User
Route.post("/user/register", "UserController.register");
Route.post("/user/login", "UserController.login");
Route.get("/user/list", "UserController.list");
Route.put("/user/edit/:id", "UserController.edit").middleware("auth");
Route.delete("/user/delete/:id", "UserController.delete").middleware("auth");
Route.get("/user/:id", "UserController.user").middleware("auth");


//Forgot Password
Route.post("/forgotpassword", "ForgotPasswordController.create");
Route.post("/validate", "ForgotPasswordController.validate");
Route.put("/changepassword/:id", "ForgotPasswordController.change");


//Admin
Route.post("/admin/register", "AdminController.register");
Route.post("/admin/login", "AdminController.login");


//Guia
Route.post("/guia/register", "GuiaController.register").middleware("auth:admin");
Route.put("/guia/edit/:id", "GuiaController.edit").middleware("auth:admin");
Route.delete("/guia/delete/:id", "GuiaController.delete").middleware("auth:admin");
Route.get("/guia/list", "GuiaController.list").middleware("auth:admin");
Route.get("/guia/:id", "GuiaController.show").middleware("auth:admin");
Route.get("/guia/evaluations/:id", "GuiaController.evaluations").middleware("auth:admin");;
Route.get("/guia/rating/:id", "GuiaController.rating").middleware("auth:admin");;


//Evaluation
Route.post("/evaluation/register", "EvaluationController.register");
Route.get("/evaluation/show", "EvaluationController.show");


//Category
Route.post("/category/register", "CategoryController.register").middleware("auth:admin");
Route.put("/category/edit/:id", "CategoryController.edit").middleware("auth:admin");
Route.delete("/category/delete/:id", "CategoryController.delete").middleware("auth:admin");
Route.get("/category/show/:id", "CategoryController.show").middleware("auth:admin");
Route.get("/category/list/", "CategoryController.list").middleware("auth:admin");


//Pacote
Route.post("/pacote/create", "PacoteController.create").middleware("auth:admin");
Route.put("/pacote/edit/:id", "PacoteController.edit").middleware("auth:admin");
Route.delete("/pacote/delete/:id", "PacoteController.delete").middleware("auth:admin");
Route.get("/pacote/:id", "PacoteController.show").middleware("auth:admin");
Route.get("/pacotes", "PacoteController.list").middleware("auth:admin");
Route.get("/pacote/local/:id", "PacoteController.filtered").middleware("auth:admin");

//City
Route.get("/cities", "CityController.list").middleware("auth");;

//Local
Route.get("/locals", "LocalController.list").middleware("auth");;
Route.get("/local/city/:id", "LocalController.filtered").middleware("auth");;