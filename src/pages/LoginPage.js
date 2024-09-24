import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Snackbar, Alert } from '@mui/material';
import apiService from '../services/apiService';
import logo from '../assets/logo.png';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: '',
  });

  const handleLogin = async () => {
    try {
      const response = await apiService.post('/auth/login', {
        identifier,
        password,
      });
      setSnackbar({
        open: true,
        message: 'Berhasil Login',
        severity: 'success',
      });
    } catch (error) {
      const errorMessage = error.message || 'Gagal Login';
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2b59c3',
      }}
    >
      <Paper
        sx={{
          p: 4,
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#1a3b8f',
        }}
      >
        <Box sx={{ mb: 3 }}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: '80px', height: 'auto' }}
          />
        </Box>
        <TextField
          variant="outlined"
          label="Username"
          type="text"
          value={identifier}
          onChange={e => setIdentifier(e.target.value)}
          sx={{
            mb: 2,
            width: '100%',
            input: { color: '#ffffff' },
            label: { color: '#ffffff' },
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              '& fieldset': { borderColor: '#ffffff' },
              '&:hover fieldset': { borderColor: '#ffffff' },
              '&.Mui-focused fieldset': { borderColor: '#ffffff' },
            },
            '& .MuiInputLabel-root': {
              color: '#ffffff',
              '&.Mui-focused': { color: '#ffffff' },
            },
          }}
        />
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          sx={{
            mb: 2,
            width: '100%',
            input: { color: '#ffffff' },
            label: { color: '#ffffff' },
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              '& fieldset': { borderColor: '#ffffff' },
              '&:hover fieldset': { borderColor: '#ffffff' },
              '&.Mui-focused fieldset': { borderColor: '#ffffff' },
            },
            '& .MuiInputLabel-root': {
              color: '#ffffff',
              '&.Mui-focused': { color: '#ffffff' },
            },
          }}
        />
        <Button
          sx={{
            backgroundColor: '#ffffff',
            color: '#2b59c3',
            fontWeight: 'bold',
            mt: 2,
            width: '100%',
            py: 1,
            '&:hover': { backgroundColor: '#f0f0f0' },
          }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default Login;
