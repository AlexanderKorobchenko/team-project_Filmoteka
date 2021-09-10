const inputSearch = document.querySelector('.search__input');

// console.log(inputSearch);

inputSearch.addEventListener('keydown', function(event) {
    if(event.keyCode === 13) {
       event.preventDefault();
    }
 });