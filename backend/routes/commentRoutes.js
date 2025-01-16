const express = require('express');
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:postId', authMiddleware, commentController.createComment);
router.get('/:postId', commentController.getCommentsByPost);
router.put('/:postId/:commentId/like', authMiddleware, commentController.likeComment);
router.delete('/:postId/:commentId', authMiddleware, commentController.deleteComment);

module.exports = router;
