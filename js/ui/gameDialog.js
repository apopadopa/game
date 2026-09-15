import { sound } from '../audio/audioEngine.js';
import { Icons } from '../visuals/icons.js';

/**
 * Игровой модальный диалог для замены системных браузерных alert() и confirm().
 * Выполнен в единой темной фэнтезийной стилистике игры с анимациями,
 * звуковым сопровождением и поддержкой клавиатуры (Enter / Escape).
 */
export class GameDialog {
    /**
     * Показывает диалог подтверждения (замена браузерному confirm).
     * @param {Object} options
     * @param {string} [options.title='Подтверждение'] - Заголовок окна
     * @param {string} options.message - Текст сообщения / вопроса (поддерживает HTML)
     * @param {string} [options.icon='question'] - Иконка ('warning'|'door'|'trash'|'spark'|'skull'|'info'|'question')
     * @param {string} [options.confirmText='Подтвердить'] - Текст на кнопке согласия
     * @param {string} [options.cancelText='Отмена'] - Текст на кнопке отмены
     * @param {string} [options.confirmVariant='primary'] - Стиль кнопки согласия ('primary'|'danger'|'warning')
     * @returns {Promise<boolean>} Резолвится в true при подтверждении, false при отмене
     */
    static confirm({
        title = 'Подтверждение',
        message = 'Вы уверены?',
        icon = 'question',
        confirmText = 'Подтвердить',
        cancelText = 'Отмена',
        confirmVariant = 'primary'
    } = {}) {
        return new Promise((resolve) => {
            sound.playSfx('tab');

            const backdrop = document.createElement('div');
            backdrop.className = 'game-dialog-backdrop';

            const iconHtml = GameDialog.renderIcon(icon);
            const btnClass = `game-dialog-btn game-dialog-btn-${confirmVariant}`;

            backdrop.innerHTML = `
                <div class="game-dialog-window" role="dialog" aria-modal="true">
                    <div class="game-dialog-icon-wrap icon-${icon}">
                        ${iconHtml}
                    </div>
                    <h3 class="game-dialog-title">${title}</h3>
                    <div class="game-dialog-message">${message}</div>
                    <div class="game-dialog-actions">
                        <button class="game-dialog-btn game-dialog-btn-secondary" id="btn-dialog-cancel">
                            ${cancelText}
                        </button>
                        <button class="${btnClass}" id="btn-dialog-confirm">
                            ${confirmText}
                        </button>
                    </div>
                </div>
            `;

            const targetContainer = document.querySelector('#game-container') || document.body;
            targetContainer.appendChild(backdrop);

            // Плавное появление
            requestAnimationFrame(() => {
                backdrop.classList.add('active');
            });

            const btnConfirm = backdrop.querySelector('#btn-dialog-confirm');
            const btnCancel = backdrop.querySelector('#btn-dialog-cancel');

            // Устанавливаем фокус на кнопку подтверждения
            if (btnConfirm) {
                setTimeout(() => btnConfirm.focus(), 60);
            }

            let isClosed = false;
            const close = (result) => {
                if (isClosed) return;
                isClosed = true;

                window.removeEventListener('keydown', handleKeyDown);
                backdrop.classList.remove('active');

                if (result) {
                    sound.playSfx('click');
                } else {
                    sound.playSfx('click');
                }

                setTimeout(() => {
                    if (backdrop.parentNode) {
                        backdrop.parentNode.removeChild(backdrop);
                    }
                    resolve(result);
                }, 180);
            };

            const handleKeyDown = (e) => {
                if (e.key === 'Escape') {
                    e.preventDefault();
                    e.stopPropagation();
                    close(false);
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    e.stopPropagation();
                    close(true);
                }
            };

            window.addEventListener('keydown', handleKeyDown);

            btnConfirm.addEventListener('click', (e) => {
                e.stopPropagation();
                close(true);
            });

            btnCancel.addEventListener('click', (e) => {
                e.stopPropagation();
                close(false);
            });

            // Закрытие при клике на затемненный фон вокруг окна
            backdrop.addEventListener('click', (e) => {
                if (e.target === backdrop) {
                    close(false);
                }
            });
        });
    }

    /**
     * Показывает диалог оповещения (замена браузерному alert).
     * @param {Object} options
     * @param {string} [options.title='Внимание'] - Заголовок окна
     * @param {string} options.message - Текст сообщения
     * @param {string} [options.icon='info'] - Иконка
     * @param {string} [options.btnText='Понятно'] - Текст на кнопке закрытия
     * @returns {Promise<void>}
     */
    static alert({
        title = 'Внимание',
        message = '',
        icon = 'info',
        btnText = 'Понятно'
    } = {}) {
        return new Promise((resolve) => {
            sound.playSfx('tab');

            const backdrop = document.createElement('div');
            backdrop.className = 'game-dialog-backdrop';

            const iconHtml = GameDialog.renderIcon(icon);

            backdrop.innerHTML = `
                <div class="game-dialog-window" role="dialog" aria-modal="true">
                    <div class="game-dialog-icon-wrap icon-${icon}">
                        ${iconHtml}
                    </div>
                    <h3 class="game-dialog-title">${title}</h3>
                    <div class="game-dialog-message">${message}</div>
                    <div class="game-dialog-actions">
                        <button class="game-dialog-btn game-dialog-btn-primary" id="btn-dialog-ok" style="width: 100%;">
                            ${btnText}
                        </button>
                    </div>
                </div>
            `;

            const targetContainer = document.querySelector('#game-container') || document.body;
            targetContainer.appendChild(backdrop);

            requestAnimationFrame(() => {
                backdrop.classList.add('active');
            });

            const btnOk = backdrop.querySelector('#btn-dialog-ok');
            if (btnOk) {
                setTimeout(() => btnOk.focus(), 60);
            }

            let isClosed = false;
            const close = () => {
                if (isClosed) return;
                isClosed = true;

                window.removeEventListener('keydown', handleKeyDown);
                backdrop.classList.remove('active');
                sound.playSfx('click');

                setTimeout(() => {
                    if (backdrop.parentNode) {
                        backdrop.parentNode.removeChild(backdrop);
                    }
                    resolve();
                }, 180);
            };

            const handleKeyDown = (e) => {
                if (e.key === 'Escape' || e.key === 'Enter') {
                    e.preventDefault();
                    e.stopPropagation();
                    close();
                }
            };

            window.addEventListener('keydown', handleKeyDown);

            btnOk.addEventListener('click', (e) => {
                e.stopPropagation();
                close();
            });

            backdrop.addEventListener('click', (e) => {
                if (e.target === backdrop) {
                    close();
                }
            });
        });
    }

    /**
     * Рендерит соответствующую SVG или эмодзи иконку
     */
    static renderIcon(iconType) {
        switch (iconType) {
            case 'door':
            case 'exit':
                return Icons.door ? Icons.door(28) : '🚪';
            case 'trash':
                return `
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                `;
            case 'warning':
                return `
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                `;
            case 'spark':
                return Icons.spark ? Icons.spark(28) : '✨';
            case 'skull':
                return Icons.skull ? Icons.skull(28) : '💀';
            case 'info':
                return `
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                `;
            case 'question':
            default:
                return `
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                `;
        }
    }

    /**
     * Перехват глобального window.alert, чтобы любой системный вызов
     * автоматически отображался в виде красивого игрового окна.
     */
    static installGlobal() {
        if (typeof window !== 'undefined') {
            window.alert = (message) => {
                GameDialog.alert({ message: String(message) });
            };
        }
    }
}

