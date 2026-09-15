import { EquipmentVisuals } from './equipmentVisuals.js';

export class CharacterRenderer {
    static render(visuals, classId, equipment = null) {
        const isFemale = visuals.gender === 'female';

        return `
            <svg viewBox="0 0 240 320" width="100%" height="100%">
                <defs>
                    <radialGradient id="pedestalGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#4d3f2c" stop-opacity="0.9"/>
                        <stop offset="100%" stop-color="#12131a" stop-opacity="0"/>
                    </radialGradient>

                    <filter id="hero-unified-outline" x="-15%" y="-15%" width="130%" height="130%">
                        <feMorphology in="SourceAlpha" result="dilated" operator="dilate" radius="1.3"/>
                        <feFlood flood-color="#0e0d14" result="outlineColor"/>
                        <feComposite in="outlineColor" in2="dilated" operator="in" result="outline"/>
                        <feMerge>
                            <feMergeNode in="outline"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                ${this.renderShadow()}

                <g filter="url(#hero-unified-outline)">
                    ${this.renderHairBack(visuals, isFemale)}
                    ${this.renderQuiver(classId, equipment)}
                    ${this.renderPants(visuals, classId, isFemale, equipment)}
                    ${this.renderBoots(visuals, classId, isFemale, equipment)}
                    ${this.renderNeck(visuals)}
                    ${this.renderTorso(visuals, classId, isFemale, equipment)}
                    ${this.renderLeftArm(visuals, classId, isFemale, equipment)}
                    ${this.renderRightArm(visuals, classId, isFemale, equipment)}
                    ${this.renderHead(visuals, isFemale)}
                    ${this.renderFaceFeatures(visuals, isFemale)}
                    ${this.renderAccessories(visuals, isFemale)}
                    ${this.renderHairFront(visuals, isFemale)}
                    ${this.renderHelmet(equipment)}
                </g>
            </svg>
        `;
    }

    static renderBust(visuals, classId, equipment = null) {
        const isFemale = visuals.gender === 'female';

        return `
            <svg viewBox="88 12 64 90" width="100%" height="100%">
                <defs>
                    <radialGradient id="bustBg" cx="50%" cy="40%" r="60%">
                        <stop offset="0%" stop-color="#2a2723"/>
                        <stop offset="100%" stop-color="#101116"/>
                    </radialGradient>
                </defs>
                <rect x="88" y="12" width="64" height="90" fill="url(#bustBg)"/>
                ${this.renderHairBack(visuals, isFemale)}
                ${this.renderNeck(visuals)}
                ${this.renderTorso(visuals, classId, isFemale, equipment)}
                ${this.renderHead(visuals, isFemale)}
                ${this.renderFaceFeatures(visuals, isFemale)}
                ${this.renderAccessories(visuals, isFemale)}
                ${this.renderHairFront(visuals, isFemale)}
                ${this.renderHelmet(equipment)}
            </svg>
        `;
    }

    static renderShadow() {
        return `
            <ellipse cx="120" cy="272" rx="54" ry="10" fill="url(#pedestalGlow)"/>
            <ellipse cx="120" cy="272" rx="38" ry="6" fill="#09090e" opacity="0.9"/>
        `;
    }

    static renderQuiver(classId, equipment = null) {
        if (classId === 'ranger') {
            if (equipment && !equipment.mainHand) return '';
            return `
                <g transform="translate(138, 76)">
                    <rect x="0" y="10" width="10" height="54" rx="2" fill="#3a2515" stroke="#1c1109" stroke-width="1"/>
                    <line x1="3" y1="-2" x2="3" y2="10" stroke="#95a5a6" stroke-width="2"/>
                    <polygon points="1,-2 5,-2 3,-7" fill="#8c2323"/>
                    <line x1="7" y1="2" x2="7" y2="10" stroke="#95a5a6" stroke-width="2"/>
                    <polygon points="5,2 9,2 7,-3" fill="#8c2323"/>
                </g>
            `;
        }
        return '';
    }

    static renderPants(visuals, classId, isFemale, equipment = null) {
        const leftX = isFemale ? 105 : 102;
        const rightX = isFemale ? 121 : 122;
        const legW = isFemale ? 14 : 16;

        // Если штаны сняты в инвентаре: нижнее льняное белье + голые ноги
        if (equipment && !equipment.legs) {
            return `
                <g id="char-pants-bare">
                    <!-- Голые ноги -->
                    <path d="M${leftX},168 L${leftX + legW},168 L${leftX + legW - 1},228 L${leftX - 1},228 Z" fill="${visuals.skinColor}" stroke="#1b120c" stroke-width="0.8"/>
                    <path d="M${rightX},168 L${rightX + legW},168 L${rightX + legW + 1},228 L${rightX + 1},228 Z" fill="${visuals.skinColor}" stroke="#1b120c" stroke-width="0.8"/>
                    <!-- Простое исподнее белье -->
                    <path d="M${leftX - 2},148 L${rightX + legW + 2},148 L${rightX + legW},172 L${rightX},172 L120,162 L${leftX + legW},172 L${leftX - 2},172 Z" fill="#b0a28f" stroke="#262018" stroke-width="1"/>
                    <line x1="${leftX - 2}" y1="151" x2="${rightX + legW + 2}" y2="151" stroke="#695b4a" stroke-width="1.2"/>
                </g>
            `;
        }

        const legsId = equipment?.legs?.id || 'starter_pants';
        return EquipmentVisuals.renderPants(legsId, { visuals, classId, isFemale, isHero: true });
    }

    static renderBoots(visuals, classId, isFemale, equipment = null) {
        const bL = isFemale ? 102 : 98;
        const bR = isFemale ? 123 : 122;
        const w = isFemale ? 16 : 18;

        // Если обувь снята: босые ступни с пальцами
        if (equipment && !equipment.boots) {
            return `
                <g id="char-bare-feet">
                    <!-- Левая стопа -->
                    <path d="M${bL},225 L${bL + w - 1},225 L${bL + w - 1},265 Q${bL + w - 2},270 ${bL + 1},270 L${bL - 2},270 L${bL},240 Z" fill="${visuals.skinColor}" stroke="#1b120c" stroke-width="0.8"/>
                    <line x1="${bL + 3}" y1="266" x2="${bL + 3}" y2="270" stroke="#1b120c" stroke-width="0.8"/>
                    <line x1="${bL + 7}" y1="266" x2="${bL + 7}" y2="270" stroke="#1b120c" stroke-width="0.8"/>
                    <line x1="${bL + 11}" y1="266" x2="${bL + 11}" y2="270" stroke="#1b120c" stroke-width="0.8"/>
                    <!-- Правая стопа -->
                    <path d="M${bR},225 L${bR + w - 1},225 L${bR + w},240 L${bR + w + 1},270 L${bR - 1},270 Q${bR + 2},270 ${bR},265 Z" fill="${visuals.skinColor}" stroke="#1b120c" stroke-width="0.8"/>
                    <line x1="${bR + 4}" y1="266" x2="${bR + 4}" y2="270" stroke="#1b120c" stroke-width="0.8"/>
                    <line x1="${bR + 8}" y1="266" x2="${bR + 8}" y2="270" stroke="#1b120c" stroke-width="0.8"/>
                    <line x1="${bR + 12}" y1="266" x2="${bR + 12}" y2="270" stroke="#1b120c" stroke-width="0.8"/>
                </g>
            `;
        }

        const bootsId = equipment?.boots?.id || 'starter_boots';
        return EquipmentVisuals.renderBoots(bootsId, { visuals, classId, isFemale, isHero: true });
    }

