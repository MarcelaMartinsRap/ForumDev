const PostService = require("../services/postService");

const createPost = async (req, res) => {
  try {
    const post = await PostService.createPost(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await PostService.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await PostService.getPostById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const updatedPost = await PostService.updatePost(req.params.id, req.body);
    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const deleted = await PostService.deletePost(req.params.id);
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFilteredPosts = async (req, res) => {
  try {
    const column = req.query.column || "createdAt";
    const order = req.query.order || "DESC";
    const limit = parseInt(req.query.limit) || 10; 
    const where = req.query.where ? JSON.parse(req.query.where) : {}; 
    const posts = await PostService.getFilteredPosts(
      column,
      order,
      limit,
      where
    );
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const incrementLikes = async (req, res) => {
  try {
    const post = await PostService.incrementLikes(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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