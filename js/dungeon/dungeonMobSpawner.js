// Генератор тематического заселения комнат подземелья монстрами
// Учитывает архитектуру комнат, прогрессию по 30 этажам и уникальные ранги чудовищ

import { MOBS_CATALOG, MOB_TIERS, generateMobInstance } from '../mobs/mobData.js';

export class DungeonMobSpawner {
    /**
     * Тематическая матрица соответствий комнат и подходящих монстров
     */
    static THEMATIC_MOB_MAPPING = {
        // Паучьи логова и коконы
        spider_lair: ['cave_spider', 'young_basilisk', 'crypt_chimera', 'cavern_hydra', 'broodmother_arachna'],

        // Огонь, магма, кузница, сера
        lava_fissure: ['cave_imp', 'dungeon_slime', 'magma_salamander', 'orc_berserker', 'magma_colossus'],
        magma_vent: ['cave_imp', 'magma_salamander', 'cave_troll', 'magma_colossus'],
        abyssal_forge: ['animated_armor', 'cave_imp', 'magma_salamander', 'four_horned_behemoth'],
        powder_magazine: ['goblin_scout', 'cave_imp', 'animated_armor'],

        // Нежить, склепы, усыпальницы, кладбища, кости
        crypt_sarcophagi: ['skeleton_infantry', 'rot_zombie', 'crypt_banshee', 'death_knight', 'crypt_lord_mortis'],
        catacomb_ossuary: ['skeleton_infantry', 'crypt_poltergeist', 'bone_golem_construct', 'archlich_valtora'],
        carrion_pit: ['rot_zombie', 'plague_rat', 'gnoll_scavenger', 'bone_golem_construct'],
        bone_pit: ['skeleton_infantry', 'rot_zombie', 'bone_golem_construct', 'gnoll_scavenger'],
        whispering_catacombs: ['crypt_banshee', 'skeleton_infantry', 'crypt_poltergeist', 'shadow_assassin'],
        dungeon_cells: ['skeleton_infantry', 'rot_zombie', 'goblin_scout', 'dungeon_minotaur'],
        torture_chamber: ['dark_cultist', 'blood_succubus', 'cannibal_ogre', 'dungeon_minotaur'],

        // Грибы, яд, оранжереи, болота
        fungal_cavern: ['spore_myconid', 'plague_rat', 'dungeon_slime', 'predator_strangler'],
        poison_greenhouse: ['spore_myconid', 'predator_strangler', 'cave_spider', 'cavern_hydra'],

        // Шахты, штольни, подземные туннели
        abandoned_mine: ['cave_kobold', 'demented_miner', 'blind_troglodyte', 'earth_elemental_shard'],

        // Кристаллы и самоцветы
        crystal_grotto: ['crystal_scarab', 'earth_elemental_shard', 'animated_armor', 'cave_troll'],
        crystal_cave_red: ['crystal_scarab', 'earth_elemental_shard', 'basalt_gargoyle', 'four_horned_behemoth'],
        emerald_quarry: ['crystal_scarab', 'earth_elemental_shard', 'cave_kobold'],

        // Затопленные гроты, каналы, акведуки
        flooded_grotto: ['cavern_naga', 'dungeon_slime', 'blind_troglodyte', 'plague_rat'],
        ancient_aqueduct: ['cavern_naga', 'dungeon_slime', 'troglodyte', 'cavern_hydra'],
        sunken_aqueduct: ['cavern_naga', 'dungeon_slime', 'blind_troglodyte', 'cavern_hydra'],

        // Магические библиотеки, скриптории, обсерватории
        ancient_library: ['dark_cultist', 'void_necromancer', 'crypt_poltergeist', 'intellect_devourer'],
        ancient_scriptorium: ['dark_cultist', 'void_necromancer', 'crypt_poltergeist'],
        stellar_observatory: ['intellect_devourer', 'mind_flayer_overseer', 'crypt_poltergeist', 'void_avatar'],
        hall_of_mirrors: ['crypt_banshee', 'shadow_assassin', 'crypt_poltergeist'],
        runic_sanctum: ['animated_armor', 'void_necromancer', 'dark_cultist'],

        // Тёмные святилища, алтари, соборы теней
        defiled_altar: ['dark_cultist', 'blood_succubus', 'void_necromancer', 'fallen_inquisitor'],
        cathedral_of_shadows: ['dark_cultist', 'death_knight', 'blood_succubus', 'fallen_inquisitor', 'baalhor_archdemon'],

        // Механические залы древних
        clockwork_vault: ['animated_armor', 'clockwork_titan', 'earth_elemental_shard'],

        // Пропасти, мосты, высоты
        chasm_bridge: ['giant_bat', 'basalt_gargoyle', 'abyssal_wyvern'],

        // Заросшие древние руины
        overgrown_ruins: ['predator_strangler', 'cave_troll', 'young_basilisk', 'chaos_centaur'],
        broken_statues: ['basalt_gargoyle', 'animated_armor', 'earth_elemental_shard'],
        statue_gallery: ['animated_armor', 'basalt_gargoyle', 'death_knight'],

        // Сокровищницы и алчные залы
        treasury_vault: ['animated_armor', 'dungeon_minotaur', 'cannibal_ogre', 'goblin_scout'],
        golden_shrine: ['animated_armor', 'cave_imp', 'dungeon_minotaur'],

        // Ледяные залы
        frozen_vault: ['crypt_banshee', 'cave_troll', 'dungeon_slime', 'abyssal_wyvern'],
        ice_cavern: ['crypt_banshee', 'cave_troll', 'abyssal_wyvern', 'young_basilisk'],

        // Мавзолеи и пустынные гробницы
        pharaoh_tomb: ['skeleton_infantry', 'abyssal_scorpion', 'rot_zombie', 'shadow_assassin'],
        underground_arena: ['orc_berserker', 'dungeon_minotaur', 'cannibal_ogre', 'chaos_centaur']
    };

