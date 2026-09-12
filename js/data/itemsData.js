import { Icons } from '../visuals/icons.js';

/**
 * Единая база предметов игры, уровневых каталогов торговцев и генератор лута катакомб.
 */
export const ITEMS_DATABASE = {
    // =========================================================================
    // ОРУЖИЕ (WEAPONS)
    // =========================================================================

    // Воин
    iron_broadsword: {
        id: 'iron_broadsword',
        name: 'Закаленный палаш',
        desc: 'Тяжелый пехотный клинок с долом (+6 к физ. урону).',
        price: 70,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'warrior',
        reqLevel: 1,
        physicalDamage: 6,
        icon: Icons.broadsword(24)
    },
    steel_claymore: {
        id: 'steel_claymore',
        name: 'Стальной клеймор',
        desc: 'Двуручный меч с широким лезвием (+11 к физ. урону, +3% к криту).',
        price: 135,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'warrior',
        reqLevel: 2,
        physicalDamage: 11,
        critChance: 3,
        icon: Icons.broadsword(24)
    },
    runic_bastard_sword: {
        id: 'runic_bastard_sword',
        name: 'Рунический полуторник',
        desc: 'Лезвие испещрено древними рунами стойкости (+17 физ. урона, +5% крита, +15 HP).',
        price: 225,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'warrior',
        reqLevel: 3,
        physicalDamage: 17,
        critChance: 5,
        maxHp: 15,
        icon: Icons.broadsword(24)
    },
    mithril_abyss_blade: {
        id: 'mithril_abyss_blade',
        name: 'Мифриловый клинок Бездны',
        desc: 'Невесомый и прочный мифрил, рассекающий тьму (+24 физ. урона, +8% крита, +25 HP).',
        price: 360,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'warrior',
        reqLevel: 4,
        physicalDamage: 24,
        critChance: 8,
        maxHp: 25,
        icon: Icons.broadsword(24)
    },
    dragon_slayer_greatsword: {
        id: 'dragon_slayer_greatsword',
        name: 'Клинок Драконоборца',
        desc: 'Легендарный великий меч, обагренный кровью древних ящеров (+34 физ. урона, +14% крита, +45 HP).',
        price: 540,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'warrior',
        reqLevel: 5,
        physicalDamage: 34,
        critChance: 14,
        maxHp: 45,
        icon: Icons.broadsword(24)
    },

    // Разбойник
    hunting_dagger: {
        id: 'hunting_dagger',
        name: 'Охотничий кинжал волка',
        desc: 'Острый изогнутый стилет (+5 к физ. урону, +4% к криту).',
        price: 60,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'rogue',
        reqLevel: 1,
        physicalDamage: 5,
        critChance: 4,
        icon: Icons.dagger(24)
    },
    assassin_stiletto: {
        id: 'assassin_stiletto',
        name: 'Стилет бесшумного убийцы',
        desc: 'Тонкое трехгранное острие (+9 физ. урона, +8% крита, +4% уклонения).',
        price: 125,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'rogue',
        reqLevel: 2,
        physicalDamage: 9,
        critChance: 8,
        dodgeChance: 4,
        icon: Icons.dagger(24)
    },
    viper_fang_blade: {
        id: 'viper_fang_blade',
        name: 'Клык черной гадюки',
        desc: 'Клинок покрыт едким ядом болотных аспидов (+15 физ. урона, +12% крита, +6% уклонения).',
        price: 215,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'rogue',
        reqLevel: 3,
        physicalDamage: 15,
        critChance: 12,
        dodgeChance: 6,
        icon: Icons.dagger(24)
    },
    shadow_kris: {
        id: 'shadow_kris',
        name: 'Волнистый крис Теней',
        desc: 'Оружие мастеров тайных орденов (+21 физ. урона, +16% крита, +8% уклонения).',
        price: 345,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'rogue',
        reqLevel: 4,
        physicalDamage: 21,
        critChance: 16,
        dodgeChance: 8,
        icon: Icons.dagger(24)
    },
    nightfall_claws: {
        id: 'nightfall_claws',
        name: 'Когти Вечной Ночи',
        desc: 'Мифические парные клинки ночной погибели (+30 физ. урона, +22% крита, +12% уклонения).',
        price: 510,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'rogue',
        reqLevel: 5,
        physicalDamage: 30,
        critChance: 22,
        dodgeChance: 12,
        icon: Icons.dagger(24)
    },

    // Маг
    apprentice_staff: {
        id: 'apprentice_staff',
        name: 'Посох послушника стихий',
        desc: 'Ясеневый посох с аметистовым навершием (+7 маг. урона, +15 MP).',
        price: 65,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'mage',
        reqLevel: 1,
        magicDamage: 7,
        maxMp: 15,
        icon: Icons.staff(24)
    },
    elemental_wand: {
        id: 'elemental_wand',
        name: 'Жезл пылающего эфира',
        desc: 'Фокусирует заклинания разрушения (+13 маг. урона, +25 MP).',
        price: 130,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'mage',
        reqLevel: 2,
        magicDamage: 13,
        maxMp: 25,
        icon: Icons.staff(24)
    },
    storm_caller_staff: {
        id: 'storm_caller_staff',
        name: 'Посох призывателя бурь',
        desc: 'Искрится молниями и раскатами грома (+20 маг. урона, +40 MP, +4% крита).',
        price: 220,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'mage',
        reqLevel: 3,
        magicDamage: 20,
        maxMp: 40,
        critChance: 4,
        icon: Icons.staff(24)
    },
    void_archmage_sceptre: {
        id: 'void_archmage_sceptre',
        name: 'Скипетр Архимага Пустоты',
        desc: 'Артефакт тайной магии Высшего Круга (+28 маг. урона, +60 MP, +6% крита).',
        price: 350,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'mage',
        reqLevel: 4,
        magicDamage: 28,
        maxMp: 60,
        critChance: 6,
        icon: Icons.staff(24)
    },
    primordial_magic_tome: {
        id: 'primordial_magic_tome',
        name: 'Фолиант Первородной Магии',
        desc: 'Древнейшие заклинания творения и распада (+40 маг. урона, +90 MP, +10% крита).',
        price: 530,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'mage',
        reqLevel: 5,
        magicDamage: 40,
        maxMp: 90,
        critChance: 10,
        icon: Icons.staff(24)
    },

    // Лучник
    ash_shortbow: {
        id: 'ash_shortbow',
        name: 'Крепкий ясеневый лук',
        desc: 'Гибкое деревянное плечо и льняная тетива (+5 физ. урона, +3% крита).',
        price: 65,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'ranger',
        reqLevel: 1,
        physicalDamage: 5,
        critChance: 3,
        icon: Icons.bow(24)
    },
    yew_longbow: {
        id: 'yew_longbow',
        name: 'Тисовый длинный лук',
        desc: 'Дальнобойное оружие королевских стрелков (+10 физ. урона, +6% крита, +3% уклонения).',
        price: 125,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'ranger',
        reqLevel: 2,
        physicalDamage: 10,
        critChance: 6,
        dodgeChance: 3,
        icon: Icons.bow(24)
    },
    composite_scout_bow: {
        id: 'composite_scout_bow',
        name: 'Композитный лук следопыта',
        desc: 'Слоеный рог и сухожилия для мощного натяжения (+16 физ. урона, +9% крита, +5% уклонения).',
        price: 215,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'ranger',
        reqLevel: 3,
        physicalDamage: 16,
        critChance: 9,
        dodgeChance: 5,
        icon: Icons.bow(24)
    },
    phantom_hunting_crossbow: {
        id: 'phantom_hunting_crossbow',
        name: 'Призрачный охотничий арбалет',
        desc: 'Стальная дуга с воротом пробивает любые латы (+23 физ. урона, +13% крита, +7% уклонения).',
        price: 340,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'ranger',
        reqLevel: 4,
        physicalDamage: 23,
        critChance: 13,
        dodgeChance: 7,
        icon: Icons.bow(24)
    },
    celestial_wind_recurve: {
        id: 'celestial_wind_recurve',
        name: 'Лук Небесного Ветра',
        desc: 'Стрелы летят быстрее свиста бури (+32 физ. урона, +18% крита, +10% уклонения).',
        price: 520,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'ranger',
        reqLevel: 5,
        physicalDamage: 32,
        critChance: 18,
        dodgeChance: 10,
        icon: Icons.bow(24)
    },

    // =========================================================================
    // ЩИТЫ (SHIELDS - offHand)
    // =========================================================================
    reinforced_shield: {
        id: 'reinforced_shield',
        name: 'Окованный щит',
        desc: 'Дубовый щит со стальным ободом (+4 к защите).',
        price: 55,
        slot: 'offHand',
        type: 'shield',
        reqLevel: 1,
        defense: 4,
        icon: Icons.shield(24)
    },
    knight_kite_shield: {
        id: 'knight_kite_shield',
        name: 'Рыцарский каплевидный щит',
        desc: 'Надежная защита от стрел и рубящих ударов (+7 защиты, +15 HP).',
        price: 115,
        slot: 'offHand',
        type: 'shield',
        reqLevel: 2,
        defense: 7,
        maxHp: 15,
        icon: Icons.shield(24)
    },
    iron_bastion_aegis: {
        id: 'iron_bastion_aegis',
        name: 'Эгида железного бастиона',
        desc: 'Массивный башенный щит с геральдическим крестом (+11 защиты, +30 HP, +2% уклонения).',
        price: 195,
        slot: 'offHand',
        type: 'shield',
        reqLevel: 3,
        defense: 11,
        maxHp: 30,
        dodgeChance: 2,
        icon: Icons.shield(24)
    },
    mithril_tower_shield: {
        id: 'mithril_tower_shield',
        name: 'Мифриловый щит стража',
        desc: 'Отражает сокрушительные выпады чудовищ (+16 защиты, +50 HP, +4% уклонения).',
        price: 310,
        slot: 'offHand',
        type: 'shield',
        reqLevel: 4,
        defense: 16,
        maxHp: 50,
        dodgeChance: 4,
        icon: Icons.shield(24)
    },
    mirror_shield_of_aegis: {
        id: 'mirror_shield_of_aegis',
        name: 'Зеркальный щит Афины',
        desc: 'Легендарный сияющий щит, поглощающий смертоносные чары (+23 защиты, +80 HP, +8% уклонения).',
        price: 490,
        slot: 'offHand',
        type: 'shield',
        reqLevel: 5,
        defense: 23,
        maxHp: 80,
        dodgeChance: 8,
        icon: Icons.shield(24)
    },

    // =========================================================================
    // ДОСПЕХИ (ARMOR - torso)
    // =========================================================================
    chainmail_vest: {
        id: 'chainmail_vest',
        name: 'Кольчужный доспех',
        desc: 'Прочная клепаная кольчуга из закаленной проволоки (+6 к защите).',
        price: 90,
        slot: 'torso',
        type: 'armor',
        reqLevel: 1,
        defense: 6,
        icon: Icons.chainmail(24)
    },
    scale_mail_cuirass: {
        id: 'scale_mail_cuirass',
        name: 'Чешуйчатый доспех стража',
        desc: 'Перекрывающиеся стальные пластины (+10 к защите, +20 HP).',
        price: 170,
        slot: 'torso',
        type: 'armor',
        reqLevel: 2,
        defense: 10,
        maxHp: 20,
        icon: Icons.chainmail(24)
    },
    knight_plate_armor: {
        id: 'knight_plate_armor',
        name: 'Латный доспех крестоносца',
        desc: 'Кованый монолитный нагрудник с золотой гравировкой (+15 к защите, +35 HP).',
        price: 285,
        slot: 'torso',
        type: 'armor',
        reqLevel: 3,
        defense: 15,
        maxHp: 35,
        icon: Icons.chainmail(24)
    },
    mithril_cuirass_of_titans: {
        id: 'mithril_cuirass_of_titans',
        name: 'Мифриловая кираса титанов',
        desc: 'Выкована в недрах горного горна (+21 к защите, +60 HP).',
        price: 430,
        slot: 'torso',
        type: 'armor',
        reqLevel: 4,
        defense: 21,
        maxHp: 60,
        icon: Icons.chainmail(24)
    },
    immortal_dragon_armor: {
        id: 'immortal_dragon_armor',
        name: 'Панцирь Бессмертного Дракона',
        desc: 'Чешуя древнего виверна делает владельца неуязвимым (+30 к защите, +100 HP).',
        price: 660,
        slot: 'torso',
        type: 'armor',
        reqLevel: 5,
        defense: 30,
        maxHp: 100,
        icon: Icons.chainmail(24)
    },

    // =========================================================================
    // ШЛЕМЫ (HELMETS - head)
    // =========================================================================
    iron_helmet: {
        id: 'iron_helmet',
        name: 'Стальной шлем',
        desc: 'Защитный купольный шлем с наносником (+3 к защите).',
        price: 45,
        slot: 'head',
        type: 'armor',
        reqLevel: 1,
        defense: 3,
        icon: Icons.helmet(24)
    },
    steel_visored_helm: {
        id: 'steel_visored_helm',
        name: 'Шлем с забралом стражника',
        desc: 'Тяжелый глухой шлем с прорезями для глаз (+5 защиты, +10 HP).',
        price: 95,
        slot: 'head',
        type: 'armor',
        reqLevel: 2,
        defense: 5,
        maxHp: 10,
        icon: Icons.helmet(24)
    },
    crusader_great_helm: {
        id: 'crusader_great_helm',
        name: 'Топфхельм паладина',
        desc: 'Освященный боевой шлем со смотровыми щелями (+8 защиты, +20 HP).',
        price: 165,
        slot: 'head',
        type: 'armor',
        reqLevel: 3,
        defense: 8,
        maxHp: 20,
        icon: Icons.helmet(24)
    },
    runic_crown_of_justice: {
        id: 'runic_crown_of_justice',
        name: 'Рунический шлем правосудия',
        desc: 'Защищает разум и тело от порчи Бездны (+12 защиты, +35 HP, +15 MP).',
        price: 275,
        slot: 'head',
        type: 'armor',
        reqLevel: 4,
        defense: 12,
        maxHp: 35,
        maxMp: 15,
        icon: Icons.helmet(24)
    },
    titan_horned_helm: {
        id: 'titan_horned_helm',
        name: 'Венец Титана Глубин',
        desc: 'Устрашающий рогатый шлем непреклонных воителей (+18 защиты, +60 HP, +25 MP).',
        price: 420,
        slot: 'head',
        type: 'armor',
        reqLevel: 5,
        defense: 18,
        maxHp: 60,
        maxMp: 25,
        icon: Icons.helmet(24)
    },

    // =========================================================================
    // ПОНОЖИ (LEGS - legs)
    // =========================================================================
    leather_reinforced_pants: {
        id: 'leather_reinforced_pants',
        name: 'Окованные кожаные поножи',
        desc: 'Прочные штаны со стальными щитками (+2 защиты, +2% уклонения).',
        price: 40,
        slot: 'legs',
        type: 'armor',
        reqLevel: 1,
        defense: 2,
        dodgeChance: 2,
        icon: Icons.pants(24)
    },
    steel_greaves: {
        id: 'steel_greaves',
        name: 'Стальные латные наголенники',
        desc: 'Надежно берегут ноги от рубящих ударов (+4 защиты, +10 HP).',
        price: 90,
        slot: 'legs',
        type: 'armor',
        reqLevel: 2,
        defense: 4,
        maxHp: 10,
        icon: Icons.pants(24)
    },
    plate_knight_greaves: {
        id: 'plate_knight_greaves',
        name: 'Поножи благородного рыцаря',
        desc: 'Чеканные поножи с подвижными наколенниками (+7 защиты, +20 HP).',
        price: 160,
        slot: 'legs',
        type: 'armor',
        reqLevel: 3,
        defense: 7,
        maxHp: 20,
        icon: Icons.pants(24)
    },
    mithril_leg_guards: {
        id: 'mithril_leg_guards',
        name: 'Мифриловые поножи вихря',
        desc: 'Легкие и несокрушимые пластины (+11 защиты, +35 HP, +4% уклонения).',
        price: 260,
        slot: 'legs',
        type: 'armor',
        reqLevel: 4,
        defense: 11,
        maxHp: 35,
        dodgeChance: 4,
        icon: Icons.pants(24)
    },
    titan_striding_greaves: {
        id: 'titan_striding_greaves',
        name: 'Поножи Неуязвимого Колосса',
        desc: 'Магическая броня колоссов древности (+16 защиты, +55 HP, +6% уклонения).',
        price: 400,
        slot: 'legs',
        type: 'armor',
        reqLevel: 5,
        defense: 16,
        maxHp: 55,
        dodgeChance: 6,
        icon: Icons.pants(24)
    },

    // =========================================================================
    // ОБУВЬ (BOOTS - boots)
    // =========================================================================
    sturdy_leather_boots: {
        id: 'sturdy_leather_boots',
        name: 'Походные кожаные сапоги',
        desc: 'Удобные сапоги с толстой подметкой (+2 защиты, +2% уклонения).',
        price: 40,
        slot: 'boots',
        type: 'armor',
        reqLevel: 1,
        defense: 2,
        dodgeChance: 2,
        icon: Icons.boots(24)
    },
    iron_plated_boots: {
        id: 'iron_plated_boots',
        name: 'Кованые боевые сапоги',
        desc: 'Усиленный носок и стальные накладки на щиколотки (+4 защиты, +5 HP).',
        price: 85,
        slot: 'boots',
        type: 'armor',
        reqLevel: 2,
        defense: 4,
        maxHp: 5,
        icon: Icons.boots(24)
    },
    boots_of_the_wind: {
        id: 'boots_of_the_wind',
        name: 'Сапоги попутного ветра',
        desc: 'Даруют невероятную легкость шага (+6 защиты, +6% уклонения).',
        price: 155,
        slot: 'boots',
        type: 'armor',
        reqLevel: 3,
        defense: 6,
        dodgeChance: 6,
        icon: Icons.boots(24)
    },
    mithril_treads: {
        id: 'mithril_treads',
        name: 'Мифриловые ботфорты',
        desc: 'Сапоги следопытов Бездны (+9 защиты, +8% уклонения, +20 HP).',
        price: 250,
        slot: 'boots',
        type: 'armor',
        reqLevel: 4,
        defense: 9,
        dodgeChance: 8,
        maxHp: 20,
        icon: Icons.boots(24)
    },
    celestial_striders: {
        id: 'celestial_striders',
        name: 'Странники Небосвода',
        desc: 'Позволяют скользить по камню не оставляя следов (+14 защиты, +12% уклонения, +40 HP).',
        price: 390,
        slot: 'boots',
        type: 'armor',
        reqLevel: 5,
        defense: 14,
        dodgeChance: 12,
        maxHp: 40,
        icon: Icons.boots(24)
    },

    // =========================================================================
    // АКСЕССУАРЫ И КОЛЬЦА (ACCESSORIES - accessory)
    // =========================================================================
    bronze_ring_of_might: {
        id: 'bronze_ring_of_might',
        name: 'Бронзовый перстень силы',
        desc: 'Придает уверенности ударам (+2 физ. урона, +10 HP).',
        price: 50,
        slot: 'accessory',
        type: 'relic',
        reqLevel: 1,
        physicalDamage: 2,
        maxHp: 10,
        icon: Icons.ring(24)
    },
    thief_silver_ring: {
        id: 'thief_silver_ring',
        name: 'Серебряное кольцо ловкача',
        desc: 'Тонкая гравировка глаза ворона (+5% крита, +4% уклонения).',
        price: 110,
        slot: 'accessory',
        type: 'relic',
        reqLevel: 2,
        critChance: 5,
        dodgeChance: 4,
        icon: Icons.ring(24)
    },
    amulet_of_ghost_step: {
        id: 'amulet_of_ghost_step',
        name: 'Амулет призрачного шага',
        desc: 'Внутри мерцает туманный опал (+8% уклонения, +5 физ. урона).',
        price: 180,
        slot: 'accessory',
        type: 'relic',
        reqLevel: 3,
        dodgeChance: 8,
        physicalDamage: 5,
        icon: Icons.amulet(24)
    },
    ring_of_ancient_kings: {
        id: 'ring_of_ancient_kings',
        name: 'Кольцо древних королей',
        desc: 'Печать былых монархов (+8 физ. урона, +8 маг. урона, +30 HP).',
        price: 300,
        slot: 'accessory',
        type: 'relic',
        reqLevel: 4,
        physicalDamage: 8,
        magicDamage: 8,
        maxHp: 30,
        icon: Icons.ring(24)
    },
    eye_of_the_void: {
        id: 'eye_of_the_void',
        name: 'Око Первородной Бездны',
        desc: 'Пульсирующий самоцвет тьмы (+15 физ. урона, +15 маг. урона, +10% крита).',
        price: 490,
        slot: 'accessory',
        type: 'relic',
        reqLevel: 5,
        physicalDamage: 15,
        magicDamage: 15,
        critChance: 10,
        icon: Icons.gem(24)
    },

    // =========================================================================
    // СНАДОБЬЯ И ЗЕЛЬЯ (POTIONS / CONSUMABLES)
    // =========================================================================
    hp_potion: {
        id: 'hp_potion',
        name: 'Зелье исцеления',
        desc: 'Мгновенно восстанавливает 50 HP.',
        price: 20,
        type: 'potion',
        reqLevel: 1,
        heal: 50,
        icon: Icons.potion(24, '#ef4444')
    },
    mp_potion: {
        id: 'mp_potion',
        name: 'Зелье маны',
        desc: 'Мгновенно восстанавливает 40 MP.',
        price: 18,
        type: 'potion',
        reqLevel: 1,
        mana: 40,
        icon: Icons.potion(24, '#3b82f6')
    },
    torch: {
        id: 'torch',
        name: 'Факел катакомб',
        desc: 'Освещает тёмные залы и потайные ниши.',
        price: 12,
        type: 'tool',
        reqLevel: 1,
        icon: Icons.spark(24)
    },
    escape_scroll: {
        id: 'escape_scroll',
        name: 'Свиток побега',
        desc: 'Экстренный телепорт на поверхность в город из любой точки катакомб.',
        price: 35,
        type: 'scroll',
        reqLevel: 1,
        icon: Icons.scroll(24)
    },
    greater_hp_potion: {
        id: 'greater_hp_potion',
        name: 'Большое зелье исцеления',
        desc: 'Концентрированный экстракт жизни: восстанавливает 100 HP.',
        price: 45,
        type: 'potion',
        reqLevel: 2,
        heal: 100,
        icon: Icons.potion(24, '#dc2626')
    },
    greater_mp_potion: {
        id: 'greater_mp_potion',
        name: 'Большое зелье маны',
        desc: 'Эссенция звездной лазури: восстанавливает 80 MP.',
        price: 40,
        type: 'potion',
        reqLevel: 2,
        mana: 80,
        icon: Icons.potion(24, '#2563eb')
    },
    stoneskin_scroll: {
        id: 'stoneskin_scroll',
        name: 'Свиток каменной кожи',
        desc: 'Окаменяет плоть, временно даруя несокрушимую стойкость.',
        price: 55,
        type: 'scroll',
        reqLevel: 2,
        icon: Icons.scroll(24)
    },
    full_recovery_potion: {
        id: 'full_recovery_potion',
        name: 'Зелье полного восстановления',
        desc: 'Алхимический эликсир: исцеляет 140 HP и восстанавливает 110 MP.',
        price: 95,
        type: 'potion',
        reqLevel: 3,
        heal: 140,
        mana: 110,
        icon: Icons.potion(24, '#a855f7')
    },
    berserker_elixir: {
        id: 'berserker_elixir',
        name: 'Эликсир ярости берсерка',
        desc: 'Распаляет ярость в крови, восстанавливая 70 HP и даруя боевой раж.',
        price: 80,
        type: 'potion',
        reqLevel: 3,
        heal: 70,
        icon: Icons.potion(24, '#ea580c')
    },
    archmage_draught: {
        id: 'archmage_draught',
        name: 'Настой Великого Архимага',
        desc: 'Переполняет чародея чистой арканой: восстанавливает 170 MP.',
        price: 120,
        type: 'potion',
        reqLevel: 4,
        mana: 170,
        icon: Icons.potion(24, '#7c3aed')
    },
    elixir_of_immortality: {
        id: 'elixir_of_immortality',
        name: 'Эликсир вечной жизни',
        desc: 'Легендарное зелье алхимиков: восстанавливает 260 HP и 200 MP.',
        price: 210,
        type: 'potion',
        reqLevel: 5,
        heal: 260,
        mana: 200,
        icon: Icons.potion(24, '#f59e0b')
    },

    // =========================================================================
    // СВЯЩЕННЫЕ РЕЛИКВИИ ХРАМА (TEMPLE RELICS)
    // =========================================================================
    holy_water: {
        id: 'holy_water',
        name: 'Святая вода',
        desc: 'Освященный фиал: очищает от скверны и наносит 45 урона нежити.',
        price: 25,
        type: 'relic',
        reqLevel: 1,
        icon: Icons.urn(24)
    },
    blessed_amulet: {
        id: 'blessed_amulet',
        name: 'Освящённый амулет',
        desc: 'Защищает от сил тьмы (+3 к защите, +10 HP).',
        price: 60,
        slot: 'accessory',
        type: 'relic',
        reqLevel: 1,
        defense: 3,
        maxHp: 10,
        icon: Icons.amulet(24)
    },
    minor_prayer_beads: {
        id: 'minor_prayer_beads',
        name: 'Молитвенные чётки послушника',
        desc: 'Даруют душевный покой (+15 MP, +2 маг. урона).',
        price: 45,
        slot: 'accessory',
        type: 'relic',
        reqLevel: 1,
        maxMp: 15,
        magicDamage: 2,
        icon: Icons.amulet(24)
    },
    vial_of_dawn: {
        id: 'vial_of_dawn',
        name: 'Фиал Утренней Зари',
        desc: 'Светлое чудо: наносит 85 урона нежити и исцеляет 40 HP.',
        price: 80,
        type: 'relic',
        reqLevel: 2,
        icon: Icons.urn(24)
    },
    paladin_crusader_cross: {
        id: 'paladin_crusader_cross',
        name: 'Крест паломника',
        desc: 'Золотое распятие с благословением жрицы (+5 защиты, +20 HP).',
        price: 120,
        slot: 'accessory',
        type: 'relic',
        reqLevel: 2,
        defense: 5,
        maxHp: 20,
        icon: Icons.amulet(24)
    },
    tears_of_goddess: {
        id: 'tears_of_goddess',
        name: 'Слеза Богини Света',
        desc: 'Священный дар небес: восстанавливает 100 HP и 100 MP.',
        price: 95,
        type: 'potion',
        reqLevel: 2,
        heal: 100,
        mana: 100,
        icon: Icons.gem(24)
    },
    seraphim_feather_amulet: {
        id: 'seraphim_feather_amulet',
        name: 'Амулет крыла Серафима',
        desc: 'Сияющее перо ангельского вестника (+8 защиты, +8 маг. урона, +30 MP).',
        price: 195,
        slot: 'accessory',
        type: 'relic',
        reqLevel: 3,
        defense: 8,
        magicDamage: 8,
        maxMp: 30,
        icon: Icons.amulet(24)
    },
    archangel_halo_relic: {
        id: 'archangel_halo_relic',
        name: 'Нимб Архангела Михаила',
        desc: 'Священная реликвия высшего собора (+12 защиты, +35 HP, +35 MP).',
        price: 330,
        slot: 'accessory',
        type: 'relic',
        reqLevel: 4,
        defense: 12,
        maxHp: 35,
        maxMp: 35,
        icon: Icons.spark(24)
    },
    chalice_of_eternity: {
        id: 'chalice_of_eternity',
        name: 'Потир Вечного Света',
        desc: 'Святой Грааль ордена Света (+18 защиты, +60 HP, +60 MP, +12 маг. урона).',
        price: 530,
        slot: 'accessory',
        type: 'relic',
        reqLevel: 5,
        defense: 18,
        maxHp: 60,
        maxMp: 60,
        magicDamage: 12,
        icon: Icons.urn(24)
    },

    // =========================================================================
    // ТРАКТИРНАЯ СНЕДЬ И ВЫПИВКА (TAVERN PROVISIONS)
    // =========================================================================
    hearty_meat_stew: {
        id: 'hearty_meat_stew',
        name: 'Сытная мясная похлёбка',
        desc: 'Густой трактирный суп из говядины с овощами (+25 к макс. HP).',
        price: 14,
        type: 'food',
        reqLevel: 1,
        buffHp: 25,
        icon: Icons.meat(22)
    },
    dwarven_stout: {
        id: 'dwarven_stout',
        name: 'Гномье тёмное пиво',
        desc: 'Крепкий подземный портер (+8% крита и +3 к физ. урону).',
        price: 25,
        type: 'food',
        reqLevel: 2,
        buffCrit: 8,
        buffDmg: 3,
        icon: Icons.ale(22)
    },
    roasted_wild_boar: {
        id: 'roasted_wild_boar',
        name: 'Жареный дикий вепрь',
        desc: 'Сочный кусок кабаньего окорока на вертеле (+50 к макс. HP).',
        price: 40,
        type: 'food',
        reqLevel: 2,
        buffHp: 50,
        icon: Icons.meat(22)
    },
    dragon_fire_whiskey: {
        id: 'dragon_fire_whiskey',
        name: 'Огненный виски Дракона',
        desc: 'Жгучий напиток с перцем и смолой (+14% крита, +6 к урону).',
        price: 55,
        type: 'food',
        reqLevel: 3,
        buffCrit: 14,
        buffDmg: 6,
        icon: Icons.ale(22)
    },
    royal_elven_mead: {
        id: 'royal_elven_mead',
        name: 'Королевский эльфийский мёд',
        desc: 'Волшебный нектар древних дубрав (+65 HP, +45 MP).',
        price: 90,
        type: 'food',
        reqLevel: 4,
        buffHp: 65,
        buffMp: 45,
        icon: Icons.ale(22)
    }
};

