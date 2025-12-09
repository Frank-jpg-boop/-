import $state from './State';
import $actorEnum from './ActorEnum';
let i;
export const Boss_122_Atk = void 0;
e.prototype.end = function () {};
e.prototype.update = function () {
  if (this._context.isTrigger && this._context.isFace()) {
    this._context.changeState($actorEnum.EActorStateType.EXTEND_1);
  }
};
e.prototype.begin = function (t) {
  const e = this;
  this._context.setDirX(t.x > this._context.node.x);
  this._context.playAnimAttack(
    function () {
      e._context.attackHit(t);
    },
    function () {
      e._context.changeState($actorEnum.EActorStateType.IDLE);
    },
  );
};
function e(e) {
  const n = t.call(this, e) || this;
  n._stateType = $actorEnum.EActorStateType.ATTACK;
  return n;
}
const s = e;
export const Boss_122_Atk = s;
