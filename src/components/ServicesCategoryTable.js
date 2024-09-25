import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import apiService from '../services/apiService'; // Use apiService for API requests
import AddNewServiceCategoryDialog from './form/AddNewServiceCategoryDialog';
import SnowDialog from './SnowDialog';
import SnackbarComponent from './SnackbarComponent'; // Import the SnackbarComponent

const ServicesCategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  }); // State for Snackbar

  useEffect(() => {
    fetchServicesCategories();
    fetchServices();
  }, []);

  const fetchServicesCategories = async () => {
    try {
      const response = await apiService.get('/services-category');
      setCategories(response.data || []);
    } catch (error) {
      showSnackbar('Error fetching services categories', 'error');
    }
  };

  const fetchServices = async () => {
    try {
      const response = await apiService.get('/services');
      setServices(response.data || []);
    } catch (error) {
      showSnackbar('Error fetching services', 'error');
    }
  };

  const handleFormSubmit = async (newCategory, categoryId = null) => {
    try {
      if (categoryId) {
        // Update existing category
        const response = await apiService.put(
          `/services-category/${categoryId}`,
          {
            name: newCategory.category_name,
            service_id: newCategory.service_id,
            minimum_load: newCategory.minimum_load,
            load_amount: newCategory.load_amount,
            price: newCategory.price,
            estimated_time: newCategory.estimated_time,
          }
        );
        const updatedCategories = categories.map(cat =>
          cat.id === categoryId ? response.data : cat
        );
        setCategories(updatedCategories);
        showSnackbar('Service category updated successfully', 'success');
      } else {
        // Add new category
        const response = await apiService.post('/services-category', {
          name: newCategory.category_name,
          service_id: newCategory.service_id,
          minimum_load: newCategory.minimum_load,
          load_amount: newCategory.load_amount,
          price: newCategory.price,
          estimated_time: newCategory.estimated_time,
        });
        setCategories([...categories, response.data]);
        showSnackbar('Service category added successfully', 'success');
      }
      setOpenDialog(false);
    } catch (error) {
      showSnackbar(
        error.message || 'Error adding/updating service category',
        'error'
      );
    }
  };

  const handleDelete = id => {
    console.log(id);
    setSelectedCategory(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedCategory) {
      showSnackbar('No category selected for deletion', 'error');
      return;
    }

    try {
      await apiService.delete(`/services-category/${selectedCategory}`);
      setCategories(
        categories.filter(category => category.id !== selectedCategory)
      );
      setDeleteDialogOpen(false);
      setSelectedCategory(null);
      showSnackbar('Service category deleted successfully', 'success');
    } catch (error) {
      showSnackbar('Error deleting service category', 'error');
    }
  };

  const handleEdit = category => {
    setSelectedCategory(category);
    setOpenDialog(true);
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6">Service Categories</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenDialog(true)}
          startIcon={<Add />}
          sx={{
            borderRadius: '25px',
            py: 1,
            px: 3,
            fontWeight: 'bold',
            backgroundColor: '#1976d2',
            ':hover': { backgroundColor: '#115293' },
          }}
        >
          Add New Service Category
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 2, flex: 1, overflow: 'hidden' }}
      >
        <Table
          sx={{ minWidth: 650, borderCollapse: 'separate', borderSpacing: '0' }}
        >
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell
                sx={{ whiteSpace: 'nowrap', borderRight: '1px solid #e0e0e0' }}
              >
                No
              </TableCell>
              <TableCell
                sx={{ width: '20%', borderRight: '1px solid #e0e0e0' }}
              >
                Category Name
              </TableCell>
              <TableCell
                sx={{ width: '20%', borderRight: '1px solid #e0e0e0' }}
              >
                Service Name
              </TableCell>
              <TableCell
                sx={{ width: '10%', borderRight: '1px solid #e0e0e0' }}
              >
                Minimum Load
              </TableCell>
              <TableCell
                sx={{ width: '10%', borderRight: '1px solid #e0e0e0' }}
              >
                Max Load in Machine
              </TableCell>
              <TableCell
                sx={{ width: '10%', borderRight: '1px solid #e0e0e0' }}
              >
                Price
              </TableCell>
              <TableCell
                sx={{ width: '10%', borderRight: '1px solid #e0e0e0' }}
              >
                Estimated Time
              </TableCell>
              <TableCell sx={{ width: '10%', whiteSpace: 'nowrap' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                    borderRight: '1px solid #e0e0e0',
                  }}
                >
                  {index + 1}
                </TableCell>
                <TableCell sx={{ borderRight: '1px solid #e0e0e0' }}>
                  {category.category_name}
                </TableCell>
                <TableCell sx={{ borderRight: '1px solid #e0e0e0' }}>
                  {category.service_name}
                </TableCell>
                <TableCell sx={{ borderRight: '1px solid #e0e0e0' }}>
                  {category.minimum_load}
                </TableCell>
                <TableCell sx={{ borderRight: '1px solid #e0e0e0' }}>
                  {category.load_amount}
                </TableCell>
                <TableCell sx={{ borderRight: '1px solid #e0e0e0' }}>
                  {category.price}
                </TableCell>
                <TableCell sx={{ borderRight: '1px solid #e0e0e0' }}>
                  {category.estimated_time}
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(category)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(category.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Service Category Dialog */}
      <AddNewServiceCategoryDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setSelectedCategory(null); // Reset selected category on close
        }}
        onSubmit={handleFormSubmit}
        services={services}
        categoryToEdit={selectedCategory} // Pass selected category to edit
      />

      {/* Delete Confirmation Dialog */}
      <SnowDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        title="Confirm Deletion"
        content={`Are you sure you want to delete this service category?`}
        onConfirm={confirmDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* Snackbar Component */}
      <SnackbarComponent
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
};

export default ServicesCategoryTable;
