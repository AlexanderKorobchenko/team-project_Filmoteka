import menuTemplate from '../templates/genres-menu.hbs';
import moviesList from '../templates/main-cards.hbs';
import ApiService from './apiService.js';
import objectTransformations from './objectTransformations.js';
// import { popularMovies } from './popular-movies-request';

const finder = new ApiService();

// const genresMenuRef = document.querySelector('#genres_menu');
const searchGenreBtn = document.querySelector('.search__genre');
const galleryList = document.getElementById('gallery');
const pagination = document.querySelector('.pagination');

//searchGenreBtn.addEventListener('click', onRenderGenresCards);

function onRenderGenresCards(event) {
  event.preventDefault();
  clearGalleryList();

  const cards = menuTemplate(JSON.parse(localStorage.getItem('Genres')));
  createCard(cards);
};

function createCard(cards) {
  pagination.classList.add('hidden');
  galleryList.innerHTML = cards;
}

function clearGalleryList() {
  galleryList.innerHTML = '';
}

//genresMenuRef.addEventListener('input', onInput);
// function onInput(event) {
//   console.dir(genresMenuRef);
//   if (event.target[event.target.selectedIndex].value === '') {
//     localStorage.removeItem('LastQuery');
//     localStorage.removeItem('LastSearchResults');
//     localStorage.removeItem('LastSearchIndex');
//     finder.searchReset();
//     finder.searchMovies();
//     // popularMovies();
//     renderMoviesList(JSON.parse(localStorage.getItem('Popular')));
//     return;
//   }
//   finder.searchType = 3;
//   finder.searchRequest = event.target[event.target.selectedIndex].value;
//   finder
//     .searchMovies() //-------------------modified  by Oleg Teslenko
//     .then(({ results }) => {
//       return objectTransformations(results);
//     })
//     .then(data => {
//       renderMoviesList(data);
//       let pagesTotal = localStorage.getItem('TotalPagesInLastSearchResult');
//       onWritesPageNumbers();
//     })
//     .catch(err => console.log(err));
//   //-----modified END
// }

// function renderMoviesList(movie) {
//   const markup = moviesList(movie);
//   galleryList.innerHTML = markup;
// }

