const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");

const Post = new Schema(
    {
        owner: { type: String },
        title: { type: String },
        content: { type: String },
        tags: { type: String },
        slug: { type: String, slug: "title", unique: true },
    },
    {
        timestamps: true,
    }
);

/// add plugin
mongoose.plugin(slug);

module.exports = mongoose.model("posts", Post);
