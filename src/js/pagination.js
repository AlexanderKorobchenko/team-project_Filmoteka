import paginationTmp from '../templates/paginationTmp.hbs';
import paginationTmplMobile from '../templates/paginationTmplMobile.hbs';

// import ApiService from './apiService.js';

// const finder = new ApiService();
// finder.searchType = 0;

window.onload = creatPagination();
window.addEventListener("resize", screenWidthWindow);

const refs = {
    buttonForDesktop: document.querySelectorAll('.pagination_mobile-out'),
    toRightEl: document.querySelector('.pagination_right'),
    toLeftEl: document.querySelector('.pagination_left'),
    firstBtnEl: document.querySelector('.pagination_first'),
    endBtnEl: document.querySelector('.pagination_end'),
    btnToStartEl: document.getElementById('3'),
    btnToEndEl: document.getElementById('7'),
    btn8El: document.getElementById('8'),
    btn2El: document.getElementById('2'),
    btn5El: document.getElementById('5'),
}

function creatPagination() {                            //создает разметку кнопок пагинации
    
    const paginationEl = document.createElement('div');
    paginationEl.className = 'pagination';

    if (document.documentElement.clientWidth > 768) {  //прим. шаблон в зависимости от ширины окна
        paginationEl.innerHTML = paginationTmp();
    } else {
        paginationEl.innerHTML = paginationTmplMobile();
    }
    
    document.querySelector(".main").appendChild(paginationEl);    
}

function screenWidthWindow() {                          //в зависимости от ширина окна изменяет кол-во кнопок  
    if (window.matchMedia("(min-width: 768px)").matches) {
        onAddButton()
    } else {
        onRemoveButton()        
    }
}

function onAddButton() {
   refs.buttonForDesktop.forEach((button) => {
       button.classList.remove('visually-hidden');    
        }) 
}

function onRemoveButton() {
    refs.buttonForDesktop.forEach((button) => {
            button.classList.add('visually-hidden')
        })
}

// ======== Пагинация ========
let pagesTotal = 21;                                           // total.pages from API

let pagesEl = document.querySelectorAll('.pagination_item');    //кнопки пагинации   

const onGetClearButton = function () {      // кнопки доступные для записи номеров страниц
    
    if (window.matchMedia("(min-width: 768px)").matches) {

    let clearButton = 9;
        return clearButton;
        
    } else {

      let clearButton = 5;   
    return clearButton;
    }
}

onWritesPageNumbers()

function onWritesPageNumbers() {        // записывает  при рендере номера страниц в кнопки

    let clearButton = onGetClearButton()
         
    if (pagesTotal === clearButton) {       // если страниц =  9     
        for (let i = 1; i <= pagesTotal; i++) {
            pagesEl[i].textContent = i;                    
        }            
    }
    
    if (pagesTotal < clearButton) {             // если страниц меньше 9          
        for (let i = 1; i <= pagesTotal; i++) {
            pagesEl[i].textContent = i;           
        }
        for (let i = pagesTotal + 1; i <= clearButton; i++) {
            pagesEl[i].classList.add('visually-hidden');
            
        }                
    }
    
    if (pagesTotal > clearButton) {           // если страниц больше 9
        console.log(clearButton)
        if (clearButton === 9) {
            for (let i = 1; i <= clearButton - 2; i++) {
                pagesEl[i].textContent = i;
                pagesEl[clearButton - 1].textContent = '...';
                pagesEl[clearButton].textContent = pagesTotal;
            }
        } else {
            for (let i = 1; i <= clearButton; i++) {
                pagesEl[i].textContent = i;
            }
        }
    }

    if (pagesTotal === 1) {           // если страниц 1

        pagesEl[0].classList.add('visually-hidden');
        pagesEl[1].textContent = 1;   
        for (let i = 2; i <= clearButton+1; i++) {        
                           
            pagesEl[i].classList.add('visually-hidden');
        }
        
    }

    if (pagesTotal === 0) {           // если страниц 0
        
        for (let i = 0; i <= clearButton+1; i++) {            
                             
            pagesEl[i].classList.add('visually-hidden');
        }
        
    }
}

pagesEl.forEach(function (page) {        // кнопки с ... не активные

    if (page.innerHTML === "...") {      
        onDisabledButton(page)
    } 
})

function onDisabledButton(page) {            // деактивация кнопок
    page.classList.add('disabled');
    page.classList.add('pagination_disabled');
}

function onSwitchButton(page) {            // активация кнопок
    page.classList.remove('disabled');
    page.classList.remove('pagination_disabled');
}

function onOpacitybutton(page) {                    // opacity кнопок
    page.classList.add('pagination_opacity');
}

