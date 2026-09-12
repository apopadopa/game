const NOTE_FREQS = {
    'C2': 65.41, 'D2': 73.42, 'Eb2': 77.78, 'F2': 87.31, 'G2': 98.00, 'Ab2': 103.83, 'Bb2': 116.54,
    'C3': 130.81, 'D3': 146.83, 'Eb3': 155.56, 'F3': 174.61, 'G3': 196.00, 'Ab3': 207.65, 'Bb3': 233.08,
    'C4': 261.63, 'D4': 293.66, 'Eb4': 311.13, 'F4': 349.23, 'G4': 392.00, 'Ab4': 415.30, 'Bb4': 466.16,
    'C5': 523.25, 'D5': 587.33, 'Eb5': 622.25, 'G5': 783.99
};

export const dungeonTheme = {
    name: 'dungeon',
    bpm: 72,

    // 4 вариации темы подземелья
    variations: [
        // Вариация 1: Капающие своды и сырой гранит (Классика)
        {
            name: 'dripping_caverns',
            leadPattern: [
                'C4', null, 'Eb4', null, 'D4', null, null, null,
                'G3', null, 'Ab3', null, 'G3', null, 'F3', null,
                'C4', null, 'D4', 'Eb4', 'D4', null, null, null,
                'Ab3', null, 'G3', null, 'C3', null, null, null
            ],
            bassPattern: [
                'C2', null, 'C2', null, 'G2', null, 'C2', null,
                'Ab2', null, 'Ab2', null, 'G2', null, 'G2', null,
                'C2', null, 'Eb2', null, 'F2', null, 'G2', null,
                'Ab2', null, 'G2', null, 'C2', null, null, null
            ]
        },
        // Вариация 2: Крадущиеся тени и затаившиеся твари
        {
            name: 'stalking_shadows',
            leadPattern: [
                'Eb4', 'D4', 'C4', null, 'D4', 'C4', 'B2', null,
                'C4', 'Eb4', 'G4', null, 'F4', 'Eb4', 'D4', null,
                'Ab4', null, 'G4', null, 'F4', 'Eb4', 'D4', null,
                'Eb4', 'D4', 'C4', null, 'G3', null, null, null
            ],
            bassPattern: [
                'C2', null, null, 'C2', 'Eb2', null, null, 'Eb2',
                'F2', null, null, 'F2', 'G2', null, null, 'G2',
                'Ab2', null, null, 'Ab2', 'G2', null, null, 'G2',
                'C2', null, 'G2', null, 'C2', null, null, null
            ]
        },
        // Вариация 3: Древняя ритуальная крипта
        {
            name: 'forgotten_crypt',
            leadPattern: [
                'G4', null, 'Eb4', null, 'C4', null, 'D4', null,
                'Eb4', null, 'F4', null, 'G4', null, 'Ab4', null,
                'G4', 'F4', 'Eb4', 'D4', 'C4', 'D4', 'Eb4', null,
                'D4', null, 'G3', null, 'C4', null, null, null
            ],
            bassPattern: [
                'C2', 'C2', null, 'G2', 'C2', 'C2', null, 'Eb2',
                'F2', 'F2', null, 'C2', 'G2', 'G2', null, 'D2',
                'Ab2', 'Ab2', null, 'Eb2', 'G2', 'G2', null, 'D2',
                'C2', null, 'G2', null, 'C2', null, null, null
            ]
        },
        // Вариация 4: Безмолвие бездны
        {
            name: 'abyssal_depths',
            leadPattern: [
                'C3', null, null, null, 'Eb4', null, null, null,
                'G3', null, null, null, 'D4', null, null, null,
                'Ab3', null, null, null, 'C4', null, null, null,
                'G3', null, 'F3', null, 'Eb3', null, 'C3', null
            ],
            bassPattern: [
                'C2', null, null, null, null, null, null, null,
                'G2', null, null, null, null, null, null, null,
                'Ab2', null, null, null, null, null, null, null,
                'G2', null, null, null, 'C2', null, null, null
            ]
        }
    ],

    // Дополнительные строчки (flourishes, 30% шанс)
    extraLines: [
        // Строчка 1: Высокие капли минеральной воды в пещере
        [
            'C5', null, null, 'Eb5', null, null, 'G5', null,
            null, 'D5', null, null, 'Ab4', null, null, null,
            'Eb5', null, null, 'C5', null, null, 'D5', null,
            'G4', null, null, null, 'C4', null, null, null
        ],
        // Строчка 2: Зловещий потусторонний перезвон
        [
            null, null, 'G5', 'F5', 'Eb5', null, null, null,
            null, null, 'D5', 'C5', 'B4', null, null, null,
            null, null, 'Ab4', 'G4', 'F4', null, null, null,
            'Eb4', 'D4', 'C4', null, null, null, null, null
        ],
        // Строчка 3: Резонирующий холодный гул
        [
            'Eb5', null, null, null, 'D5', null, null, null,
            'C5', null, null, null, 'G4', null, null, null,
            'Ab4', null, null, null, 'G4', null, null, null,
            'Eb4', null, 'D4', null, 'C4', null, null, null
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

        // Капельно-колокольный тембр подземелья
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(freq * 1.5, time);
        filter.Q.setValueAtTime(3.0, time);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.14, time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration * 1.4);

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
        const subOsc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        // Глубокий резонирующий бас
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);

        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(freq * 0.5, time);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(350, time);
        filter.frequency.exponentialRampToValueAtTime(120, time + duration);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.22, time + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration * 1.2);

        osc.connect(filter);
        subOsc.connect(filter);
        filter.connect(gain);
        gain.connect(dest);

        osc.start(time);
        subOsc.start(time);
        osc.stop(time + duration * 1.3);
        subOsc.stop(time + duration * 1.3);
    },

    playFlourish(ctx, dest, noteName, time, duration) {
        if (!noteName || !NOTE_FREQS[noteName]) return;
        const freq = NOTE_FREQS[noteName];

        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        // Прозрачный капельный призвук сталактитов
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        filter.type = 'highpass';
        filter.frequency.setValueAtTime(freq * 0.9, time);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(0.12, time + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration * 1.6);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(dest);

        osc.start(time);
        osc.stop(time + duration * 1.6);
    }
};
