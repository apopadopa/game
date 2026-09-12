// Библиотека из 38 уникальных шаблонов комнат подземелья с процедурной отрисовкой SVG

function renderBackdrop(w, h, wallColor = '#1e212d', floorColor = '#12141c') {
    return `
        <!-- Архитектурная стена с каменной кладкой -->
        <rect x="0" y="0" width="${w}" height="${h * 0.74}" fill="${wallColor}"/>
        <line x1="0" y1="${h * 0.26}" x2="${w}" y2="${h * 0.26}" stroke="#000000" stroke-width="1" opacity="0.4"/>
        <line x1="0" y1="${h * 0.50}" x2="${w}" y2="${h * 0.50}" stroke="#000000" stroke-width="1" opacity="0.4"/>
        <!-- Линия плинтуса и стыка стены с полом -->
        <line x1="0" y1="${h * 0.74}" x2="${w}" y2="${h * 0.74}" stroke="#090a0f" stroke-width="3"/>

        <!-- Пол сектора -->
        <rect x="0" y="${h * 0.74}" width="${w}" height="${h * 0.26}" fill="${floorColor}"/>
        <line x1="${w * 0.35}" y1="${h * 0.74}" x2="${w * 0.35}" y2="${h}" stroke="#000000" stroke-width="1" opacity="0.35"/>
        <line x1="${w * 0.7}" y1="${h * 0.74}" x2="${w * 0.7}" y2="${h}" stroke="#000000" stroke-width="1" opacity="0.35"/>

        <!-- Боковые пилястры/колонны для глубины -->
        <rect x="0" y="0" width="7" height="${h}" fill="#0f1118" opacity="0.6"/>
        <rect x="${w - 7}" y="0" width="7" height="${h}" fill="#0f1118" opacity="0.6"/>
    `;
}

