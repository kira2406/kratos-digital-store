import { Box, Button, Card, Chip, Collapse, Divider, Grid2, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { useGameMedia } from '../../hooks/useGameMedia'
import { gamesLibraryRequest } from '../../reducers/games/gameSlice'
import LanguageIcon from '@mui/icons-material/Language'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import './GameDetailsPage.css'

const GameDetailsPage = () => {
  const dispatch = useDispatch()
  const { game_id } = useParams()
  const theme = useTheme()
  const game = useSelector(state => state.gamesData.games[game_id])

  const [expanded, setExpanded] = useState(false)
  const toggleReadMore = () => setExpanded(!expanded)

  const { allMedia, selectedMedia, setSelectedMedia, isVideo } = useGameMedia(game)

  useEffect(() => {
    if (!game) {
      dispatch(gamesLibraryRequest({ page: '', genreList: [], categoriesList: [], game_id: game_id }))
    }
  }, [dispatch, game_id, game])

  if (!game) {
    return (
      <Box sx={{ color: 'white', mt: 20, textAlign: 'center' }}>
        <Typography variant="h6">Game not found</Typography>
      </Box>
    )
  }

  return (
    <Box
      className="game-details-page"
      style={{
        '--gd-text': theme.palette.common.white,
        '--gd-muted': theme.palette.text.secondary,
        '--gd-primary': theme.palette.primary.main,
      }}
    >
      <Grid2 container className="game-details-top-header" spacing={2} alignItems="center" justifyContent="space-between">
        <Grid2 size={{ xs: 12 }}>
          <Typography variant="h3" fontWeight="bold" className="game-details-title">
            {game.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Released on {new Date(game.release_date).toDateString()}
          </Typography>
        </Grid2>
      </Grid2>

      <Card className="game-details-main-card">
        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Box
              component="img"
              src={game.header_image}
              alt="Header"
              className="game-details-header-image"
            />

            <Typography
              variant="body1"
              className="game-details-short-description"
            >
              {game.short_description}
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
              {game.genres.map((tag, idx) => (
                <Chip label={tag} key={idx} size="small" variant="outlined" />
              ))}
            </Stack>

            <Stack
              direction="row"
              spacing={3}
              sx={{ mb: 2 }}
              alignItems="baseline"
              className="game-details-price-age"
            >
              <Typography variant="h6" sx={{ lineHeight: 1 }}>
                Price: {game.price === 0 ? 'Free' : `$${game.price}`}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1 }}>
                Age: {game.required_age}+
              </Typography>
            </Stack>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 8 }}>
            <Box sx={{ mb: 3 }}>
              {isVideo(selectedMedia) ? (
                <video
                  className="game-details-main-media"
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
                  className="game-details-main-media"
                />
              )}
            </Box>

            <Box className="game-details-thumbnails">
              {allMedia.map((media, idx) =>
                isVideo(media) ? (
                  <video
                    key={idx}
                    src={media}
                    onClick={() => setSelectedMedia(media)}
                    className={`game-details-thumb ${selectedMedia === media ? 'active' : ''}`}
                    muted
                  />
                ) : (
                  <Box
                    key={idx}
                    component="img"
                    src={media}
                    onClick={() => setSelectedMedia(media)}
                    className={`game-details-thumb ${selectedMedia === media ? 'active' : ''}`}
                  />
                )
              )}
            </Box>
          </Grid2>
        </Grid2>
      </Card>

      <Grid2 className="game-details-bottom">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            About the Game
          </Typography>
          <Collapse in={expanded} collapsedSize={60}>
            <Typography variant="body2" className="game-details-long-description">
              {game.detailed_description}
            </Typography>
          </Collapse>
          <Button onClick={toggleReadMore} size="small" sx={{ mt: 1 }} color="secondary">
            {expanded ? 'Read Less' : 'Read More'}
          </Button>
        </Box>

        <Stack
          direction="row"
          spacing={2}
          sx={{ mb: 4 }}
          divider={<Divider orientation="vertical" flexItem className="stats-divider" />}
          className="game-details-stats"
        >
          <Chip label={`DLCs: ${game.dlc_count}`} color="primary" />
          <Chip label={`Achievements: ${game.achievements}`} color="secondary" />
          <Chip label={`Recommendations: ${game.recommendations.toLocaleString()}`} color="warning" />
        </Stack>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Platform Support
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center" className="game-details-platforms">
            {game.windows && (
              <>
                <Typography variant="body2">Windows</Typography>
                <Divider orientation="vertical" flexItem />
              </>
            )}
            {game.mac && (
              <>
                <Typography variant="body2">macOS</Typography>
                <Divider orientation="vertical" flexItem className="platform-divider" />
              </>
            )}
            {game.linux && <Typography variant="body2">Linux</Typography>}
          </Stack>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Supported Languages
          </Typography>
          <Typography variant="body2" color="text.secondary" className="game-details-languages">
            {game.supported_languages.join(', ')}
          </Typography>
        </Box>

        <Stack
            direction="row"
            spacing={3}
            sx={{ flexWrap: { xs: 'wrap', sm: 'nowrap' } }}
          >
          <Chip
            label="Website"
            component="a"
            href={game.website}
            target="_blank"
            rel="noopener noreferrer"
            icon={<LanguageIcon />}
            variant="outlined"
            clickable
          />
          <Chip
            label="Support"
            component="a"
            href={game.support_url}
            target="_blank"
            rel="noopener noreferrer"
            icon={<SupportAgentIcon />}
            variant="outlined"
            color="secondary"
            clickable
          />
        </Stack>
      </Grid2>
    </Box>
  )
}

export default GameDetailsPage