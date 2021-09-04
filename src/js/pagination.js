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
            button.classList.remove('visually-hidden')
        }) 
}

function onRemoveButton() {
    buttonForDesktop.forEach((button) => {
            button.classList.add('visually-hidden')
        })
}



