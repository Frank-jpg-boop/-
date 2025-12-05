const { ccclass, property } = cc._decorator;

/**
 * Loading scene controller
 */
@ccclass
export default class LoadingScene extends cc.Component {
    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null;

    @property(cc.Label)
    progressLabel: cc.Label = null;

    @property(cc.String)
    nextSceneName: string = "MainMenu";

    @property(cc.Float)
    minLoadingTime: number = 2.0;

    private loadProgress: number = 0;
    private startTime: number = 0;

    onLoad() {
        this.startTime = Date.now();
        this.loadProgress = 0;
        this.updateProgress(0);
    }

    start() {
        this.loadNextScene();
    }

    private loadNextScene() {
        cc.director.preloadScene(this.nextSceneName, (completedCount: number, totalCount: number) => {
            const progress = completedCount / totalCount;
            this.updateProgress(progress);
        }, (error: Error) => {
            if (error) {
                cc.error('Failed to load scene:', error);
                return;
            }
            
            this.onLoadComplete();
        });
    }

    private updateProgress(progress: number) {
        this.loadProgress = progress;
        
        if (this.progressBar) {
            this.progressBar.progress = progress;
        }
        
        if (this.progressLabel) {
            this.progressLabel.string = `${Math.floor(progress * 100)}%`;
        }
    }

    private onLoadComplete() {
        const elapsedTime = (Date.now() - this.startTime) / 1000;
        const remainingTime = Math.max(0, this.minLoadingTime - elapsedTime);
        
        this.scheduleOnce(() => {
            cc.director.loadScene(this.nextSceneName);
        }, remainingTime);
    }
}
