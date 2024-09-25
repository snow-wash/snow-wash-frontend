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
import { Add, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import AddNewQuotaDialog from './form/AddNewQuotaDialog';
import SnowDialog from './SnowDialog';
import SnackbarComponent from './SnackbarComponent'; // Import SnackbarComponent
import { getRole } from '../services/roleService';
import { SUPERADMIN } from '../constants/role';

const QuotaTable = () => {
  const [quotas, setQuotas] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedQuota, setSelectedQuota] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: '',
  }); // State for Snackbar

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
          showSnackbar('Unexpected response format', 'error');
          setQuotas([]);
        }
      })
      .catch(error => {
        showSnackbar('Error fetching quotas', 'error');
        setQuotas([]);
      });
  };

  const handleFormSubmit = newQuota => {
    if (selectedQuota) {
      // Update existing quota
      axios
        .put(`http://localhost:5000/api/quotas/${selectedQuota.id}`, newQuota)
        .then(response => {
          fetchQuotas();
          setOpenDialog(false);
          setSelectedQuota(null);
          showSnackbar(
            response.data.message || 'Quota updated successfully',
            'success'
          );
        })
        .catch(error => {
          showSnackbar(
            error.response?.data?.message || 'Error updating quota',
            'error'
          );
        });
    } else {
      // Add new quota
      axios
        .post('http://localhost:5000/api/quotas', newQuota)
        .then(response => {
          fetchQuotas();
          setOpenDialog(false);
          showSnackbar(
            response.data.message || 'Quota added successfully',
            'success'
          );
        })
        .catch(error => {
          showSnackbar(
            error.response?.data?.message || 'Error adding quota',
            'error'
          );
        });
    }
  };

  const handleEdit = quota => {
    setSelectedQuota(quota);
    setOpenDialog(true);
  };

  const handleDelete = () => {
    if (selectedQuota) {
      axios
        .delete(`http://localhost:5000/api/quotas/${selectedQuota.id}`)
        .then(response => {
          fetchQuotas();
          setOpenConfirmDialog(false);
          setSelectedQuota(null);
          showSnackbar(
            response.data.message || 'Quota deleted successfully',
            'success'
          );
        })
        .catch(error => {
          setOpenConfirmDialog(false);
          setSelectedQuota(null);
          showSnackbar(
            error.response?.data?.message || 'Error deleting quota',
            'error'
          );
        });
    }
  };

  const handleOpenConfirmDialog = quota => {
    setSelectedQuota(quota);
    setOpenConfirmDialog(true);
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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
        {
          getRole() === SUPERADMIN && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setSelectedQuota(null);
                setOpenDialog(true);
              }}
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
          )
        }
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
                  borderRight: '1px solid #e0e0e0',
                }}
              >
                ID
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  borderRight: '1px solid #e0e0e0',
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
        quotaData={selectedQuota}
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

      {/* Snackbar Component */}
      <SnackbarComponent
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
};

export default QuotaTable;
