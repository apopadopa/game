const NOTE_FREQS = {
    'A2': 110.00, 'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'G3': 196.00,
    'A3': 220.00, 'B3': 246.94, 'C4': 261.63, 'D4': 293.66, 'E4': 329.63,
    'F4': 349.23, 'G4': 392.00, 'A4': 440.00
};

export const tavernMusic = {
    name: 'tavern',
    bpm: 114,

    leadPattern: [
        'A3', 'C4', 'E4', 'A4', 'G4', 'E4', 'C4', 'D4',
        'E4', 'D4', 'C4', 'B3', 'A3', 'C4', 'B3', 'G3',
        'A3', 'C4', 'E4', 'G4', 'A4', 'G4', 'E4', 'D4',
        'E4', 'G4', 'E4', 'D4', 'C4', 'B3', 'A3', null
    ],

    bassPattern: [
        'A2', null, 'E3', null, 'A2', null, 'D3', null,
        'C3', null, 'G3', null, 'A2', null, 'E3', null,
        'A2', null, 'E3', null, 'F3', null, 'D3', null,
        'E3', null, 'G3', null, 'A2', null, null, null
    ],

    playLead(ctx, dest, noteName, time, duration) {
        if (!noteName || !NOTE_FREQS[noteName]) return;
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(NOTE_FREQS[noteName], time);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1800, time);
        filter.frequency.exponentialRampToValueAtTime(500, time + duration);

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
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(NOTE_FREQS[noteName], time);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.18, time + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

        osc.connect(gain);
        gain.connect(dest);

        osc.start(time);
        osc.stop(time + duration);
    }
};