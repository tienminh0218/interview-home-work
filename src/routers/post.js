const express = require("express");
const route = express.Router();
const PostController = require("../app/Controllers/PostController");

route.get("/keywords", PostController.searchPost);
route.get("/:id", PostController.getPost);
route.get("/", PostController.getPosts);
route.post("/", PostController.createPost);

module.exports = route;
