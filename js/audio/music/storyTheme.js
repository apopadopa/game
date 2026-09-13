const NOTE_FREQS = {
    'A1': 55.00, 'C2': 65.41, 'D2': 73.42, 'E2': 82.41, 'F2': 87.31, 'G2': 98.00, 'A2': 110.00, 'Bb2': 116.54, 'C3': 130.81,
    'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'Bb3': 233.08,
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00,
    'Bb4': 466.16, 'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'A5': 880.00
};

export const storyTheme = {
    name: 'story',
    bpm: 72,

    variations: [
        // Вариация 1: «Летопись веков» — глубокий минорный напев и мистический покой
        {
            name: 'chronicles_of_time',
            leadPattern: [
                'D4', null, 'A4', null, 'F4', null, 'G4', 'E4',
                'D4', 'E4', 'F4', 'A4', 'G4', null, 'E4', null,
                'F4', null, 'A4', 'C5', 'D5', null, 'C5', 'A4',
                'Bb4', 'A4', 'G4', 'E4', 'D4', null, null, null
            ],
            bassPattern: [
                'D2', null, 'A2', null, 'Bb2', null, 'F2', null,
                'G2', null, 'D3', null, 'A2', null, 'E2', null,
                'Bb2', null, 'F2', null, 'C3', null, 'G2', null,
                'A2', null, 'A1', null, 'D2', null, null, null
            ]
        },
        // Вариация 2: «Шепот Бездны» — загадочная гармония с глубоким басом
        {
            name: 'whispers_of_the_abyss',
            leadPattern: [
                'A4', 'C5', 'D5', null, 'E5', 'D5', 'C5', 'A4',
                'Bb4', 'A4', 'F4', 'G4', 'A4', null, 'E4', null,
                'D4', 'F4', 'A4', 'D5', 'C5', null, 'A4', 'F4',
                'G4', 'F4', 'E4', 'C4', 'D4', null, null, null
            ],
            bassPattern: [
                'D2', null, 'F2', 'A2', 'Bb2', null, 'D3', null,
                'G2', null, 'Bb2', 'D3', 'A2', null, 'C3', null,
                'Bb2', null, 'D3', null, 'F2', null, 'A2', null,
                'G2', null, 'A2', null, 'D2', null, null, null
            ]
        },
        // Вариация 3: «Судьбоносный шаг» — нарастающее величие и решимость
        {
            name: 'destiny_march',
            leadPattern: [
                'D4', 'F4', 'A4', 'C5', 'D5', 'F5', 'E5', 'D5',
                'C5', 'A4', 'Bb4', 'C5', 'A4', null, 'F4', 'G4',
                'A4', 'D5', 'F5', 'E5', 'D5', 'C5', 'Bb4', 'A4',
                'G4', 'A4', 'F4', 'E4', 'D4', null, null, null
            ],
            bassPattern: [
                'D2', 'D3', null, 'A2', 'Bb2', 'Bb3', null, 'F2',
                'C3', 'C4', null, 'G2', 'A2', 'A3', null, 'E2',
                'Bb2', 'Bb3', null, 'F2', 'C3', 'C4', null, 'G2',
                'A2', 'A3', 'E2', 'A2', 'D2', null, null, null
            ]
        }
    ],

    extraLines: [
        ['D5', null, 'F5', null, 'E5', 'D5', 'C5', null, 'A4', null, 'C5', null, 'D5', null, null, null]
    ],

    playLead(ctx, dest, noteName, time, duration) {
        if (!noteName || !NOTE_FREQS[noteName]) return;
        const freq = NOTE_FREQS[noteName];

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Теплый смычковый/флейтовый колорит
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);

        // Легкое естественное вибрато
        const vib = ctx.createOscillator();
        const vibGain = ctx.createGain();
        vib.frequency.setValueAtTime(4.8, time);
        vibGain.gain.setValueAtTime(1.8, time);
        vib.connect(osc.frequency);
        vib.start(time);
        vib.stop(time + duration);

        gain.gain.setValueAtTime(0.001, time);
        gain.gain.linearRampToValueAtTime(0.16, time + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

        osc.connect(gain);
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

        gain.gain.setValueAtTime(0.001, time);
        gain.gain.linearRampToValueAtTime(0.24, time + 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

        osc.connect(gain);
        gain.connect(dest);

        osc.start(time);
        osc.stop(time + duration);
    },

    playFlourish(ctx, dest, noteName, time, duration) {
        if (!noteName || !NOTE_FREQS[noteName]) return;
        const freq = NOTE_FREQS[noteName];

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.001, time);
        gain.gain.linearRampToValueAtTime(0.09, time + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

        osc.connect(gain);
        gain.connect(dest);

        osc.start(time);
        osc.stop(time + duration);
    }
};

