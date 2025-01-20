const Comment = require('../models/Comment');
const User = require("../models/User");

const createComment = async (data) => {  
  try {  
    return await Comment.create(data);  
  } catch (error) {  
    console.error("Error creating comment:", error);  
    throw error; 
  }  
};  


const getCommentsByPost = async (postId) => {  
  try {  
    return await Comment.findAll({  
      where: { postId: postId },  
      order: [['createdAt', 'DESC']],  
      include: [  
        {  
          model: User,  
          attributes: ["username", "avatar"], 
        },  
      ],  
    });  
  } catch (error) {  
    console.error("Error fetching comments by post:", error);  
    throw error; 
  }  
};

const incrementLikes = async (id) => {  
  try {  
    const comment = await Comment.findByPk(id);  
    if (comment) {  
      comment.likes += 1;  
      await comment.save();  
      return comment;  
    }  
    return null; 
  } catch (error) {  
    console.error("Error incrementing likes:", error);  
    throw error;  
  }  
};  
const deleteComment = async (id) => {  
  try {  
    const deleted = await Comment.destroy({  
      where: { id },  
    });  
    return deleted > 0;  
  } catch (error) {  
    console.error("Error deleting comment:", error);  
    throw error;  
  }  
};  

module.exports = {
  createComment,
  getCommentsByPost,
  incrementLikes,
  deleteComment,
};
