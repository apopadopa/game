import { sound } from '../audio/audioEngine.js';
import { MOBS_CATALOG, MOB_TIERS, generateMobInstance } from '../mobs/mobData.js';
import { MobRenderer } from '../visuals/mobRenderer.js';
import { Icons } from '../visuals/icons.js';

export class MobShowcaseScreen {
    constructor(callbacks = {}) {
        this.callbacks = callbacks;

        // Инициализируем экземпляры всех 32 мобов
        this.mobInstances = MOBS_CATALOG.map(mobData => generateMobInstance(mobData));

        // Настройки градиента фона
        this.gradient = {
            color1: '#181924',
            color2: '#0b0c10',
            angle: 135
        };

        this.selectedMob = null;
    }

    render(container) {
        this.container = container;

        container.innerHTML = `
            <div class="mob-showcase-screen">
                <!-- ВЕРХНЯЯ ПАНЕЛЬ НАВИГАЦИИ И УПРАВЛЕНИЯ -->
                <div class="showcase-topbar">
                    <button class="btn btn-secondary btn-showcase-back" id="btn-back-menu" title="Вернуться в главное меню">
                        ⬅ В главное меню
                    </button>

                    <div class="showcase-title-wrap">
                        <h2 class="showcase-title">Бестиарий: Каталог чудовищ</h2>
                        <span class="showcase-badge">52 уникальных монстра • 4 ранга</span>
                    </div>

                    <button class="btn btn-primary btn-randomize-all" id="btn-randomize-all" title="Сгенерировать новые вариации для всех 52 существ">
                        ${Icons.dice(16)} Перемешать все варианты
                    </button>
                </div>

                <!-- ПАНЕЛЬ НАСТРОЙКИ ГРАДИЕНТА ФОНА -->
                <div class="gradient-control-bar">
                    <div class="gradient-inputs-group">
                        <span class="gradient-bar-label">${Icons.palette(15)} Цвет фона:</span>
                        <div class="color-picker-wrap" title="Начальный цвет градиента">
                            <input type="color" id="bg-color-1" value="${this.gradient.color1}">
                        </div>
                        <span class="gradient-arrow">${Icons.arrowRight(12)}</span>
                        <div class="color-picker-wrap" title="Конечный цвет градиента">
                            <input type="color" id="bg-color-2" value="${this.gradient.color2}">
                        </div>
                        
                        <div class="angle-slider-wrap">
                            <label for="bg-angle">Угол:</label>
                            <input type="range" id="bg-angle" min="0" max="360" value="${this.gradient.angle}">
                            <span class="angle-display" id="angle-display">${this.gradient.angle}°</span>
                        </div>
                    </div>

                    <!-- Быстрые атмосферные пресеты -->
                    <div class="gradient-presets-group">
                        <span class="presets-label">Пресеты:</span>
                        <button class="btn-preset-chip" data-c1="#181924" data-c2="#0b0c10" data-deg="135">${Icons.temple(13)} Базальт</button>
                        <button class="btn-preset-chip" data-c1="#2d080c" data-c2="#0d0204" data-deg="150">${Icons.blood(13)} Багровый ад</button>
                        <button class="btn-preset-chip" data-c1="#0b1f13" data-c2="#040d07" data-deg="120">${Icons.potion(13, '#10b981')} Топи</button>
                        <button class="btn-preset-chip" data-c1="#081a2c" data-c2="#030a12" data-deg="140">${Icons.ice(13)} Лед</button>
                        <button class="btn-preset-chip" data-c1="#230c2e" data-c2="#0a030d" data-deg="160">${Icons.orb(13)} Пурпур</button>
                        <button class="btn-preset-chip" data-c1="#282828" data-c2="#101010" data-deg="180">${Icons.sword(13)} Монохром</button>
                    </div>
                </div>

                <!-- ОСНОВНАЯ ОБЛАСТЬ С 4 РЯДАМИ МОБОВ -->
                <div class="showcase-content-area" id="showcase-content-area">
                    <!-- РЯД 1: ОБЫЧНЫЕ МОБЫ -->
                    <div class="showcase-row-section">
                        <div class="showcase-row-header tier-regular">
                            <div class="row-header-title">
                                <span class="row-header-icon">${Icons.tierDot('regular', 14)}</span>
                                <h3>Ряд 1: Обычные обитатели глубин</h3>
                            </div>
                            <span class="row-header-count">20 существ • Уровень 1-5</span>
                        </div>
                        <div class="showcase-mobs-track" id="track-regular">
                            ${this.renderTrackHtml(MOB_TIERS.REGULAR)}
                        </div>
                    </div>

                    <!-- РЯД 2: ЭЛИТНЫЕ МОБЫ -->
                    <div class="showcase-row-section">
                        <div class="showcase-row-header tier-hardened">
                            <div class="row-header-title">
                                <span class="row-header-icon">${Icons.tierDot('hardened', 14)}</span>
                                <h3>Ряд 2: Опасные элитные твари</h3>
                            </div>
                            <span class="row-header-count">20 существ • Уровень 6-12</span>
                        </div>
                        <div class="showcase-mobs-track" id="track-hardened">
                            ${this.renderTrackHtml(MOB_TIERS.HARDENED)}
                        </div>
                    </div>

                    <!-- РЯД 3: БОССЫ ЭТАЖЕЙ -->
                    <div class="showcase-row-section">
                        <div class="showcase-row-header tier-boss">
                            <div class="row-header-title">
                                <span class="row-header-icon">${Icons.tierDot('boss', 14)}</span>
                                <h3>Ряд 3: Хранители этажей катакомб</h3>
                            </div>
                            <span class="row-header-count">7 боссов • Каждые 3 этажа</span>
                        </div>
                        <div class="showcase-mobs-track" id="track-boss">
                            ${this.renderTrackHtml(MOB_TIERS.FLOOR_BOSS)}
                        </div>
                    </div>

                    <!-- РЯД 4: ФИНАЛЬНЫЕ БОССЫ -->
                    <div class="showcase-row-section">
                        <div class="showcase-row-header tier-final-boss">
                            <div class="row-header-title">
                                <span class="row-header-icon">${Icons.tierDot('final_boss', 14)}</span>
                                <h3>Ряд 4: Древние владыки Бездны</h3>
                            </div>
                            <span class="row-header-count">5 финальных боссов • Глубины 30 этажа</span>
                        </div>
                        <div class="showcase-mobs-track" id="track-final-boss">
                            ${this.renderTrackHtml(MOB_TIERS.FINAL_BOSS)}
                        </div>
                    </div>

                    <!-- НИЖНЯЯ ПАНЕЛЬ: ПЕРЕХОД В РЕЖИМ КАТСЦЕН -->
                    <div class="showcase-bottom-bar" style="margin-top: 36px; margin-bottom: 30px; padding: 24px; text-align: center; border-top: 1px solid rgba(148, 163, 184, 0.15); display: flex; flex-direction: column; align-items: center; gap: 10px;">
                        <button class="btn btn-primary btn-lg btn-cutscene-mode" id="btn-open-cutscene-mode" style="padding: 14px 32px; font-size: 16px; font-weight: 700; letter-spacing: 0.5px; box-shadow: 0 4px 20px rgba(245, 158, 11, 0.35); cursor: pointer;">
                            🎬 Перейти в режим катсцен
                        </button>
                        <span style="font-size: 13px; color: #94a3b8;">Просмотр сюжетных глав, эпических финалов и архивных сцен</span>
                    </div>
                </div>

                <!-- МОДАЛЬНОЕ ОКНО ДЕТАЛЬНОГО ОСМОТРА МОБА -->
                <div class="mob-inspect-modal hidden" id="mob-inspect-modal">
                    <div class="mob-inspect-backdrop" id="modal-backdrop"></div>
                    <div class="mob-inspect-card" id="modal-card">
                        <!-- Контент рендерится динамически при клике -->
                    </div>
                </div>
            </div>
        `;

        this.applyGradientBackground();
        this.initEvents();
    }

