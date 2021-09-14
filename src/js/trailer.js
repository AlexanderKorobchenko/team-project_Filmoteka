import Loader from "./loader";
import ApiService from "./apiService";

const finder = new ApiService();
const changeLoader = new Loader('.loader');

export function trailerRun() {
  finder.searchRequest = localStorage.getItem('LastQuery');

  finder
    .searchTrailer()
    .then(data => {
      changeLoader.addLoader();

      const frameEl = document.querySelector('.frame__container');

      if (data.results.length === 0) {
        frameEl.classList.remove('hidden');
        frameEl.innerHTML = '<span class="trailer-error">the trailer is not found &#9785;</span>';
        changeLoader.clearLoader();
        return;
      }

      let key = data.results.filter(el => el.type === 'Trailer' || "Teaser")[0].key;
      frameEl.classList.remove('hidden');
      frameEl.innerHTML = `<iframe id="player" type="text/html" width="100%" height="100%"
        src="https://www.youtube.com/embed/${key}?autoplay=1&enablejsapi=1&mute=1&origin=https://alexanderkorobchenko.github.io/team-project_Filmoteka/" allow = autoplay frameborder="0" '> </iframe>`;
      changeLoader.clearLoader();
    });
}
