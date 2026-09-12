import { sound } from '../audio/audioEngine.js';
import { CharacterRenderer } from '../visuals/characterRenderer.js';
import { Icons } from '../visuals/icons.js';
import { ShopScreen } from './townLocations/shopScreen.js';
import { TavernScreen } from './townLocations/tavernScreen.js';
import { BlacksmithScreen } from './townLocations/blacksmithScreen.js';
import { TempleScreen } from './townLocations/templeScreen.js';

export class TownScreen {
    constructor(player, callbacks) {
        this.player = player;
        this.callbacks = callbacks;
    }

    render(container) {
        this.container = container;
        container.innerHTML = `
            <div class="town-container">
                <div class="town-hud">
                    <div class="hud-character-info">
                        <div class="hud-avatar-frame" id="hud-avatar-frame">
                            ${CharacterRenderer.renderBust(this.player.visuals, this.player.classId)}
                        </div>
                        <div class="hud-meta">
                            <div class="hud-name">${this.player.name} <span class="hud-class">(${this.player.className})</span></div>
                            <div class="hud-bars">
                                <div class="hud-bar-wrap">
                                    <div class="hud-bar-fill hp" id="hud-hp-fill" style="width: ${(this.player.currentHp / this.player.maxHp) * 100}%"></div>
                                    <span class="hud-bar-text" id="hud-hp-text">${this.player.currentHp}/${this.player.maxHp} HP</span>
                                </div>
                                <div class="hud-bar-wrap">
                                    <div class="hud-bar-fill mp" id="hud-mp-fill" style="width: ${(this.player.currentMp / this.player.maxMp) * 100}%"></div>
                                    <span class="hud-bar-text" id="hud-mp-text">${this.player.currentMp}/${this.player.maxMp} MP</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="hud-stats-summary">
                        <span>${Icons.sword(14)} Урон: <strong>${this.player.physicalDamage}</strong></span>
                        <span>${Icons.shield(14)} Защита: <strong>${this.player.defense}</strong></span>
                    </div>

                    <div class="hud-resources">
                        <div class="hud-gold">${Icons.coin(16)} <span id="hud-gold-val">${this.player.gold}</span></div>
                        <button class="btn-town-menu" id="btn-town-menu">Меню</button>
                    </div>
                </div>

                <div class="town-map-viewport">
                    <svg viewBox="0 0 960 560" class="town-map-svg">
                        <defs>
                            <radialGradient id="fountainGrad" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stop-color="#38bdf8"/>
                                <stop offset="60%" stop-color="#0284c7"/>
                                <stop offset="100%" stop-color="#03496e"/>
                            </radialGradient>

                            <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stop-color="#fef08a" stop-opacity="0.85"/>
                                <stop offset="40%" stop-color="#ca8a04" stop-opacity="0.3"/>
                                <stop offset="100%" stop-color="#ca8a04" stop-opacity="0"/>
                            </radialGradient>

                            <radialGradient id="dungeonAbyss" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stop-color="#450a0a" stop-opacity="0.9"/>
                                <stop offset="80%" stop-color="#050508" stop-opacity="1"/>
                            </radialGradient>

                            <pattern id="cobblePattern" width="24" height="24" patternUnits="userSpaceOnUse">
                                <rect width="24" height="24" fill="#1b1c24"/>
                                <circle cx="6" cy="6" r="4.5" fill="#242630"/>
                                <circle cx="18" cy="18" r="5" fill="#22242e"/>
                                <circle cx="18" cy="5" r="4" fill="#252834"/>
                                <circle cx="5" cy="18" r="4.2" fill="#20222a"/>
                            </pattern>
                        </defs>

                        <rect width="960" height="560" fill="url(#cobblePattern)"/>

                        <rect x="35" y="35" width="220" height="150" rx="10" fill="#142416"/>
                        <rect x="705" y="35" width="220" height="150" rx="10" fill="#142416"/>
                        <rect x="35" y="375" width="200" height="150" rx="10" fill="#142416"/>
                        <rect x="725" y="375" width="200" height="150" rx="10" fill="#142416"/>

                        <g id="trees">
                            <circle cx="80" cy="80" r="26" fill="#19401d" stroke="#0e2611" stroke-width="2"/>
                            <circle cx="75" cy="75" r="18" fill="#225427"/>
                            <circle cx="210" cy="120" r="22" fill="#19401d" stroke="#0e2611" stroke-width="2"/>
                            <circle cx="750" cy="85" r="25" fill="#19401d" stroke="#0e2611" stroke-width="2"/>
                            <circle cx="880" cy="130" r="20" fill="#19401d" stroke="#0e2611" stroke-width="2"/>
                            <circle cx="80" cy="480" r="24" fill="#19401d" stroke="#0e2611" stroke-width="2"/>
                            <circle cx="880" cy="480" r="24" fill="#19401d" stroke="#0e2611" stroke-width="2"/>
                        </g>

                        <path d="M0,0 L960,0 L960,25 L0,25 Z" fill="#2d2e38" stroke="#16171d" stroke-width="2"/>
                        <path d="M0,535 L430,535 L430,560 L0,560 Z" fill="#2d2e38" stroke="#16171d" stroke-width="2"/>
                        <path d="M530,535 L960,535 L960,560 L530,560 Z" fill="#2d2e38" stroke="#16171d" stroke-width="2"/>
                        <path d="M0,0 L25,0 L25,560 L0,560 Z" fill="#2d2e38" stroke="#16171d" stroke-width="2"/>
                        <path d="M935,0 L960,0 L960,560 L935,560 Z" fill="#2d2e38" stroke="#16171d" stroke-width="2"/>

                        <path d="M420,25 L540,25 L540,560 L420,560 Z" fill="#353744"/>
                        <path d="M25,220 L935,220 L935,340 L25,340 Z" fill="#353744"/>
                        <circle cx="480" cy="280" r="115" fill="#3a3c4a" stroke="#22242c" stroke-width="4"/>
                        <circle cx="480" cy="280" r="95" fill="#30323e"/>

                        <circle cx="480" cy="280" r="50" fill="#22242c" stroke="#474b5c" stroke-width="5"/>
                        <circle cx="480" cy="280" r="42" fill="url(#fountainGrad)"/>
                        <ellipse cx="480" cy="280" rx="30" ry="24" fill="#67e8f9" opacity="0.35"/>
                        <circle cx="480" cy="280" r="14" fill="#474a59" stroke="#1a1c22" stroke-width="2"/>
                        <circle cx="480" cy="280" r="4" fill="#93c5fd"/>

                        <g transform="translate(360, 200)"><circle cx="0" cy="0" r="45" fill="url(#lampGlow)"/><circle cx="0" cy="0" r="4" fill="#fef08a"/></g>
                        <g transform="translate(600, 200)"><circle cx="0" cy="0" r="45" fill="url(#lampGlow)"/><circle cx="0" cy="0" r="4" fill="#fef08a"/></g>
                        <g transform="translate(360, 360)"><circle cx="0" cy="0" r="45" fill="url(#lampGlow)"/><circle cx="0" cy="0" r="4" fill="#fef08a"/></g>
                        <g transform="translate(600, 360)"><circle cx="0" cy="0" r="45" fill="url(#lampGlow)"/><circle cx="0" cy="0" r="4" fill="#fef08a"/></g>

                        <g class="town-building" id="building-gate">
                            <rect x="360" y="8" width="240" height="95" rx="6" fill="#1c1d24" stroke="#381010" stroke-width="3" class="building-roof"/>
                            <rect x="385" y="16" width="35" height="35" rx="4" fill="#2c2d38" stroke="#16171d" stroke-width="2"/>
                            <rect x="540" y="16" width="35" height="35" rx="4" fill="#2c2d38" stroke="#16171d" stroke-width="2"/>
                            <path d="M430,103 L430,45 Q480,18 530,45 L530,103 Z" fill="url(#dungeonAbyss)" stroke="#7f1d1d" stroke-width="3"/>
                            <line x1="455" y1="36" x2="455" y2="103" stroke="#450a0a" stroke-width="3"/>
                            <line x1="480" y1="28" x2="480" y2="103" stroke="#450a0a" stroke-width="3"/>
                            <line x1="505" y1="36" x2="505" y2="103" stroke="#450a0a" stroke-width="3"/>
                            <g transform="translate(470, 32)">
                                <path d="M2 6C2 3 4.5 1 10 1C15.5 1 18 3 18 6C18 9 15 11 14 12V15H6V12C5 11 2 9 2 6Z" fill="#e2e8f0"/>
                                <circle cx="7" cy="6" r="1.5" fill="#450a0a"/>
                                <circle cx="13" cy="6" r="1.5" fill="#450a0a"/>
                            </g>
                            <rect x="400" y="112" width="160" height="26" rx="4" fill="#181920" stroke="#5a1818" stroke-width="1.5" class="banner-box"/>
                            <text x="480" y="129" class="map-label">ВРАТА КАТАКОМБ</text>
                        </g>

                        <g class="town-building" id="building-tavern">
                            <rect x="55" y="185" width="175" height="145" rx="8" fill="#422a1d" stroke="#26170e" stroke-width="3" class="building-roof"/>
                            <path d="M55,185 L142,215 L230,185 L142,185 Z" fill="#5c3b28"/>
                            <path d="M55,330 L142,300 L230,330 L142,330 Z" fill="#5c3b28"/>
                            <rect x="185" y="195" width="16" height="16" fill="#261810"/>
                            <circle cx="85" cy="275" r="10" fill="#fef08a" opacity="0.3"/>
                            <circle cx="195" cy="275" r="10" fill="#fef08a" opacity="0.3"/>
                            <g transform="translate(132, 245)">
                                <rect x="3" y="6" width="14" height="16" rx="2" fill="#b45309" stroke="#451a03" stroke-width="1.5"/>
                                <path d="M17 9H20C21 9 22 10 22 11V13C22 14 21 15 20 15H17" stroke="#451a03" stroke-width="2"/>
                                <path d="M2 6Q10 3 18 6" fill="#fef08a"/>
                                <circle cx="5" cy="5" r="2" fill="#fef08a"/>
                                <circle cx="10" cy="4" r="2.5" fill="#fef08a"/>
                                <circle cx="15" cy="5" r="2" fill="#fef08a"/>
                            </g>
                            <rect x="72" y="342" width="140" height="24" rx="4" fill="#181920" stroke="#78350f" stroke-width="1.5" class="banner-box"/>
                            <text x="142" y="358" class="map-label">ТАВЕРНА</text>
                        </g>

                        <g class="town-building" id="building-shop">
                            <rect x="80" y="375" width="170" height="135" rx="8" fill="#3b2b2b" stroke="#1f1414" stroke-width="3" class="building-roof"/>
                            <path d="M80,375 L250,375 L240,415 L90,415 Z" fill="#881337"/>
                            <line x1="115" y1="375" x2="115" y2="415" stroke="#fde047" stroke-width="4"/>
                            <line x1="150" y1="375" x2="150" y2="415" stroke="#fde047" stroke-width="4"/>
                            <line x1="185" y1="375" x2="185" y2="415" stroke="#fde047" stroke-width="4"/>
                            <line x1="220" y1="375" x2="220" y2="415" stroke="#fde047" stroke-width="4"/>
                            <rect x="100" y="445" width="22" height="22" rx="2" fill="#543825"/>
                            <rect x="208" y="445" width="22" height="22" rx="2" fill="#543825"/>
                            <g transform="translate(153, 448)">
                                <line x1="12" y1="2" x2="12" y2="22" stroke="#ca8a04" stroke-width="2"/>
                                <line x1="2" y1="7" x2="22" y2="7" stroke="#ca8a04" stroke-width="2"/>
                                <path d="M2 7L-2 15H6L2 7Z" fill="#fef08a" stroke="#ca8a04"/>
                                <path d="M22 7L18 15H26L22 7Z" fill="#fef08a" stroke="#ca8a04"/>
                            </g>
                            <rect x="85" y="520" width="160" height="24" rx="4" fill="#181920" stroke="#9f1239" stroke-width="1.5" class="banner-box"/>
                            <text x="165" y="536" class="map-label">ЛАВКА ТОРГОВЦА</text>
                        </g>

                        <g class="town-building" id="building-blacksmith">
                            <rect x="730" y="185" width="175" height="145" rx="8" fill="#2d3039" stroke="#17181c" stroke-width="3" class="building-roof"/>
                            <circle cx="865" cy="225" r="28" fill="#c2410c" opacity="0.8"/>
                            <circle cx="865" cy="225" r="14" fill="#fb923c"/>
                            <rect x="760" y="275" width="25" height="15" rx="2" fill="#0f172a"/>
                            <rect x="768" y="268" width="9" height="7" fill="#0f172a"/>
                            <g transform="translate(805, 245)">
                                <line x1="4" y1="20" x2="20" y2="4" stroke="#78350f" stroke-width="3.5"/>
                                <rect x="16" y="2" width="8" height="5" fill="#94a3b8" rx="1"/>
                                <line x1="20" y1="20" x2="4" y2="4" stroke="#78350f" stroke-width="3.5"/>
                                <rect x="0" y="2" width="8" height="5" fill="#94a3b8" rx="1"/>
                            </g>
                            <rect x="747" y="342" width="140" height="24" rx="4" fill="#181920" stroke="#ea580c" stroke-width="1.5" class="banner-box"/>
                            <text x="817" y="358" class="map-label">КУЗНИЦА</text>
                        </g>

                        <g class="town-building" id="building-temple">
                            <rect x="710" y="375" width="170" height="135" rx="10" fill="#333742" stroke="#1c1e24" stroke-width="3" class="building-roof"/>
                            <circle cx="795" cy="435" r="42" fill="#252932" stroke="#0284c7" stroke-width="2.5"/>
                            <line x1="795" y1="405" x2="795" y2="465" stroke="#facc15" stroke-width="3.5"/>
                            <line x1="772" y1="425" x2="818" y2="425" stroke="#facc15" stroke-width="3.5"/>
                            <rect x="735" y="520" width="120" height="24" rx="4" fill="#181920" stroke="#0284c7" stroke-width="1.5" class="banner-box"/>
                            <text x="795" y="536" class="map-label">ХРАМ</text>
                        </g>

                        <g id="town-south-exit" class="south-exit-group">
                            <rect x="420" y="528" width="120" height="26" rx="4" fill="#181920" stroke="#d4af37" stroke-width="1.5"/>
                            <path d="M474,536 L480,544 L486,536" stroke="#d4af37" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                            <text x="480" y="522" class="map-label">ЮЖНЫЙ ТРАКТ</text>
                        </g>
                    </svg>
                </div>
            </div>
        `;

        this.initEvents();
    }

