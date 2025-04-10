import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import PublishedGames from '../../components/profile/PublishedGames'
import Game from '../Game/Game'


const Profile = () => {
  return (
    <div>
        <Box>
            <Typography>
                Publish
            </Typography>
        </Box>
        <PublishedGames/>
        <Game />

    </div>
  )
}

export default Profile