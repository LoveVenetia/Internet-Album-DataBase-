const API_URL = 'http://localhost:3001/api';

export const albumApi = {
  // GET all albums
  getAll: async () => {
    const response = await fetch(`${API_URL}/albums`);
    if (!response.ok) throw new Error('Failed to fetch albums');
    return response.json();
  },

  // GET single album
  getById: async (id) => {
    const response = await fetch(`${API_URL}/albums/${id}`);
    if (!response.ok) throw new Error('Album not found');
    return response.json();
  },

  // POST new album
  create: async (album) => {
    const response = await fetch(`${API_URL}/albums`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(album),
    });
    if (!response.ok) throw new Error('Failed to create album');
    return response.json();
  },

  // PUT update album
  update: async (id, album) => {
    const response = await fetch(`${API_URL}/albums/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(album),
    });
    if (!response.ok) throw new Error('Failed to update album');
    return response.json();
  },

  // DELETE album
  delete: async (id) => {
    const response = await fetch(`${API_URL}/albums/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete album');
    return response.json();
  },

  // GET all genres
  getGenres: async () => {
    const response = await fetch(`${API_URL}/genres`);
    if (!response.ok) throw new Error('Failed to fetch genres');
    return response.json();
  },
};
