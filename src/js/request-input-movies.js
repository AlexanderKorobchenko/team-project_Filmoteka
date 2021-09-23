var debounce = require('lodash.debounce');
import moviesList from '../templates/main-cards.hbs';
import ApiService from './apiService.js';
import Loader from './loader.js';
import objectTransformations from './objectTransformations';
import resetRender from './resetRender';
import { popularMovies } from './request-popular-movies'

const { renderMoviesList, clearGalleryContainer } = resetRender;
const finderQuery = new ApiService();
const changeLoader = new Loader('.loader');
const searchForm = document.getElementById('search-form');
const tuiPagination = document.getElementById('tui-pagination-container');
const errors = document.getElementById('errors');
const currentPageArray = JSON.parse(localStorage.getItem('LastSearchResults'));
const genresMenu = document.getElementById('form-for-genre');

searchForm.addEventListener('input', debounce(onSearchMovie, 800));

function onSearchMovie(event) {
  event.preventDefault();
  changeLoader.addLoader();
  errors.firstElementChild.classList.add('hidden');
  tuiPagination.classList.remove('hidden');
  genresMenu.reset();

  const searchQuery = event.target.value;
  let newSearchQuery = searchQuery.trim();

  // для возврата текуйщей страницы
  if (newSearchQuery === '') {
    renderMoviesList(currentPageArray);
    changeLoader.clearLoader();

    popularMovies();
    // finderQuery.searchReset();
    // finderQuery.searchType = 0;
    // finderQuery.searchGenres();

    window.options.totalItems = +JSON.parse(localStorage.getItem('TotalPagesInLastSearchResult'));
    window.pagination.reset(+JSON.parse(localStorage.getItem('TotalPagesInLastSearchResult')) * 20);
    return;
  }

  finderQuery.searchRequest = newSearchQuery;
  finderQuery.searchType = 1;

  finderQuery
    .searchMovies()
    .then(res => {
      window.options.totalItems = res.total_results;
      //console.log(window.options);
      window.pagination.reset(res.total_results); // pagination.movePageTo(pageNumber);
      return res;
    })
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
      console.warn(err);
    });
}

