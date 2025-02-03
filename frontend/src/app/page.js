"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  TextField,
  Typography,
  Box,
  Container,
  Alert,
  Snackbar,
} from "@mui/material";
import { loginUser } from "@/services/userService";

export default function Login() {
  const [successLogin, setSuccessLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nomeUser, setNomeUser] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !senha) {
      setNotification({
        open: true,
        message: "Por favor, preencha todos os campos.",
        severity: "error",
      });
      return;
    }

    try {
      const data = await loginUser(email, senha);
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(data));
      }
      setSuccessLogin(true);
      setNomeUser(data.nome);
      setTimeout(() => router.push("/home"), 2000);
    } catch (error) {
      setNotification({
        open: true,
        message: error.message || "Erro desconhecido.",
        severity: "error",
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="sm">
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={successLogin}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity="success"
          variant="filled"
        >
          Bem-vindo, {nomeUser}!
        </Alert>
      </Snackbar>
      <Typography variant="h4" textAlign="center" mt={8}>
        Faça Login
      </Typography>
      <Box
        textAlign="center"
        mt={6}
        mx="auto"
        p={5}
        bgcolor="#2F2F34"
        borderRadius={3}
        sx={{ width: "572px", height: "280px" }}
      >
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          width="235px"
          height="69px"
          sx={{
            backgroundColor: "#232328",
            borderRadius: "30px", // Aplicando o borderRadius no campo
            "& .MuiOutlinedInput-root": {
              borderRadius: "30px",
              // Garantindo que o input também tenha bordas arredondadas
            },
            marginBottom: "30px",
          }}
        />
        <TextField
          label="Senha"
          type="password"
          fullWidth
          margin="normal"
          width="235"
          height="69"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          sx={{
            backgroundColor: "#232328",
            borderRadius: "30px", // Aplicando o borderRadius no campo
            "& .MuiOutlinedInput-root": {
              borderRadius: "30px", // Garantindo que o input também tenha bordas arredondadas
            },
          }}
        />
      </Box>
      <Box mt={6} display="flex" justifyContent="center">
        <Button
          variant="outlined"
          onClick={handleLogin}
          sx={{
            mr: 2,
            width: "189px",
            backgroundColor: "#000000",
            color: "white",
            "&:hover": {
              backgroundColor: "#333333",
            },
            padding: "10px 20px",
            borderRadius: "30px",
          }}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          onClick={() => router.push("/register")}
          sx={{
            mr: 3,
            width: "200px",
            backgroundColor: "#000000",
            color: "white",
            "&:hover": {
              backgroundColor: "#333333",
            },
            padding: "10px 20px",
            borderRadius: "30px",
          }}
        >
          Cadastre-se
        </Button>
      </Box>
    </Container>
  );
}
