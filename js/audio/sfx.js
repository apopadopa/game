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
}