// import moviesList from '../templates/main-cards.hbs';
import menuTemplate from '../templates/genres-menu.hbs';
import ApiService from './apiService.js';
import Loader from './loader.js';
import objectTransformations from './objectTransformations.js';
import resetRender from './resetRender';

const { renderMoviesList, clearGalleryContainer } = resetRender;
const genresMenuRef = document.querySelector('#genres_menu');
const searchForm = document.getElementById('search-form');

const finder = new ApiService();
const changeLoader = new Loader('.loader');

createGenresMenu();

function createGenresMenu() {
  const genresArray = JSON.parse(localStorage.getItem('Genres'));
  genresArray.unshift({ id: '', name: 'none' });
  genresMenuRef.insertAdjacentHTML('beforeend', menuTemplate(genresArray));
}

genresMenuRef.addEventListener('input', onInput);

function onInput(event) {
  event.preventDefault();
  changeLoader.addLoader();
  clearGalleryContainer();
  console.log(searchForm);
  searchForm.firstElementChild.reset();

  if (event.target[event.target.selectedIndex].value === '') {
    renderMoviesList(JSON.parse(localStorage.getItem('LastSearchResults')));
    changeLoader.clearLoader();
    return;
  }

  finder.searchType = 3;
  finder.searchRequest = event.target[event.target.selectedIndex].value;
  finder
    .searchMovies()
    .then(({ results }) => {
      window.options.totalItems = +JSON.parse(localStorage.getItem('TotalPagesInLastSearchResult'));;
      window.pagination.reset(+JSON.parse(localStorage.getItem('TotalPagesInLastSearchResult')) * 20);
      return objectTransformations(results);
    })
    .then(data => {
      localStorage.setItem('LastSearchResults', JSON.stringify(data));
      renderMoviesList(data);
      changeLoader.clearLoader();
    })
    .catch(err => console.warm(err));
}

