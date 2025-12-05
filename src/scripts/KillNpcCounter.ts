const { ccclass, property } = cc._decorator;

/**
 * Tracks and displays NPC kill count
 */
@ccclass
export default class KillNpcCounter extends cc.Component {
    @property(cc.Label)
    counterLabel: cc.Label = null;

    @property(cc.Node)
    counterIcon: cc.Node = null;

    @property(cc.Integer)
    targetKillCount: number = 100;

    private currentKillCount: number = 0;

    onLoad() {
        this.currentKillCount = 0;
        this.updateDisplay();
        this.registerEvents();
    }

    start() {
        this.updateDisplay();
    }

    private registerEvents() {
        this.node.on('npc-killed', this.onNpcKilled, this);
    }

    private onNpcKilled(event: any) {
        this.addKill(1);
    }

    addKill(count: number = 1) {
        this.currentKillCount += count;
        this.updateDisplay();
        
        if (this.currentKillCount >= this.targetKillCount) {
            this.onTargetReached();
        }
        
        this.node.emit('kill-count-changed', this.currentKillCount);
    }

    resetCounter() {
        this.currentKillCount = 0;
        this.updateDisplay();
    }

    getKillCount(): number {
        return this.currentKillCount;
    }

    private updateDisplay() {
        if (this.counterLabel) {
            this.counterLabel.string = `${this.currentKillCount}/${this.targetKillCount}`;
        }
        
        if (this.counterIcon) {
            // Update icon animation or state
            const progress = this.currentKillCount / this.targetKillCount;
            this.counterIcon.scale = 1.0 + progress * 0.2;
        }
    }

    private onTargetReached() {
        this.node.emit('target-kill-count-reached');
        this.playCompletionEffect();
    }

    private playCompletionEffect() {
        // Play celebration animation or sound
        if (this.counterIcon) {
            cc.tween(this.counterIcon)
                .to(0.2, { scale: 1.5 })
                .to(0.2, { scale: 1.0 })
                .start();
        }
    }

    onDestroy() {
        this.node.off('npc-killed', this.onNpcKilled, this);
    }
}
