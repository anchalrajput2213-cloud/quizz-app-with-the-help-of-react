import { useEffect, useState } from "react";
function Movie() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  function fetchMovies(name) {
    fetch("https://www.omdbapi.com/?apikey=ce1d37c8&s=" + name)
      .then((response) => response.json())
      .then((data) => {
        if (data.Search) {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
      });
  }
  useEffect(() => {
    fetchMovies(search);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-4xl text-white font-bold text-center mb-6">
        Movie App
      </h1>
      <div className="flex justify-center gap-3 mb-8">
        <input
          type="text"
          placeholder="Search Movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-80"
        />
        <button
          onClick={() => fetchMovies(search)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-80 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold">{movie.Title}</h2>
              <p>Year: {movie.Year}</p>
              <p>Type: {movie.Type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Movie;