import React from 'react';
import { Box, Typography, Fade } from '@mui/material';
import AlbumCardMUI from './AlbumCardMUI';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

export default function AlbumListMUI({ albums, onDelete }) {
  if (albums.length === 0) {
    return (
      <Box 
        sx={{ 
          textAlign: 'center', 
          py: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}
      >
        <MusicNoteIcon sx={{ fontSize: 80, color: 'text.secondary', opacity: 0.5 }} />
        <Typography variant="h6" color="text.secondary">
          No albums found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try adjusting your search filters or add a new album
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {albums.map((album, index) => (
        <Fade in={true} timeout={300 + index * 100} key={album.id}>
          <Box>
            <AlbumCardMUI album={album} onDelete={onDelete} />
          </Box>
        </Fade>
      ))}
    </Box>
  );
}