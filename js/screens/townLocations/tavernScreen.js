import { sound } from '../../audio/audioEngine.js';
import { tavernMusic } from '../../audio/music/tavernMusic.js';
import { townTheme } from '../../audio/music/townTheme.js';
import { CharacterRenderer } from '../../visuals/characterRenderer.js';
import { NpcRenderer, NPC_CONFIGS } from '../../visuals/npcRenderer.js';
import { Icons } from '../../visuals/icons.js';
import { getTraderStock } from '../../data/itemsData.js';
import { QuestSystem } from '../../services/questSystem.js';
import { QuestRenderer } from '../../ui/questRenderer.js';

export class TavernScreen {
    constructor(player, callbacks) {
        this.player = player;
        this.callbacks = callbacks;
        this.npc = NPC_CONFIGS.brok;
        this.activeTab = 'services';

        sound.switchMusic(tavernMusic, 1.2);

        this.rumors = [
            '«Один бродяга клялся, что на третьем ярусе катакомб наткнулся на алтарь, залечивающий любые раны...»',
            '«Не вздумай соваться вглубь без пары зелий от торговца Рашида. Местные скелеты не знают пощады!»',
            '«У кузнеца Торвальда тяжелый кулак, но его закалка делает клинок острее бритвы.»',
            '«По ночам из решётки катакомб доносится леденящий скрежет. Будто кто-то точит когти о гранит.»'
        ];
    }

