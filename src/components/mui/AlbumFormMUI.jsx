import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  Grid,
  Rating,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const genres = [
  'Rock',
  'Pop',
  'Hip Hop',
  'Electronic',
  'Jazz',
  'Classical',
  'Metal',
  'R&B',
  'Country',
  'Indie',
];

export default function AlbumFormMUI({ onAddAlbum }) {
  const [formData, setFormData] = useState({
    albumName: '',
    artist: '',
    releaseYear: new Date().getFullYear(),
    genre: '',
    rating: 5,
    coverUrl: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newAlbum = {
      ...formData,
      rating: Number(formData.rating),
      releaseYear: Number(formData.releaseYear)
    };
    
    onAddAlbum(newAlbum);
    
    setFormData({
      albumName: '',
      artist: '',
      releaseYear: new Date().getFullYear(),
      genre: '',
      rating: 5,
      coverUrl: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRatingChange = (event, newValue) => {
    setFormData({
      ...formData,
      rating: newValue
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <AddCircleOutlineIcon sx={{ fontSize: 32, color: 'primary.main' }} />
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Add New Album Review
        </Typography>
      </Box>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Album Name"
              name="albumName"
              value={formData.albumName}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Artist"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid>
          
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Release Year"
              name="releaseYear"
              type="number"
              value={formData.releaseYear}
              onChange={handleChange}
              required
              inputProps={{ min: 1900, max: 2025 }}
              variant="outlined"
            />
          </Grid>
          
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth required>
              <InputLabel>Genre</InputLabel>
              <Select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                label="Genre"
              >
                {genres.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid size={{ xs: 12, md: 4 }}>
            <Box>
              <Typography gutterBottom>
                Rating: {formData.rating}/5
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Rating
                  name="rating"
                  value={formData.rating}
                  onChange={handleRatingChange}
                  size="large"
                  precision={0.5}
                />
              </Box>
            </Box>
          </Grid>
          
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Album Cover URL (optional)"
              name="coverUrl"
              type="url"
              value={formData.coverUrl}
              onChange={handleChange}
              placeholder="https://example.com/cover.jpg"
              variant="outlined"
            />
          </Grid>
          
          <Grid size={{ xs: 12 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              startIcon={<AddCircleOutlineIcon />}
              sx={{ 
                py: 1.5,
                fontSize: '1.1rem',
              }}
            >
              Add Album Review
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}