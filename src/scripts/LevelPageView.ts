const { ccclass, property } = cc._decorator;

/**
 * Level selection page view controller
 */
@ccclass
export default class LevelPageView extends cc.Component {
    @property(cc.PageView)
    pageView: cc.PageView = null;

    @property(cc.Prefab)
    levelItemPrefab: cc.Prefab = null;

    @property(cc.Node)
    pageIndicator: cc.Node = null;

    @property(cc.Integer)
    totalLevels: number = 30;

    @property(cc.Integer)
    levelsPerPage: number = 6;

    onLoad() {
        this.initializeLevelPages();
    }

    start() {
        this.updatePageIndicator();
        if (this.pageView) {
            this.pageView.node.on('page-turning', this.onPageTurning, this);
        }
    }

    private initializeLevelPages() {
        if (!this.pageView || !this.levelItemPrefab) return;

        const totalPages = Math.ceil(this.totalLevels / this.levelsPerPage);
        
        for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
            const page = new cc.Node('Page' + pageIndex);
            page.parent = this.pageView.content;
            
            const layout = page.addComponent(cc.Layout);
            layout.type = cc.Layout.Type.GRID;
            layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
            
            const startLevel = pageIndex * this.levelsPerPage;
            const endLevel = Math.min(startLevel + this.levelsPerPage, this.totalLevels);
            
            for (let levelIndex = startLevel; levelIndex < endLevel; levelIndex++) {
                this.createLevelItem(page, levelIndex + 1);
            }
        }
    }

    private createLevelItem(parent: cc.Node, levelNumber: number) {
        const levelItem = cc.instantiate(this.levelItemPrefab);
        levelItem.parent = parent;
        
        // Set level data
        levelItem.getComponent('LevelItem')?.setLevelData(levelNumber);
        levelItem.on('click', () => this.onLevelSelected(levelNumber), this);
    }

    private onLevelSelected(levelNumber: number) {
        // Check if level is unlocked
        const unlockedLevels = window.globalData?.unlockedLevels || [1];
        
        if (unlockedLevels.includes(levelNumber)) {
            window.globalData.currentLevel = levelNumber;
            this.node.emit('level-selected', levelNumber);
        }
    }

    private onPageTurning() {
        this.updatePageIndicator();
    }

    private updatePageIndicator() {
        if (!this.pageIndicator || !this.pageView) return;
        
        const currentPage = this.pageView.getCurrentPageIndex();
        this.pageIndicator.getComponent(cc.Label)?.setString(`${currentPage + 1}`);
    }

    onDestroy() {
        if (this.pageView) {
            this.pageView.node.off('page-turning', this.onPageTurning, this);
        }
    }
}
