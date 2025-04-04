// 移除所有倒數計時相關的代碼 

// 音樂播放器功能
document.addEventListener('DOMContentLoaded', function() {
    // 清空現有的播放列表
    const playlistContainer = document.querySelector('.playlist-container');
    if (playlistContainer) {
        playlistContainer.innerHTML = '';
    }

    const playlist = [
        {
            title: '我結婚了',
            artist: '鍾嘉欣',
            src: 'music/song0.mp3'
        },
        {
            title: 'Perfect',
            artist: 'Ed Sheeran',
            src: 'music/song1.mp3'
        },
        {
            title: 'A Thousand Years',
            artist: 'Christina Perri',
            src: 'music/song2.mp3'
        },
        {
            title: 'Can\'t Help Falling in Love',
            artist: 'Elvis Presley',
            src: 'music/song3.mp3'
        }
    ];

    let currentSong = null;
    let audio = null;

    // 創建播放列表
    playlist.forEach((song, index) => {
        const songElement = document.createElement('div');
        songElement.className = 'playlist-item';
        songElement.innerHTML = `
            <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
            </div>
            <button class="play-btn" data-index="${index}">
                <i class="fas fa-play"></i>
            </button>
        `;
        playlistContainer.appendChild(songElement);
    });

    // 播放/暫停功能
    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            playSong(index);
        });
    });

    // 點擊整行也可以播放
    document.querySelectorAll('.playlist-item').forEach(item => {
        item.addEventListener('click', function(e) {
            if (!e.target.closest('.play-btn')) {
                const btn = this.querySelector('.play-btn');
                const index = parseInt(btn.getAttribute('data-index'));
                playSong(index);
            }
        });
    });

    function playSong(index) {
        if (currentSong === index) {
            if (audio.paused) {
                audio.play();
                updatePlayButton(index, true);
            } else {
                audio.pause();
                updatePlayButton(index, false);
            }
        } else {
            if (audio) {
                audio.pause();
                updatePlayButton(currentSong, false);
            }
            currentSong = index;
            audio = new Audio(playlist[index].src);
            audio.play();
            updatePlayButton(index, true);
            
            audio.addEventListener('ended', () => {
                updatePlayButton(index, false);
                currentSong = null;
            });
        }
    }

    function updatePlayButton(index, isPlaying) {
        const btn = document.querySelector(`.play-btn[data-index="${index}"]`);
        const icon = btn.querySelector('i');
        icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
        btn.classList.toggle('playing', isPlaying);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const languageBtn = document.getElementById('languageBtn');
    let currentLanguage = 'en';

    // Initialize the page with English content
    switchLanguage('en');

    languageBtn.addEventListener('click', () => {
        currentLanguage = currentLanguage === 'en' ? 'zh' : 'en';
        switchLanguage(currentLanguage);
        languageBtn.textContent = currentLanguage === 'en' ? '中文' : 'English';
    });

    function switchLanguage(lang) {
        // Hide all language-specific elements
        document.querySelectorAll('.en, .zh').forEach(el => {
            el.classList.remove('active');
        });

        // Show elements for the selected language
        document.querySelectorAll(`.${lang}`).forEach(el => {
            el.classList.add('active');
        });
    }
}); 