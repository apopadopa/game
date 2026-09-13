// Процедурный SVG-рендерер для всех 32 чудовищ катакомб
// Поддерживает масштабирование, динамические скины, оружие, стихийные свечения и ауры

export class MobRenderer {
    /**
     * Отрисовывает SVG фигуру монстра
     * @param {Object} mob - экземпляр моба с полями (archetype, skinColor, armorColor, glowColor, weaponId, element, tier)
     * @param {number} width - ширина SVG
     * @param {number} height - высота SVG
     * @param {boolean} isInspect - флаг детального режима (увеличенный масштаб и доп. эффекты)
     */
    static render(mob, width = 180, height = 220, isInspect = false, facing = 'auto') {
        const arch = mob.archetype || 'goblin';
        const skin = mob.skinColor || '#4d7c0f';
        const armor = mob.armorColor || '#78350f';
        const glow = mob.glowColor || '#38bdf8';
        const uniqueId = `mob_${mob.id || 'x'}_${Math.floor(Math.random() * 10000)}`;

        // Определение направления взгляда моба
        const dir = (facing !== 'auto' && facing !== null && facing !== undefined) ? facing : (mob.facing || 'auto');
        const rightFacingArchs = ['kobold', 'rat', 'gnoll', 'crypt_chimera'];
        const isRightFacingArch = rightFacingArchs.includes(arch);
        const shouldFlip = isRightFacingArch && (dir === 'left' || dir === -1);

        let defsHtml = '';
        let auraHtml = '';
        let pedestalHtml = '';

        if (isInspect) {
            defsHtml = `
                <defs>
                    <radialGradient id="pedestal_${uniqueId}" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#241d15" stop-opacity="0.9"/>
                        <stop offset="60%" stop-color="#14110d" stop-opacity="0.6"/>
                        <stop offset="100%" stop-color="#050403" stop-opacity="0"/>
                    </radialGradient>
                    <radialGradient id="aura_${uniqueId}" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="${glow}" stop-opacity="0.35"/>
                        <stop offset="60%" stop-color="${glow}" stop-opacity="0.12"/>
                        <stop offset="100%" stop-color="${glow}" stop-opacity="0"/>
                    </radialGradient>
                </defs>
            `;
            auraHtml = `<ellipse cx="100" cy="115" rx="64" ry="74" fill="url(#aura_${uniqueId})"/>`;
            pedestalHtml = `
                <ellipse cx="100" cy="208" rx="56" ry="12" fill="url(#pedestal_${uniqueId})"/>
                <ellipse cx="100" cy="208" rx="36" ry="6" fill="#050505" opacity="0.8"/>
            `;
        } else {
            // Оптимизированный ультра-легкий рендер для комнат подземелья без создания тяжелых <defs>
            auraHtml = `<ellipse cx="100" cy="115" rx="64" ry="74" fill="${glow}" opacity="0.22"/>`;
            pedestalHtml = `
                <ellipse cx="100" cy="208" rx="56" ry="12" fill="#14110d" opacity="0.75"/>
                <ellipse cx="100" cy="208" rx="36" ry="6" fill="#050505" opacity="0.85"/>
            `;
        }

        return `
            <svg viewBox="0 0 200 240" width="${width}" height="${height}" class="mob-svg-figure">
                ${defsHtml}
                <!-- Ореол стихии / магии за спиной монстра -->
                ${auraHtml}
                <!-- Теневой пьедестал под лапами/ногами монстра -->
                ${pedestalHtml}
                <!-- Фигура монстра -->
                <g id="mob-actor-${uniqueId}" ${shouldFlip ? 'transform="translate(200, 0) scale(-1, 1)"' : ''}>
                    ${this.renderArchetype(arch, skin, armor, glow, mob.weaponId, isInspect)}
                </g>
            </svg>
        `;
    }

    static renderArchetype(arch, skin, armor, glow, weapon, isInspect) {
        switch (arch) {
            case 'goblin': return this.renderGoblin(skin, armor, glow, weapon);
            case 'skeleton': return this.renderSkeleton(skin, armor, glow, weapon);
            case 'kobold': return this.renderKobold(skin, armor, glow, weapon);
            case 'rat': return this.renderRat(skin, armor, glow, weapon);
            case 'slime': return this.renderSlime(skin, armor, glow, weapon);
            case 'cultist': return this.renderCultist(skin, armor, glow, weapon);
            case 'spider': return this.renderSpider(skin, armor, glow, weapon);
            case 'armor': return this.renderAnimatedArmor(skin, armor, glow, weapon);
            case 'zombie': return this.renderZombie(skin, armor, glow, weapon);
            case 'bat': return this.renderBat(skin, armor, glow, weapon);
            case 'gnoll': return this.renderGnoll(skin, armor, glow, weapon);
            case 'imp': return this.renderImp(skin, armor, glow, weapon);
            case 'troglodyte': return this.renderTroglodyte(skin, armor, glow, weapon);
            case 'myconid': return this.renderMyconid(skin, armor, glow, weapon);
            case 'cursed_miner': return this.renderCursedMiner(skin, armor, glow, weapon);
            case 'earth_elemental': return this.renderEarthElemental(skin, armor, glow, weapon);
            case 'crystal_scarab': return this.renderCrystalScarab(skin, armor, glow, weapon);
            case 'poltergeist': return this.renderPoltergeist(skin, armor, glow, weapon);
            case 'young_basilisk': return this.renderYoungBasilisk(skin, armor, glow, weapon);
            case 'water_naga': return this.renderWaterNaga(skin, armor, glow, weapon);

            case 'orc': return this.renderOrc(skin, armor, glow, weapon);
            case 'troll': return this.renderTroll(skin, armor, glow, weapon);
            case 'banshee': return this.renderBanshee(skin, armor, glow, weapon);
            case 'minotaur': return this.renderMinotaur(skin, armor, glow, weapon);
            case 'necromancer': return this.renderNecromancer(skin, armor, glow, weapon);
            case 'gargoyle': return this.renderGargoyle(skin, armor, glow, weapon);
            case 'scorpion': return this.renderScorpion(skin, armor, glow, weapon);
            case 'death_knight': return this.renderDeathKnight(skin, armor, glow, weapon);
            case 'hydra': return this.renderHydra(skin, armor, glow, weapon);
            case 'strangler': return this.renderStrangler(skin, armor, glow, weapon);
            case 'ogre': return this.renderOgre(skin, armor, glow, weapon);
            case 'wyvern': return this.renderWyvern(skin, armor, glow, weapon);
            case 'salamander': return this.renderSalamander(skin, armor, glow, weapon);
            case 'shadow_assassin': return this.renderShadowAssassin(skin, armor, glow, weapon);
            case 'bone_golem': return this.renderBoneGolem(skin, armor, glow, weapon);
            case 'crypt_chimera': return this.renderCryptChimera(skin, armor, glow, weapon);
            case 'intellect_devourer': return this.renderIntellectDevourer(skin, armor, glow, weapon);
            case 'dungeon_behemoth': return this.renderDungeonBehemoth(skin, armor, glow, weapon);
            case 'succubus': return this.renderSuccubus(skin, armor, glow, weapon);
            case 'chaos_centaur': return this.renderChaosCentaur(skin, armor, glow, weapon);

            case 'archlich': return this.renderArchlich(skin, armor, glow, weapon);
            case 'inquisitor': return this.renderInquisitor(skin, armor, glow, weapon);
            case 'broodmother': return this.renderBroodmother(skin, armor, glow, weapon);
            case 'golem': return this.renderGolem(skin, armor, glow, weapon);
            case 'crypt_lord': return this.renderCryptLord(skin, armor, glow, weapon);
            case 'mind_flayer': return this.renderMindFlayer(skin, armor, glow, weapon);
            case 'clockwork_titan': return this.renderClockworkTitan(skin, armor, glow, weapon);

            case 'dragon': return this.renderDragon(skin, armor, glow, weapon);
            case 'void_avatar': return this.renderVoidAvatar(skin, armor, glow, weapon);
            case 'archdemon': return this.renderArchdemon(skin, armor, glow, weapon);
            case 'lord_of_silence': return this.renderLordOfSilence(skin, armor, glow, weapon);
            case 'forgotten_demigod': return this.renderForgottenDemigod(skin, armor, glow, weapon);

            default: return this.renderGoblin(skin, armor, glow, weapon);
        }
    }

    // 1. ГОБЛИН
    static renderGoblin(skin, armor, glow, weapon) {
        return `
            <!-- Уши гоблина -->
            <polygon points="62,112 40,94 66,120" fill="${skin}" stroke="#1f2937" stroke-width="1.5"/>
            <polygon points="138,112 160,94 134,120" fill="${skin}" stroke="#1f2937" stroke-width="1.5"/>
            <!-- Ноги -->
            <rect x="84" y="172" width="12" height="34" rx="3" fill="${skin}" stroke="#1f2937" stroke-width="1.2"/>
            <rect x="104" y="172" width="12" height="34" rx="3" fill="${skin}" stroke="#1f2937" stroke-width="1.2"/>
            <path d="M80,202 L98,202 L96,208 L78,208 Z" fill="#292524"/>
            <path d="M102,202 L120,202 L122,208 L104,208 Z" fill="#292524"/>
            <!-- Тело в лохмотьях -->
            <path d="M78,132 L122,132 L126,176 L74,176 Z" fill="${armor}" stroke="#1c1917" stroke-width="1.5"/>
            <line x1="88" y1="150" x2="112" y2="150" stroke="#451a03" stroke-width="3"/>
            <!-- Руки -->
            <path d="M74,136 L62,168 L68,172 L78,142 Z" fill="${skin}" stroke="#1f2937" stroke-width="1.2"/>
            <path d="M126,136 L138,168 L132,172 L122,142 Z" fill="${skin}" stroke="#1f2937" stroke-width="1.2"/>
            <!-- Голова -->
            <circle cx="100" cy="115" r="24" fill="${skin}" stroke="#1f2937" stroke-width="1.5"/>
            <!-- Нос картошкой -->
            <polygon points="98,114 93,124 104,124" fill="${skin}" stroke="#1f2937" stroke-width="1.2"/>
            <!-- Горящие глаза -->
            <circle cx="91" cy="108" r="4.5" fill="#facc15"/>
            <circle cx="91" cy="108" r="2" fill="#000000"/>
            <circle cx="109" cy="108" r="4.5" fill="#facc15"/>
            <circle cx="109" cy="108" r="2" fill="#000000"/>
            <!-- Злобный оскал -->
            <path d="M88,128 Q100,135 112,128" stroke="#1c1917" stroke-width="2" fill="none"/>
            <polygon points="92,128 95,133 97,128" fill="#fff"/>
            <polygon points="103,128 105,133 108,128" fill="#fff"/>
            <!-- Оружие в руке -->
            <line x1="138" y1="140" x2="148" y2="185" stroke="#78350f" stroke-width="3"/>
            <polygon points="144,135 152,130 148,148" fill="#94a3b8" stroke="#475569" stroke-width="1"/>
            <circle cx="148" cy="140" r="6" fill="${glow}" opacity="0.5"/>
        `;
    }

    // 2. СКЕЛЕТ
    static renderSkeleton(skin, armor, glow, weapon) {
        return `
            <!-- Ноги (кости) -->
            <line x1="88" y1="160" x2="88" y2="204" stroke="${skin}" stroke-width="4.5" stroke-linecap="round"/>
            <line x1="112" y1="160" x2="112" y2="204" stroke="${skin}" stroke-width="4.5" stroke-linecap="round"/>
            <circle cx="88" cy="182" r="3.5" fill="#64748b"/>
            <circle cx="112" cy="182" r="3.5" fill="#64748b"/>
            <!-- Тазовые кости -->
            <path d="M80,158 Q100,166 120,158 L114,166 L86,166 Z" fill="${skin}" stroke="#334155" stroke-width="1.2"/>
            <!-- Позвоночник и ребра -->
            <line x1="100" y1="120" x2="100" y2="158" stroke="${skin}" stroke-width="5"/>
            <line x1="84" y1="128" x2="116" y2="128" stroke="${skin}" stroke-width="3" stroke-linecap="round"/>
            <line x1="82" y1="136" x2="118" y2="136" stroke="${skin}" stroke-width="3.5" stroke-linecap="round"/>
            <line x1="86" y1="144" x2="114" y2="144" stroke="${skin}" stroke-width="3" stroke-linecap="round"/>
            <line x1="90" y1="151" x2="110" y2="151" stroke="${skin}" stroke-width="2.5" stroke-linecap="round"/>
            <!-- Нагрудник/наплечники -->
            <path d="M78,120 L122,120 L115,142 L85,142 Z" fill="${armor}" opacity="0.75" stroke="#0f172a" stroke-width="1.2"/>
            <!-- Руки (кости) -->
            <line x1="78" y1="124" x2="65" y2="160" stroke="${skin}" stroke-width="3.5" stroke-linecap="round"/>
            <line x1="122" y1="124" x2="136" y2="160" stroke="${skin}" stroke-width="3.5" stroke-linecap="round"/>
            <!-- Череп -->
            <path d="M85,96 C85,78 115,78 115,96 C115,108 111,114 107,117 L93,117 C89,114 85,108 85,96 Z" fill="${skin}" stroke="#334155" stroke-width="1.5"/>
            <!-- Глазницы с потусторонним пламенем -->
            <ellipse cx="93" cy="98" rx="4" ry="5" fill="#090a0f"/>
            <circle cx="93" cy="98" r="2.5" fill="${glow}"/>
            <ellipse cx="107" cy="98" rx="4" ry="5" fill="#090a0f"/>
            <circle cx="107" cy="98" r="2.5" fill="${glow}"/>
            <!-- Носовая полость и зубы -->
            <polygon points="100,103 98,108 102,108" fill="#1e293b"/>
            <line x1="93" y1="113" x2="107" y2="113" stroke="#334155" stroke-width="1.5"/>
            <line x1="96" y1="110" x2="96" y2="115" stroke="#334155" stroke-width="1"/>
            <line x1="100" y1="110" x2="100" y2="115" stroke="#334155" stroke-width="1"/>
            <line x1="104" y1="110" x2="104" y2="115" stroke="#334155" stroke-width="1"/>
            <!-- Щит в левой руке -->
            <path d="M54,142 L72,142 L68,175 L63,182 L58,175 Z" fill="${armor}" stroke="#0f172a" stroke-width="1.5"/>
            <line x1="63" y1="145" x2="63" y2="178" stroke="${glow}" stroke-width="1.5"/>
            <!-- Меч в правой руке -->
            <line x1="138" y1="120" x2="152" y2="190" stroke="#94a3b8" stroke-width="3"/>
            <line x1="130" y1="136" x2="146" y2="133" stroke="#475569" stroke-width="2.5"/>
        `;
    }

