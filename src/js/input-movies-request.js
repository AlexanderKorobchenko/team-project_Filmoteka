var debounce = require('lodash.debounce');
import moviesList from '../templates/main-cards.hbs';
import ApiService from './apiService.js';
import Loader from './loader.js';
import objectTransformations from './objectTransformations';

const finderQuery = new ApiService();
const changeLoader = new Loader('.loader');
const galleryList = document.getElementById('gallery');
const searchForm = document.getElementById('search-form');
const main = document.querySelector('.main > .container');

const currentPageArray = JSON.parse(localStorage.getItem('Popular'));//пока используем популярные

searchForm.addEventListener('input', debounce(onSearchMovie, 800));

function onSearchMovie(event) {
  event.preventDefault();
  changeLoader.addLoader();

  const searchQuery = event.target.value;

  if (searchQuery === '') {
    renderMoviesList(currentPageArray);
    changeLoader.clearLoader();
    // для возврата популярных фильмов
    return;
  }
  finderQuery.searchRequest = searchQuery;
  finderQuery.searchType = 1;

  finderQuery
    .searchMovies()
    .then(({ results }) => {
      if (results.length === 0) {
        renderError();        
        changeLoader.clearLoader();
        // функция которая очищает разметку и выводит картинку - ничегот не найдено в мэйне
        return;
      }
      changeLoader.clearLoader();
      return objectTransformations(results);
    })
    .then(data => {      
      renderMoviesList(data);
      changeLoader.clearLoader();
      return data;
    })
    // .then(data => localStorage.setItem('Popular', JSON.stringify(data)))
    .catch(err => {
      console.log(err);
      changeLoader.clearLoader();
    });
  // changeLoader.clearLoader();
}

// function clearGalleryContainer() {
//   galleryList.innerHTML = '';
// }

function renderMoviesList(movie) {
  const markup = moviesList(movie);
  galleryList.innerHTML = markup;
}

function renderError() {
  console.log("Ашибачка");
  const error = '<h2>"Таких фильмов не найдено"</h2>';
  // error.textContent = "This is a heading";
  // galleryList.append(error);
  main.innerHTML = error;

  return
}

// обсудить поиск по жанрам, функцию обработки результата для карточки, возврат популярного записи в локалсторидж, Пустая строка
