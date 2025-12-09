var i;
exports.Boss_321_IdleEx = void 0;
var $state = require("./State");
var $actorEnum = require("./ActorEnum");
var s = (function (t) {
    function e(e) {
        var n = t.call(this, e) || this;
        n._isAppeared = !1;
        n._stateType = $actorEnum.EActorStateType.EXTEND_1;
        return n;
    }
    __extends(e, t);
    e.prototype.begin = function () {
        this._isAppeared = !1;
        this._context.playAnimIdleEx();
    };
    e.prototype.update = function () {
        var t = this;
        if (this._context.isTrigger && !this._isAppeared && this._context.waitTime <= 0) {
            this._isAppeared = !0;
            this._context.fadeOut(function () {
                t._context.changeState($actorEnum.EActorStateType.IDLE);
                t._context.appear();
            });
        }
    };
    return e;
})($state.State);
exports.Boss_321_IdleEx = s;
