// =========================================================================
// БАЗА ДАННЫХ ДРЕВА НАВЫКОВ И СПОСОБНОСТЕЙ КЛАССОВ (SKILLS DATABASE)
// =========================================================================

export const SKILL_CATEGORIES = {
    STRIKE: 'strike',       // Ячейка 1: Базовый удар
    HEAVY: 'heavy',         // Ячейка 2: Сильнее удар
    FINISHER: 'finisher',   // Ячейка 3: Финальный супер-прием
    PASSIVE: 'passive'      // Пассивные таланты (действуют постоянно)
};

export const DEFAULT_ABILITY_DECKS = {
    warrior: {
        slot1: 'warrior_strike',
        slot2: 'warrior_heavy',
        slot3: 'warrior_execute'
    },
    rogue: {
        slot1: 'rogue_stab',
        slot2: 'rogue_poison',
        slot3: 'rogue_eviscerate'
    },
    mage: {
        slot1: 'mage_dart',
        slot2: 'mage_fireball',
        slot3: 'mage_cascade'
    },
    ranger: {
        slot1: 'ranger_shot',
        slot2: 'ranger_rapid',
        slot3: 'ranger_snipe'
    }
};

export const SKILLS_DATABASE = {
    // =====================================================================
    // ВОИН (WARRIOR)
    // =====================================================================

    // --- УДАР (Ячейка 1) ---
    'warrior_strike': {
        id: 'warrior_strike',
        classId: 'warrior',
        category: 'strike',
        tier: 1,
        cost: 0,
        unlockedByDefault: true,
        name: 'Пехотный удар мечом',
        desc: 'Резкий рубящий выпад клинком. Наносит 100% физ. урона и накапливает +18 ярости.',
        damageMultiplier: 1.0,
        rageGain: 18,
        icon: 'sword',
        iconColor: '#38bdf8'
    },
    'warrior_shield_bash': {
        id: 'warrior_shield_bash',
        classId: 'warrior',
        category: 'strike',
        tier: 2,
        cost: 1,
        requires: ['warrior_strike'],
        name: 'Удар кованым щитом',
        desc: 'Оглушающий удар гранью щита. Наносит 115% физ. урона, дает +15 ярости и имеет 35% шанс оглушить цель на 1 ход.',
        damageMultiplier: 1.15,
        rageGain: 15,
        stunChance: 0.35,
        icon: 'shield',
        iconColor: '#fbbf24'
    },
    'warrior_lacerate': {
        id: 'warrior_lacerate',
        classId: 'warrior',
        category: 'strike',
        tier: 2,
        cost: 1,
        requires: ['warrior_shield_bash'],
        name: 'Рассекающий взмах',
        desc: 'Глубокий разрез плоти. Наносит 120% физ. урона, дает +16 ярости и вызывает кровотечение на 2 хода.',
        damageMultiplier: 1.20,
        rageGain: 16,
        bleedTurns: 2,
        icon: 'blood',
        iconColor: '#ef4444'
    },
    'warrior_furious_strike': {
        id: 'warrior_furious_strike',
        classId: 'warrior',
        category: 'strike',
        tier: 3,
        cost: 1,
        requires: ['warrior_lacerate'],
        name: 'Яростный сокрушитель',
        desc: 'Неистовый удар на пределе сил. Наносит 145% физ. урона и мгновенно дает +26 ярости, но отнимает 6 HP бойца.',
        damageMultiplier: 1.45,
        rageGain: 26,
        selfHpCost: 6,
        icon: 'fire',
        iconColor: '#f97316'
    },

    // --- СИЛЬНЕЕ УДАР (Ячейка 2) ---
    'warrior_heavy': {
        id: 'warrior_heavy',
        classId: 'warrior',
        category: 'heavy',
        tier: 1,
        cost: 0,
        unlockedByDefault: true,
        name: 'Сокрушительный выпад',
        desc: 'Мощный силовой удар двумя руками. Наносит 170% физ. урона и с 40% шансом ошеломляет монстра.',
        costRage: 25,
        damageMultiplier: 1.7,
        stunChance: 0.4,
        icon: 'lightning',
        iconColor: '#eab308'
    },
    'warrior_cleave': {
        id: 'warrior_cleave',
        classId: 'warrior',
        category: 'heavy',
        tier: 2,
        cost: 1,
        requires: ['warrior_heavy'],
        name: 'Раскалывающий удар',
        desc: 'Удар невероятной тяжести, разрушающий латы. Наносит 205% физ. урона и игнорирует 40% брони цели.',
        costRage: 30,
        damageMultiplier: 2.05,
        armorIgnore: 0.40,
        icon: 'axe',
        iconColor: '#f59e0b'
    },
    'warrior_whirlwind': {
        id: 'warrior_whirlwind',
        classId: 'warrior',
        category: 'heavy',
        tier: 2,
        cost: 1,
        requires: ['warrior_cleave'],
        name: 'Вихрь стали',
        desc: 'Круговой взмах клинком. Наносит 220% физ. урона и вызывает кровоточащие раны у противника на 3 хода.',
        costRage: 35,
        damageMultiplier: 2.2,
        bleedTurns: 3,
        icon: 'wind',
        iconColor: '#60a5fa'
    },
    'warrior_bloodthirst': {
        id: 'warrior_bloodthirst',
        classId: 'warrior',
        category: 'heavy',
        tier: 3,
        cost: 1,
        requires: ['warrior_whirlwind'],
        name: 'Кровожадный порыв',
        desc: 'Беспощадный удар, восстанавливающий жизненные силы. Наносит 190% урона и исцеляет воина на 40% нанесенного урона.',
        costRage: 30,
        damageMultiplier: 1.9,
        leechPercent: 0.40,
        icon: 'heart',
        iconColor: '#dc2626'
    },

    // --- ФИНАЛЬНЫЙ (Ячейка 3) ---
    'warrior_execute': {
        id: 'warrior_execute',
        classId: 'warrior',
        category: 'finisher',
        tier: 1,
        cost: 0,
        unlockedByDefault: true,
        name: 'Казнь',
        desc: 'Смертоносный добивающий удар. Наносит 250% физ. урона. Если у монстра <35% HP — гарантированный смертельный крит!',
        costRage: 45,
        damageMultiplier: 2.5,
        executeThreshold: 0.35,
        icon: 'skull',
        iconColor: '#ef4444'
    },
    'warrior_titans_wrath': {
        id: 'warrior_titans_wrath',
        classId: 'warrior',
        category: 'finisher',
        tier: 3,
        cost: 1,
        requires: ['warrior_execute'],
        name: 'Гнев титана',
        desc: 'Землетрясущий удар колоссальной силы. Наносит 320% физ. урона и гарантированно оглушает монстра на 1 ход.',
        costRage: 55,
        damageMultiplier: 3.2,
        stunChance: 1.0,
        icon: 'hammer',
        iconColor: '#f59e0b'
    },
    'warrior_berserk_rush': {
        id: 'warrior_berserk_rush',
        classId: 'warrior',
        category: 'finisher',
        tier: 3,
        cost: 1,
        requires: ['warrior_titans_wrath'],
        name: 'Бешеный натиск берсерка',
        desc: 'Яростный прорыв сквозь плоть и сталь. Наносит 300% чистого урона, полностью игнорируя 60% брони врага.',
        costRage: 50,
        damageMultiplier: 3.0,
        armorIgnore: 0.60,
        icon: 'fire',
        iconColor: '#b91c1c'
    },
    'warrior_dragon_slayer': {
        id: 'warrior_dragon_slayer',
        classId: 'warrior',
        category: 'finisher',
        tier: 4,
        cost: 2,
        requires: ['warrior_berserk_rush'],
        name: 'Удар драконоборца',
        desc: 'Легендарная техника древних витязей. Наносит 380% сокрушающего урона и вызывает сильнейший тремор земли.',
        costRage: 60,
        damageMultiplier: 3.8,
        icon: 'spark',
        iconColor: '#facc15'
    },

    // --- ПАССИВНЫЕ НАВЫКИ ВОИНА ---
    'warrior_iron_skin': {
        id: 'warrior_iron_skin',
        classId: 'warrior',
        category: 'passive',
        tier: 1,
        cost: 1,
        name: 'Железная кожа',
        desc: 'Плотная закалка мышц и костей. Повышает защиту на +4 и максимальный запас здоровья на +25 HP.',
        bonuses: { defense: 4, maxHp: 25 },
        icon: 'shield',
        iconColor: '#94a3b8'
    },
    'warrior_veteran': {
        id: 'warrior_veteran',
        classId: 'warrior',
        category: 'passive',
        tier: 2,
        cost: 1,
        requires: ['warrior_iron_skin'],
        name: 'Закалка ветерана',
        desc: 'Опыт сотен боев на мечах. Увеличивает физический урон на +6 и шанс критического удара на +5%.',
        bonuses: { physicalDamage: 6, critChance: 5 },
        icon: 'sword',
        iconColor: '#cbd5e1'
    },
    'warrior_juggernaut': {
        id: 'warrior_juggernaut',
        classId: 'warrior',
        category: 'passive',
        tier: 3,
        cost: 1,
        requires: ['warrior_veteran'],
        name: 'Несокрушимый джаггернаут',
        desc: 'Тело воина подобно гранитной скале. Дает +50 к максимальному HP и +6 к броне.',
        bonuses: { maxHp: 50, defense: 6 },
        icon: 'armor',
        iconColor: '#e2e8f0'
    },
    'warrior_colossus': {
        id: 'warrior_colossus',
        classId: 'warrior',
        category: 'passive',
        tier: 4,
        cost: 2,
        requires: ['warrior_juggernaut'],
        name: 'Сила колосса',
        desc: 'Нечеловеческая мощь в руках. Добавляет +14 к физическому урону и +8% к шансу крита.',
        bonuses: { physicalDamage: 14, critChance: 8 },
        icon: 'spark',
        iconColor: '#f59e0b'
    },


    // =====================================================================
    // РАЗБОЙНИК (ROGUE)
    // =====================================================================

    // --- УДАР (Ячейка 1) ---
    'rogue_stab': {
        id: 'rogue_stab',
        classId: 'rogue',
        category: 'strike',
        tier: 1,
        cost: 0,
        unlockedByDefault: true,
        name: 'Быстрый выпад',
        desc: 'Молниеносный колющий удар кинжалом. Наносит 105% физ. урона, дает +1 серию комбо, стоит 20 энергии.',
        costEnergy: 20,
        comboGain: 1,
        damageMultiplier: 1.05,
        icon: 'sword',
        iconColor: '#38bdf8'
    },
    'rogue_shadow_slash': {
        id: 'rogue_shadow_slash',
        classId: 'rogue',
        category: 'strike',
        tier: 2,
        cost: 1,
        requires: ['rogue_stab'],
        name: 'Теневой порез',
        desc: 'Обманный удар из слепой зоны. Наносит 115% физ. урона, дает +1 комбо и повышает шанс уклонения на 15% на следующий ход.',
        costEnergy: 22,
        comboGain: 1,
        damageMultiplier: 1.15,
        dodgeBonus: 15,
        icon: 'eye',
        iconColor: '#a855f7'
    },
    'rogue_nerve_strike': {
        id: 'rogue_nerve_strike',
        classId: 'rogue',
        category: 'strike',
        tier: 2,
        cost: 1,
        requires: ['rogue_shadow_slash'],
        name: 'Удар по нервам',
        desc: 'Точный укол в сочленение доспеха. Наносит 110% урона, дает +1 комбо и имеет 35% шанс парализовать противника на ход.',
        costEnergy: 24,
        comboGain: 1,
        damageMultiplier: 1.10,
        stunChance: 0.35,
        icon: 'lightning',
        iconColor: '#eab308'
    },
    'rogue_twin_daggers': {
        id: 'rogue_twin_daggers',
        classId: 'rogue',
        category: 'strike',
        tier: 3,
        cost: 1,
        requires: ['rogue_nerve_strike'],
        name: 'Двойное жало',
        desc: 'Молниеносный парный выпад обоими клинками. Наносит 140% физ. урона и сразу дарует +2 серии комбо!',
        costEnergy: 28,
        comboGain: 2,
        damageMultiplier: 1.40,
        icon: 'sword',
        iconColor: '#f43f5e'
    },

    // --- СИЛЬНЕЕ УДАР (Ячейка 2) ---
    'rogue_poison': {
        id: 'rogue_poison',
        classId: 'rogue',
        category: 'heavy',
        tier: 1,
        cost: 0,
        unlockedByDefault: true,
        name: 'Отравленный клинок',
        desc: 'Лезвие, смазанное ядом болотной гадюки. Наносит 120% физ. урона, вешает периодический яд на 3 хода, +1 комбо.',
        costEnergy: 35,
        comboGain: 1,
        damageMultiplier: 1.20,
        poisonTurns: 3,
        icon: 'poison',
        iconColor: '#22c55e'
    },
    'rogue_arterial_bleed': {
        id: 'rogue_arterial_bleed',
        classId: 'rogue',
        category: 'heavy',
        tier: 2,
        cost: 1,
        requires: ['rogue_poison'],
        name: 'Вскрытие артерий',
        desc: 'Коварный секущий разрез. Наносит 155% физ. урона и вызывает сильное кровотечение на 3 хода, +1 комбо.',
        costEnergy: 35,
        comboGain: 1,
        damageMultiplier: 1.55,
        bleedTurns: 3,
        icon: 'blood',
        iconColor: '#dc2626'
    },
    'rogue_smoke_bomb_strike': {
        id: 'rogue_smoke_bomb_strike',
        classId: 'rogue',
        category: 'heavy',
        tier: 2,
        cost: 1,
        requires: ['rogue_arterial_bleed'],
        name: 'Удар из дымовой завесы',
        desc: 'Бросок едкого дымного порошка под ноги монстру с резким выпадом. Наносит 175% урона и ослепляет врага.',
        costEnergy: 38,
        comboGain: 1,
        damageMultiplier: 1.75,
        stunChance: 0.50,
        icon: 'wind',
        iconColor: '#94a3b8'
    },
    'rogue_shadowstep_ambush': {
        id: 'rogue_shadowstep_ambush',
        classId: 'rogue',
        category: 'heavy',
        tier: 3,
        cost: 1,
        requires: ['rogue_smoke_bomb_strike'],
        name: 'Внезапная засада со спины',
        desc: 'Мгновенный телепорт за спину жертвы. Наносит 210% урона с гарантированным критическим ударом, +2 комбо!',
        costEnergy: 42,
        comboGain: 2,
        damageMultiplier: 2.10,
        guaranteedCrit: true,
        icon: 'eye',
        iconColor: '#c084fc'
    },

    // --- ФИНАЛЬНЫЙ (Ячейка 3) ---
    'rogue_eviscerate': {
        id: 'rogue_eviscerate',
        classId: 'rogue',
        category: 'finisher',
        tier: 1,
        cost: 0,
        unlockedByDefault: true,
        name: 'Потрошение',
        desc: 'Финальный удар, расходующий все накопленные комбо-очки (наносит до 380% урона при 5 сериях!).',
        costComboAll: true,
        baseFinisherMultiplier: 1.6,
        comboMultiplierStep: 0.45,
        icon: 'blood',
        iconColor: '#ef4444'
    },
    'rogue_deathmark': {
        id: 'rogue_deathmark',
        classId: 'rogue',
        category: 'finisher',
        tier: 3,
        cost: 1,
        requires: ['rogue_eviscerate'],
        name: 'Кровавая метка смерти',
        desc: 'Расходует комбо-очки, нанося до 420% урона и накладывая на монстра ошеломление от шока.',
        costComboAll: true,
        baseFinisherMultiplier: 1.8,
        comboMultiplierStep: 0.50,
        stunChance: 0.6,
        icon: 'skull',
        iconColor: '#b91c1c'
    },
    'rogue_shadow_dance': {
        id: 'rogue_shadow_dance',
        classId: 'rogue',
        category: 'finisher',
        tier: 3,
        cost: 1,
        requires: ['rogue_deathmark'],
        name: 'Танец теней',
        desc: 'Каскад смертоносных ударов в вихре клинков (до 450% урона при 5 сериях), дарует скрытность на 1 ход.',
        costComboAll: true,
        baseFinisherMultiplier: 2.0,
        comboMultiplierStep: 0.52,
        stealthTurn: true,
        icon: 'wind',
        iconColor: '#a855f7'
    },
    'rogue_assassinate': {
        id: 'rogue_assassinate',
        classId: 'rogue',
        category: 'finisher',
        tier: 4,
        cost: 2,
        requires: ['rogue_shadow_dance'],
        name: 'Абсолютная ликвидация',
        desc: 'Высшее искусство убийцы. Наносит до 520% чистейшего урона, полностью игнорирующего броню цели!',
        costComboAll: true,
        baseFinisherMultiplier: 2.2,
        comboMultiplierStep: 0.60,
        armorIgnore: 1.0,
        icon: 'spark',
        iconColor: '#f43f5e'
    },

    // --- ПАССИВНЫЕ НАВЫКИ РАЗБОЙНИКА ---
    'rogue_cat_grace': {
        id: 'rogue_cat_grace',
        classId: 'rogue',
        category: 'passive',
        tier: 1,
        cost: 1,
        name: 'Кошачья грация',
        desc: 'Бесшумный шаг и гибкость. Повышает шанс уклонения на +8% и шанс крита на +5%.',
        bonuses: { dodgeChance: 8, critChance: 5 },
        icon: 'eye',
        iconColor: '#a855f7'
    },
    'rogue_poison_master': {
        id: 'rogue_poison_master',
        classId: 'rogue',
        category: 'passive',
        tier: 2,
        cost: 1,
        requires: ['rogue_cat_grace'],
        name: 'Мастер ядоварения',
        desc: 'Знание секретов токсичных трав катакомб. Добавляет +6 к физическому урону и +25 HP.',
        bonuses: { physicalDamage: 6, maxHp: 25 },
        icon: 'poison',
        iconColor: '#4ade80'
    },
    'rogue_adrenaline': {
        id: 'rogue_adrenaline',
        classId: 'rogue',
        category: 'passive',
        tier: 3,
        cost: 1,
        requires: ['rogue_poison_master'],
        name: 'Прилив адреналина',
        desc: 'Быстрая реакция в бою. Увеличивает критический шанс на +10% и уклонение на +6%.',
        bonuses: { critChance: 10, dodgeChance: 6 },
        icon: 'lightning',
        iconColor: '#fbbf24'
    },
    'rogue_lethal_intent': {
        id: 'rogue_lethal_intent',
        classId: 'rogue',
        category: 'passive',
        tier: 4,
        cost: 2,
        requires: ['rogue_adrenaline'],
        name: 'Смертоносный замысел',
        desc: 'Каждый удар направлен прямо в жизненно важные органы. +14 к урону и +12% к критическому удару.',
        bonuses: { physicalDamage: 14, critChance: 12 },
        icon: 'spark',
        iconColor: '#f43f5e'
    },


    // =====================================================================
    // МАГ (MAGE)
    // =====================================================================

    // --- УДАР (Ячейка 1) ---
    'mage_dart': {
        id: 'mage_dart',
        classId: 'mage',
        category: 'strike',
        tier: 1,
        cost: 0,
        unlockedByDefault: true,
        name: 'Чародейская стрела',
        desc: 'Сгусток чистой магической энергии. Наносит 90% маг. урона и восстанавливает +8 MP, стоит 5 MP.',
        costMp: 5,
        manaGain: 8,
        damageMultiplier: 0.90,
        isMagic: true,
        icon: 'spark',
        iconColor: '#c084fc'
    },
    'mage_shock_bolt': {
        id: 'mage_shock_bolt',
        classId: 'mage',
        category: 'strike',
        tier: 2,
        cost: 1,
        requires: ['mage_dart'],
        name: 'Искровой разряд',
        desc: 'Молния, пронзающая цель. Наносит 115% маг. урона электричеством и с 30% шансом ошеломляет монстра.',
        costMp: 8,
        damageMultiplier: 1.15,
        stunChance: 0.30,
        isMagic: true,
        icon: 'lightning',
        iconColor: '#facc15'
    },
    'mage_flame_touch': {
        id: 'mage_flame_touch',
        classId: 'mage',
        category: 'strike',
        tier: 2,
        cost: 1,
        requires: ['mage_shock_bolt'],
        name: 'Касание пламени',
        desc: 'Жгучая огненная вспышка. Наносит 120% маг. урона и поджигает врага на 2 хода.',
        costMp: 10,
        damageMultiplier: 1.20,
        burnTurns: 2,
        isMagic: true,
        icon: 'fire',
        iconColor: '#f97316'
    },
    'mage_siphon_life': {
        id: 'mage_siphon_life',
        classId: 'mage',
        category: 'strike',
        tier: 3,
        cost: 1,
        requires: ['mage_flame_touch'],
        name: 'Вытягивание жизни',
        desc: 'Темная волна поглощения. Наносит 110% маг. урона и исцеляет мага на 50% нанесенного урона.',
        costMp: 12,
        damageMultiplier: 1.10,
        leechPercent: 0.50,
        isMagic: true,
        icon: 'heart',
        iconColor: '#ec4899'
    },

    // --- СИЛЬНЕЕ УДАР (Ячейка 2) ---
    'mage_fireball': {
        id: 'mage_fireball',
        classId: 'mage',
        category: 'heavy',
        tier: 1,
        cost: 0,
        unlockedByDefault: true,
        name: 'Огненный шар',
        desc: 'Пылающая сфера бушующего огня. Наносит 180% маг. урона + вешает горение на 2 хода, стоит 25 MP.',
        costMp: 25,
        damageMultiplier: 1.80,
        burnTurns: 2,
        isMagic: true,
        icon: 'fire',
        iconColor: '#ef4444'
    },
    'mage_lightning_storm': {
        id: 'mage_lightning_storm',
        classId: 'mage',
        category: 'heavy',
        tier: 2,
        cost: 1,
        requires: ['mage_fireball'],
        name: 'Грозовой шквал',
        desc: 'Цепь трескучих молний. Наносит 215% маг. урона, игнорируя 30% магической защиты монстра.',
        costMp: 28,
        damageMultiplier: 2.15,
        armorIgnore: 0.30,
        isMagic: true,
        icon: 'lightning',
        iconColor: '#eab308'
    },
    'mage_blizzard_cone': {
        id: 'mage_blizzard_cone',
        classId: 'mage',
        category: 'heavy',
        tier: 2,
        cost: 1,
        requires: ['mage_lightning_storm'],
        name: 'Ледяной буран',
        desc: 'Леденящая волна вечной мерзлоты. Наносит 185% маг. урона холодом и сковывает движения монстра.',
        costMp: 26,
        damageMultiplier: 1.85,
        stunChance: 0.45,
        isMagic: true,
        icon: 'ice',
        iconColor: '#38bdf8'
    },
    'mage_meteor_strike': {
        id: 'mage_meteor_strike',
        classId: 'mage',
        category: 'heavy',
        tier: 3,
        cost: 1,
        requires: ['mage_blizzard_cone'],
        name: 'Падение метеора',
        desc: 'Призыв пылающего небесного камня. Наносит 245% маг. урона взрывным огнем с сильным ожогом на 3 хода.',
        costMp: 34,
        damageMultiplier: 2.45,
        burnTurns: 3,
        isMagic: true,
        icon: 'fire',
        iconColor: '#dc2626'
    },

    // --- ФИНАЛЬНЫЙ (Ячейка 3) ---
    'mage_cascade': {
        id: 'mage_cascade',
        classId: 'mage',
        category: 'finisher',
        tier: 1,
        cost: 0,
        unlockedByDefault: true,
        name: 'Арканный каскад',
        desc: 'Колоссальный взрыв астральной мощи. Наносит 280% маг. урона, игнорируя 50% защиты цели, стоит 40 MP.',
        costMp: 40,
        damageMultiplier: 2.80,
        armorIgnore: 0.50,
        bonusCrit: 15,
        isMagic: true,
        icon: 'spark',
        iconColor: '#a855f7'
    },
    'mage_supernova': {
        id: 'mage_supernova',
        classId: 'mage',
        category: 'finisher',
        tier: 3,
        cost: 1,
        requires: ['mage_cascade'],
        name: 'Астральная сверхновая',
        desc: 'Взрыв первозданного космического огня. Наносит 350% маг. урона и ослепляет монстра ожогами на 3 хода.',
        costMp: 50,
        damageMultiplier: 3.50,
        burnTurns: 3,
        isMagic: true,
        icon: 'fire',
        iconColor: '#f97316'
    },
    'mage_absolute_zero': {
        id: 'mage_absolute_zero',
        classId: 'mage',
        category: 'finisher',
        tier: 3,
        cost: 1,
        requires: ['mage_supernova'],
        name: 'Абсолютный ноль',
        desc: 'Мгновенное обращение врага в ледяную глыбу. Наносит 320% урона и 100% замораживает монстра на следующий ход.',
        costMp: 46,
        damageMultiplier: 3.20,
        stunChance: 1.0,
        isMagic: true,
        icon: 'ice',
        iconColor: '#67e8f9'
    },
    'mage_void_collapse': {
        id: 'mage_void_collapse',
        classId: 'mage',
        category: 'finisher',
        tier: 4,
        cost: 2,
        requires: ['mage_absolute_zero'],
        name: 'Гравитационный коллапс',
        desc: 'Разрыв пространства и времени в точке врага. Наносит 420% чистейшего урона Бездны, стирая любую броню!',
        costMp: 58,
        damageMultiplier: 4.20,
        armorIgnore: 0.80,
        isMagic: true,
        icon: 'spark',
        iconColor: '#e879f9'
    },

    // --- ПАССИВНЫЕ НАВЫКИ МАГА ---
    'mage_arcane_mind': {
        id: 'mage_arcane_mind',
        classId: 'mage',
        category: 'passive',
        tier: 1,
        cost: 1,
        name: 'Астральный разум',
        desc: 'Углубление в тайны древних гримуаров. Добавляет +45 к максимальному запасу маны (MP) и +6 к маг. урону.',
        bonuses: { maxMp: 45, magicDamage: 6 },
        icon: 'spark',
        iconColor: '#c084fc'
    },
    'mage_elemental_focus': {
        id: 'mage_elemental_focus',
        classId: 'mage',
        category: 'passive',
        tier: 2,
        cost: 1,
        requires: ['mage_arcane_mind'],
        name: 'Стихийный фокус',
        desc: 'Усиление концентрации на потоках энергии. +10 к маг. урону и +6% к шансу магического крита.',
        bonuses: { magicDamage: 10, critChance: 6 },
        icon: 'fire',
        iconColor: '#fbbf24'
    },
    'mage_shield_aura': {
        id: 'mage_shield_aura',
        classId: 'mage',
        category: 'passive',
        tier: 3,
        cost: 1,
        requires: ['mage_elemental_focus'],
        name: 'Аура рунического щита',
        desc: 'Постоянное мерцающее силовое поле вокруг мага. +6 к броне и +35 к максимальному здоровью HP.',
        bonuses: { defense: 6, maxHp: 35 },
        icon: 'shield',
        iconColor: '#38bdf8'
    },
    'mage_archmage_mastery': {
        id: 'mage_archmage_mastery',
        classId: 'mage',
        category: 'passive',
        tier: 4,
        cost: 2,
        requires: ['mage_shield_aura'],
        name: 'Мастерство архимага',
        desc: 'Полное слияние с магическими потоками. +18 к маг. урону, +80 макс MP и +10% к шансу крита.',
        bonuses: { magicDamage: 18, maxMp: 80, critChance: 10 },
        icon: 'spark',
        iconColor: '#e879f9'
    },


    // =====================================================================
    // СЛЕДОПЫТ / ЛУЧНИК (RANGER)
    // =====================================================================

    // --- УДАР (Ячейка 1) ---
    'ranger_shot': {
        id: 'ranger_shot',
        classId: 'ranger',
        category: 'strike',
        tier: 1,
        cost: 0,
        unlockedByDefault: true,
        name: 'Меткий выстрел',
        desc: 'Классический прицельный выстрел из лука. Наносит 115% физ. урона и накапливает +20 концентрации.',
        focusGain: 20,
        damageMultiplier: 1.15,
        icon: 'target',
        iconColor: '#22c55e'
    },
    'ranger_piercing_arrow': {
        id: 'ranger_piercing_arrow',
        classId: 'ranger',
        category: 'strike',
        tier: 2,
        cost: 1,
        requires: ['ranger_shot'],
        name: 'Бронебойная стрела',
        desc: 'Тяжелый граненый наконечник. Наносит 125% урона, пробивает 35% брони монстра и дает +18 концентрации.',
        focusGain: 18,
        damageMultiplier: 1.25,
        armorIgnore: 0.35,
        icon: 'sword',
        iconColor: '#cbd5e1'
    },
    'ranger_barbed_arrow': {
        id: 'ranger_barbed_arrow',
        classId: 'ranger',
        category: 'strike',
        tier: 2,
        cost: 1,
        requires: ['ranger_piercing_arrow'],
        name: 'Стрела с зазубринами',
        desc: 'Опасный выстрел, распарывающий жилы. Наносит 115% урона, вызывает кровотечение на 2 хода и дает +16 концентрации.',
        focusGain: 16,
        damageMultiplier: 1.15,
        bleedTurns: 2,
        icon: 'blood',
        iconColor: '#ef4444'
    },
    'ranger_serpent_sting': {
        id: 'ranger_serpent_sting',
        classId: 'ranger',
        category: 'strike',
        tier: 3,
        cost: 1,
        requires: ['ranger_barbed_arrow'],
        name: 'Укус гадюки',
        desc: 'Стрела, смоченная ядом пещерных змей. Наносит 120% урона, травит цель ядом на 3 хода и дает +18 концентрации.',
        focusGain: 18,
        damageMultiplier: 1.20,
        poisonTurns: 3,
        icon: 'poison',
        iconColor: '#86efac'
    },

    // --- СИЛЬНЕЕ УДАР (Ячейка 2) ---
    'ranger_rapid': {
        id: 'ranger_rapid',
        classId: 'ranger',
        category: 'heavy',
        tier: 1,
        cost: 0,
        unlockedByDefault: true,
        name: 'Двойной залп',
        desc: 'Две стрелы, выпущенные с мгновенным натяжением тетивы. Наносит 170% урона (2 x 85%), стоит 30 концентрации.',
        costFocus: 30,
        damageMultiplier: 1.70,
        icon: 'lightning',
        iconColor: '#fbbf24'
    },
    'ranger_explosive_shot': {
        id: 'ranger_explosive_shot',
        classId: 'ranger',
        category: 'heavy',
        tier: 2,
        cost: 1,
        requires: ['ranger_rapid'],
        name: 'Разрывной снаряд',
        desc: 'Стрела с алхимическим порохом. Наносит 200% урона взрывом и ошеломляет монстра с шансом 40%.',
        costFocus: 35,
        damageMultiplier: 2.00,
        stunChance: 0.40,
        icon: 'fire',
        iconColor: '#f97316'
    },
    'ranger_poison_volley': {
        id: 'ranger_poison_volley',
        classId: 'ranger',
        category: 'heavy',
        tier: 2,
        cost: 1,
        requires: ['ranger_explosive_shot'],
        name: 'Отравленный веер',
        desc: 'Серия смазанных кураре стрел. Наносит 185% урона и накладывает тяжелый яд на 3 хода.',
        costFocus: 34,
        damageMultiplier: 1.85,
        poisonTurns: 3,
        icon: 'poison',
        iconColor: '#22c55e'
    },
    'ranger_windforce_shot': {
        id: 'ranger_windforce_shot',
        classId: 'ranger',
        category: 'heavy',
        tier: 3,
        cost: 1,
        requires: ['ranger_poison_volley'],
        name: 'Шквальный удар бури',
        desc: 'Стрела, заряженная яростью степного ветра. Наносит 225% урона, сбивает врага с ног и раскалывает его защиту.',
        costFocus: 38,
        damageMultiplier: 2.25,
        armorIgnore: 0.35,
        icon: 'wind',
        iconColor: '#38bdf8'
    },

    // --- ФИНАЛЬНЫЙ (Ячейка 3) ---
    'ranger_snipe': {
        id: 'ranger_snipe',
        classId: 'ranger',
        category: 'finisher',
        tier: 1,
        cost: 0,
        unlockedByDefault: true,
        name: 'Снайперский выстрел',
        desc: 'Выверенный выстрел в уязвимое место. Наносит 260% урона с +35% шансом крита и 30% пробитием брони, стоит 55 конц.',
        costFocus: 55,
        damageMultiplier: 2.60,
        bonusCrit: 35,
        armorIgnore: 0.30,
        icon: 'target',
        iconColor: '#fde047'
    },
    'ranger_arrow_rain': {
        id: 'ranger_arrow_rain',
        classId: 'ranger',
        category: 'finisher',
        tier: 3,
        cost: 1,
        requires: ['ranger_snipe'],
        name: 'Ливень стрел',
        desc: 'Залп стрел вертикально вверх, падающий градом на цель. Наносит 320% урона и вешает кровотечение на 3 хода.',
        costFocus: 60,
        damageMultiplier: 3.20,
        bleedTurns: 3,
        icon: 'wind',
        iconColor: '#60a5fa'
    },
    'ranger_heartseeker': {
        id: 'ranger_heartseeker',
        classId: 'ranger',
        category: 'finisher',
        tier: 3,
        cost: 1,
        requires: ['ranger_arrow_rain'],
        name: 'Пронзающий сердце',
        desc: 'Смертельный выстрел в сердце. Наносит 340% урона. Если у врага <40% HP — 100% гарантированный смертельный крит!',
        costFocus: 60,
        damageMultiplier: 3.40,
        executeThreshold: 0.40,
        icon: 'heart',
        iconColor: '#ef4444'
    },
    'ranger_dragon_piercer': {
        id: 'ranger_dragon_piercer',
        classId: 'ranger',
        category: 'finisher',
        tier: 4,
        cost: 2,
        requires: ['ranger_heartseeker'],
        name: 'Пронзатель драконов',
        desc: 'Сверхтяжелая стрела из зачарованной кости. Наносит 400% урона, пробивая доспех насквозь и ошеломляя цель!',
        costFocus: 65,
        damageMultiplier: 4.00,
        armorIgnore: 0.50,
        stunChance: 0.70,
        icon: 'spark',
        iconColor: '#fbbf24'
    },

    // --- ПАССИВНЫЕ НАВЫКИ СЛЕДОПЫТА ---
    'ranger_eagle_instinct': {
        id: 'ranger_eagle_instinct',
        classId: 'ranger',
        category: 'passive',
        tier: 1,
        cost: 1,
        name: 'Орлиный глаз',
        desc: 'Зоркий взгляд степного сокола. Добавляет +8% к шансу критического удара и +5 к физ. урону.',
        bonuses: { critChance: 8, physicalDamage: 5 },
        icon: 'eye',
        iconColor: '#22c55e'
    },
    'ranger_fleet_footwork': {
        id: 'ranger_fleet_footwork',
        classId: 'ranger',
        category: 'passive',
        tier: 2,
        cost: 1,
        requires: ['ranger_eagle_instinct'],
        name: 'Легкая поступь',
        desc: 'Мгновенная смена позиции. Увеличивает шанс уклонения на +9% и дает +2 к защите.',
        bonuses: { dodgeChance: 9, defense: 2 },
        icon: 'boots',
        iconColor: '#38bdf8'
    },
    'ranger_hunter_precision': {
        id: 'ranger_hunter_precision',
        classId: 'ranger',
        category: 'passive',
        tier: 3,
        cost: 1,
        requires: ['ranger_fleet_footwork'],
        name: 'Точность зверолова',
        desc: 'Знание анатомии любых тварей. +10 к физическому урону и +6% к шансу крита.',
        bonuses: { physicalDamage: 10, critChance: 6 },
        icon: 'target',
        iconColor: '#eab308'
    },
    'ranger_pathfinder_mastery': {
        id: 'ranger_pathfinder_mastery',
        classId: 'ranger',
        category: 'passive',
        tier: 4,
        cost: 2,
        requires: ['ranger_hunter_precision'],
        name: 'Мастер выживания',
        desc: 'Высшее чутье следопыта. +40 максимального HP, +8% к уклонению и +12 к урону.',
        bonuses: { maxHp: 40, dodgeChance: 8, physicalDamage: 12 },
        icon: 'spark',
        iconColor: '#facc15'
    }
};

