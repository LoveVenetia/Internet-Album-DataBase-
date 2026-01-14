import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import SearchBarMUI from '../components/mui/SearchBarMUI';
import AlbumListMUI from '../components/mui/AlbumListMUI';

export default function SearchPage({ albums, onDeleteAlbum }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [filterRating, setFilterRating] = useState('');

  const genres = [...new Set(albums.map(album => album.genre))].sort();

  const filteredAlbums = albums.filter(album => {
    const matchesSearch = searchTerm === '' || 
      album.albumName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.artist.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGenre = filterGenre === '' || album.genre === filterGenre;
    const matchesRating = !filterRating || album.rating >= parseInt(filterRating);
    
    return matchesSearch && matchesGenre && matchesRating;
  });

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Search Albums
      </Typography>
      <SearchBarMUI
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterGenre={filterGenre}
        setFilterGenre={setFilterGenre}
        filterRating={filterRating}
        setFilterRating={setFilterRating}
        genres={genres}
      />
      <AlbumListMUI albums={filteredAlbums} onDelete={onDeleteAlbum} />
    </Box>
  );
}