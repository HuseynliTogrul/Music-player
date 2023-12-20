"use strict"

const songs = [
  {
    name: "glimpse-of-us",
    artist: "Joji",
    title: "Glimpse of Us",
    duration: "3:53",
  },
  {
    name: "fourth-of-july",
    artist: "Sufjan Stevens",
    title: "Fourth of July",
    duration: "4:38",
  },
  {
    name: "indigo-night",
    artist: "Tamino",
    title: "Indigo Night",
    duration: "4:14",
  },
  {
    name: "remembrance",
    artist: "Balmorhea",
    title: "Remembrance",
    duration: "5:59",
  },
  {
    name: "summertime-sadness",
    artist: "Lana del Rey",
    title: "Summertime Sadness",
    duration: "3:25",
  },
  {
    name: "i-know-i-am-not-the-only-one",
    artist: "Sam Smith",
    title: "I Know I'm Not The Only One",
    duration: "3:57",
  },
];


const countSongs = document.getElementById("countSongs")
const durationSongs = document.getElementById("durationSongs")

const playlist = document.getElementById("playlist")

const songImage = document.getElementById("songImage")
const song = document.getElementById("song")
const songTitle = document.getElementById("songTitle")
const artist = document.getElementById("artist")

const previousBtn = document.getElementById("previous")
const playAndPauseBtn = document.getElementById("playandpause")
const playAndPauseIcon = document.querySelector("#playandpause img")
const nextBtn = document.getElementById("next")

const currentTime = document.getElementById("currentTime")
const duration = document.getElementById("duration")

const songPlaying = document.querySelector(".songPlaying")
const progressFill = document.querySelector(".progressFill")

let index = 0;
let isplaying = false;

const displayHeader = () => {
  countSongs.textContent = `${songs.length} songs`;

  const allDurations = songs.map((song) => {
    const [minute, second] = song.duration.split(':');
    return minute * 60 + +second;
  });

  const totalSecond = allDurations.reduce((total, second) => (total += second));

  const minutes = Math.floor(totalSecond / 60);
  const seconds = totalSecond % 60;

  durationSongs.textContent = `${minutes}m ${String(seconds).padStart(2, "0")}s`;
}

const displayPlayList = () => {
  playlist.innerHTML = "";

  songs.forEach((song, index) => {
    playlist.innerHTML += `<li>
                            <div class="list-title">
                                <h4>${index + 1}</h4>
                                <p>${song.title}</p>
                            </div>
                            <div class="list-duration">
                                <p>${song.duration}</p>
                            </div>
                          </li>`
  });
};

const displaySong = () => {
  songImage.src = `./assets/images/${songs[index].name}.jpeg`;
  songTitle.textContent = `${songs[index].title}`
  artist.textContent = `${songs[index].artist}`
  song.src = `./assets/songs/${songs[index].name}.mp3`;
  duration.textContent = `${songs[index].duration}`
};

const playSong = () => {
  song.play();
  isplaying = true;
  playAndPauseIcon.src = `./assets/icons/pause.svg`
};

const pauseSong = () => {
  song.pause();
  isplaying = false;
  playAndPauseIcon.src = `./assets/icons/play.svg`
};

const nextSong = () => {
  if (index < songs.length - 1) {
    index++;
  } else {
    index = 0;
  }

  displaySong();
  playSong();
};

const previousSong = () => {
  if (index > 0) {
    index--;
  } else {
    index = songs.length - 1;
  }

  displaySong();
  playSong();
}

playAndPauseBtn.addEventListener("click", () => {
  isplaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", nextSong);
previousBtn.addEventListener("click", previousSong)


displayHeader();
displayPlayList();
displaySong();

song.addEventListener("timeupdate", () => {
  const { currentTime: cTime, duration } = song;

  const minutes = Math.floor(cTime / 60);
  const seconds = Math.floor(cTime % 60);

  currentTime.textContent = `${minutes}:${String(seconds).padStart(2, "0")}`;

  progressFill.style.width = `${(cTime / duration) * 100}%`;
})

songPlaying.addEventListener("click", (event) => {
  const clicked = event.offsetX;
  const totalWidth = songPlaying.clientWidth;

  song.currentTime = (clicked / totalWidth) * song.duration;
})

song.addEventListener("ended", nextSong);