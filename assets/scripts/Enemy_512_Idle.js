var i;
exports.Enemy_512_Idle = void 0;
var $battleMgr = require("./BattleMgr");
var $state = require("./State");
var $actorEnum = require("./ActorEnum");
var $door = require("./Door");
var $unitMgr = require("./UnitMgr");
var u = (function (t) {
    function e(e) {
        var n = t.call(this, e) || this;
        n._stateType = $actorEnum.EActorStateType.IDLE;
        return n;
    }
    __extends(e, t);
    e.prototype.begin = function () {
        this._context.playAnimIdle();
    };
    e.prototype.update = function () {
        if (this._context.isNullItem && this._context.isTrigger) {
            var t = $battleMgr.default.instance.getCurScene();
            if (t) {
                if (
                    (this._context.isFixCreate && !t.level.getRoomById(this._context.roomId).isArriveed) ||
                    (this._context.tempCollisionDoorIds.some(function (t) {
                        return $unitMgr.UnitMgr.instance.getUnit(t).state == $door.EDoorState.CLOSE;
                    }) &&
                        !this._context.canAttack())
                ) {
                    //
                } else {
                    this._context.changeState($actorEnum.EActorStateType.WALK);
                }
            }
        }
    };
    e.prototype.end = function () {};
    return e;
})($state.State);
exports.Enemy_512_Idle = u;
