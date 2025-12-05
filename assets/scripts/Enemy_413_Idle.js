var i;
exports.Enemy_413_Idle = void 0;
var $battleMgr = require("./BattleMgr");
var $state = require("./State");
var $actorEnum = require("./ActorEnum");
var c = (function (t) {
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
            if (t && (!this._context.isFixCreate || t.level.getRoomById(this._context.roomId).isArriveed)) {
                var e = this._context.searchTarget();
                if (e) {
                    if (this._context.canAttackTarget(e)) {
                        if (this._context.canAttack()) {
                            return void this._context.changeState($actorEnum.EActorStateType.ATTACK, e.node);
                        } else {
                            return void this._context.setDirX(e.node.x > this._context.node.x);
                        }
                    }
                    this._context.changeState($actorEnum.EActorStateType.WALK, e);
                } else {
                    if (
                        this._context.roomCentrePos &&
                        !this._context.roomCentrePos.fuzzyEquals(
                            this._context.node.getPosition(),
                            this._context.attackRange
                        )
                    ) {
                        this._context.changeState($actorEnum.EActorStateType.WALK);
                    }
                }
            }
        }
    };
    return e;
})($state.State);
exports.Enemy_413_Idle = c;
