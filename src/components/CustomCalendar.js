import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, IconButton, Paper } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const CustomCalendar = ({ value, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(value || new Date());
  const [selectedDate, setSelectedDate] = useState(value);

  // Get first and last day of the month
  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const daysInMonth = lastDay.getDate();
  const firstDayIndex = firstDay.getDay();

  // Days array
  const daysArray = [...Array(daysInMonth + firstDayIndex).keys()];

  // Handle month navigation
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  // Handle date selection
  const handleDateClick = date => {
    if (date >= new Date().setHours(0, 0, 0, 0)) {
      setSelectedDate(date);
      onDateSelect(date);
    }
  };

  const isToday = date => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = date => {
    return (
      selectedDate &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', p: 2 }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <IconButton onClick={handlePrevMonth}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6">
            {currentDate.toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })}
          </Typography>
          <IconButton onClick={handleNextMonth}>
            <ArrowForward />
          </IconButton>
        </Box>
      </Paper>
      <Grid container spacing={1} sx={{ userSelect: 'none' }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <Grid item xs={1.71} key={day} sx={{ textAlign: 'center' }}>
            <Typography variant="body1" fontWeight="bold">
              {day}
            </Typography>
          </Grid>
        ))}
        {daysArray.map((_, index) => {
          const day = index - firstDayIndex + 1;
          const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
          );
          const past = date < new Date().setHours(0, 0, 0, 0);
          return (
            <Grid item xs={1.71} key={index}>
              {index >= firstDayIndex && (
                <Box
                  sx={{
                    p: 1,
                    height: 80,
                    borderRadius: 1,
                    backgroundColor: isSelected(date)
                      ? 'green'
                      : past
                      ? 'grey.300'
                      : 'primary.light',
                    color: 'primary.contrastText',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: past ? 'default' : 'pointer',
                    '&:hover': {
                      backgroundColor: past ? 'grey.300' : 'primary.dark',
                    },
                    border: isToday(date) ? '2px solid green' : 'none',
                  }}
                  onClick={() => handleDateClick(date)}
                >
                  <Typography variant="body1">{day}</Typography>
                  {isToday(date) && (
                    <Typography variant="caption">Today</Typography>
                  )}
                  {isSelected(date) && (
                    <Typography variant="caption">Selected Date</Typography>
                  )}
                </Box>
              )}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CustomCalendar;
