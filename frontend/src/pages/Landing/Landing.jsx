import React from 'react'
import Header from '../../components/Landing/Header'
import { Container } from '@mui/material'
import BrowseByCategories from '../../components/Landing/BrowseByCategories'
import GamesLibrary from '../../components/Landing/GamesLibrary'

const Landing = () => {
  return (
    <Container>
        <Header />
        <BrowseByCategories />
        <GamesLibrary />
    </Container>
  )
}

export default Landing