const express = require('express');
const router = express.Router();
const {sendResponse} = require("../middlewares/basic.moddlewares");
const userController = require("../controllers/user.controller");

//Todo Auth
router.post('/register', userController.create, sendResponse);
router.post('/login', userController.getById, sendResponse);


module.exports = router;