const UserModel = require("../Models/user");
const jwt = require("jsonwebtoken");

async function checkUser(req, res, next) {
    let token = req.cookies.token;
    try {
        let secret = process.env.SECRECT;
        let decoded = jwt.verify(token, secret);
        req.user = await UserModel.findById(decoded.id).catch((err) => console.log(err));
        next();
    } catch (error) {
        return console.log({ err });
    }
}

module.exports = checkUser;
