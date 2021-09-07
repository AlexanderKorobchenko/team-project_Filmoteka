export default class modalMechanics {
  constructor() {
      this.movieData = 0;
  };
  
  openModal() {
    setTimeout(function() { modalMechanics.ref.modal.classList.add('is-open') }, 150)
    window.addEventListener('keydown', this.keyAction);
    modalMechanics.ref.modal.innerHTML = this.movieData;
    modalMechanics.ref.closeBtn.addEventListener('click', modalMechanics.closeModal)
  }
  
  keyAction(key) {
    if(key.code === 'Escape'){
      modalMechanics.closeModal();
    }   
  } 
  
  static closeModal() {
    modalMechanics.ref.modal.classList.remove('is-open');
    window.removeEventListener('keydown', this.keyAction);
  }
  static get ref() {
    return { 
       modal: document.querySelector('#modal-window'),
       closeBtn: document.querySelector(".close__button"),
       img: document.querySelector(".image"),
    }
  }
  set setMovieData(data) {
    this.movieData = data;
  }

}


