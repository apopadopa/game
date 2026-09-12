const NOTE_FREQS = {
    'D2': 73.42, 'A2': 110.00, 'D3': 146.83, 'Eb3': 155.56, 'F#3': 185.00,
    'G3': 196.00, 'A3': 220.00, 'Bb3': 233.08, 'C4': 261.63, 'D4': 293.66,
    'Eb4': 311.13, 'F#4': 369.99, 'G4': 392.00, 'A4': 440.00
};

export const shopMusic = {
    name: 'shop',
    bpm: 90,

    leadPattern: [
        'D4', null, 'Eb4', 'F#4', 'G4', null, 'F#4', 'Eb4',
        'D4', 'F#4', 'Eb4', 'D4', 'C4', 'Bb3', 'A3', null,
        'D4', null, 'F#4', 'A4', 'Bb4', null, 'A4', 'G4',
        'F#4', 'G4', 'F#4', 'Eb4', 'D4', null, null, null
    ],

    bassPattern: [
        'D2', null, null, null, 'A2', null, null, null,
        'D2', null, null, null, 'G2', null, 'A2', null,
        'D2', null, null, null, 'Bb2', null, null, null,
        'A2', null, null, null, 'D2', null, null, null
    ],

    playLead(ctx, dest, noteName, time, duration) {
        if (!noteName || !NOTE_FREQS[noteName]) return;
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(NOTE_FREQS[noteName], time);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1200, time);
        filter.Q.setValueAtTime(3.5, time);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.22, time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(dest);

        osc.start(time);
        osc.stop(time + duration);
    },

    playBass(ctx, dest, noteName, time, duration) {
        if (!noteName || !NOTE_FREQS[noteName]) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(NOTE_FREQS[noteName], time);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.25, time + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

        osc.connect(gain);
        gain.connect(dest);

        osc.start(time);
        osc.stop(time + duration);
    }
};