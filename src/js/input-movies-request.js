var debounce = require('lodash.debounce');
import moviesList from '../templates/main-cards.hbs';
import ApiService from './apiService.js';
import Loader from './loader.js';
import objectTransformations from './objectTransformations';

const finderQuery = new ApiService();
const changeLoader = new Loader('.loader');
const galleryList = document.getElementById('gallery');
const searchForm = document.getElementById('search-form');
const pagination = document.querySelector('.pagination');

const currentPageArray = JSON.parse(localStorage.getItem('Popular'));//пока используем популярные

searchForm.addEventListener('input', debounce(onSearchMovie, 800));

function onSearchMovie(event) {
  event.preventDefault();
  changeLoader.addLoader();
  clearGalleryContainer()
  pagination.classList.remove('hidden');

  const searchQuery = event.target.value;

  // для возврата популярных фильмов
  if (searchQuery === '') {
    renderMoviesList(currentPageArray);
    changeLoader.clearLoader();
    return;
  }

  finderQuery.searchRequest = searchQuery;
  finderQuery.searchType = 1;

  finderQuery
    .searchMovies()
    .then(({ results }) => {
      // Если ничего не найдено
      if (results.length === 0) {
        const notFound = `<li class="error-item"><div class="error-img-notfound"></div></li>`;
        galleryList.innerHTML = notFound;

        pagination.classList.add('hidden');
        changeLoader.clearLoader();
        return;
      }
      // Если найдено, то рендерим
      const data = objectTransformations(results);
      renderMoviesList(data);
      changeLoader.clearLoader();
    })
    .catch(err => {
      console.log(err);
    });

};

function renderMoviesList(movie) {
  const markup = moviesList(movie);
  galleryList.innerHTML = markup;
};

function clearGalleryContainer() {
  galleryList.innerHTML = '';
};