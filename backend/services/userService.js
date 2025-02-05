const User = require("../models/User");
const createUser = async (data) => {
  return await User.create(data); 
};

const getAllUsers = async () => {
  return await User.findAll(); 
};

const getUserById = async (id) => {
  return await User.findByPk(id);
};
const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email } }); 
};

const updateUser = async (id, data) => {
  const [updated] = await User.update(data, {
    where: { id },
  });
  if (updated) {
    return await User.findByPk(id); 
  }
  return null; 
};

const deleteUser = async (id) => {
  const deleted = await User.destroy({
    where: { id },
  });
  return deleted; 
};

const uploadAvatar = async (id, file) => {
  const user = await User.findByPk(id); 
  if (user) {
    const avatar = file ? file.buffer : user.avatar; 
    await user.update({ avatar });
  }
  return user; 
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  uploadAvatar,
};