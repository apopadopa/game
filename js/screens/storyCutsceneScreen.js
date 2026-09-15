import { sound } from '../audio/audioEngine.js';
import { storyTheme } from '../audio/music/storyTheme.js';
import { southRoadTheme } from '../audio/music/southRoadTheme.js';
import { townTheme } from '../audio/music/townTheme.js';
import { StoryArtworks } from '../visuals/storyArtworks.js';
import { CharacterRenderer } from '../visuals/characterRenderer.js';
import { Icons } from '../visuals/icons.js';
import { SaveSystem } from '../services/saveSystem.js';

export class StoryCutsceneScreen {
    constructor(player, cutsceneType = 'abyss_ending', callbacks = {}) {
        this.player = player;
        this.cutsceneType = cutsceneType; // 'abyss_ending' | 'grand_finale'
        this.callbacks = callbacks;

        this.container = null;
        this.currentStep = 0;
        this.isTyping = false;
        this.typingInterval = null;
        this.displayedChars = 0;
        this.typingSpeedMs = 26;
        this.currentSceneId = null;

        this.storyScript = this.buildScript();

        // Музыка для соответствующей катсцены
        if (this.cutsceneType === 'grand_finale') {
            sound.switchMusic(southRoadTheme, 1.4);
        } else {
            sound.switchMusic(storyTheme, 1.4);
        }
    }