    renderTrackHtml(tier) {
        const mobsInTier = this.mobInstances.filter(m => m.tier === tier);
        return mobsInTier.map(mob => this.renderMobCardHtml(mob)).join('');
    }

    renderMobCardHtml(mob) {
        const figureSvg = MobRenderer.render(mob, 145, 175);
        const elemIcon = Icons.element(mob.element, 13);

        return `
            <div class="mob-card ${mob.tierClass}" data-id="${mob.id}">
                <div class="mob-card-badge-row">
                    <span class="mob-card-tier-badge">${Icons.tierDot(mob.tier, 10)} ${mob.tierBadge}</span>
                    <span class="mob-card-elem-badge" title="Стихия">${elemIcon} ${mob.element}</span>
                </div>

                <div class="mob-card-figure-area" data-action="inspect" data-id="${mob.id}" title="Кликните для подробного осмотра">
                    ${figureSvg}
                </div>

                <div class="mob-card-meta">
                    <h4 class="mob-card-title">${mob.baseName}</h4>
                    <span class="mob-card-sub">${mob.variantTitle}</span>

                    <div class="mob-card-stats-row">
                        <span class="stat-pill hp" title="Здоровье">${Icons.heart(12)} ${mob.hp}</span>
                        <span class="stat-pill dmg" title="Урон">${Icons.sword(12)} ${mob.dmg}</span>
                        <span class="stat-pill def" title="Защита">${Icons.shield(12)} ${mob.def}</span>
                    </div>

                    <div class="mob-card-ability" title="Особая способность">
                        ${Icons.lightning(13)} <strong>${mob.ability}</strong>
                    </div>
                </div>

                <div class="mob-card-actions">
                    <button class="btn-card-reroll" data-id="${mob.id}" title="Сгенерировать случайный вариант этому мобу">
                        ${Icons.dice(13)} Вариант
                    </button>
                    <button class="btn-card-inspect" data-id="${mob.id}" title="Посмотреть подробное досье и цитату">
                        ${Icons.search(13)} Осмотр
                    </button>
                </div>
            </div>
        `;
    }

