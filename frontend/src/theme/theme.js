import { createTheme } from '@mui/material';
const { palette } = createTheme();

export const theme = createTheme({
    palette: {
      primary: {
        main: '#034078', // Example color
      },
      secondary: {
        main: '#034078',
      },
      background: {
        default: '#0f0e11',
      },
      black: palette.augmentColor({
      color: {
        main: "#040404"
      }
    })
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
    },
  })