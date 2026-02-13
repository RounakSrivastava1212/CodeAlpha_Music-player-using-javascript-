// Music Player JavaScript

// Sample playlist - Replace with your own music files
const playlist = [
    {
        title: "Sample Song 1",
        artist: "Artist 1",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        cover: "https://via.placeholder.com/300x300/667eea/ffffff?text=Song+1"
    },
    {
        title: "Sample Song 2",
        artist: "Artist 2",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        cover: "https://via.placeholder.com/300x300/764ba2/ffffff?text=Song+2"
    },
    {
        title: "Sample Song 3",
        artist: "Artist 3",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        cover: "https://via.placeholder.com/300x300/667eea/ffffff?text=Song+3"
    },
    {
        title: "Midnight Dreams",
        artist: "The Night Owls",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        cover: "https://via.placeholder.com/300x300/2c3e50/ffffff?text=Midnight+Dreams"
    },
    {
        title: "Electric Pulse",
        artist: "Synth Wave",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        cover: "https://via.placeholder.com/300x300/e74c3c/ffffff?text=Electric+Pulse"
    },
    {
        title: "Ocean Breeze",
        artist: "Coastal Vibes",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        cover: "https://via.placeholder.com/300x300/3498db/ffffff?text=Ocean+Breeze"
    },
    {
        title: "City Lights",
        artist: "Urban Beats",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        cover: "https://via.placeholder.com/300x300/f39c12/ffffff?text=City+Lights"
    },
    {
        title: "Sunset Boulevard",
        artist: "Golden Hour",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        cover: "https://via.placeholder.com/300x300/e67e22/ffffff?text=Sunset+Boulevard"
    },
    {
        title: "Neon Nights",
        artist: "Cyber Pop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        cover: "https://via.placeholder.com/300x300/9b59b6/ffffff?text=Neon+Nights"
    },
    {
        title: "Forest Echo",
        artist: "Nature Sounds",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        cover: "https://via.placeholder.com/300x300/27ae60/ffffff?text=Forest+Echo"
    },
    {
        title: "Stellar Journey",
        artist: "Space Odyssey",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
        cover: "https://via.placeholder.com/300x300/34495e/ffffff?text=Stellar+Journey"
    },
    {
        title: "Jazz Cafe",
        artist: "Smooth Jazz Collective",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
        cover: "https://via.placeholder.com/300x300/16a085/ffffff?text=Jazz+Cafe"
    }
];

// Get DOM elements
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const playPauseIcon = document.getElementById('playPauseIcon');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');
const progressSlider = document.getElementById('progressSlider');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volumeSlider');
const songTitle = document.getElementById('songTitle');
const artistName = document.getElementById('artistName');
const albumCover = document.getElementById('albumCover');
const playlistEl = document.getElementById('playlist');
const albumArtContainer = document.getElementById('albumArtContainer');

// Player state
let currentSongIndex = 0;
let isPlaying = false;
let isShuffled = false;
let repeatMode = 0; // 0: no repeat, 1: repeat all, 2: repeat one
let shuffledPlaylist = [];

// Initialize player
function initPlayer() {
    loadSong(currentSongIndex);
    renderPlaylist();
    audioPlayer.volume = volumeSlider.value / 100;
}

// Load song
function loadSong(index) {
    const song = playlist[index];
    audioPlayer.src = song.src;
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    albumCover.src = song.cover;
    
    // Update active playlist item
    const playlistItems = document.querySelectorAll('.playlist-item');
    playlistItems.forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Reset progress
    progress.style.width = '0%';
    progressSlider.value = 0;
    currentTimeEl.textContent = '0:00';
}

// Play/Pause toggle
function togglePlayPause() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

// Play song
function playSong() {
    audioPlayer.play();
    isPlaying = true;
    playPauseIcon.classList.remove('fa-play');
    playPauseIcon.classList.add('fa-pause');
    albumArtContainer.classList.add('playing');
}

// Pause song
function pauseSong() {
    audioPlayer.pause();
    isPlaying = false;
    playPauseIcon.classList.remove('fa-pause');
    playPauseIcon.classList.add('fa-play');
    albumArtContainer.classList.remove('playing');
}

// Next song
function nextSong() {
    if (isShuffled && shuffledPlaylist.length > 0) {
        const currentIndex = shuffledPlaylist.indexOf(currentSongIndex);
        if (currentIndex < shuffledPlaylist.length - 1) {
            currentSongIndex = shuffledPlaylist[currentIndex + 1];
        } else {
            shufflePlaylist();
            currentSongIndex = shuffledPlaylist[0];
        }
    } else {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
    }
    loadSong(currentSongIndex);
    if (isPlaying) {
        playSong();
    }
}