    applyGradientBackground() {
        const area = this.container.querySelector('#showcase-content-area');
        if (area) {
            const { color1, color2, angle } = this.gradient;
            area.style.background = `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 100%)`;
        }
    }

    randomizeAllMobs() {
        sound.playSfx('selectHero');
        this.mobInstances = MOBS_CATALOG.map(mobData => generateMobInstance(mobData));
        this.refreshTracks();
    }

    randomizeSingleMob(mobId) {
        sound.playSfx('tab');
        const idx = this.mobInstances.findIndex(m => m.id === mobId);
        if (idx !== -1) {
            const originalData = MOBS_CATALOG.find(d => d.id === mobId);
            if (originalData) {
                this.mobInstances[idx] = generateMobInstance(originalData);
                this.refreshTracks();

                // Если модальное окно открыто на этом мобе — обновляем и модалку
                if (this.selectedMob && this.selectedMob.id === mobId) {
                    this.openInspectModal(this.mobInstances[idx]);
                }
            }
        }
    }

    refreshTracks() {
        const tracks = {
            [MOB_TIERS.REGULAR]: this.container.querySelector('#track-regular'),
            [MOB_TIERS.HARDENED]: this.container.querySelector('#track-hardened'),
            [MOB_TIERS.FLOOR_BOSS]: this.container.querySelector('#track-boss'),
            [MOB_TIERS.FINAL_BOSS]: this.container.querySelector('#track-final-boss')
        };

        for (const [tier, el] of Object.entries(tracks)) {
            if (el) {
                el.innerHTML = this.renderTrackHtml(tier);
            }
        }
        this.bindTrackCardEvents();
    }

    openInspectModal(mob) {
        this.selectedMob = mob;
        const modal = this.container.querySelector('#mob-inspect-modal');
        const card = this.container.querySelector('#modal-card');
        if (!modal || !card) return;

        const largeSvg = MobRenderer.render(mob, 240, 300, true);

        card.innerHTML = `
            <div class="inspect-header">
                <div class="inspect-header-left">
                    <span class="inspect-badge ${mob.tierClass}">${mob.tierBadge}</span>
                    <span class="inspect-elem-tag">Стихия: ${mob.element}</span>
                </div>
                <button class="inspect-close-btn" id="btn-modal-close">&times;</button>
            </div>

            <div class="inspect-body">
                <div class="inspect-figure-col">
                    ${largeSvg}
                </div>

                <div class="inspect-info-col">
                    <h3 class="inspect-title">${mob.fullName}</h3>
                    <p class="inspect-quote">${mob.quote}</p>
                    <p class="inspect-desc">${mob.desc}</p>

                    <div class="inspect-stats-grid">
                        <div class="inspect-stat-box">
                            <span class="stat-label">Здоровье:</span>
                            <span class="stat-val hp">${Icons.heart(14)} ${mob.hp} HP</span>
                        </div>
                        <div class="inspect-stat-box">
                            <span class="stat-label">Физический урон:</span>
                            <span class="stat-val dmg">${Icons.sword(14)} ${mob.dmg} DMG</span>
                        </div>
                        <div class="inspect-stat-box">
                            <span class="stat-label">Класс брони:</span>
                            <span class="stat-val def">${Icons.shield(14)} ${mob.def} DEF</span>
                        </div>
                        <div class="inspect-stat-box">
                            <span class="stat-label">Скорость / Инициатива:</span>
                            <span class="stat-val spd">${Icons.lightning(14)} ${mob.spd} SPD</span>
                        </div>
                    </div>

                    <div class="inspect-ability-box">
                        <span class="ability-title">Особое умение:</span>
                        <div class="ability-desc">${Icons.lightning(14)} <strong>${mob.ability}</strong> (накладывает эффект стихии «${mob.element}»)</div>
                    </div>
                </div>
            </div>

            <div class="inspect-footer">
                <button class="btn btn-primary" id="btn-modal-reroll" title="Сгенерировать случайный вариант внешности и специализации">
                    ${Icons.dice(16)} Случайная вариация
                </button>
                <button class="btn btn-secondary" id="btn-modal-exit">
                    Закрыть
                </button>
            </div>
        `;

        card.querySelector('#btn-modal-close').addEventListener('click', () => this.closeInspectModal());
        card.querySelector('#btn-modal-exit').addEventListener('click', () => this.closeInspectModal());
        card.querySelector('#btn-modal-reroll').addEventListener('click', () => {
            this.randomizeSingleMob(mob.id);
        });

        modal.classList.remove('hidden');
    }

