import { QUESTS_DATA } from '../data/questsData.js';
import { sound } from '../audio/audioEngine.js';

export class QuestSystem {
    static getAllQuests() {
        return QUESTS_DATA;
    }

    static getQuestById(questId) {
        return QUESTS_DATA.find(q => q.id === questId) || null;
    }

    static ensurePlayerQuests(player) {
        if (!player.quests) {
            player.quests = {
                active: {},
                completed: []
            };
        }
        if (!player.quests.active) player.quests.active = {};
        if (!Array.isArray(player.quests.completed)) player.quests.completed = [];
    }

    static isQuestCompleted(player, questId) {
        this.ensurePlayerQuests(player);
        return player.quests.completed.includes(questId);
    }

    static isQuestActive(player, questId) {
        this.ensurePlayerQuests(player);
        return !!player.quests.active[questId];
    }

    static getAvailableQuestsForNpc(player, npcId) {
        this.ensurePlayerQuests(player);
        const pLevel = player.level || 1;

        return QUESTS_DATA.filter(q => {
            if (q.giverId !== npcId) return false;
            if (pLevel < q.minLevel) return false;
            if (this.isQuestCompleted(player, q.id)) return false;
            if (this.isQuestActive(player, q.id)) return false;
            return true;
        });
    }

    static getActiveQuestsForNpcInteraction(player, npcId) {
        this.ensurePlayerQuests(player);
        return Object.keys(player.quests.active).map(qId => {
            const quest = this.getQuestById(qId);
            if (!quest) return null;
            const activeData = player.quests.active[qId];
            const stage = activeData.stage || 1;

            // 1 этап: разговор с целью (targetId)
            if (stage === 1 && quest.targetId === npcId) {
                return {
                    quest,
                    activeData,
                    actionType: quest.dialogComplete ? 'inquire' : 'complete',
                    promptLabel: quest.dialogComplete 
                        ? `[Поручение: ${quest.title}] — Расспросить / Передать`
                        : `[Поручение: ${quest.title}] — Сдать задание`
                };
            }

            // 2 этап: возвращение к заказчику (giverId)
            if (stage === 2 && quest.giverId === npcId) {
                return {
                    quest,
                    activeData,
                    actionType: 'complete',
                    promptLabel: `[Поручение: ${quest.title}] — Доложить и завершить`
                };
            }

            return null;
        }).filter(Boolean);
    }

    static getActiveQuestsForTarget(player, npcId) {
        return this.getActiveQuestsForNpcInteraction(player, npcId).map(entry => entry.quest);
    }

    static getActiveQuestsForGiver(player, npcId) {
        this.ensurePlayerQuests(player);
        return QUESTS_DATA.filter(q => {
            if (q.giverId !== npcId) return false;
            return this.isQuestActive(player, q.id);
        });
    }

    static acceptQuest(player, questId) {
        this.ensurePlayerQuests(player);
        const quest = this.getQuestById(questId);
        if (!quest) return { success: false, msg: 'Задание не найдено' };

        if (this.isQuestCompleted(player, questId)) {
            return { success: false, msg: 'Задание уже выполнено!' };
        }
        if (this.isQuestActive(player, questId)) {
            return { success: false, msg: 'Задание уже взято!' };
        }
        if ((player.level || 1) < quest.minLevel) {
            return { success: false, msg: `Требуется уровень ${quest.minLevel}!` };
        }

        // Активируем квест
        player.quests.active[questId] = {
            stage: 1,
            startedAt: Date.now()
        };

        // Добавляем квестовый предмет, если есть
        if (quest.questItem) {
            player.inventory.push({ ...quest.questItem });
        }

        sound.playSfx('tab');
        return { success: true, quest };
    }

