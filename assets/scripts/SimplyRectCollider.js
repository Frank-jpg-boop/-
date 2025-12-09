import $simplyRect from './SimplyRect';
import $baseSimplyCollider from './BaseSimplyCollider';
let i;
const c = cc._decorator;
const l = c.ccclass;
const u = (c.property, c.menu);
e.prototype.drawCollider = function () {
  const t = this.rect;
  this.graphics.clear();
  this.graphics.rect(
    -this.node.anchorX * t.width,
    -this.node.anchorY * t.height,
    t.width,
    t.height,
  );
  this.graphics.stroke();
};
Object.defineProperty(e.prototype, 'rect', {
  get: function () {
    const t = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
    const e = (this.node.angle * Math.PI) / 180;
    const n = this.node.width * this.node.scaleX;
    const i = this.node.height * this.node.scaleY;
    const o = t.clone().add(cc.v2((0.5 - this.node.anchorX) * n, (0.5 - this.node.anchorY) * i));
    t = t.clone().addSelf(o.sub(t).rotate(e));
    return new $simplyRect.default(t.x, t.y, n, i, this.node.angle);
  },
  enumerable: !1,
  configurable: !0,
});
function e() {
  return (null !== t && t.apply(this, arguments)) || this;
}
export default p;
