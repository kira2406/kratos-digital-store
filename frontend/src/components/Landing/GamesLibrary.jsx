import { Box, Pagination, Typography } from '@mui/material'
import React, { useState } from 'react'
import useGamesLibrary from '../../hooks/useGamesLibrary';
import GameLibraryCard from './GameLibraryCard';

const GamesLibrary = () => {
  const [page, setPage] = useState(1);
  const { games, loading, totalPages } = useGamesLibrary(page);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ color: 'white', margin: 2 }}>
        POPULAR GAMES AND NEW RELEASES
      </Typography>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, val) => setPage(val)}
        sx={{ my: 2, display: 'flex', justifyContent: 'center' }}
      />
      {loading && Array.from({ length: 6 }).map((_, index) => (
      <GameLibraryCard key={index} loading={true} />
      ))}
      <Box>
      {games.map(game => (
        <GameLibraryCard game={game} loading={loading} key={game._id} sx={{ mb: 2 }}/>
      ))}
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, val) => setPage(val)}
        sx={{ my: 2, display: 'flex', justifyContent: 'center' }}
      />
      </Box>
    </Box>
  )
}

export default GamesLibrary