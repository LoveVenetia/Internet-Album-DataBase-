import React from 'react';
import { Box, Typography } from '@mui/material';
import AlbumFormMUI from '../components/mui/AlbumFormMUI';

export default function AddAlbumPage({ onAddAlbum }) {
    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Add New Album
            </Typography>
            <AlbumFormMUI onAddAlbum={onAddAlbum} />
        </Box>
    );
}