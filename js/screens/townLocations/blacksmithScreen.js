import { sound } from '../../audio/audioEngine.js';
import { blacksmithMusic } from '../../audio/music/blacksmithMusic.js';
import { townTheme } from '../../audio/music/townTheme.js';
import { CharacterRenderer } from '../../visuals/characterRenderer.js';
import { NpcRenderer, NPC_CONFIGS } from '../../visuals/npcRenderer.js';
import { Icons } from '../../visuals/icons.js';

export class BlacksmithScreen {
    constructor(player, callbacks) {
        this.player = player;
        this.callbacks = callbacks;
        this.npc = NPC_CONFIGS.torvald;
        this.activeTab = 'upgrade';

        sound.switchMusic(blacksmithMusic, 1.2);

        this.armory = [
            { id: 'iron_broadsword', name: 'Закаленный палаш', desc: 'Тяжелый клинок (+6 к физ. урону)', price: 70, icon: Icons.broadsword(24), stat: 'physicalDamage', value: 6 },
            { id: 'reinforced_shield', name: 'Окованный щит', desc: 'Дубовый щит с железом (+4 к защите)', price: 55, icon: Icons.shield(24), stat: 'defense', value: 4 },
            { id: 'chainmail_vest', name: 'Кольчужный доспех', desc: 'Прочная клепаная кольчуга (+6 к защите)', price: 90, icon: Icons.armor(24), stat: 'defense', value: 6 }
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
                        <h2>Кузница «Стальной Молот»</h2>
                        <span class="interior-subtitle">Пламя горна, звон наковальни и лучшая закалка клинков</span>
                    </div>
                    <button class="btn btn-secondary" id="btn-leave-blacksmith">${Icons.arrowLeft(13)} На площадь города</button>
                </div>

                <div class="interior-stage">
                    <div class="interior-scene-box">
                        <svg viewBox="0 0 460 380" class="blacksmith-scene-svg">
                            <defs>
                                <radialGradient id="forgeHearthGlow" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stop-color="#fb923c" stop-opacity="1"/>
                                    <stop offset="45%" stop-color="#ea580c" stop-opacity="0.8"/>
                                    <stop offset="85%" stop-color="#7c2d12" stop-opacity="0.3"/>
                                    <stop offset="100%" stop-color="#1c1917" stop-opacity="0"/>
                                </radialGradient>
                            </defs>

                            <rect width="460" height="380" fill="#17171a"/>

                            <line x1="0" y1="50" x2="460" y2="50" stroke="#26262a" stroke-width="2"/>
                            <line x1="0" y1="100" x2="460" y2="100" stroke="#26262a" stroke-width="2"/>
                            <line x1="0" y1="150" x2="460" y2="150" stroke="#26262a" stroke-width="2"/>

                            <rect x="25" y="60" width="130" height="170" fill="#2d2d34" stroke="#1c1c22" stroke-width="3"/>
                            <path d="M40,230 L40,130 Q90,90 140,130 L140,230 Z" fill="#0f0f12"/>
                            <circle cx="90" cy="175" r="65" fill="url(#forgeHearthGlow)" class="fire-flame-flicker"/>
                            <polygon points="70,225 90,165 110,225" fill="#f97316" class="fire-flame-flicker"/>
                            <polygon points="80,225 90,180 100,225" fill="#fef08a" class="fire-flame-flicker"/>

                            <rect x="210" y="45" width="220" height="10" fill="#3f3f46" rx="2"/>
                            <line x1="230" y1="55" x2="230" y2="95" stroke="#71717a" stroke-width="3"/>
                            <line x1="270" y1="55" x2="270" y2="95" stroke="#71717a" stroke-width="3"/>
                            <polygon points="225,95 235,95 230,115" fill="#cbd5e1"/>
                            <polygon points="265,95 275,95 270,120" fill="#cbd5e1"/>

                            <g id="smith-torvald-sprite" transform="translate(160, 48) scale(0.92)">
                                ${NpcRenderer.render(this.npc)}
                            </g>

                            <g id="blacksmith-foreground">
                                <rect x="90" y="235" width="290" height="24" rx="3" fill="#3f3f46" stroke="#18181b" stroke-width="2"/>
                                <rect x="100" y="259" width="270" height="121" fill="#27272a" stroke="#18181b" stroke-width="2"/>

                                <g transform="translate(145, 195)">
                                    <rect x="10" y="24" width="40" height="16" fill="#1e293b" rx="2"/>
                                    <path d="M0,24 L10,24 L10,32 L0,32 Z" fill="#475569"/>
                                    <rect x="15" y="14" width="30" height="10" fill="#64748b" rx="1"/>
                                    <polygon points="45,14 58,18 45,24" fill="#94a3b8"/>
                                </g>

                                <g transform="translate(330, 215)">
                                    <rect x="0" y="0" width="34" height="42" rx="3" fill="#382415" stroke="#1c1109" stroke-width="2"/>
                                    <line x1="0" y1="10" x2="34" y2="10" stroke="#0f172a" stroke-width="3"/>
                                    <line x1="0" y1="32" x2="34" y2="32" stroke="#0f172a" stroke-width="3"/>
                                    <ellipse cx="17" cy="4" rx="14" ry="4" fill="#38bdf8" opacity="0.6"/>
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
                                <span class="npc-status-tag">Мастер стали и огня</span>
                            </div>
                            <div class="npc-speech-bubble" id="torvald-speech">
                                «Холодная сталь и горячее сердце — вот что решает судьбу во тьме катакомб. Подточу твой клинок так, что кости скелетов треснут от одного взмаха!»
                            </div>
                        </div>

                        <div class="goods-tabs">
                            <button class="goods-tab-btn ${this.activeTab === 'upgrade' ? 'active' : ''}" id="tab-upgrade">Улучшение снаряжения</button>
                            <button class="goods-tab-btn ${this.activeTab === 'armory' ? 'active' : ''}" id="tab-armory">Оружейная лавка</button>
                        </div>

                        <div class="goods-content-view" id="blacksmith-content"></div>
                    </div>
                </div>
            </div>
        `;

        this.initEvents();
        this.renderTabContent();
    }

    initEvents() {
        this.container.querySelector('#btn-leave-blacksmith').addEventListener('click', () => {
            sound.playSfx('click');
            sound.switchMusic(townTheme, 1.2);
            this.callbacks.onBack();
        });

        this.container.querySelector('#tab-upgrade').addEventListener('click', () => {
            sound.playSfx('tab');
            this.activeTab = 'upgrade';
            this.updateTabs();
            this.renderTabContent();
        });

        this.container.querySelector('#tab-armory').addEventListener('click', () => {
            sound.playSfx('tab');
            this.activeTab = 'armory';
            this.updateTabs();
            this.renderTabContent();
        });
    }

    updateTabs() {
        this.container.querySelector('#tab-upgrade').classList.toggle('active', this.activeTab === 'upgrade');
        this.container.querySelector('#tab-armory').classList.toggle('active', this.activeTab === 'armory');
        this.container.querySelector('#loc-gold-val').textContent = this.player.gold;
    }

    renderTabContent() {
        const view = this.container.querySelector('#blacksmith-content');

        if (this.activeTab === 'upgrade') {
            view.innerHTML = `
                <div class="services-list">
                    <div class="service-card">
                        <div class="service-icon">${Icons.sword(22)}</div>
                        <div class="service-info">
                            <div class="service-title">Заточка оружия (+3 к урону)</div>
                            <div class="service-desc">Текущий физический урон героя: <strong>${this.player.physicalDamage}</strong></div>
                        </div>
                        <button class="btn btn-primary" id="btn-smith-sharpen" ${this.player.gold < 40 ? 'disabled' : ''}>
                            Заточить — ${Icons.coin(13)} 40
                        </button>
                    </div>

                    <div class="service-card">
                        <div class="service-icon">${Icons.shield(22)}</div>
                        <div class="service-info">
                            <div class="service-title">Укрепление брони пластинами (+2 к защите)</div>
                            <div class="service-desc">Текущая защита героя: <strong>${this.player.defense}</strong></div>
                        </div>
                        <button class="btn btn-primary" id="btn-smith-armor" ${this.player.gold < 35 ? 'disabled' : ''}>
                            Укрепить — ${Icons.coin(13)} 35
                        </button>
                    </div>

                    <div class="service-card">
                        <div class="service-icon">${Icons.target(22)}</div>
                        <div class="service-info">
                            <div class="service-title">Балансировка балансира (+4% крита)</div>
                            <div class="service-desc">Текущий шанс критического удара: <strong>${this.player.critChance}%</strong></div>
                        </div>
                        <button class="btn btn-primary" id="btn-smith-crit" ${this.player.gold < 45 ? 'disabled' : ''}>
                            Сбалансировать — ${Icons.coin(13)} 45
                        </button>
                    </div>
                </div>

                <div class="tavern-status-bar">
                    Характеристики: Урон <strong>${this.player.physicalDamage}</strong> | Защита <strong>${this.player.defense}</strong> | Крит <strong>${this.player.critChance}%</strong>
                </div>
            `;

            view.querySelector('#btn-smith-sharpen').addEventListener('click', () => {
                if (this.player.gold >= 40) {
                    this.player.gold -= 40;
                    this.player.physicalDamage += 3;
                    sound.playSfx('selectHero');
                    this.container.querySelector('#torvald-speech').textContent = '«Смотри, как играет блик на лезвии! Теперь оно срубит голову любому упырю!»';
                    this.updateTabs();
                    this.renderTabContent();
                }
            });

            view.querySelector('#btn-smith-armor').addEventListener('click', () => {
                if (this.player.gold >= 35) {
                    this.player.gold -= 35;
                    this.player.defense += 2;
                    sound.playSfx('coin');
                    this.container.querySelector('#torvald-speech').textContent = '«Вбил стальные заклепки и подогнал пластины. Никакая стрела из темноты не достанет!»';
                    this.updateTabs();
                    this.renderTabContent();
                }
            });

            view.querySelector('#btn-smith-crit').addEventListener('click', () => {
                if (this.player.gold >= 45) {
                    this.player.gold -= 45;
                    this.player.critChance = Math.min(85, this.player.critChance + 4);
                    sound.playSfx('coin');
                    this.container.querySelector('#torvald-speech').textContent = '«Идеальный вес и баланс. Клинок сам ложится в уязвимые сочленения врага!»';
                    this.updateTabs();
                    this.renderTabContent();
                }
            });
        } else {
            view.innerHTML = `
                <div class="items-cards-grid">
                    ${this.armory.map(item => `
                        <div class="item-trade-card">
                            <div class="item-trade-icon">${item.icon}</div>
                            <div class="item-trade-details">
                                <div class="item-trade-title">${item.name}</div>
                                <div class="item-trade-desc">${item.desc}</div>
                            </div>
                            <button class="btn btn-primary btn-buy-gear" data-id="${item.id}" ${this.player.gold < item.price ? 'disabled' : ''}>
                                ${Icons.coin(13)} ${item.price}
                            </button>
                        </div>
                    `).join('')}
                </div>
            `;

            view.querySelectorAll('.btn-buy-gear').forEach(btn => {
                btn.addEventListener('click', () => {
                    const item = this.armory.find(i => i.id === btn.dataset.id);
                    if (item && this.player.gold >= item.price) {
                        this.player.gold -= item.price;
                        this.player[item.stat] += item.value;
                        this.player.inventory.push({ ...item });
                        sound.playSfx('selectHero');
                        this.container.querySelector('#torvald-speech').textContent = `«Отличная ковка! ${item.name} теперь на твоей службе. Береги его в бою!»`;
                        this.updateTabs();
                        this.renderTabContent();
                    }
                });
            });
        }
    }
}