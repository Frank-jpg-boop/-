import $quadTreeCollisionContainer from './QuadTreeCollisionContainer';
let i;
const s = cc._decorator;
const c = s.ccclass;
const l = s.property;
Object.defineProperty(e.prototype, "worldRect", {
  get: function () {
    const t = this.nCollisionBox.convertToWorldSpaceAR(cc.v2());
    this._worldRect.x = t.x;
    this._worldRect.y = t.y;
    return this._worldRect;
  },
  enumerable: !1,
  configurable: !0,
});
Object.defineProperty(e.prototype, "itemRect", {
  get: function () {
    const t = this.worldRect;
    return {
      x: t.x,
      y: t.y,
      width: t.width,
      height: t.height,
      group: this.group,
      item: this,
    };
  },
  enumerable: !1,
  configurable: !0,
});
e.prototype.onLoad = function () {
  this._worldRect = new cc.Rect();
  this._worldRect.width = this.nCollisionBox.width;
  this._worldRect.height = this.nCollisionBox.height;
};
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.nCollisionBox = null;
  e.group = $quadTreeCollisionContainer.EQuadTreeCollisionGroup.WeaponBullet;
  e._worldRect = null;
  return e;
}
exports.default = u;
