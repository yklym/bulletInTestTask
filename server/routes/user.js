const express = require('express');
const router = express.Router();
const {sendResponse} = require("../middlewares/basic.moddlewares");
const userController = require("../controllers/user.controller");

// don't need this at the moment
// router.get('/', userController.getAll, sendResponse);
// router.get('/:id', userController.getById, sendResponse);
//
// router.delete('/:id', userController.delete, sendResponse);

// Todo checck if user owns page
router.put('/:id', userController.update, sendResponse);

module.exports = router;