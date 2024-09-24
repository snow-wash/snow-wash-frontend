import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import the custom theme
import Routes from './Routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes /> {/* Use the Routes component */}
    </ThemeProvider>
  );
}

export default App;
