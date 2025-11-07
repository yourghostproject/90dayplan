// Audio Player Functionality
document.addEventListener('DOMContentLoaded', function() {
    const audioPlayers = document.querySelectorAll('.audio-player');
    
    audioPlayers.forEach(playerElement => {
        const audioSrc = playerElement.getAttribute('data-audio');
        const audio = new Audio(audioSrc);
        
        const playBtn = playerElement.querySelector('.play-btn');
        const progressContainer = playerElement.querySelector('.progress-container');
        const progressBar = playerElement.querySelector('.progress-bar');
        const timeDisplay = playerElement.querySelector('.time');
        
        let isPlaying = false;
        
        // Play/Pause functionality
        playBtn.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                playBtn.textContent = '▶️';
            } else {
                // Pause all other players
                document.querySelectorAll('audio').forEach(a => {
                    if (a !== audio) {
                        a.pause();
                    }
                });
                document.querySelectorAll('.play-btn').forEach(btn => {
                    btn.textContent = '▶️';
                });
                
                audio.play();
                playBtn.textContent = '⏸️';
            }
            isPlaying = !isPlaying;
        });
        
        // Update progress bar and time
        audio.addEventListener('timeupdate', () => {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${progress}%`;
            
            const currentTime = formatTime(audio.currentTime);
            const duration = formatTime(audio.duration);
            timeDisplay.textContent = `${currentTime} / ${duration}`;
        });
        
        // Seek functionality
        progressContainer.addEventListener('click', (e) => {
            const rect = progressContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const percentage = clickX / width;
            audio.currentTime = percentage * audio.duration;
        });
        
        // Reset when audio ends
        audio.addEventListener('ended', () => {
            playBtn.textContent = '▶️';
            isPlaying = false;
            progressBar.style.width = '0%';
        });
        
        // Handle audio loading errors
        audio.addEventListener('error', () => {
            console.error(`Error loading audio: ${audioSrc}`);
            timeDisplay.textContent = 'Error loading';
        });
    });
    
    // Format time helper
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
});
