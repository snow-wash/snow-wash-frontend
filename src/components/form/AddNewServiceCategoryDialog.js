import React, { useState, useEffect } from 'react';
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

const AddNewServiceCategoryDialog = ({
  open,
  onClose,
  onSubmit,
  services,
  categoryToEdit,
}) => {
  const [categoryName, setCategoryName] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [minimumLoad, setMinimumLoad] = useState('');
  const [loadAmount, setLoadAmount] = useState('');
  const [price, setPrice] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');

  useEffect(() => {
    if (open) {
      if (categoryToEdit) {
        // Populate fields if editing
        setCategoryName(categoryToEdit.category_name || '');
        setServiceId(categoryToEdit.service_id?.toString() || '');
        setMinimumLoad(categoryToEdit.minimum_load?.toString() || '');
        setLoadAmount(categoryToEdit.load_amount?.toString() || '');
        setPrice(categoryToEdit.price?.toString() || '');
        setEstimatedTime(categoryToEdit.estimated_time?.toString() || '');
      } else {
        // Reset the form when opening for adding new category
        resetForm();
      }
    }
  }, [open, categoryToEdit]);

  const resetForm = () => {
    setCategoryName('');
    setServiceId('');
    setMinimumLoad('');
    setLoadAmount('');
    setPrice('');
    setEstimatedTime('');
  };

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
    onSubmit(newCategory, categoryToEdit?.id); // Pass category ID if editing
    handleClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <Box sx={{ p: 3 }}>
        <DialogTitle>
          {categoryToEdit
            ? 'Edit Service Category'
            : 'Add New Service Category'}
        </DialogTitle>
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
              label="Max Load in Machine"
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
          >
            {categoryToEdit ? 'Update Category' : 'Add Category'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AddNewServiceCategoryDialog;