    static renderNeck(visuals) {
        return `
            <g id="char-neck">
                <path d="M112,68 L128,68 L131,94 L109,94 Z" fill="${visuals.skinColor}"/>
                <path d="M112,74 Q120,78 128,74 L129,80 Q120,83 111,80 Z" fill="#1b120c" opacity="0.18"/>
            </g>
        `;
    }

    static renderTorso(visuals, classId, isFemale, equipment = null) {
        const sL = isFemale ? 90 : 86;
        const sR = isFemale ? 150 : 154;
        const wL = isFemale ? 101 : 98;
        const wR = isFemale ? 139 : 142;

        // Если броня снята: обнаженный торс / льняная нательная повязка
        if (equipment && !equipment.torso) {
            if (isFemale) {
                return `
                    <g id="char-torso-bare">
                        <path d="M112,88 Q120,85 128,88 L${sR},96 Q${sR - 2},126 ${wR},152 L${wL},152 Q${sL + 2},126 ${sL},96 Z" fill="${visuals.skinColor}" stroke="#1c140d" stroke-width="1"/>
                        <!-- Льняная нагрудная повязка -->
                        <path d="M${sL + 5},108 L${sR - 5},108 L${sR - 7},134 L${sL + 7},134 Z" fill="#c4b59f" stroke="#262018" stroke-width="1.2"/>
                        <line x1="${sL + 6}" y1="121" x2="${sR - 6}" y2="121" stroke="#8a7962" stroke-width="1.4"/>
                        <circle cx="120" cy="144" r="1.5" fill="#875338" opacity="0.7"/>
                    </g>
                `;
            } else {
                return `
                    <g id="char-torso-bare">
                        <path d="M112,88 Q120,85 128,88 L${sR},96 Q${sR - 2},126 ${wR},152 L${wL},152 Q${sL + 2},126 ${sL},96 Z" fill="${visuals.skinColor}" stroke="#1c140d" stroke-width="1"/>
                        <!-- Рельеф мускулатуры и ключиц -->
                        <path d="M112,94 Q120,97 128,94" stroke="#1c140d" stroke-width="1.2" fill="none" opacity="0.3"/>
                        <path d="M104,110 Q119,118 119,134 Q119,118 136,110" stroke="#1c140d" stroke-width="1.2" fill="none" opacity="0.35"/>
                        <path d="M108,124 Q114,126 119,124 Q125,126 131,124" stroke="#1c140d" stroke-width="1" fill="none" opacity="0.3"/>
                        <line x1="119" y1="125" x2="119" y2="148" stroke="#1c140d" stroke-width="1.1" opacity="0.3"/>
                        <circle cx="111" cy="120" r="1.8" fill="#875338" opacity="0.8"/>
                        <circle cx="128" cy="120" r="1.8" fill="#875338" opacity="0.8"/>
                        <circle cx="119" cy="146" r="1.5" fill="#875338" opacity="0.7"/>
                    </g>
                `;
            }
        }

        // Если надета экипировка на торс
        if (equipment && equipment.torso) {
            return EquipmentVisuals.renderTorso(equipment.torso.id, {
                visuals,
                classId,
                isFemale,
                isHero: true
            });
        }

        let tunicBody = `
            <path d="M112,88 Q120,85 128,88 L${sR},96 Q${sR - 2},126 ${wR},152 L${wL},152 Q${sL + 2},126 ${sL},96 Z" fill="${visuals.outfitColor}" stroke="#1c140d" stroke-width="1.2"/>
            <path d="M${wL},152 L${wR},152 L${wR + 4},164 L${wL - 4},164 Z" fill="${visuals.outfitColor}" stroke="#1c140d" stroke-width="1.2"/>
        `;

        let tunicOverlay = '';
        if (classId === 'warrior') {
            tunicOverlay = `
                <line x1="${sL + 6}" y1="98" x2="${wR - 6}" y2="148" stroke="#291c12" stroke-width="3.5"/>
                <circle cx="118" cy="124" r="3.5" fill="#695b4c"/>
            `;
        } else if (classId === 'rogue') {
            tunicOverlay = `
                <path d="M113,90 L127,90 L125,164 L115,164 Z" fill="#242220"/>
                <line x1="114" y1="108" x2="126" y2="108" stroke="#141311" stroke-width="1.5"/>
                <line x1="114" y1="122" x2="126" y2="122" stroke="#141311" stroke-width="1.5"/>
                <line x1="114" y1="136" x2="126" y2="136" stroke="#141311" stroke-width="1.5"/>
            `;
        } else if (classId === 'mage') {
            tunicBody = `
                <path d="M112,88 Q120,85 128,88 L${sR},96 L154,244 L86,244 L${sL},96 Z" fill="${visuals.outfitColor}" stroke="#1c1622" stroke-width="1.2"/>
            `;
            tunicOverlay = `
                <path d="M115,90 L125,90 L128,244 L112,244 Z" fill="#383042"/>
                <path d="M${sL + 2},96 Q120,106 ${sR - 2},96 L${sR - 6},116 Q120,126 ${sL + 6},116 Z" fill="#292033"/>
            `;
        } else if (classId === 'ranger') {
            tunicOverlay = `
                <line x1="${sL + 4}" y1="96" x2="${wR - 2}" y2="158" stroke="#362516" stroke-width="3.5"/>
                <rect x="${wL - 1}" y="145" width="9" height="11" fill="#362516" rx="1.5"/>
            `;
        }

        const beltY = 144;

        return `
            <g id="char-torso">
                ${tunicBody}
                ${tunicOverlay}
                <path d="M114,88 Q120,94 126,88" stroke="#1c140d" stroke-width="1.8" fill="none"/>
                <rect x="${wL - 2}" y="${beltY}" width="${wR - wL + 4}" height="8" fill="#24150b" stroke="#0f0703" stroke-width="1"/>
                <rect x="115" y="${beltY - 1}" width="10" height="10" fill="#6e5d4b" stroke="#2b1f13" stroke-width="1"/>
            </g>
        `;
    }

