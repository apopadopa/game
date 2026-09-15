import { sound } from '../../audio/audioEngine.js';
import { townTheme } from '../../audio/music/townTheme.js';
import { southRoadTheme } from '../../audio/music/southRoadTheme.js';
import { CharacterRenderer } from '../../visuals/characterRenderer.js';
import { NpcRenderer, NPC_CONFIGS } from '../../visuals/npcRenderer.js';
import { Icons } from '../../visuals/icons.js';
import { QuestSystem } from '../../services/questSystem.js';
import { QuestRenderer } from '../../ui/questRenderer.js';
import { SaveSystem } from '../../services/saveSystem.js';

export class SouthRoadScreen {
    constructor(player, callbacks = {}) {
        this.player = player;
        this.callbacks = callbacks;
        this.selectedNpcId = 'varran'; // 'varran' | 'bran' | 'gate'
        this.activeSubTab = 'dialog';  // 'dialog' | 'quests'
        this.dialogState = null;        // custom sub-dialogue if selected
        this.isGateAnimating = false;

        sound.switchMusic(southRoadTheme, 1.2);
    }

    render(container) {
        this.container = container;
        const isGateOpen = !!this.player.hasOpenedSouthGates;
        const canOpenGate = !!this.player.hasDefeatedFinalBoss && !!this.player.hasViewedAbyssEnding && !isGateOpen;

        container.innerHTML = `
            <div class="interior-screen south-road-screen">
                <!-- ВЕРХНЯЯ ПАНЕЛЬ ЛОКАЦИИ -->
                <div class="interior-top-bar">
                    <div class="loc-character-badge">
                        <div class="hud-avatar-frame">${CharacterRenderer.renderBust(this.player.visuals, this.player.classId, this.player.equipment)}</div>
                        <div class="loc-player-meta">
                            <span class="loc-player-name">${this.player.name}</span>
                            <span class="loc-gold">${Icons.coin(14)} <strong id="loc-gold-val">${this.player.gold}</strong></span>
                        </div>
                    </div>
                    <div class="interior-title-wrap">
                        <h2>Застава Южного Тракта</h2>
                        <span class="interior-subtitle">Укреплённый пограничный форпост. Гарнизон южного дозора и путь во внешний мир</span>
                    </div>
                    <button class="btn btn-secondary" id="btn-leave-south-road">${Icons.arrowLeft(13)} На площадь города</button>
                </div>

                <!-- ОСНОВНАЯ СЦЕНА -->
                <div class="interior-stage">
                    <div class="interior-scene-box">
                        <svg viewBox="0 0 520 400" class="south-road-scene-svg" width="100%" height="100%">
                            <defs>
                                <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stop-color="#1e3a8a"/>
                                    <stop offset="35%" stop-color="#0284c7"/>
                                    <stop offset="65%" stop-color="#38bdf8"/>
                                    <stop offset="100%" stop-color="#bae6fd"/>
                                </linearGradient>

                                <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stop-color="#fef08a" stop-opacity="0.95"/>
                                    <stop offset="40%" stop-color="#f59e0b" stop-opacity="0.5"/>
                                    <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
                                </radialGradient>

                                <radialGradient id="fireGlow" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stop-color="#fef08a" stop-opacity="0.95"/>
                                    <stop offset="35%" stop-color="#f97316" stop-opacity="0.7"/>
                                    <stop offset="70%" stop-color="#ea580c" stop-opacity="0.3"/>
                                    <stop offset="100%" stop-color="#c2410c" stop-opacity="0"/>
                                </radialGradient>

                                <linearGradient id="palisadeWood" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stop-color="#3b1d06"/>
                                    <stop offset="50%" stop-color="#5a2f10"/>
                                    <stop offset="100%" stop-color="#2a1403"/>
                                </linearGradient>

                                <linearGradient id="gateHeavyWood" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stop-color="#2a1a10"/>
                                    <stop offset="50%" stop-color="#452718"/>
                                    <stop offset="100%" stop-color="#1a0f08"/>
                                </linearGradient>

                                <linearGradient id="stoneWallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stop-color="#475569"/>
                                    <stop offset="50%" stop-color="#334155"/>
                                    <stop offset="100%" stop-color="#1e293b"/>
                                </linearGradient>

                                <filter id="sceneGlow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feDropShadow dx="0" dy="2" stdDeviation="6" flood-color="#38bdf8" flood-opacity="0.8"/>
                                </filter>

                                <filter id="goldAura" x="-20%" y="-20%" width="140%" height="140%">
                                    <feDropShadow dx="0" dy="2" stdDeviation="6" flood-color="#f59e0b" flood-opacity="0.8"/>
                                </filter>
                            </defs>

                            <!-- 1. НЕБО, СОЛНЦЕ И ГОРЫ ВДАЛИ -->
                            <rect width="520" height="400" fill="url(#skyGrad)"/>
                            <circle cx="260" cy="85" r="80" fill="url(#sunGlow)"/>

                            <!-- Плывущие облака -->
                            <ellipse cx="90" cy="55" rx="45" ry="14" fill="#ffffff" opacity="0.65"/>
                            <ellipse cx="125" cy="50" rx="35" ry="12" fill="#ffffff" opacity="0.6"/>
                            <ellipse cx="410" cy="65" rx="55" ry="15" fill="#ffffff" opacity="0.55"/>
                            <ellipse cx="445" cy="60" rx="35" ry="13" fill="#ffffff" opacity="0.5"/>

                            <!-- Дальние горные хребты со снежными шапками -->
                            <polygon points="10,180 80,105 150,180" fill="#93c5fd" opacity="0.55"/>
                            <polygon points="70,118 80,105 90,118 80,123" fill="#f8fafc"/>
                            <polygon points="110,180 185,90 260,180" fill="#60a5fa" opacity="0.5"/>
                            <polygon points="172,105 185,90 198,105 185,112" fill="#f8fafc"/>
                            <polygon points="260,180 340,95 420,180" fill="#93c5fd" opacity="0.55"/>
                            <polygon points="328,109 340,95 352,109 340,116" fill="#f8fafc"/>
                            <polygon points="380,180 455,110 530,180" fill="#60a5fa" opacity="0.5"/>
                            <polygon points="444,122 455,110 466,122 455,128" fill="#f8fafc"/>

                            <!-- Хвойный зеленый лес на предгорьях -->
                            <path d="M0,175 Q130,140 260,165 Q390,140 520,175 L520,240 L0,240 Z" fill="#14532d"/>
                            <!-- Силуэты вековых сосен вдоль горизонта -->
                            <polygon points="30,170 36,150 42,170" fill="#0f3c20"/>
                            <polygon points="55,168 62,145 69,168" fill="#0b2e18"/>
                            <polygon points="120,165 127,142 134,165" fill="#0f3c20"/>
                            <polygon points="390,166 397,144 404,166" fill="#0f3c20"/>
                            <polygon points="470,168 478,146 486,168" fill="#0b2e18"/>

                            <!-- Земляная равнина и холмы перед заставой -->
                            <path d="M0,195 Q140,175 260,190 Q380,175 520,195 L520,400 L0,400 Z" fill="#22421f"/>
                            <path d="M0,230 Q160,205 260,225 Q360,205 520,230 L520,400 L0,400 Z" fill="#1a3518"/>

                            <!-- 2. ЮЖНЫЙ ТРАКТ (ГРУНТОВАЯ ДОРОГА, ВЫХОДЯЩАЯ ИЗ ВОРОТ) -->
                            <polygon points="220,190 300,190 380,400 140,400" fill="#a1885f"/>
                            <polygon points="235,190 285,190 350,400 170,400" fill="#8c734b"/>
                            <!-- Колеи от телег и гравий -->
                            <path d="M245,195 Q250,280 205,400" stroke="#715c3a" stroke-width="3" fill="none"/>
                            <path d="M275,195 Q270,280 315,400" stroke="#715c3a" stroke-width="3" fill="none"/>
                            <circle cx="225" cy="330" r="3" fill="#604f32"/>
                            <circle cx="280" cy="360" r="4" fill="#604f32"/>
                            <circle cx="260" cy="270" r="2.5" fill="#604f32"/>

                            <!-- 3. БРЕВЕНЧАТЫЙ ЧАСТОКОЛ И КАМЕННЫЕ ОПОРЫ ВОРОТ -->
                            <!-- Левый частокол -->
                            <g id="left-palisade">
                                <rect x="0" y="140" width="170" height="150" fill="url(#palisadeWood)" stroke="#1a0b02" stroke-width="2"/>
                                <!-- Заостренные бревенчатые зубья частокола -->
                                <path d="M0,140 L10,120 L20,140 L30,120 L40,140 L50,120 L60,140 L70,120 L80,140 L90,120 L100,140 L110,120 L120,140 L130,120 L140,140 L150,120 L160,140 L170,120 L170,140" fill="#45230c" stroke="#1a0b02" stroke-width="1.5"/>
                                <!-- Горизонтальные брусья крепежа -->
                                <line x1="0" y1="165" x2="170" y2="165" stroke="#1c0f05" stroke-width="5"/>
                                <line x1="0" y1="215" x2="170" y2="215" stroke="#1c0f05" stroke-width="5"/>
                            </g>

                            <!-- Правый частокол -->
                            <g id="right-palisade">
                                <rect x="350" y="140" width="170" height="150" fill="url(#palisadeWood)" stroke="#1a0b02" stroke-width="2"/>
                                <!-- Зубья -->
                                <path d="M350,140 L360,120 L370,140 L380,120 L390,140 L400,120 L410,140 L420,120 L430,140 L440,120 L450,140 L460,120 L470,140 L480,120 L490,140 L500,120 L510,140 L520,120 L520,140" fill="#45230c" stroke="#1a0b02" stroke-width="1.5"/>
                                <!-- Горизонтальные брусья крепежа -->
                                <line x1="350" y1="165" x2="520" y2="165" stroke="#1c0f05" stroke-width="5"/>
                                <line x1="350" y1="215" x2="520" y2="215" stroke="#1c0f05" stroke-width="5"/>
                            </g>

                            <!-- ДОЗОРНАЯ ВЫШКА СЛЕВА -->
                            <g transform="translate(18, 55)" id="guard-watchtower">
                                <!-- Опорные бревна вышки -->
                                <line x1="10" y1="95" x2="20" y2="10" stroke="#3b1d06" stroke-width="4"/>
                                <line x1="70" y1="95" x2="60" y2="10" stroke="#3b1d06" stroke-width="4"/>
                                <line x1="15" y1="50" x2="65" y2="50" stroke="#45230c" stroke-width="3"/>
                                <line x1="10" y1="95" x2="60" y2="10" stroke="#3b1d06" stroke-width="2" opacity="0.6"/>
                                <line x1="70" y1="95" x2="20" y2="10" stroke="#3b1d06" stroke-width="2" opacity="0.6"/>
                                <!-- Помост дозорного -->
                                <rect x="12" y="8" width="56" height="14" rx="2" fill="#5a2f10" stroke="#1a0b02" stroke-width="2"/>
                                <!-- Перила помоста -->
                                <rect x="10" y="-8" width="60" height="16" fill="none" stroke="#78350f" stroke-width="2.5"/>
                                <line x1="25" y1="-8" x2="25" y2="8" stroke="#78350f" stroke-width="2"/>
                                <line x1="40" y1="-8" x2="40" y2="8" stroke="#78350f" stroke-width="2"/>
                                <line x1="55" y1="-8" x2="55" y2="8" stroke="#78350f" stroke-width="2"/>
                                <!-- Коническая крыша вышки -->
                                <polygon points="5,-8 40,-32 75,-8" fill="#7f1d1d" stroke="#450a0a" stroke-width="2"/>
                                <!-- Флагшток и королевский вымпел -->
                                <line x1="40" y1="-32" x2="40" y2="-52" stroke="#d97706" stroke-width="2.5"/>
                                <polygon points="40,-52 68,-44 40,-36" fill="#1e3a8a" stroke="#ca8a04" stroke-width="1.2"/>
                                <polygon points="40,-50 58,-44 40,-38" fill="#facc15"/>
                                <!-- Фонарь на вышке -->
                                <circle cx="16" cy="18" r="10" fill="url(#sunGlow)"/>
                                <rect x="14" y="14" width="4" height="7" rx="1" fill="#fef08a" stroke="#ca8a04" stroke-width="0.8"/>
                            </g>

                            <!-- КАМЕННЫЕ ПИЛОНЫ И АРКА ВРАТ -->
                            <!-- Левый пилон -->
                            <rect x="160" y="110" width="40" height="180" rx="3" fill="url(#stoneWallGrad)" stroke="#0f172a" stroke-width="2.5"/>
                            <rect x="156" y="102" width="48" height="12" rx="2" fill="#475569" stroke="#0f172a" stroke-width="2"/>
                            <!-- Правый пилон -->
                            <rect x="320" y="110" width="40" height="180" rx="3" fill="url(#stoneWallGrad)" stroke="#0f172a" stroke-width="2.5"/>
                            <rect x="316" y="102" width="48" height="12" rx="2" fill="#475569" stroke="#0f172a" stroke-width="2"/>
                            <!-- Каменная перемычка-арка -->
                            <path d="M190,130 Q260,95 330,130 L330,105 Q260,70 190,105 Z" fill="url(#stoneWallGrad)" stroke="#0f172a" stroke-width="2.5"/>
                            <path d="M195,128 Q260,98 325,128" stroke="#ca8a04" stroke-width="2" fill="none"/>

                            <!-- Гербовый щит с золотым львом над вратами -->
                            <g transform="translate(260, 92)">
                                <path d="M-14,-14 L14,-14 L14,4 Q14,16 0,22 Q-14,16 -14,4 Z" fill="#1e3a8a" stroke="#facc15" stroke-width="2"/>
                                <polygon points="0,-8 6,-2 0,6 -6,-2" fill="#facc15"/>
                                <circle cx="0" cy="-2" r="2.5" fill="#b45309"/>
                            </g>

                            <!-- 4. СТВОРЫ ВРАТ (ЗАКРЫТЫ ИЛИ ОТКРЫТЫ) -->
                            <g id="scene-gate" style="cursor: pointer;" class="${this.selectedNpcId === 'gate' ? 'selected-interactive' : ''}" title="Южные Врата">
                                ${this.selectedNpcId === 'gate' ? '<ellipse cx="260" cy="245" rx="65" ry="18" fill="#f59e0b" opacity="0.4" class="anim-pulse"/>' : ''}
                                ${isGateOpen ? `
                                    <!-- ВРАТА РАСПАХНУТЫ ВПЕРЕД К ВЕЛИКОЙ ПОБЕДЕ -->
                                    <polygon points="195,130 215,136 215,260 195,268" fill="url(#gateHeavyWood)" stroke="#0f0904" stroke-width="2"/>
                                    <polygon points="325,130 305,136 305,260 325,268" fill="url(#gateHeavyWood)" stroke="#0f0904" stroke-width="2"/>
                                    <!-- Золотые сияющие солнечные лучи сквозь открытые врата -->
                                    <g id="gate-sun-rays">
                                        <polygon points="215,136 305,136 345,285 175,285" fill="#fef08a" opacity="0.5" filter="url(#goldAura)"/>
                                        <line x1="260" y1="136" x2="260" y2="285" stroke="#ffffff" stroke-width="2" opacity="0.8"/>
                                        <line x1="240" y1="136" x2="220" y2="285" stroke="#ffffff" stroke-width="1.5" opacity="0.6"/>
                                        <line x1="280" y1="136" x2="300" y2="285" stroke="#ffffff" stroke-width="1.5" opacity="0.6"/>
                                    </g>
                                    <!-- Вывеска статуса -->
                                    <g transform="translate(260, 240)" id="gate-status-badge-svg">
                                        <rect x="-48" y="0" width="96" height="20" rx="4" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
                                        <text x="0" y="14" text-anchor="middle" fill="#fde047" font-size="10" font-weight="bold">ВРАТА ОТКРЫТЫ</text>
                                    </g>
                                ` : `
                                    <!-- Золотые лучи (скрыты до распахивания) -->
                                    <g id="gate-sun-rays" style="opacity: 0;">
                                        <polygon points="215,136 305,136 345,285 175,285" fill="#fef08a" opacity="0.5" filter="url(#goldAura)"/>
                                        <line x1="260" y1="136" x2="260" y2="285" stroke="#ffffff" stroke-width="2" opacity="0.8"/>
                                        <line x1="240" y1="136" x2="220" y2="285" stroke="#ffffff" stroke-width="1.5" opacity="0.6"/>
                                        <line x1="280" y1="136" x2="300" y2="285" stroke="#ffffff" stroke-width="1.5" opacity="0.6"/>
                                    </g>
                                    <!-- ЛЕВАЯ СТВОРКА ВРАТ -->
                                    <g id="gate-door-left">
                                        <path d="M195,130 Q260,110 260,110 L260,265 L195,265 Z" fill="url(#gateHeavyWood)" stroke="#1a0b02" stroke-width="2"/>
                                        <line x1="260" y1="110" x2="260" y2="265" stroke="#000000" stroke-width="2.5"/>
                                        <rect x="195" y="145" width="65" height="9" fill="#1e293b" stroke="#334155" stroke-width="1"/>
                                        <rect x="195" y="195" width="65" height="9" fill="#1e293b" stroke="#334155" stroke-width="1"/>
                                        <rect x="195" y="245" width="65" height="9" fill="#1e293b" stroke="#334155" stroke-width="1"/>
                                        <circle cx="210" cy="149" r="2" fill="#cbd5e1"/>
                                        <circle cx="240" cy="149" r="2" fill="#cbd5e1"/>
                                        <circle cx="210" cy="199" r="2" fill="#cbd5e1"/>
                                    </g>
                                    <!-- ПРАВАЯ СТВОРКА ВРАТ -->
                                    <g id="gate-door-right">
                                        <path d="M325,130 Q260,110 260,110 L260,265 L325,265 Z" fill="url(#gateHeavyWood)" stroke="#1a0b02" stroke-width="2"/>
                                        <rect x="260" y="145" width="65" height="9" fill="#1e293b" stroke="#334155" stroke-width="1"/>
                                        <rect x="260" y="195" width="65" height="9" fill="#1e293b" stroke="#334155" stroke-width="1"/>
                                        <rect x="260" y="245" width="65" height="9" fill="#1e293b" stroke="#334155" stroke-width="1"/>
                                        <circle cx="280" cy="149" r="2" fill="#cbd5e1"/>
                                        <circle cx="310" cy="149" r="2" fill="#cbd5e1"/>
                                        <circle cx="310" cy="199" r="2" fill="#cbd5e1"/>
                                    </g>
                                    <!-- ЗАМОК С ТЯЖЕЛОЙ ЦЕПЬЮ -->
                                    <g id="gate-lock-chains">
                                        <path d="M230,190 Q260,215 290,190" stroke="#475569" stroke-width="4" fill="none"/>
                                        <circle cx="260" cy="200" r="16" fill="#0f172a" stroke="#ea580c" stroke-width="2.5"/>
                                        <path d="M254,196 L266,196 L266,206 L254,206 Z" fill="#f59e0b"/>
                                        <circle cx="260" cy="200" r="2" fill="#1e293b"/>
                                    </g>
                                    <!-- ВЫВЕСКА СТАТУСА -->
                                    <g transform="translate(260, 240)" id="gate-status-badge-svg">
                                        <rect x="-48" y="0" width="96" height="20" rx="4" fill="#0f172a" stroke="#ea580c" stroke-width="1.5" id="gate-status-badge-rect"/>
                                        <text x="0" y="14" text-anchor="middle" fill="#fca5a5" font-size="9.5" font-weight="bold" id="gate-status-badge-text">КАРАНТИН</text>
                                    </g>
                                `}
                            </g>

                            <!-- 5. ЛАГЕРНАЯ ЖИЗНЬ ГАРНИЗОНА: КОСТЕР (СЛЕВА СБОКУ) -->
                            <g id="camp-fire-area" transform="translate(15, 290)">
                                <!-- Тень костровища -->
                                <ellipse cx="25" cy="50" rx="26" ry="9" fill="#000000" opacity="0.4"/>
                                <!-- Каменное кольцо очага -->
                                <ellipse cx="25" cy="46" rx="20" ry="8" fill="#292524" stroke="#1c1917" stroke-width="1.8"/>
                                <circle cx="10" cy="46" r="4.5" fill="#44403c"/>
                                <circle cx="20" cy="49" r="4" fill="#57534e"/>
                                <circle cx="32" cy="48" r="4.5" fill="#44403c"/>
                                <circle cx="40" cy="44" r="4" fill="#57534e"/>

                                <!-- Угли и пламя костра -->
                                <circle cx="25" cy="44" r="24" fill="url(#fireGlow)" class="anim-torch-glow"/>
                                <path d="M18,44 Q25,22 32,44 Z" fill="#ea580c" class="anim-forge-flame"/>
                                <path d="M20,44 Q25,28 30,44 Z" fill="#f59e0b"/>
                                <circle cx="25" cy="42" r="3.5" fill="#fef08a"/>

                                <!-- Тренога с чугунным котелком -->
                                <line x1="12" y1="48" x2="25" y2="18" stroke="#090a0f" stroke-width="2"/>
                                <line x1="38" y1="48" x2="25" y2="18" stroke="#090a0f" stroke-width="2"/>
                                <line x1="25" y1="18" x2="25" y2="28" stroke="#475569" stroke-width="1.2"/>
                                <ellipse cx="25" cy="33" rx="7" ry="5.5" fill="#1e293b" stroke="#020617" stroke-width="1.5"/>
                                <path d="M23,26 Q25,20 27,26" stroke="#f8fafc" stroke-width="1" fill="none" opacity="0.6"/>
                            </g>

                            <!-- БОЧКИ С ЭЛЕМ И ЯЩИКИ ГАРНИЗОНА (СПРАВА СБОКУ) -->
                            <g transform="translate(460, 295)">
                                <ellipse cx="14" cy="24" rx="12" ry="15" fill="#78350f" stroke="#3b1d06" stroke-width="2"/>
                                <line x1="4" y1="16" x2="24" y2="16" stroke="#1c1917" stroke-width="1.5"/>
                                <line x1="4" y1="30" x2="24" y2="30" stroke="#1c1917" stroke-width="1.5"/>
                                <rect x="24" y="16" width="26" height="22" fill="#451a03" stroke="#1c0f05" stroke-width="1.5"/>
                            </g>

                            <!-- 6. БАРРИКАДЫ НА ОБОЧИНАХ ДОРОГИ -->
                            <g transform="translate(162, 335)">
                                <line x1="0" y1="18" x2="26" y2="-8" stroke="#451a03" stroke-width="3.5"/>
                                <line x1="26" y1="18" x2="0" y2="-8" stroke="#451a03" stroke-width="3.5"/>
                                <line x1="13" y1="22" x2="13" y2="-12" stroke="#78350f" stroke-width="3.5"/>
                            </g>
                            <g transform="translate(332, 335)">
                                <line x1="0" y1="18" x2="26" y2="-8" stroke="#451a03" stroke-width="3.5"/>
                                <line x1="26" y1="18" x2="0" y2="-8" stroke="#451a03" stroke-width="3.5"/>
                                <line x1="13" y1="22" x2="13" y2="-12" stroke="#78350f" stroke-width="3.5"/>
                            </g>

                            <!-- 7. ПОЗИЦИЯ 1: КАПИТАН ВАРРАН И ПОЛЕВОЙ СТОЛ (СЛЕВА ОТ ВРАТ, ЦЕНТР X=100) -->
                            <g id="scene-guard-varran" class="interactive-scene-npc ${this.selectedNpcId === 'varran' ? 'selected-npc' : ''}" style="cursor: pointer;" title="Поговорить с капитаном Варраном">
                                <!-- Подсветка выбора под ногами -->
                                ${this.selectedNpcId === 'varran' ? '<ellipse cx="100" cy="325" rx="38" ry="12" fill="#38bdf8" opacity="0.45" class="anim-pulse" filter="url(#sceneGlow)"/>' : ''}
                                
                                <!-- Фигура Капитана Варрана -->
                                <g transform="translate(14, 128) scale(0.72)">
                                    ${NpcRenderer.render(NPC_CONFIGS.varran, 240, 320)}
                                </g>

                                <!-- Алебарда капитана в руке -->
                                <g transform="translate(138, 160)">
                                    <line x1="0" y1="-30" x2="0" y2="155" stroke="#78350f" stroke-width="3.5"/>
                                    <polygon points="0,-30 0,-52 4,-52 4,-30" fill="#cbd5e1" stroke="#334155" stroke-width="1.2"/>
                                    <path d="M0,-24 Q18,-30 16,-8 Q6,-14 0,-12 Z" fill="#cbd5e1" stroke="#334155" stroke-width="1.2"/>
                                    <polygon points="0,-18 -12,-12 0,-8" fill="#cbd5e1" stroke="#334155" stroke-width="1"/>
                                </g>

                                <!-- Походный стол командования перед Варраном -->
                                <g transform="translate(65, 285)">
                                    <line x1="5" y1="15" x2="5" y2="40" stroke="#3b1d06" stroke-width="3"/>
                                    <line x1="65" y1="15" x2="65" y2="40" stroke="#3b1d06" stroke-width="3"/>
                                    <polygon points="0,15 70,15 64,22 -6,22" fill="#5a2f10" stroke="#1c0f05" stroke-width="1.8"/>
                                    <polygon points="10,14 55,14 50,20 6,20" fill="#fed7aa" stroke="#ca8a04" stroke-width="1"/>
                                    <line x1="16" y1="17" x2="45" y2="17" stroke="#b45309" stroke-width="1" stroke-dasharray="3 2"/>
                                    <circle cx="58" cy="10" r="9" fill="url(#sunGlow)"/>
                                    <rect x="56" y="7" width="4" height="6" fill="#fef08a" stroke="#b45309" stroke-width="0.8"/>
                                </g>

                                <!-- Бейдж с именем капитана -->
                                <g transform="translate(100, 340)">
                                    <rect x="-48" y="0" width="96" height="20" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
                                    <text x="0" y="14" text-anchor="middle" fill="#f8fafc" font-size="10" font-weight="bold">Капитан Варран</text>
                                </g>
                            </g>

                            <!-- 8. ПОЗИЦИЯ 2: ЧАСОВОЙ БРАН (СПРАВА ОТ ВРАТ, ЦЕНТР X=420) -->
                            <g id="scene-guard-bran" class="interactive-scene-npc ${this.selectedNpcId === 'bran' ? 'selected-npc' : ''}" style="cursor: pointer;" title="Поговорить со стражником Браном">
                                <!-- Подсветка выбора под ногами -->
                                ${this.selectedNpcId === 'bran' ? '<ellipse cx="420" cy="325" rx="38" ry="12" fill="#38bdf8" opacity="0.45" class="anim-pulse" filter="url(#sceneGlow)"/>' : ''}

                                <!-- Фигура Брана -->
                                <g transform="translate(334, 128) scale(0.72)">
                                    ${NpcRenderer.render(NPC_CONFIGS.bran, 240, 320)}
                                </g>

                                <!-- Щит Брана на левой руке -->
                                <g transform="translate(388, 215)">
                                    <path d="M0,0 L26,0 L24,32 Q13,50 13,52 Q13,50 2,32 Z" fill="#1e3a8a" stroke="#facc15" stroke-width="2"/>
                                    <line x1="13" y1="4" x2="13" y2="46" stroke="#facc15" stroke-width="2"/>
                                    <polygon points="13,10 18,16 13,22 8,16" fill="#facc15"/>
                                </g>

                                <!-- Копье стражника в правой руке -->
                                <g transform="translate(458, 160)">
                                    <line x1="0" y1="-25" x2="0" y2="160" stroke="#78350f" stroke-width="3"/>
                                    <polygon points="0,-25 -5,-8 0,-5 5,-8" fill="#cbd5e1" stroke="#334155" stroke-width="1.2"/>
                                </g>

                                <!-- Бейдж с именем стражника -->
                                <g transform="translate(420, 340)">
                                    <rect x="-48" y="0" width="96" height="20" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
                                    <text x="0" y="14" text-anchor="middle" fill="#f8fafc" font-size="10" font-weight="bold">Стражник Бран</text>
                                </g>
                            </g>
                        </svg>
                    </div>

                    <!-- ПРАВАЯ ПАНЕЛЬ: В ТОЧНОСТИ КАК В ДРУГИХ ГОРОДСКИХ ЗДАНИЯХ -->
                    <div class="interior-interaction-panel south-road-panel" id="south-road-panel-container">
                        ${this.renderInteractionPanel()}
                    </div>
                </div>
            </div>

            <!-- МОДАЛЬНОЕ ОКНО ФИНАЛЬНОГО ЭПИЛОГА / ТРИУМФА -->
            <div class="dungeon-chest-modal-backdrop hidden" id="epilogue-modal" style="display: none;">
                <div class="chest-modal-dialog epilogue-dialog anim-pop-in">
                    <div class="chest-modal-header epilogue-header">
                        <span class="victory-icon">${Icons.crown(44)}</span>
                        <h2 class="chest-modal-title">ВЕЛИКИЙ ТРИУМФ!</h2>
                        <div class="chest-modal-sub">Королевство навеки избавлено от Тьмы</div>
                    </div>
                    <div class="chest-modal-content epilogue-content">
                        <p class="epilogue-text">
                            Под торжественный звон колоколов и радостные возгласы стражи Южные Врата со скрипом распахнулись. 
                            <strong>${this.player.name}</strong> ступает на залитый солнцем Южный тракт.
                        </p>
                        <p class="epilogue-text">
                            Весть о падении Владыки Бездны на 30-м этаже Катакомб облетела весь континент. Впереди — королевская награда, почет Высшего Круга и слава величайшего героя всех времен!
                        </p>

                        <div class="epilogue-hero-summary">
                            <div class="reward-entry"><span class="reward-label">Герой:</span> <strong>${this.player.name}</strong></div>
                            <div class="reward-entry"><span class="reward-label">Уровень:</span> <strong>${this.player.level}</strong></div>
                            <div class="reward-entry"><span class="reward-label">Золото:</span> <strong>${this.player.gold} монет</strong></div>
                            <div class="reward-entry"><span class="reward-label">Спуск:</span> <strong>Все 30 этажей покорены!</strong></div>
                        </div>
                    </div>
                    <div class="chest-modal-actions epilogue-actions">
                        <button class="btn btn-primary btn-lg" id="btn-epilogue-continue">
                            ${Icons.door(16)} Продолжить исследование мира
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.initEvents();
    }

    renderInteractionPanel() {
        const isGateOpen = !!this.player.hasOpenedSouthGates;
        const canOpenGate = !!this.player.hasDefeatedFinalBoss && !!this.player.hasViewedAbyssEnding && !isGateOpen;
        const varranQuests = QuestSystem.getAvailableQuestsForNpc(this.player, 'varran').length;
        const branQuests = QuestSystem.getAvailableQuestsForNpc(this.player, 'bran').length;

        // ВЕРХНИЕ ВКЛАДКИ ВЫБОРА NPC / ОБЪЕКТА
        const switcherHtml = `
            <div class="goods-tabs npc-switcher-tabs">
                <button class="goods-tab-btn ${this.selectedNpcId === 'varran' ? 'active' : ''}" id="btn-select-varran">
                    Капитан Варран ${varranQuests > 0 ? `<span class="badge-tab-count">${varranQuests}</span>` : ''}
                </button>
                <button class="goods-tab-btn ${this.selectedNpcId === 'bran' ? 'active' : ''}" id="btn-select-bran">
                    Стражник Бран ${branQuests > 0 ? `<span class="badge-tab-count">${branQuests}</span>` : ''}
                </button>
                <button class="goods-tab-btn ${this.selectedNpcId === 'gate' ? 'active' : ''}" id="btn-select-gate">
                    ${isGateOpen ? `${Icons.crown(13)} Южные Врата` : (canOpenGate ? `${Icons.spark(13)} Южные Врата` : `${Icons.lock(13)} Южные Врата`)}
                </button>
            </div>
        `;

        if (this.selectedNpcId === 'gate') {
            return `
                ${switcherHtml}
                <div class="south-gate-view anim-pop-in">
                    ${isGateOpen ? `
                        <div class="gate-status-banner unlocked">
                            <div class="gate-status-header">
                                <span class="gate-status-icon">${Icons.crown(24)}</span>
                                <div>
                                    <h4 class="gate-status-title">ВРАТА КОРОЛЕВСТВА ОТКРЫТЫ!</h4>
                                    <span class="gate-status-badge success">${Icons.check(12)} Владыка Бездны повержен</span>
                                </div>
                            </div>
                            <p class="gate-status-desc">
                                Древняя скверна рассеялась, стражники салютуют Спасителю королевства! Дорога на Юг свободна для перехода.
                            </p>
                        </div>
                        <div style="margin-top: 20px; text-align: center;">
                            <button class="btn btn-primary btn-lg btn-pulse-gold" id="btn-attempt-pass" style="width: 100%; padding: 14px;">
                                ${Icons.crown(18)} Шагнуть через Врата (Смотреть великий финал)
                            </button>
                        </div>
                    ` : (canOpenGate ? `
                        <div class="gate-status-banner unlocked" style="border-color: #facc15;">
                            <div class="gate-status-header">
                                <span class="gate-status-icon">${Icons.spark(24)}</span>
                                <div>
                                    <h4 class="gate-status-title">ВРАТА ГОТОВЫ К ОТКРЫТИЮ!</h4>
                                    <span class="gate-status-badge success">${Icons.check(12)} Катакомбы очищены</span>
                                </div>
                            </div>
                            <p class="gate-status-desc">
                                Владыка Бездны сокрушен, и проклятие пало! Поговорите с <strong>капитаном Варраном</strong> на заставе, чтобы гарнизон сбросил цепи и распахнул Южные Врата.
                            </p>
                        </div>
                        <div style="margin-top: 20px; text-align: center;">
                            <button class="btn btn-primary btn-lg btn-pulse-gold" id="btn-switch-to-varran-gate" style="width: 100%; padding: 14px; font-weight: bold;">
                                ${Icons.message(16)} Поговорить с капитаном Варраном об открытии Врат
                            </button>
                        </div>
                    ` : `
                        <div class="gate-status-banner locked">
                            <div class="gate-status-header">
                                <span class="gate-status-icon">${Icons.lock(24)}</span>
                                <div>
                                    <h4 class="gate-status-title">ВРАТА ЗАПЕРТЫ: КАРАНТИН</h4>
                                    <span class="gate-status-badge warning">${Icons.warning(12)} Королевский указ</span>
                                </div>
                            </div>
                            <p class="gate-status-desc">
                                По указу наместника проход на Южный тракт наглухо закрыт до полного истребления скверны. Спуститесь на <strong>30-й этаж Катакомб</strong> и уничтожьте <strong>Владыку Бездны</strong>!
                            </p>
                        </div>
                        <div style="margin-top: 20px; text-align: center;">
                            <button class="btn btn-warning btn-lg" id="btn-attempt-pass" style="width: 100%; padding: 12px;">
                                ${Icons.lock(16)} Попробовать открыть Врата
                            </button>
                        </div>
                    `)}
                </div>
            `;
        }

        const npcConfig = NPC_CONFIGS[this.selectedNpcId] || NPC_CONFIGS.varran;
        const npcTitle = this.selectedNpcId === 'varran' ? 'Командир Южного дозора' : 'Часовой пограничного рубежа';
        const availQuestsCount = QuestSystem.getAvailableQuestsForNpc(this.player, this.selectedNpcId).length;

        // Базовые реплики
        let defaultSpeech = '';
        if (this.selectedNpcId === 'varran') {
            if (isGateOpen) {
                defaultSpeech = '«Честь и слава Спасителю королевства! Южные Врата открыты настежь по твоему слову. Путь во внешний мир свободен!»';
            } else if (canOpenGate) {
                defaultSpeech = '«Стой, путник... Постой-ка! Воздух со стороны катакомб стал свежим, а земля под ногами больше не дрожит! Неужели на 30-м этаже что-то произошло?!»';
            } else {
                defaultSpeech = '«Стой, путник! Дорога на Юг заблокирована королевским указом. Пока в Катакомбах на 30 этаже властвует чудовище — никто не покинет заставу!»';
            }
        } else {
            defaultSpeech = isGateOpen
                ? '«Глазам своим не верю! Врата распахнуты, парни в гарнизоне салютуют великому герою!»'
                : '«Капитан Варран держит гарнизон в строгой дисциплине. Не суйся вглубь без хорошей экипировки от кузнеца!»';
        }

        const currentSpeech = this.dialogState ? this.dialogState.text : defaultSpeech;

        return `
            ${switcherHtml}

            <div class="npc-dialog-card anim-pop-in">
                <div class="npc-header-row">
                    <div class="npc-badge-mini">
                        <div class="npc-bust-circle">${NpcRenderer.renderBust(npcConfig)}</div>
                        <span class="npc-title">${npcConfig.name}</span>
                    </div>
                    <span class="npc-status-tag">${npcTitle}</span>
                </div>
                <div class="npc-speech-bubble" id="npc-speech">
                    ${currentSpeech}
                </div>
                <div id="npc-quest-prompt-slot">
                    ${QuestRenderer.renderNpcQuestPrompts(this.player, this.selectedNpcId)}
                </div>
            </div>

            <div class="goods-tabs">
                <button class="goods-tab-btn ${this.activeSubTab === 'dialog' ? 'active' : ''}" id="tab-sub-dialog">
                    Беседа и приказы
                </button>
                <button class="goods-tab-btn ${this.activeSubTab === 'quests' ? 'active' : ''}" id="tab-sub-quests">
                    Поручения ${availQuestsCount > 0 ? `<span class="badge-tab-count">${availQuestsCount}</span>` : ''}
                </button>
            </div>

            <div class="goods-content-view" id="south-road-tab-content">
                ${this.renderSubTabContent()}
            </div>
        `;
    }

    renderSubTabContent() {
        if (this.activeSubTab === 'quests') {
            return QuestRenderer.renderNpcQuestsTab(this.player, this.selectedNpcId);
        }

        // Вкладка диалога
        const isVarran = this.selectedNpcId === 'varran';
        const isGateOpen = !!this.player.hasOpenedSouthGates;
        const canOpenGate = !!this.player.hasDefeatedFinalBoss && !!this.player.hasViewedAbyssEnding && !isGateOpen;

        if (isVarran) {
            return `
                <div class="dialog-options-list">
                    ${canOpenGate && (!this.dialogState || !this.dialogState.showOpenGateButton) ? `
                        <button class="btn btn-primary btn-lg btn-pulse-gold btn-dialog-option" id="btn-dialog-varran-victory-report" style="border: 2px solid #facc15; box-shadow: 0 0 16px rgba(250, 204, 21, 0.45); font-weight: bold; padding: 12px 14px;">
                            ${Icons.crown(16)} «Владыка Бездны повержен! Катакомбы очищены, снимите карантин!»
                        </button>
                    ` : ''}
                    ${this.dialogState && this.dialogState.showOpenGateButton ? `
                        <div style="margin: 8px 0 14px 0;">
                            <button class="btn btn-primary btn-lg btn-pulse-gold" id="btn-order-open-gate" style="width: 100%; padding: 15px; font-weight: 800; font-size: 1.05rem; letter-spacing: 0.5px; border: 2px solid #fef08a;">
                                ${Icons.door(20)} [ПРИКАЗ] СБРОСИТЬ ЦЕПИ И ОТВОРИТЬ ВРАТА!
                            </button>
                        </div>
                    ` : ''}
                    ${isGateOpen ? `
                        <button class="btn btn-primary btn-dialog-option btn-pulse-gold" id="btn-dialog-varran-pass">
                            ${Icons.crown(14)} «Шагнуть через открытые Врата (Смотреть триумф)»
                        </button>
                    ` : ''}
                    <button class="btn btn-secondary btn-dialog-option" id="btn-dialog-varran-lore">
                        ${Icons.message(14)} «Что ты знаешь об опасностях катакомб, капитан?»
                    </button>
                    <button class="btn btn-secondary btn-dialog-option" id="btn-dialog-varran-gate">
                        ${Icons.lock(14)} «Почему нельзя открыть врата прямо сейчас?»
                    </button>
                </div>
            `;
        } else {
            return `
                <div class="dialog-options-list">
                    <button class="btn btn-secondary btn-dialog-option" id="btn-dialog-bran-life">
                        ${Icons.message(14)} «Каково это — нести службу на заставе?»
                    </button>
                    <button class="btn btn-secondary btn-dialog-option" id="btn-dialog-bran-advice">
                        ${Icons.shield(14)} «Какой совет дашь перед спуском в катакомбы?»
                    </button>
                </div>
            `;
        }
    }

    initEvents() {
        // Кнопка выхода
        const btnLeave = this.container.querySelector('#btn-leave-south-road');
        if (btnLeave) {
            btnLeave.addEventListener('click', () => {
                sound.playSfx('click');
                sound.switchMusic(townTheme, 1.2);
                if (this.callbacks.onBack) {
                    this.callbacks.onBack();
                }
            });
        }

        // Переключатели NPC в шапке панели
        const btnVarran = this.container.querySelector('#btn-select-varran');
        if (btnVarran) {
            btnVarran.addEventListener('click', () => {
                sound.playSfx('tab');
                this.selectedNpcId = 'varran';
                this.dialogState = null;
                this.render(this.container);
            });
        }

        const btnBran = this.container.querySelector('#btn-select-bran');
        if (btnBran) {
            btnBran.addEventListener('click', () => {
                sound.playSfx('tab');
                this.selectedNpcId = 'bran';
                this.dialogState = null;
                this.render(this.container);
            });
        }

        const btnGate = this.container.querySelector('#btn-select-gate');
        if (btnGate) {
            btnGate.addEventListener('click', () => {
                sound.playSfx('tab');
                this.selectedNpcId = 'gate';
                this.dialogState = null;
                this.render(this.container);
            });
        }

        // Клик по фигурам на SVG сцене
        const sceneVarran = this.container.querySelector('#scene-guard-varran');
        if (sceneVarran) {
            sceneVarran.addEventListener('click', () => {
                sound.playSfx('tab');
                this.selectedNpcId = 'varran';
                this.dialogState = null;
                this.render(this.container);
            });
        }

        const sceneBran = this.container.querySelector('#scene-guard-bran');
        if (sceneBran) {
            sceneBran.addEventListener('click', () => {
                sound.playSfx('tab');
                this.selectedNpcId = 'bran';
                this.dialogState = null;
                this.render(this.container);
            });
        }

        const sceneGate = this.container.querySelector('#scene-gate');
        if (sceneGate) {
            sceneGate.addEventListener('click', () => {
                sound.playSfx('tab');
                this.selectedNpcId = 'gate';
                this.dialogState = null;
                this.render(this.container);
            });
        }

        // Переключение подвкладок
        const tabDialog = this.container.querySelector('#tab-sub-dialog');
        if (tabDialog) {
            tabDialog.addEventListener('click', () => {
                sound.playSfx('tab');
                this.activeSubTab = 'dialog';
                this.render(this.container);
            });
        }

        const tabQuests = this.container.querySelector('#tab-sub-quests');
        if (tabQuests) {
            tabQuests.addEventListener('click', () => {
                sound.playSfx('tab');
                this.activeSubTab = 'quests';
                this.render(this.container);
            });
        }

        // Переход к Варрану из карточки врат
        const btnSwitchToVarran = this.container.querySelector('#btn-switch-to-varran-gate');
        if (btnSwitchToVarran) {
            btnSwitchToVarran.addEventListener('click', () => {
                sound.playSfx('tab');
                this.selectedNpcId = 'varran';
                this.dialogState = {
                    text: '«Боги праведные... Скверна Бездны пала! Ты совершил невозможное, Спаситель! Гарнизон, к оружию! По приказу великого героя — СБРОСИТЬ ЦЕПИ! ОТВОРИТЬ ЮЖНЫЕ ВРАТА!»',
                    showOpenGateButton: true
                };
                this.render(this.container);
            });
        }

        // Попытка пройти сквозь врата
        const btnAttempt = this.container.querySelector('#btn-attempt-pass');
        if (btnAttempt) {
            btnAttempt.addEventListener('click', () => {
                if (this.player.hasOpenedSouthGates) {
                    this.triggerFinalCutscene();
                } else if (this.player.hasDefeatedFinalBoss && this.player.hasViewedAbyssEnding) {
                    sound.playSfx('tab');
                    this.selectedNpcId = 'varran';
                    this.dialogState = {
                        text: '«Боги праведные... Скверна Бездны пала! Ты совершил невозможное, Спаситель! Гарнизон, к оружию! По приказу великого героя — СБРОСИТЬ ЦЕПИ! ОТВОРИТЬ ЮЖНЫЕ ВРАТА!»',
                        showOpenGateButton: true
                    };
                    this.render(this.container);
                } else {
                    sound.playSfx('click');
                    sound.playSfx('door');
                    this.selectedNpcId = 'varran';
                    this.dialogState = {
                        text: '«Куда ты лезешь?! Врата заперты на амбарный цепной замок. Сперва убей тварь на 30-м этаже Катакомб, иначе этот проход останется наглухо закрыт!»'
                    };
                    this.render(this.container);
                }
            });
        }

        // Обработчик доклада Варрану о победе над финальным боссом
        const btnVictoryReport = this.container.querySelector('#btn-dialog-varran-victory-report');
        if (btnVictoryReport) {
            btnVictoryReport.addEventListener('click', () => {
                sound.playSfx('questComplete');
                this.dialogState = {
                    text: '«Боги праведные... Скверна Бездны пала! Ты совершил невозможное, Спаситель! Гарнизон, к оружию! По приказу великого героя — СБРОСИТЬ ЦЕПИ! ОТВОРИТЬ ЮЖНЫЕ ВРАТА!»',
                    showOpenGateButton: true
                };
                this.render(this.container);
            });
        }

        // Кнопка приказа на анимацию открытия врат
        const btnOrderGate = this.container.querySelector('#btn-order-open-gate');
        if (btnOrderGate) {
            btnOrderGate.addEventListener('click', () => {
                this.playGateOpeningSequence();
            });
        }

        // Обработчики диалогов Варрана
        const btnLoreVarran = this.container.querySelector('#btn-dialog-varran-lore');
        if (btnLoreVarran) {
            btnLoreVarran.addEventListener('click', () => {
                sound.playSfx('tab');
                this.dialogState = {
                    text: '«С каждым спуском на 10 этажей катакомбы преображаются. На глубине 20–30 этажей обитают кошмарные древние исчадия. Если у тебя нет хорошего запаса зелий и улучшенного оружия, ты там и пяти минут не протянешь.»'
                };
                this.render(this.container);
            });
        }

        const btnGateVarran = this.container.querySelector('#btn-dialog-varran-gate');
        if (btnGateVarran) {
            btnGateVarran.addEventListener('click', () => {
                sound.playSfx('tab');
                this.dialogState = {
                    text: '«Потому что за этими вратами — внешние земли королевства! Если хоть одно чудовище прорвется на поверхность, начнется резня. Моя задача — держать рубеж любой ценой!»'
                };
                this.render(this.container);
            });
        }

        const btnPassVarran = this.container.querySelector('#btn-dialog-varran-pass');
        if (btnPassVarran) {
            btnPassVarran.addEventListener('click', () => {
                this.triggerFinalCutscene();
            });
        }

        // Обработчики диалогов Брана
        const btnLifeBran = this.container.querySelector('#btn-dialog-bran-life');
        if (btnLifeBran) {
            btnLifeBran.addEventListener('click', () => {
                sound.playSfx('tab');
                this.dialogState = {
                    text: '«Холодные ночи, постоянная тревога и капитан, который гоняет нас за каждую пылинку на кирасе. Но в таверне на площади эль наливают отменный — это скрашивает дежурство!»'
                };
                this.render(this.container);
            });
        }

        const btnAdviceBran = this.container.querySelector('#btn-dialog-bran-advice');
        if (btnAdviceBran) {
            btnAdviceBran.addEventListener('click', () => {
                sound.playSfx('tab');
                this.dialogState = {
                    text: '«Не забывай заглядывать в Храм Света за благословением перед глубоким рейдом, а у торговца всегда держи пару свитков телепортации. Они спасли не одну жизнь!»'
                };
                this.render(this.container);
            });
        }

        // Квесты: сдача и принятие поручений
        const promptSlot = this.container.querySelector('#npc-quest-prompt-slot');
        if (promptSlot) {
            promptSlot.querySelectorAll('.btn-quest-turnin').forEach(btn => {
                btn.addEventListener('click', () => {
                    const questId = btn.dataset.questId;
                    const res = QuestSystem.interactWithNpc(this.player, questId, this.selectedNpcId);
                    if (res.success) {
                        this.dialogState = { text: res.dialogText };
                        this.render(this.container);
                    }
                });
            });
        }

        const tabContent = this.container.querySelector('#south-road-tab-content');
        if (tabContent) {
            tabContent.querySelectorAll('.btn-accept-quest').forEach(btn => {
                btn.addEventListener('click', () => {
                    const questId = btn.dataset.questId;
                    const res = QuestSystem.acceptQuest(this.player, questId);
                    if (res.success) {
                        this.dialogState = { text: res.quest.dialogPending };
                        this.render(this.container);
                    }
                });
            });
        }

        // Кнопка закрытия модалки эпилога
        const modal = this.container.querySelector('#epilogue-modal');
        const btnEpilogueContinue = this.container.querySelector('#btn-epilogue-continue');
        if (btnEpilogueContinue && modal) {
            btnEpilogueContinue.addEventListener('click', () => {
                sound.playSfx('click');
                modal.classList.add('hidden');
                modal.style.display = 'none';
            });
        }
    }

    playGateOpeningSequence() {
        if (this.isGateAnimating) return;
        this.isGateAnimating = true;

        // Отключаем клики на правой панели взаимодействия во время анимации
        const panel = this.container.querySelector('#south-road-panel-container');
        if (panel) {
            panel.style.pointerEvents = 'none';
            panel.style.opacity = '0.65';
        }

        // 1. Сброс тяжелых цепей с характерным металлическим звоном
        sound.playSfx('chains');
        const chains = this.container.querySelector('#gate-lock-chains');
        if (chains) {
            chains.classList.add('anim-chain-drop');
        }

        // 2. Распахивание массивных дубовых створок со скрипом и гулом
        setTimeout(() => {
            sound.playSfx('gateOpen');
            const leftDoor = this.container.querySelector('#gate-door-left');
            const rightDoor = this.container.querySelector('#gate-door-right');
            const sunRays = this.container.querySelector('#gate-sun-rays');

            if (leftDoor) leftDoor.classList.add('anim-gate-left-open');
            if (rightDoor) rightDoor.classList.add('anim-gate-right-open');
            if (sunRays) {
                sunRays.style.opacity = '1';
                sunRays.classList.add('anim-sunbeam-burst');
            }

            const badgeRect = this.container.querySelector('#gate-status-badge-rect');
            const badgeText = this.container.querySelector('#gate-status-badge-text');
            if (badgeRect) badgeRect.setAttribute('stroke', '#f59e0b');
            if (badgeText) {
                badgeText.setAttribute('fill', '#fde047');
                badgeText.textContent = 'ВРАТА ОТКРЫТЫ';
            }
        }, 450);

        // 3. Звук триумфальных фанфар, сохранение и переход в финальную катсцену
        setTimeout(() => {
            sound.playSfx('victory');
            this.player.hasOpenedSouthGates = true;
            SaveSystem.save(this.player);

            this.triggerFinalCutscene();
        }, 2200);
    }

    triggerFinalCutscene() {
        if (this.callbacks.onPlayCutscene) {
            this.callbacks.onPlayCutscene('grand_finale', () => {
                this.isGateAnimating = false;
                this.selectedNpcId = 'varran';
                this.dialogState = {
                    text: '«Честь и слава Спасителю королевства! Южные Врата открыты настежь, путь на просторы континента свободен!»',
                    showOpenGateButton: false
                };
                this.render(this.container);
            });
        } else {
            this.showEpilogueModal();
        }
    }

    showEpilogueModal() {
        sound.playSfx('levelUp');
        const modal = this.container.querySelector('#epilogue-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
        }
    }
}