// Previous song
function prevSong() {
    if (isShuffled && shuffledPlaylist.length > 0) {
        const currentIndex = shuffledPlaylist.indexOf(currentSongIndex);
        if (currentIndex > 0) {
            currentSongIndex = shuffledPlaylist[currentIndex - 1];
        } else {
            shufflePlaylist();
            currentSongIndex = shuffledPlaylist[shuffledPlaylist.length - 1];
        }
    } else {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    }
    loadSong(currentSongIndex);
    if (isPlaying) {
        playSong();
    }
}

// Shuffle playlist
function shufflePlaylist() {
    shuffledPlaylist = [...Array(playlist.length).keys()];
    for (let i = shuffledPlaylist.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPlaylist[i], shuffledPlaylist[j]] = [shuffledPlaylist[j], shuffledPlaylist[i]];
    }
}

// Toggle shuffle
function toggleShuffle() {
    isShuffled = !isShuffled;
    shuffleBtn.classList.toggle('active', isShuffled);
    if (isShuffled) {
        shufflePlaylist();
    }
}

// Toggle repeat
function toggleRepeat() {
    repeatMode = (repeatMode + 1) % 3;
    repeatBtn.classList.remove('active');
    if (repeatMode === 1) {
        repeatBtn.classList.add('active');
        repeatBtn.title = 'Repeat All';
    } else if (repeatMode === 2) {
        repeatBtn.classList.add('active');
        repeatBtn.title = 'Repeat One';
    } else {
        repeatBtn.title = 'Repeat';
    }
}

// Format time
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Update progress
function updateProgress() {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    
    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = progressPercent + '%';
        progressSlider.value = progressPercent;
        currentTimeEl.textContent = formatTime(currentTime);
        durationEl.textContent = formatTime(duration);
    }
}

// Set progress
function setProgress(value) {
    const duration = audioPlayer.duration;
    if (duration) {
        audioPlayer.currentTime = (value / 100) * duration;
    }
}

// Set volume
function setVolume(value) {
    audioPlayer.volume = value / 100;
}

// Render playlist
function renderPlaylist() {
    playlistEl.innerHTML = '';
    playlist.forEach((song, index) => {
        const item = document.createElement('div');
        item.className = 'playlist-item';
        if (index === currentSongIndex) {
            item.classList.add('active');
        }
        item.innerHTML = `
            <div>
                <div class="song-name">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
            </div>
            <i class="fas fa-play play-icon"></i>
        `;
        item.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        });
        playlistEl.appendChild(item);
    });
}

// Event listeners
playPauseBtn.addEventListener('click', togglePlayPause);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
shuffleBtn.addEventListener('click', toggleShuffle);
repeatBtn.addEventListener('click', toggleRepeat);

// Album art click to play/pause
albumArtContainer.addEventListener('click', (e) => {
    // Don't trigger if clicking on overlay icons
    if (!e.target.closest('.play-overlay')) {
        togglePlayPause();
    }
});

// Album art hover effects
albumArtContainer.addEventListener('mouseenter', () => {
    if (!isPlaying) {
        albumArtContainer.style.transform = 'scale(1.02)';
    }
});

albumArtContainer.addEventListener('mouseleave', () => {
    if (!isPlaying) {
        albumArtContainer.style.transform = 'scale(1)';
    }
});

progressSlider.addEventListener('input', (e) => {
    setProgress(e.target.value);
});

volumeSlider.addEventListener('input', (e) => {
    setVolume(e.target.value);
});

audioPlayer.addEventListener('timeupdate', updateProgress);

audioPlayer.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audioPlayer.duration);
});

audioPlayer.addEventListener('ended', () => {
    if (repeatMode === 2) {
        // Repeat one
        audioPlayer.currentTime = 0;
        playSong();
    } else if (repeatMode === 1 || currentSongIndex < playlist.length - 1) {
        // Repeat all or next song
        nextSong();
        if (isPlaying) {
            playSong();
        }
    } else {
        // End of playlist
        pauseSong();
        currentSongIndex = 0;
        loadSong(currentSongIndex);
    }
});

audioPlayer.addEventListener('error', (e) => {
    console.error('Error loading audio:', e);
    alert('Error loading audio file. Please check the file path or use a different audio source.');
});

// Initialize on load
initPlayer();

