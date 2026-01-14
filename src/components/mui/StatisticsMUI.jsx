import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarIcon from '@mui/icons-material/Star';
import AlbumIcon from '@mui/icons-material/Album';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const COLORS = ['#F5C518', '#FF9800', '#4CAF50', '#2196F3', '#9C27B0', '#E91E63'];

export default function StatisticsMUI({ albums }) {
  // Calculate statistics
  const totalAlbums = albums.length;
  const averageRating = totalAlbums > 0 
    ? (albums.reduce((sum, album) => sum + album.rating, 0) / totalAlbums).toFixed(1)
    : 0;

  // Genre distribution
  const genreCount = albums.reduce((acc, album) => {
    acc[album.genre] = (acc[album.genre] || 0) + 1;
    return acc;
  }, {});
  const genreData = Object.entries(genreCount).map(([name, value]) => ({
    name,
    value,
  }));

  // Rating distribution
  const ratingCount = albums.reduce((acc, album) => {
    const rating = Math.floor(album.rating);
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {});
  const ratingData = [1, 2, 3, 4, 5].map(rating => ({
    rating: `${rating} ★`,
    count: ratingCount[rating] || 0,
  }));

  // Top 5 albums
  const topAlbums = [...albums]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  // Most common genre
  const mostCommonGenre = genreData.reduce((max, genre) => 
    genre.value > (max.value || 0) ? genre : max, {});

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <TrendingUpIcon sx={{ fontSize: 32, color: 'primary.main' }} />
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Album Statistics
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, rgba(245, 197, 24, 0.2) 0%, rgba(245, 197, 24, 0.05) 100%)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AlbumIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {totalAlbums}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Albums
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, rgba(245, 197, 24, 0.2) 0%, rgba(245, 197, 24, 0.05) 100%)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <StarIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {averageRating}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Average Rating
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, rgba(245, 197, 24, 0.2) 0%, rgba(245, 197, 24, 0.05) 100%)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <MusicNoteIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {mostCommonGenre.name || 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Most Common Genre
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, rgba(245, 197, 24, 0.2) 0%, rgba(245, 197, 24, 0.05) 100%)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <StarIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {genreData.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Different Genres
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* Rating Distribution */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Rating Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ratingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="rating" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="count" fill="#F5C518" name="Number of Albums" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Genre Distribution */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Genre Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genreData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Top Albums */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
              Top Rated Albums
            </Typography>
            <Grid container spacing={2}>
              {topAlbums.map((album, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={album.id}>
                  <Card sx={{ 
                    background: index === 0 
                      ? 'linear-gradient(135deg, rgba(245, 197, 24, 0.3) 0%, rgba(245, 197, 24, 0.1) 100%)'
                      : 'background.paper'
                  }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                          #{index + 1}
                        </Typography>
                        {index === 0 && <Chip label="Best" color="primary" size="small" />}
                      </Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        {album.albumName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {album.artist}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                        <StarIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                          {album.rating}/5
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}