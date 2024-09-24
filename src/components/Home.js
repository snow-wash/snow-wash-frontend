import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import washingMachine from '../assets/washingMachine.png'; // Update this path accordingly
import { Link as ScrollLink } from 'react-scroll'; // Import Link from react-scroll

const useStyles = makeStyles(theme => ({
  homeContainer: {
    backgroundColor: '#f0f8ff',
    padding: '100px 0',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
  },
  discountBanner: {
    backgroundColor: '#cdeaff',
    color: '#1e6f8b',
    padding: '10px 25px',
    borderRadius: '20px',
    marginBottom: '10px',
    display: 'inline-block',
    fontSize: '1rem',
    fontWeight: 'bold',
    fontFamily: 'Outfit, sans-serif',
  },
  homeText: {
    color: '#0a77b7',
    fontWeight: 400,
    fontSize: '3rem', // Larger font size for the title
    lineHeight: '1.2',
    marginBottom: '20px',
    fontFamily: 'Grandstander, sans-serif',
  },
  subText: {
    color: '#6b7a87',
    marginTop: '20px',
    fontSize: '1.2rem',
    lineHeight: '1.6',
    fontFamily: 'Outfit, sans-serif',
    maxWidth: '400px',
  },
  button: {
    backgroundColor: '#a9e3f9',
    color: '#0a77b7',
    fontWeight: 'bold',
    marginTop: '30px',
    padding: '10px 30px',
    fontSize: '1rem',
    borderRadius: '20px',
    '&:hover': {
      backgroundColor: '#4998e2',
    },
  },
  stats: {
    marginTop: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '400px',
  },
  statItem: {
    textAlign: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    fontFamily: 'Outfit, sans-serif',
  },
  statLabel: {
    color: '#6b7a87',
    fontSize: '1rem',
    fontFamily: 'Outfit, sans-serif',
  },
  image: {
    maxWidth: '90%', // Increased size to match the design
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.homeContainer} id="home">
      <Container maxWidth="lg">
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={6}>
            <div className={classes.discountBanner}>
              20% Discount for 1 Month Subscription
            </div>
            <Typography className={classes.homeText}>
              Laundry today or Naked tomorrow.
            </Typography>
            <Typography className={classes.subText}>
              Snow Wash service will wash, dry, and fold your laundry at an
              affordable price. Pickup and drop-off options available!
            </Typography>
            <ScrollLink
              to="how-it-works" // The id of the target section
              smooth={true}
              duration={500}
              offset={-70} // Adjust this value based on your navbar height
            >
              <Button className={classes.button}>How it works</Button>
            </ScrollLink>
            <div className={classes.stats}>
              <div className={classes.statItem}>
                <Typography className={classes.statNumber}>200+</Typography>
                <Typography className={classes.statLabel}>
                  Happy Customers
                </Typography>
              </div>
              <div className={classes.statItem}>
                <Typography className={classes.statNumber}>1+</Typography>
                <Typography className={classes.statLabel}>
                  Years of Experience
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src={washingMachine}
              alt="Washing Machine"
              className={classes.image}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
