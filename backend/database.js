const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'albums.db');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

console.log('📀 Connected to SQLite database');

const createTableSQL = `
  CREATE TABLE IF NOT EXISTS albums (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    albumName TEXT NOT NULL,
    artist TEXT NOT NULL,
    releaseYear INTEGER NOT NULL,
    genre TEXT NOT NULL,
    rating REAL NOT NULL CHECK(rating >= 1 AND rating <= 5),
    coverUrl TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  )
`;

db.exec(createTableSQL);
console.log('✅ Albums table ready');

const countResult = db.prepare('SELECT COUNT(*) as count FROM albums').get();

if (countResult.count === 0) {
  console.log('🌱 Seeding initial album data...');
  
  const sampleAlbums = [
    { albumName: 'Abbey Road', artist: 'The Beatles', releaseYear: 1969, genre: 'Rock', rating: 5, coverUrl: 'https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25' },
    { albumName: 'Thriller', artist: 'Michael Jackson', releaseYear: 1982, genre: 'Pop', rating: 5, coverUrl: 'https://i.scdn.co/image/ab67616d0000b2734121faee8df82c526cbab2be' },
    { albumName: 'The Dark Side of the Moon', artist: 'Pink Floyd', releaseYear: 1973, genre: 'Rock', rating: 4.5, coverUrl: 'https://i.scdn.co/image/ab67616d0000b273ea7caaff71dea1051d49b2fe' },
    { albumName: 'Back in Black', artist: 'AC/DC', releaseYear: 1980, genre: 'Rock', rating: 4, coverUrl: 'https://i.scdn.co/image/ab67616d0000b2730b51f8d91f3a21e8426361ae' },
    { albumName: 'Random Access Memories', artist: 'Daft Punk', releaseYear: 2013, genre: 'Electronic', rating: 4.5, coverUrl: 'https://i.scdn.co/image/ab67616d0000b2739b9b36b0e22870b9f542d937' },
    { albumName: 'good kid, m.A.A.d city', artist: 'Kendrick Lamar', releaseYear: 2012, genre: 'Hip-Hop', rating: 5, coverUrl: 'https://i.scdn.co/image/ab67616d0000b273d28d2ebdedb220e479743797' }
  ];
  
  const insertStmt = db.prepare(`
    INSERT INTO albums (albumName, artist, releaseYear, genre, rating, coverUrl)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  
  const insertMany = db.transaction((albums) => {
    for (const album of albums) {
      insertStmt.run(album.albumName, album.artist, album.releaseYear, album.genre, album.rating, album.coverUrl);
    }
  });
  
  insertMany(sampleAlbums);
  console.log(`✅ Inserted ${sampleAlbums.length} sample albums`);
}

module.exports = db;
