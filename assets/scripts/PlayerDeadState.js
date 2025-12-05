var i;
exports.PlayerDeadState = void 0;
var $globalPopupMgr = require("./GlobalPopupMgr");
var $battleMgr = require("./BattleMgr");
var $state = require("./State");
var $actorEnum = require("./ActorEnum");
var l = (function (t) {
    function e(e) {
        var n = t.call(this, e) || this;
        n._stateType = $actorEnum.EActorStateType.DEAD;
        return n;
    }
    __extends(e, t);
    e.prototype.begin = function () {
        this._context.exitInvincible();
        if ($battleMgr.default.instance.getCurScene().isResult) {
            //
        } else {
            this._context.spAnimCtrl.playAnim("die", 1, !1, function () {
                $globalPopupMgr.default.instance.showLevelFail($battleMgr.default.instance.getCurScene().isPlay);
            });
        }
    };
    e.prototype.update = function () {};
    e.prototype.end = function () {
        this._context.spAnimCtrl.clearAnim();
    };
    return e;
})($state.State);
exports.PlayerDeadState = l;
