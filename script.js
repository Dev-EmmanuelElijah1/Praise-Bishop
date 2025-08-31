document.addEventListener('DOMContentLoaded', () => {
    // Select all audio players
    const players = document.querySelectorAll('.audio-player');

    players.forEach((player, index) => {
        // Get elements for this player
        const audio = player.querySelector(`#song-${index + 1}`);
        const playPauseBtn = player.querySelector(`#play-pause-btn-${index + 1}`);
        const progressBar = player.querySelector(`#progress-bar-${index + 1}`);
        const currentTimeDisplay = player.querySelector(`#current-time-${index + 1}`);
        const durationDisplay = player.querySelector(`#duration-${index + 1}`);

        // Initialize player
        audio.addEventListener('loadedmetadata', () => {
            durationDisplay.textContent = formatTime(audio.duration);
            progressBar.max = audio.duration;
        });

        // Play/Pause toggle
        playPauseBtn.addEventListener('click', () => {
            if (audio.paused) {
                // Pause all other audios
                document.querySelectorAll('audio').forEach(a => {
                    if (a !== audio) {
                        a.pause();
                        a.currentTime = 0;
                        const btn = a.parentElement.querySelector('button');
                        btn.textContent = 'Play';
                    }
                });
                audio.play();
                playPauseBtn.textContent = 'Pause';
            } else {
                audio.pause();
                playPauseBtn.textContent = 'Play';
            }
        });

        // Update progress bar and current time
        audio.addEventListener('timeupdate', () => {
            progressBar.value = audio.currentTime;
            currentTimeDisplay.textContent = formatTime(audio.currentTime);
        });

        // Seek when progress bar is changed
        progressBar.addEventListener('input', () => {
            audio.currentTime = progressBar.value;
        });

        // Reset button text when audio ends
        audio.addEventListener('ended', () => {
            playPauseBtn.textContent = 'Play';
            progressBar.value = 0;
            currentTimeDisplay.textContent = '0:00';
        });
    });

    // Format time in MM:SS
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
});