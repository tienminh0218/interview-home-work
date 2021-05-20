const user = require("./user");
const post = require("./post");
const comment = require("./comment");
const auth = require("../app/Middlewares/auth");

function route(app) {
    app.use("/api/v1/user", user);
    app.use("/api/v1/post", post);
    app.use("/api/v1/comment", auth, comment);
}

module.exports = route;
