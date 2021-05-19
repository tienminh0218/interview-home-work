const Joi = require("joi");

/// Schema account register form
var schemaCreateUser = Joi.object().keys({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.code) {
                    case "string.empty":
                    case "any.required":
                        err.message = "Username should not be empty";
                        break;
                    case "string.min":
                        err.message = `Username should have at least ${err.local.limit} characters`;
                        break;
                    case "string.max":
                        err.message = `Username should have at most ${err.local.limit} characters`;
                        break;
                    case "string.alphanum":
                        err.message = "Username can not contain special characters";
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
    password: Joi.string()
        .min(6)
        .max(30)
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.code) {
                    case "string.empty":
                    case "any.required":
                        err.message = "Password should not be empty";
                        break;
                    case "string.min":
                        err.message = `Password should have at least ${err.local.limit} characters`;
                        break;
                    case "string.max":
                        err.message = `Password should have at most ${err.local.limit} characters`;
                        break;
                    case "string.alphanum":
                        err.message = "Đừng hack em anh ơi";
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
    name: Joi.string()
        .min(6)
        .max(50)
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.code) {
                    case "string.empty":
                    case "any.required":
                        err.message = "Name should not be empty";
                        break;
                    case "string.min":
                        err.message = `Name should have at least ${err.local.limit} characters`;
                        break;
                    case "string.max":
                        err.message = `Name should have at most ${err.local.limit} characters`;
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
});

module.exports = { schemaCreateUser };
