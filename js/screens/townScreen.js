import { sound } from '../audio/audioEngine.js';
import { CharacterRenderer } from '../visuals/characterRenderer.js';
import { Icons } from '../visuals/icons.js';
import { ShopScreen } from './townLocations/shopScreen.js';
import { TavernScreen } from './townLocations/tavernScreen.js';
import { BlacksmithScreen } from './townLocations/blacksmithScreen.js';
import { TempleScreen } from './townLocations/templeScreen.js';
import { SouthRoadScreen } from './townLocations/southRoadScreen.js';
import { QuestSystem } from '../services/questSystem.js';

export class TownScreen {
    constructor(player, callbacks) {
        this.player = player;
        this.callbacks = callbacks;
        this.tickerInterval = null;
    }

    render(container) {
        this.container = container;
        const activeQuestsCount = QuestSystem.getActiveQuestsList(this.player).length;

        const getBuildingQuestMarker = (buildingId, x, y) => {
            const status = QuestSystem.hasQuestsForBuilding(this.player, buildingId);
            if (status.hasTurnIn) {
                return `
                    <g transform="translate(${x}, ${y})" pointer-events="none">
                        <g class="map-quest-badge anim-bounce-glow">
                            <circle cx="0" cy="0" r="14" fill="#f59e0b" stroke="#ffffff" stroke-width="2.5" filter="url(#buildingHoverGlow)"/>
                            <text x="0" y="5.5" text-anchor="middle" fill="#0f172a" font-size="16" font-weight="900" font-family="system-ui, sans-serif">?</text>
                        </g>
                    </g>
                `;
            } else if (status.hasAvailable) {
                return `
                    <g transform="translate(${x}, ${y})" pointer-events="none">
                        <g class="map-quest-badge anim-bounce-glow">
                            <circle cx="0" cy="0" r="14" fill="#38bdf8" stroke="#ffffff" stroke-width="2.5" filter="url(#buildingHoverGlow)"/>
                            <text x="0" y="5.5" text-anchor="middle" fill="#0f172a" font-size="16" font-weight="900" font-family="system-ui, sans-serif">!</text>
                        </g>
                    </g>
                `;
            }
            return '';
        };

        container.innerHTML = `
            <div class="town-container">
                <!-- ВЕРХНИЙ HUD ГОРОДА -->
                <div class="town-hud">
                    <div class="hud-character-info">
                        <div class="hud-avatar-frame" id="hud-avatar-frame">
                            ${CharacterRenderer.renderBust(this.player.visuals, this.player.classId, this.player.equipment)}
                        </div>
                        <div class="hud-meta">
                            <div class="hud-name">${this.player.name} <span class="hud-class">(${this.player.className})</span></div>
                            <div class="hud-bars">
                                <div class="hud-bar-wrap">
                                    <div class="hud-bar-fill hp" id="hud-hp-fill" style="width: ${(this.player.currentHp / this.player.maxHp) * 100}%"></div>
                                    <span class="hud-bar-text" id="hud-hp-text">${this.player.currentHp}/${this.player.maxHp} HP</span>
                                </div>
                                <div class="hud-bar-wrap">
                                    <div class="hud-bar-fill mp" id="hud-mp-fill" style="width: ${(this.player.currentMp / this.player.maxMp) * 100}%"></div>
                                    <span class="hud-bar-text" id="hud-mp-text">${this.player.currentMp}/${this.player.maxMp} MP</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="hud-stats-summary">
                        <span>${Icons.sword(14)} Урон: <strong>${this.player.physicalDamage}</strong></span>
                        <span>${Icons.shield(14)} Защита: <strong>${this.player.defense}</strong></span>
                        <span id="hud-tavern-buff-badge">${this.renderTavernBuffHudBadge()}</span>
                    </div>

                    <div class="hud-resources">
                        <div class="hud-gold">${Icons.coin(16)} <span id="hud-gold-val">${this.player.gold}</span></div>
                        <button class="btn-town-menu" id="btn-town-journal" title="Дневник поручений (J)">
                            ${Icons.scroll(13)} Задания ${activeQuestsCount > 0 ? `<span class="badge-tab-count">${activeQuestsCount}</span>` : ''}
                        </button>
                        <button class="btn-town-menu" id="btn-town-menu" title="Открыть инвентарь и меню (I / Esc)">
                            ${Icons.backpack(13)} Меню
                        </button>
                    </div>
                </div>

                <!-- КАРТА ГОРОДА (ИЗОМЕТРИЧЕСКАЯ ТОПОЛОГИЯ 960x560) -->
                <div class="town-map-viewport">
                    <svg viewBox="0 0 960 560" class="town-map-svg">
                        <defs>
                            <!-- Градиенты и освещение -->
                            <radialGradient id="fountainGrad" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stop-color="#bae6fd"/>
                                <stop offset="45%" stop-color="#0284c7"/>
                                <stop offset="100%" stop-color="#075985"/>
                            </radialGradient>

                            <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stop-color="#fef08a" stop-opacity="0.95"/>
                                <stop offset="35%" stop-color="#f59e0b" stop-opacity="0.45"/>
                                <stop offset="70%" stop-color="#d97706" stop-opacity="0.15"/>
                                <stop offset="100%" stop-color="#d97706" stop-opacity="0"/>
                            </radialGradient>

                            <radialGradient id="dungeonPortalGlow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stop-color="#ef4444" stop-opacity="0.9"/>
                                <stop offset="40%" stop-color="#991b1b" stop-opacity="0.6"/>
                                <stop offset="75%" stop-color="#450a0a" stop-opacity="0.9"/>
                                <stop offset="100%" stop-color="#090505" stop-opacity="1"/>
                            </radialGradient>

                            <radialGradient id="forgeHeatGlow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stop-color="#fef08a" stop-opacity="0.95"/>
                                <stop offset="30%" stop-color="#f97316" stop-opacity="0.75"/>
                                <stop offset="65%" stop-color="#ea580c" stop-opacity="0.3"/>
                                <stop offset="100%" stop-color="#c2410c" stop-opacity="0"/>
                            </radialGradient>

                            <radialGradient id="templeHolyGlow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stop-color="#fef08a" stop-opacity="0.85"/>
                                <stop offset="35%" stop-color="#38bdf8" stop-opacity="0.5"/>
                                <stop offset="75%" stop-color="#0284c7" stop-opacity="0.15"/>
                                <stop offset="100%" stop-color="#0284c7" stop-opacity="0"/>
                            </radialGradient>

                            <radialGradient id="plazaCobbleGrad" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stop-color="#404452"/>
                                <stop offset="60%" stop-color="#2c2f3b"/>
                                <stop offset="100%" stop-color="#1f212a"/>
                            </radialGradient>

                            <!-- Текстура мощеной брусчатки -->
                            <pattern id="cityCobblestone" width="24" height="24" patternUnits="userSpaceOnUse">
                                <rect width="24" height="24" fill="#2d303c"/>
                                <rect x="1" y="1" width="10" height="10" rx="1.5" fill="#393c4a" stroke="#22242e" stroke-width="0.8"/>
                                <rect x="13" y="1" width="10" height="10" rx="1.5" fill="#343745" stroke="#22242e" stroke-width="0.8"/>
                                <rect x="1" y="13" width="10" height="10" rx="1.5" fill="#363947" stroke="#22242e" stroke-width="0.8"/>
                                <rect x="13" y="13" width="10" height="10" rx="1.5" fill="#3c404f" stroke="#22242e" stroke-width="0.8"/>
                            </pattern>

                            <!-- Текстура городской травы -->
                            <pattern id="cityGrass" width="50" height="50" patternUnits="userSpaceOnUse">
                                <rect width="50" height="50" fill="#142116"/>
                                <circle cx="12" cy="12" r="6" fill="#1b2e1e" opacity="0.6"/>
                                <circle cx="38" cy="35" r="8" fill="#18291b" opacity="0.65"/>
                                <path d="M10 22 L12 18 L14 22" stroke="#224025" stroke-width="1.2" fill="none"/>
                                <path d="M35 12 L37 8 L39 12" stroke="#224025" stroke-width="1.2" fill="none"/>
                            </pattern>

                            <!-- Фильтры наведения -->
                            <filter id="buildingHoverGlow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#f59e0b" flood-opacity="0.6"/>
                            </filter>
                        </defs>

                        <!-- =========================================================
                             1. ЛАНДШАФТ И КРЕПОСТНЫЕ СТЕНЫ ГОРОДА
                             ========================================================= -->
                        <!-- Травяной грунт -->
                        <rect width="960" height="560" fill="url(#cityGrass)"/>

                        <!-- Северная крепостная стена (позади цитадели и башен) -->
                        <rect x="0" y="0" width="370" height="26" fill="#20222b" stroke="#121319" stroke-width="2"/>
                        <rect x="590" y="0" width="370" height="26" fill="#20222b" stroke="#121319" stroke-width="2"/>
                        <!-- Мерлоны (зубцы) северной стены -->
                        <path d="M0,0 H370 M0,9 H370" stroke="#333745" stroke-width="1.5"/>
                        <path d="M590,0 H960 M590,9 H960" stroke="#333745" stroke-width="1.5"/>

                        <!-- Западная и Восточная стены -->
                        <rect x="0" y="26" width="22" height="534" fill="#20222b" stroke="#121319" stroke-width="2"/>
                        <rect x="938" y="26" width="22" height="534" fill="#20222b" stroke="#121319" stroke-width="2"/>
                        <!-- Зубцы на боковых стенах -->
                        <line x1="11" y1="26" x2="11" y2="560" stroke="#333745" stroke-width="2" stroke-dasharray="14 10"/>
                        <line x1="949" y1="26" x2="949" y2="560" stroke="#333745" stroke-width="2" stroke-dasharray="14 10"/>

                        <!-- Южная стена (слева и справа от Южных ворот) -->
                        <rect x="0" y="536" width="410" height="24" fill="#20222b" stroke="#121319" stroke-width="2"/>
                        <rect x="550" y="536" width="410" height="24" fill="#20222b" stroke="#121319" stroke-width="2"/>
                        <path d="M0,536 H410 M0,545 H410" stroke="#333745" stroke-width="1.5"/>
                        <path d="M550,536 H960 M550,545 H960" stroke="#333745" stroke-width="1.5"/>

                        <!-- =========================================================
                             2. СЕТЬ МОЩЕНЫХ УЛИЦ И МАГИСТРАЛЕЙ ГОРОДА
                             ========================================================= -->
                        <!-- Главная магистраль: от Южных ворот через площадь к Катакомбам -->
                        <path d="M425,540 L435,360 Q440,300 440,280 L520,280 Q520,300 525,360 L535,540 Z" fill="url(#cityCobblestone)" stroke="#1a1c24" stroke-width="2"/>
                        <path d="M430,280 L430,130 Q450,110 480,110 Q510,110 530,130 L530,280 Z" fill="url(#cityCobblestone)" stroke="#1a1c24" stroke-width="2"/>

                        <!-- Диагональные улицы к 4 районам -->
                        <!-- Дорога к Таверне (Северо-Запад) -->
                        <path d="M220,185 L420,265 L405,305 L205,225 Z" fill="url(#cityCobblestone)" stroke="#1a1c24" stroke-width="2"/>
                        <!-- Дорога к Кузнице (Северо-Восток) -->
                        <path d="M740,185 L540,265 L555,305 L755,225 Z" fill="url(#cityCobblestone)" stroke="#1a1c24" stroke-width="2"/>
                        <!-- Дорога к Лавке (Юго-Запад) -->
                        <path d="M215,410 L410,310 L425,350 L230,450 Z" fill="url(#cityCobblestone)" stroke="#1a1c24" stroke-width="2"/>
                        <!-- Дорога к Храму (Юго-Восток) -->
                        <path d="M745,410 L550,310 L535,350 L730,450 Z" fill="url(#cityCobblestone)" stroke="#1a1c24" stroke-width="2"/>

                        <!-- =========================================================
                             3. ЦЕНТРАЛЬНАЯ ПЛОЩАДЬ С ТРЕХЪЯРУСНЫМ ФОНТАНОМ
                             ========================================================= -->
                        <g id="central-city-plaza" pointer-events="none">
                            <!-- Брусчатый мозаичный круг площади -->
                            <circle cx="480" cy="290" r="105" fill="url(#plazaCobbleGrad)" stroke="#181a22" stroke-width="5"/>
                            <circle cx="480" cy="290" r="97" fill="none" stroke="#474b5c" stroke-width="2" stroke-dasharray="10 8"/>
                            <circle cx="480" cy="290" r="82" fill="#252733" stroke="#1a1b24" stroke-width="2"/>

                            <!-- Восьмиконечная мозаичная звезда-роза ветров -->
                            <polygon points="480,215 488,282 555,290 488,298 480,365 472,298 405,290 472,282" fill="#383b4c" stroke="#161720" stroke-width="1.5"/>
                            <polygon points="480,230 486,284 540,290 486,296 480,350 474,296 420,290 474,284" fill="#caa438" opacity="0.6"/>

                            <!-- Мраморный трехъярусный фонтан -->
                            <!-- Нижняя чаша -->
                            <circle cx="480" cy="290" r="46" fill="#334155" stroke="#1e293b" stroke-width="3"/>
                            <circle cx="480" cy="290" r="41" fill="url(#fountainGrad)"/>
                            <!-- Водная рябь анимации -->
                            <ellipse cx="480" cy="290" rx="34" ry="24" fill="none" stroke="#e0f2fe" stroke-width="1.5" class="fountain-ripple-anim ripple-1"/>
                            <ellipse cx="480" cy="290" rx="22" ry="15" fill="none" stroke="#bae6fd" stroke-width="1.2" class="fountain-ripple-anim ripple-2"/>
                            <!-- Второй ярус чаши -->
                            <circle cx="480" cy="290" r="17" fill="#475569" stroke="#1e293b" stroke-width="2"/>
                            <circle cx="480" cy="290" r="13" fill="#38bdf8"/>
                            <!-- Центральная мраморная статуя с золотым венцом -->
                            <circle cx="480" cy="290" r="6" fill="#f8fafc" stroke="#0284c7" stroke-width="1.5"/>
                            <circle cx="480" cy="290" r="2.5" fill="#facc15"/>
                            <!-- Бьющие анимированные струи воды -->
                            <g class="fountain-jets-group">
                                <path d="M480,288 Q472,268 466,276" stroke="#f0f9ff" stroke-width="1.8" fill="none" stroke-linecap="round" class="fountain-spray spray-left"/>
                                <path d="M480,288 Q488,268 494,276" stroke="#f0f9ff" stroke-width="1.8" fill="none" stroke-linecap="round" class="fountain-spray spray-right"/>
                                <line x1="480" y1="288" x2="480" y2="262" stroke="#ffffff" stroke-width="2" stroke-linecap="round" class="fountain-spray spray-center"/>
                            </g>

                            <!-- Уличные фонари по 4 сторонам площади -->
                            <g transform="translate(390, 210)">
                                <circle cx="0" cy="0" r="45" fill="url(#lampGlow)" class="lantern-glow-pulse glow-1"/>
                                <circle cx="0" cy="0" r="5" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
                                <rect x="-2" y="5" width="4" height="12" fill="#1c1917" rx="1"/>
                            </g>
                            <g transform="translate(570, 210)">
                                <circle cx="0" cy="0" r="45" fill="url(#lampGlow)" class="lantern-glow-pulse glow-2"/>
                                <circle cx="0" cy="0" r="5" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
                                <rect x="-2" y="5" width="4" height="12" fill="#1c1917" rx="1"/>
                            </g>
                            <g transform="translate(390, 370)">
                                <circle cx="0" cy="0" r="45" fill="url(#lampGlow)" class="lantern-glow-pulse glow-3"/>
                                <circle cx="0" cy="0" r="5" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
                                <rect x="-2" y="5" width="4" height="12" fill="#1c1917" rx="1"/>
                            </g>
                            <g transform="translate(570, 370)">
                                <circle cx="0" cy="0" r="45" fill="url(#lampGlow)" class="lantern-glow-pulse glow-4"/>
                                <circle cx="0" cy="0" r="5" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
                                <rect x="-2" y="5" width="4" height="12" fill="#1c1917" rx="1"/>
                            </g>
                        </g>

                        <!-- =========================================================
                             4. ДЕКОРАТИВНЫЕ ЖИЛЫЕ ДОМА И СРЕДНЕВЕКОВАЯ ЗАСТРОЙКА
                             ========================================================= -->
                        <g id="town-ambient-buildings" pointer-events="none" opacity="0.95">
                            <!-- Северо-западная жилая застройка (за таверной) -->
                            <g transform="translate(26, 40)">
                                <!-- Пекарня с дымоходом -->
                                <rect x="0" y="25" width="75" height="50" fill="#3b2b20" stroke="#1c140d" stroke-width="2"/>
                                <rect x="0" y="10" width="78" height="30" fill="#fef3c7" stroke="#451a03" stroke-width="1.5"/>
                                <line x1="26" y1="10" x2="26" y2="40" stroke="#78350f" stroke-width="2"/>
                                <line x1="52" y1="10" x2="52" y2="40" stroke="#78350f" stroke-width="2"/>
                                <polygon points="-4,10 39,-15 82,10" fill="#991b1b" stroke="#450a0a" stroke-width="2"/>
                                <rect x="62" y="-12" width="10" height="20" fill="#292524"/>
                                <rect x="30" y="16" width="16" height="15" rx="2" fill="#fef08a" stroke="#ca8a04" stroke-width="1"/>
                            </g>
                            <g transform="translate(108, 35)">
                                <!-- Особняк с синей крышей -->
                                <rect x="0" y="20" width="80" height="60" fill="#27272a" stroke="#18181b" stroke-width="2"/>
                                <polygon points="-5,20 40,-12 85,20" fill="#1e3a8a" stroke="#172554" stroke-width="2"/>
                                <rect x="15" y="32" width="18" height="16" rx="2" fill="#fed7aa" stroke="#c2410c" stroke-width="1"/>
                                <rect x="47" y="32" width="18" height="16" rx="2" fill="#fed7aa" stroke="#c2410c" stroke-width="1"/>
                            </g>

                            <!-- Северо-восточная жилая застройка (за кузницей) -->
                            <g transform="translate(775, 35)">
                                <!-- Литейный склад -->
                                <rect x="0" y="20" width="75" height="60" fill="#292524" stroke="#1c1917" stroke-width="2"/>
                                <polygon points="-4,20 37,-10 79,20" fill="#44403c" stroke="#1c1917" stroke-width="2"/>
                                <rect x="25" y="30" width="22" height="16" rx="2" fill="#fdba74" stroke="#ea580c" stroke-width="1"/>
                            </g>
                            <g transform="translate(858, 40)">
                                <!-- Мастерская кожевенника -->
                                <rect x="0" y="22" width="75" height="52" fill="#3f3f46" stroke="#18181b" stroke-width="2"/>
                                <polygon points="-4,22 37,-8 79,22" fill="#78350f" stroke="#451a03" stroke-width="2"/>
                                <rect x="16" y="32" width="16" height="15" rx="2" fill="#fef08a" stroke="#ca8a04" stroke-width="1"/>
                                <rect x="44" y="32" width="16" height="15" rx="2" fill="#fef08a" stroke="#ca8a04" stroke-width="1"/>
                            </g>

                            <!-- Дома у западной стены -->
                            <g transform="translate(26, 270)">
                                <rect x="0" y="18" width="68" height="55" fill="#334155" stroke="#0f172a" stroke-width="2"/>
                                <polygon points="-4,18 34,-8 72,18" fill="#475569" stroke="#1e293b" stroke-width="2"/>
                                <rect x="16" y="26" width="16" height="15" rx="2" fill="#fef08a" stroke="#ca8a04" stroke-width="1"/>
                            </g>

                            <!-- Дома у восточной стены -->
                            <g transform="translate(865, 270)">
                                <rect x="0" y="18" width="68" height="55" fill="#27272a" stroke="#18181b" stroke-width="2"/>
                                <polygon points="-4,18 34,-8 72,18" fill="#1e3a8a" stroke="#172554" stroke-width="2"/>
                                <rect x="36" y="26" width="16" height="15" rx="2" fill="#fef08a" stroke="#ca8a04" stroke-width="1"/>
                            </g>

                            <!-- Юго-западные и юго-восточные склады -->
                            <g transform="translate(26, 475)">
                                <rect x="0" y="15" width="75" height="48" fill="#334155" stroke="#0f172a" stroke-width="2"/>
                                <polygon points="-4,15 37,-8 79,15" fill="#3b2b20" stroke="#1c140d" stroke-width="2"/>
                                <rect x="20" y="24" width="15" height="14" rx="2" fill="#fef08a" stroke="#ca8a04" stroke-width="1"/>
                            </g>
                            <g transform="translate(855, 475)">
                                <rect x="0" y="15" width="75" height="48" fill="#1e2029" stroke="#0f1017" stroke-width="2"/>
                                <polygon points="-4,15 37,-8 79,15" fill="#78350f" stroke="#451a03" stroke-width="2"/>
                                <rect x="40" y="24" width="15" height="14" rx="2" fill="#fef08a" stroke="#ca8a04" stroke-width="1"/>
                            </g>

                            <!-- Деревья города -->
                            <circle cx="65" cy="180" r="22" fill="#163819" stroke="#0e2410" stroke-width="2"/>
                            <circle cx="62" cy="176" r="15" fill="#1e4d23"/>
                            <circle cx="895" cy="180" r="22" fill="#163819" stroke="#0e2410" stroke-width="2"/>
                            <circle cx="892" cy="176" r="15" fill="#1e4d23"/>
                            <circle cx="65" cy="380" r="24" fill="#163819" stroke="#0e2410" stroke-width="2"/>
                            <circle cx="895" cy="380" r="24" fill="#163819" stroke="#0e2410" stroke-width="2"/>
                        </g>

                        <!-- =========================================================
                             5. ИНТЕРАКТИВНЫЕ ЗДАНИЯ ГОРОДА (ВЕРНЫЕ ПРОПОРЦИИ И СВЕТ)
                             ========================================================= -->

                        <!-- ЗДАНИЕ 1: ВРАТА КАТАКОМБ (СЕВЕР, ЦЕНТР) -->
                        <g class="town-building" id="building-gate" style="cursor: pointer;">
                            <!-- Тень бастиона -->
                            <rect x="350" y="25" width="260" height="115" rx="10" fill="#05070a" opacity="0.6"/>

                            <!-- Главный гранитный корпус цитадели -->
                            <rect x="360" y="12" width="240" height="120" rx="6" fill="#181924" stroke="#090a10" stroke-width="2.5" class="building-roof"/>
                            <!-- Рустовка блоков -->
                            <path d="M360,35 H600 M360,60 H600 M360,85 H600 M360,110 H600" stroke="#252838" stroke-width="1.2" stroke-dasharray="14 18"/>

                            <!-- Зубцы на кровле бастиона -->
                            <path d="M395,12 V4 H415 V12 H435 V4 H455 V12 H505 V4 H525 V12 H545 V4 H565 V12" fill="#26293a" stroke="#0f1017" stroke-width="1.5"/>

                            <!-- Левая сторожевая башня цитадели -->
                            <rect x="346" y="6" width="46" height="130" rx="3" fill="#20222f" stroke="#090a10" stroke-width="2"/>
                            <polygon points="342,6 369,-12 396,6" fill="#7f1d1d" stroke="#450a0a" stroke-width="1.5"/>
                            <rect x="365" y="28" width="8" height="18" rx="4" fill="#450a0a" stroke="#dc2626" stroke-width="0.8"/>
                            <rect x="365" y="62" width="8" height="18" rx="4" fill="#450a0a" stroke="#dc2626" stroke-width="0.8"/>

                            <!-- Правая сторожевая башня цитадели -->
                            <rect x="568" y="6" width="46" height="130" rx="3" fill="#20222f" stroke="#090a10" stroke-width="2"/>
                            <polygon points="564,6 591,-12 618,6" fill="#7f1d1d" stroke="#450a0a" stroke-width="1.5"/>
                            <rect x="587" y="28" width="8" height="18" rx="4" fill="#450a0a" stroke="#dc2626" stroke-width="0.8"/>
                            <rect x="587" y="62" width="8" height="18" rx="4" fill="#450a0a" stroke="#dc2626" stroke-width="0.8"/>

                            <!-- Внешний готический портал -->
                            <path d="M415,130 L415,55 Q480,18 545,55 L545,130 Z" fill="#13141c" stroke="#333748" stroke-width="3"/>
                            <!-- Багровый пульсирующий портал Бездны -->
                            <path d="M428,130 L428,64 Q480,32 532,64 L532,130 Z" fill="url(#dungeonPortalGlow)" stroke="#991b1b" stroke-width="2" class="abyss-portal-mist"/>
                            <ellipse cx="480" cy="90" rx="32" ry="22" fill="none" stroke="#f87171" stroke-width="1.5" stroke-dasharray="8 6" class="anim-portal-core"/>

                            <!-- Железная решетка-герса (наполовину поднята) -->
                            <line x1="446" y1="46" x2="446" y2="102" stroke="#450a0a" stroke-width="3"/>
                            <line x1="463" y1="40" x2="463" y2="98" stroke="#450a0a" stroke-width="3"/>
                            <line x1="480" y1="36" x2="480" y2="94" stroke="#581c87" stroke-width="3"/>
                            <line x1="497" y1="40" x2="497" y2="98" stroke="#450a0a" stroke-width="3"/>
                            <line x1="514" y1="46" x2="514" y2="102" stroke="#450a0a" stroke-width="3"/>
                            <line x1="436" y1="70" x2="524" y2="70" stroke="#450a0a" stroke-width="2.5"/>

                            <!-- Пылающие факелы на стенах входа -->
                            <g transform="translate(406, 60)">
                                <circle cx="0" cy="0" r="16" fill="url(#forgeHeatGlow)" class="anim-torch-glow"/>
                                <path d="M-3,6 Q0,-5 3,6 Z" fill="#ea580c" class="anim-torch-flame"/>
                            </g>
                            <g transform="translate(554, 60)">
                                <circle cx="0" cy="0" r="16" fill="url(#forgeHeatGlow)" class="anim-torch-glow"/>
                                <path d="M-3,6 Q0,-5 3,6 Z" fill="#ea580c" class="anim-torch-flame"/>
                            </g>

                            <!-- Табличка с названием -->
                            <rect x="395" y="118" width="170" height="26" rx="5" fill="#12131a" stroke="#dc2626" stroke-width="1.8" class="banner-box"/>
                            <text x="480" y="135" text-anchor="middle" class="map-label" fill="#f87171" font-size="12" font-weight="bold" letter-spacing="1">ВРАТА КАТАКОМБ</text>
                            ${getBuildingQuestMarker('catacombs', 480, 102)}
                        </g>

                        <!-- ЗДАНИЕ 2: ТАВЕРНА «ПЬЯНЫЙ ДРАКОН» (СЕВЕРО-ЗАПАД) -->
                        <g class="town-building" id="building-tavern" style="cursor: pointer;">
                            <g transform="translate(90, 75)">
                                <!-- Тень таверны -->
                                <rect x="0" y="50" width="210" height="120" rx="8" fill="#05070a" opacity="0.6"/>

                                <!-- Первый этаж: каменная кладка -->
                                <rect x="10" y="70" width="190" height="85" rx="4" fill="#2d231b" stroke="#1c140e" stroke-width="2" class="building-roof"/>
                                <path d="M10,95 H200 M10,120 H200" stroke="#423429" stroke-width="1.2" stroke-dasharray="12 16"/>

                                <!-- Второй этаж: фахверк с нависанием -->
                                <rect x="5" y="25" width="200" height="52" fill="#fef3c7" stroke="#451a03" stroke-width="2.5"/>
                                <line x1="5" y1="25" x2="205" y2="25" stroke="#78350f" stroke-width="4"/>
                                <line x1="5" y1="77" x2="205" y2="77" stroke="#78350f" stroke-width="4"/>
                                <line x1="55" y1="25" x2="55" y2="77" stroke="#78350f" stroke-width="3"/>
                                <line x1="105" y1="25" x2="105" y2="77" stroke="#78350f" stroke-width="3"/>
                                <line x1="155" y1="25" x2="155" y2="77" stroke="#78350f" stroke-width="3"/>
                                <!-- Диагональные балки -->
                                <line x1="5" y1="25" x2="55" y2="77" stroke="#92400e" stroke-width="2"/>
                                <line x1="155" y1="25" x2="205" y2="77" stroke="#92400e" stroke-width="2"/>

                                <!-- Черепичная двускатная крыша с мезонином -->
                                <polygon points="-5,25 105,-18 215,25" fill="#78350f" stroke="#451a03" stroke-width="2.5"/>
                                <polygon points="10,24 105,-12 200,24" fill="#92400e"/>

                                <!-- Дымоход с клубящимся дымом -->
                                <rect x="155" y="-28" width="16" height="30" fill="#292524" stroke="#1c1917" stroke-width="1.8"/>
                                <circle cx="163" cy="-35" r="4" fill="#94a3b8" opacity="0.6" class="anim-chimney-smoke"/>
                                <circle cx="168" cy="-44" r="6" fill="#cbd5e1" opacity="0.4" class="anim-chimney-smoke"/>

                                <!-- Теплые светящиеся окна -->
                                <rect x="25" y="38" width="20" height="22" rx="2" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5" class="anim-window-glow"/>
                                <line x1="35" y1="38" x2="35" y2="60" stroke="#78350f" stroke-width="1"/>
                                <rect x="75" y="38" width="20" height="22" rx="2" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5" class="anim-window-glow"/>
                                <line x1="85" y1="38" x2="85" y2="60" stroke="#78350f" stroke-width="1"/>
                                <rect x="125" y="38" width="20" height="22" rx="2" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5" class="anim-window-glow"/>
                                <line x1="135" y1="38" x2="135" y2="60" stroke="#78350f" stroke-width="1"/>

                                <!-- Входная дверь с кованым фонарем -->
                                <rect x="90" y="95" width="30" height="55" rx="3" fill="#1c140e" stroke="#0f0b07" stroke-width="2"/>
                                <circle cx="112" cy="122" r="2.5" fill="#f59e0b"/>
                                <circle cx="105" cy="88" r="14" fill="url(#lampGlow)" class="anim-window-glow"/>
                                <rect x="102" y="84" width="6" height="8" rx="1" fill="#fef08a" stroke="#ca8a04" stroke-width="1"/>

                                <!-- Бочки с элем у входа -->
                                <g transform="translate(135, 115)">
                                    <ellipse cx="12" cy="20" rx="10" ry="14" fill="#78350f" stroke="#3b1d06" stroke-width="1.8"/>
                                    <line x1="4" y1="14" x2="20" y2="14" stroke="#1c1917" stroke-width="1.5"/>
                                    <line x1="4" y1="26" x2="20" y2="26" stroke="#1c1917" stroke-width="1.5"/>
                                </g>

                                <!-- Вывеска таверны на кронштейне -->
                                <g transform="translate(45, 80)">
                                    <line x1="0" y1="0" x2="22" y2="0" stroke="#1c1917" stroke-width="2.5"/>
                                    <rect x="4" y="8" width="22" height="20" rx="2" fill="#78350f" stroke="#ca8a04" stroke-width="1.5"/>
                                    <rect x="9" y="13" width="8" height="10" rx="1" fill="#f59e0b"/>
                                </g>

                                <!-- Табличка с названием здания -->
                                <rect x="35" y="152" width="140" height="26" rx="5" fill="#14151c" stroke="#ca8a04" stroke-width="1.8" class="banner-box"/>
                                <text x="105" y="169" text-anchor="middle" class="map-label" fill="#fef08a" font-size="12" font-weight="bold">ТАВЕРНА</text>
                                ${getBuildingQuestMarker('tavern', 105, 140)}
                            </g>
                        </g>

                        <!-- ЗДАНИЕ 3: КУЗНИЦА МАСТЕРА (СЕВЕРО-ВОСТОК) -->
                        <g class="town-building" id="building-blacksmith" style="cursor: pointer;">
                            <g transform="translate(660, 75)">
                                <!-- Тень кузницы -->
                                <rect x="0" y="50" width="210" height="120" rx="8" fill="#05070a" opacity="0.6"/>

                                <!-- Каменный корпус кузницы -->
                                <rect x="10" y="55" width="190" height="100" rx="4" fill="#292524" stroke="#1c1917" stroke-width="2.5" class="building-roof"/>

                                <!-- Сланцевая крыша кузницы -->
                                <polygon points="0,55 105,15 210,55" fill="#44403c" stroke="#1c1917" stroke-width="2.5"/>

                                <!-- Огромный каменный горн с открытым огнем -->
                                <rect x="30" y="40" width="55" height="95" rx="3" fill="#1c1917" stroke="#0c0a09" stroke-width="2"/>
                                <!-- Очаг горна с раскаленным пламенем -->
                                <path d="M38,105 Q57,60 76,105 Z" fill="#ea580c" class="anim-forge-flame flame-outer"/>
                                <path d="M43,105 Q57,75 71,105 Z" fill="#f97316" class="anim-forge-flame flame-mid"/>
                                <circle cx="57" cy="98" r="6" fill="#fef08a" class="anim-forge-glow"/>
                                <circle cx="57" cy="95" r="28" fill="url(#forgeHeatGlow)" opacity="0.8"/>

                                <!-- Кузнечные мехи -->
                                <path d="M20,95 L32,100 L20,105 Z" fill="#78350f" stroke="#3b1d06" stroke-width="1.2"/>

                                <!-- Наковальня на дубовой колоде -->
                                <g transform="translate(100, 95)">
                                    <rect x="8" y="18" width="24" height="24" rx="2" fill="#451a03" stroke="#1f0c02" stroke-width="1.5"/>
                                    <!-- Литая наковальня -->
                                    <path d="M0,8 L36,8 L30,18 L8,18 Z" fill="#64748b" stroke="#1e293b" stroke-width="1.8"/>
                                    <path d="M0,8 Q-6,12 0,15 L8,15 Z" fill="#475569"/>
                                    <!-- Раскаленный клинок -->
                                    <rect x="10" y="5" width="18" height="3" rx="1" fill="#fef08a" stroke="#ef4444" stroke-width="0.8" class="anim-forge-glow"/>
                                </g>

                                <!-- Чан с водой для закалки -->
                                <g transform="translate(145, 110)">
                                    <ellipse cx="12" cy="14" rx="11" ry="7" fill="#1e293b" stroke="#0f172a" stroke-width="1.8"/>
                                    <ellipse cx="12" cy="12" rx="8" ry="5" fill="#0284c7" opacity="0.85"/>
                                    <path d="M10,8 Q12,2 14,8" stroke="#ffffff" stroke-width="1" fill="none" opacity="0.6"/>
                                </g>

                                <!-- Стойка с выкованным оружием у стены -->
                                <g transform="translate(145, 60)">
                                    <rect x="0" y="5" width="38" height="45" rx="2" fill="#3b1d0e" stroke="#1c0a03" stroke-width="1.5"/>
                                    <line x1="10" y1="0" x2="10" y2="45" stroke="#f8fafc" stroke-width="2.5"/>
                                    <line x1="22" y1="-3" x2="22" y2="45" stroke="#78350f" stroke-width="2"/>
                                    <path d="M16,22 L32,22 L30,34 Q24,40 24,40 Q24,40 18,34 Z" fill="#b91c1c" stroke="#facc15" stroke-width="1.2"/>
                                </g>

                                <!-- Вывеска кузницы -->
                                <g transform="translate(75, 45)">
                                    <rect x="0" y="0" width="22" height="18" rx="2" fill="#292524" stroke="#ea580c" stroke-width="1.5"/>
                                    <circle cx="11" cy="9" r="3" fill="#facc15"/>
                                </g>

                                <!-- Табличка с названием здания -->
                                <rect x="35" y="152" width="140" height="26" rx="5" fill="#14151c" stroke="#ea580c" stroke-width="1.8" class="banner-box"/>
                                <text x="105" y="169" text-anchor="middle" class="map-label" fill="#fb923c" font-size="12" font-weight="bold">КУЗНИЦА</text>
                                ${getBuildingQuestMarker('blacksmith', 105, 140)}
                            </g>
                        </g>

                        <!-- ЗДАНИЕ 4: ЛАВКА «КУПЕЧЕСКИЙ ДОМ» (ЮГО-ЗАПАД) -->
                        <g class="town-building" id="building-shop" style="cursor: pointer;">
                            <g transform="translate(90, 340)">
                                <!-- Тень лавки -->
                                <rect x="0" y="50" width="210" height="120" rx="8" fill="#05070a" opacity="0.6"/>

                                <!-- Корпус купеческого магазина -->
                                <rect x="10" y="45" width="190" height="105" rx="6" fill="#2d1313" stroke="#170707" stroke-width="2.5" class="building-roof"/>

                                <!-- Черепичная крыша с деревянным коньком -->
                                <polygon points="-2,45 105,10 212,45" fill="#581c87" stroke="#3b0764" stroke-width="2.5"/>

                                <!-- Полосатый купеческий навес над прилавком -->
                                <g transform="translate(15, 60)">
                                    <path d="M0,0 L180,0 L175,28 Q170,36 160,28 Q150,36 140,28 Q130,36 120,28 Q110,36 100,28 Q90,36 80,28 Q70,36 60,28 Q50,36 40,28 Q30,36 20,28 Q10,36 0,28 Z" fill="#991b1b" stroke="#7f1d1d" stroke-width="1.5"/>
                                    <!-- Золотые полосы навеса -->
                                    <path d="M20,0 L40,0 L35,28 Q25,36 20,28 Z" fill="#f59e0b"/>
                                    <path d="M60,0 L80,0 L75,28 Q65,36 60,28 Z" fill="#f59e0b"/>
                                    <path d="M100,0 L120,0 L115,28 Q105,36 100,28 Z" fill="#f59e0b"/>
                                    <path d="M140,0 L160,0 L155,28 Q145,36 140,28 Z" fill="#f59e0b"/>
                                </g>

                                <!-- Открытый торговый прилавок с диковинками -->
                                <rect x="25" y="95" width="160" height="40" rx="3" fill="#451a03" stroke="#1c0b02" stroke-width="2"/>
                                <!-- Колбы с зельями и свитки на прилавке -->
                                <rect x="35" y="85" width="7" height="11" rx="1.5" fill="#ef4444"/>
                                <rect x="46" y="83" width="7" height="13" rx="1.5" fill="#38bdf8"/>
                                <rect x="57" y="86" width="8" height="10" rx="1.5" fill="#a855f7"/>
                                <rect x="70" y="88" width="14" height="7" rx="1" fill="#fef08a"/>
                                <!-- Кованый сундучок на прилавке -->
                                <rect x="135" y="84" width="22" height="14" rx="2" fill="#78350f" stroke="#ca8a04" stroke-width="1.2"/>
                                <circle cx="146" cy="91" r="1.8" fill="#facc15"/>

                                <!-- Купеческая телега с товаром рядом с лавкой -->
                                <g transform="translate(155, 115)">
                                    <ellipse cx="14" cy="18" rx="10" ry="10" fill="none" stroke="#78350f" stroke-width="2.5"/>
                                    <circle cx="14" cy="18" r="3" fill="#451a03"/>
                                </g>

                                <!-- Вывеска аптекарских весов -->
                                <g transform="translate(105, 30)">
                                    <rect x="-15" y="0" width="30" height="16" rx="2" fill="#1e1b4b" stroke="#facc15" stroke-width="1.2"/>
                                    <circle cx="0" cy="8" r="4" fill="#38bdf8"/>
                                </g>

                                <!-- Табличка с названием здания -->
                                <rect x="35" y="152" width="140" height="26" rx="5" fill="#14151c" stroke="#f59e0b" stroke-width="1.8" class="banner-box"/>
                                <text x="105" y="169" text-anchor="middle" class="map-label" fill="#fde047" font-size="12" font-weight="bold">ЛАВКА РЕДКОСТЕЙ</text>
                                ${getBuildingQuestMarker('shop', 105, 140)}
                            </g>
                        </g>

                        <!-- ЗДАНИЕ 5: ХРАМ СВЕТА (ЮГО-ВОСТОК, СТРОГО ДВУХБАШЕННЫЙ СОБОР) -->
                        <g class="town-building" id="building-temple" style="cursor: pointer;">
                            <g transform="translate(660, 340)">
                                <!-- Тень собора -->
                                <rect x="0" y="50" width="210" height="120" rx="8" fill="#05070a" opacity="0.6"/>

                                <!-- Центральный неф собора из белого камня -->
                                <rect x="40" y="35" width="130" height="115" rx="4" fill="#334155" stroke="#1e293b" stroke-width="2.5" class="building-roof"/>
                                <polygon points="35,35 105,-2 175,35" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>

                                <!-- ЛЕВАЯ БАШНЯ СО ШПИЛЕМ -->
                                <rect x="15" y="15" width="40" height="135" rx="3" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
                                <polygon points="10,15 35,-35 60,15" fill="#0f172a" stroke="#ca8a04" stroke-width="2"/>
                                <circle cx="35" cy="-35" r="4" fill="#facc15" filter="url(#buildingHoverGlow)"/>
                                <line x1="35" y1="-42" x2="35" y2="-28" stroke="#fde047" stroke-width="1.8"/>
                                <line x1="28" y1="-35" x2="42" y2="-35" stroke="#fde047" stroke-width="1.8"/>
                                <!-- Готическое стрельчатое окно левой башни -->
                                <path d="M28,65 L28,42 Q35,34 42,42 L42,65 Z" fill="#0284c7" stroke="#fde047" stroke-width="1" class="anim-window-glow"/>

                                <!-- ПРАВАЯ БАШНЯ СО ШПИЛЕМ -->
                                <rect x="155" y="15" width="40" height="135" rx="3" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
                                <polygon points="150,15 175,-35 200,15" fill="#0f172a" stroke="#ca8a04" stroke-width="2"/>
                                <circle cx="175" cy="-35" r="4" fill="#facc15" filter="url(#buildingHoverGlow)"/>
                                <line x1="175" y1="-42" x2="175" y2="-28" stroke="#fde047" stroke-width="1.8"/>
                                <line x1="168" y1="-35" x2="182" y2="-35" stroke="#fde047" stroke-width="1.8"/>
                                <!-- Готическое стрельчатое окно правой башни -->
                                <path d="M168,65 L168,42 Q175,34 182,42 L182,65 Z" fill="#0284c7" stroke="#fde047" stroke-width="1" class="anim-window-glow"/>

                                <!-- ВЕЛИКАЯ ВИТРАЖНАЯ РОЗА В ЦЕНТРЕ -->
                                <circle cx="105" cy="50" r="24" fill="url(#templeHolyGlow)" stroke="#fde047" stroke-width="2.5" class="anim-window-glow"/>
                                <circle cx="105" cy="50" r="16" fill="#0284c7" stroke="#fde047" stroke-width="1.2"/>
                                <polygon points="105,32 110,46 123,50 110,54 105,68 100,54 87,50 100,46" fill="#fef08a"/>

                                <!-- Арочный мраморный портал входа -->
                                <path d="M85,150 L85,105 Q105,85 125,105 L125,150 Z" fill="#0f172a" stroke="#fde047" stroke-width="2"/>
                                <line x1="105" y1="92" x2="105" y2="150" stroke="#fde047" stroke-width="1.5"/>

                                <!-- Табличка с названием здания -->
                                <rect x="35" y="152" width="140" height="26" rx="5" fill="#14151c" stroke="#38bdf8" stroke-width="1.8" class="banner-box"/>
                                <text x="105" y="169" text-anchor="middle" class="map-label" fill="#7dd3fc" font-size="12" font-weight="bold">ХРАМ СВЕТА</text>
                                ${getBuildingQuestMarker('temple', 105, 140)}
                            </g>
                        </g>

                        <!-- ЗДАНИЕ 6: ВЫХОД НА ЮЖНЫЙ ТРАКТ (ЮГ, ЦЕНТР) -->
                        <g class="south-exit-group" id="town-south-exit" style="cursor: pointer;">
                            <!-- Каменные пилоны ворот -->
                            <rect x="424" y="490" width="20" height="44" rx="2" fill="#334155" stroke="#1e293b" stroke-width="1.5"/>
                            <rect x="516" y="490" width="20" height="44" rx="2" fill="#334155" stroke="#1e293b" stroke-width="1.5"/>

                            <!-- Арка ворот и кованая решетка -->
                            <path d="M444,502 Q480,484 516,502 L516,534 L444,534 Z" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>
                            <line x1="458" y1="494" x2="458" y2="534" stroke="#64748b" stroke-width="1.2"/>
                            <line x1="480" y1="488" x2="480" y2="534" stroke="#64748b" stroke-width="1.5"/>
                            <line x1="502" y1="494" x2="502" y2="534" stroke="#64748b" stroke-width="1.2"/>

                            <!-- Фигурки стражей заставы -->
                            <!-- Капитан Варран слева -->
                            <g transform="translate(412, 492)">
                                <ellipse cx="8" cy="38" rx="8" ry="3" fill="#000000" opacity="0.4"/>
                                <rect x="5" y="16" width="6" height="18" rx="1" fill="#475569"/>
                                <path d="M3,16 L13,16 L14,32 L2,32 Z" fill="#1e3a8a"/>
                                <circle cx="8" cy="11" r="5" fill="#cbd5e1"/>
                                <line x1="16" y1="2" x2="16" y2="38" stroke="#78350f" stroke-width="1.5"/>
                                <polygon points="16,2 14,-4 18,-4" fill="#cbd5e1"/>
                            </g>

                            <!-- Стражник Бран справа -->
                            <g transform="translate(534, 492)">
                                <ellipse cx="8" cy="38" rx="8" ry="3" fill="#000000" opacity="0.4"/>
                                <rect x="5" y="16" width="6" height="18" rx="1" fill="#475569"/>
                                <circle cx="8" cy="11" r="5" fill="#cbd5e1"/>
                                <path d="M-1,16 L7,16 L6,28 Q3,33 3,33 Q3,33 0,28 Z" fill="#1e3a8a" stroke="#facc15" stroke-width="1"/>
                                <line x1="13" y1="18" x2="13" y2="34" stroke="#cbd5e1" stroke-width="1.2"/>
                            </g>

                            <!-- Табличка "Южный тракт" -->
                            <rect x="415" y="530" width="130" height="26" rx="5" fill="#14151c" stroke="#ca8a04" stroke-width="2" class="banner-box"/>
                            <path d="M472,546 L480,553 L488,546" stroke="#facc15" stroke-width="2" fill="none" stroke-linecap="round"/>
                            <text x="480" y="542" text-anchor="middle" class="map-label" fill="#facc15" font-size="11.5" font-weight="bold" letter-spacing="1">ЮЖНЫЙ ТРАКТ</text>
                            ${getBuildingQuestMarker('southRoad', 480, 516)}
                        </g>

                        <!-- Летающие светлячки в вечернем воздухе -->
                        <g id="town-ambient-fireflies" pointer-events="none">
                            <circle cx="380" cy="340" r="2.5" fill="#fef08a" class="ambient-firefly firefly-1"/>
                            <circle cx="580" cy="320" r="2" fill="#a7f3d0" class="ambient-firefly firefly-2"/>
                            <circle cx="450" cy="420" r="2.8" fill="#fef08a" class="ambient-firefly firefly-3"/>
                            <circle cx="520" cy="220" r="2" fill="#fde047" class="ambient-firefly firefly-4"/>
                            <circle cx="410" cy="250" r="2.4" fill="#a7f3d0" class="ambient-firefly firefly-5"/>
                            <circle cx="550" cy="440" r="2.2" fill="#fef08a" class="ambient-firefly firefly-6"/>
                        </g>
                    </svg>
                </div>
            </div>
        `;

        this.initEvents();
    }

