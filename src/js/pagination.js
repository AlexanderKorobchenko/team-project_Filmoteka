import paginationTmp from '../templates/paginationTmp.hbs';
import paginationTmplMobile from '../templates/paginationTmplMobile.hbs';

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

let pagesTotal = 1000 // total.pages from API

let clearButton = pagesEl.length - 2;// 9 кнопок для записи страниц
// console.log(clearButton)
onWritesPageNumbers()

function onWritesPageNumbers() { // записывает номера страниц в кнопки
            
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
    console.log(pageNumber)    
}
// еще сделать надо для mobile
// еще сделать навесить current

// навешиваю события на кнопки
pagesEl[0].addEventListener('click', onPagination);

function onPagination(e) {

}