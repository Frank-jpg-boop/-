var i;
exports.Boss_321_Atk = void 0;
var $state = require("./State");
var $actorEnum = require("./ActorEnum");
var s = (function (t) {
    function e(e) {
        var n = t.call(this, e) || this;
        n._stateType = $actorEnum.EActorStateType.ATTACK;
        return n;
    }
    __extends(e, t);
    e.prototype.begin = function () {
        var t = this;
        this._context.playAnimAttackReady();
        this._context.scheduleOnce(function () {
            t.attack();
        }, Number(this._context.cfg.val1));
    };
    e.prototype.attack = function () {
        var t = this;
        this._context.plyerAnimSummom(null, function () {
            if (t._context.isFake) {
                t._context.changeState($actorEnum.EActorStateType.DEAD);
            } else {
                if (t._context.waitTime <= 0) {
                    return void t._context.fadeOut(function () {
                        t._context.changeState($actorEnum.EActorStateType.IDLE);
                        t._context.appear();
                    });
                }
                t._context.changeState($actorEnum.EActorStateType.EXTEND_1);
            }
        });
    };
    e.prototype.update = function () {};
    return e;
})($state.State);
exports.Boss_321_Atk = s;
