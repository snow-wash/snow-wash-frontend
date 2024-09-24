import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
} from '@mui/material';
import axios from 'axios';

const QuotaTable = () => {
  const [quotas, setQuotas] = useState([]);

  useEffect(() => {
    // Fetch quotas from the backend
    axios
      .get('http://localhost:5000/api/quotas')
      .then(response => {
        if (response.data && Array.isArray(response.data.data)) {
          setQuotas(response.data.data); // Set the 'data' array to quotas
        } else {
          console.error('Unexpected response format:', response.data);
          setQuotas([]); // Fallback to an empty array if the structure is unexpected
        }
      })
      .catch(error => {
        console.error('Error fetching quotas:', error);
        setQuotas([]); // Fallback to an empty array in case of error
      });
  }, []);

  return (
    <Box
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        height: 'auto', // Adjust height based on viewport
        width: '100%',
        overflow: 'hidden', // Prevent scrollbars
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6">Quota List</Typography>
        <Button variant="contained" color="primary">
          Add New Quota
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 2, flex: 1, overflow: 'hidden' }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Quota Name</TableCell>
              <TableCell>Limit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quotas.map(quota => (
              <TableRow key={quota.id}>
                <TableCell>{quota.id}</TableCell>
                <TableCell>{quota.name}</TableCell>
                <TableCell>{quota.quota_limit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default QuotaTable;
