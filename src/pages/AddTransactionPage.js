import React, { useCallback, useState } from 'react';
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
import { Add } from '@mui/icons-material'; // Import the Add icon
import moment from 'moment';
import apiService from '../services/apiService';
import CustomCalendar from '../components/CustomCalendar';
import TableUserConfirm from '../components/TableUserConfirm';
import AddServiceTransactionDialog from '../components/AddServiceTransactionDialog'; // Import dialog

const AddTransactionPage = () => {
  const [customerName, setCustomerName] = useState('');
  const [nomorHp, setNomorHp] = useState('');
  const [alamat, setAlamat] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [status, setStatus] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false); // State for Service Dialog
  const [dataRecap, setDataRecap] = useState([])

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

  const onAddService =  useCallback((res) => {
    const data = {
      service_name: res.service_category_detail.service_name,
      service_category_name: res.service_category_detail.category_name,
      amount: res.amount,
      price_estimation: res.estimasi_harga,
      start_date: moment().format('YYYY-MM-DD'),
      end_date: res.date
    }
    setDataRecap([...dataRecap, data])
  }, [dataRecap])

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

      {/* Add Service Transaction Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setServiceDialogOpen(true)}
        startIcon={<Add />}
        sx={{
          borderRadius: '25px',
          py: 1,
          px: 3,
          mr: 6,
          fontWeight: 'bold',
          backgroundColor: '#1976d2',
          ':hover': { backgroundColor: '#115293' },
          mt: 2,
        }}
      >
        Add Service Transaction
      </Button>

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Submit
      </Button>

      {/* Service Transaction Table */}
      <Stack mt={2}>
        <TableUserConfirm data={dataRecap} />
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

      {/* Service Transaction Dialog */}
      <AddServiceTransactionDialog
        open={serviceDialogOpen}
        onClose={() => setServiceDialogOpen(false)}
        onSubmit={onAddService}
      />
    </Box>
  );
};

export default AddTransactionPage;
