"use client";

import { useState } from "react";
import { register } from "@/utils/UserService";
import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
} from "@mui/material";

const Register = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profession, setProfession] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true); // Ativa o indicador de carregamento

    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem!");
      setLoading(false); // Desativa o carregamento
      return;
    }

    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profession", profession);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      await register(formData);
      router.push("/auth/login");
    } catch (error) {
      console.error("Erro no cadastro", error);
      setErrorMessage("Erro ao se cadastrar. Tente novamente.");
    } finally {
      setLoading(false); // Desativa o carregamento
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography variant="h5">Registrar</Typography>
        <form onSubmit={handleRegister} style={{ width: "100%", marginTop: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirmar Senha"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Profissão"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
          {errorMessage && (
            <Typography color="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading} // Desabilita o botão durante o carregamento
          >
            {loading ? <CircularProgress size={24} /> : "Cadastrar"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
