import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function SeriesPage() {
  const router = useRouter();
  const { id } = router.query;
  const [show, setShow] = useState(null);
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    if (!id) return;

    async function fetchShow() {
      const res = await fetch('/api/shows');
      const shows = await res.json();
      const selectedShow = shows.find(s => s.id.toString() === id.toString());
      if (!selectedShow) return;

      setShow(selectedShow);

      const seasonPromises = selectedShow.seasons.map(async season => {
        const r = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${season.season_number}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`);
        return await r.json();
      });

      const seasonsData = await Promise.all(seasonPromises);
      setSeasons(seasonsData);
    }

    fetchShow();
  }, [id]);

  if (!show) return <p className="text-red-500 text-center mt-12">Loading show...</p>;

  return (
    <div className="min-h-screen bg-black text-red-500 p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">{show.name}</h1>
        <p className="text-cyan-400">{show.overview}</p>
      </header>

      <main className="max-w-3xl mx-auto">
        {seasons.map(season => (
          <div key={season.id} className="mb-8">
            <h2 className="text-2xl text-pink-500 mb-2">Season {season.season_number}</h2>
            {season.episodes.map(ep => (
              <div
                key={ep.id}
                className="bg-gray-900 p-3 mb-2 rounded hover:bg-red-700 cursor-pointer"
                onClick={() => {
                  const imdb = show.imdb;
                  const url = `https://111movies.com/tv/${imdb}/${season.season_number}/${ep.episode_number}`;
                  window.open(url, '_blank');
                }}
              >
                E{ep.episode_number}: {ep.name}
              </div>
            ))}
          </div>
        ))}
      </main>

      <footer className="text-center mt-12">
        <a href="/" className="text-cyan-400 underline">Back to Home</a>
      </footer>
    </div>
  );
}
