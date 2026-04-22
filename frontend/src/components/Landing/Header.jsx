import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import useFeaturedGames from '../../hooks/useFeaturedGames'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const { featuredGames, featuredGameLoading, featuredGameError } = useFeaturedGames()

  return (
    <Box sx={{ mt: { xs: 6, sm: 8, md: 10 }, px: { xs: 1.5, sm: 2, md: 0 } }}>
      <Box>
        <Typography
          color="white"
          variant="h2"
          sx={{
            pb: 1.5,
            fontFamily: 'UnifrakturMaguntia',
            mt: { xs: 10, sm: 3, md: 4 },
            fontSize: { xs: '2rem', sm: '2.8rem', md: '3.75rem' },
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          Featured
        </Typography>

        <Box>
          {featuredGameLoading && <Typography color="white">Loading...</Typography>}
          {featuredGameError && <Typography color="red">{featuredGameError}</Typography>}

          {!featuredGameLoading && featuredGames.length > 0 && (
            <Carousel
              navButtonsAlwaysVisible={false}
              indicators={true}
              animation="slide"
            >
              {featuredGames.map((game, index) => (
                <Paper
                  component={Link}
                  to={`/games/${game?._id}`}
                  key={index}
                  className="carousel-card"
                  style={{
                    backgroundImage: `url(${game?.screenshots[0]})`
                  }}
                >
                  <div className="overlay" />

                  <div className="content">
                    <Typography className="game-title" variant="h3">
                      {game?.name}
                    </Typography>

                    <Typography className="game-desc">
                      {game.short_description}
                    </Typography>
                  </div>
                </Paper>
              ))}
            </Carousel>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Header