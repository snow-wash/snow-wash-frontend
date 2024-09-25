import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
  MenuItem,
} from '@mui/material';

const AddNewServiceDialog = ({
  open,
  onClose,
  onSubmit,
  quotas,
  serviceToEdit,
}) => {
  const [serviceName, setServiceName] = useState('');
  const [quotaId, setQuotaId] = useState('');

  // Reset the form fields when the dialog is closed
  useEffect(() => {
    if (!open) {
      setServiceName('');
      setQuotaId('');
    }
  }, [open]);

  // Populate fields if editing
  useEffect(() => {
    if (serviceToEdit) {
      setServiceName(serviceToEdit.name);
      setQuotaId(serviceToEdit.quota_id.toString());
    } else {
      setServiceName('');
      setQuotaId('');
    }
  }, [serviceToEdit]);

  const handleClose = () => {
    setServiceName('');
    setQuotaId('');
    onClose();
  };

  const handleSubmit = event => {
    event.preventDefault();
    const serviceData = {
      name: serviceName,
      quota_id: parseInt(quotaId, 10),
    };

    onSubmit(serviceData, serviceToEdit?.id); // Pass service ID if editing
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      key={serviceToEdit ? serviceToEdit.id : 'new'} // Use a key to reset state
    >
      <Box sx={{ p: 3 }}>
        <DialogTitle>
          {serviceToEdit ? 'Edit Service' : 'Add New Service'}
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              mt: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <TextField
              label="Service Name"
              variant="outlined"
              fullWidth
              value={serviceName}
              onChange={e => setServiceName(e.target.value)}
              required
            />
            <TextField
              label="Quota"
              select
              variant="outlined"
              fullWidth
              value={quotaId}
              onChange={e => setQuotaId(e.target.value)}
              required
            >
              {quotas.map(quota => (
                <MenuItem key={quota.id} value={quota.id}>
                  {quota.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            {serviceToEdit ? 'Update Service' : 'Add Service'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AddNewServiceDialog;
