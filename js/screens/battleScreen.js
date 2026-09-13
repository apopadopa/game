import { sound } from '../audio/audioEngine.js';
import { battleTheme } from '../audio/music/battleTheme.js';
import { Icons } from '../visuals/icons.js';
import { CharacterRenderer } from '../visuals/characterRenderer.js';
import { MobRenderer } from '../visuals/mobRenderer.js';
import { getRandomBattleLoot, getMobRareDrop } from '../data/itemsData.js';

export class BattleScreen {
    constructor(player, monster, room, callbacks = {}) {
        this.player = player;
        this.monster = monster;
        this.room = room;
        this.callbacks = callbacks;

        this.container = null;
        this.isPlayerTurn = true;
        this.isActionInProgress = false;
        this.round = 1;

        // Монстр HP
        this.monsterHp = monster.hp || monster.baseHp || 60;
        this.monsterMaxHp = monster.maxHp || monster.hp || 60;

        // Классовый ресурс игрока
        this.initClassResource();

        // Баффы и статусы
        this.playerStatus = {
            defending: false,
            shadowVeil: false,
            trapActive: false,
            counterThorns: 0
        };

        this.monsterStatus = {
            poisonTurns: 0,
            poisonDmg: 0,
            burnTurns: 0,
            burnDmg: 0,
            stunned: false,
            defending: false
        };

        // Заранее рассчитываем первое намерение монстра
        this.monsterIntent = this.calculateMonsterIntent();

        // Журнал боя
        this.combatLogs = [
            { text: `Битва началась! Против вас выступает «${this.monster.fullName}».`, type: 'info' }
        ];

        // Состояние боя: 'active', 'victory', 'defeat'
        this.battleState = 'active';
        this.rewards = null;
    }

    initClassResource() {
        switch (this.player.classId) {
            case 'warrior':
                this.classResource = { name: 'Ярость', current: 15, max: 100, color: '#ef4444' };
                break;
            case 'rogue':
                this.classResource = { name: 'Энергия', current: 100, max: 100, combo: 0, maxCombo: 5, color: '#eab308' };
                break;
            case 'mage':
                this.classResource = { name: 'Мана', current: this.player.currentMp, max: this.player.maxMp, color: '#38bdf8' };
                break;
            case 'ranger':
            default:
                this.classResource = { name: 'Концентрация', current: 40, max: 100, color: '#22c55e' };
                break;
        }
    }

    render(container) {
        this.container = container;
        sound.switchMusic(battleTheme, 1.2);

        this.container.innerHTML = `
            <div class="battle-screen-wrap">
                <!-- SVG-фон арены из текущей комнаты -->
                <div class="battle-arena-background" id="battle-arena-bg">
                    <svg viewBox="0 0 960 560" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
                        ${this.renderRoomArenaSvg()}
                    </svg>
                </div>

                <!-- Верхняя панель: локация и раунд -->
                <div class="battle-top-bar">
                    <div class="battle-loc-info">
                        <span class="battle-room-tag">${Icons.sword(15)} Бой в локации:</span>
                        <strong class="battle-room-title">${this.room.name} (Этаж ${this.room.floorNum})</strong>
                    </div>
                    <div class="battle-round-badge">
                        <span>Раунд <strong>${this.round}</strong></span>
                    </div>
                </div>

                <!-- Главная сцена: Герой слева, Монстр справа -->
                <div class="battle-stage-row">
                    <!-- ЛЕВАЯ СТОРОНА: ГЕРОЙ -->
                    <div class="combatant-box hero-combatant-box" id="hero-box">
                        <div class="combatant-hud">
                            <div class="combatant-name-row">
                                <span class="combatant-name">${this.player.name}</span>
                                <span class="combatant-lvl">${Icons.crown(12)} Ур. ${this.player.level}</span>
                            </div>

                            <!-- Здоровье героя -->
                            <div class="battle-bar-group">
                                <div class="battle-bar-label">
                                    <span>${Icons.heart(12)} Здоровье</span>
                                    <span id="hero-hp-text">${this.player.currentHp} / ${this.player.maxHp}</span>
                                </div>
                                <div class="battle-bar-track">
                                    <div class="battle-bar-fill hp" id="hero-hp-bar" style="width: ${(this.player.currentHp / this.player.maxHp) * 100}%"></div>
                                </div>
                            </div>

                            <!-- Классовый ресурс героя -->
                            <div id="hero-resource-bar-wrap">
                                ${this.renderPlayerResourceBar()}
                            </div>

                            <!-- Активные статусы героя -->
                            <div class="combatant-buffs-row" id="hero-buffs">
                                ${this.renderPlayerBuffs()}
                            </div>
                        </div>

                        <!-- Ростовая фигура героя с дыханием -->
                        <div class="combatant-figure hero-figure-node hero-idle-breathe" id="hero-figure-node">
                            ${CharacterRenderer.render(this.player.visuals, this.player.classId, this.player.equipment)}
                        </div>
                    </div>

                    <!-- ЦЕНТР: ЖУРНАЛ БОЯ И ВСПЛЫВАЮЩИЕ ЭФФЕКТЫ -->
                    <div class="battle-center-col">
                        <div class="combat-log-card">
                            <div class="combat-log-header">
                                ${Icons.scroll(13)} Хроника боя
                            </div>
                            <div class="combat-log-list" id="combat-log-list">
                                ${this.renderCombatLogs()}
                            </div>
                        </div>
                    </div>

                    <!-- ПРАВАЯ СТОРОНА: МОНСТР -->
                    <div class="combatant-box mob-combatant-box" id="mob-box">
                        <div class="combatant-hud">
                            <div class="combatant-name-row">
                                <span class="combatant-name">${this.monster.fullName}</span>
                                <span class="mob-tier-badge ${this.monster.tierClass}">${this.monster.tierBadge}</span>
                            </div>

                            <!-- Здоровье монстра -->
                            <div class="battle-bar-group">
                                <div class="battle-bar-label">
                                    <span>${Icons.skull(12)} Здоровье</span>
                                    <span id="mob-hp-text">${Math.max(0, this.monsterHp)} / ${this.monsterMaxHp}</span>
                                </div>
                                <div class="battle-bar-track">
                                    <div class="battle-bar-fill mob-hp" id="mob-hp-bar" style="width: ${Math.max(0, (this.monsterHp / this.monsterMaxHp) * 100)}%"></div>
                                </div>
                            </div>

                            <!-- Индикатор намерения (Intent) монстра -->
                            <div class="mob-intent-box" id="mob-intent-box">
                                ${this.renderMonsterIntent()}
                            </div>

                            <!-- Баффы и дебаффы монстра -->
                            <div class="combatant-buffs-row" id="mob-buffs">
                                ${this.renderMonsterBuffs()}
                            </div>
                        </div>

                        <!-- Фигура монстра с анимацией устрашения -->
                        <div class="combatant-figure mob-figure-node mob-idle-menace" id="mob-figure-node">
                            ${MobRenderer.render(this.monster, 240, 270, true, 'left')}
                        </div>
                    </div>
                </div>

                <!-- Нижняя панель действий игрока -->
                <div class="battle-controls-card">
                    <div class="battle-actions-grid" id="battle-actions-grid">
                        ${this.renderActionButtons()}
                    </div>

                    <!-- Панель быстрых зелий -->
                    <div class="battle-potions-belt">
                        <span class="potions-belt-title">${Icons.potion(13)} Пояс зелий:</span>
                        <div class="potions-belt-items" id="potions-belt-items">
                            ${this.renderPotionsBelt()}
                        </div>
                    </div>
                </div>

                <!-- Оверлей визуальных спецэффектов магии и ударов -->
                <div class="battle-vfx-overlay" id="battle-vfx-overlay" pointer-events="none"></div>

                <!-- Оверлей всплывающих цифр урона -->
                <div class="floating-numbers-layer" id="floating-numbers-layer"></div>

                <!-- Модальное окно победы/поражения -->
                <div class="battle-modal-overlay hidden" id="battle-modal">
                    <div class="battle-modal-card" id="battle-modal-content"></div>
                </div>
            </div>
        `;

        this.initEvents();
    }

    renderRoomArenaSvg() {
        if (this.room && this.room.template && typeof this.room.template.renderSvg === 'function') {
            return this.room.template.renderSvg(960, 560);
        }
        // Запасной фон катакомб
        return `
            <rect width="960" height="420" fill="#181a24"/>
            <line x1="0" y1="420" x2="960" y2="420" stroke="#090a0f" stroke-width="4"/>
            <rect y="420" width="960" height="140" fill="#0f1118"/>
        `;
    }

