var i;
exports.Boss_521_Awake = void 0;
var $state = require("./State");
var $actorEnum = require("./ActorEnum");
var s = (function (t) {
    function e(e) {
        var n = t.call(this, e) || this;
        n._stateType = $actorEnum.EActorStateType.EXTEND_1;
        return n;
    }
    __extends(e, t);
    e.prototype.begin = function (t) {
        var e = this;
        this._context.playAnimAwake(function () {
            if (t) {
                t();
            }
            e._context.changeState($actorEnum.EActorStateType.IDLE);
        });
    };
    e.prototype.update = function () {};
    return e;
})($state.State);
exports.Boss_521_Awake = s;
