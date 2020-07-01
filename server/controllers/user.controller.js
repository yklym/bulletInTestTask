const User = require("../db/models/user");
const {InvalidFormError} = require("../utils/exceptions");

module.exports.getAll = function (req, res, next) {
    try {
        res.isSuccess = User.getAll()
    } catch (e) {
        res.isErr = {
            code: (e instanceof InvalidFormError ? 400 : 500),
            message: e.toString()
        }
    }
    next()
}

module.exports.create = function (req, res, next) {
    let body = req.body;
    let newUser = {}
    try {
        newUser = new User(body);
    } catch (e) {
        res.isErr = {
            code: (e instanceof InvalidFormError ? 400 : 500),
            message: e.toString()
        }
        next()
    }

    User.insert(newUser).then(finRes => {
        res.isSuccess = {
            code: 201,
            data: finRes
        }
        next()
    }).catch(err => {
        res.isErr = {
            message: err,
            code: 400
        }
        next()
    });
    try {
        res.isSuccess = User.getAll()
    } catch (e) {
        res.isErr = {
            code: 400,
            message: e
        }
    }
}

