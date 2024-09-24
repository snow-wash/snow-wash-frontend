import React from 'react';
import Home from '../components/Home';
import HowItWorks from '../components/HowItWorks';
import Services from '../components/Services';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { Navbar } from 'react-bootstrap';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Home />
      <HowItWorks />
      <Services />
      <Contact />
      <Footer />
    </>
  );
};

export default HomePage;
