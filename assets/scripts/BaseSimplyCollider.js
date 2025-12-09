let i;
const a = cc._decorator;
const s = a.ccclass;
const c = a.property;
e.prototype.drawCollider = function () {};
e.prototype.update = function () {
  if (this.isDrawCollider) {
    this.drawCollider();
  }
};
e.prototype.start = function () {
  if (this.isDrawCollider) {
    const t = new cc.Node("DrawNode");
    t.zIndex = cc.macro.MAX_ZINDEX;
    this.node.addChild(t);
    this.graphics = t.addComponent(cc.Graphics);
    this.graphics.lineWidth = 5;
    this.graphics.strokeColor = cc.Color.RED;
    this.drawCollider();
  }
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.isDrawCollider = !1;
  e.graphics = null;
  return e;
}
exports.default = l;
