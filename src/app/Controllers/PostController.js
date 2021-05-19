const PostModel = require("../Models/post");
const Joi = require("joi");
const validatePost = require("../../utils/validateForm/validatePost");
const escapeRegex = require("../../utils/fuzzyRegex");

class PostController {
    /// GET -> /api/v1/post
    /// Desc  Get all post
    async getPosts(req, res) {
        PostModel.find()
            .then((posts) =>
                res.status(200).json({ success: true, count: posts.length, data: posts })
            )
            .catch((err) => console.log(err));
    }

    /// GET -> /api/v1/post/:id
    /// Desc  Get a post
    async getPost(req, res) {
        PostModel.findById(req.params.id)
            .then((posts) =>
                res.status(200).json({ success: true, count: posts.length, data: posts })
            )
            .catch((err) => console.log(err));
    }

    /// GET -> /api/v1/post/keywords?k=
    /// Desc  Search post base on keywords
    searchPost(req, res) {
        let title = new RegExp(escapeRegex(req.query.k), "gi");
        PostModel.find({ title })
            .then((posts) =>
                res.status(200).json({ success: true, count: posts.length, data: posts })
            )
            .catch((err) => console.log(err));
    }

    /// POST -> /api/v1/post?id=
    /// Desc  Create a new post
    async createPost(req, res) {
        /// check is exist id
        req.body.owner = req.query?.id;
        console.log(req.body.owner);
        if (!req.body.owner)
            return res.status(400).json({ success: false, message: "Id owner does not exist" });

        /// Validate form
        const checked = await validatePost.schemaCreatePost.validate(
            {
                title: req.body.title,
                content: req.body.content,
                tags: JSON.parse(req.body.tags),
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

        // create a new post
        PostModel.create(req.body)
            .then((post) =>
                res.status(201).json({
                    success: true,
                    data: post,
                })
            )
            .catch((err) => {
                console.log({ err });
            });
    }
}

module.exports = new PostController();
