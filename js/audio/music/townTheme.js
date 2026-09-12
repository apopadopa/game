const NOTE_FREQS = {
    'G2': 98.00, 'A2': 110.00, 'B2': 123.47, 'C3': 130.81, 'D3': 146.83,
    'E3': 164.81, 'F#3': 185.00, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F#4': 369.99, 'G4': 392.00,
    'A4': 440.00, 'B4': 493.88
};

export const townTheme = {
    name: 'town',
    bpm: 102,

    leadPattern: [
        'G3', 'B3', 'D4', 'G4', 'E4', 'D4', 'B3', 'C4',
        'D4', 'B3', 'G3', 'B3', 'A3', 'G3', 'E3', 'D3',
        'C4', 'E4', 'G4', 'E4', 'D4', 'B3', 'G3', 'B3',
        'A3', 'B3', 'C4', 'D4', 'G3', null, null, null
    ],

    bassPattern: [
        'G2', null, 'D3', null, 'C3', null, 'E3', null,
        'G2', null, 'D3', null, 'D3', null, 'A2', null,
        'C3', null, 'G2', null, 'G2', null, 'B2', null,
        'D3', null, 'D3', null, 'G2', null, null, null
    ],

    playLead(ctx, dest, noteName, time, duration) {
        if (!noteName || !NOTE_FREQS[noteName]) return;
        const freq = NOTE_FREQS[noteName];

        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1600, time);
        filter.frequency.exponentialRampToValueAtTime(450, time + duration);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.2, time + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(dest);

        osc.start(time);
        osc.stop(time + duration);
    },

    playBass(ctx, dest, noteName, time, duration) {
        if (!noteName || !NOTE_FREQS[noteName]) return;
        const freq = NOTE_FREQS[noteName];

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.24, time + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

        osc.connect(gain);
        gain.connect(dest);

        osc.start(time);
        osc.stop(time + duration);
    }
};