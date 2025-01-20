const Post = require("../models/Post");
const User = require("../models/User")

const createPost = async (data) => {
  return await Post.create(data);
};

const getAllPosts = async () => {
  return await Post.findAll();
};

const getPostById = async (id) => {
  return await Post.findByPk(id);
};

const updatePost = async (id, data) => {
  const [updated] = await Post.update(data, {
    where: { id },
  });
  if (updated) {
    return await Post.findByPk(id);
  }
  return null;
};

const deletePost = async (id) => {
  const deleted = await Post.destroy({
    where: { id },
  });
  return deleted;
};

const getFilteredPosts = async (column, order, limit = 10, where = {}) => {
  return await Post.findAll({
    order: [[column, order]],
    limit: limit, 
    where: where, 
    include: [
      {
        model: User,
        attributes: ["username", "avatar"],
      },
    ],
  });
};

const incrementLikes = async (id) => {
  const post = await Post.findByPk(id);
  if (post) {
    post.likes += 1;
    await post.save();
    return post;
  }
  return null;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getFilteredPosts,
  incrementLikes,
};