// =========================================================================
// СТРУКТУРА ДРЕВА ДЛЯ КАЖДОГО КЛАССА
// =========================================================================

export const CLASS_SKILL_TREES = {
    warrior: {
        title: 'Воинское мастерство',
        subtitle: 'Тяжелое оружие, ярость и сокрушительные приемы ближнего боя',
        branches: [
            {
                id: 'branch_strike',
                slot: 'slot1',
                category: 'strike',
                title: 'Ветка ударов (Ячейка 1)',
                desc: 'Базовые приемы атаки и накопления ярости',
                skills: ['warrior_strike', 'warrior_shield_bash', 'warrior_lacerate', 'warrior_furious_strike']
            },
            {
                id: 'branch_heavy',
                slot: 'slot2',
                category: 'heavy',
                title: 'Ветка сокрушения (Ячейка 2)',
                desc: 'Мощные силовые удары, расходующие ярость',
                skills: ['warrior_heavy', 'warrior_cleave', 'warrior_whirlwind', 'warrior_bloodthirst']
            },
            {
                id: 'branch_finisher',
                slot: 'slot3',
                category: 'finisher',
                title: 'Ветка казней (Ячейка 3)',
                desc: 'Финальные супер-приемы колоссальной разрушительной силы',
                skills: ['warrior_execute', 'warrior_titans_wrath', 'warrior_berserk_rush', 'warrior_dragon_slayer']
            },
            {
                id: 'branch_passive',
                slot: null,
                category: 'passive',
                title: 'Пассивные таланты',
                desc: 'Постоянное увеличение здоровья, брони и урона',
                skills: ['warrior_iron_skin', 'warrior_veteran', 'warrior_juggernaut', 'warrior_colossus']
            }
        ]
    },
    rogue: {
        title: 'Искусство теней и кинжалов',
        subtitle: 'Серии приемов, скрытность, яды и смертоносные расправы',
        branches: [
            {
                id: 'branch_strike',
                slot: 'slot1',
                category: 'strike',
                title: 'Ветка быстрых выпадов (Ячейка 1)',
                desc: 'Молниеносные уколы, накапливающие серии комбо',
                skills: ['rogue_stab', 'rogue_shadow_slash', 'rogue_nerve_strike', 'rogue_twin_daggers']
            },
            {
                id: 'branch_heavy',
                slot: 'slot2',
                category: 'heavy',
                title: 'Ветка ядов и уловок (Ячейка 2)',
                desc: 'Коварные удары с отравлением и дезориентацией',
                skills: ['rogue_poison', 'rogue_arterial_bleed', 'rogue_smoke_bomb_strike', 'rogue_shadowstep_ambush']
            },
            {
                id: 'branch_finisher',
                slot: 'slot3',
                category: 'finisher',
                title: 'Ветка ликвидаций (Ячейка 3)',
                desc: 'Финальные удары, поглощающие все серии комбо',
                skills: ['rogue_eviscerate', 'rogue_deathmark', 'rogue_shadow_dance', 'rogue_assassinate']
            },
            {
                id: 'branch_passive',
                slot: null,
                category: 'passive',
                title: 'Пассивные таланты',
                desc: 'Постоянное увеличение уклонения, крита и урона',
                skills: ['rogue_cat_grace', 'rogue_poison_master', 'rogue_adrenaline', 'rogue_lethal_intent']
            }
        ]
    },
    mage: {
        title: 'Тайны стихийной магии',
        subtitle: 'Заклинания арканы, огненные взрывы, ледяной контроль и бездна',
        branches: [
            {
                id: 'branch_strike',
                slot: 'slot1',
                category: 'strike',
                title: 'Ветка чародейства (Ячейка 1)',
                desc: 'Базовые магические заряды и регенерация маны',
                skills: ['mage_dart', 'mage_shock_bolt', 'mage_flame_touch', 'mage_siphon_life']
            },
            {
                id: 'branch_heavy',
                slot: 'slot2',
                category: 'heavy',
                title: 'Ветка стихий (Ячейка 2)',
                desc: 'Разрушительные заклинания огня, льда и молний',
                skills: ['mage_fireball', 'mage_lightning_storm', 'mage_blizzard_cone', 'mage_meteor_strike']
            },
            {
                id: 'branch_finisher',
                slot: 'slot3',
                category: 'finisher',
                title: 'Ветка архимагии (Ячейка 3)',
                desc: 'Финальные катаклизмы колоссальной мощи',
                skills: ['mage_cascade', 'mage_supernova', 'mage_absolute_zero', 'mage_void_collapse']
            },
            {
                id: 'branch_passive',
                slot: null,
                category: 'passive',
                title: 'Пассивные таланты',
                desc: 'Постоянное увеличение маны, маг. урона и щитов',
                skills: ['mage_arcane_mind', 'mage_elemental_focus', 'mage_shield_aura', 'mage_archmage_mastery']
            }
        ]
    },
    ranger: {
        title: 'Мастерство следопыта',
        subtitle: 'Стрельба из лука, концентрация, ловушки и смертоносные стрелы',
        branches: [
            {
                id: 'branch_strike',
                slot: 'slot1',
                category: 'strike',
                title: 'Ветка выстрелов (Ячейка 1)',
                desc: 'Базовая стрельба и накопление концентрации',
                skills: ['ranger_shot', 'ranger_piercing_arrow', 'ranger_barbed_arrow', 'ranger_serpent_sting']
            },
            {
                id: 'branch_heavy',
                slot: 'slot2',
                category: 'heavy',
                title: 'Ветка тяжелых залпов (Ячейка 2)',
                desc: 'Особые разрывные и шквальные выстрелы',
                skills: ['ranger_rapid', 'ranger_explosive_shot', 'ranger_poison_volley', 'ranger_windforce_shot']
            },
            {
                id: 'branch_finisher',
                slot: 'slot3',
                category: 'finisher',
                title: 'Ветка смертельных выстрелов (Ячейка 3)',
                desc: 'Снайперские финальные выстрелы невероятной дальности',
                skills: ['ranger_snipe', 'ranger_arrow_rain', 'ranger_heartseeker', 'ranger_dragon_piercer']
            },
            {
                id: 'branch_passive',
                slot: null,
                category: 'passive',
                title: 'Пассивные таланты',
                desc: 'Постоянное увеличение зоркости, уклонения и урона',
                skills: ['ranger_eagle_instinct', 'ranger_fleet_footwork', 'ranger_hunter_precision', 'ranger_pathfinder_mastery']
            }
        ]
    }
};

