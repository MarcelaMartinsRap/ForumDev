const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const userService = require('../services/userService');

const jwtSecret = "your_jwt_secret";
const createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await userService.createUser({
      ...req.body,
      password: hashedPassword,
    });

    res.status(201).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email);
    const samePassword = await bcrypt.compare(password, user.password);
    if (user && samePassword) {
      const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "1h" });
      res.status(200).json({ user, token });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to login", error: error.message });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    const user = await userService.uploadAvatar(req.params.id, req.file);
    if (user) {
      res.status(200).json({ message: "Avatar uploaded successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to upload avatar", error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userService.getUser(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get user", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    if (result) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
  uploadAvatar,
  getUser,
  updateUser,
  deleteUser,
};
