import { MainMenu } from './screens/mainMenu.js';
import { CharacterCreation } from './screens/characterCreation.js';
import { StoryPrologueScreen } from './screens/storyPrologueScreen.js';
import { TownScreen } from './screens/townScreen.js';
import { InventoryScreen } from './screens/inventoryScreen.js';
import { DungeonScreen } from './screens/dungeonScreen.js';
import { BattleScreen } from './screens/battleScreen.js';
import { MobShowcaseScreen } from './screens/mobShowcaseScreen.js';
import { Player } from './entities/player.js';
import { sound } from './audio/audioEngine.js';
import { menuTheme } from './audio/music/menuTheme.js';
import { creationTheme } from './audio/music/characterCreationMusic.js';
import { townTheme } from './audio/music/townTheme.js';
import { AudioSettings } from './ui/audioSettings.js';

class Game {
    constructor() {
        this.container = document.getElementById('screen-container');
        this.currentScreen = null;
        this.player = null;
        this.dungeonSavedState = null;
        this.previousScreenType = null;
    }

    init() {
        AudioSettings.init();
        this.setupAutoplayUnlock();
        this.setupKeyboardShortcuts();
        this.showMainMenu();
    }

    setupAutoplayUnlock() {
        const startAudio = () => {
            sound.ensureReady();
            sound.switchMusic(menuTheme, 1.2);
            window.removeEventListener('pointerdown', startAudio);
        };
        window.addEventListener('pointerdown', startAudio);
    }

