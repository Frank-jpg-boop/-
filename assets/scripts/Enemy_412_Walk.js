import $battleMgr from './BattleMgr';
let i;
exports.Enemy_412_Walk = void 0;
e.prototype.end = function () {};
e.prototype.findWalkTargetPos = function (t) {
  for (
    const e = $battleMgr.default.instance.getCurScene(), n = cc.Vec2.squaredDistance(t, this._context.node.getPosition()), i = e.level.path.findCircleRangePoints(t, Math.sqrt(n) + 500), o = Number.MAX_VALUE, a = null, s = 0;
    s < i.length;
    s++
  ) {
    const c = i[s];
    if ("" == this._context.pathPointId || this._context.pathPointId != c) {
      const l = e.level.path.getPoint(c);
      const u = cc.Vec2.squaredDistance(
        l.pos,
        this._context.node.getPosition(),
      );
      if (u < o && n < u) {
        o = u;
        a = e.level.path.getPoint(c);
      }
    }
  }
  return a;
};
e.prototype.updateFindTarget = function () {
  const e = this._curFindTarget;
  if (e && !e.isDead()) {
    const n = cc.Vec2.squaredDistance(
      e.node.getPosition(),
      this._context.node.getPosition(),
    );
    const i = Number(this._context.cfg.val1) * Number(this._context.cfg.val1);
    if (n > Number(this._context.cfg.val2) * Number(this._context.cfg.val2)) {
      return void t.prototype.updateFindTarget.call(this);
    }
    if (n < i) {
      this._context.updatePathData();
      const o = this.findWalkTargetPos(e.node.getPosition());
      if (o) {
        this.updateFinder(o.pos, "", o.pointId);
      }
    }
  }
};
e.prototype.begin = function (e) {
  this._autoFindPathTimer = 3;
  t.prototype.begin.call(this, e);
};
function e() {
  return (null !== t && t.apply(this, arguments)) || this;
}
const a = e;
exports.Enemy_412_Walk = a;
