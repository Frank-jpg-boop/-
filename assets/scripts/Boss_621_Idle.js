var i;
exports.Boss_621_Idle = void 0;
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
        if (this._context.isTrigger && $battleMgr.default.instance.getCurScene()) {
            var t = this._context.searchTarget();
            if (t) {
                this._context.setDirX(t.node.x > this._context.node.x);
                if (this._context.canAttackTarget(t) && this._context.canAttack()) {
                    this._context.changeState($actorEnum.EActorStateType.ATTACK, t.node);
                }
                this._context.changeState($actorEnum.EActorStateType.WALK);
            }
        }
    };
    return e;
})($state.State);
exports.Boss_621_Idle = c;
