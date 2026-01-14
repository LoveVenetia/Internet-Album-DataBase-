import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { Box, Container, CircularProgress } from '@mui/material';
import NavigationMUI from './components/mui/NavigationMUI';
import HomePage from './pages/HomePage';
import AddAlbumPage from './pages/AddAlbumPage';
import SearchPage from './pages/SearchPage';
import StatisticsPage from './pages/StatisticsPage';
import { albumApi } from './services/api';

function App() {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch albums from backend on component mount
  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      setLoading(true);
      const data = await albumApi.getAll();
      setAlbums(data);
    } catch (error) {
      console.error('Failed to fetch albums:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAlbum = async (newAlbum) => {
    try {
      const created = await albumApi.create(newAlbum);
      setAlbums([created, ...albums]);
      navigate('/');
    } catch (error) {
      console.error('Failed to add album:', error);
    }
  };

  const handleDeleteAlbum = async (id) => {
    try {
      await albumApi.delete(id);
      setAlbums(albums.filter(album => album.id !== id));
    } catch (error) {
      console.error('Failed to delete album:', error);
    }
  };

  const handleUpdateAlbum = async (id, updatedAlbum) => {
    try {
      const updated = await albumApi.update(id, updatedAlbum);
      setAlbums(albums.map(album => album.id === id ? updated : album));
    } catch (error) {
      console.error('Failed to update album:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress color="primary" size={60} />
      </Box>
    );
  }

  return (
    <Box>
      <NavigationMUI />
      <Box
        component="main"
        sx={{
          pt: 10,
          pb: 4,
          px: 3,
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<HomePage albums={albums} onDeleteAlbum={handleDeleteAlbum} />} />
            <Route path="/add" element={<AddAlbumPage onAddAlbum={handleAddAlbum} />} />
            <Route path="/search" element={<SearchPage albums={albums} onDeleteAlbum={handleDeleteAlbum} />} />
            <Route path="/stats" element={<StatisticsPage albums={albums} />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
