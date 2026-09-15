import { Player } from '../entities/player.js';
import { CharacterRenderer } from '../visuals/characterRenderer.js';
import { EquipmentVisuals } from '../visuals/equipmentVisuals.js';
import { Icons } from '../visuals/icons.js';
import { sound } from '../audio/audioEngine.js';

export class CharacterCreation {
    constructor(callbacks) {
        this.callbacks = callbacks;

        this.gender = 'male';
        this.name = 'Рагнар';
        this.availablePoints = 5;

        this.visuals = {
            gender: 'male',
            skinColor: '#d69f7e',
            hairStyle: 'short',
            hairColor: '#2b1d16',
            eyeColor: '#4b9cd3',
            beard: 'none',
            accessory: 'none',
            outfitColor: '#5a4634'
        };

        this.maleHairStyles = [
            { id: 'spiky_wild', name: 'Взъерошенные иглы' },
            { id: 'messy_bangs', name: 'Ниспадающие пряди' },
            { id: 'short', name: 'Короткая классика' },
            { id: 'messy', name: 'Творческий беспорядок' },
            { id: 'curtain', name: 'Шторы (пробор)' },
            { id: 'undercut', name: 'Андеркат' },
            { id: 'fade_side', name: 'Фейд с пробором' },
            { id: 'topknot', name: 'Топ-кнот (узел)' },
            { id: 'mohawk', name: 'Боевой ирокез' },
            { id: 'dreadlocks', name: 'Дреды' },
            { id: 'viking_braid', name: 'Северная коса' },
            { id: 'curly_crop', name: 'Кудрявый кроп' },
            { id: 'noble_wavy', name: 'Благородные волны' },
            { id: 'ponytail', name: 'Низкий хвост' },
            { id: 'ponytail_high', name: 'Высокий хвост' },
            { id: 'long', name: 'Длинные прямые' },
            { id: 'bald', name: 'Бритый наголо' }
        ];

        this.femaleHairStyles = [
            { id: 'messy_bangs', name: 'Ниспадающие пряди' },
            { id: 'spiky_wild', name: 'Взъерошенные иглы' },
            { id: 'bob', name: 'Каре' },
            { id: 'pixie', name: 'Короткая пикси' },
            { id: 'short_messy', name: 'Короткие пряди' },
            { id: 'hime_cut', name: 'Химэ (прямой срез)' },
            { id: 'bun_top', name: 'Высокий пучок' },
            { id: 'twin_buns', name: 'Двойные пучки' },
            { id: 'ponytail', name: 'Классический хвост' },
            { id: 'ponytail_high', name: 'Высокий конский хвост' },
            { id: 'twin_braids', name: 'Две косы' },
            { id: 'single_braid', name: 'Толстая коса' },
            { id: 'side_braid', name: 'Коса набок' },
            { id: 'long', name: 'Длинные прямые' },
            { id: 'long_waves', name: 'Длинные волны' },
            { id: 'curls_loose', name: 'Пышные кудри' },
            { id: 'noble_wavy', name: 'Благородные волны' },
            { id: 'valkyrie', name: 'Косы Валькирии' },
            { id: 'warrior_halfup', name: 'Боевой полухвост' },
            { id: 'undercut_fem', name: 'Бунтарский андеркат' },
            { id: 'asymmetric', name: 'Асимметрия' }
        ];

        this.beards = [
            { id: 'none', name: 'Гладко выбрит' },
            { id: 'stubble', name: 'Легкая щетина' },
            { id: 'heavy_stubble', name: 'Трехдневная щетина' },
            { id: 'short_boxed', name: 'Аккуратная борода' },
            { id: 'full', name: 'Густая борода' },
            { id: 'goatee', name: 'Эспаньолка' },
            { id: 'van_dyke', name: 'Ван Дейк' },
            { id: 'braided', name: 'Борода с косицей' },
            { id: 'viking_double', name: 'Двойные косы викинга' },
            { id: 'mustache_classic', name: 'Классические усы' },
            { id: 'mustache_horseshoe', name: 'Усы-подкова' },
            { id: 'mutton_chops', name: 'Бакенбарды' }
        ];

        this.maleAccessories = [
            { id: 'none', name: 'Нет' },
            { id: 'blindfold', name: 'Тёмная повязка созерцателя' },
            { id: 'sunglasses', name: 'Круглые тёмные очки' },
            { id: 'cloth_bandage', name: 'Льняная повязка на глаза' },
            { id: 'eyepatch', name: 'Кожаная повязка' },
            { id: 'eyepatch_skull', name: 'Пиратская повязка' },
            { id: 'scar_eye', name: 'Шрам через глаз' },
            { id: 'scar', name: 'Боевой шрам на щеке' },
            { id: 'scar_cross', name: 'Крестообразный шрам' },
            { id: 'scar_slash', name: 'След когтей' },
            { id: 'mask', name: 'Тканевая полумаска' },
            { id: 'porcelain_mask', name: 'Фарфоровая полумаска' },
            { id: 'monocle', name: 'Аристократический монокль' },
            { id: 'warpaint', name: 'Боевой раскрас' },
            { id: 'earrings', name: 'Золотая серьга' }
        ];

        this.femaleAccessories = [
            { id: 'none', name: 'Нет' },
            { id: 'blindfold', name: 'Тёмная повязка созерцателя' },
            { id: 'sunglasses', name: 'Круглые тёмные очки' },
            { id: 'cloth_bandage', name: 'Льняная повязка на глаза' },
            { id: 'circlet', name: 'Золотая диадема' },
            { id: 'earrings', name: 'Жемчужные серьги' },
            { id: 'earrings_feathers', name: 'Серьги с перьями' },
            { id: 'scar_eye', name: 'Шрам через глаз' },
            { id: 'scar', name: 'Изящный шрам' },
            { id: 'scar_cross', name: 'Крестообразный шрам' },
            { id: 'mask', name: 'Шелковая полумаска' },
            { id: 'porcelain_mask', name: 'Фарфоровая полумаска' },
            { id: 'monocle', name: 'Монокль на цепочке' },
            { id: 'warpaint', name: 'Ритуальный раскрас' }
        ];

        this.palettes = {
            skin: [
                { color: '#fff0e5', name: 'Фарфор' },
                { color: '#fae0d0', name: 'Слоновая кость' },
                { color: '#f5d3b3', name: 'Светлый персик' },
                { color: '#f1c29b', name: 'Песочный' },
                { color: '#e6b280', name: 'Золотистый загар' },
                { color: '#d69f7e', name: 'Южный загар' },
                { color: '#c6865a', name: 'Бронза' },
                { color: '#a36c4b', name: 'Тёмный янтарь' },
                { color: '#855132', name: 'Горький шоколад' },
                { color: '#5c3826', name: 'Глубокое дерево' },
                { color: '#3d2417', name: 'Эбеновое дерево' },
                { color: '#e0d2c7', name: 'Бледный пепел' },
                { color: '#87a96b', name: 'Лесной эльф' },
                { color: '#688c5a', name: 'Оркский малахит' },
                { color: '#7c8b9e', name: 'Подземный дроу' },
                { color: '#9d87a5', name: 'Сумеречный лиловый' }
            ],
            hair: [
                { color: '#ffffff', name: 'Первозданный снег' },
                { color: '#f1f5f9', name: 'Платиновый иней' },
                { color: '#d1d5db', name: 'Пепельное серебро' },
                { color: '#9ca3af', name: 'Стальной дым' },
                { color: '#4b5563', name: 'Мокрый графит' },
                { color: '#161618', name: 'Вороново крыло' },
                { color: '#2b1d16', name: 'Тёмный каштан' },
                { color: '#422518', name: 'Жареный кофе' },
                { color: '#6b321a', name: 'Медный дуб' },
                { color: '#8b4513', name: 'Благородный орех' },
                { color: '#a0522d', name: 'Красное дерево' },
                { color: '#b84920', name: 'Огненно-рыжий' },
                { color: '#d97706', name: 'Янтарное золото' },
                { color: '#d8b168', name: 'Пшеничный блонд' },
                { color: '#fef08a', name: 'Солнечный лен' },
                { color: '#a855f7', name: 'Мистический аметист' },
                { color: '#5b328a', name: 'Королевский пурпур' },
                { color: '#3b82f6', name: 'Сапфировая волна' },
                { color: '#06b6d4', name: 'Небесная лазурь' },
                { color: '#10b981', name: 'Изумрудный мох' },
                { color: '#245a4a', name: 'Глубокая хвоя' },
                { color: '#ec4899', name: 'Розовый кварц' },
                { color: '#dc2626', name: 'Багряный рубин' },
                { color: '#6366f1', name: 'Грозовой индиго' }
            ],
            eye: [
                { color: '#00f0ff', name: 'Лазурная Бездна (Око Бесконечности)' },
                { color: '#38bdf8', name: 'Небесно-голубой' },
                { color: '#4b9cd3', name: 'Морская лазурь' },
                { color: '#1d4ed8', name: 'Глубокий сапфир' },
                { color: '#10b981', name: 'Изумрудный' },
                { color: '#2e7d32', name: 'Хвойный нефрит' },
                { color: '#84cc16', name: 'Светло-оливковый' },
                { color: '#8d5b2c', name: 'Теплый янтарь' },
                { color: '#5c3826', name: 'Темный карий' },
                { color: '#2b1810', name: 'Черный обсидиан' },
                { color: '#c0392b', name: 'Кровавый рубин' },
                { color: '#f97316', name: 'Пылающий топаз' },
                { color: '#facc15', name: 'Золотой дракон' },
                { color: '#8e44ad', name: 'Тайный аметист' },
                { color: '#c084fc', name: 'Лавандовый' },
                { color: '#dcdcdc', name: 'Ледяное серебро' },
                { color: '#64748b', name: 'Грозовая сталь' },
                { color: '#f43f5e', name: 'Алая роза' },
                { color: 'hetero_blue_gold', name: 'Гетерохромия (Лазурь и Золото)' },
                { color: 'hetero_red_cyan', name: 'Гетерохромия (Рубин и Циан)' }
            ],
            outfit: [
                { color: '#11121c', name: 'Полночная бездна (Ткань мага)' },
                { color: '#262626', name: 'Угольно-черный' },
                { color: '#5a4634', name: 'Холщовый лен' },
                { color: '#785438', name: 'Дубленая кожа' },
                { color: '#3b4d3c', name: 'Охотничий ельник' },
                { color: '#1e3a29', name: 'Глубокий малахит' },
                { color: '#2c3e50', name: 'Морской бушлат' },
                { color: '#1e293b', name: 'Стальной кобальт' },
                { color: '#4a1525', name: 'Благородный бордо' },
                { color: '#831843', name: 'Королевский бархат' },
                { color: '#3e3746', name: 'Сумеречный шелк' },
                { color: '#4338ca', name: 'Индиго чародея' },
                { color: '#854d0e', name: 'Горчичное сукно' },
                { color: '#d97706', name: 'Шафрановый плащ' },
                { color: '#f1f5f9', name: 'Белоснежный сатин' },
                { color: '#94a3b8', name: 'Пепельное сукно' }
            ]
        };

        this.classes = {
            warrior: {
                name: 'Воин',
                desc: 'Мастер рукопашного боя. Стойкий и сильный защитник.',
                baseStats: { strength: 6, agility: 3, intelligence: 1, vitality: 5 }
            },
            rogue: {
                name: 'Плут',
                desc: 'Быстрый и скрытный боец. Высокий шанс критического удара.',
                baseStats: { strength: 3, agility: 6, intelligence: 2, vitality: 4 }
            },
            mage: {
                name: 'Чародей',
                desc: 'Ученик тайных искусств. Способен творить разрушительные чары.',
                baseStats: { strength: 1, agility: 3, intelligence: 7, vitality: 3 }
            },
            ranger: {
                name: 'Следопыт',
                desc: 'Охотник чащи. Меткий стрелок из лука и знаток выживания.',
                baseStats: { strength: 4, agility: 5, intelligence: 2, vitality: 4 }
            }
        };
        this.selectedClassId = 'warrior';

        this.origins = [
            { id: 'noble', name: 'Опальный дворянин', desc: '+120 стартового золота', bonusGold: 120 },
            { id: 'thief', name: 'Вор из трущоб', desc: '+10% к золоту с монстров', bonusGold: 30 },
            { id: 'mercenary', name: 'Бывший наёмник', desc: '+1 к Силе и Живучести', bonusGold: 50, statBonus: { strength: 1, vitality: 1 } },
            { id: 'monk', name: 'Монах-изгнанник', desc: '+15 макс. маны', bonusGold: 20 }
        ];
        this.selectedOrigin = this.origins[0];

        this.traits = [
            { id: 'thick_skin', name: 'Толстокожий', desc: '+2 к постоянной защите' },
            { id: 'eagle_eye', name: 'Орлиный глаз', desc: '+8% к шансу крита' },
            { id: 'berserk', name: 'Берсерк', desc: '+25% к урону, когда HP ниже 30%' },
            { id: 'greedy', name: 'Жадина', desc: '+20% добычи золота' }
        ];
        this.selectedTrait = this.traits[0];

        this.allocated = { strength: 0, agility: 0, intelligence: 0, vitality: 0 };
    }

