const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

const registerUser = async (data) => {
  const { nome, email, senha } = data;

 
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw new Error('Email já está em uso.');

  const hashedPassword = await bcrypt.hash(senha, 10);
  const user = await User.create({ nome, email, senha: hashedPassword });
  return user;
};

const loginUser = async (data) => {
  const { email, senha } = data;

 
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(senha, user.senha))) {
    throw new Error('Credenciais inválidas');
  }

 
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { token, user };
};

const getUserProfile = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('Usuário não encontrado');
  return user;
};

const updateUserProfile = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('Usuário não encontrado');
  return user.update(data);
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('Usuário não encontrado');
  await user.destroy();
  return { message: 'Usuário deletado com sucesso.' };
};

module.exports = { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile, 
  deleteUser 
};
