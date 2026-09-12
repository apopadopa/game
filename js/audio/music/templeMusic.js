const NOTE_FREQS = {
    'C3': 130.81, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00,
    'B3': 246.94, 'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
    'G4': 392.00, 'A4': 440.00, 'B4': 493.88, 'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'G5': 783.99
};

export const templeMusic = {
    name: 'temple',
    bpm: 64,

    // 4 вариации темы храма
    variations: [
        // Вариация 1: Священный гимн под каменными сводами
        {
            name: 'sacred_hymn',
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
            ]
        },
        // Вариация 2: Молитва об исцелении и божественное благословение
        {
            name: 'healing_prayer',
            leadPattern: [
                'E4', null, 'G4', null, 'C5', null, 'B4', null,
                'A4', null, 'G4', null, 'F4', 'E4', 'D4', null,
                'G4', null, 'C5', null, 'E5', null, 'D5', null,
                'C5', 'B4', 'A4', 'G4', 'E4', null, 'C4', null
            ],
            bassPattern: [
                'C3', null, 'G3', null, 'A2', null, 'E3', null,
                'F2', null, 'C3', null, 'G2', null, 'D3', null,
                'C3', null, 'E3', null, 'F3', null, 'G3', null,
                'A2', null, 'G2', null, 'C3', null, null, null
            ]
        },
        // Вариация 3: Свет витражей и мерцание свечей
        {
            name: 'stained_glass_light',
            leadPattern: [
                'G4', null, null, 'E4', 'F4', null, null, 'D4',
                'E4', null, null, 'C4', 'D4', null, null, null,
                'E4', 'F4', 'G4', 'A4', 'B4', null, 'C5', null,
                'G4', null, 'E4', null, 'C4', null, null, null
            ],
            bassPattern: [
                'C3', null, null, null, 'F2', null, null, null,
                'C3', null, null, null, 'G2', null, null, null,
                'A2', null, null, null, 'F2', null, null, null,
                'G2', null, null, null, 'C3', null, null, null
            ]
        },
        // Вариация 4: Небесный покой и очищение души
        {
            name: 'celestial_peace',
            leadPattern: [
                'C5', null, null, null, 'G4', null, null, null,
                'E4', null, null, null, 'G4', null, null, null,
                'A4', null, null, null, 'F4', null, null, null,
                'D4', null, 'E4', null, 'C4', null, null, null
            ],
            bassPattern: [
                'C3', null, null, null, null, null, null, null,
                'A2', null, null, null, null, null, null, null,
                'F2', null, null, null, null, null, null, null,
                'G2', null, null, null, 'C3', null, null, null
            ]
        }
    ],

    // Дополнительные строчки (flourishes, 30% шанс)
    extraLines: [
        // Строчка 1: Ангельский звон золотого колокола
        [
            'C5', null, null, 'E5', null, null, 'G5', null,
            'E5', null, null, 'D5', null, null, 'C5', null,
            'A4', null, null, 'C5', null, null, 'E5', null,
            'D5', null, 'B4', null, 'C5', null, null, null
        ],
        // Строчка 2: Снисхождение благодати
        [
            null, null, 'G5', null, 'E5', null, 'C5', null,
            null, null, 'F5', null, 'D5', null, 'B4', null,
            null, null, 'E5', null, 'C5', null, 'A4', null,
            'G4', null, 'D4', null, 'C4', null, null, null
        ],
        // Строчка 3: Поющая чаша храма
        [
            'G5', null, null, null, 'E5', null, null, null,
            'C5', null, null, null, 'D5', null, null, null,
            'E5', null, null, null, 'F4', null, null, null,
            'G4', null, null, null, 'C5', null, null, null
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
    },

    playFlourish(ctx, dest, noteName, time, duration) {
        if (!noteName || !NOTE_FREQS[noteName]) return;
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        // Прозрачный звон золотого храмового колокольчика
        osc.type = 'sine';
        osc.frequency.setValueAtTime(NOTE_FREQS[noteName], time);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(NOTE_FREQS[noteName] * 2, time);
        filter.Q.setValueAtTime(4.0, time);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.14, time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration * 2.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(dest);

        osc.start(time);
        osc.stop(time + duration * 2.2);
    }
};