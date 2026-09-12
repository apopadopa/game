import { sound } from '../../audio/audioEngine.js';
import { tavernMusic } from '../../audio/music/tavernMusic.js';
import { townTheme } from '../../audio/music/townTheme.js';
import { CharacterRenderer } from '../../visuals/characterRenderer.js';
import { NpcRenderer, NPC_CONFIGS } from '../../visuals/npcRenderer.js';
import { Icons } from '../../visuals/icons.js';

export class TavernScreen {
    constructor(player, callbacks) {
        this.player = player;
        this.callbacks = callbacks;
        this.npc = NPC_CONFIGS.brok;

        sound.switchMusic(tavernMusic, 1.2);

        this.rumors = [
            '«Один бродяга клялся, что на третьем ярусе катакомб наткнулся на алтарь, залечивающий любые раны...»',
            '«Не вздумай соваться вглубь без пары зелий от торговца Рашида. Местные скелеты не знают пощады!»',
            '«У кузнеца Торвальда тяжелый кулак, но его закалка делает клинок острее бритвы.»',
            '«По ночам из решётки катакомб доносится леденящий скрежет. Будто кто-то точит когти о гранит.»'
        ];
    }

    render(container) {
        this.container = container;
        container.innerHTML = `
            <div class="interior-screen">
                <div class="interior-top-bar">
                    <div class="loc-character-badge">
                        <div class="hud-avatar-frame">${CharacterRenderer.renderBust(this.player.visuals, this.player.classId)}</div>
                        <div class="loc-player-meta">
                            <span class="loc-player-name">${this.player.name}</span>
                            <span class="loc-gold">${Icons.coin(14)} <strong id="loc-gold-val">${this.player.gold}</strong></span>
                        </div>
                    </div>
                    <div class="interior-title-wrap">
                        <h2>Таверна «Пьяный Гоблин»</h2>
                        <span class="interior-subtitle">Теплый очаг, добрый хмель и отдых для уставших путников</span>
                    </div>
                    <button class="btn btn-secondary" id="btn-leave-tavern">${Icons.arrowLeft(13)} На площадь города</button>
                </div>

                <div class="interior-stage">
                    <div class="interior-scene-box">
                        <svg viewBox="0 0 460 380" class="tavern-scene-svg">
                            <defs>
                                <radialGradient id="fireGlow" cx="50%" cy="60%" r="50%">
                                    <stop offset="0%" stop-color="#ff7b1a" stop-opacity="0.9"/>
                                    <stop offset="60%" stop-color="#ea580c" stop-opacity="0.4"/>
                                    <stop offset="100%" stop-color="#1c1109" stop-opacity="0"/>
                                </radialGradient>

                                <radialGradient id="candleLight" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stop-color="#fef08a" stop-opacity="0.9"/>
                                    <stop offset="50%" stop-color="#f59e0b" stop-opacity="0.3"/>
                                    <stop offset="100%" stop-color="#14110f" stop-opacity="0"/>
                                </radialGradient>
                            </defs>

                            <rect width="460" height="380" fill="#18120c"/>

                            <line x1="0" y1="40" x2="460" y2="40" stroke="#2b1a10" stroke-width="2"/>
                            <line x1="0" y1="90" x2="460" y2="90" stroke="#2b1a10" stroke-width="2"/>
                            <line x1="0" y1="140" x2="460" y2="140" stroke="#2b1a10" stroke-width="2"/>
                            <line x1="0" y1="190" x2="460" y2="190" stroke="#2b1a10" stroke-width="2"/>

                            <rect x="0" y="0" width="30" height="380" fill="#2d1c12"/>
                            <rect x="430" y="0" width="30" height="380" fill="#2d1c12"/>
                            <rect x="0" y="0" width="460" height="30" fill="#2d1c12"/>

                            <rect x="35" y="80" width="120" height="150" fill="#262322" stroke="#171514" stroke-width="3"/>
                            <path d="M50,230 L50,140 Q95,110 140,140 L140,230 Z" fill="#120e0c"/>
                            <circle cx="95" cy="180" r="55" fill="url(#fireGlow)" class="fire-flame-flicker"/>
                            <polygon points="80,225 95,170 110,225" fill="#f97316" class="fire-flame-flicker"/>
                            <polygon points="88,225 95,185 102,225" fill="#fde047" class="fire-flame-flicker"/>

                            <rect x="180" y="70" width="220" height="14" fill="#3a2315" rx="2" stroke="#1f1109" stroke-width="1"/>
                            <rect x="195" y="44" width="32" height="26" rx="4" fill="#4d2f1c" stroke="#1f1109" stroke-width="1.5"/>
                            <rect x="235" y="44" width="32" height="26" rx="4" fill="#4d2f1c" stroke="#1f1109" stroke-width="1.5"/>
                            <rect x="275" y="44" width="32" height="26" rx="4" fill="#4d2f1c" stroke="#1f1109" stroke-width="1.5"/>
                            <circle cx="340" cy="56" r="8" fill="#15803d" opacity="0.8"/>
                            <circle cx="360" cy="56" r="8" fill="#b91c1c" opacity="0.8"/>
                            <circle cx="380" cy="56" r="8" fill="#0369a1" opacity="0.8"/>

                            <g id="tavern-brok-sprite" transform="translate(160, 48) scale(0.92)">
                                ${NpcRenderer.render(this.npc)}
                            </g>

                            <g id="bar-counter-foreground">
                                <rect x="90" y="225" width="320" height="30" rx="3" fill="#4a2c1a" stroke="#24140a" stroke-width="2"/>
                                <rect x="100" y="255" width="300" height="125" fill="#2d190d" stroke="#1c0e06" stroke-width="2"/>
                                <line x1="100" y1="290" x2="400" y2="290" stroke="#1a0d05" stroke-width="2"/>
                                <line x1="100" y1="330" x2="400" y2="330" stroke="#1a0d05" stroke-width="2"/>

                                <rect x="125" y="200" width="18" height="25" rx="3" fill="#92400e" stroke="#451a03" stroke-width="1.2"/>
                                <path d="M123,204 Q134,198 145,204" fill="#fef08a"/>
                                <path d="M143,205 Q152,212 143,220" stroke="#451a03" stroke-width="2" fill="none"/>

                                <g transform="translate(365, 205)">
                                    <circle cx="0" cy="0" r="35" fill="url(#candleLight)"/>
                                    <rect x="-6" y="5" width="12" height="15" fill="#78350f" rx="2"/>
                                    <polygon points="-3,5 0,-4 3,5" fill="#fde047"/>
                                </g>
                            </g>
                        </svg>
                    </div>

                    <div class="interior-interaction-panel">
                        <div class="npc-dialog-card">
                            <div class="npc-header-row">
                                <div class="npc-badge-mini">
                                    <div class="npc-bust-circle">${NpcRenderer.renderBust(this.npc)}</div>
                                    <span class="npc-title">${this.npc.name}</span>
                                </div>
                                <span class="npc-status-tag">Хозяин заведения</span>
                            </div>
                            <div class="npc-speech-bubble" id="brok-speech">
                                «Здорово, путник! Проходи к очагу. В такую сырость кружка доброго эля и мягкая постель — лучшее лекарство от могильного холода катакомб.»
                            </div>
                        </div>

                        <div class="interior-services-box">
                            <div class="service-action-row">
                                <div class="srv-icon">${Icons.bed(22)}</div>
                                <div class="srv-info">
                                    <div class="srv-name">Снять теплую комнату</div>
                                    <div class="srv-desc">Сон до утра. Полностью восстанавливает HP и MP.</div>
                                </div>
                                <button class="btn btn-primary srv-btn" id="btn-rest" ${this.player.gold < 10 ? 'disabled' : ''}>
                                    Отдохнуть — ${Icons.coin(13)} 10
                                </button>
                            </div>

                            <div class="service-action-row">
                                <div class="srv-icon">${Icons.ale(22)}</div>
                                <div class="srv-info">
                                    <div class="srv-name">Кружка отборного эля</div>
                                    <div class="srv-desc">Прилив сил: +5% к шансу крита на следующий спуск.</div>
                                </div>
                                <button class="btn btn-primary srv-btn" id="btn-ale" ${this.player.gold < 5 ? 'disabled' : ''}>
                                    Выпить — ${Icons.coin(13)} 5
                                </button>
                            </div>

                            <div class="service-action-row">
                                <div class="srv-icon">${Icons.chat(22)}</div>
                                <div class="srv-info">
                                    <div class="srv-name">Послушать трактирные слухи</div>
                                    <div class="srv-desc">Узнай полезные секреты и тайны глубин подземелья.</div>
                                </div>
                                <button class="btn btn-secondary srv-btn" id="btn-rumor">
                                    Слушать (Бесплатно)
                                </button>
                            </div>
                        </div>

                        <div class="interior-status-footer" id="tavern-feedback">
                            Твоё состояние: <strong>${this.player.currentHp}/${this.player.maxHp} HP</strong> | <strong>${this.player.currentMp}/${this.player.maxMp} MP</strong>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.initEvents();
    }

    initEvents() {
        this.container.querySelector('#btn-leave-tavern').addEventListener('click', () => {
            sound.playSfx('click');
            sound.switchMusic(townTheme, 1.2);
            this.callbacks.onBack();
        });

        this.container.querySelector('#btn-rest').addEventListener('click', () => {
            if (this.player.gold >= 10) {
                this.player.gold -= 10;
                this.player.currentHp = this.player.maxHp;
                this.player.currentMp = this.player.maxMp;
                sound.playSfx('coin');
                this.container.querySelector('#loc-gold-val').textContent = this.player.gold;
                this.container.querySelector('#brok-speech').textContent = '«Сладких снов! Можешь спать спокойно, мои дубовые двери выдержат осаду даже взбесившегося огра.»';
                this.container.querySelector('#tavern-feedback').innerHTML = `Ты превосходно отдохнул! <strong>${this.player.currentHp}/${this.player.maxHp} HP</strong> | <strong>${this.player.currentMp}/${this.player.maxMp} MP</strong>`;
                this.updateButtons();
            }
        });

        this.container.querySelector('#btn-ale').addEventListener('click', () => {
            if (this.player.gold >= 5) {
                this.player.gold -= 5;
                this.player.critChance = Math.min(80, this.player.critChance + 5);
                sound.playSfx('coin');
                this.container.querySelector('#loc-gold-val').textContent = this.player.gold;
                this.container.querySelector('#brok-speech').textContent = '«Ха! Вот это по-нашему! Хороший эль разгоняет кровь в жилах. Рука не дрогнет в бою!»';
                this.container.querySelector('#tavern-feedback').innerHTML = `Боевой кураж! Твой шанс критического удара вырос до <strong>${this.player.critChance}%</strong>!`;
                this.updateButtons();
            }
        });

        this.container.querySelector('#btn-rumor').addEventListener('click', () => {
            sound.playSfx('tab');
            const random = this.rumors[Math.floor(Math.random() * this.rumors.length)];
            this.container.querySelector('#brok-speech').textContent = random;
        });
    }

    updateButtons() {
        this.container.querySelector('#btn-rest').disabled = this.player.gold < 10;
        this.container.querySelector('#btn-ale').disabled = this.player.gold < 5;
    }
}