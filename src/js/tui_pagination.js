import ApiService from './apiService';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import moviesList from '../templates/main-cards.hbs';
import objectTransformations from './objectTransformations.js';


const finder = new ApiService();

const container = document.getElementById('tui-pagination-container');
const galleryList = document.getElementById('gallery');

let totalMoviesFound = Number(localStorage.getItem('TotalPagesInLastSearchResult')) * 20;

const options = {
  totalItems: totalMoviesFound,
  itemsPerPage: 20,
  visiblePages: 7,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const pagination = new Pagination(container, options);

container.addEventListener('click', onClick);
function onClick(e) {
  console.log(pagination.getCurrentPage());
  onPagination(pagination.getCurrentPage());
}


function onPagination(pageNumber) {
  finder.pageNumber = pageNumber;
  finder.searchType = localStorage.getItem('LastSearchIndex');
  finder.searchRequest = localStorage.getItem('LastQuery');
  let pagesTotal = localStorage.getItem('TotalPagesInLastSearchResult');

  finder
    .searchMovies()
    .then(({ results }) => {

      return objectTransformations(results);
    })
    .then(data => {
      renderMoviesList(data);
      window.scrollTo(0, 230);
      return data;
    })
    .then(data => localStorage.setItem('LastSearchResults', JSON.stringify(data)))
    .catch(err => console.log(err));
}
function renderMoviesList(movie) {
  const markup = moviesList(movie);
  galleryList.innerHTML = markup;
}