    renderPlayerResourceBar() {
        if (this.player.classId === 'rogue') {
            const comboDots = [];
            for (let i = 0; i < 5; i++) {
                const filled = i < (this.classResource.combo || 0);
                comboDots.push(`<span class="combo-point-dot ${filled ? 'filled' : ''}"></span>`);
            }
            return `
                <div class="battle-bar-group">
                    <div class="battle-bar-label">
                        <span>${Icons.lightning(12)} Энергия</span>
                        <span>${this.classResource.current} / 100</span>
                    </div>
                    <div class="battle-bar-track">
                        <div class="battle-bar-fill energy" style="width: ${this.classResource.current}%"></div>
                    </div>
                    <div class="combo-points-row">
                        <span class="combo-label">Комбо:</span>
                        <div class="combo-dots-wrap">${comboDots.join('')}</div>
                    </div>
                </div>
            `;
        }

        if (this.player.classId === 'warrior') {
            return `
                <div class="battle-bar-group">
                    <div class="battle-bar-label">
                        <span>${Icons.fire(12)} Ярость</span>
                        <span>${this.classResource.current} / 100</span>
                    </div>
                    <div class="battle-bar-track">
                        <div class="battle-bar-fill rage" style="width: ${this.classResource.current}%"></div>
                    </div>
                </div>
            `;
        }

        if (this.player.classId === 'mage') {
            return `
                <div class="battle-bar-group">
                    <div class="battle-bar-label">
                        <span>${Icons.spark(12)} Мана</span>
                        <span>${this.player.currentMp} / ${this.player.maxMp}</span>
                    </div>
                    <div class="battle-bar-track">
                        <div class="battle-bar-fill mp" style="width: ${(this.player.currentMp / this.player.maxMp) * 100}%"></div>
                    </div>
                </div>
            `;
        }

        // Ranger
        return `
            <div class="battle-bar-group">
                <div class="battle-bar-label">
                    <span>${Icons.target(12)} Концентрация</span>
                    <span>${this.classResource.current} / 100</span>
                </div>
                <div class="battle-bar-track">
                    <div class="battle-bar-fill focus" style="width: ${this.classResource.current}%"></div>
                </div>
            </div>
        `;
    }

    renderPlayerBuffs() {
        const badges = [];
        if (this.player.tavernBuff && this.player.getTavernBuffRemainingSeconds() > 0) {
            badges.push(`<span class="status-badge buff" title="${this.player.tavernBuff.name}: ${this.player.tavernBuff.desc || ''}">${Icons.ale(12)} ${this.player.tavernBuff.name} (${this.player.getTavernBuffFormattedTime()})</span>`);
        }
        if (this.playerStatus.defending) {
            badges.push(`<span class="status-badge buff">${Icons.shield(12)} Оборона (-50%)</span>`);
        }
        if (this.playerStatus.shadowVeil) {
            badges.push(`<span class="status-badge buff">${Icons.eye(12)} В тени (+80% уклон)</span>`);
        }
        if (this.playerStatus.trapActive) {
            badges.push(`<span class="status-badge buff">${Icons.spark(12)} Капкан взведен</span>`);
        }
        if (this.playerStatus.counterThorns > 0) {
            badges.push(`<span class="status-badge buff">${Icons.sword(12)} Шипы (${this.playerStatus.counterThorns})</span>`);
        }
        return badges.join('');
    }

    renderMonsterBuffs() {
        const badges = [];
        if (this.monsterStatus.poisonTurns > 0) {
            badges.push(`<span class="status-badge debuff">${Icons.poison(12)} Яд (${this.monsterStatus.poisonTurns} ход.)</span>`);
        }
        if (this.monsterStatus.burnTurns > 0) {
            badges.push(`<span class="status-badge debuff">${Icons.fire(12)} Горение (${this.monsterStatus.burnTurns} ход.)</span>`);
        }
        if (this.monsterStatus.stunned) {
            badges.push(`<span class="status-badge debuff">${Icons.hourglass(12)} Ошеломлен</span>`);
        }
        if (this.monsterStatus.defending) {
            badges.push(`<span class="status-badge buff">${Icons.shield(12)} Защита</span>`);
        }
        return badges.join('');
    }

    renderMonsterIntent() {
        const intent = this.monsterIntent;
        if (!intent) return '';

        let icon = Icons.sword(14);
        let text = intent.title;
        let badgeClass = 'intent-normal';

        if (intent.type === 'heavy') {
            icon = Icons.warning(14);
            badgeClass = 'intent-heavy';
        } else if (intent.type === 'ability') {
            icon = Icons.spark(14);
            badgeClass = 'intent-ability';
        } else if (intent.type === 'defend') {
            icon = Icons.shield(14);
            badgeClass = 'intent-defend';
        }

        return `
            <div class="intent-pill ${badgeClass}" title="${intent.desc}">
                <span class="intent-icon">${icon}</span>
                <span class="intent-label">Намерение: <strong>${text}</strong></span>
            </div>
        `;
    }

    renderCombatLogs() {
        return this.combatLogs.slice(-6).map(log => {
            return `<div class="combat-log-line log-${log.type}">${log.text}</div>`;
        }).join('');
    }

    renderActionButtons() {
        const cid = this.player.classId;

        if (cid === 'warrior') {
            const hasRageHeavy = this.classResource.current >= 25;
            const hasRageExecute = this.classResource.current >= 45;

            return `
                <button class="btn-battle-skill" data-action="warrior_strike" title="Наносит 100% физ. урона и генерирует +18 ярости">
                    <span class="skill-name">${Icons.sword(14)} Удар мечом</span>
                    <span class="skill-cost cost-gain">+18 Ярости</span>
                </button>
                <button class="btn-battle-skill ${!hasRageHeavy ? 'disabled' : ''}" data-action="warrior_heavy" ${!hasRageHeavy ? 'disabled' : ''} title="Сокрушительный удар (170% урона), снижает урон врага">
                    <span class="skill-name">${Icons.lightning(14)} Сокрушительный выпад</span>
                    <span class="skill-cost">25 Ярости</span>
                </button>
                <button class="btn-battle-skill" data-action="warrior_defend" title="Снижает входящий урон на 60%, восстанавливает +20 ярости и вешает шипы">
                    <span class="skill-name">${Icons.shield(14)} Глухая оборона</span>
                    <span class="skill-cost cost-gain">+20 Ярости</span>
                </button>
                <button class="btn-battle-skill ${!hasRageExecute ? 'disabled' : ''}" data-action="warrior_execute" ${!hasRageExecute ? 'disabled' : ''} title="Огромный урон (250%). Если у врага <35% HP — гарантированный крит!">
                    <span class="skill-name">${Icons.skull(14)} Казнь</span>
                    <span class="skill-cost">45 Ярости</span>
                </button>
                <button class="btn-battle-skill btn-battle-flee" data-action="flee" title="Попытка тактического отступления">
                    <span class="skill-name">${Icons.door(14)} Отступить</span>
                    <span class="skill-cost">Побег</span>
                </button>
            `;
        }

        if (cid === 'rogue') {
            const energy = this.classResource.current;
            const combo = this.classResource.combo || 0;
            const hasEnergyStab = energy >= 20;
            const hasEnergyPoison = energy >= 35;
            const hasEnergyShadow = energy >= 30;
            const hasCombo = combo >= 1;

            return `
                <button class="btn-battle-skill ${!hasEnergyStab ? 'disabled' : ''}" data-action="rogue_stab" ${!hasEnergyStab ? 'disabled' : ''} title="Быстрый колющий удар кинжалом, дает +1 комбо-очко">
                    <span class="skill-name">${Icons.sword(14)} Быстрый выпад</span>
                    <span class="skill-cost">20 Энергии</span>
                </button>
                <button class="btn-battle-skill ${!hasEnergyPoison ? 'disabled' : ''}" data-action="rogue_poison" ${!hasEnergyPoison ? 'disabled' : ''} title="Отравленное лезвие: урон и периодический яд на 3 хода, +1 комбо-очко">
                    <span class="skill-name">${Icons.poison(14)} Отравленный клинок</span>
                    <span class="skill-cost">35 Энергии</span>
                </button>
                <button class="btn-battle-skill ${!hasEnergyShadow ? 'disabled' : ''}" data-action="rogue_shadow" ${!hasEnergyShadow ? 'disabled' : ''} title="Шаг в тень: повышает уклонение до 85% на 1 ход, +1 комбо-очко">
                    <span class="skill-name">${Icons.eye(14)} Шаг в тень</span>
                    <span class="skill-cost">30 Энергии</span>
                </button>
                <button class="btn-battle-skill ${!hasCombo ? 'disabled' : ''}" data-action="rogue_eviscerate" ${!hasCombo ? 'disabled' : ''} title="Расходует все комбо-очки (до 380% урона при 5 очках!)">
                    <span class="skill-name">${Icons.blood(14)} Потрошение</span>
                    <span class="skill-cost">Все комбо (${combo})</span>
                </button>
                <button class="btn-battle-skill btn-battle-flee" data-action="flee" title="Попытка тактического отступления">
                    <span class="skill-name">${Icons.door(14)} Отступить</span>
                    <span class="skill-cost">Побег</span>
                </button>
            `;
        }

        if (cid === 'mage') {
            const mp = this.player.currentMp;
            const hasDart = mp >= 5;
            const hasFireball = mp >= 25;
            const hasFrost = mp >= 20;
            const hasCascade = mp >= 40;

            return `
                <button class="btn-battle-skill ${!hasDart ? 'disabled' : ''}" data-action="mage_dart" ${!hasDart ? 'disabled' : ''} title="Магическая стрела (90% маг. урона), восполняет 8 MP">
                    <span class="skill-name">${Icons.spark(14)} Чародейская стрела</span>
                    <span class="skill-cost">5 MP / +8 реген</span>
                </button>
                <button class="btn-battle-skill ${!hasFireball ? 'disabled' : ''}" data-action="mage_fireball" ${!hasFireball ? 'disabled' : ''} title="Огненный шар: 180% маг. урона стихией огня + горение на 2 хода">
                    <span class="skill-name">${Icons.fire(14)} Огненный шар</span>
                    <span class="skill-cost">25 MP</span>
                </button>
                <button class="btn-battle-skill ${!hasFrost ? 'disabled' : ''}" data-action="mage_frost" ${!hasFrost ? 'disabled' : ''} title="Ледяная стрела: 140% урона холодом + заморозка (враг пропускает ход)">
                    <span class="skill-name">${Icons.ice(14)} Ледяная стрела</span>
                    <span class="skill-cost">20 MP</span>
                </button>
                <button class="btn-battle-skill ${!hasCascade ? 'disabled' : ''}" data-action="mage_cascade" ${!hasCascade ? 'disabled' : ''} title="Арканный каскад: 280% чистого урона, игнорирующего броню!">
                    <span class="skill-name">${Icons.lightning(14)} Арканный каскад</span>
                    <span class="skill-cost">40 MP</span>
                </button>
                <button class="btn-battle-skill btn-battle-flee" data-action="flee" title="Попытка тактического отступления">
                    <span class="skill-name">${Icons.door(14)} Отступить</span>
                    <span class="skill-cost">Побег</span>
                </button>
            `;
        }

        // Ranger
        const focus = this.classResource.current;
        const hasRapid = focus >= 30;
        const hasTrap = focus >= 25;
        const hasSnipe = focus >= 55;

        return `
            <button class="btn-battle-skill" data-action="ranger_shot" title="Меткий выстрел из лука (110% урона), накапливает +20 концентрации">
                <span class="skill-name">${Icons.target(14)} Меткий выстрел</span>
                <span class="skill-cost cost-gain">+20 Концентрации</span>
            </button>
            <button class="btn-battle-skill ${!hasRapid ? 'disabled' : ''}" data-action="ranger_rapid" ${!hasRapid ? 'disabled' : ''} title="Двойной залп: два быстрых выстрела подряд">
                <span class="skill-name">${Icons.lightning(14)} Двойной залп</span>
                <span class="skill-cost">30 Концентрации</span>
            </button>
            <button class="btn-battle-skill ${!hasTrap ? 'disabled' : ''}" data-action="ranger_trap" ${!hasTrap ? 'disabled' : ''} title="Шипованный капкан: при атаке монстр получает встречный урон и теряет ход">
                <span class="skill-name">${Icons.shield(14)} Шипованный капкан</span>
                <span class="skill-cost">25 Концентрации</span>
            </button>
            <button class="btn-battle-skill ${!hasSnipe ? 'disabled' : ''}" data-action="ranger_snipe" ${!hasSnipe ? 'disabled' : ''} title="Снайперский выстрел: 260% урона с повышенным шансом критического удара">
                <span class="skill-name">${Icons.target(14)} Снайперский выстрел</span>
                <span class="skill-cost">55 Концентрации</span>
            </button>
            <button class="btn-battle-skill btn-battle-flee" data-action="flee" title="Попытка тактического отступления">
                <span class="skill-name">${Icons.door(14)} Отступить</span>
                <span class="skill-cost">Побег</span>
            </button>
        `;
    }