    // 3. КОБОЛЬД
    static renderKobold(skin, armor, glow, weapon) {
        return `
            <!-- Хвост -->
            <path d="M80,170 Q56,180 50,202 Q60,195 82,178 Z" fill="${skin}" stroke="#1f2937" stroke-width="1"/>
            <!-- Ноги -->
            <path d="M84,166 L78,204 L88,206 L94,170 Z" fill="${skin}"/>
            <path d="M106,166 L112,204 L122,206 L116,170 Z" fill="${skin}"/>
            <!-- Тело -->
            <path d="M78,135 L122,135 L124,172 L76,172 Z" fill="${armor}" stroke="#1c1917" stroke-width="1.5"/>
            <!-- Голова с чешуйчатой мордой -->
            <path d="M85,116 L124,116 L134,124 L120,132 L85,130 Z" fill="${skin}" stroke="#1f2937" stroke-width="1.2"/>
            <!-- Глаз -->
            <circle cx="112" cy="120" r="3.5" fill="#f59e0b"/>
            <line x1="112" y1="117" x2="112" y2="123" stroke="#000" stroke-width="1.5"/>
            <!-- Горняцкий шлем со свечой -->
            <path d="M84,116 L120,116 L114,104 L88,104 Z" fill="#451a03" stroke="#1c1917" stroke-width="1.5"/>
            <rect x="97" y="94" width="6" height="11" fill="#fef08a"/>
            <circle cx="100" cy="90" r="5" fill="#f97316" filter="url(#glowFilter)"/>
            <circle cx="100" cy="90" r="2.5" fill="#fff"/>
            <!-- Кирка в лапах -->
            <line x1="118" y1="140" x2="148" y2="182" stroke="#78350f" stroke-width="3"/>
            <path d="M138,134 Q150,140 156,150 L144,142 Z" fill="#94a3b8" stroke="#475569" stroke-width="1"/>
        `;
    }

    // 4. ЧУМНАЯ КРЫСА
    static renderRat(skin, armor, glow, weapon) {
        return `
            <!-- Хвост чешуйчатый -->
            <path d="M52,175 Q28,160 30,195 Q42,185 64,180" stroke="#a8a29e" stroke-width="3" fill="none" stroke-linecap="round"/>
            <!-- Задняя лапа -->
            <ellipse cx="72" cy="182" rx="16" ry="12" fill="${skin}"/>
            <rect x="68" y="190" width="10" height="16" fill="${skin}"/>
            <!-- Тело крысы (крупное, сутулое) -->
            <ellipse cx="104" cy="164" rx="42" ry="28" fill="${skin}" stroke="#1c1917" stroke-width="2"/>
            <!-- Передние лапки с коготками -->
            <line x1="126" y1="180" x2="134" y2="204" stroke="${skin}" stroke-width="4" stroke-linecap="round"/>
            <line x1="130" y1="204" x2="140" y2="204" stroke="#1c1917" stroke-width="2"/>
            <!-- Морда вытянутая -->
            <polygon points="126,146 168,162 138,176" fill="${skin}" stroke="#1c1917" stroke-width="1.5"/>
            <!-- Ухо округлое -->
            <circle cx="124" cy="144" r="9" fill="#991b1b" stroke="${skin}" stroke-width="2.5"/>
            <!-- Носик и зубы -->
            <circle cx="168" cy="162" r="3" fill="#000000"/>
            <polygon points="158,166 160,174 163,166" fill="#fef08a"/>
            <!-- Горящий яростный глаз -->
            <circle cx="142" cy="154" r="4.5" fill="${glow}"/>
            <circle cx="142" cy="154" r="1.5" fill="#000"/>
            <!-- Капли яда с пасти -->
            <circle cx="160" cy="178" r="2.5" fill="${glow}" opacity="0.85"/>
        `;
    }

    // 5. ПОДЗЕМНЫЙ СЛИЗЕНЬ
    static renderSlime(skin, armor, glow, weapon) {
        return `
            <!-- Нижняя расплывшаяся лужа -->
            <ellipse cx="100" cy="198" rx="58" ry="14" fill="${armor}" opacity="0.6"/>
            <!-- Полупрозрачный купол слизня -->
            <path d="M52,196 C44,148 64,112 100,110 C136,112 156,148 148,196 C136,204 64,204 52,196 Z" fill="${skin}" opacity="0.88" stroke="${armor}" stroke-width="2"/>
            <!-- Внутреннее светящееся ядро -->
            <circle cx="100" cy="155" r="15" fill="${glow}" opacity="0.8"/>
            <circle cx="96" cy="152" r="5" fill="#ffffff" opacity="0.9"/>
            <!-- Внутренние пузыри -->
            <circle cx="80" cy="172" r="6" fill="#ffffff" opacity="0.3"/>
            <circle cx="120" cy="168" r="7" fill="#ffffff" opacity="0.35"/>
            <circle cx="92" cy="132" r="4" fill="#ffffff" opacity="0.4"/>
            <!-- Глазки-бусинки на поверхности -->
            <ellipse cx="88" cy="146" rx="4" ry="6" fill="#000000"/>
            <circle cx="89" cy="144" r="1.5" fill="#ffffff"/>
            <ellipse cx="112" cy="146" rx="4" ry="6" fill="#000000"/>
            <circle cx="113" cy="144" r="1.5" fill="#ffffff"/>
            <!-- Блик света сверху -->
            <path d="M72,130 Q92,120 114,124" stroke="#ffffff" stroke-width="3" opacity="0.5" fill="none" stroke-linecap="round"/>
        `;
    }

    // 6. ТЁМНЫЙ СЕКТАНТ
    static renderCultist(skin, armor, glow, weapon) {
        return `
            <!-- Мантия до пола -->
            <path d="M74,136 L126,136 L138,206 L62,206 Z" fill="${armor}" stroke="#090a0f" stroke-width="2"/>
            <path d="M96,136 L100,206 L104,136 Z" fill="#1e1b4b" opacity="0.4"/>
            <!-- Капюшон глубокий -->
            <path d="M76,128 C72,92 128,92 124,128 L100,140 Z" fill="${armor}" stroke="#090a0f" stroke-width="1.8"/>
            <!-- Чернота внутри капюшона -->
            <ellipse cx="100" cy="116" rx="14" ry="12" fill="#050508"/>
            <!-- Горящие мистические глаза под капюшоном -->
            <ellipse cx="94" cy="116" rx="2.5" ry="3.5" fill="${glow}"/>
            <ellipse cx="106" cy="116" rx="2.5" ry="3.5" fill="${glow}"/>
            <!-- Рукава балахона -->
            <path d="M74,138 L60,174 L70,178 L80,148 Z" fill="${armor}"/>
            <path d="M126,138 L140,174 L130,178 L120,148 Z" fill="${armor}"/>
            <!-- Посох с черепом или ритуальный кинжал -->
            <line x1="140" y1="100" x2="140" y2="208" stroke="#451a03" stroke-width="3.5"/>
            <circle cx="140" cy="98" r="9" fill="#cbd5e1" stroke="#334155" stroke-width="1"/>
            <circle cx="138" cy="97" r="2" fill="${glow}"/>
            <circle cx="142" cy="97" r="2" fill="${glow}"/>
            <circle cx="140" cy="98" r="14" fill="${glow}" opacity="0.3"/>
        `;
    }

    // 7. ПЕЩЕРНЫЙ ПАУК
    static renderSpider(skin, armor, glow, weapon) {
        return `
            <!-- 8 лап паука (по 4 с каждой стороны) -->
            <path d="M80,165 L50,140 L36,195" stroke="${skin}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
            <path d="M82,168 L46,160 L32,204" stroke="${skin}" stroke-width="3" fill="none" stroke-linecap="round"/>
            <path d="M84,172 L52,185 L44,208" stroke="${skin}" stroke-width="3" fill="none" stroke-linecap="round"/>
            <path d="M82,160 L58,125 L50,160" stroke="${skin}" stroke-width="3" fill="none" stroke-linecap="round"/>

            <path d="M120,165 L150,140 L164,195" stroke="${skin}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
            <path d="M118,168 L154,160 L168,204" stroke="${skin}" stroke-width="3" fill="none" stroke-linecap="round"/>
            <path d="M116,172 L148,185 L156,208" stroke="${skin}" stroke-width="3" fill="none" stroke-linecap="round"/>
            <path d="M118,160 L142,125 L150,160" stroke="${skin}" stroke-width="3" fill="none" stroke-linecap="round"/>

            <!-- Брюшко крупное волосатое -->
            <ellipse cx="100" cy="144" rx="26" ry="24" fill="${armor}" stroke="#090a0f" stroke-width="2"/>
            <path d="M100,126 L94,138 L106,138 Z" fill="${glow}" opacity="0.8"/>
            <circle cx="100" cy="148" r="4" fill="${glow}" opacity="0.8"/>
            <!-- Головогрудь -->
            <ellipse cx="100" cy="174" rx="18" ry="14" fill="${skin}" stroke="#090a0f" stroke-width="1.8"/>
            <!-- Хелицеры / ядовитые жвала -->
            <path d="M92,186 L94,198 L98,188 Z" fill="#ffffff" stroke="#1c1917" stroke-width="1"/>
            <path d="M108,186 L106,198 L102,188 Z" fill="#ffffff" stroke="#1c1917" stroke-width="1"/>
            <!-- Гроздь горящих глаз (6 штук) -->
            <circle cx="94" cy="170" r="2.5" fill="${glow}"/>
            <circle cx="100" cy="168" r="3" fill="${glow}"/>
            <circle cx="106" cy="170" r="2.5" fill="${glow}"/>
            <circle cx="96" cy="176" r="2" fill="${glow}"/>
            <circle cx="104" cy="176" r="2" fill="${glow}"/>
        `;
    }

    // 8. ОЖИВШИЙ ДОСПЕХ
    static renderAnimatedArmor(skin, armor, glow, weapon) {
        return `
            <!-- Поножи и сапоги -->
            <rect x="80" y="160" width="16" height="46" rx="3" fill="${armor}" stroke="#0f172a" stroke-width="1.5"/>
            <rect x="104" y="160" width="16" height="46" rx="3" fill="${armor}" stroke="#0f172a" stroke-width="1.5"/>
            <!-- Латная кираса -->
            <path d="M72,118 L128,118 L122,164 L78,164 Z" fill="${armor}" stroke="#0f172a" stroke-width="2"/>
            <line x1="100" y1="118" x2="100" y2="164" stroke="#0f172a" stroke-width="2"/>
            <!-- Массивные шипастые наплечники -->
            <ellipse cx="68" cy="122" rx="14" ry="10" fill="${skin}" stroke="#0f172a" stroke-width="1.5"/>
            <ellipse cx="132" cy="122" rx="14" ry="10" fill="${skin}" stroke="#0f172a" stroke-width="1.5"/>
            <!-- Руки в латных рукавицах -->
            <rect x="58" y="130" width="12" height="36" fill="${armor}" stroke="#0f172a" stroke-width="1.2"/>
            <rect x="130" y="130" width="12" height="36" fill="${armor}" stroke="#0f172a" stroke-width="1.2"/>
            <!-- Пустой шлем (визор светится) -->
            <path d="M84,108 C84,82 116,82 116,108 L114,118 L86,118 Z" fill="${skin}" stroke="#0f172a" stroke-width="2"/>
            <polygon points="100,78 96,86 104,86" fill="${glow}"/>
            <!-- Прорезь визора с мистическим светом -->
            <rect x="88" y="100" width="24" height="4" rx="2" fill="#000000"/>
            <rect x="90" y="101" width="20" height="2" rx="1" fill="${glow}"/>
            <!-- Гигантский алебарда / меч -->
            <line x1="146" y1="70" x2="146" y2="208" stroke="#475569" stroke-width="3.5"/>
            <polygon points="146,70 136,88 156,88" fill="#cbd5e1" stroke="#334155" stroke-width="1"/>
            <path d="M146,84 Q164,88 160,102 L146,96 Z" fill="#94a3b8"/>
        `;
    }

