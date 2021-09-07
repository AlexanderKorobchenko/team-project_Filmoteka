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

      getIncludesFilms(e.target.offsetParent.id);

      function getIncludesFilms(id) {
        console.log(id)
        const arrayPopFilm = localStorage.getItem('watched');
        
        if (arrayPopFilm.includes(id)) {
          watchBtn.textContent = 'Delete from watched';
        };

        if (!arrayPopFilm.includes(id)) {
          watchBtn.textContent = 'Add to watched';
        }
        console.log(arrayPopFilm.includes(id))
      }
      
      watchBtn.addEventListener('click', onWatch);
     
      function onWatch(event) {
        console.log(+event.target.dataset.id)

        if (event.target.innerHTML === 'Delete from watched') {
          // Функция удаления карточки с фильмомо из библиотеки
          const arrObjectWatch = JSON.parse(localStorage.getItem('watched'));
          let indx = null;
          for (let i = 0; i < arrObjectWatch.length; i +=1){
            if (+arrObjectWatch[i].id === +event.target.dataset.id) {
              console.log('Совпало')
              console.log(arrObjectWatch[i])
               indx = i;
            }
          }
          console.log(indx)
          const deletedWatch = arrObjectWatch.splice(indx, 1);
          console.log(deletedWatch)
          console.log(arrObjectWatch)
         
        };

        if (event.target.innerHTML === 'Add to watched') {

          const filteredFilm = popularFilm.filter((film) => {
               
          if (+film.id === +event.target.dataset.id) {
            console.log(film.id)
            
            return film;
          }
        });

        let a = [];
        a = JSON.parse(localStorage.getItem('watched')) || [];
        a.push(filteredFilm[0]);

        console.log(a);
        localStorage.setItem('watched', JSON.stringify(a));
        watchBtn.textContent = 'Delete from watched';
        };

        
      }

     
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