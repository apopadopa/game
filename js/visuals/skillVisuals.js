// =========================================================================
// БАЗА УНИКАЛЬНЫХ ВЕКТОРНЫХ ИКОНОК ДЛЯ ВСЕХ 64 НАВЫКОВ ИГРЫ
// =========================================================================

export class SkillVisuals {
    static getSkillIcon(skillId, size = 24, fallbackColor = '#f59e0b') {
        const c = fallbackColor;
        const iconSvg = this.ICONS[skillId];
        if (iconSvg) {
            return iconSvg(size, c);
        }
        // Запасной вариант: звезда-искра
        return `<svg class="svg-icon skill-svg-unique" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="8" fill="rgba(245, 158, 11, 0.15)" stroke="${c}" stroke-width="1.5"/>
            <polygon points="12,3 14.5,9.5 21,12 14.5,14.5 12,21 9.5,14.5 3,12 9.5,9.5" fill="${c}"/>
        </svg>`;
    }

    static ICONS = {
        // ==========================================
        // 1. ВОИН (WARRIOR) — 16 НАВЫКОВ
        // ==========================================
        'warrior_strike': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M19 5L5 19" stroke="${c}" stroke-width="3" stroke-linecap="round"/>
                <polygon points="18,3 21,6 18,7 16,5" fill="#fef08a"/>
                <path d="M4 17L7 20L5 22L2 19Z" fill="#94a3b8" stroke="#475569" stroke-width="1"/>
                <line x1="8" y1="13" x2="16" y2="5" stroke="#f8fafc" stroke-width="1.5"/>
                <circle cx="18" cy="6" r="2" fill="#fef08a"/>
            </svg>`,

        'warrior_shield_bash': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L4 6V12C4 17 8 21 12 22C16 21 20 17 20 12V6L12 2Z" fill="rgba(245, 158, 11, 0.2)" stroke="${c}" stroke-width="2"/>
                <circle cx="12" cy="11" r="4" fill="${c}"/>
                <polygon points="12,8 14,13 10,13" fill="#fef08a"/>
                <path d="M21 7C23 9 23 14 21 16" stroke="#fbbf24" stroke-width="1.8" stroke-linecap="round"/>
                <path d="M23 9C24 11 24 12 23 14" stroke="#fde047" stroke-width="1.5" stroke-linecap="round"/>
            </svg>`,

        'warrior_cleave': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M3 17C6 8 16 4 21 7C17 14 10 19 3 17Z" fill="rgba(239, 68, 68, 0.25)" stroke="${c}" stroke-width="1.8"/>
                <path d="M5 19L19 5" stroke="#f8fafc" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M2 13C8 6 18 5 22 9" stroke="#fde047" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="3 2"/>
            </svg>`,

        'warrior_bloody_slash': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M3 21L21 3" stroke="#f87171" stroke-width="3" stroke-linecap="round"/>
                <path d="M9 17C9 17 6 13 6 11C6 9.5 7.5 8 9 8C10.5 8 12 9.5 12 11C12 13 9 17 9 17Z" fill="#dc2626"/>
                <path d="M16 11C16 11 14 8 14 6.5C14 5.5 15 4.5 16 4.5C17 4.5 18 5.5 18 6.5C18 8 16 11 16 11Z" fill="#b91c1c"/>
                <circle cx="19" cy="17" r="2" fill="#ef4444"/>
            </svg>`,

        'warrior_heavy': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <rect x="10.5" y="2" width="3" height="15" fill="#f8fafc" stroke="${c}" stroke-width="1"/>
                <polygon points="12,1 15,4 9,4" fill="#fde047"/>
                <line x1="7" y1="17" x2="17" y2="17" stroke="${c}" stroke-width="3" stroke-linecap="round"/>
                <rect x="11" y="17" width="2" height="6" fill="#78350f"/>
                <circle cx="12" cy="23" r="1.5" fill="${c}"/>
                <path d="M5 6L2 9M19 6L22 9" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
            </svg>`,

        'warrior_whirlwind': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="${c}" stroke-width="2" stroke-dasharray="8 4"/>
                <path d="M12 3C16 3 20 7 20 12" stroke="#fde047" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M12 21C8 21 4 17 4 12" stroke="#fde047" stroke-width="2.5" stroke-linecap="round"/>
                <polygon points="12,6 14,12 12,18 10,12" fill="#f8fafc"/>
                <circle cx="12" cy="12" r="2.5" fill="#ea580c"/>
            </svg>`,

        'warrior_armor_crush': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <polygon points="4,4 12,2 20,4 18,16 12,22 6,16" fill="rgba(100, 116, 139, 0.3)" stroke="#64748b" stroke-width="1.8"/>
                <path d="M12 3L10 10L14 13L11 20" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>
                <line x1="5" y1="12" x2="10" y2="10" stroke="${c}" stroke-width="1.8"/>
                <line x1="19" y1="12" x2="14" y2="13" stroke="${c}" stroke-width="1.8"/>
            </svg>`,

        'warrior_blood_rush': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="#991b1b" stroke="${c}" stroke-width="1.8"/>
                <path d="M12 7V16M8 11L12 7L16 11" stroke="#fef08a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`,

        'warrior_execute': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="9" r="6" fill="#1e293b" stroke="${c}" stroke-width="1.5"/>
                <circle cx="10" cy="8" r="1.5" fill="#f87171"/>
                <circle cx="14" cy="8" r="1.5" fill="#f87171"/>
                <path d="M10 13H14V17H10Z" fill="#1e293b" stroke="${c}" stroke-width="1.2"/>
                <line x1="3" y1="3" x2="21" y2="21" stroke="#ef4444" stroke-width="3" stroke-linecap="round"/>
                <polygon points="19,1 23,5 21,7 17,3" fill="#fef08a"/>
            </svg>`,

        'warrior_titans_wrath': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <rect x="7" y="3" width="10" height="7" rx="2" fill="#78350f" stroke="${c}" stroke-width="1.8"/>
                <rect x="10" y="10" width="4" height="12" fill="#451a03" stroke="#ca8a04" stroke-width="1.5"/>
                <path d="M2 19L7 16L12 20L17 16L22 19" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>
                <circle cx="12" cy="6" r="2" fill="#fef08a"/>
            </svg>`,

        'warrior_berserk_rush': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M4 8C4 8 7 3 12 3C17 3 20 8 20 8C20 8 18 16 12 21C6 16 4 8 4 8Z" fill="#450a0a" stroke="${c}" stroke-width="1.8"/>
                <path d="M3 6L8 10M21 6L16 10" stroke="#f87171" stroke-width="2.5" stroke-linecap="round"/>
                <circle cx="9" cy="11" r="2" fill="#fde047"/>
                <circle cx="15" cy="11" r="2" fill="#fde047"/>
            </svg>`,

        'warrior_dragon_slayer': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15 8L22 9L17 14L18 21L12 17.5L6 21L7 14L2 9L9 8Z" fill="rgba(245, 158, 11, 0.2)" stroke="${c}" stroke-width="1.8"/>
                <line x1="12" y1="2" x2="12" y2="18" stroke="#fef08a" stroke-width="2.5" stroke-linecap="round"/>
                <circle cx="12" cy="10" r="3" fill="#ef4444"/>
            </svg>`,

        'warrior_iron_skin': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L4 5V11C4 16.5 7.5 20.5 12 22C16.5 20.5 20 16.5 20 11V5L12 2Z" fill="#1e293b" stroke="${c}" stroke-width="2"/>
                <path d="M12 6L7 8V11C7 14.5 9 17 12 18C15 17 17 14.5 17 11V8L12 6Z" fill="#334155" stroke="#94a3b8" stroke-width="1.2"/>
            </svg>`,

        'warrior_veteran': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" fill="#0f172a" stroke="${c}" stroke-width="2"/>
                <path d="M7 17L17 7M7 7L17 17" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round"/>
                <circle cx="12" cy="12" r="3" fill="#f59e0b"/>
            </svg>`,

        'warrior_juggernaut': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="5" width="16" height="15" rx="2" fill="#1e293b" stroke="${c}" stroke-width="2"/>
                <path d="M4 9H20M4 14H20M9 5V9M15 5V9M12 9V14M8 14V20M16 14V20" stroke="#475569" stroke-width="1.5"/>
                <circle cx="12" cy="2" r="2" fill="#facc15"/>
            </svg>`,

        'warrior_bloodlust': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M6 16C4 12 5 7 8 4C9 8 11 10 12 7C14 10 16 8 16 4C19 7 20 12 18 16C16 20 8 20 6 16Z" fill="#7f1d1d" stroke="${c}" stroke-width="1.8"/>
                <circle cx="9" cy="13" r="1.5" fill="#fef08a"/>
                <circle cx="15" cy="13" r="1.5" fill="#fef08a"/>
            </svg>`,


        // ==========================================
        // 2. РАЗБОЙНИК (ROGUE) — 16 НАВЫКОВ
        // ==========================================
        'rogue_stab': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M19 3L15 7L17 9L21 5Z" fill="#94a3b8" stroke="${c}" stroke-width="1"/>
                <path d="M15 7L6 16L4 20L8 18L17 9" fill="#e2e8f0" stroke="${c}" stroke-width="1.5"/>
                <circle cx="6" cy="18" r="1.5" fill="#22c55e"/>
            </svg>`,

        'rogue_poison_dart': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <line x1="3" y1="21" x2="19" y2="5" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
                <polygon points="19,5 22,2 20,7" fill="#4ade80"/>
                <circle cx="18" cy="8" r="2" fill="#16a34a"/>
                <circle cx="14" cy="13" r="1.5" fill="#22c55e"/>
            </svg>`,

        'rogue_quick_slash': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M3 7C9 9 15 15 17 21" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M7 3C13 5 19 11 21 17" stroke="#fde047" stroke-width="2" stroke-linecap="round"/>
                <line x1="12" y1="12" x2="20" y2="4" stroke="#f8fafc" stroke-width="1.5"/>
            </svg>`,

        'rogue_smoke_bomb': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="14" r="7" fill="#334155" stroke="${c}" stroke-width="1.8"/>
                <rect x="11" y="4" width="2" height="4" fill="#64748b"/>
                <path d="M6 9C4 6 7 3 10 5C13 2 17 4 15 7C19 8 18 12 15 11" stroke="#94a3b8" stroke-width="1.5" fill="none" stroke-linecap="round"/>
            </svg>`,

        'rogue_eviscerate': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M4 19L17 4C18 3 20 4 20 6L18 12L13 14L4 19Z" fill="rgba(239, 68, 68, 0.3)" stroke="${c}" stroke-width="2"/>
                <path d="M5 14L8 16M8 11L11 13M11 8L14 10" stroke="#f87171" stroke-width="1.8"/>
            </svg>`,

        'rogue_artery_strike': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M2 12C6 10 10 14 14 11C18 8 22 12 22 12" stroke="#dc2626" stroke-width="3" stroke-linecap="round"/>
                <line x1="8" y1="4" x2="16" y2="20" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>
                <circle cx="12" cy="12" r="3" fill="#ef4444"/>
            </svg>`,

        'rogue_shadow_strike': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <ellipse cx="12" cy="18" rx="8" ry="4" fill="#0f172a" stroke="#a855f7" stroke-width="1.5"/>
                <path d="M12 18V4L15 7M12 4L9 7" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>
                <circle cx="12" cy="10" r="2" fill="#c084fc"/>
            </svg>`,

        'rogue_paralyzing_strike': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L4 13H11L10 22L19 11H12L13 2Z" fill="rgba(234, 179, 8, 0.25)" stroke="${c}" stroke-width="2" stroke-linejoin="round"/>
                <circle cx="12" cy="12" r="2" fill="#ffffff"/>
            </svg>`,

        'rogue_deathmark': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="${c}" stroke-width="2"/>
                <circle cx="12" cy="12" r="4" stroke="#ef4444" stroke-width="1.8"/>
                <line x1="12" y1="1" x2="12" y2="23" stroke="${c}" stroke-width="1.5"/>
                <line x1="1" y1="12" x2="23" y2="12" stroke="${c}" stroke-width="1.5"/>
                <circle cx="12" cy="12" r="1.5" fill="#f87171"/>
            </svg>`,

        'rogue_shadow_dance': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M12 3C17 3 21 7 21 12C21 17 17 21 12 21" stroke="${c}" stroke-width="2" stroke-dasharray="4 2"/>
                <polygon points="12,5 14,9 10,9" fill="#c084fc"/>
                <polygon points="19,12 15,14 15,10" fill="#c084fc"/>
                <polygon points="12,19 10,15 14,15" fill="#c084fc"/>
                <polygon points="5,12 9,10 9,14" fill="#c084fc"/>
            </svg>`,

        'rogue_blade_fan': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M12 20L4 8L7 6L12 16L17 6L20 8L12 20Z" fill="rgba(148, 163, 184, 0.3)" stroke="${c}" stroke-width="1.8"/>
                <line x1="12" y1="20" x2="12" y2="4" stroke="#f8fafc" stroke-width="2"/>
            </svg>`,

        'rogue_assassinate': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M4 6C4 6 8 2 12 2C16 2 20 6 20 6V13C20 17 16 21 12 22C8 21 4 17 4 13V6Z" fill="#180c1e" stroke="${c}" stroke-width="2"/>
                <line x1="7" y1="11" x2="11" y2="13" stroke="#f43f5e" stroke-width="2" stroke-linecap="round"/>
                <line x1="17" y1="11" x2="13" y2="13" stroke="#f43f5e" stroke-width="2" stroke-linecap="round"/>
                <polygon points="12,15 14,19 10,19" fill="#e11d48"/>
            </svg>`,

        'rogue_cat_grace': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M6 14C6 10 9 7 13 7C17 7 19 10 19 14C19 18 16 21 12 21C8 21 6 18 6 14Z" fill="#1e1b4b" stroke="${c}" stroke-width="1.8"/>
                <polygon points="7,8 5,3 10,6" fill="#c084fc"/>
                <polygon points="17,8 19,3 14,6" fill="#c084fc"/>
                <ellipse cx="10" cy="13" rx="1.5" ry="2" fill="#a855f7"/>
                <ellipse cx="14" cy="13" rx="1.5" ry="2" fill="#a855f7"/>
            </svg>`,

        'rogue_poison_master': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M9 3H15V6L18 11V20C18 21 17 22 16 22H8C7 22 6 21 6 20V11L9 6V3Z" fill="#052e16" stroke="${c}" stroke-width="1.8"/>
                <circle cx="10" cy="16" r="2" fill="#4ade80"/>
                <circle cx="14" cy="14" r="1.5" fill="#86efac"/>
            </svg>`,

        'rogue_adrenaline': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#eab308" stroke="#78350f" stroke-width="1.5"/>
            </svg>`,

        'rogue_lethal_intent': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="3" width="14" height="18" rx="2" fill="#0f172a" stroke="${c}" stroke-width="1.8"/>
                <polygon points="12,6 15,11 9,11" fill="#f43f5e"/>
                <circle cx="12" cy="14" r="2" fill="#f43f5e"/>
                <line x1="12" y1="14" x2="12" y2="18" stroke="#f43f5e" stroke-width="2"/>
            </svg>`,


        // ==========================================
        // 3. МАГ (MAGE) — 16 НАВЫКОВ
        // ==========================================
        'mage_dart': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <ellipse cx="14" cy="12" rx="7" ry="5" fill="rgba(192, 132, 252, 0.3)" stroke="${c}" stroke-width="1.8"/>
                <circle cx="17" cy="12" r="3" fill="#f5d0fe"/>
                <path d="M9 10L2 12L9 14Z" fill="#a855f7"/>
                <circle cx="5" cy="8" r="1" fill="#e879f9"/>
                <circle cx="6" cy="16" r="1.2" fill="#e879f9"/>
            </svg>`,

        'mage_shock_bolt': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M14 2L5 13H12L9 22L20 10H13L16 2Z" fill="#fde047" stroke="#ca8a04" stroke-width="1.5" stroke-linejoin="round"/>
                <circle cx="11" cy="11" r="2" fill="#ffffff"/>
            </svg>`,

        'mage_flame_touch': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C12 2 16 7 16 11C16 14 14 16 14 16C14 16 18 14 18 17C18 20 15 22 12 22C9 22 6 20 6 17C6 13 9 9 9 9C9 9 8 11 8 13C8 14 9 15 9 15C9 15 7 13 8 10C9 7 12 2 12 2Z" fill="url(#gradFlameTouch)" stroke="#ea580c" stroke-width="1.2"/>
                <defs><linearGradient id="gradFlameTouch" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fef08a"/><stop offset="100%" stop-color="#dc2626"/></linearGradient></defs>
            </svg>`,

        'mage_siphon_life': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <circle cx="6" cy="18" r="3" fill="#ec4899" stroke="${c}" stroke-width="1.5"/>
                <circle cx="18" cy="6" r="3" fill="#831843" stroke="#f472b6" stroke-width="1.5"/>
                <path d="M16 8C14 12 10 12 8 16" stroke="#f43f5e" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 2"/>
                <circle cx="12" cy="12" r="1.5" fill="#fdf2f8"/>
            </svg>`,

        'mage_fireball': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <circle cx="14" cy="12" r="7" fill="#ea580c" stroke="#facc15" stroke-width="2"/>
                <circle cx="15" cy="11" r="3.5" fill="#fef08a"/>
                <path d="M9 7C6 9 3 12 2 12C3 12 6 15 9 17Z" fill="#dc2626"/>
                <path d="M7 9C5 11 3 12 3 12C3 12 5 13 7 15Z" fill="#f97316"/>
            </svg>`,

        'mage_lightning_storm': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M5 8C5 5.5 7.5 3.5 10.5 3.5C12.5 3.5 14.5 4.5 15.5 6C18 6 20 8 20 10.5C20 13 18 15 15.5 15H6C4 15 2 13 2 11C2 9 3.5 7.5 5 8Z" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
                <path d="M8 15L6 19H9L8 23" stroke="#facc15" stroke-width="2" stroke-linecap="round"/>
                <path d="M15 15L13 19H16L15 23" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>
            </svg>`,

        'mage_blizzard_cone': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <line x1="12" y1="2" x2="12" y2="22" stroke="${c}" stroke-width="2"/>
                <line x1="2" y1="12" x2="22" y2="12" stroke="${c}" stroke-width="2"/>
                <line x1="5" y1="5" x2="19" y2="19" stroke="${c}" stroke-width="1.5"/>
                <line x1="19" y1="5" x2="5" y2="19" stroke="${c}" stroke-width="1.5"/>
                <circle cx="12" cy="12" r="3" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
            </svg>`,

        'mage_meteor_strike': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <circle cx="17" cy="7" r="5" fill="#7f1d1d" stroke="#f97316" stroke-width="2"/>
                <circle cx="18" cy="6" r="2" fill="#fef08a"/>
                <path d="M14 10L3 21" stroke="#ea580c" stroke-width="3.5" stroke-linecap="round"/>
                <path d="M12 12L2 22" stroke="#facc15" stroke-width="2" stroke-linecap="round"/>
            </svg>`,

        'mage_cascade': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <line x1="7" y1="2" x2="7" y2="22" stroke="#c084fc" stroke-width="2.5" stroke-linecap="round"/>
                <line x1="12" y1="1" x2="12" y2="23" stroke="#f0abfc" stroke-width="3.5" stroke-linecap="round"/>
                <line x1="17" y1="2" x2="17" y2="22" stroke="#c084fc" stroke-width="2.5" stroke-linecap="round"/>
                <circle cx="12" cy="12" r="6" fill="none" stroke="#e879f9" stroke-width="1.5"/>
            </svg>`,

        'mage_supernova': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="5" fill="#fef08a" stroke="#ea580c" stroke-width="2"/>
                <circle cx="12" cy="12" r="9" fill="none" stroke="#f97316" stroke-width="1.8" stroke-dasharray="4 3"/>
                <line x1="12" y1="1" x2="12" y2="23" stroke="#fbbf24" stroke-width="2"/>
                <line x1="1" y1="12" x2="23" y2="12" stroke="#fbbf24" stroke-width="2"/>
            </svg>`,

        'mage_time_dilation': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" fill="#0f172a" stroke="${c}" stroke-width="2"/>
                <polyline points="12,6 12,12 16,14" stroke="#facc15" stroke-width="2" stroke-linecap="round"/>
                <circle cx="12" cy="12" r="2" fill="#38bdf8"/>
                <path d="M8 3C10 2 14 2 16 3" stroke="#38bdf8" stroke-width="1.5"/>
            </svg>`,

        'mage_armageddon': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M2 20H22" stroke="#78350f" stroke-width="2"/>
                <circle cx="8" cy="10" r="3" fill="#ef4444"/>
                <circle cx="15" cy="8" r="4" fill="#ea580c"/>
                <line x1="8" y1="4" x2="8" y2="18" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>
                <line x1="15" y1="2" x2="15" y2="18" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round"/>
            </svg>`,

        'mage_meditation': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <ellipse cx="12" cy="17" rx="7" ry="3" fill="#1e1b4b" stroke="${c}" stroke-width="1.5"/>
                <circle cx="12" cy="9" r="4" fill="#38bdf8" stroke="#e0f2fe" stroke-width="1.5"/>
                <circle cx="12" cy="9" r="1.5" fill="#ffffff"/>
            </svg>`,

        'mage_arcane_mastery': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M4 19V5C7 5 10 4 12 2C14 4 17 5 20 5V19C17 19 14 18 12 16C10 18 7 19 4 19Z" fill="#1e1b4b" stroke="${c}" stroke-width="1.8"/>
                <line x1="12" y1="3" x2="12" y2="16" stroke="#c084fc" stroke-width="1.5"/>
            </svg>`,

        'mage_elemental_affinity': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <polygon points="12,3 21,19 3,19" fill="none" stroke="${c}" stroke-width="2"/>
                <circle cx="12" cy="5" r="2.5" fill="#ef4444"/>
                <circle cx="19" cy="18" r="2.5" fill="#38bdf8"/>
                <circle cx="5" cy="18" r="2.5" fill="#eab308"/>
            </svg>`,

        'mage_mana_shield_talent': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <polygon points="12,2 20,7 20,17 12,22 4,17 4,7" fill="rgba(56, 189, 248, 0.25)" stroke="#38bdf8" stroke-width="2"/>
                <circle cx="12" cy="12" r="3" fill="#bae6fd"/>
            </svg>`,


        // ==========================================
        // 4. СЛЕДОПЫТ (RANGER) — 16 НАВЫКОВ
        // ==========================================
        'ranger_shot': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <line x1="3" y1="12" x2="20" y2="12" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>
                <polygon points="21,12 16,8 17,12 16,16" fill="#fde047"/>
                <path d="M3 9L6 12L3 15" stroke="#22c55e" stroke-width="2" stroke-linecap="round"/>
            </svg>`,

        'ranger_aimed_shot': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="8" stroke="${c}" stroke-width="2"/>
                <circle cx="12" cy="12" r="3" stroke="#ef4444" stroke-width="1.8"/>
                <line x1="12" y1="2" x2="12" y2="22" stroke="${c}" stroke-width="1.5"/>
                <line x1="2" y1="12" x2="22" y2="12" stroke="${c}" stroke-width="1.5"/>
            </svg>`,

        'ranger_poison_arrow': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <line x1="4" y1="20" x2="18" y2="6" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>
                <polygon points="20,4 15,6 18,9" fill="#22c55e"/>
                <circle cx="16" cy="10" r="2" fill="#4ade80"/>
                <circle cx="12" cy="14" r="1.5" fill="#86efac"/>
            </svg>`,

        'ranger_piercing_arrow': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <line x1="2" y1="12" x2="22" y2="12" stroke="#f8fafc" stroke-width="3" stroke-linecap="round"/>
                <polygon points="22,12 17,8 17,16" fill="#facc15"/>
                <path d="M10 6L14 12L10 18" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>
            </svg>`,

        'ranger_flame_shot': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <line x1="2" y1="12" x2="16" y2="12" stroke="#78350f" stroke-width="2.5"/>
                <path d="M15 8C15 8 19 9 20 12C19 15 15 16 15 16C15 16 22 13 22 12C22 11 15 8 15 8Z" fill="#ea580c"/>
                <circle cx="18" cy="12" r="2.5" fill="#fef08a"/>
            </svg>`,

        'ranger_double_shot': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <line x1="3" y1="8" x2="19" y2="8" stroke="${c}" stroke-width="2"/>
                <polygon points="20,8 16,5 17,8 16,11" fill="#facc15"/>
                <line x1="5" y1="16" x2="21" y2="16" stroke="${c}" stroke-width="2"/>
                <polygon points="22,16 18,13 19,16 18,19" fill="#facc15"/>
            </svg>`,

        'ranger_concussive_shot': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <line x1="3" y1="12" x2="16" y2="12" stroke="${c}" stroke-width="2.5"/>
                <circle cx="18" cy="12" r="4" fill="#475569" stroke="#f59e0b" stroke-width="2"/>
                <path d="M18 5C21 7 21 17 18 19" stroke="#fbbf24" stroke-width="1.8" stroke-linecap="round"/>
            </svg>`,

        'ranger_shadow_arrow': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <line x1="3" y1="12" x2="19" y2="12" stroke="#a855f7" stroke-width="2.5" stroke-dasharray="4 2"/>
                <polygon points="21,12 16,8 18,12 16,16" fill="#c084fc"/>
                <circle cx="8" cy="12" r="2" fill="#581c87"/>
            </svg>`,

        'ranger_arrow_rain': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <line x1="6" y1="3" x2="6" y2="18" stroke="${c}" stroke-width="2"/>
                <polygon points="6,21 4,16 8,16" fill="#fde047"/>
                <line x1="12" y1="2" x2="12" y2="19" stroke="${c}" stroke-width="2"/>
                <polygon points="12,22 10,17 14,17" fill="#fde047"/>
                <line x1="18" y1="4" x2="18" y2="17" stroke="${c}" stroke-width="2"/>
                <polygon points="18,20 16,15 20,15" fill="#fde047"/>
            </svg>`,

        'ranger_predator_strike': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M4 14C4 9 8 5 12 5C16 5 20 9 20 14C20 18 16 21 12 21C8 21 4 18 4 14Z" fill="#14532d" stroke="${c}" stroke-width="1.8"/>
                <path d="M8 12L9 16M16 12L15 16" stroke="#fef08a" stroke-width="2" stroke-linecap="round"/>
                <circle cx="9" cy="10" r="1.5" fill="#facc15"/>
                <circle cx="15" cy="10" r="1.5" fill="#facc15"/>
            </svg>`,

        'ranger_wind_fury': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M3 8H15C17 8 19 6.5 19 5C19 3.5 17 2 15 2C13 2 12 3 12 4.5" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
                <path d="M2 13H18C20 13 22 14.5 22 16C22 17.5 20 19 18 19C16 19 15 18 15 16.5" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>
                <path d="M5 18H12" stroke="#86efac" stroke-width="2" stroke-linecap="round"/>
            </svg>`,

        'ranger_sniper_kill': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#ef4444" stroke-width="2"/>
                <circle cx="12" cy="12" r="5" stroke="#f87171" stroke-width="1.5"/>
                <circle cx="12" cy="12" r="1.5" fill="#fef08a"/>
                <line x1="12" y1="1" x2="12" y2="7" stroke="#ef4444" stroke-width="2"/>
                <line x1="12" y1="17" x2="12" y2="23" stroke="#ef4444" stroke-width="2"/>
                <line x1="1" y1="12" x2="7" y2="12" stroke="#ef4444" stroke-width="2"/>
                <line x1="17" y1="12" x2="23" y2="12" stroke="#ef4444" stroke-width="2"/>
            </svg>`,

        'ranger_falcon_eye': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M2 12C5 6 19 6 22 12C19 18 5 18 2 12Z" fill="#1e293b" stroke="${c}" stroke-width="2"/>
                <circle cx="12" cy="12" r="4.5" fill="#f59e0b" stroke="#ca8a04" stroke-width="1.5"/>
                <circle cx="13" cy="11" r="1.5" fill="#ffffff"/>
            </svg>`,

        'ranger_camouflage': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C7 5 4 10 5 16C6 20 10 22 12 22C14 22 18 20 19 16C20 10 17 5 12 2Z" fill="#14532d" stroke="${c}" stroke-width="1.8"/>
                <line x1="12" y1="5" x2="12" y2="20" stroke="#86efac" stroke-width="1.5"/>
                <line x1="12" y1="10" x2="8" y2="8" stroke="#86efac" stroke-width="1.2"/>
                <line x1="12" y1="14" x2="16" y2="12" stroke="#86efac" stroke-width="1.2"/>
            </svg>`,

        'ranger_survivalist': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 19H21L12 2Z" fill="#1c1917" stroke="${c}" stroke-width="1.8"/>
                <circle cx="12" cy="14" r="3" fill="#ea580c"/>
                <line x1="9" y1="18" x2="15" y2="18" stroke="#78350f" stroke-width="2"/>
            </svg>`,

        'ranger_quiver_mastery': (s, c) => `
            <svg class="svg-icon skill-svg-unique" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none">
                <rect x="7" y="8" width="10" height="14" rx="2" fill="#78350f" stroke="${c}" stroke-width="1.8"/>
                <line x1="9" y1="2" x2="9" y2="8" stroke="#f8fafc" stroke-width="2"/>
                <polygon points="9,2 7,5 11,5" fill="#22c55e"/>
                <line x1="12" y1="1" x2="12" y2="8" stroke="#f8fafc" stroke-width="2"/>
                <polygon points="12,1 10,4 14,4" fill="#22c55e"/>
                <line x1="15" y1="2" x2="15" y2="8" stroke="#f8fafc" stroke-width="2"/>
                <polygon points="15,2 13,5 17,5" fill="#22c55e"/>
            </svg>`
    };
}

