import $state from './State';
import $actorEnum from './ActorEnum';
let i;
exports.Enemy_111_Idle = void 0;
e.prototype.update = function () {
  const t = this._context.searchTarget();
  if (t) {
    this._context.setDirX(t.node.x > this._context.node.x);
    if (this._context.canSummon()) {
      this._context.changeState($actorEnum.EActorStateType.EXTEND_1);
    } else {
      if (this._context.canAttack()) {
        this._context.changeState($actorEnum.EActorStateType.ATTACK, t.node);
      } else {
        this._context.canMove() &&
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
exports.Enemy_111_Idle = s;
