import $actorHead from './ActorHead';
let i;
const s = cc._decorator;
const c = s.ccclass;
const l = s.property;
e.prototype.updateShield = function (t, e) {
  const n = t / e;
  this.node.active = n > 0;
  this.spShield.node.active = n > 0;
  cc.Tween.stopAllByTarget(this.spShield);
  cc.tween(this.spShield)
    .to(0.1, {
      fillRange: n,
    })
    .start();
};
e.prototype.onInit = function () {
  t.prototype.onInit.call(this);
  this.spShield.node.active = !1;
  this.node.zIndex = cc.macro.MAX_ZINDEX;
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.spShield = null;
  return e;
}
export default u;
