const { ccclass, property } = cc._decorator;

/**
 * Typewriter effect for dialog text
 */
@ccclass
export default class DialogTyper extends cc.Component {
    @property(cc.Label)
    textLabel: cc.Label = null;

    @property(cc.Float)
    typingSpeed: number = 0.05;

    @property(cc.AudioClip)
    typingSound: cc.AudioClip = null;

    @property(cc.Boolean)
    autoStart: boolean = false;

    private fullText: string = "";
    private currentIndex: number = 0;
    private isTyping: boolean = false;
    private typingCallback: Function = null;

    onLoad() {
        if (this.textLabel) {
            this.fullText = this.textLabel.string;
            this.textLabel.string = "";
        }
    }

    start() {
        if (this.autoStart && this.fullText) {
            this.startTyping(this.fullText);
        }
    }

    startTyping(text: string, callback?: Function) {
        this.fullText = text;
        this.currentIndex = 0;
        this.isTyping = true;
        this.typingCallback = callback;
        
        if (this.textLabel) {
            this.textLabel.string = "";
        }
        
        this.typeNextCharacter();
    }

    skipTyping() {
        if (!this.isTyping) return;
        
        this.isTyping = false;
        this.unscheduleAllCallbacks();
        
        if (this.textLabel) {
            this.textLabel.string = this.fullText;
        }
        
        this.onTypingComplete();
    }

    isCurrentlyTyping(): boolean {
        return this.isTyping;
    }

    private typeNextCharacter() {
        if (!this.isTyping || this.currentIndex >= this.fullText.length) {
            this.onTypingComplete();
            return;
        }
        
        const char = this.fullText[this.currentIndex];
        
        if (this.textLabel) {
            this.textLabel.string += char;
        }
        
        this.playTypingSound();
        this.currentIndex++;
        
        this.scheduleOnce(() => {
            this.typeNextCharacter();
        }, this.typingSpeed);
    }

    private playTypingSound() {
        if (this.typingSound) {
            cc.audioEngine.playEffect(this.typingSound, false);
        }
    }

    private onTypingComplete() {
        this.isTyping = false;
        this.node.emit('typing-complete');
        
        if (this.typingCallback) {
            this.typingCallback();
            this.typingCallback = null;
        }
    }

    setText(text: string) {
        this.fullText = text;
        if (this.textLabel) {
            this.textLabel.string = text;
        }
    }

    onDestroy() {
        this.isTyping = false;
        this.unscheduleAllCallbacks();
    }
}
