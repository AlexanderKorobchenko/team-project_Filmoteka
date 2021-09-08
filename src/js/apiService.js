export default class ApiService {
  constructor() {
    this.query = '';
    this.page = 1;
    this.searchIndex = 0;
    this.totalResultsFound = 0;
    this.totalPagesFound = 0;
    this.key = '47af3f3eb3cebf089eb55cbdac9542a5';
    this.moviesUrls = [];
  }
  defineUrls() {
    //метод задает массив из 3 url - для разных вариантов запроса - популярное, по слову, по ИД
    this.moviesUrls = [
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${this.key}&page=${this.page}&include_adult=false`,
      `https://api.themoviedb.org/3/search/movie?api_key=${this.key}&language=en-US&query=${this.query}&page=${this.page}&include_adult=false`,
      `https://api.themoviedb.org/3/movie/${this.query}?api_key=${this.key}&language=en-US&page=${this.page}&include_adult=false`,
      `https://api.themoviedb.org/3/discover/movie?api_key=${this.key}&language=en-US&with_genres=${this.query}&page=${this.page}`,
    ];
  }

  searchMovies() {
    let url = this.moviesUrls[this.searchIndex];
    console.log(url);
    return fetch(url)
      .then(response => response.json())
      .then(res => {
        if(res.total_pages) localStorage.setItem('TotalPagesInLastSearchResult', JSON.stringify(res.total_pages));
        if(this.searchIndex!==2) localStorage.setItem('LastSearchIndex', this.searchIndex);
        this.totalResultsFound = res.total_results; //возможно, понадобится для пагинации
        this.totalPagesFound = res.total_pages;
        console.log(res);
        return res;
      }).catch(err => console.log(err));
  }
  searchGenres() {
    //тут жестко заданный url, т.к. подгрузка жанров осуществляется без запросов пользователя, один раз,в самом начале работы
    return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.key}&language=en-US`)
      .then(response => response.json())
      .then(res => { return res; })
      .then(data => localStorage.setItem('Genres', JSON.stringify(data.genres)))
      .catch(err => console.log(err));
  }

  searchReset() {
    this.page = 1;
    this.totalResultsFound = 0;
    this.searchIndex = 0;
    this.totalResultsFound = 0;
    this.totalPagesFound = 0;
  }
  set searchRequest(newRequest) {
    this.query = newRequest;
    this.defineUrls();
  }
  set searchType(index) {
    this.searchIndex = index;
    this.defineUrls();
  }
  set pageNumber(newPageNumber) {
    //это для пагинации, установка номера страницы
    this.page = newPageNumber;
    console.log(this.page);
    this.defineUrls();
  }
}
// В зависимости от типа запроса, указываем apiService.searchType = 0 - для поиска "популярных"
//  apiService.searchType = 1 - для поиска по словам
//  apiService.serchType =2 - для поиска по конкретному ID
