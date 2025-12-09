import $state from './State';
import $actorEnum from './ActorEnum';
let i;
exports.EnemyStopState = void 0;
e.prototype.end = function () {};
e.prototype.update = function (t) {
  if (this._context.isTrigger) {
    this._durationTime -= t;
    if (this._durationTime <= 0) {
      this._context.changeState($actorEnum.EActorStateType.IDLE);
    }
  }
};
e.prototype.begin = function (t) {
  this._context.playAnimIdle();
  this._durationTime = t;
};
e.prototype.again = function (t) {
  this._durationTime = Math.max(t, this._durationTime);
};
function e(e) {
  const n = t.call(this, e) || this;
  n._durationTime = 0;
  n._stateType = $actorEnum.EActorStateType.STOP;
  return n;
}
const s = e;
exports.EnemyStopState = s;
