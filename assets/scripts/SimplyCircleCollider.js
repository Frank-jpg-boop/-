import $simplyCircle from './SimplyCircle';
import $baseSimplyCollider from './BaseSimplyCollider';
let i;
const c = cc._decorator;
const l = c.ccclass;
const u = c.property;
const p = c.menu;
e.prototype.drawCollider = function () {
  this.graphics.clear();
  this.graphics.circle(this.vec2Offset.x, this.vec2Offset.y, this.radius);
  this.graphics.stroke();
};
Object.defineProperty(e.prototype, "circle", {
  get: function () {
    const t = this.node.convertToWorldSpaceAR(this.vec2Offset);
    return new $simplyCircle.default(t.x, t.y, this.radius * this.node.scale);
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, "offset", {
  set: function (t) {
    this.vec2Offset = t;
  },
  enumerable: !1,
  configurable: !0,
});
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.vec2Offset = cc.Vec2.ZERO;
  e.radius = 0;
  return e;
}
exports.default = h;
