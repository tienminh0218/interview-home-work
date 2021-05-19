const Joi = require("joi");

/// Schema post form
var schemaCreatePost = Joi.object().keys({
    title: Joi.string()
        .min(3)
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.code) {
                    case "string.empty":
                    case "any.required":
                        err.message = "Title should not be empty";
                        break;
                    case "string.min":
                        err.message = `Title should have at least ${err.local.limit} characters`;
                        break;
                    case "string.alphanum":
                        err.message = "Invalid title";
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
    content: Joi.string()
        .min(6)
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.code) {
                    case "string.empty":
                    case "any.required":
                        err.message = "Content should not be empty";
                        break;
                    case "string.min":
                        err.message = `Content should have at least ${err.local.limit} characters`;
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
    tags: Joi.array()
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.code) {
                    case "string.empty":
                    case "any.required":
                        err.message = "Tags should not be empty";
                        break;
                    case "string.min":
                        err.message = `Tags should have at least ${err.local.limit} tag`;
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
});

module.exports = { schemaCreatePost };
