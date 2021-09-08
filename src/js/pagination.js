import paginationTmp from '../templates/paginationTmp.hbs';
import paginationTmplMobile from '../templates/paginationTmplMobile.hbs';
import moviesList from '../templates/main-cards.hbs';
import ApiService from './apiService.js';
import menuTemplate from '../templates/genres-menu.hbs';
import objectTransformations from './objectTransformations.js';

const finder = new ApiService();
const galleryList = document.getElementById('gallery');
const genresMenuRef = document.querySelector('#genres_menu');


window.onload = creatPagination();
window.addEventListener("resize", screenWidthWindow);

const buttonForDesktop = document.querySelectorAll('.pagination_mobile-out');

function creatPagination() {              //создает разметку
    
    const paginationEl = document.createElement('div');
    paginationEl.className = 'pagination';

    if (document.documentElement.clientWidth > 768) { //прим. шаблон в зависимости от ширины окна
        paginationEl.innerHTML = paginationTmp();
    } else {
        paginationEl.innerHTML = paginationTmplMobile();
    }
    
    document.querySelector(".main").appendChild(paginationEl);    
}

function screenWidthWindow() {       //в зависимости от ширина окна изменяет кол-во кнопок  
    if (window.matchMedia("(min-width: 768px)").matches) {
        onAddButton()
    } else {
        onRemoveButton()        
    }
}

function onAddButton() {
   buttonForDesktop.forEach((button) => {
       button.classList.remove('visually-hidden');    
        }) 
}

function onRemoveButton() {
    buttonForDesktop.forEach((button) => {
            button.classList.add('visually-hidden')
        })
}

// Проба пагинации===================================================

let pagesEl = document.querySelectorAll('.pagination_item'); //кнопки пагинации

let pagesTotal = localStorage.getItem('TotalPagesInLastSearchResult');
    // JSON.parse(localStorage.getItem('LastSearchResults')); // total.pages from API

let clearButton = pagesEl.length - 2;// 9 кнопок для записи страниц

onWritesPageNumbers();

 export function onWritesPageNumbers() { // записывает номера страниц в кнопки
            
    if (pagesTotal === clearButton) {            
        for (let i = 1; i <= pagesTotal; i++) {
              pagesEl[i].textContent = i;
        }            
    }
    
    if (pagesTotal < clearButton) {                     
        for (let i = 1; i <= pagesTotal; i++) {
          pagesEl[i].textContent = i;                    
        }
        for (let i = pagesTotal + 1; i <= clearButton; i++) {
            pagesEl[i].classList.add('visually-hidden');
        }                
    }
    
    if (pagesTotal > clearButton) {
        for (let i = 1; i <= clearButton-2; i++) {
            pagesEl[i].textContent = i;
            pagesEl[clearButton-1].textContent = '...';
            pagesEl[clearButton].textContent = pagesTotal;
        }
    }
}

pagesEl.forEach(function(page) { 
    page.addEventListener('click', getsPageNumber);   
});


function getsPageNumber() {// получает номер страницы для fetch запроса
    
  let pageNumber = +this.innerHTML;//надо отправить в fetch, получить новый массив и зарендерить
    console.log(pageNumber);
    finder.pageNumber = pageNumber;
    onPagination();
}
// еще сделать надо для mobile
// еще сделать навесить current

// навешиваю события на кнопки
// pagesEl[0].addEventListener('click', onPagination);


function onPagination(e) {
  // finder.searchReset();
  finder.searchType = localStorage.getItem('LastSearchIndex');
  pagesTotal = localStorage.getItem('TotalPagesInLastSearchResult');
      onWritesPageNumbers();

  finder
    .searchMovies()
    // .then(res => {
    //     pagesTotal = res.total_pages;
    //     onWritesPageNumbers();
    //   return res;
    // })
    .then(({ results }) => {
      //   createGenresMenu();

      return objectTransformations(results);
    })
    .then(data => {
      renderMoviesList(data);
      return data;
    })
    .then(data => localStorage.setItem('LastSearchResults', JSON.stringify(data)))
    .catch(err => console.log(err));
}
function renderMoviesList(movie) {
  const markup = moviesList(movie);
  galleryList.innerHTML = markup;
}
// function createGenresMenu() {
//   const genresArray = JSON.parse(localStorage.getItem('Genres'));
//   genresArray.unshift({ id: '', name: 'none' });
//   genresMenuRef.insertAdjacentHTML('beforeend', menuTemplate(genresArray));
// }
