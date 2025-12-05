var i;
exports.PlayerIdleState = void 0;
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
        this._context.spAnimCtrl.playAnim("bide", 1, !0);
    };
    e.prototype.update = function () {};
    return e;
})($state.State);
exports.PlayerIdleState = s;
