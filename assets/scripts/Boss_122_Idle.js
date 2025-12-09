import $state from './State';
import $actorEnum from './ActorEnum';
let i;
exports.Boss_122_Idle = void 0;
e.prototype.update = function () {
  if (this._context.isTrigger) {
    if (this._context.isFace()) {
      this._context.changeState($actorEnum.EActorStateType.EXTEND_1);
    } else {
      const t = this._context.searchTarget();
      if (t) {
        if (this._context.canAttackTarget(t)) {
          return void (
            this._context.canAttack() &&
            this._context.changeState(
              $actorEnum.EActorStateType.ATTACK,
              t.node,
            )
          );
        }
        this._context.changeState($actorEnum.EActorStateType.WALK);
      }
    }
  }
};
e.prototype.begin = function () {
  this._context.playAnimIdle();
};
function e(e) {
  const n = t.call(this, e) || this;
  n._stateType = $actorEnum.EActorStateType.IDLE;
  return n;
}
const s = e;
exports.Boss_122_Idle = s;
