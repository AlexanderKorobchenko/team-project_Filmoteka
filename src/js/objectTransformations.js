import filterGenres from './filterGenres.js';

export default function objectTransformations(results) {
  const genres = JSON.parse(localStorage.getItem('Genres'));

  return results.map(result => ({
    ...result,
    release_date: result.release_date ? result.release_date.slice(0, 4) : "Unknown",
    genres: filterGenres(genres, result),
  }));
}
