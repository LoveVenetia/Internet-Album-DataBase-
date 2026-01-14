import React from 'react';
import { Box, Typography } from '@mui/material';
import AlbumListMUI from '../components/mui/AlbumListMUI';

export default function HomePage({ albums, onDeleteAlbum }) {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        All Albums
      </Typography>
      <AlbumListMUI albums={albums} onDelete={onDeleteAlbum} />
    </Box>
  );
}