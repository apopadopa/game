export class Sfx {
    static click(ctx, dest) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);

        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

        osc.connect(gain);
        gain.connect(dest);

        osc.start();
        osc.stop(ctx.currentTime + 0.04);
    }

    static tab(ctx, dest) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.06);

        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

        osc.connect(gain);
        gain.connect(dest);

        osc.start();
        osc.stop(ctx.currentTime + 0.06);
    }

    static dice(ctx, dest) {
        for (let i = 0; i < 4; i++) {
            const time = ctx.currentTime + i * 0.035;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(600 + Math.random() * 400, time);

            gain.gain.setValueAtTime(0.1, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.03);

            osc.connect(gain);
            gain.connect(dest);

            osc.start(time);
            osc.stop(time + 0.03);
        }
    }

    static coin(ctx, dest) {
        const playDing = (freq, delay) => {
            const time = ctx.currentTime + delay;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, time);

            gain.gain.setValueAtTime(0.18, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);

            osc.connect(gain);
            gain.connect(dest);

            osc.start(time);
            osc.stop(time + 0.25);
        };

        playDing(987.77, 0);
        playDing(1318.51, 0.08);
    }

    static selectHero(ctx, dest) {
        const notes = [146.83, 220.00, 293.66, 440.00];
        notes.forEach((freq, i) => {
            const time = ctx.currentTime + i * 0.06;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, time);

            gain.gain.setValueAtTime(0.15, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

            osc.connect(gain);
            gain.connect(dest);

            osc.start(time);
            osc.stop(time + 0.4);
        });
    }

    static step(ctx, dest) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140 + Math.random() * 30, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.06);

        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

        osc.connect(gain);
        gain.connect(dest);

        osc.start();
        osc.stop(ctx.currentTime + 0.06);
    }

    static stairs(ctx, dest) {
        const notes = [220, 185, 146];
        notes.forEach((freq, i) => {
            const time = ctx.currentTime + i * 0.07;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, time);

            gain.gain.setValueAtTime(0.15, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);

            osc.connect(gain);
            gain.connect(dest);

            osc.start(time);
            osc.stop(time + 0.1);
        });
    }

    static threat(ctx, dest) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.35);

        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

        osc.connect(gain);
        gain.connect(dest);

        osc.start();
        osc.stop(ctx.currentTime + 0.35);
    }

    static slash(ctx, dest) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(480, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.12);

        gain.gain.setValueAtTime(0.22, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

        osc.connect(gain);
        gain.connect(dest);

        osc.start();
        osc.stop(ctx.currentTime + 0.12);
    }

    static hit(ctx, dest) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(160, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.15);

        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

        osc.connect(gain);
        gain.connect(dest);

        osc.start();
        osc.stop(ctx.currentTime + 0.15);
    }

    static stab(ctx, dest) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(620, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.08);

        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

        osc.connect(gain);
        gain.connect(dest);

        osc.start();
        osc.stop(ctx.currentTime + 0.08);
    }

    static shoot(ctx, dest) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(750, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(260, ctx.currentTime + 0.14);

        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

        osc.connect(gain);
        gain.connect(dest);

        osc.start();
        osc.stop(ctx.currentTime + 0.14);
    }

    static magic(ctx, dest) {
        const freqs = [330, 440, 554, 660, 880];
        freqs.forEach((freq, i) => {
            const time = ctx.currentTime + i * 0.035;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, time);

            gain.gain.setValueAtTime(0.12, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);

            osc.connect(gain);
            gain.connect(dest);

            osc.start(time);
            osc.stop(time + 0.22);
        });
    }

    static block(ctx, dest) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(dest);

        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    }

    static heal(ctx, dest) {
        const notes = [261.63, 329.63, 392.00, 523.25];
        notes.forEach((freq, i) => {
            const time = ctx.currentTime + i * 0.06;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, time);

            gain.gain.setValueAtTime(0.15, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

            osc.connect(gain);
            gain.connect(dest);

            osc.start(time);
            osc.stop(time + 0.35);
        });
    }

    static levelUp(ctx, dest) {
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];
        notes.forEach((freq, i) => {
            const time = ctx.currentTime + i * 0.08;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, time);

            gain.gain.setValueAtTime(0.18, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.45);

            osc.connect(gain);
            gain.connect(dest);

            osc.start(time);
            osc.stop(time + 0.45);
        });
    }

    static victory(ctx, dest) {
        const melody = [
            { f: 392.00, t: 0, d: 0.15 },
            { f: 523.25, t: 0.16, d: 0.15 },
            { f: 659.25, t: 0.32, d: 0.18 },
            { f: 783.99, t: 0.52, d: 0.45 }
        ];

        melody.forEach(item => {
            const time = ctx.currentTime + item.t;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(item.f, time);

            gain.gain.setValueAtTime(0.2, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + item.d);

            osc.connect(gain);
            gain.connect(dest);

            osc.start(time);
            osc.stop(time + item.d);
        });
    }

    static defeat(ctx, dest) {
        const notes = [293.66, 261.63, 220.00, 174.61];
        notes.forEach((freq, i) => {
            const time = ctx.currentTime + i * 0.18;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, time);

            gain.gain.setValueAtTime(0.14, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

            osc.connect(gain);
            gain.connect(dest);

            osc.start(time);
            osc.stop(time + 0.35);
        });
    }

    static questComplete(ctx, dest) {
        // Сияющий перезвон завершения квеста или открытия сундука (C5, E5, G5, C6)
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, i) => {
            const time = ctx.currentTime + i * 0.08;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, time);

            gain.gain.setValueAtTime(0.2, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.45);

            osc.connect(gain);
            gain.connect(dest);

            osc.start(time);
            osc.stop(time + 0.45);
        });
    }

    static chestOpen(ctx, dest) {
        // Звук открывающегося тяжелого замка и скрипа дерева
        const creakOsc = ctx.createOscillator();
        const creakGain = ctx.createGain();
        creakOsc.type = 'sawtooth';
        creakOsc.frequency.setValueAtTime(120, ctx.currentTime);
        creakOsc.frequency.linearRampToValueAtTime(240, ctx.currentTime + 0.12);

        creakGain.gain.setValueAtTime(0.15, ctx.currentTime);
        creakGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

        creakOsc.connect(creakGain);
        creakGain.connect(dest);

        creakOsc.start();
        creakOsc.stop(ctx.currentTime + 0.14);

        // Золотой перезвон монет внутри
        const jingleNotes = [880.00, 1174.66, 1396.91, 1760.00];
        jingleNotes.forEach((freq, i) => {
            const time = ctx.currentTime + 0.1 + i * 0.05;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, time);

            gain.gain.setValueAtTime(0.18, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

            osc.connect(gain);
            gain.connect(dest);

            osc.start(time);
            osc.stop(time + 0.35);
        });
    }

    static rareDrop(ctx, dest) {
        // Мистическая фанфара редкого трофея монстра
        const melody = [
            { f: 440.00, t: 0, d: 0.12 },
            { f: 554.37, t: 0.1, d: 0.12 },
            { f: 659.25, t: 0.2, d: 0.15 },
            { f: 880.00, t: 0.32, d: 0.18 },
            { f: 1108.73, t: 0.46, d: 0.55 }
        ];

        melody.forEach(item => {
            const time = ctx.currentTime + item.t;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(item.f, time);

            gain.gain.setValueAtTime(0.22, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + item.d);

            osc.connect(gain);
            gain.connect(dest);

            osc.start(time);
            osc.stop(time + item.d);
        });
    }

    static typewriter(ctx, dest) {
        // Мягкий винтажный щелчок пера / печатного символа
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        const pitch = 360 + (Math.random() * 80 - 40);
        osc.frequency.setValueAtTime(pitch, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.028);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);

        osc.connect(gain);
        gain.connect(dest);

        osc.start(now);
        osc.stop(now + 0.028);
    }
}