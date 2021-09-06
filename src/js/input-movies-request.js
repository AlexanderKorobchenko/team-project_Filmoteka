var debounce = require('lodash.debounce');
import moviesList from '../templates/main-cards.hbs';
import ApiService from './apiService.js';
// import filterGenres from './filterGenres.js';
import objectTransformations from './objectTransformations';
// import menuTemplate from '../templates/genres-menu.hbs';

const finderQuery = new ApiService();
// finderQuery.searchRequest = searchQuery;
// finderQuery.searchType = 1;

const galleryList = document.getElementById('gallery');
const searchForm = document.getElementById('search-form');

searchForm.addEventListener('input', debounce(onSearchMovie, 800));

// console.log(finderQuery);

function onSearchMovie(event) {
  event.preventDefault();

  const searchQuery = event.target.value;

  if (searchQuery === '') {
    console.log('ПУСТАЯ СТРОКА');
    // для возврата популярных фильмов
    return;
  }
  finderQuery.searchRequest = searchQuery;
  finderQuery.searchType = 1;

  finderQuery
    .searchMovies()
    .then(({ results }) => {
      // createGenresMenu();
      console.dir(results);
      if (results.length === 0) {
        console.log('Error');
        // функция которая очищает разметку и выводит картинку - ничегот не найдено в мэйне
        return;
      }

      // return results.map(result => ({
      //     ...result,
      // }))
      return objectTransformations(results);
    })
    .then(data => {
      renderMoviesList(data);
      return data;
    })
    // .then(data => localStorage.setItem('Popular', JSON.stringify(data)))
    .catch(err => console.log(err));
}

// function clearGalleryContainer() {
//   galleryList.innerHTML = '';
// }

function renderMoviesList(movie) {
  const markup = moviesList(movie);
  galleryList.innerHTML = markup;
}

// function createGenresMenu() {
//   const genresArray = JSON.parse(localStorage.getItem('Genres'));
//   genresArray.unshift({ id: '', name: 'none' });
//   genresMenuRef.insertAdjacentHTML('beforeend', menuTemplate(genresArray));
// }

// обсудить поиск по жанрам, функцию обработки результата для карточки, возврат популярного записи в локалсторидж, Пустая строка
