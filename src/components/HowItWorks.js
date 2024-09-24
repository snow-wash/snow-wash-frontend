import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import StepCard from './StepCard';
import pickupIcon from '../assets/pickup.png';
import washdryIcon from '../assets/washdry.png';
import foldIcon from '../assets/fold.png';
import deliveryIcon from '../assets/delivery.png';

const useStyles = makeStyles(theme => ({
  section: {
    padding: '80px 0',
    backgroundColor: '#e3f4ff',
    textAlign: 'center',
  },
  title: {
    color: '#0a77b7',
    marginBottom: '10px',
    fontSize: '1.2rem', // Slightly increased font size
    fontWeight: 700,
    fontFamily: 'Grandstander, sans-serif', // Apply Grandstander font
    letterSpacing: '0.1em', // Adjust letter spacing for better appearance
  },
  subtitle: {
    color: '#333',
    marginBottom: '30px',
    fontSize: '2rem',
    fontWeight: 600,
    fontFamily: 'Grandstander, sans-serif',
  },
}));

const HowItWorks = () => {
  const classes = useStyles();

  return (
    <div className={classes.section} id="how-it-works">
      <Container maxWidth="lg">
        <Typography variant="h6" className={classes.title}>
          HOW IT WORKS
        </Typography>
        <Typography variant="h4" className={classes.subtitle}>
          Get it done in 4 steps
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <StepCard
              stepNumber="STEP 1"
              title="Pickup"
              text="We pick up your laundry from your home or office."
              icon={pickupIcon}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StepCard
              stepNumber="STEP 2"
              title="Wash & Dry"
              text="We wash and dry your clothes according to your preferences."
              icon={washdryIcon}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StepCard
              stepNumber="STEP 3"
              title="Fold"
              text="Your clothes are neatly folded and prepared for delivery."
              icon={foldIcon}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StepCard
              stepNumber="STEP 4"
              title="Delivery"
              text="We deliver your clean and folded laundry to your doorstep."
              icon={deliveryIcon}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HowItWorks;
