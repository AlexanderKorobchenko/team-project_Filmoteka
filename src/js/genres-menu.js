import menuTemplate from '../templates/genres-menu.hbs';
import moviesList from '../templates/main-cards.hbs';
import ApiService from './apiService.js';

const finder = new ApiService();

const genresMenuRef = document.querySelector('#genres_menu');
const galleryList = document.getElementById('gallery');


createGenresMenu();

function createGenresMenu() {
    const genresArray = JSON.parse(localStorage.getItem('Genres'));
    genresArray.unshift({id: '', name:'none' });
    genresMenuRef.insertAdjacentHTML('beforeend',menuTemplate(genresArray));
}
genresMenuRef.addEventListener('input', onInput);
function onInput(event) {
  console.dir(genresMenuRef);
  if (
    event.target[event.target.selectedIndex].value === ''
  ) {

    renderMoviesList(JSON.parse(localStorage.getItem('Popular')));
    return
  }
    finder.searchType = 3;
  finder.searchRequest = event.target[event.target.selectedIndex].value;
  finder.searchMovies().then(data => renderMoviesList(data.results));

}

function renderMoviesList(movie) {
  const markup = moviesList(movie);
  galleryList.innerHTML = markup;
}