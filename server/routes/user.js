const express = require('express');
const router = express.Router();
const {sendResponse} = require("../middlewares/basic.moddlewares");
const {getAll, create} = require("../controllers/user.controller");

router.get('/', getAll, sendResponse);

router.post('/', create, sendResponse);

module.exports = router;