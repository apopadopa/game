import { sound } from '../audio/audioEngine.js';
import { CharacterRenderer } from '../visuals/characterRenderer.js';
import { EquipmentVisuals } from '../visuals/equipmentVisuals.js';
import { Icons } from '../visuals/icons.js';
import { SaveSystem } from '../services/saveSystem.js';
import { Player } from '../entities/player.js';
import { inventoryMusic } from '../audio/music/inventoryMusic.js';
import { townTheme } from '../audio/music/townTheme.js';
import { QuestSystem } from '../services/questSystem.js';
import { QuestRenderer } from '../ui/questRenderer.js';

export class InventoryScreen {
    constructor(player, callbacks, initialTab = 'inventory') {
        this.player = player;
        this.callbacks = callbacks;
        this.currentTab = initialTab;
        this.selectedItem = null;
        this.selectedSource = null; // 'inventory' or 'equipment'
        this.selectedIndex = null;
        this.selectedSlot = null;
        this.toastMessage = null;
        this.toastTimer = null;
        this.isMusicStarted = false;

        // Ensure all slots are normalized
        this.player.normalizeAllSlots();
    }

    render(container) {
        this.container = container;

        if (!this.isMusicStarted) {
            sound.switchMusic(inventoryMusic, 1.3);
            this.isMusicStarted = true;
        }

        const activeQuestsCount = QuestSystem.getActiveQuestsList(this.player).length;
        const rowCount = Math.max(2, Math.floor(this.player.inventory.length / 5) + 1);
        const totalSlots = rowCount * 5;

        container.innerHTML = `
            <div class="inv-screen">
                <!-- ВЕРХНЯЯ ШАПКА -->
                <div class="inv-top-bar">
                    <div class="inv-title-wrap">
                        <h2>${this.currentTab === 'journal' ? 'Дневник заданий' : 'Инвентарь и снаряжение'}</h2>
                        <span class="inv-subtitle">${this.player.name} • ${this.player.className} (Ур. ${this.player.level || 1})</span>
                    </div>

                    <div class="inv-nav-tabs">
                        <button class="btn ${this.currentTab === 'inventory' ? 'btn-primary' : 'btn-secondary'} inv-tab-btn" id="btn-tab-inventory">
                            ${Icons.backpack(15)} Снаряжение
                        </button>
                        <button class="btn ${this.currentTab === 'journal' ? 'btn-primary' : 'btn-secondary'} inv-tab-btn" id="btn-tab-journal">
                            ${Icons.scroll(15)} Дневник заданий
                            ${activeQuestsCount > 0 ? `<span class="badge-tab-count">${activeQuestsCount}</span>` : ''}
                        </button>
                    </div>

                    <button class="btn btn-secondary inv-btn-close" id="btn-close-inv" title="Вернуться в город (I / Esc)">
                        ${Icons.arrowLeft(14)} Вернуться в игру
                    </button>
                </div>

                ${this.currentTab === 'journal' ? `
                    <!-- ЭКРАН ЖУРНАЛА ЗАДАНИЙ -->
                    <div class="inv-journal-stage">
                        ${QuestRenderer.renderJournalView(this.player)}
                    </div>
                ` : `
                    <!-- ОСНОВНАЯ РАБОЧАЯ ОБЛАСТЬ ИНВЕНТАРЯ -->
                    <div class="inv-main-stage">
                        <!-- ЛЕВАЯ КОЛОНКА: КУКЛА ГЕРОЯ + ЭКИПИРОВКА + СЕТКА ИНВЕНТАРЯ -->
                        <div class="inv-left-column">
                            <!-- ЗОНА КУКЛЫ И СЛОТОВ СНАРЯЖЕНИЯ -->
                            <div class="inv-doll-section">
                                <div class="equip-slots-col left-slots">
                                    ${this.renderEquipSlot('head', 'Голова / Шлем', Icons.helmet(22))}
                                    ${this.renderEquipSlot('torso', 'Доспех / Торс', Icons.tunic(22))}
                                    ${this.renderEquipSlot('legs', 'Поножи / Штаны', Icons.pants(22))}
                                    ${this.renderEquipSlot('boots', 'Обувь / Сапоги', Icons.boots(22))}
                                </div>

                                <div class="inv-paperdoll-box" title="Перетащите предмет сюда для быстрой экипировки">
                                    <div class="doll-render-wrap">
                                        ${CharacterRenderer.render(this.player.visuals, this.player.classId, this.player.equipment)}
                                    </div>
                                    <div class="doll-pedestal-label">${this.player.name}</div>
                                </div>

                                <div class="equip-slots-col right-slots">
                                    ${this.renderEquipSlot('mainHand', 'Основное оружие', Icons.sword(22))}
                                    ${this.renderEquipSlot('offHand', 'Вторая рука / Щит', Icons.shield(22))}
                                    ${this.renderEquipSlot('accessory', 'Амулет / Реликвия', Icons.amulet(22))}
                                </div>
                            </div>

                            <!-- ЗОНА СЕТКИ ИНВЕНТАРЯ -->
                            <div class="inv-backpack-section">
                                <div class="inv-backpack-header">
                                    <span class="backpack-title">${Icons.backpack(16)} Вещмешок (перетаскивайте мышкой)</span>
                                    <span class="backpack-count">${this.player.inventory.length} / ${totalSlots} ячеек</span>
                                </div>

                                <div class="inv-grid-scroll-box" id="inv-grid-scroll">
                                    <div class="inv-slots-grid">
                                        ${this.renderInventorySlots(totalSlots)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- ПРАВАЯ КОЛОНКА: СИСТЕМНОЕ МЕНЮ + ПАРАМЕТРЫ + ИНСПЕКТОР ПРЕДМЕТА -->
                        <div class="inv-right-column">
                            <!-- СИСТЕМНЫЕ КНОПКИ МЕНЮ -->
                            <div class="inv-menu-actions-box">
                                <div class="menu-actions-grid">
                                    <button class="btn btn-primary btn-action-save" id="btn-save-game">
                                        ${Icons.saveDisk(15)} Сохранить игру
                                    </button>
                                    <button class="btn btn-secondary btn-action-exit" id="btn-exit-to-main">
                                        ${Icons.door(15)} Главное меню
                                    </button>
                                </div>

                                <div class="save-toast-banner ${this.toastMessage ? 'visible' : ''}" id="save-toast">
                                    ${this.toastMessage || ''}
                                </div>
                            </div>

                            <!-- СВОДКА ХАРАКТЕРИСТИК -->
                            <div class="inv-stats-card">
                                <div class="stats-header-row">
                                    <div class="stat-badge-gold">${Icons.coin(14)} <strong>${this.player.gold}</strong> золота</div>
                                    <div class="stat-badge-level" id="stat-level-badge">
                                        <div class="stat-level-label">Уровень <strong>${this.player.level || 1}</strong></div>
                                        <div class="stat-xp-track">
                                            <div class="stat-xp-fill" style="width: ${this.player.getExpPercent()}%"></div>
                                        </div>
                                        <div class="stat-xp-tooltip">
                                            <div class="stat-xp-tt-title">Прогресс опыта</div>
                                            <div class="stat-xp-tt-val">${this.player.exp} / ${this.player.getExpRequiredForNextLevel()} XP <span>(${this.player.getExpPercent()}%)</span></div>
                                            <div class="stat-xp-tt-sub">До ур. ${this.player.level + 1} нужно еще <strong>${this.player.getExpToNextLevel()} XP</strong></div>
                                        </div>
                                    </div>
                                </div>

                                ${this.player.statPoints > 0 ? `
                                    <div class="stat-points-banner">
                                        <div class="stat-points-pulse">${Icons.spark(14)} Очки прокачки: <strong>${this.player.statPoints}</strong></div>
                                        <div class="stat-points-hint">Распределите очки между параметрами [+]</div>
                                    </div>
                                ` : ''}

                                <div class="stats-bars-row">
                                    <div class="stat-bar-group">
                                        <div class="stat-bar-label"><span>Здоровье</span><span>${this.player.currentHp} / ${this.player.maxHp}</span></div>
                                        <div class="hud-bar-wrap">
                                            <div class="hud-bar-fill hp" style="width: ${(this.player.currentHp / this.player.maxHp) * 100}%"></div>
                                        </div>
                                    </div>
                                    <div class="stat-bar-group">
                                        <div class="stat-bar-label"><span>Мана</span><span>${this.player.currentMp} / ${this.player.maxMp}</span></div>
                                        <div class="hud-bar-wrap">
                                            <div class="hud-bar-fill mp" style="width: ${(this.player.currentMp / this.player.maxMp) * 100}%"></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="stats-table-grid">
                                    <div class="stat-pill stat-pill-alloc">
                                        <div class="stat-pill-info"><span>Сила:</span> <strong>${this.player.attributes.strength}</strong></div>
                                        ${this.player.statPoints > 0 ? `<button class="btn-stat-plus" data-stat="strength" title="Повысить Силу (+1)">+</button>` : ''}
                                    </div>
                                    <div class="stat-pill stat-pill-alloc">
                                        <div class="stat-pill-info"><span>Ловкость:</span> <strong>${this.player.attributes.agility}</strong></div>
                                        ${this.player.statPoints > 0 ? `<button class="btn-stat-plus" data-stat="agility" title="Повысить Ловкость (+1)">+</button>` : ''}
                                    </div>
                                    <div class="stat-pill stat-pill-alloc">
                                        <div class="stat-pill-info"><span>Интеллект:</span> <strong>${this.player.attributes.intelligence}</strong></div>
                                        ${this.player.statPoints > 0 ? `<button class="btn-stat-plus" data-stat="intelligence" title="Повысить Интеллект (+1)">+</button>` : ''}
                                    </div>
                                    <div class="stat-pill stat-pill-alloc">
                                        <div class="stat-pill-info"><span>Живучесть:</span> <strong>${this.player.attributes.vitality}</strong></div>
                                        ${this.player.statPoints > 0 ? `<button class="btn-stat-plus" data-stat="vitality" title="Повысить Живучесть (+1)">+</button>` : ''}
                                    </div>
                                    <div class="stat-pill"><span>${Icons.sword(12)} Урон:</span> <strong>${this.player.physicalDamage}</strong></div>
                                    <div class="stat-pill"><span>${Icons.shield(12)} Защита:</span> <strong>${this.player.defense}</strong></div>
                                    <div class="stat-pill"><span>${Icons.target(12)} Крит:</span> <strong>${this.player.critChance}%</strong></div>
                                    <div class="stat-pill"><span>Уклонение:</span> <strong>${this.player.dodgeChance}%</strong></div>
                                </div>
                            </div>

                            <!-- ИНСПЕКТОР ВЫБРАННОГО ПРЕДМЕТА -->
                            <div class="inv-inspect-card" id="inv-inspect-card">
                                ${this.renderInspectPanel()}
                            </div>
                        </div>
                    </div>
                `}
            </div>
        `;

        this.initEvents();
        if (this.currentTab === 'inventory') {
            this.initDragAndDrop();
        }
    }

    renderEquipSlot(slotKey, label, fallbackIcon) {
        const item = this.player.equipment[slotKey];
        const isSelected = this.selectedSource === 'equipment' && this.selectedSlot === slotKey;
        const rarityClass = item ? `rarity-${item.rarity || 'common'}` : '';

        return `
            <div class="equip-slot-box ${item ? 'filled ' + rarityClass : 'empty'} ${isSelected ? 'selected' : ''}" 
                 data-slot="${slotKey}" 
                 title="${item ? item.name + ' [' + this.getRarityName(item.rarity || 'common') + '] (двойной клик или перетаскивание для снятия)' : label + ' (перетащите предмет сюда)'}">
                <div class="equip-slot-icon">
                    ${item ? this.getItemIcon(item, 28) : fallbackIcon}
                </div>
                <div class="equip-slot-label">${item ? item.name : label}</div>
            </div>
        `;
    }

    renderInventorySlots(totalSlots) {
        let html = '';
        for (let i = 0; i < totalSlots; i++) {
            const item = this.player.inventory[i];
            const isSelected = this.selectedSource === 'inventory' && this.selectedIndex === i;

            if (item) {
                const rarityClass = `rarity-${item.rarity || 'common'}`;
                html += `
                    <div class="inv-slot item-filled ${rarityClass} ${isSelected ? 'selected' : ''}" 
                         data-index="${i}" 
                         title="${item.name} [${this.getRarityName(item.rarity || 'common')}] (двойной клик или перетаскивание)">
                        <div class="inv-item-icon-box">
                            ${this.getItemIcon(item, 28)}
                        </div>
                    </div>
                `;
            } else {
                html += `
                    <div class="inv-slot empty-slot" data-index="${i}"></div>
                `;
            }
        }
        return html;
    }

    getItemIcon(item, size = 26) {
        if (!item) return '';

        // Точные иконки конкретных расходников игры (всегда наивысший приоритет)
        switch (item.id) {
            case 'hp_potion': return Icons.potion(size, '#ef4444');
            case 'mp_potion': return Icons.potion(size, '#3b82f6');
            case 'greater_hp_potion': return Icons.potion(size, '#dc2626');
            case 'greater_mp_potion': return Icons.potion(size, '#2563eb');
            case 'escape_scroll': return Icons.scroll(size);
            case 'torch': return Icons.spark(size);
            case 'urn_holy': return Icons.urn(size);
        }

        // Общие типы расходных предметов
        if (item.type === 'potion') return Icons.potion(size, item.mana ? '#3b82f6' : '#ef4444');
        if (item.type === 'food') return Icons.meat ? Icons.meat(size) : Icons.ale(size);
        if (item.type === 'scroll') return Icons.scroll(size);
        if (item.type === 'tool') return Icons.spark(size);

        // 1. Приоритетный вызов EquipmentVisuals только для валидной экипировки
        if (Player.isEquippable(item)) {
            const eqIcon = EquipmentVisuals.getItemIcon(item, size);
            if (eqIcon) {
                return eqIcon;
            }
        }

        if (item.icon && typeof item.icon === 'string' && item.icon.includes('<svg')) {
            return item.icon;
        }

        if (Player.isEquippable(item)) {
            const slot = item.slot || Player.inferSlot(item);
            switch (slot) {
                case 'mainHand': return Icons.broadsword(size);
                case 'offHand': return Icons.shield(size);
                case 'head': return Icons.helmet(size);
                case 'torso': return Icons.chainmail(size);
                case 'legs': return Icons.pants(size);
                case 'boots': return Icons.boots(size);
                case 'accessory': return Icons.amulet(size);
            }
        }

        switch (item.type) {
            case 'relic': return Icons.urn(size);
            case 'weapon': return Icons.sword(size);
            case 'shield': return Icons.shield(size);
            case 'armor': return Icons.armor(size);
            default: return Icons.spark(size);
        }
    }

    getRarityName(rarity) {
        switch (rarity) {
            case 'legendary': return 'Легендарный';
            case 'epic': return 'Эпический';
            case 'rare': return 'Редкий';
            case 'uncommon': return 'Необычный';
            case 'common':
            default: return 'Обычный';
        }
    }

    renderInspectPanel() {
        const item = this.selectedItem;

        if (!item) {
            return `
                <div class="inspect-placeholder">
                    <div class="inspect-placeholder-icon">${Icons.backpack(32)}</div>
                    <div class="inspect-placeholder-text">
                        Выберите предмет в вещмешке или ячейку снаряжения, чтобы экипировать, применить или осмотреть свойства.
                    </div>
                </div>
            `;
        }

        let statBonuses = [];
        if (item.physicalDamage) statBonuses.push(`+${item.physicalDamage} к физ. урону`);
        if (item.magicDamage) statBonuses.push(`+${item.magicDamage} к маг. урону`);
        if (item.defense) statBonuses.push(`+${item.defense} к защите`);
        if (item.critChance) statBonuses.push(`+${item.critChance}% к криту`);
        if (item.dodgeChance) statBonuses.push(`+${item.dodgeChance}% к уклонению`);
        if (item.heal) statBonuses.push(`Восстанавливает ${item.heal} HP`);
        if (item.mana) statBonuses.push(`Восстанавливает ${item.mana} MP`);
        if (item.buffHp) statBonuses.push(`+${item.buffHp} к макс. HP (4 мин, не стакается)`);
        if (item.buffMp) statBonuses.push(`+${item.buffMp} к макс. MP (4 мин, не стакается)`);
        if (item.buffCrit) statBonuses.push(`+${item.buffCrit}% к шансу крита (4 мин, не стакается)`);
        if (item.buffDmg) statBonuses.push(`+${item.buffDmg} к физ. урону (4 мин, не стакается)`);
        if (item.maxHp) statBonuses.push(`+${item.maxHp} к макс. HP`);

        const isEquipped = this.selectedSource === 'equipment';
        const isEquippable = Player.isEquippable(item);
        const detectedSlot = isEquippable ? (item.slot || Player.inferSlot(item)) : null;
        const canEquip = !isEquipped && isEquippable && !!detectedSlot;
        const canUse = !isEquipped && (item.type === 'potion' || item.type === 'food');
        const canUnequip = isEquipped;
        const rarity = item.rarity || 'common';

        return `
            <div class="inspect-header-row">
                <div class="inspect-icon-frame rarity-${rarity}">${this.getItemIcon(item, 34)}</div>
                <div class="inspect-title-meta">
                    <div class="inspect-item-name">${item.name}</div>
                    <div class="inspect-meta-badges">
                        <span class="inspect-item-type">${this.getSlotName(detectedSlot) || this.getTypeName(item.type)}</span>
                        <span class="inspect-item-rarity-badge rarity-${rarity}">${this.getRarityName(rarity)}</span>
                    </div>
                </div>
            </div>

            <div class="inspect-desc-text">
                ${item.desc || 'Предмет снаряжения искателя приключений.'}
            </div>

            ${statBonuses.length > 0 ? `
                <div class="inspect-stats-list">
                    ${statBonuses.map(s => `<div class="inspect-stat-entry">${s}</div>`).join('')}
                </div>
            ` : ''}

            <div class="inspect-buttons-row">
                ${canEquip ? `
                    <button class="btn btn-primary btn-equip-action" id="btn-inspect-equip" title="Надеть предмет">
                        ${Icons.armor(15)} Экипировать
                    </button>
                ` : ''}

                ${canUse ? `
                    <button class="btn btn-primary btn-use-action" id="btn-inspect-use" title="Выпить зелье">
                        Использовать
                    </button>
                ` : ''}

                ${canUnequip ? `
                    <button class="btn btn-secondary" id="btn-inspect-unequip" title="Снять в инвентарь">
                        Снять в рюкзак
                    </button>
                ` : ''}

                ${!isEquipped ? `
                    <button class="btn btn-secondary btn-drop" id="btn-inspect-drop" title="Выбросить предмет">
                        Выбросить
                    </button>
                ` : ''}
            </div>
        `;
    }

    getSlotName(slot) {
        const slots = {
            mainHand: 'Основное оружие',
            offHand: 'Вторая рука / Щит',
            head: 'Голова / Шлем',
            torso: 'Доспех / Торс',
            legs: 'Поножи / Штаны',
            boots: 'Обувь / Сапоги',
            accessory: 'Амулет / Реликвия'
        };
        return slots[slot] || null;
    }

    getTypeName(type) {
        const types = {
            potion: 'Снадобье / Зелье',
            scroll: 'Магический свиток',
            tool: 'Инструмент',
            relic: 'Священная реликвия',
            weapon: 'Оружие',
            shield: 'Щит',
            armor: 'Броня',
            food: 'Трактирная снедь'
        };
        return types[type] || 'Трофей';
    }

    initEvents() {
        // Кнопка возврата в город
        const btnClose = this.container.querySelector('#btn-close-inv');
        if (btnClose) {
            btnClose.addEventListener('click', () => {
                sound.playSfx('click');
                sound.switchMusic(townTheme, 1.4);
                this.callbacks.onClose();
            });
        }

        // Переключение вкладок Инвентарь / Журнал
        const btnTabInv = this.container.querySelector('#btn-tab-inventory');
        if (btnTabInv) {
            btnTabInv.addEventListener('click', () => {
                if (this.currentTab !== 'inventory') {
                    sound.playSfx('tab');
                    this.currentTab = 'inventory';
                    this.render(this.container);
                }
            });
        }

        const btnTabJournal = this.container.querySelector('#btn-tab-journal');
        if (btnTabJournal) {
            btnTabJournal.addEventListener('click', () => {
                if (this.currentTab !== 'journal') {
                    sound.playSfx('tab');
                    this.currentTab = 'journal';
                    this.render(this.container);
                }
            });
        }

        // Кнопка сохранения игры
        const btnSave = this.container.querySelector('#btn-save-game');
        if (btnSave) {
            btnSave.addEventListener('click', () => {
                const res = SaveSystem.save(this.player);
                if (res.success) {
                    sound.playSfx('selectHero');
                    const timeStr = res.timestamp.toLocaleTimeString();
                    this.showToast(`${Icons.check(14)} Игра успешно сохранена (${timeStr})!`);
                } else {
                    sound.playSfx('click');
                    this.showToast('Ошибка сохранения!');
                }
            });
        }

        // Выход в главное меню
        const btnExit = this.container.querySelector('#btn-exit-to-main');
        if (btnExit) {
            btnExit.addEventListener('click', () => {
                sound.playSfx('click');
                if (confirm('Вернуться в главное меню? Несохраненный прогресс может быть потерян.')) {
                    this.callbacks.onMainMenu();
                }
            });
        }

        // Клики по ячейкам инвентаря
        this.container.querySelectorAll('.inv-slot.item-filled').forEach(slot => {
            slot.addEventListener('click', () => {
                const idx = parseInt(slot.dataset.index, 10);
                sound.playSfx('tab');
                this.selectInventoryItem(idx);
            });

            // Двойной клик: быстро надеть или применить
            slot.addEventListener('dblclick', () => {
                const idx = parseInt(slot.dataset.index, 10);
                const item = this.player.inventory[idx];
                if (item) {
                    if (Player.isEquippable(item)) {
                        const equipSlot = item.slot || Player.inferSlot(item);
                        if (equipSlot) {
                            this.equipItem(idx, equipSlot);
                        }
                    } else if (item.type === 'potion' || item.type === 'food') {
                        this.useItem(idx);
                    }
                }
            });
        });

        // Клики по ячейкам экипировки
        this.container.querySelectorAll('.equip-slot-box').forEach(slotBox => {
            slotBox.addEventListener('click', () => {
                const slotKey = slotBox.dataset.slot;
                sound.playSfx('tab');
                this.selectEquipSlot(slotKey);
            });

            // Двойной клик по надетой вещи: снять
            slotBox.addEventListener('dblclick', () => {
                const slotKey = slotBox.dataset.slot;
                if (this.player.equipment[slotKey]) {
                    this.unequipSlot(slotKey);
                }
            });
        });

        // Кнопки панели инспектора
        const btnEquip = this.container.querySelector('#btn-inspect-equip');
        if (btnEquip) {
            btnEquip.addEventListener('click', () => {
                if (this.selectedSource === 'inventory' && this.selectedIndex !== null) {
                    this.equipItem(this.selectedIndex);
                }
            });
        }

        const btnUse = this.container.querySelector('#btn-inspect-use');
        if (btnUse) {
            btnUse.addEventListener('click', () => {
                if (this.selectedSource === 'inventory' && this.selectedIndex !== null) {
                    this.useItem(this.selectedIndex);
                }
            });
        }

        const btnUnequip = this.container.querySelector('#btn-inspect-unequip');
        if (btnUnequip) {
            btnUnequip.addEventListener('click', () => {
                if (this.selectedSource === 'equipment' && this.selectedSlot !== null) {
                    this.unequipSlot(this.selectedSlot);
                }
            });
        }

        const btnDrop = this.container.querySelector('#btn-inspect-drop');
        if (btnDrop) {
            btnDrop.addEventListener('click', () => {
                if (this.selectedSource === 'inventory' && this.selectedIndex !== null) {
                    const item = this.player.inventory[this.selectedIndex];
                    if (confirm(`Вы действительно хотите выбросить «${item.name}»?`)) {
                        this.player.dropItem(this.selectedIndex);
                        sound.playSfx('click');
                        this.selectedItem = null;
                        this.selectedSource = null;
                        this.selectedIndex = null;
                        this.render(this.container);
                    }
                }
            });
        }

        // Распределение очков характеристик
        this.container.querySelectorAll('.btn-stat-plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const stat = btn.getAttribute('data-stat');
                const res = this.player.allocateStatPoint(stat);
                if (res && res.success) {
                    sound.playSfx('coin');
                    const ruNames = {
                        strength: 'Сила',
                        agility: 'Ловкость',
                        intelligence: 'Интеллект',
                        vitality: 'Живучесть'
                    };
                    this.showToast(`${Icons.spark(14)} ${ruNames[stat] || stat} повышена до ${res.newValue}!`);
                    this.render(this.container);
                }
            });
        });
    }

    initDragAndDrop() {
        let draggedPayload = null;

        // 1. Перетаскивание из ячеек инвентаря
        this.container.querySelectorAll('.inv-slot.item-filled').forEach(slot => {
            slot.setAttribute('draggable', 'true');

            slot.addEventListener('dragstart', (e) => {
                const idx = parseInt(slot.dataset.index, 10);
                const item = this.player.inventory[idx];
                if (!item) return;

                draggedPayload = { source: 'inventory', index: idx, item };
                e.dataTransfer.setData('text/plain', JSON.stringify({ source: 'inventory', index: idx }));
                e.dataTransfer.effectAllowed = 'move';
                slot.classList.add('dragging');

                // Подсветка подходящей ячейки снаряжения и куклы
                if (Player.isEquippable(item)) {
                    const targetSlot = item.slot || Player.inferSlot(item);
                    if (targetSlot) {
                        const targetBox = this.container.querySelector(`.equip-slot-box[data-slot="${targetSlot}"]`);
                        if (targetBox) targetBox.classList.add('drag-hint');
                        const dollBox = this.container.querySelector('.inv-paperdoll-box');
                        if (dollBox) dollBox.classList.add('drag-hint');
                    }
                }
            });

            slot.addEventListener('dragend', () => {
                draggedPayload = null;
                slot.classList.remove('dragging');
                this.container.querySelectorAll('.drag-hint, .drag-over').forEach(el => {
                    el.classList.remove('drag-hint', 'drag-over');
                });
            });

            // Инвентарь как цель для дропа (перемещение/своп или снятие с куклы)
            slot.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
            });

            slot.addEventListener('dragenter', (e) => {
                e.preventDefault();
                slot.classList.add('drag-over');
            });

            slot.addEventListener('dragleave', () => {
                slot.classList.remove('drag-over');
            });

            slot.addEventListener('drop', (e) => {
                e.preventDefault();
                slot.classList.remove('drag-over');
                const targetIdx = parseInt(slot.dataset.index, 10);

                if (!draggedPayload) {
                    try {
                        draggedPayload = JSON.parse(e.dataTransfer.getData('text/plain'));
                    } catch (err) {}
                }
                if (!draggedPayload) return;

                if (draggedPayload.source === 'equipment') {
                    // Снятие в рюкзак
                    this.unequipSlot(draggedPayload.slot);
                } else if (draggedPayload.source === 'inventory') {
                    // Перемещение внутри вещмешка
                    if (draggedPayload.index !== targetIdx) {
                        this.player.swapInventoryItems(draggedPayload.index, targetIdx);
                        sound.playSfx('tab');
                        this.selectInventoryItem(targetIdx);
                    }
                }
            });
        });

        // Пустые ячейки вещмешка как цель сброса
        this.container.querySelectorAll('.inv-slot.empty-slot').forEach(slot => {
            slot.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
            });
            slot.addEventListener('dragenter', (e) => {
                e.preventDefault();
                slot.classList.add('drag-over');
            });
            slot.addEventListener('dragleave', () => {
                slot.classList.remove('drag-over');
            });
            slot.addEventListener('drop', (e) => {
                e.preventDefault();
                slot.classList.remove('drag-over');
                const targetIdx = parseInt(slot.dataset.index, 10);

                if (!draggedPayload) {
                    try {
                        draggedPayload = JSON.parse(e.dataTransfer.getData('text/plain'));
                    } catch (err) {}
                }
                if (!draggedPayload) return;

                if (draggedPayload.source === 'equipment') {
                    this.unequipSlot(draggedPayload.slot);
                } else if (draggedPayload.source === 'inventory') {
                    this.player.swapInventoryItems(draggedPayload.index, targetIdx);
                    sound.playSfx('tab');
                    this.selectInventoryItem(Math.min(this.player.inventory.length - 1, targetIdx));
                }
            });
        });

        // 2. Перетаскивание из ячеек экипировки
        this.container.querySelectorAll('.equip-slot-box').forEach(slotBox => {
            const slotKey = slotBox.dataset.slot;
            const item = this.player.equipment[slotKey];

            if (item) {
                slotBox.setAttribute('draggable', 'true');

                slotBox.addEventListener('dragstart', (e) => {
                    draggedPayload = { source: 'equipment', slot: slotKey, item };
                    e.dataTransfer.setData('text/plain', JSON.stringify({ source: 'equipment', slot: slotKey }));
                    e.dataTransfer.effectAllowed = 'move';
                    slotBox.classList.add('dragging');

                    const bp = this.container.querySelector('.inv-backpack-section');
                    if (bp) bp.classList.add('drag-hint');
                });

                slotBox.addEventListener('dragend', () => {
                    draggedPayload = null;
                    slotBox.classList.remove('dragging');
                    this.container.querySelectorAll('.drag-hint, .drag-over').forEach(el => {
                        el.classList.remove('drag-hint', 'drag-over');
                    });
                });
            }

            // Ячейка экипировки как цель сброса (надевание предмета из инвентаря)
            slotBox.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
            });

            slotBox.addEventListener('dragenter', (e) => {
                e.preventDefault();
                slotBox.classList.add('drag-over');
            });

            slotBox.addEventListener('dragleave', () => {
                slotBox.classList.remove('drag-over');
            });

            slotBox.addEventListener('drop', (e) => {
                e.preventDefault();
                slotBox.classList.remove('drag-over');

                if (!draggedPayload) {
                    try {
                        draggedPayload = JSON.parse(e.dataTransfer.getData('text/plain'));
                    } catch (err) {}
                }
                if (!draggedPayload) return;

                if (draggedPayload.source === 'inventory') {
                    const item = this.player.inventory[draggedPayload.index];
                    if (!item) return;

                    if (!Player.isEquippable(item)) {
                        sound.playSfx('click');
                        this.showToast('Этот предмет нельзя поместить в ячейку снаряжения!');
                        return;
                    }

                    const naturalSlot = item.slot || Player.inferSlot(item);
                    if (naturalSlot === slotKey) {
                        this.equipItem(draggedPayload.index, slotKey);
                    } else {
                        sound.playSfx('click');
                        const slotRu = this.getSlotName(slotKey);
                        this.showToast(`Этот предмет не подходит в слот «${slotRu}»!`);
                    }
                }
            });
        });

        // 3. Цель сброса: Кукла персонажа (перетаскивание на фигуру героя экипирует предмет)
        const dollBox = this.container.querySelector('.inv-paperdoll-box');
        if (dollBox) {
            dollBox.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
            });

            dollBox.addEventListener('dragenter', (e) => {
                e.preventDefault();
                dollBox.classList.add('drag-over');
            });

            dollBox.addEventListener('dragleave', () => {
                dollBox.classList.remove('drag-over');
            });

            dollBox.addEventListener('drop', (e) => {
                e.preventDefault();
                dollBox.classList.remove('drag-over');

                if (!draggedPayload) {
                    try {
                        draggedPayload = JSON.parse(e.dataTransfer.getData('text/plain'));
                    } catch (err) {}
                }
                if (!draggedPayload) return;

                if (draggedPayload.source === 'inventory') {
                    const item = this.player.inventory[draggedPayload.index];
                    if (!item) return;

                    if (!Player.isEquippable(item)) {
                        sound.playSfx('click');
                        this.showToast('Этот предмет нельзя экипировать!');
                        return;
                    }

                    const targetSlot = item.slot || Player.inferSlot(item);
                    if (targetSlot) {
                        this.equipItem(draggedPayload.index, targetSlot);
                    }
                }
            });
        }
    }

    selectInventoryItem(index) {
        this.selectedSource = 'inventory';
        this.selectedIndex = index;
        this.selectedSlot = null;
        this.selectedItem = this.player.inventory[index] || null;
        this.render(this.container);
    }

    selectEquipSlot(slotKey) {
        this.selectedSource = 'equipment';
        this.selectedSlot = slotKey;
        this.selectedIndex = null;
        this.selectedItem = this.player.equipment[slotKey] || null;
        this.render(this.container);
    }

    equipItem(index, targetSlot = null) {
        const item = this.player.inventory[index];
        if (!item) return;

        if (!Player.isEquippable(item)) {
            sound.playSfx('click');
            this.showToast('Этот предмет нельзя экипировать!');
            return;
        }

        const naturalSlot = item.slot || Player.inferSlot(item);
        if (!naturalSlot) {
            sound.playSfx('click');
            this.showToast('У этого предмета нет подходящего слота!');
            return;
        }

        const slot = targetSlot || naturalSlot;
        if (slot !== naturalSlot) {
            sound.playSfx('click');
            this.showToast('Предмет не подходит для этой ячейки!');
            return;
        }

        sound.playSfx('selectHero');
        const success = this.player.equipItem(index, slot);
        if (success) {
            this.selectedSource = 'equipment';
            this.selectedSlot = slot;
            this.selectedIndex = null;
            this.selectedItem = this.player.equipment[slot];
            this.showToast(`Экипировано: ${this.selectedItem.name}`);
            this.render(this.container);
        }
    }

    unequipSlot(slotKey) {
        sound.playSfx('coin');
        const item = this.player.equipment[slotKey];
        const itemName = item ? item.name : 'Предмет';
        this.player.unequipSlot(slotKey);
        this.selectedSource = 'inventory';
        this.selectedIndex = this.player.inventory.length - 1;
        this.selectedSlot = null;
        this.selectedItem = this.player.inventory[this.selectedIndex] || null;
        this.showToast(`Снято в рюкзак: ${itemName}`);
        this.render(this.container);
    }

    useItem(index) {
        const res = this.player.useItem(index);
        if (res.success) {
            sound.playSfx('selectHero');
            this.showToast(res.msg);
            this.selectedItem = null;
            this.selectedSource = null;
            this.selectedIndex = null;
            this.render(this.container);
        } else {
            sound.playSfx('click');
            this.showToast(res.msg);
        }
    }

    showToast(message) {
        this.toastMessage = message;
        if (this.toastTimer) clearTimeout(this.toastTimer);

        const banner = this.container.querySelector('#save-toast');
        if (banner) {
            banner.innerHTML = message;
            banner.classList.add('visible');
        }

        this.toastTimer = setTimeout(() => {
            if (banner) banner.classList.remove('visible');
            this.toastMessage = null;
            this.toastTimer = null;
        }, 3000);
    }
}
