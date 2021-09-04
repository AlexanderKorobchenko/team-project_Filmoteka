import paginationTmp from '../templates/paginationTmp.hbs'

function creatPagination() {
    console.log('pagination to start')
    const paginationEl = document.createElement('div');
    paginationEl.className = 'pagination';
    paginationEl.innerHTML = paginationTmp();
    document.querySelector(".main").appendChild(paginationEl);
}

creatPagination()

import ApiService from './apiService.js';
const finder = new ApiService();
// finder.searchType = 0;
console.log(finder.pageNumber)
// function popularMovies1() {
// //   clearGalleryContainer();

//   finder.searchReset();

//   finder
//     .searchMovies()
//     .then(response => {
//       renderMoviesList(response);
//       console.log(response);
//     })
//     .catch(err => console.log(err));
// }

// popularMovies1();