    initEvents() {
        this.container.querySelector('#btn-town-menu').addEventListener('click', () => {
            sound.playSfx('click');
            this.callbacks.onOpenMenu('inventory');
        });

        const btnJournal = this.container.querySelector('#btn-town-journal');
        if (btnJournal) {
            btnJournal.addEventListener('click', () => {
                sound.playSfx('click');
                this.callbacks.onOpenMenu('journal');
            });
        }

        this.container.querySelector('#town-south-exit').addEventListener('click', () => {
            sound.playSfx('click');
            const screen = new SouthRoadScreen(this.player, {
                onBack: () => this.render(this.container),
                onPlayCutscene: (type, onFinish) => {
                    if (this.callbacks.onPlayCutscene) {
                        this.callbacks.onPlayCutscene(type, onFinish);
                    }
                },
                onMainMenu: () => {
                    if (this.callbacks.onMainMenu) {
                        this.callbacks.onMainMenu();
                    }
                }
            });
            screen.render(this.container);
        });

        this.container.querySelector('#building-tavern').addEventListener('click', () => {
            sound.playSfx('tab');
            const screen = new TavernScreen(this.player, {
                onBack: () => this.render(this.container)
            });
            screen.render(this.container);
        });

        this.container.querySelector('#building-shop').addEventListener('click', () => {
            sound.playSfx('coin');
            const screen = new ShopScreen(this.player, {
                onBack: () => this.render(this.container)
            });
            screen.render(this.container);
        });

        const bBlacksmith = this.container.querySelector('#building-blacksmith');
        if (bBlacksmith) {
            bBlacksmith.style.cursor = 'pointer';
            bBlacksmith.addEventListener('click', (e) => {
                e.stopPropagation();
                sound.playSfx('click');
                const screen = new BlacksmithScreen(this.player, {
                    onBack: () => this.render(this.container)
                });
                screen.render(this.container);
            });
        }

        this.container.querySelector('#building-temple').addEventListener('click', () => {
            sound.playSfx('tab');
            const screen = new TempleScreen(this.player, {
                onBack: () => this.render(this.container)
            });
            screen.render(this.container);
        });

        this.container.querySelector('#building-gate').addEventListener('click', () => {
            sound.playSfx('selectHero');
            if (this.callbacks.onEnterDungeon) {
                this.callbacks.onEnterDungeon();
            }
        });

        this.startBuffTicker();
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
        if (this.tickerInterval) clearInterval(this.tickerInterval);
        this.tickerInterval = setInterval(() => {
            const badge = this.container?.querySelector('#hud-tavern-buff-badge');
            if (badge) {
                badge.innerHTML = this.renderTavernBuffHudBadge();
            }
        }, 1000);
    }

    cleanup() {
        if (this.tickerInterval) {
            clearInterval(this.tickerInterval);
            this.tickerInterval = null;
        }
    }
}