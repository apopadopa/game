export class Icons {
    static coin(size = 14) {
        return `
            <svg class="svg-icon icon-coin" width="${size}" height="${size}" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="7" fill="#eab308" stroke="#854d0e" stroke-width="1.2"/>
                <circle cx="8" cy="8" r="5" fill="none" stroke="#ca8a04" stroke-width="0.8"/>
                <text x="8" y="11" text-anchor="middle" font-size="8.5" font-family="serif" font-weight="bold" fill="#713f12">G</text>
            </svg>
        `;
    }

    static heart(size = 14) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <path d="M8 14S2 9.5 2 5.5A3.5 3.5 0 0 1 8 3A3.5 3.5 0 0 1 14 5.5C14 9.5 8 14 8 14Z" fill="#ef4444" stroke="#991b1b" stroke-width="0.8"/>
            </svg>
        `;
    }

    static sword(size = 14) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <path d="M12 2L14 4L7 11L5 9L12 2Z" fill="#94a3b8" stroke="#334155" stroke-width="0.8"/>
                <line x1="4" y1="12" x2="8" y2="8" stroke="#cbd5e1" stroke-width="1.2"/>
                <line x1="4" y1="8" x2="8" y2="12" stroke="#d97706" stroke-width="1.5"/>
                <line x1="5" y1="11" x2="2" y2="14" stroke="#78350f" stroke-width="2"/>
                <circle cx="2" cy="14" r="1" fill="#d97706"/>
            </svg>
        `;
    }

    static broadsword(size = 20) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">
                <path d="M15 2L18 5L9 14L6 11L15 2Z" fill="#cbd5e1" stroke="#475569" stroke-width="1"/>
                <line x1="16" y1="4" x2="8" y2="12" stroke="#94a3b8" stroke-width="1.5"/>
                <rect x="4.5" y="12.5" width="6" height="2" transform="rotate(-45 4.5 12.5)" fill="#ca8a04" rx="0.5"/>
                <line x1="6" y1="14" x2="2.5" y2="17.5" stroke="#78350f" stroke-width="2.5"/>
                <circle cx="2" cy="18" r="1.5" fill="#ca8a04"/>
            </svg>
        `;
    }

    static shield(size = 14) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L14 3V8C14 11.5 8 15 8 15C8 15 2 11.5 2 8V3L8 1Z" fill="#334155" stroke="#d97706" stroke-width="1.2"/>
                <path d="M8 3L12 4.5V8C12 10.5 8 13 8 13C8 13 4 10.5 4 8V4.5L8 3Z" fill="#475569"/>
            </svg>
        `;
    }

    static armor(size = 20) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">
                <path d="M6 3L10 5L14 3L18 6L16 10L15 17H5L4 10L2 6L6 3Z" fill="#475569" stroke="#1e293b" stroke-width="1.2"/>
                <path d="M7 6H13M6 10H14M6 14H14" stroke="#94a3b8" stroke-width="1.2"/>
                <circle cx="10" cy="8" r="1.5" fill="#ca8a04"/>
            </svg>
        `;
    }

    static target(size = 20) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="#ca8a04" stroke-width="1.5"/>
                <circle cx="10" cy="10" r="5" stroke="#ef4444" stroke-width="1.5"/>
                <circle cx="10" cy="10" r="2" fill="#ef4444"/>
                <line x1="10" y1="1" x2="10" y2="4" stroke="#ca8a04" stroke-width="1.5"/>
                <line x1="10" y1="16" x2="10" y2="19" stroke="#ca8a04" stroke-width="1.5"/>
                <line x1="1" y1="10" x2="4" y2="10" stroke="#ca8a04" stroke-width="1.5"/>
                <line x1="16" y1="10" x2="19" y2="10" stroke="#ca8a04" stroke-width="1.5"/>
            </svg>
        `;
    }

    static spark(size = 20) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">
                <path d="M10 1L12.5 7.5L19 10L12.5 12.5L10 19L7.5 12.5L1 10L7.5 7.5L10 1Z" fill="#facc15" stroke="#ca8a04" stroke-width="1"/>
            </svg>
        `;
    }

    static orb(size = 20) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="9" r="7" fill="#0284c7" stroke="#38bdf8" stroke-width="1.2"/>
                <circle cx="8" cy="7" r="2.5" fill="#bae6fd" opacity="0.7"/>
                <path d="M4 17L7 14H13L16 17H4Z" fill="#475569" stroke="#1e293b" stroke-width="1"/>
            </svg>
        `;
    }

    static dove(size = 20) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">
                <path d="M3 11C6 11 9 9 11 6C13 3 17 3 17 6C17 9 14 11 11 12C9 14 6 16 3 16C5 14 6 13 6 12C4 12 3 11 3 11Z" fill="#f8fafc" stroke="#94a3b8" stroke-width="1"/>
                <circle cx="15" cy="5" r="1" fill="#0f172a"/>
            </svg>
        `;
    }

    static amulet(size = 20) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">
                <path d="M5 3Q10 8 15 3" stroke="#ca8a04" stroke-width="1.5" fill="none"/>
                <polygon points="10,6 15,13 10,18 5,13" fill="#0284c7" stroke="#ca8a04" stroke-width="1.5"/>
                <circle cx="10" cy="12" r="2" fill="#fef08a"/>
            </svg>
        `;
    }

    static gem(size = 20) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">
                <polygon points="6,4 14,4 18,8 10,18 2,8" fill="#38bdf8" stroke="#0284c7" stroke-width="1.2"/>
                <polygon points="6,4 14,4 10,8" fill="#e0f2fe"/>
                <polygon points="2,8 6,4 10,8" fill="#7dd3fc"/>
                <polygon points="18,8 14,4 10,8" fill="#0369a1"/>
            </svg>
        `;
    }

    static urn(size = 20) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">
                <path d="M6 3H14V5C14 7 16 8 16 11C16 15 13 18 10 18C7 18 4 15 4 11C4 8 6 7 6 5V3Z" fill="#0284c7" stroke="#38bdf8" stroke-width="1"/>
                <rect x="7" y="1.5" width="6" height="2" fill="#ca8a04" rx="0.5"/>
            </svg>
        `;
    }

    static potion(size = 20, color = '#ef4444') {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">
                <rect x="8" y="2" width="4" height="2" fill="#78350f" rx="0.5"/>
                <rect x="7.5" y="4" width="5" height="3" fill="#cbd5e1" stroke="#475569" stroke-width="0.8"/>
                <path d="M7.5 7L3 15C3 17 4.5 18 10 18C15.5 18 17 17 17 15L12.5 7H7.5Z" fill="${color}" stroke="#475569" stroke-width="1"/>
                <ellipse cx="8" cy="12" rx="2" ry="1" fill="#ffffff" opacity="0.4"/>
            </svg>
        `;
    }

    static scroll(size = 20) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">
                <path d="M4 4C4 2.89543 4.89543 2 6 2H16L14 6H6C4.89543 6 4 5.10457 4 4Z" fill="#ca8a04"/>
                <rect x="4" y="5" width="12" height="11" rx="1" fill="#fef08a" stroke="#ca8a04" stroke-width="0.8"/>
                <circle cx="10" cy="10.5" r="2.5" fill="#991b1b"/>
                <line x1="6.5" y1="8" x2="13.5" y2="8" stroke="#a16207" stroke-width="1"/>
                <line x1="6.5" y1="13" x2="13.5" y2="13" stroke="#a16207" stroke-width="1"/>
            </svg>
        `;
    }

    static ale(size = 20) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">
                <rect x="5" y="6" width="10" height="12" rx="1.5" fill="#78350f" stroke="#451a03" stroke-width="1"/>
                <line x1="5" y1="9" x2="15" y2="9" stroke="#b45309" stroke-width="1"/>
                <line x1="5" y1="14" x2="15" y2="14" stroke="#b45309" stroke-width="1"/>
                <path d="M15 8H17C18.1 8 19 8.9 19 10V12C19 13.1 18.1 14 17 14H15" stroke="#451a03" stroke-width="2"/>
                <path d="M4 6Q10 4 16 6" fill="#fef08a"/>
                <circle cx="7" cy="5" r="2" fill="#fef08a"/>
                <circle cx="10" cy="4.5" r="2.5" fill="#fef08a"/>
                <circle cx="13" cy="5" r="2" fill="#fef08a"/>
            </svg>
        `;
    }

    static bed(size = 20) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="7" width="16" height="8" rx="2" fill="#475569" stroke="#1e293b" stroke-width="1"/>
                <rect x="3" y="8" width="5" height="4" rx="1" fill="#f8fafc"/>
                <path d="M2 13V17M18 13V17" stroke="#334155" stroke-width="2" stroke-linecap="round"/>
                <path d="M2 7V4M18 7V10" stroke="#334155" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `;
    }

    static chat(size = 20) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">
                <path d="M3 4C3 2.89543 3.89543 2 5 2H15C16.1046 2 17 2.89543 17 4V12C17 13.1046 16.1046 14 15 14H7L3 18V4Z" fill="#334155" stroke="#ca8a04" stroke-width="1"/>
                <circle cx="7" cy="8" r="1" fill="#ca8a04"/>
                <circle cx="10" cy="8" r="1" fill="#ca8a04"/>
                <circle cx="13" cy="8" r="1" fill="#ca8a04"/>
            </svg>
        `;
    }

    static arrowLeft(size = 14) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8L10 13" stroke="#ca8a04" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
    }

    static arrowRight(size = 14) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="#ca8a04" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
    }

    static skull(size = 20) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">
                <path d="M4 9C4 5.68629 6.68629 3 10 3C13.3137 3 16 5.68629 16 9C16 11.5 14.5 13.5 13 14V17H7V14C5.5 13.5 4 11.5 4 9Z" fill="#cbd5e1" stroke="#334155" stroke-width="1"/>
                <circle cx="8" cy="9" r="1.8" fill="#1e293b"/>
                <circle cx="12" cy="9" r="1.8" fill="#1e293b"/>
                <polygon points="10,11 9,13 11,13" fill="#1e293b"/>
                <line x1="8.5" y1="15.5" x2="8.5" y2="17" stroke="#1e293b" stroke-width="1"/>
                <line x1="11.5" y1="15.5" x2="11.5" y2="17" stroke="#1e293b" stroke-width="1"/>
            </svg>
        `;
    }

    static dice(size = 14) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2" width="12" height="12" rx="2.5" fill="#27272a" stroke="#ca8a04" stroke-width="1.2"/>
                <circle cx="5" cy="5" r="1" fill="#ca8a04"/>
                <circle cx="11" cy="5" r="1" fill="#ca8a04"/>
                <circle cx="8" cy="8" r="1" fill="#ca8a04"/>
                <circle cx="5" cy="11" r="1" fill="#ca8a04"/>
                <circle cx="11" cy="11" r="1" fill="#ca8a04"/>
            </svg>
        `;
    }

    static male(size = 13) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="9.5" r="4.5" stroke="#38bdf8" stroke-width="1.8"/>
                <line x1="9.5" y1="6.5" x2="14" y2="2" stroke="#38bdf8" stroke-width="1.8"/>
                <path d="M10.5 2H14V5.5" stroke="#38bdf8" stroke-width="1.8"/>
            </svg>
        `;
    }

    static female(size = 13) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="6" r="4.5" stroke="#f472b6" stroke-width="1.8"/>
                <line x1="8" y1="10.5" x2="8" y2="15.5" stroke="#f472b6" stroke-width="1.8"/>
                <line x1="5.5" y1="13" x2="10.5" y2="13" stroke="#f472b6" stroke-width="1.8"/>
            </svg>
        `;
    }

    static helmet(size = 20) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">
                <path d="M4 11C4 6 6 3 10 3C14 3 16 6 16 11V16H13V13H7V16H4V11Z" fill="#475569" stroke="#94a3b8" stroke-width="1.2"/>
                <line x1="10" y1="4" x2="10" y2="9" stroke="#ca8a04" stroke-width="1.5"/>
                <line x1="6" y1="10" x2="14" y2="10" stroke="#1e293b" stroke-width="1.8"/>
            </svg>
        `;
    }

    static pants(size = 20) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">
                <path d="M5 3H15L16 17H12L10 9L8 17H4L5 3Z" fill="#334155" stroke="#64748b" stroke-width="1.2"/>
                <line x1="5" y1="6" x2="15" y2="6" stroke="#ca8a04" stroke-width="1"/>
            </svg>
        `;
    }

    static boots(size = 20) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">
                <path d="M5 3H10V11L14 13V17H4V3H5Z" fill="#3b2b20" stroke="#78350f" stroke-width="1.2"/>
                <line x1="4" y1="15.5" x2="14" y2="15.5" stroke="#1c1109" stroke-width="2"/>
            </svg>
        `;
    }

    static ring(size = 20) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="11" r="6" stroke="#eab308" stroke-width="2"/>
                <polygon points="10,2 12.5,5 10,7.5 7.5,5" fill="#38bdf8" stroke="#0284c7" stroke-width="0.8"/>
            </svg>
        `;
    }

    static backpack(size = 20) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">
                <rect x="4" y="5" width="12" height="12" rx="3" fill="#451a03" stroke="#92400e" stroke-width="1.2"/>
                <path d="M7 5V3C7 2.4 7.4 2 8 2H12C12.6 2 13 2.4 13 3V5" stroke="#b45309" stroke-width="1.2"/>
                <rect x="6" y="9" width="8" height="6" rx="1.5" fill="#78350f"/>
                <circle cx="10" cy="11" r="1" fill="#fef08a"/>
            </svg>
        `;
    }

    static saveDisk(size = 16) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <path d="M2 3C2 2.4 2.4 2 3 2H11L14 5V13C14 13.6 13.6 14 13 14H3C2.4 14 2 13.6 2 13V3Z" fill="#1e293b" stroke="#38bdf8" stroke-width="1.2"/>
                <rect x="4" y="2" width="6" height="4" fill="#64748b"/>
                <rect x="4" y="8" width="8" height="5" rx="1" fill="#0f172a" stroke="#38bdf8" stroke-width="0.8"/>
            </svg>
        `;
    }

    static door(size = 16) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <rect x="3" y="1" width="10" height="14" rx="1" fill="#332015" stroke="#78350f" stroke-width="1.2"/>
                <circle cx="10.5" cy="8" r="1" fill="#facc15"/>
            </svg>
        `;
    }

    static tunic(size = 20) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">
                <path d="M6 3L10 5L14 3L17 6L15 10L14 17H6L5 10L3 6L6 3Z" fill="#5c432d" stroke="#2b1c10" stroke-width="1.2"/>
                <line x1="10" y1="5" x2="10" y2="12" stroke="#d4af37" stroke-width="1.2"/>
                <line x1="8" y1="8" x2="12" y2="8" stroke="#d4af37" stroke-width="1"/>
                <line x1="8" y1="11" x2="12" y2="11" stroke="#d4af37" stroke-width="1"/>
                <rect x="5.5" y="13" width="9" height="2" fill="#24150b"/>
            </svg>
        `;
    }

    static chainmail(size = 20) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">
                <path d="M5 3L10 5L15 3L18 6L16 10L15 17H5L4 10L2 6L5 3Z" fill="#64748b" stroke="#1e293b" stroke-width="1.2"/>
                <!-- Shoulder plates -->
                <path d="M3 5.5L7 3.5L9 8L4 9Z" fill="#94a3b8" stroke="#334155" stroke-width="0.8"/>
                <path d="M17 5.5L13 3.5L11 8L16 9Z" fill="#94a3b8" stroke="#334155" stroke-width="0.8"/>
                <!-- Mail rings texture -->
                <circle cx="8" cy="11" r="1" fill="#cbd5e1"/>
                <circle cx="12" cy="11" r="1" fill="#cbd5e1"/>
                <circle cx="10" cy="13" r="1" fill="#cbd5e1"/>
                <circle cx="7" cy="14" r="1" fill="#cbd5e1"/>
                <circle cx="13" cy="14" r="1" fill="#cbd5e1"/>
                <line x1="6" y1="16" x2="14" y2="16" stroke="#ca8a04" stroke-width="1.2"/>
            </svg>
        `;
    }

    static dagger(size = 20) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">
                <path d="M15 3C14 6 12 11 8 13L6 11C8 7 13 5 15 3Z" fill="#cbd5e1" stroke="#475569" stroke-width="1"/>
                <line x1="5" y1="14" x2="9" y2="10" stroke="#ca8a04" stroke-width="2"/>
                <line x1="6" y1="13" x2="3" y2="16" stroke="#78350f" stroke-width="2.5"/>
                <circle cx="2" cy="17" r="1" fill="#ca8a04"/>
            </svg>
        `;
    }

    static staff(size = 20) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">
                <line x1="5" y1="17" x2="14" y2="5" stroke="#78350f" stroke-width="2.5" stroke-linecap="round"/>
                <circle cx="15" cy="4" r="3.5" fill="#38bdf8" stroke="#0284c7" stroke-width="1"/>
                <circle cx="14" cy="3" r="1" fill="#e0f2fe"/>
            </svg>
        `;
    }

    static bow(size = 20) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">
                <path d="M4 16C8 14 14 8 16 4" stroke="#78350f" stroke-width="2" stroke-linecap="round"/>
                <line x1="4" y1="16" x2="16" y2="4" stroke="#cbd5e1" stroke-width="0.8"/>
                <line x1="7" y1="13" x2="13" y2="7" stroke="#991b1b" stroke-width="1.5"/>
                <polygon points="14,6 12,8 14,9" fill="#991b1b"/>
            </svg>
        `;
    }

    static crown(size = 14) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <polygon points="2,13 14,13 14,7 11,10 8,3 5,10 2,7" fill="#f59e0b" stroke="#b45309" stroke-width="0.8"/>
                <circle cx="2" cy="7" r="1.1" fill="#ef4444"/>
                <circle cx="8" cy="3" r="1.3" fill="#38bdf8"/>
                <circle cx="14" cy="7" r="1.1" fill="#ef4444"/>
                <line x1="3" y1="11.5" x2="13" y2="11.5" stroke="#78350f" stroke-width="1.2"/>
            </svg>
        `;
    }

    static stairsDown(size = 16) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <path d="M2 4H5V7H8V10H11V13H14" stroke="#ca8a04" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 7L12 12M12 12L7 12" stroke="#38bdf8" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
    }

    static stairsUp(size = 16) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <path d="M2 13H5V10H8V7H11V4H14" stroke="#ca8a04" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 9L12 4M12 4L7 4" stroke="#38bdf8" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
    }

    static stairs(size = 16) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <line x1="4" y1="2" x2="4" y2="14" stroke="#ca8a04" stroke-width="1.8" stroke-linecap="round"/>
                <line x1="12" y1="2" x2="12" y2="14" stroke="#ca8a04" stroke-width="1.8" stroke-linecap="round"/>
                <line x1="4" y1="4.5" x2="12" y2="4.5" stroke="#facc15" stroke-width="1.5"/>
                <line x1="4" y1="8" x2="12" y2="8" stroke="#facc15" stroke-width="1.5"/>
                <line x1="4" y1="11.5" x2="12" y2="11.5" stroke="#facc15" stroke-width="1.5"/>
            </svg>
        `;
    }

    static castle(size = 16) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <path d="M2 14V6L3.5 6V8L5.5 8V6L7 6V8L9 8V6L10.5 6V8L12.5 8V6L14 6V14H10V10Q8 8.5 6 10V14H2Z" fill="#64748b" stroke="#334155" stroke-width="0.9"/>
                <line x1="2" y1="14" x2="14" y2="14" stroke="#ca8a04" stroke-width="1.5"/>
                <circle cx="8" cy="4" r="1.2" fill="#ef4444"/>
            </svg>
        `;
    }

    static question(size = 14) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" fill="#3b0764" stroke="#c084fc" stroke-width="1.2"/>
                <path d="M6 6.2C6 4.8 7 4 8 4C9.2 4 10 4.8 10 5.8C10 7.2 8.5 7.6 8.5 9" stroke="#f5d0fe" stroke-width="1.5" stroke-linecap="round" fill="none"/>
                <circle cx="8.5" cy="11.5" r="0.8" fill="#f5d0fe"/>
            </svg>
        `;
    }

    static warning(size = 14) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <polygon points="8,2 15,14 1,14" fill="#f59e0b" stroke="#b45309" stroke-width="1"/>
                <line x1="8" y1="6" x2="8" y2="10" stroke="#1c1917" stroke-width="1.6" stroke-linecap="round"/>
                <circle cx="8" cy="12" r="0.9" fill="#1c1917"/>
            </svg>
        `;
    }

    static check(size = 14) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" fill="#14532d" stroke="#22c55e" stroke-width="1"/>
                <path d="M4.5 8.2L7 10.7L11.5 5.5" stroke="#f0fdf4" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </svg>
        `;
    }

    static pin(size = 14) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <path d="M8 2C5.8 2 4 3.8 4 6C4 9.2 8 14 8 14C8 14 12 9.2 12 6C12 3.8 10.2 2 8 2Z" fill="#ef4444" stroke="#991b1b" stroke-width="0.8"/>
                <circle cx="8" cy="5.8" r="1.6" fill="#fef2f2"/>
            </svg>
        `;
    }

    static map(size = 14) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <path d="M2 4L6 2L10 4L14 2V12L10 14L6 12L2 14V4Z" fill="#334155" stroke="#94a3b8" stroke-width="0.9" stroke-linejoin="round"/>
                <line x1="6" y1="2" x2="6" y2="12" stroke="#64748b" stroke-width="0.8"/>
                <line x1="10" y1="4" x2="10" y2="14" stroke="#64748b" stroke-width="0.8"/>
                <path d="M7 6.5L9 8.5M9 6.5L7 8.5" stroke="#ef4444" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
        `;
    }

    static palette(size = 14) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <path d="M8 2C4.7 2 2 4.7 2 8C2 11.3 4.7 14 8 14C9.1 14 10 13.1 10 12C10 11.5 9.8 11 9.5 10.6C9.2 10.2 9 9.7 9 9C9 7.9 9.9 7 11 7H12C13.7 7 15 5.7 15 4C15 2.5 11.5 2 8 2Z" fill="#d97706" stroke="#78350f" stroke-width="0.8"/>
                <circle cx="5" cy="6" r="1.1" fill="#ef4444"/>
                <circle cx="8" cy="4.8" r="1.1" fill="#38bdf8"/>
                <circle cx="11" cy="6.2" r="1.1" fill="#22c55e"/>
                <circle cx="6" cy="9.2" r="1.1" fill="#c084fc"/>
            </svg>
        `;
    }

    static temple(size = 14) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <polygon points="8,2 2,5.5 14,5.5" fill="#64748b" stroke="#334155" stroke-width="0.8"/>
                <rect x="3" y="6" width="2" height="6" fill="#94a3b8"/>
                <rect x="7" y="6" width="2" height="6" fill="#94a3b8"/>
                <rect x="11" y="6" width="2" height="6" fill="#94a3b8"/>
                <rect x="2" y="12" width="12" height="2" fill="#475569"/>
            </svg>
        `;
    }

    static lightning(size = 14) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <path d="M9 1L3 9H8L7 15L13 7H8L9 1Z" fill="#eab308" stroke="#ca8a04" stroke-width="0.9"/>
            </svg>
        `;
    }

    static search(size = 14) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="6.5" r="4.5" stroke="#38bdf8" stroke-width="1.8" fill="none"/>
                <line x1="10" y1="10" x2="14.5" y2="14.5" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `;
    }

    static arrowRight(size = 14) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="#ca8a04" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
    }

    static arrowUp(size = 14) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <path d="M8 13V3M4 7L8 3L12 7" stroke="#ca8a04" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
    }

    static arrowDown(size = 14) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <path d="M8 3V13M4 9L8 13L12 9" stroke="#ca8a04" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
    }

    static fire(size = 14) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.5C8 1.5 10.5 4 10.5 6.5C10.5 8.2 9.5 9 9.5 10C10.5 10 12 8.5 12 6.5C13 8.5 13 10.5 12 12C11 13.5 9.5 14.5 8 14.5C5.2 14.5 3.5 12.5 3.5 9.5C3.5 6.8 6 4.8 6 4.8C6 4.8 6 6 7 7C7.5 5 8 1.5 8 1.5Z" fill="#ea580c" stroke="#9a3412" stroke-width="0.8"/>
                <path d="M8 8C8 8 9.5 9.5 9.5 11C9.5 12.2 8.8 13 8 13C7.2 13 6.5 12.2 6.5 11C6.5 9.5 8 8 8 8Z" fill="#facc15"/>
            </svg>
        `;
    }

    static ice(size = 14) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <line x1="8" y1="2" x2="8" y2="14" stroke="#38bdf8" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="2" y1="8" x2="14" y2="8" stroke="#38bdf8" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="3.5" y1="3.5" x2="12.5" y2="12.5" stroke="#38bdf8" stroke-width="1.2" stroke-linecap="round"/>
                <line x1="3.5" y1="12.5" x2="12.5" y2="3.5" stroke="#38bdf8" stroke-width="1.2" stroke-linecap="round"/>
                <circle cx="8" cy="8" r="1.5" fill="#f0f9ff"/>
            </svg>
        `;
    }

    static poison(size = 14) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <path d="M5 6C5 3.8 6.3 2 8 2C9.7 2 11 3.8 11 6C11 7.5 10 9 9 9.5V11H7V9.5C6 9 5 7.5 5 6Z" fill="#15803d" stroke="#14532d" stroke-width="0.8"/>
                <circle cx="6.8" cy="5.8" r="1" fill="#86efac"/>
                <circle cx="9.2" cy="5.8" r="1" fill="#86efac"/>
                <line x1="4" y1="13" x2="12" y2="13" stroke="#22c55e" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="3" y1="15" x2="13" y2="15" stroke="#15803d" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
        `;
    }

    static blood(size = 14) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <path d="M8 2C8 2 4 7 4 10.5C4 12.8 5.8 14.5 8 14.5C10.2 14.5 12 12.8 12 10.5C12 7 8 2 8 2Z" fill="#b91c1c" stroke="#7f1d1d" stroke-width="0.8"/>
                <circle cx="6.5" cy="10" r="1.2" fill="#f87171" opacity="0.6"/>
            </svg>
        `;
    }

    static eye(size = 14) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <path d="M1 8C3 4.5 8 3.5 8 3.5C8 3.5 13 4.5 15 8C13 11.5 8 12.5 8 12.5C8 12.5 3 11.5 1 8Z" fill="#1e1b4b" stroke="#818cf8" stroke-width="1"/>
                <circle cx="8" cy="8" r="3" fill="#6366f1"/>
                <circle cx="8" cy="8" r="1.4" fill="#030712"/>
                <circle cx="9" cy="7" r="0.7" fill="#ffffff"/>
            </svg>
        `;
    }

    static hourglass(size = 14) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <path d="M3 2H13M3 14H13" stroke="#ca8a04" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M4 2L8 8L4 14M12 2L8 8L12 14" fill="#451a03" stroke="#ca8a04" stroke-width="1"/>
                <polygon points="6,12 10,12 8,9" fill="#facc15"/>
            </svg>
        `;
    }

    static element(elementName = '', size = 14) {
        const el = String(elementName).toLowerCase();
        if (el.includes('огонь') || el.includes('лава') || el.includes('плам')) return Icons.fire(size);
        if (el.includes('лед') || el.includes('холод') || el.includes('мороз')) return Icons.ice(size);
        if (el.includes('яд') || el.includes('кислот') || el.includes('токсин')) return Icons.poison(size);
        if (el.includes('кров')) return Icons.blood(size);
        if (el.includes('тьм') || el.includes('смерт') || el.includes('тень')) return Icons.eye(size);
        if (el.includes('свят') || el.includes('свет')) return Icons.spark(size);
        if (el.includes('врем')) return Icons.hourglass(size);
        return Icons.orb(size);
    }

    static tierDot(tier = 'regular', size = 12) {
        let color = '#22c55e';
        let glow = '#15803d';
        if (tier === 'hardened') {
            color = '#f59e0b';
            glow = '#b45309';
        } else if (tier === 'boss' || tier === 'floor_boss') {
            color = '#ef4444';
            glow = '#991b1b';
        } else if (tier === 'final_boss') {
            color = '#a855f7';
            glow = '#6b21a8';
        }
        return `
            <svg class="svg-icon tier-dot-icon" width="${size}" height="${size}" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" fill="${color}" stroke="${glow}" stroke-width="1.2"/>
            </svg>
        `;
    }

    static lock(size = 14) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <rect x="3" y="7" width="10" height="8" rx="1.5" fill="#451a03" stroke="#ca8a04" stroke-width="1.2"/>
                <path d="M5 7V4.5C5 2.8 6.3 1.5 8 1.5C9.7 1.5 11 2.8 11 4.5V7" stroke="#ca8a04" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="8" cy="11" r="1.2" fill="#fef08a"/>
            </svg>
        `;
    }

    static chevronUp(size = 14) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <path d="M3 11L8 6L13 11" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
    }

    static chevronDown(size = 14) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
                <path d="M3 5L8 10L13 5" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
    }

    static meat(size = 18) {
        return `
            <svg class="svg-icon" width="${size}" height="${size}" viewBox="0 0 18 18" fill="none">
                <ellipse cx="10" cy="8" rx="6" ry="4" fill="#991b1b" stroke="#7f1d1d" stroke-width="1" transform="rotate(-25 10 8)"/>
                <ellipse cx="10" cy="8" rx="3.5" ry="2.2" fill="#b91c1c" transform="rotate(-25 10 8)"/>
                <line x1="3" y1="14" x2="6" y2="10" stroke="#f1f5f9" stroke-width="2.2" stroke-linecap="round"/>
                <circle cx="2.5" cy="14.5" r="1.5" fill="#e2e8f0"/>
            </svg>
        `;
    }
}