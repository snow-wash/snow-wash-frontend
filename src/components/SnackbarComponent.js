import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackbarComponent = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // Set position to bottom-left
      sx={{
        '& .MuiSnackbarContent-root': {
          minWidth: '400px',
          maxWidth: '600px',
        },
      }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{
          width: '100%',
          fontSize: '1.2rem',
          py: 2,
          display: 'flex', // Use flexbox layout
          alignItems: 'center', // Center items vertically
          justifyContent: 'center', // Center content horizontally
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