    renderPotionsBelt() {
        const potions = [];
        this.player.inventory.forEach((item, idx) => {
            if (item && item.type === 'potion') {
                potions.push({ item, idx });
            }
        });

        if (potions.length === 0) {
            return `<span class="no-potions-hint">В сумке нет доступных зелий</span>`;
        }

        return potions.map(p => {
            const isHp = !!p.item.heal;
            const icon = isHp ? Icons.heart(14) : Icons.spark(14);
            const label = isHp ? `+${p.item.heal} HP` : `+${p.item.mana} MP`;
            return `
                <button class="btn-belt-potion ${isHp ? 'potion-hp' : 'potion-mp'}" data-index="${p.idx}" title="${p.item.name} (${label})">
                    ${icon} <span>${label}</span>
                </button>
            `;
        }).join('');
    }

    initEvents() {
        // Слушатели кнопок способностей
        this.container.querySelectorAll('.btn-battle-skill').forEach(btn => {
            btn.addEventListener('click', () => {
                if (!this.isPlayerTurn || this.isActionInProgress || this.battleState !== 'active') return;
                const action = btn.getAttribute('data-action');
                this.executePlayerAction(action);
            });
        });

        // Слушатели зелий в поясе
        this.container.querySelectorAll('.btn-belt-potion').forEach(btn => {
            btn.addEventListener('click', () => {
                if (!this.isPlayerTurn || this.isActionInProgress || this.battleState !== 'active') return;
                const idx = parseInt(btn.getAttribute('data-index'), 10);
                this.usePotionInBattle(idx);
            });
        });
    }

    // =========================================================================
    // ЛОГИКА ДЕЙСТВИЙ ИГРОКА
    // =========================================================================

    executePlayerAction(action) {
        if (action === 'flee') {
            this.handleFlee();
            return;
        }

        this.isActionInProgress = true;

        // Вызов соответствующей способности класса
        let result = null;
        switch (action) {
            // Воин
            case 'warrior_strike':
                result = this.actionWarriorStrike();
                break;
            case 'warrior_heavy':
                result = this.actionWarriorHeavy();
                break;
            case 'warrior_defend':
                result = this.actionWarriorDefend();
                break;
            case 'warrior_execute':
                result = this.actionWarriorExecute();
                break;

            // Разбойник
            case 'rogue_stab':
                result = this.actionRogueStab();
                break;
            case 'rogue_poison':
                result = this.actionRoguePoison();
                break;
            case 'rogue_shadow':
                result = this.actionRogueShadow();
                break;
            case 'rogue_eviscerate':
                result = this.actionRogueEviscerate();
                break;

            // Маг
            case 'mage_dart':
                result = this.actionMageDart();
                break;
            case 'mage_fireball':
                result = this.actionMageFireball();
                break;
            case 'mage_frost':
                result = this.actionMageFrost();
                break;
            case 'mage_cascade':
                result = this.actionMageCascade();
                break;

            // Лучник
            case 'ranger_shot':
                result = this.actionRangerShot();
                break;
            case 'ranger_rapid':
                result = this.actionRangerRapid();
                break;
            case 'ranger_trap':
                result = this.actionRangerTrap();
                break;
            case 'ranger_snipe':
                result = this.actionRangerSnipe();
                break;
        }

        if (!result) {
            this.isActionInProgress = false;
            return;
        }

        this.animateHeroAttack(() => {
            this.playCombatVfx(action, result.isCrit, () => {
                if (result.damage > 0) {
                    this.applyDamageToMonster(result.damage, result.isCrit);
                }

                this.addCombatLog(result.log, 'hero');
                this.updateHud();

                // Проверка победы
                if (this.monsterHp <= 0) {
                    setTimeout(() => this.handleVictory(), 600);
                    return;
                }

                // Переход хода к монстру
                setTimeout(() => {
                    this.startMonsterTurn();
                }, 700);
            });
        });
    }

    usePotionInBattle(inventoryIndex) {
        const item = this.player.inventory[inventoryIndex];
        if (!item) return;

        const res = this.player.useItem(inventoryIndex);
        if (res.success) {
            sound.playSfx('heal');
            this.showFloatingCombatText(this.container.querySelector('#hero-figure-node'), `+${res.msg}`, 'heal');
            this.addCombatLog(`${this.player.name} выпивает «${item.name}» (${res.msg}).`, 'heal');
            this.updateHud();
        } else {
            sound.playSfx('click');
            this.addCombatLog(res.msg, 'info');
        }
    }

    handleFlee() {
        if (this.room.isBossRoom || this.monster.tier === 'boss' || this.monster.tier === 'final_boss') {
            sound.playSfx('threat');
            this.addCombatLog('От свирепого босса невозможно сбежать!', 'mob');
            return;
        }

        sound.playSfx('step');
        this.addCombatLog(`${this.player.name} спешно отступает в безопасную зону!`, 'info');
        this.isActionInProgress = true;

        setTimeout(() => {
            if (this.callbacks.onFlee) {
                this.callbacks.onFlee();
            }
        }, 600);
    }

    // ==========================================
    // СПОСОБНОСТИ КЛАССОВ
    // ==========================================

    calculateDamage(basePower, isMagic = false, bonusCrit = 0, ignoreDefPercent = 0) {
        const statDmg = isMagic ? this.player.magicDamage : this.player.physicalDamage;
        const totalBase = Math.round(statDmg * basePower);

        // Крит
        const critRoll = Math.random() * 100;
        const isCrit = critRoll < (this.player.critChance + bonusCrit);
        const critMultiplier = isCrit ? 1.85 : 1.0;

        // Защита монстра
        const effectiveDef = Math.max(0, this.monster.def * (1 - ignoreDefPercent));
        const mitigated = Math.max(1, Math.round((totalBase * critMultiplier) - effectiveDef * 0.6));

        // Разброс урона ±8%
        const finalDmg = Math.max(1, Math.round(mitigated * (0.92 + Math.random() * 0.16)));

        return { damage: finalDmg, isCrit };
    }

