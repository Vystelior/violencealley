import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [shows, setShows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchShows() {
      const res = await fetch('/api/shows');
      const data = await res.json();
      setShows(data);
    }
    fetchShows();
  }, []);

  const filteredShows = shows.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-black text-red-500 p-6 flex flex-col items-center">
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-bold mb-2 text-red-500">Violence Alley</h1>
        <p className="text-cyan-400">Retro Adult Swim streaming archive</p>
      </header>

      <input
        type="text"
        placeholder="Search series..."
        className="w-full max-w-xl p-3 rounded-lg border-2 border-pink-600 bg-black text-white mb-8 focus:outline-none focus:border-cyan-400"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <section className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredShows.map(show => (
          <Link key={show.id} href={`/series/${show.id}`}>
            <a className="block bg-gray-900 rounded-lg overflow-hidden border-2 border-pink-600 hover:border-red-500 hover:scale-105 transition-transform">
              <img
                src={show.poster_path ? `https://image.tmdb.org/t/p/w300${show.poster_path}` : 'https://via.placeholder.com/300x170.png?text=No+Image'}
                alt={show.name}
                className="w-full"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-red-500 mb-1">{show.name}</h2>
                <p className="text-gray-300 text-sm">{show.overview.substring(0, 100)}...</p>
              </div>
            </a>
          </Link>
        ))}
      </section>

      <footer className="text-center mt-12">
        <Link href="/request"><a className="text-pink-500 hover:text-cyan-400 font-bold underline">Request a Series / Episode</a></Link>
        <p className="text-gray-400 mt-2 text-sm">© 2025 Violence Alley</p>
      </footer>
    </div>
  );
}
