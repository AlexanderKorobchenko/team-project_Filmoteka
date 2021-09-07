import { includes } from 'lodash';
import moviesCard from '../templates/test.hbs';
import ApiService from './apiService.js';
const refs = {
  galleryList: document.getElementById('gallery'),
  movieModal: document.querySelector('#modal-window'),
  modalButton: null,

  // openModalBtn: document.querySelector('[data-modal-open]'),
  // closeModalBtn: document.querySelector('[data-modal-close]'),
  // modal: document.querySelector('[data-modal]'),
}
let movieId = null;
const finder = new ApiService();



finder.searchType = 2;

refs.galleryList.addEventListener('click', openMovieCard);

function openMovieCard(e) {
  finder.searchRequest = e.target.offsetParent.id;
  finder.searchType = 2;
  refs.movieModal.classList.add('is-open');
  finder.searchMovies()
    .then((data) => {
      const markup = moviesCard(data);
      refs.movieModal.innerHTML = markup;
      
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

      function setTextContent() {

        
      }
     
    })
    .then(() => {
      refs.modalButton = document.querySelector(".close__button");
      refs.modalButton.addEventListener('click', closeMovieCard);
    })
    .catch(err => console.log(err));
    // refs.modalButton.addEventListener('click', onClickmovieModal)
  }
function closeMovieCard() {
  console.log(1)
  refs.modalButton.removeEventListener('click', closeMovieCard);
  refs.movieModal.classList.remove('is-open');
}



// function onClickmovieModal()  {
//   refs.movieModal.style.display = "none";
// }


// refs.galleryList.addEventListener('click', toggleModal);
// refs.closeModalBtn.addEventListener('click', toggleModal);

// function toggleModal() {
//   refs.modal.classList.toggle('is-hidden');
// }

