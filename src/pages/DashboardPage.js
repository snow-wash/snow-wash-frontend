import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

// Registrasi elemen dan komponen Chart.js
ChartJS.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

// Data untuk Revenue
const revenueData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Revenue (IDR)',
      data: [100000, 150000, 130000, 200000, 250000, 300000],
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      fill: false,
      tension: 0.4,
    },
  ],
};

// Data untuk Top Services
const topServicesData = {
  labels: [
    'Express Laundry',
    'Dry Cleaning',
    'Ironing Service',
    'Dresses Cleaning',
  ],
  datasets: [
    {
      data: [35, 25, 20, 15],
      backgroundColor: [
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
      ],
    },
  ],
};

// Data untuk Tren Transaksi Bulanan
const monthlyTransactionTrendData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Number of Transactions',
      data: [10, 15, 12, 20, 18, 25],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    },
  ],
};

const DashboardPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      {/* Quick Stats */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6">Total Revenue</Typography>
            <Typography variant="h5" color="primary" fontWeight="bold">
              IDR 1,500,000
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6">Total Transactions</Typography>
            <Typography variant="h5" color="primary" fontWeight="bold">
              165
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6">Top Service</Typography>
            <Typography variant="h5" color="primary" fontWeight="bold">
              Express Laundry
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Chart Section */}
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Revenue Overview
        </Typography>
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Box sx={{ height: 300 }}>
            <Line
              data={revenueData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </Box>
        </Paper>
      </Box>

      <Box mt={4} sx={{ width: 600 }}>
        <Typography variant="h5" gutterBottom>
          Top Services
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Box sx={{ width: '100%', mx: 'auto' }}>
            {/* Batasi ukuran doughnut chart dengan menggunakan width dan height yang lebih kecil */}
            <Doughnut
              data={topServicesData}
              options={{ responsive: true, maintainAspectRatio: true }}
            />
          </Box>
        </Paper>
      </Box>

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Monthly Transaction Trend
        </Typography>
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Box sx={{ height: 300 }}>
            <Line
              data={monthlyTransactionTrendData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default DashboardPage;
