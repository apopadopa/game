/**
 * Визуальный рендерер экипировки: обеспечивает 100% визуальное соответствие
 * между иконками предметов в инвентаре/лавках и спрайтом персонажа.
 */

export class EquipmentVisuals {
    // =========================================================================
    // ОРУЖИЕ (WEAPONS)
    // =========================================================================

    static renderWeapon(weaponId, { isHero = false, size = 24, classId = 'warrior', sX = 154 } = {}) {
        let svgContent = '';

        switch (weaponId) {
            // Мечи воина
            case 'iron_broadsword':
                svgContent = `
                    <rect x="-3" y="0" width="6" height="96" fill="#cbd5e1" stroke="#334155" stroke-width="1"/>
                    <line x1="0" y1="2" x2="0" y2="92" stroke="#64748b" stroke-width="1.2"/>
                    <polygon points="0,-8 -3,0 3,0" fill="#cbd5e1"/>
                    <rect x="-12" y="96" width="24" height="6" rx="1.5" fill="#ca8a04" stroke="#854d0e" stroke-width="1"/>
                    <rect x="-2" y="102" width="4" height="18" fill="#451a03"/>
                    <circle cx="0" cy="122" r="4.5" fill="#ca8a04" stroke="#854d0e" stroke-width="1"/>
                `;
                break;

            case 'steel_claymore':
                svgContent = `
                    <rect x="-4" y="-8" width="8" height="106" fill="#e2e8f0" stroke="#1e293b" stroke-width="1.2"/>
                    <line x1="0" y1="-6" x2="0" y2="94" stroke="#94a3b8" stroke-width="1.4"/>
                    <polygon points="0,-18 -4,-8 4,-8" fill="#f8fafc"/>
                    <path d="M-15,98 L15,98 L12,104 L-12,104 Z" fill="#64748b" stroke="#334155" stroke-width="1"/>
                    <rect x="-2.5" y="104" width="5" height="20" fill="#292524"/>
                    <circle cx="0" cy="126" r="5" fill="#475569" stroke="#1e293b" stroke-width="1"/>
                `;
                break;

            case 'runic_bastard_sword':
                svgContent = `
                    <rect x="-3.5" y="-12" width="7" height="110" fill="#38bdf8" stroke="#0284c7" stroke-width="1.2"/>
                    <line x1="0" y1="-10" x2="0" y2="95" stroke="#e0f2fe" stroke-width="1.5"/>
                    <polygon points="0,-22 -3.5,-12 3.5,-12" fill="#bae6fd"/>
                    <!-- Рунические светящиеся символы -->
                    <circle cx="0" cy="20" r="1.5" fill="#ffffff"/>
                    <circle cx="0" cy="40" r="1.5" fill="#ffffff"/>
                    <circle cx="0" cy="60" r="1.5" fill="#ffffff"/>
                    <path d="M-14,98 Q0,92 14,98 L11,104 Q0,100 -11,104 Z" fill="#1e3a8a" stroke="#0284c7" stroke-width="1"/>
                    <rect x="-2" y="104" width="4" height="20" fill="#0f172a"/>
                    <circle cx="0" cy="126" r="5" fill="#38bdf8" stroke="#0284c7" stroke-width="1.2"/>
                `;
                break;

            case 'mithril_abyss_blade':
                svgContent = `
                    <rect x="-4" y="-16" width="8" height="116" fill="#818cf8" stroke="#3730a3" stroke-width="1.2"/>
                    <line x1="0" y1="-14" x2="0" y2="98" stroke="#c7d2fe" stroke-width="1.6"/>
                    <polygon points="0,-26 -4,-16 4,-16" fill="#e0e7ff"/>
                    <!-- Фиолетовое теневое лезвие -->
                    <path d="M-16,100 L-10,95 L0,98 L10,95 L16,100 L12,106 L0,102 L-12,106 Z" fill="#4c1d95" stroke="#7c3aed" stroke-width="1"/>
                    <rect x="-2.5" y="106" width="5" height="22" fill="#1e1b4b"/>
                    <polygon points="0,128 -5,133 0,138 5,133" fill="#a855f7"/>
                `;
                break;

            case 'dragon_slayer_greatsword':
                svgContent = `
                    <path d="M-6,-24 L6,-24 L7,100 L-7,100 Z" fill="#991b1b" stroke="#450a0a" stroke-width="1.5"/>
                    <polygon points="0,-38 -6,-24 6,-24" fill="#ef4444"/>
                    <line x1="0" y1="-32" x2="0" y2="96" stroke="#fef08a" stroke-width="2"/>
                    <!-- Драконьи клыки на гарде -->
                    <polygon points="-18,100 -14,88 -6,100" fill="#facc15"/>
                    <polygon points="18,100 14,88 6,100" fill="#facc15"/>
                    <rect x="-16" y="100" width="32" height="7" fill="#78350f" stroke="#451a03" stroke-width="1"/>
                    <rect x="-3" y="107" width="6" height="26" fill="#292524"/>
                    <circle cx="0" cy="136" r="6" fill="#ea580c" stroke="#7c2d12" stroke-width="1.5"/>
                `;
                break;

            // Секира минотавра (редкий трофей моба)
            case 'minotaur_battle_axe':
                svgContent = `
                    <!-- Топорище -->
                    <rect x="-2.5" y="-15" width="5" height="150" rx="2" fill="#78350f" stroke="#451a03" stroke-width="1"/>
                    <!-- Двустороннее широкое лезвие -->
                    <path d="M-2,15 Q-28,-5 -34,35 Q-20,40 -2,45 Z" fill="#475569" stroke="#1e293b" stroke-width="1.5"/>
                    <path d="M2,15 Q28,-5 34,35 Q20,40 2,45 Z" fill="#475569" stroke="#1e293b" stroke-width="1.5"/>
                    <line x1="-32" y1="5" x2="-32" y2="35" stroke="#ef4444" stroke-width="2"/>
                    <line x1="32" y1="5" x2="32" y2="35" stroke="#ef4444" stroke-width="2"/>
                    <!-- Кольца и шип -->
                    <polygon points="0,-22 -3,-15 3,-15" fill="#cbd5e1"/>
                `;
                break;

            // Кинжалы плута
            case 'hunting_dagger':
            case 'starter_dagger':
                svgContent = `
                    <path d="M0,0 Q-4,18 2,34 Q-3,46 0,58 L3,58 Q-1,46 4,34 Q-2,18 3,0 Z" fill="#94a3b8" stroke="#1e293b" stroke-width="1"/>
                    <line x1="1.5" y1="4" x2="1.5" y2="52" stroke="#e2e8f0" stroke-width="1.2"/>
                    <rect x="-6" y="58" width="12" height="3" rx="1" fill="#ca8a04"/>
                    <rect x="-1.5" y="61" width="3" height="14" fill="#451a03"/>
                    <circle cx="0" cy="77" r="2.5" fill="#ca8a04"/>
                `;
                break;

            case 'assassin_stiletto':
                svgContent = `
                    <polygon points="0,-5 -2,48 2,48" fill="#cbd5e1" stroke="#0f172a" stroke-width="0.8"/>
                    <line x1="0" y1="-3" x2="0" y2="45" stroke="#64748b" stroke-width="1"/>
                    <rect x="-7" y="48" width="14" height="3" fill="#1e293b"/>
                    <rect x="-1.5" y="51" width="3" height="14" fill="#0f172a"/>
                    <polygon points="0,67 -2.5,65 0,63 2.5,65" fill="#cbd5e1"/>
                `;
                break;

            case 'viper_fang_blade':
                svgContent = `
                    <path d="M0,0 Q-4,15 2,28 Q-4,42 0,56 L3,56 Q-2,42 4,28 Q-2,15 3,0 Z" fill="#22c55e" stroke="#15803d" stroke-width="1"/>
                    <circle cx="0" cy="20" r="1.5" fill="#86efac"/>
                    <rect x="-6" y="56" width="12" height="3" rx="1" fill="#14532d"/>
                    <rect x="-1.5" y="59" width="3" height="14" fill="#1c1917"/>
                `;
                break;

            case 'shadow_kris':
            case 'shadow_assassin_kris':
                svgContent = `
                    <path d="M0,-8 Q-6,12 2,26 Q-6,40 0,58 L3,58 Q-3,40 5,26 Q-3,12 3,-8 Z" fill="#7c3aed" stroke="#4c1d95" stroke-width="1.2"/>
                    <path d="M0,10 Q2,22 -1,35" stroke="#e9d5ff" stroke-width="1.2" fill="none"/>
                    <rect x="-7" y="58" width="14" height="3.5" rx="1" fill="#3b0764"/>
                    <rect x="-1.5" y="61.5" width="3" height="15" fill="#09090b"/>
                    <circle cx="0" cy="78" r="3" fill="#a855f7"/>
                `;
                break;

            case 'nightfall_claws':
                svgContent = `
                    <path d="M-6,20 Q-10,-5 -4,-18 L-2,-18 Q-7,-5 -3,20 Z" fill="#94a3b8" stroke="#1e293b" stroke-width="0.8"/>
                    <path d="M0,24 Q0,-8 6,-24 L8,-24 Q2,-8 3,24 Z" fill="#cbd5e1" stroke="#1e293b" stroke-width="0.8"/>
                    <path d="M6,20 Q10,-5 16,-18 L18,-18 Q13,-5 9,20 Z" fill="#94a3b8" stroke="#1e293b" stroke-width="0.8"/>
                    <rect x="-8" y="22" width="19" height="12" rx="2" fill="#1c1917" stroke="#450a0a" stroke-width="1"/>
                `;
                break;

            // Посохи мага
            case 'apprentice_staff':
            case 'starter_staff':
                svgContent = `
                    <rect x="-2" y="0" width="4.5" height="195" fill="#78350f" rx="2" stroke="#451a03" stroke-width="1"/>
                    <path d="M-5,0 Q-8,-14 0,-18 Q8,-14 5,0 Z" fill="#b45309"/>
                    <circle cx="0" cy="-8" r="4" fill="#f59e0b" stroke="#ca8a04" stroke-width="1"/>
                `;
                break;

            case 'elemental_wand':
                svgContent = `
                    <rect x="-1.5" y="10" width="3" height="85" rx="1.5" fill="#cbd5e1" stroke="#475569" stroke-width="0.8"/>
                    <polygon points="0,0 -4,10 4,10" fill="#38bdf8"/>
                    <circle cx="0" cy="5" r="2.5" fill="#ef4444"/>
                    <circle cx="0" cy="10" r="2" fill="#facc15"/>
                    <rect x="-2" y="75" width="4" height="18" fill="#451a03" rx="1"/>
                `;
                break;

            case 'storm_caller_staff':
                svgContent = `
                    <rect x="-2.5" y="-10" width="5" height="195" rx="2" fill="#1e293b" stroke="#0f172a" stroke-width="1"/>
                    <!-- Бронзовые кольца -->
                    <circle cx="0" cy="30" r="4.5" fill="none" stroke="#ca8a04" stroke-width="1.5"/>
                    <circle cx="0" cy="70" r="4.5" fill="none" stroke="#ca8a04" stroke-width="1.5"/>
                    <!-- Грозовая сфера навершия -->
                    <circle cx="0" cy="-18" r="8" fill="#38bdf8" stroke="#0284c7" stroke-width="1.5"/>
                    <circle cx="0" cy="-18" r="4" fill="#f0f9ff"/>
                    <path d="M-3,-24 L1,-18 L-2,-18 L2,-12" stroke="#fef08a" stroke-width="1.5" fill="none"/>
                `;
                break;

            case 'void_archmage_sceptre':
                svgContent = `
                    <rect x="-2.5" y="-15" width="5" height="190" rx="2" fill="#1e1b4b" stroke="#312e81" stroke-width="1"/>
                    <!-- Золотые крылья и кристалл бездны -->
                    <path d="M-12,-20 Q-6,-30 0,-15 Q6,-30 12,-20 Q0,-12 -12,-20 Z" fill="#ca8a04" stroke="#854d0e" stroke-width="1"/>
                    <polygon points="0,-36 -5,-20 0,-12 5,-20" fill="#a855f7" stroke="#7c3aed" stroke-width="1"/>
                    <circle cx="0" cy="-20" r="2.5" fill="#f5d0fe"/>
                `;
                break;

            case 'archlich_skull_staff':
                svgContent = `
                    <rect x="-2.5" y="-5" width="5" height="190" rx="2" fill="#f1f5f9" stroke="#64748b" stroke-width="1"/>
                    <!-- Череп Архилича с фиолетовыми глазами -->
                    <circle cx="0" cy="-18" r="9" fill="#e2e8f0" stroke="#475569" stroke-width="1.2"/>
                    <circle cx="-3.5" cy="-18" r="2" fill="#7c3aed"/>
                    <circle cx="3.5" cy="-18" r="2" fill="#7c3aed"/>
                    <polygon points="-7,-22 -11,-34 -4,-26" fill="#ca8a04"/>
                    <polygon points="7,-22 11,-34 4,-26" fill="#ca8a04"/>
                `;
                break;

            case 'primordial_magic_tome':
                svgContent = `
                    <rect x="-14" y="0" width="28" height="38" rx="2" fill="#7f1d1d" stroke="#facc15" stroke-width="1.5"/>
                    <rect x="-10" y="4" width="20" height="30" fill="#991b1b"/>
                    <polygon points="0,10 7,22 -7,22" fill="#facc15"/>
                    <circle cx="0" cy="17" r="2" fill="#38bdf8"/>
                `;
                break;

            // Луки следопыта
            // Луки следопыта (рукоять центрирована в (0,0), плечи выгнуты наружу x > 0, тетива на внешней стороне x >= 1)
            case 'ash_shortbow':
            case 'starter_bow':
                svgContent = `
                    <!-- Крепкий ясеневый лук -->
                    <path d="M 3,-55 Q 16,-28 2,-6 L 2,6 Q 16,28 3,55" stroke="#78350f" stroke-width="3.2" fill="none" stroke-linecap="round"/>
                    <line x1="3" y1="-55" x2="3" y2="55" stroke="#e2e8f0" stroke-width="1.2"/>
                    <circle cx="3" cy="-55" r="2" fill="#ca8a04"/>
                    <circle cx="3" cy="55" r="2" fill="#ca8a04"/>
                    <rect x="-1" y="-6" width="5" height="12" rx="1.5" fill="#451a03"/>
                `;
                break;

            case 'yew_longbow':
                svgContent = `
                    <!-- Тисовый длинный лук -->
                    <path d="M 4,-70 Q 20,-35 2,-7 L 2,7 Q 20,35 4,70" stroke="#451a03" stroke-width="3.6" fill="none" stroke-linecap="round"/>
                    <line x1="4" y1="-70" x2="4" y2="70" stroke="#cbd5e1" stroke-width="1.3"/>
                    <polygon points="4,-74 7,-68 1,-68" fill="#ca8a04"/>
                    <polygon points="4,74 7,68 1,68" fill="#ca8a04"/>
                    <rect x="-1" y="-7" width="5" height="14" rx="1.5" fill="#1c1917"/>
                `;
                break;

            case 'composite_scout_bow':
                svgContent = `
                    <!-- Композитный лук разведчика с рекурсивными плечами -->
                    <path d="M 2,-64 Q 10,-52 5,-32 Q 20,-16 2,-7 L 2,7 Q 20,16 5,32 Q 10,52 2,64" stroke="#166534" stroke-width="3.3" fill="none" stroke-linecap="round"/>
                    <line x1="2" y1="-64" x2="2" y2="64" stroke="#e2e8f0" stroke-width="1.2"/>
                    <polygon points="2,-68 5,-62 0,-62" fill="#ca8a04"/>
                    <polygon points="2,68 5,62 0,62" fill="#ca8a04"/>
                    <rect x="-1" y="-7" width="5" height="14" rx="1.5" fill="#ca8a04"/>
                `;
                break;

            case 'phantom_hunting_crossbow':
                svgContent = `
                    <!-- Фантомный арбалет охотника -->
                    <rect x="-2" y="-14" width="4" height="46" rx="1" fill="#1e293b" stroke="#0f172a" stroke-width="1"/>
                    <path d="M-22,-8 Q0,-16 22,-8" stroke="#38bdf8" stroke-width="3" fill="none" stroke-linecap="round"/>
                    <line x1="-22" y1="-8" x2="0" y2="6" stroke="#0284c7" stroke-width="1"/>
                    <line x1="22" y1="-8" x2="0" y2="6" stroke="#0284c7" stroke-width="1"/>
                    <polygon points="0,-18 -3,-12 3,-12" fill="#38bdf8"/>
                `;
                break;

            case 'celestial_wind_recurve':
                svgContent = `
                    <!-- Рекурсивный лук Небесного Ветра -->
                    <path d="M 3,-70 Q 12,-56 6,-35 Q 22,-18 2,-7 L 2,7 Q 22,18 6,35 Q 12,56 3,70" stroke="#0284c7" stroke-width="3.6" fill="none" stroke-linecap="round"/>
                    <line x1="3" y1="-70" x2="3" y2="70" stroke="#f0f9ff" stroke-width="1.5"/>
                    <polygon points="3,-75 9,-68 1,-66" fill="#facc15"/>
                    <polygon points="3,75 9,68 1,66" fill="#facc15"/>
                    <rect x="-1" y="-7" width="5.5" height="14" rx="2" fill="#facc15"/>
                `;
                break;

            // Кинжалы и стилеты разбойника (рукоять центрирована в (0,0), клинок направлен вверх y < 0)
            case 'hunting_dagger':
            case 'starter_dagger':
                svgContent = `
                    <!-- Охотничий кинжал волка с изогнутым хищным клинком -->
                    <path d="M 1,-48 Q 5,-32 3,-18 Q 4,-10 2,-7 L -2,-7 Q -1,-18 0,-32 Z" fill="#94a3b8" stroke="#1e293b" stroke-width="0.8"/>
                    <line x1="0.5" y1="-44" x2="0.5" y2="-10" stroke="#f1f5f9" stroke-width="1"/>
                    <path d="M-8,-7 Q0,-10 8,-7 L7,-5 Q0,-8 -7,-5 Z" fill="#b45309" stroke="#78350f" stroke-width="0.8"/>
                    <rect x="-2" y="-5" width="4" height="13" rx="1" fill="#451a03"/>
                    <circle cx="0" cy="10" r="3" fill="#b45309" stroke="#78350f" stroke-width="0.8"/>
                `;
                break;

            case 'assassin_stiletto':
                svgContent = `
                    <!-- Стилет бесшумного убийцы -->
                    <polygon points="0,-52 -2,-7 2,-7" fill="#334155" stroke="#0f172a" stroke-width="0.8"/>
                    <line x1="0" y1="-48" x2="0" y2="-8" stroke="#94a3b8" stroke-width="1"/>
                    <rect x="-7" y="-8" width="14" height="2" rx="0.5" fill="#ca8a04"/>
                    <rect x="-1.5" y="-6" width="3" height="14" fill="#0f172a"/>
                    <circle cx="0" cy="10" r="2.5" fill="#ca8a04"/>
                `;
                break;

            case 'viper_fang_blade':
                svgContent = `
                    <!-- Клык черной гадюки с ядовитым клинком крис -->
                    <path d="M 0,-50 Q -4,-38 2,-28 Q -4,-18 1,-7 L -2,-7 Q -3,-18 0,-28 Q -2,-38 0,-50 Z" fill="#15803d" stroke="#166534" stroke-width="0.8"/>
                    <line x1="0" y1="-46" x2="0" y2="-9" stroke="#4ade80" stroke-width="1.2"/>
                    <path d="M-7,-7 Q0,-10 7,-7 L6,-5 Q0,-8 -6,-5 Z" fill="#14532d"/>
                    <rect x="-2" y="-5" width="4" height="13" rx="1" fill="#052e16"/>
                    <circle cx="0" cy="10" r="3" fill="#22c55e" stroke="#14532d" stroke-width="0.8"/>
                `;
                break;

            case 'shadow_kris':
            case 'shadow_assassin_kris':
                svgContent = `
                    <!-- Волнистый крис Теней -->
                    <path d="M 0,-52 Q -4,-40 3,-28 Q -4,-16 2,-7 L -2,-7 Q -3,-16 1,-28 Q -2,-40 0,-52 Z" fill="#3b0764" stroke="#6b21a8" stroke-width="0.8"/>
                    <line x1="0" y1="-48" x2="0" y2="-9" stroke="#c084fc" stroke-width="1.2"/>
                    <path d="M-8,-7 Q0,-11 8,-7 L7,-5 Q0,-9 -7,-5 Z" fill="#581c87"/>
                    <rect x="-2" y="-5" width="4" height="14" rx="1" fill="#1e1b4b"/>
                    <circle cx="0" cy="11" r="3.5" fill="#a855f7" stroke="#3b0764" stroke-width="0.8"/>
                `;
                break;

            case 'nightfall_claws':
                svgContent = `
                    <!-- Когти Вечной Ночи -->
                    <path d="M-4,-24 Q-8,-10 -5,4 L-2,4 Q-4,-8 -2,-20 Z" fill="#09090b" stroke="#7c3aed" stroke-width="0.8"/>
                    <path d="M0,-28 Q-3,-12 0,4 L3,4 Q1,-10 2,-24 Z" fill="#09090b" stroke="#a855f7" stroke-width="0.8"/>
                    <path d="M4,-22 Q2,-10 5,4 L8,4 Q6,-8 6,-18 Z" fill="#09090b" stroke="#7c3aed" stroke-width="0.8"/>
                    <rect x="-6" y="2" width="15" height="5" rx="1" fill="#18181b" stroke="#a855f7" stroke-width="0.8"/>
                `;
                break;

            // --- Новое эксклюзивное оружие подземелья ---
            case 'obsidian_flame_edge':
                svgContent = `
                    <polygon points="0,-18 -5,95 5,95" fill="#1c1917" stroke="#ea580c" stroke-width="1.2"/>
                    <line x1="0" y1="-14" x2="0" y2="92" stroke="#f97316" stroke-width="2"/>
                    <polygon points="0,-18 3,30 -2,60 1,90" fill="#facc15"/>
                    <rect x="-14" y="95" width="28" height="6" rx="1" fill="#78350f" stroke="#ea580c" stroke-width="1"/>
                    <rect x="-2.5" y="101" width="5" height="20" fill="#1c1917"/>
                    <circle cx="0" cy="123" r="5" fill="#ea580c" stroke="#facc15" stroke-width="1.5"/>
                `;
                break;

            case 'crystallized_venom_rapier':
                svgContent = `
                    <line x1="0" y1="-26" x2="0" y2="94" stroke="#86efac" stroke-width="2"/>
                    <polygon points="0,-28 -2,-18 2,-18" fill="#22c55e"/>
                    <path d="M-12,94 Q0,86 12,94 Q6,104 0,102 Q-6,104 -12,94 Z" fill="#15803d" stroke="#86efac" stroke-width="1"/>
                    <rect x="-1.5" y="98" width="3" height="18" fill="#14532d"/>
                    <circle cx="0" cy="118" r="3.5" fill="#22c55e" stroke="#15803d" stroke-width="1"/>
                    <circle cx="0" cy="118" r="1.5" fill="#bbf7d0"/>
                `;
                break;

            case 'starlight_silver_bow':
                svgContent = `
                    <path d="M 3,-70 Q 12,-56 6,-35 Q 22,-18 2,-7 L 2,7 Q 22,18 6,35 Q 12,56 3,70" stroke="#94a3b8" stroke-width="3.5" fill="none" stroke-linecap="round"/>
                    <line x1="3" y1="-70" x2="3" y2="70" stroke="#38bdf8" stroke-width="1.5"/>
                    <!-- Полумесяцы на концах лука -->
                    <circle cx="3" cy="-70" r="3.5" fill="#38bdf8"/>
                    <circle cx="3" cy="70" r="3.5" fill="#38bdf8"/>
                    <rect x="-1" y="-7" width="5" height="14" rx="2" fill="#38bdf8" stroke="#0284c7" stroke-width="1"/>
                `;
                break;

            case 'abyssal_reaper_scythe':
                svgContent = `
                    <rect x="-2.5" y="-20" width="5" height="195" rx="2" fill="#18181b" stroke="#3b0764" stroke-width="1"/>
                    <!-- Изогнутое лезвие косы Бездны -->
                    <path d="M-2,-16 Q-36,-30 -48,25 Q-30,5 -2,-5 Z" fill="#7c3aed" stroke="#c084fc" stroke-width="1.5"/>
                    <path d="M-45,22 Q-32,0 -4,-12" stroke="#e9d5ff" stroke-width="1.5" fill="none"/>
                    <circle cx="0" cy="-10" r="4" fill="#c084fc"/>
                `;
                break;

            case 'celestial_judgment_hammer':
                svgContent = `
                    <!-- Рукоять боевого молота -->
                    <rect x="-3" y="10" width="6" height="140" rx="2" fill="#78350f" stroke="#451a03" stroke-width="1"/>
                    <!-- Массивный золоченый боёк -->
                    <rect x="-22" y="0" width="44" height="28" rx="3" fill="#ca8a04" stroke="#854d0e" stroke-width="1.5"/>
                    <rect x="-18" y="4" width="36" height="20" fill="#fef08a"/>
                    <!-- Рельеф священного солнца -->
                    <circle cx="0" cy="14" r="6" fill="#facc15" stroke="#ca8a04" stroke-width="1"/>
                    <polygon points="0,-10 -5,0 5,0" fill="#facc15"/>
                    <circle cx="0" cy="152" r="5" fill="#ca8a04"/>
                `;
                break;

            case 'void_singularity_orb':
                svgContent = `
                    <rect x="-2" y="0" width="4" height="190" rx="2" fill="#0f172a" stroke="#1e1b4b" stroke-width="1"/>
                    <!-- Парящие скобы и сингулярность -->
                    <circle cx="0" cy="-18" r="12" fill="#1e1b4b" stroke="#7c3aed" stroke-width="1.5"/>
                    <circle cx="0" cy="-18" r="8" fill="#581c87"/>
                    <circle cx="0" cy="-18" r="4" fill="#09090b"/>
                    <circle cx="0" cy="-18" r="1.5" fill="#f5d0fe"/>
                    <!-- Искривление гравитации -->
                    <ellipse cx="0" cy="-18" rx="16" ry="4" fill="none" stroke="#a855f7" stroke-width="1" transform="rotate(-25 0 -18)"/>
                `;
                break;

            case 'phoenix_feather_longbow':
                svgContent = `
                    <!-- Лук пламени феникса -->
                    <path d="M 3,-74 Q 14,-58 7,-36 Q 24,-18 2,-8 L 2,8 Q 24,18 7,36 Q 14,58 3,74" stroke="#b91c1c" stroke-width="4" fill="none" stroke-linecap="round"/>
                    <path d="M 4,-68 Q 12,-52 8,-34 Q 20,-16 3,-7 L 3,7 Q 20,16 8,34 Q 12,52 4,68" stroke="#f97316" stroke-width="2" fill="none" stroke-linecap="round"/>
                    <line x1="3" y1="-74" x2="3" y2="74" stroke="#fef08a" stroke-width="1.8"/>
                    <!-- Перья феникса на концах -->
                    <polygon points="3,-78 11,-70 0,-70" fill="#ea580c"/>
                    <polygon points="3,78 11,70 0,70" fill="#ea580c"/>
                    <rect x="-1" y="-8" width="5.5" height="16" rx="2" fill="#facc15"/>
                `;
                break;

            case 'dragon_god_fang':
                svgContent = `
                    <!-- Меч из колоссального клыка праотца драконов -->
                    <path d="M-6,-28 Q0,-12 4,96 L-4,96 Q-8,-12 -6,-28 Z" fill="#f8fafc" stroke="#991b1b" stroke-width="1.5"/>
                    <polygon points="-6,-28 0,-40 4,-28" fill="#ef4444"/>
                    <line x1="0" y1="-32" x2="0" y2="92" stroke="#dc2626" stroke-width="2"/>
                    <!-- Огненная драконья гарда -->
                    <polygon points="-20,96 -12,84 -6,96" fill="#ca8a04"/>
                    <polygon points="20,96 12,84 6,96" fill="#ca8a04"/>
                    <rect x="-18" y="96" width="36" height="7" rx="1.5" fill="#7f1d1d" stroke="#450a0a" stroke-width="1"/>
                    <rect x="-3" y="103" width="6" height="26" fill="#1c1917"/>
                    <circle cx="0" cy="133" r="6" fill="#facc15" stroke="#991b1b" stroke-width="1.5"/>
                `;
                break;

            case 'demigod_genesis_blade':
                svgContent = `
                    <!-- Легендарный божественный клинок Творца -->
                    <polygon points="0,-45 -6,-28 -5,98 5,98 6,-28" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
                    <line x1="0" y1="-40" x2="0" y2="95" stroke="#ffffff" stroke-width="2.5"/>
                    <!-- Космические искры на клинке -->
                    <circle cx="0" cy="-10" r="2.5" fill="#38bdf8"/>
                    <circle cx="0" cy="25" r="2.5" fill="#e879f9"/>
                    <circle cx="0" cy="60" r="2.5" fill="#38bdf8"/>
                    <!-- Крылатая золотая гарда небес -->
                    <path d="M-24,96 Q-12,82 0,94 Q12,82 24,96 L18,104 Q0,98 -18,104 Z" fill="#facc15" stroke="#854d0e" stroke-width="1.2"/>
                    <rect x="-3" y="104" width="6" height="26" fill="#0f172a"/>
                    <circle cx="0" cy="134" r="7" fill="#67e8f9" stroke="#facc15" stroke-width="1.5"/>
                `;
                break;

            case 'starter_weapon':
                // Стартовое оружие зависит от класса
                if (classId === 'rogue') {
                    // Стартовый кинжал разбойника с изогнутым лезвием
                    svgContent = `
                        <path d="M 1,-48 Q 5,-32 3,-18 Q 4,-10 2,-7 L -2,-7 Q -1,-18 0,-32 Z" fill="#94a3b8" stroke="#1e293b" stroke-width="0.8"/>
                        <line x1="0.5" y1="-44" x2="0.5" y2="-10" stroke="#f1f5f9" stroke-width="1"/>
                        <path d="M-7,-7 Q0,-10 7,-7 L6,-5 Q0,-8 -6,-5 Z" fill="#ca8a04"/>
                        <rect x="-2" y="-5" width="4" height="13" rx="1" fill="#451a03"/>
                        <circle cx="0" cy="10" r="2.5" fill="#ca8a04"/>
                    `;
                } else if (classId === 'mage') {
                    // Простой посох
                    svgContent = `
                        <rect x="-2" y="-18" width="4" height="195" rx="2" fill="#78350f" stroke="#451a03" stroke-width="1"/>
                        <circle cx="0" cy="-22" r="6" fill="#a78bfa" stroke="#5b21b6" stroke-width="1.2"/>
                        <circle cx="0" cy="-22" r="2.5" fill="#f5d0fe"/>
                    `;
                } else if (classId === 'ranger') {
                    // Простой ясеневый лук
                    svgContent = `
                        <path d="M 3,-55 Q 16,-28 2,-6 L 2,6 Q 16,28 3,55" stroke="#78350f" stroke-width="3" fill="none" stroke-linecap="round"/>
                        <line x1="3" y1="-55" x2="3" y2="55" stroke="#d6d3d1" stroke-width="1.2"/>
                        <circle cx="3" cy="-55" r="2" fill="#ca8a04"/>
                        <circle cx="3" cy="55" r="2" fill="#ca8a04"/>
                        <rect x="-1" y="-6" width="5" height="12" rx="1.5" fill="#451a03"/>
                    `;
                } else {
                    // Воин: простой меч
                    svgContent = `
                        <rect x="-3" y="0" width="6" height="96" fill="#cbd5e1" stroke="#334155" stroke-width="1"/>
                        <polygon points="0,-8 -3,0 3,0" fill="#cbd5e1"/>
                        <rect x="-12" y="96" width="24" height="6" rx="1.5" fill="#ca8a04" stroke="#854d0e" stroke-width="1"/>
                        <rect x="-2" y="102" width="4" height="18" fill="#451a03"/>
                        <circle cx="0" cy="122" r="4.5" fill="#ca8a04" stroke="#854d0e" stroke-width="1"/>
                    `;
                }
                break;

            case 'goblin_king_cutlass':
                svgContent = `
                    <path d="M-3,4 Q-8,30 -2,70 L6,70 Q0,30 6,4 Z" fill="#facc15" stroke="#854d0e" stroke-width="1.2"/>
                    <line x1="2" y1="8" x2="2" y2="66" stroke="#fef08a" stroke-width="1.5"/>
                    <rect x="-10" y="70" width="20" height="5" rx="1" fill="#ca8a04" stroke="#854d0e" stroke-width="1"/>
                    <rect x="-2" y="75" width="4" height="16" fill="#78350f"/>
                    <circle cx="0" cy="93" r="4" fill="#facc15" stroke="#854d0e" stroke-width="1"/>
                    <circle cx="0" cy="93" r="1.5" fill="#fef08a"/>
                `;
                break;

            default:
                // Дефолтное оружие по классу
                if (classId === 'warrior') {
                    svgContent = `
                        <rect x="-2" y="0" width="4" height="80" fill="#a4afba" stroke="#31373e" stroke-width="1"/>
                        <rect x="-10" y="80" width="20" height="4.5" rx="1" fill="#4d4640" stroke="#1f1b17" stroke-width="0.8"/>
                        <rect x="-1.5" y="84.5" width="3" height="15" fill="#2d1e13"/>
                        <circle cx="0" cy="101" r="3.5" fill="#4d4640"/>
                    `;
                } else if (classId === 'rogue') {
                    svgContent = `
                        <path d="M 1,-46 Q 5,-30 3,-18 Q 4,-10 2,-7 L -2,-7 Q -1,-18 0,-30 Z" fill="#88939c" stroke="#20252a" stroke-width="0.8"/>
                        <line x1="0.5" y1="-42" x2="0.5" y2="-10" stroke="#cbd5e1" stroke-width="1"/>
                        <path d="M-6,-7 Q0,-10 6,-7 L5,-5 Q0,-8 -5,-5 Z" fill="#2b231c"/>
                        <rect x="-1.5" y="-5" width="3" height="13" fill="#1c1917"/>
                        <circle cx="0" cy="10" r="2.5" fill="#2b231c"/>
                    `;
                } else if (classId === 'mage') {
                    svgContent = `
                        <rect x="-2" y="0" width="4.5" height="195" fill="#422f20" rx="2" stroke="#1c1209" stroke-width="1"/>
                        <path d="M-5,0 Q-8,-12 0,-16 Q8,-12 5,0 Z" fill="#5e442f"/>
                        <circle cx="0" cy="-6" r="3.5" fill="#78c9e6" opacity="0.9"/>
                    `;
                } else {
                    svgContent = `
                        <path d="M 3,-55 Q 16,-28 2,-6 L 2,6 Q 16,28 3,55" stroke="#4a3321" stroke-width="3" fill="none" stroke-linecap="round"/>
                        <line x1="3" y1="-55" x2="3" y2="55" stroke="#d5dbdb" stroke-width="1.2"/>
                        <rect x="-1" y="-6" width="5" height="12" rx="1.5" fill="#451a03"/>
                    `;
                }
        }

        const isRangerBow = (classId === 'ranger') || ['ash_shortbow', 'yew_longbow', 'composite_scout_bow', 'phantom_hunting_crossbow', 'celestial_wind_recurve', 'starlight_silver_bow', 'phoenix_feather_longbow', 'starter_bow'].includes(weaponId) || (weaponId === 'starter_weapon' && classId === 'ranger');
        const isRogueDagger = (classId === 'rogue') || ['hunting_dagger', 'starter_dagger', 'assassin_stiletto', 'viper_fang_blade', 'shadow_kris', 'shadow_assassin_kris', 'nightfall_claws'].includes(weaponId) || (weaponId === 'starter_weapon' && classId === 'rogue');
        const isMageStaff = (classId === 'mage') || ['apprentice_staff', 'starter_staff', 'elemental_wand', 'storm_caller_staff', 'void_archmage_sceptre', 'void_singularity_orb', 'archlich_skull_staff'].includes(weaponId) || (weaponId === 'starter_weapon' && classId === 'mage');

        if (isHero) {
            if (isRangerBow) {
                if (weaponId === 'phantom_hunting_crossbow') {
                    return `<g transform="translate(${sX + 10}, 145) rotate(15)">${svgContent}</g>`;
                }
                // Рукоять лука (0, 0) центрируется точно в ладони героя (sX + 10, 150), тетива и плечи направлены наружу от тела
                return `<g transform="translate(${sX + 10}, 150)">${svgContent}</g>`;
            }

            if (isRogueDagger) {
                if (weaponId === 'nightfall_claws') {
                    return `<g transform="translate(${sX + 10}, 150)">${svgContent}</g>`;
                }
                // Рукоять кинжала (0, 0) центрируется в ладони (sX + 10, 150) с естественным боевым наклоном лезвия вперед
                return `<g transform="translate(${sX + 10}, 150) rotate(24)">${svgContent}</g>`;
            }

            if (isMageStaff) {
                // Посох удерживается в руке мага
                return `<g transform="translate(${sX + 10}, 45)">${svgContent}</g>`;
            }

            // Мечи и топоры воина: рукоять (y: 110) центрируется в ладони (sX + 10, 150)
            return `<g transform="translate(${sX + 10}, 40)">${svgContent}</g>`;
        }

        // Режим иконки инвентаря: адаптивный viewBox под тип оружия
        let iconViewBox = "-30 -30 60 170";
        if (isRangerBow) {
            iconViewBox = "-15 -80 40 160";
        } else if (isRogueDagger) {
            iconViewBox = "-18 -60 36 78";
        }

        return `
            <svg class="svg-icon item-eq-icon weapon" width="${size}" height="${size}" viewBox="${iconViewBox}" fill="none">
                ${svgContent}
            </svg>
        `;
    }

