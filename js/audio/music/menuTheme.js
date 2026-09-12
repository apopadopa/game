const NOTE_FREQS = {
    'D2': 73.42, 'F2': 87.31, 'G2': 98.00, 'A2': 110.00, 'Bb2': 116.54, 'C3': 130.81,
    'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00,
    'Bb3': 233.08, 'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
    'G4': 392.00, 'A4': 440.00, 'Bb4': 466.16, 'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46
};

export const menuTheme = {
    name: 'menu',
    bpm: 88,

    // 4 вариации темы главного меню
    variations: [
        // Вариация 1: Классическая таинственная тема подземелья в ре-миноре
        {
            name: 'mystic_crypt',
            leadPattern: [
                'D3', null, 'A3', 'D4', 'F4', null, 'E4', 'D4',
                'C4', null, 'G3', 'C4', 'E4', 'D4', 'C4', null,
                'Bb3', null, 'F3', 'Bb3', 'D4', null, 'C4', 'Bb3',
                'A3', null, 'E3', 'A3', 'C#4', null, 'E4', null
            ],
            bassPattern: [
                'D2', null, null, null, 'D2', null, null, null,
                'C3', null, null, null, 'C3', null, null, null,
                'Bb2', null, null, null, 'Bb2', null, null, null,
                'A2', null, null, null, 'A2', null, null, null
            ]
        },
        // Вариация 2: Восходящее нагнетание интриги и опасности
        {
            name: 'rising_dread',
            leadPattern: [
                'D3', 'F3', 'A3', 'D4', 'E4', 'F4', 'E4', 'D4',
                'F4', null, 'E4', 'D4', 'C4', 'D4', 'E4', null,
                'G4', null, 'F4', 'E4', 'D4', 'E4', 'F4', 'G4',
                'A4', null, 'G4', 'F4', 'E4', null, 'C#4', null
            ],
            bassPattern: [
                'D2', null, 'D2', null, 'F2', null, 'A2', null,
                'C3', null, 'C3', null, 'G2', null, 'C3', null,
                'Bb2', null, 'Bb2', null, 'D3', null, 'Bb2', null,
                'A2', null, 'E3', null, 'A2', null, 'A2', null
            ]
        },
        // Вариация 3: Движущий марш катакомб
        {
            name: 'dungeon_march',
            leadPattern: [
                'D4', 'D4', null, 'F4', 'E4', 'D4', 'C4', null,
                'E4', 'E4', null, 'G4', 'F4', 'E4', 'D4', null,
                'D4', 'F4', 'A4', 'D5', 'C5', 'A4', 'F4', 'D4',
                'E4', null, 'G4', null, 'A4', null, null, null
            ],
            bassPattern: [
                'D2', null, 'D2', 'D2', 'F2', null, 'F2', null,
                'C3', null, 'C3', 'C3', 'E3', null, 'E3', null,
                'Bb2', null, 'Bb2', 'Bb2', 'D3', null, 'D3', null,
                'A2', 'A2', null, 'A2', 'A2', null, null, null
            ]
        },
        // Вариация 4: Глубокое эхо и затишье перед спуском
        {
            name: 'abyssal_silence',
            leadPattern: [
                'A3', null, null, 'D4', 'F4', null, null, null,
                'G3', null, null, 'C4', 'E4', null, null, null,
                'F3', null, null, 'Bb3', 'D4', null, null, null,
                'E3', null, 'A3', null, 'C#4', null, 'D4', null
            ],
            bassPattern: [
                'D2', null, null, null, null, null, null, null,
                'C3', null, null, null, null, null, null, null,
                'Bb2', null, null, null, null, null, null, null,
                'A2', null, null, null, 'D2', null, null, null
            ]
        }
    ],

    // Дополнительные строчки (flourishes, 30% шанс)
    extraLines: [
        // Строчка 1: Высокий мистический перезвон колоколов
        [
            'D5', null, null, 'A4', null, null, 'F5', null,
            'E5', null, null, 'G4', null, null, 'D5', null,
            'D5', null, null, 'F4', null, null, 'C5', null,
            'C#4', null, 'E4', null, 'A4', null, null, null
        ],
        // Строчка 2: Быстрое нисходящее арпеджио
        [
            null, null, 'D5', 'C5', 'Bb4', 'A4', 'G4', 'F4',
            null, null, 'E5', 'D5', 'C5', 'Bb4', 'A4', 'G4',
            null, null, 'F5', 'E5', 'D5', 'C5', 'Bb4', 'A4',
            null, 'E4', 'G4', 'A4', 'D5', null, null, null
        ],
        // Строчка 3: Акцентные гармонические всплески
        [
            'F5', null, null, null, 'E5', null, null, null,
            'D5', null, null, null, 'C5', null, null, null,
            'Bb4', null, null, null, 'A4', null, null, null,
            'A4', null, 'C#4', null, 'D4', null, null, null
        ]
    ],

    get leadPattern() {
        return this.variations[0].leadPattern;
    },
    get bassPattern() {
        return this.variations[0].bassPattern;
    },

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
    },

    playFlourish(ctx, dest, noteName, time, duration) {
        if (!noteName || !NOTE_FREQS[noteName]) return;
        const freq = NOTE_FREQS[noteName];

        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(freq * 1.5, time);
        filter.Q.setValueAtTime(4.0, time);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.15, time + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration * 1.6);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(dest);

        osc.start(time);
        osc.stop(time + duration * 1.6);
    }
};