    buildScript() {
        const pName = this.player.name || 'Странник';
        const pClass = this.player.className || 'Воин';

        if (this.cutsceneType === 'abyss_ending') {
            return [
                {
                    sceneId: 'abyss_collapse',
                    badge: 'ФИНАЛ БЕЗДНЫ',
                    chapterTitle: 'Часть I: Падение Первородной Тьмы',
                    speaker: 'Хроники Глубин',
                    speakerType: 'chronicle',
                    text: `С оглушительным гулом темная оболочка Владыки Бездны рассыпалась мириадами черных искр. Древнее хтоническое чудовище 30-го яруса, терзавшее катакомбы тысячелетиями, окончательно повержено!`
                },
                {
                    sceneId: 'abyss_collapse',
                    badge: 'ФИНАЛ БЕЗДНЫ',
                    chapterTitle: 'Часть I: Падение Первородной Тьмы',
                    speaker: 'Разлом Бездны',
                    speakerType: 'abyss',
                    text: `Черная воронка первородной пустоты в центре тронного зала судорожно содрогается. Пространственные разломы схлопываются под натиском чистого эфира, возвращая недрам их незыблемый покой.`
                },
                {
                    sceneId: 'ancient_core_purified',
                    badge: 'ТАЙНА АРКАНУМА',
                    chapterTitle: 'Часть II: Пробуждение Источника',
                    speaker: 'Сердце Арканума',
                    speakerType: 'spark',
                    text: `Сквозь трещины в расколотом базальте пробивается чистейший лазурный свет. Первородный Кристалл Титанов — священное Ядро древней империи — вспыхивает небесным пламенем, сбрасывая оковы скверны.`
                },
                {
                    sceneId: 'ancient_core_purified',
                    badge: 'ТАЙНА АРКАНУМА',
                    chapterTitle: 'Часть II: Пробуждение Источника',
                    speaker: `${pName} (${pClass})`,
                    speakerType: 'hero',
                    text: `Тепло первозданной магии касается ваших ладоней. Проклятие, отравлявшее подземелье, рассеялось без следа. Вековые защитные руны по периметру зала загораются ровным золотым огнем.`
                },
                {
                    sceneId: 'depths_cleansed',
                    badge: 'ОЧИЩЕНИЕ НЕДР',
                    chapterTitle: 'Часть III: Великое Очищение 30 Этажей',
                    speaker: 'Летопись Времен',
                    speakerType: 'chronicle',
                    text: `Великая очищающая волна устремляется ввысь по вертикальным шахтам! Этаж за этажом, все тридцать ярусов катакомб навсегда освобождаются от ядовитого тумана, гнили и порождений тьмы.`
                },
                {
                    sceneId: 'depths_cleansed',
                    badge: 'ОЧИЩЕНИЕ НЕДР',
                    chapterTitle: 'Часть III: Великое Очищение 30 Этажей',
                    speaker: 'Голос Недр',
                    speakerType: 'town',
                    text: `На поверхности колокола еще не ведают о великом событии, но воздух в катакомбах стал чист и прозрачен. Вечный ужас преисподней пал перед отвагой смертного героя.`
                },
                {
                    sceneId: 'ascent_call',
                    badge: 'ПУТЬ НА СВЕТ',
                    chapterTitle: 'Часть IV: Зов Поверхности',
                    speaker: 'Врата Судьбы',
                    speakerType: 'door',
                    text: `Великая тайна 30-го яруса разгадана, и сердце катакомб спасено. Но ваш поход еще не завершен — форпост и люди на поверхности всё еще заперты в тревоге за глухими вратами.`
                },
                {
                    sceneId: 'ascent_call',
                    badge: 'ПУТЬ НА СВЕТ',
                    chapterTitle: 'Часть IV: Зов Поверхности',
                    speaker: `${pName} (${pClass})`,
                    speakerType: 'hero',
                    text: `Пора возвращаться к солнцу. Поднимитесь на поверхность через лестницы катакомб, ступайте на Заставу Южного Тракта и возвестите гарнизону о великой победе!`
                }
            ];
        }

        if (this.cutsceneType === 'monument_memory') {
            return [
                {
                    sceneId: 'royal_hall_glory',
                    badge: 'ПАМЯТЬ ВЕКОВ',
                    chapterTitle: 'Хроника I: Величие Древнего Царства',
                    speaker: 'Летописи Предков',
                    speakerType: 'chronicle',
                    text: `Тысячелетия назад, задолго до того, как скверна Бездны проникла в недра, под землей процветала великая цивилизация зодчих и магов.`
                },
                {
                    sceneId: 'champion_monument',
                    badge: 'НАСЛЕДИЕ',
                    chapterTitle: 'Хроника II: Вечный Монумент',
                    speaker: 'Голос Камня',
                    speakerType: 'monument',
                    text: `Каждый камень этих катакомб помнит клятву древних защитников. Лишь сильнейший духом сможет пройти сквозь тьму и вернуть миру первозданный свет.`
                },
                {
                    sceneId: 'new_dawn_continent',
                    badge: 'ЗАРЯ',
                    chapterTitle: 'Хроника III: Новая Надежда',
                    speaker: 'Летописец',
                    speakerType: 'town',
                    text: `И когда герой выходит на свет, древнее пророчество исполняется. Мир озаряется золотыми лучами нового рассвета.`
                }
            ];
        }

        // grand_finale
        return [
            {
                sceneId: 'gates_unsealed',
                badge: 'ВЕЛИКИЙ ФИНАЛ',
                chapterTitle: 'Эпилог I: Распахнутые Врата',
                speaker: 'Южные Врата',
                speakerType: 'door',
                text: `С тяжелым рокотом вековых дубовых створов и звоном сброшенных цепей Южные Врата королевства распахиваются настежь! Впервые за долгие месяцы карантина яркие лучи солнца озаряют форпост.`
            },
            {
                sceneId: 'gates_unsealed',
                badge: 'ВЕЛИКИЙ ФИНАЛ',
                chapterTitle: 'Эпилог I: Распахнутые Врата',
                speaker: 'Капитан Варран',
                speakerType: 'guard',
                text: `«Смотрите, воины! Дорога на Юг свободна! Скверна отступила до самых дальних гор! Честь и слава Спасителю королевства — путь во внешний мир открыт!»`
            },
            {
                sceneId: 'triumphant_salute',
                badge: 'ТРИУМФ',
                chapterTitle: 'Эпилог II: Салют Дозора',
                speaker: 'Гарнизон Южного Дозора',
                speakerType: 'shield',
                text: `Сотни обнаженных клинков взмывают к небу в торжественном воинском салюте. Стражники бьют мечами о щиты, а собравшиеся горожане осыпают триумфатора цветами и возгласами восторга.`
            },
            {
                sceneId: 'triumphant_salute',
                badge: 'ТРИУМФ',
                chapterTitle: 'Эпилог II: Салют Дозора',
                speaker: `${pName} (${pClass})`,
                speakerType: 'hero',
                text: `Вы шагаете вдоль строя гарнизона под звуки фанфар. Смертоносный кошмар Катакомб Бездны отныне стал славной победоносной страницей истории, которую будут воспевать барды.`
            },
            {
                sceneId: 'royal_hall_glory',
                badge: 'СЛАВА КОРОЛЕВСТВА',
                chapterTitle: 'Эпилог III: Королевская Аудиенция',
                speaker: 'Верховный Глашатай',
                speakerType: 'chronicle',
                text: `Весть о сокрушении Владыки Бездны на 30-м этаже облетела весь континент. В Великом Тронном Зале столицы Верховный Король и Высший Совет торжественно преклоняют знамёна перед героем.`
            },
            {
                sceneId: 'royal_hall_glory',
                badge: 'СЛАВА КОРОЛЕВСТВА',
                chapterTitle: 'Эпилог III: Королевская Аудиенция',
                speaker: 'Королевский Указ',
                speakerType: 'crown',
                text: `«Именем Короны и всех вольных земель! За спасение королевства от вечной тьмы — жалуем ${pName} высший сан Защитника Континента и вечное имя в пантеоне легендарных героев!»`
            },
            {
                sceneId: 'new_dawn_continent',
                badge: 'НОВАЯ ЭРА',
                chapterTitle: 'Эпилог IV: Рассвет на Континенте',
                speaker: 'Хроники Новой Эры',
                speakerType: 'town',
                text: `На континент пришла новая эпоха мира и процветания. По Южному тракту вновь потянулись купеческие обозы, в долины вернулись странники, а ворота городов распахнулись навстречу новой жизни.`
            },
            {
                sceneId: 'champion_monument',
                badge: 'ИТОГИ ПОХОДА',
                chapterTitle: 'Эпилог V: Вечная Память и Сага о Герое',
                speaker: 'Летопись Бессмертия',
                speakerType: 'crown',
                isFinalSummary: true,
                text: `Ваша сага завершилась полным триумфом. Все тридцать ярусов подземелья покорены, древнее зло повержено, а ваше имя навсегда вошло в легенды!`
            }
        ];
    }

