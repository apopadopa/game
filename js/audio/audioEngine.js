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
        this.isAlive = true;
    }

    schedule(lookahead) {
        const patternLen = this.track.leadPattern.length;

        while (this.nextNoteTime < this.ctx.currentTime + lookahead) {
            const step = this.currentStep % patternLen;
            const leadNote = this.track.leadPattern[step];
            const bassNote = this.track.bassPattern[step];

            if (leadNote) {
                this.track.playLead(this.ctx, this.gainNode, leadNote, this.nextNoteTime, this.stepDuration * 2.2);
            }
            if (bassNote) {
                this.track.playBass(this.ctx, this.gainNode, bassNote, this.nextNoteTime, this.stepDuration * 3.8);
            }

            this.nextNoteTime += this.stepDuration;
            this.currentStep++;
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
        if (this.isMuted) return;

        if (typeof Sfx[name] === 'function') {
            Sfx[name](this.ctx, this.sfxGain);
        }
    }
}

export const sound = new AudioEngine();