import ApiService from "./apiService";
const finder = new ApiService();

export function trailerRun() {
  // const player = new ytPlayer();
finder.searchType = 4;
finder.searchRequest = localStorage.getItem('LastQuery');

finder
    .searchMovies()
    .then(data => {
        let key = data.results.filter(el => el.type === 'Trailer')[0].key;
        const frameContainer = document.createElement('div'); frameContainer.classList.add('frame__container');
        document.querySelector('.modal__backdrop').prepend(frameContainer);
        frameContainer.innerHTML = `<iframe id="player" type="text/html" width="100%" height="100%"
  src="http://www.youtube.com/embed/${key}?autoplay=1&enablejsapi=1&mute=1&origin=https://alexanderkorobchenko.github.io/team-project_Filmoteka/" allow = autoplay frameborder="0" '> </iframe>`;
    });
  }
