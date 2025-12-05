const { ccclass, property } = cc._decorator;

/**
 * Manages scene transitions with fade effects
 */
@ccclass
export default class SceneTransition extends cc.Component {
    @property(cc.Node)
    fadeOverlay: cc.Node = null;

    @property(cc.Float)
    fadeDuration: number = 0.5;

    @property(cc.Color)
    fadeColor: cc.Color = cc.Color.BLACK;

    private static instance: SceneTransition = null;

    onLoad() {
        if (SceneTransition.instance) {
            this.node.destroy();
            return;
        }
        
        SceneTransition.instance = this;
        cc.game.addPersistRootNode(this.node);
        
        this.initFadeOverlay();
    }

    start() {
        this.fadeIn();
    }

    private initFadeOverlay() {
        if (!this.fadeOverlay) {
            this.fadeOverlay = new cc.Node('FadeOverlay');
            this.fadeOverlay.parent = this.node;
            
            const widget = this.fadeOverlay.addComponent(cc.Widget);
            widget.isAlignTop = true;
            widget.isAlignBottom = true;
            widget.isAlignLeft = true;
            widget.isAlignRight = true;
            widget.top = 0;
            widget.bottom = 0;
            widget.left = 0;
            widget.right = 0;
            
            const graphics = this.fadeOverlay.addComponent(cc.Graphics);
            graphics.fillColor = this.fadeColor;
        }
    }

    fadeOut(callback?: Function) {
        if (!this.fadeOverlay) return;
        
        this.fadeOverlay.opacity = 0;
        
        cc.tween(this.fadeOverlay)
            .to(this.fadeDuration, { opacity: 255 })
            .call(() => {
                callback?.();
            })
            .start();
    }

    fadeIn(callback?: Function) {
        if (!this.fadeOverlay) return;
        
        this.fadeOverlay.opacity = 255;
        
        cc.tween(this.fadeOverlay)
            .to(this.fadeDuration, { opacity: 0 })
            .call(() => {
                callback?.();
            })
            .start();
    }

    static transitionToScene(sceneName: string) {
        if (SceneTransition.instance) {
            SceneTransition.instance.fadeOut(() => {
                cc.director.loadScene(sceneName, () => {
                    SceneTransition.instance?.fadeIn();
                });
            });
        } else {
            cc.director.loadScene(sceneName);
        }
    }

    onDestroy() {
        if (SceneTransition.instance === this) {
            SceneTransition.instance = null;
        }
    }
}