function onDeactivateOpacitybutton(page) {           // убрать opacity кнопок
    page.classList.remove('pagination_opacity');
}



pagesEl.forEach(function(page) {     
    page.addEventListener('click', function () { onCurrentPage(this) }); //навигация по клику
    page.addEventListener('click', onChangeNumberPage);                   //навигация стрелками
    page.addEventListener('click', function () {onSurfNumberPage(this) }); //навигация со смещением > 10 pages
});

let currentPage = document.querySelector('.pagination_current'); 

function getsPageNumber(currentPage) {                 // pageNumber -  номер страницы для fetch запроса
    
    let pageNumber = +currentPage.textContent;       
    console.log(pageNumber)
        
     }    

function onCurrentPage(page) {
    
    if (!isNaN(+page.textContent)) {
        
        onchangeCurrentPage(page)
        getsPageNumber(currentPage)
        
        onDeactivateOpacitybutton(refs.toRightEl)
        onSwitchButton(refs.toRightEl)

        onDeactivateOpacitybutton(refs.toLeftEl)
        onSwitchButton(refs.toLeftEl)
    }

    if (+page.textContent === pagesTotal) {
    
        page = refs.toRightEl;        
        onOpacitybutton(page) 
        onDisabledButton(page)
        
        
    }

    if ((+page.textContent === 1)) {
        
        page = refs.toLeftEl;
        
        onOpacitybutton(page) 
        onDisabledButton(page)
    }  
    
}

