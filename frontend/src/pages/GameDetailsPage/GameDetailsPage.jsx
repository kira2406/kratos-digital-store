import { Box, Button, Card, Chip, Collapse, Divider, Grid2, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useGameMedia } from '../../hooks/useGameMedia'
import { gamesLibraryRequest } from '../../reducers/games/gameSlice'

const GameDetailsPage = () => {
    const dispatch = useDispatch()
    const {game_id} = useParams()
    const game = useSelector(state => state.gamesData.games[game_id])

    const [expanded, setExpanded] = useState(false);
    const toggleReadMore = () => setExpanded(!expanded);

    const { allMedia, selectedMedia, setSelectedMedia, isVideo } = useGameMedia(game);

    useEffect(() => {
        if (!game) {
            dispatch(gamesLibraryRequest({ page: '', genreList: [], categoriesList: [], game_id: game_id }));
        }
    }, [dispatch, game_id, game]);


    if (!game){
        return (
            <Box sx={{color: 'white', mt: 20, textAlign:"center"}}>
                <Typography variant="h6">Game not found</Typography>
            </Box>
        ) 
        
    }
    
  return (
    <Box sx={{p:4, color: 'white', my: 5}}>
        <Grid2 container sx={{my: 5}} spacing={2} alignItems="center" justifyContent="space-between">
            <Grid2 item>
                <Typography variant="h3" fontWeight="bold">{game.name}</Typography>
                <Typography variant="body1" color="text.secondary">
                    Released on {new Date(game.release_date).toDateString()}
                </Typography>
            </Grid2>
        </Grid2>

        <Card sx={{p: 5, borderRadius: 5}}>
      <Grid2 container spacing={4} >
        <Grid2 item size={4}>
            <Box
            component="img"
            src={game.header_image}
            alt="Header"
            sx={{
                borderRadius: 2,
                mb: 2,
                width: '100%',
                maxWidth: '100%',
                height: 'auto'
                 }}
            />

            <Typography
            variant="body1"
            sx={{
                mb: 2,
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                whiteSpace: 'pre-line',
                textAlign: 'justify'
            }}
            >
            {game.short_description}
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
            {game.genres.map((tag, idx) => (
              <Chip label={tag} key={idx} size="small" variant="outlined"/>
            ))}
            </Stack>

            <Stack direction="row" spacing={3} sx={{ mb: 2 }}>
                <Typography variant="h6">
                Price: {game.price === 0 ? 'Free' : `$${game.price}`}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                Age: {game.required_age}+
                </Typography>
            </Stack>

        </Grid2>
        <Grid2 item size={8}>
                <Box 
                sx={{ mb: 3}}>
                {isVideo(selectedMedia) ? (
                <video
                style={{ width: '100%', maxWidth: '100%', height: 'auto' }}
                key={selectedMedia}
                src={selectedMedia}
                controls
                autoPlay
                muted
                />
                ) : (
                <Box
                    component="img"
                    src={selectedMedia}
                    alt="Selected Media"
                    sx={{borderRadius: 2, width: '100%', maxWidth: '100%', height: 'auto' }}
                />
                )}
            </Box>
            <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2, pb:2 }}>
            {allMedia.map((media, idx) =>
              isVideo(media) ? (
                <video
                  key={idx}
                  src={media}
                  onClick={() => setSelectedMedia(media)}
                  style={{
                    height: 80,
                    cursor: 'pointer',
                    borderRadius: 8,
                    border:
                      selectedMedia === media
                        ? '5px solid #1976d2'
                        : '5px solid transparent',
                  }}
                  muted
                />
              ) : (
                <Box
                  key={idx}
                  component="img"
                  src={media}
                  onClick={() => setSelectedMedia(media)}
                  sx={{
                    height: 80,
                    borderRadius: 2,
                    cursor: 'pointer',
                    border:
                      selectedMedia === media
                        ? '2px solid #1976d2'
                        : '2px solid transparent',
                  }}
                />
              )
            )}
          </Box>
        </Grid2>
      </Grid2>
        </Card>
        
    <Grid2 sx={{my:5}}>
    <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>About the Game</Typography>
        <Collapse in={expanded} collapsedSize={60}>
        <Typography variant="body2" sx={{ whiteSpace: 'pre-line', textAlign: 'justify', mb: 2 }} color='ashgray'>
          {game.detailed_description}
        </Typography>
        </Collapse>
        <Button onClick={toggleReadMore} size="small" sx={{ mt: 1 }} color='secondary'>
          {expanded ? 'Read Less' : 'Read More'}
        </Button>
      </Box>


      <Stack direction="row" spacing={2} sx={{ mb: 4 }} divider={<Divider orientation="vertical" flexItem />}>
        <Chip label={`DLCs: ${game.dlc_count}`} color="primary" />
        <Chip label={`Achievements: ${game.achievements}`} color="secondary" />
        <Chip label={`Recommendations: ${game.recommendations.toLocaleString()}`} color="warning" />
      </Stack>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>Platform Support</Typography>
        <Stack direction="row" spacing={2} alignItems="center">
            {game.windows && (
            <>
                <Typography variant="body2">Windows</Typography>
                <Divider orientation="vertical" flexItem />
            </>
            )}
            {game.mac && (
            <>
                <Typography variant="body2">macOS</Typography>
                <Divider orientation="vertical" flexItem />
            </>
            )}
            {game.linux && (
            <Typography variant="body2">Linux</Typography>
            )}
        </Stack>
        </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>Supported Languages</Typography>
        <Typography variant="body2" color="text.secondary">
          {game.supported_languages.join(', ')}
        </Typography>
      </Box>

      <Stack direction="row" spacing={3}>
        <Link href={game.website} target="_blank" underline="hover" color="info.main">
          Official Website
        </Link>
        <Link href={game.support_url} target="_blank" underline="hover" color="info.main">
          Support Page
        </Link>
      </Stack>
      </Grid2>

    </Box>
  )
}

export default GameDetailsPage