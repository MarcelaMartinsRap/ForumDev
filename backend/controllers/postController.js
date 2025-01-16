const postService = require('../services/postService');

const createPost = async (req, res) => {
  try {
    const post = await postService.createPost({ ...req.body, usuarioId: req.userId });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getPostsByUser = async (req, res) => {
  try {
    const posts = await postService.getPostsByUser(req.params.id);
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await postService.updatePost(req.params.id, req.body);
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    await postService.deletePost(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await postService.likePost(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createPost,
  getPostById,
  getPostsByUser,
  updatePost,
  deletePost,
  likePost,
};
