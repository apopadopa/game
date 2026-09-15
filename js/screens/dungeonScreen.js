import { sound } from '../audio/audioEngine.js';
import { dungeonTheme } from '../audio/music/dungeonTheme.js';
import { DungeonGenerator } from '../dungeon/dungeonGenerator.js';
import { DungeonMobSpawner } from '../dungeon/dungeonMobSpawner.js';
import { Icons } from '../visuals/icons.js';
import { CharacterRenderer } from '../visuals/characterRenderer.js';
import { MobRenderer } from '../visuals/mobRenderer.js';
import { openDungeonChest } from '../data/itemsData.js';
import { CheatSystem } from '../services/cheatSystem.js';
import { GameDialog } from '../ui/gameDialog.js';

// ==========================================
// СИСТЕМА АТМОСФЕРНЫХ ПАРТИКЛОВ ТУМАНА И ПЫЛИ В МИРЕ ПОДЗЕМЕЛЬЯ (60 FPS, Canvas 2D)
// Частицы привязаны к координатам мира подземелья, а не к экрану камеры!
// ==========================================
class DungeonFogParticles {
    constructor(canvas, dungeonScreen) {
        this.canvas = canvas;
        this.dungeonScreen = dungeonScreen;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.running = false;
        this.animId = null;
        this.onResize = () => this.resize();
        window.addEventListener('resize', this.onResize);
        this.resize();
        this.init();
    }

    resize() {
        const parent = this.canvas.parentElement;
        this.width = parent ? (parent.clientWidth || 1280) : window.innerWidth;
        this.height = parent ? (parent.clientHeight || 800) : window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    init() {
        this.particles = [];
        const ds = this.dungeonScreen;
        const totalFloors = (ds && ds.dungeon && ds.dungeon.totalFloors) ? ds.dungeon.totalFloors : 30;
        const worldW = (ds && ds.WORLD_W) || 1820;
        const padX = (ds && ds.PAD_X) || 90;
        const padY = (ds && ds.PAD_Y) || 90;
        const roomH = (ds && ds.ROOM_H) || 130;
        const gapY = (ds && ds.GAP_Y) || 80;
        const floorPitch = roomH + gapY; // 210px

        for (let f = 1; f <= totalFloors; f++) {
            const floorTop = padY + (f - 1) * floorPitch;
            const minX = padX - 40;
            const maxX = worldW - padX + 40;
            const minY = floorTop - 35;
            const maxY = floorTop + floorPitch + 15;

            // 2 мягких клуба полумглы / тумана на этаж (размытые шлейфы)
            for (let i = 0; i < 2; i++) {
                this.particles.push({
                    type: 'mist',
                    wx: minX + Math.random() * (maxX - minX),
                    wy: minY + Math.random() * (maxY - minY),
                    minX, maxX, minY, maxY,
                    radius: 75 + Math.random() * 75,
                    vx: (Math.random() - 0.5) * 0.2,
                    vy: (Math.random() - 0.5) * 0.12,
                    alpha: 0.12 + Math.random() * 0.12,
                    maxAlpha: 0.16 + Math.random() * 0.12,
                    pulseSpeed: 0.005 + Math.random() * 0.006,
                    phase: Math.random() * Math.PI * 2
                });
            }

            // 7 парящих в воздухе пещеры светящихся спор и пылинок
            for (let i = 0; i < 7; i++) {
                const isGlow = Math.random() > 0.35;
                const color = isGlow
                    ? (Math.random() > 0.5 ? 'rgba(56, 189, 248,' : 'rgba(251, 191, 36,')
                    : 'rgba(148, 163, 184,';

                this.particles.push({
                    type: 'mote',
                    wx: minX + Math.random() * (maxX - minX),
                    wy: minY + Math.random() * (maxY - minY),
                    minX, maxX, minY, maxY,
                    radius: 1.3 + Math.random() * 2.0,
                    vx: (Math.random() - 0.48) * 0.35,
                    vy: (Math.random() - 0.55) * 0.28,
                    alpha: 0.25 + Math.random() * 0.4,
                    maxAlpha: isGlow ? (0.55 + Math.random() * 0.35) : (0.3 + Math.random() * 0.25),
                    color,
                    pulseSpeed: 0.015 + Math.random() * 0.022,
                    phase: Math.random() * Math.PI * 2
                });
            }
        }

        // 20 атмосферных частиц, парящих по вертикальным шахтам между этажами
        const totalWorldH = (ds && ds.WORLD_H) || (padY * 2 + totalFloors * roomH + (totalFloors - 1) * gapY);
        for (let i = 0; i < 20; i++) {
            this.particles.push({
                type: 'mote',
                wx: padX + Math.random() * (worldW - padX * 2),
                wy: padY + Math.random() * (totalWorldH - padY * 2),
                minX: padX - 40,
                maxX: worldW - padX + 40,
                minY: padY - 60,
                maxY: totalWorldH - padY + 40,
                radius: 1.2 + Math.random() * 1.8,
                vx: (Math.random() - 0.5) * 0.18,
                vy: (Math.random() - 0.6) * 0.4,
                alpha: 0.3,
                maxAlpha: 0.6,
                color: 'rgba(56, 189, 248,',
                pulseSpeed: 0.02,
                phase: Math.random() * Math.PI * 2
            });
        }
    }

    start() {
        if (this.running) return;
        this.running = true;
        const tick = () => {
            if (!this.running) return;
            this.update();
            this.draw();
            this.animId = requestAnimationFrame(tick);
        };
        this.animId = requestAnimationFrame(tick);
    }

    stop() {
        this.running = false;
        if (this.animId) {
            cancelAnimationFrame(this.animId);
            this.animId = null;
        }
        window.removeEventListener('resize', this.onResize);
    }

    update() {
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            p.wx += p.vx;
            p.wy += p.vy;
            p.phase += p.pulseSpeed;

            if (p.wx < p.minX) p.wx = p.maxX;
            else if (p.wx > p.maxX) p.wx = p.minX;

            if (p.wy < p.minY) p.wy = p.maxY;
            else if (p.wy > p.maxY) p.wy = p.minY;
        }
    }

    draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);

        const panX = this.dungeonScreen ? (this.dungeonScreen.panX || 0) : 0;
        const panY = this.dungeonScreen ? (this.dungeonScreen.panY || 0) : 0;
        const zoom = this.dungeonScreen ? (this.dungeonScreen.zoom || 1.0) : 1.0;

        // Расчёт видимой области мира с запасом (Frustum Culling) для максимальной производительности
        const margin = 160 / zoom;
        const viewLeft = -panX / zoom - margin;
        const viewRight = (this.width - panX) / zoom + margin;
        const viewTop = -panY / zoom - margin;
        const viewBottom = (this.height - panY) / zoom + margin;

        ctx.save();
        ctx.translate(panX, panY);
        ctx.scale(zoom, zoom);

        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            // Отсечение невидимых частиц за границами экрана
            if (p.wx < viewLeft || p.wx > viewRight || p.wy < viewTop || p.wy > viewBottom) {
                continue;
            }

            const curAlpha = p.maxAlpha * (0.65 + 0.35 * Math.sin(p.phase));

            if (p.type === 'mist') {
                const r = p.radius;
                const grad = ctx.createRadialGradient(p.wx, p.wy, 0, p.wx, p.wy, r);
                grad.addColorStop(0, `rgba(15, 23, 42, ${curAlpha})`);
                grad.addColorStop(0.5, `rgba(8, 14, 26, ${curAlpha * 0.5})`);
                grad.addColorStop(1, 'rgba(2, 3, 6, 0)');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(p.wx, p.wy, r, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Чтобы при уменьшении масштаба пылинки не исчезали полностью, ограничиваем видимый экранный радиус
                const r = Math.max(1.3 / zoom, p.radius);
                ctx.fillStyle = `${p.color}${curAlpha})`;
                ctx.beginPath();
                ctx.arc(p.wx, p.wy, r, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        ctx.restore();
    }
}

export class DungeonScreen {
    constructor(player, callbacks = {}, savedState = null) {
        this.player = player;
        this.callbacks = callbacks;

        // Восстановление состояния или генерация нового подземелья
        if (savedState && savedState.dungeon) {
            this.dungeon = savedState.dungeon;
            this.currentFloor = savedState.currentFloor || 1;
            this.currentRoomIndex = savedState.currentRoomIndex ?? 0;
            this.visitedRooms = new Set(savedState.visitedRooms || []);
        } else {
            this.dungeon = DungeonGenerator.generate({ totalFloors: 30, roomsPerFloor: 7 });
            this.currentFloor = 1;
            this.currentRoomIndex = 0;
            this.visitedRooms = new Set();
        }

        // Гарантируем заселение монстров (обратная совместимость со старыми сохранениями)
        const isPopulated = this.dungeon.floors.some(f => f.rooms.some(r => r.hasMonster !== undefined));
        if (!isPopulated) {
            DungeonMobSpawner.populateDungeon(this.dungeon);
        }

        // Посещаем стартовую комнату
        this.visitedRooms.add(`${this.currentFloor}_${this.currentRoomIndex}`);

        // Геометрия мира подземелья
        this.ROOM_W = 200;
        this.ROOM_H = 130;
        this.GAP_X = 40;
        this.GAP_Y = 80;
        this.PAD_X = 90;
        this.PAD_Y = 90;

        this.WORLD_W = this.PAD_X * 2 + 7 * this.ROOM_W + 6 * this.GAP_X;
        this.WORLD_H = this.PAD_Y * 2 + this.dungeon.totalFloors * this.ROOM_H + (this.dungeon.totalFloors - 1) * this.GAP_Y;

        // Камера и масштабирование
        this.zoom = 1.0;
        this.panX = 0;
        this.panY = 0;
        this.isDragging = false;
        this.dragStartX = 0;
        this.dragStartY = 0;
        this.hasMovedDrag = false;
        this.selectedRoom = null;

        // Анимация перемещения (в стиле South Park)
        this.isMoving = false;
        this.facing = 1; // 1 = вправо, -1 = влево

        // Состояние сворачивания карточки комнаты
        this.isRoomCardCollapsed = false;

        // Оптимизация рендеринга и масштабирования
        this.transformRaf = null;
        this.worldGroupEl = null;
        this.zoomLabelEl = null;

        this.isMusicStarted = false;
        this.boundKeyHandler = null;
    }

    getState() {
        return {
            dungeon: this.dungeon,
            currentFloor: this.currentFloor,
            currentRoomIndex: this.currentRoomIndex,
            visitedRooms: Array.from(this.visitedRooms)
        };
    }

    render(container) {
        this.container = container;
        this.worldGroupEl = null;
        this.zoomLabelEl = null;

        if (!this.isMusicStarted) {
            sound.switchMusic(dungeonTheme, 1.4);
            this.isMusicStarted = true;
        }

        container.innerHTML = `
            <div class="dungeon-screen">
                <!-- ВЕРХНИЙ HUD ПОДЗЕМЕЛЬЯ -->
                <div class="dungeon-hud-top">
                    <div class="dungeon-hud-left">
                        <div class="dungeon-floor-badge" id="dungeon-floor-badge">
                            <span class="floor-title">ЭТАЖ ${this.currentFloor} / ${this.dungeon.totalFloors}</span>
                            <span class="floor-sub">${this.getFloorSubtitle()}</span>
                        </div>
                        <div class="dungeon-room-status" id="dungeon-room-status">
                            ${this.renderRoomStatusSnippet()}
                        </div>
                    </div>

                    <div class="dungeon-hud-center">
                        <div class="dungeon-hero-stats">
                            <span class="stat-item">${Icons.heart(14)} <strong id="hud-hp">${this.player.currentHp}/${this.player.maxHp}</strong> HP</span>
                            <span class="stat-item">${Icons.coin(14)} <strong id="hud-gold">${this.player.gold}</strong></span>
                            <span id="dungeon-tavern-buff-badge">${this.renderTavernBuffHudBadge()}</span>
                        </div>
                    </div>

                    <div class="dungeon-hud-right">
                        <button class="btn btn-secondary dungeon-btn-hud" id="btn-dungeon-menu" title="Открыть инвентарь и снаряжение (I / Esc)">
                            ${Icons.backpack(14)} Инвентарь
                        </button>
                        <button class="btn btn-secondary dungeon-btn-hud" id="btn-dungeon-exit" title="Покинуть подземелье">
                            ${Icons.castle(15)} В город
                        </button>
                    </div>
                </div>

                <!-- ОСНОВНОЙ ВЬЮПОРТ СВОБОДНОГО ЗУМА И ПАНОРАМИРОВАНИЯ -->
                <div class="dungeon-viewport" id="dungeon-viewport">
                    <canvas class="dungeon-particles-canvas" id="dungeon-particles-canvas"></canvas>
                    <div class="dungeon-cave-vignette"></div>

                    <div class="dungeon-zoom-toolbar">
                        <button class="btn-zoom-tool" id="btn-focus-hero" title="Сфокусироваться на герое">${Icons.target(14)} На герое</button>
                        <button class="btn-zoom-tool" id="btn-focus-floor" title="Показать весь текущий этаж">${Icons.pin(14)} Этаж</button>
                        <button class="btn-zoom-tool" id="btn-focus-all" title="Показать всё подземелье целиком">${Icons.map(14)} Всё подземелье</button>
                        <div class="zoom-divider"></div>
                        <button class="btn-zoom-tool btn-round" id="btn-zoom-out" title="Уменьшить масштаб">-</button>
                        <span class="zoom-label" id="zoom-label">100%</span>
                        <button class="btn-zoom-tool btn-round" id="btn-zoom-in" title="Увеличить масштаб">+</button>
                        <div class="zoom-divider"></div>
                        <div class="floor-selector-wrap">
                            <label for="floor-select">Этаж:</label>
                            <select id="floor-select" class="floor-dropdown">
                                ${this.renderFloorSelectOptions()}
                            </select>
                        </div>
                    </div>

                    <svg class="dungeon-canvas" id="dungeon-canvas" width="100%" height="100%">
                        <defs>
                            <filter id="heroGlow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="6" result="blur"/>
                                <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                            </filter>
                            <linearGradient id="ladderRungGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stop-color="#78350f"/>
                                <stop offset="50%" stop-color="#b45309"/>
                                <stop offset="100%" stop-color="#451a03"/>
                            </linearGradient>
                            <linearGradient id="shaftWallGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#0f1117"/>
                                <stop offset="50%" stop-color="#1e2230"/>
                                <stop offset="100%" stop-color="#0f1117"/>
                            </linearGradient>
                            <radialGradient id="shadingGrad" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stop-color="#020306" stop-opacity="0.95"/>
                                <stop offset="70%" stop-color="#050811" stop-opacity="0.9"/>
                                <stop offset="100%" stop-color="#0a101c" stop-opacity="0.4"/>
                            </radialGradient>
                        </defs>

                        <!-- ТРАНСФОРМИРУЕМЫЙ СЛОЙ МИРА -->
                        <g id="dungeon-world-group">
                            ${this.renderWorldSvg()}
                        </g>
                    </svg>

                    <!-- ВСПЛЫВАЮЩАЯ КАРТОЧКА ОСМОТРА КОМНАТЫ -->
                    <div class="dungeon-room-card hidden" id="dungeon-room-card">
                        <div class="room-card-header" id="room-card-header-bar" title="Нажмите, чтобы свернуть или развернуть карточку">
                            <div class="room-card-title-wrap">
                                <span class="room-card-badge" id="card-badge">Комната</span>
                                <h4 class="room-card-title" id="card-title">Название</h4>
                            </div>
                            <button class="room-card-close room-card-toggle-btn" id="btn-close-card" title="Прикрыть / развернуть карточку">
                                ${Icons.chevronDown(16)}
                            </button>
                        </div>
                        <div class="room-card-body" id="room-card-body">
                            <p class="room-card-desc" id="card-desc">Описание</p>
                            <div class="room-card-enemy-section" id="card-enemy"></div>
                            <div class="room-card-actions" id="card-actions"></div>
                        </div>
                    </div>
                </div>

                <!-- НИЖНЯЯ ПАНЕЛЬ УПРАВЛЕНИЯ ПЕРЕМЕЩЕНИЕМ -->
                <div class="dungeon-hud-bottom">
                    <div class="dungeon-controls-bar">
                        <div class="controls-movement-group">
                            <button class="btn btn-secondary btn-dungeon-move" id="btn-move-left" title="Идти влево (Клавиша A или стрелка влево)">
                                ${Icons.arrowLeft(14)} Идти влево
                            </button>
                            <button class="btn btn-secondary btn-dungeon-move" id="btn-move-right" title="Идти вправо (Клавиша D или стрелка вправо)">
                                Идти вправо ${Icons.arrowRight(14)}
                            </button>
                        </div>

                        <div class="controls-stairs-group" id="controls-stairs-group">
                            ${this.renderStairsButtons()}
                        </div>

                        <div class="dungeon-quick-hints">
                            <span>Горячие клавиши: <strong>A / D</strong> — влево/вправо, <strong>W / S</strong> — подъем/спуск, <strong>I</strong> — инвентарь</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.initEvents();
        this.updateButtonsState();
        this.focusOnHero(false);
    }

    getFloorSubtitle() {
        const floor = this.dungeon.floors[this.currentFloor - 1];
        if (floor.isBossFloor) {
            return 'Обитель Хранителя Глубин';
        }
        return floor.direction === 'ltr' ? 'Направление: Слева направо' : 'Направление: Справа налево';
    }

    renderFloorSelectOptions() {
        return this.dungeon.floors.map(f => {
            const isBoss = f.isBossFloor ? ' (БОСС)' : '';
            const isCur = (f.floorNum === this.currentFloor) ? 'selected' : '';
            return `<option value="${f.floorNum}" ${isCur}>Этаж ${f.floorNum}${isBoss}</option>`;
        }).join('');
    }

    renderRoomStatusSnippet() {
        const room = this.dungeon.getRoom(this.currentFloor, this.currentRoomIndex);
        if (!room) return '';

        let badge = `<span class="badge-normal">Сектор ${this.currentRoomIndex + 1}</span>`;
        if (room.isFinalVault || room.templateId === 'final_mystery') {
            badge = this.player.hasViewedAbyssEnding
                ? `<span class="badge-mystery" style="background: rgba(14, 165, 233, 0.2); border-color: #0284c7; color: #7dd3fc;">${Icons.spark(12)} СВЯТИЛИЩЕ</span>`
                : `<span class="badge-mystery">${Icons.question(12)} ТАЙНА</span>`;
        } else if (room.isBossRoom) {
            badge = `<span class="badge-boss">${Icons.crown(12)} АРЕНА БОССА</span>`;
        } else if (room.hasStairsDown) {
            badge = `<span class="badge-stairs">${Icons.stairsDown(12)} СПУСК</span>`;
        } else if (room.hasStairsUp) {
            badge = `<span class="badge-stairs">${Icons.stairsUp(12)} ПОДЪЁМ</span>`;
        }

        let monsterSnippet = '';
        if (room.hasMonster && room.monster && !room.isMonsterDefeated) {
            const m = room.monster;
            const icon = (m.tier === 'final_boss') ? (Icons.skull(13) + Icons.crown(13)) : (m.tier === 'boss') ? Icons.crown(13) : (m.tier === 'hardened') ? Icons.warning(13) : Icons.sword(13);
            monsterSnippet = `
                <span class="hud-monster-pill ${m.tierClass}">
                    ${icon} <strong>${m.fullName}</strong> (${m.hp}/${m.maxHp} HP)
                </span>
            `;
        } else if (room.hasMonster && room.isMonsterDefeated) {
            monsterSnippet = `
                <span class="hud-monster-pill defeated">
                    ${Icons.check(13)} Враг повержен
                </span>
            `;
        }

        return `
            ${badge}
            <span class="room-name-text">${room.name}</span>
            ${monsterSnippet}
        `;
    }

    renderStairsButtons() {
        const room = this.dungeon.getRoom(this.currentFloor, this.currentRoomIndex);
        if (!room) return '';

        let html = '';

        if (room.hasStairsDown && room.stairsDownTarget) {
            html += `
                <button class="btn btn-warning btn-stairs-action" id="btn-stairs-down" title="Спуститься глубже (S или ▼)">
                    ${Icons.stairsDown(15)} Спуститься на этаж ${room.stairsDownTarget.floor}
                </button>
            `;
        }

        if (room.hasStairsUp && room.stairsUpTarget) {
            const isSurface = (room.stairsUpTarget.floor === 0);
            const btnText = isSurface ? `${Icons.castle(15)} Выйти на поверхность в город` : `${Icons.stairsUp(15)} Подняться на этаж ${room.stairsUpTarget.floor}`;
            html += `
                <button class="btn btn-primary btn-stairs-action" id="btn-stairs-up" title="Подняться выше (W или ▲)">
                    ${btnText}
                </button>
            `;
        }

        return html;
    }

    // РАСЧЕТ КООРДИНАТ КОМНАТЫ В МИРЕ
    getRoomCoords(floorNum, roomIndex) {
        const x = this.PAD_X + roomIndex * (this.ROOM_W + this.GAP_X);
        const y = this.PAD_Y + (floorNum - 1) * (this.ROOM_H + this.GAP_Y);
        return { x, y };
    }

    // РАСЧЕТ ТОЧКИ ОПОРЫ НОГ ПЕРСОНАЖА
    getHeroCoords(floorNum, roomIndex) {
        const c = this.getRoomCoords(floorNum, roomIndex);
        const room = this.dungeon ? this.dungeon.getRoom(floorNum, roomIndex) : null;
        const hasActiveMonster = room && room.hasMonster && room.monster && !room.isMonsterDefeated;
        return {
            x: c.x + (hasActiveMonster ? 64 : this.ROOM_W / 2),
            y: c.y + this.ROOM_H - 14 // линия пола комнаты
        };
    }

    renderWorldSvg() {
        let svg = '';

        // 1. ФОН И СЕТКА ГЛУБИН
        svg += `<rect width="${this.WORLD_W}" height="${this.WORLD_H}" fill="#08090d"/>`;

        // 2. ВЕРТИКАЛЬНЫЕ И ГОРИЗОНТАЛЬНЫЕ ШАХТЫ И ПЕРЕХОДЫ (с туманом войны)
        svg += `<g id="corridors-shafts-group">${this.renderCorridorsAndShafts()}</g>`;

        // 3. ОТРИСОВКА ВСЕХ КОМНАТ ПО ЭТАЖАМ
        this.dungeon.floors.forEach(floor => {
            const firstRoomCoords = this.getRoomCoords(floor.floorNum, 0);
            const midY = firstRoomCoords.y + this.ROOM_H / 2;

            const isBoss = floor.isBossFloor;
            const labelColor = isBoss ? '#ef4444' : '#64748b';
            const labelText = isBoss ? `ЭТАЖ ${floor.floorNum} [БОСС]` : `ЭТАЖ ${floor.floorNum}`;

            svg += `
                <text x="${this.PAD_X - 20}" y="${midY + 5}" text-anchor="end" fill="${labelColor}" font-size="14" font-weight="bold" font-family="'Segoe UI', sans-serif" letter-spacing="1">${labelText}</text>
                <text x="${this.WORLD_W - this.PAD_X + 20}" y="${midY + 5}" text-anchor="start" fill="${labelColor}" font-size="14" font-weight="bold" font-family="'Segoe UI', sans-serif" letter-spacing="1">${labelText}</text>
            `;

            floor.rooms.forEach(room => {
                svg += this.renderRoomSvg(room);
            });
        });

        // 4. ПЕРСОНАЖ В ПОЛНЫЙ РОСТ В ТЕКУЩЕЙ КОМНАТЕ
        svg += this.renderHeroActorSvg();

        // 5. ПЕЛЕНА ЧЁРНОГО ТУМАНА НА НЕИССЛЕДОВАННЫХ ГЛУБОКИХ ЭТАЖАХ
        svg += `<g id="abyssal-fog-group" pointer-events="none">${this.renderAbyssalFloorFog()}</g>`;

        return svg;
    }

    renderAbyssalFloorFog() {
        return '';
    }

    isRoomAdjacent(floorNum, roomIndex) {
        if (floorNum === this.currentFloor) {
            return Math.abs(roomIndex - this.currentRoomIndex) <= 1;
        }
        const curRoom = this.dungeon ? this.dungeon.getRoom(this.currentFloor, this.currentRoomIndex) : null;
        if (curRoom) {
            if (curRoom.hasStairsDown && curRoom.stairsDownTarget) {
                if (curRoom.stairsDownTarget.floor === floorNum && curRoom.stairsDownTarget.room === roomIndex) {
                    return true;
                }
            }
            if (curRoom.hasStairsUp && curRoom.stairsUpTarget) {
                if (curRoom.stairsUpTarget.floor === floorNum && curRoom.stairsUpTarget.room === roomIndex) {
                    return true;
                }
            }
        }
        return false;
    }

    renderCorridorsAndShafts() {
        let svg = '';

        this.dungeon.floors.forEach(floor => {
            const f = floor.floorNum;

            // Горизонтальные коридоры между комнатами одного этажа
            for (let r = 0; r < 6; r++) {
                const c1 = this.getRoomCoords(f, r);
                const corridorX = c1.x + this.ROOM_W;
                const corridorY = c1.y + this.ROOM_H / 2 - 20;

                const isVis1 = this.visitedRooms.has(`${f}_${r}`);
                const isVis2 = this.visitedRooms.has(`${f}_${r + 1}`);
                const isAdj1 = this.isRoomAdjacent(f, r);
                const isAdj2 = this.isRoomAdjacent(f, r + 1);

                const isKnown = isVis1 || isVis2 || isAdj1 || isAdj2;

                if (isKnown) {
                    const corrOpacity = (isVis1 && isVis2) ? '1' : '0.75';
                    svg += `
                        <g class="corridor-segment" opacity="${corrOpacity}">
                            <rect x="${corridorX}" y="${corridorY}" width="${this.GAP_X}" height="40" fill="#151722" stroke="#334155" stroke-width="2"/>
                            <line x1="${corridorX}" y1="${corridorY}" x2="${corridorX + this.GAP_X}" y2="${corridorY}" stroke="#475569" stroke-width="2"/>
                            <line x1="${corridorX}" y1="${corridorY + 40}" x2="${corridorX + this.GAP_X}" y2="${corridorY + 40}" stroke="#475569" stroke-width="2"/>
                            <line x1="${corridorX + this.GAP_X / 2}" y1="${corridorY}" x2="${corridorX + this.GAP_X / 2}" y2="${corridorY + 40}" stroke="#252a3b" stroke-width="1.5"/>
                        </g>
                    `;
                } else {
                    svg += `
                        <rect x="${corridorX}" y="${corridorY}" width="${this.GAP_X}" height="40" rx="3" fill="#020306" stroke="#0e1422" stroke-width="1"/>
                    `;
                }
            }

            // Вертикальная шахта лестницы вниз на следующий этаж
            if (f < this.dungeon.totalFloors) {
                const ladderRoomIdx = floor.endRoomIdx;
                const nextFloorStartIdx = (f < this.dungeon.floors.length) ? this.dungeon.floors[f].startRoomIdx : 0;
                const isShaftVis = this.visitedRooms.has(`${f}_${ladderRoomIdx}`) ||
                                   this.visitedRooms.has(`${f + 1}_${nextFloorStartIdx}`) ||
                                   this.isRoomAdjacent(f, ladderRoomIdx) ||
                                   this.isRoomAdjacent(f + 1, nextFloorStartIdx);

                const cRoom = this.getRoomCoords(f, ladderRoomIdx);
                const shaftX = cRoom.x + this.ROOM_W / 2 - 22;
                const shaftY = cRoom.y + this.ROOM_H;
                const shaftW = 44;
                const shaftH = this.GAP_Y;

                if (isShaftVis) {
                    svg += `
                        <g class="shaft-segment" opacity="1">
                            <rect x="${shaftX}" y="${shaftY}" width="${shaftW}" height="${shaftH}" fill="url(#shaftWallGrad)" stroke="#334155" stroke-width="2"/>
                            <line x1="${shaftX + 10}" y1="${shaftY}" x2="${shaftX + 10}" y2="${shaftY + shaftH}" stroke="#78350f" stroke-width="3.5"/>
                            <line x1="${shaftX + shaftW - 10}" y1="${shaftY}" x2="${shaftX + shaftW - 10}" y2="${shaftY + shaftH}" stroke="#78350f" stroke-width="3.5"/>
                    `;

                    const rungs = 5;
                    for (let i = 1; i <= rungs; i++) {
                        const rungY = shaftY + (shaftH / (rungs + 1)) * i;
                        svg += `
                            <line x1="${shaftX + 10}" y1="${rungY}" x2="${shaftX + shaftW - 10}" y2="${rungY}" stroke="url(#ladderRungGrad)" stroke-width="3.5"/>
                        `;
                    }

                    svg += `
                            <polygon points="${shaftX + shaftW / 2},${shaftY + shaftH - 6} ${shaftX + shaftW / 2 - 5},${shaftY + shaftH - 14} ${shaftX + shaftW / 2 + 5},${shaftY + shaftH - 14}" fill="#f59e0b" opacity="0.8"/>
                        </g>
                    `;
                } else {
                    svg += `
                        <rect x="${shaftX}" y="${shaftY}" width="${shaftW}" height="${shaftH}" rx="4" fill="#020306" stroke="#0e1422" stroke-width="1"/>
                    `;
                }
            }
        });

        // Шахта выхода на поверхность на этаже 1 (комната 0)
        const entranceCoords = this.getRoomCoords(1, 0);
        const exitShaftX = entranceCoords.x + this.ROOM_W / 2 - 24;
        const exitShaftY = entranceCoords.y - 65;
        svg += `
            <rect x="${exitShaftX}" y="${exitShaftY}" width="48" height="65" fill="#1e293b" stroke="#0284c7" stroke-width="2"/>
            <polygon points="${exitShaftX + 10},${exitShaftY} ${exitShaftX + 38},${exitShaftY} ${exitShaftX + 46},${exitShaftY + 65} ${exitShaftX + 2},${exitShaftY + 65}" fill="#fef08a" opacity="0.25"/>
            <text x="${exitShaftX + 24}" y="${exitShaftY + 25}" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="bold">ГОРОД</text>
            <polygon points="${exitShaftX + 24},${exitShaftY + 36} ${exitShaftX + 18},${exitShaftY + 44} ${exitShaftX + 30},${exitShaftY + 44}" fill="#38bdf8"/>
        `;

        return svg;
    }

    renderRoomSvg(room) {
        const { x, y } = this.getRoomCoords(room.floorNum, room.roomIndex);
        const isCurrent = (room.floorNum === this.currentFloor && room.roomIndex === this.currentRoomIndex);
        const isVisited = this.visitedRooms.has(`${room.floorNum}_${room.roomIndex}`) || !!CheatSystem.flags.revealMap;
        const isAdjacent = !isVisited && this.isRoomAdjacent(room.floorNum, room.roomIndex);
        const isFogged = !isVisited && !isAdjacent && !CheatSystem.flags.revealMap;
        const isBoss = room.isBossRoom;

        let strokeColor = isBoss ? '#ef4444' : '#334155';
        let strokeWidth = isBoss ? '3' : '2';

        if (isCurrent) {
            strokeColor = '#38bdf8';
            strokeWidth = '3.5';
        } else if (isFogged) {
            strokeColor = isBoss ? '#7f1d1d' : '#1e293b';
            strokeWidth = isBoss ? '2' : '1.5';
        } else if (isAdjacent) {
            strokeColor = isBoss ? '#dc2626' : '#475569';
            strokeWidth = '2';
        }

        // КОМНАТА В НЕПРОНИЦАЕМОМ ЧЁРНОМ ТУМАНЕ ВОЙНЫ (ЗАТЕМНЕНИЕ)
        if (isFogged) {
            return `
                <g class="dungeon-room-node room-fogged ${isBoss ? 'fog-boss-glow' : ''}" 
                   id="room-node-${room.floorNum}-${room.roomIndex}"
                   data-floor="${room.floorNum}" 
                   data-room="${room.roomIndex}" 
                   transform="translate(${x}, ${y})">
                    
                    <!-- Непроницаемое затемнение ячейки -->
                    <rect width="${this.ROOM_W}" height="${this.ROOM_H}" rx="8" fill="#020306"/>
                    <rect width="${this.ROOM_W}" height="${this.ROOM_H}" rx="8" fill="url(#shadingGrad)"/>
                    
                    <!-- Аккуратный контур ячейки во тьме -->
                    <rect width="${this.ROOM_W}" height="${this.ROOM_H}" rx="8" 
                          fill="none" 
                          stroke="${isBoss ? '#7f1d1d' : '#1e293b'}" 
                          stroke-width="1.5" 
                          stroke-dasharray="6 5"
                          opacity="${isBoss ? '0.75' : '0.4'}" 
                          class="room-fog-border"/>

                    <!-- Центровой маяк неизвестности -->
                    <g transform="translate(${this.ROOM_W / 2}, ${this.ROOM_H / 2})" pointer-events="none">
                        ${isBoss ? `
                            <circle cx="0" cy="0" r="22" fill="#170303" stroke="#7f1d1d" stroke-width="1.8"/>
                            <path d="M-8,-4 C-8,-12 8,-12 8,-4 C8,3 4,5 4,10 L-4,10 C-4,5 -8,3 -8,-4 Z" fill="#ef4444" opacity="0.95"/>
                            <circle cx="-3.5" cy="-4" r="1.4" fill="#170303"/>
                            <circle cx="3.5" cy="-4" r="1.4" fill="#170303"/>
                            <line x1="-1.8" y1="5" x2="-1.8" y2="9" stroke="#7f1d1d" stroke-width="1.2"/>
                            <line x1="1.8" y1="5" x2="1.8" y2="9" stroke="#7f1d1d" stroke-width="1.2"/>
                            <text x="0" y="23" text-anchor="middle" fill="#ef4444" font-size="9" font-weight="bold" font-family="'Segoe UI', sans-serif" letter-spacing="1">БОСС</text>
                        ` : `
                            <circle cx="0" cy="0" r="17" fill="#050811" stroke="#1e293b" stroke-width="1.4"/>
                            <text x="0" y="6.5" text-anchor="middle" fill="#64748b" font-size="18" font-weight="bold" font-family="'Segoe UI', sans-serif" class="fog-beacon-pulse">?</text>
                        `}
                    </g>
                </g>
            `;
        }

        // КОМНАТА ПОСЕЩЕНА ИЛИ СОСЕДНЯЯ (ВИДНА ВО МГЛЕ)
        const roomOpacity = isVisited ? '1' : '0.82';
        const innerSvg = room.template.renderSvg(this.ROOM_W, this.ROOM_H);

        let cornerBadgeSvg = '';
        if (room.hasStairsDown) {
            const stairsX = (room.hasMonster && !room.isMonsterDefeated) ? 6 : (this.ROOM_W - 32);
            cornerBadgeSvg = `
                <g transform="translate(${stairsX}, ${this.ROOM_H - 30})">
                    <circle cx="14" cy="14" r="13" fill="#18181b" stroke="#f59e0b" stroke-width="1.8"/>
                    <path d="M9 11 L14 18 L19 11" stroke="#f59e0b" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                </g>
            `;
        } else if (room.hasStairsUp) {
            cornerBadgeSvg = `
                <g transform="translate(6, 6)">
                    <circle cx="14" cy="14" r="13" fill="#18181b" stroke="#38bdf8" stroke-width="1.8"/>
                    <path d="M9 17 L14 10 L19 17" stroke="#38bdf8" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                </g>
            `;
        }

        if (room.isFinalVault || room.templateId === 'final_mystery') {
            cornerBadgeSvg += `
                <g transform="translate(${this.ROOM_W - 34}, 6)">
                    <circle cx="14" cy="14" r="13" fill="#3b0764" stroke="#d946ef" stroke-width="2"/>
                    <path d="M11 11.5c0-1.2 1.5-1.6 1.5-2.8a2.5 2.5 0 0 0-5 0" stroke="#f5d0fe" stroke-width="2" stroke-linecap="round" fill="none"/>
                    <circle cx="11" cy="17" r="1.3" fill="#f5d0fe"/>
                </g>
            `;
        } else if (isBoss) {
            cornerBadgeSvg += `
                <g transform="translate(${this.ROOM_W - 34}, 6)">
                    <circle cx="14" cy="14" r="13" fill="#450a0a" stroke="#ef4444" stroke-width="2"/>
                    <path d="M9 13.5c0-2.8 2-4.5 5-4.5s5 1.7 5 4.5c0 1.8-1 3-2 3.6v2.4h-6v-2.4c-1-.6-2-1.8-2-3.6z" fill="#fecaca" stroke="#7f1d1d" stroke-width="0.7"/>
                    <circle cx="12" cy="13.5" r="1.2" fill="#450a0a"/>
                    <circle cx="16" cy="13.5" r="1.2" fill="#450a0a"/>
                </g>
            `;
        }

        let monsterSvg = '';
        if (room.hasMonster && room.monster) {
            if (!room.isMonsterDefeated) {
                const m = room.monster;
                const isBossMob = (m.tier === 'boss' || m.tier === 'final_boss');
                const mw = isBossMob ? 62 : 54;
                const mh = isBossMob ? 74 : 64;
                const mx = this.ROOM_W - mw - 14;
                const my = (this.ROOM_H - 14) - Math.round(mh * (208 / 240));

                if (isAdjacent) {
                    // Соседняя комната: угроза скрыта во мгле тумана
                    monsterSvg = `
                        <g class="room-mob-silhouette" transform="translate(${mx}, ${my})" opacity="0.85">
                            <ellipse cx="${mw / 2}" cy="${mh - 4}" rx="${mw * 0.4}" ry="6" fill="#000000" opacity="0.6"/>
                            <path d="M${mw/2 - 14},${mh - 8} Q${mw/2 - 18},${mh/2} ${mw/2},${mh * 0.25} Q${mw/2 + 18},${mh/2} ${mw/2 + 14},${mh - 8} Z" fill="#090d16" stroke="#334155" stroke-width="1.2"/>
                            <!-- Горящие во мгле глаза -->
                            <circle cx="${mw / 2 - 5}" cy="${mh * 0.38}" r="2" fill="#ef4444"/>
                            <circle cx="${mw / 2 + 5}" cy="${mh * 0.38}" r="2" fill="#ef4444"/>
                            <text x="${mw / 2}" y="-4" text-anchor="middle" fill="#ef4444" font-size="9" font-weight="bold">???</text>
                        </g>
                    `;
                } else {
                    const hpPercent = Math.max(5, Math.min(100, Math.round((m.hp / m.maxHp) * 100)));
                    const barW = isBossMob ? 46 : 38;
                    const barFillW = Math.round((barW * hpPercent) / 100);
                    const barX = (mw - barW) / 2;
                    const hpColor = isBossMob ? '#ef4444' : (m.tier === 'hardened' ? '#f59e0b' : '#22c55e');

                    monsterSvg = `
                        <g class="room-mob-entity ${m.tierClass}" id="mob-${room.floorNum}-${room.roomIndex}" transform="translate(${mx}, ${my})">
                            <!-- Мини шкала HP над монстром -->
                            <g transform="translate(${barX}, -10)">
                                <rect width="${barW}" height="4.5" rx="2" fill="#090d16" stroke="#334155" stroke-width="0.8"/>
                                <rect width="${barFillW}" height="4.5" rx="2" fill="${hpColor}"/>
                            </g>
                            <!-- Значок босса над шкалой -->
                            ${isBossMob ? `
                                <g transform="translate(${mw / 2}, -16)">
                                    <polygon points="-7,5 7,5 7,-1 4,2 0,-4 -4,2 -7,-1" fill="#f59e0b" stroke="#b45309" stroke-width="0.8"/>
                                    <circle cx="-7" cy="-1" r="0.8" fill="#ef4444"/>
                                    <circle cx="0" cy="-4" r="1" fill="#38bdf8"/>
                                    <circle cx="7" cy="-1" r="0.8" fill="#ef4444"/>
                                    ${m.tier === 'final_boss' ? `
                                        <circle cx="0" cy="1" r="1.2" fill="#7f1d1d"/>
                                    ` : ''}
                                </g>
                            ` : ''}
                            ${MobRenderer.render(m, mw, mh, false, this.getMobFacing(room))}
                        </g>
                    `;
                }
            } else {
                monsterSvg = `
                    <g class="room-mob-defeated" transform="translate(${this.ROOM_W - 46}, ${this.ROOM_H - 32})">
                        <circle cx="12" cy="12" r="11" fill="#0f172a" stroke="#475569" stroke-width="1.2"/>
                        <path d="M8 11.5c0-2.2 1.8-3.8 4-3.8s4 1.6 4 3.8c0 1.5-.8 2.6-1.6 3v2h-4.8v-2c-.8-.4-1.6-1.5-1.6-3z" fill="#94a3b8" stroke="#334155" stroke-width="0.7"/>
                        <circle cx="10.5" cy="11.5" r="1" fill="#0f172a"/>
                        <circle cx="13.5" cy="11.5" r="1" fill="#0f172a"/>
                    </g>
                `;
            }
        }

        let chestSvg = '';
        if (room.hasChest) {
            const hasMonster = room.hasMonster && !room.isMonsterDefeated;
            const chestX = hasMonster ? (this.ROOM_W / 2 + 6) : (this.ROOM_W - 56);
            const chestY = this.ROOM_H - 36;
            const isOpened = !!room.chestOpened;

            if (isAdjacent) {
                chestSvg = `
                    <g class="room-chest-silhouette" transform="translate(${chestX}, ${chestY})" opacity="0.6">
                        ${Icons.chest(28, false, 'wooden')}
                    </g>
                `;
            } else {
                const chestGlow = !isOpened ? `
                    <ellipse cx="14" cy="18" rx="16" ry="6" fill="#facc15" opacity="0.35" class="anim-chest-pulse"/>
                ` : '';

                chestSvg = `
                    <g class="room-chest-interactive ${isOpened ? 'opened' : 'closed'}" 
                       transform="translate(${chestX}, ${chestY})"
                       data-floor="${room.floorNum}"
                       data-room="${room.roomIndex}"
                       title="${isOpened ? 'Открытый сундук' : 'Сундук с сокровищами!'}">
                        ${chestGlow}
                        ${Icons.chest(28, isOpened, room.chestType || 'wooden')}
                    </g>
                `;
            }
        }

        return `
            <g class="dungeon-room-node ${isCurrent ? 'current-room' : ''} ${isAdjacent ? 'room-adjacent' : ''}" 
               id="room-node-${room.floorNum}-${room.roomIndex}"
               data-floor="${room.floorNum}" 
               data-room="${room.roomIndex}" 
               transform="translate(${x}, ${y})"
               opacity="${roomOpacity}"
               style="cursor: pointer;">
                <rect width="${this.ROOM_W}" height="${this.ROOM_H}" rx="8" fill="${room.template.bgColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>

                <g class="room-interior">
                    ${innerSvg}
                </g>

                <rect x="0" y="0" width="${this.ROOM_W}" height="24" rx="6" fill="#090a0f" opacity="0.65"/>
                <text x="10" y="16" fill="#cbd5e1" font-size="11" font-weight="600" font-family="'Segoe UI', sans-serif">
                    ${room.name}
                </text>

                ${cornerBadgeSvg}
                ${chestSvg}
                ${monsterSvg}
            </g>
        `;
    }

    // ОТРИСОВКА ПЕРСОНАЖА В ПОЛНЫЙ РОСТ С ТОЧКОЙ ОПОРЫ В НОГАХ
    renderHeroActorSvg() {
        const { x, y } = this.getHeroCoords(this.currentFloor, this.currentRoomIndex);

        return `
            <g id="hero-actor-container" transform="translate(${x}, ${y})">
                <!-- Ореол присутствия -->
                <circle cx="0" cy="-42" r="38" fill="#38bdf8" opacity="0.18" class="hero-halo-pulse"/>

                <!-- Тень на полу под ногами героя -->
                <ellipse id="hero-ground-shadow" cx="0" cy="2" rx="22" ry="6" fill="#000000" opacity="0.5"/>

                <!-- Узел комичной анимации переваливания (South Park Waddle Pivot) -->
                <g id="hero-waddle-pivot" transform="translate(0, 0) rotate(0)">
                    <!-- Узел направления взгляда (отзеркаливание влево/вправо) -->
                    <g id="hero-facing-node" transform="scale(${this.facing}, 1)">
                        <g transform="translate(-32, -80)">
                            ${CharacterRenderer.renderDungeonFigure(this.player.visuals, this.player.classId, this.player.equipment, 64, 88)}
                        </g>
                    </g>
                </g>

                <!-- Имя героя над головой -->
                <g id="hero-nametag-node" transform="translate(0, -96)">
                    <rect x="-42" y="-14" width="84" height="18" rx="3" fill="#090d16" stroke="#38bdf8" stroke-width="1.2"/>
                    <text x="0" y="-1" text-anchor="middle" fill="#f8fafc" font-size="10" font-weight="bold" font-family="'Segoe UI', sans-serif">
                        ${this.player.name}
                    </text>
                </g>
            </g>
        `;
    }

    // =======================================================
    // КОМИЧНАЯ ПЛАВНАЯ АНИМАЦИЯ ПЕРЕМЕЩЕНИЯ (SOUTH PARK STYLE)
    // =======================================================

    animateMoveHorizontal(fromRoomIdx, toRoomIdx, onComplete) {
        if (this.isMoving) return;
        this.isMoving = true;
        this.updateButtonsState();

        const floor = this.currentFloor;
        const startPos = this.getHeroCoords(floor, fromRoomIdx);
        const endPos = this.getHeroCoords(floor, toRoomIdx);

        // Направление взгляда героя
        this.facing = (toRoomIdx > fromRoomIdx) ? 1 : -1;

        const heroContainer = this.container.querySelector('#hero-actor-container');
        const waddlePivot = this.container.querySelector('#hero-waddle-pivot');
        const facingNode = this.container.querySelector('#hero-facing-node');
        const shadow = this.container.querySelector('#hero-ground-shadow');

        if (facingNode) {
            facingNode.setAttribute('transform', `scale(${this.facing}, 1)`);
        }

        const duration = 520; // 520мс плавного комичного перехода между секторами
        const startTime = performance.now();
        const steps = 4; // 4 комичных шага-подпрыгивания за переход
        let lastStepIdx = -1;

        const animFrame = (currentTime) => {
            const elapsed = currentTime - startTime;
            const p = Math.min(1, elapsed / duration);

            // Плавное продвижение вперед
            const curX = startPos.x + (endPos.x - startPos.x) * p;
            const curY = startPos.y;

            // Комичная механика South Park:
            const stepProgress = (p * steps) % 1;
            const currentStepIdx = Math.floor(p * steps);

            // 1. Подпрыгивание вверх-вниз (парабола)
            const hopY = -Math.sin(stepProgress * Math.PI) * 14;

            // 2. Переваливание и покачивание из стороны в сторону (наклоны куклы)
            const tiltDirection = (currentStepIdx % 2 === 0) ? -1 : 1;
            const tiltDeg = Math.sin(stepProgress * Math.PI) * 8.5 * tiltDirection;

            // 3. Легкое комичное смещение бедер в стороны
            const sideWobble = Math.sin(p * steps * Math.PI) * 2.5;

            // Воспроизводим звук шага при каждом приземлении ноги
            if (currentStepIdx !== lastStepIdx && p < 0.95) {
                lastStepIdx = currentStepIdx;
                sound.playSfx('step');
            }

            // Применяем трансформации к SVG
            if (heroContainer) {
                heroContainer.setAttribute('transform', `translate(${curX + sideWobble}, ${curY})`);
            }
            if (waddlePivot) {
                waddlePivot.setAttribute('transform', `translate(0, ${hopY}) rotate(${tiltDeg})`);
            }
            if (shadow) {
                const shadowScale = Math.max(0.65, 1 - (Math.abs(hopY) / 14) * 0.35);
                shadow.setAttribute('transform', `scale(${shadowScale}, ${shadowScale})`);
                shadow.setAttribute('opacity', `${0.5 - (Math.abs(hopY) / 14) * 0.25}`);
            }

            // Камера плавно следует за персонажем
            const viewport = this.container.querySelector('#dungeon-viewport');
            if (viewport) {
                const vpW = viewport.clientWidth || 960;
                const vpH = viewport.clientHeight || 510;
                this.panX = vpW / 2 - curX * this.zoom;
                this.panY = vpH / 2 - curY * this.zoom;
                this.applyTransform();
            }

            if (p < 1) {
                requestAnimationFrame(animFrame);
            } else {
                // Прибытие в комнату
                sound.playSfx('step');
                if (heroContainer) {
                    heroContainer.setAttribute('transform', `translate(${endPos.x}, ${endPos.y})`);
                }
                if (waddlePivot) {
                    waddlePivot.setAttribute('transform', 'translate(0, 0) rotate(0)');
                }
                if (shadow) {
                    shadow.setAttribute('transform', 'scale(1, 1)');
                    shadow.setAttribute('opacity', '0.5');
                }

                this.isMoving = false;
                if (onComplete) onComplete();
            }
        };

        requestAnimationFrame(animFrame);
    }

    animateMoveStairs(targetFloor, targetRoom, isDown, onComplete) {
        if (this.isMoving) return;
        this.isMoving = true;
        this.updateButtonsState();

        const startPos = this.getHeroCoords(this.currentFloor, this.currentRoomIndex);
        const endPos = this.getHeroCoords(targetFloor, targetRoom);

        const heroContainer = this.container.querySelector('#hero-actor-container');
        const waddlePivot = this.container.querySelector('#hero-waddle-pivot');
        const shadow = this.container.querySelector('#hero-ground-shadow');

        sound.playSfx('stairs');

        const duration = 650;
        const startTime = performance.now();
        const rungs = 6;
        let lastRung = -1;

        const animFrame = (currentTime) => {
            const elapsed = currentTime - startTime;
            const p = Math.min(1, elapsed / duration);

            const curX = startPos.x;
            const curY = startPos.y + (endPos.y - startPos.y) * p;

            // Комичные перескоки по перекладинам лестницы
            const rungProgress = (p * rungs) % 1;
            const curRung = Math.floor(p * rungs);

            const hopY = -Math.sin(rungProgress * Math.PI) * 8;
            const tilt = Math.sin(p * rungs * Math.PI) * 7 * (isDown ? 1 : -1);

            if (curRung !== lastRung && p < 0.95) {
                lastRung = curRung;
                sound.playSfx('step');
            }

            if (heroContainer) {
                heroContainer.setAttribute('transform', `translate(${curX}, ${curY})`);
            }
            if (waddlePivot) {
                waddlePivot.setAttribute('transform', `translate(0, ${hopY}) rotate(${tilt})`);
            }

            // Камера следует по вертикали
            const viewport = this.container.querySelector('#dungeon-viewport');
            if (viewport) {
                const vpW = viewport.clientWidth || 960;
                const vpH = viewport.clientHeight || 510;
                this.panX = vpW / 2 - curX * this.zoom;
                this.panY = vpH / 2 - curY * this.zoom;
                this.applyTransform();
            }

            if (p < 1) {
                requestAnimationFrame(animFrame);
            } else {
                sound.playSfx('step');
                if (heroContainer) {
                    heroContainer.setAttribute('transform', `translate(${endPos.x}, ${endPos.y})`);
                }
                if (waddlePivot) {
                    waddlePivot.setAttribute('transform', 'translate(0, 0) rotate(0)');
                }
                this.isMoving = false;
                if (onComplete) onComplete();
            }
        };

        requestAnimationFrame(animFrame);
    }

    // ==========================================
    // УПРАВЛЕНИЕ КАМЕРОЙ И ЗУМОМ
    // ==========================================

    applyTransform() {
        if (!this.worldGroupEl && this.container) {
            this.worldGroupEl = this.container.querySelector('#dungeon-world-group');
        }
        if (this.worldGroupEl) {
            this.worldGroupEl.setAttribute('transform', `translate(${this.panX}, ${this.panY}) scale(${this.zoom})`);
        }
        if (!this.zoomLabelEl && this.container) {
            this.zoomLabelEl = this.container.querySelector('#zoom-label');
        }
        if (this.zoomLabelEl) {
            this.zoomLabelEl.textContent = `${Math.round(this.zoom * 100)}%`;
        }
    }

    scheduleTransform() {
        if (this.transformRaf) return;
        this.transformRaf = requestAnimationFrame(() => {
            this.applyTransform();
            this.transformRaf = null;
        });
    }

    focusOnHero(smooth = true) {
        const { x, y } = this.getHeroCoords(this.currentFloor, this.currentRoomIndex);

        const viewport = this.container ? this.container.querySelector('#dungeon-viewport') : null;
        if (!viewport) return;
        const vpW = viewport.clientWidth || 960;
        const vpH = viewport.clientHeight || 510;

        this.zoom = 1.0;
        this.panX = vpW / 2 - x * this.zoom;
        this.panY = vpH / 2 - (y - 30) * this.zoom;

        this.applyTransform();
    }

    focusOnFloor(floorNum) {
        const f = floorNum || this.currentFloor;
        const firstRoom = this.getRoomCoords(f, 0);
        const lastRoom = this.getRoomCoords(f, 6);

        const floorCenterX = (firstRoom.x + lastRoom.x + this.ROOM_W) / 2;
        const floorCenterY = firstRoom.y + this.ROOM_H / 2;

        const viewport = this.container ? this.container.querySelector('#dungeon-viewport') : null;
        if (!viewport) return;
        const vpW = viewport.clientWidth || 960;
        const vpH = viewport.clientHeight || 510;

        this.zoom = 0.52;
        this.panX = vpW / 2 - floorCenterX * this.zoom;
        this.panY = vpH / 2 - floorCenterY * this.zoom;

        this.applyTransform();
    }

    focusOnAll() {
        const viewport = this.container ? this.container.querySelector('#dungeon-viewport') : null;
        if (!viewport) return;
        const vpW = viewport.clientWidth || 960;
        const vpH = viewport.clientHeight || 510;

        const worldCenterX = this.WORLD_W / 2;
        const worldCenterY = this.WORLD_H / 2;

        this.zoom = Math.min(vpW / this.WORLD_W, vpH / this.WORLD_H) * 0.95;
        this.panX = vpW / 2 - worldCenterX * this.zoom;
        this.panY = vpH / 2 - worldCenterY * this.zoom;

        this.applyTransform();
    }

    zoomBy(factor) {
        const viewport = this.container ? this.container.querySelector('#dungeon-viewport') : null;
        const vpW = viewport ? (viewport.clientWidth || 960) : 960;
        const vpH = viewport ? (viewport.clientHeight || 510) : 510;

        const centerX = vpW / 2;
        const centerY = vpH / 2;

        const worldX = (centerX - this.panX) / this.zoom;
        const worldY = (centerY - this.panY) / this.zoom;

        this.zoom = Math.max(0.11, Math.min(2.2, this.zoom * factor));
        this.panX = centerX - worldX * this.zoom;
        this.panY = centerY - worldY * this.zoom;

        this.scheduleTransform();
    }

    zoomAtPoint(screenX, screenY, factor) {
        const worldX = (screenX - this.panX) / this.zoom;
        const worldY = (screenY - this.panY) / this.zoom;

        const newZoom = Math.max(0.11, Math.min(2.2, this.zoom * factor));
        this.panX = screenX - worldX * newZoom;
        this.panY = screenY - worldY * newZoom;
        this.zoom = newZoom;

        this.scheduleTransform();
    }

    // ==========================================
    // ЛОГИКА ДВИЖЕНИЯ ИГРОКА
    // ==========================================

    getMobFacing(room) {
        if (!room) return 'left';
        if (room.floorNum === this.currentFloor) {
            if (room.roomIndex > this.currentRoomIndex) {
                // Игрок находится левее комнаты монстра и идёт на него слева -> моб смотрит влево
                return 'left';
            } else if (room.roomIndex < this.currentRoomIndex) {
                // Игрок находится правее комнаты монстра и идёт на него справа -> моб смотрит вправо
                return 'right';
            } else {
                // В той же комнате: герой стоит слева (x=64), монстр справа (x=132) -> моб смотрит влево на героя
                return 'left';
            }
        }
        const isOdd = (room.floorNum % 2 === 1);
        return isOdd ? 'left' : 'right';
    }

    updateAllMobsFacing() {
        const floor = this.dungeon ? this.dungeon.floors[this.currentFloor - 1] : null;
        if (!floor) return;

        const rightFacingArchs = ['kobold', 'rat', 'gnoll', 'crypt_chimera'];
        floor.rooms.forEach(r => {
            if (r.hasMonster && r.monster && !r.isMonsterDefeated) {
                const mobEl = this.container.querySelector(`#mob-${r.floorNum}-${r.roomIndex}`);
                if (mobEl && rightFacingArchs.includes(r.monster.archetype)) {
                    const facing = this.getMobFacing(r);
                    const svgFigure = mobEl.querySelector('.mob-svg-figure');
                    if (svgFigure) {
                        const actorNode = svgFigure.querySelector('g[id^="mob-actor-"]');
                        if (actorNode) {
                            if (facing === 'left' || facing === -1) {
                                actorNode.setAttribute('transform', 'translate(200, 0) scale(-1, 1)');
                            } else {
                                actorNode.removeAttribute('transform');
                            }
                        }
                    }
                }
            }
        });
    }

    showToast(message) {
        this.toastMessage = message;
        if (this.toastTimer) clearTimeout(this.toastTimer);

        let banner = this.container.querySelector('#dungeon-toast');
        if (!banner) {
            banner = document.createElement('div');
            banner.id = 'dungeon-toast';
            banner.className = 'dungeon-toast-banner';
            const hudBottom = this.container.querySelector('.dungeon-hud-bottom');
            if (hudBottom) {
                hudBottom.insertBefore(banner, hudBottom.firstChild);
            }
        }

        if (banner) {
            banner.innerHTML = message;
            banner.classList.add('visible');
        }

        this.toastTimer = setTimeout(() => {
            if (banner) banner.classList.remove('visible');
            this.toastMessage = null;
            this.toastTimer = null;
        }, 3200);
    }

    moveLeft() {
        if (this.isMoving) return;
        const currentRoom = this.dungeon.getRoom(this.currentFloor, this.currentRoomIndex);
        const hasUndefeatedMonster = !CheatSystem.flags.ignoreMonsters && currentRoom && currentRoom.hasMonster && currentRoom.monster && !currentRoom.isMonsterDefeated;
        const isEvenFloor = (this.currentFloor % 2 === 0);

        // На чётном этаже движение влево — это продвижение вперёд ("дальше")
        if (hasUndefeatedMonster && isEvenFloor) {
            sound.playSfx('threat');
            this.showToast(`${Icons.skull(14)} Путь преграждает ${currentRoom.monster.fullName}! Вы не можете пройти дальше, пока не победите его.`);
            this.inspectRoom(this.currentFloor, this.currentRoomIndex);
            return;
        }

        if (this.currentRoomIndex > 0) {
            const oldIdx = this.currentRoomIndex;
            const newIdx = oldIdx - 1;
            this.animateMoveHorizontal(oldIdx, newIdx, () => {
                this.currentRoomIndex = newIdx;
                this.onPlayerArrived();
            });
        } else {
            sound.playSfx('click');
        }
    }

    moveRight() {
        if (this.isMoving) return;
        const currentRoom = this.dungeon.getRoom(this.currentFloor, this.currentRoomIndex);
        const hasUndefeatedMonster = !CheatSystem.flags.ignoreMonsters && currentRoom && currentRoom.hasMonster && currentRoom.monster && !currentRoom.isMonsterDefeated;
        const isOddFloor = (this.currentFloor % 2 === 1);

        // На нечётном этаже движение вправо — это продвижение вперёд ("дальше")
        if (hasUndefeatedMonster && isOddFloor) {
            sound.playSfx('threat');
            this.showToast(`${Icons.skull(14)} Путь преграждает ${currentRoom.monster.fullName}! Вы не можете пройти дальше, пока не победите его.`);
            this.inspectRoom(this.currentFloor, this.currentRoomIndex);
            return;
        }

        if (this.currentRoomIndex < 6) {
            const oldIdx = this.currentRoomIndex;
            const newIdx = oldIdx + 1;
            this.animateMoveHorizontal(oldIdx, newIdx, () => {
                this.currentRoomIndex = newIdx;
                this.onPlayerArrived();
            });
        } else {
            sound.playSfx('click');
        }
    }

    descendStairs() {
        if (this.isMoving) return;
        const room = this.dungeon.getRoom(this.currentFloor, this.currentRoomIndex);
        if (room && room.hasMonster && room.monster && !room.isMonsterDefeated) {
            sound.playSfx('threat');
            this.showToast(`${Icons.skull(14)} Спуск заблокирован! Победите ${room.monster.fullName}, чтобы спуститься глубже.`);
            this.inspectRoom(this.currentFloor, this.currentRoomIndex);
            return;
        }

        if (room && room.hasStairsDown && room.stairsDownTarget) {
            const targetFloor = room.stairsDownTarget.floor;
            const targetRoom = room.stairsDownTarget.room;

            this.animateMoveStairs(targetFloor, targetRoom, true, () => {
                this.currentFloor = targetFloor;
                this.currentRoomIndex = targetRoom;
                this.onPlayerArrived(true);
            });
        }
    }

    ascendStairs() {
        if (this.isMoving) return;
        const room = this.dungeon.getRoom(this.currentFloor, this.currentRoomIndex);
        if (room && room.hasStairsUp && room.stairsUpTarget) {
            if (room.stairsUpTarget.floor === 0) {
                // Выход в город
                sound.playSfx('selectHero');
                if (this.callbacks.onExitToTown) {
                    this.cleanup();
                    this.callbacks.onExitToTown(this.getState());
                }
                return;
            }

            const targetFloor = room.stairsUpTarget.floor;
            const targetRoom = room.stairsUpTarget.room;

            this.animateMoveStairs(targetFloor, targetRoom, false, () => {
                this.currentFloor = targetFloor;
                this.currentRoomIndex = targetRoom;
                this.onPlayerArrived(true);
            });
        }
    }

    onPlayerArrived(isFloorChange = false) {
        this.visitedRooms.add(`${this.currentFloor}_${this.currentRoomIndex}`);

        // Рассеиваем туман войны вокруг игрока и обновляем видимость комнат
        this.updateFogOfWar();

        // Обновляем визуальный статус комнат (снимаем/ставим рамку current-room)
        const oldCurrent = this.container.querySelector('.dungeon-room-node.current-room');
        if (oldCurrent) {
            oldCurrent.classList.remove('current-room');
        }

        const newCurrent = this.container.querySelector(`#room-node-${this.currentFloor}-${this.currentRoomIndex}`);
        if (newCurrent) {
            newCurrent.classList.add('current-room');
            newCurrent.setAttribute('opacity', '1');
        }

        // Если в комнате есть враг, поворачиваем героя лицом к противнику и открываем карточку
        const room = this.dungeon.getRoom(this.currentFloor, this.currentRoomIndex);

        // Проверка входа в финальную клетку 30-го этажа после победы над финальным боссом
        if (this.currentFloor === 30 && (room.isFinalVault || room.templateId === 'final_mystery') && this.player.hasDefeatedFinalBoss && !this.player.hasViewedAbyssEnding) {
            if (this.callbacks.onPlayCutscene) {
                this.cleanup();
                this.callbacks.onPlayCutscene('abyss_ending', this.getState());
                return;
            }
        }

        if (this.currentFloor === 30 && (room.isFinalVault || room.templateId === 'final_mystery') && this.player.hasViewedAbyssEnding) {
            this.inspectRoom(this.currentFloor, this.currentRoomIndex);
        }

        if (room && room.hasMonster && room.monster && !room.isMonsterDefeated) {
            this.facing = 1;
            const facingNode = this.container.querySelector('#hero-facing-node');
            if (facingNode) {
                facingNode.setAttribute('transform', `scale(${this.facing}, 1)`);
            }
            if (room.isBossRoom) {
                sound.playSfx('threat');
            }
            this.inspectRoom(this.currentFloor, this.currentRoomIndex);
        }

        this.updateAllMobsFacing();
        this.updateHudState();
        this.updateButtonsState();
    }

    updateFogOfWar() {
        const floorsToUpdate = new Set([this.currentFloor - 1, this.currentFloor, this.currentFloor + 1]);
        floorsToUpdate.forEach(fNum => {
            if (fNum >= 1 && fNum <= this.dungeon.totalFloors) {
                const floor = this.dungeon.floors[fNum - 1];
                if (floor) {
                    floor.rooms.forEach(room => {
                        const oldNode = this.container.querySelector(`#room-node-${room.floorNum}-${room.roomIndex}`);
                        if (oldNode) {
                            const temp = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                            temp.innerHTML = this.renderRoomSvg(room);
                            const newNode = temp.firstElementChild;
                            if (newNode) {
                                oldNode.replaceWith(newNode);
                            }
                        }
                    });
                }
            }
        });

        // Обновляем коридоры и шахты
        const corridorsGroup = this.container.querySelector('#corridors-shafts-group');
        if (corridorsGroup) {
            corridorsGroup.innerHTML = this.renderCorridorsAndShafts();
        }

        // Обновляем пелену черного тумана на этажах
        const abyssalGroup = this.container.querySelector('#abyssal-fog-group');
        if (abyssalGroup) {
            abyssalGroup.innerHTML = this.renderAbyssalFloorFog();
        }
    }

    updateButtonsState() {
        const currentRoom = this.dungeon ? this.dungeon.getRoom(this.currentFloor, this.currentRoomIndex) : null;
        const hasUndefeatedMonster = !CheatSystem.flags.ignoreMonsters && currentRoom && currentRoom.hasMonster && currentRoom.monster && !currentRoom.isMonsterDefeated;
        const isOddFloor = (this.currentFloor % 2 === 1);

        const btnLeft = this.container.querySelector('#btn-move-left');
        const btnRight = this.container.querySelector('#btn-move-right');

        const isRightBlocked = this.currentRoomIndex >= 6 || (hasUndefeatedMonster && isOddFloor);
        const isLeftBlocked = this.currentRoomIndex <= 0 || (hasUndefeatedMonster && !isOddFloor);

        if (btnLeft) {
            btnLeft.disabled = (this.isMoving || isLeftBlocked);
            if (hasUndefeatedMonster && !isOddFloor) {
                btnLeft.title = `Путь влево преграждает ${currentRoom.monster.fullName}! Победите его, чтобы пройти.`;
            } else {
                btnLeft.title = 'Идти влево (Клавиша A или стрелка влево)';
            }
        }
        if (btnRight) {
            btnRight.disabled = (this.isMoving || isRightBlocked);
            if (hasUndefeatedMonster && isOddFloor) {
                btnRight.title = `Путь вправо преграждает ${currentRoom.monster.fullName}! Победите его, чтобы пройти.`;
            } else {
                btnRight.title = 'Идти вправо (Клавиша D или стрелка вправо)';
            }
        }

        const stairsGroup = this.container.querySelector('#controls-stairs-group');
        if (stairsGroup) {
            const btnDown = stairsGroup.querySelector('#btn-stairs-down');
            if (btnDown) {
                btnDown.disabled = (this.isMoving || Boolean(hasUndefeatedMonster));
                if (hasUndefeatedMonster) {
                    btnDown.title = `Спуск заблокирован монстром (${currentRoom.monster.fullName})!`;
                }
            }
            const btnUp = stairsGroup.querySelector('#btn-stairs-up');
            if (btnUp) {
                btnUp.disabled = this.isMoving;
            }
        }
    }

    updateHudState() {
        const floorBadge = this.container.querySelector('#dungeon-floor-badge');
        if (floorBadge) {
            floorBadge.innerHTML = `
                <span class="floor-title">ЭТАЖ ${this.currentFloor} / ${this.dungeon.totalFloors}</span>
                <span class="floor-sub">${this.getFloorSubtitle()}</span>
            `;
        }

        const roomStatus = this.container.querySelector('#dungeon-room-status');
        if (roomStatus) {
            roomStatus.innerHTML = this.renderRoomStatusSnippet();
        }

        const stairsGroup = this.container.querySelector('#controls-stairs-group');
        if (stairsGroup) {
            stairsGroup.innerHTML = this.renderStairsButtons();
            this.initStairsButtons();
        }

        const floorSelect = this.container.querySelector('#floor-select');
        if (floorSelect) {
            floorSelect.value = this.currentFloor;
        }
    }

    inspectRoom(floorNum, roomIndex) {
        const room = this.dungeon.getRoom(floorNum, roomIndex);
        if (!room) return;

        const card = this.container.querySelector('#dungeon-room-card');
        if (!card) return;

        const title = card.querySelector('#card-title');
        const desc = card.querySelector('#card-desc');
        const badge = card.querySelector('#card-badge');
        const enemyBox = card.querySelector('#card-enemy');
        const actions = card.querySelector('#card-actions');

        title.textContent = room.name;
        desc.textContent = room.desc;

        const isVisited = this.visitedRooms.has(`${floorNum}_${roomIndex}`);
        const isAdjacent = !isVisited && this.isRoomAdjacent(floorNum, roomIndex);

        if (!isVisited && !isAdjacent) {
            title.textContent = room.isBossRoom ? '☠ Скрыто чёрным туманом (Босс?)' : '☁ Скрыто чёрным туманом';
            desc.textContent = 'Этот сектор окутан густым чёрным туманом войны. Подойдите ближе, чтобы развеять мрак и исследовать залы.';
            badge.textContent = 'Чёрный туман войны';
            badge.className = 'room-card-badge';
            enemyBox.innerHTML = `
                <div class="card-peaceful-box">
                    <span class="peaceful-icon">${Icons.eye(22)}</span>
                    <span class="peaceful-text">Сектор еще не исследован. Сделайте шаг в этом направлении, чтобы развеять мрак.</span>
                </div>
            `;
            enemyBox.style.display = 'block';
            actions.innerHTML = `
                <button class="btn btn-secondary btn-sm" id="btn-card-center">Смотреть сюда</button>
            `;
            actions.querySelector('#btn-card-center').addEventListener('click', () => {
                sound.playSfx('click');
                const c = this.getRoomCoords(floorNum, roomIndex);
                const vp = this.container.querySelector('#dungeon-viewport');
                this.panX = (vp?.clientWidth || 960) / 2 - (c.x + this.ROOM_W / 2) * this.zoom;
                this.panY = (vp?.clientHeight || 510) / 2 - (c.y + this.ROOM_H / 2) * this.zoom;
                this.applyTransform();
            });
            card.classList.remove('hidden');
            this.toggleRoomCard(false);
            return;
        }

        if (room.isFinalVault || room.templateId === 'final_mystery') {
            badge.innerHTML = `${Icons.question(14)} Великая Тайна`;
            badge.className = 'room-card-badge mystery';
        } else if (room.isBossRoom) {
            badge.innerHTML = (room.monster && room.monster.tier === 'final_boss') ? `${Icons.skull(14)} Владыка Бездны` : `${Icons.crown(14)} Босс этажа`;
            badge.className = 'room-card-badge boss';
        } else if (room.hasStairsDown) {
            badge.innerHTML = `${Icons.stairsDown(14)} Спуск вниз`;
            badge.className = 'room-card-badge stairs';
        } else if (room.hasStairsUp) {
            badge.innerHTML = `${Icons.stairsUp(14)} Подъем вверх`;
            badge.className = 'room-card-badge stairs';
        } else {
            badge.textContent = `Сектор ${room.roomIndex + 1}`;
            badge.className = 'room-card-badge';
        }

        // Отрисовка монстра или тайны в карточке осмотра
        if (room.isFinalVault || room.templateId === 'final_mystery') {
            const isPurified = !!this.player.hasViewedAbyssEnding;
            enemyBox.innerHTML = isPurified ? `
                <div class="card-mystery-box purified" style="border-color: #0284c7; background: rgba(14, 165, 233, 0.08);">
                    <div class="mystery-q-glyph" style="color: #38bdf8; border-color: #0284c7;">✦</div>
                    <div class="mystery-q-content">
                        <h5 class="mystery-q-title" style="color: #7dd3fc;">Очищенное Сердце Арканума</h5>
                        <p class="mystery-q-desc">Разлом Бездны запечатан! Древний Источник Титанов излучает спокойный лазурный свет. Катакомбы спасены! Теперь поднимитесь на поверхность и ступайте к Заставе Южного Тракта.</p>
                    </div>
                </div>
            ` : `
                <div class="card-mystery-box">
                    <div class="mystery-q-glyph">?</div>
                    <div class="mystery-q-content">
                        <h5 class="mystery-q-title">Неизведанные глубины</h5>
                        <p class="mystery-q-desc">Пространственный разлом за троном Владыки Бездны. Здесь искажаются законы пространства и времени... Древняя тайна ждет величайшего исследователя катакомб!</p>
                    </div>
                </div>
            `;
            enemyBox.style.display = 'block';
        } else if (room.hasMonster && room.monster) {
            const m = room.monster;
            const elemIcon = Icons.element(m.element, 14);

            const statusHtml = room.isMonsterDefeated
                ? `<span class="enemy-status-defeated">${Icons.check(13)} Повержен</span>`
                : `<span class="enemy-status-active">${Icons.sword(13)} На страже</span>`;

            if (isAdjacent && !room.isMonsterDefeated) {
                enemyBox.innerHTML = `
                    <div class="card-enemy-box tier-regular">
                        <div class="card-enemy-top">
                            <div class="card-enemy-badges">
                                <span class="card-enemy-tier-badge">${Icons.tierDot(m.tier, 10)} Таинственная угроза</span>
                            </div>
                            <span class="enemy-status-active">${Icons.sword(13)} Затаился во мгле</span>
                        </div>
                        <div class="card-enemy-main">
                            <div class="card-enemy-figure" style="display: flex; align-items: center; justify-content: center; background: #05070c; border-radius: 6px; padding: 10px;">
                                <svg viewBox="0 0 60 70" width="80" height="95">
                                    <ellipse cx="30" cy="58" rx="24" ry="7" fill="#000" opacity="0.6"/>
                                    <path d="M16,56 Q10,25 30,12 Q50,25 44,56 Z" fill="#090d16" stroke="#334155" stroke-width="1.5"/>
                                    <circle cx="25" cy="28" r="2.5" fill="#ef4444"/>
                                    <circle cx="35" cy="28" r="2.5" fill="#ef4444"/>
                                </svg>
                            </div>
                            <div class="card-enemy-info">
                                <h5 class="card-enemy-name">Неизвестное существо</h5>
                                <span class="card-enemy-sub">Сквозь клубящийся туман доносится глухое рычание... Войдите в комнату, чтобы сразиться!</span>
                            </div>
                        </div>
                    </div>
                `;
                enemyBox.style.display = 'block';
            } else {
                enemyBox.innerHTML = `
                    <div class="card-enemy-box ${m.tierClass}">
                        <div class="card-enemy-top">
                            <div class="card-enemy-badges">
                                <span class="card-enemy-tier-badge">${Icons.tierDot(m.tier, 10)} ${m.tierBadge}</span>
                                <span class="card-enemy-elem-badge">${elemIcon} ${m.element}</span>
                            </div>
                            ${statusHtml}
                        </div>

                        <div class="card-enemy-main">
                            <div class="card-enemy-figure">
                                ${MobRenderer.render(m, 110, 130, true, 'left')}
                            </div>
                            <div class="card-enemy-info">
                                <h5 class="card-enemy-name">${m.fullName}</h5>
                                <span class="card-enemy-sub">${m.variantTitle}</span>

                                <div class="card-enemy-stats-grid">
                                    <div class="enemy-stat-pill hp">${Icons.heart(13)} HP: <strong>${m.hp}/${m.maxHp}</strong></div>
                                    <div class="enemy-stat-pill dmg">${Icons.sword(13)} DMG: <strong>${m.dmg}</strong></div>
                                    <div class="enemy-stat-pill def">${Icons.shield(13)} DEF: <strong>${m.def}</strong></div>
                                    <div class="enemy-stat-pill spd">${Icons.lightning(13)} SPD: <strong>${m.spd}</strong></div>
                                </div>
                            </div>
                        </div>

                        <div class="card-enemy-ability">
                            <div class="ability-title">${Icons.spark(14)} Способность: ${m.ability.name}</div>
                            <div class="ability-desc">${m.ability.desc}</div>
                        </div>
                    </div>
                `;
                enemyBox.style.display = 'block';
            }
            enemyBox.style.display = 'block';
        } else {
            enemyBox.innerHTML = `
                <div class="card-peaceful-box">
                    <span class="peaceful-icon">${Icons.dove(22)}</span>
                    <span class="peaceful-text">Здесь безопасно. Врагов поблизости нет.</span>
                </div>
            `;
            enemyBox.style.display = 'block';
        }

        let chestHtml = '';
        const isHere = (floorNum === this.currentFloor && roomIndex === this.currentRoomIndex);
        if (room.hasChest) {
            const isOpened = !!room.chestOpened;
            const typeNames = { wooden: 'Деревянный', iron: 'Кованый железный', gilded: 'Позолоченный', ancient: 'Древний реликтовый' };
            const typeName = typeNames[room.chestType] || 'Сундук сокровищ';
            const hasAliveMonster = room.hasMonster && room.monster && !room.isMonsterDefeated;

            if (isOpened) {
                chestHtml = `
                    <div class="card-chest-section opened">
                        <div class="chest-sec-header">
                            <span class="chest-sec-icon">${Icons.chest(20, true, room.chestType)}</span>
                            <strong class="chest-sec-title">${typeName} сундук</strong>
                            <span class="chest-sec-status opened">${Icons.check(12)} Опустошен</span>
                        </div>
                    </div>
                `;
            } else if (hasAliveMonster) {
                chestHtml = `
                    <div class="card-chest-section guarded">
                        <div class="chest-sec-header">
                            <span class="chest-sec-icon">${Icons.chest(20, false, room.chestType)}</span>
                            <strong class="chest-sec-title">${typeName} сундук</strong>
                            <span class="chest-sec-status guarded">${Icons.warning(12)} Под охраной</span>
                        </div>
                        <p class="chest-sec-hint">Охраняется монстром «${room.monster.fullName}». Победите его в бою, чтобы забрать сокровища!</p>
                    </div>
                `;
            } else if (isHere) {
                chestHtml = `
                    <div class="card-chest-section ready">
                        <div class="chest-sec-header">
                            <span class="chest-sec-icon">${Icons.chest(20, false, room.chestType)}</span>
                            <strong class="chest-sec-title">${typeName} сундук</strong>
                            <span class="chest-sec-status ready">${Icons.spark(12)} Доступен</span>
                        </div>
                        <p class="chest-sec-hint">Охрана повержена, замок можно вскрыть!</p>
                        <button class="btn btn-warning btn-sm btn-open-chest" id="btn-card-open-chest">
                            ${Icons.key(14)} Открыть сундук
                        </button>
                    </div>
                `;
            } else {
                chestHtml = `
                    <div class="card-chest-section distant">
                        <div class="chest-sec-header">
                            <span class="chest-sec-icon">${Icons.chest(20, false, room.chestType)}</span>
                            <strong class="chest-sec-title">${typeName} сундук</strong>
                        </div>
                        <p class="chest-sec-hint">Подойдите в этот сектор, чтобы открыть сундук.</p>
                    </div>
                `;
            }
        }

        enemyBox.innerHTML += chestHtml;

        const canAttack = isHere && room.hasMonster && room.monster && !room.isMonsterDefeated;

        actions.innerHTML = `
            <button class="btn btn-secondary btn-sm" id="btn-card-center">Смотреть сюда</button>
            ${canAttack ? `<button class="btn btn-danger btn-sm" id="btn-card-fight">${Icons.sword(14)} Атаковать!</button>` : ''}
        `;

        const btnOpenChest = enemyBox.querySelector('#btn-card-open-chest');
        if (btnOpenChest) {
            btnOpenChest.addEventListener('click', () => {
                this.openRoomChest(floorNum, roomIndex);
            });
        }

        card.querySelector('#btn-card-center').addEventListener('click', () => {
            const { x, y } = this.getRoomCoords(floorNum, roomIndex);
            const vp = this.container.querySelector('#dungeon-viewport');
            this.panX = (vp.clientWidth / 2) - (x + this.ROOM_W / 2) * this.zoom;
            this.panY = (vp.clientHeight / 2) - (y + this.ROOM_H / 2) * this.zoom;
            this.scheduleTransform();
        });

        const btnFight = card.querySelector('#btn-card-fight');
        if (btnFight) {
            btnFight.addEventListener('click', () => {
                sound.playSfx('threat');
                if (this.callbacks.onStartBattle) {
                    this.cleanup();
                    this.callbacks.onStartBattle(room.monster, room, this.getState());
                }
            });
        }

        card.classList.remove('hidden');
        if (room.hasMonster && room.monster && !room.isMonsterDefeated) {
            this.toggleRoomCard(false);
        } else {
            this.toggleRoomCard(this.isRoomCardCollapsed);
        }
    }

    openRoomChest(floorNum, roomIndex) {
        const room = this.dungeon.getRoom(floorNum, roomIndex);
        if (!room || !room.hasChest || room.chestOpened) return;

        // Открываем сундук
        room.chestOpened = true;
        const reward = openDungeonChest(room.chestType || 'wooden', floorNum);

        // Начисляем золото и предметы
        this.player.gold += reward.gold;
        reward.items.forEach(item => {
            this.player.inventory.push(item);
        });

        sound.playSfx('chestOpen');

        // Обновляем отображение узла комнаты в SVG
        const roomNode = this.container.querySelector(`#room-node-${floorNum}-${roomIndex}`);
        if (roomNode) {
            const chestEl = roomNode.querySelector('.room-chest-interactive');
            if (chestEl) {
                chestEl.classList.remove('closed');
                chestEl.classList.add('opened');
                chestEl.innerHTML = Icons.chest(28, true, room.chestType || 'wooden');
                chestEl.setAttribute('title', 'Открытый сундук');
            }
        }

        // Обновляем HUD золота
        const hudGold = this.container.querySelector('#hud-gold');
        if (hudGold) hudGold.textContent = this.player.gold;

        // Показываем окно награды за сундук
        this.showChestRewardModal(reward, room);

        // Обновляем карточку комнаты
        this.inspectRoom(floorNum, roomIndex);
    }

    showChestRewardModal(reward, room) {
        let modal = this.container.querySelector('#dungeon-chest-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'dungeon-chest-modal';
            modal.className = 'dungeon-chest-modal-backdrop';
            this.container.appendChild(modal);
        }

        const typeNames = { wooden: 'Деревянный', iron: 'Кованый железный', gilded: 'Позолоченный', ancient: 'Древний реликтовый' };
        const typeName = typeNames[room.chestType] || 'Сундук сокровищ';

        modal.innerHTML = `
            <div class="chest-modal-dialog anim-pop-in">
                <div class="chest-modal-header">
                    <div class="chest-modal-icon-wrap">
                        ${Icons.chest(46, true, room.chestType || 'wooden')}
                    </div>
                    <h3 class="chest-modal-title">СОКРОВИЩА НАЙДЕНЫ!</h3>
                    <div class="chest-modal-sub">${typeName} ларец открыт</div>
                </div>

                <div class="chest-modal-content">
                    <div class="chest-reward-row gold-reward">
                        <span class="reward-icon">${Icons.coin(20)}</span>
                        <span class="reward-desc">Золотые монеты:</span>
                        <strong class="reward-amount">+${reward.gold} золота</strong>
                    </div>

                    <div class="chest-items-section">
                        <div class="chest-items-title">${Icons.backpack(16)} Найденные предметы (${reward.items.length}):</div>
                        <div class="chest-items-grid">
                            ${reward.items.map(item => `
                                <div class="chest-item-card rarity-${item.rarity || 'common'}">
                                    <div class="chest-item-icon">${item.icon || Icons.spark(24)}</div>
                                    <div class="chest-item-info">
                                        <div class="chest-item-name">${item.name}</div>
                                        <div class="chest-item-desc">${item.desc}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="chest-modal-actions">
                    <button class="btn btn-primary btn-lg" id="btn-close-chest-modal">
                        ${Icons.check(16)} Забрать в вещмешок
                    </button>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
        modal.style.display = 'flex';

        modal.querySelector('#btn-close-chest-modal').addEventListener('click', () => {
            sound.playSfx('selectHero');
            modal.style.display = 'none';
        });
    }

    toggleRoomCard(forceState = null) {
        if (forceState !== null) {
            this.isRoomCardCollapsed = forceState;
        } else {
            this.isRoomCardCollapsed = !this.isRoomCardCollapsed;
        }

        const card = this.container.querySelector('#dungeon-room-card');
        const toggleBtn = this.container.querySelector('#btn-close-card');

        if (card) {
            if (this.isRoomCardCollapsed) {
                card.classList.add('collapsed');
            } else {
                card.classList.remove('collapsed');
            }
        }

        if (toggleBtn) {
            toggleBtn.innerHTML = this.isRoomCardCollapsed ? Icons.chevronUp(16) : Icons.chevronDown(16);
            toggleBtn.setAttribute('title', this.isRoomCardCollapsed ? 'Развернуть карточку' : 'Прикрыть карточку');
        }
    }

    // ==========================================
    // ИНИЦИАЛИЗАЦИЯ СОБЫТИЙ И СЛУШАТЕЛЕЙ
    // ==========================================

    initEvents() {
        const viewport = this.container.querySelector('#dungeon-viewport');

        viewport.addEventListener('pointerdown', (e) => {
            if (e.target.closest('.dungeon-zoom-toolbar') || e.target.closest('.dungeon-room-card')) return;
            this.isDragging = true;
            this.hasMovedDrag = false;
            this.dragStartX = e.clientX - this.panX;
            this.dragStartY = e.clientY - this.panY;
            viewport.style.cursor = 'grabbing';
        });

        window.addEventListener('pointermove', (e) => {
            if (!this.isDragging) return;
            const newPanX = e.clientX - this.dragStartX;
            const newPanY = e.clientY - this.dragStartY;
            if (Math.abs(newPanX - this.panX) > 4 || Math.abs(newPanY - this.panY) > 4) {
                this.hasMovedDrag = true;
            }
            this.panX = newPanX;
            this.panY = newPanY;
            this.scheduleTransform();
        });

        window.addEventListener('pointerup', () => {
            if (this.isDragging) {
                this.isDragging = false;
                viewport.style.cursor = 'grab';
            }
        });

        viewport.addEventListener('wheel', (e) => {
            e.preventDefault();
            const rect = viewport.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const factor = e.deltaY < 0 ? 1.15 : 0.87;
            this.zoomAtPoint(mouseX, mouseY, factor);
        }, { passive: false });

        this.container.querySelector('#btn-focus-hero').addEventListener('click', () => {
            sound.playSfx('click');
            this.focusOnHero();
        });

        this.container.querySelector('#btn-focus-floor').addEventListener('click', () => {
            sound.playSfx('click');
            this.focusOnFloor();
        });

        this.container.querySelector('#btn-focus-all').addEventListener('click', () => {
            sound.playSfx('click');
            this.focusOnAll();
        });

        this.container.querySelector('#btn-zoom-in').addEventListener('click', () => {
            sound.playSfx('click');
            this.zoomBy(1.25);
        });

        this.container.querySelector('#btn-zoom-out').addEventListener('click', () => {
            sound.playSfx('click');
            this.zoomBy(0.8);
        });

        this.container.querySelector('#floor-select').addEventListener('change', (e) => {
            sound.playSfx('click');
            const targetFloor = parseInt(e.target.value, 10);
            this.focusOnFloor(targetFloor);
        });

        this.container.querySelector('#btn-move-left').addEventListener('click', () => this.moveLeft());
        this.container.querySelector('#btn-move-right').addEventListener('click', () => this.moveRight());

        this.initStairsButtons();

        const btnToggleCard = this.container.querySelector('#btn-close-card');
        if (btnToggleCard) {
            btnToggleCard.addEventListener('click', (e) => {
                e.stopPropagation();
                sound.playSfx('click');
                this.toggleRoomCard();
            });
        }

        const cardHeader = this.container.querySelector('#room-card-header-bar');
        if (cardHeader) {
            cardHeader.addEventListener('click', (e) => {
                if (this.isRoomCardCollapsed && !e.target.closest('#btn-close-card')) {
                    sound.playSfx('click');
                    this.toggleRoomCard(false);
                }
            });
        }

        this.container.querySelector('#btn-dungeon-menu').addEventListener('click', () => {
            sound.playSfx('tab');
            if (this.callbacks.onOpenMenu) {
                this.callbacks.onOpenMenu(this.getState());
            }
        });

        this.container.querySelector('#btn-dungeon-exit').addEventListener('click', async () => {
            const isAtEntrance = (this.currentFloor === 1 && this.currentRoomIndex === 0);
            if (isAtEntrance) {
                this.ascendStairs();
            } else {
                const conf = await GameDialog.confirm({
                    title: 'Выход на поверхность',
                    message: 'Вернуться в город? Весь открытый прогресс подземелья сохранится!',
                    icon: 'door',
                    confirmText: 'Выйти в город',
                    cancelText: 'Остаться в катакомбах',
                    confirmVariant: 'primary'
                });
                if (conf && this.callbacks.onExitToTown) {
                    sound.playSfx('selectHero');
                    this.cleanup();
                    this.callbacks.onExitToTown(this.getState());
                }
            }
        });

        this.initRoomNodeClicks();
        this.setupKeyboard();
        this.startBuffTicker();
        this.initParticles();

        if (this.player.hasViewedAbyssEnding && !this.hasShownAbyssReturnToast && this.currentFloor === 30) {
            this.hasShownAbyssReturnToast = true;
            setTimeout(() => {
                this.showToast(`${Icons.spark(14)} Катакомбы очищены от Тьмы! Поднимитесь на поверхность и ступайте к Заставе Южного Тракта.`);
            }, 600);
        }
    }

    initParticles() {
        const canvas = this.container ? this.container.querySelector('#dungeon-particles-canvas') : null;
        if (canvas) {
            if (this.fogParticles) {
                this.fogParticles.stop();
            }
            this.fogParticles = new DungeonFogParticles(canvas, this);
            this.fogParticles.start();
        }
    }

    renderTavernBuffHudBadge() {
        if (!this.player || !this.player.tavernBuff) return '';
        const sec = this.player.getTavernBuffRemainingSeconds();
        if (sec <= 0) return '';
        return `
            <span class="hud-buff-pill" title="${this.player.tavernBuff.name}: ${this.player.tavernBuff.desc || ''}" style="display: inline-flex; align-items: center; gap: 4px; background: rgba(180, 83, 9, 0.25); border: 1px solid #f59e0b; padding: 2px 8px; border-radius: 12px; font-size: 0.76rem; color: #fde047; margin-left: 8px;">
                ${Icons.ale(13)} ${this.player.tavernBuff.name} <strong>${this.player.getTavernBuffFormattedTime()}</strong>
            </span>
        `;
    }

    startBuffTicker() {
        if (this.buffTickerInterval) clearInterval(this.buffTickerInterval);
        this.buffTickerInterval = setInterval(() => {
            const badge = this.container?.querySelector('#dungeon-tavern-buff-badge');
            if (badge) {
                badge.innerHTML = this.renderTavernBuffHudBadge();
            }
        }, 1000);
    }

    initStairsButtons() {
        const btnDown = this.container.querySelector('#btn-stairs-down');
        if (btnDown) {
            btnDown.addEventListener('click', () => this.descendStairs());
        }

        const btnUp = this.container.querySelector('#btn-stairs-up');
        if (btnUp) {
            btnUp.addEventListener('click', () => this.ascendStairs());
        }
    }

    initRoomNodeClicks() {
        const viewport = this.container.querySelector('#dungeon-viewport');
        if (!viewport) return;
        viewport.addEventListener('click', (e) => {
            if (this.hasMovedDrag) return;
            const node = e.target.closest('.dungeon-room-node');
            if (!node) return;
            const f = parseInt(node.getAttribute('data-floor'), 10);
            const r = parseInt(node.getAttribute('data-room'), 10);
            this.inspectRoom(f, r);

            const chestTarget = e.target.closest('.room-chest-interactive');
            if (chestTarget) {
                const room = this.dungeon.getRoom(f, r);
                if (room && room.hasChest && !room.chestOpened && f === this.currentFloor && r === this.currentRoomIndex && (!room.hasMonster || room.isMonsterDefeated)) {
                    this.openRoomChest(f, r);
                }
            }
        });
    }

    setupKeyboard() {
        this.boundKeyHandler = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

            if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
                this.moveLeft();
            } else if (e.code === 'KeyD' || e.code === 'ArrowRight') {
                this.moveRight();
            } else if (e.code === 'KeyS' || e.code === 'ArrowDown') {
                this.descendStairs();
            } else if (e.code === 'KeyW' || e.code === 'ArrowUp') {
                this.ascendStairs();
            } else if (e.code === 'KeyI') {
                if (this.callbacks.onOpenMenu) {
                    this.callbacks.onOpenMenu(this.getState());
                }
            }
        };

        window.addEventListener('keydown', this.boundKeyHandler);
    }

    cleanup() {
        if (this.fogParticles) {
            this.fogParticles.stop();
            this.fogParticles = null;
        }
        if (this.buffTickerInterval) {
            clearInterval(this.buffTickerInterval);
            this.buffTickerInterval = null;
        }
        if (this.boundKeyHandler) {
            window.removeEventListener('keydown', this.boundKeyHandler);
            this.boundKeyHandler = null;
        }
        if (this.transformRaf) {
            cancelAnimationFrame(this.transformRaf);
            this.transformRaf = null;
        }
    }
}
