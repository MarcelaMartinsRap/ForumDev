import api from "./api";

export const register = async (
  username,
  email,
  password,
  profession = null,
  avatar = null
) => {
  return api.post("/users/create", {
    username,
    email,
    password,
    profession,
    avatar,
  });
};

export const login = async (email, password) => {
  return api.post("/users/login", { email, password });
};

export const getUser = async (userId) => {
  return api.get(`/users/${userId}`);
};

export const updateUser = async (userId, data) => {
  return api.put(`/users/${userId}`, data);
};

export const deleteUser = async (userId) => {
  return api.delete(`/users/${userId}`);
};
