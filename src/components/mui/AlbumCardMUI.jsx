import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AlbumCardMUI({ album, onDelete }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(album.id);
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          display: 'flex',
          mb: 2,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(245, 197, 24, 0.2)',
          },
        }}
      >
      {album.coverUrl ? (
        <CardMedia
          component="img"
          sx={{ width: 160, height: 160, objectFit: 'cover' }}
          image={album.coverUrl}
          alt={album.albumName}
        />
      ) : (
        <Box
          sx={{
            width: 160,
            height: 160,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.default',
          }}
        >
          <MusicNoteIcon sx={{ fontSize: 64, color: 'text.secondary' }} />
        </Box>
      )}

      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 600 }}>
          {album.albumName}
        </Typography>

        <Typography variant="h6" color="text.secondary" gutterBottom>
          {album.artist}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Chip
            label={album.releaseYear || album.year}
            size="small"
            sx={{ backgroundColor: 'rgba(245, 197, 24, 0.1)', color: 'primary.main' }}
          />
          <Chip
            label={album.genre}
            size="small"
            variant="outlined"
            sx={{ borderColor: 'primary.main', color: 'primary.main' }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Rating value={album.rating} readOnly precision={0.5} />
          <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>
            {album.rating}/5
          </Typography>
        </Box>

        {onDelete && (
          <Box sx={{ mt: 'auto', pt: 1 }}>
            <IconButton
              onClick={handleDeleteClick}
              sx={{ 
                color: 'error.main',
                '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.1)' }
              }}
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </CardContent>
    </Card>

    <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
      <DialogTitle>Delete Album</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete "{album.albumName}" by {album.artist}? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteCancel}>Cancel</Button>
        <Button onClick={handleDeleteConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
}