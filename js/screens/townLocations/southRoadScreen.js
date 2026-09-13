import { sound } from '../../audio/audioEngine.js';
import { townTheme } from '../../audio/music/townTheme.js';
import { CharacterRenderer } from '../../visuals/characterRenderer.js';
import { Icons } from '../../visuals/icons.js';
import { QuestSystem } from '../../services/questSystem.js';
import { QuestRenderer } from '../../ui/questRenderer.js';

export class SouthRoadScreen {
    constructor(player, callbacks = {}) {
        this.player = player;
        this.callbacks = callbacks;
        this.currentDialog = null;

        sound.switchMusic(townTheme, 1.2);
    }

    render(container) {
        this.container = container;
        const isUnlocked = !!this.player.hasDefeatedFinalBoss;

        container.innerHTML = `
            <div class="interior-screen south-road-screen">
                <!-- ВЕРХНЯЯ ПАНЕЛЬ ЛОКАЦИИ -->
                <div class="interior-top-bar">
                    <div class="loc-character-badge">
                        <div class="hud-avatar-frame">${CharacterRenderer.renderBust(this.player.visuals, this.player.classId, this.player.equipment)}</div>
                        <div class="loc-player-meta">
                            <span class="loc-player-name">${this.player.name}</span>
                            <span class="loc-gold">${Icons.coin(14)} <strong id="loc-gold-val">${this.player.gold}</strong></span>
                        </div>
                    </div>
                    <div class="interior-title-wrap">
                        <h2>Застава Южного Тракта</h2>
                        <span class="interior-subtitle">Укреплённые врата королевства. Путь в цветущие долины и столицу внешнего мира</span>
                    </div>
                    <button class="btn btn-secondary" id="btn-leave-south-road">${Icons.arrowLeft(13)} На площадь города</button>
                </div>

                <!-- ОСНОВНАЯ СЦЕНА -->
                <div class="interior-stage">
                    <div class="interior-scene-box">
                        <svg viewBox="0 0 520 400" class="south-road-scene-svg" width="100%" height="100%">
                            <defs>
                                <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stop-color="#1e3a8a"/>
                                    <stop offset="35%" stop-color="#0284c7"/>
                                    <stop offset="70%" stop-color="#7dd3fc"/>
                                    <stop offset="100%" stop-color="#bae6fd"/>
                                </linearGradient>

                                <linearGradient id="sunGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stop-color="#fef08a" stop-opacity="0.9"/>
                                    <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
                                </linearGradient>

                                <linearGradient id="wallStone" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stop-color="#475569"/>
                                    <stop offset="50%" stop-color="#334155"/>
                                    <stop offset="100%" stop-color="#1e293b"/>
                                </linearGradient>

                                <linearGradient id="gateWood" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stop-color="#451a03"/>
                                    <stop offset="50%" stop-color="#78350f"/>
                                    <stop offset="100%" stop-color="#451a03"/>
                                </linearGradient>

                                <radialGradient id="torchFlame" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stop-color="#fef08a"/>
                                    <stop offset="40%" stop-color="#f97316"/>
                                    <stop offset="85%" stop-color="#dc2626"/>
                                    <stop offset="100%" stop-color="#7f1d1d" stop-opacity="0"/>
                                </radialGradient>
                            </defs>

                            <!-- 1. НЕБО И ДАЛЬНИЕ СОЛНЕЧНЫЕ ДОЛИНЫ -->
                            <rect width="520" height="400" fill="url(#skyGrad)"/>
                            <circle cx="260" cy="110" r="70" fill="url(#sunGlow)"/>

                            <!-- Дальние горные пики -->
                            <polygon points="60,220 130,130 200,220" fill="#93c5fd" opacity="0.6"/>
                            <polygon points="120,220 180,150 240,220" fill="#bfdbfe" opacity="0.5"/>
                            <polygon points="270,220 350,120 430,220" fill="#93c5fd" opacity="0.6"/>
                            <polygon points="360,220 420,155 480,220" fill="#bfdbfe" opacity="0.5"/>

                            <!-- Зеленые холмы королевства -->
                            <path d="M0,230 Q140,180 260,210 Q380,180 520,230 L520,400 L0,400 Z" fill="#15803d"/>
                            <path d="M0,245 Q160,220 260,235 Q360,220 520,245 L520,400 L0,400 Z" fill="#166534"/>

                            <!-- Извилистый Южный тракт (дорога вдаль) -->
                            <polygon points="230,230 290,230 360,400 160,400" fill="#d4c39c"/>
                            <polygon points="245,230 275,230 330,400 190,400" fill="#bfa074" opacity="0.7"/>

                            <!-- 2. МОНУМЕНТАЛЬНАЯ КРЕПОСТНАЯ СТЕНА И АРКА -->
                            <!-- Левый бастион стены -->
                            <rect x="0" y="80" width="160" height="320" fill="url(#wallStone)" stroke="#0f172a" stroke-width="2"/>
                            <!-- Зубцы левой стены -->
                            <rect x="0" y="60" width="30" height="24" fill="url(#wallStone)" stroke="#0f172a" stroke-width="1.5"/>
                            <rect x="42" y="60" width="30" height="24" fill="url(#wallStone)" stroke="#0f172a" stroke-width="1.5"/>
                            <rect x="84" y="60" width="30" height="24" fill="url(#wallStone)" stroke="#0f172a" stroke-width="1.5"/>
                            <rect x="126" y="60" width="34" height="24" fill="url(#wallStone)" stroke="#0f172a" stroke-width="1.5"/>

                            <!-- Правый бастион стены -->
                            <rect x="360" y="80" width="160" height="320" fill="url(#wallStone)" stroke="#0f172a" stroke-width="2"/>
                            <!-- Зубцы правой стены -->
                            <rect x="360" y="60" width="34" height="24" fill="url(#wallStone)" stroke="#0f172a" stroke-width="1.5"/>
                            <rect x="404" y="60" width="30" height="24" fill="url(#wallStone)" stroke="#0f172a" stroke-width="1.5"/>
                            <rect x="444" y="60" width="30" height="24" fill="url(#wallStone)" stroke="#0f172a" stroke-width="1.5"/>
                            <rect x="484" y="60" width="36" height="24" fill="url(#wallStone)" stroke="#0f172a" stroke-width="1.5"/>

                            <!-- Центральная арка над воротами -->
                            <path d="M160,180 Q260,110 360,180 L360,80 L160,80 Z" fill="url(#wallStone)" stroke="#0f172a" stroke-width="2"/>
                            <path d="M150,185 Q260,100 370,185" stroke="#facc15" stroke-width="3" fill="none"/>

                            <!-- Королевский герб льва над сводом ворот -->
                            <circle cx="260" cy="115" r="22" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
                            <polygon points="260,100 274,124 246,124" fill="#facc15"/>
                            <circle cx="260" cy="116" r="4" fill="#b45309"/>

                            <!-- Развевающиеся знамена королевства -->
                            <g transform="translate(18, 30)">
                                <line x1="0" y1="0" x2="0" y2="40" stroke="#78350f" stroke-width="3"/>
                                <polygon points="0,0 35,8 0,22" fill="#1e3a8a" stroke="#ca8a04" stroke-width="1.2"/>
                                <polygon points="0,2 25,9 0,16" fill="#facc15"/>
                            </g>
                            <g transform="translate(502, 30)">
                                <line x1="0" y1="0" x2="0" y2="40" stroke="#78350f" stroke-width="3"/>
                                <polygon points="0,0 -35,8 0,22" fill="#1e3a8a" stroke="#ca8a04" stroke-width="1.2"/>
                                <polygon points="0,2 -25,9 0,16" fill="#facc15"/>
                            </g>

                            <!-- ВРАТА: ЗАКРЫТЫ ИЛИ РАСПАХНУТЫ -->
                            ${isUnlocked ? `
                                <!-- Ворота распахнуты настежь -->
                                <polygon points="160,180 180,185 180,390 160,400" fill="url(#gateWood)" stroke="#000" stroke-width="1.5"/>
                                <polygon points="360,180 340,185 340,390 360,400" fill="url(#gateWood)" stroke="#000" stroke-width="1.5"/>
                                <!-- Лучезарное сияние победы в проёме -->
                                <polygon points="180,185 340,185 380,400 140,400" fill="#fef08a" opacity="0.35"/>
                            ` : `
                                <!-- Массивные закрытые дубовые створки -->
                                <g id="closed-gate-doors">
                                    <path d="M160,180 Q260,120 260,120 L260,400 L160,400 Z" fill="url(#gateWood)" stroke="#1c1917" stroke-width="2"/>
                                    <path d="M360,180 Q260,120 260,120 L260,400 L360,400 Z" fill="url(#gateWood)" stroke="#1c1917" stroke-width="2"/>
                                    <line x1="260" y1="120" x2="260" y2="400" stroke="#000000" stroke-width="3"/>
                                    <!-- Кованые железные поперечные полосы -->
                                    <rect x="160" y="210" width="200" height="10" fill="#0f172a" stroke="#334155" stroke-width="1.2"/>
                                    <rect x="160" y="290" width="200" height="10" fill="#0f172a" stroke="#334155" stroke-width="1.2"/>
                                    <rect x="160" y="360" width="200" height="10" fill="#0f172a" stroke="#334155" stroke-width="1.2"/>
                                    <!-- Большой амбарный замок и цепи карантина -->
                                    <circle cx="260" cy="295" r="14" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
                                    <rect x="254" y="290" width="12" height="15" rx="2" fill="#ca8a04"/>
                                    <circle cx="260" cy="296" r="2.5" fill="#1e293b"/>
                                </g>
                            `}

                            <!-- Пылающие жаровни на колоннах -->
                            <g transform="translate(136, 175)">
                                <rect x="0" y="20" width="16" height="30" fill="#1e293b" stroke="#0f172a" stroke-width="1.5"/>
                                <path d="M-6,20 L22,20 L16,32 L0,32 Z" fill="#334155"/>
                                <circle cx="8" cy="14" r="14" fill="url(#torchFlame)"/>
                                <circle cx="8" cy="10" r="5" fill="#fef08a"/>
                            </g>
                            <g transform="translate(368, 175)">
                                <rect x="0" y="20" width="16" height="30" fill="#1e293b" stroke="#0f172a" stroke-width="1.5"/>
                                <path d="M-6,20 L22,20 L16,32 L0,32 Z" fill="#334155"/>
                                <circle cx="8" cy="14" r="14" fill="url(#torchFlame)"/>
                                <circle cx="8" cy="10" r="5" fill="#fef08a"/>
                            </g>

                            <!-- ============================================== -->
                            <!-- СТРАЖНИК 1 (СЛЕВА): КАПИТАН ВАРРАН (С АЛЕБАРДОЙ) -->
                            <!-- ============================================== -->
                            <g id="npc-guard-left" class="interactive-guard" style="cursor: pointer;" transform="translate(80, 205)" title="Поговорить с капитаном Варраном">
                                <ellipse cx="25" cy="180" rx="30" ry="8" fill="#000000" opacity="0.4"/>
                                
                                <!-- Алебарда капитана -->
                                <g transform="translate(48, -10)">
                                    <line x1="0" y1="0" x2="0" y2="190" stroke="#78350f" stroke-width="3.5"/>
                                    <!-- Топорище и шип алебарды -->
                                    <polygon points="0,0 0,-25 4,-25 4,0" fill="#cbd5e1" stroke="#334155" stroke-width="1"/>
                                    <path d="M0,5 Q18,-2 16,22 Q5,15 0,16 Z" fill="#cbd5e1" stroke="#334155" stroke-width="1"/>
                                    <path d="M0,5 Q-12,8 -10,18 L0,14 Z" fill="#94a3b8" stroke="#334155" stroke-width="0.8"/>
                                </g>

                                <!-- Фигура капитана в доспехах -->
                                <!-- Ноги и поножи -->
                                <rect x="12" y="115" width="10" height="60" fill="#334155" stroke="#1e293b" stroke-width="1"/>
                                <rect x="28" y="115" width="10" height="60" fill="#334155" stroke="#1e293b" stroke-width="1"/>
                                <rect x="10" y="165" width="14" height="12" rx="2" fill="#475569"/>
                                <rect x="26" y="165" width="14" height="12" rx="2" fill="#475569"/>

                                <!-- Кираса и плащ -->
                                <path d="M5,45 L45,45 L48,125 L2,125 Z" fill="#1e3a8a"/>
                                <rect x="10" y="45" width="30" height="70" rx="3" fill="#64748b" stroke="#1e293b" stroke-width="1.5"/>
                                <path d="M15,48 L35,48 L32,80 L25,92 L18,80 Z" fill="#facc15" opacity="0.85"/>
                                <rect x="8" y="105" width="34" height="8" rx="2" fill="#0f172a" stroke="#ca8a04" stroke-width="1"/>
                                <rect x="21" y="104" width="8" height="10" fill="#facc15"/>

                                <!-- Руки капитана -->
                                <path d="M5,50 L-4,85 L4,88 L12,55 Z" fill="#475569" stroke="#1e293b" stroke-width="1"/>
                                <circle cx="0" cy="90" r="5" fill="#334155"/>
                                <path d="M40,50 L48,85 L42,88 L36,55 Z" fill="#475569" stroke="#1e293b" stroke-width="1"/>
                                <circle cx="48" cy="90" r="5" fill="#334155"/>

                                <!-- Голова и глухой стальной рыцарский шлем с плюмажем -->
                                <circle cx="25" cy="30" r="14" fill="#cbd5e1" stroke="#1e293b" stroke-width="1.5"/>
                                <path d="M14,24 L36,24 L34,36 L25,44 L16,36 Z" fill="#475569" stroke="#1e293b" stroke-width="1"/>
                                <line x1="18" y1="28" x2="32" y2="28" stroke="#000000" stroke-width="2"/>
                                <!-- Алый плюмаж капитана -->
                                <path d="M25,16 Q32,-2 25,-12 Q18,-2 25,16" fill="#dc2626" stroke="#991b1b" stroke-width="1"/>

                                <!-- Табличка имени -->
                                <g transform="translate(-10, 192)">
                                    <rect x="0" y="0" width="70" height="18" rx="3" fill="#0f172a" stroke="#38bdf8" stroke-width="1"/>
                                    <text x="35" y="12" text-anchor="middle" fill="#f8fafc" font-size="9" font-weight="bold">Капитан Варран</text>
                                </g>
                            </g>

                            <!-- ============================================== -->
                            <!-- СТРАЖНИК 2 (СПРАВА): СТРАЖНИК БРАН (СО ЩИТОМ И МЕЧОМ) -->
                            <!-- ============================================== -->
                            <g id="npc-guard-right" class="interactive-guard" style="cursor: pointer;" transform="translate(390, 205)" title="Поговорить со стражником Браном">
                                <ellipse cx="25" cy="180" rx="30" ry="8" fill="#000000" opacity="0.4"/>

                                <!-- Ноги часового -->
                                <rect x="12" y="115" width="10" height="60" fill="#334155" stroke="#1e293b" stroke-width="1"/>
                                <rect x="28" y="115" width="10" height="60" fill="#334155" stroke="#1e293b" stroke-width="1"/>
                                <rect x="10" y="165" width="14" height="12" rx="2" fill="#475569"/>
                                <rect x="26" y="165" width="14" height="12" rx="2" fill="#475569"/>

                                <!-- Корпус в кольчуге и бригантине -->
                                <rect x="10" y="45" width="30" height="70" rx="3" fill="#475569" stroke="#1e293b" stroke-width="1.2"/>
                                <rect x="12" y="50" width="26" height="55" fill="#334155"/>
                                <rect x="8" y="105" width="34" height="8" rx="2" fill="#0f172a" stroke="#ca8a04" stroke-width="1"/>
                                <rect x="21" y="104" width="8" height="10" fill="#facc15"/>

                                <!-- Меч в правой руке -->
                                <g transform="translate(42, 60)">
                                    <rect x="0" y="0" width="4" height="70" fill="#cbd5e1" stroke="#334155" stroke-width="0.8"/>
                                    <rect x="-6" y="20" width="16" height="4" fill="#ca8a04"/>
                                    <circle cx="2" cy="12" r="3" fill="#ca8a04"/>
                                </g>

                                <!-- Рыцарский щит часового с королевским гербом -->
                                <g transform="translate(-14, 55)">
                                    <path d="M0,0 L24,0 L22,35 Q12,52 12,54 Q12,52 2,35 Z" fill="#1e3a8a" stroke="#facc15" stroke-width="1.8"/>
                                    <line x1="12" y1="5" x2="12" y2="45" stroke="#facc15" stroke-width="2"/>
                                    <line x1="3" y1="18" x2="21" y2="18" stroke="#facc15" stroke-width="2"/>
                                    <circle cx="12" cy="18" r="3" fill="#ef4444"/>
                                </g>

                                <!-- Голова и стальной шлем часового -->
                                <circle cx="25" cy="30" r="13" fill="#94a3b8" stroke="#1e293b" stroke-width="1.5"/>
                                <path d="M15,22 L35,22 L33,34 L25,40 L17,34 Z" fill="#64748b" stroke="#1e293b" stroke-width="1"/>
                                <line x1="19" y1="27" x2="31" y2="27" stroke="#000000" stroke-width="2"/>
                                <polygon points="25,12 28,19 22,19" fill="#facc15"/>

                                <!-- Табличка имени -->
                                <g transform="translate(-10, 192)">
                                    <rect x="0" y="0" width="70" height="18" rx="3" fill="#0f172a" stroke="#38bdf8" stroke-width="1"/>
                                    <text x="35" y="12" text-anchor="middle" fill="#f8fafc" font-size="9" font-weight="bold">Стражник Бран</text>
                                </g>
                            </g>
                        </svg>
                    </div>

                    <!-- ПРАВАЯ ПАНЕЛЬ: СТАТУС И ВЗАИМОДЕЙСТВИЕ -->
                    <div class="interior-interaction-panel south-road-panel">
                        <!-- СТАТУСНЫЙ БАННЕР ВРАТ -->
                        ${isUnlocked ? `
                            <div class="gate-status-banner unlocked anim-pop-in">
                                <div class="gate-status-header">
                                    <span class="gate-status-icon">${Icons.crown(24)}</span>
                                    <div>
                                        <h4 class="gate-status-title">ВРАТА КОРОЛЕВСТВА ОТКРЫТЫ!</h4>
                                        <span class="gate-status-badge success">${Icons.check(12)} Владыка Бездны повержен</span>
                                    </div>
                                </div>
                                <p class="gate-status-desc">
                                    Древняя скверна рассеялась, стражники приветствуют Спасителя королевства с воинскими почестями! Дорога на Юг свободна для прохода.
                                </p>
                            </div>
                        ` : `
                            <div class="gate-status-banner locked">
                                <div class="gate-status-header">
                                    <span class="gate-status-icon">${Icons.lock(24)}</span>
                                    <div>
                                        <h4 class="gate-status-title">ВРАТА ЗАПЕРТЫ: КАРАНТИН</h4>
                                        <span class="gate-status-badge warning">${Icons.warning(12)} Угроза скверны</span>
                                    </div>
                                </div>
                                <p class="gate-status-desc">
                                    По указу наместника проход на Южный тракт заблокирован до полного истребления зла в Катакомбах. Спуститесь на <strong>30-й этаж</strong> и уничтожьте <strong>Владыку Бездны</strong>!
                                </p>
                            </div>
                        `}

                        <!-- СЛОТ КВЕСТОВЫХ ПОДСКАЗОК/ДЕЙСТВИЙ -->
                        <div id="southroad-quest-prompt-slot">
                            ${QuestRenderer.renderNpcQuestPrompts(this.player, 'varran')}
                            ${QuestRenderer.renderNpcQuestPrompts(this.player, 'bran')}
                        </div>

                        <!-- БЛОК ДИАЛОГА СО СТРАЖНИКАМИ -->
                        <div class="guard-dialog-box" id="guard-dialog-container">
                            <div class="dialog-idle-placeholder">
                                <span class="placeholder-icon">${Icons.message(24)}</span>
                                <p>Подойдите к часовым у ворот или выберите стражника для разговора.</p>
                            </div>
                        </div>

                        <!-- КНОПКИ ДЕЙСТВИЙ -->
                        <div class="south-road-actions-grid">
                            <button class="btn btn-secondary btn-action" id="btn-talk-varran">
                                ${Icons.message(16)} Поговорить с капитаном Варраном
                            </button>
                            <button class="btn btn-secondary btn-action" id="btn-talk-bran">
                                ${Icons.message(16)} Поговорить со стражником Браном
                            </button>
                            <button class="btn ${isUnlocked ? 'btn-primary btn-pulse-gold' : 'btn-warning'} btn-lg btn-action-pass" id="btn-attempt-pass">
                                ${isUnlocked ? `${Icons.crown(18)} Пройти через Врата к Победе!` : `${Icons.lock(18)} Попробовать пройти через Врата`}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- МОДАЛЬНОЕ ОКНО ФИНАЛЬНОГО ЭПИЛОГА / ТРИУМФА -->
            <div class="dungeon-chest-modal-backdrop hidden" id="epilogue-modal" style="display: none;">
                <div class="chest-modal-dialog epilogue-dialog anim-pop-in">
                    <div class="chest-modal-header epilogue-header">
                        <span class="victory-icon">${Icons.crown(44)}</span>
                        <h2 class="chest-modal-title">ВЕЛИКИЙ ТРИУМФ!</h2>
                        <div class="chest-modal-sub">Королевство навеки избавлено от Тьмы</div>
                    </div>
                    <div class="chest-modal-content epilogue-content">
                        <p class="epilogue-text">
                            Под торжественный звон колоколов и радостные возгласы стражи Южные Врата со скрипом распахнулись. 
                            <strong>${this.player.name}</strong> ступает на залитый солнцем Южный тракт.
                        </p>
                        <p class="epilogue-text">
                            Весть о падении Владыки Бездны на 30-м этаже Катакомб облетела весь континент. Впереди — королевская награда, почет Высшего Круга и слава величайшего героя всех времен!
                        </p>

                        <div class="epilogue-hero-summary">
                            <div class="reward-entry"><span class="reward-label">Герой:</span> <strong>${this.player.name}</strong></div>
                            <div class="reward-entry"><span class="reward-label">Уровень:</span> <strong>${this.player.level}</strong></div>
                            <div class="reward-entry"><span class="reward-label">Золото:</span> <strong>${this.player.gold} монет</strong></div>
                            <div class="reward-entry"><span class="reward-label">Спуск:</span> <strong>Все 30 этажей покорены!</strong></div>
                        </div>
                    </div>
                    <div class="chest-modal-actions epilogue-actions">
                        <button class="btn btn-primary btn-lg" id="btn-epilogue-continue">
                            ${Icons.door(16)} Продолжить исследование мира
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.initEvents();
        this.bindQuestPromptEvents();
    }

    bindQuestPromptEvents() {
        const slot = this.container.querySelector('#southroad-quest-prompt-slot');
        if (!slot) return;
        slot.querySelectorAll('.btn-quest-turnin').forEach(btn => {
            btn.addEventListener('click', () => {
                const questId = btn.dataset.questId;
                const q = QuestSystem.getQuestById(questId);
                const speaker = (q && q.targetId === 'bran') ? 'bran' : 'varran';
                this.handleQuestInteraction(speaker, questId);
            });
        });
    }

    handleQuestInteraction(speaker, questId) {
        const res = QuestSystem.interactWithNpc(this.player, questId, speaker);
        if (res.success) {
            const speakerTitle = speaker === 'varran' ? 'Капитан Варран' : 'Стражник Бран';
            let rewardText = '';
            if (res.isComplete && res.results) {
                rewardText = `<br><br><span style="color: #facc15; font-weight: bold;">Награда получена: +${res.results.gold} золота, +${res.results.exp} опыта${res.results.item ? `, ${res.results.item.name}` : ''}${res.results.bonusDamage ? `, +${res.results.bonusDamage} к физ. урону` : ''}!</span>`;
            }
            this.showDialog(speaker, speakerTitle, `${res.dialogText}${rewardText}`, [
                {
                    label: '«Благодарю за доверие!»',
                    action: () => {
                        this.closeDialog();
                        this.updateQuestPrompts();
                    }
                }
            ]);
            this.updateQuestPrompts();
            const goldVal = this.container.querySelector('#loc-gold-val');
            if (goldVal) goldVal.textContent = this.player.gold;
        }
    }

    updateQuestPrompts() {
        const slot = this.container.querySelector('#southroad-quest-prompt-slot');
        if (slot) {
            slot.innerHTML = QuestRenderer.renderNpcQuestPrompts(this.player, 'varran') +
                             QuestRenderer.renderNpcQuestPrompts(this.player, 'bran');
            this.bindQuestPromptEvents();
        }
    }

    showDialog(speaker, title, text, replies = []) {
        const box = this.container.querySelector('#guard-dialog-container');
        if (!box) return;

        box.innerHTML = `
            <div class="guard-dialog-card anim-pop-in">
                <div class="dialog-speaker-header">
                    <div class="speaker-avatar-frame ${speaker}">
                        ${speaker === 'varran' ? Icons.crown(18) : Icons.shield(18)}
                    </div>
                    <div>
                        <h4 class="dialog-speaker-name">${title}</h4>
                        <span class="dialog-speaker-sub">${speaker === 'varran' ? 'Командир Южного дозора' : 'Часовой гарнизона'}</span>
                    </div>
                </div>
                <div class="dialog-speech-bubble">
                    <p class="dialog-speech-text">${text}</p>
                </div>
                <div class="dialog-options-list">
                    ${replies.map((rep, idx) => `
                        <button class="btn btn-secondary btn-sm btn-dialog-option" data-idx="${idx}">
                            ${rep.label}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        box.querySelectorAll('.btn-dialog-option').forEach(btn => {
            btn.addEventListener('click', () => {
                sound.playSfx('click');
                const idx = parseInt(btn.getAttribute('data-idx'), 10);
                const chosen = replies[idx];
                if (chosen && chosen.action) {
                    chosen.action();
                }
            });
        });
    }

    dialogVarran() {
        const isUnlocked = !!this.player.hasDefeatedFinalBoss;
        const questReplies = [];

        // Проверяем активные квесты для сдачи/продвижения у Варрана
        const interactions = QuestSystem.getActiveQuestsForNpcInteraction(this.player, 'varran');
        interactions.forEach(item => {
            questReplies.push({
                label: `${Icons.spark(13)} ${item.promptLabel}`,
                action: () => this.handleQuestInteraction('varran', item.quest.id)
            });
        });

        // Проверяем доступные квесты от Варрана
        const availQuests = QuestSystem.getAvailableQuestsForNpc(this.player, 'varran');
        if (availQuests.length > 0) {
            questReplies.push({
                label: `${Icons.scroll(13)} «Есть ли распоряжения для меня, капитан?» (${availQuests.length})`,
                action: () => this.showAvailableQuestsVarran()
            });
        }

        if (isUnlocked) {
            this.showDialog('varran', 'Капитан Варран', 
                `«Приветствую тебя, великий чемпион! Весть о сокрушении Владыки Бездны опередила тебя! Земля больше не сотрясается от древнего ужаса, а смрадный туман над катакомбами рассеялся. Мои часовые салютуют тебе! Врата открыты настежь — ступай в столицу с высоко поднятой головой!»`,
                [
                    ...questReplies,
                    {
                        label: '«Спасибо, капитан! Я готов продолжить путь.»',
                        action: () => this.attemptPass()
                    },
                    {
                        label: '«Я пока останусь в городе, нужно уладить дела.»',
                        action: () => this.closeDialog()
                    }
                ]
            );
        } else {
            this.showDialog('varran', 'Капитан Варран', 
                `«Стой, путник! Я — капитан Варран. Именем королевского наместника Южный тракт закрыт! Из Катакомб сочится древняя скверна. На самом дне, на 30-м этаже, пробудился Владыка Бездны. Пока он жив — ни один человек не покинет город, дабы зараза не перекинулась на королевство. Хочешь, чтобы врата открылись? Спустись на 30-й этаж и сруби чудовищу голову!»`,
                [
                    ...questReplies,
                    {
                        label: '«Что ты знаешь об опасностях катакомб?»',
                        action: () => this.showDialog('varran', 'Капитан Варран',
                            `«Каждый этаж в глубину опаснее предыдущего! Твари становятся свирепее, их удары сокрушают латы, а здоровье чудовищно растет. Не суйся вглубь без крепкого оружия от Торвальда и зелий от торговца Рашида. Собери снаряжение под свой класс, закали клинок — и тогда у тебя будет шанс одолеть Владыку!»`,
                            [
                                { label: '«Я уничтожу чудовище на 30-м этаже!»', action: () => this.closeDialog() }
                            ]
                        )
                    },
                    {
                        label: '«Понятно. Я вернусь, когда Владыка будет мертв.»',
                        action: () => this.closeDialog()
                    }
                ]
            );
        }
    }

    showAvailableQuestsVarran() {
        const availQuests = QuestSystem.getAvailableQuestsForNpc(this.player, 'varran');
        if (availQuests.length === 0) {
            this.showDialog('varran', 'Капитан Варран', '«На данный момент новых распоряжений для твоего уровня нет. Спустись в катакомбы или проверь других жителей!»', [
                { label: '«Понял, капитан.»', action: () => this.dialogVarran() }
            ]);
            return;
        }

        const q = availQuests[0];
        this.showDialog('varran', 'Капитан Варран', 
            `«Поручение: <strong>${q.title}</strong>»<br><br>${q.dialogIntro}<br><br><span style="color: #94a3b8;">Цель: <strong>${q.targetName}</strong> | Награда: ${q.reward.gold} золота, ${q.reward.exp} опыта</span>`,
            [
                {
                    label: `${Icons.scroll(13)} «Я берусь за это поручение!»`,
                    action: () => {
                        QuestSystem.acceptQuest(this.player, q.id);
                        this.showDialog('varran', 'Капитан Варран', `«Отлично! ${q.dialogPending} Не подведи гарнизон!»`, [
                            { label: '«Будет исполнено!»', action: () => { this.closeDialog(); this.updateQuestPrompts(); } }
                        ]);
                        this.updateQuestPrompts();
                    }
                },
                {
                    label: '«Я подумаю.»',
                    action: () => this.dialogVarran()
                }
            ]
        );
    }

    dialogBran() {
        const isUnlocked = !!this.player.hasDefeatedFinalBoss;
        const questReplies = [];

        // Проверяем активные квесты для сдачи/продвижения у Брана
        const interactions = QuestSystem.getActiveQuestsForNpcInteraction(this.player, 'bran');
        interactions.forEach(item => {
            questReplies.push({
                label: `${Icons.spark(13)} ${item.promptLabel}`,
                action: () => this.handleQuestInteraction('bran', item.quest.id)
            });
        });

        if (isUnlocked) {
            this.showDialog('bran', 'Стражник Бран',
                `«Клянусь рукоятью меча, я глазам своим не верю! Ты в одиночку очистил все тридцать этажей Катакомб?! Парни в караулке уже пьют за твое здоровье! Теперь дорога безопасна, торговцы вернутся на тракт. Слава Герою Катакомб!»`,
                [
                    ...questReplies,
                    {
                        label: '«Благодарю за добрые слова, Бран!»',
                        action: () => this.closeDialog()
                    }
                ]
            );
        } else {
            this.showDialog('bran', 'Стражник Бран',
                `«Эх, друг... Я и сам мечтаю открыть эти тяжелые створки — на юге в цветущих садах меня ждет невеста. Но капитан Варран шутить не любит. Пока из вентиляционных шахт слышен утробный вой Владыки Бездны, наш приказ — держать оборону намертво. Береги себя там внизу!»`,
                [
                    ...questReplies,
                    {
                        label: '«Не волнуйся, я разберусь с этой тварью.»',
                        action: () => this.closeDialog()
                    }
                ]
            );
        }
    }

    closeDialog() {
        const box = this.container.querySelector('#guard-dialog-container');
        if (!box) return;
        box.innerHTML = `
            <div class="dialog-idle-placeholder">
                <span class="placeholder-icon">${Icons.message(24)}</span>
                <p>Подойдите к часовым у ворот или выберите стражника для разговора.</p>
            </div>
        `;
    }

    attemptPass() {
        const isUnlocked = !!this.player.hasDefeatedFinalBoss;

        if (isUnlocked) {
            sound.playSfx('victory');
            const modal = this.container.querySelector('#epilogue-modal');
            if (modal) {
                modal.classList.remove('hidden');
                modal.style.display = 'flex';
                const btn = modal.querySelector('#btn-epilogue-continue');
                if (btn) {
                    btn.addEventListener('click', () => {
                        sound.playSfx('click');
                        modal.style.display = 'none';
                        if (this.callbacks.onBack) {
                            this.callbacks.onBack();
                        }
                    });
                }
            }
        } else {
            sound.playSfx('threat');
            this.showDialog('varran', 'Капитан Варран',
                `«Куда прешь?! Врата наглухо заперты на тяжелые железные засовы! Сначала спустись на 30-й этаж Катакомб и уничтожь Владыку Бездны, иначе ворота не откроются!»`,
                [
                    {
                        label: '«Я вернусь в город и подготовлюсь к походу.»',
                        action: () => this.closeDialog()
                    }
                ]
            );
        }
    }

    initEvents() {
        // Выход на площадь
        this.container.querySelector('#btn-leave-south-road').addEventListener('click', () => {
            sound.playSfx('click');
            if (this.callbacks.onBack) {
                this.callbacks.onBack();
            }
        });

        // Кнопки диалогов
        this.container.querySelector('#btn-talk-varran').addEventListener('click', () => {
            sound.playSfx('click');
            this.dialogVarran();
        });

        this.container.querySelector('#btn-talk-bran').addEventListener('click', () => {
            sound.playSfx('click');
            this.dialogBran();
        });

        // Попытка пройти через ворота
        this.container.querySelector('#btn-attempt-pass').addEventListener('click', () => {
            this.attemptPass();
        });

        // Интерактивные фигурки стражников на сцене
        const guardLeft = this.container.querySelector('#npc-guard-left');
        if (guardLeft) {
            guardLeft.addEventListener('click', () => {
                sound.playSfx('click');
                this.dialogVarran();
            });
        }

        const guardRight = this.container.querySelector('#npc-guard-right');
        if (guardRight) {
            guardRight.addEventListener('click', () => {
                sound.playSfx('click');
                this.dialogBran();
            });
        }
    }
}

