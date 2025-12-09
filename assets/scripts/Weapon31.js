import $effectBase from './EffectBase';
let i;
const s = cc._decorator;
const c = s.ccclass;
const l = s.property;
e.prototype.updateProgressCd = function (t) {
  const e = t < 1;
  this.nProgress.active = e;
  if (e) {
    this.nProgress.getChildByName("Bar").getComponent(cc.Sprite).fillRange =
      t;
  }
};
e.prototype.hide = function () {
  this.node.active = !1;
};
e.prototype.show = function () {
  this.node.active = !0;
};
e.prototype.onInit = function () {
  t.prototype.onInit.call(this);
  this.nProgress.active = !1;
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.nProgress = null;
  return e;
}
exports.default = u;
