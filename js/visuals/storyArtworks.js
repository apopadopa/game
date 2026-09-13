export class StoryArtworks {
    static getArtwork(sceneId) {
        switch (sceneId) {
            case 'ancient_empire':
                return this.renderAncientEmpire();
            case 'awakening_abyss':
                return this.renderAwakeningAbyss();
            case 'sealing_depths':
                return this.renderSealingDepths();
            case 'miasma_rising':
                return this.renderMiasmaRising();
            case 'hero_dream':
                return this.renderHeroDream();
            case 'frontier_town':
                return this.renderFrontierTown();
            case 'dungeon_descent':
            default:
                return this.renderDungeonDescent();
        }
    }

    // 1. Древняя Империя Арканум в расцвете величия
    static renderAncientEmpire() {
        return `
            <svg viewBox="0 0 800 450" class="story-svg-art" width="100%" height="100%">
                <defs>
                    <linearGradient id="empSky" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#0a0f1d"/>
                        <stop offset="60%" stop-color="#1e1b4b"/>
                        <stop offset="100%" stop-color="#312e81"/>
                    </linearGradient>
                    <radialGradient id="crystalGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#a5f3fc" stop-opacity="1"/>
                        <stop offset="40%" stop-color="#38bdf8" stop-opacity="0.8"/>
                        <stop offset="80%" stop-color="#0284c7" stop-opacity="0.3"/>
                        <stop offset="100%" stop-color="#0f172a" stop-opacity="0"/>
                    </radialGradient>
                    <linearGradient id="goldArch" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#fef08a"/>
                        <stop offset="50%" stop-color="#ca8a04"/>
                        <stop offset="100%" stop-color="#713f12"/>
                    </linearGradient>
                    <linearGradient id="pillarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#1e293b"/>
                        <stop offset="50%" stop-color="#475569"/>
                        <stop offset="100%" stop-color="#0f172a"/>
                    </linearGradient>
                </defs>

                <!-- Небосвод гигантской пещеры со светящимися кристаллами -->
                <rect width="800" height="450" fill="url(#empSky)"/>
                
                <!-- Сталактиты на потолке -->
                <polygon points="40,0 70,80 100,0" fill="#0f172a"/>
                <polygon points="180,0 200,65 230,0" fill="#0f172a"/>
                <polygon points="340,0 365,110 390,0" fill="#131b2e"/>
                <polygon points="520,0 540,75 570,0" fill="#0f172a"/>
                <polygon points="680,0 710,95 740,0" fill="#131b2e"/>

                <!-- Фоновые силуэты дворцов и акведуков -->
                <g opacity="0.6">
                    <rect x="80" y="160" width="130" height="240" fill="#172033"/>
                    <polygon points="80,160 145,100 210,160" fill="#1e293b"/>
                    <rect x="580" y="150" width="150" height="250" fill="#172033"/>
                    <polygon points="580,150 655,90 730,150" fill="#1e293b"/>
                    <!-- Фоновый парящий акведук -->
                    <path d="M0,240 Q400,210 800,240 L800,255 Q400,225 0,255 Z" fill="#1e293b"/>
                </g>

                <!-- Центральный гигантский кристалл Эфира -->
                <circle cx="400" cy="180" r="160" fill="url(#crystalGlow)"/>
                <polygon points="400,70 430,170 400,260 370,170" fill="#e0f2fe" opacity="0.95"/>
                <polygon points="400,70 430,170 400,260" fill="#38bdf8" opacity="0.6"/>
                <polygon points="400,70 370,170 400,260" fill="#7dd3fc" opacity="0.8"/>
                <!-- Осколки света вокруг кристалла -->
                <polygon points="330,130 340,150 335,160 325,145" fill="#bae6fd" opacity="0.75"/>
                <polygon points="470,140 480,160 475,170 465,155" fill="#bae6fd" opacity="0.75"/>
                <polygon points="360,220 370,240 365,250 355,235" fill="#bae6fd" opacity="0.75"/>
                <polygon points="440,210 450,230 445,240 435,225" fill="#bae6fd" opacity="0.75"/>

                <!-- Колоссальные резные колонны переднего плана -->
                <rect x="160" y="120" width="40" height="280" fill="url(#pillarGrad)"/>
                <rect x="150" y="110" width="60" height="15" rx="3" fill="url(#goldArch)"/>
                <rect x="150" y="390" width="60" height="20" rx="3" fill="url(#goldArch)"/>

                <rect x="600" y="120" width="40" height="280" fill="url(#pillarGrad)"/>
                <rect x="590" y="110" width="60" height="15" rx="3" fill="url(#goldArch)"/>
                <rect x="590" y="390" width="60" height="20" rx="3" fill="url(#goldArch)"/>

                <!-- Величественная арочная галерея -->
                <path d="M160,120 Q400,40 640,120 L640,140 Q400,60 160,140 Z" fill="url(#goldArch)"/>

                <!-- Мраморные ступени и площадь -->
                <polygon points="0,450 800,450 680,360 120,360" fill="#1e293b"/>
                <line x1="120" y1="380" x2="680" y2="380" stroke="#38bdf8" stroke-width="1.5" opacity="0.6"/>
                <line x1="80" y1="410" x2="720" y2="410" stroke="#ca8a04" stroke-width="2" opacity="0.8"/>
                <line x1="0" y1="440" x2="800" y2="440" stroke="#38bdf8" stroke-width="1.5" opacity="0.7"/>

                <!-- Силуэты древних магов и титанов, смотрящих на кристалл -->
                <g fill="#0b0f19">
                    <path d="M380,410 C380,395 385,385 390,380 C395,385 400,395 400,410 Z"/>
                    <circle cx="390" cy="376" r="4"/>
                    <path d="M410,410 C410,395 415,385 420,380 C425,385 430,395 430,410 Z"/>
                    <circle cx="420" cy="376" r="4"/>
                    <path d="M480,415 C480,398 486,388 492,382 C498,388 504,398 504,415 Z"/>
                    <circle cx="492" cy="378" r="4.5"/>
                    <line x1="504" y1="380" x2="504" y2="415" stroke="#facc15" stroke-width="2"/>
                </g>

                <!-- Золотая руническая надпись по низу сцены -->
                <text x="400" y="440" text-anchor="middle" fill="#facc15" font-size="11" letter-spacing="4" font-weight="bold" opacity="0.85">АРКАНУМ • ЭПОХА ЗОЛОТОГО ЭФИРА</text>
            </svg>
        `;
    }

    // 2. Бурение в недра и Пробуждение Бездны
    static renderAwakeningAbyss() {
        return `
            <svg viewBox="0 0 800 450" class="story-svg-art" width="100%" height="100%">
                <defs>
                    <radialGradient id="abyssCore" cx="50%" cy="80%" r="60%">
                        <stop offset="0%" stop-color="#dc2626" stop-opacity="1"/>
                        <stop offset="25%" stop-color="#9333ea" stop-opacity="0.9"/>
                        <stop offset="60%" stop-color="#3b0764" stop-opacity="0.8"/>
                        <stop offset="100%" stop-color="#05050a" stop-opacity="0.95"/>
                    </radialGradient>
                    <linearGradient id="lavaGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#f97316"/>
                        <stop offset="100%" stop-color="#7f1d1d"/>
                    </linearGradient>
                </defs>

                <!-- Темные недра с пылающим разломом -->
                <rect width="800" height="450" fill="#090514"/>
                <rect width="800" height="450" fill="url(#abyssCore)"/>

                <!-- Колоссальный бур архимагов, вонзенный в земную кору -->
                <g transform="translate(400, 110)">
                    <!-- Механическая рама бура -->
                    <polygon points="0,170 -60,0 60,0" fill="#334155" stroke="#64748b" stroke-width="2"/>
                    <line x1="-40" y1="40" x2="40" y2="40" stroke="#f59e0b" stroke-width="3"/>
                    <line x1="-25" y1="80" x2="25" y2="80" stroke="#f59e0b" stroke-width="3"/>
                    <line x1="-12" y1="120" x2="12" y2="120" stroke="#f59e0b" stroke-width="3"/>
                    <!-- Сверло из адаманта, расколотое энергией Тьмы -->
                    <polygon points="0,210 -15,160 15,160" fill="#cbd5e1" stroke="#dc2626" stroke-width="2"/>
                    <line x1="-5" y1="170" x2="5" y2="190" stroke="#ef4444" stroke-width="2.5"/>
                </g>

                <!-- Зияющий разлом в земле (Черная Трещина) -->
                <path d="M0,320 L180,300 L290,340 L380,305 L400,320 L440,300 L560,335 L680,305 L800,330 L800,450 L0,450 Z" fill="#030206"/>
                <!-- Кроваво-пурпурные трещины разлома -->
                <path d="M120,310 L280,360 L390,320 L400,420 L420,320 L540,350 L700,315" stroke="#ef4444" stroke-width="4" fill="none"/>
                <path d="M280,360 L320,440" stroke="#a855f7" stroke-width="3" fill="none"/>
                <path d="M540,350 L590,430" stroke="#a855f7" stroke-width="3" fill="none"/>

                <!-- Щупальца и тени Первородной Тьмы, вырывающиеся наверх -->
                <g stroke="#9333ea" stroke-linecap="round" fill="none" opacity="0.85">
                    <path d="M360,320 Q320,240 280,180 T240,100" stroke-width="8"/>
                    <path d="M440,320 Q490,230 530,170 T570,90" stroke-width="9"/>
                    <path d="M400,310 Q400,210 390,140 T410,50" stroke-width="12" stroke="#dc2626"/>
                    <path d="M330,340 Q250,290 190,260" stroke-width="6"/>
                    <path d="M480,330 Q570,280 640,240" stroke-width="6"/>
                </g>

                <!-- Зловещее Око Бездны в разломе -->
                <ellipse cx="400" cy="355" rx="55" ry="24" fill="#000000" stroke="#dc2626" stroke-width="3"/>
                <ellipse cx="400" cy="355" rx="28" ry="14" fill="#dc2626"/>
                <ellipse cx="400" cy="355" rx="8" ry="14" fill="#000000"/>
                <circle cx="396" cy="352" r="3" fill="#fef08a"/>

                <!-- Рушащиеся башни на горизонте -->
                <polygon points="120,305 140,200 170,215 155,305" fill="#1e1b4b" opacity="0.8"/>
                <polygon points="630,308 650,190 680,200 665,308" fill="#1e1b4b" opacity="0.8"/>

                <text x="400" y="435" text-anchor="middle" fill="#f87171" font-size="11" letter-spacing="4" font-weight="bold">РАСКОЛ • ПРОБУЖДЕНИЕ ПЕРВОРОДНОЙ ТЬМЫ</text>
            </svg>
        `;
    }

    // 3. Великая Катастрофа и Запечатывание 30 ярусов
    static renderSealingDepths() {
        return `
            <svg viewBox="0 0 800 450" class="story-svg-art" width="100%" height="100%">
                <defs>
                    <linearGradient id="sealGold" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#fef08a"/>
                        <stop offset="40%" stop-color="#f59e0b"/>
                        <stop offset="80%" stop-color="#d97706"/>
                        <stop offset="100%" stop-color="#78350f"/>
                    </linearGradient>
                    <radialGradient id="holyFlash" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>
                        <stop offset="30%" stop-color="#fef08a" stop-opacity="0.8"/>
                        <stop offset="70%" stop-color="#f59e0b" stop-opacity="0.3"/>
                        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
                    </radialGradient>
                </defs>

                <!-- Мрачные рушащиеся своды -->
                <rect width="800" height="450" fill="#0d0e15"/>

                <!-- Вспышка священной магии титанов в центре -->
                <circle cx="400" cy="225" r="210" fill="url(#holyFlash)"/>

                <!-- Колоссальные Рунные Врата Печати в полу -->
                <ellipse cx="400" cy="280" rx="260" ry="110" fill="#18181b" stroke="url(#sealGold)" stroke-width="6"/>
                <ellipse cx="400" cy="280" rx="190" ry="80" fill="#09090b" stroke="#f59e0b" stroke-width="3" stroke-dasharray="8 6"/>
                <ellipse cx="400" cy="280" rx="120" ry="50" fill="#000000" stroke="#38bdf8" stroke-width="2.5"/>

                <!-- Символ тридцати этажей на вратах -->
                <text x="400" y="288" text-anchor="middle" fill="#facc15" font-size="24" font-family="serif" font-weight="bold">XXX</text>

                <!-- Золотые рунические цепи, стягивающие бездну -->
                <g stroke="#facc15" stroke-width="4" stroke-linecap="round" fill="none">
                    <path d="M100,60 Q250,180 400,280"/>
                    <path d="M700,60 Q550,180 400,280"/>
                    <path d="M40,360 Q220,320 400,280"/>
                    <path d="M760,360 Q580,320 400,280"/>
                    <path d="M400,0 L400,280" stroke-width="5"/>
                </g>

                <!-- Фигуры древних героев/паладинов, вонзающих мечи в печать -->
                <!-- Паладин Света слева -->
                <g transform="translate(230, 240)">
                    <polygon points="0,0 20,-50 40,0" fill="#cbd5e1"/>
                    <circle cx="20" cy="-60" r="10" fill="#fef08a"/>
                    <!-- Меч, воткнутый в печать -->
                    <line x1="30" y1="-40" x2="45" y2="40" stroke="#fef08a" stroke-width="4"/>
                    <line x1="20" y1="-25" x2="40" y2="-25" stroke="#f59e0b" stroke-width="3"/>
                </g>

                <!-- Верховный Маг справа -->
                <g transform="translate(530, 240)">
                    <polygon points="0,0 20,-55 40,0" fill="#1e3a8a"/>
                    <circle cx="20" cy="-65" r="9" fill="#93c5fd"/>
                    <!-- Посох, прижимающий руну -->
                    <line x1="5" y1="-70" x2="5" y2="40" stroke="#38bdf8" stroke-width="4"/>
                    <circle cx="5" cy="-75" r="7" fill="#38bdf8"/>
                </g>

                <!-- Бегущие тени монстров под плитой печати -->
                <g opacity="0.6">
                    <path d="M360,340 Q380,380 400,390 Q420,380 440,340" stroke="#9333ea" stroke-width="5" fill="none"/>
                    <line x1="385" y1="360" x2="380" y2="380" stroke="#ef4444" stroke-width="2"/>
                    <line x1="415" y1="360" x2="420" y2="380" stroke="#ef4444" stroke-width="2"/>
                </g>

                <text x="400" y="435" text-anchor="middle" fill="#facc15" font-size="11" letter-spacing="4" font-weight="bold">ВЕЛИКАЯ ПЕЧАТЬ • 30 ЯРУСОВ В АДАМАНТОВЫХ ЦЕПЯХ</text>
            </svg>
        `;
    }

    // 4. Пробуждение Скверны и Осада Поверхности
    static renderMiasmaRising() {
        return `
            <svg viewBox="0 0 800 450" class="story-svg-art" width="100%" height="100%">
                <defs>
                    <linearGradient id="fogGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stop-color="#14532d"/>
                        <stop offset="40%" stop-color="#166534" stop-opacity="0.8"/>
                        <stop offset="80%" stop-color="#1e1b4b" stop-opacity="0.4"/>
                        <stop offset="100%" stop-color="#09090b" stop-opacity="0"/>
                    </linearGradient>
                </defs>

                <!-- Темные разрушенные залы верхних ярусов -->
                <rect width="800" height="450" fill="#090a0f"/>

                <!-- Слои ядовитого тумана и спор -->
                <rect x="0" y="160" width="800" height="290" fill="url(#fogGrad)"/>
                <ellipse cx="260" cy="300" rx="200" ry="60" fill="#22c55e" opacity="0.25"/>
                <ellipse cx="560" cy="320" rx="240" ry="70" fill="#22c55e" opacity="0.2"/>
                <ellipse cx="400" cy="380" rx="300" ry="65" fill="#15803d" opacity="0.35"/>

                <!-- Разбитые рунные колонны и решетки -->
                <g fill="#1e293b" stroke="#0f172a" stroke-width="2">
                    <rect x="80" y="120" width="45" height="240"/>
                    <rect x="700" y="110" width="50" height="250"/>
                    <!-- Наклонная рухнувшая колонна -->
                    <polygon points="280,240 330,230 460,370 410,380"/>
                </g>

                <!-- Глаза чудовищ в темноте -->
                <g fill="#ef4444">
                    <circle cx="160" cy="280" r="3.5"/><circle cx="174" cy="279" r="3.5"/>
                    <circle cx="620" cy="260" r="4"/><circle cx="636" cy="259" r="4"/>
                    <circle cx="320" cy="320" r="3"/><circle cx="332" cy="320" r="3"/>
                    <circle cx="480" cy="290" r="5"/><circle cx="500" cy="289" r="5"/>
                </g>

                <!-- Силуэт грозного монстра по центру в тумане -->
                <g transform="translate(370, 240)" fill="#0f172a" stroke="#020617" stroke-width="1.5">
                    <!-- Тело и горб чудовища -->
                    <ellipse cx="30" cy="50" rx="40" ry="30"/>
                    <circle cx="30" cy="18" r="22"/>
                    <!-- Рога / наросты -->
                    <polygon points="12,10 0,-15 18,2"/>
                    <polygon points="48,10 60,-15 42,2"/>
                    <!-- Пылающие глаза монстра -->
                    <ellipse cx="20" cy="18" rx="5" ry="3" fill="#facc15"/>
                    <ellipse cx="40" cy="18" rx="5" ry="3" fill="#facc15"/>
                    <!-- Когтистые лапы -->
                    <path d="M-5,60 L-15,95 L0,90 Z"/>
                    <path d="M65,60 L75,95 L60,90 Z"/>
                </g>

                <!-- Предупредительные знаки опасности и руны запечатывания -->
                <line x1="0" y1="410" x2="800" y2="410" stroke="#dc2626" stroke-width="2" opacity="0.7"/>
                <text x="400" y="435" text-anchor="middle" fill="#86efac" font-size="11" letter-spacing="4" font-weight="bold">ТОКСИЧНЫЙ МИАЗМ • ПРОРЫВ ВЕРХНИХ ШАХТ</text>
            </svg>
        `;
    }

    // 5. Пророческий сон героя и свет Реликвии
    static renderHeroDream() {
        return `
            <svg viewBox="0 0 800 450" class="story-svg-art" width="100%" height="100%">
                <defs>
                    <radialGradient id="fireGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#fef08a" stop-opacity="1"/>
                        <stop offset="30%" stop-color="#f97316" stop-opacity="0.8"/>
                        <stop offset="70%" stop-color="#b91c1c" stop-opacity="0.3"/>
                        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
                    </radialGradient>
                    <radialGradient id="relicGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#a5f3fc" stop-opacity="1"/>
                        <stop offset="35%" stop-color="#38bdf8" stop-opacity="0.85"/>
                        <stop offset="75%" stop-color="#1d4ed8" stop-opacity="0.4"/>
                        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
                    </radialGradient>
                </defs>

                <!-- Ночное грозовое небо и холмы -->
                <rect width="800" height="450" fill="#070b14"/>
                <path d="M0,320 Q200,280 400,310 T800,290 L800,450 L0,450 Z" fill="#0f172a"/>
                <path d="M0,360 Q260,330 520,350 T800,340 L800,450 L0,450 Z" fill="#090d16"/>

                <!-- Звездное созвездие Катакомб на небесах -->
                <g fill="#93c5fd" opacity="0.8">
                    <circle cx="180" cy="70" r="2.5"/><circle cx="240" cy="50" r="3"/><circle cx="310" cy="90" r="2.5"/>
                    <circle cx="480" cy="60" r="3"/><circle cx="560" cy="80" r="2.5"/><circle cx="630" cy="45" r="3.5"/>
                    <!-- Линии созвездия в форме ключа -->
                    <line x1="180" y1="70" x2="240" y2="50" stroke="#60a5fa" stroke-width="0.8" opacity="0.5"/>
                    <line x1="240" y1="50" x2="310" y2="90" stroke="#60a5fa" stroke-width="0.8" opacity="0.5"/>
                    <line x1="480" y1="60" x2="560" y2="80" stroke="#60a5fa" stroke-width="0.8" opacity="0.5"/>
                    <line x1="560" y1="80" x2="630" y2="45" stroke="#60a5fa" stroke-width="0.8" opacity="0.5"/>
                </g>

                <!-- Походный костер слева -->
                <circle cx="250" cy="380" r="90" fill="url(#fireGlow)"/>
                <!-- Дрова костра -->
                <line x1="225" y1="388" x2="275" y2="382" stroke="#451a03" stroke-width="5"/>
                <line x1="230" y1="382" x2="270" y2="388" stroke="#78350f" stroke-width="5"/>
                <!-- Языки пламени -->
                <polygon points="250,340 240,380 260,380" fill="#facc15"/>
                <polygon points="245,355 235,385 255,385" fill="#ea580c"/>
                <polygon points="255,350 248,382 262,382" fill="#ef4444"/>

                <!-- Фигура сидящего героя у огня -->
                <g transform="translate(370, 270)">
                    <!-- Плащ героя -->
                    <path d="M30,50 L5,140 L75,140 L60,50 Z" fill="#1e293b"/>
                    <!-- Плечи и торс -->
                    <rect x="22" y="45" width="36" height="55" rx="5" fill="#334155"/>
                    <!-- Голова героя, смотрящего на реликвию -->
                    <circle cx="40" cy="28" r="14" fill="#cbd5e1"/>
                    <!-- Руки, держащие священный осколок -->
                    <path d="M22,70 L48,82 M58,70 L52,82" stroke="#94a3b8" stroke-width="6" stroke-linecap="round"/>
                </g>

                <!-- Пульсирующий артефакт в руках героя -->
                <circle cx="420" cy="355" r="70" fill="url(#relicGlow)"/>
                <polygon points="420,335 432,352 420,370 408,352" fill="#ffffff"/>
                <polygon points="420,335 432,352 420,370" fill="#38bdf8" opacity="0.6"/>

                <!-- Призрачное отражение лестницы в бездну позади героя -->
                <g opacity="0.35" stroke="#38bdf8" stroke-width="1.5" fill="none">
                    <line x1="560" y1="140" x2="720" y2="140"/>
                    <line x1="580" y1="170" x2="700" y2="170"/>
                    <line x1="600" y1="200" x2="680" y2="200"/>
                    <line x1="620" y1="230" x2="660" y2="230"/>
                    <line x1="560" y1="140" x2="620" y2="230"/>
                    <line x1="720" y1="140" x2="660" y2="230"/>
                </g>

                <text x="400" y="435" text-anchor="middle" fill="#7dd3fc" font-size="11" letter-spacing="4" font-weight="bold">ЗОВ СУДЬБЫ • ПУЛЬСАЦИЯ ДРЕВНЕГО ОСКОЛКА</text>
            </svg>
        `;
    }

    // 6. Каменный Предел — Город на Краю Пропасти
    static renderFrontierTown() {
        return `
            <svg viewBox="0 0 800 450" class="story-svg-art" width="100%" height="100%">
                <defs>
                    <linearGradient id="twilightSky" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#0f172a"/>
                        <stop offset="40%" stop-color="#1e1b4b"/>
                        <stop offset="70%" stop-color="#701a75"/>
                        <stop offset="100%" stop-color="#d97706"/>
                    </linearGradient>
                </defs>

                <!-- Закатное небо горного ущелья -->
                <rect width="800" height="450" fill="url(#twilightSky)"/>

                <!-- Горные хребты на горизонте -->
                <polygon points="0,280 140,160 280,260 420,140 580,250 720,130 800,220 800,450 0,450" fill="#18181b"/>
                <polygon points="0,320 200,220 380,310 560,210 740,290 800,270 800,450 0,450" fill="#0f172a" opacity="0.8"/>

                <!-- Могучие каменные стены города Каменный Предел -->
                <rect x="60" y="270" width="680" height="150" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
                <!-- Зубцы крепостной стены -->
                <g fill="#1e293b" stroke="#0f172a" stroke-width="1.5">
                    <rect x="60" y="252" width="25" height="18"/><rect x="100" y="252" width="25" height="18"/>
                    <rect x="140" y="252" width="25" height="18"/><rect x="180" y="252" width="25" height="18"/>
                    <rect x="220" y="252" width="25" height="18"/><rect x="260" y="252" width="25" height="18"/>
                    <rect x="520" y="252" width="25" height="18"/><rect x="560" y="252" width="25" height="18"/>
                    <rect x="600" y="252" width="25" height="18"/><rect x="640" y="252" width="25" height="18"/>
                    <rect x="680" y="252" width="25" height="18"/><rect x="715" y="252" width="25" height="18"/>
                </g>

                <!-- Городские силуэты за стеной: Храм, Таверна, Башни -->
                <!-- Шпиль Храма Света с золотым крестом -->
                <polygon points="560,130 535,260 585,260" fill="#090d16"/>
                <rect x="548" y="115" width="24" height="20" fill="none"/>
                <line x1="560" y1="108" x2="560" y2="130" stroke="#facc15" stroke-width="3"/>
                <line x1="552" y1="115" x2="568" y2="115" stroke="#facc15" stroke-width="2.5"/>

                <!-- Труба кузницы с клубящимся дымом и искрами -->
                <rect x="220" y="210" width="22" height="50" fill="#090d16"/>
                <circle cx="231" cy="195" r="8" fill="#475569" opacity="0.6"/>
                <circle cx="236" cy="180" r="12" fill="#64748b" opacity="0.4"/>
                <circle cx="228" cy="188" r="1.5" fill="#f59e0b"/>
                <circle cx="238" cy="178" r="1.5" fill="#facc15"/>

                <!-- Теплый свет окон таверны и домов -->
                <rect x="140" y="235" width="55" height="30" fill="#090d16"/>
                <rect x="150" y="242" width="12" height="14" fill="#fef08a"/>
                <rect x="170" y="242" width="12" height="14" fill="#fef08a"/>

                <!-- Главные ворота города (арка со светильниками) -->
                <path d="M340,420 L340,320 Q400,280 460,320 L460,420 Z" fill="#020617"/>
                <path d="M350,420 L350,330 Q400,295 450,330 L450,420 Z" fill="#451a03" stroke="#ca8a04" stroke-width="2"/>
                <line x1="400" y1="300" x2="400" y2="420" stroke="#ca8a04" stroke-width="2"/>

                <!-- Факелы по бокам ворот -->
                <circle cx="330" cy="330" r="8" fill="#f59e0b"/>
                <circle cx="470" cy="330" r="8" fill="#f59e0b"/>

                <!-- Мощеная дорога к воротам -->
                <polygon points="340,420 460,420 540,450 260,450" fill="#334155"/>

                <text x="400" y="440" text-anchor="middle" fill="#fed7aa" font-size="11" letter-spacing="4" font-weight="bold">КАМЕННЫЙ ПРЕДЕЛ • ПОСЛЕДНИЙ ФОРПОСТ ЦИВИЛИЗАЦИИ</text>
            </svg>
        `;
    }

    // 7. У Врат Катакомб — Спуск во Тьму
    static renderDungeonDescent() {
        return `
            <svg viewBox="0 0 800 450" class="story-svg-art" width="100%" height="100%">
                <defs>
                    <radialGradient id="gateVoid" cx="50%" cy="60%" r="50%">
                        <stop offset="0%" stop-color="#020617" stop-opacity="1"/>
                        <stop offset="60%" stop-color="#0f172a" stop-opacity="0.9"/>
                        <stop offset="100%" stop-color="#3b0764" stop-opacity="0.5"/>
                    </radialGradient>
                    <linearGradient id="ironArch" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#475569"/>
                        <stop offset="50%" stop-color="#1e293b"/>
                        <stop offset="100%" stop-color="#0f172a"/>
                    </linearGradient>
                </defs>

                <!-- Мрачные подземные своды вокруг входа -->
                <rect width="800" height="450" fill="#05070c"/>

                <!-- Колоссальная кованая арка Врат Подземелья -->
                <path d="M220,450 L220,200 Q400,90 580,200 L580,450 Z" fill="url(#gateVoid)"/>
                <path d="M200,450 L200,190 Q400,70 600,190 L600,450 L560,450 L560,205 Q400,105 240,205 L240,450 Z" fill="url(#ironArch)" stroke="#0f172a" stroke-width="2"/>

                <!-- Зубья решетки Врат (распахнутой навстречу тьме) -->
                <path d="M240,205 Q400,105 560,205" fill="none" stroke="#ca8a04" stroke-width="4"/>
                <line x1="280" y1="180" x2="280" y2="450" stroke="#334155" stroke-width="2"/>
                <line x1="340" y1="150" x2="340" y2="450" stroke="#334155" stroke-width="2"/>
                <line x1="400" y1="140" x2="400" y2="450" stroke="#334155" stroke-width="2.5"/>
                <line x1="460" y1="150" x2="460" y2="450" stroke="#334155" stroke-width="2"/>
                <line x1="520" y1="180" x2="520" y2="450" stroke="#334155" stroke-width="2"/>

                <!-- Винтовая каменная лестница, уходящая в глубины -->
                <g fill="#1e293b" stroke="#0f172a" stroke-width="1.5">
                    <polygon points="340,300 460,300 440,320 360,320"/>
                    <polygon points="320,330 480,330 460,355 340,355"/>
                    <polygon points="300,365 500,365 480,395 320,395"/>
                    <polygon points="270,405 530,405 510,445 290,445"/>
                </g>

                <!-- Факелы по бокам входа -->
                <g transform="translate(190, 240)">
                    <rect x="-3" y="10" width="6" height="24" fill="#78350f"/>
                    <circle cx="0" cy="0" r="12" fill="#f59e0b" opacity="0.8"/>
                    <circle cx="0" cy="-2" r="6" fill="#fef08a"/>
                </g>
                <g transform="translate(610, 240)">
                    <rect x="-3" y="10" width="6" height="24" fill="#78350f"/>
                    <circle cx="0" cy="0" r="12" fill="#f59e0b" opacity="0.8"/>
                    <circle cx="0" cy="-2" r="6" fill="#fef08a"/>
                </g>

                <!-- Силуэт героя на пороге перед спуском во Тьму -->
                <g transform="translate(370, 310)">
                    <ellipse cx="30" cy="100" rx="26" ry="6" fill="#000000" opacity="0.7"/>
                    <!-- Плащ героя -->
                    <path d="M18,30 L5,96 L55,96 L42,30 Z" fill="#0f172a"/>
                    <!-- Торс и плечи с мечом -->
                    <rect x="20" y="24" width="20" height="40" rx="3" fill="#334155"/>
                    <circle cx="30" cy="14" r="9" fill="#cbd5e1"/>
                    <!-- Клинок героя, отражающий свет факела -->
                    <line x1="45" y1="35" x2="58" y2="85" stroke="#e2e8f0" stroke-width="3"/>
                    <circle cx="45" cy="35" r="3" fill="#ca8a04"/>
                </g>

                <!-- Золотая руническая надпись над аркой -->
                <text x="400" y="85" text-anchor="middle" fill="#facc15" font-size="14" font-weight="bold" letter-spacing="3">КАТАКОМБЫ БЕЗДНЫ</text>
                <text x="400" y="440" text-anchor="middle" fill="#cbd5e1" font-size="11" letter-spacing="4" font-weight="bold">ШАГНИТЕ ВО ТЬМУ • ВАША САГА НАЧИНАЕТСЯ</text>
            </svg>
        `;
    }
}

