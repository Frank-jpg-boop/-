var i;
exports.Enemy_111_Idle = void 0;
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
            this._context.setDirX(t.node.x > this._context.node.x);
            if (this._context.canSummon()) {
                this._context.changeState($actorEnum.EActorStateType.EXTEND_1);
            } else {
                if (this._context.canAttack()) {
                    this._context.changeState($actorEnum.EActorStateType.ATTACK, t.node);
                } else {
                    this._context.canMove() && this._context.changeState($actorEnum.EActorStateType.WALK);
                }
            }
        }
    };
    return e;
})($state.State);
exports.Enemy_111_Idle = s;
