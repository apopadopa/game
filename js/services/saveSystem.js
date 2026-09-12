export class SaveSystem {
    static SAVE_KEY = 'dungeon_crawler_save';

    static save(player) {
        try {
            const data = {
                version: 1,
                savedAt: new Date().toISOString(),
                player: {
                    name: player.name,
                    gender: player.gender,
                    classId: player.classId,
                    className: player.className,
                    origin: player.origin,
                    trait: player.trait,
                    visuals: player.visuals,
                    attributes: player.attributes,
                    level: player.level || 1,
                    exp: player.exp || 0,
                    gold: player.gold,
                    currentHp: player.currentHp,
                    currentMp: player.currentMp,
                    equipment: player.equipment,
                    inventory: player.inventory,
                    smithBonuses: player.smithBonuses || { physicalDamage: 0, defense: 0, critChance: 0 }
                }
            };
            localStorage.setItem(this.SAVE_KEY, JSON.stringify(data));
            return { success: true, timestamp: new Date() };
        } catch (e) {
            console.error('Ошибка сохранения:', e);
            return { success: false, error: e };
        }
    }

    static load() {
        try {
            const raw = localStorage.getItem(this.SAVE_KEY);
            if (!raw) return null;
            const data = JSON.parse(raw);
            return data.player;
        } catch (e) {
            console.error('Ошибка загрузки сохранения:', e);
            return null;
        }
    }

    static hasSave() {
        try {
            return !!localStorage.getItem(this.SAVE_KEY);
        } catch (e) {
            return false;
        }
    }

    static deleteSave() {
        try {
            localStorage.removeItem(this.SAVE_KEY);
            return true;
        } catch (e) {
            return false;
        }
    }
}