    static getTorsoSleeveColor(visuals, equipment) {
        const hasTorso = !equipment || !!equipment.torso;
        if (!hasTorso) return visuals.skinColor;

        const torsoId = equipment?.torso?.id || 'starter_tunic';
        if (torsoId === 'starter_tunic' || torsoId === 'starter_torso' || torsoId === 'gambeson') {
            return visuals.outfitColor || '#5a4634';
        }

        const torsoSleeveColors = {
            chainmail_vest: '#475569',
            scale_mail_cuirass: '#78350f',
            knight_plate_armor: '#94a3b8',
            mithril_cuirass_of_titans: '#1e3a8a',
            immortal_dragon_armor: '#7f1d1d',
            bone_golem_ribcage: '#1c1917',
            arachna_silk_mantle: '#3b0764',
            astral_weave_robe: '#0f172a',
            demonic_carapace: '#18181b',
            cuirass_of_the_unbroken: '#f8fafc',
            regalia_of_genesis: '#fef08a',
            thief_leather_vest: '#262626',
            shadow_leather_armor: '#1e1b4b',
            assassin_garb: '#18181b',
            nightstalker_tunic: '#09090b',
            apprentice_robe: '#1e1b4b',
            elemental_robe: '#1e293b',
            sorcerer_vestments: '#3b0764',
            archmage_robe: '#0f172a',
            hunter_tunic: '#27272a',
            scout_leather_jerkin: '#14532d',
            ranger_camouflage_armor: '#166534',
            warden_coat: '#064e3b'
        };
        return torsoSleeveColors[torsoId] || visuals.outfitColor;
    }

    static renderLeftArm(visuals, classId, isFemale, equipment = null) {
        const sX = isFemale ? 90 : 86;
        const sleeveFill = this.getTorsoSleeveColor(visuals, equipment);

        let shieldSvg = '';
        const hasShield = equipment ? !!equipment.offHand : (classId === 'warrior');

        if (hasShield) {
            const shieldId = equipment?.offHand?.id || 'round_wooden_shield';
            shieldSvg = EquipmentVisuals.renderShield(shieldId, { isHero: true });
        }

        return `
            <g id="char-left-arm">
                <path d="M${sX + 4},96 L${sX - 6},124 L${sX - 14},150 L${sX - 6},152 L${sX + 2},126 L${sX + 8},98 Z" fill="${visuals.skinColor}" stroke="#1c140d" stroke-width="0.8"/>
                <path d="M${sX + 5},96 L${sX - 5},120 L${sX + 3},122 L${sX + 9},98 Z" fill="${sleeveFill}" stroke="#1c140d" stroke-width="1"/>
                <circle cx="${sX - 10}" cy="150" r="5.5" fill="${visuals.skinColor}" stroke="#1c140d" stroke-width="0.8"/>
                ${shieldSvg}
            </g>
        `;
    }

    static renderRightArm(visuals, classId, isFemale, equipment = null) {
        const sX = isFemale ? 150 : 154;
        const sleeveFill = this.getTorsoSleeveColor(visuals, equipment);

        let weaponSvg = '';
        const hasWeapon = equipment ? !!equipment.mainHand : true;

        if (hasWeapon) {
            const weaponId = equipment?.mainHand?.id;
            weaponSvg = EquipmentVisuals.renderWeapon(weaponId, { isHero: true, classId, sX });
        }

        return `
            <g id="char-right-arm">
                <path d="M${sX - 4},96 L${sX + 6},124 L${sX + 14},150 L${sX + 6},152 L${sX - 2},126 L${sX - 8},98 Z" fill="${visuals.skinColor}" stroke="#1c140d" stroke-width="0.8"/>
                <path d="M${sX - 5},96 L${sX + 5},120 L${sX - 3},122 L${sX - 9},98 Z" fill="${sleeveFill}" stroke="#1c140d" stroke-width="1"/>
                ${weaponSvg}
                <circle cx="${sX + 10}" cy="150" r="5.5" fill="${visuals.skinColor}" stroke="#1c140d" stroke-width="0.8"/>
            </g>
        `;
    }

    static renderHelmet(equipment = null) {
        if (!equipment || !equipment.head) return '';
        return EquipmentVisuals.renderHelmet(equipment.head.id, { isHero: true });
    }

    static renderHead(visuals, isFemale) {
        const headW = isFemale ? 17 : 19;
        const chinY = isFemale ? 76 : 78;

        return `
            <g id="char-head-base">
                <ellipse cx="${120 - headW}" cy="52" rx="2.5" ry="4" fill="${visuals.skinColor}" stroke="#1b120c" stroke-width="0.8"/>
                <ellipse cx="${120 + headW}" cy="52" rx="2.5" ry="4" fill="${visuals.skinColor}" stroke="#1b120c" stroke-width="0.8"/>
                <path d="M${120 - headW},48 Q${120 - headW},${chinY - 2} 120,${chinY} Q${120 + headW},${chinY - 2} ${120 + headW},48 Q${120 + headW},28 120,28 Q${120 - headW},28 ${120 - headW},48 Z" fill="${visuals.skinColor}"/>
            </g>
        `;
    }

