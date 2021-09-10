import data from './team-data.json';
import teamHbs from '../templates/modal-team.hbs';

const refs = {
  teamBtn: document.getElementById('open_taem'),
  modalDiv: document.getElementById('modal-window'),
  main: document.querySelector('.main'),
}

refs.teamBtn.addEventListener('click', openTeamModal)
openTeamModal()


function openTeamModal() {
  refs.modalDiv.innerHTML = teamHbs(data);
  window.addEventListener('keydown', action);
  window.addEventListener('click', action);
  setTimeout(function() { 
    refs.modalDiv.classList.add('is-open') 
    // refs.main.style.display = 'none'
  }, 150)
};

function closeTeamModal() {
  refs.modalDiv.classList.remove('is-open');
  window.removeEventListener('keydown' && 'click', action);
  refs.main.style.display = 'block'
  // document.querySelector('.image').src = '';
};

function action(e) {
  if (e.code === 'Escape') {
    closeTeamModal();
  };
  if (e.target.classList.value === 'modal__backdrop') {
    closeTeamModal();
  }
  if (e.target.classList.value === 'close__button team') {
    closeTeamModal();
  }
  return;
};