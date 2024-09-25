import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
} from '@mui/material';

const AddNewQuotaDialog = ({ open, onClose, onSubmit, quotaData }) => {
  const [quotaName, setQuotaName] = useState('');
  const [quotaLimit, setQuotaLimit] = useState('');

  // Update state when quotaData changes
  useEffect(() => {
    if (quotaData) {
      setQuotaName(quotaData.name || '');
      setQuotaLimit(quotaData.quota_limit?.toString() || '');
    } else {
      resetForm();
    }
  }, [quotaData, open]);

  // Function to reset form
  const resetForm = () => {
    setQuotaName('');
    setQuotaLimit('');
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newQuota = {
      name: quotaName,
      quota_limit: parseInt(quotaLimit, 10),
    };
    onSubmit(newQuota);
    handleClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <Box sx={{ p: 2 }}>
        <DialogTitle>{quotaData ? 'Edit Quota' : 'Add New Quota'}</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              mx: 0,
              px: 0,
              pt: '6px',
            }}
          >
            <TextField
              label="Quota Name"
              variant="outlined"
              fullWidth
              value={quotaName}
              onChange={e => setQuotaName(e.target.value)}
              required
            />
            <TextField
              label="Quota Limit"
              type="number"
              variant="outlined"
              fullWidth
              value={quotaLimit}
              onChange={e => setQuotaLimit(e.target.value)}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 1,
            px: 3,
          }}
        >
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              borderRadius: '25px',
              flex: 1,
              py: 1,
              fontWeight: 'bold',
              color: '#1976d2',
              borderColor: '#1976d2',
              ':hover': {
                borderColor: '#115293',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            sx={{
              borderRadius: '25px',
              flex: 1,
              py: 1,
              fontWeight: 'bold',
              backgroundColor: '#1976d2',
              ':hover': { backgroundColor: '#115293' },
            }}
          >
            {quotaData ? 'Update Quota' : 'Add Quota'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AddNewQuotaDialog;
