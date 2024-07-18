import React, { useContext, useState } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
  Typography,
  Stack,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { AuthContext } from "../../context/AuthContext";
// import { AuthProvider } from "../../context/AuthContext";

const Login = () => {
  // const { login } = useContext(AuthProvider);
  const { setToken } = useContext(AuthContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const response = await axios.post("http://localhost:3001/auth/login", {
          email,
          password,
        });

        const token2 = response.data.token;
        // login(token);
        setToken(token2);
        localStorage.setItem("token", token2);

        // navigate("/");
        <Navigate to="/" />;
      } catch (error) {
        console.error("Error logging in:", error);
      }
    } else {
      console.log("Please enter valid email and password");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      color={colors.grey[100]}
      bgcolor={colors.grey[900]}
    >
      <Stack
        spacing={2}
        bgcolor="white"
        padding={4}
        borderRadius={2}
        boxShadow="0.3rem 0.3rem 0.6rem grey"
        width="400px"
      >
        <Typography variant="h3" align="center">
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              variant="filled"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
            <FormControl variant="filled" fullWidth required>
              <InputLabel htmlFor="filled-adornment-password">
                Password
              </InputLabel>
              <FilledInput
                id="filled-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>
          </Stack>
        </form>
        <Box display="flex" justifyContent="space-between">
          <Button component={Link} to="/forgot-password">
            Forgot Password
          </Button>
          <Button component={Link} to="/signup">
            Sign Up
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Login;
