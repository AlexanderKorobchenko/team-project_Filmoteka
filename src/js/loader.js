export default class Loader {
    constructor(selector) {
        this.loader = document.querySelector(selector)
    };

    addLoader() {
        this.loader.classList.remove('hidden');
    };

    clearLoader() {
        this.loader.classList.add('hidden');
    }
}