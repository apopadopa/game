import { sound } from '../../audio/audioEngine.js';
import { templeMusic } from '../../audio/music/templeMusic.js';
import { townTheme } from '../../audio/music/townTheme.js';
import { CharacterRenderer } from '../../visuals/characterRenderer.js';
import { NpcRenderer, NPC_CONFIGS } from '../../visuals/npcRenderer.js';
import { Icons } from '../../visuals/icons.js';

export class TempleScreen {
    constructor(player, callbacks) {
        this.player = player;
        this.callbacks = callbacks;
        this.npc = NPC_CONFIGS.elysia;
        this.activeTab = 'blessings';

        sound.switchMusic(templeMusic, 1.4);

        this.relics = [
            { id: 'holy_water', name: 'Святая вода', desc: 'Священный сосуд: наносит 45 урона нежити', price: 25, icon: Icons.urn(24), stat: 'holyDmg' },
            { id: 'blessed_amulet', name: 'Освящённый амулет', desc: 'Защищает от тёмных сил (+3 к защите)', price: 60, icon: Icons.amulet(24), stat: 'defense', value: 3 },
            { id: 'tears_of_goddess', name: 'Слеза Богини', desc: 'Светлое чудо: восстанавливает 100 HP и MP', price: 95, icon: Icons.gem(24), stat: 'fullHeal' }
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
                        <h2>Древний Храм Вечного Света</h2>
                        <span class="interior-subtitle">Священная обитель, молитвы стойкости и очищение души</span>
                    </div>
                    <button class="btn btn-secondary" id="btn-leave-temple">${Icons.arrowLeft(13)} На площадь города</button>
                </div>

                <div class="interior-stage">
                    <div class="interior-scene-box">
                        <svg viewBox="0 0 460 380" class="temple-scene-svg">
                            <defs>
                                <radialGradient id="roseWindowLight" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.9"/>
                                    <stop offset="60%" stop-color="#c084fc" stop-opacity="0.4"/>
                                    <stop offset="100%" stop-color="#0f172a" stop-opacity="0"/>
                                </radialGradient>
                                <radialGradient id="templeCandle" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stop-color="#fef08a" stop-opacity="0.95"/>
                                    <stop offset="60%" stop-color="#ca8a04" stop-opacity="0.3"/>
                                    <stop offset="100%" stop-color="#0f172a" stop-opacity="0"/>
                                </radialGradient>
                            </defs>

                            <rect width="460" height="380" fill="#0f141c"/>

                            <circle cx="230" cy="110" r="95" fill="url(#roseWindowLight)"/>
                            <circle cx="230" cy="110" r="55" fill="#1e293b" stroke="#0284c7" stroke-width="4"/>
                            <line x1="230" y1="55" x2="230" y2="165" stroke="#facc15" stroke-width="2.5"/>
                            <line x1="175" y1="110" x2="285" y2="110" stroke="#facc15" stroke-width="2.5"/>
                            <line x1="190" y1="70" x2="270" y2="150" stroke="#38bdf8" stroke-width="2"/>
                            <line x1="190" y1="150" x2="270" y2="70" stroke="#38bdf8" stroke-width="2"/>

                            <rect x="20" y="0" width="40" height="380" fill="#334155" stroke="#1e293b" stroke-width="2"/>
                            <rect x="15" y="0" width="50" height="24" fill="#475569"/>
                            <rect x="15" y="356" width="50" height="24" fill="#475569"/>

                            <rect x="400" y="0" width="40" height="380" fill="#334155" stroke="#1e293b" stroke-width="2"/>
                            <rect x="395" y="0" width="50" height="24" fill="#475569"/>
                            <rect x="395" y="356" width="50" height="24" fill="#475569"/>

                            <g id="temple-elysia-sprite" transform="translate(160, 48) scale(0.92)">
                                ${NpcRenderer.render(this.npc)}
                            </g>

                            <g id="temple-altar-foreground">
                                <rect x="90" y="235" width="280" height="22" rx="3" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>
                                <rect x="100" y="257" width="260" height="123" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
                                <path d="M120,235 L140,290 L160,235 Z" fill="#0284c7"/>
                                <path d="M300,235 L320,290 L340,235 Z" fill="#0284c7"/>
                                <circle cx="230" cy="290" r="16" fill="#facc15" stroke="#78350f" stroke-width="1.5"/>
                                <line x1="230" y1="278" x2="230" y2="302" stroke="#78350f" stroke-width="2"/>
                                <line x1="220" y1="290" x2="240" y2="290" stroke="#78350f" stroke-width="2"/>

                                <g transform="translate(130, 205)">
                                    <circle cx="0" cy="0" r="30" fill="url(#templeCandle)"/>
                                    <rect x="-4" y="8" width="8" height="22" fill="#f8fafc" rx="1"/>
                                    <polygon points="-2,8 0,0 2,8" fill="#fde047"/>
                                </g>

                                <g transform="translate(330, 205)">
                                    <circle cx="0" cy="0" r="30" fill="url(#templeCandle)"/>
                                    <rect x="-4" y="8" width="8" height="22" fill="#f8fafc" rx="1"/>
                                    <polygon points="-2,8 0,0 2,8" fill="#fde047"/>
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
            view.innerHTML = `
                <div class="items-cards-grid">
                    ${this.relics.map(item => `
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
                </div>
            `;

            view.querySelectorAll('.btn-buy-relic').forEach(btn => {
                btn.addEventListener('click', () => {
                    const item = this.relics.find(i => i.id === btn.dataset.id);
                    if (item && this.player.gold >= item.price) {
                        this.player.gold -= item.price;
                        if (item.stat === 'defense') {
                            this.player.defense += item.value;
                        }
                        this.player.inventory.push({ ...item });
                        sound.playSfx('selectHero');
                        this.container.querySelector('#elysia-speech').textContent = `«${item.name} теперь освящает твой путь. Неси его с благоговением.»`;
                        this.updateTabs();
                        this.renderTabContent();
                    }
                });
            });
        }
    }
}