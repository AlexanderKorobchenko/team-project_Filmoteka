import moviesCard from '../templates/modal-window.hbs';
import ApiService from './apiService.js';
const refs = {
  galleryList: document.getElementById('gallery'),
  movieModal: document.querySelector('.movie__modal'),
  modalButton: null,

  // openModalBtn: document.querySelector('[data-modal-open]'),
  // closeModalBtn: document.querySelector('[data-modal-close]'),
  // modal: document.querySelector('[data-modal]'),
}
let movieId = null;
const finder = new ApiService();
finder.searchType = 2;

refs.galleryList.addEventListener('click', onClickgalleryList);

function onClickgalleryList(e) {
  finder.MovieCardId = e.target.offsetParent.id;
  finder.searchType = 2;
  finder.searchMovieCard()
    .then((data) => {
      const markup = moviesCard(data);
      refs.movieModal.innerHTML = markup;
    })
    .then(() => {
      refs.movieModal.style.display = "block";
      // refs.modalButton = document.querySelector(".modal__button");
    })
    .catch(err => console.log(err));    
  // console.log(refs.modalButton);
  // refs.modalButton.addEventListener('click', onClickmovieModal)
}



// function onClickmovieModal()  {
//   refs.movieModal.style.display = "none";
// }


// refs.galleryList.addEventListener('click', toggleModal);
// refs.closeModalBtn.addEventListener('click', toggleModal);

// function toggleModal() {
//   refs.modal.classList.toggle('is-hidden');
// }

