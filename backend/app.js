const express = require('express');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const sequelize = require('./config/db');

const app = express();
app.use(express.json());

app.use(express.json());
app.use('/usuarios', userRoutes);
app.use('/posts', postRoutes);
app.use('/comentarios', commentRoutes);

sequelize.sync()
  .then(() => {
    console.log('Banco de dados sincronizado!');
  })
  .catch(err => {
    console.error('Erro ao sincronizar o banco de dados:', err);
  });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
