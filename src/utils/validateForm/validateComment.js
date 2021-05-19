const Joi = require("joi");

/// Schema comment form
var schemaComment = Joi.object().keys({
    content: Joi.string()
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                switch (err.code) {
                    case "string.empty":
                    case "any.required":
                        err.message = "Content should not be empty";
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
});

module.exports = { schemaComment };
