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

// Configuration variable
const savePasswordConfig = false; // Set this to false if you don't want to save the password

const Login = () => {
  // State to manage form inputs
  const [email, setEmail] = useState(''); // Default email text is now empty
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  // Load email and optionally password from localStorage if "Remember Password" was previously selected
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

  // Handle changes in input fields
  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  // Handle "Remember Password" checkbox toggle
  const handleRememberChange = event => {
    setRemember(event.target.checked);
  };

  // Handle form submission
  const handleSubmit = event => {
    event.preventDefault();
    if (remember) {
      // Save email to localStorage
      localStorage.setItem('rememberedEmail', email);
      if (savePasswordConfig) {
        // Save password only if the configuration allows it
        localStorage.setItem('rememberedPassword', password);
      }
    } else {
      // Remove email and password from localStorage
      localStorage.removeItem('rememberedEmail');
      if (savePasswordConfig) {
        localStorage.removeItem('rememberedPassword');
      }
    }
    // Add your login logic here (API call, authentication, etc.)
    alert('Login successful!');
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
                width: '100%',
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
              <Link href="#" variant="body2">
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
                ':hover': {
                  backgroundColor: '#0059c1',
                },
                borderRadius: '10px',
                padding: '10px',
                fontWeight: 'bold',
              }}
            >
              Sign In
            </Button>
          </form>
          <Typography variant="body2">
            Don’t have an account?{' '}
            <Link href="#" variant="body2" sx={{ fontWeight: 'bold' }}>
              Create Account
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
