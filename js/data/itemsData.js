import { Icons } from '../visuals/icons.js';
import { EquipmentVisuals } from '../visuals/equipmentVisuals.js';

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
        reqLevel: 6,
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
        reqLevel: 11,
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
        reqLevel: 15,
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
        reqLevel: 21,
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
        reqLevel: 6,
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
        reqLevel: 11,
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
        reqLevel: 15,
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
        reqLevel: 21,
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
        reqLevel: 6,
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
        reqLevel: 11,
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
        reqLevel: 15,
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
        reqLevel: 21,
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
        reqLevel: 6,
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
        reqLevel: 11,
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
        reqLevel: 15,
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
        reqLevel: 21,
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
        reqLevel: 6,
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
        reqLevel: 11,
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
        reqLevel: 15,
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
        reqLevel: 21,
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
        reqLevel: 6,
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
        reqLevel: 11,
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
        reqLevel: 15,
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
        reqLevel: 21,
        defense: 30,
        maxHp: 100,
        icon: Icons.chainmail(24)
    },

    // Броня Плута (Rogue Torso)
    thief_leather_vest: {
        id: 'thief_leather_vest',
        name: 'Кожаный жилет вора',
        desc: 'Легкий и бесшумный жилет из выделанной кожи (+4 к защите, +3% к уклонению, +3% к криту).',
        price: 80,
        slot: 'torso',
        type: 'armor',
        classReq: 'rogue',
        reqLevel: 1,
        defense: 4,
        dodgeChance: 3,
        critChance: 3
    },
    shadow_leather_armor: {
        id: 'shadow_leather_armor',
        name: 'Теневой доспех плута',
        desc: 'Усиленный темный доспех с кармашками для отмычек (+7 к защите, +5% к уклонению, +5% к криту).',
        price: 155,
        slot: 'torso',
        type: 'armor',
        classReq: 'rogue',
        reqLevel: 6,
        defense: 7,
        dodgeChance: 5,
        critChance: 5
    },
    assassin_garb: {
        id: 'assassin_garb',
        name: 'Одеяние ассасина',
        desc: 'Пропитано полуночным раствором, гасящим любой шелест (+11 к защите, +8% к уклонению, +8% к криту, +4 физ. ур.).',
        price: 260,
        slot: 'torso',
        type: 'armor',
        classReq: 'rogue',
        reqLevel: 11,
        defense: 11,
        dodgeChance: 8,
        critChance: 8,
        physicalDamage: 4
    },
    nightstalker_tunic: {
        id: 'nightstalker_tunic',
        name: 'Куртка ночного призрака',
        desc: 'Элитное облачение гильдии убийц (+16 к защите, +10% к уклонению, +12% к криту, +8 физ. ур.).',
        price: 410,
        slot: 'torso',
        type: 'armor',
        classReq: 'rogue',
        reqLevel: 15,
        defense: 16,
        dodgeChance: 10,
        critChance: 12,
        physicalDamage: 8
    },

    // Одеяния Чародея (Mage Torso)
    apprentice_robe: {
        id: 'apprentice_robe',
        name: 'Мантия ученика магии',
        desc: 'Простая мантия из сукна с вышитыми рунами (+3 к защите, +4 к маг. урону, +20 MP).',
        price: 80,
        slot: 'torso',
        type: 'armor',
        classReq: 'mage',
        reqLevel: 1,
        defense: 3,
        magicDamage: 4,
        maxMp: 20
    },
    elemental_robe: {
        id: 'elemental_robe',
        name: 'Одеяние стихий',
        desc: 'Ткань защищает от магических ожогов (+6 к защите, +8 к маг. урону, +35 MP).',
        price: 155,
        slot: 'torso',
        type: 'armor',
        classReq: 'mage',
        reqLevel: 6,
        defense: 6,
        magicDamage: 8,
        maxMp: 35
    },
    sorcerer_vestments: {
        id: 'sorcerer_vestments',
        name: 'Облачение чародея',
        desc: 'Шелковая риза с серебряной филигранью (+10 к защите, +14 к маг. урону, +55 MP, +3% к криту).',
        price: 265,
        slot: 'torso',
        type: 'armor',
        classReq: 'mage',
        reqLevel: 11,
        defense: 10,
        magicDamage: 14,
        maxMp: 55,
        critChance: 3
    },
    archmage_robe: {
        id: 'archmage_robe',
        name: 'Мантия высшего архимага',
        desc: 'Насыщена древней силой стихийного круга (+15 к защите, +20 к маг. урону, +80 MP, +5% к криту).',
        price: 415,
        slot: 'torso',
        type: 'armor',
        classReq: 'mage',
        reqLevel: 15,
        defense: 15,
        magicDamage: 20,
        maxMp: 80,
        critChance: 5
    },

    // Доспехи Следопыта (Ranger Torso)
    hunter_tunic: {
        id: 'hunter_tunic',
        name: 'Охотничья куртка',
        desc: 'Куртка из оленьей кожи с накладками на груди (+4 к защите, +2 к физ. урону, +2% к криту, +10 HP).',
        price: 85,
        slot: 'torso',
        type: 'armor',
        classReq: 'ranger',
        reqLevel: 1,
        defense: 4,
        physicalDamage: 2,
        critChance: 2,
        maxHp: 10
    },
    scout_leather_jerkin: {
        id: 'scout_leather_jerkin',
        name: 'Колет следопыта',
        desc: 'Прочная проклеенная кожа с ремнями для снаряжения (+8 к защите, +4 к физ. урону, +4% к криту, +15 HP).',
        price: 160,
        slot: 'torso',
        type: 'armor',
        classReq: 'ranger',
        reqLevel: 6,
        defense: 8,
        physicalDamage: 4,
        critChance: 4,
        maxHp: 15
    },
    ranger_camouflage_armor: {
        id: 'ranger_camouflage_armor',
        name: 'Егерский камуфляжный доспех',
        desc: 'Маскировочная окраска скрывает стрелка в листве и камнях (+12 к защите, +7 к физ. урону, +6% к криту, +25 HP).',
        price: 270,
        slot: 'torso',
        type: 'armor',
        classReq: 'ranger',
        reqLevel: 11,
        defense: 12,
        physicalDamage: 7,
        critChance: 6,
        maxHp: 25
    },
    warden_coat: {
        id: 'warden_coat',
        name: 'Кафтан лесного стража',
        desc: 'Усилен кольчужными вставками в уязвимых зонах (+17 к защите, +11 к физ. урону, +9% к криту, +40 HP).',
        price: 420,
        slot: 'torso',
        type: 'armor',
        classReq: 'ranger',
        reqLevel: 15,
        defense: 17,
        physicalDamage: 11,
        critChance: 9,
        maxHp: 40
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
        reqLevel: 6,
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
        reqLevel: 11,
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
        reqLevel: 15,
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
        reqLevel: 21,
        defense: 18,
        maxHp: 60,
        maxMp: 25,
        icon: Icons.helmet(24)
    },

    // Шлемы / головные уборы Плута (Rogue Helmets)
    thief_bandana: {
        id: 'thief_bandana',
        name: 'Бандана вора',
        desc: 'Скрывает лицо и защищает от пыли (+2 к защите, +2% к криту).',
        price: 40,
        slot: 'head',
        type: 'armor',
        classReq: 'rogue',
        reqLevel: 1,
        defense: 2,
        critChance: 2
    },
    rogue_cowl: {
        id: 'rogue_cowl',
        name: 'Капюшон лазутчика',
        desc: 'Глубокий капюшон, бросающий тень на глаза (+4 к защите, +4% к криту, +3% к уклонению).',
        price: 85,
        slot: 'head',
        type: 'armor',
        classReq: 'rogue',
        reqLevel: 6,
        defense: 4,
        critChance: 4,
        dodgeChance: 3
    },
    shadow_hood: {
        id: 'shadow_hood',
        name: 'Капюшон теней',
        desc: 'Окутывает лицо едва заметной дымкой (+7 к защите, +6% к криту, +5% к уклонению).',
        price: 150,
        slot: 'head',
        type: 'armor',
        classReq: 'rogue',
        reqLevel: 11,
        defense: 7,
        critChance: 6,
        dodgeChance: 5
    },
    assassin_mask: {
        id: 'assassin_mask',
        name: 'Маска безмолвной смерти',
        desc: 'Устрашающая маска гильдии теней (+10 к защите, +9% к криту, +7% к уклонению).',
        price: 250,
        slot: 'head',
        type: 'armor',
        classReq: 'rogue',
        reqLevel: 15,
        defense: 10,
        critChance: 9,
        dodgeChance: 7
    },

    // Головные уборы Чародея (Mage Helmets)
    scholar_cap: {
        id: 'scholar_cap',
        name: 'Шапочка книжника',
        desc: 'Обостряет концентрацию при чтении свитков (+2 к защите, +10 MP, +2 маг. ур.).',
        price: 40,
        slot: 'head',
        type: 'armor',
        classReq: 'mage',
        reqLevel: 1,
        defense: 2,
        maxMp: 10,
        magicDamage: 2
    },
    wizard_hat: {
        id: 'wizard_hat',
        name: 'Остроконечная шляпа мага',
        desc: 'Классическая шляпа волшебника с серебряной пряжкой (+3 к защите, +20 MP, +5 маг. ур.).',
        price: 85,
        slot: 'head',
        type: 'armor',
        classReq: 'mage',
        reqLevel: 6,
        defense: 3,
        maxMp: 20,
        magicDamage: 5
    },
    sorcerer_circlet: {
        id: 'sorcerer_circlet',
        name: 'Диадема чародея',
        desc: 'Обруч с мерцающим сапфиром (+6 к защите, +35 MP, +8 маг. ур.).',
        price: 155,
        slot: 'head',
        type: 'armor',
        classReq: 'mage',
        reqLevel: 11,
        defense: 6,
        maxMp: 35,
        magicDamage: 8
    },
    astral_crown: {
        id: 'astral_crown',
        name: 'Астральный венец тайных сил',
        desc: 'Средоточие чистого магического эфира (+9 к защите, +50 MP, +13 маг. ур.).',
        price: 255,
        slot: 'head',
        type: 'armor',
        classReq: 'mage',
        reqLevel: 15,
        defense: 9,
        maxMp: 50,
        magicDamage: 13
    },

    // Головные уборы Следопыта (Ranger Helmets)
    hunter_cap: {
        id: 'hunter_cap',
        name: 'Шапка зверолова с пером',
        desc: 'Легкий фетровый головной убор с фазаньим пером (+2 к защите, +2% к криту).',
        price: 40,
        slot: 'head',
        type: 'armor',
        classReq: 'ranger',
        reqLevel: 1,
        defense: 2,
        critChance: 2
    },
    scout_coif: {
        id: 'scout_coif',
        name: 'Кожаный койф следопыта',
        desc: 'Облегает голову и шею, защищая от непогоды и стрел (+4 к защите, +3% к криту, +3% к уклонению).',
        price: 85,
        slot: 'head',
        type: 'armor',
        classReq: 'ranger',
        reqLevel: 6,
        defense: 4,
        critChance: 3,
        dodgeChance: 3
    },
    ranger_feathered_hat: {
        id: 'ranger_feathered_hat',
        name: 'Шляпа вольного стрелка',
        desc: 'Широкие поля защищают глаза от солнца и бликов (+7 к защите, +5% к криту, +4% к уклонению).',
        price: 150,
        slot: 'head',
        type: 'armor',
        classReq: 'ranger',
        reqLevel: 11,
        defense: 7,
        critChance: 5,
        dodgeChance: 4
    },
    sniper_hood: {
        id: 'sniper_hood',
        name: 'Капюшон снайпера чащи',
        desc: 'Позволяет идеально сосредоточиться на прицеле (+10 к защите, +8% к криту, +6% к уклонению).',
        price: 250,
        slot: 'head',
        type: 'armor',
        classReq: 'ranger',
        reqLevel: 15,
        defense: 10,
        critChance: 8,
        dodgeChance: 6
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
        reqLevel: 6,
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
        reqLevel: 11,
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
        reqLevel: 15,
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
        reqLevel: 21,
        defense: 16,
        maxHp: 55,
        dodgeChance: 6,
        icon: Icons.pants(24)
    },

    // Поножи Плута (Rogue Legs)
    thief_breeches: {
        id: 'thief_breeches',
        name: 'Штаны вора',
        desc: 'Свободные брюки из темной шерсти (+2 к защите, +3% к уклонению).',
        price: 38,
        slot: 'legs',
        type: 'armor',
        classReq: 'rogue',
        reqLevel: 1,
        defense: 2,
        dodgeChance: 3
    },
    shadow_pants: {
        id: 'shadow_pants',
        name: 'Теневые штаны плута',
        desc: 'Не стесняют быстрых акробатических кувырков (+4 к защите, +5% к уклонению).',
        price: 80,
        slot: 'legs',
        type: 'armor',
        classReq: 'rogue',
        reqLevel: 6,
        defense: 4,
        dodgeChance: 5
    },
    assassin_trousers: {
        id: 'assassin_trousers',
        name: 'Штаны бесшумного шага',
        desc: 'Усилены кожаными накладками на бедрах (+6 к защите, +7% к уклонению, +3% к криту).',
        price: 145,
        slot: 'legs',
        type: 'armor',
        classReq: 'rogue',
        reqLevel: 11,
        defense: 6,
        dodgeChance: 7,
        critChance: 3
    },
    nightstalker_pants: {
        id: 'nightstalker_pants',
        name: 'Поножи ночного фантома',
        desc: 'Ткань поглощает свет и звуки шагов (+9 к защите, +10% к уклонению, +5% к криту).',
        price: 240,
        slot: 'legs',
        type: 'armor',
        classReq: 'rogue',
        reqLevel: 15,
        defense: 9,
        dodgeChance: 10,
        critChance: 5
    },

    // Поножи / Одежды ног Чародея (Mage Legs)
    mystic_skirts: {
        id: 'mystic_skirts',
        name: 'Подол послушника',
        desc: 'Тканевый подол ученика Академии (+1 к защите, +10 MP, +1 маг. ур.).',
        price: 38,
        slot: 'legs',
        type: 'armor',
        classReq: 'mage',
        reqLevel: 1,
        defense: 1,
        maxMp: 10,
        magicDamage: 1
    },
    elemental_skirts: {
        id: 'elemental_skirts',
        name: 'Одежды стихийного круга',
        desc: 'Свободные юбки с защитными чарами (+3 к защите, +20 MP, +3 маг. ур.).',
        price: 80,
        slot: 'legs',
        type: 'armor',
        classReq: 'mage',
        reqLevel: 6,
        defense: 3,
        maxMp: 20,
        magicDamage: 3
    },
    sorcerer_sarong: {
        id: 'sorcerer_sarong',
        name: 'Шелковые поножи чар',
        desc: 'Покрыты вышитыми обережными письменами (+5 к защите, +30 MP, +5 маг. ур.).',
        price: 145,
        slot: 'legs',
        type: 'armor',
        classReq: 'mage',
        reqLevel: 11,
        defense: 5,
        maxMp: 30,
        magicDamage: 5
    },
    archmage_skirts: {
        id: 'archmage_skirts',
        name: 'Поножи архимага',
        desc: 'Ткань из лунной нити, защищающая от магии (+8 к защите, +45 MP, +8 маг. ур.).',
        price: 240,
        slot: 'legs',
        type: 'armor',
        classReq: 'mage',
        reqLevel: 15,
        defense: 8,
        maxMp: 45,
        magicDamage: 8
    },

    // Поножи Следопыта (Ranger Legs)
    hunter_pants: {
        id: 'hunter_pants',
        name: 'Плотные охотничьи штаны',
        desc: 'Защищают от колючих кустарников и терновника (+2 к защите, +2% к уклонению, +5 HP).',
        price: 38,
        slot: 'legs',
        type: 'armor',
        classReq: 'ranger',
        reqLevel: 1,
        defense: 2,
        dodgeChance: 2,
        maxHp: 5
    },
    scout_trousers: {
        id: 'scout_trousers',
        name: 'Штаны лесного следопыта',
        desc: 'Усилены кожаными щитками на коленях (+4 к защите, +4% к уклонению, +10 HP).',
        price: 85,
        slot: 'legs',
        type: 'armor',
        classReq: 'ranger',
        reqLevel: 6,
        defense: 4,
        dodgeChance: 4,
        maxHp: 10
    },
    ranger_gaiters: {
        id: 'ranger_gaiters',
        name: 'Егерские гамаши',
        desc: 'Прочные походные штаны с крагами (+6 к защите, +6% к уклонению, +15 HP).',
        price: 150,
        slot: 'legs',
        type: 'armor',
        classReq: 'ranger',
        reqLevel: 11,
        defense: 6,
        dodgeChance: 6,
        maxHp: 15
    },
    warden_leggings: {
        id: 'warden_leggings',
        name: 'Поножи лесного стража',
        desc: 'Комбинация вываренной кожи и чешуек (+9 к защите, +8% к уклонению, +25 HP).',
        price: 245,
        slot: 'legs',
        type: 'armor',
        classReq: 'ranger',
        reqLevel: 15,
        defense: 9,
        dodgeChance: 8,
        maxHp: 25
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
        reqLevel: 6,
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
        reqLevel: 11,
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
        reqLevel: 15,
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
        reqLevel: 21,
        defense: 14,
        dodgeChance: 12,
        maxHp: 40,
        icon: Icons.boots(24)
    },

    // Обувь Плута (Rogue Boots)
    soft_leather_shoes: {
        id: 'soft_leather_shoes',
        name: 'Мягкие чувяки плута',
        desc: 'Тонкая подошва помогает ступать беззвучно (+1 к защите, +3% к уклонению).',
        price: 35,
        slot: 'boots',
        type: 'armor',
        classReq: 'rogue',
        reqLevel: 1,
        defense: 1,
        dodgeChance: 3
    },
    shadow_stalker_boots: {
        id: 'shadow_stalker_boots',
        name: 'Сапоги бесшумной поступи',
        desc: 'Бесшумные кожаные ботинки карманника (+3 к защите, +5% к уклонению, +2% к криту).',
        price: 75,
        slot: 'boots',
        type: 'armor',
        classReq: 'rogue',
        reqLevel: 6,
        defense: 3,
        dodgeChance: 5,
        critChance: 2
    },
    assassin_boots: {
        id: 'assassin_boots',
        name: 'Сапоги ассасина',
        desc: 'Удобные ботфорты со скрытым кинжалом в подошве (+5 к защите, +7% к уклонению, +4% к криту).',
        price: 140,
        slot: 'boots',
        type: 'armor',
        classReq: 'rogue',
        reqLevel: 11,
        defense: 5,
        dodgeChance: 7,
        critChance: 4
    },
    phantom_treads: {
        id: 'phantom_treads',
        name: 'Ботфорты фантома',
        desc: 'Следы владельца растворяются в воздухе (+8 к защите, +10% к уклонению, +6% к криту).',
        price: 235,
        slot: 'boots',
        type: 'armor',
        classReq: 'rogue',
        reqLevel: 15,
        defense: 8,
        dodgeChance: 10,
        critChance: 6
    },

    // Обувь Чародея (Mage Boots)
    cloth_slippers: {
        id: 'cloth_slippers',
        name: 'Тканевые туфли ученика',
        desc: 'Удобные туфли для долгих часов в библиотеке (+1 к защите, +10 MP).',
        price: 35,
        slot: 'boots',
        type: 'armor',
        classReq: 'mage',
        reqLevel: 1,
        defense: 1,
        maxMp: 10
    },
    mystic_sandals: {
        id: 'mystic_sandals',
        name: 'Сандалии чароплёта',
        desc: 'Зачарованные ремешки облегчают походку (+3 к защите, +20 MP, +2 маг. ур.).',
        price: 75,
        slot: 'boots',
        type: 'armor',
        classReq: 'mage',
        reqLevel: 6,
        defense: 3,
        maxMp: 20,
        magicDamage: 2
    },
    enchanted_boots: {
        id: 'enchanted_boots',
        name: 'Зачарованные сапоги эфира',
        desc: 'Позволяют мягко скользить по земле (+5 к защите, +30 MP, +4 маг. ур.).',
        price: 140,
        slot: 'boots',
        type: 'armor',
        classReq: 'mage',
        reqLevel: 11,
        defense: 5,
        maxMp: 30,
        magicDamage: 4
    },
    astral_slippers: {
        id: 'astral_slippers',
        name: 'Астральная обувь левитации',
        desc: 'Ноги едва касаются пола при ходьбе (+7 к защите, +45 MP, +7 маг. ур.).',
        price: 235,
        slot: 'boots',
        type: 'armor',
        classReq: 'mage',
        reqLevel: 15,
        defense: 7,
        maxMp: 45,
        magicDamage: 7
    },

    // Обувь Следопыта (Ranger Boots)
    hunter_boots: {
        id: 'hunter_boots',
        name: 'Охотничьи сапоги',
        desc: 'Высокие сапоги с надежным протектором (+2 к защите, +2% к уклонению).',
        price: 38,
        slot: 'boots',
        type: 'armor',
        classReq: 'ranger',
        reqLevel: 1,
        defense: 2,
        dodgeChance: 2
    },
    scout_treads: {
        id: 'scout_treads',
        name: 'Ботфорты следопыта',
        desc: 'Защищают голени при переходах по бурелому (+3 к защите, +4% к уклонению, +5 HP).',
        price: 80,
        slot: 'boots',
        type: 'armor',
        classReq: 'ranger',
        reqLevel: 6,
        defense: 3,
        dodgeChance: 4,
        maxHp: 5
    },
    ranger_swift_boots: {
        id: 'ranger_swift_boots',
        name: 'Быстроходные сапоги егеря',
        desc: 'Даруют легкий упругий шаг по мху и камням (+5 к защите, +6% к уклонению, +10 HP).',
        price: 145,
        slot: 'boots',
        type: 'armor',
        classReq: 'ranger',
        reqLevel: 11,
        defense: 5,
        dodgeChance: 6,
        maxHp: 10
    },
    forest_striders: {
        id: 'forest_striders',
        name: 'Сапоги дубового дозора',
        desc: 'Элитная обувь королевских лучников (+8 к защите, +8% к уклонению, +18 HP).',
        price: 240,
        slot: 'boots',
        type: 'armor',
        classReq: 'ranger',
        reqLevel: 15,
        defense: 8,
        dodgeChance: 8,
        maxHp: 18
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
        reqLevel: 6,
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
        reqLevel: 11,
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
        reqLevel: 16,
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
        reqLevel: 21,
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
        reqLevel: 6,
        heal: 100,
        icon: Icons.potion(24, '#dc2626')
    },
    greater_mp_potion: {
        id: 'greater_mp_potion',
        name: 'Большое зелье маны',
        desc: 'Эссенция звездной лазури: восстанавливает 80 MP.',
        price: 40,
        type: 'potion',
        reqLevel: 6,
        mana: 80,
        icon: Icons.potion(24, '#2563eb')
    },
    stoneskin_scroll: {
        id: 'stoneskin_scroll',
        name: 'Свиток каменной кожи',
        desc: 'Окаменяет плоть, временно даруя несокрушимую стойкость.',
        price: 55,
        type: 'scroll',
        reqLevel: 6,
        icon: Icons.scroll(24)
    },
    full_recovery_potion: {
        id: 'full_recovery_potion',
        name: 'Зелье полного восстановления',
        desc: 'Алхимический эликсир: исцеляет 140 HP и восстанавливает 110 MP.',
        price: 95,
        type: 'potion',
        reqLevel: 11,
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
        reqLevel: 11,
        heal: 70,
        icon: Icons.potion(24, '#ea580c')
    },
    archmage_draught: {
        id: 'archmage_draught',
        name: 'Настой Великого Архимага',
        desc: 'Переполняет чародея чистой арканой: восстанавливает 170 MP.',
        price: 120,
        type: 'potion',
        reqLevel: 16,
        mana: 170,
        icon: Icons.potion(24, '#7c3aed')
    },
    elixir_of_immortality: {
        id: 'elixir_of_immortality',
        name: 'Эликсир вечной жизни',
        desc: 'Легендарное зелье алхимиков: восстанавливает 260 HP и 200 MP.',
        price: 210,
        type: 'potion',
        reqLevel: 21,
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
        reqLevel: 6,
        icon: Icons.urn(24)
    },
    paladin_crusader_cross: {
        id: 'paladin_crusader_cross',
        name: 'Крест паломника',
        desc: 'Золотое распятие с благословением жрицы (+5 защиты, +20 HP).',
        price: 120,
        slot: 'accessory',
        type: 'relic',
        reqLevel: 6,
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
        reqLevel: 6,
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
        reqLevel: 11,
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
        reqLevel: 16,
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
        reqLevel: 21,
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
        reqLevel: 6,
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
        reqLevel: 6,
        buffHp: 50,
        icon: Icons.meat(22)
    },
    dragon_fire_whiskey: {
        id: 'dragon_fire_whiskey',
        name: 'Огненный виски Дракона',
        desc: 'Жгучий напиток с перцем и смолой (+14% крита, +6 к урону).',
        price: 55,
        type: 'food',
        reqLevel: 11,
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
        reqLevel: 16,
        buffHp: 65,
        buffMp: 45,
        icon: Icons.ale(22)
    },

    // =========================================================================
    // БАЗОВАЯ ЭКИПИРОВКА НОВОБРАНЦА (STARTER EQUIPMENT)
    // =========================================================================
    starter_weapon: {
        id: 'starter_weapon',
        name: 'Базовое оружие',
        desc: 'Надежное начальное оружие новобранца (+2 к урону).',
        price: 15,
        slot: 'mainHand',
        type: 'weapon',
        reqLevel: 1,
        rarity: 'common',
        physicalDamage: 2
    },
    starter_tunic: {
        id: 'starter_tunic',
        name: 'Холщовая рубаха',
        desc: 'Простая одежда искателя приключений (+1 к защите).',
        price: 10,
        slot: 'torso',
        type: 'armor',
        reqLevel: 1,
        rarity: 'common',
        defense: 1
    },
    starter_pants: {
        id: 'starter_pants',
        name: 'Походные штаны',
        desc: 'Плотные штаны из грубой ткани (+1 к защите).',
        price: 10,
        slot: 'legs',
        type: 'armor',
        reqLevel: 1,
        rarity: 'common',
        defense: 1
    },
    starter_boots: {
        id: 'starter_boots',
        name: 'Кожаные сапоги',
        desc: 'Удобная обувь для дальних переходов (+1 к защите).',
        price: 10,
        slot: 'boots',
        type: 'armor',
        reqLevel: 1,
        rarity: 'common',
        defense: 1
    },
    starter_shield: {
        id: 'starter_shield',
        name: 'Окованный баклер',
        desc: 'Легкий деревянный щит, обитый железной полосой (+1 к защите).',
        price: 25,
        slot: 'offHand',
        type: 'shield',
        reqLevel: 1,
        rarity: 'common',
        defense: 1
    },

    // =========================================================================
    // УНИКАЛЬНЫЕ РЕДКИЕ ТРОФЕИ МОНСТРОВ (RARE MOB RELICS & DROPS)
    // =========================================================================
    goblin_king_cutlass: {
        id: 'goblin_king_cutlass',
        name: 'Абордажный тесак Гоблина-Короля',
        desc: 'Широкая зазубренная сабля с золоченым эфесом (+8 физ. урона, +7% крита). Редкий трофей гоблинов!',
        price: 120,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'rogue',
        reqLevel: 3,
        rarity: 'uncommon',
        physicalDamage: 8,
        critChance: 7
    },
    gargoyle_stone_shield: {
        id: 'gargoyle_stone_shield',
        name: 'Каменный барельеф Гаргульи',
        desc: 'Тяжелый щит из монолитного базальта (+11 защиты, +25 HP). Редкий трофей каменных стражей!',
        price: 190,
        slot: 'offHand',
        type: 'shield',
        reqLevel: 7,
        rarity: 'rare',
        defense: 11,
        maxHp: 25
    },
    arachna_silk_mantle: {
        id: 'arachna_silk_mantle',
        name: 'Мантия из шелка Арахны',
        desc: 'Невесомая паутинная накидка (+8 защиты, +25 MP, +7% уклонения). Редкий трофей паучихи!',
        price: 210,
        slot: 'torso',
        type: 'armor',
        reqLevel: 8,
        rarity: 'rare',
        defense: 8,
        maxMp: 25,
        dodgeChance: 7
    },
    minotaur_battle_axe: {
        id: 'minotaur_battle_axe',
        name: 'Секира Минотавра-палача',
        desc: 'Огромная зазубренная двусторонняя секира (+16 физ. урона, +8% крита). Редкий трофей подземелья!',
        price: 250,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'warrior',
        reqLevel: 9,
        rarity: 'rare',
        physicalDamage: 16,
        critChance: 8
    },
    bone_golem_ribcage: {
        id: 'bone_golem_ribcage',
        name: 'Костяной панцирь Голема',
        desc: 'Сплетен из огромных позвонков и ребер (+16 защиты, +40 HP). Редкий трофей нежити!',
        price: 330,
        slot: 'torso',
        type: 'armor',
        reqLevel: 12,
        rarity: 'rare',
        defense: 16,
        maxHp: 40
    },
    shadow_assassin_kris: {
        id: 'shadow_assassin_kris',
        name: 'Крис Теневого Убийцы',
        desc: 'Волнообразное ритуальное лезвие (+15 физ. урона, +12% крита, +8% уклонения). Редкий трофей монстра!',
        price: 270,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'rogue',
        reqLevel: 13,
        rarity: 'rare',
        physicalDamage: 15,
        critChance: 12,
        dodgeChance: 8
    },
    hydra_scale_boots: {
        id: 'hydra_scale_boots',
        name: 'Сапоги из чешуи Гидры',
        desc: 'Сшиты из кожи болотной гидры (+8 защиты, +10% уклонения, +25 HP). Редкий трофей чудовища!',
        price: 250,
        slot: 'boots',
        type: 'armor',
        reqLevel: 14,
        rarity: 'rare',
        defense: 8,
        dodgeChance: 10,
        maxHp: 25
    },
    death_knight_helm: {
        id: 'death_knight_helm',
        name: 'Шлем Рыцаря Смерти',
        desc: 'Черненый рогатый шлем с багровым визором (+14 защиты, +6 физ. урона, +6% крита). Редкий трофей тьмы!',
        price: 390,
        slot: 'head',
        type: 'armor',
        reqLevel: 17,
        rarity: 'epic',
        defense: 14,
        physicalDamage: 6,
        critChance: 6
    },
    clockwork_titan_greaves: {
        id: 'clockwork_titan_greaves',
        name: 'Поножи Часового Титана',
        desc: 'Латунные пластины с часовым сервоприводом (+15 защиты, +35 HP). Редкий трофей автоматонов!',
        price: 350,
        slot: 'legs',
        type: 'armor',
        reqLevel: 18,
        rarity: 'epic',
        defense: 15,
        maxHp: 35
    },
    archlich_skull_staff: {
        id: 'archlich_skull_staff',
        name: 'Черепной посох Архилича',
        desc: 'Венчан пылающим некромантическим черепом (+25 маг. урона, +45 MP, +8% крита). Редкий трофей лича!',
        price: 470,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'mage',
        reqLevel: 19,
        rarity: 'epic',
        magicDamage: 25,
        maxMp: 45,
        critChance: 8
    },
    magma_colossus_core: {
        id: 'magma_colossus_core',
        name: 'Ядро Магматического Колосса',
        desc: 'Пылающее вулканическое сердце (+9 физ. урона, +9 маг. урона, +50 HP). Редкий трофей огня!',
        price: 510,
        slot: 'accessory',
        type: 'relic',
        reqLevel: 20,
        rarity: 'epic',
        physicalDamage: 9,
        magicDamage: 9,
        maxHp: 50
    },
    void_avatar_crown: {
        id: 'void_avatar_crown',
        name: 'Венец Аватара Бездны',
        desc: 'Парящие осколки чистого пустотного аметиста (+20 защиты, +16 маг. урона, +60 MP). Реликвия глубин!',
        price: 700,
        slot: 'head',
        type: 'armor',
        reqLevel: 24,
        rarity: 'legendary',
        defense: 20,
        magicDamage: 16,
        maxMp: 60
    },
    // =========================================================================
    // ЭКСКЛЮЗИВНОЕ ВЫСОКОУРОВНЕВОЕ СНАРЯЖЕНИЕ ПОДЗЕМЕЛЬЯ (DUNGEON EXCLUSIVES)
    // =========================================================================

    // ОРУЖИЕ
    obsidian_flame_edge: {
        id: 'obsidian_flame_edge',
        name: 'Обсидиановый пламенный тесак',
        desc: 'Высечен из вулканического стекла разломов (+28 физ. урона, +10% крита, +25 HP). Эксклюзив катакомб!',
        price: 380,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'warrior',
        reqLevel: 14,
        rarity: 'rare',
        physicalDamage: 28,
        critChance: 10,
        maxHp: 25
    },
    crystallized_venom_rapier: {
        id: 'crystallized_venom_rapier',
        name: 'Хрустальная рапира яда',
        desc: 'Тончайший клинок из кристаллизованного яда (+30 физ. урона, +15% крита, +8% уклонения). Эксклюзив глубин!',
        price: 430,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'rogue',
        reqLevel: 16,
        rarity: 'rare',
        physicalDamage: 30,
        critChance: 15,
        dodgeChance: 8
    },
    starlight_silver_bow: {
        id: 'starlight_silver_bow',
        name: 'Звездный лук лунного света',
        desc: 'Натянут тетивой из чистого астрального света (+34 физ. урона, +12% крита, +6% уклонения). Эксклюзив подземелья!',
        price: 490,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'ranger',
        reqLevel: 18,
        rarity: 'epic',
        physicalDamage: 34,
        critChance: 12,
        dodgeChance: 6
    },
    abyssal_reaper_scythe: {
        id: 'abyssal_reaper_scythe',
        name: 'Коса Жнеца Бездны',
        desc: 'Искривляет пространство и вытягивает жизнь врагов (+38 физ. урона, +20 маг. урона, +40 HP). Эксклюзив недр!',
        price: 580,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'warrior',
        reqLevel: 20,
        rarity: 'epic',
        physicalDamage: 38,
        magicDamage: 20,
        maxHp: 40
    },
    celestial_judgment_hammer: {
        id: 'celestial_judgment_hammer',
        name: 'Молот Небесного Суда',
        desc: 'Освященный боевой молот паладинов солнца (+44 физ. урона, +14% крита, +60 HP). Эксклюзив глубин!',
        price: 660,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'warrior',
        reqLevel: 22,
        rarity: 'epic',
        physicalDamage: 44,
        critChance: 14,
        maxHp: 60
    },
    void_singularity_orb: {
        id: 'void_singularity_orb',
        name: 'Сфера сингулярности Пустоты',
        desc: 'Сжимает гравитацию и аннигилирует врагов (+46 маг. урона, +90 MP, +10% крита). Эксклюзив Бездны!',
        price: 740,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'mage',
        reqLevel: 24,
        rarity: 'epic',
        magicDamage: 46,
        maxMp: 90,
        critChance: 10
    },
    phoenix_feather_longbow: {
        id: 'phoenix_feather_longbow',
        name: 'Лук из пера Феникса',
        desc: 'Пылающие крылья бессмертной птицы (+48 физ. урона, +18% крита, +10% уклонения). Легендарный эксклюзив!',
        price: 820,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'ranger',
        reqLevel: 26,
        rarity: 'legendary',
        physicalDamage: 48,
        critChance: 18,
        dodgeChance: 10
    },
    dragon_god_fang: {
        id: 'dragon_god_fang',
        name: 'Клык Драконьего Владыки',
        desc: 'Вырванный клык прародителя ящеров (+54 физ. урона, +20% крита, +100 HP). Легендарный эксклюзив!',
        price: 930,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'warrior',
        reqLevel: 27,
        rarity: 'legendary',
        physicalDamage: 54,
        critChance: 20,
        maxHp: 100
    },
    demigod_genesis_blade: {
        id: 'demigod_genesis_blade',
        name: 'Клинок Сотворения Миров',
        desc: 'Абсолютное оружие Забытого Полубога (+62 физ. урона, +35 маг. урона, +25% крита, +120 HP, +80 MP). Реликвия 30 этажа!',
        price: 1200,
        slot: 'mainHand',
        type: 'weapon',
        classReq: 'warrior',
        reqLevel: 29,
        rarity: 'legendary',
        physicalDamage: 62,
        magicDamage: 35,
        critChance: 25,
        maxHp: 120,
        maxMp: 80
    },

    // ЩИТЫ
    aegis_of_the_immortal_sun: {
        id: 'aegis_of_the_immortal_sun',
        name: 'Эгида Бессмертного Солнца',
        desc: 'Ослепляет врагов и возвращает ярость в ответ (+22 защиты, +60 HP, +8% крита). Эксклюзив подземелья!',
        price: 520,
        slot: 'offHand',
        type: 'shield',
        reqLevel: 18,
        rarity: 'epic',
        defense: 22,
        maxHp: 60,
        critChance: 8
    },
    mirror_of_oblivion: {
        id: 'mirror_of_oblivion',
        name: 'Зеркальный щит Забвения',
        desc: 'Поглощает и рассеивает заклинания чудовищ (+28 защиты, +80 MP, +10% уклонения). Эксклюзив Бездны!',
        price: 760,
        slot: 'offHand',
        type: 'shield',
        reqLevel: 24,
        rarity: 'epic',
        defense: 28,
        maxMp: 80,
        dodgeChance: 10
    },
    titan_colossus_wall: {
        id: 'titan_colossus_wall',
        name: 'Стена Колосса-Титана',
        desc: 'Нерушимый монолитный бастион древних строителей (+36 защиты, +140 HP). Легендарный эксклюзив глубин!',
        price: 980,
        slot: 'offHand',
        type: 'shield',
        reqLevel: 28,
        rarity: 'legendary',
        defense: 36,
        maxHp: 140
    },

    // ШЛЕМЫ
    crown_of_the_ancient_lich: {
        id: 'crown_of_the_ancient_lich',
        name: 'Корона Древнего Лича',
        desc: 'Шепчет древние проклятия и восстанавливает чары (+18 защиты, +15 маг. урона, +70 MP). Эксклюзив подземелья!',
        price: 510,
        slot: 'head',
        type: 'armor',
        reqLevel: 18,
        rarity: 'epic',
        defense: 18,
        magicDamage: 15,
        maxMp: 70
    },
    dragon_scale_visage: {
        id: 'dragon_scale_visage',
        name: 'Личина Драконьей Ярости',
        desc: 'Кованый шлем с драконьими рогами (+24 защиты, +8 физ. урона, +10% крита, +80 HP). Эксклюзив глубин!',
        price: 710,
        slot: 'head',
        type: 'armor',
        reqLevel: 23,
        rarity: 'epic',
        defense: 24,
        physicalDamage: 8,
        critChance: 10,
        maxHp: 80
    },
    halo_of_the_fallen_seraph: {
        id: 'halo_of_the_fallen_seraph',
        name: 'Оскверненный Нимб Серафима',
        desc: 'Венец падшего небожителя (+30 защиты, +22 маг. урона, +110 MP). Легендарная реликвия Бездны!',
        price: 940,
        slot: 'head',
        type: 'armor',
        reqLevel: 28,
        rarity: 'legendary',
        defense: 30,
        magicDamage: 22,
        maxMp: 110
    },

    // ДОСПЕХИ (ТОРС)
    astral_weave_robe: {
        id: 'astral_weave_robe',
        name: 'Мантия Астрального Сплетения',
        desc: 'Ткань из мерцающих нитей звезд (+18 защиты, +18 маг. урона, +90 MP, +10% уклонения). Эксклюзив подземелья!',
        price: 530,
        slot: 'torso',
        type: 'armor',
        reqLevel: 18,
        rarity: 'epic',
        defense: 18,
        magicDamage: 18,
        maxMp: 90,
        dodgeChance: 10
    },
    demonic_carapace: {
        id: 'demonic_carapace',
        name: 'Панцирь Архидемона Баалхора',
        desc: 'Кованый панцирь инфернального повелителя (+28 защиты, +12 физ. урона, +100 HP). Эксклюзив глубин!',
        price: 690,
        slot: 'torso',
        type: 'armor',
        reqLevel: 22,
        rarity: 'epic',
        defense: 28,
        physicalDamage: 12,
        maxHp: 100
    },
    cuirass_of_the_unbroken: {
        id: 'cuirass_of_the_unbroken',
        name: 'Кираса Несломленного Героя',
        desc: 'Платиновые несокрушимые латы с золотым львом (+38 защиты, +160 HP). Легендарный эксклюзив глубин!',
        price: 920,
        slot: 'torso',
        type: 'armor',
        reqLevel: 26,
        rarity: 'legendary',
        defense: 38,
        maxHp: 160
    },
    regalia_of_genesis: {
        id: 'regalia_of_genesis',
        name: 'Одеяние Первородного Творца',
        desc: 'Священный доспех сотворения (+44 защиты, +15 физ. урона, +25 маг. урона, +180 HP, +120 MP). Реликвия 30 этажа!',
        price: 1350,
        slot: 'torso',
        type: 'armor',
        reqLevel: 29,
        rarity: 'legendary',
        defense: 44,
        physicalDamage: 15,
        magicDamage: 25,
        maxHp: 180,
        maxMp: 120
    },

    // ПОНОЖИ
    shadow_walker_leggings: {
        id: 'shadow_walker_leggings',
        name: 'Поножи Тенехода',
        desc: 'Позволяют скользить среди теней незамеченным (+16 защиты, +12% уклонения, +6% крита). Эксклюзив подземелья!',
        price: 460,
        slot: 'legs',
        type: 'armor',
        reqLevel: 17,
        rarity: 'rare',
        defense: 16,
        dodgeChance: 12,
        critChance: 6
    },
    abyssal_greaves_of_terror: {
        id: 'abyssal_greaves_of_terror',
        name: 'Наголенники Ужаса Бездны',
        desc: 'Шипастые пластины темной бездны (+26 защиты, +70 HP, +8 физ. урона). Эксклюзив глубин!',
        price: 720,
        slot: 'legs',
        type: 'armor',
        reqLevel: 24,
        rarity: 'epic',
        defense: 26,
        maxHp: 70,
        physicalDamage: 8
    },
    greaves_of_the_demigod: {
        id: 'greaves_of_the_demigod',
        name: 'Поножи Забытого Полубога',
        desc: 'Золотые латы с лазурными искрами творения (+32 защиты, +100 HP, +10% уклонения). Легендарный эксклюзив!',
        price: 960,
        slot: 'legs',
        type: 'armor',
        reqLevel: 28,
        rarity: 'legendary',
        defense: 32,
        maxHp: 100,
        dodgeChance: 10
    },

    // САПОГИ
    boots_of_the_infernal_stride: {
        id: 'boots_of_the_infernal_stride',
        name: 'Сапоги Инфернального Шага',
        desc: 'Оставляют пылающий след расплавленной лавы (+16 защиты, +6 физ. урона, +8% уклонения). Эксклюзив глубин!',
        price: 520,
        slot: 'boots',
        type: 'armor',
        reqLevel: 19,
        rarity: 'epic',
        defense: 16,
        physicalDamage: 6,
        dodgeChance: 8
    },
    boots_of_omnipresence: {
        id: 'boots_of_omnipresence',
        name: 'Сапоги Вездесущности',
        desc: 'Стирают грань расстояний (+22 защиты, +18% уклонения, +8% крита). Легендарный эксклюзив!',
        price: 840,
        slot: 'boots',
        type: 'armor',
        reqLevel: 25,
        rarity: 'legendary',
        defense: 22,
        dodgeChance: 18,
        critChance: 8
    },
    striders_of_creation: {
        id: 'striders_of_creation',
        name: 'Поступь Творца',
        desc: 'Божественные сапоги небожителя (+28 защиты, +90 HP, +60 MP, +15% уклонения). Реликвия 30 этажа!',
        price: 1100,
        slot: 'boots',
        type: 'armor',
        reqLevel: 29,
        rarity: 'legendary',
        defense: 28,
        maxHp: 90,
        maxMp: 60,
        dodgeChance: 15
    },

    // РЕЛИКВИИ / АКСЕССУАРЫ
    heart_of_the_abyss: {
        id: 'heart_of_the_abyss',
        name: 'Сердце Первозданной Бездны',
        desc: 'Пульсирующее средоточие пустоты (+16 физ. урона, +16 маг. урона, +100 HP, +100 MP). Легендарный эксклюзив!',
        price: 890,
        slot: 'accessory',
        type: 'relic',
        reqLevel: 26,
        rarity: 'legendary',
        physicalDamage: 16,
        magicDamage: 16,
        maxHp: 100,
        maxMp: 100
    },
    genesis_spark_amulet: {
        id: 'genesis_spark_amulet',
        name: 'Искра Сотворения',
        desc: 'Первородная частица вселенной (+20 физ. урона, +25 маг. урона, +15% крита, +150 HP). Реликвия 30 этажа!',
        price: 1250,
        slot: 'accessory',
        type: 'relic',
        reqLevel: 29,
        rarity: 'legendary',
        physicalDamage: 20,
        magicDamage: 25,
        critChance: 15,
        maxHp: 150
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
                // 1 уровень (Новобранец: Воин, Плут, Чародей, Следопыт)
                'iron_broadsword', 'hunting_dagger', 'apprentice_staff', 'ash_shortbow', 'reinforced_shield',
                // Комплект Воина ур. 1
                'chainmail_vest', 'iron_helmet', 'leather_reinforced_pants', 'sturdy_leather_boots',
                // Комплект Плута ур. 1
                'thief_leather_vest', 'thief_bandana', 'thief_breeches', 'soft_leather_shoes',
                // Комплект Чародея ур. 1
                'apprentice_robe', 'scholar_cap', 'mystic_skirts', 'cloth_slippers',
                // Комплект Следопыта ур. 1
                'hunter_tunic', 'hunter_cap', 'hunter_pants', 'hunter_boots',

                // 6 уровень (Опытный боец)
                'steel_claymore', 'assassin_stiletto', 'elemental_wand', 'yew_longbow', 'knight_kite_shield',
                // Комплект Воина ур. 6
                'scale_mail_cuirass', 'steel_visored_helm', 'steel_greaves', 'iron_plated_boots',
                // Комплект Плута ур. 6
                'shadow_leather_armor', 'rogue_cowl', 'shadow_pants', 'shadow_stalker_boots',
                // Комплект Чародея ур. 6
                'elemental_robe', 'wizard_hat', 'elemental_skirts', 'mystic_sandals',
                // Комплект Следопыта ур. 6
                'scout_leather_jerkin', 'scout_coif', 'scout_trousers', 'scout_treads',

                // 11 уровень (Ветеран)
                'runic_bastard_sword', 'viper_fang_blade', 'storm_caller_staff', 'composite_scout_bow', 'iron_bastion_aegis',
                // Комплект Воина ур. 11
                'knight_plate_armor', 'crusader_great_helm', 'plate_knight_greaves', 'boots_of_the_wind',
                // Комплект Плута ур. 11
                'assassin_garb', 'shadow_hood', 'assassin_trousers', 'assassin_boots',
                // Комплект Чародея ур. 11
                'sorcerer_vestments', 'sorcerer_circlet', 'sorcerer_sarong', 'enchanted_boots',
                // Комплект Следопыта ур. 11
                'ranger_camouflage_armor', 'ranger_feathered_hat', 'ranger_gaiters', 'ranger_swift_boots',

                // 15 уровень (Мастер)
                'mithril_abyss_blade', 'shadow_kris', 'void_archmage_sceptre', 'phantom_hunting_crossbow', 'mithril_tower_shield',
                // Комплект Воина ур. 15
                'mithril_cuirass_of_titans', 'runic_crown_of_justice', 'mithril_leg_guards', 'mithril_treads',
                // Комплект Плута ур. 15
                'nightstalker_tunic', 'assassin_mask', 'nightstalker_pants', 'phantom_treads',
                // Комплект Чародея ур. 15
                'archmage_robe', 'astral_crown', 'archmage_skirts', 'astral_slippers',
                // Комплект Следопыта ур. 15
                'warden_coat', 'sniper_hood', 'warden_leggings', 'forest_striders'
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

    // Целевой уровень дропа динамически растет по 30 этажам катакомб
    let targetLevel = 1;
    if (isBoss) {
        targetLevel = Math.min(30, Math.max(2, Math.round(dungeonFloor * 1.05)));
    } else if (isHardened) {
        targetLevel = Math.min(28, Math.max(1, Math.round(dungeonFloor * 0.95)));
    } else {
        targetLevel = Math.min(26, Math.max(1, Math.round(dungeonFloor * 0.85)));
    }

    const minLevel = Math.max(1, targetLevel - 6);

    // Собираем кандидатов из базы предметов
    const pool = Object.values(ITEMS_DATABASE).filter(item => {
        if (item.type === 'food') return false;
        if (isBoss) {
            return (item.type === 'weapon' || item.type === 'armor' || item.type === 'shield' || item.type === 'relic')
                && item.reqLevel <= targetLevel && item.reqLevel >= minLevel;
        }
        return item.reqLevel <= targetLevel && item.reqLevel >= minLevel;
    });

    if (pool.length === 0) {
        return { ...ITEMS_DATABASE.hp_potion };
    }

    const picked = pool[Math.floor(Math.random() * pool.length)];
    return { ...picked };
}

