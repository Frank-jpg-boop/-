var i;
exports.SummonWalkState = void 0;
var $mathUtil = require("./MathUtil");
var $battleMgr = require("./BattleMgr");
var $state = require("./State");
var $actorEnum = require("./ActorEnum");
var $attrEnum = require("./AttrEnum");
var u = (function (t) {
    function e(e) {
        var n = t.call(this, e) || this;
        n._path = [];
        n._pathTargetPos = null;
        n._autoFindPathTime = 0;
        n._autoFindPathTimer = 0.5;
        n._curFindTarget = null;
        n._stateType = $actorEnum.EActorStateType.WALK;
        return n;
    }
    __extends(e, t);
    e.prototype.begin = function (t) {
        this._autoFindPathTime = null;
        this._context.playAnimWalk();
        this._curFindTarget = t;
        this.updateFindTarget();
    };
    e.prototype.update = function (t) {
        if (this._curFindTarget && !this._curFindTarget.isDead()) {
            this._autoFindPathTime -= t;
            this._autoFindPathTime <= 0 &&
                ((this._autoFindPathTime = this._autoFindPathTimer), this.updateFindTarget());
            this.updateFinderMove(t);
        } else {
            this._context.changeState($actorEnum.EActorStateType.IDLE);
        }
    };
    e.prototype.updateFindTarget = function () {
        var t = this._curFindTarget;
        if (t && !t.isDead()) {
            this.updateFinder(t.pathPos, t.pathLineId, t.pathPointId);
        }
    };
    e.prototype.updateFinder = function (t, e, n) {
        this._path = [];
        this._pathTargetPos = null;
        this._context.updatePathData();
        var i = {
            pos: this._context.pathPos,
            lineId: this._context.pathLineId,
            pointId: this._context.pathPointId
        };
        var o = {
            pos: t,
            lineId: e,
            pointId: n
        };
        if ("" == o.lineId && "" == o.pointId) {
            //
        } else {
            this._path = $battleMgr.default.instance.getCurScene().level.path.findPathPoss(i, o);
        }
    };
    e.prototype.updateFinderMove = function (t) {
        if (this._path && !this._context.isRepeling) {
            if (this._pathTargetPos && this._pathTargetPos.fuzzyEquals(this._context.pathPos, 0.1)) {
                this._context.setPos(this._pathTargetPos, !0);
                this._context.updatePathData();
                this._pathTargetPos = null;
            }
            if (null == this._pathTargetPos && this._path.length > 0) {
                this._pathTargetPos = this._path.shift();
            }
            this.updateFinderPos(t);
        }
    };
    e.prototype.updateFinderPos = function (t) {
        if (null != this._pathTargetPos) {
            var e = this._context.getAttribute($attrEnum.E_AttrType.SPEED).value;
            var n = this._context.pathPos;
            var i = this._pathTargetPos.sub(n);
            var o = i.normalize();
            $mathUtil.MathUtil.vec2Fixed(o);
            if (Math.abs(o.x) > 0.5) {
                if (o.x > 0) {
                    o.x = 1;
                } else {
                    o.x = -1;
                }
                o.y = 0;
            }
            if (Math.abs(o.y) > 0.5) {
                if (o.y > 0) {
                    o.y = 1;
                } else {
                    o.y = -1;
                }
                o.x = 0;
            }
            var a = o.mul(e * t);
            var s = n.add(a);
            if (i.lengthSqr() < a.lengthSqr()) {
                s.x = this._pathTargetPos.x;
                s.y = this._pathTargetPos.y;
            }
            this._context.moveDir = o.clone();
            this._context.setDirX(s.x > n.x);
            this._context.setPos(s);
        }
    };
    e.prototype.end = function () {
        this._context.moveDir = null;
        this._curFindTarget = null;
    };
    return e;
})($state.State);
exports.SummonWalkState = u;