    // --- ВОИН ---
    actionWarriorStrike() {
        sound.playSfx('slash');
        this.classResource.current = Math.min(100, this.classResource.current + 18);
        const { damage, isCrit } = this.calculateDamage(1.0);
        return {
            damage,
            isCrit,
            log: `${this.player.name} наносит резкий удар мечом на ${damage} урона${isCrit ? ' (КРИТ!)' : ''} и накапливает +18 ярости.`
        };
    }

    actionWarriorHeavy() {
        sound.playSfx('hit');
        this.classResource.current -= 25;
        const { damage, isCrit } = this.calculateDamage(1.7);
        let extra = '';
        if (Math.random() < 0.4) {
            this.monsterStatus.stunned = true;
            extra = ' Удар ошеломил противника!';
        }
        return {
            damage,
            isCrit,
            log: `${this.player.name} совершает сокрушительный выпад на ${damage} урона!${extra}`
        };
    }

    actionWarriorDefend() {
        sound.playSfx('block');
        this.classResource.current = Math.min(100, this.classResource.current + 20);
        this.playerStatus.defending = true;
        this.playerStatus.counterThorns = 15;
        return {
            damage: 0,
            isCrit: false,
            log: `${this.player.name} встает в глухую оборону: входящий урон снижен на 60%, активированы шипы (+15 урона)!`
        };
    }

    actionWarriorExecute() {
        sound.playSfx('hit');
        this.classResource.current -= 45;
        const isTargetLow = (this.monsterHp / this.monsterMaxHp) <= 0.35;
        const { damage, isCrit } = this.calculateDamage(2.5, false, isTargetLow ? 100 : 25);
        return {
            damage,
            isCrit,
            log: `${this.player.name} обрушивает казнь на ${damage} урона${isCrit ? ' (СМЕРТЕЛЬНЫЙ КРИТ!)' : ''}!`
        };
    }

    // --- РАЗБОЙНИК ---
    actionRogueStab() {
        sound.playSfx('stab');
        this.classResource.current -= 20;
        this.classResource.combo = Math.min(5, (this.classResource.combo || 0) + 1);
        const { damage, isCrit } = this.calculateDamage(1.05);
        return {
            damage,
            isCrit,
            log: `${this.player.name} делает быстрый выпад на ${damage} урона (+1 серия).`
        };
    }

    actionRoguePoison() {
        sound.playSfx('stab');
        this.classResource.current -= 35;
        this.classResource.combo = Math.min(5, (this.classResource.combo || 0) + 1);
        const { damage, isCrit } = this.calculateDamage(1.2);
        this.monsterStatus.poisonTurns = 3;
        this.monsterStatus.poisonDmg = Math.max(5, Math.round(this.player.physicalDamage * 0.35));
        return {
            damage,
            isCrit,
            log: `${this.player.name} вонзает отравленный клинок на ${damage} урона! Монстр отравлен на 3 хода.`
        };
    }

    actionRogueShadow() {
        sound.playSfx('magic');
        this.classResource.current -= 30;
        this.classResource.combo = Math.min(5, (this.classResource.combo || 0) + 1);
        this.playerStatus.shadowVeil = true;
        return {
            damage: 0,
            isCrit: false,
            log: `${this.player.name} растворяется в тенях: шанс уклонения увеличен до 85% на 1 ход (+1 серия).`
        };
    }

    actionRogueEviscerate() {
        sound.playSfx('slash');
        const combo = this.classResource.combo || 1;
        this.classResource.combo = 0;
        const multiplier = 1.0 + combo * 0.55;
        const { damage, isCrit } = this.calculateDamage(multiplier, false, combo * 8);
        return {
            damage,
            isCrit,
            log: `${this.player.name} проводит потрошение на ${combo} комбо-очках, нанося ${damage} сокрушительного урона${isCrit ? ' (КРИТ!)' : ''}!`
        };
    }

    // --- МАГ ---
    actionMageDart() {
        sound.playSfx('magic');
        this.player.currentMp = Math.min(this.player.maxMp, this.player.currentMp - 5 + 8);
        const { damage, isCrit } = this.calculateDamage(0.95, true);
        return {
            damage,
            isCrit,
            log: `${this.player.name} выпускает чародейскую стрелу на ${damage} маг. урона и восстанавливает ману.`
        };
    }

    actionMageFireball() {
        sound.playSfx('magic');
        this.player.currentMp = Math.max(0, this.player.currentMp - 25);
        const { damage, isCrit } = this.calculateDamage(1.8, true, 10);
        this.monsterStatus.burnTurns = 2;
        this.monsterStatus.burnDmg = Math.max(6, Math.round(this.player.magicDamage * 0.4));
        return {
            damage,
            isCrit,
            log: `${this.player.name} обрушивает огненный шар на ${damage} урона! Враг объят пламенем.`
        };
    }

    actionMageFrost() {
        sound.playSfx('magic');
        this.player.currentMp = Math.max(0, this.player.currentMp - 20);
        const { damage, isCrit } = this.calculateDamage(1.4, true);
        this.monsterStatus.stunned = true;
        return {
            damage,
            isCrit,
            log: `${this.player.name} посылает ледяную стрелу на ${damage} урона. Монстр скован льдом и пропустит ход!`
        };
    }

    actionMageCascade() {
        sound.playSfx('magic');
        this.player.currentMp = Math.max(0, this.player.currentMp - 40);
        const { damage, isCrit } = this.calculateDamage(2.8, true, 15, 0.5);
        return {
            damage,
            isCrit,
            log: `${this.player.name} высвобождает арканный каскад на ${damage} урона, игнорируя защиту врага${isCrit ? ' (КРИТ!)' : ''}!`
        };
    }

    // --- ЛУЧНИК ---
    actionRangerShot() {
        sound.playSfx('shoot');
        this.classResource.current = Math.min(100, this.classResource.current + 20);
        const { damage, isCrit } = this.calculateDamage(1.15);
        return {
            damage,
            isCrit,
            log: `${this.player.name} делает меткий выстрел на ${damage} урона (+20 концентрации).`
        };
    }

    actionRangerRapid() {
        sound.playSfx('shoot');
        this.classResource.current -= 30;
        const shot1 = this.calculateDamage(0.85);
        const shot2 = this.calculateDamage(0.85);
        const total = shot1.damage + shot2.damage;
        return {
            damage: total,
            isCrit: shot1.isCrit || shot2.isCrit,
            log: `${this.player.name} выпускает двойную очередь стрел на ${shot1.damage} + ${shot2.damage} (${total} урона)!`
        };
    }

    actionRangerTrap() {
        sound.playSfx('block');
        this.classResource.current -= 25;
        this.playerStatus.trapActive = true;
        return {
            damage: 0,
            isCrit: false,
            log: `${this.player.name} взводит скрытый шипованный капкан перед противником!`
        };
    }

    actionRangerSnipe() {
        sound.playSfx('shoot');
        this.classResource.current -= 55;
        const { damage, isCrit } = this.calculateDamage(2.6, false, 35, 0.3);
        return {
            damage,
            isCrit,
            log: `${this.player.name} производит снайперский выстрел на ${damage} урона${isCrit ? ' (КРИТ В СЕРДЦЕ!)' : ''}!`
        };
    }

    // =========================================================================
    // ХОД МОНСТРА И ИНТЕЛЛЕКТ
    // =========================================================================

    startMonsterTurn() {
        this.isPlayerTurn = false;

        // 1. Применение периодического урона по монстру (яд, горение)
        let dotDamage = 0;
        if (this.monsterStatus.poisonTurns > 0) {
            dotDamage += this.monsterStatus.poisonDmg;
            this.monsterStatus.poisonTurns--;
            this.addCombatLog(`Яд разъедает плоть чудовища на ${this.monsterStatus.poisonDmg} урона.`, 'hero');
        }
        if (this.monsterStatus.burnTurns > 0) {
            dotDamage += this.monsterStatus.burnDmg;
            this.monsterStatus.burnTurns--;
            this.addCombatLog(`Пламя сжигает монстра на ${this.monsterStatus.burnDmg} урона.`, 'hero');
        }

        if (dotDamage > 0) {
            this.applyDamageToMonster(dotDamage, false);
            this.updateHud();
            if (this.monsterHp <= 0) {
                setTimeout(() => this.handleVictory(), 500);
                return;
            }
        }

        // 2. Проверка оглушения монстра
        if (this.monsterStatus.stunned) {
            this.monsterStatus.stunned = false;
            this.addCombatLog(`«${this.monster.fullName}» ошеломлен и не может атаковать!`, 'hero');
            this.finishMonsterTurn();
            return;
        }

        // 3. Проверка капкана лучника
        if (this.playerStatus.trapActive) {
            this.playerStatus.trapActive = false;
            const trapDmg = Math.round(this.player.physicalDamage * 1.5);
            this.playCombatVfx('ranger_trap_trigger', true, () => {
                this.applyDamageToMonster(trapDmg, true);
                this.addCombatLog(`«${this.monster.fullName}» попадает лапой в капкан, получает ${trapDmg} урона и падает!`, 'hero');
                this.updateHud();
                if (this.monsterHp <= 0) {
                    setTimeout(() => this.handleVictory(), 500);
                    return;
                }
                this.finishMonsterTurn();
            });
            return;
        }

        // 4. Выполнение запланированного действия монстра
        this.executeMonsterIntent();
    }

