const User = require("../db/models/user");
const {InvalidFormError, CantFindError} = require("../utils/exceptions");
const {sha512} = require("../utils/auth");
const {PASSWORD_HASH_KEY} = require("../config");

function getAll(req, res, next) {
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

function getById(req, res, next) {
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


function create(req, res, next) {
    let body = req.body;
    body.password = sha512(body.password, PASSWORD_HASH_KEY);
    User.insert(body).then(finRes => {
        res.isSuccess = {
            code: 201,
            data: finRes
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

function _delete(req, res, next) {
    const userId = req.params.id;
    User.deleteById(userId).then(finRes => {
        res.isSuccess = {data: finRes}
        next()
    }).catch(err => {
        res.isErr = {
            message: err,
            code: (err instanceof CantFindError ? 400 : 500),
        }
        next()
    });
}

function update(req, res, next) {
    const userId = req.params.id;
    let body = req.body;
    let oldUserInfo = {}
    User.getById(userId).then(userInfo => {

        oldUserInfo=userInfo;
        if(!body.password){
            body.password = oldUserInfo.password;
        } else {
            body.password = sha512(body.password, PASSWORD_HASH_KEY)
        }

        return User.update(userId, body)
    }).then(finRes => {
        res.isSuccess = {
            data: finRes
        }
        next()
    }).catch(err => {
        res.isErr = {
            message: err,
            code: (err instanceof InvalidFormError || err instanceof CantFindError ? 400 : 500),
        }
        next()
    });
}

module.exports = {
    getAll, getById, delete: _delete, update, create
}