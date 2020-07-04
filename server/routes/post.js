const express = require('express');
const router = express.Router();
const {sendResponse} = require("../middlewares/basic.moddlewares");
const postController = require("../controllers/post.controller");
const {authenticateToken} = require("../middlewares/auth.middlewares");


router.get('/', postController.getAll, sendResponse);
router.get('/:id', postController.getById, sendResponse);
router.post('/', authenticateToken, postController.create, sendResponse);

// don't need this at the moment
// router.delete('/:id', postController.delete, sendResponse);
// router.put('/:id', postController.update, sendResponse);

module.exports = router;