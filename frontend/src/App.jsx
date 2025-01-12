import React from 'react';
// import { useState } from 'react'
import './App.css'
import { useSelector } from 'react-redux';
import AppRouter from './routes/AppRouter';

function App() {

  const user = useSelector(state=> state.auth)
  console.log(user)

  return (
    <>
      <AppRouter />
    </>
  )
}

export default App
