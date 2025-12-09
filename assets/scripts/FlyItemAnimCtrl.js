import $cfg from './Cfg';
import $itemDataProxy from './ItemDataProxy';
import $eventManager from './EventManager';
import $nodePoolManager from './NodePoolManager';
import $resLoader from './ResLoader';
import $frameEnum from './FrameEnum';
import $animUtils from './AnimUtils';
import $nodeUtil from './NodeUtil';
let i;
export const EFlyItemAnimEvent = {
  FLY_ITEM_ANIM: 'EFlyItemAnimEvent.fly_item_anim'
};
let a = EFlyItemAnimEvent;
const m = cc._decorator;
const y = m.ccclass;
const _ = m.property;
e.prototype.flyItemAnim = function (t) {
  if (this.node.activeInHierarchy) {
    const e = this._layerMap.get(t.layerType);
    if (e) {
      const n = this._targetWorldPosMap.get(t.itemId);
      if (n) {
        for (
          const i = $nodeUtil.default.nodeLocalPos(e, t.startWorldPos),
            o = $nodeUtil.default.nodeLocalPos(e, n),
            r = [],
            a = function () {
              const n = $nodePoolManager.default.instance.getNode(l.pFlyItem);
              if (2 == $cfg.default.instance.dataItem.getById(t.itemId).type) {
                n.scale = 0.7;
              } else {
                n.scale = 1;
              }
              e.addChild(n, t.isTop ? cc.macro.MAX_ZINDEX : void 0);
              $resLoader.ResLoader.loadAsset({
                bundleName: $frameEnum.Frame.EBundleName.RES,
                path: $itemDataProxy.itemDataProxy.getItemIconPath(t.itemId),
                type: cc.SpriteFrame,
              })
                .then(function (t) {
                  n.getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = t;
                })
                .catch(function () {});
              n.setPosition($nodeUtil.default.nodeLocalPos(e, t.startWorldPos));
              r.push(n);
            },
            l = this,
            m = 0;
          m < t.itemNum;
          ++m
        ) {
          a();
        }
        $animUtils.AnimUtil.flyItemAnim(r, 35, i, o, 20, function () {
          r.forEach(function (t) {
            $nodePoolManager.default.instance.putNode(t);
          });
          if (t.onComplete) {
            t.onComplete();
          }
        });
      }
    }
  }
};
e.prototype.init = function (t, e) {
  this._layerMap = t;
  this._targetWorldPosMap = e;
};
e.prototype.onDestroy = function () {
  $eventManager.EventManager.instance.off(a.FLY_ITEM_ANIM, this.flyItemAnim, this);
};
e.prototype.onLoad = function () {
  $eventManager.EventManager.instance.on(a.FLY_ITEM_ANIM, this.flyItemAnim, this);
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.pFlyItem = null;
  e._layerMap = null;
  e._targetWorldPosMap = null;
  return e;
}
export default g;;