    setupKeyboardShortcuts() {
        window.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
            if (this.currentScreen instanceof BattleScreen) return;

            // Hotkeys: 'KeyI' toggles inventory
            if (e.code === 'KeyI') {
                if (this.currentScreen instanceof TownScreen) {
                    this.showInventoryMenu();
                } else if (this.currentScreen instanceof DungeonScreen) {
                    this.dungeonSavedState = this.currentScreen.getState();
                    this.showInventoryMenu(() => this.enterDungeon());
                } else if (this.currentScreen instanceof InventoryScreen) {
                    if (this.previousScreenType === 'dungeon') {
                        this.enterDungeon();
                    } else {
                        this.enterTown();
                    }
                }
            } else if (e.code === 'Escape') {
                if (this.currentScreen instanceof InventoryScreen) {
                    if (this.previousScreenType === 'dungeon') {
                        this.enterDungeon();
                    } else {
                        this.enterTown();
                    }
                } else if (this.currentScreen instanceof DungeonScreen) {
                    this.dungeonSavedState = this.currentScreen.getState();
                    this.showInventoryMenu(() => this.enterDungeon());
                }
            }
        });
    }

    showMainMenu() {
        if (this.currentScreen && typeof this.currentScreen.cleanup === 'function') {
            this.currentScreen.cleanup();
        }
        this.dungeonSavedState = null;
        this.previousScreenType = null;
        sound.switchMusic(menuTheme, 1.4);
        this.currentScreen = new MainMenu({
            onStartGame: () => {
                sound.playSfx('selectHero');
                this.showCharacterCreation();
            },
            onContinueGame: (savedData) => {
                sound.playSfx('selectHero');
                this.player = new Player(savedData);
                this.enterTown();
            },
            onOpenBestiary: () => {
                this.showBestiaryScreen();
            },
            onOpenPrologue: () => {
                sound.playSfx('selectHero');
                const samplePlayer = this.player || new Player({ name: 'Искатель приключений', classId: 'warrior' });
                this.player = samplePlayer;
                this.showPrologue();
            }
        });
        this.currentScreen.render(this.container);
    }

    showBestiaryScreen() {
        if (this.currentScreen && typeof this.currentScreen.cleanup === 'function') {
            this.currentScreen.cleanup();
        }
        this.dungeonSavedState = null;
        this.previousScreenType = 'menu';
        this.currentScreen = new MobShowcaseScreen({
            onBack: () => {
                this.showMainMenu();
            }
        });
        this.currentScreen.render(this.container);
    }

    showCharacterCreation() {
        if (this.currentScreen && typeof this.currentScreen.cleanup === 'function') {
            this.currentScreen.cleanup();
        }
        this.dungeonSavedState = null;
        sound.switchMusic(creationTheme, 1.4);
        this.currentScreen = new CharacterCreation({
            onCancel: () => {
                sound.playSfx('click');
                this.showMainMenu();
            },
            onComplete: (createdPlayer) => {
                sound.playSfx('selectHero');
                this.player = createdPlayer;
                this.showPrologue();
            }
        });
        this.currentScreen.render(this.container);
    }

    showPrologue() {
        if (this.currentScreen && typeof this.currentScreen.cleanup === 'function') {
            this.currentScreen.cleanup();
        }
        this.previousScreenType = 'prologue';
        this.currentScreen = new StoryPrologueScreen(this.player, {
            onFinish: () => {
                this.enterTown();
            }
        });
        this.currentScreen.render(this.container);
    }

    enterTown() {
        if (this.currentScreen && typeof this.currentScreen.cleanup === 'function') {
            this.currentScreen.cleanup();
        }
        this.previousScreenType = 'town';
        sound.switchMusic(townTheme, 1.6);

        this.currentScreen = new TownScreen(this.player, {
            onOpenMenu: (tab = 'inventory') => this.showInventoryMenu(null, tab),
            onEnterDungeon: () => this.enterDungeon()
        });
        this.currentScreen.render(this.container);
    }

    enterDungeon() {
        if (this.currentScreen && typeof this.currentScreen.cleanup === 'function') {
            this.currentScreen.cleanup();
        }
        this.previousScreenType = 'dungeon';

        this.currentScreen = new DungeonScreen(this.player, {
            onOpenMenu: (state, tab = 'inventory') => {
                this.dungeonSavedState = state;
                this.showInventoryMenu(() => this.enterDungeon(), tab);
            },
            onExitToTown: (state) => {
                this.dungeonSavedState = state;
                this.enterTown();
            },
            onStartBattle: (monster, room, state) => {
                this.enterBattle(monster, room, state);
            }
        }, this.dungeonSavedState);

        this.currentScreen.render(this.container);
    }

    enterBattle(monster, room, dungeonState) {
        if (this.currentScreen && typeof this.currentScreen.cleanup === 'function') {
            this.currentScreen.cleanup();
        }
        this.dungeonSavedState = dungeonState;
        this.previousScreenType = 'dungeon';

        this.currentScreen = new BattleScreen(this.player, monster, room, {
            onVictory: (rewardData) => {
                // Помечаем монстра поверженным в подземелье
                if (this.dungeonSavedState && this.dungeonSavedState.dungeon) {
                    const fl = this.dungeonSavedState.dungeon.floors[room.floorNum - 1];
                    if (fl && fl.rooms && fl.rooms[room.roomIndex]) {
                        fl.rooms[room.roomIndex].isMonsterDefeated = true;
                    }
                }
                if (rewardData?.monster?.tier === 'final_boss' || (room && room.floorNum === 30 && room.isBossRoom)) {
                    this.player.hasDefeatedFinalBoss = true;
                }
                this.enterDungeon();
            },
            onDefeat: () => {
                this.enterTown();
            },
            onFlee: () => {
                this.enterDungeon();
            }
        });

        this.currentScreen.render(this.container);
    }

    showInventoryMenu(returnCallback = null, initialTab = 'inventory') {
        if (this.currentScreen && typeof this.currentScreen.cleanup === 'function') {
            this.currentScreen.cleanup();
        }
        sound.playSfx('tab');
        this.currentScreen = new InventoryScreen(this.player, {
            onClose: () => {
                if (returnCallback) {
                    returnCallback();
                } else {
                    this.enterTown();
                }
            },
            onMainMenu: () => {
                this.showMainMenu();
            }
        }, initialTab);
        this.currentScreen.render(this.container);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.init();
});