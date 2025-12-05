var i;
exports.Boss_122_Idle = void 0;
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
        if (this._context.isTrigger) {
            if (this._context.isFace()) {
                this._context.changeState($actorEnum.EActorStateType.EXTEND_1);
            } else {
                var t = this._context.searchTarget();
                if (t) {
                    if (this._context.canAttackTarget(t)) {
                        return void (
                            this._context.canAttack() &&
                            this._context.changeState($actorEnum.EActorStateType.ATTACK, t.node)
                        );
                    }
                    this._context.changeState($actorEnum.EActorStateType.WALK);
                }
            }
        }
    };
    return e;
})($state.State);
exports.Boss_122_Idle = s;
