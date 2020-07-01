const express = require('express');
const router = express.Router();
const {sendResponse} = require("../middlewares/basic.moddlewares");
const {getAll} = require("../controllers/user.controller");

router.get('/', getAll, sendResponse);

module.exports = router;
