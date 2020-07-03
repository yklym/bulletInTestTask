const Post = require("../db/models/post");
const {InvalidFormError, CantFindError} = require("../utils/exceptions");

function getAll(req, res, next) {
    Post.getAll().then(postsList => {
        res.isSuccess = {data: postsList}
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
    const postId = req.params.id;
    Post.getById(postId).then(postInfo => {
        res.isSuccess = {data: postInfo}
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
    Post.insert(body).then(finRes => {
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
    const postId = req.params.id;
    Post.deleteById(postId).then(finRes => {
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
    const postId = req.params.id;

    Post.update(postId, body).then(finRes => {
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