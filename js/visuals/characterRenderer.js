export class CharacterRenderer {
    static render(visuals, classId) {
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
                    ${this.renderQuiver(classId)}
                    ${this.renderPants(visuals, isFemale)}
                    ${this.renderBoots(isFemale)}
                    ${this.renderNeck(visuals)}
                    ${this.renderTorso(visuals, classId, isFemale)}
                    ${this.renderLeftArm(visuals, classId, isFemale)}
                    ${this.renderRightArm(visuals, classId, isFemale)}
                    ${this.renderHead(visuals, isFemale)}
                    ${this.renderFaceFeatures(visuals, isFemale)}
                    ${this.renderAccessories(visuals, isFemale)}
                    ${this.renderHairFront(visuals, isFemale)}
                </g>
            </svg>
        `;
    }

    static renderBust(visuals, classId) {
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
                ${this.renderTorso(visuals, classId, isFemale)}
                ${this.renderHead(visuals, isFemale)}
                ${this.renderFaceFeatures(visuals, isFemale)}
                ${this.renderAccessories(visuals, isFemale)}
                ${this.renderHairFront(visuals, isFemale)}
            </svg>
        `;
    }

    static renderShadow() {
        return `
            <ellipse cx="120" cy="272" rx="54" ry="10" fill="url(#pedestalGlow)"/>
            <ellipse cx="120" cy="272" rx="38" ry="6" fill="#09090e" opacity="0.9"/>
        `;
    }

    static renderQuiver(classId) {
        if (classId === 'ranger') {
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

    static renderPants(visuals, isFemale) {
        const leftX = isFemale ? 105 : 102;
        const rightX = isFemale ? 121 : 122;
        const legW = isFemale ? 14 : 16;

        return `
            <g id="char-pants">
                <path d="M${leftX},148 L${leftX + legW},148 L${leftX + legW - 1},228 L${leftX - 2},228 Z" fill="#4d4235" stroke="#262018" stroke-width="1.2"/>
                <path d="M${rightX},148 L${rightX + legW},148 L${rightX + legW + 2},228 L${rightX + 1},228 Z" fill="#574b3d" stroke="#262018" stroke-width="1.2"/>
                <path d="M${leftX + legW},148 L120,162 L${rightX},148 Z" fill="#362e24"/>
            </g>
        `;
    }

    static renderBoots(isFemale) {
        const bL = isFemale ? 102 : 98;
        const bR = isFemale ? 123 : 122;
        const w = isFemale ? 16 : 18;

        return `
            <g id="char-boots">
                <path d="M${bL},220 L${bL + w},220 L${bL + w - 1},270 L${bL - 3},270 Z" fill="#322013" stroke="#160d07" stroke-width="1.2"/>
                <path d="M${bR},220 L${bR + w},220 L${bR + w + 3},270 L${bR + 1},270 Z" fill="#322013" stroke="#160d07" stroke-width="1.2"/>

                <rect x="${bL - 2}" y="219" width="${w + 3}" height="7" rx="1.5" fill="#472f1e" stroke="#160d07" stroke-width="1"/>
                <rect x="${bR - 1}" y="219" width="${w + 3}" height="7" rx="1.5" fill="#472f1e" stroke="#160d07" stroke-width="1"/>

                <line x1="${bL - 3}" y1="269" x2="${bL + w - 1}" y2="269" stroke="#110904" stroke-width="2.5"/>
                <line x1="${bR + 1}" y1="269" x2="${bR + w + 3}" y2="269" stroke="#110904" stroke-width="2.5"/>
            </g>
        `;
    }

    static renderNeck(visuals) {
        return `
            <g id="char-neck">
                <path d="M112,68 L128,68 L131,94 L109,94 Z" fill="${visuals.skinColor}"/>
                <path d="M112,74 Q120,78 128,74 L129,80 Q120,83 111,80 Z" fill="#1b120c" opacity="0.18"/>
            </g>
        `;
    }

    static renderTorso(visuals, classId, isFemale) {
        const sL = isFemale ? 90 : 86;
        const sR = isFemale ? 150 : 154;
        const wL = isFemale ? 101 : 98;
        const wR = isFemale ? 139 : 142;

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
                <path d="${sL + 2},96 Q120,106 ${sR - 2},96 L${sR - 6},116 Q120,126 ${sL + 6},116 Z" fill="#292033"/>
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

    static renderLeftArm(visuals, classId, isFemale) {
        const sX = isFemale ? 90 : 86;

        let weaponSvg = '';
        if (classId === 'warrior') {
            weaponSvg = `
                <g transform="translate(68, 145)">
                    <circle cx="0" cy="0" r="18" fill="#473423" stroke="#21150c" stroke-width="2"/>
                    <circle cx="0" cy="0" r="6" fill="#696259" stroke="#21150c" stroke-width="1.2"/>
                </g>
            `;
        } else if (classId === 'rogue') {
            weaponSvg = `
                <g transform="translate(68, 142)">
                    <path d="M-2,6 Q-6,28 0,48 L4,48 Q0,28 4,6 Z" fill="#88939c" stroke="#20252a" stroke-width="1"/>
                    <rect x="-5" y="16" width="10" height="3" fill="#2b231c"/>
                </g>
            `;
        } else if (classId === 'ranger') {
            weaponSvg = `
                <g transform="translate(64, 86)">
                    <path d="M12,10 Q-6,68 12,126" stroke="#4a3321" stroke-width="3" fill="none" stroke-linecap="round"/>
                    <line x1="12" y1="10" x2="12" y2="126" stroke="#d5dbdb" stroke-width="1"/>
                </g>
            `;
        }

        return `
            <g id="char-left-arm">
                <path d="M${sX + 4},96 L${sX - 6},124 L${sX - 14},150 L${sX - 6},152 L${sX + 2},126 L${sX + 8},98 Z" fill="${visuals.skinColor}" stroke="#1c140d" stroke-width="0.8"/>
                <path d="M${sX + 5},96 L${sX - 5},120 L${sX + 3},122 L${sX + 9},98 Z" fill="${visuals.outfitColor}" stroke="#1c140d" stroke-width="1"/>
                <circle cx="${sX - 10}" cy="150" r="5.5" fill="${visuals.skinColor}" stroke="#1c140d" stroke-width="0.8"/>
                ${weaponSvg}
            </g>
        `;
    }

    static renderRightArm(visuals, classId, isFemale) {
        const sX = isFemale ? 150 : 154;

        let weaponSvg = '';
        if (classId === 'warrior') {
            weaponSvg = `
                <g transform="translate(${sX + 10}, 66)">
                    <rect x="-2" y="0" width="4" height="80" fill="#a4afba" stroke="#31373e" stroke-width="1"/>
                    <rect x="-10" y="80" width="20" height="4.5" rx="1" fill="#4d4640" stroke="#1f1b17" stroke-width="0.8"/>
                    <rect x="-1.5" y="84.5" width="3" height="15" fill="#2d1e13"/>
                    <circle cx="0" cy="101" r="3.5" fill="#4d4640"/>
                </g>
            `;
        } else if (classId === 'rogue') {
            weaponSvg = `
                <g transform="translate(${sX + 10}, 142) scale(-1, 1)">
                    <path d="M-2,6 Q-6,28 0,48 L4,48 Q0,28 4,6 Z" fill="#88939c" stroke="#20252a" stroke-width="1"/>
                    <rect x="-5" y="16" width="10" height="3" fill="#2b231c"/>
                </g>
            `;
        } else if (classId === 'mage') {
            weaponSvg = `
                <g transform="translate(${sX + 10}, 56)">
                    <rect x="-2" y="0" width="4.5" height="195" fill="#422f20" rx="2" stroke="#1c1209" stroke-width="1"/>
                    <path d="-5,0 Q-8,-12 0,-16 Q8,-12 5,0 Z" fill="#5e442f"/>
                    <circle cx="0" cy="-6" r="3.5" fill="#78c9e6" opacity="0.9"/>
                </g>
            `;
        }

        return `
            <g id="char-right-arm">
                <path d="M${sX - 4},96 L${sX + 6},124 L${sX + 14},150 L${sX + 6},152 L${sX - 2},126 L${sX - 8},98 Z" fill="${visuals.skinColor}" stroke="#1c140d" stroke-width="0.8"/>
                <path d="M${sX - 5},96 L${sX + 5},120 L${sX - 3},122 L${sX - 9},98 Z" fill="${visuals.outfitColor}" stroke="#1c140d" stroke-width="1"/>
                ${weaponSvg}
                <circle cx="${sX + 10}" cy="150" r="5.5" fill="${visuals.skinColor}" stroke="#1c140d" stroke-width="0.8"/>
            </g>
        `;
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
                <path d="${eyeLX - 4},${eyeY - 2} Q${eyeLX},${eyeY - 4} ${eyeLX + 4},${eyeY - 2}" stroke="#1c120c" stroke-width="1.3" fill="none"/>
                <path d="${eyeRX - 4},${eyeY - 2} Q${eyeRX},${eyeY - 4} ${eyeRX + 4},${eyeY - 2}" stroke="#1c120c" stroke-width="1.3" fill="none"/>
            `;
        }

        const lipColor = isFemale ? '#9e4343' : '#633322';
        const mouthSvg = `
            <path d="M116,66 Q120,68 124,66" stroke="${lipColor}" stroke-width="${isFemale ? 1.6 : 1.2}" fill="none" stroke-linecap="round"/>
        `;

        let beardSvg = '';
        if (!isFemale) {
            if (visuals.beard === 'stubble') {
                beardSvg = `
                    <path d="M104,62 C104,76 110,78 120,78 C130,78 136,76 136,62 C134,71 128,76 120,76 C112,76 106,71 104,62 Z" fill="${visuals.hairColor}" opacity="0.45"/>
                    <path d="M115,63 Q120,65 125,63" stroke="${visuals.hairColor}" stroke-width="1.3" opacity="0.45" fill="none"/>
                `;
            } else if (visuals.beard === 'full') {
                beardSvg = `
                    <path d="M103,60 C101,78 107,96 120,99 C133,96 139,78 137,60 C133,72 128,79 120,79 C112,79 107,72 103,60 Z" fill="${visuals.hairColor}"/>
                    <path d="M113,63 Q120,66 127,63 Q120,64 113,63 Z" fill="${visuals.hairColor}"/>
                `;
            } else if (visuals.beard === 'goatee') {
                beardSvg = `
                    <path d="M116,70 L124,70 L122,88 L118,88 Z" fill="${visuals.hairColor}"/>
                    <path d="M114,63 Q120,66 126,63" stroke="${visuals.hairColor}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
                `;
            } else if (visuals.beard === 'braided') {
                beardSvg = `
                    <path d="M103,60 C101,74 107,90 120,92 C133,90 139,74 137,60 C133,71 128,78 120,78 C112,78 107,71 103,60 Z" fill="${visuals.hairColor}"/>
                    <path d="M117,92 L117,112 L123,112 L123,92 Z" fill="${visuals.hairColor}"/>
                    <rect x="116" y="100" width="8" height="3" fill="#8c7760" rx="1"/>
                `;
            }
        }

        return `
            <g id="char-face">
                <ellipse cx="${eyeLX}" cy="${eyeY}" rx="3" ry="2" fill="#ffffff"/>
                <ellipse cx="${eyeRX}" cy="${eyeY}" rx="3" ry="2" fill="#ffffff"/>
                <circle cx="${eyeLX}" cy="${eyeY}" r="1.5" fill="${visuals.eyeColor}"/>
                <circle cx="${eyeRX}" cy="${eyeY}" r="1.5" fill="${visuals.eyeColor}"/>
                <circle cx="${eyeLX + 0.5}" cy="${eyeY - 0.5}" r="0.5" fill="#ffffff"/>
                <circle cx="${eyeRX + 0.5}" cy="${eyeY - 0.5}" r="0.5" fill="#ffffff"/>

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
        if (isFemale) {
            if (visuals.accessory === 'earrings') {
                return `
                    <circle cx="102" cy="54" r="1.8" fill="#d4af37"/>
                    <circle cx="138" cy="54" r="1.8" fill="#d4af37"/>
                `;
            } else if (visuals.accessory === 'circlet') {
                return `
                    <path d="M102,36 Q120,42 138,36" stroke="#d4af37" stroke-width="2" fill="none"/>
                    <polygon points="120,36 118,42 122,42" fill="#7ec8e3"/>
                `;
            }
        }

        if (visuals.accessory === 'scar') {
            return `
                <line x1="108" y1="42" x2="113" y2="59" stroke="#6e1616" stroke-width="1.8" stroke-linecap="round"/>
                <line x1="107" y1="48" x2="112" y2="50" stroke="#6e1616" stroke-width="1"/>
            `;
        } else if (visuals.accessory === 'eyepatch') {
            return `
                <line x1="101" y1="44" x2="137" y2="52" stroke="#1c1917" stroke-width="1.8"/>
                <polygon points="108,45 116,47 114,55 107,53" fill="#1c1917"/>
            `;
        } else if (visuals.accessory === 'mask') {
            return `
                <path d="M105,57 L135,57 L130,79 L120,83 L110,79 Z" fill="#24232b" stroke="#131217" stroke-width="1.2"/>
            `;
        } else if (visuals.accessory === 'monocle') {
            return `
                <circle cx="128" cy="49" r="4.5" stroke="#998159" stroke-width="1.5" fill="none"/>
                <line x1="132" y1="51" x2="137" y2="64" stroke="#998159" stroke-width="1"/>
            `;
        } else if (visuals.accessory === 'warpaint') {
            return `
                <polygon points="104,54 110,57 106,60" fill="#8f1d1d"/>
                <polygon points="136,54 130,57 134,60" fill="#8f1d1d"/>
            `;
        }
        return '';
    }

    static renderHairBack(visuals, isFemale) {
        if (isFemale) {
            if (visuals.hairStyle === 'long') {
                return `
                    <path d="M96,44 C92,16 148,16 144,44 C154,88 150,145 136,160 C130,130 144,90 140,54 C132,30 108,30 100,54 C96,90 110,130 104,160 C90,145 86,88 96,44 Z" fill="${visuals.hairColor}"/>
                `;
            } else if (visuals.hairStyle === 'ponytail') {
                return `
                    <path d="M120,24 Q148,28 150,88 Q142,98 136,80 Q135,44 120,30 Z" fill="${visuals.hairColor}"/>
                    <circle cx="126" cy="28" r="2.5" fill="#4d4239"/>
                `;
            } else if (visuals.hairStyle === 'braids') {
                return `
                    <path d="M102,48 L96,145 L104,145 L108,48 Z" fill="${visuals.hairColor}"/>
                    <path d="M138,48 L144,145 L136,145 L132,48 Z" fill="${visuals.hairColor}"/>
                    <rect x="96" y="137" width="8" height="2.5" fill="#d4af37"/>
                    <rect x="136" y="137" width="8" height="2.5" fill="#d4af37"/>
                `;
            }
        } else {
            if (visuals.hairStyle === 'long') {
                return `
                    <path d="M96,44 C92,16 148,16 144,44 C152,86 148,140 134,150 C130,125 142,90 138,56 C130,32 110,32 102,56 C98,90 110,125 106,150 C92,140 88,86 96,44 Z" fill="${visuals.hairColor}"/>
                `;
            } else if (visuals.hairStyle === 'ponytail') {
                return `
                    <path d="M120,26 Q146,30 148,86 Q140,96 135,78 Q133,46 120,32 Z" fill="${visuals.hairColor}"/>
                    <circle cx="124" cy="30" r="2.5" fill="#4d4239"/>
                `;
            }
        }
        return '';
    }

    static renderHairFront(visuals, isFemale) {
        if (visuals.hairStyle === 'bald') {
            return `
                <ellipse cx="120" cy="32" rx="10" ry="3" fill="#ffffff" opacity="0.12"/>
            `;
        }

        if (isFemale) {
            if (visuals.hairStyle === 'bob') {
                return `
                    <path d="M98,52 Q94,14 120,14 Q146,14 142,52 C145,68 141,78 137,80 C136,66 138,48 132,40 C124,34 116,34 108,40 C102,48 104,66 103,80 C99,78 95,68 98,52 Z" fill="${visuals.hairColor}"/>
                `;
            } else if (visuals.hairStyle === 'long') {
                return `
                    <path d="M98,50 Q94,14 120,14 Q146,14 142,50 C143,62 139,66 134,68 C135,54 136,44 128,38 Q120,34 112,38 C104,44 105,54 106,68 C101,66 97,62 98,50 Z" fill="${visuals.hairColor}"/>
                `;
            } else if (visuals.hairStyle === 'ponytail') {
                return `
                    <path d="M98,52 Q94,14 120,14 Q146,14 142,52 C138,40 102,40 98,52 Z" fill="${visuals.hairColor}"/>
                `;
            } else if (visuals.hairStyle === 'braids') {
                return `
                    <path d="M98,50 Q94,14 120,14 Q146,14 142,50 C136,36 104,36 98,50 Z" fill="${visuals.hairColor}"/>
                `;
            } else if (visuals.hairStyle === 'pixie') {
                return `
                    <path d="M98,52 Q94,14 120,14 Q146,14 142,52 C141,44 136,40 128,38 L124,44 L118,36 C108,36 102,42 98,52 Z" fill="${visuals.hairColor}"/>
                `;
            }
        } else {
            if (visuals.hairStyle === 'short') {
                return `
                    <path d="M98,54 Q94,14 120,14 Q146,14 142,54 C143,60 141,66 139,68 C138,58 138,44 130,40 Q122,36 116,42 L112,38 C104,38 101,48 101,68 C99,66 97,60 98,54 Z" fill="${visuals.hairColor}"/>
                `;
            } else if (visuals.hairStyle === 'long') {
                return `
                    <path d="M98,50 Q94,14 120,14 Q146,14 142,50 C143,62 139,66 134,68 C135,54 136,44 128,38 Q120,34 112,38 C104,44 105,54 106,68 C101,66 97,62 98,50 Z" fill="${visuals.hairColor}"/>
                `;
            } else if (visuals.hairStyle === 'mohawk') {
                return `
                    <path d="M115,4 L125,4 L123,42 L117,42 Z" fill="${visuals.hairColor}"/>
                    <polygon points="113,8 120,-2 125,8" fill="${visuals.hairColor}"/>
                `;
            } else if (visuals.hairStyle === 'ponytail') {
                return `
                    <path d="M98,52 Q94,14 120,14 Q146,14 142,52 C138,40 102,40 98,52 Z" fill="${visuals.hairColor}"/>
                `;
            }
        }
        return '';
    }
}