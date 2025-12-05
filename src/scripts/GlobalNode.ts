const { ccclass, property } = cc._decorator;

// Declare external globals
declare const AD: any;
declare const Tools: any;

/**
 * Global persistent node that survives scene changes
 */
@ccclass
export default class GlobalNode extends cc.Component {
    @property(cc.Node)
    audioManager: cc.Node = null;

    @property(cc.Node)
    networkManager: cc.Node = null;

    @property(cc.Node)
    adManager: cc.Node = null;

    private static instance: GlobalNode = null;

    onLoad() {
        if (GlobalNode.instance) {
            this.node.destroy();
            return;
        }
        
        GlobalNode.instance = this;
        cc.game.addPersistRootNode(this.node);
        
        this.initializeManagers();
    }

    start() {
        this.loadGameData();
    }

    private initializeManagers() {
        // Initialize audio manager
        if (this.audioManager) {
            this.audioManager.active = true;
        }
        
        // Initialize network manager
        if (this.networkManager) {
            this.networkManager.active = true;
        }
        
        // Initialize ad manager
        if (this.adManager && typeof AD !== 'undefined') {
            this.adManager.active = true;
        }
    }

    private loadGameData() {
        // Load saved game data from local storage
        const savedData = cc.sys.localStorage.getItem('gameData');
        
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                this.restoreGameData(data);
            } catch (e) {
                cc.error('Failed to parse saved game data:', e);
            }
        }
    }

    private restoreGameData(data: any) {
        if (window.globalData) {
            Object.assign(window.globalData, data);
        }
        
        this.node.emit('game-data-loaded', data);
    }

    static saveGameData() {
        if (window.globalData) {
            const dataToSave = JSON.stringify(window.globalData);
            cc.sys.localStorage.setItem('gameData', dataToSave);
        }
    }

    static getInstance(): GlobalNode {
        return GlobalNode.instance;
    }

    playBackgroundMusic(musicName: string) {
        if (this.audioManager) {
            this.audioManager.emit('play-bgm', musicName);
        }
    }

    playSoundEffect(sfxName: string) {
        if (this.audioManager) {
            this.audioManager.emit('play-sfx', sfxName);
        }
    }

    showAd(adType: string, callback?: Function) {
        if (this.adManager && typeof AD !== 'undefined') {
            this.adManager.emit('show-ad', { type: adType, callback });
        } else {
            callback?.(false);
        }
    }

    onDestroy() {
        if (GlobalNode.instance === this) {
            GlobalNode.instance = null;
        }
    }
}
