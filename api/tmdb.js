// /api/tmdb.js
export default async function handler(req, res) {
  const { type, id, season } = req.query;
  const API_KEY = process.env.TMDB_API_KEY;

  let url = '';
  if (type === 'tv') {
    url = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`;
  } else if (type === 'season') {
    url = `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${API_KEY}&language=en-US`;
  } else {
    return res.status(400).json({ error: 'Invalid type' });
  }

  const response = await fetch(url);
  const data = await response.json();
  res.status(200).json(data);
}
