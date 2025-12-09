var i;
exports.Enemy_512_Trans = void 0;
var $state = require("./State");
var $actorEnum = require("./ActorEnum");
var s = (function (t) {
    function e(e) {
        var n = t.call(this, e) || this;
        n._stateType = $actorEnum.EActorStateType.EXTEND_1;
        return n;
    }
    __extends(e, t);
    e.prototype.begin = function () {
        var t = this;
        this._context.playAnimTrans(function () {
            t._context.changeState($actorEnum.EActorStateType.WALK);
        });
    };
    e.prototype.update = function () {};
    e.prototype.end = function () {};
    return e;
})($state.State);
exports.Enemy_512_Trans = s;
