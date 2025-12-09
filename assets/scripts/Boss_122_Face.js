var i;
exports.Boss_122_Face = void 0;
var $state = require("./State");
var $actorEnum = require("./ActorEnum");
var s = (function (t) {
    function e(e) {
        var n = t.call(this, e) || this;
        n._isEndFace = !1;
        n._stateType = $actorEnum.EActorStateType.EXTEND_1;
        return n;
    }
    __extends(e, t);
    e.prototype.begin = function () {
        this._context.node.opacity = 180;
        this._context.playAnimShowFace();
    };
    e.prototype.update = function () {
        var t = this;
        if (this._context.isTrigger) {
            if (this._isEndFace || this._context.isFace()) {
                //
            } else {
                this._isEndFace = !0;
                this._context.playAnimHideFace(function () {
                    t._context.changeState($actorEnum.EActorStateType.IDLE);
                });
            }
        }
    };
    e.prototype.end = function () {
        this._isEndFace = !1;
        this._context.node.opacity = 255;
    };
    return e;
})($state.State);
exports.Boss_122_Face = s;
