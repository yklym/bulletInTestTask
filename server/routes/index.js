const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.send("Documentation for the API:");
});

const usersRouter = require('./user');
const postsRouter = require('./post');
const authRouter = require('./auth');

router.use("/users", usersRouter);
router.use("/posts", postsRouter);
router.use("/auth", authRouter);

module.exports = router;
