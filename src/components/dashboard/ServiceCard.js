import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@mui/material';

const ServiceCard = ({ title, features, price }) => {
  const styles = {
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '15px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%', // Ensure the card fills the entire grid item
      '&:hover': {
        transform: 'translateY(-5px)',
      },
    },
    cardHeader: {
      backgroundColor: '#e3f4ff',
      padding: '20px',
      borderRadius: '15px 15px 0 0',
      color: '#0a77b7',
      fontWeight: 700,
      fontSize: '1.4rem',
      fontFamily: 'Outfit, sans-serif',
    },
    cardContent: {
      flexGrow: 1, // Allows content to grow and fill space
      fontFamily: 'Outfit, sans-serif',
    },
    cardPrice: {
      fontSize: '1.8rem',
      fontWeight: 600,
      color: '#0a77b7',
      margin: '10px 0',
      textAlign: 'center', // Center align the price
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      paddingBottom: '20px',
    },
    button: {
      backgroundColor: '#a9e3f9',
      color: '#0a77b7',
      fontWeight: 'bold',
      fontSize: '1rem',
      padding: '10px 30px',
      borderRadius: '30px',
      '&:hover': {
        backgroundColor: '#90d4ef',
      },
    },
    featureList: {
      listStyleType: 'none',
      padding: 0,
      margin: '0px 0',
    },
    featureItem: {
      marginBottom: '10px',
      fontSize: '1rem',
      color: '#555',
      fontFamily: 'Outfit, sans-serif',
    },
  };

  return (
    <Card style={styles.card}>
      <div style={styles.cardHeader}>{title}</div>
      <CardContent style={styles.cardContent}>
        <ul style={styles.featureList}>
          {features.map((feature, index) => (
            <li key={index} style={styles.featureItem}>
              <span>✔</span> {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <Typography style={styles.cardPrice}>{price}</Typography>
      <CardActions style={styles.buttonContainer}>
        <Button style={styles.button}>Choose</Button>
      </CardActions>
    </Card>
  );
};

export default ServiceCard;