    // 9. ГНИЮЩИЙ ЗОМБИ
    static renderZombie(skin, armor, glow, weapon) {
        return `
            <!-- Ноги (одна подволакивается) -->
            <rect x="82" y="162" width="14" height="42" fill="${armor}" stroke="#1c1917" stroke-width="1.2"/>
            <path d="M106,162 L116,196 L124,198 L114,162 Z" fill="${armor}" stroke="#1c1917" stroke-width="1.2"/>
            <!-- Тело в рваной рубахе, видны ребра -->
            <path d="M76,126 L124,126 L120,166 L78,166 Z" fill="${armor}" stroke="#1c1917" stroke-width="1.5"/>
            <path d="M86,134 L98,134 L94,152 L84,152 Z" fill="${skin}"/>
            <line x1="86" y1="140" x2="96" y2="140" stroke="#f1f5f9" stroke-width="1.5"/>
            <line x1="85" y1="146" x2="94" y2="146" stroke="#f1f5f9" stroke-width="1.5"/>
            <!-- Вытянутые руки зомби -->
            <path d="M76,130 L54,142 L52,148 L74,138 Z" fill="${skin}" stroke="#1c1917" stroke-width="1.2"/>
            <path d="M124,130 L146,142 L148,148 L126,138 Z" fill="${skin}" stroke="#1c1917" stroke-width="1.2"/>
            <!-- Голова с обвисшей челюстью -->
            <circle cx="100" cy="108" r="20" fill="${skin}" stroke="#1c1917" stroke-width="1.5"/>
            <!-- Бельмо в глазу -->
            <circle cx="94" cy="104" r="4" fill="#ffffff"/>
            <circle cx="94" cy="104" r="1.5" fill="#94a3b8"/>
            <circle cx="106" cy="106" r="3" fill="#000000"/>
            <circle cx="106" cy="106" r="1" fill="${glow}"/>
            <!-- Отвисшая пасть -->
            <path d="M92,118 L108,118 L105,128 L95,128 Z" fill="#450a0a" stroke="#1c1917" stroke-width="1.2"/>
            <rect x="96" y="117" width="2" height="3" fill="#fef08a"/>
            <rect x="102" y="125" width="2" height="3" fill="#fef08a"/>
        `;
    }

    // 10. ПЕЩЕРНЫЙ НЕТОПЫРЬ
    static renderBat(skin, armor, glow, weapon) {
        return `
            <!-- Кожистые крылья размахом во всю ширину -->
            <path d="M100,150 Q60,110 26,122 Q52,154 62,176 Q78,160 100,165 Z" fill="${armor}" stroke="#0f172a" stroke-width="1.8"/>
            <path d="M100,150 Q140,110 174,122 Q148,154 138,176 Q122,160 100,165 Z" fill="${armor}" stroke="#0f172a" stroke-width="1.8"/>
            <!-- Перепонки крыльев (лучи) -->
            <line x1="100" y1="150" x2="28" y2="124" stroke="#334155" stroke-width="1.5"/>
            <line x1="84" y1="155" x2="62" y2="176" stroke="#334155" stroke-width="1.5"/>
            <line x1="100" y1="150" x2="172" y2="124" stroke="#334155" stroke-width="1.5"/>
            <line x1="116" y1="155" x2="138" y2="176" stroke="#334155" stroke-width="1.5"/>
            <!-- Мохнатое тельце -->
            <ellipse cx="100" cy="162" rx="18" ry="24" fill="${skin}" stroke="#0f172a" stroke-width="1.5"/>
            <!-- Морда нетопыря -->
            <circle cx="100" cy="138" r="15" fill="${skin}" stroke="#0f172a" stroke-width="1.5"/>
            <!-- Большие уши локаторы -->
            <polygon points="90,132 82,108 94,124" fill="${armor}" stroke="#0f172a" stroke-width="1.2"/>
            <polygon points="110,132 118,108 106,124" fill="${armor}" stroke="#0f172a" stroke-width="1.2"/>
            <!-- Глаза и клыки -->
            <circle cx="94" cy="136" r="3.5" fill="${glow}"/>
            <circle cx="106" cy="136" r="3.5" fill="${glow}"/>
            <polygon points="96,145 98,152 100,145" fill="#ffffff"/>
            <polygon points="102,145 104,152 106,145" fill="#ffffff"/>
            <!-- Маленькие цепкие лапки внизу -->
            <line x1="94" y1="186" x2="94" y2="198" stroke="#1c1917" stroke-width="2"/>
            <line x1="106" y1="186" x2="106" y2="198" stroke="#1c1917" stroke-width="2"/>
        `;
    }

    // 11. ОРК-БЕРСЕРК
    static renderOrc(skin, armor, glow, weapon) {
        return `
            <!-- Мощные мускулистые ноги -->
            <rect x="74" y="156" width="22" height="48" rx="4" fill="${armor}" stroke="#090a0f" stroke-width="2"/>
            <rect x="104" y="156" width="22" height="48" rx="4" fill="${armor}" stroke="#090a0f" stroke-width="2"/>
            <!-- Массивный торс с шипастым поясом -->
            <path d="M64,112 L136,112 L128,162 L72,162 Z" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <rect x="68" y="150" width="64" height="12" fill="#451a03" stroke="#090a0f" stroke-width="1.5"/>
            <circle cx="100" cy="156" r="5" fill="#ca8a04"/>
            <!-- Шипастые наплечники -->
            <polygon points="52,106 68,92 78,118 56,122" fill="${armor}" stroke="#090a0f" stroke-width="1.8"/>
            <polygon points="148,106 132,92 122,118 144,122" fill="${armor}" stroke="#090a0f" stroke-width="1.8"/>
            <!-- Могучие бицепсы -->
            <ellipse cx="58" cy="136" rx="12" ry="18" fill="${skin}" stroke="#090a0f" stroke-width="1.5"/>
            <ellipse cx="142" cy="136" rx="12" ry="18" fill="${skin}" stroke="#090a0f" stroke-width="1.5"/>
            <!-- Голова с клыкастой челюстью -->
            <path d="M80,92 C80,68 120,68 120,92 L122,110 L78,110 Z" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <!-- Нижние клыки, торчащие вверх -->
            <polygon points="86,110 88,98 92,110" fill="#fef08a" stroke="#090a0f" stroke-width="1"/>
            <polygon points="114,110 112,98 108,110" fill="#fef08a" stroke="#090a0f" stroke-width="1"/>
            <!-- Глаза полные ярости -->
            <circle cx="90" cy="88" r="4" fill="${glow}"/>
            <circle cx="90" cy="88" r="1.5" fill="#000000"/>
            <circle cx="110" cy="88" r="4" fill="${glow}"/>
            <circle cx="110" cy="88" r="1.5" fill="#000000"/>
            <!-- Боевой топор в руке -->
            <line x1="148" y1="65" x2="148" y2="195" stroke="#78350f" stroke-width="5"/>
            <path d="M148,70 Q180,60 178,92 Q158,85 148,96 Z" fill="#94a3b8" stroke="#334155" stroke-width="2"/>
        `;
    }

    // 12. ПЕЩЕРНЫЙ ТРОЛЛЬ
    static renderTroll(skin, armor, glow, weapon) {
        return `
            <!-- Горбатый массивный силуэт -->
            <path d="M60,118 Q100,80 140,118 L134,180 L66,180 Z" fill="${skin}" stroke="#090a0f" stroke-width="2.5"/>
            <!-- Толстые ноги-тумбы -->
            <rect x="66" y="174" width="26" height="34" rx="5" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <rect x="108" y="174" width="26" height="34" rx="5" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <!-- Длинные тяжелые ручищи до земли -->
            <path d="M58,124 L42,185 L54,192 L68,136 Z" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <path d="M142,124 L158,185 L146,192 L132,136 Z" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <!-- Каменные наросты на плечах и спине -->
            <polygon points="76,96 86,82 94,98" fill="${armor}" stroke="#090a0f" stroke-width="1.5"/>
            <polygon points="106,96 114,84 124,98" fill="${armor}" stroke="#090a0f" stroke-width="1.5"/>
            <!-- Голова посажена глубоко в плечи -->
            <ellipse cx="100" cy="116" rx="22" ry="18" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <ellipse cx="100" cy="124" rx="10" ry="7" fill="${armor}"/>
            <circle cx="92" cy="112" r="3.5" fill="${glow}"/>
            <circle cx="108" cy="112" r="3.5" fill="${glow}"/>
            <!-- Дубина из бревна или камня -->
            <polygon points="152,140 174,130 168,195 148,190" fill="${armor}" stroke="#090a0f" stroke-width="2"/>
        `;
    }

    // 13. БАНШИ
    static renderBanshee(skin, armor, glow, weapon) {
        return `
            <!-- Парящий бесплотный шлейф призрака -->
            <path d="M80,130 Q60,170 65,206 Q85,188 100,206 Q115,188 135,206 Q140,170 120,130 Z" fill="${skin}" opacity="0.65" stroke="${glow}" stroke-width="1.5"/>
            <path d="M86,134 Q76,170 82,198 Q100,184 118,198 Q124,170 114,134 Z" fill="#ffffff" opacity="0.4"/>
            <!-- Призрачные руки с длинными пальцами -->
            <path d="M78,130 Q54,142 46,162" stroke="${skin}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
            <path d="M122,130 Q146,142 154,162" stroke="${skin}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
            <!-- Парящие волосы дыбом -->
            <path d="M76,98 Q50,70 68,48 Q86,76 96,86" fill="${skin}" opacity="0.8"/>
            <path d="M124,98 Q150,70 132,48 Q114,76 104,86" fill="${skin}" opacity="0.8"/>
            <!-- Лицо с раскрытым кричащим ртом -->
            <ellipse cx="100" cy="102" rx="18" ry="22" fill="${skin}" stroke="${glow}" stroke-width="1.8"/>
            <!-- Черные провалы глаз и рта -->
            <ellipse cx="93" cy="98" rx="3.5" ry="5" fill="#090a0f"/>
            <circle cx="93" cy="98" r="1.5" fill="${glow}"/>
            <ellipse cx="107" cy="98" rx="3.5" ry="5" fill="#090a0f"/>
            <circle cx="107" cy="98" r="1.5" fill="${glow}"/>
            <!-- Воющий рот -->
            <ellipse cx="100" cy="114" rx="6" ry="9" fill="#090a0f"/>
            <!-- Звуковые волны крика -->
            <path d="M88,114 Q74,114 62,122" stroke="${glow}" stroke-width="1.5" fill="none" opacity="0.7"/>
            <path d="M112,114 Q126,114 138,122" stroke="${glow}" stroke-width="1.5" fill="none" opacity="0.7"/>
        `;
    }

    // 14. МИНОТАВР
    static renderMinotaur(skin, armor, glow, weapon) {
        return `
            <!-- Мощные копыта и ноги -->
            <rect x="74" y="158" width="22" height="42" rx="4" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <rect x="104" y="158" width="22" height="42" rx="4" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <path d="M72,200 L98,200 L96,208 L70,208 Z" fill="#090a0f"/>
            <path d="M102,200 L128,200 L130,208 L104,208 Z" fill="#090a0f"/>
            <!-- Мускулистое тело с ремнями -->
            <path d="M62,110 L138,110 L128,162 L72,162 Z" fill="${skin}" stroke="#090a0f" stroke-width="2.5"/>
            <line x1="66" y1="114" x2="128" y2="158" stroke="${armor}" stroke-width="5"/>
            <!-- Бычья голова -->
            <path d="M78,86 L122,86 L118,122 L82,122 Z" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <!-- Кольцо в носу -->
            <circle cx="100" cy="120" r="6" stroke="#facc15" stroke-width="2.5" fill="none"/>
            <!-- Массивные изогнутые рога -->
            <path d="M78,88 Q46,80 44,52 Q62,62 82,78" fill="#e2e8f0" stroke="#090a0f" stroke-width="2"/>
            <path d="M122,88 Q154,80 156,52 Q138,62 118,78" fill="#e2e8f0" stroke="#090a0f" stroke-width="2"/>
            <!-- Глаза -->
            <circle cx="88" cy="94" r="4.5" fill="${glow}"/>
            <circle cx="112" cy="94" r="4.5" fill="${glow}"/>
            <!-- Гигантский колун / секира палача -->
            <line x1="148" y1="55" x2="148" y2="204" stroke="#451a03" stroke-width="5"/>
            <path d="M148,60 L182,74 L178,110 L148,102 Z" fill="#94a3b8" stroke="#334155" stroke-width="2"/>
        `;
    }

    // 15. НЕКРОМАНТ
    static renderNecromancer(skin, armor, glow, weapon) {
        return `
            <!-- Мантия с оккультными узорами -->
            <path d="M72,130 L128,130 L138,206 L62,206 Z" fill="${armor}" stroke="#090a0f" stroke-width="2"/>
            <!-- Кружащиеся черепа душ -->
            <circle cx="56" cy="120" r="8" fill="#e2e8f0" stroke="#334155" stroke-width="1"/>
            <circle cx="54" cy="118" r="1.5" fill="${glow}"/>
            <circle cx="58" cy="118" r="1.5" fill="${glow}"/>
            <circle cx="144" cy="114" r="8" fill="#e2e8f0" stroke="#334155" stroke-width="1"/>
            <circle cx="142" cy="112" r="1.5" fill="${glow}"/>
            <circle cx="146" cy="112" r="1.5" fill="${glow}"/>
            <!-- Нагрудный воротник с рунами -->
            <path d="M80,126 L100,146 L120,126 Z" fill="${glow}" opacity="0.75"/>
            <!-- Голова с костяной короной -->
            <circle cx="100" cy="106" r="18" fill="${skin}" stroke="#090a0f" stroke-width="1.8"/>
            <polygon points="86,96 90,82 94,94 100,78 106,94 110,82 114,96" fill="#f8fafc" stroke="#334155" stroke-width="1"/>
            <!-- Лицо иссушенное -->
            <circle cx="94" cy="106" r="3" fill="${glow}"/>
            <circle cx="106" cy="106" r="3" fill="${glow}"/>
            <!-- Костяная коса в руке -->
            <line x1="140" y1="80" x2="140" y2="208" stroke="#334155" stroke-width="3.5"/>
            <path d="M140,84 Q174,70 178,102 Q156,92 140,100 Z" fill="#e2e8f0" stroke="#090a0f" stroke-width="1.8"/>
        `;
    }

