const NOTE_FREQS = {
    'C2': 65.41, 'D2': 73.42, 'Eb2': 77.78, 'F2': 87.31, 'G2': 98.00, 'Ab2': 103.83, 'Bb2': 116.54,
    'C3': 130.81, 'D3': 146.83, 'Eb3': 155.56, 'F3': 174.61, 'G3': 196.00, 'Ab3': 207.65, 'Bb3': 233.08,
    'C4': 261.63, 'D4': 293.66, 'Eb4': 311.13, 'F4': 349.23, 'G4': 392.00, 'Ab4': 415.30, 'Bb4': 466.16,
    'C5': 523.25, 'D5': 587.33, 'Eb5': 622.25, 'F5': 698.46, 'G5': 783.99
};

export const battleTheme = {
    name: 'battle',
    bpm: 124,

    // 4 вариации темы пошагового боя
    variations: [
        // Вариация 1: Столкновение стали (Энергичный марш)
        {
            name: 'combat_clash',
            leadPattern: [
                'C4', 'C4', 'Eb4', 'D4', 'C4', null, 'G3', 'Bb3',
                'C4', 'Eb4', 'F4', 'G4', 'Ab4', 'G4', 'F4', 'Eb4',
                'D4', 'D4', 'F4', 'Eb4', 'D4', null, 'Bb3', 'C4',
                'D4', 'F4', 'G4', 'Ab4', 'G4', null, null, null
            ],
            bassPattern: [
                'C2', 'C2', 'C2', 'C2', 'C2', 'C2', 'Eb2', 'F2',
                'G2', 'G2', 'G2', 'G2', 'Ab2', 'G2', 'F2', 'Eb2',
                'Bb2', 'Bb2', 'Bb2', 'Bb2', 'Bb2', 'Bb2', 'D3', 'Eb3',
                'G2', 'G2', 'G2', 'G2', 'G2', 'Ab2', 'Bb2', 'B2'
            ]
        },
        // Вариация 2: Вихрь клинков и заклинаний (Интенсивная атака)
        {
            name: 'whirlwind_strike',
            leadPattern: [
                'G4', 'Eb4', 'C4', 'D4', 'Eb4', 'F4', 'G4', 'Ab4',
                'G4', 'F4', 'Eb4', 'D4', 'C4', 'D4', 'Eb4', 'C4',
                'F4', 'D4', 'Bb3', 'C4', 'D4', 'Eb4', 'F4', 'G4',
                'F4', 'Eb4', 'D4', 'C4', 'G3', null, 'C4', null
            ],
            bassPattern: [
                'C2', null, 'C2', 'C2', 'G2', null, 'Eb2', null,
                'C2', null, 'C2', 'C2', 'F2', null, 'G2', null,
                'Bb2', null, 'Bb2', 'Bb2', 'F2', null, 'D2', null,
                'G2', null, 'G2', 'G2', 'C2', null, null, null
            ]
        },
        // Вариация 3: Предел ярости (Напряженное противостояние)
        {
            name: 'rage_surge',
            leadPattern: [
                'C5', null, 'Bb4', null, 'Ab4', 'G4', 'F4', 'Eb4',
                'D4', 'Eb4', 'F4', 'G4', 'Eb4', 'C4', 'D4', null,
                'F4', null, 'Eb4', null, 'D4', 'C4', 'Bb3', 'C4',
                'D4', 'F4', 'Ab4', 'G4', 'C4', null, null, null
            ],
            bassPattern: [
                'C2', 'C2', 'Eb2', 'C2', 'F2', 'C2', 'G2', 'C2',
                'Ab2', 'Ab2', 'G2', 'G2', 'C2', 'C2', 'G2', 'C2',
                'F2', 'F2', 'Eb2', 'Eb2', 'D2', 'D2', 'G2', 'G2',
                'C2', 'C2', 'Eb2', 'G2', 'C3', null, null, null
            ]
        },
        // Вариация 4: Сокрушительный финал (Триумфальный напор)
        {
            name: 'mortal_duel',
            leadPattern: [
                'Eb4', 'G4', 'C5', 'G4', 'Ab4', 'F4', 'D4', 'F4',
                'G4', 'Eb4', 'C4', 'Eb4', 'F4', 'D4', 'Bb3', 'D4',
                'Eb4', 'G4', 'Bb4', 'C5', 'D5', 'C5', 'Bb4', 'Ab4',
                'G4', 'F4', 'Eb4', 'D4', 'C4', null, null, null
            ],
            bassPattern: [
                'C2', 'G2', 'C3', 'G2', 'Ab2', 'Eb2', 'Ab2', 'F2',
                'C2', 'G2', 'C3', 'G2', 'Bb2', 'F2', 'Bb2', 'D2',
                'C2', 'G2', 'Eb2', 'G2', 'Bb2', 'F2', 'Ab2', 'Eb2',
                'G2', 'D2', 'G2', 'B2', 'C2', null, null, null
            ]
        }
    ],

    // 3 декоративные мелодические строчки (flourishes, 30% шанс на цикл)
    extraLines: [
        // Строчка 1: Острые арпеджио кинжалов/стрел
        [
            null, null, 'G4', 'Bb4', 'C5', null, null, null,
            null, null, 'D5', 'Eb5', 'D5', null, 'C5', null,
            null, null, 'F4', 'Ab4', 'Bb4', null, null, null,
            null, null, 'G4', 'Ab4', 'G4', null, null, null
        ],
        // Строчка 2: Высокие боевые фанфары
        [
            'C5', null, null, null, 'Eb5', null, null, null,
            'G5', null, 'F5', 'Eb5', 'D5', null, null, null,
            'Bb4', null, null, null, 'D5', null, null, null,
            'G5', null, 'F5', 'D5', 'C5', null, null, null
        ],
        // Строчка 3: Быстрые синкопированные искры магии
        [
            null, 'C5', null, 'Eb5', null, 'D5', null, 'C5',
            null, 'G4', null, 'Bb4', null, 'Ab4', null, 'G4',
            null, 'D5', null, 'F5', null, 'Eb5', null, 'D5',
            null, 'G4', null, 'C5', null, null, null, null
        ]
    ],

    playLead(ctx, dest, noteName, time, duration) {
        if (!noteName || !NOTE_FREQS[noteName]) return;
        const freq = NOTE_FREQS[noteName];

        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        // Агрессивный сфокусированный лид (пила + обрезание верхов)
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, time);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1600, time);
        filter.frequency.exponentialRampToValueAtTime(600, time + duration);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.18, time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration * 0.95);

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

        // Пробивной пульсирующий бас
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, time);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, time);
        filter.frequency.exponentialRampToValueAtTime(140, time + duration);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.2, time + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration * 0.9);

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

        // Звенящий высокочастотный акцент
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);

        filter.type = 'highpass';
        filter.frequency.setValueAtTime(freq * 0.8, time);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.14, time + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration * 1.4);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(dest);

        osc.start(time);
        osc.stop(time + duration * 1.4);
    }
};

