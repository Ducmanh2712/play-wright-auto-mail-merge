const getAudioContext = () => {
    if (window.audioContext) {
        return window.audioContext;
    }

    if (window.AudioContext || window.webkitAudioContext) {
        window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        return window.audioContext;
    }

    return null;
};

const playBeep = (frequency = 800, duration = 50, volume = 0.1) => {
    const audioContext = getAudioContext();
    if (!audioContext) {
        return;
    }

    try {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'square';

        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration / 1000);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch {
        //
    }
};

window.playBeep = playBeep;
