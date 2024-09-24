import React from 'react';
import { Container, Typography, Grid, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
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
}));

const Contact = () => {
  const classes = useStyles();

  return (
    <div className={classes.section} id="contact">
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6}>
            <TextField
              className={classes.textField}
              label="Name"
              variant="outlined"
            />
            <TextField
              className={classes.textField}
              label="Email"
              variant="outlined"
            />
            <TextField
              className={classes.textField}
              label="Message"
              multiline
              rows={4}
              variant="outlined"
            />
            <Button className={classes.button}>Submit</Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Contact;