    static renderFaceFeatures(visuals, isFemale) {
        const eyeLX = 112;
        const eyeRX = 128;
        const eyeY = 50;
        const browY = isFemale ? 45 : 44;

        let eyelashesSvg = '';
        if (isFemale) {
            eyelashesSvg = `
                <path d="M${eyeLX - 4},${eyeY - 2} Q${eyeLX},${eyeY - 4} ${eyeLX + 4},${eyeY - 2}" stroke="#1c120c" stroke-width="1.3" fill="none"/>
                <path d="M${eyeRX - 4},${eyeY - 2} Q${eyeRX},${eyeY - 4} ${eyeRX + 4},${eyeY - 2}" stroke="#1c120c" stroke-width="1.3" fill="none"/>
            `;
        }

        const lipColor = isFemale ? '#9e4343' : '#633322';
        const mouthSvg = `
            <path d="M116,66 Q120,68 124,66" stroke="${lipColor}" stroke-width="${isFemale ? 1.6 : 1.2}" fill="none" stroke-linecap="round"/>
        `;

        // ================= ОСОБАЯ ОТРИСОВКА ГЛАЗ (ВКЛЮЧАЯ «ШЕСТИГЛАЗИЕ / ЛАЗУРНАЯ БЕЗДНА») =================
        let eyesSvg = '';
        const eyeColor = visuals.eyeColor || '#4b9cd3';

        if (eyeColor === '#00f0ff' || eyeColor === 'infinite_cyan') {
            // Легендарный лазурный взор Бесконечности (Six Eyes): кристаллическая лазурь с небесным сиянием и искрами
            eyesSvg = `
                <!-- Склера с небесным отсветом -->
                <ellipse cx="${eyeLX}" cy="${eyeY}" rx="3.4" ry="2.3" fill="#f0f9ff"/>
                <ellipse cx="${eyeRX}" cy="${eyeY}" rx="3.4" ry="2.3" fill="#f0f9ff"/>

                <!-- Пульсирующий ореол бесконечной лазури -->
                <circle cx="${eyeLX}" cy="${eyeY}" r="4.5" fill="#00f0ff" opacity="0.45"/>
                <circle cx="${eyeRX}" cy="${eyeY}" r="4.5" fill="#00f0ff" opacity="0.45"/>

                <!-- Радужка Ока Бездны с контрастным ободком -->
                <circle cx="${eyeLX}" cy="${eyeY}" r="2.1" fill="#00f0ff" stroke="#0284c7" stroke-width="0.5"/>
                <circle cx="${eyeRX}" cy="${eyeY}" r="2.1" fill="#00f0ff" stroke="#0284c7" stroke-width="0.5"/>

                <!-- Внутренний сапфировый зрачок-линза -->
                <circle cx="${eyeLX}" cy="${eyeY}" r="1.0" fill="#0369a1"/>
                <circle cx="${eyeRX}" cy="${eyeY}" r="1.0" fill="#0369a1"/>

                <!-- Двойные звездные блики бесконечного света -->
                <circle cx="${eyeLX + 0.6}" cy="${eyeY - 0.5}" r="0.6" fill="#ffffff"/>
                <circle cx="${eyeRX + 0.6}" cy="${eyeY - 0.5}" r="0.6" fill="#ffffff"/>
                <circle cx="${eyeLX - 0.5}" cy="${eyeY + 0.5}" r="0.35" fill="#ffffff" opacity="0.85"/>
                <circle cx="${eyeRX - 0.5}" cy="${eyeY + 0.5}" r="0.35" fill="#ffffff" opacity="0.85"/>
            `;
        } else if (eyeColor === 'hetero_blue_gold') {
            // Гетерохромия: левый глаз лазурный, правый глаз золотой
            eyesSvg = `
                <ellipse cx="${eyeLX}" cy="${eyeY}" rx="3" ry="2" fill="#ffffff"/>
                <ellipse cx="${eyeRX}" cy="${eyeY}" rx="3" ry="2" fill="#ffffff"/>
                <circle cx="${eyeLX}" cy="${eyeY}" r="1.6" fill="#38bdf8"/>
                <circle cx="${eyeRX}" cy="${eyeY}" r="1.6" fill="#facc15"/>
                <circle cx="${eyeLX}" cy="${eyeY}" r="0.7" fill="#0c4a6e"/>
                <circle cx="${eyeRX}" cy="${eyeY}" r="0.7" fill="#713f12"/>
                <circle cx="${eyeLX + 0.5}" cy="${eyeY - 0.5}" r="0.5" fill="#ffffff"/>
                <circle cx="${eyeRX + 0.5}" cy="${eyeY - 0.5}" r="0.5" fill="#ffffff"/>
            `;
        } else if (eyeColor === 'hetero_red_cyan') {
            // Гетерохромия: левый рубиновый, правый циан
            eyesSvg = `
                <ellipse cx="${eyeLX}" cy="${eyeY}" rx="3" ry="2" fill="#ffffff"/>
                <ellipse cx="${eyeRX}" cy="${eyeY}" rx="3" ry="2" fill="#ffffff"/>
                <circle cx="${eyeLX}" cy="${eyeY}" r="1.6" fill="#dc2626"/>
                <circle cx="${eyeRX}" cy="${eyeY}" r="1.6" fill="#00f0ff"/>
                <circle cx="${eyeLX}" cy="${eyeY}" r="0.7" fill="#450a0a"/>
                <circle cx="${eyeRX}" cy="${eyeY}" r="0.7" fill="#0369a1"/>
                <circle cx="${eyeLX + 0.5}" cy="${eyeY - 0.5}" r="0.5" fill="#ffffff"/>
                <circle cx="${eyeRX + 0.5}" cy="${eyeY - 0.5}" r="0.5" fill="#ffffff"/>
            `;
        } else {
            // Стандартные выразительные глаза с бликами
            eyesSvg = `
                <ellipse cx="${eyeLX}" cy="${eyeY}" rx="3" ry="2" fill="#ffffff"/>
                <ellipse cx="${eyeRX}" cy="${eyeY}" rx="3" ry="2" fill="#ffffff"/>
                <circle cx="${eyeLX}" cy="${eyeY}" r="1.6" fill="${eyeColor}"/>
                <circle cx="${eyeRX}" cy="${eyeY}" r="1.6" fill="${eyeColor}"/>
                <circle cx="${eyeLX}" cy="${eyeY}" r="0.7" fill="#18181b"/>
                <circle cx="${eyeRX}" cy="${eyeY}" r="0.7" fill="#18181b"/>
                <circle cx="${eyeLX + 0.5}" cy="${eyeY - 0.5}" r="0.5" fill="#ffffff"/>
                <circle cx="${eyeRX + 0.5}" cy="${eyeY - 0.5}" r="0.5" fill="#ffffff"/>
            `;
        }

        // ================= РАСТИТЕЛЬНОСТЬ НА ЛИЦЕ (МУЖСКИЕ БОРОДЫ И УСЫ) =================
        let beardSvg = '';
        if (!isFemale) {
            const hCol = visuals.hairColor || '#2b1d16';
            if (visuals.beard === 'stubble') {
                beardSvg = `
                    <path d="M104,62 C104,76 110,78 120,78 C130,78 136,76 136,62 C134,71 128,76 120,76 C112,76 106,71 104,62 Z" fill="${hCol}" opacity="0.45"/>
                    <path d="M115,63 Q120,65 125,63" stroke="${hCol}" stroke-width="1.3" opacity="0.45" fill="none"/>
                `;
            } else if (visuals.beard === 'heavy_stubble') {
                beardSvg = `
                    <path d="M103,58 C103,77 109,80 120,80 C131,80 137,77 137,58 C134,73 128,77 120,77 C112,77 106,73 103,58 Z" fill="${hCol}" opacity="0.7"/>
                    <path d="M113,63 Q120,66 127,63" stroke="${hCol}" stroke-width="2" opacity="0.7" fill="none"/>
                `;
            } else if (visuals.beard === 'full') {
                beardSvg = `
                    <path d="M103,60 C101,78 107,96 120,99 C133,96 139,78 137,60 C133,72 128,79 120,79 C112,79 107,72 103,60 Z" fill="${hCol}"/>
                    <path d="M113,63 Q120,66 127,63 Q120,64 113,63 Z" fill="${hCol}"/>
                `;
            } else if (visuals.beard === 'short_boxed') {
                beardSvg = `
                    <path d="M104,60 C103,74 108,86 120,87 C132,86 137,74 136,60 C133,70 128,77 120,77 C112,77 107,70 104,60 Z" fill="${hCol}"/>
                    <path d="M113,63 Q120,65 127,63" stroke="${hCol}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
                `;
            } else if (visuals.beard === 'goatee') {
                beardSvg = `
                    <path d="M116,70 L124,70 L122,88 L118,88 Z" fill="${hCol}"/>
                    <path d="M114,63 Q120,66 126,63" stroke="${hCol}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
                `;
            } else if (visuals.beard === 'van_dyke') {
                beardSvg = `
                    <path d="M117,70 L123,70 L120,92 Z" fill="${hCol}"/>
                    <!-- Изящные закрученные усы -->
                    <path d="M111,64 Q116,63 120,65 Q124,63 129,64 Q133,62 135,59" stroke="${hCol}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
                `;
            } else if (visuals.beard === 'braided') {
                beardSvg = `
                    <path d="M103,60 C101,74 107,90 120,92 C133,90 139,74 137,60 C133,71 128,78 120,78 C112,78 107,71 103,60 Z" fill="${hCol}"/>
                    <path d="M117,92 L117,112 L123,112 L123,92 Z" fill="${hCol}"/>
                    <rect x="116" y="100" width="8" height="3" fill="#ca8a04" rx="1"/>
                `;
            } else if (visuals.beard === 'viking_double') {
                beardSvg = `
                    <path d="M103,60 C101,74 107,90 120,92 C133,90 139,74 137,60 C133,71 128,78 120,78 C112,78 107,71 103,60 Z" fill="${hCol}"/>
                    <path d="M113,92 L113,114 L117,114 L117,92 Z" fill="${hCol}"/>
                    <path d="M123,92 L123,114 L127,114 L127,92 Z" fill="${hCol}"/>
                    <rect x="112" y="102" width="6" height="3" fill="#ca8a04" rx="1"/>
                    <rect x="122" y="102" width="6" height="3" fill="#ca8a04" rx="1"/>
                `;
            } else if (visuals.beard === 'mustache_classic') {
                beardSvg = `
                    <path d="M110,64 Q116,62 120,65 Q124,62 130,64" stroke="${hCol}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
                `;
            } else if (visuals.beard === 'mustache_horseshoe') {
                beardSvg = `
                    <path d="M111,63 Q120,65 129,63" stroke="${hCol}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                    <path d="M111,63 L110,76" stroke="${hCol}" stroke-width="2.2" stroke-linecap="round"/>
                    <path d="M129,63 L130,76" stroke="${hCol}" stroke-width="2.2" stroke-linecap="round"/>
                `;
            } else if (visuals.beard === 'mutton_chops') {
                beardSvg = `
                    <path d="M101,48 L104,74 L112,74 L107,48 Z" fill="${hCol}"/>
                    <path d="M139,48 L136,74 L128,74 L133,48 Z" fill="${hCol}"/>
                `;
            }
        }

        return `
            <g id="char-face">
                ${eyesSvg}
                ${eyelashesSvg}

                <line x1="${eyeLX - 4}" y1="${browY}" x2="${eyeLX + 4}" y2="${isFemale ? browY - 1 : browY}" stroke="#1c120c" stroke-width="${isFemale ? 1.2 : 1.6}" stroke-linecap="round"/>
                <line x1="${eyeRX + 4}" y1="${browY}" x2="${eyeRX - 4}" y2="${isFemale ? browY - 1 : browY}" stroke="#1c120c" stroke-width="${isFemale ? 1.2 : 1.6}" stroke-linecap="round"/>

                <path d="M119,53 L121,59 L118,60" stroke="#875338" stroke-width="1.1" fill="none"/>

                ${mouthSvg}
                ${beardSvg}
            </g>
        `;
    }

