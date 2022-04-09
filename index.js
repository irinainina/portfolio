const body = document.querySelector('body');
const sectionTitleAll = document.querySelectorAll('.section-title');
const sectionTitleSpanAll = document.querySelectorAll('.section-title span');
const portfolioBtnAll = document.querySelectorAll('.portfolio-btn');
const lngSpan = document.querySelectorAll('.lng-span');
const lngSpanActive = document.querySelector('.lng-span-active');
const switchThemeBtn = document.querySelector('.switch-theme');
let isWhite = false;

function switchTheme() {
  if(!isWhite) {
    body.style.color = '#000';
    body.style.backgroundColor = '#fff';
    lngSpan.forEach(el => el.style.color = '#fff');
    lngSpanActive.style.color = '#BDAE82';
    sectionTitleSpanAll.forEach(el => el.style.backgroundColor = '#fff');
    sectionTitleAll.forEach(el => el.style.backgroundImage = 'linear-gradient(to top, #fff 39px, #BDAE82 39px, #BDAE82 41px, #fff 41px)');
    isWhite = true;
  } else {
    body.style.color = '#fff';
    body.style.backgroundColor = '#000';    
    sectionTitleSpanAll.forEach(el => el.style.backgroundColor = '#000');
    sectionTitleAll.forEach(el => el.style.backgroundImage = 'linear-gradient(to top, #000 39px, #BDAE82 39px, #BDAE82 41px, #000 41px)');
    isWhite = false;
  }
}
switchThemeBtn.addEventListener('click', switchTheme);

//change image
const portfolioBtns = document.querySelector('.portfolio-btns');
const portfolioItems = document.querySelector('.portfolio-items');

function changeImage(event) {
  if(event.target.classList.contains('portfolio-btn')) {
    const portfolioBtnsArr = Array.from(portfolioBtns.children);
    portfolioBtnsArr.forEach(el => {
      el.classList.remove('portfolio-btn-active');
      event.target.classList.add('portfolio-btn-active');
    })
    const portfolioImagesArr = Array.from(portfolioItems.children);
    portfolioImagesArr.forEach((el, index) => el.src = `./assets/img/${event.target.dataset.image}/${index + 1}.jpg`)
  }
}
portfolioBtns.addEventListener('click', changeImage);

// кеширование картинок
const seasons = ['winter', 'spring', 'summer', 'autumn'];
function preloadImages() {
  seasons.forEach(el => {
    for(let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/img/${el}/${i}.jpg`;
    }
  });
}
preloadImages();

// Adaptive menu
const toggleBtn = document.querySelector('.toggle');
const nav = document.querySelector('.nav');
const navList = document.querySelector('.nav-list');
const navItems = document.querySelectorAll('.nav-item');

function switchMenu() {
  toggleBtn.classList.toggle('collapsed');
  nav.classList.toggle('collapsed');
  navList.classList.toggle('collapsed');
}
toggleBtn.addEventListener('click', switchMenu);

function closeMenu(event) {
  if(event.target.classList.contains('nav-link')) {
    toggleBtn.classList.remove('collapsed');
    nav.classList.remove('collapsed');
    navList.classList.remove('collapsed');
  }
}
nav.addEventListener('click', closeMenu)

// Translate
import i18Obj from './translate.js';
const en = document.querySelector('.en');
const ru = document.querySelector('.ru');

function getTranslate(lng) {
  const i18nList = document.querySelectorAll('[data-i18]');
  i18nList.forEach(el => el.textContent = i18Obj[lng][el.dataset.i18])
}
en.addEventListener('click', () => getTranslate('en'));
ru.addEventListener('click', () => getTranslate('ru'));

function switchActiveClass(event) {
  en.classList.remove('lng-span-active');
  ru.classList.remove('lng-span-active');
  this.classList.add('lng-span-active');
}
en.addEventListener('click', switchActiveClass);
ru.addEventListener('click', switchActiveClass);

// Video
const player = document.querySelector('.video-player');
const poster = document.querySelector('.poster');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const volume = player.querySelector('.volume');
const volumeIcon = player.querySelector('.volume-icon');
const toggle = player.querySelector('.play');
const playBtn = player.querySelector('.play-btn');

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function toggleMute() {
  if(video.muted) {
    video.muted = false;
    volumeIcon.classList.remove('mute');
  } else {
    video.muted = true;
    volumeIcon.classList.add('mute');
  }
}
volumeIcon.addEventListener('click', toggleMute);

function updateButton() {
  if(this.paused) {
    toggle.classList.remove('pause');
    playBtn.style.display = 'block';
  } else {
    toggle.classList.add('pause');
    playBtn.style.display = 'none';
  }
}

function inputRange(input) {
  const value = input.value;  
  input.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${value}%, #C8C8C8 ${value}%, #C8C8C8 100%)`;
}
progress.addEventListener('input', () => inputRange(progress));
volume.addEventListener('input', () => inputRange(volume));


function changeVolume() {
	video.volume = this.value / 100;  
  if(video.volume <= 0.01) {
    video.muted = true;
    volumeIcon.classList.add('mute');
  } else {
    video.muted = false;
    volumeIcon.classList.remove('mute');
  }
}
volume.addEventListener('input', changeVolume);

function changeProgress() {
	video.currentTime = this.value / 100 * video.duration;
  if(video.currentTime < video.duration) {
    video.play();
  }
}
progress.addEventListener('input', changeProgress);

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100 || 0;
  progress.value = percent;
  inputRange(progress);
}

function removePoster() {
  poster.style.opacity = '0';
  poster.style.pointerEvents = 'none';
  setTimeout(function() {poster.style.display = 'none';}, 1000)
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton); 
video.addEventListener('timeupdate', handleProgress);
playBtn.addEventListener('click', togglePlay);
playBtn.addEventListener('click', removePoster);
poster.addEventListener('click', removePoster);
poster.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);