const watched = Boolean(localStorage.getItem('watched'));

if (!watched) {
    localStorage.setItem('watched', '[]');
};

const queue = Boolean(localStorage.getItem('queue'));

if (!queue) {
    localStorage.setItem('queue', '[]');
};