// =========================================================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// =========================================================================

export function getSkill(skillId) {
    return SKILLS_DATABASE[skillId] || null;
}

export function getTotalSkillPointsEarned(level) {
    // 1 стартовое очко навыка + 1 ОН за каждый четный уровень (или каждый уровень)
    return Math.max(1, 1 + Math.floor(Math.max(0, (level || 1) - 1) / 2));
}

export function getAvailableSkillPoints(player) {
    if (typeof player?.skillPoints === 'number') {
        return Math.max(0, player.skillPoints);
    }
    const totalEarned = getTotalSkillPointsEarned(player?.level || 1);
    const spent = player?.skills?.spentPoints || 0;
    return Math.max(0, totalEarned - spent);
}

export function isSkillUnlocked(player, skillId) {
    const skill = getSkill(skillId);
    if (!skill) return false;
    if (skill.unlockedByDefault && skill.classId === player.classId) return true;
    return Array.isArray(player.skills?.unlocked) && player.skills.unlocked.includes(skillId);
}

export function getSkillPrerequisite(skillId) {
    for (const classKey in CLASS_SKILL_TREES) {
        const tree = CLASS_SKILL_TREES[classKey];
        if (!tree || !tree.branches) continue;
        for (const branch of tree.branches) {
            const idx = branch.skills.indexOf(skillId);
            if (idx > 0) {
                return branch.skills[idx - 1];
            }
        }
    }
    return null;
}