    executeMonsterIntent() {
        const intent = this.monsterIntent;
        this.animateMobAttack(() => {
            // Проверка уклонения игрока
            let dodgeChance = this.player.dodgeChance;
            if (this.playerStatus.shadowVeil) dodgeChance = 85;

            if (Math.random() * 100 < dodgeChance) {
                sound.playSfx('magic');
                this.showFloatingCombatText(this.container.querySelector('#hero-figure-node'), 'УКЛОНЕНИЕ', 'dodge');
                this.addCombatLog(`${this.player.name} ловко уклоняется от атаки противника!`, 'hero');
                this.finishMonsterTurn();
                return;
            }

            this.playMobVfx(intent.type, () => {
                // Расчет урона монстра
                let rawDmg = this.monster.dmg;
                if (intent.type === 'heavy') rawDmg = Math.round(rawDmg * 1.7);
                if (intent.type === 'ability') rawDmg = Math.round(rawDmg * 1.4);

                // Снижение броней игрока
                let defFactor = this.player.defense * 0.7;
                if (this.playerStatus.defending) defFactor = defFactor * 1.8 + (rawDmg * 0.5);

                const finalDmg = Math.max(2, Math.round(rawDmg - defFactor));

                // Нанесение урона герою
                sound.playSfx('hit');
                this.player.currentHp = Math.max(0, this.player.currentHp - finalDmg);
                this.showFloatingCombatText(this.container.querySelector('#hero-figure-node'), `-${finalDmg}`, 'mob');

                // Обратный урон шипов воина
                if (this.playerStatus.counterThorns > 0) {
                    this.applyDamageToMonster(this.playerStatus.counterThorns, false);
                    this.addCombatLog(`Шипы щита наносят монстру ${this.playerStatus.counterThorns} ответного урона.`, 'hero');
                }

                // Начисление ярости воину при получении удара
                if (this.player.classId === 'warrior') {
                    this.classResource.current = Math.min(100, this.classResource.current + 12);
                }

                this.addCombatLog(`«${this.monster.fullName}» проводит атаку [${intent.title}] и наносит ${finalDmg} урона.`, 'mob');
                this.updateHud();

                // Проверка гибели героя
                if (this.player.currentHp <= 0) {
                    setTimeout(() => this.handleDefeat(), 600);
                    return;
                }

                this.finishMonsterTurn();
            });
        });
    }

    finishMonsterTurn() {
        // Сброс временных баффов раунда
        this.playerStatus.defending = false;
        this.playerStatus.shadowVeil = false;
        this.playerStatus.counterThorns = 0;

        // Восстановление ресурсов игрока в начале нового раунда
        if (this.player.classId === 'rogue') {
            this.classResource.current = Math.min(100, this.classResource.current + 25);
        }
        if (this.player.classId === 'ranger') {
            this.classResource.current = Math.min(100, this.classResource.current + 10);
        }

        this.round += 1;
        this.monsterIntent = this.calculateMonsterIntent();
        this.isPlayerTurn = true;
        this.isActionInProgress = false;

        this.updateHud();
    }

    calculateMonsterIntent() {
        const roll = Math.random();
        if (roll < 0.45) {
            return {
                type: 'attack',
                title: 'Обычная атака',
                desc: `Монстр замахивается базовым оружием (~${this.monster.dmg} урона).`
            };
        } else if (roll < 0.75) {
            return {
                type: 'heavy',
                title: 'Сокрушительный удар',
                desc: `Монстр готовит сокрушительный выпад (~${Math.round(this.monster.dmg * 1.7)} урона)! Рекомендуется защита.`
            };
        } else {
            const abTitle = typeof this.monster.ability === 'string' ? this.monster.ability : (this.monster.ability?.title || 'Спецудар');
            return {
                type: 'ability',
                title: abTitle,
                desc: `Монстр активирует стихийную способность «${abTitle}» (~${Math.round(this.monster.dmg * 1.4)} урона).`
            };
        }
    }

    // =========================================================================
    // АНИМАЦИИ И ВИЗУАЛ
    // =========================================================================

    applyDamageToMonster(amount, isCrit = false) {
        this.monsterHp = Math.max(0, this.monsterHp - amount);
        const mobNode = this.container.querySelector('#mob-figure-node');
        this.showFloatingCombatText(mobNode, `-${amount}${isCrit ? '!' : ''}`, isCrit ? 'crit' : 'player');
    }

    animateHeroAttack(callback) {
        const heroNode = this.container.querySelector('#hero-figure-node');
        const mobNode = this.container.querySelector('#mob-figure-node');

        if (heroNode) heroNode.classList.add('anim-attack-hero');
        setTimeout(() => {
            if (mobNode) mobNode.classList.add('anim-hit-shake');
        }, 150);

        setTimeout(() => {
            if (heroNode) heroNode.classList.remove('anim-attack-hero');
            if (mobNode) mobNode.classList.remove('anim-hit-shake');
            if (callback) callback();
        }, 360);
    }

    animateMobAttack(callback) {
        const mobNode = this.container.querySelector('#mob-figure-node');
        const heroNode = this.container.querySelector('#hero-figure-node');

        if (mobNode) mobNode.classList.add('anim-attack-mob');
        setTimeout(() => {
            if (heroNode) heroNode.classList.add('anim-hit-shake');
        }, 150);

        setTimeout(() => {
            if (mobNode) mobNode.classList.remove('anim-attack-mob');
            if (heroNode) heroNode.classList.remove('anim-hit-shake');
            if (callback) callback();
        }, 360);
    }

    showFloatingCombatText(targetElement, text, type = 'normal') {
        const layer = this.container.querySelector('#floating-numbers-layer');
        if (!layer || !targetElement) return;

        const rect = targetElement.getBoundingClientRect();
        const screenRect = this.container.getBoundingClientRect();

        const el = document.createElement('div');
        el.className = `floating-combat-text text-${type}`;
        el.textContent = text;

        const posX = (rect.left - screenRect.left) + rect.width / 2 - 20 + (Math.random() * 30 - 15);
        const posY = (rect.top - screenRect.top) + rect.height * 0.35 + (Math.random() * 20 - 10);

        el.style.left = `${posX}px`;
        el.style.top = `${posY}px`;

        layer.appendChild(el);

        setTimeout(() => {
            if (el.parentNode) el.parentNode.removeChild(el);
        }, 900);
    }

    shakeScreen(intensity = 'light') {
        const wrap = this.container.querySelector('.battle-screen-wrap');
        if (!wrap) return;
        const cls = `screen-shake-${intensity}`;
        wrap.classList.add(cls);
        setTimeout(() => {
            wrap.classList.remove(cls);
        }, intensity === 'crit' ? 450 : 320);
    }

