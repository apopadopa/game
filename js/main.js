import { MainMenu } from './screens/mainMenu.js';
import { CharacterCreation } from './screens/characterCreation.js';
import { TownScreen } from './screens/townScreen.js';
import { sound } from './audio/audioEngine.js';
import { menuTheme } from './audio/music/menuTheme.js';
import { townTheme } from './audio/music/townTheme.js';
import { AudioSettings } from './ui/audioSettings.js';

class Game {
    constructor() {
        this.container = document.getElementById('screen-container');
        this.currentScreen = null;
        this.player = null;
    }

    init() {
        AudioSettings.init();
        this.setupAutoplayUnlock();
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

    showMainMenu() {
        sound.switchMusic(menuTheme, 1.4);
        this.currentScreen = new MainMenu({
            onStartGame: () => {
                sound.playSfx('selectHero');
                this.showCharacterCreation();
            }
        });
        this.currentScreen.render(this.container);
    }

    showCharacterCreation() {
        sound.switchMusic(menuTheme, 1.4);
        this.currentScreen = new CharacterCreation({
            onCancel: () => {
                sound.playSfx('click');
                this.showMainMenu();
            },
            onComplete: (createdPlayer) => {
                sound.playSfx('selectHero');
                this.player = createdPlayer;
                this.enterTown();
            }
        });
        this.currentScreen.render(this.container);
    }

    enterTown() {
        sound.switchMusic(townTheme, 1.6);
        sound.playSfx('coin');

        this.currentScreen = new TownScreen(this.player, {
            onOpenMenu: () => this.showMainMenu(),
            onEnterDungeon: () => console.log('Переход в подземелье...')
        });
        this.currentScreen.render(this.container);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.init();
});