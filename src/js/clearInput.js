const clearInput = document.getElementById('btn-home');
const input = document.querySelector('.search__input');
const homePage = document.getElementById('logo-home');

clearInput.addEventListener('click', function () {
    input.value = '';
});

homePage.addEventListener('click', function () {
    input.value = '';
});


