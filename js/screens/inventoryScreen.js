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
import { SkillVisuals } from '../visuals/skillVisuals.js';
import { GameDialog } from '../ui/gameDialog.js';
import { 
    SKILLS_DATABASE, 
    CLASS_SKILL_TREES, 
    getSkill, 
    getDeckSlotForCategory,
    getAvailableSkillPoints,
    getTotalSkillPointsEarned,
    isSkillUnlocked,
    canUnlockSkill
} from '../data/skillsData.js';

export class InventoryScreen {
    constructor(player, callbacks, initialTab = 'inventory') {
        this.player = player;
        this.callbacks = callbacks;
        this.currentTab = initialTab;
        this.selectedItem = null;
        this.selectedSource = null; // 'inventory' or 'equipment'
        this.selectedIndex = null;
        this.selectedSlot = null;
        this.selectedSkillId = null;
        this.toastMessage = null;
        this.toastTimer = null;
        this.isMusicStarted = false;

        // Состояние масштабирования и панорамирования древа навыков в стиле данжа
        this.treeZoom = 1.0;
        this.treePanX = 20;
        this.treePanY = 15;
        this.isTreeDragging = false;
        this.treeDragStartX = 0;
        this.treeDragStartY = 0;
        this.treeHasMoved = false;

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
        const availableSkillPoints = getAvailableSkillPoints(this.player);
        const rowCount = Math.max(2, Math.floor(this.player.inventory.length / 5) + 1);
        const totalSlots = rowCount * 5;

        let screenTitle = 'Инвентарь и снаряжение';
        if (this.currentTab === 'journal') screenTitle = 'Дневник заданий';
        else if (this.currentTab === 'skills') screenTitle = 'Древо навыков и способностей';

        container.innerHTML = `
            <div class="inv-screen">
                <!-- ВЕРХНЯЯ ШАПКА -->
                <div class="inv-top-bar">
                    <div class="inv-title-wrap">
                        <h2>${screenTitle}</h2>
                        <span class="inv-subtitle">${this.player.name} • ${this.player.className} (Ур. ${this.player.level || 1})</span>
                    </div>

                    <div class="inv-nav-tabs">
                        <button class="btn ${this.currentTab === 'inventory' ? 'btn-primary' : 'btn-secondary'} inv-tab-btn" id="btn-tab-inventory">
                            ${Icons.backpack(14)} <span>Снаряжение</span>
                        </button>
                        <button class="btn ${this.currentTab === 'skills' ? 'btn-primary' : 'btn-secondary'} inv-tab-btn inv-tab-btn-compact" id="btn-tab-skills">
                            ${Icons.spark(14)}
                            <span class="inv-tab-multiline">Древо<br>навыков</span>
                            ${availableSkillPoints > 0 ? `<span class="badge-tab-count badge-skill-pts">${availableSkillPoints}</span>` : ''}
                        </button>
                        <button class="btn ${this.currentTab === 'journal' ? 'btn-primary' : 'btn-secondary'} inv-tab-btn inv-tab-btn-compact" id="btn-tab-journal">
                            ${Icons.scroll(14)}
                            <span class="inv-tab-multiline">Дневник<br>заданий</span>
                            ${activeQuestsCount > 0 ? `<span class="badge-tab-count">${activeQuestsCount}</span>` : ''}
                        </button>
                    </div>

                    <button class="btn btn-secondary inv-btn-close" id="btn-close-inv" title="Вернуться в игру (I / Esc)" aria-label="Вернуться в игру">
                        ${Icons.arrowLeft(16)}
                    </button>
                </div>

                ${this.currentTab === 'journal' ? `
                    <!-- ЭКРАН ЖУРНАЛА ЗАДАНИЙ -->
                    <div class="inv-journal-stage">
                        ${QuestRenderer.renderJournalView(this.player)}
                    </div>
                ` : (this.currentTab === 'skills' ? `
                    <!-- ЭКРАН ДРЕВА НАВЫКОВ И БОЕВОЙ КОЛОДЫ -->
                    <div class="inv-skills-stage">
                        ${this.renderSkillsTreeStage()}
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
                `)}
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

        const btnTabSkills = this.container.querySelector('#btn-tab-skills');
        if (btnTabSkills) {
            btnTabSkills.addEventListener('click', () => {
                if (this.currentTab !== 'skills') {
                    sound.playSfx('tab');
                    this.currentTab = 'skills';
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
            btnExit.addEventListener('click', async () => {
                sound.playSfx('click');
                const conf = await GameDialog.confirm({
                    title: 'Главное меню',
                    message: 'Вернуться в главное меню? Несохраненный прогресс может быть потерян.',
                    icon: 'warning',
                    confirmText: 'В главное меню',
                    cancelText: 'Продолжить игру',
                    confirmVariant: 'danger'
                });
                if (conf) {
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
            btnDrop.addEventListener('click', async () => {
                if (this.selectedSource === 'inventory' && this.selectedIndex !== null) {
                    const item = this.player.inventory[this.selectedIndex];
                    if (!item) return;
                    const conf = await GameDialog.confirm({
                        title: 'Выбросить предмет',
                        message: `Вы действительно хотите выбросить «<strong>${item.name}</strong>» безвозвратно?`,
                        icon: 'trash',
                        confirmText: 'Выбросить',
                        cancelText: 'Оставить',
                        confirmVariant: 'danger'
                    });
                    if (conf) {
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

        if (this.currentTab === 'skills') {
            this.initSkillsEvents();
        }
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

    // =========================================================================
    // ВКЛАДКА: ДРЕВО НАВЫКОВ И БОЕВАЯ КОЛОДА СПОСОБНОСТЕЙ
    // =========================================================================

    renderSkillsTreeStage() {
        const classTree = CLASS_SKILL_TREES[this.player.classId] || CLASS_SKILL_TREES.warrior;
        const totalPts = getTotalSkillPointsEarned(this.player.level || 1);
        const spentPts = this.player.skills?.spentPoints || 0;
        const availablePts = Math.max(0, totalPts - spentPts);
        const deck = this.player.abilityDeck || {};

        // Если выбранный навык не принадлежит классу или не выбран, выберем первый
        if (!this.selectedSkillId || !getSkill(this.selectedSkillId) || getSkill(this.selectedSkillId).classId !== this.player.classId) {
            this.selectedSkillId = deck.slot1 || classTree.branches[0]?.skills[0] || null;
        }

        return `
            <div class="skills-tree-wrapper">
                <!-- ВЕРХНИЙ БАННЕР СТАТУСА И ОЧКОВ НАВЫКОВ -->
                <div class="skills-top-banner">
                    <div class="skills-banner-left">
                        <div class="skills-class-title">${Icons.spark(16)} ${classTree.title}</div>
                        <div class="skills-class-sub">${classTree.subtitle}</div>
                    </div>
                    <div class="skills-banner-center">
                        <div class="skills-points-badge">
                            <span class="skills-points-label">Очки навыков:</span>
                            <span class="skills-points-value ${availablePts > 0 ? 'has-points' : ''}">${availablePts}</span>
                        </div>
                        <div class="skills-points-rule">
                            +1 ОН каждые 2 уровня (всего за ${this.player.level || 1} ур.: <strong>${totalPts}</strong>, вложено: <strong>${spentPts}</strong>)
                        </div>
                    </div>
                    <div class="skills-banner-right">
                        <button class="btn btn-secondary btn-reset-tree" id="btn-reset-skills-tree" title="Сбросить все вложенные очки навыков и вернуть их">
                            ${Icons.spark(13)} Сбросить навыки
                        </button>
                    </div>
                </div>

                <!-- БЛОК ЭКИПИРОВАННОЙ КОЛОДЫ (3 КАСТОМИЗИРУЕМЫХ СЛОТА) -->
                <div class="ability-deck-card">
                    <div class="deck-header-row">
                        <div class="deck-title-wrap">
                            <span class="deck-main-title">${Icons.sword(14)} Боевая колода способностей (3 ячейки)</span>
                            <span class="deck-badge-customizable">3 настраиваемые ячейки</span>
                        </div>
                        <div class="deck-hint">
                            Эти способности используются в бою. Нажмите на изученный навык в древе, затем нажмите «В ячейку», чтобы экипировать его в колоду.
                        </div>
                    </div>
                    <div class="deck-slots-grid">
                        ${this.renderDeckSlotBox('slot1', 'Ячейка 1: Удар', 'strike', deck.slot1)}
                        ${this.renderDeckSlotBox('slot2', 'Ячейка 2: Сильнее удар', 'heavy', deck.slot2)}
                        ${this.renderDeckSlotBox('slot3', 'Ячейка 3: Финальный', 'finisher', deck.slot3)}
                    </div>
                </div>

                <!-- ИНТЕРАКТИВНОЕ ПОДЗЕМЕЛЬЕ НАВЫКОВ С ВЫДЕЛЕННОЙ ДОК-ПАНЕЛЬЮ (НИЧТО НЕ ПЕРЕКРЫВАЕТ ДРЕВО) -->
                <div class="skills-dungeon-container">
                    <!-- ЛЕВАЯ ЧАСТЬ: ПОЛНОСТЬЮ ОТКРЫТЫЙ ВЬЮПОРТ КАРТЫ ПОДЗЕМЕЛЬЯ -->
                    <div class="skills-dungeon-viewport" id="skills-dungeon-viewport">
                        <!-- Панель управления камерой подземелья -->
                        <div class="skills-viewport-controls">
                            <span class="skills-viewport-hint">🖱️ Зажмите ЛКМ для перемещения • Колесико: зум</span>
                            <div class="skills-zoom-btns">
                                <button class="btn btn-secondary btn-tree-zoom" id="btn-tree-zoom-in" title="Приблизить">+</button>
                                <span class="skills-zoom-label" id="skills-zoom-label">${Math.round(this.treeZoom * 100)}%</span>
                                <button class="btn btn-secondary btn-tree-zoom" id="btn-tree-zoom-out" title="Отдалить">−</button>
                                <button class="btn btn-secondary btn-tree-zoom" id="btn-tree-zoom-reset" title="Сбросить масштаб и вернуть в центр">⊙</button>
                            </div>
                        </div>

                        <!-- Масштабируемый и перемещаемый мир подземелья навыков -->
                        <div class="skills-dungeon-world" id="skills-dungeon-world" style="transform: translate(${this.treePanX}px, ${this.treePanY}px) scale(${this.treeZoom});">
                            <div class="skills-branches-chambers">
                                ${classTree.branches.map(branch => this.renderSkillBranch(branch)).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- ПРАВАЯ ЧАСТЬ: ВЫДЕЛЕННАЯ ДОК-ПАНЕЛЬ ИНСПЕКТОРА (НЕ МЕШАЕТ ОБЗОРУ) -->
                    <div class="skills-docked-inspector" id="skill-inspector-panel">
                        ${this.renderSkillInspector()}
                    </div>
                </div>
            </div>
        `;
    }

    renderDeckSlotBox(slotKey, label, category, equippedSkillId) {
        const skill = getSkill(equippedSkillId);
        const catLabels = { strike: 'Ячейка 1: УДАР', heavy: 'Ячейка 2: СИЛЬНЕЕ УДАР', finisher: 'Ячейка 3: ФИНАЛЬНЫЙ' };

        return `
            <div class="deck-slot-box ${skill ? 'equipped' : 'empty'}" data-deck-slot="${slotKey}" data-deck-category="${category}" title="Ячейка колоды. Перетащите сюда подходящий изученный навык из древа">
                <div class="deck-slot-header">
                    <span class="deck-slot-tag category-${category}">${catLabels[category] || category}</span>
                    <span class="deck-active-dot" title="Активно в бою">В бою</span>
                </div>
                <div class="deck-slot-body">
                    <div class="deck-slot-icon" style="border-color: ${skill?.iconColor || '#ca8a04'}">
                        ${this.renderSkillIconSvg(skill ? skill.icon : 'sword', 28, skill?.iconColor, skill?.id)}
                    </div>
                    <div class="deck-slot-info">
                        <div class="deck-slot-name">${skill ? skill.name : 'Не экипировано'}</div>
                        <div class="deck-slot-meta">
                            ${this.renderSkillShortCost(skill)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderSkillBranch(branch) {
        const slotBadges = {
            slot1: 'Ячейка 1 (Удар)',
            slot2: 'Ячейка 2 (Сильнее удар)',
            slot3: 'Ячейка 3 (Финальный)',
            null: 'Пассивные'
        };

        return `
            <div class="skill-branch-col branch-${branch.category}">
                <div class="branch-header">
                    <div class="branch-title-row">
                        <span class="branch-title">${branch.title}</span>
                    </div>
                    <div class="branch-sub-row">
                        <span class="branch-slot-pill pill-${branch.category}">${slotBadges[branch.slot] || 'Пассивная'}</span>
                        <span class="branch-count">${branch.skills.length} навыков</span>
                    </div>
                    <div class="branch-desc">${branch.desc}</div>
                </div>
                <div class="branch-nodes-list">
                    ${branch.skills.map((skillId, idx) => this.renderSkillNode(skillId, branch, idx)).join('')}
                </div>
            </div>
        `;
    }

    renderSkillNode(skillId, branch, nodeIdx) {
        const skill = getSkill(skillId);
        if (!skill) return '';

        const isEquipped = branch.slot && this.player.abilityDeck && this.player.abilityDeck[branch.slot] === skillId;
        const isUnlocked = isSkillUnlocked(this.player, skillId);
        const unlockCheck = canUnlockSkill(this.player, skillId);
        const canUnlock = unlockCheck.can;
        const isSelected = this.selectedSkillId === skillId;
        const isEquippableInDeck = isUnlocked && ['strike', 'heavy', 'finisher'].includes(skill.category);

        let statusClass = 'locked';
        let statusText = 'Закрыто';

        if (isEquipped) {
            statusClass = 'equipped';
            statusText = 'В колоде';
        } else if (isUnlocked) {
            statusClass = 'unlocked';
            statusText = 'Изучено';
        } else if (canUnlock) {
            statusClass = 'learnable';
            statusText = 'Доступно';
        }

        const dragHintText = isEquippableInDeck ? ' • Зажмите и перетащите в ячейку колоды' : '';

        return `
            <div class="skill-node-card ${statusClass} ${isSelected ? 'selected' : ''} ${isEquippableInDeck ? 'skill-draggable' : ''}" 
                 data-skill-id="${skill.id}"
                 data-can-unlock="${canUnlock ? 'true' : 'false'}"
                 data-is-unlocked="${isUnlocked ? 'true' : 'false'}"
                 data-category="${skill.category}"
                 draggable="${isEquippableInDeck ? 'true' : 'false'}"
                 title="${skill.name} (${statusText})${dragHintText}">
                ${nodeIdx > 0 ? '<div class="skill-connector-line"></div>' : ''}
                ${canUnlock ? '<div class="node-hold-progress-bar"><div class="node-hold-progress-fill"></div></div>' : ''}
                <div class="node-main-row">
                    <div class="node-icon-box" style="border-color: ${skill.iconColor || '#64748b'}; position: relative;">
                        ${this.renderSkillIconSvg(skill.icon, 24, skill.iconColor, skill.id)}
                        ${canUnlock ? `
                            <svg class="node-hold-circle-svg" viewBox="0 0 36 36">
                                <path class="node-hold-circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                <path class="node-hold-circle-fill" stroke-dasharray="100, 100" stroke-dashoffset="100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                            </svg>
                        ` : ''}
                    </div>
                    <div class="node-text-col">
                        <div class="node-name-row">
                            <span class="node-name">${skill.name}</span>
                        </div>
                        <div class="node-cost-row">
                            <span class="node-tier">Ранг ${skill.tier || 1}</span>
                            <span class="node-cost-badge">${this.renderSkillShortCost(skill)}</span>
                        </div>
                    </div>
                    <div class="node-status-col">
                        ${canUnlock ? '<span class="node-hold-hint">Зажмите</span>' : ''}
                        ${isEquippableInDeck && !isEquipped ? '<span class="node-drag-hint-badge" title="Зажмите и перетащите в ячейку колоды">Перетащить</span>' : ''}
                        <span class="node-status-badge status-${statusClass}">${statusText}</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderSkillInspector() {
        const skill = getSkill(this.selectedSkillId);
        if (!skill) {
            return `
                <div class="skill-inspector-empty">
                    ${Icons.spark(32)}
                    <div class="inspector-empty-title">Выберите навык в древе</div>
                    <div class="inspector-empty-sub">Нажмите на любой узел умения в подземелье, чтобы изучить его или экипировать в колоду.</div>
                </div>
            `;
        }

        const isUnlocked = isSkillUnlocked(this.player, skill.id);
        const unlockCheck = canUnlockSkill(this.player, skill.id);
        const slotKey = getDeckSlotForCategory(skill.category);
        const isEquipped = slotKey && this.player.abilityDeck && this.player.abilityDeck[slotKey] === skill.id;

        const catTitles = {
            strike: 'Базовый удар (Ячейка 1)',
            heavy: 'Сильнее удар (Ячейка 2)',
            finisher: 'Финальный прием (Ячейка 3)',
            passive: 'Пассивный талант'
        };

        const properties = [];
        if (skill.damageMultiplier) {
            properties.push({ label: 'Урон способности', val: `${Math.round(skill.damageMultiplier * 100)}% от ${skill.isMagic ? 'маг.' : 'физ.'} урона`, icon: Icons.sword(12) });
        }
        if (skill.costRage) properties.push({ label: 'Расход ярости', val: `${skill.costRage} Ярости`, icon: Icons.fire(12) });
        if (skill.rageGain) properties.push({ label: 'Накопление ярости', val: `+${skill.rageGain} Ярости`, icon: Icons.fire(12) });
        if (skill.costEnergy) properties.push({ label: 'Расход энергии', val: `${skill.costEnergy} Энергии`, icon: Icons.lightning(12) });
        if (skill.comboGain) properties.push({ label: 'Накопление комбо', val: `+${skill.comboGain} очко серии`, icon: Icons.lightning(12) });
        if (skill.costComboAll) properties.push({ label: 'Расход серии', val: `Все накопленные комбо-очки`, icon: Icons.blood(12) });
        if (skill.costMp) properties.push({ label: 'Расход маны', val: `${skill.costMp} MP`, icon: Icons.spark(12) });
        if (skill.manaGain) properties.push({ label: 'Восстановление маны', val: `+${skill.manaGain} MP`, icon: Icons.spark(12) });
        if (skill.costFocus) properties.push({ label: 'Расход концентрации', val: `${skill.costFocus} Концентрации`, icon: Icons.target(12) });
        if (skill.focusGain) properties.push({ label: 'Накопление конц.', val: `+${skill.focusGain} Концентрации`, icon: Icons.target(12) });
        if (skill.stunChance) properties.push({ label: 'Шанс оглушения', val: `${Math.round(skill.stunChance * 100)}% (враг теряет ход)`, icon: Icons.hourglass(12) });
        if (skill.bleedTurns) properties.push({ label: 'Кровотечение', val: `${skill.bleedTurns} хода периодического урона`, icon: Icons.blood(12) });
        if (skill.poisonTurns) properties.push({ label: 'Отравление', val: `${skill.poisonTurns} хода яда`, icon: Icons.poison(12) });
        if (skill.burnTurns) properties.push({ label: 'Ожог / Горение', val: `${skill.burnTurns} хода огненного урона`, icon: Icons.fire(12) });
        if (skill.armorIgnore) properties.push({ label: 'Пробитие защиты', val: `Игнорирует ${Math.round(skill.armorIgnore * 100)}% брони цели`, icon: Icons.shield(12) });
        if (skill.bonusCrit) properties.push({ label: 'Бонус крита', val: `+${skill.bonusCrit}% к шансу критического удара`, icon: Icons.target(12) });
        if (skill.guaranteedCrit) properties.push({ label: 'Особый эффект', val: `100% критический удар`, icon: Icons.target(12) });
        if (skill.executeThreshold) properties.push({ label: 'Казнь', val: `Смертельный крит при < ${Math.round(skill.executeThreshold * 100)}% HP врага`, icon: Icons.skull(12) });
        if (skill.leechPercent) properties.push({ label: 'Вампиризм', val: `Исцеляет на ${Math.round(skill.leechPercent * 100)}% от нанесенного урона`, icon: Icons.heart(12) });

        if (skill.bonuses) {
            const b = skill.bonuses;
            if (b.physicalDamage) properties.push({ label: 'Физ. урон', val: `+${b.physicalDamage}`, icon: Icons.sword(12) });
            if (b.magicDamage) properties.push({ label: 'Маг. урон', val: `+${b.magicDamage}`, icon: Icons.spark(12) });
            if (b.defense) properties.push({ label: 'Защита', val: `+${b.defense}`, icon: Icons.shield(12) });
            if (b.critChance) properties.push({ label: 'Шанс крита', val: `+${b.critChance}%`, icon: Icons.target(12) });
            if (b.dodgeChance) properties.push({ label: 'Уклонение', val: `+${b.dodgeChance}%`, icon: Icons.boots(12) });
            if (b.maxHp) properties.push({ label: 'Макс. HP', val: `+${b.maxHp}`, icon: Icons.heart(12) });
            if (b.maxMp) properties.push({ label: 'Макс. MP', val: `+${b.maxMp}`, icon: Icons.spark(12) });
        }

        let actionButtonHtml = '';
        if (isEquipped) {
            actionButtonHtml = `
                <button class="btn btn-secondary btn-inspect-act" disabled>
                    ${Icons.check(14)} Экипировано в бою
                </button>
            `;
        } else if (isUnlocked && ['strike', 'heavy', 'finisher'].includes(skill.category)) {
            const slotNames = { strike: 'Ячейка 1 (Удар)', heavy: 'Ячейка 2 (Сильнее удар)', finisher: 'Ячейка 3 (Финальный)' };
            actionButtonHtml = `
                <button class="btn btn-primary btn-inspect-act btn-equip-skill-action" data-skill-id="${skill.id}">
                    ${Icons.sword(14)} Экипировать в ${slotNames[skill.category]}
                </button>
            `;
        } else if (isUnlocked && skill.category === 'passive') {
            actionButtonHtml = `
                <div class="passive-active-notice">
                    ${Icons.check(14)} Пассивный талант постоянно активен
                </div>
            `;
        } else if (unlockCheck.can) {
            actionButtonHtml = `
                <button class="btn btn-primary btn-inspect-act btn-unlock-skill-action hold-to-unlock-btn" data-skill-id="${skill.id}" title="Зажмите кнопку на ~0.8 сек для изучения">
                    <div class="btn-hold-fill"></div>
                    <span class="btn-hold-label">${Icons.spark(14)} Зажмите для изучения (${skill.cost || 1} ОН)</span>
                </button>
            `;
        } else {
            actionButtonHtml = `
                <div class="skill-locked-notice">
                    ${Icons.hourglass(14)} ${unlockCheck.reason}
                </div>
            `;
        }

        return `
            <div class="inspect-header-row">
                <div class="inspect-icon-frame skill-frame" style="border-color: ${skill.iconColor || '#ca8a04'}">
                    ${this.renderSkillIconSvg(skill.icon, 38, skill.iconColor, skill.id)}
                </div>
                <div class="inspect-title-meta">
                    <div class="inspect-item-name">${skill.name}</div>
                    <div class="inspect-meta-badges">
                        <span class="inspect-item-type">${catTitles[skill.category] || skill.category}</span>
                        <span class="inspect-item-rarity-badge">Ранг ${skill.tier || 1}</span>
                    </div>
                </div>
            </div>

            <div class="inspect-desc-text">
                ${skill.desc}
            </div>

            <div class="inspect-stats-list">
                ${properties.map(p => `
                    <div class="inspect-stat-entry">
                        <span>${p.icon} ${p.label}:</span>
                        <strong>${p.val}</strong>
                    </div>
                `).join('')}
            </div>

            <div class="inspect-buttons-row">
                ${actionButtonHtml}
            </div>
        `;
    }

    renderSkillShortCost(skill) {
        if (!skill) return '';
        if (skill.category === 'passive') return '<span class="cost-passive">Пассивный</span>';

        const parts = [];
        if (skill.damageMultiplier) {
            parts.push(`${Math.round(skill.damageMultiplier * 100)}% ур.`);
        }
        if (skill.costRage) parts.push(`${skill.costRage} Яр.`);
        if (skill.rageGain) parts.push(`+${skill.rageGain} Яр.`);
        if (skill.costEnergy) parts.push(`${skill.costEnergy} Эн.`);
        if (skill.comboGain) parts.push(`+${skill.comboGain} комбо`);
        if (skill.costComboAll) parts.push('Все комбо');
        if (skill.costMp) parts.push(`${skill.costMp} MP`);
        if (skill.manaGain) parts.push(`+${skill.manaGain} MP`);
        if (skill.costFocus) parts.push(`${skill.costFocus} Конц.`);
        if (skill.focusGain) parts.push(`+${skill.focusGain} Конц.`);

        return parts.join(' • ');
    }

    renderSkillIconSvg(iconName, size = 20, color = null, skillId = null) {
        if (skillId) {
            return SkillVisuals.getSkillIcon(skillId, size, color);
        }
        if (SkillVisuals.ICONS[iconName]) {
            return SkillVisuals.getSkillIcon(iconName, size, color);
        }
        const c = color || '#ca8a04';
        switch (iconName) {
            case 'sword': return Icons.sword(size);
            case 'shield': return Icons.shield(size);
            case 'armor': return Icons.armor(size);
            case 'target': return Icons.target(size);
            case 'spark': return Icons.spark(size);
            case 'heart': return Icons.heart(size);
            default: return Icons.spark(size);
        }
    }

    updateTreeTransform(worldEl = null, labelEl = null) {
        const world = worldEl || this.container.querySelector('#skills-dungeon-world');
        if (world) {
            world.style.transform = `translate(${this.treePanX}px, ${this.treePanY}px) scale(${this.treeZoom})`;
        }
        const label = labelEl || this.container.querySelector('#skills-zoom-label');
        if (label) {
            label.textContent = `${Math.round(this.treeZoom * 100)}%`;
        }
    }

    initSkillsEvents() {
        const viewport = this.container.querySelector('#skills-dungeon-viewport');
        const world = this.container.querySelector('#skills-dungeon-world');
        const zoomLabel = this.container.querySelector('#skills-zoom-label');

        // ================= ПАНОРАМИРОВАНИЕ И ЗУМ ПОДЗЕМЕЛЬЯ (СВЕРХПЛАВНЫЙ БЕЗ ЛАГОВ) =================
        if (viewport && world) {
            // Захват перетаскивания карты (Pan)
            viewport.addEventListener('mousedown', (e) => {
                // Если клик по кнопке, контролам, карточке навыка или ячейке колоды — не перемещаем карту
                if (e.target.closest('button') || 
                    e.target.closest('.skills-viewport-controls') || 
                    e.target.closest('.skill-node-card') || 
                    e.target.closest('.deck-slot-box')) {
                    return;
                }
                this.isTreeDragging = true;
                this.treeHasMoved = false;
                this.treeDragStartX = e.clientX - this.treePanX;
                this.treeDragStartY = e.clientY - this.treePanY;
                viewport.style.cursor = 'grabbing';
                world.style.transition = 'none';

                // Слушатели перемещения вешаются СТРОГО на время зажатой мыши и удаляются на mouseup
                const onDragMove = (moveEvent) => {
                    if (!this.isTreeDragging) return;
                    const newX = moveEvent.clientX - this.treeDragStartX;
                    const newY = moveEvent.clientY - this.treeDragStartY;
                    if (Math.abs(newX - this.treePanX) > 3 || Math.abs(newY - this.treePanY) > 3) {
                        this.treeHasMoved = true;
                    }
                    this.treePanX = newX;
                    this.treePanY = newY;

                    if (!this._treeRafId) {
                        this._treeRafId = requestAnimationFrame(() => {
                            world.style.transform = `translate(${this.treePanX}px, ${this.treePanY}px) scale(${this.treeZoom})`;
                            this._treeRafId = null;
                        });
                    }
                };

                const onDragUp = () => {
                    this.isTreeDragging = false;
                    viewport.style.cursor = 'grab';
                    window.removeEventListener('mousemove', onDragMove);
                    window.removeEventListener('mouseup', onDragUp);
                };

                window.addEventListener('mousemove', onDragMove, { passive: true });
                window.addEventListener('mouseup', onDragUp, { once: true });
            });

            // Масштабирование колесиком мыши (Zoom к точке курсора)
            viewport.addEventListener('wheel', (e) => {
                e.preventDefault();
                const rect = viewport.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                const delta = e.deltaY < 0 ? 0.12 : -0.12;
                const newZoom = Math.max(0.6, Math.min(1.6, this.treeZoom + delta));

                if (newZoom !== this.treeZoom) {
                    const worldX = (mouseX - this.treePanX) / this.treeZoom;
                    const worldY = (mouseY - this.treePanY) / this.treeZoom;
                    this.treeZoom = newZoom;
                    this.treePanX = mouseX - worldX * newZoom;
                    this.treePanY = mouseY - worldY * newZoom;
                    world.style.transition = 'none';
                    this.updateTreeTransform(world, zoomLabel);
                }
            }, { passive: false });

            // Кнопки зума
            const btnZoomIn = this.container.querySelector('#btn-tree-zoom-in');
            const btnZoomOut = this.container.querySelector('#btn-tree-zoom-out');
            const btnZoomReset = this.container.querySelector('#btn-tree-zoom-reset');

            if (btnZoomIn) {
                btnZoomIn.addEventListener('click', () => {
                    sound.playSfx('click');
                    this.treeZoom = Math.min(1.6, this.treeZoom + 0.15);
                    this.updateTreeTransform(world, zoomLabel);
                });
            }

            if (btnZoomOut) {
                btnZoomOut.addEventListener('click', () => {
                    sound.playSfx('click');
                    this.treeZoom = Math.max(0.6, this.treeZoom - 0.15);
                    this.updateTreeTransform(world, zoomLabel);
                });
            }

            if (btnZoomReset) {
                btnZoomReset.addEventListener('click', () => {
                    sound.playSfx('click');
                    this.treeZoom = 1.0;
                    this.treePanX = 20;
                    this.treePanY = 15;
                    this.updateTreeTransform(world, zoomLabel);
                });
            }
        }

        // Выбор узлов древа навыков и Hold-to-Unlock для неизученных
        this.setupSkillNodesHoldAndSelect();

        // Drag-and-drop перетаскивание открытых навыков в ячейки колоды
        this.setupSkillsDragAndDrop();

        // Клик по ячейке экипированной колоды (выбор навыка)
        this.container.querySelectorAll('.deck-slot-box').forEach(box => {
            box.addEventListener('click', () => {
                const slotKey = box.getAttribute('data-deck-slot');
                const skillId = this.player.abilityDeck ? this.player.abilityDeck[slotKey] : null;
                if (skillId) {
                    this.selectSkillNode(skillId);
                }
            });
        });

        // Кнопка сброса навыков
        const btnReset = this.container.querySelector('#btn-reset-skills-tree');
        if (btnReset) {
            btnReset.addEventListener('click', async () => {
                sound.playSfx('click');
                const conf = await GameDialog.confirm({
                    title: 'Сброс древа навыков',
                    message: 'Сбросить все вложенные очки способностей и вернуть их персонажу?',
                    icon: 'spark',
                    confirmText: 'Сбросить навыки',
                    cancelText: 'Отмена',
                    confirmVariant: 'warning'
                });
                if (conf) {
                    const res = this.player.resetSkills();
                    sound.playSfx('potion');
                    this.showToast(`${Icons.spark(14)} Навыки сброшены! Свободно очков: ${res.availablePoints}`);
                    this.render(this.container);
                }
            });
        }

        this.bindSkillInspectorActions();
    }

    selectSkillNode(skillId) {
        if (!skillId) return;
        sound.playSfx('tab');
        this.selectedSkillId = skillId;
        this.container.querySelectorAll('.skill-node-card').forEach(n => {
            if (n.getAttribute('data-skill-id') === skillId) {
                n.classList.add('selected');
            } else {
                n.classList.remove('selected');
            }
        });

        const inspector = this.container.querySelector('#skill-inspector-panel');
        if (inspector) {
            inspector.innerHTML = this.renderSkillInspector();
            this.bindSkillInspectorActions();
        }
    }

    bindSkillInspectorActions() {
        // Кнопка изучения навыка с механикой удержания
        const btnUnlock = this.container.querySelector('.btn-unlock-skill-action');
        if (btnUnlock) {
            this.setupHoldToUnlockElement(btnUnlock, btnUnlock.getAttribute('data-skill-id'), {
                isButton: true,
                onSuccess: (res) => {
                    sound.playSfx('selectHero');
                    this.showToast(`${Icons.check(14)} Изучен навык «${res.skill.name}»! Очков осталось: ${res.remainingPoints}`);
                    this.render(this.container);
                },
                onQuickClick: () => {
                    this.showToast('Зажмите кнопку на ~0.8 сек, чтобы изучить навык!');
                }
            });
        }

        // Кнопка экипировки в колоду
        const btnEquip = this.container.querySelector('.btn-equip-skill-action');
        if (btnEquip) {
            btnEquip.addEventListener('click', () => {
                const skillId = btnEquip.getAttribute('data-skill-id');
                const skill = getSkill(skillId);
                if (!skill) return;

                const slotKey = getDeckSlotForCategory(skill.category);
                if (!slotKey) {
                    this.showToast('Этот навык нельзя поместить в колоду!');
                    return;
                }

                const res = this.player.equipAbilityToDeck(slotKey, skillId);
                if (res.success) {
                    sound.playSfx('coin');
                    const slotNames = { slot1: 'Ячейка 1 (Удар)', slot2: 'Ячейка 2 (Сильнее удар)', slot3: 'Ячейка 3 (Финальный)' };
                    this.showToast(`${Icons.sword(14)} Навык «${res.skill.name}» помещен в ${slotNames[slotKey]}!`);
                    this.render(this.container);
                } else {
                    sound.playSfx('click');
                    this.showToast(res.reason || 'Не удалось экипировать');
                }
            });
        }
    }

    setupSkillNodesHoldAndSelect() {
        this.container.querySelectorAll('.skill-node-card').forEach(node => {
            const skillId = node.getAttribute('data-skill-id');
            const canUnlock = node.getAttribute('data-can-unlock') === 'true';
            const isUnlocked = node.getAttribute('data-is-unlocked') === 'true';

            // 1. Прямой клик для мгновенного и надежного выбора навыка
            node.addEventListener('click', (e) => {
                if (this._justCompletedSkillDrag) return;
                this.selectSkillNode(skillId);
            });

            // 2. Механика удержания (Hold-to-Unlock) только для доступных неизученных (или заблокированных) навыков
            if (!isUnlocked) {
                this.setupHoldToUnlockElement(node, skillId, {
                    isButton: false,
                    canUnlock: canUnlock,
                    onSuccess: (res) => {
                        sound.playSfx('selectHero');
                        this.showToast(`${Icons.check(14)} Изучен навык «${res.skill.name}»! Очков осталось: ${res.remainingPoints}`);
                        this.selectedSkillId = skillId;
                        this.render(this.container);
                    },
                    onQuickClick: () => {
                        this.selectSkillNode(skillId);
                    },
                    onLockedHold: () => {
                        const check = canUnlockSkill(this.player, skillId);
                        node.classList.add('skill-shake-anim');
                        setTimeout(() => node.classList.remove('skill-shake-anim'), 400);
                        sound.playSfx('click');
                        this.showToast(check.reason || 'Этот навык пока нельзя изучить');
                    }
                });
            }
        });
    }

    setupSkillsDragAndDrop() {
        let draggedSkillPayload = null;

        // 1. Перетаскивание открытых активных способностей из древа навыков
        this.container.querySelectorAll('.skill-node-card[draggable="true"]').forEach(card => {
            const skillId = card.getAttribute('data-skill-id');
            const skill = getSkill(skillId);
            if (!skill) return;

            card.addEventListener('dragstart', (e) => {
                this._justCompletedSkillDrag = true;
                this._draggedSkillId = skillId;
                draggedSkillPayload = { source: 'skill', skillId, category: skill.category };

                e.dataTransfer.setData('text/plain', JSON.stringify(draggedSkillPayload));
                e.dataTransfer.effectAllowed = 'move';
                card.classList.add('dragging');

                // Подсвечиваем подходящую ячейку колоды
                const targetSlot = getDeckSlotForCategory(skill.category);
                if (targetSlot) {
                    const targetBox = this.container.querySelector(`.deck-slot-box[data-deck-slot="${targetSlot}"]`);
                    if (targetBox) targetBox.classList.add('drag-hint');
                }
                const deckCard = this.container.querySelector('.ability-deck-card');
                if (deckCard) deckCard.classList.add('drag-hint');
            });

            card.addEventListener('dragend', () => {
                draggedSkillPayload = null;
                this._draggedSkillId = null;
                card.classList.remove('dragging');
                this.container.querySelectorAll('.drag-hint, .drag-over').forEach(el => {
                    el.classList.remove('drag-hint', 'drag-over');
                });
                setTimeout(() => {
                    this._justCompletedSkillDrag = false;
                }, 120);
            });
        });

        // Функция применения экипировки при сбросе
        const handleSkillDrop = (targetSlotKey, e) => {
            e.preventDefault();
            e.stopPropagation();

            this.container.querySelectorAll('.drag-hint, .drag-over').forEach(el => {
                el.classList.remove('drag-hint', 'drag-over');
            });

            let payload = draggedSkillPayload;
            if (!payload) {
                try {
                    payload = JSON.parse(e.dataTransfer.getData('text/plain'));
                } catch (err) {}
            }
            const skillId = payload?.skillId || this._draggedSkillId;
            if (!skillId) return;

            const skill = getSkill(skillId);
            if (!skill) return;

            const properSlotKey = getDeckSlotForCategory(skill.category);
            if (!properSlotKey) {
                sound.playSfx('click');
                this.showToast('Этот навык нельзя экипировать в боевую колоду!');
                return;
            }

            // Если навык брошен на определенную ячейку того же типа, либо на колоду вообще
            const slotToUse = (targetSlotKey && targetSlotKey === properSlotKey) ? targetSlotKey : properSlotKey;

            const res = this.player.equipAbilityToDeck(slotToUse, skillId);
            if (res.success) {
                sound.playSfx('coin');
                const slotNames = { slot1: 'Ячейку 1 (Удар)', slot2: 'Ячейку 2 (Сильнее удар)', slot3: 'Ячейку 3 (Финальный)' };
                this.showToast(`${Icons.sword(14)} Навык «${res.skill.name}» помещен в ${slotNames[slotToUse]}!`);
                this.selectedSkillId = skillId;
                this.render(this.container);
            } else {
                sound.playSfx('click');
                this.showToast(res.reason || 'Не удалось экипировать');
            }
        };

        // 2. Ячейки колоды как цели для сброса
        this.container.querySelectorAll('.deck-slot-box').forEach(box => {
            const slotKey = box.getAttribute('data-deck-slot');

            box.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
            });

            box.addEventListener('dragenter', (e) => {
                e.preventDefault();
                box.classList.add('drag-over');
            });

            box.addEventListener('dragleave', () => {
                box.classList.remove('drag-over');
            });

            box.addEventListener('drop', (e) => {
                handleSkillDrop(slotKey, e);
            });
        });

        // 3. Вся панель колоды способностей как общая цель для сброса
        const deckCard = this.container.querySelector('.ability-deck-card');
        if (deckCard) {
            deckCard.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
            });
            deckCard.addEventListener('drop', (e) => {
                handleSkillDrop(null, e);
            });
        }
    }

    setupHoldToUnlockElement(element, skillId, opts = {}) {
        let holdTimer = null;
        let holdAnimFrame = null;
        let startTime = 0;
        const HOLD_DURATION = 750; // мс для заполнения
        let startX = 0;
        let startY = 0;
        let isHolding = false;

        const progressFill = opts.isButton
            ? element.querySelector('.btn-hold-fill')
            : element.querySelector('.node-hold-progress-fill');
        const circleFill = !opts.isButton ? element.querySelector('.node-hold-circle-fill') : null;

        const resetHold = () => {
            if (holdTimer) {
                clearTimeout(holdTimer);
                holdTimer = null;
            }
            if (holdAnimFrame) {
                cancelAnimationFrame(holdAnimFrame);
                holdAnimFrame = null;
            }
            isHolding = false;
            element.classList.remove('is-charging');
            if (progressFill) progressFill.style.width = '0%';
            if (circleFill) circleFill.style.strokeDashoffset = '100';
        };

        const updateHoldAnim = () => {
            if (!isHolding) return;
            const elapsed = Date.now() - startTime;
            const progress = Math.min(1, elapsed / HOLD_DURATION);

            if (progressFill) progressFill.style.width = `${progress * 100}%`;
            if (circleFill) circleFill.style.strokeDashoffset = `${100 - progress * 100}`;

            if (progress < 1) {
                holdAnimFrame = requestAnimationFrame(updateHoldAnim);
            }
        };

        const startHold = (e) => {
            // Если перемещаем все полотно данжа — игнорируем
            if (this.isTreeDragging || this.treeHasMoved) return;

            startX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
            startY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

            // Проверяем возможность покупки
            const unlockCheck = canUnlockSkill(this.player, skillId);
            const isUnlocked = isSkillUnlocked(this.player, skillId);

            if (isUnlocked) {
                // Если навык уже изучен — отслеживаем только для короткого клика
                startTime = Date.now();
                isHolding = true;
                return;
            }

            if (!unlockCheck.can) {
                // Если навык заблокирован
                startTime = Date.now();
                isHolding = true;
                holdTimer = setTimeout(() => {
                    if (isHolding && opts.onLockedHold) {
                        opts.onLockedHold();
                    }
                    resetHold();
                }, 350);
                return;
            }

            isHolding = true;
            startTime = Date.now();
            element.classList.add('is-charging');

            holdAnimFrame = requestAnimationFrame(updateHoldAnim);

            holdTimer = setTimeout(() => {
                if (!isHolding) return;
                resetHold();
                const res = this.player.unlockSkill(skillId);
                if (res.success && opts.onSuccess) {
                    opts.onSuccess(res);
                } else if (!res.success) {
                    sound.playSfx('click');
                    this.showToast(res.reason || 'Не удалось изучить');
                }
            }, HOLD_DURATION);
        };

        const endHold = (e) => {
            if (!isHolding) return;
            const elapsed = Date.now() - startTime;
            const currentX = e.clientX || (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : startX);
            const currentY = e.clientY || (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientY : startY);
            const dist = Math.hypot(currentX - startX, currentY - startY);

            resetHold();

            // Если это был короткий клик без существенного сдвига
            if (elapsed < 300 && dist < 12 && !this.treeHasMoved) {
                if (opts.onQuickClick) {
                    opts.onQuickClick();
                }
            }
        };

        element.addEventListener('pointerdown', (e) => {
            if (e.button !== 0) return; // только левая кнопка мыши
            startHold(e);
        });

        element.addEventListener('pointerup', endHold);
        element.addEventListener('pointercancel', resetHold);
        element.addEventListener('pointerleave', resetHold);
    }

}

