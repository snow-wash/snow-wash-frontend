// src/pages/Service.js
import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import ServiceTable from '../components/ServicesTable'; // Adjust path as necessary
import ServicesCategoryTable from '../components/ServicesCategoryTable';

const ServicePage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Service Management
      </Typography>
      <ServiceTable />

      <ServicesCategoryTable />
    </Box>
  );
};

export default ServicePage;
