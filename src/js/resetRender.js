import moviesList from '../templates/main-cards.hbs';

const galleryList = document.getElementById('gallery');

 function renderMoviesList(movie) {
  const markup = moviesList(movie);
  galleryList.innerHTML = markup;
}

 function clearGalleryContainer() {
  galleryList.innerHTML = '';
}

export default { renderMoviesList, clearGalleryContainer };