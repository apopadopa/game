import { sound } from '../audio/audioEngine.js';
import { dungeonTheme } from '../audio/music/dungeonTheme.js';
import { DungeonGenerator } from '../dungeon/dungeonGenerator.js';
import { DungeonMobSpawner } from '../dungeon/dungeonMobSpawner.js';
import { Icons } from '../visuals/icons.js';
import { CharacterRenderer } from '../visuals/characterRenderer.js';
import { MobRenderer } from '../visuals/mobRenderer.js';

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
            badge = `<span class="badge-mystery">${Icons.question(12)} ТАЙНА</span>`;
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

        // 2. ВЕРТИКАЛЬНЫЕ И ГОРИЗОНТАЛЬНЫЕ ШАХТЫ И ПЕРЕХОДЫ
        svg += this.renderCorridorsAndShafts();

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

        return svg;
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

                svg += `
                    <rect x="${corridorX}" y="${corridorY}" width="${this.GAP_X}" height="40" fill="#181a24" stroke="#334155" stroke-width="2"/>
                    <line x1="${corridorX}" y1="${corridorY}" x2="${corridorX + this.GAP_X}" y2="${corridorY}" stroke="#475569" stroke-width="2"/>
                    <line x1="${corridorX}" y1="${corridorY + 40}" x2="${corridorX + this.GAP_X}" y2="${corridorY + 40}" stroke="#475569" stroke-width="2"/>
                    <line x1="${corridorX + this.GAP_X / 2}" y1="${corridorY}" x2="${corridorX + this.GAP_X / 2}" y2="${corridorY + 40}" stroke="#272b3b" stroke-width="1.5"/>
                `;
            }

            // Вертикальная шахта лестницы вниз на следующий этаж
            if (f < this.dungeon.totalFloors) {
                const ladderRoomIdx = floor.endRoomIdx;
                const cRoom = this.getRoomCoords(f, ladderRoomIdx);
                const shaftX = cRoom.x + this.ROOM_W / 2 - 22;
                const shaftY = cRoom.y + this.ROOM_H;
                const shaftW = 44;
                const shaftH = this.GAP_Y;

                svg += `
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
                `;
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
        const isVisited = this.visitedRooms.has(`${room.floorNum}_${room.roomIndex}`);
        const isBoss = room.isBossRoom;

        let strokeColor = isBoss ? '#ef4444' : '#334155';
        let strokeWidth = isBoss ? '3' : '2';

        if (isCurrent) {
            strokeColor = '#38bdf8';
            strokeWidth = '3.5';
        }

        const roomOpacity = isVisited ? '1' : '0.65';
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
                // Основание моба на линии пола y = ROOM_H - 14 (116)
                const my = (this.ROOM_H - 14) - Math.round(mh * (208 / 240));

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
                        ${MobRenderer.render(m, mw, mh)}
                    </g>
                `;
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

        return `
            <g class="dungeon-room-node ${isCurrent ? 'current-room' : ''}" 
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

    moveLeft() {
        if (this.isMoving) return;
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

        this.updateHudState();
        this.updateButtonsState();
    }

    updateButtonsState() {
        const btnLeft = this.container.querySelector('#btn-move-left');
        const btnRight = this.container.querySelector('#btn-move-right');
        if (btnLeft) btnLeft.disabled = (this.isMoving || this.currentRoomIndex <= 0);
        if (btnRight) btnRight.disabled = (this.isMoving || this.currentRoomIndex >= 6);

        const stairsGroup = this.container.querySelector('#controls-stairs-group');
        if (stairsGroup) {
            const stairsBtns = stairsGroup.querySelectorAll('button');
            stairsBtns.forEach(b => { b.disabled = this.isMoving; });
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
            enemyBox.innerHTML = `
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
                            ${MobRenderer.render(m, 110, 130, true)}
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
        } else {
            enemyBox.innerHTML = `
                <div class="card-peaceful-box">
                    <span class="peaceful-icon">${Icons.dove(22)}</span>
                    <span class="peaceful-text">Здесь безопасно. Врагов поблизости нет.</span>
                </div>
            `;
            enemyBox.style.display = 'block';
        }

        const isHere = (floorNum === this.currentFloor && roomIndex === this.currentRoomIndex);
        const canAttack = isHere && room.hasMonster && room.monster && !room.isMonsterDefeated;

        actions.innerHTML = `
            <button class="btn btn-secondary btn-sm" id="btn-card-center">Смотреть сюда</button>
            ${canAttack ? `<button class="btn btn-danger btn-sm" id="btn-card-fight">${Icons.sword(14)} Атаковать!</button>` : ''}
        `;

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

        this.container.querySelector('#btn-dungeon-exit').addEventListener('click', () => {
            const isAtEntrance = (this.currentFloor === 1 && this.currentRoomIndex === 0);
            if (isAtEntrance) {
                this.ascendStairs();
            } else {
                const conf = confirm('Вернуться на поверхность в город? Весь открытый прогресс подземелья сохранится!');
                if (conf && this.callbacks.onExitToTown) {
                    sound.playSfx('selectHero');
                    this.cleanup();
                    this.callbacks.onExitToTown(this.getState());
                }
            }
        });

        this.initRoomNodeClicks();
        this.setupKeyboard();
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
        const nodes = this.container.querySelectorAll('.dungeon-room-node');
        nodes.forEach(node => {
            node.addEventListener('click', () => {
                if (this.hasMovedDrag) return;
                const f = parseInt(node.getAttribute('data-floor'), 10);
                const r = parseInt(node.getAttribute('data-room'), 10);
                this.inspectRoom(f, r);
            });
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
