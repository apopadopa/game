// ============================================================================
// СИСТЕМА УПРАВЛЕНИЯ ЧИТ-РЕЖИМАМИ И КРИПТОГРАФИЧЕСКАЯ АУТЕНТИФИКАЦИЯ
// ============================================================================

// Автономная криптографическая реализация SHA-256 (чистый JS, без сторонних библиотек)
function sha256_core(ascii) {
    function rightRotate(value, amount) {
        return (value >>> amount) | (value << (32 - amount));
    }
    const mathPow = Math.pow;
    const maxWord = mathPow(2, 32);
    const lengthProperty = 'length';
    let i, j;
    let result = '';
    const words = [];
    const asciiBitLength = ascii[lengthProperty] * 8;
    let hash = [];
    const k = [];
    let primeCounter = 0;
    const isComposite = {};

    for (let candidate = 2; primeCounter < 64; candidate++) {
        if (!isComposite[candidate]) {
            for (i = 0; i < 313; i += candidate) {
                isComposite[i] = candidate;
            }
            hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
            k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
        }
    }

    ascii += '\x80';
    while (ascii[lengthProperty] % 64 - 56) ascii += '\x00';
    for (i = 0; i < ascii[lengthProperty]; i++) {
        j = ascii.charCodeAt(i);
        if (j >> 8) return '';
        words[i >> 2] |= j << ((3 - i) % 4) * 8;
    }
    words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
    words[words[lengthProperty]] = (asciiBitLength);

    for (j = 0; j < words[lengthProperty];) {
        const w = words.slice(j, j += 16);
        const oldHash = hash;
        for (i = 0; i < 64; i++) {
            const w15 = w[i - 15], w2 = w[i - 2];
            const a = hash[0], e = hash[4];
            const temp1 = hash[7]
                + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
                + ((e & hash[5]) ^ ((~e) & hash[6]))
                + k[i]
                + (w[i] = (i < 16) ? w[i] : (
                        w[i - 16]
                        + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3))
                        + w[i - 7]
                        + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))
                    ) | 0
                );
            const temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22))
                + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
            hash = [(temp1 + temp2) | 0].concat(hash);
            hash[4] = (hash[4] + temp1) | 0;
        }
        for (i = 0; i < 8; i++) {
            hash[i] = (hash[i] + oldHash[i]) | 0;
        }
    }

    for (i = 0; i < 8; i++) {
        for (j = 3; j + 1; j--) {
            const b = (hash[i] >> (j * 8)) & 255;
            result += ((b < 16) ? '0' : '') + b.toString(16);
        }
    }
    return result;
}

function utf8Encode(str) {
    try {
        return unescape(encodeURIComponent(str));
    } catch {
        return str;
    }
}

function calcCryptoDigest(text) {
    return sha256_core(utf8Encode(text));
}

// Зашифрованные блоки контрольной сигнатуры (многослойный XOR ключ)
const KEY_SALT_ALPHA = 'k9#vF!9xL@2026_abyss_key_';
const KEY_SALT_OMEGA = '_vault_omega_772';
const MASK_KEY = 0x5a3c9e71;
const ENCRYPTED_BLOCKS = [
    0x9aaf9aa6, 0xdf95374c, 0x2174bf56, 0xe6dc261a,
    0x1de5af89, 0xf436f953, 0x408cdfdb, 0xa7f06853
];
const ENCRYPTED_BLOCKS_ALT = [
    0xebb059cf, 0xc89c33f9, 0x7e7fd413, 0x8bb0d000,
    0x2c2a6d07, 0x98c58de7, 0x42d99cfa, 0x8d3b6bf1
];

// Маппинг транслитерации раскладки ввода (QWERTY typo tolerance)
const LAYOUT_FIX = {
    'B': String.fromCharCode(0x418),
    'b': String.fromCharCode(0x438),
    'k': String.fromCharCode(0x43b),
    'K': String.fromCharCode(0x41b),
    'm': String.fromCharCode(0x44c),
    'M': String.fromCharCode(0x42c),
    'z': String.fromCharCode(0x44f),
    'Z': String.fromCharCode(0x42f)
};

export class CheatSystem {
    // Глобальные состояния читов
    static flags = {
        instantWin: false,      // Мгновенная победа в бою
        ignoreMonsters: false,  // Свободное прохождение сквозь монстров без блока
        godMode: false,         // Режим Бога (HP и MP не опускаются)
        revealMap: false        // Полное открытие карты подземелья (без тумана войны)
    };

    /**
     * Многоуровневая проверка зашифрованного пароля.
     * Пароль подвергается 1000 раундам криптографического солевого хэширования
     * и сопоставляется с дешифрованной динамической маской.
     * Исходный пароль в коде ОТСУТСТВУЕТ в любом открытом виде.
     */
    static verifyPassword(inputPassword) {
        if (!inputPassword || typeof inputPassword !== 'string') return false;
        let trimmed = inputPassword.trim();
        if (!trimmed) return false;

        // Авто-коррекция английской раскладки клавиатуры
        trimmed = trimmed.split('').map(c => LAYOUT_FIX[c] || c).join('');
        // Нормализация регистра: первая заглавная, остальные строчные (поддержка любого регистра и CapsLock)
        if (trimmed.length > 0) {
            trimmed = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
        }

        // 1000 раундов солевого хэширования
        let currentHash = calcCryptoDigest(KEY_SALT_ALPHA + trimmed + KEY_SALT_OMEGA);
        for (let r = 0; r < 1000; r++) {
            currentHash = calcCryptoDigest(currentHash + KEY_SALT_ALPHA + (r ^ 0x5c));
        }

        // Восстановление сигнатур из замаскированных блоков
        let expectedHash1 = '', expectedHash2 = '';
        for (let i = 0; i < ENCRYPTED_BLOCKS.length; i++) {
            expectedHash1 += ((ENCRYPTED_BLOCKS[i] ^ (MASK_KEY + (i * 8 * 0x1f))) >>> 0).toString(16).padStart(8, '0');
            expectedHash2 += ((ENCRYPTED_BLOCKS_ALT[i] ^ (MASK_KEY + (i * 8 * 0x1f))) >>> 0).toString(16).padStart(8, '0');
        }

        return currentHash === expectedHash1 || currentHash === expectedHash2;
    }

