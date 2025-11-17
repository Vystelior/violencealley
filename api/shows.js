export default async function handler(req, res) {
    const API_KEY = process.env.TMDB_API_KEY;
    const showIDs = [
        61593, // Mr Pickles
        14769  // Xavier: Renegade Angel
    ];

    const showPromises = showIDs.map(async id => {
        const r = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`);
        const show = await r.json();
        // Add imdb mapping
        if(id === 61593) show.imdb = 'tt2950342';
        if(id === 14769) show.imdb = 'tt1132124';
        return show;
    });

    const results = await Promise.all(showPromises);
    res.status(200).json(results);
}
