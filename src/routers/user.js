const express = require("express");
const route = express.Router();
const UserController = require("../app/Controllers/UserController");

route.get("/", UserController.getUsers);
route.get("/:id", UserController.getUser);
route.post("/", UserController.createUser);
route.put("/:id", UserController.updateUser);
route.delete("/:id", UserController.deleteUser);

module.exports = route;
