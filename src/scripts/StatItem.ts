const { ccclass, property } = cc._decorator;

/**
 * Display item for character/player stats
 */
@ccclass
export default class StatItem extends cc.Component {
    @property(cc.Label)
    statNameLabel: cc.Label = null;

    @property(cc.Label)
    statValueLabel: cc.Label = null;

    @property(cc.Sprite)
    statIcon: cc.Sprite = null;

    @property(cc.ProgressBar)
    statBar: cc.ProgressBar = null;

    private statName: string = "";
    private statValue: number = 0;
    private maxValue: number = 100;

    onLoad() {
        // Initialize
    }

    start() {
        this.updateDisplay();
    }

    setStatData(name: string, value: number, maxValue: number = 100) {
        this.statName = name;
        this.statValue = value;
        this.maxValue = maxValue;
        this.updateDisplay();
    }

    setValue(value: number) {
        this.statValue = value;
        this.updateDisplay();
    }

    getValue(): number {
        return this.statValue;
    }

    private updateDisplay() {
        if (this.statNameLabel) {
            this.statNameLabel.string = this.statName;
        }
        
        if (this.statValueLabel) {
            this.statValueLabel.string = `${this.statValue}`;
        }
        
        if (this.statBar) {
            this.statBar.progress = this.statValue / this.maxValue;
        }
    }

    animateValueChange(newValue: number, duration: number = 0.5) {
        const oldValue = this.statValue;
        const delta = newValue - oldValue;
        let elapsed = 0;
        
        this.schedule(() => {
            elapsed += 0.016; // Assume 60fps
            const progress = Math.min(elapsed / duration, 1.0);
            this.setValue(Math.floor(oldValue + delta * progress));
            
            if (progress >= 1.0) {
                this.unschedule(arguments.callee);
            }
        }, 0.016);
    }
}
