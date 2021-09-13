import moviesCard from '../templates/modal-movie.hbs';
import ApiService from './apiService.js';
import mainCards from '../templates/main-cards.hbs';
import { trailerRun } from './trailer';
// import { options } from './tui_pagination';
// import Pagination from 'tui-pagination';

// const pagination = new Pagination()

const refs = {
  galleryList: document.getElementById('gallery'),
  modalWindow: document.querySelector('#modal-window'),
  btnLibrary: document.getElementById('btn-library'),
  library: document.getElementById('liberary'),
  errors: document.getElementById('errors'),
  body: document.querySelector('body'),
}

const finder = new ApiService();

refs.galleryList.addEventListener('click', onSearchID);

function onSearchID(e) {
  if (e.target.nodeName === 'UL') { return }
  finder.searchRequest = e.target.offsetParent.id;
  finder.searchType = 2;
  finder
    .searchMovies()
    .then(data => {
      refs.modalWindow.innerHTML = moviesCard(data);
      openModalWindow();

      const watchBtn = document.querySelector('.btn__watch');
      const queueBtn = document.querySelector('.btn__queue');
      const trailerBtn = document.querySelector('#trailer');

      const popularFilm = JSON.parse(localStorage.getItem('LastSearchResults'));
      const arrayPopFilm = localStorage.getItem('watched');
      const arrayPopFilmQ = localStorage.getItem('queue');
      const currentWatch = refs.library.firstElementChild;
      const currentQueue = refs.library.lastElementChild;

      // ================= начало работы кнопки Add to watched =================
      getIncludesFilms(e.target.offsetParent.id);
      watchBtn.addEventListener('click', onWatch);

      function getIncludesFilms(id) {
        // console.log(id)
        if (arrayPopFilm.includes(id)) {
          watchBtn.textContent = 'Delete from watched';
        }
        if (!arrayPopFilm.includes(id)) {
          watchBtn.textContent = 'Add to watched';
        }
      }

      function onWatch(event) {
        if (event.target.innerHTML === 'Delete from watched') {
          // Функция удаления карточки с фильмами из библиотеки
          const arrObjectWatch = JSON.parse(localStorage.getItem('watched'));
          let indx = null;

          for (let i = 0; i < arrObjectWatch.length; i += 1) {
            if (+arrObjectWatch[i].id === +event.target.dataset.id) {
              // console.log('Совпало');
              // console.log(arrObjectWatch[i]);
              indx = i;
            }
          }

          arrObjectWatch.splice(indx, 1);
          localStorage.setItem('watched', JSON.stringify(arrObjectWatch));
          watchBtn.textContent = 'Add to watched';
        } else {
          const filteredFilm = popularFilm.filter(film => {
            if (+film.id === +event.target.dataset.id) {
              // console.log(film.id)
              return film;
            }
          });

          var a = [];
          a = JSON.parse(localStorage.getItem('watched')) || [];
          a.push(filteredFilm[0]);

          //console.log(a);
          localStorage.setItem('watched', JSON.stringify(a));
          watchBtn.textContent = 'Delete from watched';
        }

        if (
          refs.btnLibrary.classList.contains('navigation__btn-current') &&
          currentWatch.classList.contains('liberary__btn-current')
        ) {
          renderCardsList(JSON.parse(localStorage.getItem('watched')));
        }
      }
      // ================= конец работы кнопки watched =================

      // ================= начало работы кнопки Add to queue =================
      getIncludesFilmsQ(e.target.offsetParent.id);
      queueBtn.addEventListener('click', onQueue);

      function getIncludesFilmsQ(id) {
        if (arrayPopFilmQ.includes(id)) {
          queueBtn.textContent = 'Delete from queue';
        }

        if (!arrayPopFilmQ.includes(id)) {
          queueBtn.textContent = 'Add to queue';
        }
      }

      function onQueue(event) {
        if (event.target.innerHTML === 'Delete from queue') {
          // Функция удаления карточки с фильмами из библиотеки

          const arrObjectQueue = JSON.parse(localStorage.getItem('queue'));
          let indx = null;

          for (let i = 0; i < arrObjectQueue.length; i += 1) {
            if (+arrObjectQueue[i].id === +event.target.dataset.id) {
              // console.log('Совпало');
              // console.log(arrObjectQueue[i]);
              indx = i;
            }
          }

          arrObjectQueue.splice(indx, 1);
          localStorage.setItem('queue', JSON.stringify(arrObjectQueue));
          queueBtn.textContent = 'Add to queue';
        } else {
          const filteredFilm = popularFilm.filter(film => {
            if (+film.id === +event.target.dataset.id) {
              // console.log(film.id)
              return film;
            }
          });

          let a = [];
          a = JSON.parse(localStorage.getItem('queue')) || [];
          a.push(filteredFilm[0]);

          //console.log(a);
          localStorage.setItem('queue', JSON.stringify(a));
          queueBtn.textContent = 'Delete from queue';
        }

        if (
          refs.btnLibrary.classList.contains('navigation__btn-current') &&
          currentQueue.classList.contains('liberary__btn-current')
        ) {
          renderCardsList(JSON.parse(localStorage.getItem('queue')));
        }
      }
      // ================= конец работы кнопки  queue=================

      // ================= начало работы кнопки trailer ==================
      trailerBtn.addEventListener('click', onStartWatch);
      function onStartWatch(e) {
        document.querySelector('.modal__container').classList.add('hidden');
        trailerRun();
        // document.querySelector('.modal__container').classList.remove('hidden');
      }
      // ==================== конец работы кнопки trailer ==================
    })
    .catch(err => console.warn(err));
};

// ================= начало открытие/закрытие модалки =================
function openModalWindow() {
  setTimeout(function () {
    refs.modalWindow.classList.add('is-open')
  }, 150)
  //показали модалку ()== ТАЙМАУТ для красивого открытия (Яша) 
  document.querySelector(".close__button").addEventListener('click', closeModalWindow);
  refs.modalWindow.addEventListener('click', onControlClick);
  window.addEventListener('keydown', onControlKey);
  refs.body.style.overflow = 'hidden';
};

function onControlClick(event) {
  if (event.target.classList.value === 'modal__backdrop') {
    closeModalWindow();
  }
  return;
};

function onControlKey(event) {
  if (refs.modalWindow.classList.value.includes('is-open')) {
    if (event.keyCode === 27) {
      closeModalWindow();
    };
  }
};

function closeModalWindow() {
  refs.modalWindow.classList.remove('is-open');
  setTimeout(function () {
    document.querySelector('.image').src = ''
  }, 150)
  refs.body.style.overflow = '';
  document.querySelector('.frame__container').innerHTML = '';
  //finder.searchReset();
  // ()===== Испарвил баг, когда закрывалась подалка на долю секунды картинка прыгала, сейчас все нормально()====
};
// ================= конец открытие/закрытие модалки =================

function renderCardsList(movie) {
  if (movie.length === 0) {
    refs.errors.lastElementChild.classList.remove('hidden');
  }
  refs.galleryList.innerHTML = mainCards(movie);
};
