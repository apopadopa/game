import { QuestSystem } from '../services/questSystem.js';
import { Icons } from '../visuals/icons.js';

export class QuestRenderer {
    // Рендер специальной кнопки в диалоге, если NPC является целью активного квеста
    static renderNpcQuestPrompts(player, npcId) {
        const interactions = QuestSystem.getActiveQuestsForNpcInteraction(player, npcId);
        if (interactions.length === 0) return '';

        return `
            <div class="npc-quest-prompts-wrap">
                ${interactions.map(item => `
                    <button class="btn btn-warning btn-quest-turnin" data-quest-id="${item.quest.id}" title="${item.promptLabel}">
                        ${Icons.spark(14)} ${item.promptLabel}
                    </button>
                `).join('')}
            </div>
        `;
    }

    // Рендер содержимого вкладки «Поручения» у торговцев
    static renderNpcQuestsTab(player, npcId) {
        const available = QuestSystem.getAvailableQuestsForNpc(player, npcId);
        const activeGiven = QuestSystem.getActiveQuestsForGiver(player, npcId);
        const pLevel = player.level || 1;

        let html = `<div class="quest-tab-content">`;

        // Активные поручения от этого NPC
        if (activeGiven.length > 0) {
            html += `
                <div class="quest-section-header">
                    <h4>${Icons.hourglass(14)} Текущие поручения в процессе (${activeGiven.length})</h4>
                </div>
                <div class="quest-cards-list">
                    ${activeGiven.map(q => {
                        const stage = player.quests.active[q.id]?.stage || 1;
                        const isStage2 = stage === 2;
                        const targetName = isStage2 ? q.giverName : q.targetName;
                        const targetLoc = isStage2 ? q.giverLoc : q.targetLoc;
                        const goalLabel = isStage2 ? 'Вернуться к:' : 'Направиться к:';

                        return `
                        <div class="quest-card active-quest">
                            <div class="quest-card-header">
                                <span class="quest-type-tag ${q.type}">${this.getTypeLabel(q.type)}</span>
                                <h4 class="quest-title">${q.title}</h4>
                                <span class="quest-lvl-badge">Ур. ${q.minLevel}</span>
                            </div>
                            <p class="quest-desc">${q.description}</p>
                            <div class="quest-objective-row">
                                <span class="objective-label">Цель:</span>
                                <span class="objective-text">${Icons.pin(13)} ${goalLabel} <strong>${targetName}</strong> (${this.getLocLabel(targetLoc)})</span>
                            </div>
                            <div class="quest-status-badge ${isStage2 ? 'ready' : 'in-progress'}">
                                ${Icons.spark(12)} ${isStage2 ? 'Готово к сдаче заказчику!' : 'Ожидает выполнения'}
                            </div>
                        </div>
                    `;
                    }).join('')}
                </div>
            `;
        }

        // Доступные для взятия поручения
        html += `
            <div class="quest-section-header" style="${activeGiven.length > 0 ? 'margin-top: 14px;' : ''}">
                <h4>${Icons.scroll(14)} Доступные поручения (${available.length})</h4>
            </div>
        `;

        if (available.length === 0) {
            html += `
                <div class="quest-empty-placeholder">
                    ${Icons.check(22)}
                    <p>На данный момент у этого жителя нет новых поручений для уровня ${pLevel}.</p>
                    <span>Возвращайтесь после повышения уровня героя или проверьте других жителей города!</span>
                </div>
            `;
        } else {
            html += `
                <div class="quest-cards-list">
                    ${available.map(q => `
                        <div class="quest-card available-quest">
                            <div class="quest-card-header">
                                <span class="quest-type-tag ${q.type}">${this.getTypeLabel(q.type)}</span>
                                <h4 class="quest-title">${q.title}</h4>
                                <span class="quest-lvl-badge">Треб. Ур. ${q.minLevel}</span>
                            </div>
                            <div class="quest-speech-quote">
                                <em>${q.dialogIntro}</em>
                            </div>
                            <p class="quest-desc">${q.description}</p>
                            <div class="quest-objective-row">
                                <span class="objective-label">Цель:</span>
                                <span class="objective-text">${Icons.pin(13)} Обратиться к: <strong>${q.targetName}</strong> (${this.getLocLabel(q.targetLoc)})</span>
                            </div>
                            ${q.questItem ? `
                                <div class="quest-item-provided">
                                    <span class="quest-item-badge">${Icons.backpack(12)} Предмет задания: <strong>${q.questItem.name}</strong></span>
                                </div>
                            ` : ''}
                            <div class="quest-card-footer">
                                <div class="quest-rewards-preview">
                                    <span class="reward-title">Награда:</span>
                                    <span class="reward-val gold">${Icons.coin(13)} +${q.reward.gold} золота</span>
                                    <span class="reward-val exp">${Icons.crown(13)} +${q.reward.exp} опыта</span>
                                    ${q.reward.item ? `<span class="reward-val item">${Icons.spark(13)} ${q.reward.item.name}</span>` : ''}
                                    ${q.reward.bonusDamage ? `<span class="reward-val bonus">${Icons.sword(13)} +${q.reward.bonusDamage} к физ. урону навсегда</span>` : ''}
                                </div>
                                <button class="btn btn-primary btn-accept-quest" data-quest-id="${q.id}">
                                    ${Icons.scroll(14)} Взять поручение
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        html += `</div>`;
        return html;
    }

    // Рендер журнала заданий в инвентаре игрока
    static renderJournalView(player) {
        const activeQuests = QuestSystem.getActiveQuestsList(player);
        const completedQuests = QuestSystem.getCompletedQuestsList(player);

        return `
            <div class="quest-journal-wrap">
                <div class="journal-header">
                    <h3>${Icons.scroll(18)} Дневник приключений и поручений</h3>
                    <span class="journal-stats-badge">Активно: <strong>${activeQuests.length}</strong> | Завершено: <strong>${completedQuests.length}</strong></span>
                </div>

                <div class="journal-content-row">
                    <!-- Список активных поручений -->
                    <div class="journal-column">
                        <h4 class="journal-col-title">${Icons.hourglass(14)} Активные поручения (${activeQuests.length})</h4>
                        ${activeQuests.length === 0 ? `
                            <div class="journal-empty">
                                <p>У вас нет активных заданий.</p>
                                <span>Посетите жителей города: Лавку Рашида, Кузницу Торвальда, Таверну Брока, Храм Элисии или Заставу Южного тракта.</span>
                            </div>
                        ` : `
                            <div class="journal-list">
                                ${activeQuests.map(q => `
                                    <div class="journal-quest-card active">
                                        <div class="journal-quest-head">
                                            <span class="quest-type-tag ${q.type}">${this.getTypeLabel(q.type)}</span>
                                            <strong>${q.title}</strong>
                                        </div>
                                        <p class="journal-desc">${q.description}</p>
                                        <div class="journal-meta-row">
                                            <span>Заказчик: <strong>${q.giverName}</strong> (${this.getLocLabel(q.giverLoc)})</span>
                                            <span>Текущая цель: <strong style="${q.currentStage === 2 ? 'color: #facc15;' : ''}">${q.currentStage === 2 ? `Вернуться к: ${q.giverName}` : q.targetName}</strong> (${this.getLocLabel(q.currentStage === 2 ? q.giverLoc : q.targetLoc)})</span>
                                        </div>
                                        <div class="journal-reward-row">
                                            <span>Награда: <strong>${q.reward.gold} золота</strong>, <strong>${q.reward.exp} опыта</strong>${q.reward.item ? `, ${q.reward.item.name}` : ''}${q.reward.bonusDamage ? `, +${q.reward.bonusDamage} к урону` : ''}</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        `}
                    </div>

                    <!-- Список завершенных поручений -->
                    <div class="journal-column">
                        <h4 class="journal-col-title">${Icons.check(14)} Выполненные поручения (${completedQuests.length})</h4>
                        ${completedQuests.length === 0 ? `
                            <div class="journal-empty">
                                <p>Пока ни одно поручение не завершено.</p>
                            </div>
                        ` : `
                            <div class="journal-list">
                                ${completedQuests.map(q => `
                                    <div class="journal-quest-card completed">
                                        <div class="journal-quest-head">
                                            <span class="quest-status-check">${Icons.check(13)} Завершено</span>
                                            <strong>${q.title}</strong>
                                        </div>
                                        <p class="journal-desc" style="opacity: 0.8;">${q.description}</p>
                                    </div>
                                `).join('')}
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;
    }

    static getTypeLabel(type) {
        switch (type) {
            case 'delivery': return 'Доставка';
            case 'inquire': return 'Расспрос';
            case 'fetch': return 'Поиск';
            case 'hunt': return 'Охота';
            default: return 'Поручение';
        }
    }

    static getLocLabel(locId) {
        switch (locId) {
            case 'shop': return 'Лавка редкостей';
            case 'blacksmith': return 'Кузница';
            case 'tavern': return 'Таверна';
            case 'temple': return 'Храм Света';
            case 'southRoad': return 'Застава Южного тракта';
            default: return 'Город';
        }
    }
}