    playCombatVfx(action, isCrit, callback) {
        const overlay = this.container.querySelector('#battle-vfx-overlay');
        const wrap = this.container.querySelector('.battle-screen-wrap');
        const heroNode = this.container.querySelector('#hero-figure-node');
        const mobNode = this.container.querySelector('#mob-figure-node');

        if (!overlay || !wrap || !heroNode || !mobNode) {
            if (callback) callback();
            return;
        }

        const wrapRect = wrap.getBoundingClientRect();
        const heroRect = heroNode.getBoundingClientRect();
        const mobRect = mobNode.getBoundingClientRect();

        const heroX = (heroRect.left - wrapRect.left) + heroRect.width * 0.65;
        const heroY = (heroRect.top - wrapRect.top) + heroRect.height * 0.45;
        const mobX = (mobRect.left - wrapRect.left) + mobRect.width * 0.35;
        const mobY = (mobRect.top - wrapRect.top) + mobRect.height * 0.45;

        // Огненный шар
        if (action === 'mage_fireball') {
            this.spawnProjectile({
                overlay,
                startX: heroX,
                startY: heroY,
                endX: mobX,
                endY: mobY,
                duration: 280,
                html: `<svg class="vfx-elem vfx-fireball-svg" viewBox="0 0 90 50"><ellipse cx="65" cy="25" rx="18" ry="14" fill="#fef08a" filter="drop-shadow(0 0 10px #ea580c)"/><ellipse cx="60" cy="25" rx="24" ry="18" fill="#f97316" opacity="0.85"/><path d="M 55 12 Q 25 25 5 20 Q 30 30 50 38 Z" fill="#dc2626" opacity="0.9"/></svg>`,
                onImpact: () => {
                    this.shakeScreen('heavy');
                    this.spawnImpact({
                        overlay,
                        x: mobX,
                        y: mobY,
                        duration: 450,
                        html: `<svg class="vfx-elem vfx-explosion-svg" viewBox="0 0 200 200"><circle cx="100" cy="100" r="22" fill="#fef08a" class="anim-fire-core"/><circle cx="100" cy="100" r="65" fill="none" stroke="#ea580c" stroke-width="14" class="anim-fire-blast"/><circle cx="55" cy="45" r="9" fill="#f97316" class="anim-spark-1"/><circle cx="145" cy="55" r="10" fill="#ef4444" class="anim-spark-2"/><circle cx="155" cy="145" r="8" fill="#fef08a" class="anim-spark-3"/><circle cx="45" cy="155" r="9" fill="#f97316" class="anim-spark-4"/></svg>`
                    });
                    if (callback) callback();
                }
            });
            return;
        }

        // Ледяная стрела
        if (action === 'mage_frost') {
            this.spawnProjectile({
                overlay,
                startX: heroX,
                startY: heroY,
                endX: mobX,
                endY: mobY,
                duration: 250,
                html: `<svg class="vfx-elem vfx-frost-svg" viewBox="0 0 100 40"><polygon points="90,20 65,10 10,18 65,20 10,22 65,30" fill="#e0f2fe" stroke="#38bdf8" stroke-width="2" filter="drop-shadow(0 0 8px #0284c7)"/><circle cx="85" cy="20" r="6" fill="#ffffff"/></svg>`,
                onImpact: () => {
                    this.shakeScreen('light');
                    this.spawnImpact({
                        overlay,
                        x: mobX,
                        y: mobY,
                        duration: 400,
                        html: `<svg class="vfx-elem vfx-frost-burst-svg" viewBox="0 0 180 180"><polygon points="90,30 95,75 85,75" fill="#bae6fd" stroke="#0284c7" stroke-width="2" class="frost-shard shard-1"/><polygon points="150,90 105,95 105,85" fill="#e0f2fe" stroke="#38bdf8" stroke-width="2" class="frost-shard shard-2"/><polygon points="90,150 85,105 95,105" fill="#bae6fd" stroke="#0284c7" stroke-width="2" class="frost-shard shard-3"/><polygon points="30,90 75,85 75,95" fill="#e0f2fe" stroke="#38bdf8" stroke-width="2" class="frost-shard shard-4"/><circle cx="90" cy="90" r="45" fill="none" stroke="#38bdf8" stroke-width="6" class="frost-ring"/></svg>`
                    });
                    if (callback) callback();
                }
            });
            return;
        }

        // Чародейская стрела
        if (action === 'mage_dart') {
            this.spawnProjectile({
                overlay,
                startX: heroX,
                startY: heroY,
                endX: mobX,
                endY: mobY,
                duration: 220,
                html: `<svg class="vfx-elem vfx-dart-svg" viewBox="0 0 80 40"><ellipse cx="55" cy="20" rx="14" ry="10" fill="#f0abfc" filter="drop-shadow(0 0 8px #c084fc)"/><circle cx="65" cy="20" r="5" fill="#ffffff"/><path d="M 50 15 L 10 20 L 50 25 Z" fill="#a855f7" opacity="0.7"/></svg>`,
                onImpact: () => {
                    this.shakeScreen('light');
                    this.spawnImpact({
                        overlay,
                        x: mobX,
                        y: mobY,
                        duration: 350,
                        html: `<svg class="vfx-elem vfx-dart-burst-svg" viewBox="0 0 120 120"><circle cx="60" cy="60" r="28" fill="none" stroke="#d946ef" stroke-width="5" class="vfx-pulse-ring"/><circle cx="60" cy="60" r="10" fill="#f5d0fe"/></svg>`
                    });
                    if (callback) callback();
                }
            });
            return;
        }

        // Арканный каскад
        if (action === 'mage_cascade') {
            this.shakeScreen('crit');
            this.spawnImpact({
                overlay,
                x: mobX,
                y: mobY,
                duration: 550,
                html: `<svg class="vfx-elem vfx-cascade-svg" viewBox="0 0 200 300"><line x1="70" y1="0" x2="70" y2="280" stroke="#c084fc" stroke-width="12" class="cascade-ray ray-1" filter="drop-shadow(0 0 10px #a855f7)"/><line x1="100" y1="0" x2="100" y2="290" stroke="#f0abfc" stroke-width="16" class="cascade-ray ray-2" filter="drop-shadow(0 0 14px #e879f9)"/><line x1="130" y1="0" x2="130" y2="280" stroke="#c084fc" stroke-width="12" class="cascade-ray ray-3" filter="drop-shadow(0 0 10px #a855f7)"/><ellipse cx="100" cy="285" rx="75" ry="18" fill="none" stroke="#e879f9" stroke-width="4" class="cascade-base"/></svg>`
            });
            setTimeout(() => {
                if (callback) callback();
            }, 180);
            return;
        }

        // Выстрел лучника
        if (action === 'ranger_shot') {
            this.spawnProjectile({
                overlay,
                startX: heroX,
                startY: heroY,
                endX: mobX,
                endY: mobY,
                duration: 200,
                html: `<svg class="vfx-elem vfx-arrow-svg" viewBox="0 0 110 30"><line x1="0" y1="15" x2="60" y2="15" stroke="rgba(255,255,255,0.4)" stroke-width="2" stroke-dasharray="6 4"/><line x1="30" y1="15" x2="100" y2="15" stroke="#78350f" stroke-width="3"/><polygon points="100,10 110,15 100,20" fill="#94a3b8" stroke="#475569"/><polygon points="30,10 40,15 30,20" fill="#22c55e"/></svg>`,
                onImpact: () => {
                    this.shakeScreen(isCrit ? 'crit' : 'light');
                    if (callback) callback();
                }
            });
            return;
        }

        // Двойной залп лучника
        if (action === 'ranger_rapid') {
            this.spawnProjectile({
                overlay,
                startX: heroX,
                startY: heroY - 8,
                endX: mobX,
                endY: mobY - 8,
                duration: 180,
                html: `<svg class="vfx-elem vfx-arrow-svg" viewBox="0 0 110 30"><line x1="30" y1="15" x2="100" y2="15" stroke="#78350f" stroke-width="3"/><polygon points="100,10 110,15 100,20" fill="#94a3b8" stroke="#475569"/><polygon points="30,10 40,15 30,20" fill="#22c55e"/></svg>`,
                onImpact: () => {
                    this.shakeScreen('light');
                }
            });
            setTimeout(() => {
                this.spawnProjectile({
                    overlay,
                    startX: heroX,
                    startY: heroY + 12,
                    endX: mobX,
                    endY: mobY + 12,
                    duration: 180,
                    html: `<svg class="vfx-elem vfx-arrow-svg" viewBox="0 0 110 30"><line x1="30" y1="15" x2="100" y2="15" stroke="#78350f" stroke-width="3"/><polygon points="100,10 110,15 100,20" fill="#94a3b8" stroke="#475569"/><polygon points="30,10 40,15 30,20" fill="#22c55e"/></svg>`,
                    onImpact: () => {
                        this.shakeScreen('light');
                        if (callback) callback();
                    }
                });
            }, 80);
            return;
        }

        // Снайперский выстрел
        if (action === 'ranger_snipe') {
            this.shakeScreen('crit');
            this.spawnImpact({
                overlay,
                x: mobX,
                y: mobY,
                duration: 450,
                html: `<svg class="vfx-elem vfx-snipe-svg" viewBox="0 0 400 60"><line x1="0" y1="30" x2="400" y2="30" stroke="#fef08a" stroke-width="7" filter="drop-shadow(0 0 12px #eab308)"/><ellipse cx="120" cy="30" rx="9" ry="20" fill="none" stroke="#fde047" stroke-width="2.5"/><ellipse cx="280" cy="30" rx="11" ry="24" fill="none" stroke="#fde047" stroke-width="2.5"/></svg>`
            });
            setTimeout(() => {
                if (callback) callback();
            }, 150);
            return;
        }

        // Капкан
        if (action === 'ranger_trap' || action === 'ranger_trap_trigger') {
            this.shakeScreen('heavy');
            this.spawnImpact({
                overlay,
                x: mobX,
                y: mobY + 45,
                duration: 450,
                html: `<svg class="vfx-elem vfx-trap-svg" viewBox="0 0 160 90"><path d="M 30 75 Q 80 85 130 75" stroke="#64748b" stroke-width="6" fill="none"/><path d="M 35 75 L 45 40 L 55 75 L 65 38 L 75 75 L 85 36 L 95 75 L 105 38 L 115 75 L 125 40" stroke="#e2e8f0" stroke-width="3.5" fill="none" class="trap-teeth"/><line x1="80" y1="40" x2="80" y2="75" stroke="#facc15" stroke-width="4"/></svg>`
            });
            setTimeout(() => {
                if (callback) callback();
            }, 160);
            return;
        }

        // Базовый удар воина
        if (action === 'warrior_strike') {
            this.shakeScreen(isCrit ? 'crit' : 'light');
            this.spawnImpact({
                overlay,
                x: mobX,
                y: mobY,
                duration: 350,
                html: `<svg class="vfx-elem vfx-slash-svg" viewBox="0 0 160 160"><path d="M 20 20 Q 90 80 140 140" stroke="#f8fafc" stroke-width="6" stroke-linecap="round" fill="none" filter="drop-shadow(0 0 8px #38bdf8)"/><path d="M 25 15 Q 85 75 135 135" stroke="#38bdf8" stroke-width="12" opacity="0.6" stroke-linecap="round" fill="none"/></svg>`
            });
            setTimeout(() => {
                if (callback) callback();
            }, 120);
            return;
        }

        // Сокрушительный выпад воина
        if (action === 'warrior_heavy') {
            this.shakeScreen('heavy');
            this.spawnImpact({
                overlay,
                x: mobX,
                y: mobY,
                duration: 420,
                html: `<svg class="vfx-elem vfx-heavy-slam-svg" viewBox="0 0 200 200"><path d="M 30 30 L 170 170" stroke="#fbbf24" stroke-width="8" stroke-linecap="round"/><path d="M 170 30 L 30 170" stroke="#ef4444" stroke-width="8" stroke-linecap="round"/><circle cx="100" cy="100" r="45" stroke="#f97316" stroke-width="5" fill="none" class="vfx-pulse-ring"/></svg>`
            });
            setTimeout(() => {
                if (callback) callback();
            }, 150);
            return;
        }

        // Глухая оборона воина
        if (action === 'warrior_defend') {
            this.spawnImpact({
                overlay,
                x: heroX,
                y: heroY,
                duration: 500,
                html: `<svg class="vfx-elem vfx-shield-svg" viewBox="0 0 160 200"><ellipse cx="80" cy="100" rx="70" ry="90" fill="rgba(250, 204, 21, 0.18)" stroke="#facc15" stroke-width="3.5" stroke-dasharray="12 6" class="vfx-rotate-shield"/><polygon points="80,40 120,70 120,130 80,160 40,130 40,70" fill="none" stroke="#fef08a" stroke-width="2" opacity="0.7"/></svg>`
            });
            setTimeout(() => {
                if (callback) callback();
            }, 150);
            return;
        }

        // Казнь воина
        if (action === 'warrior_execute') {
            this.shakeScreen('crit');
            this.spawnImpact({
                overlay,
                x: mobX,
                y: mobY,
                duration: 500,
                html: `<svg class="vfx-elem vfx-execute-svg" viewBox="0 0 120 240"><path d="M 50 10 L 70 10 L 70 180 L 60 220 L 50 180 Z" fill="#dc2626" stroke="#fca5a5" stroke-width="3" filter="drop-shadow(0 0 14px #ef4444)"/><rect x="30" y="45" width="60" height="12" rx="3" fill="#fef08a" stroke="#ca8a04"/><line x1="60" y1="0" x2="60" y2="45" stroke="#78350f" stroke-width="6"/></svg>`
            });
            setTimeout(() => {
                if (callback) callback();
            }, 180);
            return;
        }

        // Выпад разбойника
        if (action === 'rogue_stab') {
            this.shakeScreen('light');
            this.spawnImpact({
                overlay,
                x: mobX,
                y: mobY,
                duration: 320,
                html: `<svg class="vfx-elem vfx-slash-svg" viewBox="0 0 160 160"><path d="M 20 140 L 140 20" stroke="#f8fafc" stroke-width="6" stroke-linecap="round"/><path d="M 30 145 L 145 30" stroke="#eab308" stroke-width="10" opacity="0.5" stroke-linecap="round"/></svg>`
            });
            setTimeout(() => {
                if (callback) callback();
            }, 120);
            return;
        }

        // Отравленный клинок
        if (action === 'rogue_poison') {
            this.shakeScreen('light');
            this.spawnImpact({
                overlay,
                x: mobX,
                y: mobY,
                duration: 450,
                html: `<svg class="vfx-elem vfx-poison-svg" viewBox="0 0 150 150"><path d="M 20 30 Q 80 80 130 120" stroke="#22c55e" stroke-width="8" stroke-linecap="round" filter="drop-shadow(0 0 10px #16a34a)"/><circle cx="50" cy="90" r="7" fill="#4ade80" class="poison-drop drop-1"/><circle cx="90" cy="110" r="9" fill="#22c55e" class="poison-drop drop-2"/><circle cx="110" cy="80" r="6" fill="#86efac" class="poison-drop drop-3"/></svg>`
            });
            setTimeout(() => {
                if (callback) callback();
            }, 140);
            return;
        }

        // Шаг в тень
        if (action === 'rogue_shadow') {
            this.spawnImpact({
                overlay,
                x: heroX,
                y: heroY,
                duration: 500,
                html: `<svg class="vfx-elem vfx-shadow-svg" viewBox="0 0 160 200"><circle cx="80" cy="100" r="55" fill="#1e1b4b" opacity="0.75" filter="blur(8px)" class="shadow-puff"/><ellipse cx="80" cy="110" rx="70" ry="90" fill="none" stroke="#a855f7" stroke-width="3" stroke-dasharray="10 8" class="shadow-ring"/></svg>`
            });
            setTimeout(() => {
                if (callback) callback();
            }, 150);
            return;
        }

        // Потрошение
        if (action === 'rogue_eviscerate') {
            this.shakeScreen('crit');
            this.spawnImpact({
                overlay,
                x: mobX,
                y: mobY,
                duration: 480,
                html: `<svg class="vfx-elem vfx-frenzy-svg" viewBox="0 0 180 180"><path d="M 20 40 L 150 140" stroke="#ef4444" stroke-width="7" class="frenzy-slash slash-1" stroke-linecap="round"/><path d="M 150 40 L 30 150" stroke="#f87171" stroke-width="7" class="frenzy-slash slash-2" stroke-linecap="round"/><path d="M 20 90 L 160 90" stroke="#b91c1c" stroke-width="8" class="frenzy-slash slash-3" stroke-linecap="round"/></svg>`
            });
            setTimeout(() => {
                if (callback) callback();
            }, 180);
            return;
        }

        // Запасной вариант
        this.shakeScreen(isCrit ? 'crit' : 'light');
        if (callback) callback();
    }

