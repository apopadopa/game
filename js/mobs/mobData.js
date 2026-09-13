// База данных 32 уникальных чудовищ катакомб (4 ранга: Обычные, Элитные, Боссы этажей, Финальные боссы)
// Каждое существо поддерживает генератор процедурных вариаций (окрас, одежда, оружие, специализация, умения)

export const MOB_TIERS = {
    REGULAR: 'regular',      // Ряд 1: Обычные обитатели (10 шт)
    HARDENED: 'hardened',    // Ряд 2: Усложненные элитные мобы (10 шт)
    FLOOR_BOSS: 'boss',      // Ряд 3: Боссы этажей (7 шт)
    FINAL_BOSS: 'final_boss' // Ряд 4: Финальные боссы глубин (5 шт)
};

export const MOBS_CATALOG = [
    // =========================================================================
    // РЯД 1: ОБЫЧНЫЕ ОБИТАТЕЛИ ГЛУБИН (10 МОБОВ)
    // =========================================================================
    {
        id: 'goblin_scout',
        tier: MOB_TIERS.REGULAR,
        baseName: 'Пещерный гоблин',
        archetype: 'goblin',
        desc: 'Юркие подземные падальщики, устраивающие засады в тесных расщелинах и усеивающие пол ржавыми колючками.',
        quote: '«Блестит золото, блестит кинжал... отдай карманы, пока дышишь!»',
        baseHp: 65,
        baseDmg: 12,
        baseDef: 4,
        baseSpd: 16,
        variants: [
            { title: 'Ловкий лазутчик', skin: '#4d7c0f', armor: '#78350f', weapon: 'dagger', glow: '#a3e635', elem: 'Яд', ability: 'Отравленное лезвие' },
            { title: 'Гоблин-подрывник', skin: '#65a30d', armor: '#451a03', weapon: 'bomb', glow: '#f97316', elem: 'Огонь', ability: 'Смоляная бомба' },
            { title: 'Пещерный застрельщик', skin: '#3f6212', armor: '#292524', weapon: 'bow', glow: '#84cc16', elem: 'Физический', ability: 'Залп из тени' },
            { title: 'Гоблинский шаман', skin: '#84cc16', armor: '#581c87', weapon: 'wand', glow: '#c084fc', elem: 'Тьма', ability: 'Пляска духов' }
        ]
    },
    {
        id: 'skeleton_infantry',
        tier: MOB_TIERS.REGULAR,
        baseName: 'Оживший скелет',
        archetype: 'skeleton',
        desc: 'Останки древних воинов, поднятые тёмной некромантией. В пустых глазницах мерцает зловещее потустороннее пламя.',
        quote: '«Скрип костей... вечный дозор не окончен, смертный.»',
        baseHp: 75,
        baseDmg: 14,
        baseDef: 8,
        baseSpd: 10,
        variants: [
            { title: 'Пехотинец фаланги', skin: '#e2e8f0', armor: '#475569', weapon: 'sword_shield', glow: '#38bdf8', elem: 'Холод', ability: 'Костяной щит' },
            { title: 'Костяной лучник', skin: '#cbd5e1', armor: '#334155', weapon: 'bow', glow: '#a855f7', elem: 'Тьма', ability: 'Пронзающая стрела' },
            { title: 'Двуручный берсерк', skin: '#f1f5f9', armor: '#7f1d1d', weapon: 'greatsword', glow: '#ef4444', elem: 'Кровь', ability: 'Раскалывающий удар' },
            { title: 'Проклятый страж', skin: '#94a3b8', armor: '#1e293b', weapon: 'spear', glow: '#06b6d4', elem: 'Холод', ability: 'Шквал ударов' }
        ]
    },
    {
        id: 'cave_kobold',
        tier: MOB_TIERS.REGULAR,
        baseName: 'Пещерный кобольд',
        archetype: 'kobold',
        desc: 'Чешуйчатые рудокопы с острыми мордами. Они знают каждый туннель и яростно защищают свои драгоценные самородки.',
        quote: '«Свечу не трогай! Кирка копает, кирка убивает!»',
        baseHp: 60,
        baseDmg: 11,
        baseDef: 5,
        baseSpd: 14,
        variants: [
            { title: 'Рудокоп-старатель', skin: '#b45309', armor: '#78350f', weapon: 'pickaxe', glow: '#f59e0b', elem: 'Земля', ability: 'Обвал камней' },
            { title: 'Кобольд-ловушечник', skin: '#92400e', armor: '#451a03', weapon: 'trap', glow: '#fbbf24', elem: 'Физический', ability: 'Капкан с шипами' },
            { title: 'Чешуйчатый фанатик', skin: '#d97706', armor: '#991b1b', weapon: 'torch', glow: '#f97316', elem: 'Огонь', ability: 'Огненное дыхание' },
            { title: 'Подземный проводник', skin: '#78350f', armor: '#374151', weapon: 'dagger', glow: '#10b981', elem: 'Яд', ability: 'Укус гадюки' }
        ]
    },
    {
        id: 'plague_rat',
        tier: MOB_TIERS.REGULAR,
        baseName: 'Чумная крыса',
        archetype: 'rat',
        desc: 'Огромный свирепый грызун размером с волка. Его зубы источают трупный яд, а шерсть кишит спорами заразы.',
        quote: '«Злобный писк раздаётся во тьме перед внезапным броском.»',
        baseHp: 55,
        baseDmg: 15,
        baseDef: 3,
        baseSpd: 18,
        variants: [
            { title: 'Бешеная крыса', skin: '#713f12', armor: '#451a03', weapon: 'fangs', glow: '#dc2626', elem: 'Кровь', ability: 'Бешеный укус' },
            { title: 'Токсичная крыса-мутант', skin: '#365314', armor: '#1a2e05', weapon: 'fangs', glow: '#84cc16', elem: 'Яд', ability: 'Чумное заражение' },
            { title: 'Теневой грызун', skin: '#1c1917', armor: '#0c0a09', weapon: 'claws', glow: '#a855f7', elem: 'Тьма', ability: 'Прыжок из тени' },
            { title: 'Вздувшийся трупоед', skin: '#57534e', armor: '#292524', weapon: 'fangs', glow: '#f59e0b', elem: 'Гниль', ability: 'Трупный взрыв' }
        ]
    },
    {
        id: 'dungeon_slime',
        tier: MOB_TIERS.REGULAR,
        baseName: 'Подземный слизень',
        archetype: 'slime',
        desc: 'Аморфная сгустившаяся масса едкой протоплазмы, переваривающая металл, плоть и кости неосторожных искателей.',
        quote: '«Булькающая вязкая масса медленно расползается по каменным плитам.»',
        baseHp: 85,
        baseDmg: 10,
        baseDef: 12,
        baseSpd: 6,
        variants: [
            { title: 'Кислотный слизень', skin: '#22c55e', armor: '#15803d', weapon: 'acid_spit', glow: '#4ade80', elem: 'Кислота', ability: 'Разъедание брони' },
            { title: 'Магматическая жижа', skin: '#ea580c', armor: '#9a3412', weapon: 'lava_burst', glow: '#fb923c', elem: 'Огонь', ability: 'Огненный плеск' },
            { title: 'Астральный желеобразный', skin: '#8b5cf6', armor: '#6d28d9', weapon: 'void_splash', glow: '#c084fc', elem: 'Тьма', ability: 'Поглощение маны' },
            { title: 'Морозный студень', skin: '#06b6d4', armor: '#0e7490', weapon: 'frost_ooze', glow: '#67e8f9', elem: 'Холод', ability: 'Оледенение' }
        ]
    },
    {
        id: 'dark_cultist',
        tier: MOB_TIERS.REGULAR,
        baseName: 'Тёмный сектант',
        archetype: 'cultist',
        desc: 'Отверженный служитель запретного культа, приносящий жертвы хтоническим божествам в глубинах склепа.',
        quote: '«Славься Бездна! Кровь неверных напоит голодные алтари!»',
        baseHp: 65,
        baseDmg: 16,
        baseDef: 5,
        baseSpd: 11,
        variants: [
            { title: 'Кровавый послушник', skin: '#fecdd3', armor: '#881337', weapon: 'sacrificial_dagger', glow: '#f43f5e', elem: 'Кровь', ability: 'Кровавая жертва' },
            { title: 'Сектант-призыватель', skin: '#e2e8f0', armor: '#3b0764', weapon: 'skull_staff', glow: '#d8b4fe', elem: 'Тьма', ability: 'Призыв червей Бездны' },
            { title: 'Огненный фанатик', skin: '#ffedd5', armor: '#7c2d12', weapon: 'censer', glow: '#fb923c', elem: 'Огонь', ability: 'Жертвенное пламя' },
            { title: 'Вестник проклятий', skin: '#d1fae5', armor: '#064e3b', weapon: 'tome', glow: '#34d399', elem: 'Яд', ability: 'Проклятие увядания' }
        ]
    },
    {
        id: 'cave_spider',
        tier: MOB_TIERS.REGULAR,
        baseName: 'Пещерный паук',
        archetype: 'spider',
        desc: 'Восьминогий хищник с паутиной прочнее шелковой нити и хелицерами, сочащимися парализующим нейротоксином.',
        quote: '«Шорох лапок по потолку... паутина сковывает шаг!»',
        baseHp: 70,
        baseDmg: 13,
        baseDef: 6,
        baseSpd: 15,
        variants: [
            { title: 'Ядозубый паук', skin: '#14532d', armor: '#052e16', weapon: 'chelicerae', glow: '#22c55e', elem: 'Яд', ability: 'Парализующий яд' },
            { title: 'Ткач коконов', skin: '#374151', armor: '#1f2937', weapon: 'web', glow: '#9ca3af', elem: 'Физический', ability: 'Ловчая сеть' },
            { title: 'Пепельный паук', skin: '#450a0a', armor: '#2b0606', weapon: 'chelicerae', glow: '#ef4444', elem: 'Огонь', ability: 'Огненный укус' },
            { title: 'Хрустальный прядильщик', skin: '#0e7490', armor: '#155e75', weapon: 'crystal_legs', glow: '#38bdf8', elem: 'Холод', ability: 'Осколочный плевок' }
        ]
    },
    {
        id: 'animated_armor',
        tier: MOB_TIERS.REGULAR,
        baseName: 'Оживший доспех',
        archetype: 'armor',
        desc: 'Стальные латы павшего паладина, оживленные блуждающим призраком. Пустота внутри лат глухо звенит железом.',
        quote: '«Тяжелая поступь металла, повинующаяся воле призрака.»',
        baseHp: 95,
        baseDmg: 13,
        baseDef: 16,
        baseSpd: 7,
        variants: [
            { title: 'Ржавый стражник', skin: '#78350f', armor: '#92400e', weapon: 'broadsword', glow: '#f59e0b', elem: 'Физический', ability: 'Глухая стойка' },
            { title: 'Проклятый центурион', skin: '#1e293b', armor: '#0f172a', weapon: 'halberd', glow: '#a855f7', elem: 'Тьма', ability: 'Рассекающий взмах' },
            { title: 'Пылающие латы', skin: '#991b1b', armor: '#7f1d1d', weapon: 'mace', glow: '#f97316', elem: 'Огонь', ability: 'Удар горна' },
            { title: 'Рунный латник', skin: '#1e3a8a', armor: '#172554', weapon: 'greatsword', glow: '#60a5fa', elem: 'Магия', ability: 'Барьер рун' }
        ]
    },
    {
        id: 'rot_zombie',
        tier: MOB_TIERS.REGULAR,
        baseName: 'Гниющий мертвец',
        archetype: 'zombie',
        desc: 'Труп незадачливого искателя приключений, поражённый могильной гнилью. Его хватка мертва и непреклонна.',
        quote: '«Могильный смрад возвещает о приближении разлагающейся плоти.»',
        baseHp: 90,
        baseDmg: 12,
        baseDef: 5,
        baseSpd: 6,
        variants: [
            { title: 'Чумной землекоп', skin: '#365314', armor: '#1c1917', weapon: 'rusty_shovel', glow: '#84cc16', elem: 'Гниль', ability: 'Чумная язва' },
            { title: 'Вздувшийся утопленник', skin: '#1e3a8a', armor: '#0f172a', weapon: 'rotten_claws', glow: '#38bdf8', elem: 'Холод', ability: 'Трупные газы' },
            { title: 'Неупокоенный берсерк', skin: '#7f1d1d', armor: '#450a0a', weapon: 'cleaver', glow: '#ef4444', elem: 'Кровь', ability: 'Мёртвая ярость' },
            { title: 'Оскверненный шахтер', skin: '#57534e', armor: '#292524', weapon: 'pickaxe', glow: '#eab308', elem: 'Физический', ability: 'Глухой удар' }
        ]
    },
    {
        id: 'giant_bat',
        tier: MOB_TIERS.REGULAR,
        baseName: 'Пещерный нетопырь',
        archetype: 'bat',
        desc: 'Крылатая тварь с кожистыми перепонками размахом в два метра. Оглушает жертв ультразвуковым воплем.',
        quote: '«Шелест кожистых крыл и пронзительный визг под сводами пещеры.»',
        baseHp: 50,
        baseDmg: 14,
        baseDef: 4,
        baseSpd: 19,
        variants: [
            { title: 'Кровососущий упырь', skin: '#450a0a', armor: '#1c1917', weapon: 'vampiric_fangs', glow: '#f43f5e', elem: 'Кровь', ability: 'Вампиризм' },
            { title: 'Глубинный эхолот', skin: '#1e1b4b', armor: '#0f172a', weapon: 'sonic_screech', glow: '#818cf8', elem: 'Звук', ability: 'Оглушающий крик' },
            { title: 'Ядовитый нетопырь', skin: '#14532d', armor: '#052e16', weapon: 'spitting_spores', glow: '#4ade80', elem: 'Яд', ability: 'Токсичные брызги' },
            { title: 'Сумеречный нетопырь', skin: '#312e81', armor: '#1e1b4b', weapon: 'shadow_wings', glow: '#c084fc', elem: 'Тьма', ability: 'Уворот в тень' }
        ]
    },
    {
        id: 'gnoll_scavenger',
        tier: MOB_TIERS.REGULAR,
        baseName: 'Гнолл-падальщик',
        archetype: 'gnoll',
        desc: 'Свирепый гиеноподобный гуманоид, рыскающий стаями по катакомбам в поисках свежей плоти.',
        quote: '«Зловещий лающий хохот разносится по темным туннелям перед нападением.»',
        baseHp: 80,
        baseDmg: 15,
        baseDef: 7,
        baseSpd: 13,
        variants: [
            { title: 'Степной налётчик', skin: '#a16207', armor: '#78350f', weapon: 'cleaver', glow: '#f59e0b', elem: 'Физический', ability: 'Бешеная разделка' },
            { title: 'Костяной шаман', skin: '#713f12', armor: '#3f3f46', weapon: 'bone_wand', glow: '#c084fc', elem: 'Тьма', ability: 'Вой предков' },
            { title: 'Чумной людоед', skin: '#854d0e', armor: '#14532d', weapon: 'barbed_club', glow: '#84cc16', elem: 'Гниль', ability: 'Заражающий укус' },
            { title: 'Кровавый вожак', skin: '#991b1b', armor: '#451a03', weapon: 'two_daggers', glow: '#ef4444', elem: 'Кровь', ability: 'Жажда крови' }
        ]
    },
    {
        id: 'cave_imp',
        tier: MOB_TIERS.REGULAR,
        baseName: 'Огненный бес',
        archetype: 'imp',
        desc: 'Мелкий крылатый демон с кожистыми крыльями, острым хвостом и горящими углями в ладонях.',
        quote: '«Мерзкое хихиканье и запах серы предупреждают о летящем огненном шаре!»',
        baseHp: 45,
        baseDmg: 17,
        baseDef: 4,
        baseSpd: 19,
        variants: [
            { title: 'Имп-зажигатель', skin: '#dc2626', armor: '#7f1d1d', weapon: 'pitchfork', glow: '#f97316', elem: 'Огонь', ability: 'Огненная искра' },
            { title: 'Теневой чертёнок', skin: '#4c1d95', armor: '#1e1b4b', weapon: 'shadow_dart', glow: '#a855f7', elem: 'Тьма', ability: 'Теневая пакость' },
            { title: 'Пепельный проказник', skin: '#57534e', armor: '#292524', weapon: 'cinder_sling', glow: '#fbbf24', elem: 'Пепел', ability: 'Ослепляющая сажа' },
            { title: 'Лавовый бесёнок', skin: '#ea580c', armor: '#9a3412', weapon: 'lava_orb', glow: '#ef4444', elem: 'Лава', ability: 'Всплеск магмы' }
        ]
    },
    {
        id: 'blind_troglodyte',
        tier: MOB_TIERS.REGULAR,
        baseName: 'Пещерный троглодит',
        archetype: 'troglodyte',
        desc: 'Безглазый пещерный гуманоид с серо-зеленой кожей, ориентирующийся по малейшему звуку эха.',
        quote: '«Он не видит тебя, но слышит стук твоего сердца за сотню шагов.»',
        baseHp: 85,
        baseDmg: 13,
        baseDef: 8,
        baseSpd: 11,
        variants: [
            { title: 'Слепой костедробитель', skin: '#94a3b8', armor: '#475569', weapon: 'stone_maul', glow: '#e2e8f0', elem: 'Земля', ability: 'Глухой сокрушитель' },
            { title: 'Эхо-охотник', skin: '#64748b', armor: '#334155', weapon: 'bone_spear', glow: '#38bdf8', elem: 'Звук', ability: 'Эхолокационный бросок' },
            { title: 'Ядовитый амфибий', skin: '#0d9488', armor: '#115e59', weapon: 'claws', glow: '#2dd4bf', elem: 'Яд', ability: 'Едкая слизь' },
            { title: 'Пещерный людоед', skin: '#475569', armor: '#1e293b', weapon: 'jagged_axe', glow: '#f87171', elem: 'Физический', ability: 'Слепая ярость' }
        ]
    },
    {
        id: 'spore_myconid',
        tier: MOB_TIERS.REGULAR,
        baseName: 'Миконид-споровик',
        archetype: 'myconid',
        desc: 'Разумный прямоходящий гриб с массивной светящейся шляпкой, оберегающий споровые рощи катакомб.',
        quote: '«Тихий шелест спор наполняет воздух удушливым фиолетовым туманом.»',
        baseHp: 90,
        baseDmg: 11,
        baseDef: 10,
        baseSpd: 8,
        variants: [
            { title: 'Токсичный споровик', skin: '#a855f7', armor: '#6b21a8', weapon: 'spore_cloud', glow: '#d8b4fe', elem: 'Яд', ability: 'Паралитический споропад' },
            { title: 'Светящийся грибник', skin: '#06b6d4', armor: '#0e7490', weapon: 'biolum_burst', glow: '#67e8f9', elem: 'Магия', ability: 'Ослепляющая вспышка' },
            { title: 'Кровавый трутовик', skin: '#be123c', armor: '#881337', weapon: 'spore_spikes', glow: '#f43f5e', elem: 'Кровь', ability: 'Кровавая грибница' },
            { title: 'Золотистый лекарь рощи', skin: '#ca8a04', armor: '#854d0e', weapon: 'spore_regen', glow: '#facc15', elem: 'Природа', ability: 'Споровая регенерация' }
        ]
    },
    {
        id: 'demented_miner',
        tier: MOB_TIERS.REGULAR,
        baseName: 'Безумный рудокоп',
        archetype: 'cursed_miner',
        desc: 'Дварф-горняк, потерявший рассудок от мерцания древних проклятых рубинов в забытой штольне.',
        quote: '«Золото... оно зовет меня сквозь камень! Уйди, это моя жила!»',
        baseHp: 95,
        baseDmg: 15,
        baseDef: 11,
        baseSpd: 9,
        variants: [
            { title: 'Одержимый забойщик', skin: '#d97706', armor: '#451a03', weapon: 'heavy_pickaxe', glow: '#f59e0b', elem: 'Физический', ability: 'Раскалывающий замах' },
            { title: 'Фонарщик склепа', skin: '#b45309', armor: '#1c1917', weapon: 'oil_lantern', glow: '#f97316', elem: 'Огонь', ability: 'Огненная лампа' },
            { title: 'Ослепленный кристаллами', skin: '#92400e', armor: '#581c87', weapon: 'gem_drill', glow: '#c084fc', elem: 'Тьма', ability: 'Безумный бур' },
            { title: 'Бронированный бурильщик', skin: '#78350f', armor: '#334155', weapon: 'iron_crowbar', glow: '#94a3b8', elem: 'Земля', ability: 'Глухой нажим' }
        ]
    },
    {
        id: 'earth_elemental_shard',
        tier: MOB_TIERS.REGULAR,
        baseName: 'Осколочный элементаль',
        archetype: 'earth_elemental',
        desc: 'Живое воплощение скалы и минералов, скрепленное гравитационной магией глубин.',
        quote: '«Скрежет гранита и каменный кулак, не знающий усталости.»',
        baseHp: 110,
        baseDmg: 12,
        baseDef: 16,
        baseSpd: 6,
        variants: [
            { title: 'Гранитный крепыш', skin: '#475569', armor: '#1e293b', weapon: 'granite_fist', glow: '#94a3b8', elem: 'Земля', ability: 'Каменный панцирь' },
            { title: 'Песчаный вихрь', skin: '#ca8a04', armor: '#854d0e', weapon: 'sand_blast', glow: '#fde047', elem: 'Песок', ability: 'Песчаная буря' },
            { title: 'Железный булыжник', skin: '#334155', armor: '#0f172a', weapon: 'iron_slug', glow: '#38bdf8', elem: 'Металл', ability: 'Стальная плоть' },
            { title: 'Магматический булыжник', skin: '#7c2d12', armor: '#451a03', weapon: 'lava_touch', glow: '#ea580c', elem: 'Огонь', ability: 'Горящий гравий' }
        ]
    },
    {
        id: 'crystal_scarab',
        tier: MOB_TIERS.REGULAR,
        baseName: 'Хрустальный скарабей',
        archetype: 'crystal_scarab',
        desc: 'Тяжело бронированный подземный жук, питающийся магическими кристаллами и отражающий заклинания.',
        quote: '«Его сапфировый панцирь ослепительно блестит во мраке катакомб.»',
        baseHp: 75,
        baseDmg: 13,
        baseDef: 15,
        baseSpd: 12,
        variants: [
            { title: 'Изумрудный скарабей', skin: '#15803d', armor: '#052e16', weapon: 'mandibles', glow: '#22c55e', elem: 'Яд', ability: 'Кристальные жвала' },
            { title: 'Рубиновый щитоносец', skin: '#be123c', armor: '#4c0519', weapon: 'ruby_horn', glow: '#f43f5e', elem: 'Огонь', ability: 'Преломление луча' },
            { title: 'Аметистовый прядильщик', skin: '#7e22ce', armor: '#3b0764', weapon: 'crystal_spit', glow: '#c084fc', elem: 'Тьма', ability: 'Осколочный залп' },
            { title: 'Сапфировый панцирник', skin: '#0369a1', armor: '#082f49', weapon: 'mandibles', glow: '#38bdf8', elem: 'Холод', ability: 'Ледяной шип' }
        ]
    },
    {
        id: 'crypt_poltergeist',
        tier: MOB_TIERS.REGULAR,
        baseName: 'Буйный полтергейст',
        archetype: 'poltergeist',
        desc: 'Неупокоенный дух хаоса, телекинезом поднимающий в воздух булыжники, цепи и кости павших.',
        quote: '«Вещи вокруг тебя начинают парить в воздухе, а затем со свистом летят в цель!»',
        baseHp: 55,
        baseDmg: 16,
        baseDef: 5,
        baseSpd: 17,
        variants: [
            { title: 'Шумный призрак', skin: '#93c5fd', armor: '#1e3a8a', weapon: 'flying_stones', glow: '#60a5fa', elem: 'Физический', ability: 'Телекинетический шквал' },
            { title: 'Мстительная тень', skin: '#c084fc', armor: '#581c87', weapon: 'floating_skulls', glow: '#e879f9', elem: 'Тьма', ability: 'Призрачный ужас' },
            { title: 'Морозный вихрь', skin: '#a5f3fc', armor: '#0e7490', weapon: 'frost_shards', glow: '#38bdf8', elem: 'Холод', ability: 'Леденящий сквозняк' },
            { title: 'Полтергейст цепей', skin: '#cbd5e1', armor: '#334155', weapon: 'flying_chains', glow: '#f59e0b', elem: 'Металл', ability: 'Удушающие цепи' }
        ]
    },
    {
        id: 'young_basilisk',
        tier: MOB_TIERS.REGULAR,
        baseName: 'Василиск-детёныш',
        archetype: 'young_basilisk',
        desc: 'Восьминогая чешуйчатая ящерица с леденящими желтыми глазами, способная частично превращать плоть в камень.',
        quote: '«Один неверный взгляд на эту тварь — и твои ноги наливаются свинцовой тяжестью.»',
        baseHp: 85,
        baseDmg: 14,
        baseDef: 9,
        baseSpd: 12,
        variants: [
            { title: 'Камнеглазый ползун', skin: '#65a30d', armor: '#365314', weapon: 'petrify_glance', glow: '#a3e635', elem: 'Окаменение', ability: 'Окаменяющий взгляд' },
            { title: 'Ядовитый гребневик', skin: '#15803d', armor: '#14532d', weapon: 'poison_bite', glow: '#4ade80', elem: 'Яд', ability: 'Токсичные клыки' },
            { title: 'Болотный ящер', skin: '#4d7c0f', armor: '#1f2937', weapon: 'tail_swipe', glow: '#84cc16', elem: 'Гниль', ability: 'Хлесткий хвост' },
            { title: 'Пепельный василиск', skin: '#78350f', armor: '#451a03', weapon: 'heat_gaze', glow: '#ea580c', elem: 'Огонь', ability: 'Испепеляющий взор' }
        ]
    },
    {
        id: 'cavern_naga',
        tier: MOB_TIERS.REGULAR,
        baseName: 'Подземная нага',
        archetype: 'water_naga',
        desc: 'Змееподобная воительница из затопленных каналов с ржавым трезубцем и ядовитым жалом.',
        quote: '«Чешуйчатый хвост бесшумно рассекает темные воды подземного акведука.»',
        baseHp: 80,
        baseDmg: 14,
        baseDef: 8,
        baseSpd: 15,
        variants: [
            { title: 'Налётчица глубин', skin: '#0284c7', armor: '#0369a1', weapon: 'rusty_trident', glow: '#38bdf8', elem: 'Вода', ability: 'Водяной выпад' },
            { title: 'Жрица змей', skin: '#0d9488', armor: '#134e4a', weapon: 'coral_staff', glow: '#2dd4bf', elem: 'Яд', ability: 'Ядовитый всплеск' },
            { title: 'Холодная охотница', skin: '#3b82f6', armor: '#1d4ed8', weapon: 'ice_spear', glow: '#93c5fd', elem: 'Холод', ability: 'Ледяной укол' },
            { title: 'Теневая нага', skin: '#6366f1', armor: '#312e81', weapon: 'shadow_daggers', glow: '#a5b4fc', elem: 'Тьма', ability: 'Бросок кобры' }
        ]
    },

    // =========================================================================
    // РЯД 2: УСЛОЖНЁННЫЕ ЭЛИТНЫЕ МОБЫ (20 МОБОВ)
    // =========================================================================
    {
        id: 'orc_berserker',
        tier: MOB_TIERS.HARDENED,
        baseName: 'Орк-берсерк',
        archetype: 'orc',
        desc: 'Массивный зеленокожий исполин с клыкастой пастью, закованный в шипастые латы и размахивающий гигантской секирой.',
        quote: '«КРОВЬ И ЖЕЛЕЗО! Никакой пощады малоросликам!»',
        baseHp: 160,
        baseDmg: 28,
        baseDef: 14,
        baseSpd: 11,
        variants: [
            { title: 'Кровавый мясник', skin: '#3f6212', armor: '#7f1d1d', weapon: 'double_axe', glow: '#dc2626', elem: 'Кровь', ability: 'Кровавый вихрь' },
            { title: 'Железнозубый вождь', skin: '#15803d', armor: '#334155', weapon: 'spiked_club', glow: '#f59e0b', elem: 'Физический', ability: 'Оглушающий сокрушитель' },
            { title: 'Шаман-огнеплюй', skin: '#4d7c0f', armor: '#9a3412', weapon: 'totem_flail', glow: '#f97316', elem: 'Огонь', ability: 'Тотем ярости' },
            { title: 'Чёрный мародёр', skin: '#14532d', armor: '#0f172a', weapon: 'executioner_blade', glow: '#a855f7', elem: 'Тьма', ability: 'Казнь' }
        ]
    },
    {
        id: 'cave_troll',
        tier: MOB_TIERS.HARDENED,
        baseName: 'Пещерный тролль',
        archetype: 'troll',
        desc: 'Громадный горбатый монстр с толстенной бугристой шкурой, способной затягивать раны прямо на глазах.',
        quote: '«Тяжелый каменный кулак сминает щиты и дробит гранит в пыль.»',
        baseHp: 220,
        baseDmg: 32,
        baseDef: 18,
        baseSpd: 7,
        variants: [
            { title: 'Каменнокожий исполин', skin: '#475569', armor: '#1e293b', weapon: 'boulder_fist', glow: '#94a3b8', elem: 'Земля', ability: 'Каменная регенерация' },
            { title: 'Мшистый тролль болот', skin: '#166534', armor: '#14532d', weapon: 'log_club', glow: '#4ade80', elem: 'Яд', ability: 'Ядовитые споры' },
            { title: 'Ледяной тролль расщелин', skin: '#0284c7', armor: '#0369a1', weapon: 'frost_club', glow: '#38bdf8', elem: 'Холод', ability: 'Ледяная кора' },
            { title: 'Пепельный тролль', skin: '#3f3f46', armor: '#7f1d1d', weapon: 'molten_fist', glow: '#f97316', elem: 'Огонь', ability: 'Углистый взрыв' }
        ]
    },
    {
        id: 'crypt_banshee',
        tier: MOB_TIERS.HARDENED,
        baseName: 'Плакальщица склепа',
        archetype: 'banshee',
        desc: 'Бесплотный призрак преданной девы. Её леденящий душу крик заставляет кровь застывать в жилах.',
        quote: '«Её рыдания оборачиваются воплем, разрывающим разум смертного.»',
        baseHp: 130,
        baseDmg: 34,
        baseDef: 8,
        baseSpd: 16,
        variants: [
            { title: 'Воющая банши', skin: '#bae6fd', armor: '#0369a1', weapon: 'wail_scream', glow: '#38bdf8', elem: 'Холод', ability: 'Смертоносный вопль' },
            { title: 'Тень мщения', skin: '#e9d5ff', armor: '#581c87', weapon: 'spectral_touch', glow: '#c084fc', elem: 'Тьма', ability: 'Вытягивание жизни' },
            { title: 'Кровавая невеста', skin: '#fecdd3', armor: '#881337', weapon: 'blood_shroud', glow: '#f43f5e', elem: 'Кровь', ability: 'Алое затмение' },
            { title: 'Призрак пустоты', skin: '#c7d2fe', armor: '#312e81', weapon: 'void_gaze', glow: '#818cf8', elem: 'Бездна', ability: 'Психический шок' }
        ]
    },
    {
        id: 'dungeon_minotaur',
        tier: MOB_TIERS.HARDENED,
        baseName: 'Минотавр глубин',
        archetype: 'minotaur',
        desc: 'Свирепый быкоголовый получеловек гигантского роста. Разбегается и пробивает даже монолитные каменные стены.',
        quote: '«Копыта выбивают искры из камня, рога направлены прямо в сердце.»',
        baseHp: 190,
        baseDmg: 30,
        baseDef: 15,
        baseSpd: 12,
        variants: [
            { title: 'Сокрушитель лабиринта', skin: '#78350f', armor: '#451a03', weapon: 'huge_axe', glow: '#f59e0b', elem: 'Физический', ability: 'Свирепый таран' },
            { title: 'Оскверненный палач', skin: '#1c1917', armor: '#881337', weapon: 'executioner_poleaxe', glow: '#ef4444', elem: 'Кровь', ability: 'Обезглавливание' },
            { title: 'Огнерогий страж', skin: '#9a3412', armor: '#7c2d12', weapon: 'molten_axe', glow: '#f97316', elem: 'Огонь', ability: 'Огненный рывок' },
            { title: 'Обсидиановый бык', skin: '#334155', armor: '#0f172a', weapon: 'stone_cleaver', glow: '#38bdf8', elem: 'Холод', ability: 'Железная поступь' }
        ]
    },
    {
        id: 'void_necromancer',
        tier: MOB_TIERS.HARDENED,
        baseName: 'Некромант Пустоты',
        archetype: 'necromancer',
        desc: 'Магистр тёмных искусств, окружённый кружащимися черепами и черпающий силу из павших душ.',
        quote: '«Смерть — это лишь начало твоего вечного рабства под моим началом!»',
        baseHp: 140,
        baseDmg: 35,
        baseDef: 10,
        baseSpd: 11,
        variants: [
            { title: 'Ткач костей', skin: '#e2e8f0', armor: '#1e1b4b', weapon: 'skull_scythe', glow: '#a855f7', elem: 'Тьма', ability: 'Поднятие мертвецов' },
            { title: 'Повелитель скверны', skin: '#dcfce7', armor: '#064e3b', weapon: 'plague_staff', glow: '#22c55e', elem: 'Яд', ability: 'Трупное заражение' },
            { title: 'Кровавый жрец', skin: '#ffe4e6', armor: '#4c0519', weapon: 'blood_orb', glow: '#f43f5e', elem: 'Кровь', ability: 'Переливание душ' },
            { title: 'Чернокнижник пепла', skin: '#f3f4f6', armor: '#18181b', weapon: 'hellfire_wand', glow: '#ea580c', elem: 'Огонь', ability: 'Адское пламя' }
        ]
    },
    {
        id: 'basalt_gargoyle',
        tier: MOB_TIERS.HARDENED,
        baseName: 'Базальтовая гаргулья',
        archetype: 'gargoyle',
        desc: 'Ожившая статуя с каменными крыльями и когтями из вулканического стекла. В бою превращается в несокрушимый монолит.',
        quote: '«Каменное изваяние расправляет крылья и срывается с карниза.»',
        baseHp: 175,
        baseDmg: 26,
        baseDef: 22,
        baseSpd: 10,
        variants: [
            { title: 'Обсидиановый страж', skin: '#1e293b', armor: '#0f172a', weapon: 'stone_claws', glow: '#60a5fa', elem: 'Магия', ability: 'Каменная форма' },
            { title: 'Кровавая гаргулья', skin: '#450a0a', armor: '#2b0606', weapon: 'sharp_talons', glow: '#f43f5e', elem: 'Кровь', ability: 'Раздирание когтями' },
            { title: 'Пепельная химера', skin: '#27272a', armor: '#18181b', weapon: 'fire_breath', glow: '#f97316', elem: 'Огонь', ability: 'Пепельное дыхание' },
            { title: 'Гаргулья склепа', skin: '#334155', armor: '#1e293b', weapon: 'stone_claws', glow: '#10b981', elem: 'Яд', ability: 'Токсичный пике' }
        ]
    },
    {
        id: 'abyssal_scorpion',
        tier: MOB_TIERS.HARDENED,
        baseName: 'Глубинный скорпион',
        archetype: 'scorpion',
        desc: 'Бронированное чудовище с мощными клешнями и изогнутым жалом, способным пробить рыцарскую кирасу.',
        quote: '«Щёлканье клешней и смертоносное жало, готовое к смертельному уколу.»',
        baseHp: 180,
        baseDmg: 29,
        baseDef: 19,
        baseSpd: 9,
        variants: [
            { title: 'Императорский хитинник', skin: '#172554', armor: '#0f172a', weapon: 'poison_stinger', glow: '#38bdf8', elem: 'Яд', ability: 'Смертельный укол' },
            { title: 'Пепельный скорпион', skin: '#7c2d12', armor: '#451a03', weapon: 'magma_stinger', glow: '#f97316', elem: 'Огонь', ability: 'Лавовое жало' },
            { title: 'Теневой клешнехват', skin: '#1e1b4b', armor: '#0f172a', weapon: 'crushing_claws', glow: '#c084fc', elem: 'Тьма', ability: 'Мёртвый захват' },
            { title: 'Изумрудный токсик', skin: '#14532d', armor: '#052e16', weapon: 'acid_spit', glow: '#22c55e', elem: 'Кислота', ability: 'Кислотный фонтан' }
        ]
    },
    {
        id: 'death_knight',
        tier: MOB_TIERS.HARDENED,
        baseName: 'Рыцарь Смерти',
        archetype: 'death_knight',
        desc: 'Павший воин Света, проклятый служить тьме. Его рунический клинок поглощает тепло и жизнь живых существ.',
        quote: '«Твой свет угаснет здесь. Познай холод вечной ночи!»',
        baseHp: 200,
        baseDmg: 33,
        baseDef: 20,
        baseSpd: 10,
        variants: [
            { title: 'Падший тамплиер', skin: '#334155', armor: '#0f172a', weapon: 'runic_blade', glow: '#06b6d4', elem: 'Холод', ability: 'Ледяной рунический удар' },
            { title: 'Кровавый каратель', skin: '#1c1917', armor: '#450a0a', weapon: 'blood_greatsword', glow: '#dc2626', elem: 'Кровь', ability: 'Удар погибели' },
            { title: 'Рыцарь Бездны', skin: '#1e1b4b', armor: '#09090b', weapon: 'void_spear', glow: '#a855f7', elem: 'Тьма', ability: 'Хватка смерти' },
            { title: 'Проклятый маршал', skin: '#1f2937', armor: '#111827', weapon: 'mace_of_agony', glow: '#eab308', elem: 'Осквернение', ability: 'Аура отчаяния' }
        ]
    },
    {
        id: 'cavern_hydra',
        tier: MOB_TIERS.HARDENED,
        baseName: 'Пещерная гидра',
        archetype: 'hydra',
        desc: 'Многоглавое чешуйчатое пресмыкающееся, чьи пасти изрыгают яд и кислоту синхронным смертоносным залпом.',
        quote: '«Срубишь одну голову — на её месте вырастут две новые!»',
        baseHp: 210,
        baseDmg: 30,
        baseDef: 13,
        baseSpd: 8,
        variants: [
            { title: 'Трёхглавый ядоплюй', skin: '#15803d', armor: '#14532d', weapon: 'multi_bite', glow: '#84cc16', elem: 'Яд', ability: 'Тройной укус' },
            { title: 'Огненная гидра глубин', skin: '#c2410c', armor: '#7c2d12', weapon: 'flame_spit', glow: '#fb923c', elem: 'Огонь', ability: 'Огненное дыхание' },
            { title: 'Ледяная змея бездны', skin: '#0369a1', armor: '#075985', weapon: 'frost_bite', glow: '#38bdf8', elem: 'Холод', ability: 'Ледяной залп' },
            { title: 'Хтоническая гидра', skin: '#581c87', armor: '#3b0764', weapon: 'void_spit', glow: '#c084fc', elem: 'Тьма', ability: 'Дыхание Бездны' }
        ]
    },
    {
        id: 'predator_strangler',
        tier: MOB_TIERS.HARDENED,
        baseName: 'Хищная лоза-душитель',
        archetype: 'strangler',
        desc: 'Плотоядное подземное растение с хищной пастью и шипастыми плетями, оплетающими добычу стальной хваткой.',
        quote: '«Влажные корни шевелятся под ногами, шипы пробивают сапоги.»',
        baseHp: 165,
        baseDmg: 27,
        baseDef: 12,
        baseSpd: 10,
        variants: [
            { title: 'Токсичный бутон', skin: '#166534', armor: '#14532d', weapon: 'thorn_whip', glow: '#22c55e', elem: 'Яд', ability: 'Шипастый захват' },
            { title: 'Кровавый хищник', skin: '#881337', armor: '#4c0519', weapon: 'flesh_jaws', glow: '#f43f5e', elem: 'Кровь', ability: 'Пожирание заживо' },
            { title: 'Споровый гипнотизер', skin: '#5b21b6', armor: '#3730a3', weapon: 'spore_burst', glow: '#c084fc', elem: 'Тьма', ability: 'Сонные споры' },
            { title: 'Пещерный железняк', skin: '#334155', armor: '#1e293b', weapon: 'steel_vines', glow: '#94a3b8', elem: 'Земля', ability: 'Каменное удушение' }
        ]
    },
    {
        id: 'cannibal_ogre',
        tier: MOB_TIERS.HARDENED,
        baseName: 'Огр-людоед',
        archetype: 'ogre',
        desc: 'Одноглазый прожорливый исполин с необъятным брюхом и бревном, утыканным ржавыми мечами.',
        quote: '«Огр голоден! Раздавить кости, выпить мозг!»',
        baseHp: 240,
        baseDmg: 34,
        baseDef: 16,
        baseSpd: 7,
        variants: [
            { title: 'Двуглавый крушитель', skin: '#a16207', armor: '#78350f', weapon: 'spiked_trunk', glow: '#ea580c', elem: 'Физический', ability: 'Двойной сокрушительный удар' },
            { title: 'Чумной людоед', skin: '#3f6212', armor: '#14532d', weapon: 'cleaver_club', glow: '#84cc16', elem: 'Гниль', ability: 'Тлетворное дыхание' },
            { title: 'Пепельный циклоп', skin: '#451a03', armor: '#292524', weapon: 'molten_boulder', glow: '#f97316', elem: 'Огонь', ability: 'Бросок раскаленного валуна' },
            { title: 'Обвешанный черепами вождь', skin: '#713f12', armor: '#450a0a', weapon: 'bone_crusher', glow: '#ef4444', elem: 'Кровь', ability: 'Рёв берсерка' }
        ]
    },
    {
        id: 'abyssal_wyvern',
        tier: MOB_TIERS.HARDENED,
        baseName: 'Глубинная виверна',
        archetype: 'wyvern',
        desc: 'Двуногий крылатый драконид с костяным гребнем и смертоносным ядовитым жалом на кончике хвоста.',
        quote: '«Свист крыльев рассекает воздух катакомб перед смертоносным пике.»',
        baseHp: 190,
        baseDmg: 33,
        baseDef: 14,
        baseSpd: 15,
        variants: [
            { title: 'Токсичная виверна', skin: '#15803d', armor: '#14532d', weapon: 'poison_sting', glow: '#4ade80', elem: 'Яд', ability: 'Смертельный хвост-жало' },
            { title: 'Грозовая виверна', skin: '#1d4ed8', armor: '#1e3a8a', weapon: 'shock_breath', glow: '#60a5fa', elem: 'Молния', ability: 'Электрическое пике' },
            { title: 'Пепельная виверна', skin: '#991b1b', armor: '#450a0a', weapon: 'fire_claws', glow: '#f97316', elem: 'Огонь', ability: 'Огненные когти' },
            { title: 'Теневой охотник сводов', skin: '#312e81', armor: '#1e1b4b', weapon: 'void_swoop', glow: '#c084fc', elem: 'Тьма', ability: 'Внезапный пикирующий удар' }
        ]
    },
    {
        id: 'magma_salamander',
        tier: MOB_TIERS.HARDENED,
        baseName: 'Огненная саламандра',
        archetype: 'salamander',
        desc: 'Рептилия из лавовых разломов, чья чешуя раскалена добела, а след оставляет горящую породу.',
        quote: '«Камень плавится под её когтями, а воздух шипит от нестерпимого жара.»',
        baseHp: 180,
        baseDmg: 31,
        baseDef: 17,
        baseSpd: 11,
        variants: [
            { title: 'Лавовый ползун', skin: '#ea580c', armor: '#9a3412', weapon: 'molten_spit', glow: '#fb923c', elem: 'Лава', ability: 'Лавовая струя' },
            { title: 'Огнерожденная ящерица', skin: '#dc2626', armor: '#7f1d1d', weapon: 'infernal_tail', glow: '#ef4444', elem: 'Огонь', ability: 'Огненный шлейф' },
            { title: 'Обсидиановый пиромант', skin: '#1c1917', armor: '#0c0a09', weapon: 'magma_claws', glow: '#f59e0b', elem: 'Земля', ability: 'Взрыв обсидиана' },
            { title: 'Сероводородный токсик', skin: '#ca8a04', armor: '#854d0e', weapon: 'sulfur_cloud', glow: '#fde047', elem: 'Сера', ability: 'Серный смрад' }
        ]
    },
    {
        id: 'shadow_assassin',
        tier: MOB_TIERS.HARDENED,
        baseName: 'Теневой ассасин',
        archetype: 'shadow_assassin',
        desc: 'Неуловимый клинок темного культа, скользящий сквозь стены и наносящий удары в спину.',
        quote: '«Ты не увидишь его лица... ты почувствуешь лишь холод стали под ребром.»',
        baseHp: 140,
        baseDmg: 38,
        baseDef: 9,
        baseSpd: 20,
        variants: [
            { title: 'Мастер двух клинков', skin: '#1e293b', armor: '#0f172a', weapon: 'dual_poison_blades', glow: '#22c55e', elem: 'Яд', ability: 'Веер ядовитых клинков' },
            { title: 'Клинок Пустоты', skin: '#312e81', armor: '#1e1b4b', weapon: 'void_katars', glow: '#a855f7', elem: 'Тьма', ability: 'Шаг сквозь тень' },
            { title: 'Кровавый потрошитель', skin: '#450a0a', armor: '#1c1917', weapon: 'gutting_daggers', glow: '#f43f5e', elem: 'Кровь', ability: 'Критическое рассечение' },
            { title: 'Призрачный палач', skin: '#0f172a', armor: '#020617', weapon: 'shadow_shuriken', glow: '#38bdf8', elem: 'Холод', ability: 'Ослепляющий бросок' }
        ]
    },
    {
        id: 'bone_golem_construct',
        tier: MOB_TIERS.HARDENED,
        baseName: 'Костяной голем',
        archetype: 'bone_golem',
        desc: 'Ужасающий конструкт из сотен черепов и ребер, скрепленных темной некротической жилой.',
        quote: '«Каждый его шаг сопровождается сухим треском и грохотом сотен ломающихся костей.»',
        baseHp: 230,
        baseDmg: 29,
        baseDef: 21,
        baseSpd: 8,
        variants: [
            { title: 'Многорукий сшиватель', skin: '#f1f5f9', armor: '#cbd5e1', weapon: 'bone_scythe_arms', glow: '#c084fc', elem: 'Смерть', ability: 'Костяной вихрь' },
            { title: 'Черепной монолит', skin: '#e2e8f0', armor: '#94a3b8', weapon: 'skull_cannon', glow: '#38bdf8', elem: 'Холод', ability: 'Костяной залп' },
            { title: 'Оскверненный гигант', skin: '#dcfce7', armor: '#86efac', weapon: 'plague_ribs', glow: '#22c55e', elem: 'Яд', ability: 'Споры тлена' },
            { title: 'Кровавый костенец', skin: '#ffe4e6', armor: '#fda4af', weapon: 'spiked_ribcage', glow: '#ef4444', elem: 'Кровь', ability: 'Костяные шипы возмездия' }
        ]
    },
    {
        id: 'crypt_chimera',
        tier: MOB_TIERS.HARDENED,
        baseName: 'Химера катакомб',
        archetype: 'crypt_chimera',
        desc: 'Жуткий гибрид львиного торса, рогатой козлиной головы и живого змеиного хвоста.',
        quote: '«Рык льва, блеяние безумия и шипение ядовитой змеи звучат одновременно.»',
        baseHp: 200,
        baseDmg: 32,
        baseDef: 15,
        baseSpd: 13,
        variants: [
            { title: 'Огнедышащая химера', skin: '#ca8a04', armor: '#78350f', weapon: 'chimera_breath', glow: '#f97316', elem: 'Огонь', ability: 'Тройное пламя' },
            { title: 'Змеехвостая тварь', skin: '#15803d', armor: '#14532d', weapon: 'snake_tail_strike', glow: '#84cc16', elem: 'Яд', ability: 'Смертоносный укус хвоста' },
            { title: 'Сумеречный хищник', skin: '#312e81', armor: '#1e1b4b', weapon: 'lion_claws', glow: '#a855f7', elem: 'Тьма', ability: 'Свирепый наскок' },
            { title: 'Рогатый пожиратель', skin: '#7c2d12', armor: '#451a03', weapon: 'goat_horns', glow: '#ef4444', elem: 'Физический', ability: 'Бодающий таран' }
        ]
    },
    {
        id: 'intellect_devourer',
        tier: MOB_TIERS.HARDENED,
        baseName: 'Пожиратель интеллекта',
        archetype: 'intellect_devourer',
        desc: 'Жуткое создание, напоминающее пульсирующий мозг на когтистых птичьих лапах. Питается мыслями жертв.',
        quote: '«Оно высасывает воспоминания, оставляя от героя лишь пустое пускающее слюни тело.»',
        baseHp: 150,
        baseDmg: 36,
        baseDef: 11,
        baseSpd: 17,
        variants: [
            { title: 'Псионический хищник', skin: '#e879f9', armor: '#a21caf', weapon: 'mind_blast', glow: '#f472b6', elem: 'Псионика', ability: 'Психический импульс' },
            { title: 'Мозгоед глубин', skin: '#818cf8', armor: '#4338ca', weapon: 'synapse_drain', glow: '#c084fc', elem: 'Тьма', ability: 'Высасывание разума' },
            { title: 'Кошмарный паразит', skin: '#fb7185', armor: '#be123c', weapon: 'cranial_tentacles', glow: '#f43f5e', elem: 'Кровь', ability: 'Ментальный шок' },
            { title: 'Искрящийся синапс', skin: '#38bdf8', armor: '#0284c7', weapon: 'neural_shock', glow: '#67e8f9', elem: 'Молния', ability: 'Нейропаралич' }
        ]
    },
    {
        id: 'four_horned_behemoth',
        tier: MOB_TIERS.HARDENED,
        baseName: 'Пещерный бегемот',
        archetype: 'dungeon_behemoth',
        desc: 'Тяжелобронированный четырёхрогий зверь невероятной массы, разносящий стены туннелей в крошево.',
        quote: '«Когда он разгоняется, даже каменный свод пещеры начинает осыпаться.»',
        baseHp: 250,
        baseDmg: 31,
        baseDef: 23,
        baseSpd: 8,
        variants: [
            { title: 'Бронехребетный таран', skin: '#475569', armor: '#1e293b', weapon: 'quad_horns', glow: '#94a3b8', elem: 'Земля', ability: 'Неудержимый разбег' },
            { title: 'Вулканический крушитель', skin: '#7f1d1d', armor: '#450a0a', weapon: 'magma_crest', glow: '#f97316', elem: 'Огонь', ability: 'Сейсмический толчок' },
            { title: 'Мшистый носорог', skin: '#166534', armor: '#14532d', weapon: 'moss_shield', glow: '#4ade80', elem: 'Природа', ability: 'Броня из плакуна' },
            { title: 'Ледяной бивневик', skin: '#0369a1', armor: '#082f49', weapon: 'frost_tusks', glow: '#38bdf8', elem: 'Холод', ability: 'Ледяной раскол' }
        ]
    },
    {
        id: 'blood_succubus',
        tier: MOB_TIERS.HARDENED,
        baseName: 'Кровавая суккуба',
        archetype: 'succubus',
        desc: 'Крылатая демоница искушения с кошачьей грацией, острыми рожками и огненным хлыстом мучений.',
        quote: '«Один её ласковый шёпот — и меч выпадет из ослабевших пальцев воина.»',
        baseHp: 155,
        baseDmg: 35,
        baseDef: 12,
        baseSpd: 18,
        variants: [
            { title: 'Владычица пыток', skin: '#f43f5e', armor: '#881337', weapon: 'flame_whip', glow: '#fb7185', elem: 'Огонь', ability: 'Огненный хлыст боли' },
            { title: 'Соблазнительница душ', skin: '#c084fc', armor: '#6b21a8', weapon: 'seductive_kiss', glow: '#e879f9', elem: 'Тьма', ability: 'Поцелуй погибели' },
            { title: 'Алая вампиресса', skin: '#fda4af', armor: '#4c0519', weapon: 'blood_drain', glow: '#ef4444', elem: 'Кровь', ability: 'Пылкое объятие' },
            { title: 'Ледяная искусительница', skin: '#bae6fd', armor: '#0369a1', weapon: 'frost_caress', glow: '#38bdf8', elem: 'Холод', ability: 'Замораживающий взор' }
        ]
    },
    {
        id: 'chaos_centaur',
        tier: MOB_TIERS.HARDENED,
        baseName: 'Кентавр-осквернитель',
        archetype: 'chaos_centaur',
        desc: 'Исполинский получеловек-полуконь в черненых доспехах, вооруженный тяжелой глефой и осадным луком.',
        quote: '«Гул копыт возвещает о буре стали и стрел, не знающей промаха.»',
        baseHp: 210,
        baseDmg: 33,
        baseDef: 18,
        baseSpd: 14,
        variants: [
            { title: 'Латный копейщик хаоса', skin: '#78350f', armor: '#1e293b', weapon: 'heavy_glaive', glow: '#f59e0b', elem: 'Физический', ability: 'Растаптывающий наскок' },
            { title: 'Тёмный стрелок орды', skin: '#451a03', armor: '#0f172a', weapon: 'great_recurve_bow', glow: '#a855f7', elem: 'Тьма', ability: 'Залп трёх стрел' },
            { title: 'Пылающий скакун', skin: '#991b1b', armor: '#450a0a', weapon: 'flaming_lance', glow: '#f97316', elem: 'Огонь', ability: 'Огненный таран' },
            { title: 'Оскверненный вождь табуна', skin: '#334155', armor: '#1e1b4b', weapon: 'barbed_flail', glow: '#10b981', elem: 'Яд', ability: 'Свирепый цеп' }
        ]
    },

    // =========================================================================
    // РЯД 3: БОССЫ ЭТАЖЕЙ (7 БОССОВ)
    // =========================================================================
    {
        id: 'archlich_valtora',
        tier: MOB_TIERS.FLOOR_BOSS,
        baseName: 'Архилич Валтора',
        archetype: 'archlich',
        desc: 'Древний правитель погребённого царства, обретший бессмертие в иссушённом теле. Повелевает душами и вечным холодом.',
        quote: '«Ты пришел в мой мавзолей добровольно... так преклони колени перед вечностью!»',
        baseHp: 380,
        baseDmg: 46,
        baseDef: 22,
        baseSpd: 12,
        variants: [
            { title: 'Владыка Ледяного Трона', skin: '#e0f2fe', armor: '#0369a1', weapon: 'frost_orb_staff', glow: '#38bdf8', elem: 'Лед', ability: 'Ледяная погибель' },
            { title: 'Король Праха и Костей', skin: '#f8fafc', armor: '#334155', weapon: 'bone_reaper_staff', glow: '#c084fc', elem: 'Смерть', ability: 'Круг некроза' },
            { title: 'Чернокнижник Ада', skin: '#fef2f2', armor: '#991b1b', weapon: 'flame_phylactery', glow: '#ef4444', elem: 'Огонь', ability: 'Пламя преисподней' }
        ]
    },
    {
        id: 'fallen_inquisitor',
        tier: MOB_TIERS.FLOOR_BOSS,
        baseName: 'Осквернённый Инквизитор',
        archetype: 'inquisitor',
        desc: 'Бывший верховный судия, поглощенный фанатичным пламенем очищения. Сжигает грешников святым и тёмным огнём.',
        quote: '«Каждый твой вдох — ересь! Пламя очистит твою греховную плоть!»',
        baseHp: 350,
        baseDmg: 48,
        baseDef: 25,
        baseSpd: 13,
        variants: [
            { title: 'Каратель Грешников', skin: '#ffedd5', armor: '#7c2d12', weapon: 'flaming_greatsword', glow: '#f97316', elem: 'Священный огонь', ability: 'Праведный костер' },
            { title: 'Судия Бездны', skin: '#f3e8ff', armor: '#3b0764', weapon: 'censor_flail', glow: '#a855f7', elem: 'Тьма', ability: 'Приговор инквизиции' },
            { title: 'Кровавый Инквизитор', skin: '#ffe4e6', armor: '#881337', weapon: 'cleansing_blade', glow: '#f43f5e', elem: 'Кровь', ability: 'Печать покаяния' }
        ]
    },
    {
        id: 'broodmother_arachna',
        tier: MOB_TIERS.FLOOR_BOSS,
        baseName: 'Королева Выводка Арахна',
        archetype: 'broodmother',
        desc: 'Колоссальная паучиха-матриарх, породившая тысячи ядовитых тварей. Её панцирь усеян горящими рубиновыми глазами.',
        quote: '«Шипение тысячи жвал сливается в единый погребальный марш.»',
        baseHp: 420,
        baseDmg: 42,
        baseDef: 24,
        baseSpd: 11,
        variants: [
            { title: 'Матерь Тёмного Роя', skin: '#14532d', armor: '#052e16', weapon: 'toxic_barbs', glow: '#22c55e', elem: 'Яд', ability: 'Призыв выводка' },
            { title: 'Кровавая Ткачиха', skin: '#4c0519', armor: '#2b0606', weapon: 'blood_spinner', glow: '#f43f5e', elem: 'Кровь', ability: 'Паутинный кокон' },
            { title: 'Обсидиановая Матриарх', skin: '#18181b', armor: '#09090b', weapon: 'crystal_stingers', glow: '#a855f7', elem: 'Тьма', ability: 'Кислотный дождь' }
        ]
    },
    {
        id: 'magma_colossus',
        tier: MOB_TIERS.FLOOR_BOSS,
        baseName: 'Магматический Колосс',
        archetype: 'golem',
        desc: 'Ходячая гора из базальта и кипящей лавы, ожившая в недрах тектонического разлома. Каждый шаг сотрясает подземелье.',
        quote: '«Земля стонет под его поступью, воздух раскаляется до предела.»',
        baseHp: 460,
        baseDmg: 44,
        baseDef: 30,
        baseSpd: 7,
        variants: [
            { title: 'Вулканический Титан', skin: '#451a03', armor: '#7c2d12', weapon: 'molten_core', glow: '#f97316', elem: 'Лава', ability: 'Извержение магмы' },
            { title: 'Глубинный Гранитник', skin: '#27272a', armor: '#18181b', weapon: 'stone_fists', glow: '#eab308', elem: 'Земля', ability: 'Сейсмический удар' },
            { title: 'Колосс Инферно', skin: '#7f1d1d', armor: '#450a0a', weapon: 'hellstone_fists', glow: '#ef4444', elem: 'Огонь', ability: 'Огненный метеорит' }
        ]
    },
    {
        id: 'crypt_lord_mortis',
        tier: MOB_TIERS.FLOOR_BOSS,
        baseName: 'Повелитель Склепа Мортис',
        archetype: 'crypt_lord',
        desc: 'Древний повелитель некрополя в короне из черненого серебра, восседающий на троне из тысяч отполированных черепов.',
        quote: '«Твои кости послужат отличным украшением для подножия моего трона.»',
        baseHp: 390,
        baseDmg: 47,
        baseDef: 26,
        baseSpd: 11,
        variants: [
            { title: 'Владыка Тлена', skin: '#1e293b', armor: '#0f172a', weapon: 'crown_of_skulls', glow: '#38bdf8', elem: 'Смерть', ability: 'Могильный хлад' },
            { title: 'Князь Проклятых', skin: '#3b0764', armor: '#1e1b4b', weapon: 'dread_scepter', glow: '#c084fc', elem: 'Тьма', ability: 'Похищение души' },
            { title: 'Багряный Повелитель', skin: '#4c0519', armor: '#1c1917', weapon: 'blood_chalice', glow: '#f43f5e', elem: 'Кровь', ability: 'Кровавая гекатомба' }
        ]
    },
    {
        id: 'mind_flayer_overseer',
        tier: MOB_TIERS.FLOOR_BOSS,
        baseName: 'Пожиратель Разума',
        archetype: 'mind_flayer',
        desc: 'Абберантная сущность с извивающимися щупальцами вокруг клюва, подчиняющая волю смертных психическими волнами.',
        quote: '«Твой разум слаб... отдай мне свои мысли и покорись неизбежному.»',
        baseHp: 340,
        baseDmg: 52,
        baseDef: 18,
        baseSpd: 14,
        variants: [
            { title: 'Псионический Доминатор', skin: '#581c87', armor: '#2e1065', weapon: 'psionic_tendrils', glow: '#d8b4fe', elem: 'Псионика', ability: 'Ментальный разрыв' },
            { title: 'Астральный Иллитид', skin: '#0369a1', armor: '#0c4a6e', weapon: 'void_beacon', glow: '#38bdf8', elem: 'Космос', ability: 'Стирание памяти' },
            { title: 'Паразит Глубин', skin: '#14532d', armor: '#052e16', weapon: 'toxic_tentacles', glow: '#4ade80', elem: 'Яд', ability: 'Контроль разума' }
        ]
    },
    {
        id: 'clockwork_titan',
        tier: MOB_TIERS.FLOOR_BOSS,
        baseName: 'Заводной Титан Древних',
        archetype: 'clockwork_titan',
        desc: 'Реликтовый механизм исчезнувшей цивилизации, работающий на паровых поршнях и пылающем ядре эфира.',
        quote: '«Скрежет шестерён... протокол защиты активирован: уничтожить нарушителя.»',
        baseHp: 440,
        baseDmg: 45,
        baseDef: 32,
        baseSpd: 9,
        variants: [
            { title: 'Паровой Сокрушитель', skin: '#78350f', armor: '#b45309', weapon: 'steam_cannons', glow: '#f59e0b', elem: 'Пар', ability: 'Паровой взрыв' },
            { title: 'Эфирный Страж', skin: '#1e3a8a', armor: '#1d4ed8', weapon: 'arcane_battery', glow: '#60a5fa', elem: 'Электричество', ability: 'Шоковый разряд' },
            { title: 'Хроно-Автоматон', skin: '#334155', armor: '#475569', weapon: 'chronos_hammer', glow: '#a855f7', elem: 'Время', ability: 'Замедление времени' }
        ]
    },

    // =========================================================================
    // РЯД 4: ФИНАЛЬНЫЕ БОССЫ (5 ВЕЛИКИХ ВЛАДЫК)
    // =========================================================================
    {
        id: 'nidhogg_dread_dragon',
        tier: MOB_TIERS.FINAL_BOSS,
        baseName: 'Нидхёгг — Дракон Бездны',
        archetype: 'dragon',
        desc: 'Древний первородный дракон, гложущий корни мира на самом дне катакомб. Размах его перепончатых крыльев застилает небосвод.',
        quote: '«Я спал тысячелетия, пока смертные не потревожили мою бездну... СГОРИ В ПЕПЕЛ!»',
        baseHp: 850,
        baseDmg: 68,
        baseDef: 38,
        baseSpd: 14,
        variants: [
            { title: 'Хтонический Огнедышащий Дракон', skin: '#7f1d1d', armor: '#450a0a', weapon: 'primordial_breath', glow: '#ef4444', elem: 'Первородный огонь', ability: 'Катаклизм Инферно' },
            { title: 'Ледяной Змей Пустоты', skin: '#0c4a6e', armor: '#082f49', weapon: 'absolute_zero_breath', glow: '#38bdf8', elem: 'Абсолютный ноль', ability: 'Вечная мерзлота' },
            { title: 'Теневой Дракон Разложения', skin: '#18181b', armor: '#09090b', weapon: 'void_flame', glow: '#c084fc', elem: 'Бездна', ability: 'Дыхание Энтропии' }
        ]
    },
    {
        id: 'void_avatar',
        tier: MOB_TIERS.FINAL_BOSS,
        baseName: 'Аватар Первородной Тьмы',
        archetype: 'void_avatar',
        desc: 'Бесформенное космическое существо, состоящее из чистой субстанции небытия и поглощающее саму материю пространства.',
        quote: '«Свет — лишь мимолетная ошибка мироздания. Тьма была первой, и тьма останется последней.»',
        baseHp: 780,
        baseDmg: 74,
        baseDef: 35,
        baseSpd: 16,
        variants: [
            { title: 'Воплощение Коллапса', skin: '#09090b', armor: '#18181b', weapon: 'black_hole_core', glow: '#a855f7', elem: 'Гравитация', ability: 'Сингулярность Бездны' },
            { title: 'Тёмный Звёздный Пожиратель', skin: '#1e1b4b', armor: '#0f172a', weapon: 'star_eater_claws', glow: '#818cf8', elem: 'Космос', ability: 'Звёздное угасание' },
            { title: 'Апостол Небытия', skin: '#2e1065', armor: '#172554', weapon: 'void_tendrils', glow: '#e879f9', elem: 'Энтропия', ability: 'Стирание бытия' }
        ]
    },
    {
        id: 'baalhor_archdemon',
        tier: MOB_TIERS.FINAL_BOSS,
        baseName: 'Баалхор — Архидемон Преисподней',
        archetype: 'archdemon',
        desc: 'Исполинский рогатый демон с крыльями из огненной лавы и пылающим двуручным мечом, выкованным в сердце ада.',
        quote: '«Ваши молитвы здесь бесполезны! Я сокрушу ваши души и заставлю вечно гореть в геенне!»',
        baseHp: 820,
        baseDmg: 72,
        baseDef: 40,
        baseSpd: 13,
        variants: [
            { title: 'Повелитель Адского Горна', skin: '#991b1b', armor: '#450a0a', weapon: 'hellfire_greatsword', glow: '#f97316', elem: 'Адское пламя', ability: 'Апокалиптический взрыв' },
            { title: 'Кровавый Владыка Мучений', skin: '#881337', armor: '#2b0606', weapon: 'flail_of_torment', glow: '#f43f5e', elem: 'Кровь', ability: 'Жатва агонии' },
            { title: 'Демон Разрушения', skin: '#1c1917', armor: '#0c0a09', weapon: 'brimstone_hammer', glow: '#eab308', elem: 'Сера', ability: 'Метеоритный дождь' }
        ]
    },
    {
        id: 'lord_of_silence',
        tier: MOB_TIERS.FINAL_BOSS,
        baseName: 'Владыка Вечного Безмолвия',
        archetype: 'lord_of_silence',
        desc: 'Мистическое бестелесное божество времени и тишины в маске из лунного серебра. Останавливает само течение мгновений.',
        quote: '«Умолкни... Пусть застынет биение твоего сердца в вечном покое.»',
        baseHp: 760,
        baseDmg: 76,
        baseDef: 34,
        baseSpd: 18,
        variants: [
            { title: 'Хранитель Остановленного Времени', skin: '#e2e8f0', armor: '#334155', weapon: 'chronos_scepter', glow: '#38bdf8', elem: 'Время', ability: 'Стазис времени' },
            { title: 'Тень Забвения', skin: '#c7d2fe', armor: '#1e1b4b', weapon: 'oblivion_mirror', glow: '#a855f7', elem: 'Забвение', ability: 'Абсолютная тишина' },
            { title: 'Лунная Маска Смерти', skin: '#f1f5f9', armor: '#0f172a', weapon: 'silver_scythe', glow: '#f472b6', elem: 'Иллюзия', ability: 'Фантомный приговор' }
        ]
    },
    {
        id: 'forgotten_demigod',
        tier: MOB_TIERS.FINAL_BOSS,
        baseName: 'Забытый Полубог Творения',
        archetype: 'forgotten_demigod',
        desc: 'Древний небожитель, низвергнутый в катакомбы на заре времён. Обломки божественного нимба всё ещё сияют вокруг его чела.',
        quote: '«Я создал этот мир... и я сотру его до основания, начав с тебя!»',
        baseHp: 890,
        baseDmg: 70,
        baseDef: 42,
        baseSpd: 15,
        variants: [
            { title: 'Падший Серафим', skin: '#fef08a', armor: '#713f12', weapon: 'golden_spear_of_light', glow: '#facc15', elem: 'Святость', ability: 'Гнев небес' },
            { title: 'Осквернённый Творец', skin: '#fbcfe8', armor: '#4a044e', weapon: 'genesis_hammer', glow: '#f43f5e', elem: 'Хаос', ability: 'Разрушение основ' },
            { title: 'Хранитель Звёздного Свода', skin: '#bae6fd', armor: '#0c4a6e', weapon: 'stellar_blade', glow: '#67e8f9', elem: 'Звёзды', ability: 'Сверхновая звезда' }
        ]
    }
];

