import { ROOM_TEMPLATES, REGULAR_ROOM_IDS } from './dungeonRoomTemplates.js';
import { DungeonMobSpawner } from './dungeonMobSpawner.js';

export class DungeonGenerator {
    /**
     * Создаёт многоэтажную структуру подземелья
     * @param {Object} options
     * @param {number} options.totalFloors - количество этажей (по умолчанию 30)
     * @param {number} options.roomsPerFloor - количество комнат на этаже (по умолчанию 7)
     */
    static generate({ totalFloors = 30, roomsPerFloor = 7 } = {}) {
        const floors = [];
        let lastTemplateId = null;

        for (let f = 1; f <= totalFloors; f++) {
            const isOddFloor = (f % 2 === 1);
            const direction = isOddFloor ? 'ltr' : 'rtl'; // ltr: 0 -> 6, rtl: 6 -> 0
            const startRoomIdx = isOddFloor ? 0 : roomsPerFloor - 1;
            const endRoomIdx = isOddFloor ? roomsPerFloor - 1 : 0;
            const isBossFloor = (f % 3 === 0);
            
            // На этаже босса комната босса находится прямо перед лестницей спуска
            // Если ltr: лестница в endRoomIdx (6), босс в endRoomIdx - 1 (5)
            // Если rtl: лестница в endRoomIdx (0), босс в endRoomIdx + 1 (1)
            const bossRoomIdx = isBossFloor ? (isOddFloor ? endRoomIdx - 1 : endRoomIdx + 1) : null;

            const rooms = [];

            for (let r = 0; r < roomsPerFloor; r++) {
                let templateId;
                const isBossRoom = (r === bossRoomIdx);
                const hasStairsUp = (r === startRoomIdx);
                const hasStairsDown = (r === endRoomIdx && f < totalFloors);
                const isFinalVault = (f === totalFloors && r === endRoomIdx);

                if (f === 1 && r === 0) {
                    templateId = 'entrance_hall';
                } else if (isBossRoom) {
                    templateId = 'boss_arena';
                } else if (isFinalVault) {
                    templateId = 'final_mystery';
                } else {
                    // Выбираем случайный шаблон из библиотеки regular комнат, не совпадающий с предыдущим
                    let availableTemplates = REGULAR_ROOM_IDS.filter(id => id !== lastTemplateId);
                    // Исключаем появление двух безопасных шаблонов (лагерь / колодец) подряд
                    if (lastTemplateId === 'nomad_camp' || lastTemplateId === 'sunken_well') {
                        availableTemplates = availableTemplates.filter(id => id !== 'nomad_camp' && id !== 'sunken_well');
                    }
                    templateId = availableTemplates[Math.floor(Math.random() * availableTemplates.length)];
                }

                lastTemplateId = templateId;
                const template = ROOM_TEMPLATES[templateId] || ROOM_TEMPLATES.entrance_hall;

                // Цели лестниц
                let stairsUpTarget = null;
                if (hasStairsUp) {
                    if (f === 1) {
                        stairsUpTarget = { floor: 0, room: 0, label: 'Поверхность (Город)' };
                    } else {
                        // Лестница вверх ведёт на этаж f - 1 в ту же горизонтальную координату
                        stairsUpTarget = { floor: f - 1, room: r, label: `Этаж ${f - 1}` };
                    }
                }

                let stairsDownTarget = null;
                if (hasStairsDown) {
                    // Лестница вниз ведёт на этаж f + 1 в ту же горизонтальную координату
                    stairsDownTarget = { floor: f + 1, room: r, label: `Этаж ${f + 1}` };
                }

                let customName = template.name;
                if (isBossRoom) {
                    customName = (f === 30) ? 'Обитель Владыки Бездны' : `Трон Хранителя ${f} этажа`;
                } else if (isFinalVault) {
                    customName = 'Неизведанная зона';
                } else if (f === 1 && r === 0) {
                    customName = 'Врата катакомб (Вход)';
                } else if (hasStairsDown) {
                    customName += ' (Спуск)';
                } else if (hasStairsUp && f > 1) {
                    customName += ' (Подъём)';
                }

                rooms.push({
                    floorNum: f,
                    roomIndex: r,
                    templateId,
                    template,
                    name: customName,
                    desc: template.desc,
                    isBossRoom,
                    isFinalVault,
                    hasStairsUp,
                    hasStairsDown,
                    stairsUpTarget,
                    stairsDownTarget
                });
            }

            floors.push({
                floorNum: f,
                direction,
                startRoomIdx,
                endRoomIdx,
                bossRoomIdx,
                isBossFloor,
                rooms
            });
        }

        const dungeon = {
            totalFloors,
            roomsPerFloor,
            floors,
            getRoom(floorNum, roomIndex) {
                if (floorNum < 1 || floorNum > floors.length) return null;
                const floor = floors[floorNum - 1];
                if (!floor || roomIndex < 0 || roomIndex >= floor.rooms.length) return null;
                return floor.rooms[roomIndex];
            }
        };

        DungeonMobSpawner.populateDungeon(dungeon);

        return dungeon;
    }
}
