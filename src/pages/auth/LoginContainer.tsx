import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useNavigate } from "react-router-dom";

import UniversityLogo from "../../../public/assets/images/University_of_Moratuwa_logo.png";
import BackgroundImage from "../../../public/assets/images/background.jpg";
// import authServices from 'src/services/AuthServices';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
  shape: {
    borderRadius: 16,
  },
});

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mosip.io/">
        MOSIP
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function LoginContainer() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      // const response = await authServices.login(username, password);
      // Handle the successful login response
      console.log("Login successful:" /*, response*/);
      navigate("/dashboard");
    } catch (error) {
      // Handle the login error
      console.error("Error occurred during login:", error);
      // Display an error message to the user
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <div
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="md" sx={{ borderRadius: 16 }}>
          <Typography
            component="div"
            sx={{ display: "flex", justifyContent: "center", mb: 2 }}
          >
            <Avatar
              src={UniversityLogo}
              alt="University of Moratuwa"
              sx={{ width: 200, height: 200 }}
              variant="rounded"
            />
          </Typography>
          <Paper elevation={3} sx={{ p: 3 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "2rem",
              }}
            >
              <div
                style={{
                  flex: 1,
                  backgroundColor: defaultTheme.palette.primary.main,
                  padding: "2rem",
                }}
              >
                <Typography
                  component="h1"
                  variant="h4"
                  align="center"
                  sx={{ color: "#fff", fontWeight: "bold", mb: 2 }}
                >
                  Booking System
                </Typography>
                <Typography variant="body1" sx={{ color: "#fff", mb: 2 }}>
                  Cookies must be enabled in your browser
                </Typography>
              </div>
              <div style={{ flex: 1 }}>
                <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                  Sign in
                </Typography>
                <TextField
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  margin="normal"
                  required
                  fullWidth
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <IconButton disabled>
                        <PersonOutlineOutlinedIcon />
                      </IconButton>
                    ),
                  }}
                />
                <TextField
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  margin="normal"
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <IconButton disabled>
                        <LockOutlinedIcon />
                      </IconButton>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleLogin}
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </div>
            </div>
          </Paper>
          <Copyright />
        </Container>
      </div>
    </ThemeProvider>
  );
}
