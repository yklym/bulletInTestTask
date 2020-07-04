const User = require("../db/models/user");
const {InvalidFormError, CantFindError} = require("../utils/exceptions");
const {generateAccessToken} = require("../utils/auth");
const {sha512} = require("../utils/auth");
const {PASSWORD_HASH_KEY} = require("../config");

function register(req, res, next) {
    const body = req.body;
    User.checkIfFreeEmail(body.email).then(emailCheckResult => {

        if (!emailCheckResult) {
            res.isErr = {
                code: 400,
                message: "email is already used",
            }
            next()
        }

        return User.insert(body);

    }).then(finRes => {
        res.isSuccess = {
            code: 201,
            data: {
                token: generateAccessToken({fullName: finRes.firstName + " " + finRes.lastName, _id: finRes._id}),
            }
        }
        next()
    }).catch(err => {
        res.isErr = {
            message: err.toString(),
            code: (err instanceof InvalidFormError ? 400 : 500),
        }
        next()
    });
}

function login(req, res, next) {
    const body = req.body;
    User.getByEmail(body.email).then(userInfo => {
        if (userInfo.password !== sha512(body.password, PASSWORD_HASH_KEY)) {
            return Promise.reject("Wrong password");
        }
        res.isSuccess = {
            data: {
                token: generateAccessToken({fullName: userInfo.firstName + " " + userInfo.lastName, _id: userInfo._id}),
            }
        }
        next();
    }).catch(err => {
        console.log(err)
        res.isErr = {
            code: (err instanceof CantFindError ? 400 : 500),
            message: err.toString()
        }
        next();
    });
}


module.exports = {
    register, login
}