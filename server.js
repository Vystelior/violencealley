const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;

// Disable caching for Replit environment
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

// API endpoint - converted from Vercel serverless function
app.get('/api/tmdb', async (req, res) => {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { type, id, season } = req.query;
  const API_KEY = process.env.TMDB_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: 'TMDB API key not configured' });
  }

  let url = '';
  if (type === 'tv') {
    url = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`;
  } else if (type === 'season') {
    url = `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${API_KEY}&language=en-US`;
  } else {
    return res.status(400).json({ error: 'Invalid type provided' });
  }

  try {
    const response = await fetch(url);
    
    // Better check for non-200 responses from TMDB
    if (!response.ok) {
      return res.status(response.status).json({ error: `TMDB API error: ${response.statusText}` });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("API Fetch Error:", error);
    return res.status(500).json({ error: 'Internal server error while fetching data' });
  }
});

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle SPA routing - serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server on 0.0.0.0:5000 for Replit compatibility
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Violence Alley server running on http://0.0.0.0:${PORT}`);
});
