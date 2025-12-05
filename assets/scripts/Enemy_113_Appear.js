var i;
exports.Enemy_113_Appear = void 0;
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
        var e = this._context.searchTarget();
        if (e) {
            this._context.setDirX(e.node.x > this._context.node.x);
        }
        this._context.playAnimAppear(function () {
            t._context.changeState($actorEnum.EActorStateType.IDLE);
        });
    };
    e.prototype.update = function () {};
    return e;
})($state.State);
exports.Enemy_113_Appear = s;
