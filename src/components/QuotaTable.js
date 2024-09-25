import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material'; // Import icons for actions
import axios from 'axios';
import AddNewQuotaDialog from './form/AddNewQuotaDialog'; // Import the dialog component
import SnowDialog from './SnowDialog'; // Import SnowDialog component

const QuotaTable = () => {
  const [quotas, setQuotas] = useState([]);
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // State to control confirmation dialog
  const [selectedQuota, setSelectedQuota] = useState(null); // State to hold selected quota for deletion

  useEffect(() => {
    fetchQuotas();
  }, []);

  const fetchQuotas = () => {
    axios
      .get('http://localhost:5000/api/quotas')
      .then(response => {
        if (response.data && Array.isArray(response.data.data)) {
          setQuotas(response.data.data);
        } else {
          console.error('Unexpected response format:', response.data);
          setQuotas([]);
        }
      })
      .catch(error => {
        console.error('Error fetching quotas:', error);
        setQuotas([]);
      });
  };

  const handleFormSubmit = newQuota => {
    axios
      .post('http://localhost:5000/api/quotas', newQuota)
      .then(() => {
        fetchQuotas();
        setOpenDialog(false);
      })
      .catch(error => {
        console.error('Error adding quota:', error);
      });
  };

  // Function to handle editing a quota (Placeholder for edit functionality)
  const handleEdit = quota => {
    console.log('Edit quota:', quota);
  };

  // Function to handle deletion of a quota
  const handleDelete = () => {
    if (selectedQuota) {
      axios
        .delete(`http://localhost:5000/api/quotas/${selectedQuota.id}`)
        .then(() => {
          fetchQuotas();
          setOpenConfirmDialog(false);
          setSelectedQuota(null);
        })
        .catch(error => {
          console.error('Error deleting quota:', error);
        });
    }
  };

  const handleOpenConfirmDialog = quota => {
    setSelectedQuota(quota);
    setOpenConfirmDialog(true);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Quota List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenDialog(true)}
          startIcon={<Add />}
          sx={{
            borderRadius: '25px',
            py: 1,
            px: 3,
            fontWeight: 'bold',
            backgroundColor: '#1976d2',
            ':hover': { backgroundColor: '#115293' },
          }}
        >
          Add New Quota
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          mt: 2,
          boxShadow: '0px 3px 6px rgba(0,0,0,0.1)',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Table sx={{ tableLayout: 'auto' }}>
          <TableHead sx={{ backgroundColor: '#f0f4f7' }}>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  maxWidth: '50px',
                  minWidth: '50px',
                  whiteSpace: 'nowrap',
                  borderRight: '1px solid #e0e0e0', // Vertical divider
                }}
              >
                ID
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  borderRight: '1px solid #e0e0e0', // Vertical divider
                }}
              >
                Quota Name
              </TableCell>
              <TableCell
                sx={{ fontWeight: 'bold', borderRight: '1px solid #e0e0e0' }}
              >
                Limit
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quotas.map(quota => (
              <TableRow
                key={quota.id}
                sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}
              >
                <TableCell
                  sx={{
                    maxWidth: '50px',
                    minWidth: '50px',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    borderRight: '1px solid #e0e0e0',
                  }}
                >
                  {quota.id}
                </TableCell>
                <TableCell
                  sx={{
                    borderRight: '1px solid #e0e0e0',
                  }}
                >
                  {quota.name}
                </TableCell>
                <TableCell
                  sx={{
                    borderRight: '1px solid #e0e0e0',
                  }}
                >
                  {quota.quota_limit}
                </TableCell>
                <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Tooltip title="Edit">
                    <IconButton
                      onClick={() => handleEdit(quota)}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={() => handleOpenConfirmDialog(quota)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add New Quota Dialog */}
      <AddNewQuotaDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleFormSubmit}
      />

      {/* Confirmation Dialog */}
      <SnowDialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        title="Confirm Deletion"
        content={`Are you sure you want to delete the quota "${selectedQuota?.name}"?`}
        onConfirm={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </Box>
  );
};

export default QuotaTable;
