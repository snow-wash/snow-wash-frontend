// src/pages/ResetPassword.js

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams(); // Get the reset token from the URL
  const navigate = useNavigate(); // Initialize useNavigate
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/auth/reset-password', {
        token,
        newPassword,
      });
      setMessage('Password successfully reset.');
      setError('');

      // Redirect to the LoginPage after successful password reset
      setTimeout(() => {
        navigate('/login'); // Replace '/login' with your login route
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      setError('Invalid or expired token.');
      setMessage('');
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Box textAlign="center" mb={4}>
        <img
          src="https://static.vecteezy.com/system/resources/previews/004/968/639/original/password-has-been-reset-successfully-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
          alt="Reset Password"
          style={{ width: '50%' }}
        />
      </Box>
      <Typography variant="h5" gutterBottom>
        Reset Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="New Password"
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        {message && (
          <Typography color="success" variant="body2">
            {message}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
        >
          Reset Password
        </Button>
      </form>
    </Container>
  );
};

export default ResetPassword;