/**
 * Получение ассортимента товаров конкретного торговца с учетом уровня игрока.
 * Возвращает массив объектов с полем `locked: boolean`.
 */
export function getTraderStock(traderId, playerLevel = 1) {
    let itemIds = [];

    switch (traderId) {
        case 'blacksmith':
            itemIds = [
                // 1 уровень
                'iron_broadsword', 'hunting_dagger', 'apprentice_staff', 'ash_shortbow',
                'reinforced_shield', 'chainmail_vest', 'iron_helmet', 'leather_reinforced_pants', 'sturdy_leather_boots',
                // 2 уровень
                'steel_claymore', 'assassin_stiletto', 'elemental_wand', 'yew_longbow',
                'knight_kite_shield', 'scale_mail_cuirass', 'steel_visored_helm', 'steel_greaves', 'iron_plated_boots',
                // 3 уровень
                'runic_bastard_sword', 'viper_fang_blade', 'storm_caller_staff', 'composite_scout_bow',
                'iron_bastion_aegis', 'knight_plate_armor', 'crusader_great_helm', 'plate_knight_greaves', 'boots_of_the_wind',
                // 4 уровень
                'mithril_abyss_blade', 'shadow_kris', 'void_archmage_sceptre', 'phantom_hunting_crossbow',
                'mithril_tower_shield', 'mithril_cuirass_of_titans', 'runic_crown_of_justice', 'mithril_leg_guards', 'mithril_treads',
                // 5 уровень
                'dragon_slayer_greatsword', 'nightfall_claws', 'primordial_magic_tome', 'celestial_wind_recurve',
                'mirror_shield_of_aegis', 'immortal_dragon_armor', 'titan_horned_helm', 'titan_striding_greaves', 'celestial_striders'
            ];
            break;

        case 'shop':
            itemIds = [
                // 1 уровень
                'hp_potion', 'mp_potion', 'torch', 'escape_scroll', 'bronze_ring_of_might',
                // 2 уровень
                'greater_hp_potion', 'greater_mp_potion', 'stoneskin_scroll', 'thief_silver_ring',
                // 3 уровень
                'full_recovery_potion', 'berserker_elixir', 'amulet_of_ghost_step',
                // 4 уровень
                'archmage_draught', 'ring_of_ancient_kings',
                // 5 уровень
                'elixir_of_immortality', 'eye_of_the_void'
            ];
            break;

        case 'temple':
            itemIds = [
                // 1 уровень
                'holy_water', 'blessed_amulet', 'minor_prayer_beads',
                // 2 уровень
                'vial_of_dawn', 'paladin_crusader_cross', 'tears_of_goddess',
                // 3 уровень
                'seraphim_feather_amulet',
                // 4 уровень
                'archangel_halo_relic',
                // 5 уровень
                'chalice_of_eternity'
            ];
            break;

        case 'tavern':
            itemIds = [
                'hearty_meat_stew',
                'dwarven_stout',
                'roasted_wild_boar',
                'dragon_fire_whiskey',
                'royal_elven_mead'
            ];
            break;

        default:
            itemIds = [];
    }

    return itemIds.map(id => {
        const baseItem = ITEMS_DATABASE[id];
        if (!baseItem) return null;
        const isLocked = baseItem.reqLevel > playerLevel;
        return {
            ...baseItem,
            locked: isLocked
        };
    }).filter(Boolean);
}

