const PostModel = require("../Models/post");
const CommentModel = require("../Models/comment ");
const Joi = require("joi");
const validateComment = require("../../utils/validateForm/validateComment");

class CommentController {
    /// GET -> /api/v1/comment
    /// Desc  Get all comment
    async getComments(req, res) {
        CommentModel.find()
            .then((comments) =>
                res.status(200).json({ success: true, count: comments.length, data: comments })
            )
            .catch((err) => console.log(err));
    }

    /// GET -> /api/v1/comment/:id
    /// Desc  Get comment form id
    async getComment(req, res) {
        CommentModel.findById(req.params.id)
            .then((comment) => res.status(200).json({ success: true, data: comment }))
            .catch((err) => console.log({ err }));
    }

    /// POST -> /api/v1/comment/:id
    /// Desc  create a new comment
    async createComment(req, res) {
        req.body.post = req.params.id;
        req.body.owner = req.user.id;

        /// Validate form
        const checked = await validateComment.schemaComment.validate(
            {
                content: req.body.content,
            },
            {
                abortEarly: false,
            }
        );
        const { error } = checked;
        if (error)
            return res.status(400).json({
                success: false,
                message: error.details,
            });

        const isPostExist = await PostModel.findById(req.params.id);
        if (!isPostExist)
            return res.status(404).json({ success: false, message: "post is not exist" });

        CommentModel.create(req.body)
            .then((comment) => res.status(201).json({ success: true, data: comment }))
            .catch((err) => console.log({ err }));
    }
}

module.exports = new CommentController();
