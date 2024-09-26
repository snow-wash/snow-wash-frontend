import React, { useState, useEffect, useCallback } from 'react';
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
  Divider,
} from '@mui/material';
import apiService from '../services/apiService';
import CustomCalendar from './CustomCalendar';

const AddServiceTransactionDialog = ({ open, onClose, onSubmit }) => {
  const [serviceCategory, setServiceCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [estimasiHarga, setEstimasiHarga] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [serviceCategories, setServiceCategories] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [amountError, setAmountError] = useState('');

  // Form validation state
  const isFormValid =
    serviceCategory !== '' && amount !== '' && amountError === '';

  useEffect(() => {
    if (open) {
      fetchServiceCategories();
      resetForm();
    }
  }, [open]);

  useEffect(() => {
    if (serviceCategory && amount !== '') {
      validateAmount(amount);
    }
  }, [serviceCategory, amount]);

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
    setEstimasiHarga(0);
    setAmountError('');
  };

  const validateAmount = useCallback(
    inputAmount => {
      const selectedService = serviceCategories.find(
        category => category.id === parseInt(serviceCategory, 10)
      );

      if (selectedService) {
        if (inputAmount < selectedService.minimum_load) {
          setAmountError(
            `Input tidak boleh kurang dari ${selectedService.minimum_load}`
          );
          setEstimasiHarga(0);
        } else if (
          inputAmount >
          selectedService.load_amount * selectedService.quota_limit
        ) {
          setAmountError(
            `Input tidak boleh lebih dari ${
              selectedService.load_amount * selectedService.quota_limit
            }`
          );
          setEstimasiHarga(0);
        } else {
          setAmountError('');
          const estimatedPrice =
            Math.ceil(inputAmount / selectedService.load_amount) *
            selectedService.price;
          setEstimasiHarga(estimatedPrice);
        }
      }
    },
    [serviceCategory, serviceCategories]
  );

  const handleAmountChange = e => {
    const inputAmount = parseInt(e.target.value, 10);
    setAmount(inputAmount);
    validateAmount(inputAmount);
  };

  const handleConfirm = useCallback(() => {
    if (isFormValid) {
      setIsConfirmed(true);
    }
  }, [isFormValid]);

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

  const handleFormSubmit = useCallback(() => {
    const serviceCat = serviceCategories.find(
      category => category.id === parseInt(serviceCategory, 10)
    );
    const transactionData = {
      service_category_id: serviceCategory,
      service_category_detail: serviceCat,
      amount: parseInt(amount, 10),
      estimasi_harga: estimasiHarga,
      date: selectedDate,
    };
    onSubmit(transactionData);
    handleClose();
  }, [serviceCategory, amount, estimasiHarga, selectedDate, serviceCategories]);

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
              onChange={handleAmountChange}
              disabled={isConfirmed}
              required
              error={amountError !== ''}
              helperText={amountError}
            />
            <Typography variant="body1" color="primary" sx={{ mt: 1 }}>
              Estimasi Harga: Rp. {estimasiHarga.toLocaleString('id-ID')}
            </Typography>
            <Divider sx={{ my: 2 }} />
            {isConfirmed && (
              <TextField
                label="Pilih Tanggal"
                variant="outlined"
                fullWidth
                value={selectedDate || 'Pilih tanggal'} // Hint text jika tanggal belum dipilih
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
