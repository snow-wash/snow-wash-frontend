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
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';
import AddNewServiceCategoryDialog from './form/AddNewServiceCategoryDialog';
import SnowDialog from './SnowDialog'; // Import the reusable dialog component

const ServicesCategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchServicesCategories();
    fetchServices();
  }, []);

  const fetchServicesCategories = () => {
    axios
      .get('http://localhost:5000/api/services-category')
      .then(response => {
        if (response.data && Array.isArray(response.data.data)) {
          setCategories(response.data.data);
        } else {
          console.error('Unexpected response format:', response.data);
          setCategories([]);
        }
      })
      .catch(error => {
        console.error('Error fetching services categories:', error);
        setCategories([]);
      });
  };

  const fetchServices = () => {
    axios
      .get('http://localhost:5000/api/services')
      .then(response => {
        if (response.data && Array.isArray(response.data.data)) {
          setServices(response.data.data);
        } else {
          console.error('Unexpected response format:', response.data);
          setServices([]);
        }
      })
      .catch(error => {
        console.error('Error fetching services!', error);
        setServices([]);
      });
  };

  const handleFormSubmit = newCategory => {
    axios
      .post('http://localhost:5000/api/services-category', newCategory)
      .then(response => {
        setCategories([...categories, response.data.data]);
        setOpenDialog(false);
      })
      .catch(error => {
        console.error('Error adding service category!', error);
      });
  };

  const handleDelete = id => {
    setSelectedCategory(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    axios
      .delete(`http://localhost:5000/api/services-category/${selectedCategory}`)
      .then(() => {
        setCategories(
          categories.filter(category => category.id !== selectedCategory)
        );
        setDeleteDialogOpen(false);
        setSelectedCategory(null);
      })
      .catch(error => {
        console.error('Error deleting service category!', error);
        setDeleteDialogOpen(false);
        setSelectedCategory(null);
      });
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
                ID
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
                Load Amount
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
            {categories.map(category => (
              <TableRow key={category.id}>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                    borderRight: '1px solid #e0e0e0',
                  }}
                >
                  {category.id}
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
                  {category.estimated_time.hours}
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  <IconButton color="primary">
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

      {/* Add Service Category Dialog */}
      <AddNewServiceCategoryDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleFormSubmit}
        services={services}
      />

      {/* Delete Confirmation Dialog */}

      <SnowDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        title="Confirm Deletion"
        content={`Are you sure you want to delete this service category?`}
        onConfirm={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </Box>
  );
};

export default ServicesCategoryTable;
