import $cfg from './Cfg';
import $resLoader from './ResLoader';
import $mathUtil from './MathUtil';
import $frameEnum from './FrameEnum';
import $popupBase from './PopupBase';
import $itemDataProxy from './ItemDataProxy';
let i;
const h = cc._decorator;
const f = h.ccclass;
const d = h.property;
e.prototype.onBtnClose = function () {
  $itemDataProxy.itemDataProxy.addItems(this._rewardDatas);
  this.removeUI();
};
e.prototype.initRewardItems = function (t) {
  for (
    const e = this,
      n = this.node.getChildByName('BtnClose'),
      i = t.children[0],
      o = function (o) {
        const u = r._rewardDatas[o];
        const p = t.children[o];
        if (p) {
          //
        } else {
          p = cc.instantiate(i);
          t.addChild(p);
        }
        p.active = !0;
        const h = p.getChildByName('greadImg');
        const f = p.getChildByName('icon');
        const d = p.getChildByName('num');
        const m = p.getChildByName('effectSp');
        const y = $cfg.default.instance.dataItem.getById(u.itemId);
        $resLoader.ResLoader.loadAsset({
          path: 'textures/public/pic_wuping_di_' + y.rare,
          type: cc.SpriteFrame,
          bundleName: $frameEnum.Frame.EBundleName.HOME,
        })
          .then(function (t) {
            h.getComponent(cc.Sprite).spriteFrame = t;
          })
          .catch(function (t) {
            console.log('error:', t);
          });
        $resLoader.ResLoader.loadAsset({
          path: 'textures/atlas/item/' + y.icon,
          type: cc.SpriteFrame,
          bundleName: $frameEnum.Frame.EBundleName.RES,
        })
          .then(function (t) {
            f.getComponent(cc.Sprite).spriteFrame = t;
          })
          .catch(function (t) {
            console.log('error:', t);
          });
        d.getComponent(cc.Label).string = 'x' + $mathUtil.MathUtil.formatValue(u.itemNum);
        m.active = !1;
        const _ = o;
        p.scale = 0;
        cc.tween(p)
          .delay(0.1 * o)
          .to(0.2, {
            scale: 1.1,
          })
          .to(0.1, {
            scale: 1,
          })
          .call(function () {
            if (_ == e._rewardDatas.length - 1) {
              n.active = !0;
              n.scale = 0;
              cc.Tween.stopAllByTarget(n);
              cc.tween(n)
                .to(0.2, {
                  scale: 1.1,
                })
                .to(0.1, {
                  scale: 1,
                })
                .start();
            }
            m.active = !0;
            m.getComponent(sp.Skeleton).setCompleteListener(function () {
              m.active = !1;
            });
            m.getComponent(sp.Skeleton).setAnimation(0, 'animation', !1);
          })
          .start();
      },
      r = this,
      u = 0;
    u < this._rewardDatas.length;
    ++u
  ) {
    o(u);
  }
};
e.prototype.onShow = function () {
  const t = this.node.getChildByName('gongxihuode');
  t.active = !0;
  t.getComponent(sp.Skeleton).setAnimation(0, 'animation', !1);
  if (this._rewardDatas.length > 4) {
    this.mMaxItems.active = !0;
    this.initRewardItems(this.mMaxItems);
  } else {
    this.mMiniItems.active = !0;
    this.initRewardItems(this.mMiniItems);
  }
};
e.prototype.init = function (t) {
  this._rewardDatas = t.rewardDatas;
  this.node.getChildByName('gongxihuode').active = !1;
  this.node.getChildByName('BtnClose').active = !1;
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.mMaxItems = null;
  e.mMiniItems = null;
  e._rewardDatas = [];
  return e;
}
export default m;
