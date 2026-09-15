import { sound } from '../audio/audioEngine.js';

export class AudioSettings {
    static updateSliderFill(input) {
        if (!input || input.type !== 'range') return;
        const min = parseFloat(input.min) || 0;
        const max = parseFloat(input.max) || 100;
        const val = parseFloat(input.value) || 0;
        const pct = Math.max(0, Math.min(100, ((val - min) / (max - min)) * 100));
        input.style.setProperty('--fill', `${pct}%`);
    }

    static init() {
        const modal = document.getElementById('settings-modal');
        const btnOpen = document.getElementById('btn-open-settings');
        const btnClose = document.getElementById('btn-close-settings');

        const sliderMaster = document.getElementById('slider-master');
        const sliderMusic = document.getElementById('slider-music');
        const sliderSfx = document.getElementById('slider-sfx');
        const sliderText = document.getElementById('slider-text');
        const chkMute = document.getElementById('chk-mute');

        const labelMaster = document.getElementById('label-master-val');
        const labelMusic = document.getElementById('label-music-val');
        const labelSfx = document.getElementById('label-sfx-val');
        const labelText = document.getElementById('label-text-val');

        // Инициализируем визуальный градиент заполнения для всех ползунков настроек
        [sliderMaster, sliderMusic, sliderSfx, sliderText].forEach(s => this.updateSliderFill(s));

        // Глобальный слушатель для любых существующих и будущих кастомных ползунков в игре
        document.addEventListener('input', (e) => {
            if (e.target && e.target.type === 'range') {
                this.updateSliderFill(e.target);
            }
        });

        btnOpen.addEventListener('click', () => {
            sound.ensureReady();
            sound.playSfx('click');
            modal.classList.remove('hidden');
        });

        btnClose.addEventListener('click', () => {
            sound.playSfx('click');
            modal.classList.add('hidden');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                sound.playSfx('click');
                modal.classList.add('hidden');
            }
        });

        sliderMaster.addEventListener('input', (e) => {
            const val = parseInt(e.target.value, 10);
            labelMaster.textContent = `${val}%`;
            sound.setMasterVolume(val / 100);
        });

        sliderMusic.addEventListener('input', (e) => {
            const val = parseInt(e.target.value, 10);
            labelMusic.textContent = `${val}%`;
            sound.setMusicVolume(val / 100);
        });

        let sfxTestTimer = null;
        sliderSfx.addEventListener('input', (e) => {
            const val = parseInt(e.target.value, 10);
            labelSfx.textContent = `${val}%`;
            sound.setSfxVolume(val / 100);

            if (!sfxTestTimer) {
                sfxTestTimer = setTimeout(() => {
                    sound.playSfx('coin');
                    sfxTestTimer = null;
                }, 120);
            }
        });

        if (sliderText) {
            let textTestTimer = null;
            sliderText.addEventListener('input', (e) => {
                const val = parseInt(e.target.value, 10);
                if (labelText) labelText.textContent = `${val}%`;
                sound.setTextVolume(val / 100);

                if (!textTestTimer) {
                    textTestTimer = setTimeout(() => {
                        sound.playTextSound();
                        textTestTimer = null;
                    }, 100);
                }
            });
        }

        chkMute.addEventListener('change', (e) => {
            const isMuted = e.target.checked;
            sound.setMute(isMuted);
            btnOpen.textContent = isMuted ? 'Звук отключён' : 'Настройки звука';
        });
    }
}