    render(container) {
        this.container = container;
        container.innerHTML = `
            <div class="interior-screen">
                <div class="interior-top-bar">
                    <div class="loc-character-badge">
                        <div class="hud-avatar-frame">${CharacterRenderer.renderBust(this.player.visuals, this.player.classId, this.player.equipment)}</div>
                        <div class="loc-player-meta">
                            <span class="loc-player-name">${this.player.name}</span>
                            <span class="loc-gold">${Icons.coin(14)} <strong id="loc-gold-val">${this.player.gold}</strong></span>
                        </div>
                    </div>
                    <div class="interior-title-wrap">
                        <h2>Таверна «Пьяный Гоблин»</h2>
                        <span class="interior-subtitle">Теплый очаг, добрый хмель и отдых для уставших путников</span>
                    </div>
                    <button class="btn btn-secondary" id="btn-leave-tavern">${Icons.arrowLeft(13)} На площадь города</button>
                </div>

                <div class="interior-stage">
                    <div class="interior-scene-box">
                        <svg viewBox="0 0 460 380" class="tavern-scene-svg">
                            <defs>
                                <radialGradient id="hearthAmbient" cx="25%" cy="55%" r="65%">
                                    <stop offset="0%" stop-color="#b45309" stop-opacity="0.45"/>
                                    <stop offset="50%" stop-color="#78350f" stop-opacity="0.15"/>
                                    <stop offset="100%" stop-color="#0c0a08" stop-opacity="0"/>
                                </radialGradient>

                                <radialGradient id="fireGlow" cx="50%" cy="60%" r="50%">
                                    <stop offset="0%" stop-color="#fef08a" stop-opacity="1"/>
                                    <stop offset="35%" stop-color="#f97316" stop-opacity="0.85"/>
                                    <stop offset="70%" stop-color="#dc2626" stop-opacity="0.4"/>
                                    <stop offset="100%" stop-color="#1c1109" stop-opacity="0"/>
                                </radialGradient>

                                <radialGradient id="candleLight" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stop-color="#fef08a" stop-opacity="0.95"/>
                                    <stop offset="45%" stop-color="#f59e0b" stop-opacity="0.4"/>
                                    <stop offset="100%" stop-color="#14110f" stop-opacity="0"/>
                                </radialGradient>

                                <radialGradient id="tavernWindowGrad" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.4"/>
                                    <stop offset="70%" stop-color="#1e3a8a" stop-opacity="0.2"/>
                                    <stop offset="100%" stop-color="#0f172a" stop-opacity="0"/>
                                </radialGradient>

                                <linearGradient id="woodBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stop-color="#3b2314"/>
                                    <stop offset="50%" stop-color="#4a2c19"/>
                                    <stop offset="100%" stop-color="#2c1a0e"/>
                                </linearGradient>
                            </defs>

                            <!-- Темный фон таверны с фактурными досками пола -->
                            <rect width="460" height="380" fill="#14100c"/>
                            <rect width="460" height="380" fill="url(#hearthAmbient)"/>

                            <!-- Потолочные массивные дубовые балки -->
                            <rect x="0" y="0" width="460" height="28" fill="url(#woodBeam)" stroke="#1a0e07" stroke-width="1.5"/>
                            <rect x="0" y="0" width="22" height="380" fill="url(#woodBeam)" stroke="#1a0e07" stroke-width="1.5"/>
                            <rect x="438" y="0" width="22" height="380" fill="url(#woodBeam)" stroke="#1a0e07" stroke-width="1.5"/>

                            <!-- Деревянный дощатый настил пола с щелями и гвоздями -->
                            <g id="floor-boards" opacity="0.3">
                                <line x1="22" y1="260" x2="438" y2="260" stroke="#0a0705" stroke-width="2"/>
                                <line x1="22" y1="290" x2="438" y2="290" stroke="#0a0705" stroke-width="2"/>
                                <line x1="22" y1="320" x2="438" y2="320" stroke="#0a0705" stroke-width="2"/>
                                <line x1="22" y1="350" x2="438" y2="350" stroke="#0a0705" stroke-width="2"/>
                            </g>

                            <!-- Правое витражное окно с вечерними синими сумерками -->
                            <g id="tavern-window" transform="translate(350, 40)">
                                <rect x="0" y="0" width="70" height="95" rx="6" fill="#091322" stroke="#451a03" stroke-width="3"/>
                                <rect x="4" y="4" width="62" height="87" rx="4" fill="url(#tavernWindowGrad)"/>
                                <!-- Ромбовидная свинцовая решетка -->
                                <line x1="35" y1="4" x2="4" y2="45" stroke="#1c1917" stroke-width="1.2"/>
                                <line x1="35" y1="4" x2="66" y2="45" stroke="#1c1917" stroke-width="1.2"/>
                                <line x1="4" y1="45" x2="35" y2="90" stroke="#1c1917" stroke-width="1.2"/>
                                <line x1="66" y1="45" x2="35" y2="90" stroke="#1c1917" stroke-width="1.2"/>
                                <line x1="35" y1="4" x2="35" y2="91" stroke="#334155" stroke-width="1.5"/>
                                <line x1="4" y1="48" x2="66" y2="48" stroke="#334155" stroke-width="1.5"/>
                            </g>

                            <!-- Задний план справа: силуэты завсегдатаев за столиком -->
                            <g id="tavern-patrons" transform="translate(330, 140)" opacity="0.85">
                                <!-- Круглый дубовый стол в дальнем углу -->
                                <ellipse cx="50" cy="65" rx="34" ry="14" fill="#3b2213" stroke="#221209" stroke-width="1.5"/>
                                <!-- Свеча на дальнем столике -->
                                <circle cx="50" cy="55" r="14" fill="url(#candleLight)"/>
                                <rect x="48" y="55" width="4" height="6" fill="#fef08a"/>
                                <!-- Кружка на дальнем столике -->
                                <rect x="36" y="52" width="6" height="8" rx="1" fill="#78350f"/>
                                <!-- Силуэт левого гостя -->
                                <circle cx="24" cy="40" r="9" fill="#1c120c"/>
                                <path d="M12,65 Q24,46 36,65 Z" fill="#1c120c"/>
                                <!-- Силуэт правого гостя в плаще с капюшоном -->
                                <path d="M68,34 Q76,30 82,40 Q76,46 68,44 Z" fill="#181310"/>
                                <path d="M60,65 Q74,45 88,65 Z" fill="#181310"/>
                            </g>

                            <!-- Полки с запасами эля и зелий за стойкой -->
                            <g id="tavern-shelves" transform="translate(160, 36)">
                                <!-- Верхняя полка -->
                                <rect x="0" y="32" width="180" height="8" rx="1.5" fill="#4a2c19" stroke="#241308" stroke-width="1.2"/>
                                <!-- Бочонок эля с краником -->
                                <ellipse cx="25" cy="18" rx="14" ry="16" fill="#78350f" stroke="#381a07" stroke-width="1.5"/>
                                <line x1="16" y1="18" x2="34" y2="18" stroke="#ca8a04" stroke-width="1.5"/>
                                <rect x="38" y="20" width="5" height="3" fill="#ca8a04"/>
                                <!-- Второй бочонок -->
                                <ellipse cx="60" cy="18" rx="14" ry="16" fill="#92400e" stroke="#451a03" stroke-width="1.5"/>
                                <line x1="51" y1="18" x2="69" y2="18" stroke="#ca8a04" stroke-width="1.5"/>
                                <!-- Бутылки с вином и снадобьями с бликами -->
                                <rect x="88" y="8" width="8" height="24" rx="2" fill="#047857" stroke="#064e3b" stroke-width="1"/>
                                <line x1="90" y1="11" x2="90" y2="28" stroke="#6ee7b7" stroke-width="0.8" opacity="0.7"/>
                                <rect x="102" y="5" width="9" height="27" rx="2" fill="#b91c1c" stroke="#7f1d1d" stroke-width="1"/>
                                <line x1="104" y1="8" x2="104" y2="29" stroke="#fca5a5" stroke-width="0.8" opacity="0.7"/>
                                <rect x="117" y="10" width="8" height="22" rx="2" fill="#0284c7" stroke="#0c4a6e" stroke-width="1"/>
                                <rect x="131" y="7" width="10" height="25" rx="2" fill="#ca8a04" stroke="#78350f" stroke-width="1"/>
                                <circle cx="155" cy="18" r="9" fill="#581c87" stroke="#3b0764" stroke-width="1"/>
                            </g>

                            <!-- ВЕЛИЧЕСТВЕННЫЙ КАМЕННЫЙ ОЧАГ С ЖИВЫМ ОГНЕМ (СЛЕВА) -->
                            <g id="tavern-hearth" transform="translate(30, 85)">
                                <!-- Каменная кладка камина из темного гранита -->
                                <rect x="0" y="0" width="125" height="175" rx="4" fill="#2d2825" stroke="#181513" stroke-width="3"/>
                                <!-- Каминная балка-полка -->
                                <rect x="-6" y="-6" width="137" height="14" rx="2" fill="#4a2c19" stroke="#1f1109" stroke-width="1.5"/>
                                <!-- Кубок на каминной полке -->
                                <path d="M15,-6 L18,-18 L24,-18 L27,-6 Z" fill="#ca8a04"/>

                                <!-- Топка камина со сводчатой аркой -->
                                <path d="M15,175 L15,80 Q62,45 110,80 L110,175 Z" fill="#120c08" stroke="#1c1612" stroke-width="2"/>

                                <!-- Горящие угли и дрова -->
                                <ellipse cx="62" cy="165" rx="42" ry="12" fill="#450a0a"/>
                                <polygon points="25,168 62,154 98,168 62,174" fill="#260f05"/>
                                <rect x="30" y="158" width="65" height="8" rx="3" transform="rotate(-6 62 162)" fill="#3b1d0e" stroke="#1c0a03" stroke-width="1"/>
                                <rect x="35" y="159" width="60" height="7" rx="3" transform="rotate(8 65 162)" fill="#451a03" stroke="#1c0a03" stroke-width="1"/>

                                <!-- Пульсирующее сияние жара в топке -->
                                <circle cx="62" cy="140" r="50" fill="url(#fireGlow)" class="anim-hearth-glow"/>

                                <!-- ТРЕХСЛОЙНЫЕ ЖИВЫЕ ЯЗЫКИ ПЛАМЕНИ -->
                                <path d="M35,168 Q45,115 62,88 Q78,118 90,168 Z" fill="#ea580c" class="anim-hearth-flame flame-outer"/>
                                <path d="M42,168 Q52,125 62,102 Q72,125 82,168 Z" fill="#f97316" class="anim-hearth-flame flame-mid"/>
                                <path d="M50,168 Q58,135 62,118 Q66,135 74,168 Z" fill="#fef08a" class="anim-hearth-flame flame-core"/>

                                <!-- Искры, взлетающие в трубу -->
                                <g class="hearth-sparks-group">
                                    <circle cx="56" cy="100" r="1.8" fill="#fef08a" class="hearth-spark spark-1"/>
                                    <circle cx="68" cy="88" r="1.5" fill="#f97316" class="hearth-spark spark-2"/>
                                    <circle cx="60" cy="72" r="1.3" fill="#facc15" class="hearth-spark spark-3"/>
                                </g>

                                <!-- Кованый котелок на поворотном крюке с похлебкой -->
                                <line x1="20" y1="65" x2="48" y2="78" stroke="#1c1917" stroke-width="2.5"/>
                                <line x1="48" y1="78" x2="48" y2="105" stroke="#1c1917" stroke-width="1.8"/>
                                <path d="M38,105 L58,105 L55,124 Q48,128 41,124 Z" fill="#1c1917" stroke="#0a0908" stroke-width="1.2"/>
                                <!-- Пузырьки пара над похлебкой -->
                                <circle cx="46" cy="98" r="2.2" fill="#e2e8f0" class="stew-steam steam-1"/>
                                <circle cx="51" cy="92" r="1.8" fill="#cbd5e1" class="stew-steam steam-2"/>
                            </g>

                            <!-- ПОДВЕСНАЯ КОВАНАЯ ЛЮСТРА СО СВЕЧАМИ НА ЦЕПЯХ -->
                            <g id="tavern-chandelier" transform="translate(230, 0)" class="anim-chandelier-sway">
                                <line x1="-35" y1="0" x2="-25" y2="55" stroke="#1c1917" stroke-width="1.5"/>
                                <line x1="35" y1="0" x2="25" y2="55" stroke="#1c1917" stroke-width="1.5"/>
                                <path d="M-45,55 Q0,65 45,55" stroke="#292524" stroke-width="3" fill="none"/>
                                <!-- 3 свечи на люстре с сиянием -->
                                <g transform="translate(-32, 42)">
                                    <circle cx="0" cy="0" r="16" fill="url(#candleLight)" class="anim-candle-flame"/>
                                    <rect x="-2" y="4" width="4" height="10" fill="#f8fafc"/>
                                    <polygon points="-1.5,4 0,-3 1.5,4" fill="#fde047" class="anim-candle-flame"/>
                                </g>
                                <g transform="translate(0, 48)">
                                    <circle cx="0" cy="0" r="18" fill="url(#candleLight)" class="anim-candle-flame"/>
                                    <rect x="-2.5" y="4" width="5" height="11" fill="#f8fafc"/>
                                    <polygon points="-2,4 0,-4 2,4" fill="#fde047" class="anim-candle-flame"/>
                                </g>
                                <g transform="translate(32, 42)">
                                    <circle cx="0" cy="0" r="16" fill="url(#candleLight)" class="anim-candle-flame"/>
                                    <rect x="-2" y="4" width="4" height="10" fill="#f8fafc"/>
                                    <polygon points="-1.5,4 0,-3 1.5,4" fill="#fde047" class="anim-candle-flame"/>
                                </g>
                            </g>

                            <!-- СПРАЙТ ТРАКТИРЩИКА БРОКА С АНИМАЦИЕЙ ЖИВОГО ДЫХАНИЯ -->
                            <g id="tavern-brok-sprite" transform="translate(175, 48) scale(0.95)" class="npc-interior-breathe">
                                ${NpcRenderer.render(this.npc)}
                            </g>

                            <!-- ПЕРЕДНИЙ ПЛАН: БАРНАЯ СТОЙКА С ПЕННЫМ ЭЛЕМ И СВЕЧОЙ -->
                            <g id="bar-counter-foreground">
                                <!-- Массивная столешница из мореного дуба -->
                                <rect x="90" y="222" width="335" height="28" rx="4" fill="#451a03" stroke="#260f02" stroke-width="2.5"/>
                                <rect x="92" y="224" width="331" height="5" fill="#78350f" opacity="0.6"/>
                                <!-- Фасад барной стойки с деревянными панелями -->
                                <rect x="98" y="250" width="318" height="130" fill="#2e1405" stroke="#1a0a02" stroke-width="2"/>
                                <!-- Декоративные филенки стойки -->
                                <rect x="110" y="262" width="85" height="100" rx="3" fill="#1c0b02" stroke="#451a03" stroke-width="1.5"/>
                                <rect x="210" y="262" width="95" height="100" rx="3" fill="#1c0b02" stroke="#451a03" stroke-width="1.5"/>
                                <rect x="320" y="262" width="85" height="100" rx="3" fill="#1c0b02" stroke="#451a03" stroke-width="1.5"/>

                                <!-- КРУЖКА ОТБОРНОГО ЭЛЯ С ПЫШНОЙ ПЕНОЙ И КЛУБЯЩИМСЯ ПАРОМ -->
                                <g id="counter-ale-mug" transform="translate(130, 192)">
                                    <rect x="0" y="5" width="22" height="26" rx="3" fill="#92400e" stroke="#451a03" stroke-width="1.5"/>
                                    <!-- Ручка кружки -->
                                    <path d="M22,9 Q32,18 22,27" stroke="#451a03" stroke-width="2.5" fill="none"/>
                                    <!-- Белая шапка пены -->
                                    <ellipse cx="11" cy="5" rx="12" ry="5" fill="#fef08a" stroke="#ca8a04" stroke-width="1"/>
                                    <circle cx="6" cy="4" r="3" fill="#ffffff"/>
                                    <circle cx="14" cy="3.5" r="3.5" fill="#ffffff"/>
                                    <!-- Струйки пара над горячим медовым элем -->
                                    <path d="M7,0 Q4,-8 9,-16" stroke="#fef08a" stroke-width="1.4" fill="none" opacity="0.7" class="anim-ale-steam steam-1"/>
                                    <path d="M14,-1 Q18,-9 13,-18" stroke="#ffffff" stroke-width="1.4" fill="none" opacity="0.6" class="anim-ale-steam steam-2"/>
                                </g>

                                <!-- КОВАНЫЙ ПОДСВЕЧНИК С ГОРЯЩЕЙ СВЕЧОЙ -->
                                <g id="counter-candle" transform="translate(370, 195)">
                                    <circle cx="0" cy="0" r="38" fill="url(#candleLight)" class="anim-candle-flame"/>
                                    <rect x="-8" y="22" width="16" height="5" rx="2" fill="#ca8a04" stroke="#78350f" stroke-width="1"/>
                                    <rect x="-3" y="10" width="6" height="14" fill="#f8fafc" rx="1"/>
                                    <!-- Пламя свечи -->
                                    <polygon points="-2,10 0,0 2,10" fill="#fde047" class="anim-candle-flame"/>
                                    <circle cx="0" cy="5" r="1.8" fill="#ffffff"/>
                                </g>

                                <!-- Монеты на стойке -->
                                <circle cx="215" cy="235" r="5" fill="#ca8a04" stroke="#78350f" stroke-width="0.8"/>
                                <circle cx="224" cy="236" r="4.5" fill="#eab308" stroke="#78350f" stroke-width="0.8"/>
                                <circle cx="220" cy="233" r="4.8" fill="#facc15" stroke="#78350f" stroke-width="0.8"/>
                            </g>

                            <!-- АТМОСФЕРНЫЙ СВЕТ: ПАРЯЩИЕ ЗОЛОТИСТЫЕ ПЫЛИНКИ В ЛУЧАХ ОЧАГА -->
                            <g id="tavern-ambient-dust" pointer-events="none">
                                <circle cx="110" cy="180" r="1.5" fill="#fef08a" class="ambient-dust dust-1"/>
                                <circle cx="180" cy="150" r="1.8" fill="#fde047" class="ambient-dust dust-2"/>
                                <circle cx="240" cy="170" r="1.4" fill="#fef08a" class="ambient-dust dust-3"/>
                                <circle cx="310" cy="190" r="1.6" fill="#fde047" class="ambient-dust dust-4"/>
                                <circle cx="150" cy="210" r="1.3" fill="#fef08a" class="ambient-dust dust-5"/>
                            </g>
                        </svg>
                    </div>

                    <div class="interior-interaction-panel">
                        <div class="npc-dialog-card">
                            <div class="npc-header-row">
                                <div class="npc-badge-mini">
                                    <div class="npc-bust-circle">${NpcRenderer.renderBust(this.npc)}</div>
                                    <span class="npc-title">${this.npc.name}</span>
                                </div>
                                <span class="npc-status-tag">Хозяин заведения</span>
                            </div>
                            <div class="npc-speech-bubble" id="brok-speech">
                                «Здорово, путник! Проходи к очагу. В такую сырость кружка доброго эля и мягкая постель — лучшее лекарство от могильного холода катакомб.»
                            </div>
                            <div id="npc-quest-prompt-slot">
                                ${QuestRenderer.renderNpcQuestPrompts(this.player, 'brok')}
                            </div>
                        </div>

                        <div class="goods-tabs">
                            <button class="goods-tab-btn ${this.activeTab === 'services' ? 'active' : ''}" id="tab-tavern-services">Услуги и угощения</button>
                            <button class="goods-tab-btn ${this.activeTab === 'quests' ? 'active' : ''}" id="tab-tavern-quests">
                                Поручения ${QuestSystem.hasAvailableQuestsForNpc(this.player, 'brok') ? `<span class="badge-tab-count">${QuestSystem.getAvailableQuestsForNpc(this.player, 'brok').length}</span>` : ''}
                            </button>
                        </div>

                        <div class="goods-content-view" id="tavern-tab-content"></div>

                        <div class="interior-status-footer" id="tavern-feedback">
                            ${this.renderTavernBuffStatus()}
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.initEvents();
        this.renderTabContent();
        this.startBuffTicker();
    }

    initEvents() {
        this.container.querySelector('#btn-leave-tavern').addEventListener('click', () => {
            this.cleanup();
            sound.playSfx('click');
            sound.switchMusic(townTheme, 1.2);
            this.callbacks.onBack();
        });

        const tabServices = this.container.querySelector('#tab-tavern-services');
        if (tabServices) {
            tabServices.addEventListener('click', () => {
                sound.playSfx('tab');
                this.activeTab = 'services';
                this.updateTabs();
                this.renderTabContent();
            });
        }

        const tabQuests = this.container.querySelector('#tab-tavern-quests');
        if (tabQuests) {
            tabQuests.addEventListener('click', () => {
                sound.playSfx('tab');
                this.activeTab = 'quests';
                this.updateTabs();
                this.renderTabContent();
            });
        }

        this.bindQuestPromptEvents();
    }

    bindQuestPromptEvents() {
        const slot = this.container.querySelector('#npc-quest-prompt-slot');
        if (!slot) return;
        slot.querySelectorAll('.btn-quest-turnin').forEach(btn => {
            btn.addEventListener('click', () => {
                const questId = btn.dataset.questId;
                const res = QuestSystem.interactWithNpc(this.player, questId, 'brok');
                if (res.success) {
                    this.container.querySelector('#brok-speech').textContent = res.dialogText;
                    slot.innerHTML = QuestRenderer.renderNpcQuestPrompts(this.player, 'brok');
                    this.updateTabs();
                    this.renderTabContent();
                    this.bindQuestPromptEvents();
                }
            });
        });
    }

    updateTabs() {
        const tabServices = this.container.querySelector('#tab-tavern-services');
        const tabQuests = this.container.querySelector('#tab-tavern-quests');
        if (tabServices) tabServices.classList.toggle('active', this.activeTab === 'services');
        if (tabQuests) {
            tabQuests.classList.toggle('active', this.activeTab === 'quests');
            const availCount = QuestSystem.getAvailableQuestsForNpc(this.player, 'brok').length;
            tabQuests.innerHTML = `Поручения ${availCount > 0 ? `<span class="badge-tab-count">${availCount}</span>` : ''}`;
        }
        this.container.querySelector('#loc-gold-val').textContent = this.player.gold;
    }

    renderTabContent() {
        const view = this.container.querySelector('#tavern-tab-content');
        if (!view) return;

        if (this.activeTab === 'quests') {
            view.innerHTML = QuestRenderer.renderNpcQuestsTab(this.player, 'brok');
            view.querySelectorAll('.btn-accept-quest').forEach(btn => {
                btn.addEventListener('click', () => {
                    const questId = btn.dataset.questId;
                    const res = QuestSystem.acceptQuest(this.player, questId);
                    if (res.success) {
                        this.container.querySelector('#brok-speech').textContent = res.quest.dialogPending;
                        const slot = this.container.querySelector('#npc-quest-prompt-slot');
                        if (slot) slot.innerHTML = QuestRenderer.renderNpcQuestPrompts(this.player, 'brok');
                        this.updateTabs();
                        this.renderTabContent();
                        this.bindQuestPromptEvents();
                    }
                });
            });
            return;
        }

        view.innerHTML = `
            <div class="interior-services-box">
                <div class="service-action-row">
                    <div class="srv-icon">${Icons.bed(22)}</div>
                    <div class="srv-info">
                        <div class="srv-name">Снять теплую комнату</div>
                        <div class="srv-desc">Сон до утра. Полностью восстанавливает HP и MP.</div>
                    </div>
                    <button class="btn btn-primary srv-btn" id="btn-rest" ${this.player.gold < 10 ? 'disabled' : ''}>
                        Отдохнуть — ${Icons.coin(13)} 10
                    </button>
                </div>

                <div class="service-action-row">
                    <div class="srv-icon">${Icons.ale(22)}</div>
                    <div class="srv-info">
                        <div class="srv-name">Кружка отборного эля</div>
                        <div class="srv-desc">Прилив сил: +5% к шансу крита на 3 минуты (баффы не стакаются).</div>
                    </div>
                    <button class="btn btn-primary srv-btn" id="btn-ale" ${this.player.gold < 5 ? 'disabled' : ''}>
                        Выпить — ${Icons.coin(13)} 5
                    </button>
                </div>

                <div class="service-action-row">
                    <div class="srv-icon">${Icons.chat(22)}</div>
                    <div class="srv-info">
                        <div class="srv-name">Послушать трактирные слухи</div>
                        <div class="srv-desc">Узнай полезные секреты и тайны глубин подземелья.</div>
                    </div>
                    <button class="btn btn-secondary srv-btn" id="btn-rumor">
                        Слушать (Бесплатно)
                    </button>
                </div>

                ${getTraderStock('tavern', this.player.level || 1).map(food => {
                    if (food.locked) {
                        return `
                            <div class="service-action-row item-locked" title="Откроется на ${food.reqLevel} уровне">
                                <div class="srv-icon item-icon-locked">${food.icon}</div>
                                <div class="srv-info">
                                    <div class="srv-name item-title-locked">
                                        ${food.name}
                                        <span class="badge-item-locked">${Icons.lock(11)} Ур. ${food.reqLevel}</span>
                                    </div>
                                    <div class="srv-desc">${food.desc}</div>
                                </div>
                                <button class="btn btn-secondary srv-btn btn-locked-state" disabled>
                                    ${Icons.lock(12)} С ${food.reqLevel} ур.
                                </button>
                            </div>
                        `;
                    }
                    return `
                        <div class="service-action-row">
                            <div class="srv-icon">${food.icon}</div>
                            <div class="srv-info">
                                <div class="srv-name">${food.name}</div>
                                <div class="srv-desc">${food.desc} (4 мин, не стакается)</div>
                            </div>
                            <button class="btn btn-primary srv-btn btn-buy-food" data-id="${food.id}" ${this.player.gold < food.price ? 'disabled' : ''}>
                                В сумку — ${Icons.coin(13)} ${food.price}
                            </button>
                        </div>
                    `;
                }).join('')}
            </div>
        `;

        const btnRest = view.querySelector('#btn-rest');
        if (btnRest) {
            btnRest.addEventListener('click', () => {
                if (this.player.gold >= 10) {
                    this.player.gold -= 10;
                    this.player.currentHp = this.player.maxHp;
                    this.player.currentMp = this.player.maxMp;
                    sound.playSfx('coin');
                    this.container.querySelector('#loc-gold-val').textContent = this.player.gold;
                    this.container.querySelector('#brok-speech').textContent = '«Сладких снов! Можешь спать спокойно, мои дубовые двери выдержат осаду даже взбесившегося огра.»';
                    this.updateTavernStatus('Ты превосходно отдохнул и восстановил силы!');
                    this.updateButtons();
                }
            });
        }

        const btnAle = view.querySelector('#btn-ale');
        if (btnAle) {
            btnAle.addEventListener('click', () => {
                if (this.player.gold >= 5) {
                    this.player.gold -= 5;
                    this.player.setTavernBuff({
                        id: 'ale',
                        name: 'Отборный эль',
                        desc: '+5% к шансу крита',
                        critChance: 5,
                        durationSeconds: 180
                    });
                    sound.playSfx('coin');
                    this.container.querySelector('#loc-gold-val').textContent = this.player.gold;
                    this.container.querySelector('#brok-speech').textContent = '«Ха! Вот это по-нашему! Хороший эль разгоняет кровь в жилах. Рука не дрогнет в бою! Действует 3 минуты.»';
                    this.updateTavernStatus(`Боевой кураж на 3 минуты: <strong>+5% к шансу крита</strong> (эффекты не стакаются)!`);
                    this.updateButtons();
                }
            });
        }

        const btnRumor = view.querySelector('#btn-rumor');
        if (btnRumor) {
            btnRumor.addEventListener('click', () => {
                sound.playSfx('tab');
                const random = this.rumors[Math.floor(Math.random() * this.rumors.length)];
                this.container.querySelector('#brok-speech').textContent = random;
            });
        }

        const stock = getTraderStock('tavern', this.player.level || 1);
        view.querySelectorAll('.btn-buy-food').forEach(btn => {
            btn.addEventListener('click', () => {
                const food = stock.find(f => f.id === btn.dataset.id && !f.locked);
                if (food && this.player.gold >= food.price) {
                    this.player.gold -= food.price;
                    this.player.inventory.push({ ...food });
                    sound.playSfx('coin');
                    this.container.querySelector('#loc-gold-val').textContent = this.player.gold;
                    this.container.querySelector('#brok-speech').textContent = `«Завернул свежее ${food.name} с собой в дорогу. Подкрепись в катакомбах через инвентарь (бафф действует 4 минуты)!»`;
                    this.updateTavernStatus(`Приобретено: <strong>${food.name}</strong> (добавлено в инвентарь)`);
                    this.updateButtons();
                }
            });
        });

        this.updateButtons();
    }

    updateTavernStatus(customMessage = null) {
        const footer = this.container?.querySelector('#tavern-feedback');
        if (footer) {
            if (customMessage) {
                footer.innerHTML = `${customMessage} | ${this.renderTavernBuffStatus()}`;
            } else {
                footer.innerHTML = this.renderTavernBuffStatus();
            }
        }
    }

    updateButtons() {
        this.container.querySelector('#btn-rest').disabled = this.player.gold < 10;
        this.container.querySelector('#btn-ale').disabled = this.player.gold < 5;
        const stock = getTraderStock('tavern', this.player.level || 1);
        this.container.querySelectorAll('.btn-buy-food').forEach(btn => {
            const food = stock.find(f => f.id === btn.dataset.id);
            if (food) {
                btn.disabled = this.player.gold < food.price;
            }
        });
    }
}