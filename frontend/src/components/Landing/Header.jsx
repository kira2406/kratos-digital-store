import React, { useEffect } from 'react'
import { getTopFiveGameRequest } from '../../actions/gameActions'
import { selectTopFiveGamesData } from '../../selectors/gameDataSelectors'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Card, Typography } from '@mui/material'
import GameCard from './GameCard'


const Header = () => {

    const dispatch = useDispatch()

    const topFiveGames = useSelector(selectTopFiveGamesData)

    console.log("topFiveGames",topFiveGames)

    useEffect(() => {
    console.log("I am called once")
    dispatch(getTopFiveGameRequest())
    
    }, [])
    

  return (
    
    <Box sx={{ mt: 10 }}>
        { topFiveGames && topFiveGames.length > 0 && (
        <Box>
        <Typography color='white'  variant="h1">Trending Games</Typography>
        <GameCard key={0} game={topFiveGames[0]} />
        </Box>
        )
        }
    </Box>
  )
}

export default Header