    // Включение/выключение флагов
    static toggleInstantWin(forceState = null) {
        this.flags.instantWin = forceState !== null ? forceState : !this.flags.instantWin;
        return this.flags.instantWin;
    }

    static toggleIgnoreMonsters(forceState = null) {
        this.flags.ignoreMonsters = forceState !== null ? forceState : !this.flags.ignoreMonsters;
        return this.flags.ignoreMonsters;
    }

    static toggleGodMode(forceState = null) {
        this.flags.godMode = forceState !== null ? forceState : !this.flags.godMode;
        return this.flags.godMode;
    }

    static toggleRevealMap(forceState = null) {
        this.flags.revealMap = forceState !== null ? forceState : !this.flags.revealMap;
        return this.flags.revealMap;
    }

    /**
     * Установка максимального уровня (30-й уровень) и начисление очков характеристик/навыков
     */
    static applyMaxLevel(player, targetLevel = 30) {
        if (!player) return null;

        const currentLvl = player.level || 1;
        const levelsToAdd = Math.max(0, targetLevel - currentLvl);

        player.level = Math.max(player.level, targetLevel);
        player.exp = 0;

        // Начисляем по 3 очка характеристик и по 1 очку навыка за каждый уровень + щедрый чит-бонус
        const bonusStatPoints = (levelsToAdd * 3) + 50;
        const bonusSkillPoints = levelsToAdd + 10;

        player.statPoints = (player.statPoints || 0) + bonusStatPoints;
        player.skillPoints = (player.skillPoints || 0) + bonusSkillPoints;

        // Повышаем базовые атрибуты
        if (player.attributes) {
            player.attributes.strength = Math.max(player.attributes.strength || 5, 40);
            player.attributes.agility = Math.max(player.attributes.agility || 5, 40);
            player.attributes.intelligence = Math.max(player.attributes.intelligence || 5, 40);
            player.attributes.vitality = Math.max(player.attributes.vitality || 5, 40);
        }

        player.recalculateStats();
        player.currentHp = player.maxHp;
        player.currentMp = player.maxMp;

        return {
            newLevel: player.level,
            statPointsAdded: bonusStatPoints,
            totalStatPoints: player.statPoints,
            skillPointsAdded: bonusSkillPoints
        };
    }

    /**
     * Начисление 100,000 золотых монет
     */
    static addGold(player, amount = 100000) {
        if (!player) return 0;
        player.gold = (player.gold || 0) + amount;
        return player.gold;
    }

    /**
     * Выдача легендарного мифического комплекта снаряжения Бездны
     */
    static grantGodGear(player) {
        if (!player) return false;

        const godSword = {
            id: 'god_weapon_abyss',
            name: 'Клинок Вечного Творца',
            slot: 'mainHand',
            type: 'weapon',
            tier: 'legendary',
            physicalDamage: 999,
            magicalDamage: 999,
            critChance: 75,
            desc: 'Оружие за гранью законов мироздания. Сокрушает любую материю одним касанием.'
        };

        const godArmor = {
            id: 'god_armor_abyss',
            name: 'Доспех Непроницаемого Титана',
            slot: 'torso',
            type: 'armor',
            tier: 'legendary',
            defense: 999,
            hpBonus: 2000,
            desc: 'Броня, выкованная из нерушимых осколков мирового ядра.'
        };

        const godHelm = {
            id: 'god_helm_abyss',
            name: 'Венец Всевластия Бездны',
            slot: 'head',
            type: 'armor',
            tier: 'legendary',
            defense: 500,
            manaBonus: 1000,
            desc: 'Древний венец, дарующий абсолютный контроль над пространством.'
        };

        const godRing = {
            id: 'god_ring_abyss',
            name: 'Перстень Бессмертной Воли',
            slot: 'accessory',
            type: 'accessory',
            tier: 'legendary',
            critChance: 50,
            dodgeChance: 50,
            desc: 'Кольцо, искривляющее вероятности судьбы в пользу владельца.'
        };

        if (!player.equipment) {
            player.equipment = {};
        }
        player.equipment.mainHand = godSword;
        player.equipment.torso = godArmor;
        player.equipment.head = godHelm;
        player.equipment.accessory = godRing;

        if (typeof player.recalculateStats === 'function') {
            player.recalculateStats();
        }
        player.currentHp = player.maxHp;
        player.currentMp = player.maxMp;
        return true;
    }

    /**
     * Мгновенное снятие печатей и открытие Южных Врат (сюжетный финал)
     */
    static unlockSouthGates(player) {
        if (!player) return false;
        player.hasDefeatedFinalBoss = true;
        player.hasViewedAbyssEnding = true;
        player.hasOpenedSouthGates = true;
        return true;
    }

    /**
     * Сброс всех чит-модификаторов
     */
    static resetCheats() {
        this.flags.instantWin = false;
        this.flags.ignoreMonsters = false;
        this.flags.godMode = false;
        this.flags.revealMap = false;
    }
}
