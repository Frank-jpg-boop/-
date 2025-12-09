import $animUtils from './AnimUtils';
let i;
let a;
const c = cc._decorator;
const l = c.ccclass;
const u = c.property;
!(function (t) {
  t[(t.BREATHE = 0)] = 'BREATHE';
  t[(t.FLOAT = 1)] = 'FLOAT';
})(a || (a = {}));
e.prototype.setRedPointState = function (t, e) {
  this.node.active = t;
  if (e) {
    this.node.getChildByName('Num').active = !0;
    this.node.getChildByName('Num').getComponent(cc.Label).string = '' + e;
  }
};
e.prototype.onEnable = function () {
  cc.Tween.stopAllByTarget(this.node);
  switch (this.animType) {
    case a.BREATHE:
      this.node.scale = this._initScale;
      $animUtils.AnimUtil.breathAnim(this.node);
      break;
    case a.FLOAT:
      this.node.y = this._initY;
      $animUtils.AnimUtil.floatAnim(this.node, 0.5, 10);
  }
};
e.prototype.onLoad = function () {
  this._initScale = this.node.scale;
  this._initY = this.node.y;
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.animType = a.BREATHE;
  e._initScale = 0;
  e._initY = 0;
  return e;
}
export default p;
