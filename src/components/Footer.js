import React from 'react';
import { Container, Typography, Grid, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: '#e3f4ff',
    padding: '30px 0',
    marginTop: 'auto',
    textAlign: 'center',
  },
  footerText: {
    color: '#555',
    fontFamily: 'Outfit, sans-serif',
    fontSize: '0.9rem',
    margin: '5px 0',
  },
  link: {
    color: '#0a77b7',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Typography className={classes.footerText}>
              © 2024 Snow Wash. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