    // =========================================================================
    // ЩИТЫ (SHIELDS)
    // =========================================================================

    static renderShield(shieldId, { isHero = false, size = 24 } = {}) {
        let svgContent = '';

        switch (shieldId) {
            case 'starter_shield':
            case 'reinforced_shield':
                svgContent = `
                    <circle cx="0" cy="0" r="19" fill="#3a2818" stroke="#1b120a" stroke-width="2"/>
                    <circle cx="0" cy="0" r="16" fill="none" stroke="#71717a" stroke-width="1.5"/>
                    <circle cx="0" cy="0" r="6" fill="#94a3b8" stroke="#334155" stroke-width="1.2"/>
                    <line x1="-12" y1="0" x2="12" y2="0" stroke="#d4af37" stroke-width="1"/>
                    <line x1="0" y1="-12" x2="0" y2="12" stroke="#d4af37" stroke-width="1"/>
                `;
                break;

            case 'knight_kite_shield':
                svgContent = `
                    <path d="M-15,-16 L15,-16 L13,10 Q0,26 0,28 Q0,26 -13,10 Z" fill="#1e3a8a" stroke="#ca8a04" stroke-width="2"/>
                    <!-- Белый геральдический крест -->
                    <line x1="0" y1="-12" x2="0" y2="20" stroke="#ffffff" stroke-width="3"/>
                    <line x1="-10" y1="-2" x2="10" y2="-2" stroke="#ffffff" stroke-width="3"/>
                `;
                break;

            case 'iron_bastion_aegis':
                svgContent = `
                    <path d="M-14,-18 L14,-18 L12,20 L0,26 L-12,20 Z" fill="#334155" stroke="#0f172a" stroke-width="2"/>
                    <line x1="-10" y1="-14" x2="10" y2="16" stroke="#64748b" stroke-width="2"/>
                    <line x1="10" y1="-14" x2="-10" y2="16" stroke="#64748b" stroke-width="2"/>
                    <circle cx="0" cy="1" r="4.5" fill="#facc15" stroke="#854d0e" stroke-width="1"/>
                `;
                break;

            case 'mithril_tower_shield':
                svgContent = `
                    <path d="M-14,-22 L14,-22 L13,24 L0,30 L-13,24 Z" fill="#38bdf8" stroke="#0369a1" stroke-width="2"/>
                    <path d="M-8,-16 L8,-16 L7,18 L0,22 L-7,18 Z" fill="#0284c7"/>
                    <polygon points="0,-12 4,-4 -4,-4" fill="#ffffff"/>
                    <circle cx="0" cy="5" r="3.5" fill="#ffffff"/>
                `;
                break;

            case 'mirror_shield_of_aegis':
                svgContent = `
                    <circle cx="0" cy="0" r="20" fill="#facc15" stroke="#b45309" stroke-width="2"/>
                    <circle cx="0" cy="0" r="14" fill="#fef08a" stroke="#d97706" stroke-width="1.5"/>
                    <line x1="-12" y1="-12" x2="12" y2="12" stroke="#ea580c" stroke-width="1.5"/>
                    <line x1="12" y1="-12" x2="-12" y2="12" stroke="#ea580c" stroke-width="1.5"/>
                    <circle cx="0" cy="0" r="5" fill="#ffffff"/>
                `;
                break;

            case 'gargoyle_stone_shield':
                svgContent = `
                    <path d="M-16,-14 L16,-14 L12,18 Q0,28 0,28 Q0,28 -12,18 Z" fill="#475569" stroke="#1e293b" stroke-width="2"/>
                    <!-- Резной лик гаргульи -->
                    <circle cx="-5" cy="-2" r="2.5" fill="#f59e0b"/>
                    <circle cx="5" cy="-2" r="2.5" fill="#f59e0b"/>
                    <polygon points="0,3 -3,8 3,8" fill="#1e293b"/>
                    <path d="M-6,12 Q0,15 6,12" stroke="#1e293b" stroke-width="1.5" fill="none"/>
                `;
                break;

            case 'aegis_of_the_immortal_sun':
                svgContent = `
                    <circle cx="0" cy="0" r="20" fill="#ea580c" stroke="#7c2d12" stroke-width="2"/>
                    <circle cx="0" cy="0" r="15" fill="#facc15" stroke="#ca8a04" stroke-width="1.5"/>
                    <!-- Солнечные лучи -->
                    <polygon points="0,-18 3,-13 -3,-13" fill="#ffffff"/>
                    <polygon points="0,18 3,13 -3,13" fill="#ffffff"/>
                    <polygon points="-18,0 -13,3 -13,-3" fill="#ffffff"/>
                    <polygon points="18,0 13,3 13,-3" fill="#ffffff"/>
                    <circle cx="0" cy="0" r="6" fill="#ef4444" stroke="#991b1b" stroke-width="1"/>
                `;
                break;

            case 'mirror_of_oblivion':
                svgContent = `
                    <!-- Шестигранный щит Забвения -->
                    <polygon points="0,-22 16,-11 16,11 0,22 -16,11 -16,-11" fill="#1e1b4b" stroke="#a855f7" stroke-width="2"/>
                    <polygon points="0,-16 11,-8 11,8 0,16 -11,8 -11,-8" fill="#09090b" stroke="#7c3aed" stroke-width="1"/>
                    <circle cx="0" cy="0" r="5" fill="#c084fc"/>
                    <circle cx="0" cy="0" r="2" fill="#ffffff"/>
                `;
                break;

            case 'titan_colossus_wall':
                svgContent = `
                    <!-- Монолитная стена Колосса-Титана -->
                    <rect x="-16" y="-24" width="32" height="48" rx="2" fill="#334155" stroke="#0f172a" stroke-width="2"/>
                    <rect x="-12" y="-20" width="24" height="40" fill="#475569"/>
                    <!-- Золотые укрепляющие полосы и шип -->
                    <line x1="-16" y1="-8" x2="16" y2="-8" stroke="#ca8a04" stroke-width="2.5"/>
                    <line x1="-16" y1="8" x2="16" y2="8" stroke="#ca8a04" stroke-width="2.5"/>
                    <polygon points="0,-14 5,-6 -5,-6" fill="#facc15"/>
                    <circle cx="0" cy="0" r="5" fill="#ca8a04" stroke="#854d0e" stroke-width="1.2"/>
                    <polygon points="0,14 5,6 -5,6" fill="#facc15"/>
                `;
                break;

            default:
                svgContent = `
                    <circle cx="0" cy="0" r="18" fill="#3a2818" stroke="#1b120a" stroke-width="2"/>
                    <circle cx="0" cy="0" r="6" fill="#94a3b8"/>
                `;
        }

        if (isHero) {
            return `<g transform="translate(68, 145)">${svgContent}</g>`;
        }

        return `
            <svg class="svg-icon item-eq-icon shield" width="${size}" height="${size}" viewBox="-25 -25 50 50" fill="none">
                ${svgContent}
            </svg>
        `;
    }

