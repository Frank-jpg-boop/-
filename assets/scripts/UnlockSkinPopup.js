import $cfg from './Cfg';
import $resLoader from './ResLoader';
import $frameEnum from './FrameEnum';
import $popupBase from './PopupBase';
let i;
const u = cc._decorator;
const p = u.ccclass;
const h = u.property;
e.prototype.onShow = function () {
  const t = this.node.getChildByName("gongxihuode");
  t.active = !0;
  t.getComponent(sp.Skeleton).setAnimation(0, "animation", !1);
};
e.prototype.init = function (t) {
  const e = this;
  const n = t.skinId;
  const i = $cfg.default.instance.dataSkin.getById(n);
  $resLoader.ResLoader.loadAsset({
    path: "spines/player/" + i.skin + "/" + i.skin,
    type: sp.SkeletonData,
    bundleName: $frameEnum.Frame.EBundleName.GAME,
  })
    .then(function (t) {
      e.mRoleSp.skeletonData = t;
      e.mRoleSp.setAnimation(0, "bide", !0);
    })
    .catch(function (t) {
      console.log("error:", t);
    });
  this.mRoleName.string = i.name;
  const o = this.node.getChildByName("BtnClose");
  o.active = !1;
  this.scheduleOnce(function () {
    o.active = !0;
    o.scale = 0;
    cc.Tween.stopAllByTarget(o);
    cc.tween(o)
      .to(0.2, {
        scale: 1.1,
      })
      .to(0.1, {
        scale: 1,
      })
      .start();
  }, 0.5);
  this.node.getChildByName("gongxihuode").active = !1;
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.mRoleName = null;
  e.mRoleSp = null;
  return e;
}
exports.default = f;
