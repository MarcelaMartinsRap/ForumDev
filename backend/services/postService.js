const Post = require('../models/Post');

const createPost = async (data) => {
  return Post.create(data);
};

const getPostsByUser = async (userId) => {
  return Post.findAll({
    where: { usuarioId: userId },
    order: [['createdAt', 'DESC']],
  });
};

const getPostById = async (id) => {
  return Post.findByPk(id);
};

const updatePost = async (id, data) => {
  const post = await Post.findByPk(id);
  if (!post) throw new Error('Post não encontrado');
  return post.update(data);
};

const deletePost = async (id) => {
  const post = await Post.findByPk(id);
  if (!post) throw new Error('Post não encontrado');
  return post.destroy();
};

const likePost = async (id) => {
  const post = await Post.findByPk(id);
  if (!post) throw new Error('Post não encontrado');
  post.curtidas += 1;
  return post.save();
};

module.exports = {
  createPost,
  getPostsByUser,
  getPostById,
  updatePost,
  deletePost,
  likePost,
};
