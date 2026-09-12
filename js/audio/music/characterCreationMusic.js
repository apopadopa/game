const NOTE_FREQS = {
    'D2': 73.42, 'F2': 87.31, 'G2': 98.00, 'A2': 110.00, 'Bb2': 116.54, 'C3': 130.81,
    'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'Bb3': 233.08,
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00,
    'Bb4': 466.16, 'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'A5': 880.00
};

export const creationTheme = {
    name: 'creation',
    bpm: 82,

    // Вариации музыкальной темы создания персонажа (4 вариации)
    variations: [
        // Вариация 1: «Зов судьбы» — нежное арпеджио арфы и надежда
        {
            name: 'destiny_calling',
            leadPattern: [
                'D4', 'F4', 'A4', 'D5', 'C5', 'A4', 'F4', 'G4',
                'A4', 'F4', 'D4', 'F4', 'E4', 'C4', 'D4', null,
                'F4', 'A4', 'C5', 'F5', 'E5', 'C5', 'A4', 'Bb4',
                'C5', 'A4', 'G4', 'E4', 'D4', null, null, null
            ],
            bassPattern: [
                'D2', null, 'A2', null, 'F2', null, 'C3', null,
                'G2', null, 'D3', null, 'A2', null, 'E3', null,
                'Bb2', null, 'F3', null, 'C3', null, 'G3', null,
                'A2', null, 'E3', null, 'D2', null, null, null
            ]
        },
        // Вариация 2: «Рождение героя» — воодушевляющее гармоническое развитие
        {
            name: 'hero_awakens',
            leadPattern: [
                'A4', null, 'D5', 'E5', 'F5', 'E5', 'D5', 'C5',
                'D5', 'A4', 'F4', 'A4', 'G4', 'E4', 'F4', null,
                'D4', 'F4', 'G4', 'A4', 'C5', null, 'Bb4', 'A4',
                'G4', 'A4', 'F4', 'E4', 'D4', null, null, null
            ],
            bassPattern: [
                'D2', null, null, 'D3', 'Bb2', null, null, 'F3',
                'C3', null, null, 'G3', 'A2', null, null, 'E3',
                'Bb2', null, null, 'F3', 'C3', null, null, 'G3',
                'D2', null, null, 'A2', 'D2', null, null, null
            ]
        },
        // Вариация 3: «Дух приключений» — пульсирующая смена ладов и высота
        {
            name: 'adventuring_spirit',
            leadPattern: [
                'F4', 'G4', 'A4', 'C5', 'D5', null, 'C5', 'A4',
                'Bb4', 'A4', 'G4', 'F4', 'E4', 'G4', 'A4', null,
                'D5', 'C5', 'A4', 'F4', 'G4', 'A4', 'Bb4', 'C5',
                'A4', 'F4', 'E4', 'C4', 'D4', null, null, null
            ],
            bassPattern: [
                'D2', 'A2', null, 'D3', 'F2', 'C3', null, 'F3',
                'G2', 'D3', null, 'G3', 'A2', 'E3', null, 'A3',
                'Bb2', 'F3', null, 'Bb3', 'C3', 'G3', null, 'C4',
                'A2', 'E3', null, 'A3', 'D2', null, null, null
            ]
        },
        // Вариация 4: «Вечные легенды» — спокойная медитативная тема
        {
            name: 'ancient_legends',
            leadPattern: [
                'D4', null, 'A4', null, 'F4', null, 'E4', 'D4',
                'C4', null, 'G4', null, 'E4', null, 'D4', 'C4',
                'Bb3', null, 'F4', null, 'D4', null, 'C4', 'Bb3',
                'A3', 'D4', 'F4', 'E4', 'D4', null, null, null
            ],
            bassPattern: [
                'D2', null, null, null, 'F2', null, null, null,
                'C3', null, null, null, 'G2', null, null, null,
                'Bb2', null, null, null, 'F2', null, null, null,
                'A2', null, null, null, 'D2', null, null, null
            ]
        }
    ],

    // Дополнительные мелодические строчки (flourishes), проигрываемые с шансом 30%
    extraLines: [
        // Строчка 1: Высокий перелив арфы
        [
            null, null, 'D5', 'F5', 'A5', null, 'F5', null,
            null, null, 'E5', 'G5', 'F5', null, null, null,
            null, null, 'F5', 'A5', 'C5', null, 'D5', null,
            null, 'E5', 'D5', 'C5', 'D5', null, null, null
        ],
        // Строчка 2: Хрустальные колокольные акценты
        [
            'A5', null, null, null, 'F5', null, null, null,
            'E5', null, null, null, 'D5', null, null, null,
            'C5', null, null, null, 'D5', null, null, null,
            'F5', null, 'E5', null, 'D5', null, null, null
        ],
        // Строчка 3: Быстрое восходящее вдохновляющее арпеджио
        [
            null, 'D4', 'F4', 'A4', null, 'F4', 'A4', 'D5',
            null, 'C4', 'E4', 'G4', null, 'E4', 'G4', 'C5',
            null, 'Bb3', 'D4', 'F4', null, 'D4', 'F4', 'Bb4',
            null, 'A3', 'C4', 'E4', 'D5', null, null, null
        ]
    ],

    // Совместимость со старым API
    get leadPattern() {
        return this.variations[0].leadPattern;
    },
    get bassPattern() {
        return this.variations[0].bassPattern;
    },

    // Щипковый тембр арфы/лютни героя
    playLead(ctx, dest, noteName, time, duration) {
        if (!noteName || !NOTE_FREQS[noteName]) return;
        const freq = NOTE_FREQS[noteName];

        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2400, time);
        filter.frequency.exponentialRampToValueAtTime(450, time + duration * 1.3);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.20, time + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration * 1.6);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(dest);

        osc.start(time);
        osc.stop(time + duration * 1.6);
    },

    // Глубокий благородный бас
    playBass(ctx, dest, noteName, time, duration) {
        if (!noteName || !NOTE_FREQS[noteName]) return;
        const freq = NOTE_FREQS[noteName];

        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc2.type = 'triangle';
        osc1.frequency.setValueAtTime(freq, time);
        osc2.frequency.setValueAtTime(freq * 0.5, time);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(280, time);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.24, time + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration * 1.5);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(dest);

        osc1.start(time);
        osc2.start(time);
        osc1.stop(time + duration * 1.5);
        osc2.stop(time + duration * 1.5);
    },

    // Хрустальные небесные колокольчики для дополнительной строчки
    playFlourish(ctx, dest, noteName, time, duration) {
        if (!noteName || !NOTE_FREQS[noteName]) return;
        const freq = NOTE_FREQS[noteName];

        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(freq * 1.8, time);
        filter.Q.setValueAtTime(3.5, time);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.14, time + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration * 1.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(dest);

        osc.start(time);
        osc.stop(time + duration * 1.8);
    }
};

