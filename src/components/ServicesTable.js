import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
} from '@mui/material';
import axios from 'axios';

const ServiceTable = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fetch services from the backend
    axios
      .get('http://localhost:5000/api/services')
      .then(response => {
        // Assuming response.data contains the expected structure
        if (response.data && Array.isArray(response.data.data)) {
          setServices(response.data.data); // Set the 'data' array to services
        } else {
          console.error('Unexpected response format:', response.data);
          setServices([]); // Fallback to an empty array if the structure is unexpected
        }
      })
      .catch(error => {
        console.error('Error fetching services:', error);
        setServices([]); // Fallback to an empty array in case of error
      });
  }, []);

  return (
    <Box
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          width: '100%',
        }}
      >
        <Typography variant="h6">Services</Typography>
        <Button variant="contained" color="primary">
          Add New Service
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ width: 'auto', overflowX: 'auto', borderRadius: 2 }}
      >
        <Table sx={{ minWidth: 'auto', width: 'auto' }}>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>ID</TableCell>
              <TableCell sx={{ width: '100%' }}>Name</TableCell>
              {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>Quota ID</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map(service => (
              <TableRow key={service.id}>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  {service.id}
                </TableCell>
                <TableCell sx={{ width: '100%' }}>{service.name}</TableCell>
                {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  {service.quota_id}
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ServiceTable;
