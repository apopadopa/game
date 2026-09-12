const NOTE_FREQS = {
    'E2': 82.41, 'G2': 98.00, 'A2': 110.00, 'B2': 123.47, 'D3': 146.83,
    'E3': 164.81, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94, 'D4': 293.66,
    'E4': 329.63, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88, 'D5': 587.33, 'E5': 659.25
};

export const blacksmithMusic = {
    name: 'blacksmith',
    bpm: 84,

    // 4 вариации темы кузницы
    variations: [
        // Вариация 1: Ритмичные удары молота по раскаленной наковальне
        {
            name: 'anvil_strikes',
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
            ]
        },
        // Вариация 2: Раздувание кузнечных мехов и жар горна
        {
            name: 'bellows_and_flame',
            leadPattern: [
                'E4', 'E4', null, 'G4', 'E4', null, 'B4', 'A4',
                'G4', 'E4', 'D4', 'E4', null, 'G4', 'A4', null,
                'B4', null, 'A4', 'G4', 'E4', 'G4', 'A4', 'B4',
                'A4', 'G4', 'E4', 'D4', 'E4', null, null, null
            ],
            bassPattern: [
                'E2', null, 'E2', 'G2', 'A2', null, 'A2', null,
                'E2', null, 'E2', 'D2', 'B2', null, 'B2', null,
                'E2', null, 'E2', 'G2', 'A2', null, 'B2', null,
                'D2', null, 'E2', null, 'E2', null, null, null
            ]
        },
        // Вариация 3: Мастерская клинков и кольчуг
        {
            name: 'master_craftsman',
            leadPattern: [
                'B3', null, 'D4', null, 'E4', 'G4', 'A4', null,
                'G4', 'E4', 'D4', null, 'B3', 'D4', 'E4', null,
                'E4', 'G4', 'A4', 'B4', 'D5', null, 'B4', 'A4',
                'G4', 'E4', 'D4', 'B3', 'E4', null, null, null
            ],
            bassPattern: [
                'E2', 'B2', 'E2', null, 'G2', 'D3', 'G2', null,
                'A2', 'E3', 'A2', null, 'B2', 'F#2', 'B2', null,
                'E2', 'B2', 'E2', null, 'D2', 'A2', 'D2', null,
                'B2', null, 'D2', null, 'E2', null, null, null
            ]
        },
        // Вариация 4: Закалка стали в чане с ключевой водой
        {
            name: 'quenching_steel',
            leadPattern: [
                'E4', null, null, null, 'G4', null, null, null,
                'A4', null, null, null, 'B4', null, 'A4', 'G4',
                'E4', null, null, null, 'D4', null, null, null,
                'E4', null, 'B3', null, 'E4', null, null, null
            ],
            bassPattern: [
                'E2', null, null, null, 'G2', null, null, null,
                'A2', null, null, null, 'B2', null, null, null,
                'C3', null, null, null, 'D3', null, null, null,
                'B2', null, null, null, 'E2', null, null, null
            ]
        }
    ],

    // Дополнительные строчки (flourishes, 30% шанс)
    extraLines: [
        // Строчка 1: Высокий звон искр наковальни
        [
            null, 'E5', null, null, null, 'G4', null, 'D5',
            null, 'B4', null, null, 'E5', null, null, null,
            null, 'E5', null, null, null, 'A4', null, 'E5',
            'D5', null, 'B4', null, 'E5', null, null, null
        ],
        // Строчка 2: Двойной звонкий рикошет бойка молота
        [
            'E5', 'E5', null, null, 'G4', 'G4', null, null,
            'B4', 'B4', null, null, 'A4', null, 'G4', null,
            'E5', 'E5', null, null, 'D5', 'D5', null, null,
            'B4', null, 'D5', null, 'E5', null, null, null
        ],
        // Строчка 3: Металлическое эхо горна
        [
            'B4', null, null, null, 'E5', null, null, null,
            'D5', null, null, null, 'B4', null, null, null,
            'A4', null, null, null, 'G4', null, null, null,
            'E4', null, 'D4', null, 'E4', null, null, null
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
    },

    playFlourish(ctx, dest, noteName, time, duration) {
        if (!noteName || !NOTE_FREQS[noteName]) return;
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        // Высокий чистый металлический звон
        osc.type = 'sine';
        osc.frequency.setValueAtTime(NOTE_FREQS[noteName] * 2.5, time);

        filter.type = 'highpass';
        filter.frequency.setValueAtTime(1200, time);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.16, time + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.12);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(dest);

        osc.start(time);
        osc.stop(time + 0.12);
    }
};