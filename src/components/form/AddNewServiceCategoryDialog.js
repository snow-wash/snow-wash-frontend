import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  MenuItem,
} from '@mui/material';

const AddNewServiceCategoryDialog = ({ open, onClose, onSubmit, services }) => {
  const [categoryName, setCategoryName] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [minimumLoad, setMinimumLoad] = useState('');
  const [loadAmount, setLoadAmount] = useState('');
  const [price, setPrice] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');

  const handleFormSubmit = e => {
    e.preventDefault();
    const newCategory = {
      category_name: categoryName,
      service_id: parseInt(serviceId, 10),
      minimum_load: parseInt(minimumLoad, 10),
      load_amount: parseInt(loadAmount, 10),
      price: parseInt(price, 10),
      estimated_time: parseInt(estimatedTime, 10),
    };
    onSubmit(newCategory);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box sx={{ p: 3 }}>
        <DialogTitle>Add New Service Category</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleFormSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              pt: '6px',
            }}
          >
            <TextField
              label="Category Name"
              variant="outlined"
              fullWidth
              value={categoryName}
              onChange={e => setCategoryName(e.target.value)}
              required
            />
            <TextField
              label="Service"
              variant="outlined"
              fullWidth
              select
              value={serviceId}
              onChange={e => setServiceId(e.target.value)}
              required
            >
              {services.map(service => (
                <MenuItem key={service.id} value={service.id}>
                  {service.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Minimum Load"
              variant="outlined"
              fullWidth
              type="number"
              value={minimumLoad}
              onChange={e => setMinimumLoad(e.target.value)}
              required
            />
            <TextField
              label="Load Amount"
              variant="outlined"
              fullWidth
              type="number"
              value={loadAmount}
              onChange={e => setLoadAmount(e.target.value)}
              required
            />
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              required
            />
            <TextField
              label="Estimated Time (hours)"
              variant="outlined"
              fullWidth
              type="number"
              value={estimatedTime}
              onChange={e => setEstimatedTime(e.target.value)}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
          >
            Add Category
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AddNewServiceCategoryDialog;