    /**
     * Безопасные комнаты, где монстры НИКОГДА не появляются
     */
    static SAFE_ROOM_TEMPLATES = new Set([
        'entrance_hall', // Врата глубин (Вход на 1 этаже)
        'nomad_camp',    // Привал странника с костром
        'sunken_well',   // Колодец желаний
        'wishing_well',  // Колодец
        'final_mystery'  // Тайна после финального босса
    ]);

    /**
     * Список ID боссов этажей (Ряд 3)
     */
    static FLOOR_BOSS_IDS = [
        'archlich_valtora',
        'fallen_inquisitor',
        'broodmother_arachna',
        'magma_colossus',
        'crypt_lord_mortis',
        'mind_flayer_overseer',
        'clockwork_titan'
    ];

    /**
     * Список ID финальных боссов (Ряд 4)
     */
    static FINAL_BOSS_IDS = [
        'nidhogg_dread_dragon',
        'void_avatar',
        'baalhor_archdemon',
        'lord_of_silence',
        'forgotten_demigod'
    ];

    /**
     * Список самых слабых монстров, гарантированных для 1-го этажа подземелья
     */
    static FLOOR_1_WEAKEST_MOBS = [
        'plague_rat',
        'giant_bat',
        'cave_kobold',
        'goblin_scout',
        'dungeon_slime'
    ];

    /**
     * Заселяет подземелье монстрами в соответствии с правилами
     * Гарантирует, что безопасные комнаты не встречаются более 2 раз подряд по пути игрока
     * @param {Object} dungeon - объект подземелья, содержащий floors
     */
    static populateDungeon(dungeon) {
        let bossCycleIdx = 0;
        const shuffledBossIds = [...this.FLOOR_BOSS_IDS].sort(() => Math.random() - 0.5);
        let consecutiveSafeRooms = 0;

        for (const floor of dungeon.floors) {
            const fNum = floor.floorNum;
            // Обход комнат строго в порядке продвижения игрока по этажу
            const orderedRooms = (floor.direction === 'ltr') ? [...floor.rooms] : [...floor.rooms].reverse();

            for (const room of orderedRooms) {
                const isDungeonEntrance = (fNum === 1 && room.roomIndex === 0);
                const isFinalRoom = room.isFinalVault || (room.templateId === 'final_mystery');

                // 1. Проверяем комнату босса этажа / финального босса
                if (room.isBossRoom) {
                    let bossId;
                    if (fNum === 30) {
                        // Финальный босс 30 этажа
                        bossId = this.FINAL_BOSS_IDS[Math.floor(Math.random() * this.FINAL_BOSS_IDS.length)];
                    } else {
                        // Босс этажа (чередуются из перемешанного пула)
                        bossId = shuffledBossIds[bossCycleIdx % shuffledBossIds.length];
                        bossCycleIdx++;
                    }

                    const bossCatalogData = MOBS_CATALOG.find(m => m.id === bossId);
                    if (bossCatalogData) {
                        room.monster = generateMobInstance(bossCatalogData, null, fNum);
                        room.hasMonster = true;
                        room.isMonsterDefeated = false;
                        consecutiveSafeRooms = 0;
                    }
                    continue;
                }

                // 2. Вход на 1 этаже и финальная комната тайны на 30 этаже ВСЕГДА безопасны
                if (isDungeonEntrance || isFinalRoom) {
                    room.monster = null;
                    room.hasMonster = false;
                    room.isMonsterDefeated = false;
                    consecutiveSafeRooms++;
                    continue;
                }

                // 3. Для остальных безопасных шаблонов (лагерь, колодец):
                // Если уже 2 безопасные комнаты подряд, принудительно устраиваем засаду монстров!
                const isNaturallySafe = this.isSafeRoom(fNum, room);
                if (isNaturallySafe && consecutiveSafeRooms < 2) {
                    room.monster = null;
                    room.hasMonster = false;
                    room.isMonsterDefeated = false;
                    consecutiveSafeRooms++;
                    continue;
                }

                // 4. Обычные комнаты: проверяем шанс спавна, но если consecutiveSafeRooms >= 2, спавним гарантированно!
                const spawnConfig = this.getSpawnConfigForFloor(fNum);
                let shouldSpawn = Math.random() < spawnConfig.spawnChance;

                if (consecutiveSafeRooms >= 2) {
                    shouldSpawn = true; // Принудительный спавн: не больше 2 безопасных комнат подряд!
                }

                if (!shouldSpawn) {
                    room.monster = null;
                    room.hasMonster = false;
                    room.isMonsterDefeated = false;
                    consecutiveSafeRooms++;
                    continue;
                }

                // Подбираем тематически подходящего монстра (с учетом этажа)
                const mobId = this.selectThematicMobId(room.templateId, spawnConfig.tierWeight, fNum);
                const mobCatalogData = MOBS_CATALOG.find(m => m.id === mobId);

                if (mobCatalogData) {
                    room.monster = generateMobInstance(mobCatalogData, null, fNum);
                    room.hasMonster = true;
                    room.isMonsterDefeated = false;
                    consecutiveSafeRooms = 0;
                } else {
                    room.monster = null;
                    room.hasMonster = false;
                    room.isMonsterDefeated = false;
                    consecutiveSafeRooms++;
                }
            }
        }

        return dungeon;
    }

