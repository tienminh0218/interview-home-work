const express = require("express");
const route = express.Router();
const CommentController = require("../app/Controllers/CommentController");

route.get("/", CommentController.getComments);
route.get("/:id", CommentController.getComment);
route.post("/:id", CommentController.createComment);

module.exports = route;
