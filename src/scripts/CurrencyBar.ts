const { ccclass, property } = cc._decorator;

/**
 * Display and manage currency (gold, gems, etc.)
 */
@ccclass
export default class CurrencyBar extends cc.Component {
    @property(cc.Label)
    currencyLabel: cc.Label = null;

    @property(cc.Sprite)
    currencyIcon: cc.Sprite = null;

    @property(cc.Node)
    addButton: cc.Node = null;

    @property(cc.String)
    currencyType: string = "gold";

    private currentAmount: number = 0;

    onLoad() {
        this.registerEvents();
        this.loadCurrencyAmount();
    }

    start() {
        this.updateDisplay();
    }

    private registerEvents() {
        if (this.addButton) {
            this.addButton.on('click', this.onAddButtonClicked, this);
        }
        
        this.node.on('currency-changed', this.onCurrencyChanged, this);
    }

    private loadCurrencyAmount() {
        // Load from global data
        if (window.globalData) {
            if (this.currencyType === 'gold') {
                this.currentAmount = window.globalData.playerGold || 0;
            }
        }
    }

    addCurrency(amount: number) {
        this.currentAmount += amount;
        this.saveCurrencyAmount();
        this.animateValueChange();
        this.node.emit('currency-updated', { type: this.currencyType, amount: this.currentAmount });
    }

    subtractCurrency(amount: number): boolean {
        if (this.currentAmount >= amount) {
            this.currentAmount -= amount;
            this.saveCurrencyAmount();
            this.animateValueChange();
            this.node.emit('currency-updated', { type: this.currencyType, amount: this.currentAmount });
            return true;
        }
        return false;
    }

    getCurrencyAmount(): number {
        return this.currentAmount;
    }

    private saveCurrencyAmount() {
        if (window.globalData) {
            if (this.currencyType === 'gold') {
                window.globalData.playerGold = this.currentAmount;
            }
        }
    }

    private updateDisplay() {
        if (this.currencyLabel) {
            this.currencyLabel.string = this.formatCurrency(this.currentAmount);
        }
    }

    private formatCurrency(amount: number): string {
        if (amount >= 1000000) {
            return (amount / 1000000).toFixed(1) + 'M';
        } else if (amount >= 1000) {
            return (amount / 1000).toFixed(1) + 'K';
        }
        return amount.toString();
    }

    private animateValueChange() {
        this.updateDisplay();
        
        if (this.currencyIcon) {
            cc.tween(this.currencyIcon.node)
                .to(0.1, { scale: 1.3 })
                .to(0.1, { scale: 1.0 })
                .start();
        }
    }

    private onCurrencyChanged(event: any) {
        if (event.type === this.currencyType) {
            this.currentAmount = event.amount;
            this.updateDisplay();
        }
    }

    private onAddButtonClicked() {
        this.node.emit('purchase-currency', this.currencyType);
    }

    onDestroy() {
        if (this.addButton) {
            this.addButton.off('click', this.onAddButtonClicked, this);
        }
        this.node.off('currency-changed', this.onCurrencyChanged, this);
    }
}
