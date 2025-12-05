const { ccclass, property } = cc._decorator;

/**
 * Display item for tasks/missions
 */
@ccclass
export default class TaskItem extends cc.Component {
    @property(cc.Label)
    taskNameLabel: cc.Label = null;

    @property(cc.Label)
    taskDescLabel: cc.Label = null;

    @property(cc.Label)
    progressLabel: cc.Label = null;

    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null;

    @property(cc.Node)
    rewardContainer: cc.Node = null;

    @property(cc.Node)
    claimButton: cc.Node = null;

    @property(cc.Node)
    completedIcon: cc.Node = null;

    private taskId: string = "";
    private taskName: string = "";
    private taskDesc: string = "";
    private currentProgress: number = 0;
    private targetProgress: number = 100;
    private isCompleted: boolean = false;
    private isClaimed: boolean = false;

    onLoad() {
        this.registerEvents();
    }

    start() {
        this.updateDisplay();
    }

    private registerEvents() {
        if (this.claimButton) {
            this.claimButton.on('click', this.onClaimClicked, this);
        }
    }

    setTaskData(taskId: string, name: string, desc: string, current: number, target: number) {
        this.taskId = taskId;
        this.taskName = name;
        this.taskDesc = desc;
        this.currentProgress = current;
        this.targetProgress = target;
        this.isCompleted = current >= target;
        this.updateDisplay();
    }

    updateProgress(current: number) {
        this.currentProgress = current;
        this.isCompleted = current >= this.targetProgress;
        this.updateDisplay();
    }

    private updateDisplay() {
        if (this.taskNameLabel) {
            this.taskNameLabel.string = this.taskName;
        }
        
        if (this.taskDescLabel) {
            this.taskDescLabel.string = this.taskDesc;
        }
        
        if (this.progressLabel) {
            this.progressLabel.string = `${this.currentProgress}/${this.targetProgress}`;
        }
        
        if (this.progressBar) {
            this.progressBar.progress = this.currentProgress / this.targetProgress;
        }
        
        if (this.claimButton) {
            this.claimButton.active = this.isCompleted && !this.isClaimed;
        }
        
        if (this.completedIcon) {
            this.completedIcon.active = this.isClaimed;
        }
    }

    private onClaimClicked() {
        if (!this.isCompleted || this.isClaimed) return;
        
        this.isClaimed = true;
        this.node.emit('task-claimed', this.taskId);
        this.updateDisplay();
        this.playClaimAnimation();
    }

    private playClaimAnimation() {
        if (this.rewardContainer) {
            cc.tween(this.rewardContainer)
                .to(0.3, { scale: 1.2 })
                .to(0.3, { scale: 1.0 })
                .start();
        }
    }

    onDestroy() {
        if (this.claimButton) {
            this.claimButton.off('click', this.onClaimClicked, this);
        }
    }
}