    // =========================================================================
    // ШЛЕМЫ (HELMETS)
    // =========================================================================

    static renderHelmet(helmetId, { isHero = false, size = 24 } = {}) {
        let svgContent = '';

        switch (helmetId) {
            case 'iron_helmet':
                svgContent = `
                    <path d="M-20,12 C-21,-18 21,-18 20,12 L17,20 L-17,20 Z" fill="#475569" stroke="#1e293b" stroke-width="1.5"/>
                    <path d="M-18,2 C-19,-14 19,-14 18,2" stroke="#94a3b8" stroke-width="2" fill="none"/>
                    <polygon points="0,-20 -3,-10 3,-10" fill="#ca8a04"/>
                    <rect x="-16" y="16" width="32" height="4" fill="#334155" stroke="#1e293b" stroke-width="1"/>
                    <path d="M-3,16 L-2,30 L2,30 L3,16 Z" fill="#94a3b8" stroke="#1e293b" stroke-width="1"/>
                `;
                break;

            case 'steel_visored_helm':
                svgContent = `
                    <path d="M-21,14 C-22,-20 22,-20 21,14 L18,24 L-18,24 Z" fill="#64748b" stroke="#1e293b" stroke-width="1.5"/>
                    <!-- Забрало со щелями для глаз -->
                    <path d="M-17,6 L17,6 L15,18 L-15,18 Z" fill="#334155" stroke="#0f172a" stroke-width="1.2"/>
                    <line x1="-12" y1="12" x2="-2" y2="12" stroke="#0f172a" stroke-width="2"/>
                    <line x1="2" y1="12" x2="12" y2="12" stroke="#0f172a" stroke-width="2"/>
                    <circle cx="-16" cy="12" r="2" fill="#ca8a04"/>
                    <circle cx="16" cy="12" r="2" fill="#ca8a04"/>
                    <!-- Плюмаж -->
                    <path d="M-2,-20 Q0,-32 10,-26 Q0,-18 2,-16 Z" fill="#dc2626"/>
                `;
                break;

            case 'crusader_great_helm':
                svgContent = `
                    <!-- Топфхельм ведро -->
                    <rect x="-18" y="-12" width="36" height="34" rx="2" fill="#94a3b8" stroke="#1e293b" stroke-width="1.5"/>
                    <polygon points="-18,-12 0,-18 18,-12" fill="#cbd5e1" stroke="#1e293b" stroke-width="1"/>
                    <!-- Латунный крест -->
                    <line x1="0" y1="-12" x2="0" y2="18" stroke="#ca8a04" stroke-width="4"/>
                    <line x1="-16" y1="2" x2="16" y2="2" stroke="#ca8a04" stroke-width="4"/>
                    <!-- Глазные щели -->
                    <line x1="-14" y1="2" x2="-2" y2="2" stroke="#0f172a" stroke-width="2"/>
                    <line x1="2" y1="2" x2="14" y2="2" stroke="#0f172a" stroke-width="2"/>
                `;
                break;

            case 'runic_crown_of_justice':
                svgContent = `
                    <!-- Золотая руническая корона -->
                    <path d="M-18,6 L-18,-6 L-10,2 L0,-12 L10,2 L18,-6 L18,6 Z" fill="#eab308" stroke="#854d0e" stroke-width="1.5"/>
                    <circle cx="0" cy="0" r="3.5" fill="#38bdf8" stroke="#0284c7" stroke-width="1"/>
                    <circle cx="-10" cy="2" r="1.5" fill="#ef4444"/>
                    <circle cx="10" cy="2" r="1.5" fill="#ef4444"/>
                `;
                break;

            case 'titan_horned_helm':
                svgContent = `
                    <path d="M-20,12 C-21,-18 21,-18 20,12 L17,20 L-17,20 Z" fill="#292524" stroke="#0c0a09" stroke-width="1.5"/>
                    <!-- Массивные рога титана -->
                    <path d="M-16,4 Q-34,-2 -28,-18 Q-24,-10 -15,-6" fill="#78350f" stroke="#292524" stroke-width="1.2"/>
                    <path d="M16,4 Q34,-2 28,-18 Q24,-10 15,-6" fill="#78350f" stroke="#292524" stroke-width="1.2"/>
                    <rect x="-14" y="10" width="28" height="5" fill="#44403c"/>
                `;
                break;

            case 'death_knight_helm':
                svgContent = `
                    <path d="M-20,10 C-22,-18 22,-18 20,10 L16,22 L-16,22 Z" fill="#09090b" stroke="#3b0764" stroke-width="1.5"/>
                    <!-- Изогнутые рога смерти -->
                    <path d="M-16,2 Q-32,-10 -26,-24 Q-20,-12 -12,-4" fill="#64748b" stroke="#09090b" stroke-width="1.2"/>
                    <path d="M16,2 Q32,-10 26,-24 Q20,-12 12,-4" fill="#64748b" stroke="#09090b" stroke-width="1.2"/>
                    <!-- Зловещая алая прорезь для глаз -->
                    <polygon points="-12,8 12,8 0,13" fill="#ef4444"/>
                `;
                break;

            case 'void_avatar_crown':
                svgContent = `
                    <!-- Парящие осколки короны бездны -->
                    <polygon points="0,-24 -6,-10 0,-14 6,-10" fill="#a855f7" stroke="#581c87" stroke-width="1"/>
                    <polygon points="-14,-16 -18,-4 -12,-6" fill="#7c3aed"/>
                    <polygon points="14,-16 18,-4 12,-6" fill="#7c3aed"/>
                    <circle cx="0" cy="-14" r="2.5" fill="#f5d0fe"/>
                `;
                break;

            case 'crown_of_the_ancient_lich':
                svgContent = `
                    <!-- Костяная корона Лича с изумрудным оком -->
                    <polygon points="-18,-10 -14,-22 -8,-12 0,-26 8,-12 14,-22 18,-10 16,6 -16,6" fill="#f1f5f9" stroke="#475569" stroke-width="1.2"/>
                    <circle cx="0" cy="-6" r="4" fill="#22c55e" stroke="#15803d" stroke-width="1"/>
                    <circle cx="0" cy="-6" r="1.5" fill="#86efac"/>
                `;
                break;

            case 'dragon_scale_visage':
                svgContent = `
                    <!-- Личина драконьей ярости -->
                    <path d="M-21,12 C-22,-20 22,-20 21,12 L18,22 L-18,22 Z" fill="#7f1d1d" stroke="#450a0a" stroke-width="1.5"/>
                    <path d="M-18,4 Q-36,-14 -28,-26 Q-22,-14 -14,-2" fill="#ea580c" stroke="#991b1b" stroke-width="1"/>
                    <path d="M18,4 Q36,-14 28,-26 Q22,-14 14,-2" fill="#ea580c" stroke="#991b1b" stroke-width="1"/>
                    <!-- Горящие желтые щели визора -->
                    <polygon points="-14,10 -2,8 -6,14" fill="#fef08a"/>
                    <polygon points="14,10 2,8 6,14" fill="#fef08a"/>
                `;
                break;

            case 'halo_of_the_fallen_seraph':
                svgContent = `
                    <!-- Оскверненный божественный нимб Серафима -->
                    <ellipse cx="0" cy="-24" rx="24" ry="7" fill="none" stroke="#facc15" stroke-width="2.5"/>
                    <ellipse cx="0" cy="-24" rx="20" ry="5" fill="none" stroke="#7c3aed" stroke-width="1.5"/>
                    <polygon points="-24,-24 -32,-30 -22,-28" fill="#facc15"/>
                    <polygon points="24,-24 32,-30 22,-28" fill="#facc15"/>
                    <circle cx="0" cy="-24" r="3" fill="#ffffff"/>
                `;
                break;

            // --- ШЛЕМЫ / ГОЛОВНЫЕ УБОРЫ ПЛУТА ---
            case 'thief_bandana':
                svgContent = `
                    <!-- Бандана вора на лоб с узлом -->
                    <rect x="-18" y="2" width="36" height="8" rx="2" fill="#262626" stroke="#09090b" stroke-width="1"/>
                    <path d="M-18,6 Q0,10 18,6" stroke="#52525b" stroke-width="1" fill="none"/>
                    <path d="M16,6 L25,12 L20,16 L15,8 Z" fill="#262626" stroke="#09090b" stroke-width="0.8"/>
                    <circle cx="0" cy="6" r="1.5" fill="#a1a1aa"/>
                `;
                break;

            case 'rogue_cowl':
                svgContent = `
                    <!-- Капюшон лазутчика -->
                    <path d="M-21,18 C-23,-16 23,-16 21,18 L14,24 Q0,18 -14,24 Z" fill="#18181b" stroke="#09090b" stroke-width="1.3"/>
                    <path d="M-15,6 Q0,-2 15,6 Q0,2 -15,6 Z" fill="#27272a"/>
                    <ellipse cx="0" cy="14" rx="14" ry="7" fill="none" stroke="#3f3f46" stroke-width="1"/>
                `;
                break;

            case 'shadow_hood':
                svgContent = `
                    <!-- Капюшон теней с фиолетовым отливом -->
                    <path d="M-22,22 C-24,-18 24,-18 22,22 L15,26 Q0,18 -15,26 Z" fill="#1e1b4b" stroke="#0f172a" stroke-width="1.4"/>
                    <path d="M-16,8 Q0,0 16,8 L12,24 Q0,18 -12,24 Z" fill="#09090b" opacity="0.85"/>
                    <circle cx="-6" cy="14" r="1.5" fill="#a855f7"/>
                    <circle cx="6" cy="14" r="1.5" fill="#a855f7"/>
                `;
                break;

            case 'assassin_mask':
                svgContent = `
                    <!-- Маска безмолвной смерти: капюшон + лицевая маска -->
                    <path d="M-21,16 C-23,-18 23,-18 21,16 L16,34 L-16,34 Z" fill="#09090b" stroke="#450a0a" stroke-width="1.4"/>
                    <path d="M-14,16 L14,16 L10,32 L-10,32 Z" fill="#1c1917" stroke="#7f1d1d" stroke-width="1"/>
                    <polygon points="-10,12 -3,13 -5,10" fill="#ef4444"/>
                    <polygon points="10,12 3,13 5,10" fill="#ef4444"/>
                    <line x1="-8" y1="24" x2="8" y2="24" stroke="#7f1d1d" stroke-width="1"/>
                `;
                break;

            // --- ГОЛОВНЫЕ УБОРЫ ЧАРОДЕЯ ---
            case 'scholar_cap':
                svgContent = `
                    <!-- Шапочка книжника с кисточкой -->
                    <polygon points="0,-16 22,-8 0,0 -22,-8" fill="#312e81" stroke="#1e1b4b" stroke-width="1.2"/>
                    <polygon points="0,-14 18,-8 0,-2 -18,-8" fill="#4338ca"/>
                    <circle cx="0" cy="-8" r="2.5" fill="#facc15"/>
                    <path d="M0,-8 Q18,-6 20,4 L22,8 L18,8 Z" fill="#eab308"/>
                `;
                break;

            case 'wizard_hat':
                svgContent = `
                    <!-- Остроконечная шляпа мага -->
                    <ellipse cx="0" cy="10" rx="26" ry="6" fill="#1e1b4b" stroke="#0f172a" stroke-width="1.3"/>
                    <path d="M-15,10 Q-5,-10 0,-28 Q8,-10 15,10 Z" fill="#312e81" stroke="#1e1b4b" stroke-width="1.2"/>
                    <polygon points="0,-28 6,-32 2,-25" fill="#4338ca"/>
                    <rect x="-14" y="6" width="28" height="4" fill="#a855f7"/>
                    <rect x="-4" y="5" width="8" height="6" fill="none" stroke="#facc15" stroke-width="1.2"/>
                `;
                break;

            case 'sorcerer_circlet':
                svgContent = `
                    <!-- Диадема чародея с сапфиром -->
                    <path d="M-18,6 Q0,2 18,6 L18,2 Q0,-2 -18,2 Z" fill="#ca8a04" stroke="#854d0e" stroke-width="1"/>
                    <polygon points="0,-6 6,4 -6,4" fill="#eab308" stroke="#854d0e" stroke-width="1"/>
                    <circle cx="0" cy="1" r="3.5" fill="#38bdf8" stroke="#0284c7" stroke-width="1"/>
                    <circle cx="0" cy="1" r="1.5" fill="#ffffff"/>
                `;
                break;

            case 'astral_crown':
                svgContent = `
                    <!-- Астральный венец тайных сил -->
                    <polygon points="0,-22 5,-8 -5,-8" fill="#c084fc" stroke="#7c3aed" stroke-width="1"/>
                    <polygon points="-14,-14 -8,-4 -16,-2" fill="#a855f7" stroke="#6b21a8" stroke-width="1"/>
                    <polygon points="14,-14 8,-4 16,-2" fill="#a855f7" stroke="#6b21a8" stroke-width="1"/>
                    <ellipse cx="0" cy="4" rx="18" ry="4" fill="none" stroke="#c084fc" stroke-width="1.5"/>
                    <circle cx="0" cy="-6" r="3" fill="#38bdf8"/>
                    <circle cx="0" cy="-6" r="1" fill="#ffffff"/>
                `;
                break;

            // --- ГОЛОВНЫЕ УБОРЫ СЛЕДОПЫТА ---
            case 'hunter_cap':
                svgContent = `
                    <!-- Шапка зверолова с пером -->
                    <path d="M-18,12 C-20,-10 18,-10 20,8 L16,14 L-16,14 Z" fill="#27272a" stroke="#18181b" stroke-width="1.2"/>
                    <path d="M-16,10 Q0,4 16,10" stroke="#52525b" stroke-width="1.5" fill="none"/>
                    <path d="M12,8 Q18,-14 26,-20 Q20,-12 14,-2 Z" fill="#dc2626" stroke="#991b1b" stroke-width="0.8"/>
                    <circle cx="13" cy="7" r="2" fill="#ca8a04"/>
                `;
                break;

            case 'scout_coif':
                svgContent = `
                    <!-- Кожаный койф следопыта -->
                    <path d="M-20,14 C-22,-16 22,-16 20,14 L16,28 Q0,24 -16,28 Z" fill="#14532d" stroke="#052e16" stroke-width="1.3"/>
                    <ellipse cx="0" cy="12" rx="14" ry="8" fill="none" stroke="#15803d" stroke-width="1.2"/>
                `;
                break;

            case 'ranger_feathered_hat':
                svgContent = `
                    <!-- Шляпа вольного стрелка с пером -->
                    <ellipse cx="0" cy="8" rx="25" ry="6" fill="#1c1917" stroke="#0c0a09" stroke-width="1.2"/>
                    <path d="M-14,8 C-16,-8 16,-8 14,8 Z" fill="#292524" stroke="#0c0a09" stroke-width="1"/>
                    <path d="M-12,7 Q0,4 12,7" stroke="#15803d" stroke-width="2.5" fill="none"/>
                    <path d="M-10,4 Q-22,-14 -18,-26 Q-14,-14 -8,-2 Z" fill="#22c55e" stroke="#15803d" stroke-width="1"/>
                    <circle cx="-10" cy="5" r="2" fill="#ca8a04"/>
                `;
                break;

            case 'sniper_hood':
                svgContent = `
                    <!-- Капюшон снайпера чащи -->
                    <path d="M-22,18 C-24,-18 24,-18 22,18 L15,26 Q0,18 -15,26 Z" fill="#064e3b" stroke="#022c22" stroke-width="1.4"/>
                    <path d="M-16,4 Q0,0 16,4 L12,18 Q0,12 -12,18 Z" fill="#047857" opacity="0.85"/>
                    <line x1="-12" y1="8" x2="-2" y2="12" stroke="#ca8a04" stroke-width="1.2"/>
                    <line x1="2" y1="12" x2="12" y2="8" stroke="#ca8a04" stroke-width="1.2"/>
                `;
                break;

            default:
                svgContent = `
                    <path d="M-18,12 C-19,-14 19,-14 18,12 Z" fill="#475569" stroke="#1e293b" stroke-width="1.5"/>
                `;
        }

        if (isHero) {
            return `<g id="char-helmet" transform="translate(120, 36)">${svgContent}</g>`;
        }

        return `
            <svg class="svg-icon item-eq-icon helmet" width="${size}" height="${size}" viewBox="-35 -35 70 70" fill="none">
                ${svgContent}
            </svg>
        `;
    }

