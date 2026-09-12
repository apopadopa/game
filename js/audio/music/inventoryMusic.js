const NOTE_FREQS = {
    'A2': 110.00, 'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00,
    'A3': 220.00, 'B3': 246.94, 'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
    'G4': 392.00, 'A4': 440.00, 'B4': 493.88, 'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'A5': 880.00
};

export const inventoryMusic = {
    name: 'inventory',
    bpm: 78,

    // 4 вариации темы инвентаря
    variations: [
        // Вариация 1: Спокойная переливчатая акустическая лютня в ля-миноре
        {
            name: 'lute_ballad',
            leadPattern: [
                'A3', 'C4', 'E4', 'A4', 'G4', 'E4', 'C4', 'D4',
                'E4', 'C4', 'A3', 'C4', 'B3', 'G3', 'A3', null,
                'C4', 'E4', 'G4', 'C5', 'B4', 'G4', 'E4', 'F4',
                'G4', 'E4', 'D4', 'B3', 'A3', null, null, null
            ],
            bassPattern: [
                'A2', null, 'E3', null, 'G2', null, 'D3', null,
                'F2', null, 'C3', null, 'E2', null, 'E3', null,
                'A2', null, 'E3', null, 'C3', null, 'G3', null,
                'D3', null, 'F3', null, 'A2', null, null, null
            ]
        },
        // Вариация 2: Отдых у костра и починка снаряжения
        {
            name: 'campfire_rest',
            leadPattern: [
                'E4', 'A4', 'C5', 'B4', 'A4', 'G4', 'A4', 'E4',
                'F4', 'G4', 'A4', 'F4', 'E4', 'D4', 'E4', null,
                'A4', 'B4', 'C5', 'D5', 'C5', 'A4', 'B4', 'G4',
                'A4', 'F4', 'E4', 'B3', 'A3', null, null, null
            ],
            bassPattern: [
                'A2', null, 'C3', null, 'F2', null, 'C3', null,
                'D3', null, 'F3', null, 'E2', null, 'B2', null,
                'A2', null, 'E3', null, 'G2', null, 'D3', null,
                'F2', null, 'E2', null, 'A2', null, null, null
            ]
        },
        // Вариация 3: Древние свитки и тайные руны
        {
            name: 'ancient_parchments',
            leadPattern: [
                'C4', 'D4', 'E4', 'G4', 'A4', null, 'G4', 'E4',
                'D4', 'E4', 'F4', 'D4', 'C4', 'D4', 'E4', null,
                'E4', 'G4', 'B4', 'C5', 'A4', null, 'G4', 'E4',
                'D4', 'F4', 'E4', 'C4', 'A3', null, null, null
            ],
            bassPattern: [
                'A2', 'E3', null, 'A2', 'C3', 'G3', null, 'C3',
                'D3', 'A3', null, 'D3', 'E2', 'B2', null, 'E2',
                'F2', 'C3', null, 'F2', 'G2', 'D3', null, 'G2',
                'E2', 'B2', null, 'E2', 'A2', null, null, null
            ]
        },
        // Вариация 4: Звёздная ночь над лагерем
        {
            name: 'starlit_night',
            leadPattern: [
                'A4', null, 'E4', null, 'C4', null, 'B3', 'C4',
                'D4', null, 'B3', null, 'G3', null, 'A3', 'B3',
                'C4', null, 'E4', null, 'A4', null, 'G4', 'E4',
                'F4', 'E4', 'D4', 'B3', 'A3', null, null, null
            ],
            bassPattern: [
                'A2', null, null, null, 'G2', null, null, null,
                'F2', null, null, null, 'E2', null, null, null,
                'A2', null, null, null, 'C3', null, null, null,
                'D3', null, 'E2', null, 'A2', null, null, null
            ]
        }
    ],

    // Дополнительные строчки (flourishes, 30% шанс)
    extraLines: [
        // Строчка 1: Хрустальные флажолеты арфы
        [
            null, null, 'E5', 'C5', 'A4', null, null, null,
            null, null, 'D5', 'B4', 'G4', null, null, null,
            null, null, 'C5', 'A4', 'E4', null, null, null,
            'G4', 'E4', 'D4', 'B3', 'A4', null, null, null
        ],
        // Строчка 2: Мягкий каскад нот лютни
        [
            'A4', 'C5', 'E5', 'A5', 'G5', 'E5', 'C5', 'A4',
            'B4', 'D5', 'G5', 'E5', 'D5', 'B4', 'G4', 'E4',
            'F4', 'A4', 'C5', 'F5', 'E5', 'C5', 'A4', 'F4',
            'E4', 'G4', 'B4', 'E5', 'A4', null, null, null
        ],
        // Строчка 3: Спокойный акцентный перебор
        [
            'E5', null, null, null, 'C5', null, null, null,
            'B4', null, null, null, 'G4', null, null, null,
            'A4', null, null, null, 'E4', null, null, null,
            'D4', null, 'E4', null, 'A3', null, null, null
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
        filter.frequency.setValueAtTime(2200, time);
        filter.frequency.exponentialRampToValueAtTime(500, time + duration * 1.2);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.18, time + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration * 1.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(dest);

        osc.start(time);
        osc.stop(time + duration * 1.5);
    },

    playBass(ctx, dest, noteName, time, duration) {
        if (!noteName || !NOTE_FREQS[noteName]) return;
        const freq = NOTE_FREQS[noteName];

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.22, time + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration * 1.8);

        osc.connect(gain);
        gain.connect(dest);

        osc.start(time);
        osc.stop(time + duration * 1.8);
    },

    playFlourish(ctx, dest, noteName, time, duration) {
        if (!noteName || !NOTE_FREQS[noteName]) return;
        const freq = NOTE_FREQS[noteName];

        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        // Тонкий перелив щипка струны
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(freq * 1.8, time);
        filter.Q.setValueAtTime(3.2, time);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.12, time + 0.006);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration * 1.6);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(dest);

        osc.start(time);
        osc.stop(time + duration * 1.6);
    }
};
