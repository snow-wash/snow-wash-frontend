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
} from '@mui/material';
import axios from 'axios';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);

  // Fetch transaction data from the backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/transactions')
      .then(response => {
        if (response.data && Array.isArray(response.data.data)) {
          setTransactions(response.data.data);
        } else {
          console.error('Unexpected response format:', response.data);
          setTransactions([]);
        }
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
        setTransactions([]);
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
        <Typography variant="h6">Transactions</Typography>
        <Button variant="contained" color="primary">
          Add New Transaction
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
              <TableCell>Customer Name</TableCell>
              <TableCell>Transaction Date</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map(transaction => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
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
