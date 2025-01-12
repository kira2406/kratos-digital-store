import React from 'react';
// import { useState } from 'react'
import './App.css'
import { useSelector } from 'react-redux';
import AppRouter from './routes/AppRouter';
import { CssBaseline, ThemeProvider} from '@mui/material';
import { theme } from './theme/theme';

function App() {

  const user = useSelector(state=> state.auth)
  console.log(user)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  )
}

export default App
