import $state from './State';
import $actorEnum from './ActorEnum';
let i;
export const Enemy_413_Atk = void 0;
e.prototype.end = function () {};
e.prototype.update = function () {};
e.prototype.begin = function (t) {
  const e = this;
  this._context.setDirX(t.x > this._context.node.x);
  if (Math.random() < Number(this._context.cfg.val1)) {
    this._context.changeState($actorEnum.EActorStateType.SKILL, t);
  } else {
    this._context.playAnimAttack(
      function () {
        e._context.attackHit(t);
      },
      function () {
        e._context.changeState($actorEnum.EActorStateType.IDLE);
      },
      t,
    );
  }
};
function e(e) {
  const n = t.call(this, e) || this;
  n._stateType = $actorEnum.EActorStateType.ATTACK;
  return n;
}
const s = e;
export const Enemy_413_Atk = s;
