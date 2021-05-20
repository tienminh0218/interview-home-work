const express = require("express");
const route = express.Router();
const PostController = require("../app/Controllers/PostController");

route.get("/comments", PostController.getPostsAndComments);
route.get("/comment", PostController.getComment);
route.get("/keywords", PostController.searchPost);
route.get("/:id", PostController.getPost);
route.get("/", PostController.getPosts);
route.post("/", PostController.createPost);
route.delete("/:id", PostController.deletePost);
route.put("/:id", PostController.updatePost);

module.exports = route;
