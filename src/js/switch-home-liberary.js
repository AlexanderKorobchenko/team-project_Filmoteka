import moviesList from '../templates/main-cards.hbs';

const href = {
    logoBtn: document.getElementById('logo-home'),
    homeBtn: document.getElementById('btn-home'),
    libraryBtn: document.getElementById('btn-library'),
    search: document.getElementById('search-form'),
    library: document.getElementById('liberary'),
    backgroundHome: document.querySelector('.background'),
    backgroundLibrary: document.querySelector('.background-library'),
    galleryList: document.getElementById('gallery'),
}

// переключение между страницами
href.logoBtn.addEventListener('click', onGoHome);
href.homeBtn.addEventListener('click', onGoHome);
href.libraryBtn.addEventListener('click', onGoLibrary);

function onGoHome(event) {
    event.preventDefault();
    clearGalleryList();

    href.backgroundHome.classList.remove('hidden');
    href.backgroundLibrary.classList.add('hidden');

    href.libraryBtn.classList.remove('navigation__btn-current');
    href.homeBtn.classList.add('navigation__btn-current');

    href.search.classList.remove('hidden');
    href.library.classList.add('hidden');

    //рендер текущей страници
    const currentPageArray = JSON.parse(localStorage.getItem('Popular'));//пока используем популярные
    //console.log(currentPageArray)
    renderMoviesList(currentPageArray);
    //console.log('рендер разметки с LocalStorage');
};

function onGoLibrary(event) {
    event.preventDefault();
    clearGalleryList();

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
    clearGalleryList();
    localStorage.setItem('checkBoxLibrary', '');
    showWatched();
};

function onClickQueue() {
    clearGalleryList();
    localStorage.setItem('checkBoxLibrary', 'queue');
    showQueue();
};

function showWatched() {
    href.library.firstElementChild.classList.add('liberary__btn-current');
    href.library.lastElementChild.classList.remove('liberary__btn-current');
    //рендер библиотеки watched;
    const watchedArray = JSON.parse(localStorage.getItem('watched'));

    if (watchedArray.length === 0) {
        console.log('watchedArray = 0');
        return;
    };

    renderMoviesList(watchedArray);
};

function showQueue() {
    href.library.lastElementChild.classList.add('liberary__btn-current');
    href.library.firstElementChild.classList.remove('liberary__btn-current');
    //рендер библиотеки Queue;
    const watchedQueue = JSON.parse(localStorage.getItem('queue'));

    if (watchedQueue.length === 0) {
        console.log('queueArray = 0');
        return;
    };

    renderMoviesList(watchedQueue);
};

// работа с разметкой
function renderMoviesList(movie) {
    href.galleryList.innerHTML = moviesList(movie);
};

function clearGalleryList() {
    href.galleryList.innerHTML = '';
}