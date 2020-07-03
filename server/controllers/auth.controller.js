const User = require("../db/models/user");
const {InvalidFormError, CantFindError} = require("../utils/exceptions");

function register(req, res, next) {
    console.log(req.body);
    User.getAll().then(usersList => {
        res.isSuccess = {data: usersList}
        next()
    }).catch(e => {
        res.isErr = {
            code: 500,
            message: e.toString()
        }
        next();
    });
}

function login(req, res, next) {
    console.log(req.body);
    const userId = req.params.id;
    User.getById(userId).then(userInfo => {
        res.isSuccess = {data: userInfo}
        next();
    }).catch(err => {
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