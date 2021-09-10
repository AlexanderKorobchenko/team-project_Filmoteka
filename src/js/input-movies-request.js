var debounce = require('lodash.debounce');
import moviesList from '../templates/main-cards.hbs';
import ApiService from './apiService.js';
import Loader from './loader.js';
import objectTransformations from './objectTransformations';

const finderQuery = new ApiService();
const changeLoader = new Loader('.loader');
const galleryList = document.getElementById('gallery');
const searchForm = document.getElementById('search-form');
//const pagination = document.querySelector('.pagination');
const tuiPagination = document.getElementById('tui-pagination-container');
const errors = document.getElementById('errors');

const currentPageArray = JSON.parse(localStorage.getItem('LastSearchResults'));

searchForm.addEventListener('input', debounce(onSearchMovie, 800));

function onSearchMovie(event) {
  event.preventDefault();
  changeLoader.addLoader();
  errors.firstElementChild.classList.add('hidden');
  // pagination.classList.remove('hidden');
  tuiPagination.classList.remove('hidden');

  const searchQuery = event.target.value;

  let newsearchQuery = searchQuery.trim();

  // для возврата текуйщей страницы
  if (newsearchQuery === '') {
    renderMoviesList(currentPageArray);
    changeLoader.clearLoader();
    return;
  }

  finderQuery.searchRequest = newsearchQuery;
  finderQuery.searchType = 1;

  finderQuery
    .searchMovies()
    .then(({ results }) => {
      // Если ничего не найдено
      if (results.length === 0) {
        clearGalleryContainer();
        errors.firstElementChild.classList.remove('hidden');
        //  pagination.classList.add('hidden');
        tuiPagination.classList.add('hidden');
        changeLoader.clearLoader();
        return;
      }
      // Если найдено, то рендерим
      const data = objectTransformations(results);
      renderMoviesList(data);
      changeLoader.clearLoader();
      localStorage.setItem('LastSearchResults', JSON.stringify(data));
    })
    .catch(err => {
      console.log(err);
    });
}

function renderMoviesList(movie) {
  const markup = moviesList(movie);
  galleryList.innerHTML = markup;
}

function clearGalleryContainer() {
  galleryList.innerHTML = '';
}
