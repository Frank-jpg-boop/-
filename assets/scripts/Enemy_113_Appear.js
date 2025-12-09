import $state from './State';
import $actorEnum from './ActorEnum';
let i;
exports.Enemy_113_Appear = void 0;
e.prototype.update = function () {};
e.prototype.begin = function () {
  const t = this;
  const e = this._context.searchTarget();
  if (e) {
    this._context.setDirX(e.node.x > this._context.node.x);
  }
  this._context.playAnimAppear(function () {
    t._context.changeState($actorEnum.EActorStateType.IDLE);
  });
};
function e(e) {
  const n = t.call(this, e) || this;
  n._stateType = $actorEnum.EActorStateType.EXTEND_1;
  return n;
}
const s = e;
exports.Enemy_113_Appear = s;
