const PostModel = require("../Models/post");
const CommentModel = require("../Models/comment ");
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

    /// GET /api/v1/post/comments
    /// Desc  Get all posts and comments
    getPostsAndComments(req, res) {
        PostModel.aggregate([
            { $addFields: { string_id: { $toString: "$_id" } } },
            {
                $lookup: {
                    from: "comments",
                    localField: "string_id",
                    foreignField: "post",
                    as: "comments",
                },
            },
        ])
            .then((data) => {
                data.forEach((element) => {
                    element.sizeComment = element.comments.length;
                });
                res.status(200).json({ success: true, data });
            })
            .catch((err) => console.log({ err }));
    }

    /// GET /api/v1/post/comment?post=
    /// Desc  get comments in post
    getComment(req, res) {
        CommentModel.find({ post: req.query.post })
            .then((comments) =>
                res.status(200).json({
                    success: true,
                    data: comments,
                    count: comments.length,
                })
            )
            .catch((err) => {
                console.log({ err });
            });
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

    /// DELETE -> /api/v1/post/:id
    /// Desc  delete a post
    async deletePost(req, res) {
        let post = await PostModel.findByIdAndDelete(req.params.id).catch((err) =>
            console.log(err)
        );

        if (!post) return res.status(404).json({ success: false, message: "post not found" });

        res.status(204).json({ success: true, data: null });
    }

    /// PUT -> /api/v1/post/:id
    /// Desc  update a post
    async updatePost(req, res) {
        let oldPost = await PostModel.findById(req.params.id).catch((err) => console.log(err));

        if (!oldPost) return res.status(404).json({ success: false, message: "post not found" });

        PostModel.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title || oldPost.title,
                content: req.body.content || oldPost.content,
                tags: req.body.tags || oldPost.tags,
            },
            { new: true }
        ).then((post) => res.status(200).json({ success: true, data: post }));
    }
}

module.exports = new PostController();
