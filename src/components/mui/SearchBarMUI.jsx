import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Paper,
  Typography,
  Grid,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function SearchBarMUI({ 
  searchTerm, 
  setSearchTerm, 
  filterGenre, 
  setFilterGenre, 
  filterRating, 
  setFilterRating, 
  genres 
}) {
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <FilterListIcon sx={{ fontSize: 28, color: 'primary.main' }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Search & Filter Albums
        </Typography>
      </Box>
      
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Search by name or artist"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to search..."
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            select
            label="Genre"
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
            variant="outlined"
          >
            <MenuItem value="">All Genres</MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            select
            label="Minimum Rating"
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            variant="outlined"
          >
            <MenuItem value="">All Ratings</MenuItem>
            <MenuItem value="5">5 stars</MenuItem>
            <MenuItem value="4">4+ stars</MenuItem>
            <MenuItem value="3">3+ stars</MenuItem>
            <MenuItem value="2">2+ stars</MenuItem>
            <MenuItem value="1">1+ stars</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Paper>
  );
}
