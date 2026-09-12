const NOTE_FREQS = {
    'C3': 130.81, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00,
    'B3': 246.94, 'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
    'G4': 392.00, 'A4': 440.00, 'B4': 493.88, 'C5': 523.25
};

export const templeMusic = {
    name: 'temple',
    bpm: 64,

    leadPattern: [
        'C5', null, null, 'G4', 'A4', null, null, 'E4',
        'F4', null, null, 'G4', 'E4', null, null, null,
        'C5', null, null, 'B4', 'A4', null, null, 'G4',
        'F4', null, 'E4', null, 'D4', null, 'C4', null
    ],

    bassPattern: [
        'C3', null, null, null, 'A2', null, null, null,
        'F3', null, null, null, 'C3', null, null, null,
        'A2', null, null, null, 'G2', null, null, null,
        'F2', null, null, null, 'C3', null, null, null
    ],

    playLead(ctx, dest, noteName, time, duration) {
        if (!noteName || !NOTE_FREQS[noteName]) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(NOTE_FREQS[noteName], time);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.18, time + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration * 1.8);

        osc.connect(gain);
        gain.connect(dest);

        osc.start(time);
        osc.stop(time + duration * 1.8);
    },

    playBass(ctx, dest, noteName, time, duration) {
        if (!noteName || !NOTE_FREQS[noteName]) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(NOTE_FREQS[noteName], time);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.25, time + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration * 2);

        osc.connect(gain);
        gain.connect(dest);

        osc.start(time);
        osc.stop(time + duration * 2);
    }
};