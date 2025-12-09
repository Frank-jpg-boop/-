import $battleMgr from './BattleMgr';
import $state from './State';
import $actorEnum from './ActorEnum';
import $door from './Door';
import $unitMgr from './UnitMgr';
let i;
exports.EnemyIdleState = void 0;
e.prototype.update = function () {
  if (this._context.isTrigger) {
    const t = $battleMgr.default.instance.getCurScene();
    if (
      t &&
      (!this._context.isFixCreate ||
        t.level.getRoomById(this._context.roomId).isArriveed) &&
      this._context.checkGuide() &&
      (!this._context.tempCollisionDoorIds.some(function (t) {
        return (
          $unitMgr.UnitMgr.instance.getUnit(t).state == $door.EDoorState.CLOSE
        );
      }) ||
        this._context.canAttack())
    ) {
      const e = this._context.searchTarget();
      if (e) {
        if (this._context.canAttackTarget(e)) {
          if (this._context.canAttack()) {
            return void this._context.changeState(
              $actorEnum.EActorStateType.ATTACK,
              e.node,
            );
          } else {
            return void this._context.setDirX(
              e.node.x > this._context.node.x,
            );
          }
        }
        this._context.setDirX(e.node.x > this._context.node.x);
        this._context.changeState($actorEnum.EActorStateType.WALK, e);
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
exports.EnemyIdleState = u;
