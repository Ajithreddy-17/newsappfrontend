import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const Articles = ({ searchQuery, scrollY }) => {
  const [articles, setArticles] = useState([]); // State to hold the articles
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(''); // State to handle error

  useEffect(() => {
    // Fetch the articles when the component is mounted
    const fetchArticles = async () => {
      try {
        // Making a GET request to your backend
        const response = await axios.get('http://localhost:5000/api/articles'); 
        setArticles(response.data); // Store articles in the state
      } catch (err) {
        setError('Failed to load articles'); // Set error message if request fails
      } finally {
        setLoading(false); // Stop loading after the request is finished
      }
    };

    fetchArticles(); // Call the function to fetch articles
  }, []); // The empty array ensures this effect runs only once (like componentDidMount)

  // Show loading message while data is being fetched
  if (loading) {
    return <div>Loading articles...</div>;
  }

  // Show error message if there's an issue
  if (error) {
    return <div>{error}</div>;
  }

  // Show message if no articles are available
  if (articles.length === 0) {
    return <div>No articles available at the moment.</div>;
  }

  // Render the list of articles
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Grid container spacing={4} justifyContent="center">
      {filteredArticles.map((article) => (
        <Grid item key={article._id} xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">{article.title}</Typography>
              <Typography variant="body2">{article.description || 'No description available'}</Typography>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Articles;