    static renderAccessories(visuals, isFemale) {
        const acc = visuals.accessory;
        if (!acc || acc === 'none') return '';

        // ================= ЭЛЕМЕНТЫ ГОДЖО: ТЁМНАЯ ПОВЯЗКА НА ГЛАЗА И КРУГЛЫЕ ТЕМНЫЕ ОЧКИ =================
        if (acc === 'blindfold') {
            // Легендарная черная шелковая повязка созерцателя (The Void Blindfold)
            return `
                <g id="acc-blindfold">
                    <!-- Теневой контур под повязкой -->
                    <path d="M97,42 Q120,39 143,42 L142,59 Q120,62 98,59 Z" fill="#090a0f"/>
                    <!-- Основная шелковая черная повязка, плотно закрывающая глаза -->
                    <path d="M98,43 Q120,40 142,43 L141,58 Q120,61 99,58 Z" fill="#14141e" stroke="#0a0a10" stroke-width="1.3"/>
                    <!-- Складки натянутой ткани и отблески шелка -->
                    <line x1="104" y1="48" x2="136" y2="48" stroke="#26273b" stroke-width="1.2" stroke-linecap="round"/>
                    <line x1="106" y1="53" x2="134" y2="53" stroke="#222336" stroke-width="1.1" stroke-linecap="round"/>
                    <path d="M110,44 Q120,46 130,44" stroke="#373954" stroke-width="0.9" fill="none"/>
                    <!-- Завязанный узел ленты с ниспадающими концами за левым ухом -->
                    <path d="M99,50 L89,58 L92,72 L98,56 Z" fill="#14141e" stroke="#0a0a10" stroke-width="0.8"/>
                    <path d="M98,52 L93,63 L96,70 L100,55 Z" fill="#202130"/>
                </g>
            `;
        }

        if (acc === 'sunglasses') {
            // Стильные круглые темные очки в тонкой золотистой оправе (Gojo Round Shades)
            return `
                <g id="acc-sunglasses">
                    <!-- Левая оправа и темная линза -->
                    <circle cx="112" cy="50" r="5.3" fill="#0f1017" stroke="#ca8a04" stroke-width="1.1"/>
                    <circle cx="112" cy="50" r="4.3" fill="#181926"/>
                    <path d="M109.5,48.5 Q112,46.5 114.5,48.5" stroke="#ffffff" stroke-width="0.9" fill="none" opacity="0.7"/>

                    <!-- Правая оправа и темная линза -->
                    <circle cx="128" cy="50" r="5.3" fill="#0f1017" stroke="#ca8a04" stroke-width="1.1"/>
                    <circle cx="128" cy="50" r="4.3" fill="#181926"/>
                    <path d="M125.5,48.5 Q128,46.5 130.5,48.5" stroke="#ffffff" stroke-width="0.9" fill="none" opacity="0.7"/>

                    <!-- Золотая перемычка на переносице -->
                    <line x1="117.2" y1="49.5" x2="122.8" y2="49.5" stroke="#facc15" stroke-width="1.4"/>
                    <path d="M118,48 Q120,46.5 122,48" stroke="#ca8a04" stroke-width="0.8" fill="none"/>

                    <!-- Тонкие дужки к ушам -->
                    <line x1="106.8" y1="50" x2="101" y2="51.5" stroke="#ca8a04" stroke-width="1.1"/>
                    <line x1="133.2" y1="50" x2="139" y2="51.5" stroke="#ca8a04" stroke-width="1.1"/>
                </g>
            `;
        }

        if (acc === 'cloth_bandage') {
            // Льняная бинтовая повязка на глаза
            return `
                <g id="acc-bandage">
                    <path d="M98,44 Q120,41 142,44 L141,56 Q120,59 99,56 Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
                    <line x1="102" y1="48" x2="138" y2="48" stroke="#cbd5e1" stroke-width="1.2"/>
                    <line x1="104" y1="52" x2="136" y2="52" stroke="#94a3b8" stroke-width="0.8"/>
                </g>
            `;
        }

        // ================= ШРАМЫ И ПОВЯЗКИ =================
        if (acc === 'scar_eye' || acc === 'scar') {
            return `
                <line x1="109" y1="41" x2="114" y2="60" stroke="#7f1d1d" stroke-width="1.8" stroke-linecap="round"/>
                <line x1="108" y1="48" x2="113" y2="50" stroke="#991b1b" stroke-width="1"/>
            `;
        }

        if (acc === 'scar_cross') {
            return `
                <line x1="131" y1="55" x2="137" y2="63" stroke="#7f1d1d" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="131" y1="63" x2="137" y2="55" stroke="#7f1d1d" stroke-width="1.5" stroke-linecap="round"/>
            `;
        }

        if (acc === 'scar_slash') {
            return `
                <line x1="126" y1="54" x2="132" y2="66" stroke="#7f1d1d" stroke-width="1.3" stroke-linecap="round"/>
                <line x1="129" y1="53" x2="135" y2="65" stroke="#7f1d1d" stroke-width="1.3" stroke-linecap="round"/>
                <line x1="132" y1="52" x2="138" y2="64" stroke="#7f1d1d" stroke-width="1.3" stroke-linecap="round"/>
            `;
        }

        if (acc === 'eyepatch') {
            return `
                <line x1="101" y1="44" x2="137" y2="52" stroke="#1c1917" stroke-width="1.8"/>
                <polygon points="108,45 116,47 114,55 107,53" fill="#1c1917"/>
            `;
        }

        if (acc === 'eyepatch_skull') {
            return `
                <line x1="101" y1="44" x2="137" y2="52" stroke="#1c1917" stroke-width="1.8"/>
                <polygon points="108,45 116,47 114,55 107,53" fill="#1c1917" stroke="#94a3b8" stroke-width="0.8"/>
                <circle cx="112" cy="50" r="2" fill="#cbd5e1"/>
            `;
        }

        // ================= МАСКИ, МОНОКЛИ И УКРАШЕНИЯ =================
        if (acc === 'mask') {
            return `
                <path d="M105,57 L135,57 L130,79 L120,83 L110,79 Z" fill="#24232b" stroke="#131217" stroke-width="1.2"/>
                <line x1="106" y1="59" x2="101" y2="52" stroke="#131217" stroke-width="1.2"/>
                <line x1="134" y1="59" x2="139" y2="52" stroke="#131217" stroke-width="1.2"/>
            `;
        }

        if (acc === 'porcelain_mask') {
            // Фарфоровая маска духа на боку прически
            return `
                <g transform="translate(136, 32)">
                    <ellipse cx="6" cy="6" rx="8" ry="10" fill="#f8fafc" stroke="#dc2626" stroke-width="1.2" transform="rotate(15 6 6)"/>
                    <path d="M3,4 Q6,6 9,4" stroke="#dc2626" stroke-width="1" fill="none"/>
                    <circle cx="4" cy="5" r="1" fill="#0f172a"/>
                    <circle cx="8" cy="5" r="1" fill="#0f172a"/>
                    <circle cx="6" cy="9" r="1" fill="#dc2626"/>
                    <line x1="1" y1="14" x2="-2" y2="24" stroke="#dc2626" stroke-width="1.2"/>
                </g>
            `;
        }

        if (acc === 'monocle') {
            return `
                <circle cx="128" cy="49" r="4.5" stroke="#ca8a04" stroke-width="1.5" fill="none"/>
                <line x1="132" y1="51" x2="137" y2="64" stroke="#ca8a04" stroke-width="1"/>
            `;
        }

        if (acc === 'warpaint') {
            return `
                <polygon points="104,54 110,57 106,60" fill="#8f1d1d"/>
                <polygon points="136,54 130,57 134,60" fill="#8f1d1d"/>
            `;
        }

        if (acc === 'earrings') {
            return `
                <circle cx="101" cy="54" r="2.2" fill="none" stroke="#facc15" stroke-width="1.2"/>
                <circle cx="139" cy="54" r="2.2" fill="none" stroke="#facc15" stroke-width="1.2"/>
            `;
        }

        if (acc === 'earrings_feathers') {
            return `
                <line x1="101" y1="54" x2="100" y2="68" stroke="#38bdf8" stroke-width="1.5"/>
                <polygon points="98,66 102,66 100,72" fill="#0284c7"/>
                <line x1="139" y1="54" x2="140" y2="68" stroke="#38bdf8" stroke-width="1.5"/>
                <polygon points="138,66 142,66 140,72" fill="#0284c7"/>
            `;
        }

        if (acc === 'circlet') {
            return `
                <path d="M102,36 Q120,42 138,36" stroke="#d4af37" stroke-width="2" fill="none"/>
                <polygon points="120,36 118,42 122,42" fill="#7ec8e3"/>
            `;
        }

        return '';
    }

