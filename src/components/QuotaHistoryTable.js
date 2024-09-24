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
} from '@mui/material';
import axios from 'axios';

const QuotaHistoryTable = () => {
  const [quotaHistory, setQuotaHistory] = useState([]);

  useEffect(() => {
    // Fetch quota history from the backend
    axios
      .get('http://localhost:5000/api/quota-history')
      .then(response => {
        if (response.data && Array.isArray(response.data.data)) {
          setQuotaHistory(response.data.data); // Set the 'data' array to quota history
        } else {
          console.error('Unexpected response format:', response.data);
          setQuotaHistory([]); // Fallback to an empty array if the structure is unexpected
        }
      })
      .catch(error => {
        console.error('Error fetching quota history:', error);
        setQuotaHistory([]); // Fallback to an empty array in case of error
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
      <Typography variant="h6" sx={{ mb: 2 }}>
        Quota History
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 2, flex: 1, overflow: 'hidden' }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Limit Used</TableCell>
              <TableCell>Limit Remaining</TableCell>
              <TableCell>Quota ID</TableCell>
              <TableCell>Quota Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quotaHistory.map(history => (
              <TableRow key={history.id}>
                <TableCell>{history.id}</TableCell>
                <TableCell>
                  {new Date(history.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{history.limit_used}</TableCell>
                <TableCell>{history.limit_remaining}</TableCell>
                <TableCell>{history.quota_id}</TableCell>
                <TableCell>{history.quota_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default QuotaHistoryTable;