    // 16. БАЗАЛЬТОВАЯ ГАРГУЛЬЯ
    static renderGargoyle(skin, armor, glow, weapon) {
        return `
            <!-- Каменные крылья за спиной -->
            <path d="M84,130 Q44,70 30,105 Q58,118 64,152 Z" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <path d="M116,130 Q156,70 170,105 Q142,118 136,152 Z" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <!-- Сидит на постаменте на корточках -->
            <polygon points="76,190 100,172 124,190 100,208" fill="${armor}" stroke="#090a0f" stroke-width="2"/>
            <!-- Тело мускулистое каменное -->
            <ellipse cx="100" cy="144" rx="22" ry="26" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <!-- Лапы с когтями из обсидиана -->
            <path d="M78,162 L64,188 L74,190" stroke="#090a0f" stroke-width="3" fill="none"/>
            <path d="M122,162 L136,188 L126,190" stroke="#090a0f" stroke-width="3" fill="none"/>
            <!-- Голова с рогами -->
            <circle cx="100" cy="116" r="18" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <path d="M86,108 Q72,94 76,82 Q88,96 92,106" fill="${armor}" stroke="#090a0f" stroke-width="1.5"/>
            <path d="M114,108 Q128,94 124,82 Q112,96 108,106" fill="${armor}" stroke="#090a0f" stroke-width="1.5"/>
            <!-- Горящие глаза -->
            <circle cx="94" cy="115" r="3.5" fill="${glow}"/>
            <circle cx="106" cy="115" r="3.5" fill="${glow}"/>
        `;
    }

    // 17. ГЛУБИННЫЙ СКОРПИОН
    static renderScorpion(skin, armor, glow, weapon) {
        return `
            <!-- Изогнутый сегментированный хвост с жалом -->
            <path d="M100,165 Q80,130 84,102 Q90,74 116,70 Q136,74 130,94" stroke="${armor}" stroke-width="10" fill="none" stroke-linecap="round"/>
            <circle cx="130" cy="94" r="7" fill="${armor}"/>
            <polygon points="130,94 148,92 136,106" fill="${glow}" stroke="#090a0f" stroke-width="1.2"/>
            <!-- Бронированное хитиновое тело -->
            <ellipse cx="100" cy="170" rx="30" ry="20" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <!-- 6 лапок по бокам -->
            <path d="M78,172 L54,185 L44,204" stroke="${skin}" stroke-width="2.5" fill="none"/>
            <path d="M82,176 L62,192 L54,208" stroke="${skin}" stroke-width="2.5" fill="none"/>
            <path d="M122,172 L146,185 L156,204" stroke="${skin}" stroke-width="2.5" fill="none"/>
            <path d="M118,176 L138,192 L146,208" stroke="${skin}" stroke-width="2.5" fill="none"/>
            <!-- Две массивные клешни спереди -->
            <path d="M84,166 L60,150 L56,134" stroke="${skin}" stroke-width="6" fill="none"/>
            <path d="M56,134 Q40,126 48,114 Q64,124 56,134 Z" fill="${armor}" stroke="#090a0f" stroke-width="1.5"/>
            <path d="M116,166 L140,150 L144,134" stroke="${skin}" stroke-width="6" fill="none"/>
            <path d="M144,134 Q160,126 152,114 Q136,124 144,134 Z" fill="${armor}" stroke="#090a0f" stroke-width="1.5"/>
            <!-- Глаза -->
            <circle cx="96" cy="162" r="2" fill="${glow}"/>
            <circle cx="104" cy="162" r="2" fill="${glow}"/>
        `;
    }

    // 18. РЫЦАРЬ СМЕРТИ
    static renderDeathKnight(skin, armor, glow, weapon) {
        return `
            <!-- Плащ за спиной -->
            <path d="M70,118 L130,118 L144,204 L56,204 Z" fill="#450a0a" stroke="#090a0f" stroke-width="1.5"/>
            <!-- Черные латные ноги -->
            <rect x="78" y="156" width="18" height="48" rx="3" fill="${armor}" stroke="#090a0f" stroke-width="1.8"/>
            <rect x="104" y="156" width="18" height="48" rx="3" fill="${armor}" stroke="#090a0f" stroke-width="1.8"/>
            <!-- Латный корпус с черепом на нагруднике -->
            <path d="M68,114 L132,114 L126,162 L74,162 Z" fill="${armor}" stroke="#090a0f" stroke-width="2"/>
            <circle cx="100" cy="136" r="6" fill="#cbd5e1"/>
            <!-- Рогатый глухой шлем -->
            <path d="M82,108 C82,80 118,80 118,108 L114,118 L86,118 Z" fill="${armor}" stroke="#090a0f" stroke-width="2"/>
            <path d="M84,96 Q68,88 72,74 Q84,86 88,94" fill="#64748b" stroke="#090a0f" stroke-width="1.2"/>
            <path d="M116,96 Q132,88 128,74 Q116,86 112,94" fill="#64748b" stroke="#090a0f" stroke-width="1.2"/>
            <!-- Т-образная прорезь шлема с леденящим светом -->
            <line x1="90" y1="102" x2="110" y2="102" stroke="${glow}" stroke-width="2.5"/>
            <line x1="100" y1="102" x2="100" y2="112" stroke="${glow}" stroke-width="2.5"/>
            <!-- Рунический двуручный меч -->
            <line x1="146" y1="75" x2="146" y2="204" stroke="${glow}" stroke-width="4"/>
            <line x1="134" y1="110" x2="158" y2="110" stroke="#cbd5e1" stroke-width="3"/>
        `;
    }

    // 19. ПЕЩЕРНАЯ ГИДРА
    static renderHydra(skin, armor, glow, weapon) {
        return `
            <!-- Массивное змеевидное туловище -->
            <ellipse cx="100" cy="180" rx="38" ry="24" fill="${skin}" stroke="#090a0f" stroke-width="2.5"/>
            <!-- 3 извивающиеся шеи -->
            <path d="M82,170 Q60,130 68,98" stroke="${skin}" stroke-width="10" fill="none" stroke-linecap="round"/>
            <path d="M100,165 Q100,120 100,86" stroke="${skin}" stroke-width="11" fill="none" stroke-linecap="round"/>
            <path d="M118,170 Q140,130 132,98" stroke="${skin}" stroke-width="10" fill="none" stroke-linecap="round"/>
            <!-- 3 клыкастые головы -->
            <!-- Левая голова -->
            <ellipse cx="68" cy="94" rx="14" ry="10" fill="${armor}" stroke="#090a0f" stroke-width="1.5"/>
            <circle cx="64" cy="91" r="2.5" fill="${glow}"/>
            <polygon points="68,98 72,106 75,98" fill="#ffffff"/>
            <!-- Центральная голова (старшая) -->
            <ellipse cx="100" cy="80" rx="16" ry="12" fill="${armor}" stroke="#090a0f" stroke-width="2"/>
            <circle cx="96" cy="77" r="3" fill="${glow}"/>
            <circle cx="104" cy="77" r="3" fill="${glow}"/>
            <polygon points="96,86 99,96 102,86" fill="#ffffff"/>
            <!-- Правая голова -->
            <ellipse cx="132" cy="94" rx="14" ry="10" fill="${armor}" stroke="#090a0f" stroke-width="1.5"/>
            <circle cx="136" cy="91" r="2.5" fill="${glow}"/>
            <polygon points="125,98 128,106 132,98" fill="#ffffff"/>
        `;
    }

    // 20. ХИЩНАЯ ЛОЗА-ДУШИТЕЛЬ
    static renderStrangler(skin, armor, glow, weapon) {
        return `
            <!-- Корневище в земле -->
            <ellipse cx="100" cy="198" rx="42" ry="12" fill="${armor}"/>
            <!-- Переплетенные шипастые стебли -->
            <path d="M85,195 Q70,140 85,115 Q100,90 100,75" stroke="${skin}" stroke-width="12" fill="none"/>
            <path d="M115,195 Q130,140 115,115" stroke="${skin}" stroke-width="8" fill="none"/>
            <!-- Извивающиеся щупальца-усики -->
            <path d="M78,140 Q45,130 40,165" stroke="${skin}" stroke-width="4" fill="none" stroke-linecap="round"/>
            <path d="M122,140 Q155,130 160,165" stroke="${skin}" stroke-width="4" fill="none" stroke-linecap="round"/>
            <!-- Шипы на стеблях -->
            <polygon points="76,140 68,136 78,146" fill="#fef08a"/>
            <polygon points="124,140 132,136 122,146" fill="#fef08a"/>
            <!-- Плотоядный цветок-пасть на вершине -->
            <path d="M72,75 Q100,50 128,75 L114,105 L86,105 Z" fill="${armor}" stroke="#090a0f" stroke-width="2"/>
            <ellipse cx="100" cy="86" rx="16" ry="10" fill="#4c0519"/>
            <!-- Ряд острых игловидных зубов -->
            <polygon points="88,80 91,88 94,80" fill="#ffffff"/>
            <polygon points="98,80 100,89 103,80" fill="#ffffff"/>
            <polygon points="106,80 109,88 112,80" fill="#ffffff"/>
            <!-- Споры пыльцы -->
            <circle cx="100" cy="86" r="3" fill="${glow}"/>
            <circle cx="70" cy="65" r="2.5" fill="${glow}" opacity="0.8"/>
            <circle cx="130" cy="65" r="2.5" fill="${glow}" opacity="0.8"/>
        `;
    }

    // 21. АРХИЛИЧ ВАЛТОРА (БОСС)
    static renderArchlich(skin, armor, glow, weapon) {
        return `
            <!-- Парящие роскошные царские одежды некрополя -->
            <path d="M68,124 L132,124 L146,204 L54,204 Z" fill="${armor}" stroke="#090a0f" stroke-width="2"/>
            <path d="M88,124 L100,204 L112,124 Z" fill="#0369a1" opacity="0.5"/>
            <!-- Левитирующий филактерий (сфера душ) на груди -->
            <circle cx="100" cy="136" r="11" fill="${glow}" filter="url(#glowFilter)"/>
            <circle cx="100" cy="136" r="5" fill="#ffffff"/>
            <!-- Череп с золотой монаршей короной -->
            <path d="M84,94 C84,72 116,72 116,94 C116,108 111,114 107,117 L93,117 C89,114 85,108 85,94 Z" fill="#f8fafc" stroke="#334155" stroke-width="1.8"/>
            <!-- Сияющие ледяным огнем глазницы -->
            <ellipse cx="93" cy="94" rx="4" ry="5" fill="#090a0f"/>
            <circle cx="93" cy="94" r="2.5" fill="${glow}"/>
            <ellipse cx="107" cy="94" rx="4" ry="5" fill="#090a0f"/>
            <circle cx="107" cy="94" r="2.5" fill="${glow}"/>
            <!-- Корона с рубинами и шипами -->
            <polygon points="80,82 86,62 94,76 100,56 106,76 114,62 120,82" fill="#ca8a04" stroke="#78350f" stroke-width="1.5"/>
            <circle cx="100" cy="62" r="3" fill="#ef4444"/>
            <!-- Жезл Жнеца Вечности -->
            <line x1="146" y1="60" x2="146" y2="208" stroke="#ca8a04" stroke-width="4"/>
            <circle cx="146" cy="58" r="12" fill="${glow}" opacity="0.8"/>
            <circle cx="146" cy="58" r="6" fill="#ffffff"/>
        `;
    }

    // 22. ОСКВЕРНЁННЫЙ ИНКВИЗИТОР (БОСС)
    static renderInquisitor(skin, armor, glow, weapon) {
        return `
            <!-- Тяжелая мантия и латы верховного судии -->
            <path d="M66,116 L134,116 L144,204 L56,204 Z" fill="${armor}" stroke="#090a0f" stroke-width="2"/>
            <!-- Золотой святой крест на одеянии -->
            <rect x="96" y="130" width="8" height="42" fill="#eab308"/>
            <rect x="85" y="142" width="30" height="8" fill="#eab308"/>
            <!-- Железная судейская маска с крестовидной прорезью -->
            <path d="M84,90 C84,68 116,68 116,90 L114,114 L86,114 Z" fill="#475569" stroke="#090a0f" stroke-width="2"/>
            <!-- Пылающий очищающий нимб -->
            <circle cx="100" cy="88" r="30" stroke="${glow}" stroke-width="3" fill="none" opacity="0.75"/>
            <!-- Крестовая прорезь с огнем -->
            <line x1="90" y1="96" x2="110" y2="96" stroke="${glow}" stroke-width="3"/>
            <line x1="100" y1="88" x2="100" y2="108" stroke="${glow}" stroke-width="3"/>
            <!-- Пылающий двуручный меч инквизиции -->
            <line x1="148" y1="50" x2="148" y2="198" stroke="${glow}" stroke-width="5"/>
            <line x1="134" y1="88" x2="162" y2="88" stroke="#eab308" stroke-width="4"/>
        `;
    }

