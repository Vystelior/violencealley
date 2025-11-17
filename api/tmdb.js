// /api/tmdb.js (Serverless function)
export default async function handler(req, res) {
  // FIX: SECURITY IMPROVEMENT - Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { type, id, season } = req.query;
  const API_KEY = process.env.TMDB_API_KEY;

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
    
    // FIX: Better check for non-200 responses from TMDB
    if (!response.ok) {
        // Example: If TMDB returns 404
        return res.status(response.status).json({ error: `TMDB API error: ${response.statusText}` });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("API Fetch Error:", error);
    return res.status(500).json({ error: 'Internal server error while fetching data' });
  }
}
