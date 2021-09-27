const refs = {
    switchBtn: document.getElementById('language-switch-toggle'),
// header
    homeBtn: document.getElementById('btn-home'),
    libraryBtn: document.getElementById('btn-library'),
    input: document.querySelector('.search__input'),
    inputGenres: document.getElementById('form-for-genre'),
    watchedBtn: document.getElementById('liberary').firstElementChild,
    queueBtn: document.getElementById('liberary').lastElementChild,
// modal window
    // voteText: document.getElementById('vote-text'),
    // popularityText: document.getElementById('popularity'),
    // originalTitle: document.getElementById('original-title'),
    // genreText: document.getElementById('genre-text'),
    // about: document.querySelector('.film__about__title'),
// footer
    footerFirstText: document.getElementById('footer__first-text'),
    footerSecondText: document.querySelector('.footer__second-text'),
    footerThirdText: document.getElementById('footer__third-text'),
    footerTeamText: document.querySelector('#open_taem'),
};

refs.switchBtn.checked = Boolean(localStorage.getItem('language')); // Задаем кнопке сохраненное ранее значение

if (!refs.switchBtn.checked) {
    translateToEnglish();
}; //Если "Выкл"
if (refs.switchBtn.checked) {
    translateToRussian();
}; // Если "Вкл"

refs.switchBtn.addEventListener('click', changeLanguage);

function changeLanguage(event) {        
    if (!event.target.checked) {
        translateToEnglish();
        localStorage.setItem('language', '');
    };
    
    if (event.target.checked) {
        translateToRussian();
        localStorage.setItem('language', 'Ru');
    }
};

function translateToEnglish() {
    refs.homeBtn.textContent = 'home';
    refs.libraryBtn.textContent = 'my library';
    refs.input.placeholder = 'Movie search...';
    refs.inputGenres.firstElementChild.textContent = 'Search by'
    refs.inputGenres.lastElementChild.firstElementChild.textContent = 'genres';
    refs.watchedBtn.textContent = 'Watched'
    refs.queueBtn.textContent = 'Queue'
    refs.footerFirstText.textContent = ' All Rights Reserved |';
    refs.footerSecondText.textContent = 'Developed with';
    refs.footerThirdText.textContent = 'by';
    refs.footerTeamText.textContent = 'GoIT Students'
};

function translateToRussian() {
    refs.homeBtn.textContent = 'главная';
    refs.libraryBtn.textContent = 'моя библиотека';
    refs.input.placeholder = 'Поиск фильмов...';
    refs.inputGenres.firstElementChild.textContent = 'Поиск по'
    refs.inputGenres.lastElementChild.firstElementChild.textContent = 'жанрам';
    refs.watchedBtn.textContent = 'просмотренные'
    refs.queueBtn.textContent = 'в очереди'
    refs.footerFirstText.textContent = ' Все права защищены |';
    refs.footerSecondText.textContent = 'Разработано с';
    refs.footerThirdText.textContent = '';
    refs.footerTeamText.textContent = 'студентами GoIT'
}