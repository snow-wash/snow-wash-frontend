// CalendarModal.js
import React, { useState } from 'react';
import { Dialog, Box, Typography, Button, Grid } from '@mui/material';

const CalendarModal = ({ open, onClose, onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = date => {
    setSelectedDate(date);
    onDateSelect(date); // Call the onDateSelect callback with the selected date
    onClose(); // Close the modal after selecting a date
  };

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);

  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={{ p: 3, width: 400 }}>
        <Typography variant="h6" align="center">
          Select a Date
        </Typography>
        <Grid container spacing={1} sx={{ mt: 2 }}>
          {[...Array(daysInMonth)].map((_, index) => {
            const day = index + 1;
            const date = `${year}-${month + 1}-${day}`;
            return (
              <Grid item xs={4} key={date}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => handleDateClick(date)}
                  sx={{ height: 60 }}
                >
                  {day}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Dialog>
  );
};

export default CalendarModal;