    render(container) {
        this.container = container;
        container.innerHTML = `
            <div class="creator-container">
                <div class="creator-left">
                    <div class="gender-bar">
                        <button class="choice-btn ${this.gender === 'male' ? 'active' : ''}" id="btn-gender-male">
                            ${Icons.male(14)} Мужчина
                        </button>
                        <button class="choice-btn ${this.gender === 'female' ? 'active' : ''}" id="btn-gender-female">
                            ${Icons.female(14)} Женщина
                        </button>
                    </div>

                    <div class="avatar-preview-box">
                        <div class="pedestal-ambient-ring"></div>
                        <div class="pedestal-light-cone"></div>
                        <div id="avatar-svg-container" class="hero-idle-breathe"></div>
                    </div>

                    <div class="name-input-group">
                        <input type="text" id="player-name-input" value="${this.name}" maxlength="16" placeholder="Имя героя">
                        <button class="btn-small" id="btn-random-name" title="Случайное имя">${Icons.dice(16)}</button>
                    </div>

                    <div class="derived-stats-card">
                        <h3>Боевые параметры</h3>
                        <div class="derived-stat-row"><span>Здоровье (HP):</span><strong id="stat-hp">-</strong></div>
                        <div class="derived-stat-row"><span>Мана (MP):</span><strong id="stat-mp">-</strong></div>
                        <div class="derived-stat-row"><span>Физ. / Маг. Урон:</span><strong id="stat-dmg">-</strong></div>
                        <div class="derived-stat-row"><span>Крит / Уворот:</span><strong id="stat-crit-dodge">-</strong></div>
                        <div class="derived-stat-row"><span>Защита:</span><strong id="stat-def">-</strong></div>
                    </div>
                </div>

                <div class="creator-right">
                    <div class="creator-tabs">
                        <button class="tab-btn active" data-tab="appearance">Внешность</button>
                        <button class="tab-btn" data-tab="equipment">Одежда</button>
                        <button class="tab-btn" data-tab="class">Класс & Роль</button>
                        <button class="tab-btn" data-tab="attributes">Характеристики (<span id="points-counter">${this.availablePoints}</span>)</button>
                        <button class="tab-btn" data-tab="perks">Предыстория</button>
                    </div>

                    <div class="tab-content active" id="tab-appearance">
                        <div class="setting-group">
                            <label>Оттенок кожи <span class="selected-color-name" id="selected-skin-name"></span></label>
                            <div class="palette" id="skin-palette"></div>
                        </div>
                        <div class="setting-group">
                            <label>Прическа</label>
                            <div class="btn-group" id="hair-style-group"></div>
                        </div>
                        <div class="setting-group">
                            <label>Цвет волос <span class="selected-color-name" id="selected-hair-name"></span></label>
                            <div class="palette" id="hair-palette"></div>
                        </div>
                        <div class="setting-group">
                            <label>Цвет глаз <span class="selected-color-name" id="selected-eye-name"></span></label>
                            <div class="palette" id="eye-palette"></div>
                        </div>
                        <div class="setting-group" id="beard-setting-wrapper">
                            <label>Растительность на лице</label>
                            <div class="btn-group" id="beard-group"></div>
                        </div>
                    </div>

                    <div class="tab-content" id="tab-equipment">
                        <div class="setting-group">
                            <label>Цвет походной рубахи <span class="selected-color-name" id="selected-outfit-name"></span></label>
                            <div class="palette" id="outfit-palette"></div>
                        </div>
                        <div class="setting-group">
                            <label>Особый аксессуар / украшение</label>
                            <div class="btn-group" id="accessory-group"></div>
                        </div>
                        <div class="setting-group" style="margin-top: 15px;">
                            <label>Стартовая экипировка героя:</label>
                            <div class="starter-gear-preview" id="starter-gear-list"></div>
                        </div>
                    </div>

                    <div class="tab-content" id="tab-class">
                        <div class="cards-grid" id="class-cards-container"></div>
                    </div>

                    <div class="tab-content" id="tab-attributes">
                        <p class="section-hint">Распредели свободные очки характеристик:</p>
                        <div class="stats-allocator" id="stats-allocator-container"></div>
                    </div>

                    <div class="tab-content" id="tab-perks">
                        <div class="setting-group">
                            <label>Происхождение героя:</label>
                            <div class="cards-grid" id="origin-cards-container"></div>
                        </div>
                        <div class="setting-group" style="margin-top: 15px;">
                            <label>Уникальная черта характера:</label>
                            <div class="cards-grid" id="trait-cards-container"></div>
                        </div>
                    </div>

                    <div class="creator-bottom-bar">
                        <button class="btn btn-secondary" id="btn-cancel">Назад в меню</button>
                        <button class="btn btn-primary" id="btn-create-character">Войти в город</button>
                    </div>
                </div>
            </div>
        `;

        this.initGenderSelectors();
        this.renderHairStyleButtons();
        this.renderAccessoryButtons();
        this.renderBeardButtons();
        this.initVisualsSelectors();
        this.renderClassCards();
        this.renderOriginCards();
        this.renderTraitCards();
        this.renderStatAllocators();
        this.renderStarterGearList();
        this.updateAvatarSvg();
        this.updateDerivedStats();
        this.bindEvents();
    }

