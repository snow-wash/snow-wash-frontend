import React from 'react';
import { Box, Typography, Paper, Grid, CircularProgress } from '@mui/material';
import QuotaTable from '../components/QuotaTable';
import QuotaHistoryTable from '../components/QuotaHistoryTable';

const Quota = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Quota Management
      </Typography>
      <QuotaTable />
      <QuotaHistoryTable />
    </Box>
  );
};

export default Quota;
