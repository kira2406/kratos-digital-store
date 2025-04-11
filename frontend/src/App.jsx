import React from 'react';
import './App.css'
import AppRouter from './routes/AppRouter';
import { CssBaseline, ThemeProvider} from '@mui/material';
import { theme } from './theme/theme';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  )
}

export default App
