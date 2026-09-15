export class NpcRenderer {
    static render(config, width = '100%', height = '100%') {
        const role = config.role || 'civilian';
        const isFemale = config.gender === 'female';
        const uid = config.id || 'default';

        return `
            <svg viewBox="0 0 240 320" width="${width}" height="${height}" class="npc-rendered-figure" data-npc-id="${uid}">
                <defs>
                    <radialGradient id="npcPedestal_${uid}" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#3d2817" stop-opacity="0.8"/>
                        <stop offset="100%" stop-color="#120e0a" stop-opacity="0"/>
                    </radialGradient>

                    <radialGradient id="holyAuraGlow_${uid}" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#fde047" stop-opacity="0.8"/>
                        <stop offset="70%" stop-color="#38bdf8" stop-opacity="0.2"/>
                        <stop offset="100%" stop-color="#000" stop-opacity="0"/>
                    </radialGradient>

                    <filter id="npc-outline_${uid}" x="-15%" y="-15%" width="130%" height="130%">
                        <feMorphology in="SourceAlpha" result="dilated" operator="dilate" radius="1.3"/>
                        <feFlood flood-color="#0e0c0a" result="outlineColor"/>
                        <feComposite in="outlineColor" in2="dilated" operator="in" result="outline"/>
                        <feMerge>
                            <feMergeNode in="outline"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                ${config.headwear === 'halo' ? `<circle cx="120" cy="40" r="34" fill="url(#holyAuraGlow_${uid})"/>` : ''}

                <ellipse cx="120" cy="274" rx="50" ry="9" fill="url(#npcPedestal_${uid})"/>
                <ellipse cx="120" cy="274" rx="34" ry="5" fill="#090807" opacity="0.9"/>

                <g filter="url(#npc-outline_${uid})">
                    ${this.renderHairBack(config, isFemale)}
                    ${this.renderPantsAndBoots(config, isFemale)}
                    ${this.renderNeck(config, isFemale)}
                    ${this.renderBodyAndOutfit(config, role, isFemale)}
                    ${this.renderArmsAndHands(config, role, isFemale)}
                    ${this.renderHead(config, isFemale)}
                    ${this.renderFace(config, isFemale)}
                    ${this.renderFacialDetails(config)}
                    ${this.renderHairAndHeadwear(config, isFemale)}
                </g>
            </svg>
        `;
    }

    static renderBust(config) {
        const role = config.role || 'civilian';
        const isFemale = config.gender === 'female';

        return `
            <svg viewBox="86 14 68 92" width="100%" height="100%">
                <defs>
                    <radialGradient id="npcBustBg" cx="50%" cy="40%" r="60%">
                        <stop offset="0%" stop-color="#2a1d15"/>
                        <stop offset="100%" stop-color="#120d09"/>
                    </radialGradient>
                </defs>
                <rect x="86" y="14" width="68" height="92" fill="url(#npcBustBg)"/>
                ${this.renderHairBack(config, isFemale)}
                ${this.renderNeck(config, isFemale)}
                ${this.renderBodyAndOutfit(config, role, isFemale)}
                ${this.renderHead(config, isFemale)}
                ${this.renderFace(config, isFemale)}
                ${this.renderFacialDetails(config)}
                ${this.renderHairAndHeadwear(config, isFemale)}
            </svg>
        `;
    }

    static renderHairBack(config, isFemale) {
        if (config.hairStyle === 'long' || config.hairStyle === 'braids') {
            return `
                <path d="M96,44 C92,16 148,16 144,44 C154,88 150,145 136,160 C130,130 144,90 140,54 C132,30 108,30 100,54 C96,90 110,130 104,160 C90,145 86,88 96,44 Z" fill="${config.hairColor}"/>
            `;
        }
        return '';
    }

    static renderPantsAndBoots(config, isFemale) {
        const legW = isFemale ? 14 : 16;
        const leftX = isFemale ? 104 : 100;
        const rightX = isFemale ? 122 : 122;

        return `
            <g id="npc-legs">
                <path d="M${leftX},150 L${leftX + legW},150 L${leftX + legW - 2},230 L${leftX - 2},230 Z" fill="#383129" stroke="#1c1813" stroke-width="1.2"/>
                <path d="M${rightX},150 L${rightX + legW},150 L${rightX + legW + 2},230 L${rightX + 2},230 Z" fill="#423a31" stroke="#1c1813" stroke-width="1.2"/>
                <path d="M${leftX + legW},150 L120,165 L${rightX},150 Z" fill="#241f19"/>

                <path d="M${leftX - 4},222 L${leftX + legW + 2},222 L${leftX + legW},272 L${leftX - 6},272 Z" fill="#24170d" stroke="#120a05" stroke-width="1.2"/>
                <path d="M${rightX - 2},222 L${rightX + legW + 4},222 L${rightX + legW + 6},272 L${rightX},272 Z" fill="#24170d" stroke="#120a05" stroke-width="1.2"/>
                <rect x="${leftX - 5}" y="220" width="${legW + 7}" height="7" rx="1.5" fill="#382415" stroke="#120a05" stroke-width="1"/>
                <rect x="${rightX - 3}" y="220" width="${legW + 7}" height="7" rx="1.5" fill="#382415" stroke="#120a05" stroke-width="1"/>
                <line x1="${leftX - 6}" y1="271" x2="${leftX + legW}" y2="271" stroke="#0a0502" stroke-width="2.5"/>
                <line x1="${rightX}" y1="271" x2="${rightX + legW + 6}" y2="271" stroke="#0a0502" stroke-width="2.5"/>
            </g>
        `;
    }

    static renderNeck(config, isFemale) {
        const neckW = isFemale ? 16 : 18;
        return `
            <path d="M${120 - neckW / 2},68 L${120 + neckW / 2},68 L132,96 L108,96 Z" fill="${config.skinColor}"/>
            <path d="M112,75 Q120,79 128,75 L129,81 Q120,84 111,81 Z" fill="#1b120c" opacity="0.2"/>
        `;
    }

    static renderBodyAndOutfit(config, role, isFemale) {
        const sL = isFemale ? 88 : 84;
        const sR = isFemale ? 152 : 156;
        const wL = isFemale ? 101 : 96;
        const wR = isFemale ? 139 : 144;

        if (role === 'priestess') {
            return `
                <g id="npc-priestess-clothes">
                    <path d="M${sL},94 Q120,88 ${sR},94 L156,245 L84,245 Z" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
                    <path d="M106,94 L134,94 L130,245 L110,245 Z" fill="#0284c7"/>
                    <path d="M116,94 L124,94 L122,245 L118,245 Z" fill="#facc15"/>
                    <path d="M${sL},94 Q120,105 ${sR},94 L150,122 Q120,132 90,122 Z" fill="#0284c7"/>
                    <line x1="${sL}" y1="94" x2="150" y2="122" stroke="#facc15" stroke-width="2"/>
                    <line x1="${sR}" y1="94" x2="90" y2="122" stroke="#facc15" stroke-width="2"/>
                    <circle cx="120" cy="118" r="6" fill="#facc15" stroke="#78350f" stroke-width="1"/>
                </g>
            `;
        } else if (role === 'blacksmith') {
            return `
                <g id="npc-blacksmith-clothes">
                    <path d="M${sL},94 Q120,86 ${sR},94 L144,162 L96,162 Z" fill="#292524" stroke="#1c1917" stroke-width="1.2"/>
                    <path d="M112,90 L120,98 L128,90" stroke="#1c1917" stroke-width="1.5" fill="none"/>
                    <path d="M102,96 L138,96 L143,222 L97,222 Z" fill="#451a03" stroke="#240c01" stroke-width="1.5"/>
                    <line x1="104" y1="96" x2="114" y2="86" stroke="#240c01" stroke-width="2.5"/>
                    <line x1="136" y1="96" x2="126" y2="86" stroke="#240c01" stroke-width="2.5"/>
                    <rect x="94" y="156" width="52" height="8" fill="#1c0f05"/>
                    <rect x="116" y="155" width="8" height="10" fill="#78350f"/>
                    <rect x="102" y="174" width="16" height="18" fill="#2e1102" rx="2" stroke="#1c0f05" stroke-width="0.8"/>
                    <line x1="106" y1="170" x2="106" y2="180" stroke="#94a3b8" stroke-width="1.5"/>
                </g>
            `;
        } else if (role === 'innkeeper') {
            return `
                <g id="npc-innkeeper-clothes">
                    <path d="M${sL},94 Q120,86 ${sR},94 L144,162 L96,162 Z" fill="#d6cfc7" stroke="#2b231c" stroke-width="1.2"/>
                    <path d="M110,90 Q120,98 130,90" stroke="#2b231c" stroke-width="1.8" fill="none"/>
                    <path d="M102,96 L138,96 L142,168 L98,168 Z" fill="#52321c" stroke="#26150b" stroke-width="1.2"/>
                    <path d="M96,168 L144,168 L147,215 L93,215 Z" fill="#52321c" stroke="#26150b" stroke-width="1.2"/>
                    <path d="M108,88 Q120,82 132,88" stroke="#3b2111" stroke-width="3" fill="none"/>
                    <rect x="94" y="162" width="52" height="7" fill="#301a0d"/>
                    <rect x="116" y="161" width="8" height="9" fill="#92400e" rx="1"/>
                    <path d="M132,168 L142,168 L140,200 L130,200 Z" fill="#f1f5f9" stroke="#94a3b8" stroke-width="0.8"/>
                </g>
            `;
        } else if (role === 'merchant') {
            return `
                <g id="npc-merchant-clothes">
                    <path d="M${sL},94 Q120,86 ${sR},94 L150,225 L90,225 Z" fill="#881337" stroke="#4c0519" stroke-width="1.4"/>
                    <path d="M112,92 L128,92 L124,225 L116,225 Z" fill="#facc15"/>
                    <path d="M98,96 L142,96 L138,155 L102,155 Z" fill="#4c0519"/>
                    <rect x="92" y="152" width="56" height="8" fill="#d97706"/>
                    <circle cx="120" cy="156" r="4" fill="#fef08a"/>
                </g>
            `;
        } else if (role === 'captain') {
            return `
                <g id="npc-captain-armor">
                    <path d="M${sL},94 L${sR},94 L${wR},162 L${wL},162 Z" fill="#1e3a8a" stroke="#0f172a" stroke-width="1.5"/>
                    <rect x="100" y="96" width="40" height="66" rx="4" fill="#64748b" stroke="#1e293b" stroke-width="1.5"/>
                    <path d="M106,98 L134,98 L128,140 L120,150 L112,140 Z" fill="#facc15" opacity="0.85"/>
                    <circle cx="92" cy="100" r="14" fill="#475569" stroke="#1e293b" stroke-width="1.5"/>
                    <circle cx="148" cy="100" r="14" fill="#475569" stroke="#1e293b" stroke-width="1.5"/>
                    <rect x="94" y="158" width="52" height="8" rx="2" fill="#0f172a" stroke="#ca8a04" stroke-width="1"/>
                    <rect x="116" y="157" width="8" height="10" fill="#facc15"/>
                </g>
            `;
        } else if (role === 'guard') {
            return `
                <g id="npc-guard-armor">
                    <path d="M${sL},94 L${sR},94 L${wR},162 L${wL},162 Z" fill="#334155" stroke="#1e293b" stroke-width="1.5"/>
                    <rect x="102" y="98" width="36" height="64" rx="3" fill="#475569" stroke="#1e293b" stroke-width="1.2"/>
                    <rect x="94" y="158" width="52" height="8" rx="2" fill="#1e293b" stroke="#ca8a04" stroke-width="1"/>
                    <rect x="116" y="157" width="8" height="10" fill="#cbd5e1"/>
                    <line x1="98" y1="98" x2="138" y2="158" stroke="#78350f" stroke-width="2.5"/>
                    <line x1="138" y1="98" x2="98" y2="158" stroke="#78350f" stroke-width="2.5"/>
                </g>
            `;
        }

        return `
            <path d="M${sL},94 L${sR},94 L${wR},162 L${wL},162 Z" fill="${config.outfitColor || '#3b281c'}" stroke="#1f140e" stroke-width="1.2"/>
        `;
    }

    static renderArmsAndHands(config, role, isFemale) {
        if (role === 'priestess') {
            return `
                <g id="npc-priestess-arms">
                    <path d="M90,96 L78,135 L86,137 L96,98 Z" fill="#f8fafc" stroke="#94a3b8" stroke-width="1"/>
                    <path d="M78,135 L108,150 L114,144 L86,137 Z" fill="#f8fafc" stroke="#94a3b8" stroke-width="1"/>

                    <path d="M150,96 L162,135 L154,137 L144,98 Z" fill="#f8fafc" stroke="#94a3b8" stroke-width="1"/>
                    <path d="M162,135 L132,150 L126,144 L154,137 Z" fill="#f8fafc" stroke="#94a3b8" stroke-width="1"/>

                    <g transform="translate(112, 134)">
                        <polygon points="4,2 12,2 14,14 2,14" fill="#facc15" stroke="#78350f" stroke-width="1"/>
                        <rect x="7" y="14" width="2" height="8" fill="#facc15"/>
                        <ellipse cx="8" cy="22" rx="5" ry="2" fill="#facc15"/>
                        <ellipse cx="8" cy="2" rx="4" ry="1.5" fill="#38bdf8"/>
                        <circle cx="2" cy="10" r="4" fill="${config.skinColor}"/>
                        <circle cx="14" cy="10" r="4" fill="${config.skinColor}"/>
                    </g>
                </g>
            `;
        } else if (role === 'blacksmith') {
            return `
                <g id="npc-blacksmith-arms">
                    <path d="M88,96 L76,116 L84,118 L94,98 Z" fill="#292524" stroke="#1c1917" stroke-width="1"/>
                    <rect x="74" y="114" width="10" height="5" fill="#44403c" rx="1"/>
                    <path d="M78,118 L68,148 L78,150 L86,120 Z" fill="${config.skinColor}" stroke="#1c140d" stroke-width="0.8"/>
                    <g transform="translate(60, 136)">
                        <line x1="8" y1="4" x2="4" y2="40" stroke="#64748b" stroke-width="3"/>
                        <line x1="14" y1="4" x2="16" y2="40" stroke="#64748b" stroke-width="3"/>
                        <circle cx="11" cy="16" r="3" fill="#334155"/>
                        <circle cx="10" cy="14" r="6" fill="${config.skinColor}" stroke="#1c140d" stroke-width="0.8"/>
                    </g>
                    <path d="M152,96 L164,116 L156,118 L146,98 Z" fill="#292524" stroke="#1c1917" stroke-width="1"/>
                    <rect x="156" y="114" width="10" height="5" fill="#44403c" rx="1"/>
                    <path d="M162,118 L172,148 L162,150 L154,120 Z" fill="${config.skinColor}" stroke="#1c140d" stroke-width="0.8"/>
                    <circle cx="168" cy="150" r="6.5" fill="${config.skinColor}" stroke="#1c140d" stroke-width="0.8"/>
                </g>
            `;
        } else if (role === 'innkeeper') {
            return `
                <g id="npc-innkeeper-arms">
                    <path d="M88,96 L76,120 L78,122 L92,98 Z" fill="#d6cfc7" stroke="#2b231c" stroke-width="1"/>
                    <rect x="74" y="118" width="8" height="4" fill="#a8a29e" rx="1"/>
                    <path d="M76,122 L66,150 L74,152 L82,124 Z" fill="${config.skinColor}" stroke="#1c140d" stroke-width="0.8"/>
                    <g transform="translate(54, 138)">
                        <rect x="0" y="4" width="18" height="24" rx="3" fill="#78350f" stroke="#3b1704" stroke-width="1.5"/>
                        <path d="M18,9 Q24,14 18,21" stroke="#3b1704" stroke-width="2.5" fill="none"/>
                        <path d="M-2,4 Q9,-3 20,4 Z" fill="#fef08a"/>
                        <circle cx="8" cy="16" r="5.5" fill="${config.skinColor}" stroke="#1c140d" stroke-width="0.8"/>
                    </g>
                    <path d="M152,96 L164,120 L162,122 L148,98 Z" fill="#d6cfc7" stroke="#2b231c" stroke-width="1"/>
                    <rect x="158" y="118" width="8" height="4" fill="#a8a29e" rx="1"/>
                    <path d="M162,122 L172,150 L164,152 L156,124 Z" fill="${config.skinColor}" stroke="#1c140d" stroke-width="0.8"/>
                    <circle cx="170" cy="152" r="5.5" fill="${config.skinColor}" stroke="#1c140d" stroke-width="0.8"/>
                </g>
            `;
        } else if (role === 'merchant') {
            return `
                <g id="npc-merchant-arms">
                    <path d="M88,96 L74,130 L82,132 L94,98 Z" fill="#881337" stroke="#4c0519" stroke-width="1"/>
                    <path d="M74,130 L66,155 L74,157 L82,132 Z" fill="${config.skinColor}" stroke="#1c140d" stroke-width="0.8"/>
                    <g transform="translate(56, 145)">
                        <circle cx="8" cy="12" r="7" fill="#b45309" stroke="#78350f" stroke-width="1"/>
                        <circle cx="8" cy="4" r="3" fill="#facc15"/>
                    </g>
                    <path d="M152,96 L166,130 L158,132 L146,98 Z" fill="#881337" stroke="#4c0519" stroke-width="1"/>
                    <path d="M166,130 L174,155 L166,157 L158,132 Z" fill="${config.skinColor}" stroke="#1c140d" stroke-width="0.8"/>
                    <circle cx="172" cy="155" r="5" fill="${config.skinColor}"/>
                    <circle cx="173" cy="155" r="2" fill="#facc15"/>
                </g>
            `;
        } else if (role === 'captain' || role === 'guard') {
            return `
                <g id="npc-guard-arms">
                    <path d="M88,96 L76,125 L84,127 L94,98 Z" fill="#475569" stroke="#1e293b" stroke-width="1.2"/>
                    <rect x="74" y="122" width="10" height="5" fill="#334155" rx="1"/>
                    <path d="M78,126 L72,152 L80,154 L86,128 Z" fill="#64748b" stroke="#1e293b" stroke-width="1"/>
                    <circle cx="76" cy="154" r="6" fill="#334155"/>

                    <path d="M152,96 L164,125 L156,127 L146,98 Z" fill="#475569" stroke="#1e293b" stroke-width="1.2"/>
                    <rect x="156" y="122" width="10" height="5" fill="#334155" rx="1"/>
                    <path d="M162,126 L168,152 L160,154 L154,128 Z" fill="#64748b" stroke="#1e293b" stroke-width="1"/>
                    <circle cx="164" cy="154" r="6" fill="#334155"/>
                </g>
            `;
        }
        return '';
    }

    static renderHead(config, isFemale) {
        const headW = isFemale ? 17 : 19;
        const chinY = isFemale ? 76 : 78;

        return `
            <g id="npc-head-base">
                <ellipse cx="${120 - headW}" cy="52" rx="2.5" ry="4" fill="${config.skinColor}" stroke="#1b120c" stroke-width="0.8"/>
                <ellipse cx="${120 + headW}" cy="52" rx="2.5" ry="4" fill="${config.skinColor}" stroke="#1b120c" stroke-width="0.8"/>
                <path d="M${120 - headW},48 Q${120 - headW},${chinY - 2} 120,${chinY} Q${120 + headW},${chinY - 2} ${120 + headW},48 Q${120 + headW},26 120,26 Q${120 - headW},26 ${120 - headW},48 Z" fill="${config.skinColor}"/>
            </g>
        `;
    }

    static renderFace(config, isFemale) {
        const eyeLX = 112;
        const eyeRX = 128;
        const eyeY = isFemale ? 49 : 50;

        let eyelashesSvg = '';
        if (isFemale) {
            eyelashesSvg = `
                <path d="M${eyeLX - 4},${eyeY - 2} Q${eyeLX},${eyeY - 4} ${eyeLX + 4},${eyeY - 2}" stroke="#1c120c" stroke-width="1.4" fill="none"/>
                <path d="M${eyeRX - 4},${eyeY - 2} Q${eyeRX},${eyeY - 4} ${eyeRX + 4},${eyeY - 2}" stroke="#1c120c" stroke-width="1.4" fill="none"/>
            `;
        }

        const lipColor = isFemale ? '#be185d' : '#633322';
        const lipWidth = isFemale ? 1.8 : 1.4;

        let beardSvg = '';
        if (!isFemale) {
            if (config.beard === 'full') {
                beardSvg = `
                    <path d="M103,58 C100,78 106,98 120,102 C134,98 140,78 137,58 C133,72 128,80 120,80 C112,80 107,72 103,58 Z" fill="${config.hairColor}"/>
                    <path d="M112,62 Q120,66 128,62 Q120,64 112,62 Z" fill="${config.hairColor}"/>
                `;
            } else if (config.beard === 'braided') {
                beardSvg = `
                    <path d="M103,58 C100,74 106,92 120,95 C134,92 140,74 137,58 C133,70 128,78 120,78 C112,78 107,70 103,58 Z" fill="${config.hairColor}"/>
                    <path d="M117,95 L117,118 L123,118 L123,95 Z" fill="${config.hairColor}"/>
                    <rect x="116" y="102" width="8" height="3" fill="#d97706" rx="1"/>
                    <path d="M110,63 Q120,67 130,63" stroke="${config.hairColor}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                `;
            } else if (config.beard === 'goatee') {
                beardSvg = `
                    <path d="M116,70 L124,70 L121,90 L119,90 Z" fill="${config.hairColor}"/>
                    <path d="M112,64 Q120,67 128,64" stroke="${config.hairColor}" stroke-width="2" fill="none" stroke-linecap="round"/>
                `;
            }
        }

        return `
            <g id="npc-face">
                <ellipse cx="${eyeLX}" cy="${eyeY}" rx="3" ry="2" fill="#ffffff"/>
                <ellipse cx="${eyeRX}" cy="${eyeY}" rx="3" ry="2" fill="#ffffff"/>
                <circle cx="${eyeLX}" cy="${eyeY}" r="1.5" fill="${config.eyeColor || '#451a03'}"/>
                <circle cx="${eyeRX}" cy="${eyeY}" r="1.5" fill="${config.eyeColor || '#451a03'}"/>
                <circle cx="${eyeLX + 0.5}" cy="${eyeY - 0.5}" r="0.5" fill="#ffffff"/>
                <circle cx="${eyeRX + 0.5}" cy="${eyeY - 0.5}" r="0.5" fill="#ffffff"/>
                ${eyelashesSvg}
                <path d="M108,44 Q112,42 116,45" stroke="#1c120c" stroke-width="${isFemale ? 1.2 : 1.6}" fill="none" stroke-linecap="round"/>
                <path d="M132,44 Q128,42 124,45" stroke="#1c120c" stroke-width="${isFemale ? 1.2 : 1.6}" fill="none" stroke-linecap="round"/>
                <path d="M119,53 L121,59 L118,60" stroke="#875338" stroke-width="1.2" fill="none"/>
                <path d="M116,66 Q120,69 124,66" stroke="${lipColor}" stroke-width="${lipWidth}" fill="none" stroke-linecap="round"/>
                ${beardSvg}
            </g>
        `;
    }

    static renderFacialDetails(config) {
        let details = '';

        if (config.accessory === 'soot') {
            details += `
                <circle cx="108" cy="46" r="4" fill="#0f172a" opacity="0.35"/>
                <circle cx="132" cy="56" r="5" fill="#0f172a" opacity="0.3"/>
                <circle cx="118" cy="40" r="3" fill="#0f172a" opacity="0.4"/>
            `;
        } else if (config.accessory === 'scar') {
            details += `
                <line x1="108" y1="42" x2="114" y2="58" stroke="#6e1616" stroke-width="1.8" stroke-linecap="round"/>
                <line x1="107" y1="48" x2="113" y2="50" stroke="#6e1616" stroke-width="1"/>
            `;
        } else if (config.accessory === 'runes') {
            details += `
                <path d="M106,46 L108,52 L105,55" stroke="#38bdf8" stroke-width="1.2" fill="none"/>
                <path d="M134,46 L132,52 L135,55" stroke="#38bdf8" stroke-width="1.2" fill="none"/>
            `;
        }

        if (config.eyewear === 'spectacles') {
            details += `
                <circle cx="112" cy="50" r="4.5" stroke="#d97706" stroke-width="1.2" fill="none"/>
                <circle cx="128" cy="50" r="4.5" stroke="#d97706" stroke-width="1.2" fill="none"/>
                <line x1="116.5" y1="50" x2="123.5" y2="50" stroke="#d97706" stroke-width="1.2"/>
            `;
        }

        return `<g id="npc-details">${details}</g>`;
    }

    static renderHairAndHeadwear(config, isFemale) {
        if (config.headwear === 'circlet' || config.headwear === 'halo') {
            let circlet = `
                <path d="M100,48 Q120,44 140,48" stroke="#facc15" stroke-width="2.5" fill="none"/>
                <polygon points="120,44 118,50 122,50" fill="#38bdf8"/>
            `;
            let hair = `
                <path d="M98,52 Q94,14 120,14 Q146,14 142,52 C145,68 141,78 137,80 C136,66 138,48 132,40 Q120,34 108,40 C102,48 104,66 103,80 C99,78 95,68 98,52 Z" fill="${config.hairColor}"/>
            `;
            return hair + circlet;
        }

        if (config.headwear === 'goggles') {
            return `
                <path d="M99,52 Q94,14 120,14 Q146,14 141,52 C143,58 137,44 130,40 Q122,36 116,42 L112,38 C104,38 101,48 101,66 C99,64 97,58 99,52 Z" fill="${config.hairColor}"/>
                <g id="smith-goggles" transform="translate(100, 24)">
                    <rect x="0" y="4" width="40" height="3" fill="#1c1917"/>
                    <circle cx="12" cy="5" r="7" fill="#334155" stroke="#78350f" stroke-width="2"/>
                    <circle cx="28" cy="5" r="7" fill="#334155" stroke="#78350f" stroke-width="2"/>
                    <circle cx="12" cy="5" r="4" fill="#38bdf8" opacity="0.6"/>
                    <circle cx="28" cy="5" r="4" fill="#38bdf8" opacity="0.6"/>
                </g>
            `;
        }

        if (config.headwear === 'turban') {
            return `
                <g id="npc-turban">
                    <ellipse cx="120" cy="30" rx="24" ry="16" fill="#991b1b" stroke="#4c0519" stroke-width="1.5"/>
                    <ellipse cx="120" cy="22" rx="16" ry="10" fill="#b91c1c"/>
                    <circle cx="120" cy="28" r="5" fill="#facc15" stroke="#78350f" stroke-width="1"/>
                    <circle cx="120" cy="28" r="2.5" fill="#0284c7"/>
                    <path d="M120,23 Q125,6 130,2" stroke="#f1f5f9" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                </g>
            `;
        }

        if (config.headwear === 'captain_helm') {
            return `
                <g id="npc-captain-helm">
                    <circle cx="120" cy="38" r="22" fill="#64748b" stroke="#1e293b" stroke-width="2"/>
                    <path d="M102,36 Q120,24 138,36 L134,50 Q120,44 106,50 Z" fill="#475569" stroke="#1e293b" stroke-width="1.5"/>
                    <path d="M100,38 Q120,32 140,38" stroke="#facc15" stroke-width="3" fill="none"/>
                    <path d="M120,18 Q128,-14 120,-24 Q112,-14 120,18" fill="#dc2626" stroke="#991b1b" stroke-width="1.5"/>
                    <path d="M122,18 Q134,-8 130,-18 Q122,-8 122,18" fill="#ef4444" opacity="0.8"/>
                    <path d="M118,18 Q106,-8 110,-18 Q118,-8 118,18" fill="#b91c1c" opacity="0.8"/>
                </g>
            `;
        }

        if (config.headwear === 'guard_helm') {
            return `
                <g id="npc-guard-helm">
                    <circle cx="120" cy="38" r="21" fill="#475569" stroke="#1e293b" stroke-width="2"/>
                    <path d="M100,40 L140,40 L136,50 L104,50 Z" fill="#334155" stroke="#1e293b" stroke-width="1.5"/>
                    <line x1="120" y1="36" x2="120" y2="52" stroke="#64748b" stroke-width="3"/>
                    <circle cx="120" cy="18" r="3" fill="#ca8a04"/>
                </g>
            `;
        }

        if (config.hairStyle === 'balding') {
            return `
                <path d="M99,48 C98,62 102,68 104,70 C103,60 102,52 106,46 Z" fill="${config.hairColor}"/>
                <path d="M141,48 C142,62 138,68 136,70 C137,60 138,52 134,46 Z" fill="${config.hairColor}"/>
                <ellipse cx="120" cy="32" rx="10" ry="3" fill="#ffffff" opacity="0.12"/>
            `;
        }

        return `
            <g id="npc-hair">
                <path d="M99,52 Q94,14 120,14 Q146,14 141,52 C143,58 141,64 139,66 C138,56 137,44 130,40 Q122,36 116,42 L112,38 C104,38 101,48 101,66 C99,64 97,58 99,52 Z" fill="${config.hairColor}"/>
            </g>
        `;
    }
}

