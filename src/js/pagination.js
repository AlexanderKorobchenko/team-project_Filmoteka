import paginationTmp from '../templates/paginationTmp.hbs';
import paginationTmplMobile from '../templates/paginationTmplMobile.hbs';
// import './pagination-surf';

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
    //    li.classList.remove('visually-hidden')
        }) 
}

function onRemoveButton() {
    buttonForDesktop.forEach((button) => {
            button.classList.add('visually-hidden')
        })
}
// Проба пагинации===================================================
import './pagination-surf';
const gallery = document.querySelector('#gallery');//куда рендерим картинки
const pagination = document.querySelector('.pagination_container');
let pagesEl = document.querySelectorAll('.pagination_item'); //кнопки пагинации
let pagesSurfEl = document.querySelectorAll('.pagination_surf');
console.log(pagesEl.length)
console.log(pagesSurfEl)
console.log(pagesEl[0])

// const pageEnd = document.querySelector('.pagination_end');
const pageEnd = document.querySelector('#btn9');
const page2 = document.querySelector('#btn2');
const page3 = document.querySelector('#btn3');
// console.log(pageEnd)
let pagesTotal = 6 // total.pages from API

// pageEnd.textContent = pagesTotal// записали последнюю кнопку
let clearButton = pagesEl.length - 2;
console.log(clearButton)// 9 кнопок для записи страниц
onWritesPageNumbers()

function onWritesPageNumbers() { // записывает номера страниц в кнопки
    
    for (let page of pagesSurfEl) {
        
        if (pagesTotal <= clearButton) {
            for (let i = 1; i <= pagesTotal; i++) {
                pagesEl[i].textContent = i;
                // console.log(page.textContent)
            }
        }
        if (pagesTotal < clearButton) {
            for (let i = 1; i <= pagesTotal; i++) {
                pagesEl[i].textContent = i;
                // console.log(page.textContent)
                console.log(pagesEl[pagesTotal]);
                // for (let j = pagesTotal + 1; j <= clearButton; i++) {
                //     pagesEl[j].classList.add('visually-hidden');
                // }
            }
            // console.log(clearButton - pagesTotal)
            // // let excessButtons = clearButton - pagesTotal // количество нnpm run devенужных кнопок
            // // console.log(excessButtons)

            // if (page.textContent = '0') {
            //     console.log(page.textContent)
            // }
        //     buttonForDesktop.forEach((button) => {
        //     button.classList.add('visually-hidden')
        // })
        }
    }
}

pagesEl.forEach(function(element) {
    // console.log(element.textContent);
//     for (let i = 2; i <= (pagesTotal - 1); i++) {
//         element.textContent = i
// }
});

function test2() {    
    let pageNumber = +this.innerHTML;//надо отправить в fetch, получить новый массив и зарендерить
    console.log(pageNumber)
} 


for (let page of pagesEl) {
    page.addEventListener('click', test)
}

function test() {
    console.log('test')
    let pageNumber = +this.innerHTML;//надо отправить в fetch, получить новый массив и зарендерить
    console.log(pageNumber)
}


// const pagesFromApi = []// создаем массив номеров кнопок из API
// console.log(pagesFromApi)
// for (let i = 1; i <= pagesTotal; i++) {
//    pagesFromApi.push(i);
// }
// console.log(pagesFromApi)


// pageEnd.textContent = pagesTotal// записали последнюю кнопку
// page2.textContent = pagesFromApi[8]// записали последнюю кнопку

// for (let page of pagesEl) {
//    test1()
// }

// function test1(pagesEl) {
//     for (let i = 1; i <= pagesTotal; i++) {
//     page.textContent = i;
// }
//     // page.textContent = i;
//     // page.textContent = pagesFromApi[8]
//     // console.log('test')
//     let pageNumber = +this.innerHTML;//надо отправить в fetch, получить новый массив и зарендерить
//     console.log(pageNumber)
// } 
// for (let page of pagesEl) {
//     page.addEventListener('click', test2)
//     // console.log(page)
// }

// function test2() {    
//     let pageNumber = +this.innerHTML;//надо отправить в fetch, получить новый массив и зарендерить
//     console.log(pageNumber)
// } 


// for (let page of pagesEl) {
//     page.addEventListener('click', test)
// }

// function test() {
//     console.log('test')
//     let pageNumber = +this.innerHTML;//надо отправить в fetch, получить новый массив и зарендерить
//     console.log(pageNumber)
// }