export const ROOM_TEMPLATES = {
    // 1. Входная арка и караулка
    entrance_hall: {
        id: 'entrance_hall',
        name: 'Врата глубин',
        theme: 'stone',
        desc: 'Широкая арочная зала из массивных гранитных блоков. В воздухе пахнет пылью и вековым холодом.',
        bgColor: '#151722',
        accentColor: '#94a3b8',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#1e2230', '#13151f')}
            <path d="M${w * 0.15},${h * 0.74} L${w * 0.15},${h * 0.35} Q${w * 0.5},${h * 0.15} ${w * 0.85},${h * 0.35} L${w * 0.85},${h * 0.74}" stroke="#334155" stroke-width="5" fill="none"/>
            <circle cx="${w * 0.18}" cy="${h * 0.45}" r="6" fill="#f59e0b" opacity="0.85"/>
            <circle cx="${w * 0.18}" cy="${h * 0.45}" r="2.5" fill="#fef08a"/>
            <circle cx="${w * 0.82}" cy="${h * 0.45}" r="6" fill="#f59e0b" opacity="0.85"/>
            <circle cx="${w * 0.82}" cy="${h * 0.45}" r="2.5" fill="#fef08a"/>
            <polygon points="${w * 0.5},${h * 0.22} ${w * 0.54},${h * 0.3} ${w * 0.5},${h * 0.36} ${w * 0.46},${h * 0.3}" fill="#64748b" stroke="#1e293b" stroke-width="1.5"/>
        `
    },

    // 2. Заброшенный архив
    ancient_library: {
        id: 'ancient_library',
        name: 'Заброшенный архив',
        theme: 'arcane',
        desc: 'Высокие полуразрушенные книжные шкафы хранят свитки забытых эпох. В воздухе мерцают остатки магии.',
        bgColor: '#17131e',
        accentColor: '#c084fc',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#21172e', '#130e1c')}
            <rect x="${w * 0.08}" y="${h * 0.22}" width="${w * 0.18}" height="${h * 0.52}" fill="#3b0764" stroke="#1e1b4b" stroke-width="2"/>
            <line x1="${w * 0.08}" y1="${h * 0.38}" x2="${w * 0.26}" y2="${h * 0.38}" stroke="#581c87" stroke-width="2"/>
            <line x1="${w * 0.08}" y1="${h * 0.54}" x2="${w * 0.26}" y2="${h * 0.54}" stroke="#581c87" stroke-width="2"/>
            <rect x="${w * 0.74}" y="${h * 0.22}" width="${w * 0.18}" height="${h * 0.52}" fill="#3b0764" stroke="#1e1b4b" stroke-width="2"/>
            <line x1="${w * 0.74}" y1="${h * 0.38}" x2="${w * 0.92}" y2="${h * 0.38}" stroke="#581c87" stroke-width="2"/>
            <line x1="${w * 0.74}" y1="${h * 0.54}" x2="${w * 0.92}" y2="${h * 0.54}" stroke="#581c87" stroke-width="2"/>
            <circle cx="${w * 0.5}" cy="${h * 0.42}" r="15" fill="#a855f7" opacity="0.3"/>
            <polygon points="${w * 0.5},${h * 0.35} ${w * 0.55},${h * 0.45} ${w * 0.45},${h * 0.45}" stroke="#e9d5ff" stroke-width="1.5" fill="none"/>
            <ellipse cx="${w * 0.42}" cy="${h * 0.8}" rx="9" ry="3" fill="#d8b4fe" opacity="0.6"/>
        `
    },

    // 3. Затопленная крипта
    flooded_grotto: {
        id: 'flooded_grotto',
        name: 'Затопленная крипта',
        theme: 'water',
        desc: 'Холодная прозрачная вода покрывает каменный пол. Со свода с глухим эхом срываются редкие капли.',
        bgColor: '#0c1b26',
        accentColor: '#38bdf8',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#112231', '#083344')}
            <polygon points="${w * 0.2},0 ${w * 0.24},${h * 0.25} ${w * 0.28},0" fill="#1e293b"/>
            <polygon points="${w * 0.7},0 ${w * 0.73},${h * 0.22} ${w * 0.76},0" fill="#1e293b"/>
            <rect x="0" y="${h * 0.68}" width="${w}" height="${h * 0.32}" fill="#0284c7" opacity="0.4"/>
            <ellipse cx="${w * 0.5}" cy="${h * 0.78}" rx="${w * 0.35}" ry="${h * 0.08}" fill="none" stroke="#7dd3fc" stroke-width="1.5" opacity="0.7"/>
            <ellipse cx="${w * 0.28}" cy="${h * 0.82}" rx="12" ry="4" fill="#047857"/>
            <circle cx="${w * 0.3}" cy="${h * 0.81}" r="2" fill="#f43f5e"/>
        `
    },

    // 4. Забытый арсенал
    forgotten_armory: {
        id: 'forgotten_armory',
        name: 'Забытый арсенал',
        theme: 'military',
        desc: 'Потрепанные стойки с оружием и щиты со стершимися гербами. Железо покрыто патиной времени.',
        bgColor: '#1c1815',
        accentColor: '#cbd5e1',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#2a221d', '#171310')}
            <rect x="${w * 0.12}" y="${h * 0.36}" width="${w * 0.15}" height="${h * 0.38}" fill="#451a03" stroke="#271102" stroke-width="1.5"/>
            <line x1="${w * 0.15}" y1="${h * 0.28}" x2="${w * 0.15}" y2="${h * 0.65}" stroke="#cbd5e1" stroke-width="2.5"/>
            <line x1="${w * 0.19}" y1="${h * 0.24}" x2="${w * 0.19}" y2="${h * 0.65}" stroke="#94a3b8" stroke-width="2.5"/>
            <line x1="${w * 0.23}" y1="${h * 0.28}" x2="${w * 0.23}" y2="${h * 0.65}" stroke="#cbd5e1" stroke-width="2.5"/>
            <path d="M${w * 0.45},${h * 0.25} L${w * 0.55},${h * 0.25} L${w * 0.55},${h * 0.45} Q${w * 0.5},${h * 0.55} ${w * 0.45},${h * 0.45} Z" fill="#991b1b" stroke="#f59e0b" stroke-width="1.8"/>
            <path d="M${w * 0.75},${h * 0.62} L${w * 0.88},${h * 0.62} L${w * 0.85},${h * 0.74} L${w * 0.72},${h * 0.74} Z" fill="#334155" stroke="#0f172a" stroke-width="1.5"/>
        `
    },

    // 5. Грибной грот
    fungal_cavern: {
        id: 'fungal_cavern',
        name: 'Грибной грот',
        theme: 'nature',
        desc: 'Влажная пещера, озаренная неземным фосфорным сиянием колоссальных спор и шляпок грибов.',
        bgColor: '#101917',
        accentColor: '#10b981',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#15241f', '#0c1713')}
            <path d="M${w * 0.2},${h * 0.74} Q${w * 0.22},${h * 0.5} ${w * 0.24},${h * 0.42} L${w * 0.28},${h * 0.42} Q${w * 0.26},${h * 0.5} ${w * 0.28},${h * 0.74} Z" fill="#34d399" opacity="0.75"/>
            <ellipse cx="${w * 0.26}" cy="${h * 0.38}" rx="22" ry="12" fill="#059669" stroke="#6ee7b7" stroke-width="2"/>
            <circle cx="${w * 0.22}" cy="${h * 0.36}" r="2.5" fill="#a7f3d0"/>
            <ellipse cx="${w * 0.78}" cy="${h * 0.52}" rx="16" ry="9" fill="#0284c7" stroke="#38bdf8" stroke-width="1.8"/>
            <circle cx="${w * 0.48}" cy="${h * 0.35}" r="3.5" fill="#6ee7b7" opacity="0.8"/>
            <circle cx="${w * 0.62}" cy="${h * 0.48}" r="2.5" fill="#38bdf8" opacity="0.7"/>
        `
    },

    // 6. Тюремные казематы
    dungeon_cells: {
        id: 'dungeon_cells',
        name: 'Тюремные казематы',
        theme: 'prison',
        desc: 'Ряд глухих камер с массивными коваными решётками. Здесь навеки остались прежние узники.',
        bgColor: '#171717',
        accentColor: '#a3a3a3',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#262626', '#121212')}
            <rect x="${w * 0.25}" y="${h * 0.2}" width="${w * 0.5}" height="${h * 0.54}" fill="#0a0a0a" stroke="#404040" stroke-width="2.5"/>
            <line x1="${w * 0.33}" y1="${h * 0.2}" x2="${w * 0.33}" y2="${h * 0.74}" stroke="#525252" stroke-width="2.5"/>
            <line x1="${w * 0.42}" y1="${h * 0.2}" x2="${w * 0.42}" y2="${h * 0.74}" stroke="#525252" stroke-width="2.5"/>
            <line x1="${w * 0.5}" y1="${h * 0.2}" x2="${w * 0.5}" y2="${h * 0.74}" stroke="#525252" stroke-width="2.5"/>
            <line x1="${w * 0.58}" y1="${h * 0.2}" x2="${w * 0.58}" y2="${h * 0.74}" stroke="#525252" stroke-width="2.5"/>
            <line x1="${w * 0.67}" y1="${h * 0.2}" x2="${w * 0.67}" y2="${h * 0.74}" stroke="#525252" stroke-width="2.5"/>
            <circle cx="${w * 0.82}" cy="${h * 0.82}" r="5.5" fill="#d4d4d4"/>
            <circle cx="${w * 0.81}" cy="${h * 0.83}" r="1.2" fill="#171717"/>
            <circle cx="${w * 0.84}" cy="${h * 0.83}" r="1.2" fill="#171717"/>
        `
    },

    // 7. Оскверненное святилище
    defiled_altar: {
        id: 'defiled_altar',
        name: 'Оскверненное святилище',
        theme: 'dark',
        desc: 'Каменный монолитный алтарь залит застывшим воском багровых свечей. В воздухе звенит шепот.',
        bgColor: '#1c1012',
        accentColor: '#ef4444',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#2b1619', '#14080a')}
            <circle cx="${w * 0.5}" cy="${h * 0.38}" r="20" stroke="#dc2626" stroke-width="1.8" fill="none" opacity="0.65"/>
            <polygon points="${w * 0.5},${h * 0.22} ${w * 0.55},${h * 0.5} ${w * 0.38},${h * 0.32} ${w * 0.62},${h * 0.32} ${w * 0.45},${h * 0.5}" stroke="#ef4444" stroke-width="1.4" fill="none" opacity="0.6"/>
            <rect x="${w * 0.36}" y="${h * 0.56}" width="${w * 0.28}" height="${h * 0.22}" fill="#29161a" stroke="#7f1d1d" stroke-width="2" rx="3"/>
            <rect x="${w * 0.4}" y="${h * 0.48}" width="4" height="12" fill="#fee2e2"/>
            <circle cx="${w * 0.4 + 2}" cy="${h * 0.45}" r="3" fill="#f87171"/>
            <rect x="${w * 0.58}" y="${h * 0.46}" width="4" height="14" fill="#fee2e2"/>
            <circle cx="${w * 0.58 + 2}" cy="${h * 0.43}" r="3" fill="#f87171"/>
        `
    },

    // 8. Магматический разлом
    lava_fissure: {
        id: 'lava_fissure',
        name: 'Магматический разлом',
        theme: 'fire',
        desc: 'Глубокая расщелина в базальтовой плите, откуда хлещет раскаленная лава и веет нестерпимым жаром.',
        bgColor: '#210d06',
        accentColor: '#f97316',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#331509', '#190803')}
            <path d="M${w * 0.1},${h * 0.86} Q${w * 0.35},${h * 0.72} ${w * 0.5},${h * 0.78} Q${w * 0.7},${h * 0.85} ${w * 0.95},${h * 0.68} L${w * 0.95},${h * 0.82} Q${w * 0.65},${h * 0.95} ${w * 0.4},${h * 0.88} L${w * 0.1},${h * 0.95} Z" fill="#ea580c"/>
            <path d="M${w * 0.15},${h * 0.88} Q${w * 0.38},${h * 0.75} ${w * 0.5},${h * 0.8} Q${w * 0.7},${h * 0.86} ${w * 0.9},${h * 0.72}" stroke="#fef08a" stroke-width="3" fill="none"/>
            <circle cx="${w * 0.32}" cy="${h * 0.55}" r="3" fill="#fb923c" opacity="0.85"/>
            <circle cx="${w * 0.68}" cy="${h * 0.45}" r="3.5" fill="#f97316" opacity="0.75"/>
        `
    },

    // 9. Хрустальный грот
    crystal_grotto: {
        id: 'crystal_grotto',
        name: 'Хрустальный грот',
        theme: 'crystal',
        desc: 'Стены усыпаны кристаллическими друзами, отражающими малейший свет радужными искрами.',
        bgColor: '#0e1828',
        accentColor: '#06b6d4',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#13243a', '#081422')}
            <polygon points="${w * 0.15},${h * 0.74} ${w * 0.18},${h * 0.32} ${w * 0.23},${h * 0.38} ${w * 0.22},${h * 0.74}" fill="#06b6d4" stroke="#67e8f9" stroke-width="1.5"/>
            <polygon points="${w * 0.22},${h * 0.74} ${w * 0.25},${h * 0.42} ${w * 0.28},${h * 0.5} ${w * 0.27},${h * 0.74}" fill="#0891b2" stroke="#a5f3fc" stroke-width="1.2"/>
            <polygon points="${w * 0.85},${h * 0.74} ${w * 0.8},${h * 0.34} ${w * 0.76},${h * 0.42} ${w * 0.78},${h * 0.74}" fill="#8b5cf6" stroke="#c4b5fd" stroke-width="1.5"/>
            <polygon points="${w * 0.48},${h * 0.32} ${w * 0.5},${h * 0.26} ${w * 0.52},${h * 0.32} ${w * 0.5},${h * 0.38}" fill="#e0f2fe"/>
            <polygon points="${w * 0.58},${h * 0.44} ${w * 0.6},${h * 0.4} ${w * 0.62},${h * 0.44} ${w * 0.6},${h * 0.48}" fill="#e0f2fe"/>
        `
    },

    // 10. Заброшенная штольня
    abandoned_mine: {
        id: 'abandoned_mine',
        name: 'Заброшенная штольня',
        theme: 'mine',
        desc: 'Старые деревянные распорки удерживают свод. По каменному полу проложены ржавые рельсы.',
        bgColor: '#1b1916',
        accentColor: '#d97706',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#292521', '#14120f')}
            <rect x="${w * 0.18}" y="${h * 0.15}" width="10" height="${h * 0.6}" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
            <rect x="${w * 0.78}" y="${h * 0.15}" width="10" height="${h * 0.6}" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
            <rect x="${w * 0.15}" y="${h * 0.14}" width="${w * 0.7}" height="12" fill="#92400e" stroke="#451a03" stroke-width="1.5"/>
            <line x1="${w * 0.05}" y1="${h * 0.82}" x2="${w * 0.95}" y2="${h * 0.82}" stroke="#64748b" stroke-width="2.5"/>
            <line x1="${w * 0.05}" y1="${h * 0.88}" x2="${w * 0.95}" y2="${h * 0.88}" stroke="#64748b" stroke-width="2.5"/>
            <rect x="${w * 0.52}" y="${h * 0.6}" width="26" height="16" fill="#44403c" stroke="#1c1917" stroke-width="1.5" rx="2"/>
            <circle cx="${w * 0.52 + 5}" cy="${h * 0.6 + 16}" r="3" fill="#1c1917"/>
            <circle cx="${w * 0.52 + 21}" cy="${h * 0.6 + 16}" r="3" fill="#1c1917"/>
        `
    },

    // 11. Алхимическая лаборатория
    alchemy_lab: {
        id: 'alchemy_lab',
        name: 'Алхимическая лаборатория',
        theme: 'alchemy',
        desc: 'Столы заставлены ретортами со светящимися эликсирами. В воздухе витает запах серы.',
        bgColor: '#141a16',
        accentColor: '#22c55e',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#1a2922', '#0c1511')}
            <rect x="${w * 0.22}" y="${h * 0.56}" width="${w * 0.56}" height="${h * 0.22}" fill="#292524" stroke="#1c1917" stroke-width="2" rx="2"/>
            <polygon points="${w * 0.32},${h * 0.56} ${w * 0.38},${h * 0.56} ${w * 0.36},${h * 0.44} ${w * 0.34},${h * 0.44}" fill="#22c55e" opacity="0.85" stroke="#15803d" stroke-width="1"/>
            <circle cx="${w * 0.5}" cy="${h * 0.52}" r="8" fill="#3b82f6" opacity="0.8"/>
            <circle cx="${w * 0.35}" cy="${h * 0.36}" r="2" fill="#86efac"/>
            <circle cx="${w * 0.5}" cy="${h * 0.38}" r="2" fill="#93c5fd"/>
        `
    },

    // 12. Усыпальница предков
    crypt_sarcophagi: {
        id: 'crypt_sarcophagi',
        name: 'Усыпальница предков',
        theme: 'tomb',
        desc: 'Ряд массивных каменных саркофагов древних рыцарей. Скульптуры на крышках сжимают мечи.',
        bgColor: '#181a20',
        accentColor: '#94a3b8',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#252934', '#11131a')}
            <rect x="${w * 0.28}" y="${h * 0.5}" width="${w * 0.44}" height="${h * 0.26}" fill="#334155" stroke="#1e293b" stroke-width="2" rx="3"/>
            <rect x="${w * 0.25}" y="${h * 0.46}" width="${w * 0.5}" height="9" fill="#475569" stroke="#1e293b" stroke-width="1.5" rx="2"/>
            <circle cx="${w * 0.36}" cy="${h * 0.42}" r="5" fill="#64748b"/>
            <line x1="${w * 0.44}" y1="${h * 0.42}" x2="${w * 0.65}" y2="${h * 0.42}" stroke="#64748b" stroke-width="4.5" stroke-linecap="round"/>
        `
    },

    // 13. Зал ловушек
    trapped_hall: {
        id: 'trapped_hall',
        name: 'Зал нажимных плит',
        theme: 'trap',
        desc: 'Пол вымощен подозрительно ровными плитами. В каменных стенах виднеются узкие бойницы.',
        bgColor: '#1c1a16',
        accentColor: '#eab308',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#2a2620', '#14120e')}
            <rect x="${w * 0.2}" y="${h * 0.78}" width="28" height="12" fill="#292524" stroke="#ca8a04" stroke-width="1.5"/>
            <rect x="${w * 0.45}" y="${h * 0.82}" width="32" height="12" fill="#292524" stroke="#eab308" stroke-width="1.8"/>
            <rect x="${w * 0.72}" y="${h * 0.78}" width="28" height="12" fill="#292524" stroke="#ca8a04" stroke-width="1.5"/>
            <rect x="${w * 0.1}" y="${h * 0.35}" width="5" height="14" fill="#0c0a09"/>
            <rect x="${w * 0.88}" y="${h * 0.35}" width="5" height="14" fill="#0c0a09"/>
        `
    },

    // 14. Запечатанная сокровищница
    treasury_vault: {
        id: 'treasury_vault',
        name: 'Тайная сокровищница',
        theme: 'gold',
        desc: 'Кованый сундук посреди рассыпанных золотых дублонов и драгоценных камней.',
        bgColor: '#201b12',
        accentColor: '#facc15',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#30281b', '#181309')}
            <circle cx="${w * 0.5}" cy="${h * 0.54}" r="28" fill="#facc15" opacity="0.18"/>
            <rect x="${w * 0.38}" y="${h * 0.54}" width="${w * 0.24}" height="${h * 0.22}" fill="#78350f" stroke="#451a03" stroke-width="2" rx="3"/>
            <path d="M${w * 0.38},${h * 0.54} Q${w * 0.5},${h * 0.44} ${w * 0.62},${h * 0.54} Z" fill="#92400e" stroke="#451a03" stroke-width="2"/>
            <circle cx="${w * 0.32}" cy="${h * 0.82}" r="4" fill="#facc15"/>
            <circle cx="${w * 0.66}" cy="${h * 0.83}" r="4" fill="#facc15"/>
            <circle cx="${w * 0.7}" cy="${h * 0.81}" r="3" fill="#fbbf24"/>
        `
    },

    // 15. Заросшие руины
    overgrown_ruins: {
        id: 'overgrown_ruins',
        name: 'Заросшие руины',
        theme: 'overgrown',
        desc: 'Толстые корни многовековых древ пробили толщу камня, оплетая остатки древних статуй.',
        bgColor: '#131a15',
        accentColor: '#22c55e',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#1b2920', '#0e1711')}
            <path d="M${w * 0.1},0 Q${w * 0.18},${h * 0.4} ${w * 0.25},${h * 0.74}" stroke="#451a03" stroke-width="5" fill="none"/>
            <path d="M${w * 0.9},0 Q${w * 0.8},${h * 0.35} ${w * 0.72},${h * 0.74}" stroke="#451a03" stroke-width="6" fill="none"/>
            <circle cx="${w * 0.15}" cy="${h * 0.25}" r="8" fill="#15803d" opacity="0.8"/>
            <circle cx="${w * 0.82}" cy="${h * 0.3}" r="10" fill="#15803d" opacity="0.8"/>
            <rect x="${w * 0.44}" y="${h * 0.56}" width="24" height="20" fill="#475569" stroke="#1e293b" stroke-width="1.5"/>
        `
    },

    // 16. Кузница бездны
    abyssal_forge: {
        id: 'abyssal_forge',
        name: 'Кузница бездны',
        theme: 'forge',
        desc: 'Древний горн пылает холодным лазурным пламенем. Здесь ковалось зачарованное оружие титанов.',
        bgColor: '#141622',
        accentColor: '#38bdf8',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#1e2436', '#0f121d')}
            <rect x="${w * 0.36}" y="${h * 0.3}" width="${w * 0.28}" height="${h * 0.45}" fill="#1e293b" stroke="#0f172a" stroke-width="2" rx="4"/>
            <path d="M${w * 0.42},${h * 0.68} Q${w * 0.5},${h * 0.48} ${w * 0.58},${h * 0.68} Z" fill="#0284c7"/>
            <path d="M${w * 0.45},${h * 0.68} Q${w * 0.5},${h * 0.56} ${w * 0.55},${h * 0.68} Z" fill="#7dd3fc"/>
            <path d="M${w * 0.16},${h * 0.65} L${w * 0.28},${h * 0.65} L${w * 0.25},${h * 0.76} L${w * 0.14},${h * 0.76} Z" fill="#334155"/>
        `
    },

    // 17. Пыточная
    torture_chamber: {
        id: 'torture_chamber',
        name: 'Пыточная комната',
        theme: 'torture',
        desc: 'Мрачные механизмы из железа и дуба. С потолка на скрипучих цепях свисают пустые клетки.',
        bgColor: '#181413',
        accentColor: '#b91c1c',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#291f1c', '#120d0b')}
            <line x1="${w * 0.3}" y1="0" x2="${w * 0.3}" y2="${h * 0.26}" stroke="#525252" stroke-width="2"/>
            <rect x="${w * 0.24}" y="${h * 0.26}" width="22" height="28" fill="none" stroke="#737373" stroke-width="2" rx="2"/>
            <line x1="${w * 0.28}" y1="${h * 0.26}" x2="${w * 0.28}" y2="${h * 0.26 + 28}" stroke="#737373" stroke-width="1.5"/>
            <line x1="${w * 0.34}" y1="${h * 0.26}" x2="${w * 0.34}" y2="${h * 0.26 + 28}" stroke="#737373" stroke-width="1.5"/>
            <rect x="${w * 0.6}" y="${h * 0.58}" width="${w * 0.28}" height="12" fill="#78350f" transform="rotate(-8 ${w * 0.6} ${h * 0.58})"/>
        `
    },

    // 18. Зал зеркал
    hall_of_mirrors: {
        id: 'hall_of_mirrors',
        name: 'Зал зеркал',
        theme: 'arcane',
        desc: 'Высокие зеркала в готических рамах отражают тени, которых нет в самой комнате.',
        bgColor: '#14141e',
        accentColor: '#818cf8',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#202032', '#10101a')}
            <rect x="${w * 0.4}" y="${h * 0.18}" width="${w * 0.2}" height="${h * 0.55}" fill="#2e2d42" stroke="#818cf8" stroke-width="2.5" rx="5"/>
            <path d="M${w * 0.44},${h * 0.26} L${w * 0.54},${h * 0.65}" stroke="#e0e7ff" stroke-width="1.5" opacity="0.6"/>
            <circle cx="${w * 0.5}" cy="${h * 0.38}" r="6" fill="#c7d2fe" opacity="0.4"/>
            <rect x="${w * 0.16}" y="${h * 0.25}" width="${w * 0.16}" height="${h * 0.48}" fill="#1e1e2e" stroke="#6366f1" stroke-width="1.8" rx="4"/>
            <rect x="${w * 0.68}" y="${h * 0.25}" width="${w * 0.16}" height="${h * 0.48}" fill="#1e1e2e" stroke="#6366f1" stroke-width="1.8" rx="4"/>
        `
    },

    // 19. Мост над бездной
    chasm_bridge: {
        id: 'chasm_bridge',
        name: 'Мост над бездной',
        theme: 'chasm',
        desc: 'Узкий настил пересекает бездонную расщелину. Снизу веет ледяным ветром.',
        bgColor: '#090a10',
        accentColor: '#64748b',
        renderSvg: (w, h) => `
            <rect x="${w * 0.2}" y="0" width="${w * 0.6}" height="${h}" fill="#030407"/>
            <rect x="0" y="0" width="${w * 0.2}" height="${h}" fill="#1e293b"/>
            <rect x="${w * 0.8}" y="0" width="${w * 0.2}" height="${h}" fill="#1e293b"/>
            <path d="M${w * 0.18},${h * 0.68} Q${w * 0.5},${h * 0.76} ${w * 0.82},${h * 0.68}" stroke="#78350f" stroke-width="6" fill="none"/>
            <path d="M${w * 0.18},${h * 0.58} Q${w * 0.5},${h * 0.66} ${w * 0.82},${h * 0.58}" stroke="#451a03" stroke-width="2" fill="none"/>
        `
    },

    // 20. Покинутый лагерь
    nomad_camp: {
        id: 'nomad_camp',
        name: 'Привал странника',
        theme: 'camp',
        desc: 'Следы недавней стоянки смелого исследователя. Кострище еще хранит тепло угасших углей.',
        bgColor: '#1d1714',
        accentColor: '#f97316',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#2c221c', '#140f0c')}
            <ellipse cx="${w * 0.5}" cy="${h * 0.74}" rx="15" ry="5" fill="#451a03"/>
            <circle cx="${w * 0.5}" cy="${h * 0.73}" r="4.5" fill="#ea580c"/>
            <circle cx="${w * 0.5}" cy="${h * 0.72}" r="2" fill="#fef08a"/>
            <line x1="${w * 0.46}" y1="${h * 0.78}" x2="${w * 0.5}" y2="${h * 0.64}" stroke="#334155" stroke-width="2"/>
            <line x1="${w * 0.54}" y1="${h * 0.78}" x2="${w * 0.5}" y2="${h * 0.64}" stroke="#334155" stroke-width="2"/>
            <ellipse cx="${w * 0.5}" cy="${h * 0.66}" rx="5" ry="3" fill="#0f172a"/>
            <rect x="${w * 0.22}" y="${h * 0.68}" width="26" height="12" fill="#78350f" rx="3"/>
        `
    },

    // 21. Собор теней
    cathedral_of_shadows: {
        id: 'cathedral_of_shadows',
        name: 'Собор теней',
        theme: 'gothic',
        desc: 'Монументальный сводчатый зал с высокими готическими колоннами и витражной розой.',
        bgColor: '#13141c',
        accentColor: '#6366f1',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#1f2131', '#10111a')}
            <rect x="${w * 0.15}" y="${h * 0.16}" width="14" height="${h * 0.6}" fill="#252736" stroke="#161722" stroke-width="1.5"/>
            <rect x="${w * 0.8}" y="${h * 0.16}" width="14" height="${h * 0.6}" fill="#252736" stroke="#161722" stroke-width="1.5"/>
            <circle cx="${w * 0.5}" cy="${h * 0.35}" r="16" fill="#1e1b4b" stroke="#6366f1" stroke-width="2"/>
            <circle cx="${w * 0.5}" cy="${h * 0.35}" r="8" fill="#312e81" stroke="#818cf8" stroke-width="1.2"/>
        `
    },

    // 22. Тронный зал владыки (Босс-уровень)
    boss_arena: {
        id: 'boss_arena',
        name: 'Тронный зал владыки',
        theme: 'boss',
        desc: 'Зловещая цитадель ужаса. Перед лестницей спуска возвышается трон повелителя катакомб.',
        bgColor: '#240808',
        accentColor: '#ef4444',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#3a1010', '#180404')}
            <circle cx="${w * 0.5}" cy="${h * 0.45}" r="${w * 0.38}" fill="#ef4444" opacity="0.18"/>
            <path d="M${w * 0.38},${h * 0.74} L${w * 0.38},${h * 0.42} L${w * 0.44},${h * 0.25} L${w * 0.5},${h * 0.18} L${w * 0.56},${h * 0.25} L${w * 0.62},${h * 0.42} L${w * 0.62},${h * 0.74} Z" fill="#180404" stroke="#7f1d1d" stroke-width="2.5"/>
            <polygon points="${w * 0.42},${h * 0.26} ${w * 0.36},${h * 0.15} ${w * 0.44},${h * 0.22}" fill="#991b1b"/>
            <polygon points="${w * 0.58},${h * 0.26} ${w * 0.64},${h * 0.15} ${w * 0.56},${h * 0.22}" fill="#991b1b"/>
            <circle cx="${w * 0.5}" cy="${h * 0.38}" r="7" fill="#dc2626"/>
            <circle cx="${w * 0.48}" cy="${h * 0.39}" r="1.5" fill="#000"/>
            <circle cx="${w * 0.52}" cy="${h * 0.39}" r="1.5" fill="#000"/>
            <path d="M${w * 0.22},${h * 0.22} L${w * 0.28},${h * 0.22} L${w * 0.28},${h * 0.68} L${w * 0.25},${h * 0.74} L${w * 0.22},${h * 0.68} Z" fill="#7f1d1d" stroke="#450a0a" stroke-width="1.5"/>
            <path d="M${w * 0.72},${h * 0.22} L${w * 0.78},${h * 0.22} L${w * 0.78},${h * 0.68} L${w * 0.75},${h * 0.74} L${w * 0.72},${h * 0.68} Z" fill="#7f1d1d" stroke="#450a0a" stroke-width="1.5"/>
        `
    },

    // 23. Логово шелкопряда (Паучье логово)
    spider_lair: {
        id: 'spider_lair',
        name: 'Логово шелкопряда',
        theme: 'beast',
        desc: 'Стены затянуты плотной липкой паутиной. В сумраке мерцают сотни голодных красных глаз.',
        bgColor: '#130e1c',
        accentColor: '#c084fc',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#1f1630', '#100a18')}
            <!-- Паутина в углах -->
            <path d="M0,0 Q${w * 0.3},${h * 0.1} ${w * 0.35},0 M0,${h * 0.35} Q${w * 0.1},${h * 0.3} 0,0 M0,${h * 0.2} Q${w * 0.2},${h * 0.2} ${w * 0.2},0" stroke="#cbd5e1" stroke-width="1.2" opacity="0.6" fill="none"/>
            <path d="M${w},0 Q${w * 0.7},${h * 0.1} ${w * 0.65},0 M${w},${h * 0.35} Q${w * 0.9},${h * 0.3} ${w},0 M${w},${h * 0.2} Q${w * 0.8},${h * 0.2} ${w * 0.8},0" stroke="#cbd5e1" stroke-width="1.2" opacity="0.6" fill="none"/>
            <!-- Подвешенный кокон -->
            <line x1="${w * 0.5}" y1="0" x2="${w * 0.5}" y2="${h * 0.25}" stroke="#e2e8f0" stroke-width="1.5"/>
            <ellipse cx="${w * 0.5}" cy="${h * 0.38}" rx="11" ry="18" fill="#e2e8f0" opacity="0.85" stroke="#94a3b8" stroke-width="1.2"/>
            <!-- Красные глаза пауков во тьме -->
            <circle cx="${w * 0.22}" cy="${h * 0.4}" r="2" fill="#ef4444"/>
            <circle cx="${w * 0.25}" cy="${h * 0.4}" r="2" fill="#ef4444"/>
            <circle cx="${w * 0.78}" cy="${h * 0.45}" r="2" fill="#ef4444"/>
            <circle cx="${w * 0.81}" cy="${h * 0.45}" r="2" fill="#ef4444"/>
        `
    },

    // 24. Колодец желаний
    sunken_well: {
        id: 'sunken_well',
        name: 'Колодец желаний',
        theme: 'water',
        desc: 'Древний каменный колодец, наполненный лазурной мерцающей водой. На дне блестят монеты.',
        bgColor: '#0f1822',
        accentColor: '#38bdf8',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#172738', '#0b141e')}
            <!-- Каменный колодец по центру -->
            <ellipse cx="${w * 0.5}" cy="${h * 0.65}" rx="32" ry="16" fill="#334155" stroke="#1e293b" stroke-width="2.5"/>
            <ellipse cx="${w * 0.5}" cy="${h * 0.63}" rx="26" ry="12" fill="#0284c7"/>
            <ellipse cx="${w * 0.5}" cy="${h * 0.63}" rx="18" ry="8" fill="#38bdf8" opacity="0.75"/>
            <!-- Деревянные стойки ворота колодца -->
            <line x1="${w * 0.38}" y1="${h * 0.65}" x2="${w * 0.38}" y2="${h * 0.32}" stroke="#78350f" stroke-width="3"/>
            <line x1="${w * 0.62}" y1="${h * 0.65}" x2="${w * 0.62}" y2="${h * 0.32}" stroke="#78350f" stroke-width="3"/>
            <polygon points="${w * 0.34},${h * 0.32} ${w * 0.5},${h * 0.22} ${w * 0.66},${h * 0.32}" fill="#92400e" stroke="#451a03" stroke-width="1.5"/>
            <!-- Монеты на полу возле колодца -->
            <circle cx="${w * 0.32}" cy="${h * 0.8}" r="3.5" fill="#facc15"/>
            <circle cx="${w * 0.68}" cy="${h * 0.82}" r="3.5" fill="#facc15"/>
        `
    },

    // 25. Зал призраков
    haunted_ballroom: {
        id: 'haunted_ballroom',
        name: 'Зал призраков',
        theme: 'specter',
        desc: 'Рухнувший бронзовый канделябр и потрескавшиеся мраморные плиты. В воздухе кружат тени.',
        bgColor: '#161424',
        accentColor: '#a78bfa',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#252038', '#110f1c')}
            <!-- Шахматный пол -->
            <polygon points="${w * 0.2},${h * 0.74} ${w * 0.35},${h * 0.74} ${w * 0.28},${h * 0.9} ${w * 0.12},${h * 0.9}" fill="#334155" opacity="0.5"/>
            <polygon points="${w * 0.5},${h * 0.74} ${w * 0.65},${h * 0.74} ${w * 0.58},${h * 0.9} ${w * 0.42},${h * 0.9}" fill="#334155" opacity="0.5"/>
            <!-- Упавшая люстра -->
            <ellipse cx="${w * 0.5}" cy="${h * 0.68}" rx="28" ry="10" fill="#78350f" stroke="#451a03" stroke-width="2"/>
            <line x1="${w * 0.42}" y1="${h * 0.66}" x2="${w * 0.42}" y2="${h * 0.58}" stroke="#fef08a" stroke-width="2"/>
            <circle cx="${w * 0.42}" cy="${h * 0.56}" r="2.5" fill="#f59e0b"/>
            <line x1="${w * 0.58}" y1="${h * 0.66}" x2="${w * 0.58}" y2="${h * 0.58}" stroke="#fef08a" stroke-width="2"/>
            <circle cx="${w * 0.58}" cy="${h * 0.56}" r="2.5" fill="#f59e0b"/>
        `
    },

    // 26. Ядовитая оранжерея
    poison_greenhouse: {
        id: 'poison_greenhouse',
        name: 'Ядовитая оранжерея',
        theme: 'poison',
        desc: 'Огромные хищные бутоны источают едкую пыльцу. Земля сочится зеленым гнилостным ядом.',
        bgColor: '#0c1a12',
        accentColor: '#10b981',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#15291e', '#09160f')}
            <!-- Ядовитый цветок по центру -->
            <path d="M${w * 0.5},${h * 0.74} Q${w * 0.48},${h * 0.55} ${w * 0.5},${h * 0.45}" stroke="#065f46" stroke-width="5" fill="none"/>
            <path d="M${w * 0.42},${h * 0.45} Q${w * 0.5},${h * 0.28} ${w * 0.58},${h * 0.45} Z" fill="#047857" stroke="#34d399" stroke-width="1.8"/>
            <circle cx="${w * 0.5}" cy="${h * 0.42}" r="5" fill="#a7f3d0"/>
            <!-- Ядовитые испарения -->
            <ellipse cx="${w * 0.5}" cy="${h * 0.78}" rx="${w * 0.35}" ry="${h * 0.08}" fill="#059669" opacity="0.35"/>
        `
    },

    // 27. Подземная обсерватория
    stellar_observatory: {
        id: 'stellar_observatory',
        name: 'Подземная обсерватория',
        theme: 'astral',
        desc: 'Колоссальная медная астролябия со сферами планет. Свод расписан звездными созвездиями.',
        bgColor: '#0d1322',
        accentColor: '#38bdf8',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#172238', '#0c111e')}
            <circle cx="${w * 0.5}" cy="${h * 0.45}" r="34" stroke="#ca8a04" stroke-width="2" fill="none" opacity="0.75"/>
            <ellipse cx="${w * 0.5}" cy="${h * 0.45}" rx="34" ry="14" stroke="#eab308" stroke-width="1.5" fill="none" transform="rotate(-25 ${w * 0.5} ${h * 0.45})"/>
            <circle cx="${w * 0.5}" cy="${h * 0.45}" r="8" fill="#f59e0b"/>
            <circle cx="${w * 0.68}" cy="${h * 0.35}" r="4" fill="#38bdf8"/>
            <circle cx="${w * 0.34}" cy="${h * 0.52}" r="3.5" fill="#ec4899"/>
        `
    },

    // 28. Пустынный мавзолей
    pharaoh_tomb: {
        id: 'pharaoh_tomb',
        name: 'Пустынный мавзолей',
        theme: 'sand',
        desc: 'Древний мавзолей забытых владык юга. Пол усыпан песком, у стен стоят ритуальные канопы.',
        bgColor: '#221910',
        accentColor: '#facc15',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#34271a', '#1a130c')}
            <!-- Песчаная дюна на полу -->
            <path d="M0,${h * 0.74} Q${w * 0.4},${h * 0.7} ${w * 0.7},${h * 0.76} L${w},${h * 0.72} L${w},${h} L0,${h} Z" fill="#b45309" opacity="0.45"/>
            <!-- Золотой саркофаг у стены -->
            <rect x="${w * 0.42}" y="${h * 0.28}" width="${w * 0.16}" height="${h * 0.46}" rx="12" fill="#ca8a04" stroke="#78350f" stroke-width="2"/>
            <rect x="${w * 0.44}" y="${h * 0.36}" width="${w * 0.12}" height="6" fill="#0284c7"/>
            <rect x="${w * 0.44}" y="${h * 0.46}" width="${w * 0.12}" height="6" fill="#0284c7"/>
            <!-- Канопы -->
            <rect x="${w * 0.2}" y="${h * 0.65}" width="10" height="14" fill="#fef3c7" stroke="#78350f" rx="2"/>
            <rect x="${w * 0.76}" y="${h * 0.65}" width="10" height="14" fill="#fef3c7" stroke="#78350f" rx="2"/>
        `
    },

    // 29. Зал разбитых идолов
    broken_statues: {
        id: 'broken_statues',
        name: 'Зал разбитых идолов',
        theme: 'ruins',
        desc: 'Гигантская расколотая голова титана покоится среди обломков мраморных колонн.',
        bgColor: '#161920',
        accentColor: '#94a3b8',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#232733', '#11131a')}
            <!-- Упавшая гигантская голова статуи -->
            <ellipse cx="${w * 0.5}" cy="${h * 0.65}" rx="22" ry="18" fill="#475569" stroke="#1e293b" stroke-width="2" transform="rotate(20 ${w * 0.5} ${h * 0.65})"/>
            <path d="M${w * 0.44},${h * 0.65} L${w * 0.54},${h * 0.65}" stroke="#1e293b" stroke-width="2"/>
            <!-- Обломки колонн -->
            <rect x="${w * 0.18}" y="${h * 0.68}" width="24" height="12" fill="#64748b" stroke="#334155" stroke-width="1.5" rx="2"/>
            <rect x="${w * 0.75}" y="${h * 0.64}" width="26" height="14" fill="#64748b" stroke="#334155" stroke-width="1.5" rx="2" transform="rotate(-15 ${w * 0.75} ${h * 0.64})"/>
        `
    },

    // 30. Затопленный акведук
    ancient_aqueduct: {
        id: 'ancient_aqueduct',
        name: 'Древний акведук',
        theme: 'water',
        desc: 'Каменные своды акведука треснули, и вниз обрушивается бурлящий поток воды.',
        bgColor: '#0b1922',
        accentColor: '#38bdf8',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#132837', '#09151d')}
            <!-- Арочный мост акведука -->
            <rect x="0" y="${h * 0.28}" width="${w}" height="14" fill="#334155" stroke="#1e293b" stroke-width="1.5"/>
            <!-- Водопад по центру -->
            <rect x="${w * 0.44}" y="${h * 0.28}" width="${w * 0.12}" height="${h * 0.46}" fill="#38bdf8" opacity="0.6"/>
            <line x1="${w * 0.47}" y1="${h * 0.28}" x2="${w * 0.47}" y2="${h * 0.74}" stroke="#e0f2fe" stroke-width="1.5"/>
            <line x1="${w * 0.53}" y1="${h * 0.28}" x2="${w * 0.53}" y2="${h * 0.74}" stroke="#e0f2fe" stroke-width="1.5"/>
            <ellipse cx="${w * 0.5}" cy="${h * 0.75}" rx="24" ry="7" fill="#67e8f9" opacity="0.8"/>
        `
    },

    // 31. Пороховой склад
    powder_magazine: {
        id: 'powder_magazine',
        name: 'Пороховой склад',
        theme: 'danger',
        desc: 'Штабели бочек с черным порохом. Одно неловкое движение с факелом грозит страшным взрывом.',
        bgColor: '#1c1815',
        accentColor: '#f97316',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#29221d', '#14100d')}
            <!-- Бочки с порохом -->
            <ellipse cx="${w * 0.3}" cy="${h * 0.65}" rx="14" ry="18" fill="#44403c" stroke="#1c1917" stroke-width="1.5"/>
            <line x1="${w * 0.2}" y1="${h * 0.65}" x2="${w * 0.4}" y2="${h * 0.65}" stroke="#ca8a04" stroke-width="1.5"/>
            <ellipse cx="${w * 0.46}" cy="${h * 0.66}" rx="14" ry="18" fill="#44403c" stroke="#1c1917" stroke-width="1.5"/>
            <!-- Связка динамита -->
            <rect x="${w * 0.72}" y="${h * 0.66}" width="16" height="18" fill="#dc2626" rx="1.5"/>
            <line x1="${w * 0.8}" y1="${h * 0.66}" x2="${w * 0.82}" y2="${h * 0.55}" stroke="#facc15" stroke-width="1.5"/>
            <circle cx="${w * 0.82}" cy="${h * 0.55}" r="2.5" fill="#f97316"/>
        `
    },

    // 32. Ледяной чертог
    frozen_vault: {
        id: 'frozen_vault',
        name: 'Ледяной чертог',
        theme: 'frost',
        desc: 'Древний ледник сковал стены прочным хрустальным панцирем. Дыхание превращается в иней.',
        bgColor: '#0a1a26',
        accentColor: '#67e8f9',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#10293d', '#081722')}
            <!-- Ледяные сосульки сверху -->
            <polygon points="${w * 0.15},0 ${w * 0.18},${h * 0.3} ${w * 0.21},0" fill="#a5f3fc"/>
            <polygon points="${w * 0.45},0 ${w * 0.48},${h * 0.35} ${w * 0.51},0" fill="#a5f3fc"/>
            <polygon points="${w * 0.75},0 ${w * 0.78},${h * 0.28} ${w * 0.81},0" fill="#a5f3fc"/>
            <!-- Ледяная глыба по центру -->
            <polygon points="${w * 0.4},${h * 0.74} ${w * 0.44},${h * 0.46} ${w * 0.56},${h * 0.42} ${w * 0.6},${h * 0.74}" fill="#38bdf8" opacity="0.6" stroke="#e0f2fe" stroke-width="1.5"/>
        `
    },

    // 33. Святилище алчности
    golden_shrine: {
        id: 'golden_shrine',
        name: 'Святилище алчности',
        theme: 'gold',
        desc: 'Идол из чистого червонного золота с сапфировыми глазами. У подножия лежат подношения.',
        bgColor: '#241a08',
        accentColor: '#facc15',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#38290f', '#1c1305')}
            <!-- Золотой идол -->
            <rect x="${w * 0.42}" y="${h * 0.32}" width="${w * 0.16}" height="${h * 0.42}" fill="#eab308" stroke="#ca8a04" stroke-width="2" rx="4"/>
            <circle cx="${w * 0.46}" cy="${h * 0.42}" r="2.5" fill="#0284c7"/>
            <circle cx="${w * 0.54}" cy="${h * 0.42}" r="2.5" fill="#0284c7"/>
            <!-- Чаши с пламенем -->
            <circle cx="${w * 0.28}" cy="${h * 0.65}" r="8" fill="#ea580c"/>
            <circle cx="${w * 0.28}" cy="${h * 0.65}" r="3" fill="#fef08a"/>
            <circle cx="${w * 0.72}" cy="${h * 0.65}" r="8" fill="#ea580c"/>
            <circle cx="${w * 0.72}" cy="${h * 0.65}" r="3" fill="#fef08a"/>
        `
    },

    // 34. Обитель рун
    runic_sanctum: {
        id: 'runic_sanctum',
        name: 'Обитель рун',
        theme: 'arcane',
        desc: 'В центре возвышается обсидиановый обелиск. Вокруг него медленно вращаются сияющие руны.',
        bgColor: '#120f26',
        accentColor: '#38bdf8',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#1e183d', '#0e0b1f')}
            <!-- Обсидиановый обелиск -->
            <polygon points="${w * 0.45},${h * 0.74} ${w * 0.47},${h * 0.2} ${w * 0.53},${h * 0.2} ${w * 0.55},${h * 0.74}" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
            <path d="M${w * 0.5},${h * 0.28} L${w * 0.5},${h * 0.6}" stroke="#00f0ff" stroke-width="2" stroke-dasharray="4 4"/>
            <circle cx="${w * 0.38}" cy="${h * 0.4}" r="5" fill="#38bdf8" opacity="0.6"/>
            <circle cx="${w * 0.62}" cy="${h * 0.42}" r="5" fill="#a855f7" opacity="0.6"/>
        `
    },

    // 35. Оссуарий катакомб
    catacomb_ossuary: {
        id: 'catacomb_ossuary',
        name: 'Оссуарий катакомб',
        theme: 'death',
        desc: 'Стены сплошь сложены из сотен человеческих черепов. В нишах мерцают поминальные лампады.',
        bgColor: '#1a1714',
        accentColor: '#fde047',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#28231e', '#13100d')}
            <!-- Ряды черепов в стене -->
            <circle cx="${w * 0.2}" cy="${h * 0.35}" r="5" fill="#e2e8f0"/>
            <circle cx="${w * 0.28}" cy="${h * 0.35}" r="5" fill="#e2e8f0"/>
            <circle cx="${w * 0.36}" cy="${h * 0.35}" r="5" fill="#e2e8f0"/>
            <circle cx="${w * 0.64}" cy="${h * 0.35}" r="5" fill="#e2e8f0"/>
            <circle cx="${w * 0.72}" cy="${h * 0.35}" r="5" fill="#e2e8f0"/>
            <circle cx="${w * 0.8}" cy="${h * 0.35}" r="5" fill="#e2e8f0"/>
            <!-- Ниша со свечой -->
            <rect x="${w * 0.44}" y="${h * 0.32}" width="${w * 0.12}" height="${h * 0.3}" fill="#0f0c0a" stroke="#78350f" stroke-width="1.5" rx="3"/>
            <rect x="${w * 0.49}" y="${h * 0.46}" width="4" height="12" fill="#fee2e2"/>
            <circle cx="${w * 0.49 + 2}" cy="${h * 0.43}" r="3" fill="#f59e0b"/>
        `
    },

    // 36. Зал шестерен
    clockwork_vault: {
        id: 'clockwork_vault',
        name: 'Зал шестерен',
        theme: 'steampunk',
        desc: 'Гул гигантского заводного механизма. Медные трубы шипят, выпуская клубы горячего пара.',
        bgColor: '#211812',
        accentColor: '#f59e0b',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#34261d', '#18110b')}
            <!-- Шестеренка 1 -->
            <circle cx="${w * 0.38}" cy="${h * 0.45}" r="24" stroke="#ca8a04" stroke-width="5" stroke-dasharray="8 6" fill="#451a03"/>
            <circle cx="${w * 0.38}" cy="${h * 0.45}" r="8" fill="#78350f"/>
            <!-- Шестеренка 2 -->
            <circle cx="${w * 0.62}" cy="${h * 0.45}" r="20" stroke="#d97706" stroke-width="4" stroke-dasharray="7 5" fill="#451a03"/>
            <circle cx="${w * 0.62}" cy="${h * 0.45}" r="6" fill="#78350f"/>
            <!-- Паровая труба -->
            <line x1="0" y1="${h * 0.22}" x2="${w}" y2="${h * 0.22}" stroke="#b45309" stroke-width="5"/>
        `
    },

    // 37. Чумная яма
    carrion_pit: {
        id: 'carrion_pit',
        name: 'Чумная яма',
        theme: 'rot',
        desc: 'Смердящая топь посреди камней. Зеленоватый туман стелется по оскверненной земле.',
        bgColor: '#131911',
        accentColor: '#84cc16',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#1e291b', '#0f160c')}
            <ellipse cx="${w * 0.5}" cy="${h * 0.78}" rx="${w * 0.4}" ry="${h * 0.12}" fill="#3f6212" opacity="0.6"/>
            <!-- Зеленые пузыри -->
            <circle cx="${w * 0.42}" cy="${h * 0.74}" r="5" fill="#84cc16" opacity="0.8"/>
            <circle cx="${w * 0.55}" cy="${h * 0.78}" r="6" fill="#84cc16" opacity="0.8"/>
            <circle cx="${w * 0.68}" cy="${h * 0.75}" r="4" fill="#a3e635" opacity="0.7"/>
        `
    },

    // 38. Рубиновый разлом
    crystal_cave_red: {
        id: 'crystal_cave_red',
        name: 'Рубиновый разлом',
        theme: 'ruby',
        desc: 'Острые грани багровых рубинов ослепительно блестят в темноте, пульсируя кровавым светом.',
        bgColor: '#1e0c10',
        accentColor: '#f43f5e',
        renderSvg: (w, h) => `
            ${renderBackdrop(w, h, '#30131a', '#170609')}
            <!-- Кристаллы рубина слева -->
            <polygon points="${w * 0.16},${h * 0.74} ${w * 0.2},${h * 0.34} ${w * 0.25},${h * 0.42} ${w * 0.23},${h * 0.74}" fill="#e11d48" stroke="#fda4af" stroke-width="1.5"/>
            <!-- Кристаллы рубина справа -->
            <polygon points="${w * 0.82},${h * 0.74} ${w * 0.78},${h * 0.36} ${w * 0.74},${h * 0.44} ${w * 0.76},${h * 0.74}" fill="#be123c" stroke="#f43f5e" stroke-width="1.5"/>
            <circle cx="${w * 0.5}" cy="${h * 0.45}" r="12" fill="#fb7185" opacity="0.25"/>
            <polygon points="${w * 0.48},${h * 0.42} ${w * 0.5},${h * 0.36} ${w * 0.52},${h * 0.42} ${w * 0.5},${h * 0.48}" fill="#ffe4e6"/>
        `
    },

    // 39. Финальная тайна (Сектор после Финального Босса)
    final_mystery: {
        id: 'final_mystery',
        name: '???',
        theme: 'mystery',
        desc: 'Неведомое пространство за троном Владыки Бездны. Огромный светящийся знак вопроса пульсирует в космической пустоте.',
        bgColor: '#08060f',
        accentColor: '#ec4899',
        renderSvg: (w, h) => `
            <!-- Космическая бездна за пределами подземелья -->
            <rect width="${w}" height="${h}" fill="#06050c"/>
            <!-- Пульсирующая загадочная аура портала -->
            <ellipse cx="${w * 0.5}" cy="${h * 0.5}" rx="50" ry="38" fill="#a855f7" opacity="0.18"/>
            <circle cx="${w * 0.5}" cy="${h * 0.5}" r="28" fill="#ec4899" opacity="0.22"/>
            <circle cx="${w * 0.5}" cy="${h * 0.5}" r="16" fill="#f43f5e" opacity="0.28"/>
            <!-- Парящие звезды и рунические искры -->
            <circle cx="${w * 0.18}" cy="${h * 0.32}" r="1.8" fill="#f472b6" opacity="0.85"/>
            <circle cx="${w * 0.82}" cy="${h * 0.38}" r="2" fill="#c084fc" opacity="0.85"/>
            <circle cx="${w * 0.22}" cy="${h * 0.72}" r="2.2" fill="#38bdf8" opacity="0.75"/>
            <circle cx="${w * 0.78}" cy="${h * 0.68}" r="1.6" fill="#fbcfe8" opacity="0.9"/>
            <circle cx="${w * 0.32}" cy="${h * 0.82}" r="1.4" fill="#e0e7ff" opacity="0.85"/>
            <circle cx="${w * 0.68}" cy="${h * 0.22}" r="1.5" fill="#fde047" opacity="0.8"/>
            <!-- Портальные вихревые дуги -->
            <path d="M${w * 0.35},${h * 0.68} Q${w * 0.5},${h * 0.82} ${w * 0.65},${h * 0.68}" stroke="#8b5cf6" stroke-width="2.5" fill="none" opacity="0.6"/>
            <path d="M${w * 0.35},${h * 0.32} Q${w * 0.5},${h * 0.18} ${w * 0.65},${h * 0.32}" stroke="#8b5cf6" stroke-width="2.5" fill="none" opacity="0.6"/>
            <!-- Крупный светящийся знак вопроса -->
            <text x="${w * 0.5}" y="${h * 0.56}" text-anchor="middle" font-size="44" font-weight="900" font-family="'Segoe UI', 'Arial Black', sans-serif" fill="#f43f5e" opacity="0.4" transform="translate(0, 1)">?</text>
            <text x="${w * 0.5}" y="${h * 0.56}" text-anchor="middle" font-size="44" font-weight="900" font-family="'Segoe UI', 'Arial Black', sans-serif" fill="#ffffff">?</text>
        `
    }
};

// Список ID обычных комнат для случайной генерации
export const REGULAR_ROOM_IDS = Object.keys(ROOM_TEMPLATES).filter(id => id !== 'boss_arena' && id !== 'entrance_hall' && id !== 'final_mystery');
