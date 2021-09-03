import moviesList from '../templates/test-card.hbs';
import ApiService from './apiService.js';

const finder = new ApiService();
finder.searchType = 0;

const galleryList = document.getElementById('gallery');

function popularMovies() {
  clearGalleryContainer();

  finder.searchReset();

  finder
    .searchMovies()
    .then(response => {
      renderMoviesList(response);
      console.log(response);
    })
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
