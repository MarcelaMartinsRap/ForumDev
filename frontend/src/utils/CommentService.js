import api from "./api";

export const addComment = async (postId, text, userId) => {
  return api.post(`/comments/${postId}`, { text, userId });
};

export const getCommentsByPost = async (postId) => {
  return api.get(`/comments/${postId}`);
};

export const likeComment = async (commentId) => {
  return api.post(`/comments/${commentId}/like`);
};

export const deleteComment = async (postId, commentId) => {
  return api.delete(`/comments/${postId}/${commentId}`);
};
