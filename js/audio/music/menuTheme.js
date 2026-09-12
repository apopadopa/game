const NOTE_FREQS = {
    'D2': 73.42, 'F2': 87.31, 'G2': 98.00, 'A2': 110.00, 'C3': 130.81,
    'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00,
    'Bb3': 233.08, 'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
    'G4': 392.00, 'A4': 440.00
};

export const menuTheme = {
    name: 'menu',
    bpm: 88,

    leadPattern: [
        'D3', null, 'A3', 'D4', 'F4', null, 'E4', 'D4',
        'C4', null, 'G3', 'C4', 'E4', 'D4', 'C4', null,
        'Bb3', null, 'F3', 'Bb3', 'D4', null, 'C4', 'Bb3',
        'A3', null, 'E3', 'A3', 'C#4', null, 'E4', null
    ],

    bassPattern: [
        'D2', null, null, null, 'D2', null, null, null,
        'C3', null, null, null, 'C3', null, null, null,
        'Bb3', null, null, null, 'Bb3', null, null, null,
        'A2', null, null, null, 'A2', null, null, null
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
        filter.frequency.setValueAtTime(1400, time);
        filter.frequency.exponentialRampToValueAtTime(300, time + duration);

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
        const freq = NOTE_FREQS[noteName];

        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc1.type = 'sawtooth';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(freq, time);
        osc2.frequency.setValueAtTime(freq * 0.5, time);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(220, time);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.28, time + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(dest);

        osc1.start(time);
        osc2.start(time);
        osc1.stop(time + duration);
        osc2.stop(time + duration);
    }
};