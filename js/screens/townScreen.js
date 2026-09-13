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
    }

    render(container) {
        this.container = container;
        const activeQuestsCount = QuestSystem.getActiveQuestsList(this.player).length;

        const getBuildingQuestMarker = (buildingId, x, y) => {
            const status = QuestSystem.hasQuestsForBuilding(this.player, buildingId);
            if (status.hasTurnIn) {
                return `
                    <g class="map-quest-badge anim-bounce-glow" transform="translate(${x}, ${y})" pointer-events="none">
                        <circle cx="0" cy="0" r="14" fill="#f59e0b" stroke="#ffffff" stroke-width="2.5" filter="url(#buildingHoverGlow)"/>
                        <text x="0" y="5.5" text-anchor="middle" fill="#0f172a" font-size="16" font-weight="900" font-family="system-ui, sans-serif">?</text>
                    </g>
                `;
            } else if (status.hasAvailable) {
                return `
                    <g class="map-quest-badge anim-bounce-glow" transform="translate(${x}, ${y})" pointer-events="none">
                        <circle cx="0" cy="0" r="14" fill="#38bdf8" stroke="#ffffff" stroke-width="2.5" filter="url(#buildingHoverGlow)"/>
                        <text x="0" y="5.5" text-anchor="middle" fill="#0f172a" font-size="16" font-weight="900" font-family="system-ui, sans-serif">!</text>
                    </g>
                `;
            }
            return '';
        };

        container.innerHTML = `
            <div class="town-container">
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

                <div class="town-map-viewport">
                    <svg viewBox="0 0 960 560" class="town-map-svg">
                        <defs>
                            <!-- Градиенты ландшафта и построек -->
                            <radialGradient id="fountainGrad" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stop-color="#67e8f9"/>
                                <stop offset="50%" stop-color="#0284c7"/>
                                <stop offset="100%" stop-color="#0c4a6e"/>
                            </radialGradient>

                            <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stop-color="#fef08a" stop-opacity="0.9"/>
                                <stop offset="30%" stop-color="#f59e0b" stop-opacity="0.45"/>
                                <stop offset="70%" stop-color="#d97706" stop-opacity="0.15"/>
                                <stop offset="100%" stop-color="#d97706" stop-opacity="0"/>
                            </radialGradient>

                            <radialGradient id="dungeonMistGlow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stop-color="#dc2626" stop-opacity="0.85"/>
                                <stop offset="45%" stop-color="#7f1d1d" stop-opacity="0.5"/>
                                <stop offset="85%" stop-color="#0a0505" stop-opacity="0.95"/>
                                <stop offset="100%" stop-color="#000000" stop-opacity="1"/>
                            </radialGradient>

                            <radialGradient id="forgeGlow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stop-color="#fef08a" stop-opacity="0.95"/>
                                <stop offset="35%" stop-color="#f97316" stop-opacity="0.75"/>
                                <stop offset="70%" stop-color="#ea580c" stop-opacity="0.3"/>
                                <stop offset="100%" stop-color="#c2410c" stop-opacity="0"/>
                            </radialGradient>

                            <radialGradient id="templeGlow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stop-color="#fef08a" stop-opacity="0.8"/>
                                <stop offset="40%" stop-color="#38bdf8" stop-opacity="0.5"/>
                                <stop offset="80%" stop-color="#0284c7" stop-opacity="0.1"/>
                                <stop offset="100%" stop-color="#0284c7" stop-opacity="0"/>
                            </radialGradient>

                            <radialGradient id="plazaGrad" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stop-color="#3d3e4c"/>
                                <stop offset="60%" stop-color="#2a2c37"/>
                                <stop offset="100%" stop-color="#1e2029"/>
                            </radialGradient>

                            <!-- Текстурные паттерны -->
                            <pattern id="meadowPattern" width="60" height="60" patternUnits="userSpaceOnUse">
                                <rect width="60" height="60" fill="#152117"/>
                                <circle cx="15" cy="15" r="8" fill="#1b2a1d" opacity="0.6"/>
                                <circle cx="45" cy="40" r="10" fill="#18261a" opacity="0.7"/>
                                <path d="M12 25 L14 20 L16 25" stroke="#223b25" stroke-width="1.2" fill="none"/>
                                <path d="M42 12 L44 8 L46 12" stroke="#223b25" stroke-width="1.2" fill="none"/>
                                <path d="M30 48 L32 44 L34 48" stroke="#223b25" stroke-width="1.2" fill="none"/>
                            </pattern>

                            <pattern id="flagstoneRoad" width="30" height="30" patternUnits="userSpaceOnUse">
                                <rect width="30" height="30" fill="#2d303b"/>
                                <rect x="1" y="1" width="13" height="13" rx="2" fill="#383b48" stroke="#22242e" stroke-width="1"/>
                                <rect x="16" y="1" width="13" height="13" rx="2" fill="#333644" stroke="#22242e" stroke-width="1"/>
                                <rect x="1" y="16" width="13" height="13" rx="2" fill="#353845" stroke="#22242e" stroke-width="1"/>
                                <rect x="16" y="16" width="13" height="13" rx="2" fill="#3c3f4e" stroke="#22242e" stroke-width="1"/>
                            </pattern>

                            <!-- Фильтры свечения -->
                            <filter id="buildingHoverGlow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#f59e0b" flood-opacity="0.5"/>
                            </filter>
                        </defs>

                        <!-- 1. ЗЕЛЕНЫЙ ЛАНДШАФТ ГОРОДА -->
                        <rect width="960" height="560" fill="url(#meadowPattern)"/>

                        <!-- 2. КАМЕННЫЕ КРЕПОСТНЫЕ СТЕНЫ ПО ПЕРИМЕТРУ -->
                        <!-- Северная стена (слева и справа от врат) -->
                        <rect x="0" y="0" width="360" height="24" fill="#242630" stroke="#14151b" stroke-width="2"/>
                        <rect x="600" y="0" width="360" height="24" fill="#242630" stroke="#14151b" stroke-width="2"/>
                        <!-- Зубцы северной стены -->
                        <path d="M0,0 H360 M0,8 H360" stroke="#353846" stroke-width="1.5"/>
                        <line x1="40" y1="0" x2="40" y2="24" stroke="#14151b" stroke-width="2"/>
                        <line x1="80" y1="0" x2="80" y2="24" stroke="#14151b" stroke-width="2"/>
                        <line x1="120" y1="0" x2="120" y2="24" stroke="#14151b" stroke-width="2"/>
                        <line x1="160" y1="0" x2="160" y2="24" stroke="#14151b" stroke-width="2"/>
                        <line x1="200" y1="0" x2="200" y2="24" stroke="#14151b" stroke-width="2"/>
                        <line x1="240" y1="0" x2="240" y2="24" stroke="#14151b" stroke-width="2"/>
                        <line x1="280" y1="0" x2="280" y2="24" stroke="#14151b" stroke-width="2"/>
                        <line x1="320" y1="0" x2="320" y2="24" stroke="#14151b" stroke-width="2"/>
                        <line x1="640" y1="0" x2="640" y2="24" stroke="#14151b" stroke-width="2"/>
                        <line x1="680" y1="0" x2="680" y2="24" stroke="#14151b" stroke-width="2"/>
                        <line x1="720" y1="0" x2="720" y2="24" stroke="#14151b" stroke-width="2"/>
                        <line x1="760" y1="0" x2="760" y2="24" stroke="#14151b" stroke-width="2"/>
                        <line x1="800" y1="0" x2="800" y2="24" stroke="#14151b" stroke-width="2"/>
                        <line x1="840" y1="0" x2="840" y2="24" stroke="#14151b" stroke-width="2"/>
                        <line x1="880" y1="0" x2="880" y2="24" stroke="#14151b" stroke-width="2"/>
                        <line x1="920" y1="0" x2="920" y2="24" stroke="#14151b" stroke-width="2"/>

                        <!-- Западная и восточная стены -->
                        <rect x="0" y="24" width="22" height="536" fill="#242630" stroke="#14151b" stroke-width="2"/>
                        <rect x="938" y="24" width="22" height="536" fill="#242630" stroke="#14151b" stroke-width="2"/>
                        <!-- Южная стена (слева и справа от тракта) -->
                        <rect x="0" y="538" width="410" height="22" fill="#242630" stroke="#14151b" stroke-width="2"/>
                        <rect x="550" y="538" width="410" height="22" fill="#242630" stroke="#14151b" stroke-width="2"/>

                        <!-- 3. СЕТЬ МОЩЕНЫХ ДОРОГ К ЗДАНИЯМ -->
                        <!-- Дорога от Врат Катакомб к площади -->
                        <path d="M420,135 Q450,190 435,225 L525,225 Q510,190 540,135 Z" fill="url(#flagstoneRoad)" stroke="#1a1c24" stroke-width="2"/>
                        <!-- Дорога от площади к Южному тракту -->
                        <path d="M425,355 L415,538 L545,538 L535,355 Z" fill="url(#flagstoneRoad)" stroke="#1a1c24" stroke-width="2"/>
                        <!-- Дорога к Таверне (влево вверх) -->
                        <path d="M250,180 L390,265 L375,315 L250,240 Z" fill="url(#flagstoneRoad)" stroke="#1a1c24" stroke-width="2"/>
                        <!-- Дорога к Лавке (влево вниз) -->
                        <path d="M245,410 L395,335 L410,385 L245,465 Z" fill="url(#flagstoneRoad)" stroke="#1a1c24" stroke-width="2"/>
                        <!-- Дорога к Кузнице (вправо вверх) -->
                        <path d="M710,180 L570,265 L585,315 L710,240 Z" fill="url(#flagstoneRoad)" stroke="#1a1c24" stroke-width="2"/>
                        <!-- Дорога к Храму (вправо вниз) -->
                        <path d="M715,410 L565,335 L550,385 L715,465 Z" fill="url(#flagstoneRoad)" stroke="#1a1c24" stroke-width="2"/>

                        <!-- 4. ЦЕНТРАЛЬНАЯ ГОРОДСКАЯ ПЛОЩАДЬ -->
                        <g id="town-central-plaza">
                            <!-- Внешнее кольцо брусчатки -->
                            <circle cx="480" cy="290" r="110" fill="url(#plazaGrad)" stroke="#181a22" stroke-width="5"/>
                            <circle cx="480" cy="290" r="102" fill="none" stroke="#4b4f63" stroke-width="2" stroke-dasharray="8 6"/>
                            <circle cx="480" cy="290" r="88" fill="#282a36" stroke="#1e2029" stroke-width="3"/>

                            <!-- Мозаичная роза ветров на площади -->
                            <polygon points="480,215 487,283 555,290 487,297 480,365 473,297 405,290 473,283" fill="#3b3d4f" stroke="#1a1b24" stroke-width="1.5"/>
                            <polygon points="480,230 485,285 540,290 485,295 480,350 475,295 420,290 475,285" fill="#caa438" opacity="0.6"/>

                            <!-- Мраморный трехъярусный фонтан с живой анимацией воды -->
                            <circle cx="480" cy="290" r="48" fill="#334155" stroke="#1e293b" stroke-width="3"/>
                            <circle cx="480" cy="290" r="42" fill="url(#fountainGrad)"/>
                            <!-- Анимированная водная рябь -->
                            <ellipse cx="480" cy="290" rx="34" ry="26" fill="none" stroke="#e0f2fe" stroke-width="1.5" class="fountain-ripple-anim ripple-1"/>
                            <ellipse cx="480" cy="290" rx="22" ry="16" fill="none" stroke="#bae6fd" stroke-width="1.2" class="fountain-ripple-anim ripple-2"/>
                            <ellipse cx="480" cy="290" rx="14" ry="10" fill="none" stroke="#67e8f9" stroke-width="1.0" class="fountain-ripple-anim ripple-3"/>
                            <!-- Второй ярус чаши -->
                            <circle cx="480" cy="290" r="16" fill="#475569" stroke="#1e293b" stroke-width="2"/>
                            <circle cx="480" cy="290" r="12" fill="#38bdf8"/>
                            <!-- Центральное изваяние и бьющие струи воды -->
                            <circle cx="480" cy="290" r="5" fill="#f8fafc" stroke="#0284c7" stroke-width="1.5"/>
                            <g class="fountain-jets-group">
                                <path d="M480,288 Q473,270 468,278" stroke="#f0f9ff" stroke-width="1.8" fill="none" stroke-linecap="round" class="fountain-spray spray-left"/>
                                <path d="M480,288 Q487,270 492,278" stroke="#f0f9ff" stroke-width="1.8" fill="none" stroke-linecap="round" class="fountain-spray spray-right"/>
                                <line x1="480" y1="288" x2="480" y2="265" stroke="#ffffff" stroke-width="2" stroke-linecap="round" class="fountain-spray spray-center"/>
                            </g>
                        </g>

                        <!-- 5. УЛИЧНЫЕ ФОНАРИ С МЯГКИМ ТЕПЛЫМ МЕРЦАЮЩИМ СВЕТОМ -->
                        <g transform="translate(370, 205)" class="lantern-group">
                            <circle cx="0" cy="0" r="48" fill="url(#lampGlow)" class="lantern-glow-pulse glow-1"/>
                            <circle cx="0" cy="0" r="5" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
                            <rect x="-2" y="5" width="4" height="12" fill="#1c1917" rx="1"/>
                        </g>
                        <g transform="translate(590, 205)" class="lantern-group">
                            <circle cx="0" cy="0" r="48" fill="url(#lampGlow)" class="lantern-glow-pulse glow-2"/>
                            <circle cx="0" cy="0" r="5" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
                            <rect x="-2" y="5" width="4" height="12" fill="#1c1917" rx="1"/>
                        </g>
                        <g transform="translate(370, 375)" class="lantern-group">
                            <circle cx="0" cy="0" r="48" fill="url(#lampGlow)" class="lantern-glow-pulse glow-3"/>
                            <circle cx="0" cy="0" r="5" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
                            <rect x="-2" y="5" width="4" height="12" fill="#1c1917" rx="1"/>
                        </g>
                        <g transform="translate(590, 375)" class="lantern-group">
                            <circle cx="0" cy="0" r="48" fill="url(#lampGlow)" class="lantern-glow-pulse glow-4"/>
                            <circle cx="0" cy="0" r="5" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
                            <rect x="-2" y="5" width="4" height="12" fill="#1c1917" rx="1"/>
                        </g>

                        <!-- Деревья и кустарники вокруг площади -->
                        <g id="town-trees">
                            <!-- Деревья слева -->
                            <circle cx="50" cy="45" r="26" fill="#163819" stroke="#0e2410" stroke-width="2"/>
                            <circle cx="46" cy="40" r="18" fill="#1e4d23"/>
                            <circle cx="285" cy="65" r="24" fill="#163819" stroke="#0e2410" stroke-width="2"/>
                            <circle cx="282" cy="60" r="16" fill="#1e4d23"/>
                            <!-- Деревья справа -->
                            <circle cx="910" cy="45" r="26" fill="#163819" stroke="#0e2410" stroke-width="2"/>
                            <circle cx="906" cy="40" r="18" fill="#1e4d23"/>
                            <circle cx="675" cy="65" r="24" fill="#163819" stroke="#0e2410" stroke-width="2"/>
                            <circle cx="672" cy="60" r="16" fill="#1e4d23"/>
                            <!-- Деревья между верхними и нижними постройками -->
                            <circle cx="150" cy="335" r="22" fill="#163819" stroke="#0e2410" stroke-width="1.8"/>
                            <circle cx="147" cy="330" r="15" fill="#1e4d23"/>
                            <circle cx="810" cy="335" r="22" fill="#163819" stroke="#0e2410" stroke-width="1.8"/>
                            <circle cx="807" cy="330" r="15" fill="#1e4d23"/>
                            <!-- Деревья внизу -->
                            <circle cx="85" cy="515" r="28" fill="#163819" stroke="#0e2410" stroke-width="2"/>
                            <circle cx="875" cy="515" r="28" fill="#163819" stroke="#0e2410" stroke-width="2"/>
                        </g>

                        <!-- =========================================================
                             ИНТЕРАКТИВНЫЕ ЗДАНИЯ ГОРОДА
                             ========================================================= -->

                        <!-- ЗДАНИЕ 1: ВРАТА КАТАКОМБ (СЕВЕР) -->
                        <g class="town-building" id="building-gate" style="cursor: pointer;">
                            <!-- Тень бастиона -->
                            <rect x="340" y="20" width="280" height="120" rx="10" fill="#05070a" opacity="0.6"/>

                            <!-- Главный массив бастиона из темного гранита -->
                            <rect x="350" y="8" width="260" height="125" rx="6" fill="#181924" stroke="#090a10" stroke-width="2.5" class="building-roof"/>
                            <!-- Каменные блоки и рустовка стен -->
                            <path d="M350,30 H610 M350,55 H610 M350,80 H610 M350,105 H610" stroke="#252838" stroke-width="1.2" stroke-dasharray="14 18"/>
                            <line x1="390" y1="8" x2="390" y2="30" stroke="#252838" stroke-width="1.2"/>
                            <line x1="435" y1="30" x2="435" y2="55" stroke="#252838" stroke-width="1.2"/>
                            <line x1="525" y1="30" x2="525" y2="55" stroke="#252838" stroke-width="1.2"/>
                            <line x1="570" y1="8" x2="570" y2="30" stroke="#252838" stroke-width="1.2"/>

                            <!-- Зубчатый парапет (мерлоны) на крыше -->
                            <path d="M385,8 V0 H405 V8 H425 V0 H445 V8 H515 V0 H535 V8 H555 V0 H575 V8" fill="#26293a" stroke="#0f1017" stroke-width="1.5"/>

                            <!-- Левая сторожевая башня-бастион -->
                            <rect x="338" y="2" width="48" height="135" rx="3" fill="#20222f" stroke="#090a10" stroke-width="2"/>
                            <polygon points="334,2 362,-14 390,2" fill="#7f1d1d" stroke="#450a0a" stroke-width="1.5"/>
                            <line x1="362" y1="-14" x2="362" y2="2" stroke="#f59e0b" stroke-width="2"/>
                            <!-- Бойницы с алым отблеском бездны -->
                            <rect x="358" y="24" width="8" height="20" rx="4" fill="#450a0a" stroke="#dc2626" stroke-width="0.8"/>
                            <rect x="358" y="60" width="8" height="20" rx="4" fill="#450a0a" stroke="#dc2626" stroke-width="0.8"/>
                            <rect x="358" y="96" width="8" height="20" rx="4" fill="#450a0a" stroke="#dc2626" stroke-width="0.8"/>
                            <!-- Вымпел на шпиле -->
                            <path d="M362,-14 L340,-7 L362,0" fill="#dc2626" opacity="0.85"/>

                            <!-- Правая сторожевая башня-бастион -->
                            <rect x="574" y="2" width="48" height="135" rx="3" fill="#20222f" stroke="#090a10" stroke-width="2"/>
                            <polygon points="570,2 598,-14 626,2" fill="#7f1d1d" stroke="#450a0a" stroke-width="1.5"/>
                            <line x1="598" y1="-14" x2="598" y2="2" stroke="#f59e0b" stroke-width="2"/>
                            <!-- Бойницы с алым отблеском -->
                            <rect x="594" y="24" width="8" height="20" rx="4" fill="#450a0a" stroke="#dc2626" stroke-width="0.8"/>
                            <rect x="594" y="60" width="8" height="20" rx="4" fill="#450a0a" stroke="#dc2626" stroke-width="0.8"/>
                            <rect x="594" y="96" width="8" height="20" rx="4" fill="#450a0a" stroke="#dc2626" stroke-width="0.8"/>
                            <!-- Вымпел на шпиле -->
                            <path d="M598,-14 L620,-7 L598,0" fill="#dc2626" opacity="0.85"/>

                            <!-- Внешний портал с 3 концентрическими готическими архивольтами -->
                            <path d="M408,133 L408,52 Q480,10 552,52 L552,133 Z" fill="#13141c" stroke="#333748" stroke-width="3"/>
                            <path d="M418,133 L418,57 Q480,20 542,57 L542,133 Z" fill="#0d0e14" stroke="#4b1010" stroke-width="2.5"/>

                            <!-- Входной проем в бездну со зловещим пульсирующим порталом -->
                            <path d="M428,133 L428,62 Q480,28 532,62 L532,133 Z" fill="url(#dungeonMistGlow)" stroke="#991b1b" stroke-width="2" class="abyss-portal-mist"/>
                            <!-- Вращающийся астральный вихрь бездны -->
                            <ellipse cx="480" cy="88" rx="34" ry="24" fill="none" stroke="#f87171" stroke-width="1.5" stroke-dasharray="10 8" class="anim-portal-core"/>

                            <!-- Окованная шипами решетка-герса (наполовину поднята) -->
                            <line x1="444" y1="44" x2="444" y2="105" stroke="#450a0a" stroke-width="3"/>
                            <line x1="462" y1="36" x2="462" y2="100" stroke="#450a0a" stroke-width="3"/>
                            <line x1="480" y1="30" x2="480" y2="96" stroke="#581c87" stroke-width="3"/>
                            <line x1="498" y1="36" x2="498" y2="100" stroke="#450a0a" stroke-width="3"/>
                            <line x1="516" y1="44" x2="516" y2="105" stroke="#450a0a" stroke-width="3"/>
                            <line x1="432" y1="72" x2="528" y2="72" stroke="#450a0a" stroke-width="2.5"/>
                            <line x1="434" y1="92" x2="526" y2="92" stroke="#450a0a" stroke-width="2.5"/>
                            <!-- Шипы на концах прутьев -->
                            <polygon points="441,105 444,112 447,105" fill="#7f1d1d"/>
                            <polygon points="459,100 462,107 465,100" fill="#7f1d1d"/>
                            <polygon points="477,96 480,103 483,96" fill="#7f1d1d"/>
                            <polygon points="495,100 498,107 501,100" fill="#7f1d1d"/>
                            <polygon points="513,105 516,112 519,105" fill="#7f1d1d"/>

                            <!-- Взлетающие багровые искры бездны -->
                            <g class="abyss-embers-group">
                                <circle cx="452" cy="90" r="2.2" fill="#ef4444" class="abyss-ember ember-1"/>
                                <circle cx="480" cy="74" r="2.0" fill="#f87171" class="abyss-ember ember-2"/>
                                <circle cx="508" cy="85" r="2.2" fill="#dc2626" class="abyss-ember ember-3"/>
                                <circle cx="468" cy="58" r="1.6" fill="#fca5a5" class="abyss-ember ember-4"/>
                                <circle cx="494" cy="50" r="1.8" fill="#fb923c" class="abyss-ember ember-5"/>
                            </g>

                            <!-- Чаши с пламенем на кованых железных цепях -->
                            <g transform="translate(398, 54)">
                                <circle cx="0" cy="0" r="18" fill="url(#forgeGlow)" class="anim-torch-glow"/>
                                <path d="M-6,8 L6,8 L4,15 L-4,15 Z" fill="#1c1917" stroke="#450a0a" stroke-width="1.2"/>
                                <path d="M-4,8 Q0,-6 4,8 Z" fill="#ea580c" class="anim-torch-flame"/>
                                <circle cx="0" cy="3" r="3" fill="#fef08a"/>
                            </g>
                            <g transform="translate(562, 54)">
                                <circle cx="0" cy="0" r="18" fill="url(#forgeGlow)" class="anim-torch-glow"/>
                                <path d="M-6,8 L6,8 L4,15 L-4,15 Z" fill="#1c1917" stroke="#450a0a" stroke-width="1.2"/>
                                <path d="M-4,8 Q0,-6 4,8 Z" fill="#ea580c" class="anim-torch-flame"/>
                                <circle cx="0" cy="3" r="3" fill="#fef08a"/>
                            </g>

                            <!-- Готический замковый камень: резной череп демона с рогами -->
                            <path d="M472,32 Q480,24 488,32 L488,44 Q480,48 472,44 Z" fill="#cbd5e1" stroke="#334155" stroke-width="1.5"/>
                            <path d="M468,26 Q473,30 473,34" stroke="#64748b" stroke-width="2" fill="none"/>
                            <path d="M492,26 Q487,30 487,34" stroke="#64748b" stroke-width="2" fill="none"/>
                            <circle cx="476" cy="38" r="1.8" fill="#dc2626"/>
                            <circle cx="484" cy="38" r="1.8" fill="#dc2626"/>

                            <!-- Вывеска / Табличка -->
                            <rect x="395" y="118" width="170" height="26" rx="5" fill="#12131a" stroke="#dc2626" stroke-width="1.8" class="banner-box"/>
                            <text x="480" y="135" text-anchor="middle" class="map-label" fill="#f87171" font-size="12" font-weight="bold" letter-spacing="1">ВРАТА КАТАКОМБ</text>
                        </g>

                        <!-- ЗДАНИЕ 2: ТАВЕРНА «ПЬЯНЫЙ ДРАКОН» (СЕВЕРО-ЗАПАД) -->
                        <g class="town-building" id="building-tavern" style="cursor: pointer;">
                            <g transform="translate(0, -55)">
                                <!-- Тень здания -->
                                <rect x="42" y="175" width="210" height="155" rx="8" fill="#05070a" opacity="0.6"/>

                            <!-- Первый этаж: основа из тесаного речного камня -->
                            <rect x="52" y="225" width="190" height="95" rx="4" fill="#2d231b" stroke="#1c140e" stroke-width="2" class="building-roof"/>
                            <!-- Каменные кладочные швы -->
                            <path d="M52,250 H242 M52,275 H242 M52,300 H242" stroke="#423429" stroke-width="1.2" stroke-dasharray="12 16"/>

                            <!-- Второй этаж: фахверк с нависанием (Jettying) -->
                            <rect x="46" y="165" width="202" height="66" fill="#fef3c7" stroke="#451a03" stroke-width="2.5"/>
                            <!-- Фахверковые брусья и раскосы -->
                            <line x1="46" y1="165" x2="248" y2="165" stroke="#78350f" stroke-width="4"/>
                            <line x1="46" y1="230" x2="248" y2="230" stroke="#78350f" stroke-width="5"/>
                            <line x1="90" y1="165" x2="90" y2="230" stroke="#78350f" stroke-width="4"/>
                            <line x1="147" y1="165" x2="147" y2="230" stroke="#78350f" stroke-width="4"/>
                            <line x1="204" y1="165" x2="204" y2="230" stroke="#78350f" stroke-width="4"/>
                            <!-- Диагональные укосины (Андреевские кресты) -->
                            <line x1="46" y1="165" x2="90" y2="230" stroke="#92400e" stroke-width="2.5"/>
                            <line x1="90" y1="165" x2="46" y2="230" stroke="#92400e" stroke-width="2.5"/>
                            <line x1="204" y1="165" x2="248" y2="230" stroke="#92400e" stroke-width="2.5"/>
                            <line x1="248" y1="165" x2="204" y2="230" stroke="#92400e" stroke-width="2.5"/>

                            <!-- Фигурные деревянные кронштейны-консоли под навесом -->
                            <polygon points="50,231 62,231 50,245" fill="#451a03"/>
                            <polygon points="100,231 112,231 100,245" fill="#451a03"/>
                            <polygon points="182,231 194,231 182,245" fill="#451a03"/>
                            <polygon points="232,231 244,231 232,245" fill="#451a03"/>

                            <!-- Двускатная крыша с черепичной дранкой -->
                            <polygon points="38,168 147,118 256,168" fill="#5c2d16" stroke="#2a1408" stroke-width="2.5"/>
                            <path d="M50,160 L147,122 L244,160" stroke="#854d0e" stroke-width="1.8" fill="none"/>
                            <!-- Слуховое чердачное окошко (дормер) -->
                            <polygon points="130,146 147,132 164,146" fill="#78350f" stroke="#2a1408" stroke-width="1.5"/>
                            <rect x="135" y="146" width="24" height="18" fill="#fef08a" stroke="#451a03" stroke-width="1.5"/>
                            <line x1="147" y1="146" x2="147" y2="164" stroke="#451a03" stroke-width="1"/>
                            <line x1="135" y1="155" x2="159" y2="155" stroke="#451a03" stroke-width="1"/>

                            <!-- Каменный дымоход и клубящийся дым -->
                            <rect x="68" y="112" width="24" height="42" fill="#38332e" stroke="#1c1917" stroke-width="1.8"/>
                            <rect x="65" y="108" width="30" height="6" fill="#57534e" stroke="#1c1917" stroke-width="1"/>
                            <g class="chimney-smoke-stream" transform="translate(80, 104)">
                                <circle cx="0" cy="0" r="5" fill="#e2e8f0" class="smoke-puff puff-1"/>
                                <circle cx="3" cy="-10" r="7.5" fill="#cbd5e1" class="smoke-puff puff-2"/>
                                <circle cx="-2" cy="-22" r="10" fill="#94a3b8" class="smoke-puff puff-3"/>
                                <circle cx="4" cy="-35" r="13" fill="#64748b" class="smoke-puff puff-4"/>
                            </g>

                            <!-- Светящиеся витражные свинцовые окна 2 этажа -->
                            <rect x="104" y="180" width="34" height="30" rx="3" fill="#fef08a" stroke="#78350f" stroke-width="2" class="anim-window-glow"/>
                            <line x1="121" y1="180" x2="121" y2="210" stroke="#78350f" stroke-width="1.5"/>
                            <line x1="104" y1="195" x2="138" y2="195" stroke="#78350f" stroke-width="1.5"/>
                            <!-- Ромбовидный узор переплета -->
                            <polygon points="121,184 133,195 121,206 109,195" fill="none" stroke="#ca8a04" stroke-width="1"/>

                            <rect x="160" y="180" width="34" height="30" rx="3" fill="#fef08a" stroke="#78350f" stroke-width="2" class="anim-window-glow"/>
                            <line x1="177" y1="180" x2="177" y2="210" stroke="#78350f" stroke-width="1.5"/>
                            <line x1="160" y1="195" x2="194" y2="195" stroke="#78350f" stroke-width="1.5"/>
                            <polygon points="177,184 189,195 177,206 165,195" fill="none" stroke="#ca8a04" stroke-width="1"/>

                            <!-- Окно 1 этажа с решеткой и ставнями -->
                            <rect x="66" y="248" width="32" height="28" rx="2" fill="#fef08a" stroke="#451a03" stroke-width="2" class="anim-window-glow"/>
                            <line x1="82" y1="248" x2="82" y2="276" stroke="#451a03" stroke-width="1.5"/>
                            <line x1="66" y1="262" x2="98" y2="262" stroke="#451a03" stroke-width="1.5"/>
                            <!-- Деревянные ставни по бокам -->
                            <rect x="54" y="248" width="10" height="28" fill="#92400e" stroke="#451a03" stroke-width="1.2"/>
                            <rect x="100" y="248" width="10" height="28" fill="#92400e" stroke="#451a03" stroke-width="1.2"/>

                            <!-- Входная дубовая дверь с коваными петлями -->
                            <path d="M125,320 L125,260 Q139,248 153,260 L153,320 Z" fill="#451a03" stroke="#1c0b02" stroke-width="2"/>
                            <path d="M127,268 H151 M127,294 H151" stroke="#292524" stroke-width="2.5"/>
                            <circle cx="147" cy="290" r="2.2" fill="#ca8a04"/>
                            <!-- Фонарь над крыльцом -->
                            <circle cx="139" cy="242" r="14" fill="url(#lampGlow)" class="anim-window-glow"/>
                            <rect x="135" y="240" width="8" height="10" rx="1.5" fill="#fef08a" stroke="#ca8a04" stroke-width="1.2"/>

                            <!-- Деревянное крыльцо и бочки с элем -->
                            <rect x="115" y="318" width="50" height="6" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
                            <!-- Бочки с элем и латунным краном -->
                            <g transform="translate(182, 280)">
                                <ellipse cx="14" cy="26" rx="13" ry="17" fill="#78350f" stroke="#3b1d06" stroke-width="2"/>
                                <line x1="3" y1="18" x2="25" y2="18" stroke="#1c1917" stroke-width="1.8"/>
                                <line x1="3" y1="34" x2="25" y2="34" stroke="#1c1917" stroke-width="1.8"/>
                                <rect x="25" y="24" width="5" height="4" fill="#f59e0b"/>
                            </g>
                            <ellipse cx="218" cy="308" rx="10" ry="13" fill="#92400e" stroke="#451a03" stroke-width="1.8"/>

                            <!-- Кованый кронштейн и покачивающаяся вывеска таверны -->
                            <g class="anim-swaying-sign" transform-origin="100 230">
                                <path d="M100,230 Q112,226 122,230" stroke="#1c1917" stroke-width="2.5" fill="none"/>
                                <line x1="110" y1="229" x2="110" y2="242" stroke="#44403c" stroke-width="1.5"/>
                                <line x1="120" y1="229" x2="120" y2="242" stroke="#44403c" stroke-width="1.5"/>
                                <!-- Деревянная табличка со стилизованной кружкой эля -->
                                <rect x="102" y="242" width="26" height="24" rx="3" fill="#78350f" stroke="#ca8a04" stroke-width="1.5"/>
                                <rect x="108" y="248" width="10" height="12" rx="1.5" fill="#f59e0b" stroke="#92400e" stroke-width="1"/>
                                <path d="M118,251 H121 V257 H118" stroke="#92400e" stroke-width="1.5" fill="none"/>
                                <circle cx="113" cy="247" r="2.5" fill="#fef08a"/>
                            </g>

                            <!-- Табличка названия здания -->
                            <rect x="75" y="328" width="145" height="26" rx="5" fill="#14151c" stroke="#ca8a04" stroke-width="1.8" class="banner-box"/>
                            <text x="147" y="345" text-anchor="middle" class="map-label" fill="#fef08a" font-size="12" font-weight="bold">ТАВЕРНА</text>
                            ${getBuildingQuestMarker('tavern', 147, 316)}
                            </g>
                        </g>

                        <!-- ЗДАНИЕ 3: ЛАВКА ТОРГОВЦА «РЕДКИЕ ТОВАРЫ» (ЮГО-ЗАПАД) -->
                        <g class="town-building" id="building-shop" style="cursor: pointer;">
                            <!-- Тень здания -->
                            <rect x="55" y="385" width="210" height="135" rx="10" fill="#05070a" opacity="0.6"/>

                            <!-- Корпус лавки из полированного палисандра -->
                            <rect x="65" y="380" width="190" height="130" rx="8" fill="#2d1313" stroke="#170707" stroke-width="2.5" class="building-roof"/>

                            <!-- Задняя стена с полками и свитками -->
                            <rect x="75" y="420" width="170" height="85" fill="#1c0d0d" stroke="#3d1e1e" stroke-width="1.5"/>
                            <line x1="75" y1="445" x2="245" y2="445" stroke="#78350f" stroke-width="3"/>
                            <line x1="75" y1="472" x2="245" y2="472" stroke="#78350f" stroke-width="3"/>

                            <!-- Товары на верхних полках: редкие склянки, книги, свитки -->
                            <rect x="85" y="430" width="7" height="14" fill="#38bdf8" rx="1.5" stroke="#0284c7" stroke-width="0.8"/>
                            <rect x="95" y="428" width="8" height="16" fill="#a855f7" rx="1.5" stroke="#7e22ce" stroke-width="0.8"/>
                            <rect x="106" y="432" width="6" height="12" fill="#22c55e" rx="1.5" stroke="#15803d" stroke-width="0.8"/>
                            <!-- Книги в кожаных переплетах -->
                            <rect x="120" y="427" width="6" height="17" fill="#b91c1c"/>
                            <rect x="127" y="429" width="5" height="15" fill="#d97706"/>
                            <rect x="133" y="426" width="7" height="18" fill="#1e3a8a"/>

                            <!-- Восточный шатровый купол лавки с золотым шпилем -->
                            <path d="M85,380 Q160,320 235,380 Z" fill="#881337" stroke="#4c0519" stroke-width="2"/>
                            <path d="M125,360 Q160,328 195,360 Z" fill="#9f1239" opacity="0.7"/>
                            <!-- Золотой шпиль и лунница/полумесяц -->
                            <line x1="160" y1="316" x2="160" y2="340" stroke="#facc15" stroke-width="2.5"/>
                            <circle cx="160" cy="316" r="4" fill="#fde047" stroke="#ca8a04" stroke-width="1.2"/>

                            <!-- Роскошный полосатый фестончатый навес (бордо и золото) -->
                            <path d="M52,380 L268,380 L256,424 L40,424 Z" fill="#991b1b" stroke="#450a0a" stroke-width="2"/>
                            <!-- Золотые полосы тента -->
                            <polygon points="76,380 98,380 90,424 68,424" fill="#facc15"/>
                            <polygon points="120,380 142,380 134,424 112,424" fill="#facc15"/>
                            <polygon points="164,380 186,380 178,424 156,424" fill="#facc15"/>
                            <polygon points="208,380 230,380 222,424 200,424" fill="#facc15"/>
                            <polygon points="250,380 266,380 255,424 242,424" fill="#facc15"/>
                            <!-- Фестоны с кистями по нижнему краю навеса -->
                            <path d="M40,424 Q48,432 56,424 Q64,432 72,424 Q80,432 88,424 Q96,432 104,424 Q112,432 120,424 Q128,432 136,424 Q144,432 152,424 Q160,432 168,424 Q176,432 184,424 Q192,432 200,424 Q208,432 216,424 Q224,432 232,424 Q240,432 248,424 Q256,432 256,424" fill="none" stroke="#facc15" stroke-width="2.5"/>

                            <!-- Витрина и резной деревянный прилавок -->
                            <rect x="68" y="456" width="184" height="48" rx="4" fill="#451a03" stroke="#220b02" stroke-width="2"/>
                            <line x1="68" y1="462" x2="252" y2="462" stroke="#78350f" stroke-width="2.5"/>

                            <!-- Магические зелья и артефакты на прилавке -->
                            <!-- Зелье исцеления (рубин) -->
                            <ellipse cx="88" cy="454" rx="6" ry="8" fill="#ef4444" stroke="#991b1b" stroke-width="1.2"/>
                            <rect x="85" y="443" width="6" height="4" fill="#ca8a04" rx="1"/>
                            <circle cx="86" cy="451" r="1.5" fill="#fecaca"/>
                            <!-- Зелье маны (сапфир) -->
                            <ellipse cx="106" cy="454" rx="6" ry="8" fill="#0284c7" stroke="#0369a1" stroke-width="1.2"/>
                            <rect x="103" y="443" width="6" height="4" fill="#ca8a04" rx="1"/>
                            <circle cx="104" cy="451" r="1.5" fill="#bae6fd"/>
                            <!-- Зелье энергии (изумруд) -->
                            <ellipse cx="124" cy="454" rx="6" ry="8" fill="#10b981" stroke="#047857" stroke-width="1.2"/>
                            <rect x="121" y="443" width="6" height="4" fill="#ca8a04" rx="1"/>
                            <!-- Аптекарские весы из латуни -->
                            <line x1="154" y1="438" x2="154" y2="456" stroke="#facc15" stroke-width="2"/>
                            <line x1="144" y1="441" x2="164" y2="441" stroke="#facc15" stroke-width="1.8"/>
                            <path d="M141,448 Q144,451 147,448 Z" fill="#ca8a04"/>
                            <path d="M161,448 Q164,451 167,448 Z" fill="#ca8a04"/>
                            <!-- Открытый кованый сундучок с сокровищами и монетами -->
                            <rect x="180" y="445" width="22" height="14" rx="2" fill="#78350f" stroke="#ca8a04" stroke-width="1.5"/>
                            <circle cx="187" cy="445" r="3.5" fill="#facc15"/>
                            <circle cx="193" cy="446" r="3.2" fill="#f59e0b"/>
                            <polygon points="196,443 199,447 193,447" fill="#38bdf8"/>
                            <!-- Древний свиток с красной сургучной печатью -->
                            <rect x="214" y="449" width="22" height="7" rx="3.5" fill="#fef08a" stroke="#ca8a04" stroke-width="1"/>
                            <circle cx="225" cy="452.5" r="2.2" fill="#dc2626"/>

                            <!-- Мавританские подвесные лампы по бокам -->
                            <g transform="translate(56, 426)">
                                <circle cx="0" cy="0" r="14" fill="url(#lampGlow)" class="anim-window-glow"/>
                                <polygon points="0,-4 5,5 -5,5" fill="#facc15" stroke="#a16207" stroke-width="1"/>
                                <circle cx="0" cy="8" r="1.5" fill="#fde047"/>
                            </g>
                            <g transform="translate(264, 426)">
                                <circle cx="0" cy="0" r="14" fill="url(#lampGlow)" class="anim-window-glow"/>
                                <polygon points="0,-4 5,5 -5,5" fill="#facc15" stroke="#a16207" stroke-width="1"/>
                                <circle cx="0" cy="8" r="1.5" fill="#fde047"/>
                            </g>

                            <!-- Узорчатый персидский ковер перед прилавком -->
                            <rect x="110" y="504" width="100" height="14" rx="2" fill="#831843" stroke="#be123c" stroke-width="1.5"/>
                            <rect x="115" y="506" width="90" height="10" fill="#9f1239" stroke="#facc15" stroke-width="0.8" stroke-dasharray="6 4"/>

                            <!-- Табличка с названием здания -->
                            <rect x="80" y="518" width="160" height="26" rx="5" fill="#14151c" stroke="#e11d48" stroke-width="1.8" class="banner-box"/>
                            <text x="160" y="535" text-anchor="middle" class="map-label" fill="#fb7185" font-size="12" font-weight="bold">ЛАВКА ТОРГОВЦА</text>
                            ${getBuildingQuestMarker('shop', 160, 506)}
                        </g>

                        <!-- ЗДАНИЕ 4: КУЗНИЦА «ПЛАМЯ ТИТАНА» (СЕВЕРО-ВОСТОК) -->
                        <g class="town-building" id="building-blacksmith" style="cursor: pointer;">
                            <g transform="translate(0, -55)">
                                <!-- Тень здания -->
                                <rect x="704" y="165" width="224" height="165" rx="8" fill="#05070a" opacity="0.6"/>

                                <!-- 1. Главный корпус кузницы из огнеупорного базальта и гранита -->
                                <rect x="712" y="155" width="208" height="165" rx="6" fill="#1c1917" stroke="#0c0a09" stroke-width="2.5" class="building-roof"/>
                                <!-- Каменная кладка и рустовка базальтовых блоков -->
                                <path d="M712,185 H920 M712,215 H920 M712,250 H920 M712,285 H920" stroke="#292524" stroke-width="1.2" stroke-dasharray="14 18"/>
                                <line x1="755" y1="155" x2="755" y2="185" stroke="#292524" stroke-width="1.2"/>
                                <line x1="820" y1="185" x2="820" y2="215" stroke="#292524" stroke-width="1.2"/>
                                <line x1="770" y1="215" x2="770" y2="250" stroke="#292524" stroke-width="1.2"/>

                                <!-- 2. Двускатная сланцевая крыша с кованым коньком -->
                                <polygon points="702,160 816,108 930,160" fill="#2d2926" stroke="#171412" stroke-width="2.5"/>
                                <path d="M716,155 L816,114 L916,155" stroke="#44403c" stroke-width="1.8" fill="none"/>
                                <!-- Кованый стальной флюгер в форме молота на коньке -->
                                <line x1="816" y1="92" x2="816" y2="110" stroke="#ca8a04" stroke-width="2"/>
                                <polygon points="816,92 826,88 826,96" fill="#facc15"/>
                                <rect x="808" y="90" width="8" height="4" fill="#94a3b8" rx="0.5"/>

                                <!-- 3. Монументальный каменный дымоход с огненным жаром и искрами -->
                                <rect x="860" y="82" width="34" height="78" fill="#262220" stroke="#0c0a09" stroke-width="2"/>
                                <rect x="856" y="76" width="42" height="9" fill="#44403c" stroke="#0c0a09" stroke-width="1.5"/>
                                <!-- Внутреннее зарево жерла дымохода -->
                                <ellipse cx="877" cy="76" rx="16" ry="4" fill="#ea580c"/>
                                <ellipse cx="877" cy="76" rx="10" ry="2" fill="#fef08a"/>
                                <!-- Столб горячего дыма -->
                                <g class="chimney-smoke-stream" transform="translate(877, 70)">
                                    <circle cx="0" cy="0" r="6" fill="#334155" class="smoke-puff puff-1"/>
                                    <circle cx="4" cy="-12" r="9" fill="#1e293b" class="smoke-puff puff-2"/>
                                    <circle cx="-3" cy="-26" r="12" fill="#0f172a" class="smoke-puff puff-3"/>
                                    <circle cx="5" cy="-42" r="15" fill="#334155" class="smoke-puff puff-4"/>
                                </g>
                                <!-- Вырывающиеся раскаленные искры -->
                                <g class="forge-sparks-group" transform="translate(877, 68)">
                                    <circle cx="0" cy="0" r="2.2" fill="#fef08a" class="forge-spark spark-1"/>
                                    <circle cx="6" cy="-8" r="2.0" fill="#f97316" class="forge-spark spark-2"/>
                                    <circle cx="-7" cy="-14" r="1.8" fill="#facc15" class="forge-spark spark-3"/>
                                    <circle cx="4" cy="-22" r="2.2" fill="#ef4444" class="forge-spark spark-4"/>
                                    <circle cx="-2" cy="-30" r="1.5" fill="#fef08a" class="forge-spark spark-5"/>
                                </g>

                                <!-- 4. Открытый рабочий навес кузницы (слева) с мощными дубовыми столбами -->
                                <rect x="716" y="195" width="94" height="120" fill="#14110e" stroke="#292524" stroke-width="1.5"/>
                                <!-- Опорные дубовые балки навеса -->
                                <rect x="716" y="195" width="8" height="120" fill="#451a03" stroke="#1f0c02" stroke-width="1.2"/>
                                <rect x="802" y="195" width="8" height="120" fill="#451a03" stroke="#1f0c02" stroke-width="1.2"/>
                                <rect x="716" y="195" width="94" height="10" fill="#5c2405" stroke="#1f0c02" stroke-width="1.2"/>

                                <!-- ПЫЛАЮЩИЙ ГОРН В СТЕНЕ НАВЕСА -->
                                <path d="M728,275 L728,215 Q755,198 782,215 L782,275 Z" fill="#0c0a09" stroke="#78350f" stroke-width="2"/>
                                <!-- Сияние жара горна -->
                                <circle cx="755" cy="245" r="38" fill="url(#forgeGlow)" class="anim-forge-glow"/>
                                <!-- Кокс и горящие угли в очаге -->
                                <ellipse cx="755" cy="265" rx="24" ry="8" fill="#450a0a"/>
                                <!-- Языки пламени в горне -->
                                <path d="M738,268 Q755,212 772,268 Z" fill="#ea580c" class="anim-forge-flame flame-outer"/>
                                <path d="M744,268 Q755,225 766,268 Z" fill="#f97316" class="anim-forge-flame flame-mid"/>
                                <path d="M749,268 Q755,236 761,268 Z" fill="#fef08a" class="anim-forge-flame flame-core"/>
                                <!-- Кузнечные мехи на стене горна -->
                                <path d="M784,232 L798,240 L784,248 Z" fill="#78350f" stroke="#3b1d06" stroke-width="1.2"/>

                                <!-- 5. ТЯЖЕЛАЯ НАКОВАЛЬНЯ НА КОЛОДЕ ПЕРЕД ГОРНОМ -->
                                <g transform="translate(738, 260)">
                                    <!-- Массивная дубовая колода со стальными обручами -->
                                    <rect x="10" y="24" width="28" height="28" rx="3" fill="#451a03" stroke="#1f0c02" stroke-width="1.8"/>
                                    <line x1="10" y1="32" x2="38" y2="32" stroke="#334155" stroke-width="1.5"/>
                                    <line x1="10" y1="44" x2="38" y2="44" stroke="#334155" stroke-width="1.5"/>

                                    <!-- Литая стальная наковальня -->
                                    <path d="M2,10 L46,10 L38,24 L10,24 Z" fill="#64748b" stroke="#1e293b" stroke-width="2"/>
                                    <!-- Заостренный конусный рог наковальни -->
                                    <path d="M2,10 Q-8,14 -2,19 L10,19 Z" fill="#475569" stroke="#1e293b" stroke-width="1.2"/>
                                    <!-- Хвост наковальни со ступенчатым срезом -->
                                    <rect x="42" y="10" width="8" height="6" fill="#475569" stroke="#1e293b" stroke-width="1"/>

                                    <!-- Раскаленная докрасна заготовка клинка на наковальне -->
                                    <rect x="12" y="7" width="22" height="4" rx="1" fill="#fef08a" stroke="#ef4444" stroke-width="0.8" class="anim-forge-glow"/>
                                    <!-- Кузнечный молот на наковальне -->
                                    <line x1="32" y1="2" x2="44" y2="16" stroke="#92400e" stroke-width="2.5"/>
                                    <rect x="28" y="-1" width="8" height="6" rx="1" fill="#334155" stroke="#0f172a" stroke-width="1"/>
                                </g>

                                <!-- 6. ЧАН С ВОДОЙ ДЛЯ ЗАКАЛКИ (СЛЕВА) -->
                                <g transform="translate(712, 290)">
                                    <ellipse cx="14" cy="18" rx="13" ry="8" fill="#1e293b" stroke="#0f172a" stroke-width="1.8"/>
                                    <ellipse cx="14" cy="16" rx="10" ry="6" fill="#0284c7" opacity="0.85"/>
                                    <!-- Струйки пара над чаном с водой -->
                                    <path d="M10,12 Q14,4 18,12" stroke="#e0f2fe" stroke-width="1.2" fill="none" opacity="0.7"/>
                                    <path d="M14,8 Q18,0 22,8" stroke="#ffffff" stroke-width="1" fill="none" opacity="0.5"/>
                                </g>

                                <!-- 7. ПРАВАЯ ЧАСТЬ КУЗНИЦЫ: ВХОД И ОРУЖЕЙНАЯ ВИТРИНА -->
                                <!-- Дубовая обитая железом дверь мастера -->
                                <path d="M830,315 L830,248 Q845,236 860,248 L860,315 Z" fill="#2e1405" stroke="#120601" stroke-width="2"/>
                                <line x1="830" y1="262" x2="860" y2="262" stroke="#334155" stroke-width="2.5"/>
                                <line x1="830" y1="292" x2="860" y2="292" stroke="#334155" stroke-width="2.5"/>
                                <circle cx="854" cy="285" r="2.5" fill="#f59e0b"/>

                                <!-- Подвесной кованый фонарь над входом -->
                                <circle cx="845" cy="230" r="16" fill="url(#lampGlow)" class="anim-window-glow"/>
                                <rect x="841" y="226" width="8" height="10" rx="1.5" fill="#fef08a" stroke="#ca8a04" stroke-width="1.2"/>

                                <!-- Стойка с выкованным оружием у стены -->
                                <g transform="translate(868, 230)">
                                    <rect x="0" y="10" width="44" height="65" rx="3" fill="#3b1d0e" stroke="#1c0a03" stroke-width="1.8"/>
                                    <!-- Меч правосудия с сияющим лезвием -->
                                    <line x1="12" y1="0" x2="12" y2="65" stroke="#f8fafc" stroke-width="3"/>
                                    <line x1="6" y1="14" x2="18" y2="14" stroke="#ca8a04" stroke-width="2"/>
                                    <circle cx="12" cy="1" r="2" fill="#ca8a04"/>
                                    <!-- Боевая двуручная секира -->
                                    <line x1="26" y1="-4" x2="26" y2="65" stroke="#78350f" stroke-width="2.5"/>
                                    <path d="M26,4 Q38,-2 36,16 Q26,10 26,10 Z" fill="#94a3b8" stroke="#334155" stroke-width="1.2"/>
                                    <path d="M26,4 Q14,-2 16,16 Q26,10 26,10 Z" fill="#64748b" stroke="#334155" stroke-width="1.2"/>
                                    <!-- Рыцарский гербовый щит на стойке -->
                                    <path d="M18,35 L38,35 L36,52 Q28,62 28,62 Q28,62 20,52 Z" fill="#b91c1c" stroke="#facc15" stroke-width="1.5"/>
                                    <circle cx="28" cy="46" r="3" fill="#facc15"/>
                                </g>

                                <!-- Вывеска кузницы на кованом кронштейне -->
                                <g class="anim-swaying-sign" transform-origin="720 185">
                                    <line x1="710" y1="185" x2="728" y2="185" stroke="#1c1917" stroke-width="3"/>
                                    <line x1="715" y1="185" x2="715" y2="196" stroke="#44403c" stroke-width="1.5"/>
                                    <line x1="724" y1="185" x2="724" y2="196" stroke="#44403c" stroke-width="1.5"/>
                                    <!-- Вывеска: наковальня и скрещенные молоты -->
                                    <rect x="708" y="196" width="24" height="22" rx="3" fill="#292524" stroke="#ea580c" stroke-width="1.5"/>
                                    <path d="M713,208 L727,208 L724,213 L716,213 Z" fill="#facc15"/>
                                    <line x1="712" y1="202" x2="724" y2="212" stroke="#ea580c" stroke-width="1.5"/>
                                    <line x1="724" y1="202" x2="712" y2="212" stroke="#ea580c" stroke-width="1.5"/>
                                </g>

                                <!-- Табличка с названием здания -->
                                <rect x="740" y="328" width="145" height="26" rx="5" fill="#14151c" stroke="#ea580c" stroke-width="1.8" class="banner-box"/>
                                <text x="812" y="345" text-anchor="middle" class="map-label" fill="#fb923c" font-size="12" font-weight="bold">КУЗНИЦА</text>
                                ${getBuildingQuestMarker('blacksmith', 812, 316)}
                            </g>
                        </g>

                        <!-- ЗДАНИЕ 5: ХРАМ СВЕТА (ЮГО-ВОСТОК) -->
                        <g class="town-building" id="building-temple" style="cursor: pointer;">
                            <!-- Тень собора -->
                            <rect x="696" y="380" width="214" height="145" rx="10" fill="#05070a" opacity="0.6"/>

                            <!-- Корпус храма из белого и светло-серого резного мрамора -->
                            <rect x="705" y="370" width="195" height="140" rx="8" fill="#334155" stroke="#1e293b" stroke-width="2.5" class="building-roof"/>
                            <!-- Рустика и аркатурный поясок мраморного фасада -->
                            <path d="M705,400 H900 M705,435 H900 M705,470 H900" stroke="#475569" stroke-width="1.2" stroke-dasharray="16 20"/>
                            <!-- Аркатурный карниз под крышей -->
                            <path d="M710,396 Q716,390 722,396 Q728,390 734,396 Q740,390 746,396 Q752,390 758,396 Q764,390 770,396 Q776,390 782,396 Q788,390 794,396 Q800,390 806,396 Q812,390 818,396 Q824,390 830,396 Q836,390 842,396 Q848,390 854,396 Q860,390 866,396 Q872,390 878,396 Q884,390 890,396" fill="none" stroke="#64748b" stroke-width="1.5"/>

                            <!-- Лазурная готическая остроконечная крыша -->
                            <polygon points="698,375 802,320 906,375" fill="#1e3a8a" stroke="#0f172a" stroke-width="2.5"/>
                            <path d="M710,370 L802,326 L894,370" stroke="#3b82f6" stroke-width="1.5" fill="none"/>

                            <!-- Левая башня со шпилем и пинаклями -->
                            <rect x="696" y="330" width="34" height="110" rx="2" fill="#475569" stroke="#1e293b" stroke-width="1.8"/>
                            <polygon points="692,330 713,275 734,330" fill="#1d4ed8" stroke="#1e3a8a" stroke-width="1.5"/>
                            <line x1="713" y1="262" x2="713" y2="275" stroke="#facc15" stroke-width="2"/>
                            <circle cx="713" cy="262" r="2.5" fill="#fef08a"/>
                            <!-- Стрельчатые окна башни -->
                            <path d="M708,355 L708,340 Q713,334 718,340 L718,355 Z" fill="#fef08a" stroke="#ca8a04" stroke-width="1" class="anim-window-glow"/>

                            <!-- Правая башня со шпилем и пинаклями -->
                            <rect x="874" y="330" width="34" height="110" rx="2" fill="#475569" stroke="#1e293b" stroke-width="1.8"/>
                            <polygon points="870,330 891,275 912,330" fill="#1d4ed8" stroke="#1e3a8a" stroke-width="1.5"/>
                            <line x1="891" y1="262" x2="891" y2="275" stroke="#facc15" stroke-width="2"/>
                            <circle cx="891" cy="262" r="2.5" fill="#fef08a"/>
                            <!-- Стрельчатые окна башни -->
                            <path d="M886,355 L886,340 Q891,334 896,340 L896,355 Z" fill="#fef08a" stroke="#ca8a04" stroke-width="1" class="anim-window-glow"/>

                            <!-- Центральная колокольня с золотым крестом -->
                            <rect x="784" y="285" width="36" height="42" fill="#334155" stroke="#1e293b" stroke-width="1.5"/>
                            <polygon points="780,285 802,238 824,285" fill="#2563eb" stroke="#1d4ed8" stroke-width="1.8"/>
                            <line x1="802" y1="222" x2="802" y2="238" stroke="#facc15" stroke-width="2.5"/>
                            <line x1="795" y1="229" x2="809" y2="229" stroke="#facc15" stroke-width="2.5"/>

                            <!-- Величественная готическая Роза (Rosace) с сапфирово-золотым витражом -->
                            <circle cx="802" cy="425" r="36" fill="url(#templeGlow)" class="anim-temple-glow"/>
                            <!-- Ниспадающий конус священного божественного света -->
                            <polygon points="802,425 730,515 874,515" fill="url(#templeGlow)" opacity="0.3" class="anim-temple-beam"/>

                            <!-- Внешний мраморный обод розы -->
                            <circle cx="802" cy="425" r="22" fill="#1e1b4b" stroke="#38bdf8" stroke-width="3"/>
                            <circle cx="802" cy="425" r="14" fill="#0284c7" stroke="#facc15" stroke-width="1.8"/>
                            <circle cx="802" cy="425" r="6" fill="#fef08a"/>
                            <!-- 12 радиальных лучей витража -->
                            <line x1="802" y1="403" x2="802" y2="447" stroke="#facc15" stroke-width="1.5"/>
                            <line x1="780" y1="425" x2="824" y2="425" stroke="#facc15" stroke-width="1.5"/>
                            <line x1="786" y1="409" x2="818" y2="441" stroke="#facc15" stroke-width="1.5"/>
                            <line x1="786" y1="441" x2="818" y2="409" stroke="#facc15" stroke-width="1.5"/>

                            <!-- Боковые высокие стрельчатые витражные окна собора -->
                            <path d="M744,465 L744,435 Q750,422 756,435 L756,465 Z" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5"/>
                            <line x1="750" y1="428" x2="750" y2="465" stroke="#facc15" stroke-width="1"/>
                            <path d="M848,465 L848,435 Q854,422 860,435 L860,465 Z" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5"/>
                            <line x1="854" y1="428" x2="854" y2="465" stroke="#facc15" stroke-width="1"/>

                            <!-- Главный стрельчатый портал с мраморными ступенями -->
                            <path d="M776,512 L776,468 Q802,448 828,468 L828,512 Z" fill="#0f172a" stroke="#ca8a04" stroke-width="2.5"/>
                            <!-- Золоченые двустворчатые врата храма -->
                            <path d="M782,510 L782,474 Q802,458 822,474 L822,510 Z" fill="#451a03" stroke="#b45309" stroke-width="1.5"/>
                            <line x1="802" y1="464" x2="802" y2="510" stroke="#ca8a04" stroke-width="2"/>
                            <!-- Ступени белого мрамора перед входом -->
                            <rect x="768" y="508" width="68" height="5" rx="1.5" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1"/>
                            <rect x="762" y="512" width="80" height="5" rx="1.5" fill="#94a3b8" stroke="#64748b" stroke-width="1"/>

                            <!-- Табличка с названием здания -->
                            <rect x="730" y="518" width="145" height="26" rx="5" fill="#14151c" stroke="#38bdf8" stroke-width="1.8" class="banner-box"/>
                            <text x="802" y="535" text-anchor="middle" class="map-label" fill="#7dd3fc" font-size="12" font-weight="bold">ХРАМ СВЕТА</text>
                            ${getBuildingQuestMarker('temple', 802, 506)}
                        </g>

                        <!-- ВЫХОД: ЮЖНЫЙ ТРАКТ (ЮГ) СО СТРАЖНИКАМИ -->
                        <g class="south-exit-group" id="town-south-exit" style="cursor: pointer;">
                            <!-- Каменные пилоны ворот -->
                            <rect x="424" y="488" width="18" height="42" rx="2" fill="#334155" stroke="#1e293b" stroke-width="1.5"/>
                            <rect x="422" y="484" width="22" height="6" rx="1" fill="#475569" stroke="#1e293b" stroke-width="1"/>
                            <rect x="518" y="488" width="18" height="42" rx="2" fill="#334155" stroke="#1e293b" stroke-width="1.5"/>
                            <rect x="516" y="484" width="22" height="6" rx="1" fill="#475569" stroke="#1e293b" stroke-width="1"/>

                            <!-- Арка ворот и кованая решетка -->
                            <path d="M442,500 Q480,482 518,500 L518,534 L442,534 Z" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>
                            <line x1="456" y1="492" x2="456" y2="534" stroke="#64748b" stroke-width="1.2"/>
                            <line x1="480" y1="486" x2="480" y2="534" stroke="#64748b" stroke-width="1.5"/>
                            <line x1="504" y1="492" x2="504" y2="534" stroke="#64748b" stroke-width="1.2"/>
                            <line x1="442" y1="510" x2="518" y2="510" stroke="#64748b" stroke-width="1.2"/>
                            <line x1="442" y1="522" x2="518" y2="522" stroke="#64748b" stroke-width="1.2"/>

                            <!-- Фигурка левого стражника (Капитан Варран с алебардой) -->
                            <g transform="translate(412, 492)">
                                <ellipse cx="8" cy="38" rx="8" ry="3" fill="#000000" opacity="0.4"/>
                                <rect x="5" y="16" width="6" height="18" rx="1" fill="#475569" stroke="#1e293b" stroke-width="0.8"/>
                                <path d="M3,16 L13,16 L14,32 L2,32 Z" fill="#1e3a8a"/>
                                <circle cx="8" cy="11" r="5" fill="#cbd5e1" stroke="#1e293b" stroke-width="0.8"/>
                                <line x1="16" y1="2" x2="16" y2="38" stroke="#78350f" stroke-width="1.5"/>
                                <polygon points="16,2 14,-4 18,-4" fill="#cbd5e1"/>
                                <path d="M16,4 Q21,0 20,8 Q17,6 16,6 Z" fill="#cbd5e1"/>
                            </g>

                            <!-- Фигурка правого стражника (Часовой Бран со щитом) -->
                            <g transform="translate(534, 492)">
                                <ellipse cx="8" cy="38" rx="8" ry="3" fill="#000000" opacity="0.4"/>
                                <rect x="5" y="16" width="6" height="18" rx="1" fill="#475569" stroke="#1e293b" stroke-width="0.8"/>
                                <circle cx="8" cy="11" r="5" fill="#cbd5e1" stroke="#1e293b" stroke-width="0.8"/>
                                <path d="M-1,16 L7,16 L6,28 Q3,33 3,33 Q3,33 0,28 Z" fill="#1e3a8a" stroke="#facc15" stroke-width="1"/>
                                <line x1="13" y1="18" x2="13" y2="34" stroke="#cbd5e1" stroke-width="1.2"/>
                            </g>

                            <!-- Табличка "Южный тракт" -->
                            <rect x="415" y="530" width="130" height="26" rx="5" fill="#14151c" stroke="#ca8a04" stroke-width="2" class="banner-box"/>
                            <path d="M472,546 L480,553 L488,546" stroke="#facc15" stroke-width="2" fill="none" stroke-linecap="round"/>
                            <text x="480" y="542" text-anchor="middle" class="map-label" fill="#facc15" font-size="11.5" font-weight="bold" letter-spacing="1">ЮЖНЫЙ ТРАКТ</text>
                            ${getBuildingQuestMarker('southRoad', 480, 516)}
                        </g>

                        <!-- АМБИЕНТ: ЛЕТАЮЩИЕ СВЕТЛЯЧКИ НАД ПЛОЩАДЬЮ -->
                        <g id="town-ambient-fireflies" pointer-events="none">
                            <circle cx="380" cy="340" r="2.5" fill="#fef08a" class="ambient-firefly firefly-1"/>
                            <circle cx="580" cy="320" r="2" fill="#a7f3d0" class="ambient-firefly firefly-2"/>
                            <circle cx="450" cy="420" r="2.8" fill="#fef08a" class="ambient-firefly firefly-3"/>
                            <circle cx="520" cy="220" r="2" fill="#fde047" class="ambient-firefly firefly-4"/>
                            <circle cx="410" cy="250" r="2.4" fill="#a7f3d0" class="ambient-firefly firefly-5"/>
                            <circle cx="550" cy="440" r="2.2" fill="#fef08a" class="ambient-firefly firefly-6"/>
                            <circle cx="340" cy="280" r="1.8" fill="#fde047" class="ambient-firefly firefly-7"/>
                            <circle cx="620" cy="390" r="2" fill="#a7f3d0" class="ambient-firefly firefly-8"/>
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
                onBack: () => this.render(this.container)
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

        this.container.querySelector('#building-blacksmith').addEventListener('click', () => {
            sound.playSfx('click');
            const screen = new BlacksmithScreen(this.player, {
                onBack: () => this.render(this.container)
            });
            screen.render(this.container);
        });

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