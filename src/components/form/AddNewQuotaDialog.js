import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Slide,
} from '@mui/material';

// Transition for dialog appearance
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddNewQuotaDialog = ({ open, onClose, onSubmit }) => {
  const [quotaName, setQuotaName] = useState('');
  const [quotaLimit, setQuotaLimit] = useState('');

  // Handle form submission
  const handleSubmit = event => {
    event.preventDefault();
    const newQuota = {
      name: quotaName,
      quota_limit: parseInt(quotaLimit, 10), // Convert to integer
    };
    onSubmit(newQuota); // Pass the new quota data to the onSubmit function
    setQuotaName(''); // Clear form after submission
    setQuotaLimit('');
    onClose(); // Close dialog after submission
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: 15,
          padding: '20px',
        },
      }}
    >
      <DialogTitle>
        <Typography
          variant="h5"
          sx={{ fontWeight: 'bold', textAlign: 'center', color: '#1976d2' }}
        >
          Add New Quota
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            p: 2,
            '& .MuiTextField-root': {
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
            },
          }}
        >
          <TextField
            label="Quota Name"
            variant="outlined"
            fullWidth
            value={quotaName}
            onChange={e => setQuotaName(e.target.value)}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
              },
            }}
          />
          <TextField
            label="Quota Limit"
            type="number"
            variant="outlined"
            fullWidth
            value={quotaLimit}
            onChange={e => setQuotaLimit(e.target.value)}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
              },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', p: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: '25px',
            width: '120px',
            py: 1,
            mr: 1,
            fontWeight: 'bold',
            color: '#1976d2',
            borderColor: '#1976d2',
            ':hover': {
              borderColor: '#115293',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit}
          variant="contained"
          sx={{
            borderRadius: '25px',
            width: '120px',
            py: 1,
            fontWeight: 'bold',
            backgroundColor: '#1976d2',
            ':hover': { backgroundColor: '#115293' },
          }}
        >
          Add Quota
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewQuotaDialog;
