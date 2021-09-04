export default function filterGenres(genres, result) {
  let genreList = result.genre_ids
    .map(id => genres.filter(genre => genre.id === id).map(genre => genre.name))
    .flat();
  if (genreList.length === 0) {
    return (genreList = [`Unknown`]);
  }
  if (genreList.length === 1) {
    return (genreList = [`${genreList[0]}`]);
  }
  if (genreList.length === 2) {
    return (genreList = [`${genreList[0]}, ${genreList[1]}`]);
  } else if (genreList.length > 2) {
    return (genreList = `${genreList[0]}, ${genreList[1]}, Other`);
  }
}
