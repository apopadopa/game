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
}