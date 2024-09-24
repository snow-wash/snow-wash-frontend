import React from 'react';
import { Container, Typography, Grid, TextField, Button } from '@mui/material';

const Contact = () => {
  const styles = {
    section: {
      padding: '50px 0',
      backgroundColor: '#e3f4ff',
      textAlign: 'center',
    },
    textField: {
      marginBottom: '20px',
      width: '100%',
    },
    button: {
      backgroundColor: '#0a77b7',
      color: '#fff',
      fontWeight: 'bold',
      '&:hover': {
        backgroundColor: '#075d8c',
      },
    },
  };

  return (
    <div style={styles.section} id="contact">
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6}>
            <TextField
              style={styles.textField}
              label="Name"
              variant="outlined"
            />
            <TextField
              style={styles.textField}
              label="Email"
              variant="outlined"
            />
            <TextField
              style={styles.textField}
              label="Message"
              multiline
              rows={4}
              variant="outlined"
            />
            <Button style={styles.button}>Submit</Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Contact;
