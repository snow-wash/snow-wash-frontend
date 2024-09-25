import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Popover } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import CustomCalendar from '../components/CustomCalendar'; // Import the calendar component

const AddTransactionPage = () => {
  const [customerName, setCustomerName] = useState('');
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [totalPrice, setTotalPrice] = useState('');
  const [status, setStatus] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const newTransaction = {
        customer_name: customerName,
        transaction_date: transactionDate.toISOString().split('T')[0], // Convert date to string
        total_price: parseFloat(totalPrice),
        status,
      };
      await apiService.post('/transactions', newTransaction);
      navigate('/dashboard/transaction');
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleCalendarOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleCalendarClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = date => {
    setTransactionDate(date);
    handleCalendarClose();
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Add New Transaction</Typography>
      <TextField
        label="Customer Name"
        fullWidth
        value={customerName}
        onChange={e => setCustomerName(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        label="Transaction Date"
        type="text"
        fullWidth
        value={transactionDate.toLocaleDateString()} // Show selected date
        onClick={handleCalendarOpen} // Open calendar on click
        InputLabelProps={{ shrink: true }}
        sx={{ mt: 2 }}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleCalendarClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <CustomCalendar onChange={handleDateChange} value={transactionDate} />
      </Popover>
      <TextField
        label="Total Price"
        type="number"
        fullWidth
        value={totalPrice}
        onChange={e => setTotalPrice(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        label="Status"
        fullWidth
        value={status}
        onChange={e => setStatus(e.target.value)}
        sx={{ mt: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default AddTransactionPage;