    initEvents() {
        this.container.querySelector('#btn-town-menu').addEventListener('click', () => {
            sound.playSfx('click');
            this.callbacks.onOpenMenu();
        });

        this.container.querySelector('#town-south-exit').addEventListener('click', () => {
            sound.playSfx('click');
            alert('Южный тракт ведёт во внешний мир и соседние регионы (будет доступно в будущих обновлениях).');
        });

        this.container.querySelector('#building-tavern').addEventListener('click', () => {
            sound.playSfx('tab');
            const screen = new TavernScreen(this.player, {
                onBack: () => this.render(this.container)
            });
            screen.render(this.container);
        });

        this.container.querySelector('#building-shop').addEventListener('click', () => {
            sound.playSfx('coin');
            const screen = new ShopScreen(this.player, {
                onBack: () => this.render(this.container)
            });
            screen.render(this.container);
        });

        this.container.querySelector('#building-blacksmith').addEventListener('click', () => {
            sound.playSfx('click');
            const screen = new BlacksmithScreen(this.player, {
                onBack: () => this.render(this.container)
            });
            screen.render(this.container);
        });

        this.container.querySelector('#building-temple').addEventListener('click', () => {
            sound.playSfx('tab');
            const screen = new TempleScreen(this.player, {
                onBack: () => this.render(this.container)
            });
            screen.render(this.container);
        });

        this.container.querySelector('#building-gate').addEventListener('click', () => {
            sound.playSfx('selectHero');
            alert('Врата Катакомб: спуск в подземелье готов к реализации следующим шагом!');
        });
    }
}