    playMobVfx(intentType, callback) {
        const overlay = this.container.querySelector('#battle-vfx-overlay');
        const wrap = this.container.querySelector('.battle-screen-wrap');
        const heroNode = this.container.querySelector('#hero-figure-node');

        if (!overlay || !wrap || !heroNode) {
            if (callback) callback();
            return;
        }

        const wrapRect = wrap.getBoundingClientRect();
        const heroRect = heroNode.getBoundingClientRect();
        const heroX = (heroRect.left - wrapRect.left) + heroRect.width * 0.5;
        const heroY = (heroRect.top - wrapRect.top) + heroRect.height * 0.45;

        if (intentType === 'heavy') {
            this.shakeScreen('heavy');
            this.spawnImpact({
                overlay,
                x: heroX,
                y: heroY,
                duration: 450,
                html: `<svg class="vfx-elem vfx-mob-heavy-svg" viewBox="0 0 200 200"><path d="M 20 20 L 180 180" stroke="#7f1d1d" stroke-width="14" stroke-linecap="round" filter="drop-shadow(0 0 10px #ef4444)"/><circle cx="100" cy="100" r="50" fill="none" stroke="#b91c1c" stroke-width="6" class="mob-shockwave"/></svg>`
            });
        } else if (intentType === 'ability') {
            this.shakeScreen('heavy');
            this.spawnImpact({
                overlay,
                x: heroX,
                y: heroY,
                duration: 500,
                html: `<svg class="vfx-elem vfx-mob-spell-svg" viewBox="0 0 180 180"><circle cx="90" cy="90" r="60" fill="none" stroke="#7c3aed" stroke-width="8" stroke-dasharray="20 10" class="mob-spell-vortex" filter="drop-shadow(0 0 12px #6d28d9)"/><polygon points="90,40 125,120 55,120" fill="none" stroke="#c084fc" stroke-width="3" class="mob-rune-tri"/></svg>`
            });
        } else {
            this.shakeScreen('light');
            this.spawnImpact({
                overlay,
                x: heroX,
                y: heroY,
                duration: 380,
                html: `<svg class="vfx-elem vfx-claw-svg" viewBox="0 0 160 160"><path d="M 30 30 L 120 130" stroke="#ef4444" stroke-width="5" stroke-linecap="round"/><path d="M 50 20 L 140 120" stroke="#dc2626" stroke-width="5" stroke-linecap="round"/><path d="M 70 10 L 160 110" stroke="#b91c1c" stroke-width="5" stroke-linecap="round"/></svg>`
            });
        }

        setTimeout(() => {
            if (callback) callback();
        }, 150);
    }

    spawnProjectile({ overlay, startX, startY, endX, endY, duration, html, onImpact }) {
        const el = document.createElement('div');
        el.className = 'vfx-projectile-wrap';
        el.innerHTML = html;
        el.style.left = '0px';
        el.style.top = '0px';
        el.style.transform = `translate3d(${startX}px, ${startY}px, 0)`;
        overlay.appendChild(el);

        // Расчет угла полета для поворота снаряда
        const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
        const svgInside = el.querySelector('svg');
        if (svgInside) {
            svgInside.style.transform = `rotate(${angle}deg)`;
        }

        requestAnimationFrame(() => {
            el.style.transition = `transform ${duration}ms cubic-bezier(0.25, 0.9, 0.35, 1)`;
            el.style.transform = `translate3d(${endX}px, ${endY}px, 0)`;
        });

        setTimeout(() => {
            if (el.parentNode) el.parentNode.removeChild(el);
            if (onImpact) onImpact();
        }, duration);
    }

    spawnImpact({ overlay, x, y, duration, html }) {
        const el = document.createElement('div');
        el.className = 'vfx-impact-wrap';
        el.innerHTML = html;
        el.style.left = '0px';
        el.style.top = '0px';
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        overlay.appendChild(el);

        setTimeout(() => {
            if (el.parentNode) el.parentNode.removeChild(el);
        }, duration);
    }

