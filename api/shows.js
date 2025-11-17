// /api/shows.js
export default async function handler(req, res) {
    const API_KEY = process.env.TMDB_API_KEY; // set in Vercel environment variables
    const shows = [25987, 52851]; // your TMDb IDs

    const showPromises = shows.map(id =>
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`)
            .then(r => r.json())
    );

    const results = await Promise.all(showPromises);
    res.status(200).json(results);
}
