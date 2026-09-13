import { sound } from '../audio/audioEngine.js';
import { storyTheme } from '../audio/music/storyTheme.js';
import { townTheme } from '../audio/music/townTheme.js';
import { StoryArtworks } from '../visuals/storyArtworks.js';
import { CharacterRenderer } from '../visuals/characterRenderer.js';
import { Icons } from '../visuals/icons.js';

export class StoryPrologueScreen {
    constructor(player, callbacks = {}) {
        this.player = player;
        this.callbacks = callbacks;

        this.container = null;
        this.currentStep = 0;
        this.isTyping = false;
        this.typingInterval = null;
        this.displayedChars = 0;
        this.typingSpeedMs = 28; // миллисекунд на символ
        this.currentSceneId = null;

        this.storyScript = this.buildStoryScript();

        sound.switchMusic(storyTheme, 1.4);
    }

    buildStoryScript() {
        const pName = this.player.name || 'Странник';
        const pClass = this.player.className || 'Воин';
        const pOrigin = this.player.origin?.name || 'Искатель приключений';

        return [
            // СЦЕНА 1: Древняя Империя
            {
                sceneId: 'ancient_empire',
                chapterNumber: 1,
                chapterTitle: 'Часть I: Золотая Эра Арканума',
                speaker: 'Летопись Времен',
                speakerType: 'chronicle',
                text: `В незапамятные времена, за тысячи лет до того, как смертные впервые увидели солнце, глубоко в недрах континента процветала великая Империя Арканум.`
            },
            {
                sceneId: 'ancient_empire',
                chapterNumber: 1,
                chapterTitle: 'Часть I: Золотая Эра Арканума',
                speaker: 'Летопись Времен',
                speakerType: 'chronicle',
                text: `Титаны камня и повелители чистого эфира воздвигли цитадели невиданной красоты. В вечной ночи подземелий сияли колоссальные кристаллы, даруя жителям неиссякаемую силу, процветание и покой.`
            },

            // СЦЕНА 2: Пробуждение Бездны
            {
                sceneId: 'awakening_abyss',
                chapterNumber: 2,
                chapterTitle: 'Часть II: Гордыня и Черный Разлом',
                speaker: 'Глас Бездны',
                speakerType: 'abyss',
                text: `Но жажда абсолютного могущества ослепила высших архимагов. Их колоссальные буры вонзились в саму сердцевину мира — на тридцатый ярус подземного царства.`
            },
            {
                sceneId: 'awakening_abyss',
                chapterNumber: 2,
                chapterTitle: 'Часть II: Гордыня и Черный Разлом',
                speaker: 'Глас Бездны',
                speakerType: 'abyss',
                text: `Они пробили то, что должно было оставаться сокрытым навечно. Из пылающего разлома поднялась Первородная Тьма — древний хтонический ужас, пожирающий свет, материю и рассудок.`
            },

            // СЦЕНА 3: Печать 30 Ярусов
            {
                sceneId: 'sealing_depths',
                chapterNumber: 3,
                chapterTitle: 'Часть III: Жертва Хранителей',
                speaker: 'Клятва Ордена',
                speakerType: 'chronicle',
                text: `За считанные дни сияющие залы обратились в кипящий некрополь. Мутации и безумие искажали плоть строителей, обращая благородных титанов в кровожадных тварей.`
            },
            {
                sceneId: 'sealing_depths',
                chapterNumber: 3,
                chapterTitle: 'Часть III: Жертва Хранителей',
                speaker: 'Клятва Ордена',
                speakerType: 'chronicle',
                text: `Ценой сотен тысяч жизней последние Великие Паладины сковали бездну. Тридцать этажей Катакомб были запечатаны адамантовыми рунными замками, отрезав чудовищ от внешнего мира.`
            },

            // СЦЕНА 4: Пробуждение Скверны
            {
                sceneId: 'miasma_rising',
                chapterNumber: 4,
                chapterTitle: 'Часть IV: Шепот из Глубин',
                speaker: 'Тревожные Вести',
                speakerType: 'warning',
                text: `Минули эпохи. Люди построили на поверхности новые города и королевства, посчитав древний катаклизм детской сказкой. Но время не щадит даже адамант — древние печати дали трещину.`
            },
            {
                sceneId: 'miasma_rising',
                chapterNumber: 4,
                chapterTitle: 'Часть IV: Шепот из Глубин',
                speaker: 'Тревожные Вести',
                speakerType: 'warning',
                text: `С нижних ярусов вновь поднялся ядовитый туман. Горные дозоры перебиты, из шахт хлынули порождения мглы, а главный торговый Южный тракт оказался отрезан от внешнего мира.`
            },

            // СЦЕНА 5: Пророческий Сон и Герой
            {
                sceneId: 'hero_dream',
                chapterNumber: 5,
                chapterTitle: 'Часть V: Зов Предначертания',
                speaker: `${pName} (${pClass})`,
                speakerType: 'hero',
                text: `Каждую ночь вам являлся один и тот же сон: бесконечная каменная спираль, уходящая в бездонную тьму, и тихий шепот, зовущий вас по имени.`
            },
            {
                sceneId: 'hero_dream',
                chapterNumber: 5,
                chapterTitle: 'Часть V: Зов Предначертания',
                speaker: `${pName} (${pClass})`,
                speakerType: 'hero',
                text: `Древний осколок реликвии, доставшийся вам как ${pOrigin}, вдруг озарился ясным небесным пламенем. Сомнений не осталось: ваша судьба связана с Катакомбами Бездны.`
            },

            // СЦЕНА 6: Каменный Предел
            {
                sceneId: 'frontier_town',
                chapterNumber: 6,
                chapterTitle: 'Часть VI: На Краю Бездны',
                speaker: 'Хроники Предела',
                speakerType: 'town',
                text: `Сквозь туманы и горные тропы вы добрались до форпоста Каменный Предел — последнего укрепленного оплота цивилизации на самом краю черного провала.`
            },
            {
                sceneId: 'frontier_town',
                chapterNumber: 6,
                chapterTitle: 'Часть VI: На Краю Бездны',
                speaker: 'Хроники Предела',
                speakerType: 'town',
                text: `Здесь кипит жизнь: в таверне собираются бесстрашные наемники, в кузнице звенит зачарованная сталь, а жрецы в Храме Света возносят молитвы за тех, кто дерзнет спуститься вниз.`
            },

            // СЦЕНА 7: Врата Катакомб
            {
                sceneId: 'dungeon_descent',
                chapterNumber: 7,
                chapterTitle: 'Часть VII: Спуск во Тьму',
                speaker: 'Врата Преисподней',
                speakerType: 'door',
                text: `Стражники Южного тракта непреклонны: пока древний Владыка Бездны на 30-м этаже не будет повержен, ворота королевства останутся наглухо закрыты.`
            },
            {
                sceneId: 'dungeon_descent',
                chapterNumber: 7,
                chapterTitle: 'Часть VII: Спуск во Тьму',
                speaker: 'Врата Преисподней',
                speakerType: 'door',
                text: `Проверьте клинок, поправьте доспехи и сделайте глубокий вдох. Спуск в Катакомбы открыт. Вперед, ${pName}, навстречу бессмертной славе!`
            }
        ];
    }

