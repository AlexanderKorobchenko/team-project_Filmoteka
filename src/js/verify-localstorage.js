const watched = Boolean(localStorage.getItem('watched'));

if (!watched) {
    localStorage.setItem('watched', '[]');
};

const queue = Boolean(localStorage.getItem('queue'));

if (!queue) {
    localStorage.setItem('queue', '[]');
};

const TotalPagesInLastSearchResult = Boolean(localStorage.getItem('TotalPagesInLastSearchResult'));

if (!TotalPagesInLastSearchResult) {
    localStorage.setItem('TotalPagesInLastSearchResult', '1000');
};