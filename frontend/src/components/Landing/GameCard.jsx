import React from 'react'
import PropTypes from "prop-types";
import { Box, Button, Card, CardContent, Rating, Typography } from '@mui/material';

const GameCard = ({ game }) => {
    return (
      <Card sx={{ backgroundColor: '#1e1e1e', color: 'white', borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {game.title}
          </Typography>
          <Typography variant="body2" color="gray">
            {game.description}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
          <Typography variant="bod1" color="white">
            {"Rating:"}
          </Typography>
            <Rating name="half-rating-read" defaultValue={game?.rating || null} precision={0.5} readOnly size='large'/>
            <Typography variant="body1" color="white" sx={{ ml: 2 }}>
            Audience Verdict: 
            <Typography variant="body" color="white" sx={{ ml: 2,fontSize: "25px" }}>{game?.audienceVerdict || "No verdict"}</Typography>
            </Typography>
            </Box>
        </CardContent>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <Button size="small" variant="contained" color="primary" sx={{ mr: 2 }}>
            Add to Wishlist
          </Button>
          <Button size="small" variant="contained" color="success">
            Add to Cart
          </Button>
        </Box>
      </Card>
    );
  };

  GameCard.propTypes = {
    game: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      audienceVerdict: PropTypes.string
    }).isRequired,
  };

export default GameCard