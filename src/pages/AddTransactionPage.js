import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogContent,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import CustomCalendar from '../components/CustomCalendar';
import TableUserConfirm from '../components/TableUserConfirm';

// Mock Data
const mockServicesData = [
  {
    id: 1,
    service_name: 'Regular Laundry',
    service_category_name: 'Laundry Services',
    amount: 5,
    price_estimation: 30000,
    start_date: '2024-09-26 10:00:00',
    end_date: '2024-09-26 11:00:00',
  },
  {
    id: 2,
    service_name: 'Dry Cleaning',
    service_category_name: 'Special Services',
    amount: 3,
    price_estimation: 45000,
    start_date: '2024-09-26 12:00:00',
    end_date: '2024-09-26 13:30:00',
  },
  {
    id: 3,
    service_name: 'Ironing Service',
    service_category_name: 'Laundry Services',
    amount: 10,
    price_estimation: 20000,
    start_date: '2024-09-27 09:00:00',
    end_date: '2024-09-27 10:00:00',
  },
  {
    id: 4,
    service_name: 'Express Laundry',
    service_category_name: 'Fast Services',
    amount: 2,
    price_estimation: 60000,
    start_date: '2024-09-27 11:00:00',
    end_date: '2024-09-27 11:30:00',
  },
  {
    id: 5,
    service_name: 'Dresses Cleaning',
    service_category_name: 'Special Services',
    amount: 1,
    price_estimation: 50000,
    start_date: '2024-09-28 14:00:00',
    end_date: '2024-09-28 15:30:00',
  },
];


const AddTransactionPage = () => {
  const [customerName, setCustomerName] = useState('');
  const [nomorHp, setNomorHp] = useState('');
  const [alamat, setAlamat] = useState('');
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
        label="No HP"
        fullWidth
        value={nomorHp}
        onChange={e => setNomorHp(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        label="Alamat"
        fullWidth
        value={alamat}
        onChange={e => setAlamat(e.target.value)}
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
      <Stack mt={2}>
        <TableUserConfirm data={mockServicesData}/>
      </Stack>

      {/* Calendar Dialog */}
      <Dialog
        open={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ p: 0, textAlign: 'center' }}>
          <CustomCalendar
            value={transactionDate ? new Date(transactionDate) : ''}
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
