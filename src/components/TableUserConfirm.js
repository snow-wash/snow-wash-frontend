import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

const TableUserConfirm = ({ data }) => {
  
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Recap
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Service Name</TableCell>
            <TableCell>Service Category Name</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Price Estimation</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data ? data.map((service) => (
            <TableRow key={service.id}>
              <TableCell>{service.service_name}</TableCell>
              <TableCell>{service.service_category_name}</TableCell>
              <TableCell>{service.amount}</TableCell>
              <TableCell>{service.price_estimation}</TableCell>
              <TableCell>{service.start_date}</TableCell>
              <TableCell>{service.end_date}</TableCell>
            </TableRow>
          )) : null}
        </TableBody>
      </Table>
    </TableContainer>
  )
};

export default TableUserConfirm;
