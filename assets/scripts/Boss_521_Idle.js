import $battleMgr from './BattleMgr';
import $state from './State';
import $actorEnum from './ActorEnum';
let i;
exports.Boss_521_Idle = void 0;
e.prototype.update = function () {
  if (this._context.isTrigger && $battleMgr.default.instance.getCurScene()) {
    const t = this._context.searchTarget();
    if (t && this._context.canAttack()) {
      this._context.changeState($actorEnum.EActorStateType.ATTACK, t.node);
    }
  }
};
e.prototype.begin = function () {
  this._context.playAnimIdle();
};
function e(e) {
  const n = t.call(this, e) || this;
  n._stateType = $actorEnum.EActorStateType.IDLE;
  return n;
}
const c = e;
exports.Boss_521_Idle = c;