    addCombatLog(text, type = 'info') {
        this.combatLogs.push({ text, type });
        const listEl = this.container.querySelector('#combat-log-list');
        if (listEl) {
            listEl.innerHTML = this.renderCombatLogs();
            listEl.scrollTop = listEl.scrollHeight;
        }
    }

    updateHud() {
        // Шкала HP героя
        const heroHpBar = this.container.querySelector('#hero-hp-bar');
        const heroHpText = this.container.querySelector('#hero-hp-text');
        if (heroHpBar) heroHpBar.style.width = `${Math.max(0, (this.player.currentHp / this.player.maxHp) * 100)}%`;
        if (heroHpText) heroHpText.textContent = `${this.player.currentHp} / ${this.player.maxHp}`;

        // Шкала классового ресурса героя (Ярость, Энергия/Комбо, Мана, Концентрация)
        const heroResourceWrap = this.container.querySelector('#hero-resource-bar-wrap');
        if (heroResourceWrap) heroResourceWrap.innerHTML = this.renderPlayerResourceBar();

        // Шкала HP монстра
        const mobHpBar = this.container.querySelector('#mob-hp-bar');
        const mobHpText = this.container.querySelector('#mob-hp-text');
        if (mobHpBar) mobHpBar.style.width = `${Math.max(0, (this.monsterHp / this.monsterMaxHp) * 100)}%`;
        if (mobHpText) mobHpText.textContent = `${Math.max(0, this.monsterHp)} / ${this.monsterMaxHp}`;

        // Намерение
        const intentBox = this.container.querySelector('#mob-intent-box');
        if (intentBox) intentBox.innerHTML = this.renderMonsterIntent();

        // Баффы
        const heroBuffs = this.container.querySelector('#hero-buffs');
        if (heroBuffs) heroBuffs.innerHTML = this.renderPlayerBuffs();
        const mobBuffs = this.container.querySelector('#mob-buffs');
        if (mobBuffs) mobBuffs.innerHTML = this.renderMonsterBuffs();

        // Раунд
        const roundBadge = this.container.querySelector('.battle-round-badge strong');
        if (roundBadge) roundBadge.textContent = this.round;

        // Кнопки действий
        const actionsGrid = this.container.querySelector('#battle-actions-grid');
        if (actionsGrid) actionsGrid.innerHTML = this.renderActionButtons();

        // Пояс зелий
        const potionsItems = this.container.querySelector('#potions-belt-items');
        if (potionsItems) potionsItems.innerHTML = this.renderPotionsBelt();

        this.initEvents();
    }

    // =========================================================================
    // ПОБЕДА И ПОРАЖЕНИЕ
    // =========================================================================

    handleVictory() {
        this.battleState = 'victory';
        sound.playSfx('victory');

        // Расчет наград
        const isFinalBoss = (this.monster.tier === 'final_boss' || (this.room && this.room.floorNum === 30 && this.room.isBossRoom));
        if (isFinalBoss) {
            this.player.hasDefeatedFinalBoss = true;
        }
        const isBoss = (this.monster.tier === 'boss' || isFinalBoss);
        const baseExp = Math.round((this.monsterMaxHp * 0.9 + this.monster.dmg * 2.2) * (isBoss ? 2.5 : 1.0));
        const gainedGold = Math.round((this.monster.dmg * 1.6 + Math.random() * 8) * (isBoss ? 3.0 : 1.0));

        // Начисление золота и опыта
        this.player.gold += gainedGold;
        const expResult = this.player.addExp(baseExp);

        // Дроп предмета с шансом: сначала проверяем редкий трофей монстра!
        let droppedItem = null;
        let isRareMobTrophy = false;

        const mobDrop = getMobRareDrop(this.monster, this.room?.floorNum || 1);
        if (mobDrop) {
            droppedItem = mobDrop;
            isRareMobTrophy = true;
            this.player.inventory.push(droppedItem);
            sound.playSfx('rareDrop');
        } else {
            const dropChance = isBoss ? 1.0 : (this.monster.tier === 'hardened' ? 0.65 : 0.35);
            if (Math.random() < dropChance) {
                droppedItem = this.generateBattleLoot(isBoss);
                if (droppedItem) {
                    this.player.inventory.push(droppedItem);
                }
            }
        }

        const modal = this.container.querySelector('#battle-modal');
        const content = this.container.querySelector('#battle-modal-content');

        content.innerHTML = `
            <div class="battle-victory-box">
                <div class="modal-victory-title">
                    <span class="victory-icon">${Icons.crown(28)}</span>
                    <h2>ПОБЕДА!</h2>
                </div>
                <p class="victory-subtext">Грозный враг «${this.monster.fullName}» повержен в честном бою!</p>

                ${isFinalBoss ? `
                    <div class="final-boss-triumph-banner anim-pop-in">
                        <span class="final-boss-icon">${Icons.crown(24)}</span>
                        <div class="final-boss-text">
                            <div class="final-boss-title">ВЕЛИКАЯ ПОБЕДА НАД ВЛАДЫКОЙ БЕЗДНЫ!</div>
                            <div class="final-boss-desc">Тьма катакомб повержена! Врата Южного тракта в городе теперь открыты!</div>
                        </div>
                    </div>
                ` : ''}

                ${isRareMobTrophy ? `
                    <div class="rare-mob-trophy-banner anim-pop-in">
                        <span class="rare-trophy-icon">${Icons.crown(22)}</span>
                        <div class="rare-trophy-text">
                            <div class="rare-trophy-title">УНИКАЛЬНЫЙ ТРОФЕЙ МОНСТРА!</div>
                            <div class="rare-trophy-desc">Выбита редчайшая экипировка чудовища: <strong>«${droppedItem.name}»</strong>!</div>
                        </div>
                    </div>
                ` : ''}

                ${expResult.leveledUp ? `
                    <div class="level-up-banner">
                        <div class="lvlup-title">${Icons.spark(16)} НОВЫЙ УРОВЕНЬ: ${expResult.newLevel}!</div>
                        <div class="lvlup-points">Получено <strong>+${expResult.pointsGained}</strong> очков характеристик! Распределите их в инвентаре.</div>
                    </div>
                ` : ''}

                <div class="rewards-summary-card">
                    <div class="reward-entry">
                        <span class="reward-label">${Icons.spark(14)} Опыт:</span>
                        <strong class="reward-val">+${baseExp} XP</strong>
                    </div>
                    <div class="reward-entry">
                        <span class="reward-label">${Icons.coin(14)} Золото:</span>
                        <strong class="reward-val">+${gainedGold} золотых</strong>
                    </div>
                    ${droppedItem ? `
                        <div class="reward-entry drop-entry rarity-${droppedItem.rarity || 'common'}">
                            <span class="reward-label">${Icons.backpack(14)} Трофей:</span>
                            <div class="drop-item-preview">
                                <span class="drop-item-icon">${droppedItem.icon || Icons.spark(16)}</span>
                                <strong class="reward-val drop-item-name">${droppedItem.name}</strong>
                                <span class="drop-item-badge rarity-${droppedItem.rarity || 'common'}">${droppedItem.rarity || 'common'}</span>
                            </div>
                        </div>
                    ` : ''}
                </div>

                <button class="btn btn-primary btn-lg" id="btn-victory-continue">
                    ${Icons.door(16)} Продолжить исследование
                </button>
            </div>
        `;

        modal.classList.remove('hidden');

        content.querySelector('#btn-victory-continue').addEventListener('click', () => {
            sound.playSfx('selectHero');
            if (this.callbacks.onVictory) {
                this.callbacks.onVictory({
                    monster: this.monster,
                    room: this.room,
                    expGained: baseExp,
                    goldGained: gainedGold,
                    droppedItem
                });
            }
        });
    }

    generateBattleLoot(isBoss = false) {
        const floor = (this.room && this.room.floorNum) ? this.room.floorNum : 1;
        const tier = (this.monster && this.monster.tier) ? this.monster.tier : (isBoss ? 'boss' : 'regular');
        return getRandomBattleLoot(floor, tier);
    }

    handleDefeat() {
        this.battleState = 'defeat';
        sound.playSfx('defeat');

        // Восстановление 50% HP при поражении
        this.player.currentHp = Math.max(1, Math.round(this.player.maxHp * 0.5));

        const modal = this.container.querySelector('#battle-modal');
        const content = this.container.querySelector('#battle-modal-content');

        content.innerHTML = `
            <div class="battle-defeat-box">
                <div class="modal-defeat-title">
                    <span class="defeat-icon">${Icons.skull(28)}</span>
                    <h2>ПОРАЖЕНИЕ</h2>
                </div>
                <p class="defeat-subtext">Вы пали в неравном бою от руки «${this.monster.fullName}». Спасательный отряд доставил вас в лазарет города.</p>
                <div class="defeat-note">Вы потеряли часть сил, но ваш инвентарь и уровень сохранены!</div>

                <button class="btn btn-danger btn-lg" id="btn-defeat-town">
                    ${Icons.castle(16)} Очнуться в городе
                </button>
            </div>
        `;

        modal.classList.remove('hidden');

        content.querySelector('#btn-defeat-town').addEventListener('click', () => {
            sound.playSfx('selectHero');
            if (this.callbacks.onDefeat) {
                this.callbacks.onDefeat();
            }
        });
    }

    cleanup() {
        // Метод очистки слушателей и состояния при закрытии экрана
    }
}
