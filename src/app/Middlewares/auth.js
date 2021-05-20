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
        return res.status(403).json({ message: "user not authorized to access this route" });
    }
}

module.exports = checkUser;
