import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await apiService.get('/transactions');
      setTransactions(response.data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleAddNewTransaction = () => {
    navigate('/dashboard/transaction/add'); // Navigate to AddTransactionPage
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6">Transactions</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddNewTransaction}
        >
          Add New Transaction
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 2, overflow: 'hidden' }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Transaction Date</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={transaction.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{transaction.customer_name}</TableCell>
                <TableCell>
                  {new Date(transaction.transaction_date).toLocaleDateString()}
                </TableCell>
                <TableCell>{transaction.total_price}</TableCell>
                <TableCell>{transaction.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TransactionTable;