    static renderHairBack(visuals, isFemale) {
        const hCol = visuals.hairColor || '#2b1d16';
        const style = visuals.hairStyle || 'short';

        // ================= СПЕЦИАЛЬНЫЙ ГОДЖО-СТИЛЬ: ВЗЪЕРОШЕННЫЕ ИГЛЫ (ШИПЫ СЗАДИ) =================
        if (style === 'spiky_wild') {
            return `
                <g id="hair-spiky-back">
                    <path d="M92,38 L72,22 L90,20 L80,2 L100,12 L106,-6 L120,8 L134,-6 L140,12 L160,2 L150,20 L168,22 L148,38 Z" fill="${hCol}"/>
                </g>
            `;
        }

        if (style === 'messy_bangs') {
            return `
                <path d="M96,44 C92,20 148,20 144,44 C148,70 142,88 136,92 C132,80 140,56 138,44 C132,28 108,28 102,44 C100,56 108,80 104,92 C98,88 92,70 96,44 Z" fill="${hCol}"/>
            `;
        }

        if (style === 'long' || style === 'long_waves') {
            return `
                <path d="M96,44 C92,16 148,16 144,44 C154,88 150,148 136,164 C130,132 144,90 140,54 C132,30 108,30 100,54 C96,90 110,132 104,164 C90,148 86,88 96,44 Z" fill="${hCol}"/>
            `;
        }

        if (style === 'ponytail' || style === 'ponytail_high') {
            return `
                <path d="M120,24 Q150,26 154,88 Q144,98 138,78 Q136,42 120,30 Z" fill="${hCol}"/>
                <circle cx="126" cy="28" r="2.8" fill="#ca8a04"/>
            `;
        }

        if (style === 'topknot') {
            return `
                <circle cx="120" cy="16" r="9" fill="${hCol}"/>
                <rect x="116" y="22" width="8" height="3" fill="#ca8a04" rx="1"/>
            `;
        }

        if (style === 'twin_braids' || style === 'braids') {
            return `
                <path d="M102,48 L94,148 L104,148 L108,48 Z" fill="${hCol}"/>
                <path d="M138,48 L146,148 L136,148 L132,48 Z" fill="${hCol}"/>
                <rect x="94" y="140" width="8" height="2.5" fill="#ca8a04"/>
                <rect x="138" y="140" width="8" height="2.5" fill="#ca8a04"/>
            `;
        }

        if (style === 'single_braid' || style === 'side_braid') {
            return `
                <path d="M136,44 Q148,80 142,152 L132,152 Q138,80 128,44 Z" fill="${hCol}"/>
                <rect x="132" y="144" width="10" height="3" fill="#ca8a04" rx="1"/>
            `;
        }

        if (style === 'dreadlocks') {
            return `
                <path d="M96,42 L88,136 L94,136 L100,42 Z" fill="${hCol}"/>
                <path d="M100,44 L96,142 L102,142 L104,44 Z" fill="${hCol}"/>
                <path d="M140,44 L144,142 L138,142 L136,44 Z" fill="${hCol}"/>
                <path d="M144,42 L152,136 L146,136 L140,42 Z" fill="${hCol}"/>
            `;
        }

        if (style === 'viking_braid') {
            return `
                <path d="M116,42 L114,148 L126,148 L124,42 Z" fill="${hCol}"/>
                <rect x="115" y="80" width="10" height="3" fill="#ca8a04"/>
                <rect x="115" y="138" width="10" height="3" fill="#ca8a04"/>
            `;
        }

        if (style === 'curls_loose' || style === 'noble_wavy') {
            return `
                <path d="M94,40 C86,22 154,22 146,40 C158,82 156,138 140,154 C132,126 146,88 140,52 C134,32 106,32 100,52 C94,88 108,126 100,154 C84,138 82,82 94,40 Z" fill="${hCol}"/>
            `;
        }

        if (style === 'valkyrie' || style === 'warrior_halfup') {
            return `
                <path d="M96,44 C92,16 148,16 144,44 C154,88 150,148 136,164 C130,132 144,90 140,54 C132,30 108,30 100,54 C96,90 110,132 104,164 C90,148 86,88 96,44 Z" fill="${hCol}"/>
                <!-- Пучок полухвоста -->
                <circle cx="120" cy="22" r="7" fill="${hCol}"/>
                <rect x="117" y="26" width="6" height="2.5" fill="#ca8a04"/>
            `;
        }

        if (style === 'twin_buns') {
            return `
                <circle cx="98" cy="22" r="8" fill="${hCol}"/>
                <circle cx="142" cy="22" r="8" fill="${hCol}"/>
                <rect x="95" y="26" width="6" height="2" fill="#ca8a04"/>
                <rect x="139" y="26" width="6" height="2" fill="#ca8a04"/>
            `;
        }

        return '';
    }

