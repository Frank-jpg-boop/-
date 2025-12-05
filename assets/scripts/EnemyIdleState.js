var i;
exports.EnemyIdleState = void 0;
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
        if (this._context.isTrigger) {
            var t = $battleMgr.default.instance.getCurScene();
            if (
                t &&
                (!this._context.isFixCreate || t.level.getRoomById(this._context.roomId).isArriveed) &&
                this._context.checkGuide() &&
                (!this._context.tempCollisionDoorIds.some(function (t) {
                    return $unitMgr.UnitMgr.instance.getUnit(t).state == $door.EDoorState.CLOSE;
                }) ||
                    this._context.canAttack())
            ) {
                var e = this._context.searchTarget();
                if (e) {
                    if (this._context.canAttackTarget(e)) {
                        if (this._context.canAttack()) {
                            return void this._context.changeState($actorEnum.EActorStateType.ATTACK, e.node);
                        } else {
                            return void this._context.setDirX(e.node.x > this._context.node.x);
                        }
                    }
                    this._context.setDirX(e.node.x > this._context.node.x);
                    this._context.changeState($actorEnum.EActorStateType.WALK, e);
                }
            }
        }
    };
    return e;
})($state.State);
exports.EnemyIdleState = u;
