var i;
exports.SummonIdleState = void 0;
var $state = require("./State");
var $actorEnum = require("./ActorEnum");
var s = (function (t) {
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
        var t = this._context.searchTarget();
        if (t) {
            if (this._context.canAttackTarget(t)) {
                if (!this._context.canAttack()) {
                    return;
                }
                return void this._context.changeState($actorEnum.EActorStateType.ATTACK, t);
            }
            this._context.changeState($actorEnum.EActorStateType.WALK);
        }
    };
    return e;
})($state.State);
exports.SummonIdleState = s;
