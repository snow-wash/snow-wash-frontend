import React, { useState } from 'react';
import { Grid, Box, Typography, IconButton, Paper } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const CustomCalendar = ({ onDateSelect, selectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const today = new Date();
  const isSameDay = (d1, d2) =>
    d1 &&
    d2 &&
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const isPastDate = date => date < today.setHours(0, 0, 0, 0);

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
  const daysArray = [...Array(daysInMonth + firstDayIndex).keys()];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const handleDateClick = date => {
    if (!isPastDate(date)) {
      onDateSelect(date);
    }
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

          // Check for valid date before using getFullYear()
          const isToday = date && isSameDay(date, today);
          const isSelected = date && isSameDay(date, selectedDate);
          const isDisabled = isPastDate(date) && !isToday;

          return (
            <Grid item xs={1.71} key={index}>
              {index >= firstDayIndex && (
                <Box
                  onClick={() => handleDateClick(date)}
                  sx={{
                    p: 1,
                    height: 80,
                    borderRadius: 1,
                    backgroundColor: isDisabled
                      ? 'grey.300'
                      : isSelected
                      ? 'warning.main'
                      : 'primary.light',
                    color: isDisabled
                      ? 'text.disabled'
                      : 'primary.contrastText',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    border: isToday ? '2px solid green' : 'none',
                    '&:hover': {
                      backgroundColor: !isDisabled && 'primary.dark',
                    },
                  }}
                >
                  <Typography variant="body1">{day}</Typography>
                  {isToday && <Typography variant="caption">Today</Typography>}
                  {isSelected && (
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
