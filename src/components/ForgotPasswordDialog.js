import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';
import SnackbarComponent from './SnackbarComponent'; // Import SnackbarComponent
import apiService from '../services/apiService'; // Import API service

const ForgotPasswordDialog = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: '',
  });

  const handleEmailChange = e => setEmail(e.target.value);

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true to disable button
    onClose(); // Close the dialog immediately

    try {
      // Hit the forgot-password API endpoint
      await apiService.post('/auth/forgot-password', { email });

      // Show success message
      setSnackbar({
        open: true,
        message: 'Reset password link has been sent to your email.',
        severity: 'success',
      });
    } catch (error) {
      // Extract the error message from the response
      const errorMessage =
        error.message || 'Error sending reset password link.';
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: '' });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle>Forgot Password</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={e => e.preventDefault()}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              pt: '6px',
            }}
          >
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              value={email}
              onChange={handleEmailChange}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary" disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            color="primary"
            disabled={!email || loading} // Disable if email is empty or loading
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Component for notifications */}
      <SnackbarComponent
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </>
  );
};

export default ForgotPasswordDialog;