    // =========================================================================
    // ДОСПЕХИ (ARMOR - TORSO)
    // =========================================================================

    static renderTorso(torsoId, { visuals, classId = 'warrior', isFemale = false, isHero = false, size = 24 } = {}) {
        const sL = isFemale ? 90 : 86;
        const sR = isFemale ? 150 : 154;
        const wL = isFemale ? 101 : 98;
        const wR = isFemale ? 139 : 142;

        let svgContent = '';

        switch (torsoId) {
            case 'gambeson':
            case 'starter_torso':
            case 'starter_tunic': {
                const outfitCol = visuals?.outfitColor || '#5a4634';
                if (classId === 'rogue') {
                    svgContent = `
                        <!-- Жилет плута цвета кастомизации с темной шнуровкой и ножнами -->
                        <path d="M112,88 Q120,85 128,88 L${sR},96 Q${sR - 2},126 ${wR},152 L${wL},152 Q${sL + 2},126 ${sL},96 Z" fill="${outfitCol}" stroke="#141417" stroke-width="1.2"/>
                        <path d="M113,90 L127,90 L125,152 L115,152 Z" fill="#18181b"/>
                        <line x1="114" y1="102" x2="126" y2="106" stroke="#e2e8f0" stroke-width="1.2"/>
                        <line x1="126" y1="102" x2="114" y2="106" stroke="#e2e8f0" stroke-width="1.2"/>
                        <line x1="114" y1="114" x2="126" y2="118" stroke="#e2e8f0" stroke-width="1.2"/>
                        <line x1="126" y1="114" x2="114" y2="118" stroke="#e2e8f0" stroke-width="1.2"/>
                        <line x1="114" y1="126" x2="126" y2="130" stroke="#e2e8f0" stroke-width="1.2"/>
                        <line x1="126" y1="126" x2="114" y2="130" stroke="#e2e8f0" stroke-width="1.2"/>
                        <rect x="${wL - 2}" y="144" width="${wR - wL + 4}" height="8" fill="#18181b" stroke="#09090b" stroke-width="1"/>
                        <polygon points="112,143 114,148 110,148" fill="#cbd5e1"/>
                        <polygon points="118,143 120,148 116,148" fill="#cbd5e1"/>
                        <polygon points="124,143 126,148 122,148" fill="#cbd5e1"/>
                    `;
                } else if (classId === 'mage') {
                    svgContent = `
                        <!-- Мантия послушника цвета кастомизации с длинным подолом -->
                        <path d="M112,88 Q120,85 128,88 L${sR},96 L154,236 L86,236 L${sL},96 Z" fill="${outfitCol}" stroke="#1e1b4b" stroke-width="1.2"/>
                        <path d="M115,90 L125,90 L128,236 L112,236 Z" fill="#1e1b4b" opacity="0.5"/>
                        <path d="M${sL + 2},96 Q120,106 ${sR - 2},96 L${sR - 6},116 Q120,126 ${sL + 6},116 Z" fill="#1e1b4b" opacity="0.6"/>
                        <circle cx="120" cy="118" r="2.5" fill="#38bdf8"/>
                        <circle cx="120" cy="142" r="2.5" fill="#c084fc"/>
                        <circle cx="120" cy="166" r="2.5" fill="#38bdf8"/>
                        <rect x="${wL - 2}" y="144" width="${wR - wL + 4}" height="8" fill="#312e81"/>
                        <circle cx="120" cy="148" r="4" fill="#a855f7"/>
                    `;
                } else if (classId === 'ranger') {
                    svgContent = `
                        <!-- Охотничья куртка следопыта цвета кастомизации с перевязью колчана -->
                        <path d="M112,88 Q120,85 128,88 L${sR},96 Q${sR - 2},126 ${wR},152 L${wL},152 Q${sL + 2},126 ${sL},96 Z" fill="${outfitCol}" stroke="#1c140d" stroke-width="1.2"/>
                        <path d="M${sL - 2},94 Q${sL + 12},90 ${sL + 18},98 L${sL + 12},112 Q${sL + 4},108 ${sL - 2},110 Z" fill="#3f2b1c" stroke="#1f140a" stroke-width="1"/>
                        <line x1="${sL + 4}" y1="96" x2="${wR - 2}" y2="158" stroke="#362516" stroke-width="3.5"/>
                        <rect x="${wL - 1}" y="145" width="10" height="12" fill="#362516" rx="1.5"/>
                        <rect x="${wL - 2}" y="144" width="${wR - wL + 4}" height="8" fill="#24150b" stroke="#0f0703" stroke-width="1"/>
                        <rect x="115" y="143" width="10" height="10" fill="#ca8a04" stroke="#713f12" stroke-width="1"/>
                    `;
                } else {
                    // Воин
                    svgContent = `
                        <!-- Колет воина цвета кастомизации с портупеей и стальной пряжкой -->
                        <path d="M112,88 Q120,85 128,88 L${sR},96 Q${sR - 2},126 ${wR},152 L${wL},152 Q${sL + 2},126 ${sL},96 Z" fill="${outfitCol}" stroke="#1c140d" stroke-width="1.2"/>
                        <path d="M${wL},152 L${wR},152 L${wR + 4},164 L${wL - 4},164 Z" fill="${outfitCol}" stroke="#1c140d" stroke-width="1.2"/>
                        <line x1="${sL + 6}" y1="98" x2="${wR - 6}" y2="148" stroke="#2b1f17" stroke-width="3.5"/>
                        <circle cx="118" cy="124" r="3.5" fill="#695b4c"/>
                        <rect x="${wL - 2}" y="144" width="${wR - wL + 4}" height="8" fill="#24150b" stroke="#0f0703" stroke-width="1"/>
                        <rect x="115" y="143" width="10" height="10" fill="#94a3b8" stroke="#334155" stroke-width="1"/>
                    `;
                }
                break;
            }

            // --- БРОНЯ ПЛУТА ---
            case 'thief_leather_vest':
                svgContent = `
                    <path d="M112,88 Q120,85 128,88 L${sR},96 Q${sR - 2},126 ${wR},152 L${wL},152 Q${sL + 2},126 ${sL},96 Z" fill="#262626" stroke="#0f0f10" stroke-width="1.2"/>
                    <path d="M114,92 L126,92 L124,148 L116,148 Z" fill="#171717"/>
                    <line x1="115" y1="106" x2="125" y2="106" stroke="#a3a3a3" stroke-width="1.2"/>
                    <line x1="115" y1="120" x2="125" y2="120" stroke="#a3a3a3" stroke-width="1.2"/>
                    <line x1="115" y1="134" x2="125" y2="134" stroke="#a3a3a3" stroke-width="1.2"/>
                    <rect x="${wL - 2}" y="144" width="${wR - wL + 4}" height="8" fill="#1c1917" stroke="#09090b" stroke-width="1"/>
                `;
                break;

            case 'shadow_leather_armor':
                svgContent = `
                    <path d="M112,88 Q120,85 128,88 L${sR},96 Q${sR - 2},126 ${wR},152 L${wL},152 Q${sL + 2},126 ${sL},96 Z" fill="#1e1b4b" stroke="#0f172a" stroke-width="1.4"/>
                    <path d="M${sL + 4},98 L${sR - 4},98 L${wR - 6},146 L${wL + 6},146 Z" fill="#312e81" opacity="0.6"/>
                    <line x1="${sL + 6}" y1="102" x2="${wR - 6}" y2="146" stroke="#7c3aed" stroke-width="2"/>
                    <line x1="${sR - 6}" y1="102" x2="${wL + 6}" y2="146" stroke="#7c3aed" stroke-width="2"/>
                    <rect x="${wL - 2}" y="144" width="${wR - wL + 4}" height="8" fill="#0f172a" stroke="#4c1d95" stroke-width="1"/>
                `;
                break;

            case 'assassin_garb':
                svgContent = `
                    <path d="M112,88 Q120,85 128,88 L${sR},96 Q${sR - 2},126 ${wR},152 L${wL},152 Q${sL + 2},126 ${sL},96 Z" fill="#18181b" stroke="#450a0a" stroke-width="1.5"/>
                    <path d="M116,92 L124,92 L120,146 Z" fill="#991b1b"/>
                    <!-- Наплечники ассасина -->
                    <polygon points="${sL - 3},94 ${sL + 14},92 ${sL + 4},114" fill="#27272a" stroke="#7f1d1d" stroke-width="1"/>
                    <polygon points="${sR + 3},94 ${sR - 14},92 ${sR - 4},114" fill="#27272a" stroke="#7f1d1d" stroke-width="1"/>
                    <rect x="${wL - 2}" y="144" width="${wR - wL + 4}" height="9" fill="#09090b" stroke="#b91c1c" stroke-width="1"/>
                `;
                break;

            case 'nightstalker_tunic':
                svgContent = `
                    <path d="M112,88 Q120,85 128,88 L${sR},96 Q${sR - 2},126 ${wR},152 L${wL},152 Q${sL + 2},126 ${sL},96 Z" fill="#09090b" stroke="#7c3aed" stroke-width="1.5"/>
                    <path d="M110,110 Q120,120 130,110 L120,140 Z" fill="#581c87"/>
                    <circle cx="120" cy="122" r="3" fill="#c084fc"/>
                    <rect x="${wL - 2}" y="144" width="${wR - wL + 4}" height="9" fill="#2e1065" stroke="#a855f7" stroke-width="1"/>
                `;
                break;

            // --- МАНТИИ ЧАРОДЕЯ ---
            case 'apprentice_robe':
                svgContent = `
                    <path d="M112,88 Q120,85 128,88 L${sR},96 L154,236 L86,236 L${sL},96 Z" fill="#1e1b4b" stroke="#3730a3" stroke-width="1.3"/>
                    <path d="M116,90 L124,90 L126,236 L114,236 Z" fill="#312e81"/>
                    <circle cx="120" cy="116" r="2.5" fill="#38bdf8"/>
                    <circle cx="120" cy="140" r="2.5" fill="#38bdf8"/>
                    <rect x="${wL - 2}" y="144" width="${wR - wL + 4}" height="8" fill="#4338ca"/>
                `;
                break;

            case 'elemental_robe':
                svgContent = `
                    <path d="M112,88 Q120,85 128,88 L${sR},96 L154,240 L86,240 L${sL},96 Z" fill="#1e293b" stroke="#0284c7" stroke-width="1.4"/>
                    <path d="M114,90 L126,90 L128,240 L112,240 Z" fill="#0369a1"/>
                    <circle cx="120" cy="116" r="3" fill="#f97316"/>
                    <circle cx="120" cy="140" r="3" fill="#38bdf8"/>
                    <circle cx="120" cy="164" r="3" fill="#a855f7"/>
                    <rect x="${wL - 2}" y="144" width="${wR - wL + 4}" height="8" fill="#0f172a" stroke="#38bdf8" stroke-width="1"/>
                `;
                break;

            case 'sorcerer_vestments':
                svgContent = `
                    <path d="M112,88 Q120,85 128,88 L${sR},96 L156,244 L84,244 L${sL},96 Z" fill="#3b0764" stroke="#7c3aed" stroke-width="1.5"/>
                    <path d="M114,90 L126,90 L128,244 L112,244 Z" fill="#581c87"/>
                    <!-- Рунические узоры -->
                    <circle cx="120" cy="116" r="3.5" fill="#c084fc" stroke="#facc15" stroke-width="1"/>
                    <circle cx="120" cy="144" r="3.5" fill="#c084fc" stroke="#facc15" stroke-width="1"/>
                    <rect x="${wL - 2}" y="144" width="${wR - wL + 4}" height="9" fill="#facc15" stroke="#854d0e" stroke-width="1"/>
                `;
                break;

            case 'archmage_robe':
                svgContent = `
                    <path d="M112,88 Q120,85 128,88 L${sR},96 L158,248 L82,248 L${sL},96 Z" fill="#0f172a" stroke="#a855f7" stroke-width="1.6"/>
                    <path d="M112,90 L128,90 L130,248 L110,248 Z" fill="#581c87"/>
                    <circle cx="120" cy="116" r="4" fill="#38bdf8" stroke="#facc15" stroke-width="1"/>
                    <circle cx="120" cy="142" r="4" fill="#e879f9" stroke="#facc15" stroke-width="1"/>
                    <circle cx="120" cy="168" r="4" fill="#38bdf8" stroke="#facc15" stroke-width="1"/>
                    <rect x="${wL - 2}" y="144" width="${wR - wL + 4}" height="9" fill="#7c3aed" stroke="#facc15" stroke-width="1.2"/>
                `;
                break;

            // --- ДОСПЕХИ СЛЕДОПЫТА ---
            case 'hunter_tunic':
                svgContent = `
                    <path d="M112,88 Q120,85 128,88 L${sR},96 Q${sR - 2},126 ${wR},152 L${wL},152 Q${sL + 2},126 ${sL},96 Z" fill="#27272a" stroke="#18181b" stroke-width="1.2"/>
                    <path d="M${sL - 2},94 Q${sL + 12},90 ${sL + 18},98 L${sL + 12},112 Z" fill="#52525b"/>
                    <line x1="${sL + 4}" y1="96" x2="${wR - 2}" y2="158" stroke="#3f3f46" stroke-width="3"/>
                    <rect x="${wL - 2}" y="144" width="${wR - wL + 4}" height="8" fill="#3f3f46"/>
                `;
                break;

            case 'scout_leather_jerkin':
                svgContent = `
                    <path d="M112,88 Q120,85 128,88 L${sR},96 Q${sR - 2},126 ${wR},152 L${wL},152 Q${sL + 2},126 ${sL},96 Z" fill="#14532d" stroke="#052e16" stroke-width="1.3"/>
                    <line x1="${sL + 4}" y1="96" x2="${wR - 2}" y2="158" stroke="#1c1917" stroke-width="3.5"/>
                    <rect x="${wL - 1}" y="145" width="10" height="12" fill="#1c1917" rx="1.5"/>
                    <rect x="${wL - 2}" y="144" width="${wR - wL + 4}" height="8" fill="#15803d" stroke="#14532d" stroke-width="1"/>
                `;
                break;

            case 'ranger_camouflage_armor':
                svgContent = `
                    <path d="M112,88 Q120,85 128,88 L${sR},96 Q${sR - 2},126 ${wR},152 L${wL},152 Q${sL + 2},126 ${sL},96 Z" fill="#166534" stroke="#14532d" stroke-width="1.4"/>
                    <!-- Камуфляжные полосы -->
                    <path d="M104,106 Q120,112 136,104" stroke="#14532d" stroke-width="3" fill="none"/>
                    <path d="M106,124 Q120,130 134,122" stroke="#14532d" stroke-width="3" fill="none"/>
                    <path d="M${sL - 4},92 Q${sL + 12},88 ${sL + 20},96 L${sL + 12},116 Z" fill="#15803d" stroke="#14532d" stroke-width="1"/>
                    <rect x="${wL - 2}" y="144" width="${wR - wL + 4}" height="9" fill="#1c1917" stroke="#ca8a04" stroke-width="1"/>
                `;
                break;

            case 'warden_coat':
                svgContent = `
                    <path d="M112,88 Q120,85 128,88 L${sR},96 Q${sR - 2},126 ${wR},152 L${wL},152 Q${sL + 2},126 ${sL},96 Z" fill="#064e3b" stroke="#022c22" stroke-width="1.5"/>
                    <!-- Чешуйчатые вставки стража чащи -->
                    <path d="M110,108 Q120,114 130,108" stroke="#ca8a04" stroke-width="2.5" stroke-dasharray="4 2" fill="none"/>
                    <path d="M110,122 Q120,128 130,122" stroke="#ca8a04" stroke-width="2.5" stroke-dasharray="4 2" fill="none"/>
                    <path d="M${sL - 4},92 Q${sL + 12},88 ${sL + 22},96 L${sL + 14},118 Z" fill="#047857" stroke="#ca8a04" stroke-width="1.2"/>
                    <path d="M${sR + 4},92 Q${sR - 12},88 ${sR - 22},96 L${sR - 14},118 Z" fill="#047857" stroke="#ca8a04" stroke-width="1.2"/>
                    <rect x="${wL - 2}" y="144" width="${wR - wL + 4}" height="9" fill="#ca8a04" stroke="#854d0e" stroke-width="1"/>
                `;
                break;

            case 'chainmail_vest':
                svgContent = `
                    <path d="M112,88 Q120,85 128,88 L${sR},96 Q${sR - 2},126 ${wR},152 L${wL},152 Q${sL + 2},126 ${sL},96 Z" fill="#475569" stroke="#1e293b" stroke-width="1.5"/>
                    <path d="M${sL - 2},94 Q${sL + 12},90 ${sL + 20},98 L${sL + 14},114 Q${sL + 4},108 ${sL - 2},112 Z" fill="#94a3b8" stroke="#1e293b" stroke-width="1"/>
                    <path d="M${sR + 2},94 Q${sR - 12},90 ${sR - 20},98 L${sR - 14},114 Q${sR - 4},108 ${sR + 2},112 Z" fill="#94a3b8" stroke="#1e293b" stroke-width="1"/>
                    <line x1="${sL + 8}" y1="110" x2="${sR - 8}" y2="110" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,3"/>
                    <line x1="${sL + 10}" y1="124" x2="${sR - 10}" y2="124" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="3,3"/>
                    <rect x="${wL - 2}" y="144" width="${wR - wL + 4}" height="9" fill="#1c1917" stroke="#0f0703" stroke-width="1"/>
                    <rect x="114" y="143" width="12" height="11" rx="1.5" fill="#eab308" stroke="#713f12" stroke-width="1"/>
                `;
                break;

            case 'scale_mail_cuirass':
                svgContent = `
                    <path d="M112,88 Q120,85 128,88 L${sR},96 Q${sR - 2},126 ${wR},152 L${wL},152 Q${sL + 2},126 ${sL},96 Z" fill="#78350f" stroke="#451a03" stroke-width="1.2"/>
                    <!-- Ряды чешуек -->
                    <path d="M${sL + 8},108 Q120,114 ${sR - 8},108" stroke="#ca8a04" stroke-width="3" stroke-dasharray="6,3" fill="none"/>
                    <path d="M${sL + 12},122 Q120,128 ${sR - 12},122" stroke="#eab308" stroke-width="3" stroke-dasharray="6,3" fill="none"/>
                    <path d="M${sL + 14},136 Q120,142 ${sR - 14},136" stroke="#ca8a04" stroke-width="3" stroke-dasharray="6,3" fill="none"/>
                    <rect x="${wL - 2}" y="144" width="${wR - wL + 4}" height="8" fill="#1c1917"/>
                `;
                break;

            case 'knight_plate_armor':
                svgContent = `
                    <path d="M112,88 Q120,85 128,88 L${sR},96 Q${sR - 2},126 ${wR},152 L${wL},152 Q${sL + 2},126 ${sL},96 Z" fill="#94a3b8" stroke="#1e293b" stroke-width="1.5"/>
                    <!-- Центральное ребро жесткости и геральдика -->
                    <line x1="120" y1="92" x2="120" y2="148" stroke="#f8fafc" stroke-width="2"/>
                    <path d="M110,115 L120,125 L130,115" stroke="#334155" stroke-width="1.5" fill="none"/>
                    <!-- Массивные рыцарские наплечники -->
                    <path d="M${sL - 6},92 Q${sL + 12},88 ${sL + 22},96 L${sL + 14},118 Q${sL - 2},112 ${sL - 6},116 Z" fill="#cbd5e1" stroke="#334155" stroke-width="1.2"/>
                    <path d="M${sR + 6},92 Q${sR - 12},88 ${sR - 22},96 L${sR - 14},118 Q${sR + 2},112 ${sR + 6},116 Z" fill="#cbd5e1" stroke="#334155" stroke-width="1.2"/>
                    <rect x="${wL - 2}" y="144" width="${wR - wL + 4}" height="9" fill="#ca8a04" stroke="#854d0e" stroke-width="1"/>
                `;
                break;

            case 'mithril_cuirass_of_titans':
                svgContent = `
                    <path d="M112,88 Q120,85 128,88 L${sR},96 Q${sR - 2},126 ${wR},152 L${wL},152 Q${sL + 2},126 ${sL},96 Z" fill="#1e3a8a" stroke="#0284c7" stroke-width="1.5"/>
                    <line x1="120" y1="92" x2="120" y2="148" stroke="#38bdf8" stroke-width="2.5"/>
                    <!-- Золотые узоры и мифриловое сияние -->
                    <circle cx="120" cy="116" r="6" fill="#38bdf8" stroke="#facc15" stroke-width="1.5"/>
                    <path d="M${sL - 6},92 Q${sL + 12},86 ${sL + 22},96 L${sL + 14},118 Z" fill="#0284c7" stroke="#38bdf8" stroke-width="1.2"/>
                    <path d="M${sR + 6},92 Q${sR - 12},86 ${sR - 22},96 L${sR - 14},118 Z" fill="#0284c7" stroke="#38bdf8" stroke-width="1.2"/>
                    <rect x="${wL - 2}" y="144" width="${wR - wL + 4}" height="9" fill="#facc15" stroke="#854d0e" stroke-width="1"/>
                `;
                break;

            case 'immortal_dragon_armor':
                svgContent = `
                    <path d="M112,88 Q120,85 128,88 L${sR},96 Q${sR - 2},126 ${wR},152 L${wL},152 Q${sL + 2},126 ${sL},96 Z" fill="#7f1d1d" stroke="#450a0a" stroke-width="1.5"/>
                    <!-- Огненные жилы и чешуя -->
                    <path d="M112,106 Q120,112 128,106 L120,124 Z" fill="#ea580c"/>
                    <circle cx="120" cy="114" r="3" fill="#fef08a"/>
                    <!-- Шипастые наплечники дракона -->
                    <polygon points="${sL - 6},90 ${sL + 18},94 ${sL - 2},118" fill="#991b1b" stroke="#f97316" stroke-width="1"/>
                    <polygon points="${sR + 6},90 ${sR - 18},94 ${sR + 2},118" fill="#991b1b" stroke="#f97316" stroke-width="1"/>
                `;
                break;

            case 'bone_golem_ribcage':
                svgContent = `
                    <path d="M112,88 Q120,85 128,88 L${sR},96 Q${sR - 2},126 ${wR},152 L${wL},152 Q${sL + 2},126 ${sL},96 Z" fill="#1c1917" stroke="#44403c" stroke-width="1.5"/>
                    <!-- Костяные ребра голема -->
                    <path d="M${sL + 6},104 Q120,110 120,116 Q120,110 ${sR - 6},104" stroke="#f1f5f9" stroke-width="3" fill="none"/>
                    <path d="M${sL + 8},118 Q120,124 120,130 Q120,124 ${sR - 8},118" stroke="#f1f5f9" stroke-width="3" fill="none"/>
                    <path d="M${sL + 12},132 Q120,138 120,144 Q120,138 ${sR - 12},132" stroke="#f1f5f9" stroke-width="3" fill="none"/>
                    <line x1="120" y1="92" x2="120" y2="148" stroke="#e2e8f0" stroke-width="4"/>
                `;
                break;

            case 'arachna_silk_mantle':
                svgContent = `
                    <path d="M112,88 Q120,85 128,88 L${sR},96 L154,244 L86,244 L${sL},96 Z" fill="#3b0764" stroke="#1e1b4b" stroke-width="1.5"/>
                    <!-- Паутинные узоры -->
                    <circle cx="120" cy="130" r="16" fill="none" stroke="#a855f7" stroke-width="1" stroke-dasharray="3 3"/>
                    <circle cx="120" cy="130" r="8" fill="none" stroke="#c084fc" stroke-width="1"/>
                    <line x1="104" y1="130" x2="136" y2="130" stroke="#c084fc" stroke-width="1"/>
                    <line x1="120" y1="114" x2="120" y2="146" stroke="#c084fc" stroke-width="1"/>
                `;
                break;

            case 'astral_weave_robe':
                svgContent = `
                    <!-- Мантия Астрального Сплетения -->
                    <path d="M112,88 Q120,85 128,88 L${sR},96 L156,248 L84,248 L${sL},96 Z" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
                    <!-- Созвездия и сияние звезд -->
                    <circle cx="110" cy="115" r="2" fill="#38bdf8"/>
                    <circle cx="130" cy="120" r="1.5" fill="#facc15"/>
                    <circle cx="118" cy="140" r="2" fill="#ffffff"/>
                    <circle cx="102" cy="170" r="1.5" fill="#38bdf8"/>
                    <circle cx="138" cy="175" r="2" fill="#e879f9"/>
                    <line x1="110" y1="115" x2="118" y2="140" stroke="#38bdf8" stroke-width="0.8" opacity="0.6"/>
                    <line x1="118" y1="140" x2="130" y2="120" stroke="#38bdf8" stroke-width="0.8" opacity="0.6"/>
                    <path d="M${sL + 2},96 Q120,108 ${sR - 2},96 L${sR - 4},118 Q120,130 ${sL + 4},118 Z" fill="#1e1b4b" stroke="#7c3aed" stroke-width="1.2"/>
                `;
                break;

            case 'demonic_carapace':
                svgContent = `
                    <!-- Панцирь Архидемона Баалхора -->
                    <path d="M112,88 Q120,85 128,88 L${sR},96 Q${sR - 2},126 ${wR},152 L${wL},152 Q${sL + 2},126 ${sL},96 Z" fill="#18181b" stroke="#450a0a" stroke-width="1.5"/>
                    <!-- Багровый адский разлом в грудине -->
                    <path d="M116,104 L120,128 L124,104 Z" fill="#ef4444"/>
                    <circle cx="120" cy="116" r="4" fill="#facc15"/>
                    <!-- Шипастые демонические наросты -->
                    <polygon points="${sL - 8},88 ${sL + 16},92 ${sL - 2},118" fill="#450a0a" stroke="#dc2626" stroke-width="1"/>
                    <polygon points="${sR + 8},88 ${sR - 16},92 ${sR + 2},118" fill="#450a0a" stroke="#dc2626" stroke-width="1"/>
                    <rect x="${wL - 2}" y="144" width="${wR - wL + 4}" height="9" fill="#09090b" stroke="#ef4444" stroke-width="1"/>
                `;
                break;

            case 'cuirass_of_the_unbroken':
                svgContent = `
                    <!-- Кираса Несломленного Героя -->
                    <path d="M112,88 Q120,85 128,88 L${sR},96 Q${sR - 2},126 ${wR},152 L${wL},152 Q${sL + 2},126 ${sL},96 Z" fill="#f8fafc" stroke="#334155" stroke-width="1.6"/>
                    <line x1="120" y1="92" x2="120" y2="148" stroke="#ca8a04" stroke-width="2.5"/>
                    <!-- Золотой лев / геральдика -->
                    <circle cx="120" cy="118" r="7" fill="#ca8a04" stroke="#854d0e" stroke-width="1"/>
                    <polygon points="120,113 116,122 124,122" fill="#fef08a"/>
                    <!-- Массивные рыцарские наплечники -->
                    <path d="M${sL - 8},90 Q${sL + 12},84 ${sL + 24},94 L${sL + 14},120 Z" fill="#cbd5e1" stroke="#334155" stroke-width="1.4"/>
                    <path d="M${sR + 8},90 Q${sR - 12},84 ${sR - 24},94 L${sR - 14},120 Z" fill="#cbd5e1" stroke="#334155" stroke-width="1.4"/>
                    <rect x="${wL - 2}" y="144" width="${wR - wL + 4}" height="9" fill="#ca8a04" stroke="#854d0e" stroke-width="1"/>
                `;
                break;

            case 'regalia_of_genesis':
                svgContent = `
                    <!-- Одеяние Первородного Творца -->
                    <path d="M112,88 Q120,85 128,88 L${sR},96 L158,252 L82,252 L${sL},96 Z" fill="#fef08a" stroke="#ca8a04" stroke-width="1.8"/>
                    <!-- Космическая белая мантия со звездами -->
                    <path d="M115,90 L125,90 L130,252 L110,252 Z" fill="#ffffff" stroke="#67e8f9" stroke-width="1"/>
                    <circle cx="120" cy="116" r="6" fill="#38bdf8" stroke="#facc15" stroke-width="1.5"/>
                    <!-- Крылатые солнечные наплечники -->
                    <polygon points="${sL - 10},88 ${sL + 20},90 ${sL - 2},122" fill="#facc15" stroke="#ca8a04" stroke-width="1.2"/>
                    <polygon points="${sR + 10},88 ${sR - 20},90 ${sR + 2},122" fill="#facc15" stroke="#ca8a04" stroke-width="1.2"/>
                    <circle cx="${sL + 4}" cy="100" r="2.5" fill="#ffffff"/>
                    <circle cx="${sR - 4}" cy="100" r="2.5" fill="#ffffff"/>
                `;
                break;

            default:
                svgContent = `
                    <path d="M112,88 Q120,85 128,88 L${sR},96 Q${sR - 2},126 ${wR},152 L${wL},152 Q${sL + 2},126 ${sL},96 Z" fill="#4d4235" stroke="#1c140d" stroke-width="1.2"/>
                `;
        }

        if (isHero) {
            return `<g id="char-torso">${svgContent}</g>`;
        }

        return `
            <svg class="svg-icon item-eq-icon armor" width="${size}" height="${size}" viewBox="80 85 80 80" fill="none">
                ${svgContent}
            </svg>
        `;
    }

