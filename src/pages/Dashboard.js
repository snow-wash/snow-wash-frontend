import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Dashboard = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Welcome to your Dashboard!</Typography>
        <Typography variant="body1">
          Here you can get a quick overview of your application's key metrics
          and activities.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Dashboard;
