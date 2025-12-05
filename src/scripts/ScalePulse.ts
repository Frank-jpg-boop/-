const { ccclass, property } = cc._decorator;

/**
 * Simple scale pulse animation component
 */
@ccclass
export default class ScalePulse extends cc.Component {
    @property(cc.Float)
    minScale: number = 0.9;

    @property(cc.Float)
    maxScale: number = 1.1;

    @property(cc.Float)
    duration: number = 1.0;

    @property(cc.Boolean)
    autoStart: boolean = true;

    @property(cc.Boolean)
    loop: boolean = true;

    private isAnimating: boolean = false;

    onLoad() {
        // Store original scale
        this.node.scale = 1.0;
    }

    start() {
        if (this.autoStart) {
            this.startPulse();
        }
    }

    startPulse() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.playPulseAnimation();
    }

    stopPulse() {
        this.isAnimating = false;
        cc.Tween.stopAllByTarget(this.node);
        this.node.scale = 1.0;
    }

    private playPulseAnimation() {
        const tween = cc.tween(this.node)
            .to(this.duration / 2, { scale: this.maxScale }, { easing: 'sineInOut' })
            .to(this.duration / 2, { scale: this.minScale }, { easing: 'sineInOut' });
        
        if (this.loop) {
            tween.union().repeatForever().start();
        } else {
            tween.call(() => {
                this.isAnimating = false;
            }).start();
        }
    }

    onDestroy() {
        this.stopPulse();
    }
}