    static interactWithNpc(player, questId, npcId) {
        this.ensurePlayerQuests(player);
        const quest = this.getQuestById(questId);
        if (!quest) return { success: false, msg: 'Задание не найдено' };
        const activeData = player.quests.active[questId];
        if (!activeData) return { success: false, msg: 'Задание не активно' };

        const stage = activeData.stage || 1;

        // 1 этап у цели задания
        if (stage === 1 && quest.targetId === npcId) {
            if (quest.dialogComplete) {
                // Переход ко второму этапу (возвращение к заказчику)
                activeData.stage = 2;
                sound.playSfx('tab');
                return {
                    success: true,
                    isComplete: false,
                    dialogText: quest.dialogTarget,
                    quest
                };
            } else {
                // Одноэтапный квест - сдача прямо у цели
                return this.completeQuest(player, questId, quest.dialogTarget);
            }
        }

        // 2 этап - отчет у заказчика
        if (stage === 2 && quest.giverId === npcId) {
            return this.completeQuest(player, questId, quest.dialogComplete);
        }

        return { success: false, msg: 'Нет подходящего действия для этого задания' };
    }

    static completeQuest(player, questId, customDialog = null) {
        this.ensurePlayerQuests(player);
        const quest = this.getQuestById(questId);
        if (!quest) return { success: false, msg: 'Задание не найдено' };

        if (!this.isQuestActive(player, questId)) {
            return { success: false, msg: 'Задание не активно' };
        }

        // Завершаем квест
        delete player.quests.active[questId];
        if (!player.quests.completed.includes(questId)) {
            player.quests.completed.push(questId);
        }

        // Изымаем квестовый предмет из инвентаря, если есть
        if (quest.questItem) {
            const itemIdx = player.inventory.findIndex(it => it.id === quest.questItem.id);
            if (itemIdx !== -1) {
                player.inventory.splice(itemIdx, 1);
            }
        }

        // Выдаем награды
        const reward = quest.reward || {};
        const results = {
            gold: reward.gold || 0,
            exp: reward.exp || 0,
            item: reward.item || null,
            bonusDamage: reward.bonusDamage || 0,
            levelUpResult: null
        };

        if (results.gold > 0) {
            player.gold += results.gold;
        }

        if (results.exp > 0) {
            results.levelUpResult = player.addExp(results.exp);
        }

        if (results.item) {
            player.inventory.push({ ...results.item });
        }

        if (results.bonusDamage > 0) {
            if (!player.smithBonuses) player.smithBonuses = {};
            player.smithBonuses.physicalDamage = (player.smithBonuses.physicalDamage || 0) + results.bonusDamage;
            player.recalculateStats();
        }

        sound.playSfx('rareDrop');
        return {
            success: true,
            isComplete: true,
            quest,
            results,
            dialogText: customDialog || quest.dialogComplete || quest.dialogTarget
        };
    }

    static hasAvailableQuestsForNpc(player, npcId) {
        return this.getAvailableQuestsForNpc(player, npcId).length > 0;
    }

    static hasTurnInQuestsForNpc(player, npcId) {
        return this.getActiveQuestsForNpcInteraction(player, npcId).length > 0;
    }

    static hasQuestsForBuilding(player, buildingId) {
        const buildingNpcMap = {
            shop: 'rashid',
            blacksmith: 'torvald',
            tavern: 'brok',
            temple: 'elysia',
            southRoad: 'varran'
        };
        const npcId = buildingNpcMap[buildingId];
        if (!npcId) return { hasAvailable: false, hasTurnIn: false };

        const hasTurnIn = this.hasTurnInQuestsForNpc(player, npcId);
        const hasAvailable = this.hasAvailableQuestsForNpc(player, npcId);
        return { hasAvailable, hasTurnIn };
    }

    static getActiveQuestsList(player) {
        this.ensurePlayerQuests(player);
        return Object.keys(player.quests.active).map(qId => {
            const q = this.getQuestById(qId);
            const activeData = player.quests.active[qId];
            return {
                ...q,
                activeData,
                currentStage: activeData.stage || 1
            };
        }).filter(Boolean);
    }

    static getCompletedQuestsList(player) {
        this.ensurePlayerQuests(player);
        return player.quests.completed.map(qId => this.getQuestById(qId)).filter(Boolean);
    }
}
