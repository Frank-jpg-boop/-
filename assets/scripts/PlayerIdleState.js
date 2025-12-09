import $state from './State';
import $actorEnum from './ActorEnum';
let i;
exports.PlayerIdleState = void 0;
e.prototype.update = function () {};
e.prototype.begin = function () {
  this._context.spAnimCtrl.playAnim("bide", 1, !0);
};
function e(e) {
  const n = t.call(this, e) || this;
  n._stateType = $actorEnum.EActorStateType.IDLE;
  return n;
}
const s = e;
exports.PlayerIdleState = s;
