import api from "./api";

export const createPost = async (title, text, userId) => {
  return api.post("/posts", { title, text, userId });
};

export const getPosts = async () => {
  return api.get("/posts");
};

export const getPostById = async (postId) => {
  return api.get(`/posts/${postId}`);
};

export const updatePost = async (postId, data) => {
  return api.put(`/posts/${postId}`, data);
};

export const deletePost = async (postId) => {
  return api.delete(`/posts/${postId}`);
};

export const likePost = async (postId) => {
  return api.post(`/posts/${postId}/like`);
};
