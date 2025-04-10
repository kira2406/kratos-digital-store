import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react'

const PublishedGames = () => {
  const games = [
    {
      id: 1,
      name: 'Game 1',
      description: 'A thrilling action game.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Game 2',
      description: 'A strategy-based adventure.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Game 3',
      description: 'A fast-paced racing game.',
      image: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <div>
      <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
        <Typography variant="h4" gutterBottom>
          Published Games
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {games.map((game) => (
          <Grid item xs={12} sm={6} md={4} key={game.id}>
            <Card>
              <CardMedia
                component="img"
                alt={game.name}
                height="140"
                image={game.image}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {game.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {game.description}
                </Typography>
                <Button variant="contained" color="primary" fullWidth>
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default PublishedGames