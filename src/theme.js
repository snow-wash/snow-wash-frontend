// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0a77b7',
    },
    secondary: {
      main: '#a9e3f9',
    },
    background: {
      default: '#f0f8ff',
    },
  },
  typography: {
    fontFamily: 'Outfit, sans-serif',
    h1: {
      fontFamily: 'Grandstander, sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'Grandstander, sans-serif',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      fontWeight: 'bold',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h6: {
          fontFamily: 'Grandstander, sans-serif',
          fontWeight: 700,
          fontSize: '1.2rem',
        },
        h4: {
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          fontSize: '2rem',
        },
      },
    },
  },
});

export default theme;
