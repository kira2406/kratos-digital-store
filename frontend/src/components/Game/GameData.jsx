import { Box, Typography } from '@mui/material'
import React from 'react'

const GameData = ({gamename}) => {
  return (
    <div>
        <Box>
            <Typography variant='h2'>
                {gamename}
            </Typography>
        </Box>
    </div>
  )
}

export default GameData