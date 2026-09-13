import { sound } from '../../audio/audioEngine.js';
import { shopMusic } from '../../audio/music/shopMusic.js';
import { townTheme } from '../../audio/music/townTheme.js';
import { CharacterRenderer } from '../../visuals/characterRenderer.js';
import { NpcRenderer, NPC_CONFIGS } from '../../visuals/npcRenderer.js';
import { Icons } from '../../visuals/icons.js';
import { getTraderStock } from '../../data/itemsData.js';
import { QuestSystem } from '../../services/questSystem.js';
import { QuestRenderer } from '../../ui/questRenderer.js';

export class ShopScreen {
    constructor(player, callbacks) {
        this.player = player;
        this.callbacks = callbacks;
        this.npc = NPC_CONFIGS.rashid;
        this.activeTab = 'buy';

        sound.switchMusic(shopMusic, 1.2);
        this.updateStock();
    }

    updateStock() {
        this.catalog = getTraderStock('shop', this.player.level || 1);
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
                        <h2>Лавка редкостей Рашида</h2>
                        <span class="interior-subtitle">Заморские снадобья, древние свитки и скупка добычи</span>
                    </div>
                    <button class="btn btn-secondary" id="btn-leave-shop">На площадь города</button>
                </div>

                <div class="interior-stage">
                    <div class="interior-scene-box">
                        <svg viewBox="0 0 460 380" class="shop-scene-svg">
                            <defs>
                                <radialGradient id="bazaarAmbient" cx="40%" cy="40%" r="65%">
                                    <stop offset="0%" stop-color="#581c87" stop-opacity="0.35"/>
                                    <stop offset="50%" stop-color="#3b0764" stop-opacity="0.2"/>
                                    <stop offset="100%" stop-color="#09020d" stop-opacity="0"/>
                                </radialGradient>

                                <radialGradient id="incenseGlow" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stop-color="#e879f9" stop-opacity="0.8"/>
                                    <stop offset="50%" stop-color="#818cf8" stop-opacity="0.3"/>
                                    <stop offset="100%" stop-color="#0f0728" stop-opacity="0"/>
                                </radialGradient>

                                <radialGradient id="lampGlowShop" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stop-color="#fef08a" stop-opacity="0.95"/>
                                    <stop offset="45%" stop-color="#f59e0b" stop-opacity="0.4"/>
                                    <stop offset="100%" stop-color="#14110f" stop-opacity="0"/>
                                </radialGradient>

                                <radialGradient id="potionFlaskRed" cx="40%" cy="40%" r="60%">
                                    <stop offset="0%" stop-color="#f87171"/>
                                    <stop offset="70%" stop-color="#dc2626"/>
                                    <stop offset="100%" stop-color="#450a0a"/>
                                </radialGradient>

                                <radialGradient id="potionFlaskBlue" cx="40%" cy="40%" r="60%">
                                    <stop offset="0%" stop-color="#67e8f9"/>
                                    <stop offset="70%" stop-color="#0284c7"/>
                                    <stop offset="100%" stop-color="#082f49"/>
                                </radialGradient>

                                <linearGradient id="silkDrape" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stop-color="#701a75"/>
                                    <stop offset="35%" stop-color="#a21caf"/>
                                    <stop offset="70%" stop-color="#701a75"/>
                                    <stop offset="100%" stop-color="#4a044e"/>
                                </linearGradient>
                            </defs>

                            <!-- Темный фон лавки с восточным фиолетовым отливом -->
                            <rect width="460" height="380" fill="#110914"/>
                            <rect width="460" height="380" fill="url(#bazaarAmbient)"/>

                            <!-- Мавританская декоративная арка на заднем плане -->
                            <path d="M40,380 L40,110 Q40,40 120,35 Q230,28 340,35 Q420,40 420,110 L420,380 Z" fill="#1f0a24" stroke="#4a044e" stroke-width="2.5"/>
                            <path d="M70,380 L70,120 Q120,60 230,55 Q340,60 390,120 L390,380 Z" fill="#16061a" stroke="#ca8a04" stroke-width="1.5" stroke-dasharray="6 4"/>

                            <!-- Левое арочное окно в восточном стиле со звездами -->
                            <g id="shop-window" transform="translate(48, 48)">
                                <path d="M0,85 L0,35 Q30,0 60,35 L60,85 Z" fill="#0c0a22" stroke="#ca8a04" stroke-width="2"/>
                                <!-- Звезды на небе -->
                                <circle cx="20" cy="30" r="1" fill="#ffffff"/>
                                <circle cx="45" cy="22" r="1.2" fill="#fef08a"/>
                                <circle cx="35" cy="45" r="0.9" fill="#ffffff"/>
                                <circle cx="15" cy="55" r="1" fill="#fef08a"/>
                                <!-- Узор решетки окна -->
                                <circle cx="30" cy="35" r="14" fill="none" stroke="#78350f" stroke-width="1.2"/>
                                <line x1="30" y1="5" x2="30" y2="85" stroke="#78350f" stroke-width="1.2"/>
                                <line x1="0" y1="50" x2="60" y2="50" stroke="#78350f" stroke-width="1.2"/>
                            </g>

                            <!-- Роскошные шелковые драпировки по краям с золотыми подхватами -->
                            <path d="M0,0 L120,0 Q60,60 30,160 L0,160 Z" fill="url(#silkDrape)" stroke="#ca8a04" stroke-width="1.5"/>
                            <circle cx="32" cy="155" r="6" fill="#ca8a04"/>
                            <path d="M460,0 L340,0 Q400,60 430,160 L460,160 Z" fill="url(#silkDrape)" stroke="#ca8a04" stroke-width="1.5"/>
                            <circle cx="428" cy="155" r="6" fill="#ca8a04"/>

                            <!-- АЛХИМИЧЕСКИЕ ПОЛКИ С БУРЛЯЩИМИ ЗЕЛЬЯМИ (СПРАВА) -->
                            <g id="alchemist-shelves" transform="translate(260, 42)">
                                <rect x="0" y="38" width="165" height="7" rx="1.5" fill="#451a03" stroke="#240c01" stroke-width="1.2"/>
                                <!-- Колба с исцеляющим зельем и поднимающимися пузырьками -->
                                <g transform="translate(18, 12)">
                                    <circle cx="12" cy="18" r="12" fill="url(#potionFlaskRed)" stroke="#991b1b" stroke-width="1.2"/>
                                    <rect x="9" y="0" width="6" height="8" fill="#e2e8f0" stroke="#991b1b" stroke-width="0.8"/>
                                    <rect x="7" y="-2" width="10" height="3" rx="1" fill="#ca8a04"/>
                                    <!-- Анимированные пузырьки -->
                                    <circle cx="9" cy="22" r="1.6" fill="#fef08a" class="potion-bubble bubble-1"/>
                                    <circle cx="14" cy="19" r="2.0" fill="#ffffff" class="potion-bubble bubble-2"/>
                                    <circle cx="11" cy="14" r="1.4" fill="#fca5a5" class="potion-bubble bubble-3"/>
                                </g>

                                <!-- Колба с маной -->
                                <g transform="translate(52, 12)">
                                    <circle cx="12" cy="18" r="12" fill="url(#potionFlaskBlue)" stroke="#0369a1" stroke-width="1.2"/>
                                    <rect x="9" y="0" width="6" height="8" fill="#e2e8f0" stroke="#0369a1" stroke-width="0.8"/>
                                    <rect x="7" y="-2" width="10" height="3" rx="1" fill="#ca8a04"/>
                                    <!-- Анимированные пузырьки -->
                                    <circle cx="14" cy="21" r="1.8" fill="#bae6fd" class="potion-bubble bubble-2"/>
                                    <circle cx="10" cy="16" r="1.5" fill="#ffffff" class="potion-bubble bubble-1"/>
                                </g>

                                <!-- Изумрудный фиал с ядом -->
                                <g transform="translate(86, 15)">
                                    <polygon points="10,0 14,0 18,22 6,22" fill="#059669" stroke="#065f46" stroke-width="1"/>
                                    <rect x="8" y="-4" width="8" height="4" fill="#ca8a04"/>
                                    <circle cx="12" cy="16" r="1.6" fill="#86efac" class="potion-bubble bubble-3"/>
                                </g>

                                <!-- Древние свитки с сургучными печатями -->
                                <g transform="translate(118, 16)">
                                    <rect x="0" y="8" width="36" height="14" rx="3" fill="#fef3c7" stroke="#b45309" stroke-width="1"/>
                                    <line x1="12" y1="8" x2="12" y2="22" stroke="#ca8a04" stroke-width="2"/>
                                    <circle cx="12" cy="15" r="3" fill="#dc2626"/>
                                    <rect x="5" y="-2" width="28" height="10" rx="2" fill="#fde68a" stroke="#b45309" stroke-width="0.8"/>
                                </g>
                            </g>

                            <!-- ПОДВЕСНАЯ ВОСТОЧНАЯ КУРИЛЬНИЦА С ВИХРЯМИ ЛАДАНА (СЛЕВА) -->
                            <g id="shop-censer" transform="translate(105, 75)" class="anim-censer-sway">
                                <line x1="0" y1="-50" x2="-8" y2="0" stroke="#ca8a04" stroke-width="1.2"/>
                                <line x1="0" y1="-50" x2="8" y2="0" stroke="#ca8a04" stroke-width="1.2"/>
                                <!-- Ажурный латунный сосуд -->
                                <path d="M-14,0 L14,0 L10,18 Q0,26 -10,18 Z" fill="#ca8a04" stroke="#78350f" stroke-width="1.5"/>
                                <circle cx="0" cy="8" r="3" fill="#fef08a"/>
                                <!-- Аура и фиолетово-сизые клубы благовонного дыма -->
                                <circle cx="0" cy="-6" r="24" fill="url(#incenseGlow)"/>
                                <path d="M-3,-4 Q-12,-18 -4,-32 Q6,-46 -2,-60" stroke="#c084fc" stroke-width="2.5" fill="none" opacity="0.75" class="anim-incense-smoke wisp-1"/>
                                <path d="M3,-2 Q14,-16 6,-30 Q-4,-44 4,-58" stroke="#e879f9" stroke-width="2" fill="none" opacity="0.65" class="anim-incense-smoke wisp-2"/>
                                <path d="M0,-6 Q-6,-24 2,-40 Q10,-52 0,-66" stroke="#e2e8f0" stroke-width="1.6" fill="none" opacity="0.5" class="anim-incense-smoke wisp-3"/>
                            </g>

                            <!-- СПРАЙТ КУПЦА РАШИДА С АНИМАЦИЕЙ ДЫХАНИЯ -->
                            <g id="shop-rashid-sprite" transform="translate(175, 48) scale(0.95)" class="npc-interior-breathe">
                                ${NpcRenderer.render(this.npc)}
                            </g>

                            <!-- ПЕРЕДНИЙ ПЛАН: ПРИЛАВОК С ВЕСАМИ, ЗОЛОТОМ И СВЕТИЛЬНИКОМ -->
                            <g id="shop-counter-foreground">
                                <!-- Массивный прилавок из резного кедра с позолотой -->
                                <rect x="80" y="222" width="345" height="28" rx="4" fill="#4c0519" stroke="#881337" stroke-width="2.5"/>
                                <line x1="85" y1="225" x2="420" y2="225" stroke="#facc15" stroke-width="2"/>
                                <!-- Фасад прилавка с восточным резным орнаментом -->
                                <rect x="88" y="250" width="330" height="130" fill="#2d030f" stroke="#170107" stroke-width="2"/>
                                <rect x="100" y="260" width="95" height="105" rx="4" fill="#3f0514" stroke="#ca8a04" stroke-width="1.5"/>
                                <rect x="210" y="260" width="105" height="105" rx="4" fill="#3f0514" stroke="#ca8a04" stroke-width="1.5"/>
                                <rect x="330" y="260" width="75" height="105" rx="4" fill="#3f0514" stroke="#ca8a04" stroke-width="1.5"/>

                                <!-- ЗОЛОТЫЕ АПТЕКАРСКИЕ ВЕСЫ С КОЛЕБАНИЕМ ЧАШ -->
                                <g id="counter-scales" transform="translate(125, 185)" class="anim-scales-tilt">
                                    <!-- Стойка весов -->
                                    <line x1="25" y1="8" x2="25" y2="42" stroke="#ca8a04" stroke-width="3"/>
                                    <polygon points="20,42 30,42 33,46 17,46" fill="#ca8a04"/>
                                    <!-- Коромысло весов -->
                                    <line x1="2" y1="12" x2="48" y2="12" stroke="#facc15" stroke-width="2.5"/>
                                    <circle cx="25" cy="12" r="3.5" fill="#facc15"/>
                                    <!-- Левая чаша с гирьками -->
                                    <line x1="2" y1="12" x2="-4" y2="26" stroke="#ca8a04" stroke-width="1.2"/>
                                    <line x1="2" y1="12" x2="8" y2="26" stroke="#ca8a04" stroke-width="1.2"/>
                                    <ellipse cx="2" cy="26" rx="8" ry="3" fill="#facc15" stroke="#78350f" stroke-width="1"/>
                                    <rect x="0" y="22" width="4" height="4" fill="#78350f"/>
                                    <!-- Правая чаша с самоцветом -->
                                    <line x1="48" y1="12" x2="42" y2="28" stroke="#ca8a04" stroke-width="1.2"/>
                                    <line x1="48" y1="12" x2="54" y2="28" stroke="#ca8a04" stroke-width="1.2"/>
                                    <ellipse cx="48" cy="28" rx="8" ry="3" fill="#facc15" stroke="#78350f" stroke-width="1"/>
                                    <polygon points="46,27 48,23 50,27 48,29" fill="#38bdf8"/>
                                </g>

                                <!-- ВОСТОЧНАЯ МАСЛЯНАЯ ЛАМПА С МЯГКИМ ТЕПЛЫМ МЕРЦАНИЕМ -->
                                <g id="counter-lamp" transform="translate(370, 185)">
                                    <circle cx="0" cy="0" r="42" fill="url(#lampGlowShop)" class="anim-lamp-glow"/>
                                    <!-- Корпус медной лампы Аладдина -->
                                    <path d="M-12,24 Q0,16 14,22 L18,14 Q8,18 0,16 Q-6,14 -12,24 Z" fill="#ca8a04" stroke="#78350f" stroke-width="1.5"/>
                                    <ellipse cx="0" cy="25" rx="8" ry="3" fill="#ca8a04"/>
                                    <!-- Пламя на кончике носика -->
                                    <polygon points="17,14 20,4 22,14" fill="#fde047" class="anim-lamp-flame"/>
                                    <circle cx="20" cy="9" r="1.5" fill="#ffffff"/>
                                </g>

                                <!-- Стопки золотых монет на прилавке -->
                                <g transform="translate(225, 230)">
                                    <ellipse cx="0" cy="6" rx="9" ry="3.5" fill="#ca8a04" stroke="#78350f" stroke-width="0.8"/>
                                    <ellipse cx="0" cy="3" rx="9" ry="3.5" fill="#eab308" stroke="#78350f" stroke-width="0.8"/>
                                    <ellipse cx="0" cy="0" rx="9" ry="3.5" fill="#facc15" stroke="#78350f" stroke-width="0.8"/>
                                    <ellipse cx="14" cy="4" rx="7" ry="2.8" fill="#eab308" stroke="#78350f" stroke-width="0.8"/>
                                    <ellipse cx="14" cy="1" rx="7" ry="2.8" fill="#facc15" stroke="#78350f" stroke-width="0.8"/>
                                </g>
                            </g>

                            <!-- ПАРЯЩИЕ МАГИЧЕСКИЕ ИСКРЫ РЕДКОСТЕЙ -->
                            <g id="shop-mystic-sparkles" pointer-events="none">
                                <circle cx="280" cy="60" r="1.5" fill="#e879f9" class="curio-sparkle sparkle-1"/>
                                <circle cx="340" cy="50" r="1.8" fill="#38bdf8" class="curio-sparkle sparkle-2"/>
                                <circle cx="110" cy="90" r="1.4" fill="#fef08a" class="curio-sparkle sparkle-3"/>
                                <circle cx="200" cy="180" r="1.6" fill="#fde047" class="curio-sparkle sparkle-4"/>
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
                                <span class="npc-status-tag">Купец восточных земель</span>
                            </div>
                            <div class="npc-speech-bubble" id="rashid-speech">
                                «Мир твоему пути, почтенный путник! Смотри, выбирай — редчайшие снадобья, древние пергаменты. А если принесёшь сокровища из глубин — взвешу на золотых весах без обмана!»
                            </div>
                            <div id="npc-quest-prompt-slot">
                                ${QuestRenderer.renderNpcQuestPrompts(this.player, 'rashid')}
                            </div>
                        </div>

                        <div class="goods-tabs">
                            <button class="goods-tab-btn ${this.activeTab === 'buy' ? 'active' : ''}" id="tab-buy">Купить товары</button>
                            <button class="goods-tab-btn ${this.activeTab === 'sell' ? 'active' : ''}" id="tab-sell">Продать трофеи (${this.player.inventory.length})</button>
                            <button class="goods-tab-btn ${this.activeTab === 'quests' ? 'active' : ''}" id="tab-quests">
                                Поручения ${QuestSystem.hasAvailableQuestsForNpc(this.player, 'rashid') ? `<span class="badge-tab-count">${QuestSystem.getAvailableQuestsForNpc(this.player, 'rashid').length}</span>` : ''}
                            </button>
                        </div>

                        <div class="goods-content-view" id="shop-goods-content"></div>
                    </div>
                </div>
            </div>
        `;

        this.initEvents();
        this.renderGoodsList();
    }

    initEvents() {
        this.container.querySelector('#btn-leave-shop').addEventListener('click', () => {
            sound.playSfx('click');
            sound.switchMusic(townTheme, 1.2);
            this.callbacks.onBack();
        });

        this.container.querySelector('#tab-buy').addEventListener('click', () => {
            sound.playSfx('tab');
            this.activeTab = 'buy';
            this.updateTabs();
            this.renderGoodsList();
        });

        this.container.querySelector('#tab-sell').addEventListener('click', () => {
            sound.playSfx('tab');
            this.activeTab = 'sell';
            this.updateTabs();
            this.renderGoodsList();
        });

        const tabQuests = this.container.querySelector('#tab-quests');
        if (tabQuests) {
            tabQuests.addEventListener('click', () => {
                sound.playSfx('tab');
                this.activeTab = 'quests';
                this.updateTabs();
                this.renderGoodsList();
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
                const res = QuestSystem.interactWithNpc(this.player, questId, 'rashid');
                if (res.success) {
                    this.container.querySelector('#rashid-speech').textContent = res.dialogText;
                    slot.innerHTML = QuestRenderer.renderNpcQuestPrompts(this.player, 'rashid');
                    this.updateTabs();
                    this.renderGoodsList();
                    this.bindQuestPromptEvents();
                }
            });
        });
    }

    updateTabs() {
        this.container.querySelector('#tab-buy').classList.toggle('active', this.activeTab === 'buy');
        this.container.querySelector('#tab-sell').classList.toggle('active', this.activeTab === 'sell');
        const tabQuests = this.container.querySelector('#tab-quests');
        if (tabQuests) {
            tabQuests.classList.toggle('active', this.activeTab === 'quests');
            const availCount = QuestSystem.getAvailableQuestsForNpc(this.player, 'rashid').length;
            tabQuests.innerHTML = `Поручения ${availCount > 0 ? `<span class="badge-tab-count">${availCount}</span>` : ''}`;
        }
        this.container.querySelector('#tab-sell').textContent = `Продать трофеи (${this.player.inventory.length})`;
        this.container.querySelector('#loc-gold-val').textContent = this.player.gold;
    }

    renderGoodsList() {
        const view = this.container.querySelector('#shop-goods-content');

        if (this.activeTab === 'quests') {
            view.innerHTML = QuestRenderer.renderNpcQuestsTab(this.player, 'rashid');
            view.querySelectorAll('.btn-accept-quest').forEach(btn => {
                btn.addEventListener('click', () => {
                    const questId = btn.dataset.questId;
                    const res = QuestSystem.acceptQuest(this.player, questId);
                    if (res.success) {
                        this.container.querySelector('#rashid-speech').textContent = res.quest.dialogPending;
                        const slot = this.container.querySelector('#npc-quest-prompt-slot');
                        if (slot) slot.innerHTML = QuestRenderer.renderNpcQuestPrompts(this.player, 'rashid');
                        this.updateTabs();
                        this.renderGoodsList();
                        this.bindQuestPromptEvents();
                    }
                });
            });
            return;
        }

        if (this.activeTab === 'buy') {
            this.updateStock();
            const availableItems = this.catalog.filter(i => !i.locked);
            const lockedItems = this.catalog.filter(i => i.locked);

            view.innerHTML = `
                <div class="items-cards-grid">
                    ${availableItems.map(item => `
                        <div class="item-trade-card">
                            <div class="item-trade-icon">${item.icon}</div>
                            <div class="item-trade-details">
                                <div class="item-trade-title">${item.name}</div>
                                <div class="item-trade-desc">${item.desc}</div>
                            </div>
                            <button class="btn btn-primary btn-buy-item" data-id="${item.id}" ${this.player.gold < item.price ? 'disabled' : ''}>
                                ${Icons.coin(13)} ${item.price}
                            </button>
                        </div>
                    `).join('')}

                    ${lockedItems.map(item => `
                        <div class="item-trade-card item-locked" title="Станет доступно при достижении ${item.reqLevel} уровня">
                            <div class="item-trade-icon item-icon-locked">${item.icon}</div>
                            <div class="item-trade-details">
                                <div class="item-trade-title item-title-locked">
                                    ${item.name}
                                    <span class="badge-item-locked">${Icons.lock(11)} Ур. ${item.reqLevel}</span>
                                </div>
                                <div class="item-trade-desc">${item.desc}</div>
                            </div>
                            <button class="btn btn-secondary btn-locked-state" disabled>
                                ${Icons.lock(12)} С ${item.reqLevel} ур.
                            </button>
                        </div>
                    `).join('')}
                </div>
            `;

            view.querySelectorAll('.btn-buy-item').forEach(btn => {
                btn.addEventListener('click', () => {
                    const item = this.catalog.find(i => i.id === btn.dataset.id && !i.locked);
                    if (item && this.player.gold >= item.price) {
                        this.player.gold -= item.price;
                        this.player.inventory.push({ ...item });
                        sound.playSfx('coin');
                        this.container.querySelector('#rashid-speech').textContent = `«Прекрасная покупка! ${item.name} убережёт тебя от погибели в самый тёмный час.»`;
                        this.updateTabs();
                        this.renderGoodsList();
                    }
                });
            });
        } else {
            if (this.player.inventory.length === 0) {
                view.innerHTML = `
                    <div class="empty-inventory-msg">
                        Твой вещмешок пуст. Спустись в катакомбы, одолей чудовищ и принеси найденную добычу на продажу!
                    </div>
                `;
            } else {
                view.innerHTML = `
                    <div class="items-cards-grid">
                        ${this.player.inventory.map((item, idx) => {
                            const sellPrice = Math.max(1, Math.round((item.price || 15) * 0.65));
                            return `
                                <div class="item-trade-card">
                                    <div class="item-trade-icon">${item.icon || Icons.scroll(22)}</div>
                                    <div class="item-trade-details">
                                        <div class="item-trade-title">${item.name}</div>
                                        <div class="item-trade-desc">${item.desc || 'Трофей из глубин катакомб'}</div>
                                    </div>
                                    <button class="btn btn-secondary btn-sell-item" data-idx="${idx}">
                                        Продать за ${Icons.coin(13)} ${sellPrice}
                                    </button>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `;

                view.querySelectorAll('.btn-sell-item').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const idx = parseInt(btn.dataset.idx, 10);
                        const item = this.player.inventory[idx];
                        if (item) {
                            const sellPrice = Math.max(1, Math.round((item.price || 15) * 0.65));
                            this.player.gold += sellPrice;
                            this.player.inventory.splice(idx, 1);
                            sound.playSfx('coin');
                            this.container.querySelector('#rashid-speech').textContent = `«Удачная сделка! Забираю ${item.name} и отсчитываю ${sellPrice} золотых прямо в ладонь.»`;
                            this.updateTabs();
                            this.renderGoodsList();
                        }
                    });
                });
            }
        }
    }
}