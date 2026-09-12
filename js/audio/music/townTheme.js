const NOTE_FREQS = {
    'G2': 98.00, 'A2': 110.00, 'B2': 123.47, 'C3': 130.81, 'D3': 146.83,
    'E3': 164.81, 'F#3': 185.00, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F#4': 369.99, 'G4': 392.00,
    'A4': 440.00, 'B4': 493.88, 'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'G5': 783.99
};

export const townTheme = {
    name: 'town',
    bpm: 102,

    // 4 вариации городской темы
    variations: [
        // Вариация 1: Солнечная торговая площадь
        {
            name: 'sunny_plaza',
            leadPattern: [
                'G3', 'B3', 'D4', 'G4', 'E4', 'D4', 'B3', 'C4',
                'D4', 'B3', 'G3', 'B3', 'A3', 'G3', 'E3', 'D3',
                'C4', 'E4', 'G4', 'E4', 'D4', 'B3', 'G3', 'B3',
                'A3', 'B3', 'C4', 'D4', 'G3', null, null, null
            ],
            bassPattern: [
                'G2', null, 'D3', null, 'C3', null, 'E3', null,
                'G2', null, 'D3', null, 'D3', null, 'A2', null,
                'C3', null, 'G2', null, 'G2', null, 'B2', null,
                'D3', null, 'D3', null, 'G2', null, null, null
            ]
        },
        // Вариация 2: Оживлённая ярмарка и уличные менестрели
        {
            name: 'fair_breeze',
            leadPattern: [
                'D4', 'G4', 'B4', 'A4', 'G4', 'F#4', 'G4', 'E4',
                'D4', 'E4', 'D4', 'B3', 'C4', 'D4', 'E4', 'F#4',
                'G4', 'D4', 'B3', 'D4', 'E4', 'C4', 'A3', 'C4',
                'D4', 'B3', 'A3', 'F#3', 'G3', null, null, null
            ],
            bassPattern: [
                'G2', null, 'B2', null, 'C3', null, 'C3', null,
                'D3', null, 'B2', null, 'A2', null, 'D3', null,
                'G2', null, 'D3', null, 'C3', null, 'E3', null,
                'D3', null, 'D3', null, 'G2', null, null, null
            ]
        },
        // Вариация 3: Благородный проспект у стен ратуши
        {
            name: 'noble_avenue',
            leadPattern: [
                'B3', 'D4', 'G4', 'B4', 'A4', 'G4', 'F#4', 'E4',
                'F#4', 'G4', 'A4', 'F#4', 'D4', 'E4', 'F#4', null,
                'E4', 'G4', 'C5', 'B4', 'A4', 'G4', 'E4', 'G4',
                'D4', 'F#4', 'A4', 'C5', 'B4', null, 'G4', null
            ],
            bassPattern: [
                'G2', 'D3', 'G2', null, 'C3', 'G2', 'C3', null,
                'D3', 'A2', 'D3', null, 'B2', 'G2', 'B2', null,
                'C3', 'E3', 'C3', null, 'A2', 'E3', 'A2', null,
                'D3', 'F#3', 'D3', null, 'G2', null, null, null
            ]
        },
        // Вариация 4: Вечерний уют и тёплые фонари
        {
            name: 'evening_lanterns',
            leadPattern: [
                'G4', null, 'D4', null, 'B3', null, 'C4', 'D4',
                'E4', null, 'C4', null, 'A3', null, 'B3', 'C4',
                'D4', null, 'B3', null, 'G3', null, 'A3', 'B3',
                'C4', 'B3', 'A3', 'F#3', 'G3', null, null, null
            ],
            bassPattern: [
                'G2', null, null, null, 'C3', null, null, null,
                'A2', null, null, null, 'D3', null, null, null,
                'B2', null, null, null, 'E3', null, null, null,
                'C3', null, 'D3', null, 'G2', null, null, null
            ]
        }
    ],

    // Дополнительные строчки (flourishes, 30% шанс)
    extraLines: [
        // Строчка 1: Высокий перелив флейты
        [
            null, null, 'G5', 'D5', 'B4', 'C5', 'D5', null,
            null, null, 'E5', 'D5', 'C5', 'B4', 'A4', null,
            null, null, 'G5', 'E5', 'C5', 'D5', 'E5', null,
            'F#4', 'A4', 'D5', 'F#5', 'G5', null, null, null
        ],
        // Строчка 2: Игривая трель менестреля
        [
            'D5', 'B4', 'G4', 'B4', 'D5', null, 'C5', null,
            'B4', 'G4', 'E4', 'G4', 'B4', null, 'A4', null,
            'C5', 'A4', 'F#4', 'A4', 'C5', null, 'B4', null,
            'A4', 'F#4', 'D4', 'F#4', 'G4', null, null, null
        ],
        // Строчка 3: Акцентные гармонические звоны
        [
            'G5', null, null, null, 'E5', null, null, null,
            'D5', null, null, null, 'C5', null, null, null,
            'B4', null, null, null, 'C5', null, null, null,
            'D5', null, 'F#4', null, 'G4', null, null, null
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
        filter.frequency.setValueAtTime(1600, time);
        filter.frequency.exponentialRampToValueAtTime(450, time + duration);

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

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.24, time + 0.04);
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

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(freq * 1.6, time);
        filter.Q.setValueAtTime(3.0, time);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.13, time + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration * 1.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(dest);

        osc.start(time);
        osc.stop(time + duration * 1.5);
    }
};