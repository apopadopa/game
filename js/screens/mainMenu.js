import { sound } from '../audio/audioEngine.js';
import { SaveSystem } from '../services/saveSystem.js';
import { Icons } from '../visuals/icons.js';

export class MainMenu {
    constructor(callbacks) {
        this.callbacks = callbacks;
    }

    render(container) {
        const hasSave = SaveSystem.hasSave();
        const savedPlayer = hasSave ? SaveSystem.load() : null;

        const embersCount = 24;
        let embersHtml = '';
        for (let i = 0; i < embersCount; i++) {
            const left = Math.floor(Math.random() * 96) + 2;
            const delay = (Math.random() * 6).toFixed(1);
            const duration = (4 + Math.random() * 5).toFixed(1);
            const size = (Math.random() * 3.5 + 2).toFixed(1);
            const drift = (Math.random() * 60 - 30).toFixed(0);
            embersHtml += `<span class="ember-particle" style="left: ${left}%; --drift: ${drift}px; animation-delay: ${delay}s; animation-duration: ${duration}s; width: ${size}px; height: ${size}px;"></span>`;
        }

        container.innerHTML = `
            <div class="menu-screen">
                <!-- Атмосферное освещение факелов подземелья -->
                <div class="torch-ambient-glow torch-left"></div>
                <div class="torch-ambient-glow torch-right"></div>

                <!-- Дрейфующий дымный туман -->
                <div class="menu-fog-layer menu-fog-1"></div>
                <div class="menu-fog-layer menu-fog-2"></div>

                <!-- Парящие искры огня (embers) -->
                <div class="menu-embers-container">
                    ${embersHtml}
                </div>

                <div class="menu-content-wrap">
                    <h1 class="game-title">Спуск во Тьму</h1>
                    <p class="game-subtitle">Подземелья, монстры и сокровища</p>

                    <div class="menu-buttons">
                        <button class="btn btn-menu-item" id="btn-new-game" style="animation-delay: 0.1s;">Новая игра</button>
                        <button class="btn btn-menu-item ${hasSave ? 'btn-pulse-save' : ''}" id="btn-continue" ${hasSave ? '' : 'disabled'} style="animation-delay: 0.2s;">
                            ${savedPlayer ? `Продолжить (${savedPlayer.name})` : 'Продолжить'}
                        </button>
                        <button class="btn btn-menu-item" id="btn-about" style="animation-delay: 0.3s;">Об игре</button>
                    </div>

                    <div class="version-info">v0.9.0 • Великий Триумф и Врата Юга</div>
                </div>

                <!-- Скрытая секретная кнопка в левом нижнем углу для перехода к бестиарию (3 клика, без звука и всплывающих подсказок) -->
                <button class="secret-bestiary-trigger" id="secret-bestiary-trigger" tabindex="-1"></button>

                <!-- Модальное окно "Об игре" -->
                <div class="modal-backdrop hidden" id="about-modal-backdrop">
                    <div class="modal-window about-modal-window" role="dialog" aria-modal="true">
                        <div class="modal-header">
                            <h3>${Icons.spark(18)} Спуск во Тьму: Об игре</h3>
                            <button class="modal-close" id="btn-close-about-modal" title="Закрыть (Esc)">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="about-section">
                                <h4>${Icons.pin(15)} О приключении</h4>
                                <p>
                                    «Спуск во Тьму» — классический ролевой рогалик с пошаговыми тактическими боями и исследованием процедурных катакомб. 
                                    Ваша цель — преодолеть 30 опасных этажей, победить Хранителей глубин и добраться до Сердца Бездны.
                                </p>
                            </div>

                            <div class="about-section">
                                <h4>${Icons.target(15)} Клавиши управления</h4>
                                <div class="about-controls-list">
                                    <div class="about-control-item">
                                        <span class="about-kbd">A / D</span> или <span class="about-kbd">← / →</span>
                                        <span>Перемещение влево и вправо по залам этажа</span>
                                    </div>
                                    <div class="about-control-item">
                                        <span class="about-kbd">W / S</span> или <span class="about-kbd">↑ / ↓</span>
                                        <span>Подъем и спуск по обнаруженным лестницам</span>
                                    </div>
                                    <div class="about-control-item">
                                        <span class="about-kbd">I</span> или <span class="about-kbd">Esc</span>
                                        <span>Открыть вещмешок, снаряжение героя и меню сохранения</span>
                                    </div>
                                    <div class="about-control-item">
                                        <span class="about-kbd">Мышь (ЛКМ)</span>
                                        <span>Выбор целей в бою, способности, Drag & Drop экипировки, осмотр комнат и сундуков</span>
                                    </div>
                                </div>
                            </div>

                            <div class="about-section">
                                <h4>${Icons.shield(15)} Важные правила и советы</h4>
                                <ul class="about-tips-list">
                                    <li><strong>Монстры преграждают путь:</strong> вы не можете пройти дальше по этажу или спуститься глубже, пока враг в комнате жив. Отступить назад на безопасный пройденный участок можно в любой момент.</li>
                                    <li><strong>Берегите экипировку:</strong> надевайте в ячейки куклы персонажа только подходящие типы брони и оружия. Зелья, свитки и факелы применяются прямо из вещмешка или пояса.</li>
                                    <li><strong>Город на поверхности:</strong> вовремя возвращайтесь в город по лестницам наверх — исцеляйтесь в Храме, усиливайте оружие у Кузнеца, запасайтесь зельями в Лавке и отдыхайте в Таверне.</li>
                                </ul>
                            </div>
                        </div>
                        <div class="about-modal-footer" style="display: flex; justify-content: space-between; gap: 12px;">
                            <button class="btn btn-secondary" id="btn-view-prologue">${Icons.scroll(14)} Смотреть Пролог</button>
                            <button class="btn btn-primary" id="btn-ok-about-modal">Понятно</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.initEvents(container, savedPlayer);
    }

    initEvents(container, savedPlayer) {
        const btnNewGame = container.querySelector('#btn-new-game');
        const btnContinue = container.querySelector('#btn-continue');
        const btnAbout = container.querySelector('#btn-about');
        const secretTrigger = container.querySelector('#secret-bestiary-trigger');

        const aboutBackdrop = container.querySelector('#about-modal-backdrop');
        const btnCloseAbout = container.querySelector('#btn-close-about-modal');
        const btnOkAbout = container.querySelector('#btn-ok-about-modal');

        const openAbout = () => {
            sound.playSfx('click');
            if (aboutBackdrop) {
                aboutBackdrop.classList.remove('hidden');
            }
        };

        const closeAbout = () => {
            sound.playSfx('click');
            if (aboutBackdrop) {
                aboutBackdrop.classList.add('hidden');
            }
        };

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

        btnAbout.addEventListener('click', openAbout);
        if (btnCloseAbout) btnCloseAbout.addEventListener('click', closeAbout);
        if (btnOkAbout) btnOkAbout.addEventListener('click', closeAbout);

        const btnViewPrologue = container.querySelector('#btn-view-prologue');
        if (btnViewPrologue) {
            btnViewPrologue.addEventListener('click', () => {
                closeAbout();
                if (this.callbacks.onOpenPrologue) {
                    this.callbacks.onOpenPrologue();
                }
            });
        }

        if (aboutBackdrop) {
            aboutBackdrop.addEventListener('click', (e) => {
                if (e.target === aboutBackdrop) {
                    closeAbout();
                }
            });
        }

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && aboutBackdrop && !aboutBackdrop.classList.contains('hidden')) {
                closeAbout();
            }
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