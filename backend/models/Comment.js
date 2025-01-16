const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Comment = sequelize.define('Comment', {
  conteudo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  curtidas: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Comment;
