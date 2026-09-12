import { sound } from '../audio/audioEngine.js';
import { SaveSystem } from '../services/saveSystem.js';

export class MainMenu {
    constructor(callbacks) {
        this.callbacks = callbacks;
    }

    render(container) {
        const hasSave = SaveSystem.hasSave();
        const savedPlayer = hasSave ? SaveSystem.load() : null;

        container.innerHTML = `
            <div class="menu-screen">
                <h1 class="game-title">Спуск во Тьму</h1>
                <p class="game-subtitle">Подземелья, монстры и сокровища</p>

                <div class="menu-buttons">
                    <button class="btn" id="btn-new-game">Новая игра</button>
                    <button class="btn" id="btn-continue" ${hasSave ? '' : 'disabled'}>
                        ${savedPlayer ? `Продолжить (${savedPlayer.name})` : 'Продолжить'}
                    </button>
                    <button class="btn" id="btn-about">Об игре</button>
                </div>

                <div class="version-info">v0.4.0 • Живой Мир & Интерьеры</div>

                <!-- Скрытая секретная кнопка в левом нижнем углу для перехода к бестиарию (3 клика, без звука) -->
                <button class="secret-bestiary-trigger" id="secret-bestiary-trigger" title="" aria-hidden="true" tabindex="-1"></button>
            </div>
        `;

        this.initEvents(container, savedPlayer);
    }

    initEvents(container, savedPlayer) {
        const btnNewGame = container.querySelector('#btn-new-game');
        const btnContinue = container.querySelector('#btn-continue');
        const btnAbout = container.querySelector('#btn-about');
        const secretTrigger = container.querySelector('#secret-bestiary-trigger');

        btnNewGame.addEventListener('click', () => {
            if (this.callbacks.onStartGame) {
                this.callbacks.onStartGame();
            }
        });

        if (btnContinue && !btnContinue.disabled) {
            btnContinue.addEventListener('click', () => {
                sound.playSfx('selectHero');
                if (this.callbacks.onContinueGame) {
                    this.callbacks.onContinueGame(savedPlayer);
                }
            });
        }

        btnAbout.addEventListener('click', () => {
            sound.playSfx('click');
            alert('Спуск во Тьму — RPG-рогалик.\nСпускайся в катакомбы, побеждай монстров, экипируй героя, собирай лут и торгуй в городе!');
        });

        // Обработка скрытого тройного клика без звука
        if (secretTrigger) {
            let secretClicks = 0;
            let secretTimer = null;

            secretTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                // ЗВУК ОТКЛЮЧЕН (по требованию ТЗ)
                secretClicks++;

                if (secretTimer) {
                    clearTimeout(secretTimer);
                }

                if (secretClicks >= 3) {
                    secretClicks = 0;
                    if (this.callbacks.onOpenBestiary) {
                        this.callbacks.onOpenBestiary();
                    }
                } else {
                    // Сбрасываем счетчик, если пауза между кликами более 2.5 секунд
                    secretTimer = setTimeout(() => {
                        secretClicks = 0;
                    }, 2500);
                }
            });
        }
    }
}