    /**
     * Проверяет, является ли комната гарантированно безопасной
     */
    static isSafeRoom(floorNum, room) {
        // Вход на поверхность на 1 этаже всегда безопасен
        if (floorNum === 1 && room.roomIndex === 0) {
            return true;
        }

        // Финальная комната тайны на дне подземелья безопасна
        if (room.isFinalVault || room.templateId === 'final_mystery') {
            return true;
        }

        // Лагерь странника или колодец
        if (this.SAFE_ROOM_TEMPLATES.has(room.templateId)) {
            return true;
        }

        return false;
    }

    /**
     * Возвращает настройки вероятности спавна и соотношения рангов для этажа
     */
    static getSpawnConfigForFloor(floorNum) {
        if (floorNum <= 8) {
            // Этажи 1-8: Верхние катакомбы (60% спавн, 100% обычные мобы)
            return {
                spawnChance: 0.62,
                tierWeight: { regular: 1.0, hardened: 0.0 }
            };
        } else if (floorNum <= 18) {
            // Этажи 9-18: Средние глубины (72% спавн, смесь обычных и элитных)
            return {
                spawnChance: 0.74,
                tierWeight: { regular: 0.55, hardened: 0.45 }
            };
        } else if (floorNum < 30) {
            // Этажи 19-29: Глубокая бездна (82% спавн, преимущественно элита)
            return {
                spawnChance: 0.82,
                tierWeight: { regular: 0.20, hardened: 0.80 }
            };
        } else {
            // 30 этаж: Цитадель босса (100% спавн элиты)
            return {
                spawnChance: 1.0,
                tierWeight: { regular: 0.0, hardened: 1.0 }
            };
        }
    }

    /**
     * Выбирает подходящего по теме комнаты и рангу монстра
     */
    static selectThematicMobId(templateId, tierWeight, floorNum = null) {
        // На 1 этаже всегда появляются исключительно самые слабые монстры!
        if (floorNum === 1) {
            const themeCandidates = this.THEMATIC_MOB_MAPPING[templateId] || [];
            const matchingWeak = themeCandidates.filter(mobId => this.FLOOR_1_WEAKEST_MOBS.includes(mobId));
            if (matchingWeak.length > 0) {
                return matchingWeak[Math.floor(Math.random() * matchingWeak.length)];
            }
            return this.FLOOR_1_WEAKEST_MOBS[Math.floor(Math.random() * this.FLOOR_1_WEAKEST_MOBS.length)];
        }

        // Определяем желаемый ранг на основе весов
        const targetTier = (Math.random() < tierWeight.hardened) ? MOB_TIERS.HARDENED : MOB_TIERS.REGULAR;

        // Ищем тематических кандидатов для данного шаблона комнаты
        const themeCandidates = this.THEMATIC_MOB_MAPPING[templateId] || [];
        
        // Фильтруем кандидатов по рангу
        const filteredByTier = themeCandidates.filter(mobId => {
            const data = MOBS_CATALOG.find(m => m.id === mobId);
            return data && data.tier === targetTier;
        });

        if (filteredByTier.length > 0) {
            return filteredByTier[Math.floor(Math.random() * filteredByTier.length)];
        }

        // Если тематических кандидатов нужного ранга нет — берем любого подходящего по теме
        if (themeCandidates.length > 0) {
            return themeCandidates[Math.floor(Math.random() * themeCandidates.length)];
        }

        // Запасной вариант: случайный монстр желаемого ранга из каталога
        const fallbackList = MOBS_CATALOG.filter(m => m.tier === targetTier);
        if (fallbackList.length > 0) {
            return fallbackList[Math.floor(Math.random() * fallbackList.length)].id;
        }

        return 'goblin_scout';
    }
}
