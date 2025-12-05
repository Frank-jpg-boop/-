const { ccclass, property } = cc._decorator;

/**
 * Technology/Skill panel UI controller
 */
@ccclass
export default class KeJiPanel extends cc.Component {
    @property(cc.Node)
    panelRoot: cc.Node = null;

    @property(cc.Node)
    closeButton: cc.Node = null;

    @property(cc.Node)
    skillContainer: cc.Node = null;

    @property(cc.Prefab)
    skillItemPrefab: cc.Prefab = null;

    @property([cc.String])
    skillList: string[] = [];

    onLoad() {
        this.initPanel();
        this.registerEvents();
    }

    start() {
        this.hide();
    }

    private initPanel() {
        if (this.skillContainer && this.skillItemPrefab) {
            this.skillList.forEach((skillId, index) => {
                const skillItem = cc.instantiate(this.skillItemPrefab);
                skillItem.parent = this.skillContainer;
                
                const itemComponent = skillItem.getComponent('SkillItem');
                if (itemComponent) {
                    itemComponent.setSkillData(skillId);
                }
                
                skillItem.on('click', () => this.onSkillClicked(skillId), this);
            });
        }
    }

    private registerEvents() {
        if (this.closeButton) {
            this.closeButton.on('click', this.hide, this);
        }
    }

    show() {
        if (this.panelRoot) {
            this.panelRoot.active = true;
            this.playShowAnimation();
        }
    }

    hide() {
        if (this.panelRoot) {
            this.playHideAnimation(() => {
                this.panelRoot.active = false;
            });
        }
    }

    private playShowAnimation() {
        if (!this.panelRoot) return;
        
        this.panelRoot.scale = 0.5;
        this.panelRoot.opacity = 0;
        
        cc.tween(this.panelRoot)
            .to(0.3, { scale: 1.0, opacity: 255 }, { easing: 'backOut' })
            .start();
    }

    private playHideAnimation(callback?: Function) {
        if (!this.panelRoot) {
            callback?.();
            return;
        }
        
        cc.tween(this.panelRoot)
            .to(0.2, { scale: 0.5, opacity: 0 })
            .call(() => {
                callback?.();
            })
            .start();
    }

    private onSkillClicked(skillId: string) {
        this.node.emit('skill-selected', skillId);
    }

    onDestroy() {
        if (this.closeButton) {
            this.closeButton.off('click', this.hide, this);
        }
    }
}