/**
 * Вычисляет, выпадет ли из поверженного монстра уникальная редкая экипировка.
 * Шанс: босс ~25%, элитный ~12%, обычный ~5%.
 */
export function getMobRareDrop(monster, floorNum = 1) {
    if (!monster) return null;

    const isBoss = (monster.tier === 'boss' || monster.tier === 'final_boss');
    const isHardened = (monster.tier === 'hardened');
    const roll = Math.random();
    const threshold = isBoss ? 0.25 : (isHardened ? 0.12 : 0.05);

    if (roll >= threshold) return null;

    const name = (monster.fullName || monster.name || '').toLowerCase();
    const id = (monster.id || '').toLowerCase();

    let candidateId = null;

    if (name.includes('минотавр') || id.includes('minotaur')) {
        candidateId = 'minotaur_battle_axe';
    } else if (name.includes('паук') || name.includes('арахн') || id.includes('spider')) {
        candidateId = 'arachna_silk_mantle';
    } else if (name.includes('гаргулья') || id.includes('gargoyle')) {
        candidateId = 'gargoyle_stone_shield';
    } else if (name.includes('голем') || name.includes('скелет') || id.includes('skeleton') || id.includes('golem')) {
        candidateId = 'bone_golem_ribcage';
    } else if (name.includes('рыцарь') || id.includes('knight')) {
        candidateId = 'death_knight_helm';
    } else if (name.includes('лич') || name.includes('некромант') || id.includes('lich')) {
        candidateId = 'archlich_skull_staff';
    } else if (name.includes('ассасин') || name.includes('культист') || name.includes('тень') || id.includes('shadow')) {
        candidateId = 'shadow_assassin_kris';
    } else if (name.includes('гидра') || id.includes('hydra')) {
        candidateId = 'hydra_scale_boots';
    } else if (name.includes('гоблин') || id.includes('goblin')) {
        candidateId = 'goblin_king_cutlass';
    } else if (name.includes('колосс') || name.includes('магм') || id.includes('colossus')) {
        candidateId = 'magma_colossus_core';
    } else if (name.includes('титан') || id.includes('titan')) {
        candidateId = 'clockwork_titan_greaves';
    } else if (name.includes('бездна') || name.includes('владыка') || id.includes('void')) {
        candidateId = 'void_avatar_crown';
    } else {
        // Если монстр не имеет точной привязки, выбираем из пула редких предметов по этажу
        const rarePool = [
            'goblin_king_cutlass', 'minotaur_battle_axe', 'arachna_silk_mantle', 'gargoyle_stone_shield',
            'bone_golem_ribcage', 'shadow_assassin_kris', 'hydra_scale_boots',
            'death_knight_helm', 'archlich_skull_staff', 'magma_colossus_core', 'clockwork_titan_greaves', 'void_avatar_crown'
        ];
        const maxLevel = Math.max(1, Math.min(5, Math.ceil(floorNum / 6)));
        const available = rarePool.filter(itemId => {
            const it = ITEMS_DATABASE[itemId];
            return it && it.reqLevel <= maxLevel;
        });
        if (available.length > 0) {
            candidateId = available[Math.floor(Math.random() * available.length)];
        }
    }

    if (!candidateId || !ITEMS_DATABASE[candidateId]) return null;

    return {
        ...ITEMS_DATABASE[candidateId],
        isRareTrophy: true
    };
}