    // =========================================================================
    // ПОНОЖИ (LEGS)
    // =========================================================================

    static renderPants(legsId, { visuals, classId = 'warrior', isFemale = false, isHero = false, size = 24 } = {}) {
        const leftX = isFemale ? 105 : 102;
        const rightX = isFemale ? 121 : 122;
        const legW = isFemale ? 14 : 16;

        let fillCol = '#4d4235';
        let strokeCol = '#262018';
        let plateOverlay = '';

        switch (legsId) {
            case 'leather_reinforced_pants':
                fillCol = '#78350f';
                strokeCol = '#451a03';
                plateOverlay = `
                    <rect x="${leftX + 2}" y="175" width="${legW - 4}" height="16" rx="2" fill="#92400e" stroke="#451a03" stroke-width="0.8"/>
                    <rect x="${rightX + 2}" y="175" width="${legW - 4}" height="16" rx="2" fill="#92400e" stroke="#451a03" stroke-width="0.8"/>
                `;
                break;

            case 'steel_greaves':
                fillCol = '#475569';
                strokeCol = '#1e293b';
                plateOverlay = `
                    <path d="M${leftX},170 L${leftX + legW},170 L${leftX + legW - 1},224 L${leftX - 1},224 Z" fill="#94a3b8" stroke="#1e293b" stroke-width="1"/>
                    <path d="M${rightX},170 L${rightX + legW},170 L${rightX + legW + 1},224 L${rightX + 1},224 Z" fill="#94a3b8" stroke="#1e293b" stroke-width="1"/>
                `;
                break;

            case 'plate_knight_greaves':
                fillCol = '#64748b';
                strokeCol = '#1e293b';
                plateOverlay = `
                    <path d="M${leftX},160 L${leftX + legW},160 L${leftX + legW - 1},226 L${leftX - 1},226 Z" fill="#cbd5e1" stroke="#334155" stroke-width="1.2"/>
                    <path d="M${rightX},160 L${rightX + legW},160 L${rightX + legW + 1},226 L${rightX + 1},226 Z" fill="#cbd5e1" stroke="#334155" stroke-width="1.2"/>
                    <circle cx="${leftX + legW/2}" cy="180" r="3" fill="#ca8a04"/>
                    <circle cx="${rightX + legW/2}" cy="180" r="3" fill="#ca8a04"/>
                `;
                break;

            case 'mithril_leg_guards':
                fillCol = '#1e3a8a';
                strokeCol = '#0369a1';
                plateOverlay = `
                    <path d="M${leftX},160 L${leftX + legW},160 L${leftX + legW - 1},226 L${leftX - 1},226 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="1.2"/>
                    <path d="M${rightX},160 L${rightX + legW},160 L${rightX + legW + 1},226 L${rightX + 1},226 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="1.2"/>
                `;
                break;

            case 'titan_striding_greaves':
                fillCol = '#1c1917';
                strokeCol = '#09090b';
                plateOverlay = `
                    <polygon points="${leftX},180 ${leftX + legW},180 ${leftX + legW/2},195" fill="#ca8a04"/>
                    <polygon points="${rightX},180 ${rightX + legW},180 ${rightX + legW/2},195" fill="#ca8a04"/>
                `;
                break;

            case 'clockwork_titan_greaves':
                fillCol = '#78350f';
                strokeCol = '#451a03';
                plateOverlay = `
                    <circle cx="${leftX + legW/2}" cy="185" r="4" fill="#facc15" stroke="#854d0e" stroke-width="1"/>
                `;
                break;

            case 'shadow_walker_leggings':
                fillCol = '#1e1b4b';
                strokeCol = '#0f172a';
                plateOverlay = `
                    <line x1="${leftX + 2}" y1="170" x2="${leftX + legW - 2}" y2="178" stroke="#a855f7" stroke-width="1.5"/>
                    <line x1="${rightX + 2}" y1="170" x2="${rightX + legW - 2}" y2="178" stroke="#a855f7" stroke-width="1.5"/>
                `;
                break;

            case 'abyssal_greaves_of_terror':
                fillCol = '#09090b';
                strokeCol = '#4c1d95';
                plateOverlay = `
                    <polygon points="${leftX},175 ${leftX + legW},175 ${leftX + legW - 2},215 ${leftX + 2},215" fill="#2e1065" stroke="#7c3aed" stroke-width="1"/>
                    <polygon points="${rightX},175 ${rightX + legW},175 ${rightX + legW - 2},215 ${rightX + 2},215" fill="#2e1065" stroke="#7c3aed" stroke-width="1"/>
                    <polygon points="${leftX + legW/2},165 ${leftX + 2},175 ${leftX + legW - 2},175" fill="#7c3aed"/>
                    <polygon points="${rightX + legW/2},165 ${rightX + 2},175 ${rightX + legW - 2},175" fill="#7c3aed"/>
                `;
                break;

            case 'greaves_of_the_demigod':
                fillCol = '#f8fafc';
                strokeCol = '#ca8a04';
                plateOverlay = `
                    <path d="M${leftX},160 L${leftX + legW},160 L${leftX + legW - 1},226 L${leftX - 1},226 Z" fill="#fef08a" stroke="#ca8a04" stroke-width="1.2"/>
                    <path d="M${rightX},160 L${rightX + legW},160 L${rightX + legW + 1},226 L${rightX + 1},226 Z" fill="#fef08a" stroke="#ca8a04" stroke-width="1.2"/>
                    <circle cx="${leftX + legW/2}" cy="180" r="3.5" fill="#38bdf8"/>
                    <circle cx="${rightX + legW/2}" cy="180" r="3.5" fill="#38bdf8"/>
                `;
                break;

            // --- ПОНОЖИ ПЛУТА ---
            case 'thief_breeches':
                fillCol = '#262626';
                strokeCol = '#09090b';
                plateOverlay = `
                    <line x1="${rightX + 2}" y1="168" x2="${rightX + legW - 2}" y2="172" stroke="#52525b" stroke-width="1.5"/>
                    <line x1="${rightX + 2}" y1="176" x2="${rightX + legW - 2}" y2="180" stroke="#52525b" stroke-width="1.5"/>
                `;
                break;

            case 'shadow_pants':
                fillCol = '#1e1b4b';
                strokeCol = '#0f172a';
                plateOverlay = `
                    <path d="M${leftX + 2},172 L${leftX + legW - 2},172 L${leftX + legW - 1},192 L${leftX + 1},192 Z" fill="#312e81" stroke="#4338ca" stroke-width="0.8"/>
                    <path d="M${rightX + 2},172 L${rightX + legW - 2},172 L${rightX + legW - 1},192 L${rightX + 1},192 Z" fill="#312e81" stroke="#4338ca" stroke-width="0.8"/>
                `;
                break;

            case 'assassin_trousers':
                fillCol = '#18181b';
                strokeCol = '#450a0a';
                plateOverlay = `
                    <rect x="${leftX + 2}" y="174" width="${legW - 4}" height="18" rx="2" fill="#27272a" stroke="#991b1b" stroke-width="1"/>
                    <rect x="${rightX + 2}" y="174" width="${legW - 4}" height="18" rx="2" fill="#27272a" stroke="#991b1b" stroke-width="1"/>
                `;
                break;

            case 'nightstalker_pants':
                fillCol = '#09090b';
                strokeCol = '#7c3aed';
                plateOverlay = `
                    <polygon points="${leftX + 2},174 ${leftX + legW - 2},174 ${leftX + legW/2},192" fill="#2e1065" stroke="#a855f7" stroke-width="0.8"/>
                    <polygon points="${rightX + 2},174 ${rightX + legW - 2},174 ${rightX + legW/2},192" fill="#2e1065" stroke="#a855f7" stroke-width="0.8"/>
                `;
                break;

            // --- ПОДОЛЫ / ПОНОЖИ ЧАРОДЕЯ ---
            case 'mystic_skirts':
                fillCol = '#1e1b4b';
                strokeCol = '#312e81';
                plateOverlay = `
                    <line x1="120" y1="148" x2="120" y2="226" stroke="#4338ca" stroke-width="1.2"/>
                    <circle cx="120" cy="216" r="2.5" fill="#38bdf8"/>
                `;
                break;

            case 'elemental_skirts':
                fillCol = '#1e293b';
                strokeCol = '#0284c7';
                plateOverlay = `
                    <path d="M${leftX},216 L${rightX + legW},216" stroke="#38bdf8" stroke-width="2"/>
                    <circle cx="120" cy="216" r="3" fill="#f97316"/>
                `;
                break;

            case 'sorcerer_sarong':
                fillCol = '#3b0764';
                strokeCol = '#7c3aed';
                plateOverlay = `
                    <path d="M${leftX},214 L${rightX + legW},214" stroke="#facc15" stroke-width="2"/>
                    <circle cx="120" cy="214" r="3.5" fill="#c084fc" stroke="#facc15" stroke-width="1"/>
                `;
                break;

            case 'archmage_skirts':
                fillCol = '#0f172a';
                strokeCol = '#a855f7';
                plateOverlay = `
                    <path d="M${leftX},212 L${rightX + legW},212" stroke="#e879f9" stroke-width="2.5"/>
                    <circle cx="${leftX + legW/2}" cy="190" r="2.5" fill="#38bdf8"/>
                    <circle cx="${rightX + legW/2}" cy="190" r="2.5" fill="#38bdf8"/>
                    <circle cx="120" cy="212" r="3.5" fill="#facc15"/>
                `;
                break;

            // --- ПОНОЖИ СЛЕДОПЫТА ---
            case 'hunter_pants':
                fillCol = '#27272a';
                strokeCol = '#18181b';
                plateOverlay = `
                    <rect x="${leftX + 2}" y="174" width="${legW - 4}" height="14" rx="2" fill="#3f3f46"/>
                    <rect x="${rightX + 2}" y="174" width="${legW - 4}" height="14" rx="2" fill="#3f3f46"/>
                `;
                break;

            case 'scout_trousers':
                fillCol = '#14532d';
                strokeCol = '#052e16';
                plateOverlay = `
                    <rect x="${leftX + 2}" y="172" width="${legW - 4}" height="16" rx="2" fill="#15803d" stroke="#052e16" stroke-width="0.8"/>
                    <rect x="${rightX + 2}" y="172" width="${legW - 4}" height="16" rx="2" fill="#15803d" stroke="#052e16" stroke-width="0.8"/>
                `;
                break;

            case 'ranger_gaiters':
                fillCol = '#166534';
                strokeCol = '#14532d';
                plateOverlay = `
                    <line x1="${leftX + 2}" y1="180" x2="${leftX + legW - 2}" y2="180" stroke="#ca8a04" stroke-width="1.5"/>
                    <line x1="${rightX + 2}" y1="180" x2="${rightX + legW - 2}" y2="180" stroke="#ca8a04" stroke-width="1.5"/>
                `;
                break;

            case 'warden_leggings':
                fillCol = '#064e3b';
                strokeCol = '#022c22';
                plateOverlay = `
                    <path d="M${leftX + 2},170 L${leftX + legW - 2},170 L${leftX + legW - 1},215 L${leftX + 1},215 Z" fill="#047857" stroke="#ca8a04" stroke-width="1"/>
                    <path d="M${rightX + 2},170 L${rightX + legW - 2},170 L${rightX + legW - 1},215 L${rightX + 1},215 Z" fill="#047857" stroke="#ca8a04" stroke-width="1"/>
                `;
                break;

            // --- СТАРТОВЫЕ ШТАНЫ (Меняют цвет от кастомизации и визуально отличаются по классам) ---
            case 'starter_pants': {
                const outfitCol = visuals?.outfitColor || '#4d4235';
                fillCol = outfitCol;

                if (classId === 'rogue') {
                    strokeCol = '#18181b';
                    plateOverlay = `
                        <!-- Ножные ремни плута -->
                        <line x1="${rightX + 1}" y1="168" x2="${rightX + legW - 1}" y2="172" stroke="#09090b" stroke-width="1.8"/>
                        <line x1="${rightX + 1}" y1="176" x2="${rightX + legW - 1}" y2="180" stroke="#09090b" stroke-width="1.8"/>
                        <polygon points="${rightX + 5},167 ${rightX + 9},167 ${rightX + 7},174" fill="#cbd5e1"/>
                    `;
                } else if (classId === 'mage') {
                    strokeCol = '#1e1b4b';
                    plateOverlay = `
                        <!-- Нижняя складка мантии чародея цвета кастомизации -->
                        <line x1="120" y1="148" x2="120" y2="226" stroke="#1e1b4b" stroke-width="1.2"/>
                        <circle cx="120" cy="216" r="2.5" fill="#38bdf8"/>
                    `;
                } else if (classId === 'ranger') {
                    strokeCol = '#18181b';
                    plateOverlay = `
                        <!-- Охотничьи накладки следопыта -->
                        <path d="M${leftX + 2},174 L${leftX + legW - 2},174 L${leftX + legW - 1},190 L${leftX + 1},190 Z" fill="#27272a" stroke="#18181b" stroke-width="0.8"/>
                        <path d="M${rightX + 2},174 L${rightX + legW - 2},174 L${rightX + legW - 1},190 L${rightX + 1},190 Z" fill="#27272a" stroke="#18181b" stroke-width="0.8"/>
                    `;
                } else {
                    // Воин: кожаные наколенники
                    strokeCol = '#262018';
                    plateOverlay = `
                        <rect x="${leftX + 2}" y="174" width="${legW - 4}" height="14" rx="2" fill="#3f3328" stroke="#262018" stroke-width="0.8"/>
                        <rect x="${rightX + 2}" y="174" width="${legW - 4}" height="14" rx="2" fill="#3f3328" stroke="#262018" stroke-width="0.8"/>
                    `;
                }
                break;
            }
        }

        const svgContent = `
            <path d="M${leftX},148 L${leftX + legW},148 L${leftX + legW - 1},228 L${leftX - 2},228 Z" fill="${fillCol}" stroke="${strokeCol}" stroke-width="1.2"/>
            <path d="M${rightX},148 L${rightX + legW},148 L${rightX + legW + 2},228 L${rightX + 1},228 Z" fill="${fillCol}" stroke="${strokeCol}" stroke-width="1.2"/>
            <path d="M${leftX + legW},148 L120,162 L${rightX},148 Z" fill="${fillCol}"/>
            ${plateOverlay}
        `;

        if (isHero) {
            return `<g id="char-pants">${svgContent}</g>`;
        }

        return `
            <svg class="svg-icon item-eq-icon legs" width="${size}" height="${size}" viewBox="95 145 50 85" fill="none">
                ${svgContent}
            </svg>
        `;
    }

