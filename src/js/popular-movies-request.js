import moviesList from '../templates/main-cards.hbs';
import ApiService from './apiService.js';
import menuTemplate from '../templates/genres-menu.hbs';
import objectTransformations from './objectTransformations.js';
import { onWritesPageNumbers } from './pagination';
import Loader from './loader.js';

const changeLoader = new Loader('.loader');

const finder = new ApiService();
finder.searchType = 0;

finder.searchGenres();

const galleryList = document.getElementById('gallery');
const genresMenuRef = document.querySelector('#genres_menu');

function popularMovies() {
  changeLoader.addLoader();

  clearGalleryContainer();

  finder.searchReset();

  finder
    .searchMovies()
    .then(({ results }) => {
      createGenresMenu();

      return objectTransformations(results);
    })
    .then(data => {
      renderMoviesList(data);
      changeLoader.clearLoader();
      let pagesTotal = localStorage.getItem('TotalPagesInLastSearchResult');
      onWritesPageNumbers();
      return data;
    })
    .then(data => localStorage.setItem('Popular', JSON.stringify(data)))
    .catch(err => console.log(err));
}

popularMovies();

// пока так. Возможны в дальнейшем мелкие корректировки и функции которые ниже будут удалены и взяты с других файлов.

function clearGalleryContainer() {
  galleryList.innerHTML = '';
}

function renderMoviesList(movie) {
  const markup = moviesList(movie);
  galleryList.innerHTML = markup;
}

function createGenresMenu() {
  const genresArray = JSON.parse(localStorage.getItem('Genres'));
  genresArray.unshift({ id: '', name: 'none' });
  genresMenuRef.insertAdjacentHTML('beforeend', menuTemplate(genresArray));
}
