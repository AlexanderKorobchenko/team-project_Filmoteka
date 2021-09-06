import menuTemplate from '../templates/genres-menu.hbs';
import moviesList from '../templates/main-cards.hbs';
import ApiService from './apiService.js';
import objectTransformations from './objectTransformations.js';

const finder = new ApiService();

const genresMenuRef = document.querySelector('#genres_menu');
const galleryList = document.getElementById('gallery');

//-------------------modified  by Oleg Teslenko

// При первом посещении сайта не рендерится разметка для выборов жанрв, так как у нас ещё нет масива жанров в локолстородже
//  Функцию createGenresMenu закинул в запрос по популярным фильмам

// createGenresMenu();

// function createGenresMenu() {
//   const genresArray = JSON.parse(localStorage.getItem('Genres'));
//   genresArray.unshift({ id: '', name: 'none' });
//   genresMenuRef.insertAdjacentHTML('beforeend', menuTemplate(genresArray));
// }

//-----modified END

genresMenuRef.addEventListener('input', onInput);
function onInput(event) {
  console.dir(genresMenuRef);
  if (event.target[event.target.selectedIndex].value === '') {
    renderMoviesList(JSON.parse(localStorage.getItem('Popular')));
    return;
  }
  finder.searchType = 3;
  finder.searchRequest = event.target[event.target.selectedIndex].value;
  finder
    .searchMovies() //-------------------modified  by Oleg Teslenko
    .then(({ results }) => {
      return objectTransformations(results);
    })
    .then(data => {
      renderMoviesList(data);
    })
    .catch(err => console.log(err));
  //-----modified END
}

function renderMoviesList(movie) {
  const markup = moviesList(movie);
  galleryList.innerHTML = markup;
}
