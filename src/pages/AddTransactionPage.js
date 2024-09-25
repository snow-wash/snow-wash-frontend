import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogContent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import CustomCalendar from '../components/CustomCalendar';

const AddTransactionPage = () => {
  const [customerName, setCustomerName] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [status, setStatus] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const newTransaction = {
        customer_name: customerName,
        transaction_date: transactionDate,
        total_price: parseFloat(totalPrice),
        status,
      };
      await apiService.post('/transactions', newTransaction);
      navigate('/dashboard/transaction');
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleDateSelect = date => {
    // Set date without time zone offset
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    setTransactionDate(utcDate.toISOString().split('T')[0]);
    setCalendarOpen(false);
  };

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
        fullWidth
        value={transactionDate}
        onClick={() => setCalendarOpen(true)}
        InputLabelProps={{ shrink: true }}
        sx={{ mt: 2 }}
        InputProps={{ readOnly: true }}
      />
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

      {/* Calendar Dialog */}
      <Dialog
        open={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ p: 0, textAlign: 'center' }}>
          <CustomCalendar
            value={transactionDate ? new Date(transactionDate) : new Date()}
            onDateSelect={handleDateSelect}
          />
          <Typography variant="body1" sx={{ m: 2, fontSize: '1.2rem' }}>
            Click on a date to select
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AddTransactionPage;
