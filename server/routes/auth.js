const express = require('express');
const router = express.Router();
const {sendResponse} = require("../middlewares/basic.moddlewares");
const authController = require("../controllers/auth.controller");

//Todo Auth
router.post('/register', authController.register, sendResponse);
router.post('/login', authController.login, sendResponse);


module.exports = router;