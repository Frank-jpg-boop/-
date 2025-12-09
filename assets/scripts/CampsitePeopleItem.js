let i;
const a = cc._decorator;
const s = a.ccclass;
const c = a.property;
e.prototype.distance = function (t, e) {
  const n = t.x - e.x;
  const i = t.y - e.y;
  return Math.sqrt(n * n + i * i);
};
e.prototype.move = function () {
  const t = this;
  const e =
    -this._roomItem.width / 2 +
    (Math.floor(1e3 * Math.random()) % this._roomItem.width);
  const n = cc.v3(e, this.node.y);
  const i = (this.distance(this.node.position, n) / 100) * 0.5;
  cc.Tween.stopAllByTarget(this.node);
  this.mRoleSp.setAnimation(0, "run", !0);
  const o = (Math.floor(1e4 * Math.random()) % 16) + 5;
  cc.tween(this.node)
    .to(i, {
      position: n,
    })
    .call(function () {
      t.mRoleSp.setAnimation(0, "bide", !0);
    })
    .delay(o / 10)
    .call(function () {
      t.move();
    })
    .start();
};
e.prototype.joinRoom = function (t, e) {
  const n = this;
  this.mDamond.active = !1;
  this._roomItem = t;
  if (e) {
    cc.Tween.stopAllByTarget(this.node);
    this.node.position = e;
    cc.tween(this.node)
      .to(0.15, {
        position: cc.v3(e.x, -19),
      })
      .call(function () {
        n.move();
      })
      .start();
  } else {
    const i = -t.width / 2 + (Math.floor(1e3 * Math.random()) % t.width);
    e = cc.v3(i, -19);
    this.node.position = e;
    this.move();
  }
};
Object.defineProperty(e.prototype, "isJoinRoom", {
  get: function () {
    return this._isJoinRoom;
  },
  enumerable: !1,
  configurable: !0,
});
function e() {
  const e = (null !== t && t.apply(this, arguments)) || this;
  e.mRoleSp = null;
  e.mDamond = null;
  e._roomItem = null;
  e._isJoinRoom = !1;
  return e;
}
exports.default = l;
