const NOTE_FREQS = {
    'E2': 82.41, 'G2': 98.00, 'A2': 110.00, 'B2': 123.47, 'D3': 146.83,
    'E3': 164.81, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94, 'D4': 293.66,
    'E4': 329.63
};

export const blacksmithMusic = {
    name: 'blacksmith',
    bpm: 84,

    leadPattern: [
        null, 'E4', null, null, null, 'G4', null, 'E4',
        null, 'B3', null, 'D4', 'E4', null, null, null,
        null, 'E4', null, null, null, 'A4', null, 'G4',
        'E4', null, 'D4', null, 'E4', null, null, null
    ],

    bassPattern: [
        'E2', 'E2', null, 'E2', 'G2', null, 'A2', null,
        'E2', 'E2', null, 'E2', 'D2', null, 'B2', null,
        'E2', 'E2', null, 'E2', 'A2', null, 'B2', null,
        'E2', null, 'D2', null, 'E2', null, null, null
    ],

    playLead(ctx, dest, noteName, time, duration) {
        if (!noteName || !NOTE_FREQS[noteName]) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(NOTE_FREQS[noteName] * 2, time);

        gain.gain.setValueAtTime(0.2, time);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.15);

        osc.connect(gain);
        gain.connect(dest);

        osc.start(time);
        osc.stop(time + 0.15);
    },

    playBass(ctx, dest, noteName, time, duration) {
        if (!noteName || !NOTE_FREQS[noteName]) return;
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(NOTE_FREQS[noteName], time);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(300, time);

        gain.gain.setValueAtTime(0.26, time);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(dest);

        osc.start(time);
        osc.stop(time + duration);
    }
};