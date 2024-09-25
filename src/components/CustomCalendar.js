import React, { useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  IconButton,
  Paper,
  Button,
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const CustomCalendar = ({ events = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get first day of the month
  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  // Get last day of the month
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

  // Check if there is an event for the specific date
  const renderEventText = date => {
    const event = events.find(
      e => new Date(e.date).toDateString() === date.toDateString()
    );
    return event ? event.text : '';
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

          return (
            <Grid item xs={1.71} key={index}>
              {index >= firstDayIndex && (
                <Box
                  sx={{
                    p: 1,
                    height: 80,
                    borderRadius: 1,
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  }}
                >
                  <Typography variant="body1">{day}</Typography>
                  <Typography variant="caption">
                    {renderEventText(date)}
                  </Typography>
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
