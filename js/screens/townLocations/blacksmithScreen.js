import { sound } from '../../audio/audioEngine.js';
import { blacksmithMusic } from '../../audio/music/blacksmithMusic.js';
import { townTheme } from '../../audio/music/townTheme.js';
import { CharacterRenderer } from '../../visuals/characterRenderer.js';
import { NpcRenderer, NPC_CONFIGS } from '../../visuals/npcRenderer.js';
import { Icons } from '../../visuals/icons.js';
import { getTraderStock } from '../../data/itemsData.js';

export class BlacksmithScreen {
    constructor(player, callbacks) {
        this.player = player;
        this.callbacks = callbacks;
        this.npc = NPC_CONFIGS.torvald;
        this.activeTab = 'upgrade';

        sound.switchMusic(blacksmithMusic, 1.2);
        this.updateStock();
    }

    updateStock() {
        this.armory = getTraderStock('blacksmith', this.player.level || 1);
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
                                <radialGradient id="forgeFireRadial" cx="40%" cy="50%" r="65%">
                                    <stop offset="0%" stop-color="#fef08a" stop-opacity="1"/>
                                    <stop offset="25%" stop-color="#f97316" stop-opacity="0.9"/>
                                    <stop offset="60%" stop-color="#c2410c" stop-opacity="0.5"/>
                                    <stop offset="100%" stop-color="#18181b" stop-opacity="0"/>
                                </radialGradient>

                                <radialGradient id="hotSteelGlow" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stop-color="#fef08a" stop-opacity="1"/>
                                    <stop offset="50%" stop-color="#ef4444" stop-opacity="0.8"/>
                                    <stop offset="100%" stop-color="#7f1d1d" stop-opacity="0"/>
                                </radialGradient>

                                <linearGradient id="anvilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stop-color="#64748b"/>
                                    <stop offset="50%" stop-color="#475569"/>
                                    <stop offset="100%" stop-color="#1e293b"/>
                                </linearGradient>

                                <linearGradient id="hotBladeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stop-color="#fef08a"/>
                                    <stop offset="50%" stop-color="#f97316"/>
                                    <stop offset="100%" stop-color="#dc2626"/>
                                </linearGradient>
                            </defs>

                            <!-- Темный фон базальтовой кузницы -->
                            <rect width="460" height="380" fill="#121214"/>
                            <rect width="460" height="380" fill="url(#forgeFireRadial)" opacity="0.65"/>

                            <!-- Базальтовая каменная кладка стен с железными скобами -->
                            <g id="forge-stone-walls" opacity="0.35">
                                <line x1="0" y1="45" x2="460" y2="45" stroke="#27272a" stroke-width="2"/>
                                <line x1="0" y1="95" x2="460" y2="95" stroke="#27272a" stroke-width="2"/>
                                <line x1="0" y1="145" x2="460" y2="145" stroke="#27272a" stroke-width="2"/>
                                <line x1="0" y1="195" x2="460" y2="195" stroke="#27272a" stroke-width="2"/>
                            </g>

                            <!-- ОРУЖЕЙНЫЙ АРСЕНАЛ НА СТЕНЕ СПРАВА -->
                            <g id="armory-wall-rack" transform="translate(320, 38)">
                                <!-- Деревянный щит-стойка -->
                                <rect x="0" y="0" width="115" height="150" rx="4" fill="#24140a" stroke="#451a03" stroke-width="2"/>
                                <!-- Стальной двуручный меч -->
                                <line x1="28" y1="15" x2="28" y2="135" stroke="#cbd5e1" stroke-width="3"/>
                                <polygon points="25,15 31,15 28,5" fill="#f8fafc"/>
                                <line x1="16" y1="40" x2="40" y2="40" stroke="#ca8a04" stroke-width="3"/>
                                <circle cx="28" cy="40" r="3" fill="#ca8a04"/>
                                <!-- Боевой секирообразный топор -->
                                <line x1="65" y1="20" x2="65" y2="130" stroke="#78350f" stroke-width="3.5"/>
                                <path d="M65,30 Q92,15 88,48 Q78,55 65,42 Z" fill="#94a3b8" stroke="#475569" stroke-width="1.2"/>
                                <!-- Круглый окованный щит -->
                                <circle cx="95" cy="100" r="22" fill="#334155" stroke="#0f172a" stroke-width="2"/>
                                <circle cx="95" cy="100" r="8" fill="#ca8a04" stroke="#78350f" stroke-width="1.5"/>
                                <line x1="73" y1="100" x2="117" y2="100" stroke="#ca8a04" stroke-width="1.5"/>
                                <line x1="95" y1="78" x2="95" y2="122" stroke="#ca8a04" stroke-width="1.5"/>
                            </g>

                            <!-- ПЫЛАЮЩИЙ ГОРН С РАСКАЛЕННЫМ ОГНЕМ И ИСКРАМИ (СЛЕВА) -->
                            <g id="blacksmith-furnace" transform="translate(25, 75)">
                                <!-- Массивная печь из огнеупорного камня -->
                                <rect x="0" y="0" width="135" height="175" rx="5" fill="#27272a" stroke="#09090b" stroke-width="3"/>
                                <!-- Вытяжной дымовой зонт -->
                                <polygon points="0,0 135,0 105,-45 30,-45" fill="#3f3f46" stroke="#18181b" stroke-width="2"/>

                                <!-- Арочная топка горна -->
                                <path d="M18,175 L18,75 Q68,40 118,75 L118,175 Z" fill="#18181b" stroke="#0c0a09" stroke-width="2.5"/>

                                <!-- Слой раскаленного коксующегося угля -->
                                <ellipse cx="68" cy="165" rx="46" ry="12" fill="#7f1d1d"/>
                                <circle cx="68" cy="140" r="55" fill="url(#forgeFireRadial)" class="anim-forge-heat-pulse"/>

                                <!-- ПЛЯШУЩИЕ ТРЕХСЛОЙНЫЕ ЯЗЫКИ ПЛАМЕНИ ГОРНА -->
                                <path d="M36,168 Q48,105 68,75 Q88,105 100,168 Z" fill="#ea580c" class="anim-forge-furnace-flame flame-1"/>
                                <path d="M46,168 Q56,118 68,90 Q80,118 90,168 Z" fill="#f97316" class="anim-forge-furnace-flame flame-2"/>
                                <path d="M54,168 Q62,128 68,105 Q74,128 82,168 Z" fill="#fef08a" class="anim-forge-furnace-flame flame-3"/>

                                <!-- Сноп вылетающих раскаленных искр -->
                                <g class="forge-sparks-stream">
                                    <circle cx="62" cy="90" r="2.2" fill="#fef08a" class="anim-forge-spark spark-1"/>
                                    <circle cx="78" cy="75" r="1.8" fill="#f97316" class="anim-forge-spark spark-2"/>
                                    <circle cx="50" cy="60" r="1.5" fill="#fef08a" class="anim-forge-spark spark-3"/>
                                    <circle cx="85" cy="50" r="2.0" fill="#ea580c" class="anim-forge-spark spark-4"/>
                                    <circle cx="68" cy="40" r="1.6" fill="#fde047" class="anim-forge-spark spark-5"/>
                                </g>

                                <!-- Кожаные меха для нагнетания воздуха -->
                                <g transform="translate(-15, 120)">
                                    <polygon points="0,0 20,-8 20,25 0,18" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
                                    <line x1="20" y1="8" x2="30" y2="8" stroke="#1c1917" stroke-width="3"/>
                                </g>
                            </g>

                            <!-- СПРАЙТ КУЗНЕЦА ТОРВАЛЬДА С АНИМАЦИЕЙ ДЫХАНИЯ -->
                            <g id="smith-torvald-sprite" transform="translate(175, 48) scale(0.95)" class="npc-interior-breathe">
                                ${NpcRenderer.render(this.npc)}
                            </g>

                            <!-- ПЕРЕДНИЙ ПЛАН: ВЕРСТАК, НАКОВАЛЬНЯ С РАСКАЛЕННЫМ КЛИНКОМ И БОЧКА ДЛЯ ЗАКАЛКИ -->
                            <g id="blacksmith-foreground">
                                <!-- Массивный верстак из чугунных плит и дуба -->
                                <rect x="90" y="222" width="335" height="28" rx="4" fill="#3f3f46" stroke="#18181b" stroke-width="2.5"/>
                                <line x1="90" y1="225" x2="425" y2="225" stroke="#71717a" stroke-width="1.8"/>
                                <rect x="98" y="250" width="318" height="130" fill="#27272a" stroke="#18181b" stroke-width="2"/>
                                <line x1="98" y1="290" x2="416" y2="290" stroke="#18181b" stroke-width="2"/>
                                <line x1="98" y1="330" x2="416" y2="330" stroke="#18181b" stroke-width="2"/>

                                <!-- МАССИВНАЯ СТАЛЬНАЯ НАКОВАЛЬНЯ НА ДУБОВОМ ПНЕ -->
                                <g id="counter-anvil" transform="translate(130, 182)">
                                    <!-- Деревянный пень-основание -->
                                    <rect x="18" y="38" width="45" height="28" rx="3" fill="#451a03" stroke="#260f02" stroke-width="1.5"/>
                                    <line x1="20" y1="52" x2="61" y2="52" stroke="#1c1917" stroke-width="2"/>
                                    <!-- Литое тело наковальни -->
                                    <path d="M12,38 L68,38 L62,26 L68,14 L12,14 L18,26 Z" fill="url(#anvilGrad)" stroke="#1e293b" stroke-width="1.5"/>
                                    <!-- Рог наковальни (слева) -->
                                    <polygon points="12,14 0,20 12,25" fill="#64748b" stroke="#1e293b" stroke-width="1"/>
                                    <!-- Площадка наковальни -->
                                    <rect x="12" y="10" width="56" height="5" rx="1" fill="#94a3b8" stroke="#334155" stroke-width="1"/>

                                    <!-- РАСКАЛЕННАЯ ДОКРАСНА ЗАГОТОВКА КЛИНКА НА НАКОВАЛЬНЕ -->
                                    <rect x="18" y="7" width="46" height="5" rx="1.5" fill="url(#hotBladeGrad)" class="anim-hot-metal-glow"/>
                                    <!-- Тепловой ореол над заготовкой -->
                                    <ellipse cx="41" cy="9" rx="28" ry="10" fill="url(#hotSteelGlow)" class="anim-hot-metal-glow"/>

                                    <!-- Тяжелый кузнечный молот рядом с заготовкой -->
                                    <g transform="translate(56, 4)">
                                        <rect x="0" y="8" width="18" height="9" rx="1.5" fill="#475569" stroke="#1e293b" stroke-width="1"/>
                                        <line x1="9" y1="12" x2="30" y2="2" stroke="#ca8a04" stroke-width="2.5"/>
                                    </g>
                                </g>

                                <!-- БОЧКА ДЛЯ ЗАКАЛКИ МЕТАЛЛА С КЛУБЯЩИМСЯ ПАРОМ (СПРАВА) -->
                                <g id="quenching-barrel" transform="translate(365, 195)">
                                    <rect x="-18" y="15" width="36" height="42" rx="3" fill="#451a03" stroke="#1c0a02" stroke-width="2"/>
                                    <line x1="-18" y1="24" x2="18" y2="24" stroke="#1c1917" stroke-width="2.5"/>
                                    <line x1="-18" y1="46" x2="18" y2="46" stroke="#1c1917" stroke-width="2.5"/>
                                    <!-- Темная вода в бочке -->
                                    <ellipse cx="0" cy="15" rx="17" ry="5" fill="#0284c7" stroke="#0c4a6e" stroke-width="1.2"/>
                                    <!-- Клубы белого пара от закалки клинка -->
                                    <circle cx="-5" cy="5" r="4" fill="#f8fafc" opacity="0.6" class="anim-quenching-steam steam-1"/>
                                    <circle cx="3" cy="-3" r="6" fill="#f1f5f9" opacity="0.5" class="anim-quenching-steam steam-2"/>
                                    <circle cx="-2" cy="-12" r="8" fill="#e2e8f0" opacity="0.4" class="anim-quenching-steam steam-3"/>
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
                    this.player.smithBonuses.physicalDamage = (this.player.smithBonuses.physicalDamage || 0) + 3;
                    this.player.recalculateStats();
                    sound.playSfx('selectHero');
                    this.container.querySelector('#torvald-speech').textContent = '«Смотри, как играет блик на лезвии! Теперь оно срубит голову любому упырю!»';
                    this.updateTabs();
                    this.renderTabContent();
                }
            });

            view.querySelector('#btn-smith-armor').addEventListener('click', () => {
                if (this.player.gold >= 35) {
                    this.player.gold -= 35;
                    this.player.smithBonuses.defense = (this.player.smithBonuses.defense || 0) + 2;
                    this.player.recalculateStats();
                    sound.playSfx('coin');
                    this.container.querySelector('#torvald-speech').textContent = '«Вбил стальные заклепки и подогнал пластины. Никакая стрела из темноты не достанет!»';
                    this.updateTabs();
                    this.renderTabContent();
                }
            });

            view.querySelector('#btn-smith-crit').addEventListener('click', () => {
                if (this.player.gold >= 45) {
                    this.player.gold -= 45;
                    this.player.smithBonuses.critChance = (this.player.smithBonuses.critChance || 0) + 4;
                    this.player.recalculateStats();
                    sound.playSfx('coin');
                    this.container.querySelector('#torvald-speech').textContent = '«Идеальный вес и баланс. Клинок сам ложится в уязвимые сочленения врага!»';
                    this.updateTabs();
                    this.renderTabContent();
                }
            });
        } else {
            this.updateStock();
            const availableItems = this.armory.filter(i => !i.locked);
            const lockedItems = this.armory.filter(i => i.locked);

            view.innerHTML = `
                <div class="items-cards-grid">
                    ${availableItems.map(item => `
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

            view.querySelectorAll('.btn-buy-gear').forEach(btn => {
                btn.addEventListener('click', () => {
                    const item = this.armory.find(i => i.id === btn.dataset.id && !i.locked);
                    if (item && this.player.gold >= item.price) {
                        this.player.gold -= item.price;
                        this.player.inventory.push({ ...item });
                        sound.playSfx('selectHero');
                        this.container.querySelector('#torvald-speech').textContent = `«Отличная ковка! ${item.name} теперь в твоем вещмешке. Надень его через инвентарь!»`;
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