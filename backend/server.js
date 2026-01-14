const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// GET all albums (with optional filters)
app.get('/api/albums', (req, res) => {
  try {
    const { search, genre, minRating } = req.query;
    
    let sql = 'SELECT * FROM albums WHERE 1=1';
    const params = [];
    
    if (search) {
      sql += ' AND (albumName LIKE ? OR artist LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    
    if (genre) {
      sql += ' AND genre = ?';
      params.push(genre);
    }
    
    if (minRating) {
      sql += ' AND rating >= ?';
      params.push(Number(minRating));
    }
    
    sql += ' ORDER BY id DESC';
    
    const albums = db.prepare(sql).all(...params);
    res.json(albums);
  } catch (error) {
    console.error('Error fetching albums:', error);
    res.status(500).json({ error: 'Failed to fetch albums' });
  }
});

// GET single album by ID
app.get('/api/albums/:id', (req, res) => {
  try {
    const { id } = req.params;
    const album = db.prepare('SELECT * FROM albums WHERE id = ?').get(id);
    
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }
    
    res.json(album);
  } catch (error) {
    console.error('Error fetching album:', error);
    res.status(500).json({ error: 'Failed to fetch album' });
  }
});

// POST new album
app.post('/api/albums', (req, res) => {
  try {
    const { albumName, artist, releaseYear, genre, rating, coverUrl } = req.body;
    
    if (!albumName || !artist || !releaseYear || !genre || rating === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const stmt = db.prepare(`
      INSERT INTO albums (albumName, artist, releaseYear, genre, rating, coverUrl)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(albumName, artist, releaseYear, genre, rating, coverUrl || null);
    
    const newAlbum = {
      id: result.lastInsertRowid,
      albumName,
      artist,
      releaseYear,
      genre,
      rating,
      coverUrl
    };
    
    res.status(201).json(newAlbum);
  } catch (error) {
    console.error('Error creating album:', error);
    res.status(500).json({ error: 'Failed to create album' });
  }
});

// PUT update album
app.put('/api/albums/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { albumName, artist, releaseYear, genre, rating } = req.body;
    
    if (!albumName || !artist || !releaseYear || !genre || rating === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const existing = db.prepare('SELECT * FROM albums WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Album not found' });
    }
    
    const stmt = db.prepare(`
      UPDATE albums
      SET albumName = ?, artist = ?, releaseYear = ?, genre = ?, rating = ?
      WHERE id = ?
    `);
    
    stmt.run(albumName, artist, releaseYear, genre, rating, id);
    
    const updatedAlbum = { id: Number(id), albumName, artist, releaseYear, genre, rating };
    res.json(updatedAlbum);
  } catch (error) {
    console.error('Error updating album:', error);
    res.status(500).json({ error: 'Failed to update album' });
  }
});

// DELETE album
app.delete('/api/albums/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    const existing = db.prepare('SELECT * FROM albums WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Album not found' });
    }
    
    db.prepare('DELETE FROM albums WHERE id = ?').run(id);
    res.json({ message: 'Album deleted successfully' });
  } catch (error) {
    console.error('Error deleting album:', error);
    res.status(500).json({ error: 'Failed to delete album' });
  }
});

// GET all genres
app.get('/api/genres', (req, res) => {
  try {
    const genres = db.prepare('SELECT DISTINCT genre FROM albums ORDER BY genre').all();
    res.json(genres.map(g => g.genre));
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
});

app.listen(PORT, () => {
  console.log(`🎵 Album API running at http://localhost:${PORT}`);
});
