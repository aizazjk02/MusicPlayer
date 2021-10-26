const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const playBtn = document.getElementById('play')


//Music
const songs = [{
    name:'jacinto-1',
    displayName:'Electric Chill Machine',
    artist:'Jacinto Design'
},
{
    name:'jacinto-2',
    displayName:'Seven Nation Army (Remix)',
    artist:'Jacinto Design'
},
{
    name:'jacinto-3',
    displayName:'Good Night, Disco Queen',
    artist:'Jacinto Design'
},
{
    name:'jacinto-4',
    displayName:'Front Row (Remix)',
    artist:'Jacinto Design'
}]

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

//Update the Dom 
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//Current Song
let songIndex = 0;

// Next Song 
function nextSong() {
    songIndex++;
    //Check if index goes out of bounds
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Prev Song 
function prevSong() {
    songIndex--;
    //check if index goes out of bounds 
    if(songIndex < 0 ) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}
//On Load Select 1st Song
loadSong(songs[songIndex]);

//update Progress Bar and Time
function updateProgressBar(e) {
    if(isPlaying) {
        const {duration,currentTime} = e.srcElement;
        const progressPercent = (currentTime / duration ) * 100;
        progress.style.width = `${progressPercent}%`;
        
        //Calculate the display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        } 
        
        //Avoid NaN flash while switching the songs 
        if(durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }

        //Calculate the display for duration
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);

        //Display seconds in double digits 
        if(currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        } 

        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
        
    }
}


//Set Progress Bar 
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * 100;
}
//Event Listeners
prevBtn.addEventListener('click',prevSong)
nextBtn.addEventListener('click',nextSong)
music.addEventListener('ended',nextSong)
music.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click',setProgressBar)