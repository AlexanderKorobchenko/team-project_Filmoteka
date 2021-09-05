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

refs.galleryList.addEventListener('click', onClickgalleryList);

function onClickgalleryList(e) {
  finder.searchRequest = e.target.offsetParent.id;// THIS LINE WAS MODIFIED BY VLAD OTRISHKO
  console.log(e.target.offsetParent.id);
  finder.searchType = 2;
  refs.movieModal.classList.add('is-open');
  // finder.searchMovieCard()
  finder.searchMovies()//----------------------THIS LINE WAS MODIFIED BY VLAD OTRISHKO
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

