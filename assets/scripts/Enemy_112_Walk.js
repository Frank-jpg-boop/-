var i;
exports.Enemy_112_Walk = void 0;
var $randomUtil = require("./RandomUtil");
var $state = require("./State");
var $actorEnum = require("./ActorEnum");
var $attrEnum = require("./AttrEnum");
var l = (function (t) {
    function e(e) {
        var n = t.call(this, e) || this;
        n._targetPos = null;
        n._targetPosRefreshTime = 0;
        n._targetPosRefreshInterval = 2;
        n._stateType = $actorEnum.EActorStateType.WALK;
        return n;
    }
    __extends(e, t);
    e.prototype.begin = function () {
        this._context.playAnimWalk();
        this.updateTargetPos();
    };
    e.prototype.updateTargetPos = function () {
        var t = this._context.searchTarget();
        if (t) {
            var e = $randomUtil.RandomUtil.randomInt(Number(this._context.cfg.val1), Number(this._context.cfg.val2));
            var n = $randomUtil.RandomUtil.randomInt(0, 2);
            var i =
                ($randomUtil.RandomUtil.randomInt(
                    this._context.rangeAngles[2 * n],
                    this._context.rangeAngles[2 * n + 1]
                ) *
                    Math.PI) /
                180;
            var o = t.node.getPosition();
            this._targetPos = cc.v2(o.x + e * Math.cos(i), o.y + e * Math.sin(i));
            this._targetPosRefreshTime = this._targetPosRefreshInterval;
        }
    };
    e.prototype.update = function (t) {
        var e = this._context.searchTarget();
        if (e && this._context.canAttackTarget(e)) {
            if (this._context.canAttack()) {
                return void this._context.changeState($actorEnum.EActorStateType.ATTACK, e.node);
            } else {
                return void this._context.changeState($actorEnum.EActorStateType.IDLE);
            }
        }
        this._targetPosRefreshTime -= t;
        if (this._targetPosRefreshTime <= 0) {
            this.updateTargetPos();
        }
        if (this._targetPos) {
            var n = this._context.node.getPosition();
            if (this._targetPos.fuzzyEquals(n, 5)) {
                return void this._context.changeState($actorEnum.EActorStateType.IDLE);
            }
            var i = this._targetPos.sub(n).normalize();
            var o = this._context.getAttribute($attrEnum.E_AttrType.SPEED).value;
            var r = i.mul(o * t);
            this._context.setPos(n.add(r));
            this._context.setDirX(i.x > 0);
        }
    };
    return e;
})($state.State);
exports.Enemy_112_Walk = l;
