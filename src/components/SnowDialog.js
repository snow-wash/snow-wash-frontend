import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
} from '@mui/material';

const SnowDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  content,
  confirmText = 'OK',
  cancelText,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={{ p: 1 }}>
        {' '}
        {/* Added padding here */}
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {cancelText && (
            <Button onClick={onClose} color="primary">
              {cancelText}
            </Button>
          )}
          <Button onClick={onConfirm} color="primary" variant="contained">
            {confirmText}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default SnowDialog;
