// Тестовая АПИ пока основного нет. Потом этот файл удалится

const KEY = '47af3f3eb3cebf089eb55cbdac9542a5';

function fetchMovies() {
  return fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY}`).then(response => {
    return response.json();
  });
}

export default { fetchMovies };