    closeInspectModal() {
        const modal = this.container.querySelector('#mob-inspect-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
        this.selectedMob = null;
    }

    initEvents() {
        // Кнопка возврата в главное меню
        this.container.querySelector('#btn-back-menu').addEventListener('click', () => {
            sound.playSfx('click');
            if (this.callbacks.onBack) {
                this.callbacks.onBack();
            }
        });

        // Кнопка перехода в режим катсцен
        const btnCutscenes = this.container.querySelector('#btn-open-cutscene-mode');
        if (btnCutscenes) {
            btnCutscenes.addEventListener('click', () => {
                sound.playSfx('selectHero');
                if (this.callbacks.onOpenCutscenes) {
                    this.callbacks.onOpenCutscenes();
                }
            });
        }

        // Кнопка случайных вариантов для всех 32 мобов
        this.container.querySelector('#btn-randomize-all').addEventListener('click', () => {
            this.randomizeAllMobs();
        });

        // Контролы цвета градиента
        const color1Input = this.container.querySelector('#bg-color-1');
        const color2Input = this.container.querySelector('#bg-color-2');
        const angleInput = this.container.querySelector('#bg-angle');
        const angleDisplay = this.container.querySelector('#angle-display');

        color1Input.addEventListener('input', (e) => {
            this.gradient.color1 = e.target.value;
            this.applyGradientBackground();
        });

        color2Input.addEventListener('input', (e) => {
            this.gradient.color2 = e.target.value;
            this.applyGradientBackground();
        });

        angleInput.addEventListener('input', (e) => {
            this.gradient.angle = parseInt(e.target.value, 10);
            angleDisplay.textContent = `${this.gradient.angle}°`;
            this.applyGradientBackground();
        });

        // Пресеты градиента
        const presetButtons = this.container.querySelectorAll('.btn-preset-chip');
        presetButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                sound.playSfx('click');
                this.gradient.color1 = btn.getAttribute('data-c1');
                this.gradient.color2 = btn.getAttribute('data-c2');
                this.gradient.angle = parseInt(btn.getAttribute('data-deg'), 10);

                color1Input.value = this.gradient.color1;
                color2Input.value = this.gradient.color2;
                angleInput.value = this.gradient.angle;
                angleDisplay.textContent = `${this.gradient.angle}°`;

                this.applyGradientBackground();
            });
        });

        // Закрытие модалки при клике по бэкдропу
        this.container.querySelector('#modal-backdrop').addEventListener('click', () => {
            this.closeInspectModal();
        });

        this.bindTrackCardEvents();
    }

    bindTrackCardEvents() {
        // Кнопки "Вариант" на карточках
        const rerollBtns = this.container.querySelectorAll('.btn-card-reroll');
        rerollBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const mobId = btn.getAttribute('data-id');
                this.randomizeSingleMob(mobId);
            });
        });

        // Кнопки "Осмотр"
        const inspectBtns = this.container.querySelectorAll('.btn-card-inspect');
        inspectBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const mobId = btn.getAttribute('data-id');
                const mob = this.mobInstances.find(m => m.id === mobId);
                if (mob) this.openInspectModal(mob);
            });
        });

        // Клик по фигуре или всей карточке
        const figureAreas = this.container.querySelectorAll('.mob-card-figure-area');
        figureAreas.forEach(area => {
            area.addEventListener('click', (e) => {
                const mobId = area.getAttribute('data-id');
                const mob = this.mobInstances.find(m => m.id === mobId);
                if (mob) this.openInspectModal(mob);
            });
        });
    }

    cleanup() {
        this.selectedMob = null;
    }
}

