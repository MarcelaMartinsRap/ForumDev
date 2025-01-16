const express = require('express');
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, postController.createPost);
router.get('/:id', postController.getPostById);
router.get('/user/:id', postController.getPostsByUser);
router.put('/:id', authMiddleware, postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);
router.put('/:id/like', authMiddleware, postController.likePost);

module.exports = router;
