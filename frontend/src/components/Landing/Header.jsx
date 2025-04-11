import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import Carousel from 'react-material-ui-carousel';
import useFeaturedGames from '../../hooks/useFeaturedGames';


const Header = () => {

  const { featuredGames, featuredGameLoading, featuredGameError } = useFeaturedGames();

  return (
    
    <Box sx={{ mt: 10 }}>
        
        <Box>
        <Typography color='white' variant="h5" sx={{paddingBottom: "10px"}}>FEATURED</Typography>
        <Box>
          {featuredGameLoading && <Typography color="white">Loading...</Typography>}
          {featuredGameError && <Typography color="red">{featuredGameError}</Typography>}
          {!featuredGameLoading && featuredGames.length > 0 && (
            <Carousel>
            {featuredGames.map((game, index) => (
              <Paper
              key={index}
              sx={{height: "60vh",
                padding: "20px",
                display: "flex",
                flexDirection: "column-reverse",
                borderRadius: '10px',
                backgroundImage: `url(${game?.screenshots[Math.floor(Math.random() * game?.screenshots.length)]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              cursor:"pointer",
            }}
               >
              <Box
                  sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '80%', // Adjust the height of the overlay
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))', // Black to transparent gradient
                      borderBottomLeftRadius: '10px', // Optional: rounded corners at the bottom
                      borderBottomRightRadius: '10px', // Optional: rounded corners at the bottom
                  }}
              />
            <Box sx={{ padding: '10px', position: 'absolute', bottom: '10px', left: '20px' }}>
              <Typography variant="h2" color="white">
                {game?.name}
              </Typography>
              <Typography variant="body2" color="white">
                {game.short_description}
              </Typography>
              </Box>
            </Paper>))}
            </Carousel>
          )}
        </Box>
        </Box>
        
    </Box>
  )
}

export default Header