    static renderHairFront(visuals, isFemale) {
        const hCol = visuals.hairColor || '#2b1d16';
        const style = visuals.hairStyle || (isFemale ? 'bob' : 'short');

        if (style === 'bald') {
            return `
                <ellipse cx="120" cy="32" rx="10" ry="3" fill="#ffffff" opacity="0.12"/>
            `;
        }

        // ================= СПЕЦИАЛЬНЫЙ ГОДЖО-СТИЛЬ: БОЕВЫЕ ВЗЪЕРОШЕННЫЕ ИГЛЫ (SPIKY WILD) =================
        if (style === 'spiky_wild') {
            return `
                <g id="hair-spiky-wild-front">
                    <!-- Мощный объем вздыбленных шипов спереди и сверху -->
                    <path d="M98,52 C94,30 88,10 100,-6 L110,14 L120,-10 L130,14 L140,-6 C152,10 146,30 142,52 C143,64 138,66 134,56 C132,44 128,40 125,48 L120,40 L115,48 C112,40 108,44 106,56 C102,66 97,64 98,52 Z" fill="${hCol}"/>
                    <!-- Пряди-шипы, падающие на лоб -->
                    <polygon points="107,38 114,48 111,36" fill="${hCol}"/>
                    <polygon points="117,36 120,50 123,36" fill="${hCol}"/>
                    <polygon points="129,36 126,48 133,38" fill="${hCol}"/>
                    <!-- Световые блики на гранях шипов -->
                    <path d="M106,12 L112,-2 L115,10" stroke="#ffffff" stroke-width="0.9" fill="none" opacity="0.45"/>
                    <path d="M120,-5 L124,12" stroke="#ffffff" stroke-width="0.9" fill="none" opacity="0.45"/>
                    <path d="M128,-1 L134,14" stroke="#ffffff" stroke-width="0.9" fill="none" opacity="0.45"/>
                </g>
            `;
        }

        // ================= СПЕЦИАЛЬНЫЙ ГОДЖО-СТИЛЬ: СВОБОДНЫЙ ЗАЧЕС / ШТОРКИ (MESSY BANGS) =================
        if (style === 'messy_bangs') {
            return `
                <g id="hair-messy-bangs-front">
                    <path d="M97,54 C94,18 102,12 120,12 C138,12 146,18 143,54 C144,66 140,70 137,64 C136,50 134,44 128,46 C124,47 122,58 120,62 C118,58 116,47 112,46 C106,44 104,50 103,64 C100,70 96,66 97,54 Z" fill="${hCol}"/>
                    <!-- Прядки челки -->
                    <path d="M108,36 L114,52 L116,42 L120,56 L124,42 L128,52 L132,36" stroke="#000000" stroke-width="0.7" fill="none" opacity="0.25"/>
                    <path d="M104,24 Q120,18 136,24" stroke="#ffffff" stroke-width="0.8" fill="none" opacity="0.3"/>
                </g>
            `;
        }

        if (style === 'short') {
            return `
                <path d="M98,54 Q94,14 120,14 Q146,14 142,54 C143,60 141,66 139,68 C138,58 138,44 130,40 Q122,36 116,42 L112,38 C104,38 101,48 101,68 C99,66 97,60 98,54 Z" fill="${hCol}"/>
            `;
        }

        if (style === 'messy') {
            return `
                <path d="M97,54 C93,24 100,10 120,10 C140,10 147,24 143,54 C144,64 141,66 138,58 L134,64 L129,54 L124,62 L120,52 L116,62 L111,54 L106,64 L102,58 C99,66 96,64 97,54 Z" fill="${hCol}"/>
            `;
        }

        if (style === 'curtain') {
            return `
                <path d="M98,54 Q94,14 120,14 Q146,14 142,54 C144,68 138,70 134,62 C132,46 128,40 122,44 L120,34 L118,44 C112,40 108,46 106,62 C102,70 96,68 98,54 Z" fill="${hCol}"/>
            `;
        }

        if (style === 'undercut' || style === 'undercut_fem') {
            return `
                <!-- Бритые короткие виски -->
                <path d="M99,54 L98,38 L104,38 L103,54 Z" fill="#18181b" opacity="0.4"/>
                <path d="M141,54 L142,38 L136,38 L137,54 Z" fill="#18181b" opacity="0.4"/>
                <!-- Пышная грива наверх -->
                <path d="M100,42 Q102,8 120,8 Q138,8 140,42 C138,36 132,32 120,32 C108,32 102,36 100,42 Z" fill="${hCol}"/>
                <path d="M104,38 L114,46 L120,38 L126,46 L136,38" fill="${hCol}"/>
            `;
        }

        if (style === 'fade_side') {
            return `
                <path d="M98,54 Q94,14 120,14 Q146,14 142,54 C143,62 139,66 136,56 C134,44 120,36 106,46 C102,48 100,56 100,66 C98,64 96,60 98,54 Z" fill="${hCol}"/>
            `;
        }

        if (style === 'mohawk') {
            return `
                <path d="M115,4 L125,4 L123,42 L117,42 Z" fill="${hCol}"/>
                <polygon points="113,8 120,-2 125,8" fill="${hCol}"/>
                <polygon points="114,2 120,-8 126,2" fill="${hCol}"/>
            `;
        }

        if (style === 'dreadlocks') {
            return `
                <path d="M98,52 Q94,14 120,14 Q146,14 142,52 C140,42 100,42 98,52 Z" fill="${hCol}"/>
                <rect x="108" y="36" width="4" height="24" rx="2" fill="${hCol}"/>
                <rect x="118" y="34" width="4" height="26" rx="2" fill="${hCol}"/>
                <rect x="128" y="36" width="4" height="24" rx="2" fill="${hCol}"/>
                <rect x="107" y="46" width="6" height="2" fill="#ca8a04"/>
                <rect x="127" y="46" width="6" height="2" fill="#ca8a04"/>
            `;
        }

        if (style === 'curly_crop' || style === 'curls_loose') {
            return `
                <path d="M97,52 Q92,14 120,14 Q148,14 143,52 C144,60 140,64 136,58 C132,46 128,42 120,44 C112,42 108,46 104,58 C100,64 96,60 97,52 Z" fill="${hCol}"/>
                <!-- Кудрявые завитки -->
                <circle cx="106" cy="38" r="4" fill="${hCol}"/>
                <circle cx="114" cy="36" r="4.5" fill="${hCol}"/>
                <circle cx="122" cy="35" r="4.5" fill="${hCol}"/>
                <circle cx="130" cy="36" r="4.5" fill="${hCol}"/>
                <circle cx="136" cy="40" r="4" fill="${hCol}"/>
            `;
        }

        if (style === 'noble_wavy') {
            return `
                <path d="M98,52 Q94,14 120,14 Q146,14 142,52 C145,66 141,74 136,66 C134,50 134,40 126,42 C118,44 116,52 112,50 C106,46 104,40 102,62 C99,66 95,64 98,52 Z" fill="${hCol}"/>
            `;
        }

        if (style === 'bob') {
            return `
                <path d="M98,52 Q94,14 120,14 Q146,14 142,52 C145,68 141,78 137,80 C136,66 138,48 132,40 C124,34 116,34 108,40 C102,48 104,66 103,80 C99,78 95,68 98,52 Z" fill="${hCol}"/>
            `;
        }

        if (style === 'long' || style === 'long_waves') {
            return `
                <path d="M98,50 Q94,14 120,14 Q146,14 142,50 C143,62 139,66 134,68 C135,54 136,44 128,38 Q120,34 112,38 C104,44 105,54 106,68 C101,66 97,62 98,50 Z" fill="${hCol}"/>
            `;
        }

        if (style === 'ponytail' || style === 'ponytail_high' || style === 'topknot') {
            return `
                <path d="M98,52 Q94,14 120,14 Q146,14 142,52 C138,40 102,40 98,52 Z" fill="${hCol}"/>
                <path d="M106,42 Q120,36 134,42" stroke="#ffffff" stroke-width="0.8" fill="none" opacity="0.3"/>
            `;
        }

        if (style === 'twin_braids' || style === 'braids' || style === 'single_braid' || style === 'side_braid' || style === 'viking_braid') {
            return `
                <path d="M98,50 Q94,14 120,14 Q146,14 142,50 C136,36 104,36 98,50 Z" fill="${hCol}"/>
            `;
        }

        if (style === 'pixie' || style === 'short_messy') {
            return `
                <path d="M98,52 Q94,14 120,14 Q146,14 142,52 C141,44 136,40 128,38 L124,44 L118,36 C108,36 102,42 98,52 Z" fill="${hCol}"/>
            `;
        }

        if (style === 'hime_cut') {
            // Традиционная японская прическа принцессы (ровная челка + ровные височные пряди)
            return `
                <path d="M98,52 Q94,14 120,14 Q146,14 142,52 L142,82 L136,82 L136,44 L104,44 L104,82 L98,82 Z" fill="${hCol}"/>
                <rect x="105" y="38" width="30" height="6" fill="${hCol}"/>
            `;
        }

        if (style === 'bun_top' || style === 'twin_buns' || style === 'valkyrie' || style === 'warrior_halfup') {
            return `
                <path d="M98,52 Q94,14 120,14 Q146,14 142,52 C138,38 102,38 98,52 Z" fill="${hCol}"/>
            `;
        }

        if (style === 'asymmetric') {
            return `
                <path d="M98,52 Q94,14 120,14 Q146,14 142,52 C145,72 140,84 134,86 C134,60 136,44 128,38 Q118,36 112,42 C104,48 104,60 103,66 C100,68 96,62 98,52 Z" fill="${hCol}"/>
            `;
        }

        // По умолчанию
        return `
            <path d="M98,54 Q94,14 120,14 Q146,14 142,54 C138,40 102,40 98,54 Z" fill="${hCol}"/>
        `;
    }

