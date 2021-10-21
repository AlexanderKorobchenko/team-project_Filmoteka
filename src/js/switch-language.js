import ApiService from './apiService.js';
import createGenresMenu from './request-genres';

const genresMenuRef = document.querySelector('#genres_menu');

const newApiService = new ApiService();

const refs = {
  switchBtn: document.getElementById('language-switch-toggle'),
  // header
  homeBtn: document.getElementById('btn-home'),
  libraryBtn: document.getElementById('btn-library'),
  input: document.querySelector('.search__input'),
  inputGenres: document.getElementById('form-for-genre'),
  watchedBtn: document.getElementById('liberary').firstElementChild,
  queueBtn: document.getElementById('liberary').lastElementChild,
  // footer
  footerFirstText: document.getElementById('footer__first-text'),
  footerSecondText: document.querySelector('.footer__second-text'),
  footerThirdText: document.getElementById('footer__third-text'),
  footerTeamText: document.querySelector('#open_taem'),
};

refs.switchBtn.checked = Boolean(localStorage.getItem('language')); // Задаем кнопке сохраненное ранее значение

if (!refs.switchBtn.checked) {
  translateToEnglish();
} //Если "Выкл"
if (refs.switchBtn.checked) {
  translateToRussian();
} // Если "Вкл"

refs.switchBtn.addEventListener('click', changeLanguage);

function changeLanguage(event) {
  if (!event.target.checked) {
    localStorage.setItem('language', '');
    translateToEnglish();
  }

  if (event.target.checked) {
    localStorage.setItem('language', 'ru');
    translateToRussian();
  }
}

function translateToEnglish() {
  newApiService.searchGenres();

  setTimeout(() => {
    genresMenuRef.innerHTML = '';
    createGenresMenu();
  }, 150);

  refs.homeBtn.textContent = 'home';
  refs.libraryBtn.textContent = 'my library';
  refs.input.placeholder = 'Movie search...';
  refs.inputGenres.firstElementChild.textContent = 'Search by';
  refs.inputGenres.lastElementChild.firstElementChild.textContent = 'genres';
  refs.watchedBtn.textContent = 'Watched';
  refs.queueBtn.textContent = 'Queue';
  refs.footerFirstText.textContent = ' All Rights Reserved |';
  refs.footerSecondText.textContent = 'Developed with';
  refs.footerThirdText.textContent = 'by';
  refs.footerTeamText.textContent = 'GoIT Students';
}

function translateToRussian() {
  newApiService.searchGenres();

  setTimeout(() => {
    genresMenuRef.innerHTML = '';
    createGenresMenu();
  }, 150);

  refs.homeBtn.textContent = 'главная';
  refs.libraryBtn.textContent = 'моя библиотека';
  refs.input.placeholder = 'Поиск фильмов...';
  setTimeout(() => {
    document.getElementById('form-for-genre').firstElementChild.textContent = 'Поиск по';
    document.getElementById('form-for-genre').lastElementChild.firstElementChild.textContent =
      'жанрам';
  }, 160);
  refs.watchedBtn.textContent = 'просмотренные';
  refs.queueBtn.textContent = 'в очереди';
  refs.footerFirstText.textContent = ' Все права защищены |';
  refs.footerSecondText.textContent = 'Разработано с';
  refs.footerThirdText.textContent = '';
  refs.footerTeamText.textContent = 'студентами GoIT';
}
