import { sound } from '../audio/audioEngine.js';
import { Icons } from '../visuals/icons.js';
import { StoryArtworks } from '../visuals/storyArtworks.js';
import { CheatSystem } from '../services/cheatSystem.js';

export class CutscenesMenuScreen {
    constructor(player, callbacks = {}) {
        this.player = player;
        this.callbacks = callbacks;
        this.container = null;

        // Счетчик кликов для секретной кнопки в правом нижнем углу
        this.secretClicks = 0;
        this.secretTimer = null;
    }

    render(container) {
        this.container = container;

        container.innerHTML = `
            <div class="interior-screen cutscenes-menu-screen" style="position: relative; overflow-y: auto; background: radial-gradient(circle at 50% 20%, #171923 0%, #08090d 100%); min-height: 100%; padding: 24px;">
                <!-- ВЕРХНЯЯ ПАНЕЛЬ НАВИГАЦИИ -->
                <div class="interior-top-bar" style="border-bottom: 1px solid rgba(245, 158, 11, 0.2); padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                    <button class="btn btn-secondary" id="btn-back-to-bestiary">
                        ${Icons.arrowLeft ? Icons.arrowLeft(14) : '⬅'} Назад в Бестиарий
                    </button>
                    <div style="text-align: center;">
                        <h2 style="margin: 0; font-size: 24px; color: #facc15; text-shadow: 0 0 16px rgba(250, 204, 21, 0.4);">
                            🎬 Режим Катсцен & Хроники Истории
                        </h2>
                        <span style="font-size: 13px; color: #94a3b8;">
                            Галерея ключевых кинематографических сцен и эпических финалов
                        </span>
                    </div>
                    <button class="btn btn-secondary" id="btn-to-main-menu">
                        ${Icons.door ? Icons.door(14) : '🚪'} В главное меню
                    </button>
                </div>

                <!-- СПИСОК КАТСЦЕН -->
                <div class="cutscenes-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; max-width: 900px; margin: 0 auto; padding-bottom: 60px;">
                    <!-- КАРТОЧКА 1: ПРОЛОГ -->
                    <div class="cutscene-card" style="background: #11141d; border: 1px solid #334155; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.2s, border-color 0.2s; box-shadow: 0 8px 24px rgba(0,0,0,0.4);">
                        <div class="cutscene-thumb" style="height: 180px; background: #0b0c10; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
                            <div style="width: 100%; height: 100%; opacity: 0.85;">
                                ${StoryArtworks.getArtwork('ancient_core_purified')}
                            </div>
                            <span style="position: absolute; top: 12px; left: 12px; background: rgba(15, 23, 42, 0.85); color: #38bdf8; border: 1px solid #0284c7; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; text-transform: uppercase;">
                                Глава I • Начало
                            </span>
                        </div>
                        <div style="padding: 18px; display: flex; flex-direction: column; flex: 1;">
                            <h3 style="margin: 0 0 8px 0; font-size: 18px; color: #f8fafc;">Пролог: Спуск во Тьму</h3>
                            <p style="margin: 0 0 16px 0; font-size: 13px; color: #94a3b8; line-height: 1.5; flex: 1;">
                                Древние врата подземелья открываются перед героем. Первые шаги в неизвестность, предзнаменование грядущей битвы с Бездной.
                            </p>
                            <button class="btn btn-primary btn-play-scene" data-scene="prologue" style="width: 100%; font-weight: 600;">
                                ▶ Воспроизвести Пролог
                            </button>
                        </div>
                    </div>

                    <!-- КАРТОЧКА 2: ОЧИЩЕНИЕ БЕЗДНЫ (30 ЭТАЖ) -->
                    <div class="cutscene-card" style="background: #11141d; border: 1px solid #a855f7; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.2s, border-color 0.2s; box-shadow: 0 8px 24px rgba(168, 85, 247, 0.2);">
                        <div class="cutscene-thumb" style="height: 180px; background: #0b0c10; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
                            <div style="width: 100%; height: 100%; opacity: 0.85;">
                                ${StoryArtworks.getArtwork('abyss_collapse')}
                            </div>
                            <span style="position: absolute; top: 12px; left: 12px; background: rgba(15, 23, 42, 0.85); color: #c084fc; border: 1px solid #a855f7; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; text-transform: uppercase;">
                                Финал Бездны • Этаж 30
                            </span>
                        </div>
                        <div style="padding: 18px; display: flex; flex-direction: column; flex: 1;">
                            <h3 style="margin: 0 0 8px 0; font-size: 18px; color: #f8fafc;">Очищение Бездны</h3>
                            <p style="margin: 0 0 16px 0; font-size: 13px; color: #94a3b8; line-height: 1.5; flex: 1;">
                                Сокрушение Владыки Бездны в сердце подземелья, очищение древнего арканного ядра, рассеивание скверны и призыв вернуться наверх.
                            </p>
                            <button class="btn btn-primary btn-play-scene" data-scene="abyss_ending" style="width: 100%; font-weight: 600; background: linear-gradient(135deg, #9333ea 0%, #7e22ce 100%); border-color: #a855f7;">
                                ▶ Воспроизвести Катсцену Бездны
                            </button>
                        </div>
                    </div>

                    <!-- КАРТОЧКА 3: ВЕЛИКИЙ ТРИУМФ (ЮЖНЫЙ ТРАКТ) -->
                    <div class="cutscene-card" style="background: #11141d; border: 1px solid #eab308; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.2s, border-color 0.2s; box-shadow: 0 8px 24px rgba(234, 179, 8, 0.25);">
                        <div class="cutscene-thumb" style="height: 180px; background: #0b0c10; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
                            <div style="width: 100%; height: 100%; opacity: 0.85;">
                                ${StoryArtworks.getArtwork('gates_unsealed')}
                            </div>
                            <span style="position: absolute; top: 12px; left: 12px; background: rgba(15, 23, 42, 0.85); color: #fde047; border: 1px solid #eab308; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; text-transform: uppercase;">
                                Гранд-Финал • Триумф
                            </span>
                        </div>
                        <div style="padding: 18px; display: flex; flex-direction: column; flex: 1;">
                            <h3 style="margin: 0 0 8px 0; font-size: 18px; color: #f8fafc;">Великий Триумф: Распахивание Врат</h3>
                            <p style="margin: 0 0 16px 0; font-size: 13px; color: #94a3b8; line-height: 1.5; flex: 1;">
                                Доклад капитану Варрану, сброс тяжелых цепей, салют гарнизона, распахивание Южных Врат и начало новой эпохи мира на континенте.
                            </p>
                            <button class="btn btn-primary btn-play-scene" data-scene="grand_finale" style="width: 100%; font-weight: 600; background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%); border-color: #facc15; color: #1e1b18;">
                                ▶ Воспроизвести Гранд-Финал
                            </button>
                        </div>
                    </div>

                    <!-- КАРТОЧКА 4: ХРОНИКА ДРЕВНЕГО КОРОЛЕВСТВА -->
                    <div class="cutscene-card" style="background: #11141d; border: 1px solid #475569; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.2s, border-color 0.2s; box-shadow: 0 8px 24px rgba(0,0,0,0.4);">
                        <div class="cutscene-thumb" style="height: 180px; background: #0b0c10; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
                            <div style="width: 100%; height: 100%; opacity: 0.85;">
                                ${StoryArtworks.getArtwork('royal_hall_glory')}
                            </div>
                            <span style="position: absolute; top: 12px; left: 12px; background: rgba(15, 23, 42, 0.85); color: #cbd5e1; border: 1px solid #64748b; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; text-transform: uppercase;">
                                Хроника • Память веков
                            </span>
                        </div>
                        <div style="padding: 18px; display: flex; flex-direction: column; flex: 1;">
                            <h3 style="margin: 0 0 8px 0; font-size: 18px; color: #f8fafc;">Хроника: Память Древних Королей</h3>
                            <p style="margin: 0 0 16px 0; font-size: 13px; color: #94a3b8; line-height: 1.5; flex: 1;">
                                Легенда о строителях катакомб, величии павшей династии и таинственных монолитах, хранящих баланс подземного мира.
                            </p>
                            <button class="btn btn-secondary btn-play-scene" data-scene="monument_memory" style="width: 100%; font-weight: 600;">
                                ▶ Смотреть Хронику Королей
                            </button>
                        </div>
                    </div>
                </div>

                <!-- СКРЫТАЯ СЕКРЕТНАЯ КНОПКА В ПРАВОМ НИЖНЕМ УГЛУ (10 КЛИКОВ ДЛЯ ВВОДА ПАРОЛЯ) -->
                <button class="secret-cheat-trigger" id="secret-cheat-trigger" tabindex="-1"></button>

                <!-- МОДАЛЬНОЕ ОКНО ВВОДА ПАРОЛЯ -->
                <div class="modal-backdrop hidden" id="cheat-pass-modal" style="display: none; align-items: center; justify-content: center; z-index: 1200;">
                    <div class="modal-window" style="background: #0f172a; border: 1px solid #f59e0b; border-radius: 12px; width: 380px; max-width: 90vw; padding: 24px; box-shadow: 0 0 35px rgba(245, 158, 11, 0.3); text-align: center;">
                        <div style="font-size: 36px; margin-bottom: 10px;">🔒</div>
                        <h3 style="margin: 0 0 6px 0; color: #facc15; font-size: 18px;">Терминал Разработчика</h3>
                        <p style="margin: 0 0 16px 0; color: #94a3b8; font-size: 13px;">Введите ключ авторизации для разблокировки чит-консоли:</p>
                        
                        <div style="margin-bottom: 16px;">
                            <input type="text" id="cheat-input-field" maxlength="32" placeholder="Ключ доступа..." style="width: 100%; padding: 12px 14px; background: #020617; border: 1px solid #475569; border-radius: 6px; color: #f8fafc; font-size: 16px; text-align: center; outline: none; box-sizing: border-box; letter-spacing: 1px;" autocomplete="off" />
                            <div id="cheat-pass-error" style="color: #ef4444; font-size: 12px; margin-top: 8px; display: none;">Неверный ключ доступа!</div>
                        </div>

                        <div style="display: flex; gap: 10px; justify-content: center;">
                            <button class="btn btn-secondary" id="btn-cancel-cheat-pass" style="flex: 1;">Отмена</button>
                            <button class="btn btn-primary" id="btn-confirm-cheat-pass" style="flex: 1; font-weight: 700;">Войти</button>
                        </div>
                    </div>
                </div>

                <!-- МОДАЛЬНОЕ ЧИТ-МЕНЮ -->
                <div class="modal-backdrop hidden" id="cheat-dashboard-modal" style="display: none; align-items: center; justify-content: center; z-index: 1250;">
                    <div class="modal-window cheat-dashboard-window" style="background: #090d16; border: 2px solid #38bdf8; border-radius: 14px; width: 560px; max-width: 95vw; max-height: 90vh; overflow-y: auto; padding: 24px; box-shadow: 0 0 45px rgba(56, 189, 248, 0.35);">
                        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(56, 189, 248, 0.25); padding-bottom: 12px; margin-bottom: 20px;">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span style="font-size: 24px;">⚡</span>
                                <div>
                                    <h3 style="margin: 0; color: #38bdf8; font-size: 19px; letter-spacing: 0.5px;">Чит-Консоль Разработчика</h3>
                                    <span style="font-size: 12px; color: #94a3b8;">Управление игровыми механиками и состоянием героя</span>
                                </div>
                            </div>
                            <button class="modal-close" id="btn-close-cheat-dashboard" style="background: transparent; border: none; color: #94a3b8; font-size: 22px; cursor: pointer;">&times;</button>
                        </div>

                        <!-- СЕКЦИЯ ПЕРЕКЛЮЧАТЕЛЕЙ (ТОГГЛЫ) -->
                        <div style="margin-bottom: 22px;">
                            <h4 style="margin: 0 0 12px 0; color: #facc15; font-size: 14px; text-transform: uppercase; letter-spacing: 0.8px;">Режимы & Переключатели</h4>
                            
                            <div style="display: flex; flex-direction: column; gap: 10px;">
                                <!-- 1. Мгновенная победа -->
                                <label class="cheat-toggle-row" style="display: flex; justify-content: space-between; align-items: center; background: #131b2e; padding: 12px 16px; border-radius: 8px; border: 1px solid #1e293b; cursor: pointer;">
                                    <div>
                                        <strong style="color: #f8fafc; font-size: 14px; display: block;">⚡ Мгновенная победа в бою</strong>
                                        <span style="color: #94a3b8; font-size: 12px;">Любой бой мгновенно заканчивается триумфом при первом действии</span>
                                    </div>
                                    <input type="checkbox" id="chk-cheat-instant-win" ${CheatSystem.flags.instantWin ? 'checked' : ''} style="width: 20px; height: 20px; cursor: pointer;" />
                                </label>

                                <!-- 2. Игнорирование существ -->
                                <label class="cheat-toggle-row" style="display: flex; justify-content: space-between; align-items: center; background: #131b2e; padding: 12px 16px; border-radius: 8px; border: 1px solid #1e293b; cursor: pointer;">
                                    <div>
                                        <strong style="color: #f8fafc; font-size: 14px; display: block;">👻 Игнорирование существ (Мирный шаг)</strong>
                                        <span style="color: #94a3b8; font-size: 12px;">Свободный проход по комнатам и лестницам без принудительного нападения</span>
                                    </div>
                                    <input type="checkbox" id="chk-cheat-ignore-monsters" ${CheatSystem.flags.ignoreMonsters ? 'checked' : ''} style="width: 20px; height: 20px; cursor: pointer;" />
                                </label>

                                <!-- 3. Режим Бога -->
                                <label class="cheat-toggle-row" style="display: flex; justify-content: space-between; align-items: center; background: #131b2e; padding: 12px 16px; border-radius: 8px; border: 1px solid #1e293b; cursor: pointer;">
                                    <div>
                                        <strong style="color: #f8fafc; font-size: 14px; display: block;">🛡️ Режим Бога (God Mode)</strong>
                                        <span style="color: #94a3b8; font-size: 12px;">Здоровье и мана героя не уменьшаются ни при каких обстоятельствах</span>
                                    </div>
                                    <input type="checkbox" id="chk-cheat-god-mode" ${CheatSystem.flags.godMode ? 'checked' : ''} style="width: 20px; height: 20px; cursor: pointer;" />
                                </label>

                                <!-- 4. Открыть карту -->
                                <label class="cheat-toggle-row" style="display: flex; justify-content: space-between; align-items: center; background: #131b2e; padding: 12px 16px; border-radius: 8px; border: 1px solid #1e293b; cursor: pointer;">
                                    <div>
                                        <strong style="color: #f8fafc; font-size: 14px; display: block;">👁️ Открыть всю карту подземелья</strong>
                                        <span style="color: #94a3b8; font-size: 12px;">Снять туман войны со всех комнат текущего этажа</span>
                                    </div>
                                    <input type="checkbox" id="chk-cheat-reveal-map" ${CheatSystem.flags.revealMap ? 'checked' : ''} style="width: 20px; height: 20px; cursor: pointer;" />
                                </label>
                            </div>
                        </div>

                        <!-- СЕКЦИЯ МГНОВЕННЫХ ДЕЙСТВИЙ -->
                        <div style="margin-bottom: 20px;">
                            <h4 style="margin: 0 0 12px 0; color: #facc15; font-size: 14px; text-transform: uppercase; letter-spacing: 0.8px;">Мгновенные Действия</h4>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                                <button class="btn btn-primary" id="btn-cheat-max-level" style="font-size: 13px; padding: 10px 12px; text-align: left;">
                                    🏆 Максимальный уровень (30 lvl + очки)
                                </button>
                                <button class="btn btn-primary" id="btn-cheat-add-gold" style="font-size: 13px; padding: 10px 12px; text-align: left;">
                                    💰 Добавить +100 000 Золота
                                </button>
                                <button class="btn btn-primary" id="btn-cheat-god-gear" style="font-size: 13px; padding: 10px 12px; text-align: left;">
                                    ⚔️ Получить Мифический Арсенал
                                </button>
                                <button class="btn btn-primary" id="btn-cheat-unlock-gates" style="font-size: 13px; padding: 10px 12px; text-align: left;">
                                    👑 Мгновенно открыть Южные Врата
                                </button>
                            </div>
                        </div>

                        <!-- СТАТУСНОЕ СООБЩЕНИЕ И СБРОС -->
                        <div id="cheat-toast" style="min-height: 24px; font-size: 13px; color: #4ade80; text-align: center; margin-bottom: 12px;"></div>

                        <div style="display: flex; justify-content: space-between; gap: 10px; border-top: 1px solid rgba(148, 163, 184, 0.15); padding-top: 16px;">
                            <button class="btn btn-danger" id="btn-cheat-reset-all" style="font-size: 13px;">
                                🔄 Отключить все читы
                            </button>
                            <button class="btn btn-secondary" id="btn-cheat-done">
                                Готово
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.initEvents();
    }

    initEvents() {
        // Кнопка возврата в Бестиарий
        const btnBackBestiary = this.container.querySelector('#btn-back-to-bestiary');
        if (btnBackBestiary) {
            btnBackBestiary.addEventListener('click', () => {
                sound.playSfx('click');
                if (this.callbacks.onBackToBestiary) {
                    this.callbacks.onBackToBestiary();
                }
            });
        }

        // Кнопка перехода в главное меню
        const btnToMenu = this.container.querySelector('#btn-to-main-menu');
        if (btnToMenu) {
            btnToMenu.addEventListener('click', () => {
                sound.playSfx('click');
                if (this.callbacks.onMainMenu) {
                    this.callbacks.onMainMenu();
                }
            });
        }

        // Кнопки воспроизведения катсцен
        const playBtns = this.container.querySelectorAll('.btn-play-scene');
        playBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const sceneId = btn.getAttribute('data-scene');
                sound.playSfx('selectHero');
                if (this.callbacks.onPlayCutscene) {
                    this.callbacks.onPlayCutscene(sceneId);
                }
            });
        });

        // СЕКРЕТНАЯ КНОПКА (10 КЛИКОВ В ПРАВОМ НИЖНЕМ УГЛУ)
        const secretTrigger = this.container.querySelector('#secret-cheat-trigger');
        if (secretTrigger) {
            secretTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.handleSecretClick(e);
            });
        }

        // Двойная защита: слушатель кликов в правом нижнем углу экрана и игрового контейнера
        this.boundCornerClickListener = (e) => {
            const clickX = e.clientX;
            const clickY = e.clientY;

            // 1. Проверяем правый нижний угол окна браузера (120x120px)
            const inWindowCorner = (
                clickX >= window.innerWidth - 120 &&
                clickY >= window.innerHeight - 120
            );

            // 2. Проверяем правый нижний угол игрового контейнера (120x120px)
            const gameContainer = document.querySelector('#game-container') || this.container;
            let inGameCorner = false;
            if (gameContainer) {
                const rect = gameContainer.getBoundingClientRect();
                if (
                    clickX >= rect.right - 120 &&
                    clickX <= rect.right + 15 &&
                    clickY >= rect.bottom - 120 &&
                    clickY <= rect.bottom + 15
                ) {
                    inGameCorner = true;
                }
            }

            if (inWindowCorner || inGameCorner) {
                this.handleSecretClick(e);
            }
        };
        window.addEventListener('click', this.boundCornerClickListener);

        // МОДАЛЬНОЕ ОКНО ПАРОЛЯ
        const passModal = this.container.querySelector('#cheat-pass-modal');
        const passInput = this.container.querySelector('#cheat-input-field');
        const passError = this.container.querySelector('#cheat-pass-error');
        const btnCancelPass = this.container.querySelector('#btn-cancel-cheat-pass');
        const btnConfirmPass = this.container.querySelector('#btn-confirm-cheat-pass');

        const closePassModal = () => {
            if (passModal) {
                passModal.classList.add('hidden');
                passModal.style.display = 'none';
            }
            if (passInput) passInput.value = '';
            if (passError) passError.style.display = 'none';
        };

        if (btnCancelPass) {
            btnCancelPass.addEventListener('click', () => {
                sound.playSfx('click');
                closePassModal();
            });
        }

        const handlePasswordCheck = () => {
            const val = passInput ? passInput.value : '';
            if (CheatSystem.verifyPassword(val)) {
                sound.playSfx('victory');
                closePassModal();
                this.openCheatDashboard();
            } else {
                sound.playSfx('defeat');
                if (passError) {
                    passError.style.display = 'block';
                    passError.textContent = 'Неверный ключ доступа!';
                }
                if (passInput) {
                    passInput.classList.add('anim-shake');
                    setTimeout(() => passInput.classList.remove('anim-shake'), 600);
                }
            }
        };

        if (btnConfirmPass) {
            btnConfirmPass.addEventListener('click', handlePasswordCheck);
        }

        if (passInput) {
            passInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    handlePasswordCheck();
                } else if (e.key === 'Escape') {
                    closePassModal();
                }
            });
        }

        // ДЭШБОРД ЧИТОВ
        this.initCheatDashboardEvents();
    }

    handleSecretClick(e) {
        if (e) {
            if (e.__secretProcessed) return;
            e.__secretProcessed = true;
        }

        this.secretClicks = (this.secretClicks || 0) + 1;

        if (this.secretTimer) {
            clearTimeout(this.secretTimer);
        }

        if (this.secretClicks >= 10) {
            this.secretClicks = 0;
            sound.playSfx('selectHero');
            this.openPasswordModal();
        } else {
            // Щедрый таймер: 8 секунд между кликами
            this.secretTimer = setTimeout(() => {
                this.secretClicks = 0;
            }, 8000);
        }
    }

    openPasswordModal() {
        const passModal = this.container.querySelector('#cheat-pass-modal');
        const passInput = this.container.querySelector('#cheat-input-field');
        const passError = this.container.querySelector('#cheat-pass-error');
        if (passModal) {
            passModal.classList.remove('hidden');
            passModal.style.display = 'flex';
        }
        if (passError) passError.style.display = 'none';
        if (passInput) {
            passInput.value = '';
            setTimeout(() => {
                passInput.focus();
                passInput.select();
            }, 50);
        }
    }

    openCheatDashboard() {
        const dashModal = this.container.querySelector('#cheat-dashboard-modal');
        if (dashModal) {
            dashModal.classList.remove('hidden');
            dashModal.style.display = 'flex';
        }
        this.updateCheatCheckboxes();
    }

    closeCheatDashboard() {
        const dashModal = this.container.querySelector('#cheat-dashboard-modal');
        if (dashModal) {
            dashModal.classList.add('hidden');
            dashModal.style.display = 'none';
        }
    }

    updateCheatCheckboxes() {
        const chkInstant = this.container.querySelector('#chk-cheat-instant-win');
        const chkIgnore = this.container.querySelector('#chk-cheat-ignore-monsters');
        const chkGod = this.container.querySelector('#chk-cheat-god-mode');
        const chkReveal = this.container.querySelector('#chk-cheat-reveal-map');

        if (chkInstant) chkInstant.checked = !!CheatSystem.flags.instantWin;
        if (chkIgnore) chkIgnore.checked = !!CheatSystem.flags.ignoreMonsters;
        if (chkGod) chkGod.checked = !!CheatSystem.flags.godMode;
        if (chkReveal) chkReveal.checked = !!CheatSystem.flags.revealMap;
    }

    showToast(msg) {
        const toast = this.container.querySelector('#cheat-toast');
        if (toast) {
            toast.textContent = msg;
            toast.style.opacity = '1';
            setTimeout(() => {
                if (toast) toast.textContent = '';
            }, 3000);
        }
    }

    initCheatDashboardEvents() {
        const btnClose = this.container.querySelector('#btn-close-cheat-dashboard');
        const btnDone = this.container.querySelector('#btn-cheat-done');

        if (btnClose) btnClose.addEventListener('click', () => { sound.playSfx('click'); this.closeCheatDashboard(); });
        if (btnDone) btnDone.addEventListener('click', () => { sound.playSfx('click'); this.closeCheatDashboard(); });

        // Чекбоксы
        const chkInstant = this.container.querySelector('#chk-cheat-instant-win');
        if (chkInstant) {
            chkInstant.addEventListener('change', (e) => {
                CheatSystem.toggleInstantWin(e.target.checked);
                sound.playSfx('tab');
                this.showToast(e.target.checked ? '⚡ Мгновенная победа включена!' : '⚡ Мгновенная победа выключена');
            });
        }

        const chkIgnore = this.container.querySelector('#chk-cheat-ignore-monsters');
        if (chkIgnore) {
            chkIgnore.addEventListener('change', (e) => {
                CheatSystem.toggleIgnoreMonsters(e.target.checked);
                sound.playSfx('tab');
                this.showToast(e.target.checked ? '👻 Игнорирование существ активно!' : '👻 Игнорирование существ выключено');
            });
        }

        const chkGod = this.container.querySelector('#chk-cheat-god-mode');
        if (chkGod) {
            chkGod.addEventListener('change', (e) => {
                CheatSystem.toggleGodMode(e.target.checked);
                sound.playSfx('tab');
                this.showToast(e.target.checked ? '🛡️ Режим Бога включен!' : '🛡️ Режим Бога выключен');
            });
        }

        const chkReveal = this.container.querySelector('#chk-cheat-reveal-map');
        if (chkReveal) {
            chkReveal.addEventListener('change', (e) => {
                CheatSystem.toggleRevealMap(e.target.checked);
                sound.playSfx('tab');
                this.showToast(e.target.checked ? '👁️ Открытие карты активно!' : '👁️ Открытие карты выключено');
            });
        }

        // Кнопка: Максимальный уровень
        const btnMaxLvl = this.container.querySelector('#btn-cheat-max-level');
        if (btnMaxLvl) {
            btnMaxLvl.addEventListener('click', () => {
                sound.playSfx('victory');
                const res = CheatSystem.applyMaxLevel(this.player, 30);
                if (res) {
                    this.showToast(`🏆 Достигнут Уровень 30! Начислено +${res.statPointsAdded} очков статов!`);
                } else {
                    this.showToast('🏆 Уровень обновлен!');
                }
            });
        }

        // Кнопка: Золото
        const btnGold = this.container.querySelector('#btn-cheat-add-gold');
        if (btnGold) {
            btnGold.addEventListener('click', () => {
                sound.playSfx('coin');
                CheatSystem.addGold(this.player, 100000);
                this.showToast('💰 Начислено +100 000 золота!');
            });
        }

        // Кнопка: Снаряжение Бога
        const btnGear = this.container.querySelector('#btn-cheat-god-gear');
        if (btnGear) {
            btnGear.addEventListener('click', () => {
                sound.playSfx('selectHero');
                CheatSystem.grantGodGear(this.player);
                this.showToast('⚔️ Экипирован Мифический Арсенал Бездны!');
            });
        }

        // Кнопка: Распахнуть Южные Врата
        const btnUnlock = this.container.querySelector('#btn-cheat-unlock-gates');
        if (btnUnlock) {
            btnUnlock.addEventListener('click', () => {
                sound.playSfx('gateOpen');
                CheatSystem.unlockSouthGates(this.player);
                this.showToast('👑 Южные Врата мгновенно распахнуты!');
            });
        }

        // Кнопка: Сбросить все читы
        const btnReset = this.container.querySelector('#btn-cheat-reset-all');
        if (btnReset) {
            btnReset.addEventListener('click', () => {
                sound.playSfx('click');
                CheatSystem.resetCheats();
                this.updateCheatCheckboxes();
                this.showToast('🔄 Все чит-режимы отключены');
            });
        }
    }

    cleanup() {
        if (this.secretTimer) {
            clearTimeout(this.secretTimer);
            this.secretTimer = null;
        }
        if (this.boundCornerClickListener) {
            window.removeEventListener('click', this.boundCornerClickListener);
            this.boundCornerClickListener = null;
        }
    }
}

