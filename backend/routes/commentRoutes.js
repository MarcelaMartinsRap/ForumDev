const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.post('/:postId', commentController.createComment);
router.get('/:postId', commentController.getCommentsByPost);
router.post("/:id/like", commentController.incrementLikes);
router.delete('/:postId/:commentId',commentController.deleteComment);

module.exports = router;