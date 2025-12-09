import $state from './State';
import $actorEnum from './ActorEnum';
import $attrEnum from './AttrEnum';
let i;
exports.Enemy_413_Walk = void 0;
e.prototype.update = function (t) {
  const e = this._context.searchTarget();
  if (e && this._context.canAttackTarget(e)) {
    if (this._context.canAttack()) {
      return void this._context.changeState(
        $actorEnum.EActorStateType.ATTACK,
        e.node,
      );
    } else {
      return void this._context.playAnimIdle();
    }
  }
  this._context.playAnimWalk();
  this._targetPosRefreshTime -= t;
  if (this._targetPosRefreshTime <= 0) {
    this.updateTargetPos();
  }
  if (this._targetPos) {
    const n = this._context.node.getPosition();
    if (this._targetPos.fuzzyEquals(n, this._context.attackRange)) {
      if (e) {
        return void this.updateTargetPos();
      } else {
        return void this._context.changeState(
          $actorEnum.EActorStateType.IDLE,
        );
      }
    }
    const i = null;
    if (this._targetPos.x > n.x) {
      i = cc.Vec2.RIGHT;
    } else {
      i = cc.Vec2.RIGHT.mul(-1);
    }
    const o = this._context.getAttribute($attrEnum.E_AttrType.SPEED).value;
    const r = i.mul(o * t);
    this._context.setPos(n.add(r));
    this._context.setDirX(i.x > 0);
  }
};
e.prototype.updateTargetPos = function () {
  const t = this._context.searchTarget();
  if (t) {
    this._targetPos = t.pathPos;
    this._targetPosRefreshTime = this._targetPosRefreshInterval;
  } else {
    this._targetPos = this._context.roomCentrePos;
    this._targetPosRefreshTime = this._targetPosRefreshInterval;
  }
};
e.prototype.begin = function () {
  this._context.playAnimWalk();
  this.updateTargetPos();
};
function e(e) {
  const n = t.call(this, e) || this;
  n._targetPos = null;
  n._targetPosRefreshTime = 0;
  n._targetPosRefreshInterval = 2;
  n._stateType = $actorEnum.EActorStateType.WALK;
  return n;
}
const c = e;
exports.Enemy_413_Walk = c;
