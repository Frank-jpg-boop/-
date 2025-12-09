var i;
exports.Boss_122_Walk = void 0;
var $state = require("./State");
var $actorEnum = require("./ActorEnum");
var $attrEnum = require("./AttrEnum");
var c = (function (t) {
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
            var e = this._context.node.getPosition();
            var n = t.node.getPosition().add(cc.v2(0, 50));
            var i = e.sub(n).normalize();
            this._targetPos = n.add(i.mul(50));
            this._targetPosRefreshTime = this._targetPosRefreshInterval;
        }
    };
    e.prototype.update = function (t) {
        if (this._context.isTrigger) {
            if (this._context.isFace()) {
                this._context.changeState($actorEnum.EActorStateType.EXTEND_1);
            } else {
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
            }
        }
    };
    return e;
})($state.State);
exports.Boss_122_Walk = c;
