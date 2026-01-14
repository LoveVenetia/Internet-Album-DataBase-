import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import BarChartIcon from '@mui/icons-material/BarChart';
import AlbumIcon from '@mui/icons-material/Album';

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/', description: 'Browse all albums' },
  { text: 'Add Album', icon: <AddCircleIcon />, path: '/add', description: 'Submit a new review' },
  { text: 'Search', icon: <SearchIcon />, path: '/search', description: 'Find albums by filters' },
  { text: 'Statistics', icon: <BarChartIcon />, path: '/stats', description: 'View charts & insights' },
];

export default function NavigationMUI() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const currentMenuItem = menuItems.find(item => item.path === location.pathname);
  const currentTitle = currentMenuItem ? currentMenuItem.text : 'IADb';

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'background.paper',
          borderBottom: '1px solid',
          borderBottomColor: 'divider',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleMenuToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Box 
            component={Link}
            to="/"
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1, 
              flexGrow: 1,
              textDecoration: 'none',
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8,
              },
            }}
          >
            <AlbumIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
              IADb
            </Typography>
          </Box>

          <Button
            startIcon={<SearchIcon />}
            onClick={() => navigate('/search')}
            sx={{
              color: 'primary.main',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'rgba(245, 197, 24, 0.1)',
              },
            }}
          >
            Search
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="top"
        open={menuOpen}
        onClose={handleMenuToggle}
        sx={{
          '& .MuiDrawer-paper': {
            height: '100vh',
            backgroundColor: 'background.default',
          },
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AlbumIcon sx={{ fontSize: 32, color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                IADb
              </Typography>
            </Box>
            <IconButton
              color="inherit"
              onClick={handleMenuToggle}
              sx={{ 
                backgroundColor: 'rgba(245, 197, 24, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(245, 197, 24, 0.2)',
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>

          <Divider />

          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <List sx={{ width: '100%', maxWidth: 600, px: 2 }}>
              {menuItems.map((item) => (
                <ListItem key={item.path} disablePadding sx={{ mb: 2 }}>
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    onClick={handleMenuClose}
                    selected={location.pathname === item.path}
                    sx={{
                      py: 3,
                      px: 3,
                      borderRadius: 2,
                      textDecoration: 'none',
                      color: 'inherit',
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(245, 197, 24, 0.15)',
                        '&:hover': {
                          backgroundColor: 'rgba(245, 197, 24, 0.25)',
                        },
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(245, 197, 24, 0.1)',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ 
                      minWidth: 56,
                      color: location.pathname === item.path ? 'primary.main' : 'inherit',
                    }}>
                      <Box sx={{ fontSize: 40 }}>
                        {item.icon}
                      </Box>
                    </ListItemIcon>
                    <Box>
                      <ListItemText 
                        primary={item.text}
                        secondary={item.description}
                        primaryTypographyProps={{
                          fontSize: '1.5rem',
                          fontWeight: location.pathname === item.path ? 700 : 500,
                          color: location.pathname === item.path ? 'primary.main' : 'inherit',
                        }}
                        secondaryTypographyProps={{
                          fontSize: '0.9rem',
                          color: 'text.secondary',
                        }}
                      />
                    </Box>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Internet Album Database © 2025
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
