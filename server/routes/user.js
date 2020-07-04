const express = require('express');
const router = express.Router();
const {sendResponse} = require("../middlewares/basic.moddlewares");
const {authenticateToken, checkIfOwner} = require("../middlewares/auth.middlewares");
const userController = require("../controllers/user.controller");

router.put('/:id', authenticateToken, checkIfOwner, userController.update, sendResponse);
router.get('/:id', authenticateToken, checkIfOwner, userController.getById, sendResponse);

// don't need this at the moment but still implemented
// router.get('/', userController.getAll, sendResponse);
// router.delete('/:id', userController.delete, sendResponse);

module.exports = router;