/**
 * Генератор случайного лута из катакомб с учетом этажа и ранга монстра.
 */
export function getRandomBattleLoot(dungeonFloor = 1, monsterTier = 'regular') {
    const isBoss = (monsterTier === 'boss' || monsterTier === 'final_boss');
    const isHardened = (monsterTier === 'hardened');

    // Определяем максимальный целевой уровень дропа
    let targetLevel = 1;
    if (isBoss) {
        targetLevel = Math.min(5, Math.max(2, dungeonFloor + 1));
    } else if (isHardened) {
        targetLevel = Math.min(4, Math.max(1, dungeonFloor));
    } else {
        targetLevel = Math.min(3, Math.max(1, dungeonFloor - 1 || 1));
    }

    // Собираем кандидатов из базы предметов
    const pool = Object.values(ITEMS_DATABASE).filter(item => {
        if (item.type === 'food') return false; // еду продают в таверне
        if (isBoss) {
            // Боссы дропают преимущественно экипировку и реликвии подходящего тира
            return (item.type === 'weapon' || item.type === 'armor' || item.type === 'shield' || item.type === 'relic')
                && item.reqLevel <= targetLevel && item.reqLevel >= Math.max(1, targetLevel - 1);
        }
        return item.reqLevel <= targetLevel;
    });

    if (pool.length === 0) {
        return { ...ITEMS_DATABASE.hp_potion };
    }

    const picked = pool[Math.floor(Math.random() * pool.length)];
    return { ...picked };
}

