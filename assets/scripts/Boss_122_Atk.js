var i;
exports.Boss_122_Atk = void 0;
var $state = require("./State");
var $actorEnum = require("./ActorEnum");
var s = (function (t) {
    function e(e) {
        var n = t.call(this, e) || this;
        n._stateType = $actorEnum.EActorStateType.ATTACK;
        return n;
    }
    __extends(e, t);
    e.prototype.begin = function (t) {
        var e = this;
        this._context.setDirX(t.x > this._context.node.x);
        this._context.playAnimAttack(
            function () {
                e._context.attackHit(t);
            },
            function () {
                e._context.changeState($actorEnum.EActorStateType.IDLE);
            }
        );
    };
    e.prototype.update = function () {
        if (this._context.isTrigger && this._context.isFace()) {
            this._context.changeState($actorEnum.EActorStateType.EXTEND_1);
        }
    };
    e.prototype.end = function () {};
    return e;
})($state.State);
exports.Boss_122_Atk = s;
