import api from "./api";

export const register = async (
  username,
  email,
  password,
  profession = null,
  avatar = null
) => {
  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (profession) formData.append("profession", profession);
    if (avatar) formData.append("avatar", avatar);

    const response = await api.post("/users/create", formData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("Erro ao tentar cadastrar. Tente novamente.");
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post("/users/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("Credenciais inválidas. Tente novamente.");
  }
};

export const getUser = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Erro ao recuperar dados do usuário.");
  }
};

export const updateUser = async (userId, data) => {
  try {
    const response = await api.put(`/users/${userId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Erro ao atualizar dados do usuário.");
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Erro ao deletar usuário.");
  }
};
