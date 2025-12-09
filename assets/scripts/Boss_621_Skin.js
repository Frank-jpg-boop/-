var i;
exports.Boss_621_Skin = void 0;
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
        this._context.playAnimSkinChange(function () {
            var e = t._context.skinId + 1;
            if (e > 3) {
                e = 1;
            }
            t._context.setSkinId(e);
            t._context.changeState($actorEnum.EActorStateType.IDLE);
        });
    };
    e.prototype.update = function () {};
    return e;
})($state.State);
exports.Boss_621_Skin = s;
