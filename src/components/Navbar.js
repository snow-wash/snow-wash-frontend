import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
  const linkStyle = {
    color: '#000', // Set text color to black
    textDecoration: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  const navbarHeight = 70; // Set the height of your navbar in pixels

  return (
    <AppBar
      position="sticky"
      style={{
        backgroundColor: '#ffffff', // Navbar background color
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: '0.3s',
        height: `${navbarHeight}px`, // Adjust height to match offset
      }}
    >
      <Container>
        <Toolbar>
          <Typography
            variant="h6"
            style={{ flexGrow: 1, color: '#000', fontWeight: 'bold' }}
          >
            Snow Wash
          </Typography>
          <Button color="inherit">
            <ScrollLink
              to="home"
              smooth={true}
              duration={500}
              style={linkStyle}
              activeClass="active-link"
              spy={true}
              offset={-navbarHeight} // Adjust this offset to match navbar height
            >
              Home
            </ScrollLink>
          </Button>
          <Button color="inherit">
            <ScrollLink
              to="how-it-works"
              smooth={true}
              duration={500}
              style={linkStyle}
              activeClass="active-link"
              spy={true}
              offset={-navbarHeight}
            >
              How it works
            </ScrollLink>
          </Button>
          <Button color="inherit">
            <ScrollLink
              to="services"
              smooth={true}
              duration={500}
              style={linkStyle}
              activeClass="active-link"
              spy={true}
              offset={-navbarHeight}
            >
              Services
            </ScrollLink>
          </Button>
          <Button color="inherit">
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              style={linkStyle}
              activeClass="active-link"
              spy={true}
              offset={-navbarHeight}
            >
              Contact
            </ScrollLink>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
