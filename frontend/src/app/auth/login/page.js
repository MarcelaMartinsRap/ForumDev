"use client";

import { useState, useEffect } from "react";
import { login } from "@/utils/UserService"; 
import { useRouter } from "next/navigation";
import { TextField, Button, Typography, Container, Box } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false); 

  useEffect(() => {
  
    setIsMounted(true);
    return () => {
      
      setIsMounted(false);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    if (!isMounted) return; 

    try {
      await login(email, password);
      
      router.push("/");
    } catch (error) {
      console.error("Erro no login", error);
      setErrorMessage("Email ou senha incorretos.");
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null; 

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
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleLogin} style={{ width: "100%", marginTop: 1 }}>
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
            disabled={loading}
          >
            {loading ? "Carregando..." : "Login"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
