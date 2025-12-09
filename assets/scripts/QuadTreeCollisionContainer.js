import $quadTree from './QuadTree';
let i;
export const EQuadTreeCollisionGroup = {
  WeaponBullet: 1,
  Enemy: 2,
};
const c = cc._decorator;
const l = c.ccclass;
const u = c.property;
e.prototype.clearItem = function () {
  this.items = [];
};
e.prototype.getCollisionList = function (t) {
  const e = this.canCollisionMap.get(t.group);
  return this.quadTree.retrieve(t.itemRect, e).map(function (t) {
    return t.item;
  });
};
e.prototype.updateQuadTree = function () {
  const t = this;
  if (t.quadTree && (t.updateCount++, !(t.updateCount <= 3))) {
    t.updateCount = 0;
    t.quadTree.clear();
    if (t.isGraphicsItemRect) {
      t.graphics.clear();
      t.graphics.strokeColor = cc.color(255, 0, 0, 150);
    }
    for (const e = 0, n = t.items.length; e < n; ++e) {
      const i = t.items[e].itemRect;
      t.quadTree.insert(i);
      if (t.isGraphicsItemRect) {
        t.graphics.rect(i.x, i.y, i.width, i.height);
      }
    }
    if (t.isGraphicsItemRect) {
      t.graphics.stroke();
    }
  }
};
e.prototype.removeItem = function (t) {
  const e = this.items.indexOf(t);
  if (-1 != e) {
    this.items.splice(e, 1);
  }
};
e.prototype.addItem = function (t) {
  this.items.push(t);
};
e.prototype.init = function () {
  const t = this;
  this.items = [];
  t._rect = t.node.getBoundingBoxToWorld();
  t.canCollisionMap = new Map();
  t.quadTree = new $quadTree.QuadTree.QuadTree(t._rect);
  t.canCollisionMap.set(a.WeaponBullet, [a.Enemy]);
  t.canCollisionMap.set(a.Enemy, [a.WeaponBullet]);
};
e.prototype.update = function () {};
e.prototype.onLoad = function () {
  this.items = [];
  if (this.isGraphicsItemRect) {
    this.graphics = this.node.addComponent(cc.Graphics);
  }
};
Object.defineProperty(e.prototype, 'rect', {
  get: function () {
    return this._rect;
  },
  enumerable: !1,
  configurable: !0,
});
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.isGraphicsItemRect = !1;
  e.graphics = null;
  e._rect = null;
  e.items = null;
  e.quadTree = null;
  e.updateCount = 0;
  return e;
}
export default p;;
