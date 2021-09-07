import moviesCard from '../templates/test.hbs';
import ApiService from './apiService.js';
import modalMechanics from './modal-mechanics.js';

const refs = {
  galleryList: document.getElementById('gallery'),
  modalButton: null,
}

const finder = new ApiService();
const tool = new modalMechanics();

refs.galleryList.addEventListener('click', openMovieCard);

function openMovieCard(e) {
  if(e.target.nodeName === 'UL') {return}
  finder.searchRequest = e.target.offsetParent.id;
  finder.searchType = 2;
  finder.searchMovies()
  .then((data) => {
    tool.setMovieData = moviesCard(data);
    tool.openModal();
    console.log()
  })
  .then(() => {
    // refs.modalButton = document.querySelector(".close__button");
    // refs.modalButton.addEventListener('click', closeMovieCard);
  })
  .catch(err => console.log(err));
  }

