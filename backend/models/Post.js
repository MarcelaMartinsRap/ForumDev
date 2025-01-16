const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Post = sequelize.define('Post', {
  conteudo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  curtidas: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Post;