export const NPC_CONFIGS = {
    varran: {
        id: 'varran',
        name: 'Капитан Варран',
        role: 'captain',
        gender: 'male',
        skinColor: '#d69f7e',
        hairStyle: 'short',
        hairColor: '#334155',
        beard: 'stubble',
        eyeColor: '#1e293b',
        headwear: 'captain_helm',
        accessory: 'scar',
        outfitColor: '#1e3a8a'
    },
    bran: {
        id: 'bran',
        name: 'Стражник Бран',
        role: 'guard',
        gender: 'male',
        skinColor: '#e0a984',
        hairStyle: 'short',
        hairColor: '#52321c',
        beard: 'none',
        eyeColor: '#451a03',
        headwear: 'guard_helm',
        accessory: 'none',
        outfitColor: '#334155'
    },
    brok: {
        id: 'brok',
        name: 'Брок «Медвежья Лапа»',
        role: 'innkeeper',
        gender: 'male',
        skinColor: '#d69f7e',
        hairStyle: 'short',
        hairColor: '#3a2114',
        beard: 'full',
        eyeColor: '#795548',
        accessory: 'scar',
        outfitColor: '#52321c'
    },
    rashid: {
        id: 'rashid',
        name: 'Рашид ибн Саид',
        role: 'merchant',
        gender: 'male',
        skinColor: '#b7784f',
        hairStyle: 'short',
        hairColor: '#1c1917',
        beard: 'goatee',
        eyeColor: '#1e293b',
        headwear: 'turban',
        accessory: 'none',
        outfitColor: '#881337'
    },
    torvald: {
        id: 'torvald',
        name: 'Торвальд Железнорук',
        role: 'blacksmith',
        gender: 'male',
        skinColor: '#bfa084',
        hairStyle: 'balding',
        hairColor: '#52525b',
        beard: 'braided',
        eyeColor: '#451a03',
        headwear: 'goggles',
        accessory: 'soot',
        outfitColor: '#292524'
    },
    elysia: {
        id: 'elysia',
        name: 'Верховная жрица Элисия',
        role: 'priestess',
        gender: 'female',
        skinColor: '#fce7d2',
        hairStyle: 'long',
        hairColor: '#e2e8f0',
        beard: 'none',
        eyeColor: '#0284c7',
        headwear: 'halo',
        accessory: 'runes',
        outfitColor: '#f8fafc'
    }
};