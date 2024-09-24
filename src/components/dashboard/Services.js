import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import ServiceCard from './ServiceCard'; // Import the reusable component

const servicesData = [
  {
    title: 'Single Size',
    features: ['2 loads per week', 'up to 10 lbs per load'],
    price: '10 dollars /per month',
  },
  {
    title: 'Couples Size',
    features: [
      '4 loads per week',
      'up to 12 lbs per load',
      'Special garments',
      'Pickup & drop off',
    ],
    price: '20 dollars /per month',
  },
  {
    title: 'Family Size',
    features: [
      '6 loads per week',
      'up to 15 lbs per load',
      'Pickup & drop off',
      'Free detergent samples',
    ],
    price: '30 dollars /per month',
  },
];

const Services = () => {
  const styles = {
    section: {
      padding: '60px 0',
      backgroundColor: '#f0f8ff',
      textAlign: 'center',
    },
    title: {
      marginBottom: '40px',
      color: '#0a77b7',
      fontSize: '2rem',
      fontWeight: 600,
      fontFamily: 'Outfit, sans-serif',
    },
  };

  return (
    <div style={styles.section} id="services">
      <Container maxWidth="lg">
        <Typography variant="h4" style={styles.title}>
          Services & Packages
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {servicesData.map((service, index) => (
            <Grid item xs={12} md={4} key={index}>
              <ServiceCard
                title={service.title}
                features={service.features}
                price={service.price}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Services;