    // =========================================================================
    // САПОГИ (BOOTS)
    // =========================================================================

    static renderBoots(bootsId, { visuals, classId = 'warrior', isFemale = false, isHero = false, size = 24 } = {}) {
        const bL = isFemale ? 102 : 98;
        const bR = isFemale ? 123 : 122;
        const w = isFemale ? 16 : 18;

        let fillCol = '#322013';
        let strokeCol = '#160d07';
        let cuffCol = '#472f1e';
        let extraOverlay = '';

        switch (bootsId) {
            case 'sturdy_leather_boots':
                fillCol = '#451a03';
                cuffCol = '#78350f';
                break;

            case 'iron_plated_boots':
                fillCol = '#334155';
                strokeCol = '#0f172a';
                cuffCol = '#64748b';
                extraOverlay = `
                    <rect x="${bL - 1}" y="255" width="${w - 2}" height="10" rx="1.5" fill="#94a3b8"/>
                    <rect x="${bR + 2}" y="255" width="${w - 2}" height="10" rx="1.5" fill="#94a3b8"/>
                `;
                break;

            case 'boots_of_the_wind':
                fillCol = '#14532d';
                strokeCol = '#052e16';
                cuffCol = '#16a34a';
                extraOverlay = `
                    <!-- Крылышки ветра -->
                    <polygon points="${bL - 5},225 ${bL - 1},235 ${bL - 6},238" fill="#ffffff"/>
                    <polygon points="${bR + w + 5},225 ${bR + w + 1},235 ${bR + w + 6},238" fill="#ffffff"/>
                `;
                break;

            case 'mithril_treads':
                fillCol = '#1e3a8a';
                strokeCol = '#0f172a';
                cuffCol = '#38bdf8';
                extraOverlay = `
                    <polygon points="${bL + 2},258 ${bL + w - 4},258 ${bL + w/2},266" fill="#facc15"/>
                    <polygon points="${bR + 4},258 ${bR + w - 2},258 ${bR + w/2},266" fill="#facc15"/>
                `;
                break;

            case 'celestial_striders':
                fillCol = '#f8fafc';
                strokeCol = '#0284c7';
                cuffCol = '#facc15';
                extraOverlay = `
                    <circle cx="${bL + w/2}" cy="245" r="2.5" fill="#38bdf8"/>
                    <circle cx="${bR + w/2}" cy="245" r="2.5" fill="#38bdf8"/>
                `;
                break;

            case 'hydra_scale_boots':
                fillCol = '#064e3b';
                strokeCol = '#022c22';
                cuffCol = '#10b981';
                extraOverlay = `
                    <circle cx="${bL + w/2}" cy="248" r="2" fill="#34d399"/>
                    <circle cx="${bR + w/2}" cy="248" r="2" fill="#34d399"/>
                `;
                break;

            case 'boots_of_the_infernal_stride':
                fillCol = '#1c1917';
                strokeCol = '#450a0a';
                cuffCol = '#ea580c';
                extraOverlay = `
                    <!-- Огненные шпоры и подошва -->
                    <polygon points="${bL - 5},266 ${bL - 1},260 ${bL - 1},270" fill="#f97316"/>
                    <polygon points="${bR + w + 5},266 ${bR + w + 1},260 ${bR + w + 1},270" fill="#f97316"/>
                    <line x1="${bL - 3}" y1="270" x2="${bL + w}" y2="270" stroke="#facc15" stroke-width="2"/>
                    <line x1="${bR}" y1="270" x2="${bR + w + 3}" y2="270" stroke="#facc15" stroke-width="2"/>
                `;
                break;

            case 'boots_of_omnipresence':
                fillCol = '#09090b';
                strokeCol = '#7c3aed';
                cuffCol = '#a855f7';
                extraOverlay = `
                    <!-- Астральные крылья вездесущности -->
                    <polygon points="${bL - 6},230 ${bL - 1},242 ${bL - 8},246" fill="#c084fc"/>
                    <polygon points="${bR + w + 6},230 ${bR + w + 1},242 ${bR + w + 8},246" fill="#c084fc"/>
                    <circle cx="${bL + w/2}" cy="250" r="2" fill="#f5d0fe"/>
                    <circle cx="${bR + w/2}" cy="250" r="2" fill="#f5d0fe"/>
                `;
                break;

            case 'striders_of_creation':
                fillCol = '#fef08a';
                strokeCol = '#ca8a04';
                cuffCol = '#facc15';
                extraOverlay = `
                    <!-- Золотые сапоги Творца со священными искрами -->
                    <circle cx="${bL + w/2}" cy="245" r="3" fill="#38bdf8"/>
                    <circle cx="${bR + w/2}" cy="245" r="3" fill="#38bdf8"/>
                    <polygon points="${bL - 4},226 ${bL},236 ${bL - 5},240" fill="#ffffff"/>
                    <polygon points="${bR + w + 4},226 ${bR + w},236 ${bR + w + 5},240" fill="#ffffff"/>
                `;
                break;

            // --- САПОГИ ПЛУТА ---
            case 'soft_leather_shoes':
                fillCol = '#262626';
                strokeCol = '#09090b';
                cuffCol = '#3f3f46';
                break;

            case 'shadow_stalker_boots':
                fillCol = '#1e1b4b';
                strokeCol = '#0f172a';
                cuffCol = '#312e81';
                extraOverlay = `
                    <line x1="${bL}" y1="242" x2="${bL + w}" y2="242" stroke="#7c3aed" stroke-width="1.2"/>
                    <line x1="${bR}" y1="242" x2="${bR + w}" y2="242" stroke="#7c3aed" stroke-width="1.2"/>
                `;
                break;

            case 'assassin_boots':
                fillCol = '#18181b';
                strokeCol = '#450a0a';
                cuffCol = '#7f1d1d';
                extraOverlay = `
                    <!-- Скрытый клинок в носке -->
                    <polygon points="${bL - 4},269 ${bL},266 ${bL},271" fill="#cbd5e1"/>
                    <polygon points="${bR + w + 4},269 ${bR + w},266 ${bR + w},271" fill="#cbd5e1"/>
                `;
                break;

            case 'phantom_treads':
                fillCol = '#09090b';
                strokeCol = '#7c3aed';
                cuffCol = '#581c87';
                extraOverlay = `
                    <circle cx="${bL + w/2}" cy="245" r="2" fill="#c084fc"/>
                    <circle cx="${bR + w/2}" cy="245" r="2" fill="#c084fc"/>
                `;
                break;

            // --- ОБУВЬ ЧАРОДЕЯ ---
            case 'cloth_slippers':
                fillCol = '#1e1b4b';
                strokeCol = '#312e81';
                cuffCol = '#4338ca';
                break;

            case 'mystic_sandals':
                fillCol = '#312e81';
                strokeCol = '#1e1b4b';
                cuffCol = '#6366f1';
                break;

            case 'enchanted_boots':
                fillCol = '#1e293b';
                strokeCol = '#0284c7';
                cuffCol = '#38bdf8';
                extraOverlay = `
                    <circle cx="${bL + w/2}" cy="245" r="2" fill="#38bdf8"/>
                    <circle cx="${bR + w/2}" cy="245" r="2" fill="#38bdf8"/>
                `;
                break;

            case 'astral_slippers':
                fillCol = '#0f172a';
                strokeCol = '#a855f7';
                cuffCol = '#c084fc';
                extraOverlay = `
                    <circle cx="${bL + w/2}" cy="245" r="2.5" fill="#facc15"/>
                    <circle cx="${bR + w/2}" cy="245" r="2.5" fill="#facc15"/>
                `;
                break;

            // --- ОБУВЬ СЛЕДОПЫТА ---
            case 'hunter_boots':
                fillCol = '#27272a';
                strokeCol = '#18181b';
                cuffCol = '#3f3f46';
                break;

            case 'scout_treads':
                fillCol = '#14532d';
                strokeCol = '#052e16';
                cuffCol = '#16a34a';
                break;

            case 'ranger_swift_boots':
                fillCol = '#166534';
                strokeCol = '#14532d';
                cuffCol = '#15803d';
                extraOverlay = `
                    <line x1="${bL}" y1="244" x2="${bL + w}" y2="244" stroke="#ca8a04" stroke-width="1.2"/>
                    <line x1="${bR}" y1="244" x2="${bR + w}" y2="244" stroke="#ca8a04" stroke-width="1.2"/>
                `;
                break;

            case 'forest_striders':
                fillCol = '#064e3b';
                strokeCol = '#022c22';
                cuffCol = '#047857';
                extraOverlay = `
                    <line x1="${bL}" y1="240" x2="${bL + w}" y2="240" stroke="#ca8a04" stroke-width="1.5"/>
                    <line x1="${bR}" y1="240" x2="${bR + w}" y2="240" stroke="#ca8a04" stroke-width="1.5"/>
                    <circle cx="${bL + w/2}" cy="250" r="2" fill="#34d399"/>
                    <circle cx="${bR + w/2}" cy="250" r="2" fill="#34d399"/>
                `;
                break;

            // --- СТАРТОВАЯ ОБУВЬ (Отличается по классам и реагирует на outfitColor кастомизации) ---
            case 'starter_boots': {
                const outfitCol = visuals?.outfitColor || '#451a03';
                cuffCol = outfitCol;

                if (classId === 'rogue') {
                    fillCol = '#18181b';
                    strokeCol = '#09090b';
                    extraOverlay = `
                        <line x1="${bL + 2}" y1="240" x2="${bL + w - 2}" y2="244" stroke="${outfitCol}" stroke-width="1.2"/>
                        <line x1="${bR + 2}" y1="240" x2="${bR + w - 2}" y2="244" stroke="${outfitCol}" stroke-width="1.2"/>
                    `;
                } else if (classId === 'mage') {
                    fillCol = '#1e1b4b';
                    strokeCol = '#0f172a';
                    extraOverlay = `
                        <circle cx="${bL + w/2}" cy="245" r="2" fill="#38bdf8"/>
                        <circle cx="${bR + w/2}" cy="245" r="2" fill="#38bdf8"/>
                    `;
                } else if (classId === 'ranger') {
                    fillCol = '#14532d';
                    strokeCol = '#052e16';
                    extraOverlay = `
                        <line x1="${bL}" y1="242" x2="${bL + w}" y2="242" stroke="#22c55e" stroke-width="1"/>
                        <line x1="${bR}" y1="242" x2="${bR + w}" y2="242" stroke="#22c55e" stroke-width="1"/>
                    `;
                } else {
                    // Воин: крепкие походные сапоги
                    fillCol = '#3b2214';
                    strokeCol = '#160d07';
                }
                break;
            }
        }

        const svgContent = `
            <path d="M${bL},220 L${bL + w},220 L${bL + w - 1},270 L${bL - 3},270 Z" fill="${fillCol}" stroke="${strokeCol}" stroke-width="1.2"/>
            <path d="M${bR},220 L${bR + w},220 L${bR + w + 3},270 L${bR + 1},270 Z" fill="${fillCol}" stroke="${strokeCol}" stroke-width="1.2"/>
            <rect x="${bL - 2}" y="219" width="${w + 3}" height="7" rx="1.5" fill="${cuffCol}" stroke="${strokeCol}" stroke-width="1"/>
            <rect x="${bR - 1}" y="219" width="${w + 3}" height="7" rx="1.5" fill="${cuffCol}" stroke="${strokeCol}" stroke-width="1"/>
            <line x1="${bL - 3}" y1="269" x2="${bL + w - 1}" y2="269" stroke="#110904" stroke-width="2.5"/>
            <line x1="${bR + 1}" y1="269" x2="${bR + w + 3}" y2="269" stroke="#110904" stroke-width="2.5"/>
            ${extraOverlay}
        `;

        if (isHero) {
            return `<g id="char-boots">${svgContent}</g>`;
        }

        return `
            <svg class="svg-icon item-eq-icon boots" width="${size}" height="${size}" viewBox="90 215 60 60" fill="none">
                ${svgContent}
            </svg>
        `;
    }

