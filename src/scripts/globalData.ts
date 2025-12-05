/**
 * Global data module for storing game state and shared variables
 */

interface GlobalData {
    currentLevel?: number;
    playerGold?: number;
    playerStats?: any;
    unlockedLevels?: number[];
    selectedCharacter?: number;
    gameSettings?: any;
}

const globalData: GlobalData = {
    currentLevel: 1,
    playerGold: 0,
    playerStats: {},
    unlockedLevels: [1],
    selectedCharacter: 0,
    gameSettings: {}
};

// Attach to window for global access
declare global {
    interface Window {
        globalData: GlobalData;
    }
}

window.globalData = globalData;

export default globalData;
