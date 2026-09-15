const NOTE_FREQS = {
    'D2': 73.42, 'F2': 87.31, 'G2': 98.00, 'A2': 110.00, 'Bb2': 116.54, 'C3': 130.81,
    'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'Bb3': 233.08,
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00,
    'Bb4': 466.16, 'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46
};

export const southRoadTheme = {
    name: 'southRoad',
    bpm: 96,

    // 4 вариации темы гарнизона Южного тракта
    variations: [
        // Вариация 1: Бдительный дозор заставы
        {
            name: 'garrison_watch',
            leadPattern: [
                'D4', null, 'D4', 'E4', 'F4', null, 'D4', null,
                'A4', null, 'G4', 'F4', 'E4', null, 'D4', null,
                'F4', 'G4', 'A4', null, 'D5', null, 'A4', null,
                'G4', 'F4', 'E4', 'C4', 'D4', null, null, null
            ],
            bassPattern: [
                'D2', 'D2', 'A2', 'D2', 'D2', null, 'F2', 'G2',
                'A2', 'A2', 'E2', 'A2', 'G2', null, 'D2', null,
                'Bb2', 'Bb2', 'F2', 'Bb2', 'A2', 'A2', 'E2', 'A2',
                'G2', 'F2', 'E2', 'A2', 'D2', null, null, null
            ]
        },
        // Вариация 2: Марш кованых врат
        {
            name: 'iron_gate_march',
            leadPattern: [
                'A3', 'D4', 'F4', 'A4', 'A4', 'G4', 'F4', 'E4',
                'D4', 'F4', 'A4', 'D5', 'C5', 'Bb4', 'A4', null,
                'Bb4', 'A4', 'G4', 'Bb4', 'A4', 'G4', 'F4', 'A4',
                'G4', 'F4', 'E4', 'F4', 'D4', null, null, null
            ],
            bassPattern: [
                'D2', null, 'D2', 'D2', 'F2', null, 'A2', null,
                'D2', null, 'D2', 'D2', 'G2', null, 'A2', null,
                'Bb2', null, 'Bb2', 'Bb2', 'F2', null, 'F2', null,
                'G2', 'A2', 'Bb2', 'C3', 'D2', null, null, null
            ]
        },
        // Вариация 3: Патруль фронтира
        {
            name: 'frontier_patrol',
            leadPattern: [
                'D4', 'D4', null, 'F4', 'G4', null, 'A4', null,
                'D5', null, 'C5', 'A4', 'F4', 'G4', 'A4', null,
                'G4', null, 'F4', 'D4', 'C4', 'D4', 'F4', 'G4',
                'A4', 'F4', 'E4', 'C4', 'D4', null, null, null
            ],
            bassPattern: [
                'D2', 'A2', 'D2', 'A2', 'F2', 'C3', 'F2', 'C3',
                'G2', 'D3', 'G2', 'D3', 'A2', 'E3', 'A2', 'E3',
                'Bb2', 'F2', 'Bb2', 'F2', 'A2', 'E2', 'A2', 'E2',
                'G2', 'D2', 'A2', 'E2', 'D2', null, null, null
            ]
        },
        // Вариация 4: Тревожный рубеж катакомб
        {
            name: 'scouts_vigil',
            leadPattern: [
                'D4', null, 'A4', null, 'G4', 'F4', 'E4', null,
                'F4', null, 'D4', null, 'C4', 'E4', 'D4', null,
                'F4', 'A4', 'D5', 'E5', 'F5', 'E5', 'D5', 'A4',
                'Bb4', 'A4', 'G4', 'E4', 'D4', null, null, null
            ],
            bassPattern: [
                'D2', 'D2', null, 'D2', 'A2', 'A2', null, 'A2',
                'Bb2', 'Bb2', null, 'Bb2', 'A2', 'A2', null, 'A2',
                'G2', 'G2', null, 'G2', 'F2', 'F2', null, 'F2',
                'E2', null, 'A2', null, 'D2', null, null, null
            ]
        }
    ],

    // Украшающая боевая фанфара стражи (30% шанс в цикле)
    extraLines: [
        [
            null, 'D5', null, 'D5', 'E5', 'F5', null, 'E5',
            'D5', null, 'A4', null, 'D5', null, null, null,
            null, 'F5', null, 'E5', 'D5', 'A4', null, 'D5',
            'C5', null, 'A4', 'E4', 'D4', null, null, null
        ],
        [
            'A4', 'A4', 'A4', null, 'D5', null, 'A4', null,
            'F4', 'F4', 'F4', null, 'A4', null, 'F4', null,
            'G4', 'A4', 'Bb4', 'C5', 'D5', null, 'A4', null,
            'G4', null, 'E4', null, 'D4', null, null, null
        ]
    ],

    playLead(ctx, dest, noteName, time, duration) {
        if (!noteName || !NOTE_FREQS[noteName]) return;
        const freq = NOTE_FREQS[noteName];

        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        // Горно-трубный тембр (sawtooth + bandpass с характерной медно-духовой атакой)
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, time);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2200, time);
        filter.frequency.exponentialRampToValueAtTime(700, time + duration);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.18, time + 0.025);
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
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        // Упругий маршевый бас
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, time);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.26, time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(dest);

        osc.start(time);
        osc.stop(time + duration);
    },

    playFlourish(ctx, dest, noteName, time, duration) {
        if (!noteName || !NOTE_FREQS[noteName]) return;
        const freq = NOTE_FREQS[noteName];

        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, time);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(freq * 1.5, time);
        filter.Q.setValueAtTime(2.5, time);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.12, time + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(dest);

        osc.start(time);
        osc.stop(time + duration);
    }
};

