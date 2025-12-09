import $actorEnum from './ActorEnum';
let i;
exports.ImpWalkState = void 0;
e.prototype.update = function (e) {
  const n = this._context;
  const i = this._context.searchTarget();
  if (!i) {
    const o = n.ownerSkill.owner;
    if (
      o.isDead() ||
      cc.Vec2.squaredDistance(o.node.getPosition(), n.node.getPosition()) <=
        n.ownerRange * n.ownerRange
    ) {
      return void this._context.changeState($actorEnum.EActorStateType.IDLE);
    } else {
      return (
        (this._curFindTarget = o),
        void t.prototype.update.call(this, e)
      );
    }
  }
  if (this._context.canAttack()) {
    if (this._context.canAttackTarget(i)) {
      this._context.changeState($actorEnum.EActorStateType.ATTACK, i);
    } else {
      ((this._curFindTarget = i), t.prototype.update.call(this, e));
    }
  } else {
    this._context.changeState($actorEnum.EActorStateType.IDLE);
  }
};
function e() {
  return (null !== t && t.apply(this, arguments)) || this;
}
const a = e;
exports.ImpWalkState = a;
