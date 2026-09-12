import { sound } from '../audio/audioEngine.js';

export class MainMenu {
    constructor(callbacks) {
        this.callbacks = callbacks;
    }

    render(container) {
        container.innerHTML = `
            <div class="menu-screen">
                <h1 class="game-title">Спуск во Тьму</h1>
                <p class="game-subtitle">Подземелья, монстры и сокровища</p>

                <div class="menu-buttons">
                    <button class="btn" id="btn-new-game">Новая игра</button>
                    <button class="btn" id="btn-continue" disabled>Продолжить</button>
                    <button class="btn" id="btn-about">Об игре</button>
                </div>

                <div class="version-info">v0.2.0 • Web Audio Engine</div>
            </div>
        `;

        this.initEvents(container);
    }

    initEvents(container) {
        const btnNewGame = container.querySelector('#btn-new-game');
        const btnAbout = container.querySelector('#btn-about');

        btnNewGame.addEventListener('click', () => {
            if (this.callbacks.onStartGame) {
                this.callbacks.onStartGame();
            }
        });

        btnAbout.addEventListener('click', () => {
            sound.playSfx('click');
            alert('Спуск во Тьму — RPG-рогалик.\nСпускайся в катакомбы, побеждай монстров, собирай лут и продавай его в городе!');
        });
    }
}