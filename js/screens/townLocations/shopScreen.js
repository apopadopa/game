import { sound } from '../../audio/audioEngine.js';
import { shopMusic } from '../../audio/music/shopMusic.js';
import { townTheme } from '../../audio/music/townTheme.js';
import { CharacterRenderer } from '../../visuals/characterRenderer.js';
import { NpcRenderer, NPC_CONFIGS } from '../../visuals/npcRenderer.js';
import { Icons } from '../../visuals/icons.js';

export class ShopScreen {
    constructor(player, callbacks) {
        this.player = player;
        this.callbacks = callbacks;
        this.npc = NPC_CONFIGS.rashid;
        this.activeTab = 'buy';

        sound.switchMusic(shopMusic, 1.2);

        this.catalog = [
            { id: 'hp_potion', name: 'Зелье исцеления', desc: 'Мгновенно восстанавливает 50 HP', price: 20, icon: Icons.potion(24, '#ef4444'), type: 'potion', heal: 50 },
            { id: 'mp_potion', name: 'Зелье маны', desc: 'Восстанавливает 40 MP', price: 18, icon: Icons.potion(24, '#3b82f6'), type: 'potion', mana: 40 },
            { id: 'escape_scroll', name: 'Свиток побега', desc: 'Экстренный телепорт в город из катакомб', price: 35, icon: Icons.scroll(24), type: 'scroll' },
            { id: 'torch', name: 'Факел катакомб', desc: 'Освещает тёмные залы и тайники', price: 12, icon: Icons.spark(24), type: 'tool' },
            { id: 'urn_holy', name: 'Освящённый сосуд', desc: 'Древний очищающий фиал', price: 25, icon: Icons.urn(24), type: 'relic' }
        ];
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
                        <h2>Лавка редкостей Рашида</h2>
                        <span class="interior-subtitle">Заморские снадобья, древние свитки и скупка добычи</span>
                    </div>
                    <button class="btn btn-secondary" id="btn-leave-shop">На площадь города</button>
                </div>

                <div class="interior-stage">
                    <div class="interior-scene-box">
                        <svg viewBox="0 0 460 380" class="shop-scene-svg">
                            <defs>
                                <radialGradient id="lampGlowShop" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stop-color="#fef08a" stop-opacity="0.9"/>
                                    <stop offset="60%" stop-color="#ca8a04" stop-opacity="0.35"/>
                                    <stop offset="100%" stop-color="#14110f" stop-opacity="0"/>
                                </radialGradient>
                            </defs>

                            <rect width="460" height="380" fill="#1c1417"/>

                            <rect x="25" y="20" width="120" height="180" fill="#4c0519" rx="4" stroke="#881337" stroke-width="2"/>
                            <rect x="35" y="30" width="100" height="160" fill="#701a75" opacity="0.3"/>
                            <line x1="25" y1="200" x2="145" y2="200" stroke="#facc15" stroke-width="3"/>

                            <rect x="200" y="45" width="220" height="12" fill="#52321c" rx="2"/>
                            <circle cx="230" cy="35" r="7" fill="#065f46"/>
                            <circle cx="260" cy="35" r="9" fill="#0369a1"/>
                            <circle cx="300" cy="32" r="11" fill="#991b1b"/>
                            <circle cx="340" cy="36" r="6" fill="#ca8a04"/>
                            <rect x="370" y="25" width="10" height="20" rx="2" fill="#d97706"/>

                            <path d="M0,0 L460,0 L440,30 L20,30 Z" fill="#881337"/>
                            <path d="M40,0 L70,30 L100,0 L130,30 L160,0 L190,30 L220,0 L250,30 L280,0 L310,30 L340,0 L370,30 L400,0 L430,30" stroke="#facc15" stroke-width="2" fill="none"/>

                            <g id="shop-rashid-sprite" transform="translate(160, 48) scale(0.92)">
                                ${NpcRenderer.render(this.npc)}
                            </g>

                            <g id="shop-counter-foreground">
                                <rect x="80" y="225" width="340" height="30" rx="3" fill="#881337" stroke="#4c0519" stroke-width="2"/>
                                <rect x="90" y="255" width="320" height="125" fill="#4c0519" stroke="#2a050f" stroke-width="2"/>
                                <line x1="90" y1="260" x2="410" y2="260" stroke="#facc15" stroke-width="2.5"/>

                                <g transform="translate(130, 185)">
                                    <line x1="15" y1="5" x2="15" y2="40" stroke="#ca8a04" stroke-width="2.5"/>
                                    <line x1="0" y1="12" x2="30" y2="12" stroke="#ca8a04" stroke-width="2"/>
                                    <polygon points="12,40 18,40 20,44 10,44" fill="#ca8a04"/>
                                    <path d="M0,12 L-6,26 L6,26 Z" fill="#fef08a" stroke="#ca8a04"/>
                                    <path d="M30,12 L24,26 L36,26 Z" fill="#fef08a" stroke="#ca8a04"/>
                                </g>

                                <g transform="translate(365, 175)">
                                    <circle cx="0" cy="0" r="40" fill="url(#lampGlowShop)"/>
                                    <polygon points="-8,-10 8,-10 12,15 -12,15" fill="#b45309" stroke="#78350f" stroke-width="1.5"/>
                                    <ellipse cx="0" cy="2" rx="4" ry="6" fill="#fef08a"/>
                                </g>
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
                        </div>

                        <div class="goods-tabs">
                            <button class="goods-tab-btn ${this.activeTab === 'buy' ? 'active' : ''}" id="tab-buy">Купить товары</button>
                            <button class="goods-tab-btn ${this.activeTab === 'sell' ? 'active' : ''}" id="tab-sell">Продать трофеи (${this.player.inventory.length})</button>
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
    }

    updateTabs() {
        this.container.querySelector('#tab-buy').classList.toggle('active', this.activeTab === 'buy');
        this.container.querySelector('#tab-sell').classList.toggle('active', this.activeTab === 'sell');
        this.container.querySelector('#tab-sell').textContent = `Продать трофеи (${this.player.inventory.length})`;
        this.container.querySelector('#loc-gold-val').textContent = this.player.gold;
    }

    renderGoodsList() {
        const view = this.container.querySelector('#shop-goods-content');

        if (this.activeTab === 'buy') {
            view.innerHTML = `
                <div class="items-cards-grid">
                    ${this.catalog.map(item => `
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
                </div>
            `;

            view.querySelectorAll('.btn-buy-item').forEach(btn => {
                btn.addEventListener('click', () => {
                    const item = this.catalog.find(i => i.id === btn.dataset.id);
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