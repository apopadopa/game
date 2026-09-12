export class Player {
    constructor(config) {
        this.name = config.name || 'Безымянный';
        this.gender = config.gender || 'male';
        this.classId = config.classId || 'warrior';
        this.className = config.className || 'Воин';
        this.origin = config.origin || { id: 'noble', name: 'Опальный дворянин', bonusGold: 40 };
        this.trait = config.trait || { id: 'thick_skin', name: 'Толстокожий' };
        this.visuals = config.visuals;

        this.attributes = {
            strength: config.attributes?.strength || 5,
            agility: config.attributes?.agility || 5,
            intelligence: config.attributes?.intelligence || 5,
            vitality: config.attributes?.vitality || 5
        };

        this.level = config.level || 1;
        this.exp = config.exp || 0;
        this.statPoints = config.statPoints !== undefined ? config.statPoints : 0;
        this.gold = config.gold !== undefined ? config.gold : (this.origin.bonusGold || 40);

        this.smithBonuses = config.smithBonuses || {
            physicalDamage: 0,
            defense: 0,
            critChance: 0
        };

        this.equipment = config.equipment || {
            head: null,
            torso: { id: 'starter_tunic', name: 'Холщовая рубаха', slot: 'torso', type: 'armor', defense: 2, desc: 'Простая одежда искателя приключений' },
            legs: { id: 'starter_pants', name: 'Походные штаны', slot: 'legs', type: 'armor', defense: 1, desc: 'Плотные штаны из грубой ткани' },
            boots: { id: 'starter_boots', name: 'Кожаные сапоги', slot: 'boots', type: 'armor', defense: 1, desc: 'Удобная обувь для дальних переходов' },
            mainHand: { id: 'starter_weapon', name: this.getStarterWeaponName(this.classId), slot: 'mainHand', type: 'weapon', physicalDamage: 3, desc: 'Надежное базовое оружие' },
            offHand: null,
            accessory: null
        };

        this.inventory = config.inventory || [
            { id: 'starter_shield', name: 'Окованный баклер', desc: 'Легкий щит (+2 к защите)', price: 25, slot: 'offHand', type: 'shield', defense: 2 },
            { id: 'hp_potion', name: 'Зелье исцеления', desc: 'Мгновенно восстанавливает 50 HP', price: 20, type: 'potion', heal: 50 },
            { id: 'hp_potion', name: 'Зелье исцеления', desc: 'Мгновенно восстанавливает 50 HP', price: 20, type: 'potion', heal: 50 },
            { id: 'mp_potion', name: 'Зелье маны', desc: 'Восстанавливает 40 MP', price: 18, type: 'potion', mana: 40 },
            { id: 'torch', name: 'Факел катакомб', desc: 'Освещает тёмные залы и тайники', price: 12, type: 'tool' }
        ];

        this.normalizeAllSlots();
        this.recalculateStats();

        this.currentHp = config.currentHp !== undefined ? Math.min(this.maxHp, config.currentHp) : this.maxHp;
        this.currentMp = config.currentMp !== undefined ? Math.min(this.maxMp, config.currentMp) : this.maxMp;
    }

    normalizeAllSlots() {
        if (this.equipment) {
            for (const slotKey in this.equipment) {
                const item = this.equipment[slotKey];
                if (item) {
                    item.slot = item.slot || slotKey || Player.inferSlot(item);
                }
            }
        }
        if (Array.isArray(this.inventory)) {
            for (const item of this.inventory) {
                if (item) {
                    const inferred = Player.inferSlot(item);
                    if (inferred) item.slot = item.slot || inferred;
                }
            }
        }
    }

    static inferSlot(item) {
        if (!item) return null;
        if (item.slot) return item.slot;

        const id = (item.id || '').toLowerCase();
        const type = (item.type || '').toLowerCase();
        const name = (item.name || '').toLowerCase();

        if (id.includes('weapon') || id.includes('sword') || id.includes('blade') || id.includes('dagger') || id.includes('staff') || id.includes('bow') || type === 'weapon' || name.includes('меч') || name.includes('палаш') || name.includes('кинжал') || name.includes('посох') || name.includes('лук') || name.includes('оружие')) {
            return 'mainHand';
        }
        if (id.includes('shield') || id.includes('buckler') || type === 'shield' || name.includes('щит') || name.includes('баклер')) {
            return 'offHand';
        }
        if (id.includes('helm') || id.includes('head') || id.includes('hat') || id.includes('crown') || id.includes('cap') || name.includes('шлем') || name.includes('капюшон') || name.includes('шапка') || name.includes('корона')) {
            return 'head';
        }
        if (id.includes('tunic') || id.includes('armor') || id.includes('vest') || id.includes('mail') || id.includes('robe') || id.includes('cuirass') || type === 'armor' || name.includes('рубаха') || name.includes('доспех') || name.includes('кольчуга') || name.includes('нагрудник') || name.includes('одежда')) {
            return 'torso';
        }
        if (id.includes('pants') || id.includes('legs') || id.includes('trousers') || name.includes('штаны') || name.includes('поножи')) {
            return 'legs';
        }
        if (id.includes('boots') || id.includes('shoes') || name.includes('сапоги') || name.includes('ботинки') || name.includes('обувь')) {
            return 'boots';
        }
        if (id.includes('ring') || id.includes('amulet') || id.includes('relic') || type === 'relic' || name.includes('амулет') || name.includes('кольцо') || name.includes('сосуд')) {
            return 'accessory';
        }
        return null;
    }

    getStarterWeaponName(classId) {
        switch (classId) {
            case 'rogue': return 'Охотничий кинжал';
            case 'mage': return 'Посох послушника';
            case 'ranger': return 'Ясеневый лук';
            case 'warrior':
            default: return 'Пехотный меч';
        }
    }

    recalculateStats() {
        const { strength, agility, intelligence, vitality } = this.attributes;

        this.maxHp = vitality * 15 + strength * 5;
        this.maxMp = intelligence * 12;

        this.physicalDamage = Math.round(strength * 1.8 + agility * 0.6);
        this.magicDamage = Math.round(intelligence * 2.0);
        this.critChance = Math.min(60, Math.round(agility * 1.5));
        this.dodgeChance = Math.min(40, Math.round(agility * 1.2));
        this.defense = Math.round(vitality * 0.6 + strength * 0.3);

        if (this.trait && this.trait.id === 'eagle_eye') this.critChance += 8;
        if (this.trait && this.trait.id === 'thick_skin') this.defense += 4;

        if (this.smithBonuses) {
            this.physicalDamage += (this.smithBonuses.physicalDamage || 0);
            this.defense += (this.smithBonuses.defense || 0);
            this.critChance += (this.smithBonuses.critChance || 0);
        }

        if (this.equipment) {
            for (const key in this.equipment) {
                const item = this.equipment[key];
                if (item) {
                    if (item.physicalDamage) this.physicalDamage += item.physicalDamage;
                    if (item.magicDamage) this.magicDamage += item.magicDamage;
                    if (item.defense) this.defense += item.defense;
                    if (item.critChance) this.critChance += item.critChance;
                    if (item.dodgeChance) this.dodgeChance += item.dodgeChance;
                    if (item.maxHp) this.maxHp += item.maxHp;
                    if (item.maxMp) this.maxMp += item.maxMp;
                }
            }
        }
    }

    equipItem(inventoryIndex, targetSlot = null) {
        const item = this.inventory[inventoryIndex];
        if (!item) return false;

        const slot = targetSlot || item.slot || Player.inferSlot(item);
        if (!slot) return false;
        item.slot = slot;

        const currentEquipped = this.equipment[slot];
        this.inventory.splice(inventoryIndex, 1);

        if (currentEquipped) {
            currentEquipped.slot = currentEquipped.slot || slot;
            this.inventory.push(currentEquipped);
        }

        this.equipment[slot] = item;
        this.recalculateStats();
        return true;
    }

    unequipSlot(slot) {
        const item = this.equipment[slot];
        if (!item) return false;

        item.slot = item.slot || slot;
        this.equipment[slot] = null;
        this.inventory.push(item);
        this.recalculateStats();
        return true;
    }

    swapInventoryItems(fromIndex, toIndex) {
        if (fromIndex < 0 || fromIndex >= this.inventory.length) return false;
        if (toIndex < 0) return false;

        if (toIndex >= this.inventory.length) {
            const item = this.inventory.splice(fromIndex, 1)[0];
            this.inventory.push(item);
            return true;
        }

        const temp = this.inventory[fromIndex];
        this.inventory[fromIndex] = this.inventory[toIndex];
        this.inventory[toIndex] = temp;
        return true;
    }

    useItem(inventoryIndex) {
        const item = this.inventory[inventoryIndex];
        if (!item) return { success: false, msg: 'Предмет не найден' };

        if (item.type === 'potion') {
            let used = false;
            let msg = '';
            if (item.heal) {
                if (this.currentHp >= this.maxHp) {
                    return { success: false, msg: 'Здоровье уже полно!' };
                }
                const oldHp = this.currentHp;
                this.currentHp = Math.min(this.maxHp, this.currentHp + item.heal);
                used = true;
                msg = `Восстановлено ${this.currentHp - oldHp} HP`;
            } else if (item.mana) {
                if (this.currentMp >= this.maxMp) {
                    return { success: false, msg: 'Мана уже полна!' };
                }
                const oldMp = this.currentMp;
                this.currentMp = Math.min(this.maxMp, this.currentMp + item.mana);
                used = true;
                msg = `Восстановлено ${this.currentMp - oldMp} MP`;
            }

            if (used) {
                this.inventory.splice(inventoryIndex, 1);
                return { success: true, msg };
            }
        }

        if (item.type === 'food') {
            let parts = [];
            if (item.buffHp) {
                this.maxHp += item.buffHp;
                this.currentHp = Math.min(this.maxHp, this.currentHp + item.buffHp);
                parts.push(`+${item.buffHp} к макс. HP`);
            }
            if (item.buffMp) {
                this.maxMp += item.buffMp;
                this.currentMp = Math.min(this.maxMp, this.currentMp + item.buffMp);
                parts.push(`+${item.buffMp} к макс. MP`);
            }
            if (item.buffCrit) {
                this.critChance = Math.min(80, this.critChance + item.buffCrit);
                parts.push(`+${item.buffCrit}% к криту`);
            }
            if (item.buffDmg) {
                this.physicalDamage += item.buffDmg;
                parts.push(`+${item.buffDmg} к урону`);
            }
            this.inventory.splice(inventoryIndex, 1);
            return { success: true, msg: `Вкусно и сытно! ${parts.join(', ')}` };
        }

        return { success: false, msg: 'Этот предмет нельзя использовать прямо сейчас' };
    }

    dropItem(inventoryIndex) {
        const item = this.inventory[inventoryIndex];
        if (!item) return null;
        this.inventory.splice(inventoryIndex, 1);
        return item;
    }

    getExpRequiredForNextLevel(lvl = this.level) {
        return Math.round(60 * lvl + 40 * Math.pow(lvl, 1.4));
    }

    getExpToNextLevel() {
        return Math.max(0, this.getExpRequiredForNextLevel(this.level) - this.exp);
    }

    getExpPercent() {
        const required = this.getExpRequiredForNextLevel(this.level);
        if (required <= 0) return 100;
        return Math.min(100, Math.max(0, Math.round((this.exp / required) * 100)));
    }

    addExp(amount) {
        if (!amount || amount <= 0) {
            return { leveledUp: false, oldLevel: this.level, newLevel: this.level, pointsGained: 0 };
        }

        const oldLevel = this.level;
        let pointsGained = 0;
        this.exp += amount;

        while (this.exp >= this.getExpRequiredForNextLevel(this.level)) {
            this.exp -= this.getExpRequiredForNextLevel(this.level);
            this.level += 1;
            this.statPoints = (this.statPoints || 0) + 3;
            pointsGained += 3;
        }

        if (this.level > oldLevel) {
            this.recalculateStats();
            this.currentHp = this.maxHp;
            this.currentMp = this.maxMp;
            return {
                leveledUp: true,
                oldLevel,
                newLevel: this.level,
                pointsGained,
                statPoints: this.statPoints
            };
        }

        return { leveledUp: false, oldLevel, newLevel: this.level, pointsGained: 0 };
    }

    allocateStatPoint(statName) {
        if (!this.statPoints || this.statPoints <= 0) {
            return { success: false, msg: 'Нет свободных очков характеристик!' };
        }
        if (!['strength', 'agility', 'intelligence', 'vitality'].includes(statName)) {
            return { success: false, msg: 'Некорректная характеристика' };
        }

        this.attributes[statName] = (this.attributes[statName] || 0) + 1;
        this.statPoints -= 1;
        this.recalculateStats();

        return {
            success: true,
            stat: statName,
            newValue: this.attributes[statName],
            remainingPoints: this.statPoints
        };
    }

    static fromSave(savedData) {
        return new Player(savedData);
    }
}