/**
 * Открытие сундука с сокровищами в катакомбах.
 * Генерирует награду: золото и ценные предметы в зависимости от типа сундука.
 */
export function openDungeonChest(chestType = 'wooden', floorNum = 1) {
    let gold = 0;
    let minItems = 1;
    let maxItems = 2;
    let targetRarities = ['common', 'uncommon'];

    // Максимальный и минимальный уровень снаряжения для сундука с учетом глубины этажа
    let maxLvl = Math.min(30, Math.max(4, Math.round(floorNum * 1.05)));
    let minLvl = Math.max(1, Math.round(floorNum * 0.45) - 3);

    switch (chestType) {
        case 'ancient':
            gold = 250 + Math.floor(Math.random() * 200) + floorNum * 8;
            minItems = 2;
            maxItems = 3;
            targetRarities = ['epic', 'legendary', 'rare'];
            minLvl = Math.max(14, floorNum - 5);
            break;
        case 'gilded':
            gold = 120 + Math.floor(Math.random() * 100) + floorNum * 5;
            minItems = 1;
            maxItems = 2;
            targetRarities = ['rare', 'epic'];
            minLvl = Math.max(8, floorNum - 6);
            break;
        case 'iron':
            gold = 50 + Math.floor(Math.random() * 60) + floorNum * 3;
            minItems = 1;
            maxItems = 2;
            targetRarities = ['uncommon', 'rare'];
            minLvl = Math.max(3, floorNum - 7);
            break;
        case 'wooden':
        default:
            gold = 20 + Math.floor(Math.random() * 30) + floorNum * 2;
            minItems = 1;
            maxItems = 2;
            targetRarities = ['common', 'uncommon'];
            minLvl = 1;
            maxLvl = Math.min(10, maxLvl);
            break;
    }

    // Собираем кандидатов для дропа
    let candidateItems = Object.values(ITEMS_DATABASE).filter(item => {
        if (item.type === 'food') return false;
        if (!targetRarities.includes(item.rarity)) return false;
        return item.reqLevel <= maxLvl && item.reqLevel >= minLvl;
    });

    if (candidateItems.length === 0) {
        candidateItems = Object.values(ITEMS_DATABASE).filter(item => {
            if (item.type === 'food') return false;
            return targetRarities.includes(item.rarity);
        });
    }

    const itemsCount = minItems + Math.floor(Math.random() * (maxItems - minItems + 1));
    const droppedItems = [];

    for (let i = 0; i < itemsCount; i++) {
        if (candidateItems.length > 0) {
            const picked = candidateItems[Math.floor(Math.random() * candidateItems.length)];
            droppedItems.push({ ...picked });
        }
    }

    if (droppedItems.length === 0) {
        droppedItems.push({ ...(ITEMS_DATABASE.greater_hp_potion || ITEMS_DATABASE.hp_potion) });
    }

    return {
        gold,
        items: droppedItems,
        chestType
    };
}

// Автоматическая инициализация редкости и индивидуальных 1:1 иконок экипировки
Object.values(ITEMS_DATABASE).forEach(item => {
    if (!item.rarity) {
        if (item.reqLevel >= 25) item.rarity = 'legendary';
        else if (item.reqLevel >= 18) item.rarity = 'epic';
        else if (item.reqLevel >= 11) item.rarity = 'rare';
        else if (item.reqLevel >= 5) item.rarity = 'uncommon';
        else item.rarity = 'common';
    }
    // Если предмет является экипировкой, генерируем точную 1:1 иконку из EquipmentVisuals
    if (['weapon', 'armor', 'shield', 'accessory', 'relic'].includes(item.type) || item.slot) {
        const customIcon = EquipmentVisuals.getItemIcon(item, 24);
        if (customIcon) {
            item.icon = customIcon;
        }
    }
});