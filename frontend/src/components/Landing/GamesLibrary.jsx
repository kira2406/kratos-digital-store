import { Box, Pagination, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import useGamesLibrary from '../../hooks/useGamesLibrary'
import GameLibraryCard from './GameLibraryCard'
import './GamesLibrary.css'

const GamesLibrary = () => {
  const [page, setPage] = useState(1)
  const { games, loading, totalPages } = useGamesLibrary(page)
  const theme = useTheme()

  return (
    <Box
      className="games-library"
      style={{
        '--games-library-text': theme.palette.common.white,
        '--games-library-pagination': theme.palette.common.white,
      }}
    >
      <Typography variant="h4" className="games-library-title">
        Popular Games and New Releases
      </Typography>

      <Box className="games-library-pagination-wrapper top">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, val) => setPage(val)}
          className="games-library-pagination"
        />
      </Box>

      <Box className="games-library-list">
        {loading &&
          Array.from({ length: 6 }).map((_, index) => (
            <Box key={index} className="games-library-card-wrapper">
              <GameLibraryCard loading={true} />
            </Box>
          ))}

        {!loading &&
          games.map((game) => (
            <Box key={game._id} className="games-library-card-wrapper">
              <GameLibraryCard game={game} loading={false} />
            </Box>
          ))}
      </Box>

      <Box className="games-library-pagination-wrapper bottom">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, val) => setPage(val)}
          className="games-library-pagination"
        />
      </Box>
    </Box>
  )
}

export default GamesLibrary