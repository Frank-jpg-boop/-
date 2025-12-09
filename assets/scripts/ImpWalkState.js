var i;
exports.ImpWalkState = void 0;
var $actorEnum = require("./ActorEnum");
var a = (function (t) {
    function e() {
        return (null !== t && t.apply(this, arguments)) || this;
    }
    __extends(e, t);
    e.prototype.update = function (e) {
        var n = this._context;
        var i = this._context.searchTarget();
        if (!i) {
            var o = n.ownerSkill.owner;
            if (
                o.isDead() ||
                cc.Vec2.squaredDistance(o.node.getPosition(), n.node.getPosition()) <= n.ownerRange * n.ownerRange
            ) {
                return void this._context.changeState($actorEnum.EActorStateType.IDLE);
            } else {
                return (this._curFindTarget = o), void t.prototype.update.call(this, e);
            }
        }
        if (this._context.canAttack()) {
            if (this._context.canAttackTarget(i)) {
                this._context.changeState($actorEnum.EActorStateType.ATTACK, i);
            } else {
                (this._curFindTarget = i), t.prototype.update.call(this, e);
            }
        } else {
            this._context.changeState($actorEnum.EActorStateType.IDLE);
        }
    };
    return e;
})(require("./SummonWalkState").SummonWalkState);
exports.ImpWalkState = a;
