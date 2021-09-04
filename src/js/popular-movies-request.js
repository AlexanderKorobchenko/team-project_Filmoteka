import moviesList from '../templates/main-cards.hbs';
import ApiService from './apiService.js';
import filterGenres from './filterGenres.js';

const finder = new ApiService();
finder.searchType = 0;

finder.searchGenres();

const genres = JSON.parse(localStorage.getItem('Genres'));

const galleryList = document.getElementById('gallery');

function popularMovies() {
  clearGalleryContainer();

  finder.searchReset();

  finder
    .searchMovies()
    .then(({ results }) => {
      return results.map(result => ({
        ...result,
        release_date: result.release_date ? result.release_date.slice(0, 4) : result.release_date,
        genres: filterGenres(genres, result),
      }));
    })
    .then(renderMoviesList)
    .catch(err => console.log(err));
}

popularMovies();

// пока так. Возможны в дальнейшем мелкие корректировки и функции которые ниже будут удалены и взяты с других файлов

function clearGalleryContainer() {
  galleryList.innerHTML = '';
}

function renderMoviesList(movie) {
  const markup = moviesList(movie);
  galleryList.innerHTML = markup;
}
