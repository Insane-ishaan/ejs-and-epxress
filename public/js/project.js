// Get references to the audio player and the play/pause button
const audioPlayer = document.getElementById('audio-player');
const duration = document.getElementById('.tol-time'); 
const playPauseBtn = document.getElementById('play-pause-btn');
const playIcon = document.getElementById('play-icon');
const songDuration = document.querySelector('.playback-timeline');
const  curTime = document.querySelector(".time");
let progressBar =document.querySelector("-webkit-slider-thumb");
let PorgressBarTime = document.querySelector(".tol-time");  
// Flag to track whether the audio is playing
let isPlaying = false;

// Function to update the song duration display
function updateDuration() {
    const totalTime = audioPlayer.duration;
    const currentTime = audioPlayer.currentTime;
    // Update the duration display if duration is available
    if (!isNaN(totalTime)) {
        curTime.innerText = `${formatTime(currentTime)}`;
        if(currentTime === totalTime){
            return pause();
        }
    }
}

function pause (){
    for(let i=0; i<=totalTime; i++){
        break;
    }
}

// Function to format time from seconds to MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs<10 ? '0' : ""}${secs}`;
}

// Initial display of total duration when metadata is loaded
audioPlayer.addEventListener('loadedmetadata', () => {
    songDuration.innerText = `0:00 / ${formatTime(audioPlayer.duration)}`;
});

// Update the duration display every second during playback
audioPlayer.addEventListener('timeupdate', updateDuration);

function timeTracking(){
    audioPlayer.addEventListener('click', () => {
        let min = document.querySelector(".min");
        min = 0;
        let step = document.querySelector(".step");
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        curTime = "";
        progressBar.style.step = `${progress}%`;
    });
}

// Play/Pause function
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        timeTracking();
    } else {
        audioPlayer.play().catch(error => {
            console.error('Error playing audio:', error);
        });
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
    }
    isPlaying = !isPlaying; // Toggle the playing state
});