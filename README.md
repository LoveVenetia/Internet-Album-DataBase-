# Internet Album DataBase (IADb)

A full-stack web application for rating and managing music albums, built with React, Material-UI, and Node.js.

## Features

- 📀 **Album Management**: Add, view, and delete album entries
- ⭐ **Rating System**: Rate albums on a customizable scale
- 🔍 **Search Functionality**: Quickly find albums by artist or title
- 📊 **Statistics Dashboard**: Visualize your rating data with interactive charts
- 🎨 **Modern UI**: Clean, responsive design using Material-UI components
- 💾 **Persistent Storage**: SQLite database for reliable data storage

## Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Material-UI (MUI)** - Component library for polished UI
- **React Router** - Client-side routing
- **Recharts** - Data visualization
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Better-SQLite3** - Fast, synchronous SQLite3 database
- **CORS** - Cross-origin resource sharing

## Project Structure

```
album-rating-app/
├── src/
│   ├── components/
│   │   └── mui/          # Material-UI components
│   ├── pages/            # Page components
│   ├── services/         # API service layer
│   └── theme/            # MUI theme configuration
├── backend/
│   ├── server.js         # Express server
│   ├── database.js       # Database configuration
│   └── package.json
└── index.html
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/internet-album-database.git
cd internet-album-database
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd backend
npm install
cd ..
```

### Running the Application

1. Start the backend server (from the backend directory)
```bash
cd backend
npm start
```
The server will run on `http://localhost:3001`

2. In a new terminal, start the frontend development server (from the root directory)
```bash
npm run dev
```
The app will open at `http://localhost:5173`

## Usage

- **Home Page**: Browse all your rated albums in a card layout
- **Add Album**: Fill out the form to add new albums with ratings
- **Search**: Find specific albums by artist or title
- **Statistics**: View charts and analytics of your ratings

## API Endpoints

- `GET /api/albums` - Retrieve all albums
- `POST /api/albums` - Create a new album
- `DELETE /api/albums/:id` - Delete an album by ID

## Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

## License

ISC

## Acknowledgments

Built as part of a web development course project.
