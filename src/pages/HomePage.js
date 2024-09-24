import React from 'react';
import Home from '../components/dashboard/Home';
import HowItWorks from '../components/dashboard/HowItWorks';
import Services from '../components/dashboard/Services';
import Contact from '../components/dashboard/Contact';
import Footer from '../components/dashboard/Footer';

import NavbarComponent from '../components/dashboard/NavbarComponent';

const HomePage = () => {
  return (
    <>
      <NavbarComponent />
      <Home />
      <HowItWorks />
      <Services />
      <Contact />
      <Footer />
    </>
  );
};

export default HomePage;
