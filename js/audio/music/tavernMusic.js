const NOTE_FREQS = {
    'A2': 110.00, 'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'G3': 196.00,
    'A3': 220.00, 'B3': 246.94, 'C4': 261.63, 'D4': 293.66, 'E4': 329.63,
    'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88, 'C5': 523.25,
    'D5': 587.33, 'E5': 659.25, 'G5': 783.99
};

export const tavernMusic = {
    name: 'tavern',
    bpm: 114,

    // 4 вариации темы таверны
    variations: [
        // Вариация 1: Задорный трактирный рил
        {
            name: 'tavern_reel',
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
            ]
        },
        // Вариация 2: Пляс с кружками эля и топотом сапог
        {
            name: 'ale_and_stomp',
            leadPattern: [
                'E4', 'E4', 'G4', 'A4', 'C5', 'A4', 'G4', 'E4',
                'D4', 'E4', 'D4', 'B3', 'C4', 'D4', 'E4', null,
                'A4', 'A4', 'C5', 'D5', 'E5', 'D5', 'C5', 'A4',
                'G4', 'A4', 'E4', 'G4', 'A4', null, null, null
            ],
            bassPattern: [
                'A2', 'A2', 'E3', null, 'A2', 'A2', 'D3', null,
                'G2', 'G2', 'D3', null, 'E2', 'E2', 'E3', null,
                'F2', 'F2', 'C3', null, 'D3', 'D3', 'A2', null,
                'E3', null, 'G3', null, 'A2', null, null, null
            ]
        },
        // Вариация 3: Залихватский припев захмелевших наёмников
        {
            name: 'mercenary_chorus',
            leadPattern: [
                'C5', 'B4', 'A4', 'G4', 'E4', null, 'G4', 'A4',
                'B4', 'A4', 'G4', 'E4', 'D4', null, 'E4', 'G4',
                'A4', 'B4', 'C5', 'B4', 'A4', 'G4', 'E4', 'D4',
                'C4', 'D4', 'E4', 'G4', 'A4', null, null, null
            ],
            bassPattern: [
                'C3', null, 'G3', null, 'A2', null, 'E3', null,
                'G2', null, 'D3', null, 'E2', null, 'B2', null,
                'F2', null, 'C3', null, 'G2', null, 'D3', null,
                'E3', null, 'E3', null, 'A2', null, null, null
            ]
        },
        // Вариация 4: Быстрый сольный пассаж менестреля
        {
            name: 'minstrel_solo',
            leadPattern: [
                'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'E4',
                'F4', 'E4', 'D4', 'C4', 'B3', 'C4', 'D4', 'B3',
                'C4', 'D4', 'E4', 'G4', 'A4', 'B4', 'C5', 'A4',
                'B4', 'A4', 'G4', 'E4', 'A4', null, null, null
            ],
            bassPattern: [
                'A2', null, 'E3', null, 'A2', null, 'D3', null,
                'D3', null, 'A2', null, 'E3', null, 'G2', null,
                'A2', null, 'C3', null, 'F3', null, 'D3', null,
                'E3', null, 'G3', null, 'A2', null, null, null
            ]
        }
    ],

    // Дополнительные строчки (flourishes, 30% шанс)
    extraLines: [
        // Строчка 1: Виртуозная высокая трель ирландской свирели
        [
            null, null, 'E5', 'D5', 'C5', 'B4', 'A4', null,
            null, null, 'G5', 'E5', 'D5', 'C5', 'B4', null,
            null, null, 'A5', 'G5', 'E5', 'D5', 'C5', null,
            'E5', 'D5', 'C5', 'B4', 'A4', null, null, null
        ],
        // Строчка 2: Скрипичный взлёт
        [
            'A4', 'C5', 'E5', 'A5', 'G5', null, 'E5', null,
            'D5', 'E5', 'G5', 'E5', 'D5', null, 'B4', null,
            'C5', 'D5', 'E5', 'A5', 'G5', null, 'E5', null,
            'D5', 'B4', 'G4', 'E4', 'A4', null, null, null
        ],
        // Строчка 3: Ритмичные акценты звона пивных бокалов
        [
            'E5', null, 'E5', null, 'C5', null, 'D5', null,
            'B4', null, 'B4', null, 'G4', null, 'A4', null,
            'C5', null, 'C5', null, 'E5', null, 'D5', null,
            'E5', null, 'G4', null, 'A4', null, null, null
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
        const freq = NOTE_FREQS[noteName];

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
    },

    playFlourish(ctx, dest, noteName, time, duration) {
        if (!noteName || !NOTE_FREQS[noteName]) return;
        const freq = NOTE_FREQS[noteName];

        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        // Высокий призвук свирели
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(freq * 1.4, time);
        filter.Q.setValueAtTime(3.0, time);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.13, time + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration * 1.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(dest);

        osc.start(time);
        osc.stop(time + duration * 1.2);
    }
};