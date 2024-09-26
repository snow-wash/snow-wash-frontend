import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import apiService from '../services/apiService'; // Import API service
import SnackbarComponent from '../components/SnackbarComponent'; // Import the reusable Snackbar component
import ForgotPasswordDialog from '../components/ForgotPasswordDialog'; // Import ForgotPasswordDialog component
import { setRefreshToken, setToken } from '../services/authService';

const savePasswordConfig = false;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: '',
  });
  const [forgotPasswordDialogOpen, setForgotPasswordDialogOpen] =
    useState(false); // State to manage dialog open

  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
    if (savePasswordConfig) {
      const savedPassword = localStorage.getItem('rememberedPassword');
      if (savedPassword) {
        setPassword(savedPassword);
      }
    }
  }, []);

  const handleEmailChange = event => setEmail(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);
  const handleRememberChange = event => setRemember(event.target.checked);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await apiService.post('/auth/login', {
        identifier: email,
        password,
      });

      // Handle success message
      setSnackbar({
        open: true,
        message: 'Login successful!',
        severity: 'success',
      });

      if (remember) {
        localStorage.setItem('rememberedEmail', email);
        if (savePasswordConfig) {
          localStorage.setItem('rememberedPassword', password);
        }
      } else {
        localStorage.removeItem('rememberedEmail');
        if (savePasswordConfig) {
          localStorage.removeItem('rememberedPassword');
        }
      }

      // set token
      setToken(response.data.token);
      setRefreshToken(response.data.refresh_token);
      localStorage.setItem('userData', JSON.stringify(response.data));

      console.log(response.data);
      // Redirect to dashboard after successful login
      navigate('/dashboard'); // Redirect to the dashboard
    } catch (error) {
      // Extract the error message from the response
      const errorMessage = error.message || 'Login failed';
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
    }
  };

  const handleForgotPasswordClick = () => {
    setForgotPasswordDialogOpen(true); // Open the dialog when link is clicked
  };

  const handleForgotPasswordClose = () => {
    setForgotPasswordDialogOpen(false); // Close the dialog
  };

  return (
    <Container
      component="main"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        minHeight: '100%',
        minWidth: '100%',
        margin: 0,
        padding: 0,
        backgroundColor: '#0070F3',
        backgroundImage:
          'url("https://www.transparenttextures.com/patterns/shattered.png")',
        backgroundSize: 'cover',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: '30px',
          borderRadius: '20px',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
            Login to Account
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mt: 1, mb: 3 }}
          >
            Please enter your email and password to continue
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={handleEmailChange}
              variant="outlined"
              size="small"
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              variant="outlined"
              size="small"
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    checked={remember}
                    onChange={handleRememberChange}
                  />
                }
                label="Remember Login"
              />
              <Link
                href="#"
                variant="body2"
                onClick={handleForgotPasswordClick}
              >
                Forgot Password?
              </Link>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                backgroundColor: '#0070F3',
                ':hover': { backgroundColor: '#0059c1' },
                borderRadius: '10px',
                padding: '10px',
                fontWeight: 'bold',
              }}
            >
              Sign In
            </Button>
          </form>
        </Box>

        {/* Reusable Snackbar for notifications */}
        <SnackbarComponent
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        />
      </Paper>

      {/* Forgot Password Dialog */}
      <ForgotPasswordDialog
        open={forgotPasswordDialogOpen}
        onClose={handleForgotPasswordClose}
      />
    </Container>
  );
};

export default Login;
