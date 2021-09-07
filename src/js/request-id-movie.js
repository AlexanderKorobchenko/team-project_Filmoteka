import moviesCard from '../templates/test.hbs';
import ApiService from './apiService.js';

const refs = {
  galleryList: document.getElementById('gallery'),
  modalWindow: document.querySelector('#modal-window'),
}

const finder = new ApiService();

refs.galleryList.addEventListener('click', onSearchID);

function onSearchID(e) {
  if(e.target.nodeName === 'UL') {return}
  finder.searchRequest = e.target.offsetParent.id;
  finder.searchType = 2;
  finder.searchMovies()
    .then((data) => {
      refs.modalWindow.innerHTML = moviesCard(data);
      openModalWindow();

      //вынести в новую функцию ниже
      const watchBtn = document.querySelector('.btn__watch');
      const popularFilm = JSON.parse(localStorage.getItem('Popular'));
      
      watchBtn.addEventListener('click', onWatch);
      watchBtn.addEventListener('click', setTextContent);

      // const arr = JSON.parse(localStorage.getItem('watched'));
      // if (arr === null) {
      //   localStorage.setItem('watched', JSON.stringify([]));
      // }
      // console.log(arr)
      
      function onWatch() {

        const filteredFilm = popularFilm.filter((film) => {
               
          if (Number(film.id) === Number(e.target.offsetParent.id)) {
            console.log(film.id)
            
            return film;
          }
        });

        var a = [];
        a = JSON.parse(localStorage.getItem('watched')) || [];
        a.push(filteredFilm);

        console.log(a);
        localStorage.setItem('watched', JSON.stringify(a));
      }

      function setTextContent() {}
     
    })
    .then(() => {
      refs.modalButton = document.querySelector(".close__button");
      refs.modalButton.addEventListener('click', closeMovieCard);
    })
    .catch(err => console.log(err));
};

// ================= начало открытие/закрытие модалки =================
function openModalWindow() {
  refs.modalWindow.classList.add('is-open'); //показали модалку
  document.querySelector(".close__button").addEventListener('click', closeModalWindow);
  refs.modalWindow.addEventListener('click', onControlClick);
  window.addEventListener('keydown', onControlKey);
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
  document.querySelector('.image').src = '';
};
// ================= конец открытие/закрытие модалки =================