import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Card, CardContent, Rating, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import './GameCard.css'

const GameCard = ({ game }) => {
  const theme = useTheme()

  return (
    <Card
      className="game-card"
      style={{
        '--game-card-bg': '#1e1e1e',
        '--game-card-text': theme.palette.common.white,
        '--game-card-muted': 'gray',
      }}
    >
      <CardContent className="game-card-content">
        <Typography gutterBottom variant="h5" component="div" className="game-card-title">
          {game.title}
        </Typography>

        <Typography variant="body2" className="game-card-description">
          {game.description}
        </Typography>

        <Box className="game-card-meta">
          <Box className="game-card-rating-row">
            <Typography variant="body1" className="game-card-label">
              Rating:
            </Typography>
            <Rating
              name="half-rating-read"
              value={game?.rating || 0}
              precision={0.5}
              readOnly
              size="large"
            />
          </Box>

          <Box className="game-card-verdict-row">
            <Typography variant="body1" className="game-card-label">
              Audience Verdict:
            </Typography>
            <Typography variant="body1" className="game-card-verdict">
              {game?.audienceVerdict || 'No verdict'}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <Box className="game-card-actions">
        <Button size="small" variant="contained" color="primary">
          Add to Wishlist
        </Button>
        <Button size="small" variant="contained" color="success">
          Add to Cart
        </Button>
      </Box>
    </Card>
  )
}

GameCard.propTypes = {
  game: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    audienceVerdict: PropTypes.string,
  }).isRequired,
}

export default GameCard