export function canUnlockSkill(player, skillId) {
    const skill = getSkill(skillId);
    if (!skill) return { can: false, reason: 'Навык не существует' };
    if (skill.classId !== player.classId) return { can: false, reason: 'Навык принадлежит другому классу!' };
    if (isSkillUnlocked(player, skillId)) return { can: false, reason: 'Навык уже изучен' };

    // Проверка требований предыдущего навыка в ветке древа (цепочка прогрессии)
    const prevSkillId = getSkillPrerequisite(skillId);
    if (prevSkillId && !isSkillUnlocked(player, prevSkillId)) {
        const prevSkill = getSkill(prevSkillId);
        const prevName = prevSkill ? prevSkill.name : prevSkillId;
        return { can: false, reason: `Требуется сначала изучить предыдущий навык: «${prevName}»!` };
    }

    // Проверка очков навыков
    const cost = skill.cost || 1;
    const available = getAvailableSkillPoints(player);
    if (available < cost) {
        return { can: false, reason: `Недостаточно очков навыков! Нужно: ${cost}, доступно: ${available}` };
    }

    // Дополнительная проверка явных требований (если заданы)
    if (skill.requires && skill.requires.length > 0) {
        for (const reqId of skill.requires) {
            if (!isSkillUnlocked(player, reqId)) {
                const reqSkill = getSkill(reqId);
                const reqName = reqSkill ? reqSkill.name : reqId;
                return { can: false, reason: `Требуется сначала изучить: «${reqName}»!` };
            }
        }
    }

    return { can: true, cost };
}

export function getDeckSlotForCategory(category) {
    switch (category) {
        case 'strike': return 'slot1';
        case 'heavy': return 'slot2';
        case 'finisher': return 'slot3';
        default: return null;
    }
}
