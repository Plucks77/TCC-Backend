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
Route.post("/register", "UserController.register");
Route.post("/login", "UserController.login");
Route.get("/show", "UserController.show");
Route.put("/edit/:id", "UserController.edit").middleware("auth");
Route.delete("/delete/:id", "UserController.delete").middleware("auth");
Route.get("/user/:id", "UserController.user").middleware("auth");


//forgot password
Route.post("/forgotpassword", "ForgotPasswordController.create");
Route.post("/validate", "ForgotPasswordController.validate");
Route.put("/changepassword/:id", "ForgotPasswordController.change");


//Admin
Route.post("/admin/register", "AdminController.register");
Route.post("/admin/login", "AdminController.login");


//Guia
Route.post("/register/guia", "GuiaController.register").middleware("auth:admin");
Route.put("/edit/guia/:id", "GuiaController.edit").middleware("auth:admin");
Route.delete("/delete/guia/:id", "GuiaController.delete").middleware("auth:admin");
Route.get("/list/guias", "GuiaController.list").middleware("auth:admin");
Route.get("/show/guia/:id", "GuiaController.show").middleware("auth:admin");
Route.get("/evaluations/guia/:id", "GuiaController.evaluations").middleware("auth:admin");;
Route.get("/rating/guia/:id", "GuiaController.rating").middleware("auth:admin");;


//Evaluation
Route.post("/register/evaluation", "EvaluationController.register");
Route.get("/show/evaluation", "EvaluationController.show");


//category
Route.post("/register/category", "CategoryController.register").middleware("auth:admin");
Route.put("/edit/category/:id", "CategoryController.edit").middleware("auth:admin");
Route.delete("/delete/category/:id", "CategoryController.delete").middleware("auth:admin");
Route.get("/show/category/:id", "CategoryController.show").middleware("auth:admin");


//pacote
Route.post("/pacote/create", "PacoteController.create").middleware("auth:admin");
Route.put("/pacote/edit/:id", "PacoteController.edit").middleware("auth:admin");
Route.delete("/pacote/delete/:id", "PacoteController.delete").middleware("auth:admin");
Route.get("/pacote/:id", "PacoteController.show").middleware("auth:admin");
Route.get("/pacotes", "PacoteController.list").middleware("auth:admin");