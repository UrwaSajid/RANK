import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create a theme based on your style.css variables
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#42456e', // from your gradient
    },
    secondary: {
      main: '#88899c', // your secondary color
    },
    background: {
      default: '#1c2231', // your primary color
      paper: '#242a37', // from your gradient
    },
    text: {
      primary: 'rgba(239, 228, 228, 0.87)', // your text-light
    },
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: '28px',
          padding: '0.8rem 2rem',
          fontWeight: 600,
          backgroundColor: '#88899c',
          color: '#000',
          '&:hover': {
            backgroundColor: '#535bf2',
            transform: 'translateY(-2px)',
            color: 'white',
          },
        },
        outlined: {
          borderRadius: '28px',
          padding: '0.8rem 2rem',
          fontWeight: 600,
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #242a37 0%, #42456e 100%)',
          color: 'rgba(239, 228, 228, 0.87)',
        }
      }
    },
  }
});

export default function AppTheme({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
