var i;
exports.Enemy_412_Walk = void 0;
var $battleMgr = require("./BattleMgr");
var a = (function (t) {
    function e() {
        return (null !== t && t.apply(this, arguments)) || this;
    }
    __extends(e, t);
    e.prototype.begin = function (e) {
        this._autoFindPathTimer = 3;
        t.prototype.begin.call(this, e);
    };
    e.prototype.updateFindTarget = function () {
        var e = this._curFindTarget;
        if (e && !e.isDead()) {
            var n = cc.Vec2.squaredDistance(e.node.getPosition(), this._context.node.getPosition());
            var i = Number(this._context.cfg.val1) * Number(this._context.cfg.val1);
            if (n > Number(this._context.cfg.val2) * Number(this._context.cfg.val2)) {
                return void t.prototype.updateFindTarget.call(this);
            }
            if (n < i) {
                this._context.updatePathData();
                var o = this.findWalkTargetPos(e.node.getPosition());
                if (o) {
                    this.updateFinder(o.pos, "", o.pointId);
                }
            }
        }
    };
    e.prototype.findWalkTargetPos = function (t) {
        for (
            var e = $battleMgr.default.instance.getCurScene(),
                n = cc.Vec2.squaredDistance(t, this._context.node.getPosition()),
                i = e.level.path.findCircleRangePoints(t, Math.sqrt(n) + 500),
                o = Number.MAX_VALUE,
                a = null,
                s = 0;
            s < i.length;
            s++
        ) {
            var c = i[s];
            if ("" == this._context.pathPointId || this._context.pathPointId != c) {
                var l = e.level.path.getPoint(c);
                var u = cc.Vec2.squaredDistance(l.pos, this._context.node.getPosition());
                if (u < o && n < u) {
                    o = u;
                    a = e.level.path.getPoint(c);
                }
            }
        }
        return a;
    };
    e.prototype.end = function () {};
    return e;
})(require("./EnemyWalkState").EnemyWalkState);
exports.Enemy_412_Walk = a;
