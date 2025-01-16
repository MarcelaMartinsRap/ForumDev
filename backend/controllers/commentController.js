const commentService = require('../services/commentService');

const createComment = async (req, res) => {
  try {
    const comment = await commentService.createComment({
      ...req.body,
      postId: req.params.postId,
      usuarioId: req.userId,
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const comments = await commentService.getCommentsByPost(req.params.postId);
    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const likeComment = async (req, res) => {
  try {
    const comment = await commentService.likeComment(req.params.commentId);
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    await commentService.deleteComment(req.params.commentId);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createComment,
  getCommentsByPost,
  likeComment,
  deleteComment,
};
