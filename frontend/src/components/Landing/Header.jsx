import React, { useEffect } from 'react'
import { getTopFiveGameRequest } from '../../actions/gameActions'
import { selectTopFiveGamesData } from '../../selectors/gameDataSelectors'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Paper, Typography } from '@mui/material'
import Carousel from 'react-material-ui-carousel';


const Header = () => {

    const dispatch = useDispatch()

    const topFiveGames = useSelector(selectTopFiveGamesData)

    useEffect(() => {
    dispatch(getTopFiveGameRequest())
    
    }, [])
    

  return (
    
    <Box sx={{ mt: 10 }}>
        
        <Box>
        <Typography color='white' variant="h1" sx={{paddingBottom: "10px"}}>Trending Games</Typography>
        <Box>
        <Carousel>
          {topFiveGames && topFiveGames.length > 0 && topFiveGames.map((game, index) => (<Paper sx={{height: "30vh", padding: "20px", display: "flex", flexDirection: "column-reverse"}} key={index}>
            <h2>{game?.title}</h2>
            
          </Paper>))}
        </Carousel>
        </Box>
        </Box>
        
    </Box>
  )
}

export default Header