// Вспомогательный метод для получения случайной вариации моба
export function generateMobInstance(mobData, variantIndex = null, floorNum = null) {
    const vCount = mobData.variants.length;
    const vIdx = (variantIndex !== null && variantIndex >= 0 && variantIndex < vCount) 
        ? variantIndex 
        : Math.floor(Math.random() * vCount);

    const variant = mobData.variants[vIdx];

    // Рассчитываем динамические параметры на основе ранга
    let tierBadge = 'Обычный';
    let tierClass = 'tier-regular';
    if (mobData.tier === MOB_TIERS.HARDENED) {
        tierBadge = 'Элитный';
        tierClass = 'tier-hardened';
    } else if (mobData.tier === MOB_TIERS.FLOOR_BOSS) {
        tierBadge = 'Босс этажа';
        tierClass = 'tier-boss';
    } else if (mobData.tier === MOB_TIERS.FINAL_BOSS) {
        tierBadge = 'Финальный босс';
        tierClass = 'tier-final-boss';
    }

    // Случайные небольшие колебания характеристик (±10%)
    const statFactor = 0.95 + Math.random() * 0.1;
    let hp = Math.round(mobData.baseHp * statFactor);
    let dmg = Math.round(mobData.baseDmg * statFactor);
    let def = Math.round(mobData.baseDef * statFactor);
    let spd = Math.round(mobData.baseSpd * statFactor);

    // На первом этаже монстры сбалансированы как самые слабые противники для старта
    if (floorNum === 1) {
        hp = Math.max(28, Math.round(hp * 0.68));
        dmg = Math.max(5, Math.round(dmg * 0.6));
        def = Math.max(1, Math.round(def * 0.45));
    } else if (floorNum && floorNum > 1) {
        // Каждый этаж вглубь усиливает монстров: +1 к урону за каждый этаж ниже первого, растущее HP, броня и скорость
        const floorBonus = floorNum - 1;
        dmg += floorBonus * 1;
        hp += floorBonus * 6;
        def += Math.floor(floorBonus * 0.5);
        spd += Math.floor(floorBonus * 0.3);
    }

    return {
        id: mobData.id,
        baseName: mobData.baseName,
        fullName: `${mobData.baseName} (${variant.title})`,
        tier: mobData.tier,
        tierBadge,
        tierClass,
        desc: mobData.desc,
        quote: mobData.quote,
        archetype: mobData.archetype,
        variantIndex: vIdx,
        variantTitle: variant.title,
        skinColor: variant.skin,
        armorColor: variant.armor,
        glowColor: variant.glow,
        weaponId: variant.weapon,
        element: variant.elem,
        ability: variant.ability,
        hp,
        maxHp: hp,
        dmg,
        def,
        spd
    };
}

