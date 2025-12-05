var i;
exports.Enemy_111_Die = void 0;
var $state = require("./State");
var $actorEnum = require("./ActorEnum");
var s = (function (t) {
    function e(e) {
        var n = t.call(this, e) || this;
        n._stateType = $actorEnum.EActorStateType.DEAD;
        return n;
    }
    __extends(e, t);
    e.prototype.begin = function () {
        var t = this;
        this._context.playAnimDie(function () {
            t._context.die();
        });
    };
    e.prototype.update = function () {};
    return e;
})($state.State);
exports.Enemy_111_Die = s;