    render(container) {
        this.container = container;
        const totalSteps = this.storyScript.length;

        container.innerHTML = `
            <div class="story-screen-wrap">
                <!-- ВЕРХНЯЯ СТРОКА: ЗАГОЛОВОК, ГЛАВА И КНОПКА ПРОПУСКА -->
                <div class="story-header-bar">
                    <div class="story-header-meta">
                        <span class="story-badge-prologue">${Icons.scroll(14)} ПРОЛОГ</span>
                        <h2 class="story-chapter-title" id="story-chapter-title"></h2>
                    </div>
                    <div class="story-header-controls">
                        <div class="story-dots-tracker" id="story-dots-tracker">
                            ${this.renderDotsTracker()}
                        </div>
                        <button class="btn btn-secondary story-btn-skip" id="btn-skip-story" title="Пропустить пролог и перейти в город">
                            ${Icons.arrowRight(14)} Пропустить историю
                        </button>
                    </div>
                </div>

                <!-- ЦЕНТРАЛЬНАЯ ЧАСТЬ: ВЕКТОРНАЯ КАРТИНА СЦЕНЫ -->
                <div class="story-art-stage">
                    <div class="story-art-viewport" id="story-art-viewport">
                        <!-- Здесь динамически сменяется SVG-иллюстрация -->
                    </div>
                </div>

                <!-- НИЖНЯЯ ПАНЕЛЬ: ДИАЛОГОВАЯ СТРОКА И БЕГУЩИЙ ТЕКСТ -->
                <div class="story-narrative-bar" id="story-narrative-bar">
                    <div class="story-narrative-inner">
                        <div class="story-speaker-badge">
                            <div class="story-speaker-icon" id="story-speaker-icon"></div>
                            <div class="story-speaker-info">
                                <span class="story-speaker-name" id="story-speaker-name"></span>
                                <span class="story-hint-speed">ЛКМ / Пробел: продолжить</span>
                            </div>
                        </div>

                        <div class="story-text-body">
                            <p class="story-typewriter-line" id="story-typewriter-line"></p>
                            <span class="story-blinking-cursor" id="story-blinking-cursor"></span>
                        </div>

                        <div class="story-action-row">
                            <span class="story-progress-counter" id="story-progress-counter">1 / ${totalSteps}</span>
                            <button class="btn btn-primary story-btn-next" id="btn-next-story">
                                Далее ${Icons.arrowRight(14)}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.initEvents();
        this.showStep(0);
    }

    renderDotsTracker() {
        const uniqueScenes = ['ancient_empire', 'awakening_abyss', 'sealing_depths', 'miasma_rising', 'hero_dream', 'frontier_town', 'dungeon_descent'];
        return uniqueScenes.map((sc, i) => `
            <span class="story-dot ${i === 0 ? 'active' : ''}" data-scene="${sc}" title="Глава ${i + 1}"></span>
        `).join('');
    }

    updateDotsTracker(sceneId) {
        const dots = this.container.querySelectorAll('.story-dot');
        const uniqueScenes = ['ancient_empire', 'awakening_abyss', 'sealing_depths', 'miasma_rising', 'hero_dream', 'frontier_town', 'dungeon_descent'];
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
            this.finishPrologue();
            return;
        }

        this.currentStep = stepIndex;
        const item = this.storyScript[stepIndex];
        const total = this.storyScript.length;

        // Обновляем метаданные
        const titleEl = this.container.querySelector('#story-chapter-title');
        if (titleEl) titleEl.textContent = item.chapterTitle;

        const speakerNameEl = this.container.querySelector('#story-speaker-name');
        if (speakerNameEl) speakerNameEl.textContent = item.speaker;

        const counterEl = this.container.querySelector('#story-progress-counter');
        if (counterEl) counterEl.textContent = `${stepIndex + 1} / ${total}`;

        const btnNext = this.container.querySelector('#btn-next-story');
        if (btnNext) {
            if (stepIndex === total - 1) {
                btnNext.innerHTML = `${Icons.castle(16)} Вступить в Каменный Предел`;
                btnNext.classList.add('btn-pulse-gold');
            } else {
                btnNext.innerHTML = `Далее ${Icons.arrowRight(14)}`;
                btnNext.classList.remove('btn-pulse-gold');
            }
        }

        // Обновляем аватар рассказчика
        const speakerIconEl = this.container.querySelector('#story-speaker-icon');
        if (speakerIconEl) {
            if (item.speakerType === 'hero') {
                speakerIconEl.innerHTML = CharacterRenderer.renderBust(this.player.visuals, this.player.classId, this.player.equipment);
            } else if (item.speakerType === 'abyss') {
                speakerIconEl.innerHTML = Icons.eye(24);
            } else if (item.speakerType === 'warning') {
                speakerIconEl.innerHTML = Icons.warning(24);
            } else if (item.speakerType === 'door') {
                speakerIconEl.innerHTML = Icons.door(24);
            } else if (item.speakerType === 'town') {
                speakerIconEl.innerHTML = Icons.castle(24);
            } else {
                speakerIconEl.innerHTML = Icons.scroll(24);
            }
        }

        // Если сцена изменилась, обновляем центральную картинку
        if (this.currentSceneId !== item.sceneId) {
            this.currentSceneId = item.sceneId;
            const viewport = this.container.querySelector('#story-art-viewport');
            if (viewport) {
                viewport.classList.remove('art-fade-in');
                void viewport.offsetWidth; // trigger reflow
                viewport.innerHTML = StoryArtworks.getArtwork(item.sceneId);
                viewport.classList.add('art-fade-in');
            }
            this.updateDotsTracker(item.sceneId);
        }

        // Запускаем печатную машинку текста со звуком
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

                // Проигрываем приятный мягкий щелчок на каждые 2 символа
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

        // Если строка еще печатается — мгновенно завершаем печать
        if (this.isTyping) {
            this.completeTyping(item.text);
            return;
        }

        // Если строка уже выведена — переходим к следующему шагу
        sound.playSfx('tab');
        this.showStep(this.currentStep + 1);
    }

    finishPrologue() {
        this.cleanup();
        sound.playSfx('selectHero');
        if (this.callbacks.onFinish) {
            this.callbacks.onFinish();
        }
    }

    initEvents() {
        // Кнопка перехода к следующему тексту
        const btnNext = this.container.querySelector('#btn-next-story');
        if (btnNext) {
            btnNext.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleAdvance();
            });
        }

        // Клик по диалоговой плашке также продвигает текст
        const bar = this.container.querySelector('#story-narrative-bar');
        if (bar) {
            bar.addEventListener('click', (e) => {
                if (e.target.closest('#btn-next-story')) return;
                this.handleAdvance();
            });
        }

        // Кнопка пропуска пролога
        const btnSkip = this.container.querySelector('#btn-skip-story');
        if (btnSkip) {
            btnSkip.addEventListener('click', (e) => {
                e.stopPropagation();
                this.finishPrologue();
            });
        }

        // Клавиатура: Пробел / Enter / Стрелка вправо
        this.boundKeyHandler = (e) => {
            if (e.code === 'Space' || e.code === 'Enter' || e.code === 'ArrowRight') {
                e.preventDefault();
                this.handleAdvance();
            } else if (e.code === 'Escape') {
                this.finishPrologue();
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

