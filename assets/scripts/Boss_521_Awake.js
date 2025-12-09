import $state from './State';
import $actorEnum from './ActorEnum';
let i;
export const Boss_521_Awake = void 0;
e.prototype.update = function () {};
e.prototype.begin = function (t) {
  const e = this;
  this._context.playAnimAwake(function () {
    if (t) {
      t();
    }
    e._context.changeState($actorEnum.EActorStateType.IDLE);
  });
};
function e(e) {
  const n = t.call(this, e) || this;
  n._stateType = $actorEnum.EActorStateType.EXTEND_1;
  return n;
}
const s = e;
export const Boss_521_Awake = s;
