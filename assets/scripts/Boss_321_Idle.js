var i;
exports.Boss_321_Idle = void 0;
var $battleMgr = require("./BattleMgr");
var $state = require("./State");
var $actorEnum = require("./ActorEnum");
var $actorMgr = require("./ActorMgr");
var l = (function (t) {
    function e(e) {
        var n = t.call(this, e) || this;
        n._stateType = $actorEnum.EActorStateType.IDLE;
        return n;
    }
    __extends(e, t);
    e.prototype.begin = function () {
        this._context.playAnimIdle();
    };
    e.prototype.update = function () {
        if (this._context.isTrigger) {
            if (this._context.waitTime <= 0) {
                this._context.changeState($actorEnum.EActorStateType.ATTACK);
            } else {
                this.checkAtk() && this._context.changeState($actorEnum.EActorStateType.ATTACK, !0);
            }
        }
    };
    e.prototype.checkAtk = function () {
        var t = $battleMgr.default.instance.getCurScene();
        if (t) {
            var e = $actorMgr.default.instance.getActor(t.playerId);
            if (e) {
                var n = e.node.getPosition();
                var i = this._context.node.getPosition();
                if (Math.abs(n.x - i.x) < 100 && i.y + 250 > n.y) {
                    return !0;
                }
            }
        }
        return !1;
    };
    return e;
})($state.State);
exports.Boss_321_Idle = l;