    // 23. КОРОЛЕВА ВЫВОДКА АРАХНА (БОСС)
    static renderBroodmother(skin, armor, glow, weapon) {
        return `
            <!-- Огромные суставчатые шипастые лапы -->
            <path d="M72,165 L32,125 L16,195" stroke="${armor}" stroke-width="5" fill="none" stroke-linecap="round"/>
            <path d="M76,170 L28,155 L12,206" stroke="${armor}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
            <path d="M128,165 L168,125 L184,195" stroke="${armor}" stroke-width="5" fill="none" stroke-linecap="round"/>
            <path d="M124,170 L172,155 L188,206" stroke="${armor}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
            <!-- Исполинское брюхо с коконами выводка -->
            <ellipse cx="100" cy="138" rx="42" ry="36" fill="${skin}" stroke="#090a0f" stroke-width="2.5"/>
            <circle cx="86" cy="130" r="7" fill="${glow}" opacity="0.8"/>
            <circle cx="114" cy="130" r="7" fill="${glow}" opacity="0.8"/>
            <circle cx="100" cy="148" r="9" fill="${glow}" opacity="0.8"/>
            <!-- Корона из хитиновых шипов над головой -->
            <ellipse cx="100" cy="174" rx="24" ry="18" fill="${armor}" stroke="#090a0f" stroke-width="2"/>
            <polygon points="86,164 80,150 92,160" fill="${armor}"/>
            <polygon points="114,164 120,150 108,160" fill="${armor}"/>
            <!-- Дюжина пылающих рубиновых глаз -->
            <circle cx="92" cy="170" r="3.5" fill="${glow}"/>
            <circle cx="100" cy="168" r="4" fill="${glow}"/>
            <circle cx="108" cy="170" r="3.5" fill="${glow}"/>
            <circle cx="95" cy="176" r="3" fill="${glow}"/>
            <circle cx="105" cy="176" r="3" fill="${glow}"/>
            <!-- Массивные ядовитые жвала -->
            <path d="M92,184 L96,204 L100,188" stroke="#ffffff" stroke-width="3" fill="none"/>
            <path d="M108,184 L104,204 L100,188" stroke="#ffffff" stroke-width="3" fill="none"/>
        `;
    }

    // 24. МАГМАТИЧЕСКИЙ КОЛОСС (БОСС)
    static renderGolem(skin, armor, glow, weapon) {
        return `
            <!-- Базальтовые массивные ноги-колонны -->
            <rect x="68" y="152" width="28" height="52" rx="4" fill="${armor}" stroke="#090a0f" stroke-width="2.5"/>
            <rect x="104" y="152" width="28" height="52" rx="4" fill="${armor}" stroke="#090a0f" stroke-width="2.5"/>
            <!-- Монолитный торс с раскаленными трещинами лавы -->
            <polygon points="56,104 144,104 132,160 68,160" fill="${armor}" stroke="#090a0f" stroke-width="2.5"/>
            <!-- Пылающее лавовое ядро в груди -->
            <circle cx="100" cy="132" r="16" fill="${glow}" filter="url(#glowFilter)"/>
            <circle cx="100" cy="132" r="8" fill="#ffffff"/>
            <!-- Огненные трещины по базальту -->
            <path d="M72,118 L88,126 L82,144" stroke="${glow}" stroke-width="2.5" fill="none"/>
            <path d="M128,118 L112,126 L118,144" stroke="${glow}" stroke-width="2.5" fill="none"/>
            <!-- Голова монолита -->
            <rect x="85" y="86" width="30" height="24" rx="4" fill="${armor}" stroke="#090a0f" stroke-width="2"/>
            <!-- Глазная щель с пламенем -->
            <rect x="90" y="96" width="20" height="4" rx="2" fill="${glow}"/>
            <!-- Огромные каменные кулачищи -->
            <ellipse cx="48" cy="154" rx="14" ry="18" fill="${armor}" stroke="#090a0f" stroke-width="2"/>
            <ellipse cx="152" cy="154" rx="14" ry="18" fill="${armor}" stroke="#090a0f" stroke-width="2"/>
        `;
    }

    // 25. ПОВЕЛИТЕЛЬ СКЛЕПА МОРТИС (БОСС)
    static renderCryptLord(skin, armor, glow, weapon) {
        return `
            <!-- Королевская мантия с меховой опушкой -->
            <path d="M64,116 L136,116 L148,206 L52,206 Z" fill="${armor}" stroke="#090a0f" stroke-width="2.5"/>
            <ellipse cx="100" cy="118" rx="38" ry="10" fill="#f8fafc" stroke="#334155" stroke-width="1.5"/>
            <!-- Скелетное лицо в венце из черненого серебра -->
            <path d="M84,94 C84,72 116,72 116,94 L114,114 L86,114 Z" fill="#e2e8f0" stroke="#090a0f" stroke-width="1.8"/>
            <circle cx="93" cy="96" r="3.5" fill="${glow}"/>
            <circle cx="107" cy="96" r="3.5" fill="${glow}"/>
            <!-- Царственная корона склепа с черепами -->
            <polygon points="80,82 86,64 94,76 100,58 106,76 114,64 120,82" fill="#334155" stroke="#090a0f" stroke-width="1.5"/>
            <circle cx="100" cy="74" r="3" fill="${glow}"/>
            <!-- Скипетр Повелителя Мертвых -->
            <line x1="148" y1="70" x2="148" y2="206" stroke="#94a3b8" stroke-width="4"/>
            <circle cx="148" cy="68" r="10" fill="#f8fafc" stroke="#090a0f" stroke-width="1.5"/>
            <circle cx="148" cy="68" r="4" fill="${glow}"/>
        `;
    }

    // 26. ПОЖИРАТЕЛЬ РАЗУМА (БОСС)
    static renderMindFlayer(skin, armor, glow, weapon) {
        return `
            <!-- Длинные аристократические мантии с высоким стоячим воротом -->
            <path d="M70,126 L130,126 L142,206 L58,206 Z" fill="${armor}" stroke="#090a0f" stroke-width="2"/>
            <path d="M68,124 L60,86 L80,108 Z" fill="${armor}" stroke="#090a0f" stroke-width="1.5"/>
            <path d="M132,124 L140,86 L120,108 Z" fill="${armor}" stroke="#090a0f" stroke-width="1.5"/>
            <!-- Инопланетная голова иллитида -->
            <ellipse cx="100" cy="98" rx="20" ry="24" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <!-- Белые бездонные зрачки с псионическим сиянием -->
            <circle cx="92" cy="94" r="4.5" fill="#ffffff"/>
            <circle cx="92" cy="94" r="2.5" fill="${glow}"/>
            <circle cx="108" cy="94" r="4.5" fill="#ffffff"/>
            <circle cx="108" cy="94" r="2.5" fill="${glow}"/>
            <!-- 4 извивающихся щупальца вокруг рта -->
            <path d="M92,108 Q84,130 90,146" stroke="${skin}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
            <path d="M97,110 Q94,135 98,152" stroke="${skin}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
            <path d="M103,110 Q106,135 102,152" stroke="${skin}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
            <path d="M108,108 Q116,130 110,146" stroke="${skin}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
            <!-- Псионическая сфера в левой руке -->
            <circle cx="54" cy="150" r="14" fill="${glow}" opacity="0.75" filter="url(#glowFilter)"/>
            <circle cx="54" cy="150" r="7" fill="#ffffff"/>
        `;
    }

    // 27. ЗАВОДНОЙ ТИТАН ДРЕВНИХ (БОСС)
    static renderClockworkTitan(skin, armor, glow, weapon) {
        return `
            <!-- Бронзовые поршни и ноги -->
            <rect x="68" y="150" width="26" height="52" rx="4" fill="${armor}" stroke="#090a0f" stroke-width="2"/>
            <rect x="106" y="150" width="26" height="52" rx="4" fill="${armor}" stroke="#090a0f" stroke-width="2"/>
            <!-- Корпус с шестернями и паровым котлом -->
            <rect x="62" y="104" width="76" height="54" rx="6" fill="${skin}" stroke="#090a0f" stroke-width="2.5"/>
            <!-- Шестерни в груди -->
            <circle cx="100" cy="132" r="14" fill="${armor}" stroke="#090a0f" stroke-width="2"/>
            <circle cx="100" cy="132" r="6" fill="${glow}"/>
            <!-- Выхлопная труба с паром за плечом -->
            <rect x="64" y="80" width="12" height="26" fill="${armor}" stroke="#090a0f" stroke-width="1.5"/>
            <ellipse cx="70" cy="74" rx="8" ry="4" fill="#cbd5e1" opacity="0.6"/>
            <!-- Голова титана с линзами-окулярами -->
            <rect x="84" y="82" width="32" height="24" rx="4" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <circle cx="92" cy="94" r="5" fill="${glow}"/>
            <circle cx="92" cy="94" r="2" fill="#ffffff"/>
            <circle cx="108" cy="94" r="5" fill="${glow}"/>
            <circle cx="108" cy="94" r="2" fill="#ffffff"/>
            <!-- Тяжелый механический молот -->
            <line x1="150" y1="90" x2="150" y2="204" stroke="#475569" stroke-width="5"/>
            <rect x="136" y="85" width="28" height="20" rx="3" fill="${armor}" stroke="#090a0f" stroke-width="2"/>
        `;
    }

    // 28. НИДХЁГГ — ДРАКОН БЕЗДНЫ (ФИНАЛЬНЫЙ БОСС)
    static renderDragon(skin, armor, glow, weapon) {
        return `
            <!-- Гигантские перепончатые драконьи крылья -->
            <path d="M100,120 Q50,40 10,65 Q35,115 55,148 Q75,130 100,140 Z" fill="${skin}" stroke="#090a0f" stroke-width="2.5"/>
            <path d="M100,120 Q150,40 190,65 Q165,115 145,148 Q125,130 100,140 Z" fill="${skin}" stroke="#090a0f" stroke-width="2.5"/>
            <!-- Лучи драконьих крыльев -->
            <line x1="100" y1="120" x2="12" y2="68" stroke="#1c1917" stroke-width="3"/>
            <line x1="100" y1="120" x2="188" y2="68" stroke="#1c1917" stroke-width="3"/>
            <!-- Мощный шипастый хвост -->
            <path d="M80,185 Q40,195 24,206 Q50,204 88,195" fill="${skin}" stroke="#090a0f" stroke-width="1.5"/>
            <!-- Чешуйчатое тело дракона -->
            <ellipse cx="100" cy="156" rx="36" ry="32" fill="${armor}" stroke="#090a0f" stroke-width="2.5"/>
            <!-- Бронированная грудь -->
            <path d="M86,140 L114,140 L110,175 L90,175 Z" fill="#ca8a04" opacity="0.8"/>
            <!-- Драконья голова с рогами -->
            <polygon points="86,108 100,68 114,108 122,126 78,126" fill="${skin}" stroke="#090a0f" stroke-width="2.5"/>
            <path d="M88,88 Q65,65 60,45 Q75,65 92,80" fill="#e2e8f0" stroke="#090a0f" stroke-width="1.8"/>
            <path d="M112,88 Q135,65 140,45 Q125,65 108,80" fill="#e2e8f0" stroke="#090a0f" stroke-width="1.8"/>
            <!-- Глаза древнего дракона -->
            <ellipse cx="92" cy="104" rx="4" ry="3" fill="${glow}"/>
            <line x1="92" y1="101" x2="92" y2="107" stroke="#000000" stroke-width="1.5"/>
            <ellipse cx="108" cy="104" rx="4" ry="3" fill="${glow}"/>
            <line x1="108" y1="101" x2="108" y2="107" stroke="#000000" stroke-width="1.5"/>
            <!-- Изрыгаемое первородное пламя -->
            <circle cx="100" cy="128" r="8" fill="${glow}" opacity="0.8" filter="url(#glowFilter)"/>
        `;
    }

    // 29. АВАТАР ПЕРВОРОДНОЙ ТЬМЫ (ФИНАЛЬНЫЙ БОСС)
    static renderVoidAvatar(skin, armor, glow, weapon) {
        return `
            <!-- Внешний горизонт событий и космические вихри -->
            <ellipse cx="100" cy="120" rx="60" ry="70" fill="#050508" stroke="${glow}" stroke-width="2" stroke-dasharray="8,4"/>
            <!-- Черная дыра в центре сущности -->
            <circle cx="100" cy="120" r="32" fill="#000000" stroke="${glow}" stroke-width="3" filter="url(#glowFilter)"/>
            <circle cx="100" cy="120" r="14" fill="${glow}" opacity="0.6"/>
            <circle cx="100" cy="120" r="6" fill="#ffffff"/>
            <!-- Извивающиеся щупальца сингулярности -->
            <path d="M68,120 Q35,160 50,195" stroke="${glow}" stroke-width="4" fill="none" stroke-linecap="round"/>
            <path d="M132,120 Q165,160 150,195" stroke="${glow}" stroke-width="4" fill="none" stroke-linecap="round"/>
            <path d="M100,75 Q80,40 100,25 Q120,40 100,75" fill="${glow}" opacity="0.7"/>
            <!-- Орбитальные руны забвения -->
            <circle cx="70" cy="80" r="4" fill="${glow}"/>
            <circle cx="130" cy="80" r="4" fill="${glow}"/>
            <circle cx="70" cy="160" r="4" fill="${glow}"/>
            <circle cx="130" cy="160" r="4" fill="${glow}"/>
        `;
    }

