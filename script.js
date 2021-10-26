const music = document.querySelector('audio')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const playBtn = document.getElementById('play')

//Check if playing
let isPlaying = false;
//Play
function playSong() { 
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','pause')
    music.play();
}

//Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','play')
    music.pause();
}

//Play or Pause Event Listener 
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));