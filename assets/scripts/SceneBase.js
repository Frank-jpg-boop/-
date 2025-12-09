import $componentBase from './ComponentBase';
import $eventManager from './EventManager';
import $sceneManager from './SceneManager';
import $appProxy from './AppProxy';
let i;
export const SceneBase = void 0;
const u = cc._decorator;
const p = u.ccclass;
const h =
  (u.property,
  (function (t) {
    function e() {
      const e = (null !== t && t.apply(this, arguments)) || this;
      e.bannerPosition = null;
      e.nativePosition = null;
      return e;
    }
    e.prototype.onLoad = function () {
      t.prototype.onLoad.call(this);
      $sceneManager.SceneManager.instance.setCurScene(this);
      $eventManager.EventManager.instance.emit($appProxy.AppEvent.SCENE_CHANGED);
      const e = cc.view.getDesignResolutionSize();
      const n = this.node.getComponent(cc.Canvas);
      if (cc.winSize.width / cc.winSize.height < e.width / e.height) {
        n.fitWidth = !0;
        n.fitHeight = !1;
      } else {
        n.fitWidth = !1;
        n.fitHeight = !0;
      }
    };
    e.prototype.switchSceneUI = function (t) {
      if (void 0 === t) {
        t = 0;
      }
      for (const e = [], n = 1; n < arguments.length; n++) {
        e[n - 1] = arguments[n];
      }
    };
  })($componentBase.ComponentBase));
export const SceneBase = h;
