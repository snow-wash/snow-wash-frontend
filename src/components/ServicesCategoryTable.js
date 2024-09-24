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
  Button, // Import Button
} from '@mui/material';
import axios from 'axios';

const ServicesCategoryTable = () => {
  const [categories, setCategories] = useState([]);

  // Fetch service categories from the backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/services-category')
      .then(response => {
        if (response.data && Array.isArray(response.data.data)) {
          setCategories(response.data.data); // Set the 'data' array to categories
        } else {
          console.error('Unexpected response format:', response.data);
          setCategories([]); // Fallback to an empty array if the structure is unexpected
        }
      })
      .catch(error => {
        console.error('Error fetching services categories:', error);
        setCategories([]); // Fallback to an empty array in case of error
      });
  }, []);

  return (
    <Box
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        height: 'auto', // Adjust height based on viewport
        width: '100%',
        overflow: 'hidden', // Prevent scrollbars
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
        <Button variant="contained" color="primary">
          Add New Service Category
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 2, flex: 1, overflow: 'hidden' }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>Service Name</TableCell>
              <TableCell>Minimum Load</TableCell>
              <TableCell>Load Amount</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Estimated Time (hours)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map(category => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.category_name}</TableCell>
                <TableCell>{category.service_name}</TableCell>
                <TableCell>{category.minimum_load}</TableCell>
                <TableCell>{category.load_amount}</TableCell>
                <TableCell>{category.price}</TableCell>
                <TableCell>{category.estimated_time.hours}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ServicesCategoryTable;
