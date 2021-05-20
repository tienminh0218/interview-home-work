const UserModel = require("../Models/user");
const Joi = require("joi");
const validateUser = require("../../utils/validateForm/validateUser");

class UserController {
    /// POST -> /api/v1/user
    /// Desc  Create a new user
    async createUser(req, res) {
        /// Check username is exist
        var isExistAccount = await UserModel.findOne({
            username: req.body.username,
        });
        if (isExistAccount)
            return res.status(409).json({
                success: false,
                message: "Username already exist",
            });

        /// Validate form
        const checked = await validateUser.schemaCreateUser.validate(
            {
                username: req.body.username,
                password: req.body.password,
                name: req.body.name,
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

        UserModel.create(req.body)
            .then((user) => {
                res.status(201).json({
                    success: true,
                    data: user,
                });
            })
            .catch((err) => console.log({ err }));
    }

    /// GET -> /api/v1/user
    /// Desc  Get all user
    getUsers(req, res) {
        UserModel.find()
            .then((users) => {
                res.status(200).json({
                    success: true,
                    count: users.length,
                    data: users,
                });
            })
            .catch((err) => console.log({ err }));
    }

    /// GET -> /api/v1/user/:id
    /// Desc  Get a user
    async getUser(req, res) {
        let user = UserModel.findById(req.params.id).catch((err) => console.log({ err }));

        if (!user)
            return res.status(404).json({
                success: false,
                message: "User not found",
            });

        res.status(200).json({
            success: true,
            data: users,
        });
    }

    /// PUT -> /api/v1/user/:id
    /// Desc  Update a user
    async updateUser(req, res) {
        let oldUser = await UserModel.findById(req.params.id).catch((err) => console.log({ err }));

        UserModel.findByIdAndUpdate(req.params.id, {
            username: req.body.username || oldUser.username,
            password: req.body.password || oldUser.username,
            name: req.body.name || oldUser.username,
            dob: req.body.dob || oldUser.dob,
        })
            .then((user) => {
                res.status(200).json({
                    success: true,
                    data: user,
                });
            })
            .catch((err) => console.log({ err }));
    }

    /// DELETE -> /api/v1/user/:id
    /// Desc  Delete a user
    async deleteUser(req, res) {
        UserModel.findByIdAndDelete(req.params.id)
            .then(() =>
                res.status(204).json({
                    success: true,
                    data: null,
                })
            )
            .catch((err) => console.log({ err }));
    }
}

module.exports = new UserController();
