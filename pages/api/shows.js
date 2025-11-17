// /api/shows.js
export default async function handler(req, res) {
    const API_KEY = process.env.TMDB_API_KEY; // Add to Vercel Environment Variables
    const showIDs = [14769, 61593]; // your selected TMDb IDs
    const showPromises = showIDs.map(id =>
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`)
        .then(r => r.json())
    );
    const results = await Promise.all(showPromises);
    res.status(200).json(results);
}
