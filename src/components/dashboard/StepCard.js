import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const StepCard = ({ stepNumber, title, text, icon }) => {
  const styles = {
    stepCard: {
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease-in-out',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      '&:hover': {
        transform: 'translateY(-5px)',
      },
    },
    stepIcon: {
      width: '100%', // Match parent width
      height: '200px', // Set fixed height
      objectFit: 'cover', // Center-crop the image
      objectPosition: 'center', // Center the image within the container
      marginTop: 'auto', // Push the icon to the bottom
    },
    stepNumber: {
      color: '#0a77b7',
      fontWeight: 600,
      fontSize: '1rem',
      marginBottom: '10px',
      fontFamily: 'Poppins, sans-serif',
    },
    stepTitle: {
      fontSize: '1.2rem',
      fontWeight: 600,
      marginBottom: '10px',
      fontFamily: 'Poppins, sans-serif',
    },
    stepText: {
      color: '#6b7a87',
      fontSize: '0.9rem',
      lineHeight: '1.4',
      fontFamily: 'Roboto, sans-serif',
      flexGrow: 1,
    },
  };

  return (
    <Card style={styles.stepCard}>
      <CardContent
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <Typography style={styles.stepNumber}>{stepNumber}</Typography>
        <Typography style={styles.stepTitle}>{title}</Typography>
        <Typography style={styles.stepText}>{text}</Typography>
        <img src={icon} style={styles.stepIcon} alt={title} />
      </CardContent>
    </Card>
  );
};

export default StepCard;
