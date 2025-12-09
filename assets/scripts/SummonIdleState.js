import $state from './State';
import $actorEnum from './ActorEnum';
let i;
export const SummonIdleState = void 0;
e.prototype.update = function () {
  const t = this._context.searchTarget();
  if (t) {
    if (this._context.canAttackTarget(t)) {
      if (!this._context.canAttack()) {
        return;
      }
      return void this._context.changeState($actorEnum.EActorStateType.ATTACK, t);
    }
    this._context.changeState($actorEnum.EActorStateType.WALK);
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
export const SummonIdleState = s;
