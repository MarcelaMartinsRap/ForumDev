const Comment = require('../models/Comment');

const createComment = async (data) => {
  return Comment.create(data);
};

const getCommentsByPost = async (postId) => {
  return Comment.findAll({
    where: { postId: postId },
    order: [['createdAt', 'DESC']],
  });
};

const likeComment = async (commentId) => {
  const comment = await Comment.findByPk(commentId);
  if (!comment) throw new Error('Comentário não encontrado');
  comment.curtidas += 1;
  return comment.save();
};

const deleteComment = async (commentId) => {
  const comment = await Comment.findByPk(commentId);
  if (!comment) throw new Error('Comentário não encontrado');
  return comment.destroy();
};

module.exports = {
  createComment,
  getCommentsByPost,
  likeComment,
  deleteComment,
};
