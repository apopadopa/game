import { Sfx } from './sfx.js';

class ActiveTrackInstance {
    constructor(ctx, parentGain, track) {
        this.ctx = ctx;
        this.track = track;
        this.gainNode = ctx.createGain();
        this.gainNode.connect(parentGain);

        this.stepDuration = 60 / (track.bpm * 4);
        this.nextNoteTime = ctx.currentTime + 0.05;
        this.currentStep = 0;
        this.stepInPattern = 0;
        this.isAlive = true;

        this.currentVariationIndex = 0;
        this.activeFlourishPattern = null;

        // Инициализируем вариацию и проверяем 30% шанс на дополнительную строчку
        this.initVariationCycle(true);
    }

    initVariationCycle(isInitial = false) {
        const variations = this.track.variations;
        if (variations && variations.length > 1) {
            if (isInitial) {
                this.currentVariationIndex = 0;
            } else {
                const count = variations.length;
                let nextIdx = Math.floor(Math.random() * count);
                if (nextIdx === this.currentVariationIndex && count > 1) {
                    nextIdx = (nextIdx + 1 + Math.floor(Math.random() * (count - 1))) % count;
                }
                this.currentVariationIndex = nextIdx;
            }
        }

        // Шанс 30% на проигрывание дополнительной украшающей строчки в текущем цикле
        const extraLines = this.track.extraLines || [];
        if (extraLines.length > 0 && Math.random() < 0.30) {
            const fIdx = Math.floor(Math.random() * extraLines.length);
            this.activeFlourishPattern = extraLines[fIdx];
        } else {
            this.activeFlourishPattern = null;
        }
    }

    schedule(lookahead) {
        while (this.nextNoteTime < this.ctx.currentTime + lookahead) {
            const activeVar = (this.track.variations && this.track.variations[this.currentVariationIndex])
                || { leadPattern: this.track.leadPattern, bassPattern: this.track.bassPattern };
            const patternLen = (activeVar.leadPattern && activeVar.leadPattern.length) || 32;

            const step = this.stepInPattern % patternLen;

            // Если завершился предыдущий цикл и начинается новый такт (шаг 0)
            if (step === 0 && this.currentStep > 0) {
                this.initVariationCycle(false);
            }

            // Читаем ноты для текущей вариации
            const activeVarNow = (this.track.variations && this.track.variations[this.currentVariationIndex])
                || { leadPattern: this.track.leadPattern, bassPattern: this.track.bassPattern };
            const leadNote = activeVarNow.leadPattern ? activeVarNow.leadPattern[step] : null;
            const bassNote = activeVarNow.bassPattern ? activeVarNow.bassPattern[step] : null;

            if (leadNote && typeof this.track.playLead === 'function') {
                this.track.playLead(this.ctx, this.gainNode, leadNote, this.nextNoteTime, this.stepDuration * 2.2);
            }
            if (bassNote && typeof this.track.playBass === 'function') {
                this.track.playBass(this.ctx, this.gainNode, bassNote, this.nextNoteTime, this.stepDuration * 3.8);
            }

            // Дополнительная мелодическая строчка (flourish) при активации шанса 30%
            if (this.activeFlourishPattern) {
                const fStep = step % this.activeFlourishPattern.length;
                const flourishNote = this.activeFlourishPattern[fStep];
                if (flourishNote) {
                    if (typeof this.track.playFlourish === 'function') {
                        this.track.playFlourish(this.ctx, this.gainNode, flourishNote, this.nextNoteTime, this.stepDuration * 2.0);
                    } else if (typeof this.track.playLead === 'function') {
                        this.track.playLead(this.ctx, this.gainNode, flourishNote, this.nextNoteTime, this.stepDuration * 1.8);
                    }
                }
            }

            this.nextNoteTime += this.stepDuration;
            this.currentStep++;
            this.stepInPattern = (this.stepInPattern + 1) % patternLen;
        }
    }

    fadeIn(duration = 1.0) {
        const now = this.ctx.currentTime;
        this.gainNode.gain.setValueAtTime(0.0001, now);
        this.gainNode.gain.linearRampToValueAtTime(1.0, now + duration);
    }

    fadeOutAndDestroy(duration = 1.0) {
        this.isAlive = false;
        const now = this.ctx.currentTime;
        this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
        this.gainNode.gain.linearRampToValueAtTime(0.0001, now + duration);

        setTimeout(() => {
            try {
                this.gainNode.disconnect();
            } catch (e) {}
        }, duration * 1000 + 50);
    }
}

export class AudioEngine {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.musicGain = null;
        this.sfxGain = null;

        this.masterVolume = 0.8;
        this.musicVolume = 0.5;
        this.sfxVolume = 0.7;
        this.isMuted = false;

        this.activeTracks = [];
        this.currentTrackData = null;
        this.clockInterval = null;
    }

    init() {
        if (this.ctx) return;
        if (typeof window === 'undefined') return;

        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContextClass();

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.masterVolume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.setValueAtTime(this.musicVolume, this.ctx.currentTime);
        this.musicGain.connect(this.masterGain);

        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.setValueAtTime(this.sfxVolume, this.ctx.currentTime);
        this.sfxGain.connect(this.masterGain);

        this.startSchedulerClock();
    }

    ensureReady() {
        this.init();
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    startSchedulerClock() {
        if (this.clockInterval) return;

        this.clockInterval = setInterval(() => {
            if (!this.ctx || this.ctx.state !== 'running') return;

            for (let i = this.activeTracks.length - 1; i >= 0; i--) {
                const trackInst = this.activeTracks[i];
                if (trackInst.isAlive) {
                    trackInst.schedule(0.12);
                } else {
                    this.activeTracks.splice(i, 1);
                }
            }
        }, 30);
    }

    switchMusic(track, fadeDuration = 1.2) {
        this.ensureReady();
        if (this.currentTrackData && this.currentTrackData.name === track.name) {
            return;
        }

        this.currentTrackData = track;

        this.activeTracks.forEach(t => t.fadeOutAndDestroy(fadeDuration));

        const newInstance = new ActiveTrackInstance(this.ctx, this.musicGain, track);
        newInstance.fadeIn(fadeDuration);
        this.activeTracks.push(newInstance);
    }

    stopMusic(fadeDuration = 0.8) {
        this.currentTrackData = null;
        this.activeTracks.forEach(t => t.fadeOutAndDestroy(fadeDuration));
    }

    setMasterVolume(val) {
        this.ensureReady();
        this.masterVolume = Math.max(0, Math.min(1, val));
        if (!this.isMuted && this.masterGain) {
            this.masterGain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
        }
    }

    setMusicVolume(val) {
        this.ensureReady();
        this.musicVolume = Math.max(0, Math.min(1, val));
        if (this.musicGain) {
            this.musicGain.gain.setValueAtTime(this.musicVolume, this.ctx.currentTime);
        }
    }

    setSfxVolume(val) {
        this.ensureReady();
        this.sfxVolume = Math.max(0, Math.min(1, val));
        if (this.sfxGain) {
            this.sfxGain.gain.setValueAtTime(this.sfxVolume, this.ctx.currentTime);
        }
    }

    setMute(muteState) {
        this.ensureReady();
        this.isMuted = muteState;
        if (this.masterGain) {
            this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.masterVolume, this.ctx.currentTime);
        }
    }

    playSfx(name) {
        this.ensureReady();
        if (this.isMuted || !this.ctx) return;

        if (typeof Sfx[name] === 'function') {
            Sfx[name](this.ctx, this.sfxGain);
        }
    }
}

export const sound = new AudioEngine();