    initGenderSelectors() {
        const btnMale = this.container.querySelector('#btn-gender-male');
        const btnFemale = this.container.querySelector('#btn-gender-female');

        btnMale.addEventListener('click', () => {
            if (this.gender !== 'male') {
                this.gender = 'male';
                this.visuals.gender = 'male';
                if (!this.maleHairStyles.some(s => s.id === this.visuals.hairStyle)) {
                    this.visuals.hairStyle = this.maleHairStyles[0].id;
                }
                if (!this.maleAccessories.some(a => a.id === this.visuals.accessory)) {
                    this.visuals.accessory = 'none';
                }
                btnMale.classList.add('active');
                btnFemale.classList.remove('active');
                this.container.querySelector('#beard-setting-wrapper').style.display = 'flex';
                this.renderHairStyleButtons();
                this.renderAccessoryButtons();
                this.renderBeardButtons();
                this.randomizeName();
                this.updateAvatarSvg();
            }
        });

        btnFemale.addEventListener('click', () => {
            if (this.gender !== 'female') {
                this.gender = 'female';
                this.visuals.gender = 'female';
                if (!this.femaleHairStyles.some(s => s.id === this.visuals.hairStyle)) {
                    this.visuals.hairStyle = this.femaleHairStyles[0].id;
                }
                this.visuals.beard = 'none';
                if (!this.femaleAccessories.some(a => a.id === this.visuals.accessory)) {
                    this.visuals.accessory = 'none';
                }
                btnFemale.classList.add('active');
                btnMale.classList.remove('active');
                this.container.querySelector('#beard-setting-wrapper').style.display = 'none';
                this.renderHairStyleButtons();
                this.renderAccessoryButtons();
                this.randomizeName();
                this.updateAvatarSvg();
            }
        });
    }

