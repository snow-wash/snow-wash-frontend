import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './Sidebar'; // Sidebar component with navigation links
import Topbar from './TopBar'; // Topbar component for search and user profile

const DashboardLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Topbar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8, // Offset for Topbar height
        }}
      >
        <Outlet /> {/* This renders the nested routes */}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