    // =========================================================================
    // АКСЕССУАРЫ И РЕЛИКВИИ МОНСТРОВ (ACCESSORIES / RELICS)
    // =========================================================================

    static renderRelic(relicId, size = 24) {
        switch (relicId) {
            case 'magma_colossus_core':
                return `
                    <svg class="svg-icon item-eq-icon relic" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#7f1d1d" stroke="#ea580c" stroke-width="1.5"/>
                        <polygon points="12,4 18,12 12,20 6,12" fill="#f97316"/>
                        <circle cx="12" cy="12" r="4" fill="#fef08a"/>
                    </svg>
                `;

            case 'heart_of_the_abyss':
                return `
                    <svg class="svg-icon item-eq-icon relic" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#09090b" stroke="#7c3aed" stroke-width="2"/>
                        <circle cx="12" cy="12" r="6" fill="#4c1d95" stroke="#a855f7" stroke-width="1"/>
                        <circle cx="12" cy="12" r="2.5" fill="#f5d0fe"/>
                        <ellipse cx="12" cy="12" rx="11" ry="3" fill="none" stroke="#c084fc" stroke-width="1" transform="rotate(-30 12 12)"/>
                    </svg>
                `;

            case 'genesis_spark_amulet':
                return `
                    <svg class="svg-icon item-eq-icon relic" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#713f12" stroke="#facc15" stroke-width="2"/>
                        <polygon points="12,2 14,9 21,9 15,13 18,20 12,15 6,20 9,13 3,9 10,9" fill="#fef08a"/>
                        <circle cx="12" cy="12" r="3" fill="#38bdf8"/>
                    </svg>
                `;

            case 'goblin_king_cutlass':
                return this.renderWeapon('goblin_king_cutlass', { size });

            default:
                return `
                    <svg class="svg-icon item-eq-icon relic" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="8" fill="#451a03" stroke="#ca8a04" stroke-width="1.5"/>
                        <circle cx="12" cy="12" r="4" fill="#facc15"/>
                    </svg>
                `;
        }
    }

    /**
     * Получить индивидуальную иконку для предмета экипировки,
     * совпадающую 1:1 со спрайтом на герое
     */
    static getItemIcon(item, size = 24) {
        if (!item) return '';

        const slot = item.slot;

        if (slot === 'mainHand') {
            return this.renderWeapon(item.id, { size, classId: item.classReq || 'warrior' });
        }
        if (slot === 'offHand') {
            return this.renderShield(item.id, { size });
        }
        if (slot === 'head') {
            return this.renderHelmet(item.id, { size });
        }
        if (slot === 'torso') {
            return this.renderTorso(item.id, { size, classId: item.classReq || 'warrior' });
        }
        if (slot === 'legs') {
            return this.renderPants(item.id, { size, classId: item.classReq || 'warrior' });
        }
        if (slot === 'boots') {
            return this.renderBoots(item.id, { size, classId: item.classReq || 'warrior' });
        }
        if ((slot === 'accessory' && item.type === 'equipment') || item.type === 'relic') {
            return this.renderRelic(item.id, size);
        }

        return '';
    }
}