    renderHairStyleButtons() {
        const group = this.container.querySelector('#hair-style-group');
        if (!group) return;
        const styles = this.gender === 'female' ? this.femaleHairStyles : this.maleHairStyles;

        if (!styles.some(s => s.id === this.visuals.hairStyle)) {
            this.visuals.hairStyle = styles[0].id;
        }

        group.innerHTML = styles.map(s => `
            <button class="choice-btn ${this.visuals.hairStyle === s.id ? 'active' : ''}" data-value="${s.id}">${s.name}</button>
        `).join('');

        group.querySelectorAll('.choice-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                group.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.visuals.hairStyle = btn.dataset.value;
                this.updateAvatarSvg();
            });
        });
    }

    renderBeardButtons() {
        const group = this.container.querySelector('#beard-group');
        if (!group) return;

        if (!this.beards.some(b => b.id === this.visuals.beard)) {
            this.visuals.beard = 'none';
        }

        group.innerHTML = this.beards.map(b => `
            <button class="choice-btn ${this.visuals.beard === b.id ? 'active' : ''}" data-value="${b.id}">${b.name}</button>
        `).join('');

        group.querySelectorAll('.choice-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                group.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.visuals.beard = btn.dataset.value;
                this.updateAvatarSvg();
            });
        });
    }

    renderAccessoryButtons() {
        const group = this.container.querySelector('#accessory-group');
        if (!group) return;
        const options = this.gender === 'female' ? this.femaleAccessories : this.maleAccessories;

        if (!options.some(o => o.id === this.visuals.accessory)) {
            this.visuals.accessory = 'none';
        }

        group.innerHTML = options.map(o => `
            <button class="choice-btn ${this.visuals.accessory === o.id ? 'active' : ''}" data-value="${o.id}">${o.name}</button>
        `).join('');

        group.querySelectorAll('.choice-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                group.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.visuals.accessory = btn.dataset.value;
                this.updateAvatarSvg();
            });
        });
    }

    getStarterEquipment(classId = this.selectedClassId) {
        let weaponName = 'Базовое оружие';
        if (classId === 'warrior') weaponName = 'Закаленный короткий меч новобранца';
        else if (classId === 'rogue') weaponName = 'Охотничий кинжал новобранца';
        else if (classId === 'mage') weaponName = 'Дубовый посох ученика';
        else if (classId === 'ranger') weaponName = 'Короткий лук следопыта';

        return {
            head: null,
            torso: { id: 'starter_tunic', name: 'Холщовая рубаха', slot: 'torso', type: 'armor', defense: 1, desc: '+1 к защите', rarity: 'common' },
            legs: { id: 'starter_pants', name: 'Походные штаны', slot: 'legs', type: 'armor', defense: 1, desc: '+1 к защите', rarity: 'common' },
            boots: { id: 'starter_boots', name: 'Кожаные сапоги', slot: 'boots', type: 'armor', defense: 1, desc: '+1 к защите', rarity: 'common' },
            mainHand: { id: 'starter_weapon', name: weaponName, slot: 'mainHand', type: 'weapon', physicalDamage: 2, classReq: classId, desc: '+2 к урону', rarity: 'common' },
            offHand: classId === 'warrior' ? { id: 'starter_shield', name: 'Окованный баклер', slot: 'offHand', type: 'shield', defense: 1, desc: '+1 к защите', rarity: 'common' } : null,
            accessory: null
        };
    }

    renderStarterGearList() {
        const container = this.container.querySelector('#starter-gear-list');
        if (!container) return;
        const equip = this.getStarterEquipment(this.selectedClassId);
        const items = [equip.mainHand, equip.offHand, equip.torso, equip.legs, equip.boots].filter(Boolean);
        container.innerHTML = items.map(it => `
            <div class="starter-gear-card">
                <span class="starter-gear-icon">${EquipmentVisuals.getItemIcon(it, 28)}</span>
                <div class="starter-gear-info">
                    <div class="starter-gear-name">${it.name}</div>
                    <div class="starter-gear-desc">${it.desc}</div>
                </div>
            </div>
        `).join('');
    }

    updateAvatarSvg() {
        const container = this.container.querySelector('#avatar-svg-container');
        if (!container) return;
        const starterEquip = this.getStarterEquipment(this.selectedClassId);
        container.innerHTML = CharacterRenderer.render(this.visuals, this.selectedClassId, starterEquip);
        container.classList.remove('hero-update-pulse');
        void container.offsetWidth;
        container.classList.add('hero-update-pulse');
    }

    initVisualsSelectors() {
        const createPalette = (selector, list, key, labelId) => {
            const container = this.container.querySelector(selector);
            const labelSpan = this.container.querySelector(labelId);
            if (!container) return;

            const updateLabel = (colorVal) => {
                if (!labelSpan) return;
                const found = list.find(item => (typeof item === 'object' ? item.color === colorVal : item === colorVal));
                labelSpan.textContent = found ? (typeof found === 'object' ? `— ${found.name}` : `— ${found}`) : '';
            };

            updateLabel(this.visuals[key]);

            list.forEach(item => {
                const color = typeof item === 'object' ? item.color : item;
                const name = typeof item === 'object' ? item.name : item;
                const dot = document.createElement('div');
                dot.className = `color-dot ${this.visuals[key] === color ? 'active' : ''}`;
                dot.title = name;

                if (color === 'hetero_blue_gold') {
                    dot.style.background = 'linear-gradient(135deg, #38bdf8 50%, #facc15 50%)';
                } else if (color === 'hetero_red_cyan') {
                    dot.style.background = 'linear-gradient(135deg, #dc2626 50%, #00f0ff 50%)';
                } else if (color === '#00f0ff') {
                    dot.style.background = 'radial-gradient(circle, #ffffff 15%, #00f0ff 70%)';
                    dot.style.boxShadow = '0 0 6px rgba(0, 240, 255, 0.7)';
                } else {
                    dot.style.backgroundColor = color;
                }

                dot.addEventListener('click', () => {
                    this.visuals[key] = color;
                    container.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
                    dot.classList.add('active');
                    updateLabel(color);
                    this.updateAvatarSvg();
                });
                container.appendChild(dot);
            });
        };

        createPalette('#skin-palette', this.palettes.skin, 'skinColor', '#selected-skin-name');
        createPalette('#hair-palette', this.palettes.hair, 'hairColor', '#selected-hair-name');
        createPalette('#eye-palette', this.palettes.eye, 'eyeColor', '#selected-eye-name');
        createPalette('#outfit-palette', this.palettes.outfit, 'outfitColor', '#selected-outfit-name');
    }

    randomizeName() {
        const maleNames = ['Рагнар', 'Эльрион', 'Мордред', 'Гарен', 'Арамон', 'Валдис', 'Бран', 'Келлен'];
        const femaleNames = ['Лира', 'Элеонора', 'Сильвия', 'Морриган', 'Аэлис', 'Бригитта', 'Валери', 'Селена'];
        const list = this.gender === 'female' ? femaleNames : maleNames;
        const random = list[Math.floor(Math.random() * list.length)];
        this.container.querySelector('#player-name-input').value = random;
    }

    renderClassCards() {
        const container = this.container.querySelector('#class-cards-container');
        container.innerHTML = '';

        Object.entries(this.classes).forEach(([id, cls]) => {
            const card = document.createElement('div');
            card.className = `selection-card ${this.selectedClassId === id ? 'active' : ''}`;
            card.innerHTML = `
                <div class="card-title">${cls.name}</div>
                <div class="card-desc">${cls.desc}</div>
                <div class="card-stats-preview">
                    <span>СИЛ: ${cls.baseStats.strength}</span>
                    <span>ЛОВ: ${cls.baseStats.agility}</span>
                    <span>ИНТ: ${cls.baseStats.intelligence}</span>
                    <span>ЖИВ: ${cls.baseStats.vitality}</span>
                </div>
            `;
            card.addEventListener('click', () => {
                this.selectedClassId = id;
                this.renderClassCards();
                this.renderStatAllocators();
                this.renderStarterGearList();
                this.updateDerivedStats();
                this.updateAvatarSvg();
            });
            container.appendChild(card);
        });
    }

    renderOriginCards() {
        const container = this.container.querySelector('#origin-cards-container');
        container.innerHTML = '';
        this.origins.forEach(orig => {
            const card = document.createElement('div');
            card.className = `selection-card ${this.selectedOrigin.id === orig.id ? 'active' : ''}`;
            card.innerHTML = `
                <div class="card-title">${orig.name}</div>
                <div class="card-desc">${orig.desc}</div>
            `;
            card.addEventListener('click', () => {
                this.selectedOrigin = orig;
                this.renderOriginCards();
                this.updateDerivedStats();
            });
            container.appendChild(card);
        });
    }

    renderTraitCards() {
        const container = this.container.querySelector('#trait-cards-container');
        container.innerHTML = '';
        this.traits.forEach(trait => {
            const card = document.createElement('div');
            card.className = `selection-card ${this.selectedTrait.id === trait.id ? 'active' : ''}`;
            card.innerHTML = `
                <div class="card-title">${trait.name}</div>
                <div class="card-desc">${trait.desc}</div>
            `;
            card.addEventListener('click', () => {
                this.selectedTrait = trait;
                this.renderTraitCards();
                this.updateDerivedStats();
            });
            container.appendChild(card);
        });
    }

    getEffectiveStats() {
        const base = this.classes[this.selectedClassId].baseStats;
        const originBonus = this.selectedOrigin.statBonus || {};

        return {
            strength: base.strength + this.allocated.strength + (originBonus.strength || 0),
            agility: base.agility + this.allocated.agility + (originBonus.agility || 0),
            intelligence: base.intelligence + this.allocated.intelligence + (originBonus.intelligence || 0),
            vitality: base.vitality + this.allocated.vitality + (originBonus.vitality || 0)
        };
    }

    renderStatAllocators() {
        const container = this.container.querySelector('#stats-allocator-container');
        const pointsCounter = this.container.querySelector('#points-counter');
        if (pointsCounter) {
            pointsCounter.textContent = this.availablePoints;
            if (this.availablePoints > 0) {
                pointsCounter.classList.add('has-points');
            } else {
                pointsCounter.classList.remove('has-points');
            }
        }

        const statNames = {
            strength: 'Сила (Урон и вес)',
            agility: 'Ловкость (Крит и уворот)',
            intelligence: 'Интеллект (Магия и мана)',
            vitality: 'Живучесть (Запас здоровья)'
        };

        const current = this.getEffectiveStats();

        container.innerHTML = Object.keys(statNames).map(key => `
            <div class="allocator-row">
                <div class="stat-info">
                    <span class="stat-label">${statNames[key]}</span>
                    <span class="stat-value">${current[key]}</span>
                </div>
                <div class="allocator-controls">
                    <button class="btn-step btn-minus" data-stat="${key}" ${this.allocated[key] <= 0 ? 'disabled' : ''}>-</button>
                    <button class="btn-step btn-plus" data-stat="${key}" ${this.availablePoints <= 0 ? 'disabled' : ''}>+</button>
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.btn-plus').forEach(b => {
            b.addEventListener('click', () => {
                const stat = b.dataset.stat;
                if (this.availablePoints > 0) {
                    this.allocated[stat]++;
                    this.availablePoints--;
                    this.renderStatAllocators();
                    this.updateDerivedStats();
                }
            });
        });

        container.querySelectorAll('.btn-minus').forEach(b => {
            b.addEventListener('click', () => {
                const stat = b.dataset.stat;
                if (this.allocated[stat] > 0) {
                    this.allocated[stat]--;
                    this.availablePoints++;
                    this.renderStatAllocators();
                    this.updateDerivedStats();
                }
            });
        });
    }

    updateDerivedStats() {
        const stats = this.getEffectiveStats();
        const hp = stats.vitality * 15 + stats.strength * 5;
        const mp = stats.intelligence * 12;
        const dmg = Math.round(stats.strength * 1.0 + stats.agility * 0.3);
        const mdmg = Math.round(stats.intelligence * 1.2);

        let crit = Math.min(60, Math.round(stats.agility * 1.5));
        let dodge = Math.min(40, Math.round(stats.agility * 1.2));
        let def = Math.round(stats.vitality * 0.25 + stats.strength * 0.15);

        if (this.selectedTrait.id === 'eagle_eye') crit += 8;
        if (this.selectedTrait.id === 'thick_skin') def += 2;

        this.container.querySelector('#stat-hp').textContent = hp;
        this.container.querySelector('#stat-mp').textContent = mp;
        this.container.querySelector('#stat-dmg').textContent = `${dmg} физ. / ${mdmg} маг.`;
        this.container.querySelector('#stat-crit-dodge').textContent = `${crit}% / ${dodge}%`;
        this.container.querySelector('#stat-def').textContent = def;
    }

    bindEvents() {
        this.container.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                this.container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

                btn.classList.add('active');
                this.container.querySelector(`#tab-${btn.dataset.tab}`).classList.add('active');
            });
        });

        const btnRandom = this.container.querySelector('#btn-random-name');
        btnRandom.addEventListener('click', () => {
            sound.playSfx('dice');
            btnRandom.classList.remove('dice-roll-anim');
            void btnRandom.offsetWidth;
            btnRandom.classList.add('dice-roll-anim');
            this.randomizeName();
        });

        this.container.querySelector('#btn-cancel').addEventListener('click', () => {
            this.callbacks.onCancel();
        });

        this.container.querySelector('#btn-create-character').addEventListener('click', () => {
            const nameInput = this.container.querySelector('#player-name-input');
            const finalName = nameInput.value.trim() || 'Безымянный';

            const player = new Player({
                name: finalName,
                gender: this.gender,
                classId: this.selectedClassId,
                className: this.classes[this.selectedClassId].name,
                origin: this.selectedOrigin,
                trait: this.selectedTrait,
                visuals: this.visuals,
                attributes: this.getEffectiveStats(),
                equipment: this.getStarterEquipment(this.selectedClassId)
            });

            this.callbacks.onComplete(player);
        });
    }
}