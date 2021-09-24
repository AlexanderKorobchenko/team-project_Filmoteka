// import moviesList from '../templates/main-cards.hbs';
import ApiService from './apiService';
import { popularMovies } from './request-popular-movies';
import resetRender from './resetRender';

const { renderMoviesList, clearGalleryContainer } = resetRender;
const finder = new ApiService();

const refs = {
  logoBtn: document.getElementById('logo-home'),
  homeBtn: document.getElementById('btn-home'),
  libraryBtn: document.getElementById('btn-library'),
  search: document.getElementById('search-form'),
  input: document.querySelector('.search__input'),
  library: document.getElementById('liberary'),
  backgroundHome: document.querySelector('.background'),
  backgroundLibrary: document.querySelector('.background-library'),
  errors: document.getElementById('errors'),
  tuiPagination: document.getElementById('tui-pagination-container'),
  genresMenu: document.getElementById('form-for-genre'),
};

// переключение между страницами
refs.logoBtn.addEventListener('click', onGoHome);
refs.homeBtn.addEventListener('click', onGoHome);
refs.libraryBtn.addEventListener('click', onGoLibrary);

function onGoHome(event) {
  event.preventDefault();
  refs.search.firstElementChild.reset();
  clearGalleryContainer();
  refs.errors.firstElementChild.classList.add('hidden');
  refs.errors.lastElementChild.classList.add('hidden');
  refs.tuiPagination.classList.remove('hidden');
  refs.genresMenu.classList.remove('hidden');
  refs.genresMenu.reset();

  refs.backgroundHome.classList.remove('hidden');
  refs.backgroundLibrary.classList.add('hidden');

  refs.libraryBtn.classList.remove('navigation__btn-current');
  refs.homeBtn.classList.add('navigation__btn-current');

  refs.search.classList.remove('hidden');
  refs.library.classList.add('hidden');

  //рендер текущей страници
  // const firstPopularPage = JSON.parse(localStorage.getItem('Popular'));
  // renderMoviesList(firstPopularPage);

  finder.searchReset();
  localStorage.removeItem('LastQuery');
  localStorage.removeItem('LastSearchResults');
  localStorage.setItem('LastSearchIndex', 0);
  popularMovies();
};

function onGoLibrary(event) {
  event.preventDefault();
  clearGalleryContainer();
  refs.errors.firstElementChild.classList.add('hidden');
  refs.errors.lastElementChild.classList.add('hidden');
  refs.tuiPagination.classList.add('hidden');
  refs.genresMenu.classList.add('hidden');

  refs.backgroundLibrary.classList.remove('hidden');
  refs.backgroundHome.classList.add('hidden');

  refs.homeBtn.classList.remove('navigation__btn-current');
  refs.libraryBtn.classList.add('navigation__btn-current');

  refs.library.classList.remove('hidden');
  refs.search.classList.add('hidden');

  let switchLibrary = Boolean(localStorage.getItem('checkBoxLibrary'));

  if (!switchLibrary) {
    showWatched();
  }

  if (switchLibrary) {
    showQueue();
  }
}

//переключение между библиотеками
refs.library.firstElementChild.addEventListener('click', onClickWathed);
refs.library.lastElementChild.addEventListener('click', onClickQueue);

function onClickWathed() {
  clearGalleryContainer();
  refs.errors.lastElementChild.classList.add('hidden');
  localStorage.setItem('checkBoxLibrary', '');
  showWatched();
}

function onClickQueue() {
  clearGalleryContainer();
  refs.errors.lastElementChild.classList.add('hidden');
  localStorage.setItem('checkBoxLibrary', 'queue');
  showQueue();
}

function showWatched() {
  refs.library.firstElementChild.classList.add('liberary__btn-current');
  refs.library.lastElementChild.classList.remove('liberary__btn-current');

  const watchedArray = JSON.parse(localStorage.getItem('watched'));

  // если библиотека пустая
  if (watchedArray.length === 0) {
    clearGalleryContainer();
    refs.errors.lastElementChild.classList.remove('hidden');
    refs.tuiPagination.classList.add('hidden');
    return;
  }

  //рендер библиотеки watched;
  renderMoviesList(watchedArray);
}

function showQueue() {
  refs.library.lastElementChild.classList.add('liberary__btn-current');
  refs.library.firstElementChild.classList.remove('liberary__btn-current');

  const watchedQueue = JSON.parse(localStorage.getItem('queue'));

  // если библиотека пустая
  if (watchedQueue.length === 0) {
    clearGalleryContainer();
    refs.errors.lastElementChild.classList.remove('hidden');
    refs.tuiPagination.classList.add('hidden');
    return;
  }

  //рендер библиотеки Queue;
  renderMoviesList(watchedQueue);
}

