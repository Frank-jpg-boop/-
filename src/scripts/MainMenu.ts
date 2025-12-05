const { ccclass, property } = cc._decorator;

/**
 * Main menu controller
 */
@ccclass
export default class MainMenu extends cc.Component {
    @property(cc.Node)
    playButton: cc.Node = null;

    @property(cc.Node)
    settingsButton: cc.Node = null;

    @property(cc.Node)
    quitButton: cc.Node = null;

    @property(cc.String)
    gameSceneName: string = "GameScene";

    onLoad() {
        this.registerButtonEvents();
    }

    start() {
        this.playBackgroundMusic();
    }

    private registerButtonEvents() {
        if (this.playButton) {
            this.playButton.on('click', this.onPlayClicked, this);
        }
        
        if (this.settingsButton) {
            this.settingsButton.on('click', this.onSettingsClicked, this);
        }
        
        if (this.quitButton) {
            this.quitButton.on('click', this.onQuitClicked, this);
        }
    }

    private onPlayClicked() {
        this.playClickSound();
        cc.director.loadScene(this.gameSceneName);
    }

    private onSettingsClicked() {
        this.playClickSound();
        this.node.emit('show-settings');
    }

    private onQuitClicked() {
        this.playClickSound();
        cc.game.end();
    }

    private playBackgroundMusic() {
        // Play background music if available
    }

    private playClickSound() {
        // Play click sound effect
    }

    onDestroy() {
        if (this.playButton) {
            this.playButton.off('click', this.onPlayClicked, this);
        }
        if (this.settingsButton) {
            this.settingsButton.off('click', this.onSettingsClicked, this);
        }
        if (this.quitButton) {
            this.quitButton.off('click', this.onQuitClicked, this);
        }
    }
}
