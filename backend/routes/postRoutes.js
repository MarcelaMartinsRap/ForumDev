const express = require("express");
const router = express.Router();
const PostController = require("../controllers/postController");

router.post("/", PostController.createPost);
router.get("/", PostController.getFilteredPosts);
router.get("/:id", PostController.getPostById);
router.put("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);
router.post("/:id/like", PostController.incrementLikes);

module.exports = router;