const express = require('express');
const router = express.Router();
const {sendResponse} = require("../middlewares/basic.moddlewares");
const {authenticateToken, checkIfOwner} = require("../middlewares/auth.middlewares");
const userController = require("../controllers/user.controller");

// don't need this at the moment
// router.get('/', userController.getAll, sendResponse);
router.get('/:id', authenticateToken, checkIfOwner, userController.getById, sendResponse);
//
// router.delete('/:id', userController.delete, sendResponse);

// Todo checck if user owns page
router.put('/:id', authenticateToken, checkIfOwner, userController.update, sendResponse);

module.exports = router;