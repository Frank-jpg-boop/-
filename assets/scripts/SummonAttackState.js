var i;
exports.SummonAttackState = void 0;
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
        this._context.playAnimAttack(
            function () {
                e._context.attackHit(t);
            },
            function () {
                e._context.changeState($actorEnum.EActorStateType.IDLE);
            }
        );
    };
    e.prototype.update = function () {};
    e.prototype.end = function () {};
    return e;
})($state.State);
exports.SummonAttackState = s;
