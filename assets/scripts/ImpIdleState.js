var i;
exports.ImpIdleState = void 0;
var $actorEnum = require("./ActorEnum");
var a = (function (t) {
    function e() {
        return (null !== t && t.apply(this, arguments)) || this;
    }
    __extends(e, t);
    e.prototype.update = function () {
        var t = this._context;
        var e = this._context.searchTarget();
        if (e) {
            if (this._context.canAttack()) {
                if (this._context.canAttackTarget(e)) {
                    this._context.changeState($actorEnum.EActorStateType.ATTACK, e);
                } else {
                    this._context.changeState($actorEnum.EActorStateType.WALK, e);
                }
            }
        } else {
            var n = t.ownerSkill.owner;
            if (n.isDead()) {
                return;
            }
            if (cc.Vec2.squaredDistance(n.node.getPosition(), t.node.getPosition()) <= t.ownerRange * t.ownerRange) {
                return;
            }
            this._context.changeState($actorEnum.EActorStateType.WALK, n);
        }
    };
    return e;
})(require("./SummonIdleState").SummonIdleState);
exports.ImpIdleState = a;