    // 30. БААЛХОР — АРХИДЕМОН (ФИНАЛЬНЫЙ БОСС)
    static renderArchdemon(skin, armor, glow, weapon) {
        return `
            <!-- Крылья из застывшей лавы и пламени -->
            <path d="M96,120 Q40,50 15,90 Q45,130 65,150 Z" fill="#450a0a" stroke="#090a0f" stroke-width="2.5"/>
            <path d="M104,120 Q160,50 185,90 Q155,130 135,150 Z" fill="#450a0a" stroke="#090a0f" stroke-width="2.5"/>
            <!-- Копыта и мощные ноги демона -->
            <rect x="70" y="154" width="24" height="46" rx="4" fill="${armor}" stroke="#090a0f" stroke-width="2"/>
            <rect x="106" y="154" width="24" height="46" rx="4" fill="${armor}" stroke="#090a0f" stroke-width="2"/>
            <polygon points="68,198 94,198 92,208 66,208" fill="#090a0f"/>
            <polygon points="106,198 132,198 134,208 108,208" fill="#090a0f"/>
            <!-- Багровое мускулистое тело титана -->
            <path d="M60,110 L140,110 L130,160 L70,160 Z" fill="${skin}" stroke="#090a0f" stroke-width="2.5"/>
            <!-- Исполинские бараньи рога ада -->
            <path d="M80,85 Q40,65 46,38 Q66,48 86,75" fill="#1c1917" stroke="#090a0f" stroke-width="2.5"/>
            <path d="M120,85 Q160,65 154,38 Q134,48 114,75" fill="#1c1917" stroke="#090a0f" stroke-width="2.5"/>
            <!-- Демонический лик -->
            <polygon points="82,82 118,82 112,118 88,118" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <!-- Пылающие адские глаза -->
            <circle cx="92" cy="94" r="4.5" fill="${glow}"/>
            <circle cx="108" cy="94" r="4.5" fill="${glow}"/>
            <!-- Пылающий меч правосудия ада -->
            <line x1="152" y1="50" x2="152" y2="204" stroke="${glow}" stroke-width="6"/>
            <line x1="138" y1="95" x2="166" y2="95" stroke="#ca8a04" stroke-width="4"/>
        `;
    }

    // 31. ВЛАДЫКА ВЕЧНОГО БЕЗМОЛВИЯ (ФИНАЛЬНЫЙ БОСС)
    static renderLordOfSilence(skin, armor, glow, weapon) {
        return `
            <!-- Эфирные серебряные одежды -->
            <path d="M66,120 L134,120 L146,206 L54,206 Z" fill="${armor}" stroke="#090a0f" stroke-width="2"/>
            <!-- Ореол застывшего часового механизма -->
            <circle cx="100" cy="85" r="38" stroke="${glow}" stroke-width="2.5" fill="none" stroke-dasharray="6,4"/>
            <!-- Лик в расколотой лунной серебряной маске -->
            <ellipse cx="100" cy="96" rx="18" ry="24" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <line x1="94" y1="78" x2="104" y2="114" stroke="#090a0f" stroke-width="1.8"/>
            <!-- Глаза безмолвия (черные провалы со звездами) -->
            <circle cx="92" cy="96" r="3" fill="#000000"/>
            <circle cx="92" cy="96" r="1" fill="${glow}"/>
            <circle cx="108" cy="96" r="3" fill="#000000"/>
            <circle cx="108" cy="96" r="1" fill="${glow}"/>
            <!-- Знак молчания на устах -->
            <line x1="96" y1="112" x2="104" y2="112" stroke="${glow}" stroke-width="2"/>
            <!-- Серебряная коса Времени -->
            <line x1="146" y1="58" x2="146" y2="206" stroke="#94a3b8" stroke-width="3.5"/>
            <path d="M146,62 Q186,48 184,88 Q162,75 146,82 Z" fill="#e2e8f0" stroke="#090a0f" stroke-width="2"/>
        `;
    }

    // 32. ЗАБЫТЫЙ ПОЛУБОГ ТВОРЕНИЯ (ФИНАЛЬНЫЙ БОСС)
    static renderForgottenDemigod(skin, armor, glow, weapon) {
        return `
            <!-- 6 сияющих серафимских крыльев -->
            <path d="M96,120 Q50,60 20,85 Q45,120 70,135 Z" fill="${glow}" opacity="0.75" stroke="#ca8a04" stroke-width="1.5"/>
            <path d="M104,120 Q150,60 180,85 Q155,120 130,135 Z" fill="${glow}" opacity="0.75" stroke="#ca8a04" stroke-width="1.5"/>
            <path d="M96,135 Q40,110 15,145 Q45,160 75,155 Z" fill="${glow}" opacity="0.65" stroke="#ca8a04" stroke-width="1.5"/>
            <path d="M104,135 Q160,110 185,145 Q155,160 125,155 Z" fill="${glow}" opacity="0.65" stroke="#ca8a04" stroke-width="1.5"/>
            <!-- Золотое богоподобное тело -->
            <path d="M68,115 L132,115 L124,166 L76,166 Z" fill="${skin}" stroke="#78350f" stroke-width="2"/>
            <rect x="76" y="162" width="20" height="44" rx="3" fill="${armor}" stroke="#78350f" stroke-width="1.5"/>
            <rect x="104" y="162" width="20" height="44" rx="3" fill="${armor}" stroke="#78350f" stroke-width="1.5"/>
            <!-- Расколотый божественный венец и сияющий нимб -->
            <circle cx="100" cy="86" r="32" stroke="${glow}" stroke-width="4" fill="none" opacity="0.85" filter="url(#glowFilter)"/>
            <!-- Лик небожителя -->
            <circle cx="100" cy="94" r="18" fill="${skin}" stroke="#78350f" stroke-width="1.8"/>
            <circle cx="93" cy="94" r="3.5" fill="#ffffff"/>
            <circle cx="93" cy="94" r="1.5" fill="${glow}"/>
            <circle cx="107" cy="94" r="3.5" fill="#ffffff"/>
            <circle cx="107" cy="94" r="1.5" fill="${glow}"/>
            <!-- Золотое Копьё Света -->
            <line x1="146" y1="45" x2="146" y2="208" stroke="#ca8a04" stroke-width="4"/>
            <polygon points="146,40 138,62 154,62" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
            <circle cx="146" cy="52" r="8" fill="${glow}" opacity="0.75"/>
        `;
    }

    // =========================================================================
    // ДОПОЛНИТЕЛЬНЫЕ 10 ОБЫЧНЫХ МОБОВ (РЯД 1)
    // =========================================================================

    // 33. ГНОЛЛ-ПАДАЛЬЩИК
    static renderGnoll(skin, armor, glow, weapon) {
        return `
            <!-- Пушистый хвост -->
            <path d="M78,172 Q54,185 48,206 Q62,200 80,182" fill="${skin}" stroke="#1c1917" stroke-width="1"/>
            <!-- Ноги зверя -->
            <rect x="80" y="164" width="14" height="42" rx="3" fill="${armor}" stroke="#1c1917" stroke-width="1.2"/>
            <rect x="106" y="164" width="14" height="42" rx="3" fill="${armor}" stroke="#1c1917" stroke-width="1.2"/>
            <!-- Тело в засаленных кожаных доспехах -->
            <path d="M74,126 L126,126 L122,170 L76,170 Z" fill="${armor}" stroke="#1c1917" stroke-width="1.5"/>
            <circle cx="90" cy="144" r="3" fill="#ca8a04"/>
            <circle cx="110" cy="144" r="3" fill="#ca8a04"/>
            <!-- Гиеноподобная морда с оскалом -->
            <path d="M84,116 L124,116 L138,124 L126,134 L84,132 Z" fill="${skin}" stroke="#1c1917" stroke-width="1.5"/>
            <!-- Закругленные уши гиены -->
            <ellipse cx="86" cy="100" rx="8" ry="12" fill="${skin}" stroke="#1c1917" stroke-width="1.2"/>
            <ellipse cx="114" cy="100" rx="8" ry="12" fill="${skin}" stroke="#1c1917" stroke-width="1.2"/>
            <!-- Черный нос и острые зубы -->
            <circle cx="138" cy="124" r="3" fill="#000000"/>
            <polygon points="120,132 124,126 128,132" fill="#fff"/>
            <polygon points="112,132 116,126 120,132" fill="#fff"/>
            <!-- Глаза полные жадности -->
            <circle cx="106" cy="114" r="3.5" fill="${glow}"/>
            <!-- Тесак в лапе -->
            <line x1="140" y1="130" x2="152" y2="188" stroke="#78350f" stroke-width="3"/>
            <polygon points="146,124 164,128 152,154 142,148" fill="#94a3b8" stroke="#334155" stroke-width="1"/>
        `;
    }

    // 34. ОГНЕННЫЙ БЕС (ИМП)
    static renderImp(skin, armor, glow, weapon) {
        return `
            <!-- Маленькие кожистые крылышки -->
            <path d="M96,140 Q60,110 50,126 Q70,146 94,152 Z" fill="${skin}" stroke="#090a0f" stroke-width="1.2"/>
            <path d="M104,140 Q140,110 150,126 Q130,146 106,152 Z" fill="${skin}" stroke="#090a0f" stroke-width="1.2"/>
            <!-- Тонкий хвост с наконечником-стрелкой -->
            <path d="M90,172 Q64,178 68,198 Q80,188 92,180" stroke="${skin}" stroke-width="2.5" fill="none"/>
            <polygon points="62,198 72,194 68,206" fill="${skin}"/>
            <!-- Ножки с копытцами -->
            <rect x="86" y="170" width="10" height="34" rx="2" fill="${skin}" stroke="#090a0f" stroke-width="1"/>
            <rect x="104" y="170" width="10" height="34" rx="2" fill="${skin}" stroke="#090a0f" stroke-width="1"/>
            <rect x="84" y="202" width="12" height="4" fill="#090a0f"/>
            <rect x="104" y="202" width="12" height="4" fill="#090a0f"/>
            <!-- Тельце беса -->
            <ellipse cx="100" cy="154" rx="18" ry="22" fill="${skin}" stroke="#090a0f" stroke-width="1.2"/>
            <!-- Голова с рожками -->
            <circle cx="100" cy="122" r="16" fill="${skin}" stroke="#090a0f" stroke-width="1.2"/>
            <polygon points="90,114 82,96 95,110" fill="#1c1917"/>
            <polygon points="110,114 118,96 105,110" fill="#1c1917"/>
            <!-- Желтые горящие глаза и широкая ухмылка -->
            <circle cx="94" cy="120" r="3.5" fill="#facc15"/>
            <circle cx="94" cy="120" r="1.5" fill="#000"/>
            <circle cx="106" cy="120" r="3.5" fill="#facc15"/>
            <circle cx="106" cy="120" r="1.5" fill="#000"/>
            <path d="M92,130 Q100,138 108,130" stroke="#000" stroke-width="1.5" fill="none"/>
            <!-- Вилы в руке -->
            <line x1="134" y1="110" x2="134" y2="204" stroke="#78350f" stroke-width="2.5"/>
            <path d="M128,112 L128,100 M134,112 L134,96 M140,112 L140,100" stroke="#94a3b8" stroke-width="2"/>
        `;
    }

    // 35. СЛЕПОЙ ТРОГЛОДИТ
    static renderTroglodyte(skin, armor, glow, weapon) {
        return `
            <!-- Сутулые ноги -->
            <rect x="80" y="162" width="16" height="44" rx="3" fill="${skin}" stroke="#1f2937" stroke-width="1.2"/>
            <rect x="104" y="162" width="16" height="44" rx="3" fill="${skin}" stroke="#1f2937" stroke-width="1.2"/>
            <!-- Тощее жилистое туловище -->
            <path d="M76,122 L124,122 L118,168 L80,168 Z" fill="${skin}" stroke="#1f2937" stroke-width="1.5"/>
            <line x1="84" y1="134" x2="114" y2="134" stroke="#475569" stroke-width="2"/>
            <line x1="86" y1="144" x2="112" y2="144" stroke="#475569" stroke-width="2"/>
            <!-- Длинные узловатые руки -->
            <path d="M74,126 L60,174 L68,176 L78,136 Z" fill="${skin}" stroke="#1f2937" stroke-width="1"/>
            <path d="M124,126 L138,174 L130,176 L120,136 Z" fill="${skin}" stroke="#1f2937" stroke-width="1"/>
            <!-- Безглазая гладкая голова -->
            <ellipse cx="100" cy="106" rx="18" ry="22" fill="${skin}" stroke="#1f2937" stroke-width="1.5"/>
            <!-- Ушные гребни / локаторы -->
            <polygon points="80,102 72,94 82,108" fill="${armor}"/>
            <polygon points="120,102 128,94 118,108" fill="${armor}"/>
            <!-- Двойные носовые щели -->
            <ellipse cx="96" cy="112" rx="2" ry="3" fill="#1e293b"/>
            <ellipse cx="104" cy="112" rx="2" ry="3" fill="#1e293b"/>
            <!-- Каменная булава -->
            <line x1="140" y1="140" x2="152" y2="198" stroke="#451a03" stroke-width="3"/>
            <circle cx="154" cy="198" r="10" fill="${armor}" stroke="#1e293b" stroke-width="1.5"/>
        `;
    }

    // 36. МИКОНИД-СПОРОВИК
    static renderMyconid(skin, armor, glow, weapon) {
        return `
            <!-- Ножка гриба (тело) -->
            <path d="M84,140 L116,140 L122,206 L78,206 Z" fill="#e2e8f0" stroke="#334155" stroke-width="1.5"/>
            <line x1="94" y1="148" x2="92" y2="200" stroke="#cbd5e1" stroke-width="2"/>
            <line x1="106" y1="148" x2="108" y2="200" stroke="#cbd5e1" stroke-width="2"/>
            <!-- Ручки-отростки -->
            <ellipse cx="72" cy="160" rx="9" ry="16" fill="#e2e8f0" stroke="#334155" stroke-width="1"/>
            <ellipse cx="128" cy="160" rx="9" ry="16" fill="#e2e8f0" stroke="#334155" stroke-width="1"/>
            <!-- Огромная светящаяся грибная шляпка -->
            <path d="M52,140 C46,80 154,80 148,140 Z" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <!-- Светящиеся пятна-споры на шляпке -->
            <circle cx="76" cy="112" r="7" fill="${glow}" opacity="0.8"/>
            <circle cx="100" cy="98" r="8" fill="${glow}" opacity="0.85"/>
            <circle cx="124" cy="114" r="6" fill="${glow}" opacity="0.8"/>
            <circle cx="94" cy="126" r="5" fill="${glow}" opacity="0.75"/>
            <!-- Глазки-споры на ножке -->
            <circle cx="92" cy="154" r="3" fill="${glow}"/>
            <circle cx="108" cy="154" r="3" fill="${glow}"/>
            <!-- Облачко пыльцы вокруг -->
            <circle cx="62" cy="120" r="3" fill="${glow}" opacity="0.7"/>
            <circle cx="138" cy="100" r="3" fill="${glow}" opacity="0.7"/>
            <circle cx="100" cy="74" r="3" fill="${glow}" opacity="0.7"/>
        `;
    }

