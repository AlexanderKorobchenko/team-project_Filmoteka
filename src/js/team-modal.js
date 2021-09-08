const page = window.location.host
const data = [
  {
    name: 'Alexander Korobchenko',
    photo: '../images/webp/team-photos/Alexander-Korobchenko.webp',
    telegram: "https://t.me/alexander_korobchenko",
    github: "https://github.com/AlexanderKorobchenko",
    linkedin: "https://www.linkedin.com/in/alexander-korobchenko-a32743211",
  },
  // {
  //   name: "Olena Kandibula",
  //   photo: '../images/webp/team-photos/Olena-Kandibula.webp',
  //   telegram: "https://t.me/olena_kandibula",
  //   github: "https://github.com/Olena-Kandibula",
  //   linkedin: "https://www.linkedin.com/in/olena-kandibula/",
  // },
  // {
  //   name: "Vladyslav Otrishko" ,
  //   photo: '../images/webp/team-photos/Vladyslav-Otrishko.webp',
  //   telegram: "https://t.me/Vlad_Otrishko",
  //   github: "https://github.com/Vlad-Otrishko",
  //   linkedin: "https://www.linkedin.com/in/vlad-otrishko-aab27221b/",
  // },
  // {
  //   name:  "Vladyslav Yaremenko",
  //   photo: '../images/webp/team-photos/Vladyslav-Yaremenko.webp',
  //   telegram: "https://t.me/YaremaV",
  //   github: "https://github.com/YaremaV",
  //   linkedin: "https://www.linkedin.com/in/vladyslav-yaremenko/",
  // },
  // {
  //   name: "Yevhen Vasylevytskyi",
  //   photo: '../images/webp/team-photos/Yevhen-Vasylevytskyi.webp',
  //   telegram: "https://t.me/Spirit_ua87",
  //   github: "https://github.com/YevhenVasylevytskyi",
  //   linkedin: "https://www.linkedin.com/in/yevhen-vasylevytskyi-727373212/",
  // },
  // {
  //   name: "Aleksandra Bahinskay",
  //   photo: '../images/webp/team-photos/Aleksandra-Bahinskay.webp',
  //   telegram: "https://t.me/Aleksandra1k10",
  //   github: "https://github.com/AleksandraBahinskay",
  //   linkedin: "https://www.linkedin.com/in/aleksandra-bahinskaya-551a89204/",
  // },
  // {
  //   name: "Igor Harchenko",
  //   photo: '../images/webp/team-photos/Igor-Harchenko.webp',
  //   telegram: "https://t.me/kharchenkoigor",
  //   github: "https://github.com/Igor-Harchenko",
  //   linkedin: "http://linkedin.com/in/igor-kharchenko-5b845221b"
  // },
  // {
  //   name: "Oksana Filevska",
  //   photo: '../images/webp/team-photos/Oksana-Filevska.webp',
  //   telegram: "https://t.me/OksanaF_2908",
  //   github: "https://github.com/OksanaFilevska",
  //   linkedin: "https://www.linkedin.com/in/oksana-filevska-68bab921b/"
  // },
  // {
  //   name: "Oleg Teslenko",
  //   photo: '../images/webp/team-photos/Oleg-Teslenko.webp',
  //   telegram: "https://t.me/orlantos_tello",
  //   github: "https://github.com/orlantostello",
  //   linkedin: "https://www.linkedin.com/in/oleg-teslenko/"
  // },
  // {
  //   name: "Yakov Ketrar",
  //   photo: '../images/webp/team-photos/Yakov-Ketrar.webp',
  //   telegram: "https://t.me/Jacob1551",
  //   github: "https://github.com/YakovKetrar",
  //   linkedin: "https://www.linkedin.com/",
  // },
]
console.log(data[0].photo)


import teamHbs from '../templates/modal-team.hbs';
const refs = {
  teamBtn: document.getElementById('open_taem'),
  modalDiv: document.getElementById('modal-window')
}
refs.teamBtn.addEventListener('click', openTeamModal)

6


function openTeamModal() {
  // markup = teamHbs(data);
  refs.modalDiv.appendChild(document.createElement("img")).src = "../images/webp/team-photos/Alexander-Korobchenko.webp";
  // refs.modalDiv.insertAdjacentHTML('beforeend', `<img src="https://${page}/images/webp/team-photos/Alexander-Korobchenko.webp">`);
  console.log(refs.modalDiv)
  refs.modalDiv.classList.add('is-open')
  // refs.modalDiv.innerHTML = teamHbs(data);
}


//   refs.modalDiv.classList.add('is-open'); //показали модалку
//   document.querySelector(".close__button").addEventListener('click', closeTeamModal);
//   refs.modalDiv.addEventListener('click', onControlClick);
//   window.addEventListener('keydown', onControlKey);
// };

// function onControlClick(e) {
//   if (e.target.classList.value === 'modal__backdrop') {
//     closeTeamModal();
//   }
//   return;
// };

// function onControlKey(e) {
//     if (e.keyCode === 27) {
//       closeTeamModal();
//     };
// };

// function closeTeamModal() {
//   refs.modalDiv.classList.remove('is-open');
//   window.removeEventListener('keydown', onControlKey);
//   refs.modalDiv.removeEventListener('click', onControlClick);
//   // document.querySelector('.image').src = '';
// };
// // ================= конец открытие/закрытие модалки =================