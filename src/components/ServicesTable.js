import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import apiService from '../services/apiService';
import AddNewServiceDialog from './form/AddNewServiceDialog';
import SnowDialog from './SnowDialog';
import SnackbarComponent from './SnackbarComponent';
import { getRole } from '../services/roleService';
import { SUPERADMIN } from '../constants/role';

const ServiceTable = () => {
  const [services, setServices] = useState([]);
  const [quotas, setQuotas] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // New state to track edit mode
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    fetchServices();
    fetchQuotas();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await apiService.get('/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services!', error);
      showSnackbar('Error fetching services!', 'error');
    }
  };

  const fetchQuotas = async () => {
    try {
      const response = await apiService.get('/quotas');
      setQuotas(response.data);
    } catch (error) {
      console.error('Error fetching quotas!', error);
      showSnackbar('Error fetching quotas!', 'error');
    }
  };

  const handleFormSubmit = async (service, serviceId) => {
    try {
      if (isEditing && serviceId) {
        // Update service
        const response = await apiService.put(
          `/services/${serviceId}`,
          service
        );
        setServices(
          services.map(s => (s.id === serviceId ? response.data : s))
        );
        showSnackbar('Service updated successfully!', 'success');
      } else {
        // Add new service
        const response = await apiService.post('/services', service);
        setServices([...services, response.data]);
        showSnackbar('Service added successfully!', 'success');
      }
      setOpenDialog(false);
    } catch (error) {
      console.error('Error adding/updating service!', error);
      showSnackbar('Error saving service!', 'error');
    }
  };

  const handleEdit = service => {
    setSelectedService(service);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    try {
      if (selectedService) {
        await apiService.delete(`/services/${selectedService.id}`);
        setServices(
          services.filter(service => service.id !== selectedService.id)
        );
        setOpenConfirmDialog(false);
        setSelectedService(null);
        showSnackbar('Service deleted successfully!', 'success');
      }
    } catch (error) {
      console.error('Error deleting service!', error);
      setOpenConfirmDialog(false);
      setSelectedService(null);
      showSnackbar(error.message || 'Error deleting service!', 'error');
    }
  };

  const handleOpenConfirmDialog = service => {
    setSelectedService(service);
    setOpenConfirmDialog(true);
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
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
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Services List
        </Typography>
        {
          getRole() === SUPERADMIN && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setIsEditing(false); // Reset editing mode
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
              Add New Service
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
                No
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  borderRight: '1px solid #e0e0e0',
                }}
              >
                Service Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  borderRight: '1px solid #e0e0e0',
                }}
              >
                Quota Name
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service, index) => {
              const relatedQuota = quotas.find(q => q.id === service.quota_id);
              return (
                <TableRow
                  key={service.id}
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
                    {index + 1}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: '1px solid #e0e0e0',
                    }}
                  >
                    {service.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: '1px solid #e0e0e0',
                    }}
                  >
                    {relatedQuota ? relatedQuota.name : 'N/A'}
                  </TableCell>
                  <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() => handleEdit(service)}
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => handleOpenConfirmDialog(service)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add or Edit Service Dialog */}
      <AddNewServiceDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleFormSubmit}
        quotas={quotas}
        serviceToEdit={isEditing ? selectedService : null} // Pass serviceToEdit for editing
      />

      {/* Confirmation Dialog */}
      <SnowDialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        title="Confirm Deletion"
        content={`Are you sure you want to delete the service "${selectedService?.name}"?`}
        onConfirm={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* Snackbar Component */}
      <SnackbarComponent
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Box>
  );
};

export default ServiceTable;
