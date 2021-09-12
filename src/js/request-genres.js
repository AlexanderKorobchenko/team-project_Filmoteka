import menuTemplate from '../templates/genres-menu.hbs';
// import moviesList from '../templates/main-cards.hbs';
import ApiService from './apiService.js';
import objectTransformations from './objectTransformations.js';
import resetRender from './resetRender';

const { renderMoviesList, clearGalleryContainer} = resetRender;
const finder = new ApiService();
const genresMenuRef = document.querySelector('#genres_menu');

createGenresMenu();

function createGenresMenu() {
  const genresArray = JSON.parse(localStorage.getItem('Genres'));
  genresArray.unshift({ id: '', name: 'none' });
  genresMenuRef.insertAdjacentHTML('beforeend', menuTemplate(genresArray));
}

genresMenuRef.addEventListener('input', onInput);

function onInput(event) {
  console.dir(genresMenuRef);
  if (event.target[event.target.selectedIndex].value === '') {
    renderMoviesList(JSON.parse(localStorage.getItem('LastSearchResults')));
    return;
  }
  finder.searchType = 3;
  finder.searchRequest = event.target[event.target.selectedIndex].value;
  finder
    .searchMovies()
    .then(({ results }) => {
      // window.options.totalItems = results.total_results;
      // window.pagination.reset();
      return objectTransformations(results);
    })
    .then(data => {
      localStorage.setItem('LastSearchResults', JSON.stringify(data));
      renderMoviesList(data);
    })
    .catch(err => console.log(err));
}

