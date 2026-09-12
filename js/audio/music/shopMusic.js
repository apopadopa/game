const NOTE_FREQS = {
    'D2': 73.42, 'A2': 110.00, 'D3': 146.83, 'Eb3': 155.56, 'F#3': 185.00,
    'G3': 196.00, 'A3': 220.00, 'Bb3': 233.08, 'C4': 261.63, 'D4': 293.66,
    'Eb4': 311.13, 'F#4': 369.99, 'G4': 392.00, 'A4': 440.00, 'Bb4': 466.16,
    'D5': 587.33, 'Eb5': 622.25, 'F#5': 739.99, 'A5': 880.00
};

export const shopMusic = {
    name: 'shop',
    bpm: 90,

    // 4 вариации темы лавки торговца
    variations: [
        // Вариация 1: Восточный караван и экзотические товары
        {
            name: 'eastern_caravan',
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
            ]
        },
        // Вариация 2: Азартный торг и звон монет на весах
        {
            name: 'coin_bargain',
            leadPattern: [
                'A4', 'G4', 'F#4', 'Eb4', 'D4', null, 'Eb4', 'F#4',
                'G4', 'A4', 'Bb4', 'A4', 'G4', 'F#4', 'Eb4', null,
                'D4', 'D4', 'F#4', 'F#4', 'A4', null, 'G4', 'Eb4',
                'F#4', 'Eb4', 'D4', 'C4', 'D4', null, null, null
            ],
            bassPattern: [
                'D2', 'D2', null, 'A2', 'D2', 'D2', null, 'G2',
                'D2', 'D2', null, 'Bb2', 'A2', null, 'A2', null,
                'D2', 'A2', null, 'D3', 'G2', 'D3', null, 'G2',
                'A2', null, 'Eb2', null, 'D2', null, null, null
            ]
        },
        // Вариация 3: Шелковые шатры и заморские пряности
        {
            name: 'silk_and_spices',
            leadPattern: [
                'F#4', 'G4', 'A4', 'Bb4', 'A4', 'G4', 'F#4', 'Eb4',
                'D4', null, 'Eb4', null, 'F#4', null, 'D4', null,
                'Bb4', 'A4', 'G4', 'F#4', 'Eb4', 'F#4', 'G4', 'A4',
                'G4', 'F#4', 'Eb4', 'D4', 'D4', null, null, null
            ],
            bassPattern: [
                'D2', null, 'F#2', null, 'G2', null, 'A2', null,
                'Bb2', null, 'A2', null, 'G2', null, 'F#2', null,
                'G2', null, 'A2', null, 'Bb2', null, 'C3', null,
                'A2', null, 'Eb2', null, 'D2', null, null, null
            ]
        },
        // Вариация 4: Полка с редкими артефактами
        {
            name: 'rare_curiosities',
            leadPattern: [
                'D4', null, null, 'A4', 'F#4', null, null, 'D4',
                'Eb4', null, null, 'G4', 'Eb4', null, null, null,
                'F#4', null, null, 'A4', 'Bb4', null, 'A4', 'G4',
                'F#4', null, 'Eb4', null, 'D4', null, null, null
            ],
            bassPattern: [
                'D2', null, null, null, 'D2', null, null, null,
                'Eb2', null, null, null, 'Eb2', null, null, null,
                'D2', null, null, null, 'G2', null, null, null,
                'A2', null, 'Eb2', null, 'D2', null, null, null
            ]
        }
    ],

    // Дополнительные строчки (flourishes, 30% шанс)
    extraLines: [
        // Строчка 1: Звонкий каскад золотых дублонов
        [
            null, null, 'D5', 'Eb5', 'F#5', null, 'Eb5', 'D5',
            null, null, 'A5', 'G5', 'F#5', null, 'Eb5', null,
            null, null, 'F#5', 'A5', 'Bb4', null, 'A5', null,
            'F#5', 'Eb5', 'D5', null, 'D5', null, null, null
        ],
        // Строчка 2: Орнаментальный пассаж ситара
        [
            'D5', 'Eb5', 'D5', 'C4', 'D4', null, 'F#4', null,
            'A4', 'Bb4', 'A4', 'G4', 'F#4', null, 'Eb4', null,
            'D4', 'Eb4', 'F#4', 'A4', 'D5', null, 'Eb5', null,
            'F#5', 'Eb5', 'D5', 'A4', 'D4', null, null, null
        ],
        // Строчка 3: Ритмичные металлические тарелочки
        [
            'A5', null, null, null, 'F#5', null, null, null,
            'Eb5', null, null, null, 'D5', null, null, null,
            'Bb4', null, null, null, 'A4', null, null, null,
            'G4', null, 'F#4', null, 'D4', null, null, null
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

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, time);

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
        const freq = NOTE_FREQS[noteName];

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.25, time + 0.06);
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

        // Тонкий звон монеты / бубенца
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * 1.5, time);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(freq * 2.2, time);
        filter.Q.setValueAtTime(4.5, time);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.14, time + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration * 1.4);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(dest);

        osc.start(time);
        osc.stop(time + duration * 1.4);
    }
};