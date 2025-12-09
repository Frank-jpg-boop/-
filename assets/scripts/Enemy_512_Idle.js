import $battleMgr from './BattleMgr';
import $state from './State';
import $actorEnum from './ActorEnum';
import $door from './Door';
import $unitMgr from './UnitMgr';
let i;
exports.Enemy_512_Idle = void 0;
e.prototype.end = function () {};
e.prototype.update = function () {
  if (this._context.isNullItem && this._context.isTrigger) {
    const t = $battleMgr.default.instance.getCurScene();
    if (t) {
      if (
        (this._context.isFixCreate &&
          !t.level.getRoomById(this._context.roomId).isArriveed) ||
        (this._context.tempCollisionDoorIds.some(function (t) {
          return (
            $unitMgr.UnitMgr.instance.getUnit(t).state ==
            $door.EDoorState.CLOSE
          );
        }) &&
          !this._context.canAttack())
      ) {
        //
      } else {
        this._context.changeState($actorEnum.EActorStateType.WALK);
      }
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
const u = e;
exports.Enemy_512_Idle = u;
