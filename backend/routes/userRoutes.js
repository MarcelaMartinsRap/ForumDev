const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', userController.registerUser); 
router.post('/login', userController.loginUser); 
router.get('/:id', authMiddleware, userController.getUserProfile); 
router.put('/:id', authMiddleware, userController.updateUserProfile); 
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;
