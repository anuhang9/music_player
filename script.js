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
    image: "roka_yo_samay.jpg",
    song: "Bhanai.mp3",
  },
  {
    name: "Laijaw Malai",
    artist: "Tribal Rain",
    album: "Roka Yo Samay",
    image: "roka_yo_samay.jpg",
    song: "Laijaw_Malai.mp3",
  },
  {
    name: "Roka Yo Samay",
    artist: "Tribal Rain",
    album: "Roka Yo Samay",
    image: "roka_yo_samay.jpg",
    song: "Roka_Yo_Samay.mp3",
  },
  {
    name: "Sahara",
    artist: "Tribal Rain",
    album: "Sahara",
    image: "sahara.jpg",
    song: "Sahara.mp3",
  },
];
song_play_pause.addEventListener("click", () => {
  let my_song = song_store.find(
    (current_song) => current_song.name === "Bhanai"
  );

  if (!play_song) {
    play_song = new Audio(my_song.song);
    play_song.addEventListener("loadedmetadata", () => {
      song_time_range.max = play_song.duration;
      song_timing_total.innerText = `${Math.floor(play_song.duration/60)}:${Math.floor(play_song.duration%60)}`
    });

    song_time_range.addEventListener("input", () => {
      play_song.currentTime = song_time_range.value;
      const current_minutes = Math.floor(play_song.currentTime / 60);
      const current_seconds = Math.floor(play_song.currentTime % 60);
      song_timing_current.innerText = `${current_minutes}:${
        current_seconds < 10 ? "0" : ""
      }${current_seconds}`;
    });

    play_song.addEventListener("timeupdate", () => {
      song_time_range.value = play_song.currentTime;
      let currentTime = play_song.currentTime;
      let minutes = Math.floor(currentTime / 60);
      let seconds = Math.floor(currentTime % 60);
      song_timing_current.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

      if (minutes !== i) {
        i = minutes;
        song_timing_current.innerText = `${i}:${Math.floor(currentTime %  60) < 10 ? ("0" + Math.floor(currentTime % 60)) : Math.floor(currentTime % 60)}`;
      }
    });
  }
  
  if (is_playing) {
    play_song.play();
    song_play_pause_img.src = "pause.png";
    song_image.style.animationName = "songimg";
    song_image.style.animationPlayState = "running";
    is_playing = false;
  } 
  else{
    play_song.pause();
    song_play_pause_img.src = "play.png";
    song_image.style.animationPlayState = "paused";
    is_playing = true;
  }
  song_name.innerText = my_song.name;
  song_artist.innerText = my_song.artist;
  song_album.innerText = my_song.album;
  song_image.src = my_song.image;
});
