import { createTheme } from '@mui/material/styles';

// IMDb-tyylinen tumma teema keltaisilla aksenteilla
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#F5C518', // IMDb keltainen
      light: '#FFD54F',
      dark: '#F9A825',
      contrastText: '#000000',
    },
    secondary: {
      main: '#FFFFFF',
      light: '#F5F5F5',
      dark: '#E0E0E0',
      contrastText: '#000000',
    },
    background: {
      default: '#0F0F0F', // Tumma tausta
      paper: '#1A1A1A',   // Korttien tausta
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
    error: {
      main: '#FF5252',
    },
    success: {
      main: '#4CAF50',
    },
    warning: {
      main: '#FF9800',
    },
    divider: '#333333',
  },
  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(245, 197, 24, 0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '1rem',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(245, 197, 24, 0.3)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#F5C518',
            },
          },
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        root: {
          color: '#F5C518',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1A1A1A',
          borderRight: '1px solid #333333',
        },
      },
    },
  },
});

export default theme;