    render(container) {
        this.container = container;
        const totalSteps = this.storyScript.length;
        const isAbyss = this.cutsceneType === 'abyss_ending';

        container.innerHTML = `
            <div class="story-screen-wrap cutscene-screen-wrap">
                <!-- ВЕРХНЯЯ СТРОКА -->
                <div class="story-header-bar">
                    <div class="story-header-meta">
                        <span class="story-badge-prologue ${isAbyss ? 'badge-abyss-finale' : 'badge-grand-finale'}">
                            ${isAbyss ? Icons.skull(13) + ' ' + Icons.spark(13) : Icons.crown(14)} 
                            <span id="cutscene-badge-txt">${isAbyss ? 'ПОДЗЕМНЫЙ ФИНАЛ' : 'ТРИУМФ КОРОЛЕВСТВА'}</span>
                        </span>
                        <h2 class="story-chapter-title" id="story-chapter-title"></h2>
                    </div>
                    <div class="story-header-controls">
                        <div class="story-dots-tracker" id="story-dots-tracker">
                            ${this.renderDotsTracker()}
                        </div>
                        <button class="btn btn-secondary story-btn-skip" id="btn-skip-story" title="Пропустить катсцену">
                            ${Icons.arrowRight(14)} Пропустить
                        </button>
                    </div>
                </div>

                <!-- ЦЕНТРАЛЬНАЯ ЧАСТЬ: ВЕКТОРНАЯ КАРТИНА СЦЕНЫ -->
                <div class="story-art-stage">
                    <div class="story-art-viewport" id="story-art-viewport">
                        <!-- SVG-иллюстрация -->
                    </div>
                </div>

                <!-- НИЖНЯЯ ПАНЕЛЬ: ДИАЛОГ И БЕГУЩИЙ ТЕКСТ -->
                <div class="story-narrative-bar" id="story-narrative-bar">
                    <div class="story-narrative-inner">
                        <div class="story-speaker-badge">
                            <div class="story-speaker-icon" id="story-speaker-icon"></div>
                            <div class="story-speaker-info">
                                <span class="story-speaker-name" id="story-speaker-name"></span>
                                <span class="story-hint-speed">ЛКМ / Пробел: далее</span>
                            </div>
                        </div>

                        <div class="story-text-body">
                            <p class="story-typewriter-line" id="story-typewriter-line"></p>
                            <span class="story-blinking-cursor" id="story-blinking-cursor"></span>
                        </div>

                        <div class="story-action-row" id="story-action-slot">
                            <span class="story-progress-counter" id="story-progress-counter">1 / ${totalSteps}</span>
                            <button class="btn btn-primary story-btn-next" id="btn-next-story">
                                Далее ${Icons.arrowRight(14)}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- МОДАЛЬНОЕ ОКНО ИТОГОВ ГЕРОЯ (ДЛЯ ФИНАЛЬНОГО ШАГА ГРАНД-ФИНАЛА) -->
            <div class="dungeon-chest-modal-backdrop hidden" id="finale-summary-modal" style="display: none;">
                <div class="chest-modal-dialog epilogue-dialog anim-pop-in">
                    <div class="chest-modal-header epilogue-header">
                        <span class="victory-icon">${Icons.crown(48)}</span>
                        <h2 class="chest-modal-title">ВЕЛИКИЙ ТРИУМФ!</h2>
                        <div class="chest-modal-sub">Королевство спасено • Все 30 этажей Катакомб покорены</div>
                    </div>
                    <div class="chest-modal-content epilogue-content">
                        <p class="epilogue-text">
                            Древнее проклятие пало, Южные Врата распахнуты навстречу свободе. 
                            <strong>${this.player.name}</strong> навсегда вошел в летопись континента как величайший победитель Тьмы!
                        </p>

                        <div class="epilogue-hero-summary">
                            <div class="reward-entry"><span class="reward-label">Имя героя:</span> <strong>${this.player.name}</strong></div>
                            <div class="reward-entry"><span class="reward-label">Класс:</span> <strong>${this.player.className}</strong></div>
                            <div class="reward-entry"><span class="reward-label">Уровень:</span> <strong>${this.player.level}</strong></div>
                            <div class="reward-entry"><span class="reward-label">Золото:</span> <strong>${this.player.gold} монет</strong></div>
                            <div class="reward-entry"><span class="reward-label">Подвиг:</span> <strong style="color: #facc15;">Все 30 этажей очищены!</strong></div>
                        </div>
                    </div>
                    <div class="chest-modal-actions epilogue-actions" style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                        <button class="btn btn-primary btn-lg btn-pulse-gold" id="btn-finale-roam">
                            ${Icons.door(16)} Продолжить исследование мира
                        </button>
                        <button class="btn btn-secondary btn-lg" id="btn-finale-mainmenu">
                            ${(typeof Icons.menu === 'function' ? Icons.menu(16) : (typeof Icons.door === 'function' ? Icons.door(16) : ''))} В главное меню
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.initEvents();
        this.showStep(0);
    }

    renderDotsTracker() {
        const uniqueScenes = [...new Set(this.storyScript.map(s => s.sceneId))];
        return uniqueScenes.map((sc, i) => `
            <span class="story-dot ${i === 0 ? 'active' : ''}" data-scene="${sc}" title="Шаг ${i + 1}"></span>
        `).join('');
    }

    updateDotsTracker(sceneId) {
        const uniqueScenes = [...new Set(this.storyScript.map(s => s.sceneId))];
        const dots = this.container.querySelectorAll('.story-dot');
        const activeIdx = uniqueScenes.indexOf(sceneId);

        dots.forEach((d, idx) => {
            if (idx === activeIdx) {
                d.classList.add('active');
            } else if (idx < activeIdx) {
                d.classList.add('completed');
                d.classList.remove('active');
            } else {
                d.classList.remove('active', 'completed');
            }
        });
    }

    showStep(stepIndex) {
        if (stepIndex >= this.storyScript.length) {
            this.finishCutscene();
            return;
        }

        this.currentStep = stepIndex;
        const item = this.storyScript[stepIndex];
        const total = this.storyScript.length;

        // Метаданные
        const titleEl = this.container.querySelector('#story-chapter-title');
        if (titleEl) titleEl.textContent = item.chapterTitle;

        const badgeEl = this.container.querySelector('#cutscene-badge-txt');
        if (badgeEl && item.badge) badgeEl.textContent = item.badge;

        const speakerNameEl = this.container.querySelector('#story-speaker-name');
        if (speakerNameEl) speakerNameEl.textContent = item.speaker;

        const counterEl = this.container.querySelector('#story-progress-counter');
        if (counterEl) counterEl.textContent = `${stepIndex + 1} / ${total}`;

        const btnNext = this.container.querySelector('#btn-next-story');
        if (btnNext) {
            if (stepIndex === total - 1) {
                if (this.cutsceneType === 'abyss_ending') {
                    btnNext.innerHTML = `${Icons.stairsUp(16)} Вернуться в Катакомбы`;
                    btnNext.classList.add('btn-pulse-gold');
                } else {
                    btnNext.innerHTML = `${Icons.crown(16)} Завершить Триумф`;
                    btnNext.classList.add('btn-pulse-gold');
                }
            } else {
                btnNext.innerHTML = `Далее ${Icons.arrowRight(14)}`;
                btnNext.classList.remove('btn-pulse-gold');
            }
        }

        // Аватар рассказчика
        const speakerIconEl = this.container.querySelector('#story-speaker-icon');
        if (speakerIconEl) {
            if (item.speakerType === 'hero') {
                speakerIconEl.innerHTML = CharacterRenderer.renderBust(this.player.visuals, this.player.classId, this.player.equipment);
            } else if (item.speakerType === 'abyss') {
                speakerIconEl.innerHTML = Icons.eye(24);
            } else if (item.speakerType === 'guard' || item.speakerType === 'shield') {
                speakerIconEl.innerHTML = Icons.shield(24);
            } else if (item.speakerType === 'door') {
                speakerIconEl.innerHTML = Icons.door(24);
            } else if (item.speakerType === 'spark') {
                speakerIconEl.innerHTML = Icons.spark(24);
            } else if (item.speakerType === 'crown') {
                speakerIconEl.innerHTML = Icons.crown(24);
            } else if (item.speakerType === 'town') {
                speakerIconEl.innerHTML = Icons.castle(24);
            } else {
                speakerIconEl.innerHTML = Icons.scroll(24);
            }
        }

        // Центральная картинка
        if (this.currentSceneId !== item.sceneId) {
            this.currentSceneId = item.sceneId;
            const viewport = this.container.querySelector('#story-art-viewport');
            if (viewport) {
                viewport.classList.remove('art-fade-in');
                void viewport.offsetWidth;
                viewport.innerHTML = StoryArtworks.getArtwork(item.sceneId);
                viewport.classList.add('art-fade-in');
            }
            this.updateDotsTracker(item.sceneId);
        }

        // Печатная машинка
        this.startTypewriter(item.text);
    }

    startTypewriter(fullText) {
        if (this.typingInterval) {
            clearInterval(this.typingInterval);
            this.typingInterval = null;
        }

        const textEl = this.container.querySelector('#story-typewriter-line');
        const cursorEl = this.container.querySelector('#story-blinking-cursor');
        if (!textEl) return;

        textEl.textContent = '';
        if (cursorEl) cursorEl.classList.remove('idle');

        this.isTyping = true;
        this.displayedChars = 0;
        let charIndex = 0;
        let soundThrottle = 0;

        this.typingInterval = setInterval(() => {
            if (charIndex < fullText.length) {
                const char = fullText[charIndex];
                textEl.textContent += char;
                charIndex++;
                this.displayedChars = charIndex;

                if (char !== ' ' && char !== '\n' && soundThrottle % 2 === 0) {
                    sound.playTextSound();
                }
                soundThrottle++;
            } else {
                this.completeTyping(fullText);
            }
        }, this.typingSpeedMs);
    }

    completeTyping(fullText) {
        if (this.typingInterval) {
            clearInterval(this.typingInterval);
            this.typingInterval = null;
        }
        this.isTyping = false;
        const textEl = this.container.querySelector('#story-typewriter-line');
        const cursorEl = this.container.querySelector('#story-blinking-cursor');
        if (textEl) textEl.textContent = fullText;
        if (cursorEl) cursorEl.classList.add('idle');
    }

    handleAdvance() {
        const item = this.storyScript[this.currentStep];
        if (!item) return;

        if (this.isTyping) {
            this.completeTyping(item.text);
            return;
        }

        sound.playSfx('tab');
        this.showStep(this.currentStep + 1);
    }

    finishCutscene() {
        this.cleanup();
        sound.playSfx('selectHero');

        if (this.cutsceneType === 'abyss_ending') {
            this.player.hasViewedAbyssEnding = true;
            SaveSystem.save(this.player);
            if (this.callbacks.onFinish) {
                this.callbacks.onFinish();
            }
        } else if (this.cutsceneType === 'monument_memory') {
            sound.playSfx('victory');
            if (this.callbacks.onFinish) {
                this.callbacks.onFinish();
            }
        } else {
            // grand_finale: показываем итоговое модальное окно эпилога
            sound.playSfx('victory');
            this.player.hasOpenedSouthGates = true;
            SaveSystem.save(this.player);

            const modal = this.container?.querySelector('#finale-summary-modal');
            if (modal) {
                modal.classList.remove('hidden');
                modal.style.display = 'flex';
            } else if (this.callbacks.onFinish) {
                this.callbacks.onFinish();
            }
        }
    }

    initEvents() {
        const btnNext = this.container.querySelector('#btn-next-story');
        if (btnNext) {
            btnNext.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleAdvance();
            });
        }

        const bar = this.container.querySelector('#story-narrative-bar');
        if (bar) {
            bar.addEventListener('click', (e) => {
                if (e.target.closest('#btn-next-story')) return;
                this.handleAdvance();
            });
        }

        const btnSkip = this.container.querySelector('#btn-skip-story');
        if (btnSkip) {
            btnSkip.addEventListener('click', (e) => {
                e.stopPropagation();
                this.finishCutscene();
            });
        }

        // Модальное окно гранд-финала
        const btnRoam = this.container.querySelector('#btn-finale-roam');
        if (btnRoam) {
            btnRoam.addEventListener('click', () => {
                sound.playSfx('click');
                if (this.callbacks.onFinish) {
                    this.callbacks.onFinish();
                }
            });
        }

        const btnMainMenu = this.container.querySelector('#btn-finale-mainmenu');
        if (btnMainMenu) {
            btnMainMenu.addEventListener('click', () => {
                sound.playSfx('click');
                if (this.callbacks.onMainMenu) {
                    this.callbacks.onMainMenu();
                } else if (this.callbacks.onFinish) {
                    this.callbacks.onFinish();
                }
            });
        }

        this.boundKeyHandler = (e) => {
            if (e.code === 'Space' || e.code === 'Enter' || e.code === 'ArrowRight') {
                e.preventDefault();
                this.handleAdvance();
            } else if (e.code === 'Escape') {
                this.finishCutscene();
            }
        };
        window.addEventListener('keydown', this.boundKeyHandler);
    }

    cleanup() {
        if (this.typingInterval) {
            clearInterval(this.typingInterval);
            this.typingInterval = null;
        }
        if (this.boundKeyHandler) {
            window.removeEventListener('keydown', this.boundKeyHandler);
            this.boundKeyHandler = null;
        }
    }
}
