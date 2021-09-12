// import moviesList from '../templates/main-cards.hbs';
import ApiService from './apiService';
import { popularMovies } from './request-popular-movies';
import resetRender from './resetRender';

const { renderMoviesList, clearGalleryContainer } = resetRender;
const finder = new ApiService();

const href = {
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
href.logoBtn.addEventListener('click', onGoHome);
href.homeBtn.addEventListener('click', onGoHome);
href.libraryBtn.addEventListener('click', onGoLibrary);

function onGoHome(event) {
  event.preventDefault();
  href.search.firstElementChild.reset();
  clearGalleryContainer();
  href.errors.firstElementChild.classList.add('hidden');
  href.errors.lastElementChild.classList.add('hidden');
  href.tuiPagination.classList.remove('hidden');
  href.genresMenu.classList.remove('hidden');
  href.genresMenu.reset();

  href.backgroundHome.classList.remove('hidden');
  href.backgroundLibrary.classList.add('hidden');

  href.libraryBtn.classList.remove('navigation__btn-current');
  href.homeBtn.classList.add('navigation__btn-current');

  href.search.classList.remove('hidden');
  href.library.classList.add('hidden');

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
  href.errors.lastElementChild.classList.add('hidden');
  href.tuiPagination.classList.add('hidden');
  href.genresMenu.classList.add('hidden');

  href.backgroundLibrary.classList.remove('hidden');
  href.backgroundHome.classList.add('hidden');

  href.homeBtn.classList.remove('navigation__btn-current');
  href.libraryBtn.classList.add('navigation__btn-current');

  href.library.classList.remove('hidden');
  href.search.classList.add('hidden');

  let switchLibrary = Boolean(localStorage.getItem('checkBoxLibrary'));

  if (!switchLibrary) {
    showWatched();
  }

  if (switchLibrary) {
    showQueue();
  }
}

//переключение между библиотеками
href.library.firstElementChild.addEventListener('click', onClickWathed);
href.library.lastElementChild.addEventListener('click', onClickQueue);

function onClickWathed() {
  clearGalleryContainer();
  href.errors.lastElementChild.classList.add('hidden');
  localStorage.setItem('checkBoxLibrary', '');
  showWatched();
}

function onClickQueue() {
  clearGalleryContainer();
  href.errors.lastElementChild.classList.add('hidden');
  localStorage.setItem('checkBoxLibrary', 'queue');
  showQueue();
}

function showWatched() {
  href.library.firstElementChild.classList.add('liberary__btn-current');
  href.library.lastElementChild.classList.remove('liberary__btn-current');

  const watchedArray = JSON.parse(localStorage.getItem('watched'));

  // если библиотека пустая
  if (watchedArray.length === 0) {
    clearGalleryContainer();
    href.errors.lastElementChild.classList.remove('hidden');
    href.tuiPagination.classList.add('hidden');
    return;
  }

  //рендер библиотеки watched;
  renderMoviesList(watchedArray);
}

function showQueue() {
  href.library.lastElementChild.classList.add('liberary__btn-current');
  href.library.firstElementChild.classList.remove('liberary__btn-current');

  const watchedQueue = JSON.parse(localStorage.getItem('queue'));

  // если библиотека пустая
  if (watchedQueue.length === 0) {
    clearGalleryContainer();
    href.errors.lastElementChild.classList.remove('hidden');
    href.tuiPagination.classList.add('hidden');
    return;
  }

  //рендер библиотеки Queue;
  renderMoviesList(watchedQueue);
}

