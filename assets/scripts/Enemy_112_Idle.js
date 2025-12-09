import $battleMgr from './BattleMgr';
import $state from './State';
import $actorEnum from './ActorEnum';
let i;
export const Enemy_112_Idle = void 0;
e.prototype.update = function () {
  const t = $battleMgr.default.instance.getCurScene();
  if (t && (!this._context.isFixCreate || t.level.getRoomById(this._context.roomId).isArriveed)) {
    const e = this._context.searchTarget();
    if (e) {
      if (this._context.canAttackTarget(e)) {
        return void (
          this._context.canAttack() &&
          this._context.changeState($actorEnum.EActorStateType.ATTACK, e.node)
        );
      }
      this._context.changeState($actorEnum.EActorStateType.WALK);
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
export const Enemy_112_Idle = c;
