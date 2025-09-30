let song_name = document.querySelector(".song-title");
let song_artist = document.querySelector(".song-artist");
let song_album = document.querySelector(".song-album");
let song_time_range = document.querySelector(".timer-range");
let song_timing_current = document.querySelector(".timer-song-current");
let song_timing_total = document.querySelector(".timer-song-total");
let song_previous = document.querySelector(".previous");
let song_play_pause = document.querySelector(".play-pause");
let song_play_pause_img = document.getElementById("play-pause");
let song_next = document.querySelector(".next");
let song_suffle = document.querySelector(".suffle");
let song_repeat = document.querySelector(".repeat");
let song_image = document.querySelector(".song-img");
let is_playing = true;
let play_song = null;
let i = 0;

let song_store = [
  {
    name: "Bhanai",
    artist: "Tribal Rain",
    album: "Roka Yo Samay",
    image: "./assets/img/roka_yo_samay.jpg",
    song: "./assets/songs/Bhanai.mp3",
  },
  {
    name: "Laijaw Malai",
    artist: "Tribal Rain",
    album: "Roka Yo Samay",
    image: "./assets/img/roka_yo_samay.jpg",
    song: "./assets/songs/Laijaw_Malai.mp3",
  },
  {
    name: "Roka Yo Samay",
    artist: "Tribal Rain",
    album: "Roka Yo Samay",
    image: "./assets/img/roka_yo_samay.jpg",
    song: "./assets/songs/Roka_Yo_Samay.mp3",
  },
  {
    name: "Sahara",
    artist: "Tribal Rain",
    album: "Sahara",
    image: "./assets/img/sahara.jpg",
    song: "./assets/songs/Sahara.mp3",
  },
  {
    name: "Traditional Swag",
    artist: "Tribal Rain",
    album: "Roka Yo Samay",
    image: "./assets/img/roka_yo_samay.jpg",
    song: "./assets/songs/TraditionalSwang.mp3",
  },
  {
    name: "Devi Deuta",
    artist: "Tribal Rain",
    album: "Roka Yo Samay",
    image: "./assets/img/roka_yo_samay.jpg",
    song: "./assets/songs/DeviDeuta.mp3",
  },
  {
    name: "Jiunu Nai Hola",
    artist: "Tribal Rain",
    album: "Roka Yo Samay",
    image: "./assets/img/roka_yo_samay.jpg",
    song: "./assets/songs/JiunuNaiHola.mp3",
  },
  {
    name: "Khola",
    artist: "Tribal Rain",
    album: "Roka Yo Samay",
    image: "./assets/img/roka_yo_samay.jpg",
    song: "./assets/songs/Khola.mp3",
  },
  {
    name: "Swarga",
    artist: "Tribal Rain",
    album: "Roka Yo Samay",
    image: "./assets/img/roka_yo_samay.jpg",
    song: "./assets/songs/Swarga.mp3",
  },
  {
    name: "Chinta",
    artist: "Tribal Rain",
    album: "Roka Yo Samay",
    image: "./assets/img/roka_yo_samay.jpg",
    song: "./assets/songs/Chinta.mp3",
  },
  {
    name: "Sunyata",
    artist: "Tribal Rain",
    album: "Roka Yo Samay",
    image: "./assets/img/roka_yo_samay.jpg",
    song: "./assets/songs/Sunyata.mp3",
  },
  {
    name: "Narisauna",
    artist: "Tribal Rain",
    album: "Roka Yo Samay",
    image: "./assets/img/roka_yo_samay.jpg",
    song: "./assets/songs/Narisawna.mp3",
  },
  {
    name: "Kura",
    artist: "Tribal Rain",
    album: "Roka Yo Samay",
    image: "./assets/img/roka_yo_samay.jpg",
    song: "./assets/songs/Kura.mp3",
  },
];

let currentIndex = song_store.findIndex((song) => song.name === "Bhanai");

// Function to load a song
function loadSong(index) {
  const currentSong = song_store[index];
  if (play_song) play_song.pause(); // Pause the current song if playing
  play_song = new Audio(currentSong.song); // Set the new song
  song_name.innerText = currentSong.name;
  song_artist.innerText = currentSong.artist;
  song_album.innerText = currentSong.album;
  song_image.src = currentSong.image;

  play_song.addEventListener("loadedmetadata", () => {
    song_time_range.max = play_song.duration;
    song_timing_total.innerText = `${Math.floor(
      play_song.duration / 60
    )}:${Math.floor(play_song.duration % 60)}`;
  });

  play_song.addEventListener("timeupdate", () => {
    song_time_range.value = play_song.currentTime;
    const minutes = Math.floor(play_song.currentTime / 60);
    const seconds = Math.floor(play_song.currentTime % 60);
    song_timing_current.innerText = `${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  });

  // song next after finish
  let intervalId = setInterval(() => {
    if (song_timing_current.innerText >= song_timing_total.innerText) {
      currentIndex = (currentIndex + 1) % song_store.length; // Loop back to start if at the end
      loadSong(currentIndex);
      if (!is_playing) playLoadedSong();
      clearInterval(intervalId);
    }
  }, 1000);
}

// Function to play the loaded song
function playLoadedSong() {
  play_song.play();
  song_play_pause_img.src = "./assets/img/pause.png";
  song_image.style.animationName = "songimg";
  song_image.style.animationPlayState = "running";
  is_playing = false;
}

// Initialize the first song
loadSong(currentIndex);

// Play/Pause button functionality
song_play_pause.addEventListener("click", () => {
  if (is_playing) {
    playLoadedSong();
  } else {
    play_song.pause();
    song_play_pause_img.src = "./assets/img/play.png";
    song_image.style.animationPlayState = "paused";
    is_playing = true;
  }
});

// Next button functionality
song_next.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % song_store.length; // Loop back to start if at the end
  loadSong(currentIndex);
  if (!is_playing) playLoadedSong();
});

// Previous button functionality
song_previous.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + song_store.length) % song_store.length; // Loop to end if at the start
  loadSong(currentIndex);
  if (!is_playing) playLoadedSong();
});

// Seek functionality
song_time_range.addEventListener("input", () => {
  play_song.currentTime = song_time_range.value;
  const currentMinutes = Math.floor(play_song.currentTime / 60);
  const currentSeconds = Math.floor(play_song.currentTime % 60);
  song_timing_current.innerText = `${currentMinutes}:${
    currentSeconds < 10 ? "0" : ""
  }${currentSeconds}`;
});

// Repeat button functionality
song_repeat.addEventListener("click", () => {
  play_song.currentTime = 0;
});


// music library button

let library_button = document.querySelector('.library');
library_button.innerHTML = "︿"
// let library_button_current = "﹀";

library_button.addEventListener("click",(evt)=>{
  if(library_button.innerHTML === "︿"){
    library_button.innerHTML= '﹀'
  }
  else{
    library_button.innerHTML="︿"
  }
})