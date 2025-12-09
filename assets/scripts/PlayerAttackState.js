import $state from './State';
import $actorEnum from './ActorEnum';
let i;
export const PlayerAttackState = void 0;
e.prototype.end = function () {};
e.prototype.update = function () {};
e.prototype.begin = function (t) {
  if (void 0 === t) {
    t = 0;
  }
};
function e(e) {
  const n = t.call(this, e) || this;
  n._stateType = $actorEnum.EActorStateType.ATTACK;
  return n;
}
const s = e;
export const PlayerAttackState = s;
