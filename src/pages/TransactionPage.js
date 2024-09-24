import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import TransactionTable from '../components/TransactionTable';

const Transaction = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Transactions
      </Typography>
      <TransactionTable />
    </Box>
  );
};

export default Transaction;
