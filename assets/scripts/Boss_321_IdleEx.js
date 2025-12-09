import $state from './State';
import $actorEnum from './ActorEnum';
let i;
export const Boss_321_IdleEx = void 0;
e.prototype.update = function () {
  const t = this;
  if (this._context.isTrigger && !this._isAppeared && this._context.waitTime <= 0) {
    this._isAppeared = !0;
    this._context.fadeOut(function () {
      t._context.changeState($actorEnum.EActorStateType.IDLE);
      t._context.appear();
    });
  }
};
e.prototype.begin = function () {
  this._isAppeared = !1;
  this._context.playAnimIdleEx();
};
function e(e) {
  const n = t.call(this, e) || this;
  n._isAppeared = !1;
  n._stateType = $actorEnum.EActorStateType.EXTEND_1;
  return n;
}
const s = e;
export const Boss_321_IdleEx = s;
