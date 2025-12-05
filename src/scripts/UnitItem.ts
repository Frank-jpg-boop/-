const { ccclass, property } = cc._decorator;

/**
 * Display item for units/characters in inventory or shop
 */
@ccclass
export default class UnitItem extends cc.Component {
    @property(cc.Sprite)
    unitIcon: cc.Sprite = null;

    @property(cc.Label)
    unitNameLabel: cc.Label = null;

    @property(cc.Label)
    unitLevelLabel: cc.Label = null;

    @property(cc.Node)
    lockIcon: cc.Node = null;

    @property(cc.Node)
    selectIndicator: cc.Node = null;

    private unitId: string = "";
    private unitLevel: number = 1;
    private isUnlocked: boolean = false;
    private isSelected: boolean = false;

    onLoad() {
        this.node.on('click', this.onItemClicked, this);
    }

    start() {
        this.updateDisplay();
    }

    setUnitData(unitId: string, level: number = 1, unlocked: boolean = false) {
        this.unitId = unitId;
        this.unitLevel = level;
        this.isUnlocked = unlocked;
        this.updateDisplay();
    }

    setSelected(selected: boolean) {
        this.isSelected = selected;
        this.updateSelectionState();
    }

    getUnitId(): string {
        return this.unitId;
    }

    isUnitUnlocked(): boolean {
        return this.isUnlocked;
    }

    private updateDisplay() {
        if (this.unitNameLabel) {
            this.unitNameLabel.string = this.unitId;
        }
        
        if (this.unitLevelLabel) {
            this.unitLevelLabel.string = `Lv.${this.unitLevel}`;
        }
        
        if (this.lockIcon) {
            this.lockIcon.active = !this.isUnlocked;
        }
        
        this.updateSelectionState();
    }

    private updateSelectionState() {
        if (this.selectIndicator) {
            this.selectIndicator.active = this.isSelected;
        }
        
        const opacity = this.isUnlocked ? 255 : 128;
        if (this.unitIcon) {
            this.unitIcon.node.opacity = opacity;
        }
    }

    private onItemClicked() {
        if (!this.isUnlocked) {
            this.node.emit('unit-locked-clicked', this.unitId);
            return;
        }
        
        this.node.emit('unit-clicked', this.unitId);
    }

    onDestroy() {
        this.node.off('click', this.onItemClicked, this);
    }
}
