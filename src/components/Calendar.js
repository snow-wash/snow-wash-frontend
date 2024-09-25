import React, { useState } from 'react';
import {
  Paper,
  Grid,
  Typography,
  Button,
  Box,
  Dialog,
  TextField,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const Calendar = () => {
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventText, setEventText] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpenDialog = date => {
    setSelectedDate(date);
    setEventText(events[date] || '');
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEventText('');
  };

  const handleSaveEvent = () => {
    setEvents({ ...events, [selectedDate]: eventText });
    setOpen(false);
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 600, margin: 'auto' }}>
        <Typography variant="h4" align="center" gutterBottom>
          {currentDate.toLocaleString('default', { month: 'long' })} {year}
        </Typography>
        <Grid container spacing={1}>
          {[...Array(daysInMonth)].map((_, index) => {
            const day = index + 1;
            const date = `${year}-${month + 1}-${day}`;
            return (
              <Grid item xs={4} sm={3} md={2} key={date}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => handleOpenDialog(date)}
                  sx={{
                    height: 80,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="subtitle1">{day}</Typography>
                  <Typography variant="caption">{events[date]}</Typography>
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Paper>

      <Dialog open={open} onClose={handleCloseDialog}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6">Add Event</Typography>
          <TextField
            fullWidth
            label="Event"
            value={eventText}
            onChange={e => setEventText(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleCloseDialog} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSaveEvent}>
              Save
            </Button>
          </Box>
        </Box>
      </Dialog>
    </LocalizationProvider>
  );
};

export default Calendar;
