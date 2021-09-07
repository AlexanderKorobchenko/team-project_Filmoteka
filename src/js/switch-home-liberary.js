/*
1. На кнопку My Library в хедере вешается слушатель событий по клику и вызывается функция (это будет делать Саша +
 она создаст эту функцию, которая прячет инпут и выводит твои кнопки, используй эту функцию). Эта функция выполняет следуйщие действия:
 - переводит кнопку Watched, в состояние enable
 - переводит кнопку Queue в состояние disable
 - очищает мейн
 - рендерит карточки с локолстореджа с массива watched.

2. На кнопки Watched, Queue вешается слушатель событий (скорее всего внутри функции выше)

3. При нажатии на кнопку Queue:
 - переводит кнопку Watched, в состояние disable
 - переводит кнопку Queue в состояние enable
 - очищает мейн
 - рендерит карточки с локолстореджа с массива Queue

4. При нажатии на кнопку Watched:
 - переводит кнопку Watched, в состояние enable
 - переводит кнопку Queue в состояние disable
 - очищает мейн
 - рендерит карточки с локолстореджа с массива Watched:
*/

const href = {
    logoBtn: document.getElementById('logo-home'),
    homeBtn: document.getElementById('btn-home'),
    libraryBtn: document.getElementById('btn-library'),
    search: document.getElementById('search-form'),
    library: document.getElementById('liberary'),
    backgroundHome: document.querySelector('.background'),
    backgroundLibrary: document.querySelector('.background-library')
}

// переключение между страницами
href.logoBtn.addEventListener('click', onGoHome);
href.homeBtn.addEventListener('click', onGoHome);
href.libraryBtn.addEventListener('click', onGoLibrary);

function onGoHome(event) {
    event.preventDefault();

    href.backgroundHome.classList.remove('hidden');
    href.backgroundLibrary.classList.add('hidden');

    href.libraryBtn.classList.remove('navigation__btn-current');
    href.homeBtn.classList.add('navigation__btn-current');

    href.search.classList.remove('hidden');
    href.library.classList.add('hidden');

    //рендер текущей страници
};

function onGoLibrary(event) {
    event.preventDefault();

    href.backgroundLibrary.classList.remove('hidden');
    href.backgroundHome.classList.add('hidden');

    href.homeBtn.classList.remove('navigation__btn-current');
    href.libraryBtn.classList.add('navigation__btn-current');

    href.library.classList.remove('hidden');
    href.search.classList.add('hidden');

    let switchLibrary = Boolean(localStorage.getItem('checkBoxLibrary'));

    if (!switchLibrary) {
        showWatched();
    }

    if (switchLibrary) {
        showQueue();
    }
};

//переключение между библиотеками
href.library.firstElementChild.addEventListener('click', onClickWathed);
href.library.lastElementChild.addEventListener('click', onClickQueue);

function onClickWathed() {
    localStorage.setItem('checkBoxLibrary', '');
    showWatched();
};

function onClickQueue() {
    localStorage.setItem('checkBoxLibrary', 'queue');
    showQueue();
};

function showWatched() {
    href.library.firstElementChild.classList.add('liberary__btn-current');
    href.library.lastElementChild.classList.remove('liberary__btn-current');
    //рендер библиотеки watched;
};

function showQueue() {
    href.library.lastElementChild.classList.add('liberary__btn-current');
    href.library.firstElementChild.classList.remove('liberary__btn-current');
    //рендер библиотеки Queue;
};