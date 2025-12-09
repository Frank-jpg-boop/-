import $state from './State';
import $actorEnum from './ActorEnum';
let i;
exports.Enemy_513_Idle = void 0;
e.prototype.update = function () {};
e.prototype.begin = function () {
  this._context.playAnimIdle();
};
function e(e) {
  const n = t.call(this, e) || this;
  n._stateType = $actorEnum.EActorStateType.IDLE;
  return n;
}
const s = e;
exports.Enemy_513_Idle = s;
