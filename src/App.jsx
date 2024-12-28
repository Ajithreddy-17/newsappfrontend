import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import Router components
import axios from 'axios';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Switch,
  TextField,
  Box,
  CssBaseline,
  Button,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, teal } from '@mui/material/colors';
import Articles from './components/Articles'; // Updated import path
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Scroll event listener
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Create theme
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      ...(isDarkMode && {
        background: {
          default: grey[900],
          paper: grey[800],
        },
      }),
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: 'bold',
            textTransform: 'none',
            padding: '8px 16px',
            // Change the button color based on the theme
            backgroundColor: isDarkMode ? teal[600] : teal[500],
            color: 'white', // Ensure text is white
            '&:hover': {
              backgroundColor: isDarkMode ? teal[700] : teal[600], // Darker shade on hover
            },
            '&:active': {
              backgroundColor: isDarkMode ? teal[800] : teal[700], // Darker shade on active state
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            minHeight: '100vh',
            bgcolor: 'background.default',
            color: 'text.primary',
            paddingBottom: 4,
            transition: 'all 0.3s ease',
          }}
        >
          {/* AppBar */}
          <AppBar position="static" sx={{ boxShadow: 'none' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                News Articles
              </Typography>
              <Box>
                <Link to="/" style={{ textDecoration: 'none', marginRight: '16px' }}>
                  <Button color="inherit">Home</Button>
                </Link>
                <Link to="/signup" style={{ textDecoration: 'none', marginRight: '16px' }}>
                  <Button color="inherit">Signup</Button>
                </Link>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Button color="inherit">Login</Button>
                </Link>
                <Switch
                  checked={isDarkMode}
                  onChange={toggleTheme}
                  color="default"
                  sx={{
                    '& .MuiSwitch-thumb': {
                      backgroundColor: teal[500],
                    },
                  }}
                />
              </Box>
            </Toolbar>
          </AppBar>

          {/* Routes */}
          <Container>
            <Routes>
              {/* Home Route */}
              <Route
                path="/"
                element={
                  <>
                    {/* Date and Time */}
                    <Box sx={{ textAlign: 'center', my: 4 }}>
                      <Typography variant="h5" sx={{ fontWeight: 'light' }}>
                        {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
                      </Typography>
                    </Box>

                    {/* Search Bar */}
                    <Box sx={{ textAlign: 'center', my: 4 }}>
                      <TextField
                        label="Search articles..."
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{
                          width: '80%',
                          maxWidth: '500px',
                          backgroundColor: isDarkMode ? grey[800] : 'white',
                          borderRadius: 2,
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: isDarkMode ? grey[800] : 'white',
                          },
                        }}
                      />
                    </Box>

                    {/* Articles Section */}
                    <Articles searchQuery={searchQuery} scrollY={scrollY} />
                  </>
                }
              />

              {/* Signup Route */}
              <Route path="/signup" element={<Signup />} />

              {/* Login Route */}
              <Route path="/login" element={<Login />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;















