import { Box, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const GameDetailsPage = () => {
    const {game_id} = useParams()

    const game = useSelector(state => state.gamesData.games[game_id])

    if (!game){
        return (
            <Box sx={{color: 'white', mt: 4, textAlign:"center"}}>
                <Typography variant="h6">Game not found</Typography>
            </Box>
        ) 
        
    }
  return (
    <Box sx={{p:4, color: 'white', mt: 10}}>
        <Typography variant='h1'>
            {game?.name}
        </Typography>
    </Box>
  )
}

export default GameDetailsPage