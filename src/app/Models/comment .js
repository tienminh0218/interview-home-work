const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        owner: { type: String },
        post: { type: String },
        content: { type: String },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("comments", Comment);