    // 37. БЕЗУМНЫЙ РУДОКОП
    static renderCursedMiner(skin, armor, glow, weapon) {
        return `
            <!-- Коренастые ноги в сапогах -->
            <rect x="80" y="168" width="18" height="38" rx="3" fill="#292524" stroke="#0c0a09" stroke-width="1.5"/>
            <rect x="102" y="168" width="18" height="38" rx="3" fill="#292524" stroke="#0c0a09" stroke-width="1.5"/>
            <!-- Крепкий торс в кольчуге -->
            <rect x="74" y="132" width="52" height="42" rx="4" fill="${armor}" stroke="#0c0a09" stroke-width="1.8"/>
            <!-- Пышная борода гнома -->
            <path d="M82,126 L118,126 L114,164 L100,172 L86,164 Z" fill="#78350f" stroke="#451a03" stroke-width="1.2"/>
            <!-- Горняцкий шлем с рогами -->
            <path d="M80,108 C80,88 120,88 120,108 L122,118 L78,118 Z" fill="#475569" stroke="#1e293b" stroke-width="1.5"/>
            <!-- Безумные горящие глаза сквозь бороду -->
            <circle cx="92" cy="116" r="4" fill="${glow}"/>
            <circle cx="108" cy="116" r="4" fill="${glow}"/>
            <!-- Тяжелая рудная кирка -->
            <line x1="140" y1="120" x2="148" y2="195" stroke="#78350f" stroke-width="4"/>
            <path d="M130,122 Q144,114 162,126 L156,134 L142,128 Z" fill="#94a3b8" stroke="#334155" stroke-width="1"/>
            <!-- Фонарь на поясе -->
            <rect x="68" y="152" width="10" height="14" rx="2" fill="#ca8a04"/>
            <circle cx="73" cy="159" r="3" fill="#fef08a"/>
        `;
    }

    // 38. ОСКОЛОЧНЫЙ ЭЛЕМЕНТАЛЬ
    static renderEarthElemental(skin, armor, glow, weapon) {
        return `
            <!-- Ноги из булыжников -->
            <polygon points="76,172 94,168 98,206 72,206" fill="${skin}" stroke="#090a0f" stroke-width="1.5"/>
            <polygon points="104,168 124,172 128,206 102,206" fill="${skin}" stroke="#090a0f" stroke-width="1.5"/>
            <!-- Торс из скальных пластов -->
            <polygon points="66,118 134,114 126,172 74,170" fill="${armor}" stroke="#090a0f" stroke-width="2"/>
            <!-- Светящаяся расщелина в груди -->
            <path d="M100,124 L94,142 L106,148 L98,162" stroke="${glow}" stroke-width="3" fill="none"/>
            <!-- Каменная голова с высеченными глазами -->
            <polygon points="84,94 116,92 112,116 86,118" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <rect x="90" y="104" width="6" height="3" fill="${glow}"/>
            <rect x="104" y="104" width="6" height="3" fill="${glow}"/>
            <!-- Парящие осколки вокруг -->
            <polygon points="54,136 62,130 60,144" fill="${skin}" stroke="#090a0f"/>
            <polygon points="144,130 152,136 142,142" fill="${skin}" stroke="#090a0f"/>
        `;
    }

    // 39. ХРУСТАЛЬНЫЙ СКАРАБЕЙ
    static renderCrystalScarab(skin, armor, glow, weapon) {
        return `
            <!-- 6 лапок жука -->
            <path d="M78,160 L50,150 L42,176" stroke="#090a0f" stroke-width="3" fill="none"/>
            <path d="M78,172 L48,176 L40,204" stroke="#090a0f" stroke-width="3" fill="none"/>
            <path d="M82,184 L56,198 L50,208" stroke="#090a0f" stroke-width="2.5" fill="none"/>

            <path d="M122,160 L150,150 L158,176" stroke="#090a0f" stroke-width="3" fill="none"/>
            <path d="M122,172 L152,176 L160,204" stroke="#090a0f" stroke-width="3" fill="none"/>
            <path d="M118,184 L144,198 L150,208" stroke="#090a0f" stroke-width="2.5" fill="none"/>

            <!-- Граненый кристаллический панцирь -->
            <path d="M72,145 Q100,120 128,145 L124,195 Q100,205 76,195 Z" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <line x1="100" y1="128" x2="100" y2="202" stroke="#090a0f" stroke-width="1.8"/>
            <line x1="74" y1="160" x2="126" y2="160" stroke="${glow}" stroke-width="1.2"/>
            <!-- Головогрудь и рог скарабея -->
            <ellipse cx="100" cy="132" rx="16" ry="12" fill="${armor}" stroke="#090a0f" stroke-width="1.5"/>
            <polygon points="96,124 100,102 104,124" fill="${glow}" stroke="#090a0f" stroke-width="1.2"/>
            <!-- Глаза -->
            <circle cx="92" cy="130" r="2.5" fill="${glow}"/>
            <circle cx="108" cy="130" r="2.5" fill="${glow}"/>
        `;
    }

    // 40. БУЙНЫЙ ПОЛТЕРГЕЙСТ
    static renderPoltergeist(skin, armor, glow, weapon) {
        return `
            <!-- Закручивающийся призрачный хвост -->
            <path d="M90,130 Q60,165 75,200 Q95,175 100,206 Q115,175 125,200 Q140,165 110,130 Z" fill="${skin}" opacity="0.6" stroke="${glow}" stroke-width="1.5"/>
            <!-- Парящий череп духа -->
            <circle cx="100" cy="108" r="18" fill="${skin}" opacity="0.85" stroke="${glow}" stroke-width="1.5"/>
            <ellipse cx="94" cy="106" rx="4" ry="5" fill="#000"/>
            <circle cx="94" cy="106" r="2" fill="${glow}"/>
            <ellipse cx="106" cy="106" rx="4" ry="5" fill="#000"/>
            <circle cx="106" cy="106" r="2" fill="${glow}"/>
            <!-- Парящие в воздухе предметы телекинеза -->
            <rect x="52" y="110" width="12" height="10" rx="2" fill="#64748b" stroke="#334155" transform="rotate(15 58 115)"/>
            <polygon points="140,110 148,98 152,112" fill="#78350f" stroke="#451a03"/>
            <path d="M60,170 Q48,155 64,145" stroke="#94a3b8" stroke-width="2" fill="none"/>
            <circle cx="145" cy="160" r="6" fill="#e2e8f0" stroke="#475569" stroke-width="1"/>
        `;
    }

    // 41. ВАСИЛИСК-ДЕТЁНЫШ
    static renderYoungBasilisk(skin, armor, glow, weapon) {
        return `
            <!-- 8 маленьких ящеричных лапок -->
            <line x1="76" y1="168" x2="52" y2="182" stroke="${skin}" stroke-width="3"/>
            <line x1="80" y1="174" x2="54" y2="194" stroke="${skin}" stroke-width="3"/>
            <line x1="82" y1="180" x2="58" y2="204" stroke="${skin}" stroke-width="3"/>
            <line x1="84" y1="186" x2="68" y2="208" stroke="${skin}" stroke-width="3"/>

            <line x1="124" y1="168" x2="148" y2="182" stroke="${skin}" stroke-width="3"/>
            <line x1="120" y1="174" x2="146" y2="194" stroke="${skin}" stroke-width="3"/>
            <line x1="118" y1="180" x2="142" y2="204" stroke="${skin}" stroke-width="3"/>
            <line x1="116" y1="186" x2="132" y2="208" stroke="${skin}" stroke-width="3"/>

            <!-- Вытянутое чешуйчатое тело -->
            <ellipse cx="100" cy="174" rx="30" ry="18" fill="${skin}" stroke="#090a0f" stroke-width="1.8"/>
            <!-- Каменный гребень по хребту -->
            <polygon points="86,162 90,150 94,162" fill="${armor}"/>
            <polygon points="98,160 102,146 106,160" fill="${armor}"/>
            <polygon points="110,162 114,152 118,162" fill="${armor}"/>
            <!-- Голова ящерицы с роговым щитком -->
            <ellipse cx="100" cy="142" rx="16" ry="14" fill="${skin}" stroke="#090a0f" stroke-width="1.5"/>
            <!-- Большие окаменяющие желтые глаза -->
            <ellipse cx="92" cy="140" rx="4.5" ry="5.5" fill="${glow}"/>
            <line x1="92" y1="135" x2="92" y2="145" stroke="#000" stroke-width="1.5"/>
            <ellipse cx="108" cy="140" rx="4.5" ry="5.5" fill="${glow}"/>
            <line x1="108" y1="135" x2="108" y2="145" stroke="#000" stroke-width="1.5"/>
        `;
    }

    // 42. ПОДЗЕМНАЯ НАГА
    static renderWaterNaga(skin, armor, glow, weapon) {
        return `
            <!-- Свернутый змеиный хвост на полу -->
            <path d="M70,195 Q100,215 130,195 Q145,178 126,165 L74,165 Q55,178 70,195 Z" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <path d="M80,190 Q100,202 120,190" stroke="${armor}" stroke-width="4" fill="none"/>
            <!-- Человекоподобный торс -->
            <path d="M82,125 L118,125 L124,166 L76,166 Z" fill="${skin}" stroke="#090a0f" stroke-width="1.5"/>
            <!-- Лиф/кираса из ракушек -->
            <path d="M80,135 L120,135 L115,152 L85,152 Z" fill="${armor}"/>
            <!-- Голова с плавниковыми ушами -->
            <ellipse cx="100" cy="106" rx="16" ry="18" fill="${skin}" stroke="#090a0f" stroke-width="1.5"/>
            <polygon points="84,104 70,96 82,112" fill="${armor}"/>
            <polygon points="116,104 130,96 118,112" fill="${armor}"/>
            <!-- Змеиные глаза -->
            <circle cx="94" cy="104" r="3.5" fill="${glow}"/>
            <circle cx="106" cy="104" r="3.5" fill="${glow}"/>
            <!-- Ржавый трезубец -->
            <line x1="140" y1="80" x2="140" y2="204" stroke="#78350f" stroke-width="3"/>
            <path d="M132,86 L132,70 M140,86 L140,64 M148,86 L148,70" stroke="#94a3b8" stroke-width="2"/>
        `;
    }

    // =========================================================================
    // ДОПОЛНИТЕЛЬНЫЕ 10 ЭЛИТНЫХ МОБОВ (РЯД 2)
    // =========================================================================

    // 43. ОГР-ЛЮДОЕД
    static renderOgre(skin, armor, glow, weapon) {
        return `
            <!-- Толстые ноги-бревна -->
            <rect x="68" y="160" width="28" height="46" rx="4" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <rect x="104" y="160" width="28" height="46" rx="4" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <!-- Огромное пузо с поясом из шкур -->
            <ellipse cx="100" cy="148" rx="44" ry="34" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <path d="M60,165 Q100,182 140,165 L136,180 L64,180 Z" fill="${armor}" stroke="#090a0f" stroke-width="1.5"/>
            <!-- Массивная голова людоеда -->
            <circle cx="100" cy="104" r="24" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <!-- Единственный крупный циклопический глаз (или свирепые глаза) -->
            <circle cx="100" cy="98" r="8" fill="#ffffff" stroke="#090a0f" stroke-width="1.5"/>
            <circle cx="100" cy="98" r="4" fill="${glow}"/>
            <circle cx="100" cy="98" r="1.5" fill="#000000"/>
            <!-- Нижний торчащий клык -->
            <polygon points="94,118 97,108 100,118" fill="#fef08a"/>
            <!-- Огромный ствол с шипами -->
            <polygon points="144,70 162,60 156,204 140,200" fill="#451a03" stroke="#090a0f" stroke-width="2"/>
            <polygon points="160,84 172,80 162,90" fill="#94a3b8"/>
            <polygon points="158,120 170,116 158,126" fill="#94a3b8"/>
        `;
    }

    // 44. ГЛУБИННАЯ ВИВЕРНА
    static renderWyvern(skin, armor, glow, weapon) {
        return `
            <!-- Крылья с когтями на локтях -->
            <path d="M96,140 Q40,80 15,110 Q50,140 70,158 Z" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <path d="M104,140 Q160,80 185,110 Q150,140 130,158 Z" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <!-- Длинный змеиный хвост со скорпионьим жалом -->
            <path d="M90,175 Q60,195 52,165 Q45,135 62,118" stroke="${skin}" stroke-width="7" fill="none" stroke-linecap="round"/>
            <polygon points="62,118 68,104 74,120" fill="${glow}" stroke="#090a0f" stroke-width="1.5"/>
            <!-- Лапы с хищными когтями -->
            <rect x="82" y="174" width="14" height="32" rx="3" fill="${armor}" stroke="#090a0f" stroke-width="1.5"/>
            <rect x="104" y="174" width="14" height="32" rx="3" fill="${armor}" stroke="#090a0f" stroke-width="1.5"/>
            <!-- Тело ящера -->
            <ellipse cx="100" cy="154" rx="26" ry="24" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <!-- Длинная шея и драконья пасть -->
            <path d="M96,140 L100,105 L124,108 L114,124 L104,140 Z" fill="${skin}" stroke="#090a0f" stroke-width="1.5"/>
            <circle cx="112" cy="108" r="3" fill="${glow}"/>
        `;
    }

