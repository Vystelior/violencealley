<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Series - Violence Alley</title>
<script src="https://cdn.tailwindcss.com"></script>
<style>
body { background:#111; color:#ff0000; font-family:'Poppins',sans-serif; }
.neon-title { text-shadow:0 0 5px #ff0000,0 0 10px #ff007f,0 0 20px #00ffff; }
.episode-card { background:#1a1a1a; border:2px solid #ff007f; border-radius:12px; padding:8px; margin-bottom:8px; }
.episode-card:hover { transform:scale(1.05); box-shadow:0 0 20px #ff0000,0 0 30px #00ffff; cursor:pointer; }
</style>
</head>
<body class="p-6 min-h-screen">

<header class="mb-8 text-center">
    <h1 class="text-4xl neon-title font-bold mb-2" id="seriesTitle"></h1>
    <p class="text-cyan-400" id="seriesOverview"></p>
</header>

<section id="episodesContainer" class="max-w-3xl mx-auto"></section>

<footer class="mt-12 text-center">
    <a href="/index.html" class="text-cyan-400 underline">Back to Home</a>
</footer>

<script>
async function loadSeries() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if(!id) return;

    const res = await fetch('/api/shows');
    const shows = await res.json();
    const show = shows.find(s => s.id == id);
    if(!show) return;

    document.getElementById('seriesTitle').textContent = show.name;
    document.getElementById('seriesOverview').textContent = show.overview;

    const episodesContainer = document.getElementById('episodesContainer');

    // Fetch season & episode info from TMDb
    const seasonPromises = show.seasons.map(async season => {
        const r = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${season.season_number}?api_key=${'225f2f562d49c4a8d484591f1ae3027c'}&language=en-US`);
        const seasonData = await r.json();
        return seasonData;
    });

    const seasonsData = await Promise.all(seasonPromises);

    seasonsData.forEach(season => {
        const h2 = document.createElement('h2');
        h2.textContent = `Season ${season.season_number}`;
        h2.className = 'text-2xl text-pink-500 mt-6 mb-2';
        episodesContainer.appendChild(h2);

        season.episodes.forEach(ep => {
            const div = document.createElement('div');
            div.className = 'episode-card';
            div.textContent = `E${ep.episode_number}: ${ep.name}`;
            div.onclick = () => {
                const imdb = show.imdb;
                const url = `https://111movies.com/tv/${imdb}/${season.season_number}/${ep.episode_number}`;
                window.open(url,'_blank');
            };
            episodesContainer.appendChild(div);
        });
    });
}

loadSeries();
</script>
</body>
</html>
