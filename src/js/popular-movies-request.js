import moviesList from '../templates/test-card-netrogaty.hbs';
import API from './apifetchTest.js';

const galleryList = document.getElementById('gallery');

function renderMoviesList(movie) {
  const markup = moviesList(movie);
  galleryList.innerHTML = markup;
}

API.fetchMovies()
  .then(response => {
    renderMoviesList(response);
    console.log(response);
  })
  .catch(err => console.log(err));

//   Первоначальный код