    // 45. ОГНЕННАЯ САЛАМАНДРА
    static renderSalamander(skin, armor, glow, weapon) {
        return `
            <!-- 4 растопыренные лапы -->
            <path d="M76,160 L48,150 L40,175" stroke="${armor}" stroke-width="5" fill="none"/>
            <path d="M80,180 L48,185 L42,206" stroke="${armor}" stroke-width="5" fill="none"/>
            <path d="M124,160 L152,150 L160,175" stroke="${armor}" stroke-width="5" fill="none"/>
            <path d="M120,180 L152,185 L158,206" stroke="${armor}" stroke-width="5" fill="none"/>
            <!-- Пылающий хвост сзади -->
            <path d="M100,185 Q110,215 90,225" stroke="${glow}" stroke-width="6" fill="none"/>
            <!-- Чешуйчатое горящее брюшко -->
            <ellipse cx="100" cy="170" rx="30" ry="22" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <!-- Огненные шипы на хребте -->
            <polygon points="94,152 97,140 100,152" fill="${glow}"/>
            <polygon points="102,150 105,138 108,150" fill="${glow}"/>
            <!-- Широкая голова рептилии -->
            <ellipse cx="100" cy="142" rx="18" ry="14" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <!-- Глаза с раскаленной лавой -->
            <circle cx="92" cy="138" r="4" fill="${glow}"/>
            <circle cx="108" cy="138" r="4" fill="${glow}"/>
        `;
    }

    // 46. ТЕНЕВОЙ АССАСИН
    static renderShadowAssassin(skin, armor, glow, weapon) {
        return `
            <!-- Теневой плащ и легкие поножи -->
            <path d="M72,126 L128,126 L138,204 L62,204 Z" fill="${armor}" stroke="#090a0f" stroke-width="1.8"/>
            <!-- Плотные черные обмотки -->
            <rect x="80" y="164" width="16" height="42" fill="#0f172a"/>
            <rect x="104" y="164" width="16" height="42" fill="#0f172a"/>
            <!-- Глубокий капюшон с полумаской -->
            <path d="M76,114 C76,86 124,86 124,114 L118,128 L82,128 Z" fill="#0f172a" stroke="#090a0f" stroke-width="1.8"/>
            <ellipse cx="100" cy="110" rx="12" ry="8" fill="#020617"/>
            <!-- Холодный смертоносный взгляд -->
            <circle cx="94" cy="110" r="2.5" fill="${glow}"/>
            <circle cx="106" cy="110" r="2.5" fill="${glow}"/>
            <!-- Два ядовитых катара/клинка в руках -->
            <line x1="56" y1="130" x2="52" y2="185" stroke="${glow}" stroke-width="3"/>
            <line x1="144" y1="130" x2="148" y2="185" stroke="${glow}" stroke-width="3"/>
            <circle cx="52" cy="185" r="4" fill="${glow}" opacity="0.6"/>
            <circle cx="148" cy="185" r="4" fill="${glow}" opacity="0.6"/>
        `;
    }

    // 47. КОСТЯНОЙ ГОЛЕМ
    static renderBoneGolem(skin, armor, glow, weapon) {
        return `
            <!-- Ноги из спрессованных костей -->
            <rect x="70" y="156" width="24" height="50" rx="4" fill="${skin}" stroke="#334155" stroke-width="1.8"/>
            <rect x="106" y="156" width="24" height="50" rx="4" fill="${skin}" stroke="#334155" stroke-width="1.8"/>
            <!-- Грудная клетка-клетка с черепами внутри -->
            <path d="M60,110 L140,110 L132,160 L68,160 Z" fill="${armor}" stroke="#090a0f" stroke-width="2"/>
            <circle cx="100" cy="135" r="10" fill="#f8fafc" stroke="#334155" stroke-width="1.2"/>
            <circle cx="97" cy="134" r="1.5" fill="${glow}"/>
            <circle cx="103" cy="134" r="1.5" fill="${glow}"/>
            <!-- Голова из гигантского рогатого черепа -->
            <path d="M82,96 C82,72 118,72 118,96 L114,112 L86,112 Z" fill="${skin}" stroke="#334155" stroke-width="2"/>
            <circle cx="93" cy="94" r="3.5" fill="${glow}"/>
            <circle cx="107" cy="94" r="3.5" fill="${glow}"/>
            <!-- Руки-костяные косы -->
            <path d="M58,118 L40,155 L44,195" stroke="${skin}" stroke-width="6" fill="none"/>
            <path d="M142,118 L160,155 L156,195" stroke="${skin}" stroke-width="6" fill="none"/>
        `;
    }

    // 48. ХИМЕРА КАТАКОМБ
    static renderCryptChimera(skin, armor, glow, weapon) {
        return `
            <!-- Мощное львиное тело -->
            <ellipse cx="100" cy="164" rx="36" ry="24" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <!-- Задние и передние лапы с когтями -->
            <rect x="74" y="172" width="16" height="34" rx="3" fill="${skin}" stroke="#090a0f" stroke-width="1.5"/>
            <rect x="110" y="172" width="16" height="34" rx="3" fill="${skin}" stroke="#090a0f" stroke-width="1.5"/>
            <!-- Хвост-ядовитая змея -->
            <path d="M68,165 Q40,160 38,130 Q54,120 50,105" stroke="#15803d" stroke-width="5" fill="none"/>
            <ellipse cx="50" cy="105" rx="5" ry="4" fill="#15803d"/>
            <!-- Львиная голова с густой гривой -->
            <circle cx="118" cy="130" r="18" fill="${armor}" stroke="#090a0f" stroke-width="1.5"/>
            <circle cx="118" cy="130" r="12" fill="${skin}"/>
            <circle cx="122" cy="128" r="2.5" fill="${glow}"/>
            <!-- Вторая голова — рогатый козёл на загривке -->
            <circle cx="90" cy="120" r="12" fill="#78350f" stroke="#090a0f" stroke-width="1.2"/>
            <path d="M84,112 Q72,96 76,86" stroke="#e2e8f0" stroke-width="2.5" fill="none"/>
            <circle cx="86" cy="120" r="2" fill="${glow}"/>
        `;
    }

    // 49. ПОЖИРАТЕЛЬ ИНТЕЛЛЕКТА
    static renderIntellectDevourer(skin, armor, glow, weapon) {
        return `
            <!-- 4 когтистые птичьи лапы под мозгом -->
            <path d="M80,165 L60,185 L54,206" stroke="#090a0f" stroke-width="3.5" fill="none"/>
            <path d="M90,172 L78,195 L72,208" stroke="#090a0f" stroke-width="3" fill="none"/>
            <path d="M110,172 L122,195 L128,208" stroke="#090a0f" stroke-width="3" fill="none"/>
            <path d="M120,165 L140,185 L146,206" stroke="#090a0f" stroke-width="3.5" fill="none"/>
            <!-- Пульсирующее тело в виде двух полушарий мозга -->
            <ellipse cx="100" cy="142" rx="34" ry="26" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <line x1="100" y1="118" x2="100" y2="168" stroke="#701a75" stroke-width="2"/>
            <!-- Извилины мозга -->
            <path d="M80,130 Q92,125 86,140 Q94,155 84,160" stroke="#701a75" stroke-width="2" fill="none"/>
            <path d="M120,130 Q108,125 114,140 Q106,155 116,160" stroke="#701a75" stroke-width="2" fill="none"/>
            <!-- Псионические искры вокруг -->
            <circle cx="68" cy="125" r="3" fill="${glow}"/>
            <circle cx="132" cy="125" r="3" fill="${glow}"/>
            <circle cx="100" cy="100" r="4" fill="${glow}"/>
        `;
    }

    // 50. ПЕЩЕРНЫЙ БЕГЕМОТ
    static renderDungeonBehemoth(skin, armor, glow, weapon) {
        return `
            <!-- Массивные короткие колоннообразные ноги -->
            <rect x="66" y="162" width="26" height="44" rx="4" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <rect x="108" y="162" width="26" height="44" rx="4" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <!-- Огромный бронированный панцирный хребет -->
            <ellipse cx="100" cy="148" rx="42" ry="28" fill="${armor}" stroke="#090a0f" stroke-width="2.5"/>
            <!-- Шипастый щиток на спине -->
            <polygon points="80,126 86,112 92,126" fill="#cbd5e1" stroke="#090a0f"/>
            <polygon points="108,126 114,112 120,126" fill="#cbd5e1" stroke="#090a0f"/>
            <!-- Голова с 4 изогнутыми вперед рогами -->
            <polygon points="85,124 115,124 110,154 90,154" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <path d="M82,128 Q62,118 66,98" stroke="#e2e8f0" stroke-width="3.5" fill="none"/>
            <path d="M88,124 Q72,108 78,90" stroke="#e2e8f0" stroke-width="3.5" fill="none"/>
            <path d="M118,128 Q138,118 134,98" stroke="#e2e8f0" stroke-width="3.5" fill="none"/>
            <path d="M112,124 Q128,108 122,90" stroke="#e2e8f0" stroke-width="3.5" fill="none"/>
            <circle cx="94" cy="134" r="3" fill="${glow}"/>
            <circle cx="106" cy="134" r="3" fill="${glow}"/>
        `;
    }

    // 51. КРОВАВАЯ СУККУБА
    static renderSuccubus(skin, armor, glow, weapon) {
        return `
            <!-- Демонические крылья -->
            <path d="M96,134 Q54,80 28,110 Q58,140 76,155 Z" fill="#4c0519" stroke="#090a0f" stroke-width="1.8"/>
            <path d="M104,134 Q146,80 172,110 Q142,140 124,155 Z" fill="#4c0519" stroke="#090a0f" stroke-width="1.8"/>
            <!-- Тонкий стреловидный хвост -->
            <path d="M90,175 Q65,185 70,206" stroke="${skin}" stroke-width="2.5" fill="none"/>
            <polygon points="65,206 75,202 72,212" fill="${glow}"/>
            <!-- Стройные ножки в кожаных чулках -->
            <rect x="84" y="160" width="12" height="46" rx="2" fill="#1c1917" stroke="#090a0f" stroke-width="1.2"/>
            <rect x="104" y="160" width="12" height="46" rx="2" fill="#1c1917" stroke="#090a0f" stroke-width="1.2"/>
            <!-- Изящный корсет -->
            <path d="M80,124 L120,124 L114,164 L86,164 Z" fill="${armor}" stroke="#090a0f" stroke-width="1.5"/>
            <!-- Соблазнительный лик с рожками -->
            <circle cx="100" cy="102" r="16" fill="${skin}" stroke="#090a0f" stroke-width="1.2"/>
            <path d="M88,94 Q76,82 82,72" stroke="#1c1917" stroke-width="2.5" fill="none"/>
            <path d="M112,94 Q124,82 118,72" stroke="#1c1917" stroke-width="2.5" fill="none"/>
            <!-- Горящие рубиновые глаза -->
            <circle cx="94" cy="100" r="2.5" fill="${glow}"/>
            <circle cx="106" cy="100" r="2.5" fill="${glow}"/>
            <!-- Огненный хлыст в руке -->
            <path d="M126,140 Q155,145 152,185 Q164,195 150,208" stroke="${glow}" stroke-width="3" fill="none"/>
        `;
    }

    // 52. КЕНТАВР-ОСКВЕРНИТЕЛЬ
    static renderChaosCentaur(skin, armor, glow, weapon) {
        return `
            <!-- Крупное тело коня на 4 ногах -->
            <ellipse cx="96" cy="168" rx="42" ry="24" fill="${skin}" stroke="#090a0f" stroke-width="2"/>
            <rect x="62" y="176" width="12" height="32" rx="2" fill="${skin}" stroke="#090a0f" stroke-width="1.5"/>
            <rect x="80" y="176" width="12" height="32" rx="2" fill="${skin}" stroke="#090a0f" stroke-width="1.5"/>
            <rect x="110" y="176" width="12" height="32" rx="2" fill="${skin}" stroke="#090a0f" stroke-width="1.5"/>
            <rect x="128" y="176" width="12" height="32" rx="2" fill="${skin}" stroke="#090a0f" stroke-width="1.5"/>
            <!-- Торс воина поверх конского тела -->
            <path d="M82,110 L122,110 L118,155 L86,155 Z" fill="${armor}" stroke="#090a0f" stroke-width="2"/>
            <!-- Голова воина в шлеме -->
            <circle cx="102" cy="94" r="16" fill="${skin}" stroke="#090a0f" stroke-width="1.8"/>
            <path d="M90,88 L114,88 L108,76 L96,76 Z" fill="#475569" stroke="#090a0f" stroke-width="1.2"/>
            <!-- Глаза -->
            <circle cx="98" cy="94" r="3" fill="${glow}"/>
            <circle cx="108" cy="94" r="3" fill="${glow}"/>
            <!-- Тяжелая глефа в руках -->
            <line x1="140" y1="60" x2="140" y2="204" stroke="#78350f" stroke-width="4"/>
            <path d="M140,62 Q168,50 164,84 L140,80 Z" fill="#94a3b8" stroke="#334155" stroke-width="1.5"/>
        `;
    }
}