    /**
     * Отрисовка персонажа в полный рост для перемещения по подземелью
     */
    static renderDungeonFigure(visuals, classId, equipment = null, width = 64, height = 88) {
        const isFemale = visuals.gender === 'female';

        return `
            <svg viewBox="0 0 240 300" width="${width}" height="${height}">
                <defs>
                    <radialGradient id="heroFeetShadow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#000000" stop-opacity="0.8"/>
                        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <ellipse cx="120" cy="272" rx="44" ry="9" fill="url(#heroFeetShadow)"/>
                <g id="hero-figure-layers">
                    ${this.renderHairBack(visuals, isFemale)}
                    ${this.renderQuiver(classId, equipment)}
                    ${this.renderPants(visuals, isFemale, equipment)}
                    ${this.renderBoots(visuals, isFemale, equipment)}
                    ${this.renderNeck(visuals)}
                    ${this.renderTorso(visuals, classId, isFemale, equipment)}
                    ${this.renderLeftArm(visuals, classId, isFemale, equipment)}
                    ${this.renderRightArm(visuals, classId, isFemale, equipment)}
                    ${this.renderHead(visuals, isFemale)}
                    ${this.renderFaceFeatures(visuals, isFemale)}
                    ${this.renderAccessories(visuals, isFemale)}
                    ${this.renderHairFront(visuals, isFemale)}
                    ${this.renderHelmet(equipment)}
                </g>
            </svg>
        `;
    }
}