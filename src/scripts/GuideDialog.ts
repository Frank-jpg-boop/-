const { ccclass, property } = cc._decorator;

/**
 * Guide dialog system for tutorials
 */
@ccclass
export default class GuideDialog extends cc.Component {
    @property(cc.Node)
    dialogRoot: cc.Node = null;

    @property(cc.Label)
    dialogText: cc.Label = null;

    @property(cc.Node)
    characterSprite: cc.Node = null;

    @property(cc.Node)
    nextButton: cc.Node = null;

    @property(cc.Node)
    skipButton: cc.Node = null;

    @property(DialogTyper)
    dialogTyper: DialogTyper = null;

    @property([cc.String])
    dialogSequence: string[] = [];

    private currentDialogIndex: number = 0;
    private isPlaying: boolean = false;

    onLoad() {
        this.registerEvents();
    }

    start() {
        this.hide();
    }

    private registerEvents() {
        if (this.nextButton) {
            this.nextButton.on('click', this.onNextClicked, this);
        }
        
        if (this.skipButton) {
            this.skipButton.on('click', this.onSkipClicked, this);
        }
        
        if (this.dialogRoot) {
            this.dialogRoot.on('click', this.onDialogClicked, this);
        }
    }

    show() {
        if (this.dialogRoot) {
            this.dialogRoot.active = true;
            this.playShowAnimation();
        }
    }

    hide() {
        if (this.dialogRoot) {
            this.playHideAnimation(() => {
                this.dialogRoot.active = false;
            });
        }
    }

    playDialog(dialogSequence?: string[]) {
        if (dialogSequence) {
            this.dialogSequence = dialogSequence;
        }
        
        if (this.dialogSequence.length === 0) return;
        
        this.currentDialogIndex = 0;
        this.isPlaying = true;
        this.show();
        this.showNextDialog();
    }

    private showNextDialog() {
        if (this.currentDialogIndex >= this.dialogSequence.length) {
            this.onDialogComplete();
            return;
        }
        
        const dialogText = this.dialogSequence[this.currentDialogIndex];
        
        if (this.dialogTyper) {
            this.dialogTyper.startTyping(dialogText);
        } else if (this.dialogText) {
            this.dialogText.string = dialogText;
        }
    }

    private onNextClicked() {
        if (this.dialogTyper && this.dialogTyper.isCurrentlyTyping()) {
            this.dialogTyper.skipTyping();
        } else {
            this.currentDialogIndex++;
            this.showNextDialog();
        }
    }

    private onSkipClicked() {
        this.isPlaying = false;
        this.hide();
        this.node.emit('dialog-skipped');
    }

    private onDialogClicked() {
        if (this.dialogTyper && this.dialogTyper.isCurrentlyTyping()) {
            this.dialogTyper.skipTyping();
        }
    }

    private onDialogComplete() {
        this.isPlaying = false;
        this.hide();
        this.node.emit('dialog-complete');
    }

    private playShowAnimation() {
        if (!this.dialogRoot) return;
        
        this.dialogRoot.scale = 0.8;
        this.dialogRoot.opacity = 0;
        
        cc.tween(this.dialogRoot)
            .to(0.3, { scale: 1.0, opacity: 255 }, { easing: 'backOut' })
            .start();
    }

    private playHideAnimation(callback?: Function) {
        if (!this.dialogRoot) {
            callback?.();
            return;
        }
        
        cc.tween(this.dialogRoot)
            .to(0.2, { scale: 0.8, opacity: 0 })
            .call(() => {
                callback?.();
            })
            .start();
    }

    onDestroy() {
        if (this.nextButton) {
            this.nextButton.off('click', this.onNextClicked, this);
        }
        if (this.skipButton) {
            this.skipButton.off('click', this.onSkipClicked, this);
        }
        if (this.dialogRoot) {
            this.dialogRoot.off('click', this.onDialogClicked, this);
        }
    }
}
