import { sound } from '../../audio/audioEngine.js';
import { templeMusic } from '../../audio/music/templeMusic.js';
import { townTheme } from '../../audio/music/townTheme.js';
import { CharacterRenderer } from '../../visuals/characterRenderer.js';
import { NpcRenderer, NPC_CONFIGS } from '../../visuals/npcRenderer.js';
import { Icons } from '../../visuals/icons.js';
import { getTraderStock } from '../../data/itemsData.js';

export class TempleScreen {
    constructor(player, callbacks) {
        this.player = player;
        this.callbacks = callbacks;
        this.npc = NPC_CONFIGS.elysia;
        this.activeTab = 'blessings';

        sound.switchMusic(templeMusic, 1.4);
        this.updateStock();
    }

    updateStock() {
        this.relics = getTraderStock('temple', this.player.level || 1);
    }

    render(container) {
        this.container = container;
        container.innerHTML = `
            <div class="interior-screen">
                <div class="interior-top-bar">
                    <div class="loc-character-badge">
                        <div class="hud-avatar-frame">${CharacterRenderer.renderBust(this.player.visuals, this.player.classId)}</div>
                        <div class="loc-player-meta">
                            <span class="loc-player-name">${this.player.name}</span>
                            <span class="loc-gold">${Icons.coin(14)} <strong id="loc-gold-val">${this.player.gold}</strong></span>
                        </div>
                    </div>
                    <div class="interior-title-wrap">
                        <h2>Древний Храм Вечного Света</h2>
                        <span class="interior-subtitle">Священная обитель, молитвы стойкости и очищение души</span>
                    </div>
                    <button class="btn btn-secondary" id="btn-leave-temple">${Icons.arrowLeft(13)} На площадь города</button>
                </div>

                <div class="interior-stage">
                    <div class="interior-scene-box">
                        <svg viewBox="0 0 460 380" class="temple-scene-svg">
                            <defs>
                                <radialGradient id="cathedralAmbient" cx="50%" cy="35%" r="65%">
                                    <stop offset="0%" stop-color="#1e1b4b" stop-opacity="0.5"/>
                                    <stop offset="50%" stop-color="#0f172a" stop-opacity="0.3"/>
                                    <stop offset="100%" stop-color="#020617" stop-opacity="0"/>
                                </radialGradient>

                                <radialGradient id="roseWindowLight" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stop-color="#fde047" stop-opacity="1"/>
                                    <stop offset="35%" stop-color="#38bdf8" stop-opacity="0.85"/>
                                    <stop offset="70%" stop-color="#a855f7" stop-opacity="0.4"/>
                                    <stop offset="100%" stop-color="#0f172a" stop-opacity="0"/>
                                </radialGradient>

                                <radialGradient id="templeCandle" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stop-color="#fef08a" stop-opacity="0.95"/>
                                    <stop offset="45%" stop-color="#eab308" stop-opacity="0.4"/>
                                    <stop offset="100%" stop-color="#0f172a" stop-opacity="0"/>
                                </radialGradient>

                                <radialGradient id="elysiaHaloGlow" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stop-color="#fef08a" stop-opacity="0.95"/>
                                    <stop offset="50%" stop-color="#facc15" stop-opacity="0.5"/>
                                    <stop offset="85%" stop-color="#38bdf8" stop-opacity="0.2"/>
                                    <stop offset="100%" stop-color="#0f172a" stop-opacity="0"/>
                                </radialGradient>

                                <linearGradient id="divineBeamGrad" x1="0%" y1="0%" x2="40%" y2="100%">
                                    <stop offset="0%" stop-color="#fef08a" stop-opacity="0.35"/>
                                    <stop offset="50%" stop-color="#38bdf8" stop-opacity="0.18"/>
                                    <stop offset="100%" stop-color="#0284c7" stop-opacity="0"/>
                                </linearGradient>
                            </defs>

                            <!-- Темный глубокий фон собора с лазурным полумраком -->
                            <rect width="460" height="380" fill="#0b0f19"/>
                            <rect width="460" height="380" fill="url(#cathedralAmbient)"/>

                            <!-- Готические стрельчатые арки свода храма -->
                            <path d="M0,0 L0,220 Q120,40 230,20 Q340,40 460,220 L460,0 Z" fill="#111827" stroke="#1e293b" stroke-width="2"/>
                            <path d="M40,0 L40,240 Q130,70 230,50 Q330,70 420,240 L420,0 Z" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>

                            <!-- ВИТРАЖНОЕ ОКНО-РОЗА (ЦЕНТР СВЕРХУ) С НЕБЕСНЫМ СВЕЧЕНИЕМ -->
                            <circle cx="230" cy="105" r="105" fill="url(#roseWindowLight)" class="anim-rose-glow"/>
                            <!-- Каменный ажурный переплет розы -->
                            <circle cx="230" cy="105" r="62" fill="#1e1b4b" stroke="#0284c7" stroke-width="4"/>
                            <circle cx="230" cy="105" r="48" fill="#0c4a6e" stroke="#facc15" stroke-width="2.5"/>
                            <circle cx="230" cy="105" r="24" fill="#0284c7" stroke="#facc15" stroke-width="2"/>
                            <circle cx="230" cy="105" r="10" fill="#fef08a"/>
                            <!-- 12 спиц-лепестков розы -->
                            <line x1="230" y1="43" x2="230" y2="167" stroke="#facc15" stroke-width="2.5"/>
                            <line x1="168" y1="105" x2="292" y2="105" stroke="#facc15" stroke-width="2.5"/>
                            <line x1="186" y1="61" x2="274" y2="149" stroke="#38bdf8" stroke-width="2"/>
                            <line x1="186" y1="149" x2="274" y2="61" stroke="#38bdf8" stroke-width="2"/>

                            <!-- НЕБЕСНЫЕ ЛУЧИ СВЕТА, НИСХОДЯЩИЕ ИЗ ОКНА НА АЛТАРЬ -->
                            <polygon points="210,105 250,105 340,380 120,380" fill="url(#divineBeamGrad)" class="anim-divine-sunbeams beam-main"/>
                            <polygon points="185,105 215,105 160,380 60,380" fill="url(#divineBeamGrad)" opacity="0.6" class="anim-divine-sunbeams beam-left"/>
                            <polygon points="245,105 275,105 400,380 300,380" fill="url(#divineBeamGrad)" opacity="0.6" class="anim-divine-sunbeams beam-right"/>

                            <!-- Величественные колонны из белого мрамора по краям -->
                            <g id="temple-columns">
                                <!-- Левая колонна с капителью -->
                                <rect x="22" y="0" width="36" height="380" fill="#334155" stroke="#1e293b" stroke-width="2"/>
                                <line x1="34" y1="0" x2="34" y2="380" stroke="#64748b" stroke-width="1.5"/>
                                <line x1="46" y1="0" x2="46" y2="380" stroke="#64748b" stroke-width="1.5"/>
                                <rect x="16" y="0" width="48" height="26" rx="2" fill="#475569" stroke="#1e293b" stroke-width="1.5"/>
                                <rect x="16" y="354" width="48" height="26" rx="2" fill="#475569" stroke="#1e293b" stroke-width="1.5"/>

                                <!-- Правая колонна с капителью -->
                                <rect x="402" y="0" width="36" height="380" fill="#334155" stroke="#1e293b" stroke-width="2"/>
                                <line x1="414" y1="0" x2="414" y2="380" stroke="#64748b" stroke-width="1.5"/>
                                <line x1="426" y1="0" x2="426" y2="380" stroke="#64748b" stroke-width="1.5"/>
                                <rect x="396" y="0" width="48" height="26" rx="2" fill="#475569" stroke="#1e293b" stroke-width="1.5"/>
                                <rect x="396" y="354" width="48" height="26" rx="2" fill="#475569" stroke="#1e293b" stroke-width="1.5"/>
                            </g>

                            <!-- СПРАЙТ ЖРИЦЫ ЭЛИЗИИ С БОЖЕСТВЕННЫМ НИМБОМ И АНИМАЦИЕЙ ДЫХАНИЯ -->
                            <g id="temple-elysia-sprite" transform="translate(175, 48) scale(0.95)" class="npc-interior-breathe">
                                <!-- Пульсирующий святой нимб над головой -->
                                <circle cx="120" cy="40" r="42" fill="url(#elysiaHaloGlow)" class="anim-halo-pulse"/>
                                <circle cx="120" cy="40" r="30" fill="none" stroke="#facc15" stroke-width="2.5" class="anim-halo-pulse"/>
                                ${NpcRenderer.render(this.npc)}
                            </g>

                            <!-- ПЕРЕДНИЙ ПЛАН: СВЯЩЕННЫЙ МРАМОРНЫЙ АЛТАРЬ С КАНДЕЛЯБРАМИ И КУБКОМ -->
                            <g id="temple-altar-foreground">
                                <!-- Мраморная плита алтаря с золотым профилем -->
                                <rect x="85" y="222" width="335" height="26" rx="4" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
                                <line x1="88" y1="225" x2="417" y2="225" stroke="#facc15" stroke-width="2"/>
                                <!-- Фронтон алтаря с лазурным шелковым покровом -->
                                <rect x="94" y="248" width="317" height="132" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
                                <!-- Синий священный покров со звездами -->
                                <path d="M110,248 L135,320 L160,248 Z" fill="#0284c7" stroke="#facc15" stroke-width="1.2"/>
                                <path d="M345,248 L370,320 L395,248 Z" fill="#0284c7" stroke="#facc15" stroke-width="1.2"/>
                                <!-- Золотой крест в круге по центру алтаря -->
                                <circle cx="252" cy="300" r="22" fill="#0f172a" stroke="#ca8a04" stroke-width="2"/>
                                <line x1="252" y1="282" x2="252" y2="318" stroke="#facc15" stroke-width="3"/>
                                <line x1="238" y1="296" x2="266" y2="296" stroke="#facc15" stroke-width="3"/>

                                <!-- СВЯЩЕННАЯ ЗОЛОТАЯ ЧАША В ЦЕНТРЕ АЛТАРЯ -->
                                <g id="altar-chalice" transform="translate(252, 210)">
                                    <path d="M-9,-4 Q0,-8 9,-4 L7,10 Q0,14 -7,10 Z" fill="#facc15" stroke="#78350f" stroke-width="1.2"/>
                                    <line x1="0" y1="10" x2="0" y2="16" stroke="#ca8a04" stroke-width="2.5"/>
                                    <ellipse cx="0" cy="16" rx="8" ry="3" fill="#facc15" stroke="#78350f" stroke-width="1"/>
                                    <!-- Мягкое божественное сияние над чашей -->
                                    <circle cx="0" cy="-6" r="14" fill="url(#roseWindowLight)" class="anim-chalice-glow"/>
                                    <polygon points="-3,-4 0,-10 3,-4" fill="#ffffff"/>
                                </g>

                                <!-- ЛЕВЫЙ ЗОЛОТОЙ КАНДЕЛЯБР СО СВЕЧАМИ -->
                                <g id="candelabra-left" transform="translate(130, 185)">
                                    <line x1="0" y1="12" x2="0" y2="40" stroke="#ca8a04" stroke-width="3"/>
                                    <ellipse cx="0" cy="40" rx="10" ry="3.5" fill="#ca8a04"/>
                                    <!-- 3 рожка со свечами -->
                                    <line x1="-16" y1="20" x2="16" y2="20" stroke="#ca8a04" stroke-width="2"/>
                                    <!-- Левая свеча -->
                                    <circle cx="-16" cy="10" r="16" fill="url(#templeCandle)" class="anim-holy-candle"/>
                                    <rect x="-18" y="14" width="4" height="12" fill="#f8fafc"/>
                                    <polygon points="-17.5,14 -16,6 -14.5,14" fill="#fde047" class="anim-holy-candle"/>
                                    <!-- Центральная свеча -->
                                    <circle cx="0" cy="4" r="18" fill="url(#templeCandle)" class="anim-holy-candle"/>
                                    <rect x="-2" y="8" width="4" height="15" fill="#f8fafc"/>
                                    <polygon points="-1.5,8 0,0 1.5,8" fill="#fde047" class="anim-holy-candle"/>
                                    <!-- Правая свеча -->
                                    <circle cx="16" cy="10" r="16" fill="url(#templeCandle)" class="anim-holy-candle"/>
                                    <rect x="14" y="14" width="4" height="12" fill="#f8fafc"/>
                                    <polygon points="14.5,14 16,6 17.5,14" fill="#fde047" class="anim-holy-candle"/>
                                </g>

                                <!-- ПРАВЫЙ ЗОЛОТОЙ КАНДЕЛЯБР СО СВЕЧАМИ -->
                                <g id="candelabra-right" transform="translate(370, 185)">
                                    <line x1="0" y1="12" x2="0" y2="40" stroke="#ca8a04" stroke-width="3"/>
                                    <ellipse cx="0" cy="40" rx="10" ry="3.5" fill="#ca8a04"/>
                                    <line x1="-16" y1="20" x2="16" y2="20" stroke="#ca8a04" stroke-width="2"/>
                                    <!-- Левая свеча -->
                                    <circle cx="-16" cy="10" r="16" fill="url(#templeCandle)" class="anim-holy-candle"/>
                                    <rect x="-18" y="14" width="4" height="12" fill="#f8fafc"/>
                                    <polygon points="-17.5,14 -16,6 -14.5,14" fill="#fde047" class="anim-holy-candle"/>
                                    <!-- Центральная свеча -->
                                    <circle cx="0" cy="4" r="18" fill="url(#templeCandle)" class="anim-holy-candle"/>
                                    <rect x="-2" y="8" width="4" height="15" fill="#f8fafc"/>
                                    <polygon points="-1.5,8 0,0 1.5,8" fill="#fde047" class="anim-holy-candle"/>
                                    <!-- Правая свеча -->
                                    <circle cx="16" cy="10" r="16" fill="url(#templeCandle)" class="anim-holy-candle"/>
                                    <rect x="14" y="14" width="4" height="12" fill="#f8fafc"/>
                                    <polygon points="14.5,14 16,6 17.5,14" fill="#fde047" class="anim-holy-candle"/>
                                </g>
                            </g>

                            <!-- ПАРЯЩИЕ СВЯЩЕННЫЕ ИСКРЫ МОЛИТВЫ В ХРАМЕ -->
                            <g id="temple-prayer-motes" pointer-events="none">
                                <circle cx="210" cy="200" r="1.8" fill="#fef08a" class="prayer-mote mote-1"/>
                                <circle cx="280" cy="170" r="1.5" fill="#bae6fd" class="prayer-mote mote-2"/>
                                <circle cx="170" cy="140" r="1.4" fill="#fef08a" class="prayer-mote mote-3"/>
                                <circle cx="320" cy="190" r="1.6" fill="#fde047" class="prayer-mote mote-4"/>
                                <circle cx="240" cy="260" r="2.0" fill="#ffffff" class="prayer-mote mote-5"/>
                                <circle cx="190" cy="240" r="1.3" fill="#bae6fd" class="prayer-mote mote-6"/>
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
                                <span class="npc-status-tag">Служительница Света</span>
                            </div>
                            <div class="npc-speech-bubble" id="elysia-speech">
                                «Мир твоей душе, дитя моё. Тьма катакомб сильна, но чистый духом никогда не собьётся с пути. Прими благословение Небес перед спуском во тьму.»
                            </div>
                        </div>

                        <div class="goods-tabs">
                            <button class="goods-tab-btn ${this.activeTab === 'blessings' ? 'active' : ''}" id="tab-blessings">Святые благословения</button>
                            <button class="goods-tab-btn ${this.activeTab === 'relics' ? 'active' : ''}" id="tab-relics">Реликвии храма</button>
                        </div>

                        <div class="goods-content-view" id="temple-content"></div>
                    </div>
                </div>
            </div>
        `;

        this.initEvents();
        this.renderTabContent();
    }

