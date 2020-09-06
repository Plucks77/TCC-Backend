"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");
//User
Route.post("/user/register", "UserController.register");
Route.post("/user/login", "UserController.login");
Route.get("/user/list", "UserController.list");
Route.post("/user/pacote/favorite", "UserController.favorite").middleware("auth");
Route.get("/user/favorites/:id", "UserController.favorites").middleware("auth");
Route.put("/user/edit/:id", "UserController.edit").middleware("auth");
Route.delete("/user/delete/:id", "UserController.delete").middleware("auth");
Route.get("/user/:id", "UserController.user").middleware("auth");

//Favorite
Route.post("/favorited", "FavoriteController.isFavorited").middleware("auth");
Route.post("/unfavorite", "FavoriteController.unfavorite").middleware("auth");


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
Route.get("/guia/:id", "GuiaController.show").middleware("auth:admin,auth:jwt");
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
Route.get("/pacote/:id", "PacoteController.show").middleware("auth:admin,auth:jwt");
Route.get("/pacotes", "PacoteController.list").middleware("auth:admin");
Route.get("/pacote/local/:id", "PacoteController.filtered").middleware("auth:admin,auth:jwt");

//PacoteFotos
Route.post("/foto/create", "PacoteFotoController.create").middleware("auth:admin");
Route.delete("/foto/delete/:id", "PacoteFotoController.delete").middleware("auth:admin");
Route.get("/fotos/pacote/:pacote_id", "PacoteFotoController.getFotos").middleware("auth:admin,auth:jwt");

//Foto
Route.post("/envia/foto/:local", "FotoController.create").middleware("auth:admin");
Route.delete("/delete/foto", "FotoController.delete").middleware("auth:admin");

//City
Route.get("/cities", "CityController.list").middleware("auth:admin,auth:jwt");

//Local
Route.get("/locals", "LocalController.list").middleware("auth:admin,auth:jwt");
Route.get("/local/city/:id", "LocalController.filtered").middleware("auth:admin,auth:jwt");
Route.get("/local/:id", "LocalController.show").middleware("auth:admin,auth:jwt");

//Purchase
Route.post("/purchase", "PurchaseController.create").middleware("auth");
Route.get("/purchases/user/:user_id", "PurchaseController.filtered").middleware("auth");
Route.get("/purchases/haspurchases/:user_id", "PurchaseController.haspurchases").middleware("auth");
Route.get("/purchase/confirm/user/:user_id/pacote/:pacote_id", "PurchaseController.confirmUser")//.middleware("auth");
Route.get("/purchase/list/:pacote_id", "PurchaseController.listUsers").middleware("auth");
