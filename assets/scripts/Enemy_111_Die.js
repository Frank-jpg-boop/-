import $state from './State';
import $actorEnum from './ActorEnum';
let i;
export const Enemy_111_Die = void 0;
e.prototype.update = function () {};
e.prototype.begin = function () {
  const t = this;
  this._context.playAnimDie(function () {
    t._context.die();
  });
};
function e(e) {
  const n = t.call(this, e) || this;
  n._stateType = $actorEnum.EActorStateType.DEAD;
  return n;
}
const s = e;
export const Enemy_111_Die = s;
