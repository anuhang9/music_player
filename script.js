let song_name = document.querySelector('.song-title');
let song_artist = document.querySelector('.song-artist');
let song_album = document.querySelector('.song-album');
let song_time_range = document.querySelector('.timer-range');
let song_previous = document.querySelector('.previous');
let song_play_pause = document.querySelector('.play-pause');
let song_next = document.querySelector('.next');
let song_suffle = document.querySelector('.suffle');
let song_repeat = document.querySelector('.repeat');

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
        song: "Laijaw_Malai.mp3"
    },
    {
        name: "Roka Yo Samay",
        artist: "Tribal Rain",
        album: "Roka Yo Samay",
        image: "roka_yo_samay.jpg",
        song: "Roka_Yo_Samay.mp3"
    },
    {
        name: "Sahara",
        artist: "Tribal Rain",
        album: "Sahara",
        image: "sahara.jpg",
        song: "Sahara.mp3"
    },
]


// function load_music(my_music){
    song_play_pause.addEventListener('click',()=>{song_store.find((current_song)=>{
        if(current_song.name === ""){
            let play_song = new Audio(current_song.song);
            play_song.play().catch(err=>{
                console.log(err)
            });
        }
    })
})
// }
// load_music()