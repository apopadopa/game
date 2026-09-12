export class Player {
    constructor(config) {
        this.name = config.name || 'Безымянный';
        this.gender = config.gender || 'male';
        this.classId = config.classId;
        this.className = config.className;
        this.origin = config.origin;
        this.trait = config.trait;
        this.visuals = config.visuals;

        this.attributes = {
            strength: config.attributes.strength,
            agility: config.attributes.agility,
            intelligence: config.attributes.intelligence,
            vitality: config.attributes.vitality
        };

        this.level = 1;
        this.exp = 0;
        this.gold = config.origin.bonusGold || 40;

        this.recalculateStats();

        this.currentHp = this.maxHp;
        this.currentMp = this.maxMp;

        this.inventory = [];
        this.equipment = {
            mainHand: { id: 'starter_weapon', name: 'Простое оружие' },
            offHand: null,
            torso: { id: 'starter_tunic', name: 'Холщовая рубаха' },
            legs: { id: 'starter_pants', name: 'Походные штаны' },
            boots: { id: 'starter_boots', name: 'Кожаные сапоги' }
        };
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

        if (this.trait.id === 'eagle_eye') this.critChance += 8;
        if (this.trait.id === 'thick_skin') this.defense += 4;
    }
}