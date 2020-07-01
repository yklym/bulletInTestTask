const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.send("Documentation for the API:");
});

const usersRoute = require('./user');
const postsRoute = require('./post');

router.use("/users", usersRoute)
router.use("/posts", postsRoute)

module.exports = router;
