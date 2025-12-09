import $actorEnum from './ActorEnum';
let i;
exports.ImpIdleState = void 0;
e.prototype.update = function () {
  const t = this._context;
  const e = this._context.searchTarget();
  if (e) {
    if (this._context.canAttack()) {
      if (this._context.canAttackTarget(e)) {
        this._context.changeState($actorEnum.EActorStateType.ATTACK, e);
      } else {
        this._context.changeState($actorEnum.EActorStateType.WALK, e);
      }
    }
  } else {
    const n = t.ownerSkill.owner;
    if (n.isDead()) {
      return;
    }
    if (
      cc.Vec2.squaredDistance(n.node.getPosition(), t.node.getPosition()) <=
      t.ownerRange * t.ownerRange
    ) {
      return;
    }
    this._context.changeState($actorEnum.EActorStateType.WALK, n);
  }
};
function e() {
  return (null !== t && t.apply(this, arguments)) || this;
}
const a = e;
exports.ImpIdleState = a;
