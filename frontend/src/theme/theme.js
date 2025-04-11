import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: "dark",  // Ensures MUI components follow dark mode defaults
    primary: {
      main: '#034078',
    },
    secondary: {
      main: '#FF9800', // Changed to orange for better contrast
    },
    ashgray: {
      main: "#A2A7A5"
    },
    background: {
      default: '#0f0e11',
      paper: '#1c1b20', // Darker grey for better contrast
    },
    text: {
      primary: '#ffffff', // Ensures light text on dark background
      secondary: '#b0b0b0', // Softer contrast text
    },
    black: { 
      main: "#040404" 
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      textTransform: "none", // Prevents uppercase buttons
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1c1b20', // Ensures consistent dark theme
          color: '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4, // Slightly rounded buttons for modern look
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            color: "#b0b0b0", // Light label text
          },
          "& input": {
            color: "#ffffff", // Light text input
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#666", // Subtle borders
            },
            "&:hover fieldset": {
              borderColor: "#999",
            },
          },
        },
      },
    },
  }
});
