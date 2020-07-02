const User = require("../db/models/user");
const {InvalidFormError, CantFindError} = require("../utils/exceptions");

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
    console.log(body);
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
    let body = req.body;
    const userId = req.params.id;

    User.update(userId, body).then(finRes => {
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