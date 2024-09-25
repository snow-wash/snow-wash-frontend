import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  MenuItem,
  Typography,
} from '@mui/material';
import apiService from '../services/apiService';
import CustomCalendar from './CustomCalendar';

const AddServiceTransactionDialog = ({ open, onClose, onSubmit }) => {
  const [serviceCategory, setServiceCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [serviceCategories, setServiceCategories] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Form validation state
  const isFormValid = serviceCategory !== '' && amount !== '';

  useEffect(() => {
    if (open) {
      fetchServiceCategories();
      resetForm();
    }
  }, [open]);

  const fetchServiceCategories = async () => {
    try {
      const response = await apiService.get('/services-category');
      setServiceCategories(response.data);
    } catch (error) {
      console.error('Error fetching service categories', error);
    }
  };

  const resetForm = () => {
    setServiceCategory('');
    setAmount('');
    setSelectedDate('');
    setIsConfirmed(false);
  };

  const handleConfirm = () => {
    if (isFormValid) setIsConfirmed(true);
  };

  const handleEdit = () => {
    setIsConfirmed(false);
    setSelectedDate('');
  };

  const handleDateSelect = date => {
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    setSelectedDate(utcDate.toISOString().split('T')[0]);
    setCalendarOpen(false);
  };

  const handleFormSubmit = () => {
    const transactionData = {
      service_category_id: serviceCategory,
      amount: parseInt(amount, 10),
      date: selectedDate,
    };
    onSubmit(transactionData);
    handleClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <Box sx={{ p: 3 }}>
        <DialogTitle>Tambah Transaksi Servis</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              pt: '6px',
            }}
          >
            <TextField
              label="Service Category"
              variant="outlined"
              fullWidth
              select
              value={serviceCategory}
              onChange={e => setServiceCategory(e.target.value)}
              disabled={isConfirmed}
              required
            >
              {serviceCategories.map(category => (
                <MenuItem key={category.id} value={category.id}>
                  {category.category_name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Jumlah Amount"
              variant="outlined"
              fullWidth
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              disabled={isConfirmed}
              required
            />
            {isConfirmed && (
              <TextField
                label="Pilih Tanggal"
                variant="outlined"
                fullWidth
                value={selectedDate}
                onClick={() => setCalendarOpen(true)}
                InputLabelProps={{ shrink: true }}
                inputProps={{ readOnly: true }}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          {!isConfirmed ? (
            <Button
              variant="contained"
              onClick={handleConfirm}
              color="primary"
              disabled={!isFormValid} // Disable if form is not valid
            >
              Konfirmasi
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                onClick={handleEdit}
                color="secondary"
              >
                Ubah Service
              </Button>
              {selectedDate && (
                <Button
                  variant="contained"
                  onClick={handleFormSubmit}
                  color="primary"
                >
                  Selesai
                </Button>
              )}
            </>
          )}
        </DialogActions>
      </Box>
      {/* Calendar Dialog */}
      <Dialog
        open={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <Box sx={{ p: 0, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Pilih Tanggal untuk Transaksi
          </Typography>
          <CustomCalendar
            onDateSelect={handleDateSelect}
            value={selectedDate ? new Date(selectedDate) : ''}
          />
          <Typography variant="body1" sx={{ mt: 2, fontSize: '1.2rem' }}>
            Klik pada tanggal untuk memilih
          </Typography>
        </Box>
      </Dialog>
    </Dialog>
  );
};

export default AddServiceTransactionDialog;