function onSurfNumberPage(page) {

    let indexPage = +page.textContent;

    let clearButton = onGetClearButton()

  
    if (indexPage === pagesTotal && pagesTotal > clearButton && clearButton === 9) {  //клик на последнюю больше 9 для desk

        firstAndSecondButtonOnSurf()

        let endIndexPage = pagesTotal;

             for (let i = 8; i >= 3; i -= 1) {                 
               
                 endIndexPage -= 1;
                 pagesEl[i].textContent = endIndexPage ;                
        }
        
        removeCurrentClass()

        onSwitchButton(refs.btn8El)
        onDisabledButton(refs.btn2El)

        refs.endBtnEl.classList.add('pagination_current');        
        currentPage = refs.endBtnEl;
    }
  
    if (indexPage === 1 && pagesTotal > 9 && clearButton === 9) {       //клик на первую for desk
        
        endButtonsOnSurf()
        
             for (let i = 1; i <= 7; i += 1) {        
               
                 pagesEl[i].textContent = i ;
                 pagesEl[i].classList.remove('pagination_current');
        }
        
        onSwitchButton(refs.btn2El)
        onDisabledButton(refs.btn8El)

        refs.firstBtnEl.classList.add('pagination_current');
        currentPage = refs.firstBtnEl;
    }


    if ((indexPage === 7 && pagesTotal===10 && page === refs.btnToEndEl)) { // если 10 страниц вправо  переписываются кнопки       
       
    
    firstAndSecondButtonOnSurf()

    for (let i = 3; i <= pagesTotal-1; i++) {
        pagesEl[i].textContent = i+1;                    
    }
    onSwitchButton(refs.btn8El);
    onDisabledButton(refs.btn2El);
        
    refs.btnToEndEl.classList.remove('pagination_current');
    document.getElementById('6').classList.add('pagination_current');
    currentPage = document.getElementById('6');      
        
    }

    if ((indexPage === 4 && pagesTotal===10 && clearButton === 9 && page === refs.btnToStartEl)) {// если 10 страниц влево  переписываются кнопки       
        
                for (let i = 1; i <= clearButton-2; i++) {
            pagesEl[i].textContent = i;          
            endButtonsOnSurf()
        }

        onSwitchButton(refs.btn2El);
        onDisabledButton(refs.btn8El);

        refs.btnToStartEl.classList.remove('pagination_current');
        document.getElementById('4').classList.add('pagination_current');
        currentPage = document.getElementById('4');
       
    } 
    
     if ( (pagesTotal > 10) && (page === refs.btnToEndEl)) {     // если больше 10 страниц  вправо переписываются кнопки       
        
         let containtButton7 = +refs.btnToEndEl.textContent
    
         firstAndSecondButtonOnSurf()
         
         onDisabledButton(refs.btn2El); 
        
         let deltaForCurrentIdRight = pagesTotal - containtButton7;
         
         if (deltaForCurrentIdRight > 5 ) {
             for (let i = 3; i <= 7; i += 1) {
                 indexPage += 1;
                 pagesEl[i].textContent = indexPage - 3;
             }

             refs.btnToEndEl.classList.remove('pagination_current');
             refs.btn5El.classList.add('pagination_current');
             currentPage = refs.btn5El;            
            
         } else {
           
             onSwitchButton(refs.btn8El);

             let endIndexPage = pagesTotal;

             for (let i = 8; i >= 3; i -= 1) {                 
               
                 endIndexPage -= 1;
                 pagesEl[i].textContent = endIndexPage ;                 
             }

             refs.btnToEndEl.classList.remove('pagination_current');

             if (deltaForCurrentIdRight === 4) {
                 
                 refs.btn5El.classList.add('pagination_current');
                 currentPage = refs.btn5El;

             } else {
                 
                 document.getElementById('4').classList.add('pagination_current');
                 currentPage = document.getElementById('4');
             }
         }
    }

    if ((pagesTotal > 10) && (page === refs.btnToStartEl) && clearButton === 9 ) {     // если больше 10 страниц  влево переписываются кнопки  for desk    
        
        let containButton3 = +refs.btnToStartEl.textContent
        let deltaForCurrentIdLeft = containButton3 -1;
   
        endButtonsOnSurf()
        
         onDisabledButton(refs. btn8El);         
      
        if (deltaForCurrentIdLeft > 3) {
            
            for (let i = 7; i >= 3; i -= 1) {

                indexPage -= 1;
                pagesEl[i].textContent = indexPage + 3;
            }

            refs.btnToStartEl.classList.remove('pagination_current');
            refs.btn5El.classList.add('pagination_current');
            currentPage = refs.btn5El;
            onDisabledButton(refs.btn2El);        

        } else {
           
            for (let i = 1; i <= 7; i++) {                                           //это для первых страниц
               
                pagesEl[i].textContent = i;
            
            }

            refs.btn5El.classList.remove('pagination_current');
             refs.btnToStartEl.classList.add('pagination_current');
             currentPage = refs.btnToStartEl;
            onSwitchButton(refs.btn2El);

             if (deltaForCurrentIdLeft === 3) {
            
                 refs.btnToStartEl.classList.remove('pagination_current');
                 document.getElementById('4').classList.add('pagination_current');
                 currentPage = document.getElementById('4');
             } 
        }
       
    }    
    
    if (clearButton === 5 && page === refs.btn5El) {   //mobile to the right
       
        let containtButton5 = +refs.btn5El.textContent;
        let deltaForCurrentIdRight = pagesTotal - containtButton5;
            
         
        if (deltaForCurrentIdRight > 1) {
             
            for (let i = 1; i <= 5; i += 1) {
                indexPage += 1;
                pagesEl[i].textContent = indexPage - 3;
            }
            refs.btn5El.classList.remove('pagination_current');
            refs.btnToStartEl.classList.add('pagination_current');
            currentPage = refs.btnToStartEl;
            
        }
    }
    if (clearButton === 5 && page === refs.firstBtnEl) {   //mobile to the left
       
        let containtButton5 = +refs.firstBtnEl.textContent;
        let deltaForCurrentIdRight = containtButton5 - 1;     
            
         
        if (deltaForCurrentIdRight > 1) {
             
             for (let i = 5; i >= 1; i -= 1) {
                 indexPage -= 1;
                 pagesEl[i].textContent = indexPage + 3;
             }
             refs.firstBtnEl.classList.remove('pagination_current');
             refs.btnToStartEl.classList.add('pagination_current');             
             currentPage = refs.btnToStartEl;         
            
         }            
    }           
}



function removeCurrentClass() {                 // удаляет класс current for oll
    
    pagesEl.forEach(function (page) {
    page.classList.remove('pagination_current');
})
}

function firstAndSecondButtonOnSurf() {   //первая и вторая при трансформации
    pagesEl[1].textContent = 1;
    pagesEl[2].textContent = '...';
}

function endButtonsOnSurf() {                   //две последние при трансформации  
    let clearButton = onGetClearButton()
    pagesEl[clearButton-1].textContent = '...';
    pagesEl[clearButton].textContent = pagesTotal;
}

function onchangeCurrentPage(page) {   // фиксирует currentPage
  
    currentPage.classList.remove('pagination_current');
    currentPage = page;        
    currentPage.classList.add('pagination_current');
}



 //ЕЕ НЕ АКТИВНО  стрелками передвижение
pagesEl.forEach(function(page) {     
    
    page.addEventListener('click', function () {onGoByArrow(this) });                   //навигация стрелками
   
});

function onGoByArrow(page) {         //ЕЕ НЕ АКТИВНО  стрелками передвижение
    
    
    onDisabledButton(refs.toRightEl);
    onDisabledButton(refs.toLeftEl);
    
    
}