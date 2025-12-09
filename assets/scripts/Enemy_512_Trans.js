import $state from './State';
import $actorEnum from './ActorEnum';
let i;
export const Enemy_512_Trans = void 0;
e.prototype.end = function () {};
e.prototype.update = function () {};
e.prototype.begin = function () {
  const t = this;
  this._context.playAnimTrans(function () {
    t._context.changeState($actorEnum.EActorStateType.WALK);
  });
};
function e(e) {
  const n = t.call(this, e) || this;
  n._stateType = $actorEnum.EActorStateType.EXTEND_1;
  return n;
}
const s = e;
export const Enemy_512_Trans = s;
