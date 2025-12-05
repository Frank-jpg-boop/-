var i;
exports.EnemyStopState = void 0;
var $state = require("./State");
var $actorEnum = require("./ActorEnum");
var s = (function (t) {
    function e(e) {
        var n = t.call(this, e) || this;
        n._durationTime = 0;
        n._stateType = $actorEnum.EActorStateType.STOP;
        return n;
    }
    __extends(e, t);
    e.prototype.again = function (t) {
        this._durationTime = Math.max(t, this._durationTime);
    };
    e.prototype.begin = function (t) {
        this._context.playAnimIdle();
        this._durationTime = t;
    };
    e.prototype.update = function (t) {
        if (this._context.isTrigger) {
            this._durationTime -= t;
            if (this._durationTime <= 0) {
                this._context.changeState($actorEnum.EActorStateType.IDLE);
            }
        }
    };
    e.prototype.end = function () {};
    return e;
})($state.State);
exports.EnemyStopState = s;
