const commentService = require('../services/commentService');

const createComment = async (req, res) => {
  try {
    const comment = await commentService.createComment(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const comment = await commentService.getCommentsByPost(req.params.postId);
    if (comment) {
      res.status(200).json(comment);
    } else {
      res.status(404).json({ error: "Comment not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const incrementLikes = async (req, res) => {
  try {
    const comment = await commentService.incrementLikes(req.params.id);
    if (comment) {
      res.status(200).json(comment);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
try {
    const deleted = await commentService.deleteComment(req.params.id);
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: "Comment not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createComment,
  getCommentsByPost,
  incrementLikes,
  deleteComment,
};