    initEvents() {
        this.container.querySelector('#btn-leave-temple').addEventListener('click', () => {
            sound.playSfx('click');
            sound.switchMusic(townTheme, 1.2);
            this.callbacks.onBack();
        });

        this.container.querySelector('#tab-blessings').addEventListener('click', () => {
            sound.playSfx('tab');
            this.activeTab = 'blessings';
            this.updateTabs();
            this.renderTabContent();
        });

        this.container.querySelector('#tab-relics').addEventListener('click', () => {
            sound.playSfx('tab');
            this.activeTab = 'relics';
            this.updateTabs();
            this.renderTabContent();
        });
    }

    updateTabs() {
        this.container.querySelector('#tab-blessings').classList.toggle('active', this.activeTab === 'blessings');
        this.container.querySelector('#tab-relics').classList.toggle('active', this.activeTab === 'relics');
        this.container.querySelector('#loc-gold-val').textContent = this.player.gold;
    }

    renderTabContent() {
        const view = this.container.querySelector('#temple-content');

        if (this.activeTab === 'blessings') {
            view.innerHTML = `
                <div class="services-list">
                    <div class="service-card">
                        <div class="service-icon">${Icons.spark(22)}</div>
                        <div class="service-info">
                            <div class="service-title">Благословение Жизни (+10 к макс. HP)</div>
                            <div class="service-desc">Текущее максимальное здоровье: <strong>${this.player.maxHp} HP</strong></div>
                        </div>
                        <button class="btn btn-primary" id="btn-bless-hp" ${this.player.gold < 50 ? 'disabled' : ''}>
                            Принять — ${Icons.coin(13)} 50
                        </button>
                    </div>

                    <div class="service-card">
                        <div class="service-icon">${Icons.orb(22)}</div>
                        <div class="service-info">
                            <div class="service-title">Благословение Мудрости (+15 к макс. MP)</div>
                            <div class="service-desc">Текущий запас маны: <strong>${this.player.maxMp} MP</strong></div>
                        </div>
                        <button class="btn btn-primary" id="btn-bless-mp" ${this.player.gold < 45 ? 'disabled' : ''}>
                            Принять — ${Icons.coin(13)} 45
                        </button>
                    </div>

                    <div class="service-card">
                        <div class="service-icon">${Icons.dove(22)}</div>
                        <div class="service-info">
                            <div class="service-title">Святое омовение ран (+50 HP)</div>
                            <div class="service-desc">Мгновенное исцеление телесных повреждений.</div>
                        </div>
                        <button class="btn btn-primary" id="btn-bless-heal" ${this.player.gold < 15 ? 'disabled' : ''}>
                            Исцелить — ${Icons.coin(13)} 15
                        </button>
                    </div>
                </div>

                <div class="tavern-status-bar">
                    Жизненная сила: <strong>${this.player.currentHp}/${this.player.maxHp} HP</strong> | Мана: <strong>${this.player.currentMp}/${this.player.maxMp} MP</strong>
                </div>
            `;

            view.querySelector('#btn-bless-hp').addEventListener('click', () => {
                if (this.player.gold >= 50) {
                    this.player.gold -= 50;
                    this.player.maxHp += 10;
                    this.player.currentHp += 10;
                    sound.playSfx('selectHero');
                    this.container.querySelector('#elysia-speech').textContent = '«Свет наполнил твою плоть нерушимой стойкостью. Да хранят тебя Небеса!»';
                    this.updateTabs();
                    this.renderTabContent();
                }
            });

            view.querySelector('#btn-bless-mp').addEventListener('click', () => {
                if (this.player.gold >= 45) {
                    this.player.gold -= 45;
                    this.player.maxHp += 15;
                    this.player.currentMp += 15;
                    sound.playSfx('selectHero');
                    this.container.querySelector('#elysia-speech').textContent = '«Твой разум открылся высшим таинствам. Магический исток стал глубже!»';
                    this.updateTabs();
                    this.renderTabContent();
                }
            });

            view.querySelector('#btn-bless-heal').addEventListener('click', () => {
                if (this.player.gold >= 15) {
                    this.player.gold -= 15;
                    this.player.currentHp = Math.min(this.player.maxHp, this.player.currentHp + 50);
                    sound.playSfx('coin');
                    this.container.querySelector('#elysia-speech').textContent = '«Боль отступила. Твои раны закрылись благодатью Света.»';
                    this.updateTabs();
                    this.renderTabContent();
                }
            });
        } else {
            this.updateStock();
            const availableItems = this.relics.filter(i => !i.locked);
            const lockedItems = this.relics.filter(i => i.locked);

            view.innerHTML = `
                <div class="items-cards-grid">
                    ${availableItems.map(item => `
                        <div class="item-trade-card">
                            <div class="item-trade-icon">${item.icon}</div>
                            <div class="item-trade-details">
                                <div class="item-trade-title">${item.name}</div>
                                <div class="item-trade-desc">${item.desc}</div>
                            </div>
                            <button class="btn btn-primary btn-buy-relic" data-id="${item.id}" ${this.player.gold < item.price ? 'disabled' : ''}>
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

            view.querySelectorAll('.btn-buy-relic').forEach(btn => {
                btn.addEventListener('click', () => {
                    const item = this.relics.find(i => i.id === btn.dataset.id && !i.locked);
                    if (item && this.player.gold >= item.price) {
                        this.player.gold -= item.price;
                        this.player.inventory.push({ ...item });
                        sound.playSfx('selectHero');
                        this.container.querySelector('#elysia-speech').textContent = `«${item.name} теперь освящает твой путь. Неси его с благоговением.»`;
                        const goldVal = this.container.querySelector('#loc-gold-val');
                        if (goldVal) goldVal.textContent = this.player.gold;
                        this.updateTabs();
                        this.renderTabContent();
                    }
                });
            });
        }
    }
}